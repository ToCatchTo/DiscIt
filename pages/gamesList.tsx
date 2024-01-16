import { Header } from '@/components/HeaderGroup/Header';
import { Banner } from '@/components/Banner';
import MainTheme, { customColors, generalVariables } from '@/styles/themes/mainThemeOptions';
import { Box, Button, Dialog, DialogTitle, Pagination, TextField, ThemeProvider, Typography, useTheme } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import { NextPage } from 'next';
import * as React from 'react';
import { ZigZag } from '@/components/Zig-zag';
import { Footer } from '@/components/Footer';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { CollectionReference, DocumentData, Firestore, collection, doc, getDoc, getDocs, getFirestore, onSnapshot, query, updateDoc, where } from 'firebase/firestore';
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
    const [currentPage, setCurrentPage] = useState(1);
    const [usersGames, setUsersGames] = useState<Array<SavedGame>>([]);
    let pageCount = Math.floor(usersGames.length / 6 + 1);
    let gamesList: Array<SavedGame> = [];
    const router = useRouter();

    const fetchData = async () => {
        const firestore = getFirestore();
        const usersRef = collection(firestore, 'users');
        const currentUser = (await getDocs(query(usersRef, where("email", "==", currentUserEmail))));

        currentUser.docs[0].data().gamesSaved.forEach(async (item: string) => {
            let pathParts = item.split("/savedGames/");
            let gameId = pathParts[1];
            const savedGamesRef = doc(firestore, 'savedGames', gameId);
            const gameDoc = await getDoc(savedGamesRef);
            let game: DocumentData = {};

            if (gameDoc.exists()) {
                game = gameDoc.data();
                console.log(game);
                gamesList.push({ date: game.date, playground: game.playground, gameShotsList: game.gameShotsList, players: game.players });
            }

            setUsersGames(gamesList);
        });
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleDelete = async (indexOfDelete: number) => {
        const firestore = getFirestore();
        const usersRef = collection(firestore, 'users');
        let currentUser = await getDocs(query(usersRef, where("email", "==", currentUserEmail)));

        usersGames.splice(indexOfDelete, 1);

        await updateDoc(doc(firestore, 'users', currentUser.docs[0].id), {
            gamesSaved: usersGames,
        });

        setNeedToUpdateData(true);
    }

    const handleRedirect = (gameData: SavedGame) => {
        localStorage.setItem('gameData', JSON.stringify(gameData));
        router.push("/gameDetail");
    }
    
    const theme: any = useTheme();

    return (
        <Box>
            <Header></Header>
            <Banner level={fileLevel} href={hrefArray} pageName={pagesArray} title={title} perex={perex} picturePath={'/media/banner-background.jpg'} imgBg={false} />
            <Box sx={{
                display: 'flex', padding: generalVariables.contentPadding, mt: '30px', flexWrap: 'wrap',
                [theme.breakpoints.down('md')]: { padding: '0 7%' }
            }}>
                <Box sx={{ display: "flex", flexWrap: 'wrap', columnGap: '1%', rowGap: '15px', mt: '20px', width: '100%' }}>
                    {usersGames.length == 0 ? (
                        <Typography sx={{ color: customColors.black }}>Nemáš žádné uložené hry</Typography>
                    ) : (
                        usersGames.slice((currentPage - 1) * 10, 10 * currentPage).map((item: any, index: any) => (
                            <Box component='button' onClick={() => handleRedirect(item)} style={{ width: '100%', textDecoration: 'none', border: 'none', backgroundColor: customColors.white }}>
                                <Box key={index} sx={{
                                    width: '49.5%', height: 'auto', backgroundColor: customColors.black, borderRadius: '10px', padding: '15px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                                    [theme.breakpoints.down('lg')]: { width: '100%' }
                                }}>
                                    <Box sx={{
                                        display: 'flex', gap: '20px',
                                        [theme.breakpoints.down('sm')]: { flexDirection: 'column', gap: '0px' }
                                    }}>
                                        <Typography sx={{
                                            color: customColors.white, fontSize: '25px', fontWeight: '500', textAlign: 'start',
                                            [theme.breakpoints.down('sm')]: { fontSize: '16px' }
                                        }}>{item.playground}</Typography>
                                        <Typography sx={{
                                            color: customColors.white, fontSize: '25px', fontWeight: '500', textAlign: 'start',
                                            [theme.breakpoints.down('sm')]: { fontSize: '16px' }
                                        }}>{item.date}</Typography>
                                    </Box>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                                        <DeleteIcon onClick={() => handleDelete(index)} sx={{
                                            height: '45px', width: '45px', color: customColors.white, cursor: 'pointer',
                                            [theme.breakpoints.down('sm')]: { height: '35px', width: '35px' }
                                        }} />
                                    </Box>
                                </Box>
                            </Box>
                        )))}
                </Box>
                <Pagination sx={{ mt: '30px', mb: '80px' }} count={pageCount} />
            </Box>
            <Box sx={{ position: 'fixed', bottom: '0', width: '100%' }}>
                <Footer />
            </Box>
        </Box>
    );
};

export default GamesList;
