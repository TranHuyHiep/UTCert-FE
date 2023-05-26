import Head from 'next/head';
import SidebarLayout from '@/layouts/SidebarLayout';
import PageTitle from '@/components/PageTitle';

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

function Login() {

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
