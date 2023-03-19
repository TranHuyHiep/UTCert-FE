import Head from 'next/head';
import SidebarLayout from '@/layouts/SidebarLayout';
import PageTitle from '@/components/PageTitle';
import { useState } from 'react';

import PageTitleWrapper from '@/components/PageTitleWrapper';
import {
  Container,
  Grid,
  Card,
  CardHeader,
  CardContent,
  Divider
} from '@mui/material';
import Footer from '@/components/Footer';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { pink } from '@mui/material/colors';
import Checkbox from '@mui/material/Checkbox';

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

import Stack from '@mui/material/Stack';
import Slider from '@mui/material/Slider';
import VolumeDown from '@mui/icons-material/VolumeDown';
import VolumeUp from '@mui/icons-material/VolumeUp';

import Switch from '@mui/material/Switch';

const label = { inputProps: { 'aria-label': 'Switch demo' } };

function Login() {
  const [value, setValue] = useState(30);

  const handleChange2 = (_event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <PageTitleWrapper>
        <PageTitle
          heading="Register"
          subHeading="Please fill all information"
          docs="https://material-ui.com/components/text-fields/"
        />
      </PageTitleWrapper>
      <Container maxWidth="lg">
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={6}>
            <Card>
              <CardHeader title="Input Fields" />
              <Divider />
              <CardContent>
                <Box
                  component="form"
                  sx={{
                    '& .MuiTextField-root': { m: 2, width: '40ch' }
                  }}
                  noValidate
                  autoComplete="off"
                >
                  <div>
                    <TextField
                      required
                      id="outlined-required"
                      label="Username"
                    />
                    <TextField
                      required
                      id="outlined-required"
                      label="First name"
                    />
                    <TextField
                      required
                      id="outlined-required"
                      label="Last name"
                    />
                    <TextField
                      id="outlined-password-input"
                      label="Password*"
                      type="password"
                      autoComplete="current-password"
                    />
                  </div>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

Login.getLayout = (page) => <SidebarLayout>{page}</SidebarLayout>;

export default Login;
