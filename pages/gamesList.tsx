import { Header } from '@/components/HeaderGroup/Header';
import { Banner } from '@/components/Banner';
import MainTheme, { customColors, generalVariables } from '@/styles/themes/mainThemeOptions';
import { Box, Button, Dialog, DialogTitle, Hidden, Pagination, TextField, ThemeProvider, Typography, useTheme } from '@mui/material';
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
import { Friend, SavedGame, friendRequest, gameShots } from './api/graphql';
import { WidthFull } from '@mui/icons-material';

const GamesList: NextPage = () => {
    const pagesArray = ['Domů', 'Záznamy'];
    const hrefArray = ['/', '/gamesList'];
    const fileLevel = 2;
    const title = 'Záznamy';
    const perex = 'Lorem ipsum dolor sit amet, consectetuer adip iscing elit. Nullam Lorem ipsum dolor sit amet, consectetuer adip iscing elit. Nullam Lorem ipsum dolor sit amet, consectetuer.';

    let currentUserEmailDirty = localStorage.getItem('currentUserEmail');
    const currentUserEmail = (currentUserEmailDirty ?? "").slice(1, -1);
    const [currentPage, setCurrentPage] = useState(1);
    const [usersGames, setUsersGames] = useState<Array<SavedGame>>([]);
    const [needToUpdate, setNeedToUpdate] = useState(false);
    const [dataInitialize, setDataInitialize] = useState(true);
    const [loading, setLoading] = useState(true);
    let pageCount = Math.floor(usersGames.length / 6 + 1);
    let gamesList: Array<SavedGame> = [];
    const router = useRouter();

    const getGames = async () => {
        const firestore = getFirestore();
        const usersRef = collection(firestore, 'users');
        const currentUser = (await getDocs(query(usersRef, where("email", "==", currentUserEmail))));

        if(gamesList.length > 0) {
            setLoading(false);
        }

        await currentUser.docs[0].data().gamesSaved.forEach(async (item: string) => {
            let pathParts = item.split("/savedGames/");
            let gameId = pathParts[1];
            const savedGamesRef = doc(firestore, 'savedGames', gameId);
            const gameDoc = await getDoc(savedGamesRef);
            let game: DocumentData = {};

            if (gameDoc.exists()) {
                game = gameDoc.data();
                gamesList.push({ date: game.date, playground: game.playground, gameShotsList: game.gameShotsList, players: game.players });
                setUsersGames(gamesList);
            }
        });
    };

    useEffect(() => {
        const fetchData = async () => {
            await getGames();
        };

        if(dataInitialize) {
            fetchData();
            setDataInitialize(false);
        }
    }, [currentPage, needToUpdate]);

    const handleDelete = async (indexOfDelete: number) => {
        const firestore = getFirestore();
        const usersRef = collection(firestore, 'users');
        const savedGamesRef = await getDocs(collection(firestore, 'savedGames'));
        let currentUser = await getDocs(query(usersRef, where("email", "==", currentUserEmail)));
        let newSavedGames = currentUser.docs[0].data().gamesSaved;
        let tempList: Array<string> = [];
        let finalList: Array<SavedGame> = [];

        newSavedGames.forEach((item: any, index: number) => {
            if (index != indexOfDelete) {
                tempList.push(item);
            }
        })

        for (let index = 0; index < savedGamesRef.docs.length; index++) {
            let tempGame = savedGamesRef.docs[index].data();
            tempList.forEach((element, i) => {
                if (savedGamesRef.docs[index].id == element.split('/savedGames/')[1]) {
                    finalList.push({ date: tempGame.date, playground: tempGame.playground, gameShotsList: tempGame.gameShotsList, players: tempGame.players });
                }
            })
        }

        setUsersGames(finalList);
        setNeedToUpdate(true);

        await updateDoc(doc(firestore, 'users', currentUser.docs[0].id), {
            gamesSaved: tempList,
        });
    }

    const handleRedirect = (gameData: SavedGame) => {
        localStorage.setItem('gameData', JSON.stringify(gameData));
        router.push("/gameDetail");
    }

    const buttonHoverDark = {
        "&:hover": {
            backgroundColor: customColors.black,
            color: customColors.white
        },
    };

    const theme: any = useTheme();

    return (
        <Box>
            <Header></Header>
            <Banner level={fileLevel} href={hrefArray} pageName={pagesArray} title={title} perex={perex} picturePath={'/media/banner-background.jpg'} imgBg={false} />
            <Box sx={{
                display: 'flex', padding: generalVariables.contentPadding, mt: '30px', flexWrap: 'wrap',
                [theme.breakpoints.down('md')]: { padding: '0 7%' }
            }}>
                <Box sx={{
                    display: "flex", flexWrap: 'wrap', columnGap: '1%', rowGap: '15px', mt: '20px', width: '100%'
                }}>
                    {
                        usersGames.length == 0 ? (
                            <Typography sx={{ color: customColors.black }}>Nemáš žádné uložené hry</Typography>
                        ) : (
                            usersGames.slice((currentPage - 1) * 6, 6 * currentPage).map((item: any, index: any) => (
                                <Box onClick={() => handleRedirect(item)} style={{
                                    width: '100%', textDecoration: 'none', border: 'none', backgroundColor: customColors.white, cursor: 'pointer',
                                }}>
                                    <Box key={index} sx={{
                                        width: '100%', backgroundColor: customColors.black, borderRadius: '10px', padding: '15px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '100%'
                                    }}>
                                        <Box sx={{
                                            display: 'flex', gap: '20px', alignItems: 'center',
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
                                            <DeleteIcon onClick={(event) => { event.stopPropagation(); handleDelete(index) }} sx={{
                                                height: '45px', width: '45px', color: customColors.white, cursor: 'pointer',
                                                [theme.breakpoints.down('sm')]: { height: '35px', width: '35px' }
                                            }} />
                                        </Box>
                                    </Box>
                                </Box>
                            )))}
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', mb: '80px', height: '50px', alignItems: 'center', width: '100%', mt: '20px' }}>
                    <Pagination count={pageCount} page={currentPage} onChange={(event, page) => setCurrentPage(page)} />
                    <Hidden mdUp>
                        <Button href="/lobby" sx={{ backgroundColor: customColors.black, color: customColors.white, padding: '5px 20px', ...buttonHoverDark }}>HRÁT</Button>
                    </Hidden>
                </Box>
            </Box>
            <Box sx={{ position: 'fixed', bottom: '0', width: '100%' }}>
                <Footer />
            </Box>
        </Box >
    );
};

export default GamesList;
