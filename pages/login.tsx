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
import React, { FormEvent, useState } from 'react';
import { authUtils } from '@/firebase/authUtils';
import mainTheme, { customColors } from '@/styles/themes/mainThemeOptions';
import { Header } from '@/components/HeaderGroup/Header';

export let isLoggedIn: Boolean;

const Login: NextPage = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [email, setEmail] = useState('');
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [password, setPassword] = useState('');

  const handleForm = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const loginResult = await authUtils.login(email, password);
    isLoggedIn = loginResult;
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
          sx={{ pb: '2  5px', border: '2px solid black', borderRadius: '20px', mt: '10%'}}
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
              Přihlášení
            </Typography>
            <Box
              component="form"
              onSubmit={handleForm}
              noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                sx={{'& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    border: '1px solid black',
                  },}}}
                margin="normal"
                required
                fullWidth
                id="email"
                label="Zadejte email adresu"
                name="email"
                autoComplete="email"
                autoFocus
                color="info"
                onChange={(e) => {
                  const { value } = e.target;
                  setEmail(value);
                }}
              />
              <TextField
                sx={{'& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    border: '1px solid black',
                  },}}}
                margin="normal"
                required
                fullWidth
                name="password"
                label="Zadejte heslo"
                type="password"
                id="password"
                autoComplete="current-password"
                color="info"
                onChange={(e) => {
                  const { value } = e.target;
                  setPassword(value);
                }}
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="info" />}
                label="Zapamatovat si mě"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, backgroundColor: customColors.black, color: customColors.white, ...buttonHover }}
              >
                Přihlásit se
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link component={NextLink} href="#" variant="body2" sx={{color: customColors.black, textDecorationColor: customColors.black}}>
                    Zapomněli jste heslo?
                  </Link>
                </Grid>
                <Grid item>
                  <Link component={NextLink} href="/register" variant="body2" sx={{color: customColors.black, textDecorationColor: customColors.black}}>
                    Nemáte ještě už účet?
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

export default Login;