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
import { collection, getDocs, getFirestore, query, where } from 'firebase/firestore';
import { useEffect, useState } from 'react';

const Friends: NextPage = () => {
    const pagesArray = ['Domů', 'Profil'];
    const hrefArray = ['/', '/profileDetail'];
    const fileLevel = 2;
    const title = 'Profil';
    const perex = 'Lorem ipsum dolor sit amet, consectetuer adip iscing elit. Nullam Lorem ipsum dolor sit amet, consectetuer adip iscing elit. Nullam Lorem ipsum dolor sit amet, consectetuer.';

    let currentUserEmailDirty = localStorage.getItem('currentUserEmail');
    const currentUserEmail = (currentUserEmailDirty ?? "").slice(1, -1);
    const [currentUsername, setCurrentUsername] = useState("");
    const [currentFriendList, setCurrentFriendList] = useState(0);
    const [currentGames, setCurrentGames] = useState(0);
    const [needToInitializeData, setNeedToInitializeData] = useState(true);

    const getCurrentUser = async () => {
        const firestore = getFirestore();
        const usersRef = collection(firestore, 'users');
        const currentUser = (await getDocs(query(usersRef, where("email", "==", currentUserEmail)))).docs[0].data();
        setCurrentUsername(currentUser.username);
        setCurrentFriendList(currentUser.friendList.length);
        setCurrentGames(currentUser.gamesSaved.length);
    }

    useEffect(() => {
        const fetchData = async () => {
            if (needToInitializeData) {
                await getCurrentUser();
                setNeedToInitializeData(false);
            }
        };
        fetchData();
    }, [needToInitializeData]);

    const theme: any = useTheme();

    return (
        <Box>
            <Header></Header>
            <Banner level={fileLevel} href={hrefArray} pageName={pagesArray} title={title} perex={perex} picturePath={'/media/banner-background.jpg'} imgBg={false} />
            <Box sx={{
                display: 'flex', padding: generalVariables.contentPadding, mt: '30px', mb: '60px',
                [theme.breakpoints.down('sm')]: { flexDirection: 'column', alignItems: 'center'},
                [theme.breakpoints.down('md')]: { padding: '0 7%' },
            }}>
                <Box sx={{
                    height: '200px', width: '250px',
                    [theme.breakpoints.down('md')]: { width: '210px' },
                }}>
                    <AccountCircleIcon sx={{ height: '100%', width: '100%' }} />
                </Box>
                <Box sx={{
                    width: '2px', height: '180px', backgroundColor: customColors.black, mr: '40px',
                    [theme.breakpoints.down('md')]: { mr: '20px' },
                    [theme.breakpoints.down('sm')]: { height: '2px', width: '60%', mr: '0px', mb: '20px'}
                }}></Box>
                <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <Typography fontSize='22px'><b>Jméno: </b> {currentUsername}</Typography>
                    <Typography fontSize='22px'><b>Email: </b> {currentUserEmail}</Typography>
                    <Typography fontSize='22px'><b>Počet přátel: </b> {currentFriendList} </Typography>
                    <Typography fontSize='22px'><b>Počet uložených her: </b> {currentGames} </Typography>
                </Box>
            </Box>
            <Box sx={{ pt: '30px', width: '100%' }}>
                <Footer />
            </Box>
        </Box>
    );
};

export default Friends;
