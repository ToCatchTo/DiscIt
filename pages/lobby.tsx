import { Header } from '@/components/HeaderGroup/Header';
import { Banner } from '@/components/Banner';
import MainTheme, { customColors, generalVariables } from '@/styles/themes/mainThemeOptions';
import { Box, Button, Container, Dialog, Menu, MenuItem, OutlinedInput, Pagination, Select, TextField, ThemeProvider, Typography } from '@mui/material';
import { NextPage } from 'next';
import * as React from 'react';
import { ZigZag } from '@/components/Zig-zag';
import { Footer } from '@/components/Footer';
import AddIcon from '@mui/icons-material/Add';
import { useEffect, useState } from 'react';
import { Player } from './api/graphql';
import { collection, getDocs, getFirestore, query, where } from 'firebase/firestore';
import { useRouter } from 'next/router';

let currentUser: Player = { username: "", email: "", friendList: [], gamesSaved: [] };

const Lobby: NextPage = () => {
    const [playersList, setPlayersList] = useState<Array<Player>>([]);
    const [addWindowOpened, setWindowOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const [friendsAnchorEl, setFriendsAnchorEl] = useState(null);
    const [selectedPlayground, setSelectedPlayground] = useState<string>("");
    const [selectedPlayer, setSelectedPlayer] = useState<string>("");
    const [playgroundsList, setPlaygroundsList] = useState<Array<string>>(["initialize"]);
    let currentUserEmailDirty = localStorage.getItem('currentUserEmail');
    const currentUserEmail = (currentUserEmailDirty ?? "").slice(1, -1);
    const router = useRouter();
    let initializationDone = false;

    const setCurrentUser = async () => {
        if (playersList.length == 0) {
            const firestore = getFirestore();
            const usersRef = collection(firestore, 'users');
            let currentUserData = await getDocs(query(usersRef, where("email", "==", currentUserEmail)));
            currentUser.username = currentUserData.docs[0].data().username;
            currentUser.email = currentUserData.docs[0].data().email;
            currentUser.friendList = currentUserData.docs[0].data().friendList;
            currentUser.gamesSaved = currentUserData.docs[0].data().gamesSaved;
            setPlayersList([currentUser]);
        }
    }

    const initializePlaygrounds = async () => {
        initializationDone = true;
        const firestore = getFirestore();
        const playgroundsRef = collection(firestore, 'playgrounds');
        const playgroundNamesQuery = await getDocs(playgroundsRef);
        const playgroundNamesList = playgroundNamesQuery.docs.map(doc => doc.data().name);
        setPlaygroundsList(playgroundNamesList);
    }

    useEffect(() => {
        if(initializationDone == false) {
            initializePlaygrounds();
            setCurrentUser();
        }
    }, []);

    const handleAdd = async () => {
        let noDuplicate = true;
        playersList.forEach((item: Player) => {
            if (item.username == selectedPlayer)
                noDuplicate = false;
        });

        if (noDuplicate) {
            const firestore = getFirestore();
            const usersRef = collection(firestore, 'users');

            let targetUser = await getDocs(query(usersRef, where("username", "==", selectedPlayer)));
            if (targetUser.docs.length == 0) {
                alert("Uživatel nenalezen.");
            }
            else {
                let playerToAdd: Player = { username: "", email: "", friendList: [], gamesSaved: [] };
                playerToAdd.username = targetUser.docs[0].data().username;
                playerToAdd.email = targetUser.docs[0].data().email;
                playerToAdd.friendList = targetUser.docs[0].data().friendList;
                playerToAdd.gamesSaved = targetUser.docs[0].data().gamesSaved;
                let tempList = playersList;
                tempList.push(playerToAdd);
                setPlayersList(tempList);
                alert("Uživatel " + selectedPlayer + " byl přidán do hry");
            }
        }
        else {
            alert("Uživatel už byl přidán do hry.");
        }
    }

    const handleAddWindowAppear = () => {
        if (addWindowOpened) {
            setWindowOpen(false);
        }
        else {
            setWindowOpen(true);
        }
    }

    const handleClick = (event: any) => {
        setAnchorEl(event.currentTarget);
    };

    const handleFriendsClick = (event: any) => {
        setFriendsAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleFriendsClose = () => {
        setFriendsAnchorEl(null);
    };

    const handleFriendsItemClick = (playerName: string) => {
        setSelectedPlayer(playerName);
        handleClose();
    };

    const handleMenuItemClick = (playgroundName: string) => {
        setSelectedPlayground(playgroundName);
        handleClose();
    };

    const handleGameStart = (playground: string) => {
        if(playground != "") {
            localStorage.setItem('lobbyList', JSON.stringify(playersList));
            localStorage.setItem('selectedPlayground', JSON.stringify(selectedPlayground));
            router.push('/appPage');
        }
        else {
           alert("Musíte zvolit hřiště kde hrajete."); 
        }
    }

    const buttonHoverLight = {
        "&:hover": {
            backgroundColor: customColors.lightBackground,
            color: customColors.black
        },
    };

    const buttonHoverDark = {
        "&:hover": {
            backgroundColor: customColors.black,
            color: customColors.white
        },
    };

    return (
        <Box>
            <Header></Header>
            <Box sx={{ padding: '0 7%', mt: '20px', display: 'flex', gap: '20px' }}>
                <Box sx={{ width: '100%', backgroundColor: customColors.black, padding: '15px', borderRadius: '10px', display: 'flex', gap: '10px', flexDirection: 'column' }}>
                    {playersList.map((item: any, index: any) => (
                        <Box sx={{
                            width: '100%', padding: '15px', backgroundColor: customColors.white, borderRadius: '10px', fontSize: '20px',
                            alignItems: 'center', fontWeight: 'bold'
                        }} >
                            {item.username}
                        </Box>
                    ))}
                    <Box component='button' onClick={handleAddWindowAppear} sx={{
                        width: '100%', padding: '10px', backgroundColor: customColors.white, borderRadius: '10px', fontSize: '20px',
                        display: 'flex', gap: '10px', alignItems: 'center', fontWeight: 'bold', cursor: 'pointer', border: '0px', ...buttonHoverLight
                    }} >
                        <AddIcon sx={{ height: '50px', width: '50px' }} />
                        Přidat hráče
                    </Box>
                    <Box>
                        <Button fullWidth onClick={handleClick} sx={{color: customColors.black, backgroundColor: customColors.white, borderRadius: '10px', fontWeight: 'bold', ...buttonHoverLight }}>
                            {selectedPlayground || 'Zvolte hřiště'}
                        </Button>
                        <Menu
                            id="playgrounds-menu"
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                            sx={{maxHeight: '300px'}}
                        >
                            {playgroundsList.map((item, index) => (
                                <MenuItem key={index} onClick={() => handleMenuItemClick(item)}>
                                    {item}
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                </Box>
            </Box>
            <Dialog key={1} open={addWindowOpened} onClose={handleAddWindowAppear} fullWidth={true} maxWidth={'md'} PaperProps={{ sx: { borderRadius: '10px' } }} >
                <Box sx={{
                    height: '100%', backgroundColor: customColors.lightBackground, display: 'flex', padding: '20px', flexDirection: 'column', gap: '20px'
                }}>
                    <Typography sx={{ color: customColors.black, fontSize: '23px', fontWeight: 'bold' }}>Přidat hráče</Typography>
                    {/* <TextField sx={{ backgroundColor: customColors.white, borderRadius: '4px' }} variant="outlined" label="Zadejte jméno uživatele" value={textFieldValue} onChange={handleTextFieldChange} /> */}
                    <Box>
                        <Button fullWidth onClick={handleFriendsClick} sx={{color: customColors.white, backgroundColor: customColors.darkBackground, borderRadius: '10px', fontWeight: 'bold', ...buttonHoverDark }}>
                            {selectedPlayer || 'Zvolte přítele'}
                        </Button>
                        <Menu
                            id="friends-menu"
                            anchorEl={friendsAnchorEl}
                            open={Boolean(friendsAnchorEl)}
                            onClose={handleFriendsClose}
                            sx={{maxHeight: '300px'}} 
                            slotProps={{ paper: { style: { width: '100%', border: '2px solid ' + customColors.lightBackground  } } }}
                        >
                            {currentUser.friendList.map((item, index) => (
                                <MenuItem key={index} onClick={() => handleFriendsItemClick(item.username)}>
                                    {item.username}
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                    <Button sx={{ backgroundColor: customColors.black, color: customColors.white, ...buttonHoverDark }} onClick={handleAdd}>Přidat</Button>
                </Box>
            </Dialog>
            <Box sx={{ padding: '0 7%', mt: '20px', mb: '80px' }}>
                <Box sx={{ backgroundColor: customColors.black, borderRadius: '10px', padding: '15px' }}>
                    <Button sx={{ width: '100%', backgroundColor: customColors.white, borderRadius: '10px', color: customColors.black, fontWeight: 'bold', ...buttonHoverLight }} onClick={() => handleGameStart(selectedPlayground)} >
                        ZAČÍT HRU
                    </Button>
                </Box>
            </Box>
            <Box sx={{ position: 'fixed', bottom: '0', width: '100%' }}>
                <Footer></Footer>
            </Box>
        </Box>
    );
};

export default Lobby;