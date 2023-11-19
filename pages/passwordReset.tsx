import { ThemeProvider } from '@emotion/react';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import {
    Avatar,
    Box,
    Button,
    Checkbox,
    Container,
    FormControlLabel,
    Grid,
    Link,
    TextField,
    Typography,
} from '@mui/material';
import { NextPage } from 'next';
import NextLink from 'next/link';
import React, { FormEvent, useEffect, useState } from 'react';
import { authUtils } from '@/firebase/authUtils';
import mainTheme, { customColors } from '@/styles/themes/mainThemeOptions';
import { Header } from '@/components/HeaderGroup/Header';
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

const PasswordReset: NextPage = () => {
    const [email, setEmail] = useState('');
    const auth = getAuth();

    const triggerResetEmail = async () => {
        await sendPasswordResetEmail(auth, email);
        console.log("Password reset email sent")
      }

    const handleForm = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    };

    const buttonHover = {
        "&:hover": {
            backgroundColor: customColors.lightBackground,
            color: customColors.black
        },
    };

    return (
        <ThemeProvider theme={mainTheme}>
            <Header></Header>
            <Box
                width="100vw"
                height="100vh"
                top={0}
                sx={{ bgcolor: customColors.white, position: 'absolute', zIndex: -1 }}
            >
                <Container
                    component="main"
                    maxWidth="xs"
                    sx={{ pb: '2  5px', border: '2px solid black', borderRadius: '20px', mt: '10%' }}
                >
                    <Box
                        sx={{
                            padding: '25px 0',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: customColors.lightBackground }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Obnovení hesla
                        </Typography>
                        <Box
                            component="form"
                            onSubmit={handleForm}
                            noValidate
                            sx={{ mt: 1 }}
                        >
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Zadejte email adresu"
                                name="email"
                                autoComplete="email"
                                autoFocus
                                color="info"
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                onClick={triggerResetEmail}
                                sx={{ mt: 3, mb: 2, backgroundColor: customColors.black, color: customColors.white, ...buttonHover }}
                            >
                                Zaslat email
                            </Button>
                            <Grid container>
                                <Grid item>
                                    <Link component={NextLink} href="/login" variant="body2" sx={{ color: customColors.black, textDecorationColor: customColors.black }}>
                                        Vzpoměli jste si?
                                    </Link>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </Container>
            </Box>
        </ThemeProvider>
    );
};

export default PasswordReset;
