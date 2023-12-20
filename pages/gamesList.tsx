import { Header } from '@/components/HeaderGroup/Header';
import { Banner } from '@/components/Banner';
import MainTheme, { customColors, generalVariables } from '@/styles/themes/mainThemeOptions';
import { Box, Button, Dialog, DialogTitle, Pagination, TextField, ThemeProvider, Typography } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import { NextPage } from 'next';
import * as React from 'react';
import { ZigZag } from '@/components/Zig-zag';
import { Footer } from '@/components/Footer';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { CollectionReference, DocumentData, Firestore, collection, doc, getDocs, getFirestore, onSnapshot, query, updateDoc, where } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { Friend, SavedGame, friendRequest } from './api/graphql';
import { WidthFull } from '@mui/icons-material';

const GamesList: NextPage = () => {
    const pagesArray = ['Domů', 'Záznamy'];
    const hrefArray = ['/', '/gamesList'];
    const fileLevel = 2;
    const title = 'Záznamy';
    const perex = 'Lorem ipsum dolor sit amet, consectetuer adip iscing elit. Nullam Lorem ipsum dolor sit amet, consectetuer adip iscing elit. Nullam Lorem ipsum dolor sit amet, consectetuer.';

    let currentUserEmailDirty = localStorage.getItem('currentUserEmail');
    const currentUserEmail = (currentUserEmailDirty ?? "").slice(1, -1);
    const [needToInitializeData, setNeedToInitializeData] = useState(true);
    const [needToUpdateData, setNeedToUpdateData] = useState(true);
    const [gamesList, setGamesList] = useState<Array<SavedGame>>([]);
    const [currentPage, setCurrentPage] = useState(1);
    let savedGames: Array<SavedGame> = [];
    let pageCount = Math.floor(gamesList.length / 6 + 1);
    

    const getData = async () => {
        const firestore = getFirestore();
        const usersRef = collection(firestore, 'users');
        let newGamesList: Array<SavedGame> = [];
        newGamesList = (await getDocs(query(usersRef, where("email", "==", currentUserEmail)))).docs[0].data().gamesSaved;

        return newGamesList;
    };

    useEffect(() => {
        const fetchData = async () => {
            if (needToInitializeData) {
                savedGames = await getData();
                setNeedToInitializeData(false);
                setGamesList(savedGames);
                setNeedToUpdateData(false);
            }
        };

        const intervalId = setInterval(() => {
            fetchData();
        }, 1000);

        return () => clearInterval(intervalId);

    }, [needToUpdateData]);

    const handleDelete = async (indexOfDelete: number) => {
        const firestore = getFirestore();
        const usersRef = collection(firestore, 'users');
        let currentUser = await getDocs(query(usersRef, where("email", "==", currentUserEmail)));

        gamesList.splice(indexOfDelete, 1);

        await updateDoc(doc(firestore, 'users', currentUser.docs[0].id), {
            gamesSaved: gamesList,
        });

        setNeedToUpdateData(true);
    }

    return (
        <Box>
            <Header></Header>
            <Banner level={fileLevel} href={hrefArray} pageName={pagesArray} title={title} perex={perex} picturePath={'/media/banner-background.jpg'} imgBg={false} />
            <Box sx={{ display: 'flex', margin: generalVariables.contentPadding, mt: '30px', flexWrap: 'wrap' }}>
                <Box sx={{ display: "flex", flexWrap: 'wrap', columnGap: '1%', rowGap: '15px', mt: '20px', width: '100%' }}>
                    {gamesList.length == 0 ? (
                        <Typography sx={{ color: customColors.black }}>Nemáš žádné uložené hry</Typography>
                    ) : (
                        gamesList.slice((currentPage - 1) * 10, 10 * currentPage).map((item: any, index: any) => (
                            <Link href='#' style={{width: '100%', textDecoration: 'none'}}>
                                <Box key={index} sx={{ width: '49.5%', height: '70px', backgroundColor: customColors.black, borderRadius: '10px', padding: '15px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <Box sx={{ display: 'flex', gap: '20px' }}>
                                        <Typography sx={{ color: customColors.white, fontSize: '25px', fontWeight: '500' }}>{item.name}</Typography>
                                        <Typography sx={{ color: customColors.white, fontSize: '25px', fontWeight: '500' }}>{item.date}</Typography>
                                    </Box>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                                        <DeleteIcon onClick={() => handleDelete(index)} sx={{ height: '45px', width: '45px', color: customColors.white, cursor: 'pointer' }} />
                                    </Box>
                                </Box>
                            </Link>
                        )))}
                </Box>
                <Pagination sx={{mt: '30px'}} count={pageCount} />
            </Box>
            <Box sx={{ position: 'absolute', bottom: '0', width: '100%' }}>
                <Footer />
            </Box>
        </Box>
    );
};

export default GamesList;
