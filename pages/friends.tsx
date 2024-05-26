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
    const [deleteWindowOpened, setDeleteWindowOpened] = useState(false);
    let pageCount = Math.floor(friendList.length / 6 + 1);
    const [textFieldValue, setTextFieldValue] = useState("");
    let friends: Array<Friend> = [];
    const [needToUpdate, setNeedToUpdate] = useState(true);
    const [dataInitialize, setDataInitialize] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [isButtonClicked, setIsButtonClicked] = useState(false);
    let requests: Array<friendRequest> = [];
    let usersRef: CollectionReference<DocumentData>;

    const handleTextFieldChange = (event: any) => {
        setTextFieldValue(event.target.value);
    };

    const getFriends = async () => {
        const firestore = getFirestore();
        usersRef = collection(firestore, 'users');

        const unsubscribe = onSnapshot(usersRef, (querySnapshot) => {
            querySnapshot.forEach(() => {
                setNeedToUpdate(true);
            });
        });

        let result = await getDocs(query(usersRef, where("email", "==", currentUserEmail)));
        let currentUserData = result.docs[0].data();
        const currentUserFriendList = currentUserData.friendList;
        let currentUserRequestList = currentUserData.pendingRequests;

        return { currentUserFriendList, currentUserRequestList };
    };

    useEffect(() => {
        const fetchFriends = async () => {
            if (needToUpdate) {
                friends = (await getFriends()).currentUserFriendList;
                requests = (await getFriends()).currentUserRequestList;
                setNeedToUpdate(false);
                setFriendList(friends);
                setRequestList(requests);
                setLoadingFriends(false);
            }
        };

        fetchFriends();
    }, [currentPage, needToUpdate]);

    const handleDelete = async (targetUserEmail: any, currentUserEmail: any) => {
        let indexOfDelete = 0;
        const firestore = getFirestore();
        const usersRef = collection(firestore, 'users');
        let currentUserQuery = await getDocs(query(usersRef, where("email", "==", currentUserEmail)));

        friendList.forEach((user: any, index: any) => {
            if (user.email === targetUserEmail) {
                indexOfDelete = index;
            }
        });

        friendList.splice(indexOfDelete, 1);

        await updateDoc(doc(firestore, 'users', currentUserQuery.docs[0].id), {
            friendList: friendList,
        });

        setNeedToUpdate(true);
    }

    const sendFriendRequest = async (targetUsername: string) => {
        const firestore = getFirestore();
        const usersRef = collection(firestore, 'users');
        let targetUser = await getDocs(query(usersRef, where("username", "==", targetUsername)));
        let currentUser = await getDocs(query(usersRef, where("email", "==", currentUserEmail)));
        let alreadyFriended = false;

        // targetUser.docs[0].data().pendingRequests.forEach((request: any) => {
        //     if (request.username == currentUser.docs[0].data().username) {
        //         alreadyFriended = true;
        //     }
        // })

        if (!alreadyFriended) {
            friendList.forEach((friend: any) => {
                if (friend.username == targetUsername) {
                    alreadyFriended = true;
                }
            })
        }

        if (targetUser.docs.length > 0 && currentUser.docs[0].data().username != targetUsername && !alreadyFriended) {
            let userId: string = targetUser.docs[0].id;
            let pendingRequests: Array<friendRequest> = targetUser.docs[0].data().pendingRequests;
            let friendRequest: friendRequest = { sender: "", state: "", username: "" };
            friendRequest.sender = currentUser.docs[0].id;
            friendRequest.state = "pending";
            friendRequest.username = currentUser.docs[0].data().username;

            pendingRequests.push(friendRequest);
            await updateDoc(doc(firestore, 'users', userId), {
                pendingRequests: pendingRequests,
            });
            setRequestList(pendingRequests);
            setNeedToUpdate(true);
            alert("Žádost odeslána.");
        }
        else if (currentUser.docs[0].data().username == targetUsername) {
            alert("Do přátel si nemůžete přidat sám sebe.");
        }
        else if (alreadyFriended) {
            alert("Každého uživatele můžeš mít v přátelích jen jednou");
        }
        else {
            alert("Uživatel nenalezen. Prosím zadávejte jméno uživatele.");
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
        setIsButtonClicked(true);
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
            setRequestList(newRequestList);

            let senderFriendList = (await getDocs(query(usersRef, where("email", "==", senderEmail)))).docs[0].data().friendList;
            let currentUsername = (await getDocs(query(usersRef, where("email", "==", currentUserEmail)))).docs[0].data().username;

            senderFriendList.push({ email: currentUserEmail, username: currentUsername })
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

        setFriendList(newFriendList);
        setNeedToUpdate(true);
    }

    const openDialongAcceptBtn = {
        "&:hover": {
            backgroundColor: '#66b266',
            color: customColors.black
        },
    };

    const openDialongDeclineBtn = {
        "&:hover": {
            backgroundColor: '#ff4c4c',
            color: customColors.black
        },
    };

    const hoverDarker = {
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

    const theme: any = useTheme();

    return (
        <Box>
            <Header></Header>
            <Banner level={fileLevel} href={hrefArray} pageName={pagesArray} title={title} perex={perex} picturePath={'/media/banner-background.jpg'} imgBg={false} />
            <Box sx={{
                display: 'flex', padding: generalVariables.contentPadding, mt: '30px',
                [theme.breakpoints.down('md')]: { padding: '0 7%' }
            }}>
                <Button sx={{ backgroundColor: customColors.black, color: customColors.white, padding: '10px', borderRadius: '10px', ...hoverDarker }} onClick={handleRequestsWindowAppear}>Žádosti o přátelství</Button>
                <Dialog key={0} open={requestsWindowOpened} onClose={handleRequestsWindowAppear} fullWidth={true} maxWidth={'md'} PaperProps={{ sx: { borderRadius: '10px' } }} >
                    <Box sx={{
                        height: '100%', backgroundColor: customColors.lightBackground, display: 'flex', padding: '40px', flexDirection: 'column', gap: '20px',
                        [theme.breakpoints.down('sm')]: { padding: '20px' }
                    }}>
                        <Typography sx={{ color: customColors.black, fontSize: '23px', fontWeight: 'bold' }}>Žádosti o přátelství</Typography>
                        <Box sx={{ display: 'flex', width: '100%', gap: '10px', flexDirection: 'column' }}>
                            {requestList.length == 0 ? (
                                <Typography sx={{ color: customColors.black }}>Nemáš žádné žádosti</Typography>
                            ) : (
                                requestList.map((item: any, index: any) => (
                                    <Box key={index} sx={{
                                        display: 'flex', flexWrap: 'nowrap', backgroundColor: customColors.black, alignItems: 'center', borderRadius: '10px', padding: '10px', width: '100%', justifyContent: 'space-between',
                                        [theme.breakpoints.down('sm')]: { flexDirection: 'column', flexWrap: 'wrap', gap: '10px', textAlign: 'center' }
                                    }}>
                                        <Typography><b>Žádost od:</b> {item.username}</Typography>
                                        <Box sx={{
                                            display: 'flex', gap: '30px',
                                            [theme.breakpoints.down('sm')]: { gap: '10px' }
                                        }}>
                                            <Button key={index} sx={{ backgroundColor: '#008000', color: customColors.black, ...openDialongAcceptBtn }} onClick={() => handleRequest(index, true)}>Přijmout</Button>
                                            <Button key={index} sx={{ backgroundColor: '#ff0000', color: customColors.black, ...openDialongDeclineBtn }} onClick={() => handleRequest(index, false)}>Odmítnout</Button>
                                        </Box>
                                    </Box>
                                )))}
                        </Box>
                    </Box>
                </Dialog>
            </Box>
            <Box sx={{
                display: "flex", padding: generalVariables.contentPadding, flexWrap: 'wrap', columnGap: '1%', rowGap: '15px', mt: '30px',
                [theme.breakpoints.down('md')]: { padding: '0 7%' }
            }}>
                {loadingFriends ? (
                    <Typography>Načítání přátel...</Typography>
                ) : (
                    friendList.length == 0 ? (
                        <Typography sx={{ color: customColors.black }}>Nemáš žádné přátele</Typography>
                    ) : (
                        friendList.slice((currentPage - 1) * 6, 6 * currentPage).map((item: any, index: any) => (
                            item.email !== currentUserEmail ? (
                                <Box key={index} sx={{
                                    width: '49.5%', height: '70px', backgroundColor: customColors.black, borderRadius: '10px', padding: '15px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                                    [theme.breakpoints.down('md')]: { width: '100%' }
                                }}>
                                    <Typography sx={{
                                        color: customColors.white, fontSize: '25px', fontWeight: '500',
                                        [theme.breakpoints.down('sm')]: { fontSize: '20px' }
                                    }}>{item.username}</Typography>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: '20px', [theme.breakpoints.down('sm')]: { gap: '10px' } }}>
                                        <AccountCircleIcon sx={{
                                            height: '60px', width: '60px', color: customColors.white,
                                            [theme.breakpoints.down('sm')]: { height: '40px', width: '40px' }
                                        }} />
                                        <DeleteIcon onClick={() => handleDelete(item.email, currentUserEmail)} sx={{
                                            height: '45px', width: '45px', color: customColors.white, cursor: 'pointer',
                                            [theme.breakpoints.down('sm')]: { height: '35px', width: '35px' }
                                        }} />
                                    </Box>
                                </Box>
                            ) : (
                                <Box key={item.email} sx={{ display: 'none' }}></Box>
                            )
                        )))
                )}
            </Box>
            <Box sx={{
                display: 'flex', justifyContent: 'space-between', padding: generalVariables.contentPadding, mt: '20px', mb: '80px',
                [theme.breakpoints.down('sm')]: { flexDirection: 'column', alignItems: 'center', gap: '10px' },
                [theme.breakpoints.down('md')]: { padding: '0 7%' }
            }}>
                <Pagination count={pageCount} page={currentPage} onChange={(event, page) => setCurrentPage(page)} />
                <Button sx={{ backgroundColor: customColors.black, color: customColors.white, padding: '10px', borderRadius: '10px', ...hoverDarker }} onClick={handleAddFriendWindowAppear}>Přidat přítele</Button>
                <Dialog key={1} open={addFriendWindowOpened} onClose={handleAddFriendWindowAppear} fullWidth={true} maxWidth={'md'} PaperProps={{ sx: { borderRadius: '10px' } }} >
                    <Box sx={{
                        height: '100%', backgroundColor: customColors.lightBackground, display: 'flex', padding: '40px', flexDirection: 'column', gap: '20px',
                        [theme.breakpoints.down('sm')]: { padding: '20px' }
                    }}>
                        <Typography sx={{ color: customColors.black, fontSize: '23px', fontWeight: 'bold' }}>Přidat přítele</Typography>
                        <TextField sx={{ backgroundColor: customColors.white, borderRadius: '4px' }} variant="outlined" label="Zadejte jméno uživatele" value={textFieldValue} onChange={handleTextFieldChange} />
                        <Button sx={{ backgroundColor: customColors.black, color: customColors.white, ...sendRequestBtn }} onClick={() => sendFriendRequest(textFieldValue)} >Poslat žádost</Button>
                    </Box>
                </Dialog>
            </Box>
            <Box sx={{ position: 'fixed', bottom: '0', width: '100%' }}>
                <Footer />
            </Box>
        </Box>
    );
};

export default Friends;
