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
import { useUsersQueryQuery } from '@/generated/graphql';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { CollectionReference, DocumentData, Firestore, collection, doc, getDocs, getFirestore, onSnapshot, query, updateDoc, where } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { Friend, friendRequest } from './api/graphql';

const Friends: NextPage = () => {
    const pagesArray = ['Domů', 'Přátelé'];
    const hrefArray = ['/', '/friends'];
    const fileLevel = 2;
    const title = 'Přátelé';
    const perex = 'Lorem ipsum dolor sit amet, consectetuer adip iscing elit. Nullam Lorem ipsum dolor sit amet, consectetuer adip iscing elit. Nullam Lorem ipsum dolor sit amet, consectetuer.';

    let currentUserEmailDirty = localStorage.getItem('currentUserEmail');
    const currentUserEmail = (currentUserEmailDirty ?? "").slice(1, -1);
    const [friendList, setFriendList] = useState<Array<Friend>>([]);
    const [requestList, setRequestList] = useState<Array<friendRequest>>([]);
    const [loadingFriends, setLoadingFriends] = useState(true);
    const [addFriendWindowOpened, setWindowdOpen] = useState(false);
    const [requestsWindowOpened, setWindowOpen] = useState(false);
    let pageCount = Math.floor(friendList.length / 6 + 1);
    const [textFieldValue, setTextFieldValue] = useState("");
    let friends: Array<Friend> = [];
    const [needToUpdate, setNeedToUpdate] = useState(true);
    const [dataUpdate, setDataUpdate] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    let requests: Array<friendRequest> = [];
    let usersRef: CollectionReference<DocumentData>;

    const handleTextFieldChange = (event: any) => {
        setTextFieldValue(event.target.value);
    };

    const getFriends = async () => {
        const firestore = getFirestore();
        usersRef = collection(firestore, 'users');
        let result = await getDocs(query(usersRef, where("email", "==", currentUserEmail)));
        let currentUserData = result.docs[0].data();
        const currentUserFriendList = currentUserData.friendList;
        let currentUserRequestList = currentUserData.pendingRequests;

        let newFriendList: Array<Friend> = [];

        if (dataUpdate) {
            newFriendList = friendList;
            currentUserRequestList = requestList;
            setDataUpdate(false);
        }
        else {
            for (const item of currentUserFriendList) {
                result = await getDocs(query(usersRef, where("email", "==", item.email)));
                newFriendList.push({
                    username: result.docs[0].data().username,
                    email: result.docs[0].data().email,
                });
            }
        }

        return { newFriendList, currentUserRequestList };
    };

    useEffect(() => {
        const fetchFriends = async () => {
            if (needToUpdate) {
                console.log("Fetching...");
                friends = (await getFriends()).newFriendList;
                requests = (await getFriends()).currentUserRequestList;
                setNeedToUpdate(false);
                setFriendList(friends);
                setRequestList(requests);
                setLoadingFriends(false);
            }
        };

        const intervalId = setInterval(() => {
            fetchFriends();
        }, 1000);

        return () => clearInterval(intervalId);

    }, [needToUpdate, currentPage]);

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

        await updateDoc(doc(firestore, 'users', result.docs[0].id), {
            friendList: friendList,
        });

        setNeedToUpdate(true);
    }

    const sendFriendRequest = async (targetUsername: string) => {
        const firestore = getFirestore();
        const usersRef = collection(firestore, 'users');
        let targetUser = await getDocs(query(usersRef, where("username", "==", targetUsername)));
        let currentUser = await getDocs(query(usersRef, where("email", "==", currentUserEmail)));

        if (targetUser.docs.length > 0) {
            let userId: string = targetUser.docs[0].id;
            let pendingRequests: Array<friendRequest> = targetUser.docs[0].data().pendingRequests;
            let friendRequest: friendRequest = { sender: "", state: "" };
            friendRequest.sender = currentUser.docs[0].id;
            friendRequest.state = "pending";

            pendingRequests.push(friendRequest);
            await updateDoc(doc(firestore, 'users', userId), {
                pendingRequests: pendingRequests,
            });
            setRequestList(pendingRequests);
            setNeedToUpdate(true);
        }
        else {
            alert("Uživatel nenalezen.");
        }
    }

    const handleAddFriendWindowAppear = () => {
        if (addFriendWindowOpened) {
            setWindowdOpen(false);
        }
        else {
            setWindowdOpen(true);
        }
    }

    const handleRequestsWindowAppear = () => {
        if (requestsWindowOpened) {
            setWindowOpen(false);
        }
        else {
            setWindowOpen(true);
        }
    }

    const handleRequest = async (index: number, isAccepted: boolean) => {
        const firestore = getFirestore();
        const usersRef = collection(firestore, 'users');
        let sender = (await getDocs(query(usersRef, where("email", "==", currentUserEmail)))).docs[0].data().pendingRequests[index].sender;
        let senderEmail: any = [];
        let senderUsername: any = [];
        let currentUserId = "";

        (await getDocs(query(usersRef))).docs.forEach((user) => {
            if (user.data().email == currentUserEmail) {
                currentUserId = user.id;
            }
            if (user.id == sender) {
                senderEmail = user.data().email;
                senderUsername = user.data().username;
            }
        })

        let newFriendList = friendList;
        let newRequestList = requestList;
        newRequestList.splice(index, 1);

        if (isAccepted) {
            newFriendList.push({ email: senderEmail, username: senderUsername });
            setFriendList(newFriendList);
            setRequestList(newRequestList);

            let senderFriendList = (await getDocs(query(usersRef, where("email", "==", senderEmail)))).docs[0].data().friendList;
            let currentUsername = (await getDocs(query(usersRef, where("email", "==", currentUserEmail)))).docs[0].data().username;

            senderFriendList.push({ email: currentUserEmail, username: currentUsername });

            await updateDoc(doc(firestore, 'users', sender), {
                friendList: senderFriendList
            });
        }
        else {
            setRequestList(newRequestList);
        }

        await updateDoc(doc(firestore, 'users', currentUserId), {
            pendingRequests: newRequestList,
            friendList: newFriendList
        });

        setDataUpdate(true);
        setNeedToUpdate(true);
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

    let testarray: any = [];
    testarray = friendList;
    console.log(testarray.slice(0, 1));

    return (
        <Box>
            <Header></Header>
            <Banner level={fileLevel} href={hrefArray} pageName={pagesArray} title={title} perex={perex} picturePath={'/media/banner-background.jpg'} imgBg={false} />
            <Box sx={{ display: 'flex', margin: generalVariables.contentPadding, mt: '30px' }}>
                <Button sx={{ backgroundColor: customColors.black, color: customColors.white, padding: '10px', borderRadius: '10px', ...openDialongBtn }} onClick={handleRequestsWindowAppear}>Žádosti o přátelství</Button>
                <Dialog key={0} open={requestsWindowOpened} onClose={handleRequestsWindowAppear} fullWidth={true} maxWidth={'md'} PaperProps={{ sx: { borderRadius: '10px' } }} >
                    <Box sx={{ height: '100%', backgroundColor: customColors.lightBackground, display: 'flex', padding: '40px', flexDirection: 'column', gap: '20px' }}>
                        <Typography sx={{ color: customColors.black, fontSize: '23px', fontWeight: 'bold' }}>Žádosti o přátelství</Typography>
                        <Box sx={{ display: 'flex', width: '100%', gap: '10px', flexDirection: 'column' }}>
                            {requestList.length == 0 ? (
                                <Typography sx={{ color: customColors.black }}>Nemáš žádné žádosti</Typography>
                            ) : (
                                requestList.map((item: any, index: any) => (
                                    <Box key={index} sx={{ display: 'flex', flexWrap: 'nowrap', backgroundColor: customColors.black, alignItems: 'center', borderRadius: '10px', padding: '10px', width: '100%', justifyContent: 'space-between' }}>
                                        <Typography><b>Žádost od:</b> {item.sender}</Typography>
                                        <Box sx={{ display: 'flex', gap: '30px' }}>
                                            <Button sx={{ backgroundColor: 'green', color: customColors.black, ...openDialongBtn }} onClick={() => handleRequest(index, true)}>Přijmout</Button>
                                            <Button sx={{ backgroundColor: 'red', color: customColors.black, ...openDialongBtn }} onClick={() => handleRequest(index, false)}>Odmítnout</Button>
                                        </Box>
                                    </Box>
                                )))}
                        </Box>
                    </Box>
                </Dialog>
            </Box>
            <Box sx={{ display: "flex", margin: generalVariables.contentPadding, flexWrap: 'wrap', columnGap: '1%', rowGap: '15px', mt: '30px' }}>
                {loadingFriends ? (
                    <Typography>Načítání přátel...</Typography>
                ) : (
                    friendList.length == 0 ? (
                        <Typography sx={{ color: customColors.black }}>Nemáš žádné přátele</Typography>
                    ) : (
                        friendList.slice((currentPage - 1) * 6, 6 * currentPage).map((item: any, index: any) => (
                            item.email !== currentUserEmail ? (
                                <Box key={index} sx={{ width: '49.5%', height: '70px', backgroundColor: customColors.black, borderRadius: '10px', padding: '15px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <Typography sx={{ color: customColors.white, fontSize: '25px', fontWeight: '500' }}>{item.username}</Typography>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                                        <AccountCircleIcon sx={{ height: '60px', width: '60px', color: customColors.white }} />
                                        <DeleteIcon onClick={() => handleDelete(item.email, currentUserEmail)} sx={{ height: '45px', width: '45px', color: customColors.white, cursor: 'pointer' }} />
                                    </Box>
                                </Box>
                            ) : (
                                <Box key={item.email} sx={{ display: 'none' }}></Box>
                            )
                        )))
                )}
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', margin: generalVariables.contentPadding, mt: '20px' }}>
                <Pagination count={pageCount} page={currentPage} onChange={(event, page) => setCurrentPage(page)} />
                <Button sx={{ backgroundColor: customColors.black, color: customColors.white, padding: '10px', borderRadius: '10px', ...openDialongBtn }} onClick={handleAddFriendWindowAppear}>Přidat přítele</Button>
                <Dialog key={1} open={addFriendWindowOpened} onClose={handleAddFriendWindowAppear} fullWidth={true} maxWidth={'md'} PaperProps={{ sx: { borderRadius: '10px' } }} >
                    <Box sx={{ height: '100%', backgroundColor: customColors.lightBackground, display: 'flex', padding: '40px', flexDirection: 'column', gap: '20px' }}>
                        <Typography sx={{ color: customColors.black, fontSize: '23px', fontWeight: 'bold' }}>Přidat přítele</Typography>
                        <TextField sx={{ backgroundColor: customColors.white, borderRadius: '4px' }} variant="outlined" label="Zadejte jméno uživatele" value={textFieldValue} onChange={handleTextFieldChange} />
                        <Button sx={{ backgroundColor: customColors.black, color: customColors.white, ...sendRequestBtn }} onClick={() => sendFriendRequest(textFieldValue)} >Poslat žádost</Button>
                    </Box>
                </Dialog>
            </Box>
            <Box sx={{ width: '100%', pt: '30px', position: 'absolute', bottom: '0px' }}>
                <Footer />
            </Box>
        </Box>
    );
};

export default Friends;
