import {
  Box,
  Card,
  Container,
  Button,
  styled,
  Dialog,
  DialogTitle,
  List,
  ListItem,
} from '@mui/material';
// import bg from '@/public/background.jpg'

import { ReactElement, useState } from 'react';
import BaseLayout from 'src/layouts/BaseLayout';
import PropTypes from 'prop-types';
import Link from 'src/components/Link';
import Head from 'next/head';

import Logo from 'src/components/LogoSign';
import Hero from 'src/content/Overview/Hero';
import Search from 'src/content/Overview/Search';

const HeaderWrapper = styled(Card)(
  ({ theme }) => `
  width: 100%;
  display: flex;
  align-items: center;
  height: ${theme.spacing(10)};
  margin-bottom: ${theme.spacing(10)};
`
);

const OverviewWrapper = styled(Box)(
  ({ theme }) => `
    overflow: auto;
    background: ${theme.palette.common.black};
    flex: 1;
    overflow-x: hidden;
`
);



function SimpleDialog(props) {
  const { onClose, selectedValue, open } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle></DialogTitle>
      <List style={{ width: '500px', height: '300px' }}>
        <ListItem>
          <Hero />
        </ListItem>
      </List>
    </Dialog>
  );
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired
};

function Overview() {

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <OverviewWrapper style={{
        backgroundImage: `url(https://res.cloudinary.com/dgkr0cmla/image/upload/v1685119889/background_r0uspa.jpg)`,
        width: '100%',
        height: '100%',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat'
      }}>
        <Head>
          <title>UTCert</title>
        </Head>
        <HeaderWrapper style={{ backgroundColor: 'rgba(0, 0, 0, 20%)', boxShadow: 'none' }}>
          <Container maxWidth="lg">
            <Box display="flex" alignItems="center">
              <Logo />
              <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                flex={1}
              >
                <Box />
                <Box>
                  <Button
                    variant="contained"
                    onClick={handleClickOpen}
                  >
                    Login
                  </Button>
                  <Button
                    component={Link}
                    href="https://eternl.io/app/mainnet/welcome"
                    variant="contained"
                    sx={{ ml: 2 }}
                  >
                    Register
                  </Button>
                </Box>
              </Box>
            </Box>
          </Container>
        </HeaderWrapper>
        <Search />
        <SimpleDialog
          open={open}
          onClose={handleClose}
        />
      </OverviewWrapper>
    </>
  );
}

export default Overview;

Overview.getLayout = function getLayout(page: ReactElement) {
  return <BaseLayout>{page}</BaseLayout>;
};
