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
  InputLabel,
  Link,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
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
import { useCreateUserMutationMutation } from '@/generated/graphql';
import { collection, getDocs, getFirestore, query, where } from 'firebase/firestore';

const Register: NextPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [createUser] = useCreateUserMutationMutation();
  const router = useRouter();
  const firestore = getFirestore();
  const usersRef = collection(firestore, 'users');

  const isUsernameUsed = async (username: any) => {
    const usernameQuery = query(usersRef, where("username", "==", username));
    const querySnapshot = await getDocs(usernameQuery);
    return querySnapshot; 
  }

  const handleForm = async (event: any) => {
    event.preventDefault();
    const usernameResult = await isUsernameUsed(username);
    const userData = usernameResult.docs.map((doc) => doc.data());
    const registerResult = await authUtils.register(email, password); 

    if(registerResult && userData.length == 0) {
      createUser({ variables: { email, username } });
      router.push('/login');
    }

    if(userData.length > 0)
      alert("Toto jméno je už používané. Zvolte si jiné.");
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
              Registrace
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
                id="username"
                label="Zadejte vaši přezdívku"
                name="username"
                autoFocus
                color="info"
                onChange={(e) => {
                  const { value } = e.target;
                  setUsername(value);
                }}
              />
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
                onChange={(e) => {
                  const { value } = e.target;
                  setEmail(value);
                }}
              />
              <TextField
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
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, backgroundColor: customColors.black, color: customColors.white, ...buttonHover }}
              >
                Registrovat se
              </Button>
              <Grid container>
                <Grid item>
                  <Link component={NextLink} href="/login" variant="body2" sx={{ color: customColors.black, textDecorationColor: customColors.black }}>
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

export default Register;
