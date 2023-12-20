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
            if(needToInitializeData)
            {
                await getCurrentUser();
                setNeedToInitializeData(false);
            }
        };

        const intervalId = setInterval(() => {
            fetchData();
        }, 1000);

        return () => clearInterval(intervalId);

    }, [needToInitializeData]);

    return (
        <Box>
            <Header></Header>
            <Banner level={fileLevel} href={hrefArray} pageName={pagesArray} title={title} perex={perex} picturePath={'/media/banner-background.jpg'} imgBg={false} />
            <Box sx={{ display: 'flex', margin: generalVariables.contentPadding, mt: '30px' }}>
                <AccountCircleIcon sx={{ height: '200px', width: '250px' }} />
                <Box sx={{width: '3px', height: '200px', backgroundColor: customColors.black, mr: '40px'}}></Box>
                <Box sx={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
                    <Typography fontSize='25px'><b>Jméno: </b> {currentUsername}</Typography>
                    <Typography fontSize='25px'><b>Email: </b> {currentUserEmail}</Typography>
                    <Typography fontSize='25px'><b>Počet přátel: </b> {currentFriendList} </Typography>
                    <Typography fontSize='25px'><b>Počet uložených her: </b> {currentGames} </Typography>
                </Box>
            </Box>
            <Box sx={{ width: '100%', pt: '30px', position: 'absolute', bottom: '0px' }}>
                <Footer />
            </Box>
        </Box>
    );
};

export default Friends;
