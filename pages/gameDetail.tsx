import { Header } from '@/components/HeaderGroup/Header';
import { Banner } from '@/components/Banner';
import MainTheme, { customColors, generalVariables } from '@/styles/themes/mainThemeOptions';
import { Box, Button, Dialog, DialogTitle, Pagination, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, ThemeProvider, Typography, useTheme } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import { NextPage } from 'next';
import * as React from 'react';
import { ZigZag } from '@/components/Zig-zag';
import { Footer } from '@/components/Footer';
import PinDropIcon from '@mui/icons-material/PinDrop';
import { CalendarMonth, DoNotStep, GolfCourse, Groups, LocalParking, Straighten } from '@mui/icons-material';
import { getFirestore, collection, getDocs, query, where } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { Playground, gameShots } from './api/graphql';

const GameDetail: NextPage = () => {
    const pagesArray = ['Domů', 'Detail hry'];
    const hrefArray = ['/', '/gameDetail'];
    const fileLevel = 2;
    const title = 'Detail hry';
    const perex = 'Lorem ipsum dolor sit amet, consectetuer adip iscing elit. Nullam Lorem ipsum dolor sit amet, consectetuer adip iscing elit. Nullam Lorem ipsum dolor sit amet, consectetuer.';
    const gameData = JSON.parse(localStorage.getItem('gameData') || '');
    const [currentPlayground, setCurrentPlayground] = useState<Playground>({ holesNumber: 0, isPublic: true, name: "", length: 0, parSum: 0 });
    const [shotStats, setShotStats] = useState<Array<gameShots>>([]);
    const [pointSum, setPointSum] = useState<Array<number>>([]);

    const fetchData = async () => {
        const firestore = getFirestore();
        const playgroundsRef = collection(firestore, 'playgrounds');
        let playgroundQuery = await getDocs(query(playgroundsRef, where("name", "==", gameData.playground)));
        let tempPlayground: Playground = { holesNumber: 0, isPublic: true, name: "", length: 0, parSum: 0 };

        tempPlayground.holesNumber = playgroundQuery.docs[0].data().holesNumber;
        tempPlayground.isPublic = playgroundQuery.docs[0].data().isPublic;
        tempPlayground.name = playgroundQuery.docs[0].data().name;
        tempPlayground.length = playgroundQuery.docs[0].data().length;
        tempPlayground.parSum = playgroundQuery.docs[0].data().parSum;

        setCurrentPlayground(tempPlayground);
        setShotStats(gameData.gameShotsList);

        for (let index = 0; index < gameData.players.length; index++) {
            pointSum.push(0);
        }

        for (let i = 0; i <= gameData.gameShotsList.length - 1; i++) {
            for (let index = 0; index <= pointSum.length - 1; index++) {
                pointSum[index] = pointSum[index] + gameData.gameShotsList[i].shots[index];
            }
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    const theme: any = useTheme();

    return (
        <Box>
            <Header></Header>
            <Banner level={fileLevel} href={hrefArray} pageName={pagesArray} title={title} perex={perex} picturePath={'/media/banner-background.jpg'} imgBg={false} />
            <Box sx={{
                padding: '30px 13%', display: 'flex', flexWrap: 'wrap', columnGap: '30px', justifyContent: 'center',
                [theme.breakpoints.down('sm')]: { flexDirection: 'column', padding: '30px 7%', rowGap: '10px' }
            }}>
                <Box sx={{ display: 'flex', gap: '10px', alignItems: 'center', fontSize: '24px', [theme.breakpoints.down('sm')]: { fontSize: '18px', justifyContent: 'center', flexDirection: 'column', gap: '0px' } }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                        <PinDropIcon fontSize={'large'} />
                        <Typography sx={{ fontWeight: 'bold', fontSize: '24px', [theme.breakpoints.down('sm')]: { fontSize: '18px' } }}>
                            Hřiště:
                        </Typography>
                    </Box>
                    {gameData.playground}
                </Box>
                <Box sx={{ display: 'flex', gap: '10px', alignItems: 'center', fontSize: '24px', [theme.breakpoints.down('sm')]: { fontSize: '18px', justifyContent: 'center' } }}>
                    <CalendarMonth fontSize={'large'} />
                    <Typography sx={{ fontWeight: 'bold', fontSize: '24px', [theme.breakpoints.down('sm')]: { fontSize: '18px' } }}>
                        Den:
                    </Typography>
                    {gameData.date}
                </Box>
                <Box sx={{ display: 'flex', gap: '10px', alignItems: 'center', fontSize: '24px', [theme.breakpoints.down('sm')]: { fontSize: '18px', justifyContent: 'center', flexDirection: 'column', gap: '0px' } }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                        <Groups fontSize={'large'} />
                        <Typography sx={{ fontWeight: 'bold', fontSize: '24px', [theme.breakpoints.down('sm')]: { fontSize: '18px' } }}>
                            Hráči:
                        </Typography>
                    </Box>
                    {gameData.players.join(', ')}
                </Box>
                <Box sx={{ display: 'flex', gap: '10px', alignItems: 'center', fontSize: '24px', [theme.breakpoints.down('sm')]: { fontSize: '18px', justifyContent: 'center' } }}>
                    <GolfCourse fontSize={'large'} />
                    <Typography sx={{ fontWeight: 'bold', fontSize: '24px', [theme.breakpoints.down('sm')]: { fontSize: '18px' } }}>
                        Počet jamek:
                    </Typography>
                    {currentPlayground.holesNumber}
                </Box>
                <Box sx={{ display: 'flex', gap: '10px', alignItems: 'center', fontSize: '24px', [theme.breakpoints.down('sm')]: { fontSize: '18px', justifyContent: 'center' } }}>
                    <LocalParking fontSize={'large'} />
                    <Typography sx={{ fontWeight: 'bold', fontSize: '24px', [theme.breakpoints.down('sm')]: { fontSize: '18px' } }}>
                        PAR hřiště:
                    </Typography>
                    {currentPlayground.parSum}
                </Box>
                <Box sx={{ display: 'flex', gap: '10px', alignItems: 'center', fontSize: '24px', [theme.breakpoints.down('sm')]: { fontSize: '18px', justifyContent: 'center' } }}>
                    <Straighten fontSize={'large'} />
                    <Typography sx={{ fontWeight: 'bold', fontSize: '24px', [theme.breakpoints.down('sm')]: { fontSize: '18px' } }}>
                        Délka:
                    </Typography>
                    {currentPlayground.length}
                </Box>
                <Box sx={{ display: 'flex', gap: '10px', alignItems: 'center', fontSize: '24px', [theme.breakpoints.down('sm')]: { fontSize: '18px', justifyContent: 'center' } }}>
                    <DoNotStep fontSize={'large'} />
                    <Typography sx={{ fontWeight: 'bold', fontSize: '24px', [theme.breakpoints.down('sm')]: { fontSize: '18px' } }}>
                        Dostupnost:
                    </Typography>
                    {currentPlayground.isPublic ? "Veřejné" : "Soukromé"}
                </Box>
            </Box>
            {shotStats.length > 0 ? (<TableContainer component={Paper} sx={{
                backgroundColor: customColors.white, border: '2px solid ' + customColors.black, margin: '0 13%', width: '74%', mb: '120px',
                [theme.breakpoints.down('sm')]: { width: '86%', margin: '0 7%', mb: '120px' }
            }}>
                <Table size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ padding: '5px 10px' }}>Hráči</TableCell>
                            {gameData.players.map((item: string) => (
                                <TableCell sx={{ padding: '5px 10px' }}>{item}</TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {gameData.gameShotsList.map((item: any, index: number) => (
                            <TableRow
                                key={index}
                                sx={{ '&:nth-child(odd)': { backgroundColor: customColors.lightBackground }, '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row" sx={{ padding: '5px 10px' }}>
                                    Jamka {index + 1}
                                </TableCell>

                                {/* {!row[index] || !row[index].shots ?
                                    (gameData.players.map(() => (
                                        <TableCell sx={{ padding: '7px 10px' }}>0</TableCell>
                                    ))) :
                                    (row[index].shots.map((item: any, index: number) => (
                                        <TableCell sx={{ padding: '7px 10px' }}>{item[index]}</TableCell>
                                    )))
                                } */}
                                {(shotStats[index].shots.map((item: any, i: number) => (
                                    <TableCell sx={{ padding: '7px 10px' }}>{item}</TableCell>
                                )))}
                            </TableRow>
                        ))}
                        <TableRow sx={{backgroundColor: customColors.black, borderBottom: '2px solid ' + customColors.black}}>
                                <TableCell component="th" scope="row" sx={{ padding: '5px 10px', color: customColors.white }}>
                                    Součet
                                </TableCell>
                            {pointSum.map((item: number) => (
                                <TableCell sx={{ padding: '7px 10px', color: customColors.white }}>{item}</TableCell>
                            ))}
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>) : <Typography>Načítání tabulky...</Typography>}
            <Box sx={{ position: 'fixed', bottom: '0', width: '100%' }}>
                <Footer />
            </Box>
        </Box >
    );
};

export default GameDetail;
