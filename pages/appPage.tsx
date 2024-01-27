import { Header } from '@/components/HeaderGroup/Header';
import { Banner } from '@/components/Banner';
import MainTheme, { customColors } from '@/styles/themes/mainThemeOptions';
import { Box, Button, Dialog, TextField, ThemeProvider, Typography, useTheme } from '@mui/material';
import { NextPage } from 'next';
import * as React from 'react';
import { ZigZag } from '@/components/Zig-zag';
import { Footer } from '@/components/Footer';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Player, Playground, SavedGame, gameShots } from './api/graphql';
import { useEffect, useState } from 'react';
import { addDoc, collection, doc, getDocs, getFirestore, query, updateDoc, where } from 'firebase/firestore';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { useRouter } from 'next/router';

let playerIndex = 0;
let currentPlayground: Playground = { holesNumber: 0, isPublic: true, name: "", length: 0, parSum: 0 };
let gameShotsList: Array<gameShots> = [];

const AppPage: NextPage = () => {
  const lobbyList: string = localStorage.getItem('lobbyList') || '';
  const selectedPlayground = localStorage.getItem('selectedPlayground');
  let playersList: Array<Player> = [];
  const [throwsList, setThrowsList] = useState<Array<number>>([]);
  const [numberOfShots, setNumberOfShots] = useState(0);
  const [currentHole, setCurrentHole] = useState(0);
  const [parNumber, setParNumber] = useState("0");
  const [windowOpened, setWindowOpened] = useState(false);
  const router = useRouter();
  let nameList: Array<string> = [];

  if (lobbyList) {
    playersList = JSON.parse(lobbyList);
  }

  const [currentPlayer, setCurrentPlayer] = useState(playersList[0].username);
  const [nextPlayer, setNextPlayer] = useState("");
  let currentUserEmailDirty = localStorage.getItem('currentUserEmail');
  const currentUserEmail = (currentUserEmailDirty ?? "").slice(1, -1);

  playersList.forEach(item => {
    nameList.push(item.username);
  });

  const getCurrentPlayground = async () => {
    const firestore = getFirestore();
    const playgroundsRef = collection(firestore, 'playgrounds');
    let playgroundQuery = await getDocs(query(playgroundsRef, where("name", "==", (selectedPlayground ?? "").slice(1, -1))));
    currentPlayground.holesNumber = playgroundQuery.docs[0].data().holesNumber;
    currentPlayground.isPublic = playgroundQuery.docs[0].data().isPublic;
    currentPlayground.name = playgroundQuery.docs[0].data().name;
    currentPlayground.length = playgroundQuery.docs[0].data().length;
    currentPlayground.parSum = playgroundQuery.docs[0].data().parSum;

    for (let i = 0; i <= currentPlayground.holesNumber - 1; i++) {
      let tempList = [];
      for (let i = 0; i <= playersList.length - 1; i++) {
        tempList.push(0);
      }

      gameShotsList.push({ shots: tempList });
    }
  }

  useEffect(() => {
    if (playerIndex === playersList.length - 1) {
      setNextPlayer(playersList[0].username);
    }
    else {
      setNextPlayer(playersList[1].username);
    }

    for (let i = 0; i <= playersList.length - 1; i++) {
      throwsList.push(0);
    }

    getCurrentPlayground();
  }, []);

  const handlePlayerOrder = async () => {
    let tempList = throwsList;
    tempList[playerIndex] = numberOfShots;
    setThrowsList(tempList);

    if (playerIndex == playersList.length - 1) {
      playerIndex = 0;
    }
    else {
      playerIndex++;
    }

    setNumberOfShots(throwsList[playerIndex]);
    setCurrentPlayer(playersList[playerIndex].username);
    if (playerIndex + 1 > playersList.length - 1) {
      setNextPlayer(playersList[0].username);
    }
    else {
      setNextPlayer(playersList[playerIndex + 1].username);
    }
  }

  const handleShots = (operation: string) => {
    if (operation === "add") {
      setNumberOfShots(numberOfShots + 1);
    }
    else {
      setNumberOfShots(numberOfShots - 1);
    }
  }

  const handleRoundSave = () => {
    if (parNumber === undefined || parNumber == "" || parNumber == "0") {
      alert("Prosím zadejte PAR, který je na této jamce");
    }
    else {
      for (let i = 0; i <= throwsList.length - 1; i++) {
        console.log(throwsList[i]);
        console.log(parNumber);
        throwsList[i] = throwsList[i] - parseInt(parNumber);
        console.log(throwsList[i]);
      }

      gameShotsList[currentHole] = { shots: throwsList };
      if (currentHole + 1 === currentPlayground.holesNumber) {
        alert("Toto je poslední jamka, prosím ukončete hru");
      }
      else {
        setCurrentHole(currentHole + 1);
        setThrowsList(Array(throwsList.length).fill(0));
        setNumberOfShots(0);
      }
    }
  }

  const handleTextFieldChange = (event: any) => {
    const value = event.target.value;

    if (value === "" || (/^\d*$/.test(value) && parseInt(value, 10) < 10 && parseInt(value, 10) > 0)) {
      setParNumber(value);
    }
  };

  const handleSaveWindowAppear = () => {
    if (windowOpened) {
      setWindowOpened(false);
    }
    else {
      setWindowOpened(true);
    }
  }

  const handleSaveGame = async (saveGame: boolean) => {
    if (saveGame) {
      const firestore = getFirestore();
      const usersRef = collection(firestore, 'users');
      const savedGamesRef = collection(firestore, 'savedGames');

      const currentDate = (new Date().getDate() + "." + (new Date().getMonth() + 1) + "/" + new Date().getFullYear()).toString();
      let currentGameStats: SavedGame = { date: currentDate, playground: (selectedPlayground ?? "").slice(1, -1), gameShotsList: gameShotsList, players: nameList };
      const docRef = await addDoc(savedGamesRef, currentGameStats);

      playersList.forEach(async (item) => {
        const currentUser = (await getDocs(query(usersRef, where("username", "==", item.username))));
        const currentUserId = currentUser.docs[0].id;
        const newGamesSaved = currentUser.docs[0].data().gamesSaved;
        newGamesSaved.push('/savedGames/' + docRef.id);

        await updateDoc(doc(firestore, 'users', currentUserId), {
          gamesSaved: newGamesSaved
        });
      })

      router.push('/gamesList');
    }
    else {
      router.push('/');
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
      backgroundColor: customColors.darkBackground,
      color: customColors.white
    },
  };

  const theme: any = useTheme();

  return (
    <Box>
      <Header></Header>
      <Box sx={{ display: 'flex', flexDirection: 'column', padding: '7%', gap: '10px', mb: '60px' }}>
        <Typography fontSize='24px' fontWeight='bold' textAlign='center'>Jamka {currentHole + 1}</Typography>
        <Box sx={{ display: 'flex', flexDirection: 'row', columnGap: '10px' }}>
          <Box sx={{ display: 'flex', width: '100%', flexDirection: 'column' }}>
            <Typography fontWeight='bold'>Hraje:</Typography>
            <Box sx={{ backgroundColor: customColors.black, color: customColors.white, padding: '15px', borderRadius: '10px' }}>
              {currentPlayer}
            </Box>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Typography fontWeight='bold' sx={{ whiteSpace: 'nowrap' }}>Počet hodů:</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', columnGap: '5px' }}>
              <Box component='button' onClick={() => handleShots("minus")} sx={{
                backgroundColor: customColors.black, color: customColors.white, padding: '15px', borderRadius: '10px', textAlign: 'center',
                height: '34px', width: '34px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: 'none', ...buttonHoverLight
              }}>
                -
              </Box>
              <Box sx={{
                backgroundColor: customColors.black, color: customColors.white, padding: '15px', borderRadius: '10px', textAlign: 'center',
                height: '54px', width: '54px'
              }}>
                {numberOfShots}
              </Box>
              <Box component='button' onClick={() => handleShots("add")} sx={{
                backgroundColor: customColors.black, color: customColors.white, padding: '15px', borderRadius: '10px', textAlign: 'center',
                height: '34px', width: '34px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: 'none', ...buttonHoverLight
              }}>
                +
              </Box>
            </Box>
          </Box>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography fontWeight='bold'>Další hraje:</Typography>
          <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', columnGap: '10px' }}>
            <Box sx={{ backgroundColor: customColors.black, color: customColors.white, padding: '15px', borderRadius: '10px', width: '100%' }}>
              {nextPlayer}
            </Box>
            <Box component='button' onClick={handlePlayerOrder} sx={{
              backgroundColor: customColors.black, color: customColors.white, padding: '15px', borderRadius: '10px', height: '54px',
              width: '54px', display: 'flex', justifyContent: 'center', alignItems: 'center', border: 'none', ...buttonHoverLight
            }}>
              <ChevronRightIcon sx={{ height: '20px', width: '20px' }} />
            </Box>
          </Box>
        </Box>
        <Box>
          <Typography fontWeight='bold'>Hřiště:</Typography>
          <Box sx={{ backgroundColor: customColors.black, color: customColors.white, padding: '15px', borderRadius: '10px', width: '100%' }}>
            {(selectedPlayground ?? "").slice(1, -1)}
          </Box>
        </Box>
        <Box sx={{ mt: '15px', display: 'flex', justifyContent: 'center' }}>
          <TextField sx={{
            width: '50%',
            [theme.breakpoints.down('sm')]: { width: '100%' }
          }} label="Zadejte PAR hřiště" value={parNumber} onChange={handleTextFieldChange}></TextField>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', columnGap: '10px', justifySelf: 'flex-end', mt: '15px' }}>
          <Box sx={{ backgroundColor: customColors.black, color: customColors.white, padding: '15px', borderRadius: '10px', width: '100%' }}>
            Další jamka
          </Box>
          <Box component='button' onClick={handleRoundSave} sx={{
            backgroundColor: customColors.black, color: customColors.white, padding: '15px', borderRadius: '10px', height: '54px',
            width: '54px', display: 'flex', justifyContent: 'center', alignItems: 'center', border: 'none', ...buttonHoverLight
          }}>
            <ChevronRightIcon sx={{ height: '20px', width: '20px' }} />
          </Box>
        </Box>
        <Box component='button' onClick={handleSaveWindowAppear} sx={{ backgroundColor: customColors.black, color: customColors.white, padding: '15px', borderRadius: '10px', width: '100%', justifyContent: 'center', display: 'flex', alignItems: 'center', gap: '10px', border: 'none', fontFamily: "'Roboto','Helvetica','Arial','sans-serif'", fontSize: '16px' }}>
          KONEC HRY
          <ExitToAppIcon sx={{ height: '20px', width: '20px' }} />
        </Box>
        <Dialog open={windowOpened} onClose={handleSaveWindowAppear} fullWidth={true} maxWidth={'md'} sx={{
          padding: '0 15%',
          [theme.breakpoints.down('sm')]: { padding: '0 0%' }
        }} PaperProps={{ sx: { borderRadius: '10px' } }} >
          <Box sx={{
            height: '100%', backgroundColor: customColors.lightBackground, display: 'flex', padding: '30px', gap: '20px',
            justifyContent: 'center', flexDirection: 'column', alignItems: 'center',
            [theme.breakpoints.down('sm')]: { padding: '15px', alignItems: 'center' },
          }}>
            <Typography color={customColors.black} sx={{ textAlign: 'center' }}>Chcete si odehranou hru uložit?</Typography>
            <Box sx={{
              width: '100%', display: 'flex', gap: '10px',
              [theme.breakpoints.down('sm')]: { flexDirection: 'column', alignItems: 'center' }
            }}>
              <Button onClick={() => handleSaveGame(true)} sx={{
                backgroundColor: customColors.black, color: customColors.white, width: '50%', ...buttonHoverDark,
                [theme.breakpoints.down('sm')]: { width: '90%' }
              }}>Uložit hru</Button>
              <Button onClick={() => handleSaveGame(false)} sx={{
                backgroundColor: customColors.black, color: customColors.white, width: '50%', ...buttonHoverDark,
                [theme.breakpoints.down('sm')]: { width: '90%' }
              }}>Zahodit</Button>
            </Box>
          </Box>
        </Dialog>
      </Box>
      <Box sx={{ position: 'fixed', bottom: '0', width: '100%' }}>
        <Footer></Footer>
      </Box>
    </Box>
  );
};

export default AppPage;