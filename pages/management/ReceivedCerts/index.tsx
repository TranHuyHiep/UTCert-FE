import Head from 'next/head';
import SidebarLayout from '@/layouts/SidebarLayout';
import { Grid, Container } from '@mui/material';
import Footer from '@/components/Footer';

import ReceivedCertsOrders from '@/content/Management/Transactions/ReceivedCertsOrders';

function ApplicationsTransactions() {
  return (
    <>
      <Head>
        <title>ReceivedCerts</title>
      </Head>
      <Container maxWidth="lg">
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12}>
            <ReceivedCertsOrders />
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

ApplicationsTransactions.getLayout = (page) => (
  <SidebarLayout>{page}</SidebarLayout>
);

export default ApplicationsTransactions;
