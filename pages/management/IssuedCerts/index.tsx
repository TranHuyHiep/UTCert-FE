import Head from 'next/head';
import SidebarLayout from '@/layouts/SidebarLayout';
import PageHeader from '@/content/Management/Transactions/PageHeader';
import PageTitleWrapper from '@/components/PageTitleWrapper';
import { Grid, Container } from '@mui/material';
import Footer from '@/components/Footer';

import IssuedCertsOrders from '@/content/Management/Transactions/IssuedCertsOrders';
import { SnackbarProvider } from 'notistack';

function ApplicationsTransactions() {
  return (
    <>
      <Head>
        <title>IssuedCerts</title>
      </Head>
      <PageTitleWrapper>
        <PageHeader />
      </PageTitleWrapper>
      <Container maxWidth="lg">
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12}>
            <IssuedCertsOrders />
          </Grid>
        </Grid>
      </Container>
      <SnackbarProvider  
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        />
      <Footer />
    </>
  );
}

ApplicationsTransactions.getLayout = (page) => (
  <SidebarLayout>{page}</SidebarLayout>
);

export default ApplicationsTransactions;
