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
import { useRouter } from 'next/router';
import React, { useState } from 'react';

import { authUtils } from '@/firebase/authUtils';
import mainTheme, { customColors } from '@/styles/themes/mainThemeOptions';
import { Header } from '@/components/HeaderGroup/Header';

const Login: NextPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleForm = async (event: any) => {
    event.preventDefault();
    const registerResult = await authUtils.register(email, password);
    console.log(registerResult);
  };

  const btnStyle = {
    '&': {
      bgcolor: 'primary.main',
    },
    '&:hover': {
      bgcolor: 'primary.light',
      transition: 'ease-in-out 0.3s',
    },
  };

  const hoverAnimation = {
    "&:hover": {
      border: '0px solid black'
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
              Registrace
            </Typography>
            <Box
              component="form"
              onSubmit={handleForm}
              noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                sx={{ border: '1px solid black', borderRadius: '5px', ...hoverAnimation}}
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
                sx={{ border: '1px solid black', borderRadius: '5px', ...hoverAnimation}}
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
                sx={{ mt: 3, mb: 2, ...btnStyle }}
              >
                Registrovat se
              </Button>
              <Grid container>
                <Grid item>
                  <Link component={NextLink} href="/login" variant="body2">
                    Už máte účet?
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
