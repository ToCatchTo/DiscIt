import { Header } from '@/components/HeaderGroup/Header';
import { Banner } from '@/components/Banner';
import MainTheme, { customColors } from '@/styles/themes/mainThemeOptions';
import { Box, Button, Dialog, DialogTitle, Pagination, TextField, ThemeProvider, Typography } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import { NextPage } from 'next';
import * as React from 'react';
import { ZigZag } from '@/components/Zig-zag';
import { Footer } from '@/components/Footer';
import { useAddFriendMutation, useUsersQueryQuery } from '@/generated/graphql';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { CollectionReference, DocumentData, Firestore, collection, doc, getDocs, getFirestore, onSnapshot, query, updateDoc, where } from 'firebase/firestore';
import { useState } from 'react';
import { Friend, friendRequest } from './api/graphql';

const Friends: NextPage = () => {
    const pagesArray = ['Domů', 'Přátelé'];
    const hrefArray = ['/', '/friends'];
    const fileLevel = 2;
    const title = 'Přátelé';
    const perex = 'Lorem ipsum dolor sit amet, consectetuer adip iscing elit. Nullam Lorem ipsum dolor sit amet, consectetuer adip iscing elit. Nullam Lorem ipsum dolor sit amet, consectetuer.';

    let currentUserEmailDirty = localStorage.getItem('currentUserEmail');
    const currentUserEmail = (currentUserEmailDirty ?? "").slice(1, -1);
    const [addFriend] = useAddFriendMutation();
    const [friendList, setFriendList] = useState<Array<Friend>>([]);
    const [loadingFriends, setLoadingFriends] = useState(true);
    const [windowOpened, setWindowdOpen] = useState(false);
    let pageCount = friendList.length / 10 + 1;
    const [textFieldValue, setTextFieldValue] = useState("");
    let needToUpdateData = true;
    let friends: Array<Friend> = [];
    let usersRef: CollectionReference<DocumentData>;
    let firestore: Firestore;

    const handleTextFieldChange = (event: any) => {
        setTextFieldValue(event.target.value);
    };

    const UpdateToCurrentData = () => {
        const firestore = getFirestore();
        usersRef = collection(firestore, 'users');
    }

    const getFriends = async () => {
        let result = await getDocs(query(usersRef, where("email", "==", currentUserEmail)));
        let currentUserData = result.docs[0].data();
        const currentUserFriendList = currentUserData.friendList;

        let newFriendList: Array<Friend> = [];

        for (const item of currentUserFriendList) {
            result = await getDocs(query(usersRef, where("email", "==", item)));
            newFriendList.push({
                username: result.docs[0].data().username,
                email: result.docs[0].data().email,
            });
        }

        return newFriendList;
    };

    const fetchFriends = async () => {
        if(needToUpdateData) {
            UpdateToCurrentData();
            friends = await getFriends();
            needToUpdateData = false;
        }
        setFriendList(friends);
        setLoadingFriends(false);
    };

    React.useEffect(() => {
        fetchFriends();
    }, [friendList]);

    const handleDelete = async (targetUserEmail: any, currentUserEmail: any) => {
        let indexOfDelete = 0;
        const firestore = getFirestore();
        const usersRef = collection(firestore, 'users');
        let result = await getDocs(query(usersRef, where("email", "==", currentUserEmail)));

        friendList.forEach((user: any, index: any) => {
            if (user.email === targetUserEmail) {
                indexOfDelete = index;
            }
        });

        friendList.splice(indexOfDelete, 1);

        let emailList: string[] = [];
        friendList.forEach((item) => {
            emailList.push(item.email);
        });

        await updateDoc(doc(firestore, 'users', result.docs[0].id), {
            friendList: emailList,
        });

        needToUpdateData = true;
        await fetchFriends();
    }

    const sendFriendRequest = async (targetUsername: string) => {
        let result = await getDocs(query(usersRef, where("username", "==", targetUsername)));
        if(result.docs.length > 0) {
            let userId: string = result.docs[0].id;
            let friendRequest: friendRequest = {sender: "", state: ""};
            friendRequest.sender = userId;
            friendRequest.state = "pending";

            await updateDoc(doc(firestore, 'users', userId), {
                pendingRequests: friendRequest,
            });
            
            needToUpdateData = true;
            await fetchFriends();
        }
        else {
            alert("Uživatel nenalezen.");
        }
    }

    const handleWindowAppear = () => {
        if (windowOpened) {
            setWindowdOpen(false);
        }
        else {
            setWindowdOpen(true);
        }
    }

    const openDialongBtn = {
        "&:hover": {
            backgroundColor: customColors.lightBackground,
            color: customColors.black
        },
    };

    const sendRequestBtn = {
        "&:hover": {
            backgroundColor: customColors.darkBackground,
        },
    };

    return (
        <Box>
            <Header></Header>
            <Banner level={fileLevel} href={hrefArray} pageName={pagesArray} title={title} perex={perex} picturePath={'/media/banner-background.jpg'} imgBg={false} />
            <Box sx={{ display: "flex", margin: '0px 140px', flexWrap: 'wrap', columnGap: '1%', rowGap: '15px', mt: '30px' }}>
                {loadingFriends ? (
                    <Typography>Načítání přátel...</Typography>
                ) : (
                    friendList.map((item: any, index: any) => (
                        item.email !== currentUserEmail ? (
                            <Box key={index} sx={{ width: '49.5%', height: '70px', backgroundColor: customColors.black, borderRadius: '10px', padding: '15px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <Typography sx={{ color: customColors.white, fontSize: '25px', fontWeight: '500' }}>{item.username}</Typography>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                                    <Link href={'/profileDetail'} style={{ display: 'flex' }}>
                                        <AccountCircleIcon sx={{ height: '60px', width: '60px', color: customColors.white }} />
                                    </Link>
                                    <DeleteIcon onClick={() => handleDelete(item.email, currentUserEmail)} sx={{ height: '45px', width: '45px', color: customColors.white, cursor: 'pointer' }} />
                                </Box>
                            </Box>
                        ) : (
                            <Box key={item.email} sx={{ display: 'none' }}></Box>
                        )
                    ))
                )}
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', margin: '0px 140px', mt: '20px' }}>
                <Pagination count={pageCount} />
                <Button sx={{ backgroundColor: customColors.black, color: customColors.white, padding: '10px', borderRadius: '10px', ...openDialongBtn }} onClick={handleWindowAppear}>Přidat přítele</Button>
                <Dialog open={windowOpened} onClose={handleWindowAppear} fullWidth={true} maxWidth={'md'} PaperProps={{ sx: { borderRadius: '10px' } }} >
                    <Box sx={{ height: '100%', backgroundColor: customColors.lightBackground, display: 'flex', padding: '40px', flexDirection: 'column', gap: '20px' }}>
                        <Typography sx={{ color: customColors.black, fontSize: '23px', fontWeight: 'bold' }}>Přidat přítele</Typography>
                        <TextField sx={{ backgroundColor: customColors.white, borderRadius: '4px' }} variant="outlined" label="Zadejte jméno uživatele" value={textFieldValue} onChange={handleTextFieldChange} />
                        <Button sx={{ backgroundColor: customColors.black, color: customColors.white, ...sendRequestBtn }} onClick={() => sendFriendRequest(textFieldValue)} >Poslat žádost</Button>
                    </Box>
                </Dialog>
            </Box>
            <Box sx={{ position: 'absolute', bottom: '0', width: '100%' }}>
                <Footer />
            </Box>
        </Box>
    );
};

export default Friends;
