import {
  Typography,
  Box,
  Card,
  Container,
  Button,
  styled
} from '@mui/material';
import { ReactElement, useState } from 'react';
import BaseLayout from 'src/layouts/BaseLayout';

import Link from 'src/components/Link';
import Head from 'next/head';

import Logo from 'src/components/LogoSign';
import Hero from 'src/content/Overview/Hero';
import Login from './login-register/login';
import Register from './login-register/map';
import MapBox from './login-register/map';
import { CardanoWallet, useWallet } from '@meshsdk/react';
import SetCookie from '@/hooks/setCookie';

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
    background: ${theme.palette.common.white};
    flex: 1;
    overflow-x: hidden;
`
);

function Overview() {
  const { connected, wallet } = useWallet();
  const [assets, setAssets] = useState<null | any>(null);
  const [loading, setLoading] = useState<boolean>(false);

  async function getAssets() {
    if (wallet) {
      setLoading(true);
      const _assets = await wallet.getAssets();
      const stakeId = await wallet.getRewardAddresses();
      const myWallet = await wallet.getUsedAddresses();
      console.log(myWallet[0]);
      SetCookie('stakeId', stakeId);
      setAssets(_assets);
      setLoading(false);
    }
  }

  return (
    <>
      <OverviewWrapper>
        <Head>
          <title>Tokyo Free White NextJS Typescript Admin Dashboard</title>
        </Head>
        <HeaderWrapper>
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
                    component={Link}
                    href="/dashboards/crypto"
                    variant="contained"
                    sx={{ ml: 2 }}
                  >
                    Login
                  </Button>
                  {/* <CardanoWallet />
                  {connected && (
                    <>
                      {assets ? (
                        <pre>
                          <Button
                            component={Link}
                            href="/dashboards/crypto"
                            variant="contained"
                            sx={{ ml: 2 }}
                          >
                            Login
                          </Button>
                        </pre>
                      ) : (
                        <button
                          type="button"
                          onClick={() => getAssets()}
                          disabled={loading}
                          style={{
                            margin: '8px',
                            backgroundColor: loading ? 'orange' : 'grey'
                          }}
                        >
                          Login
                        </button>
                      )}
                    </>
                  )} */}
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
        <Hero />
        <MapBox></MapBox>

      </OverviewWrapper>
    </>
  );
}

export default Overview;

Overview.getLayout = function getLayout(page: ReactElement) {
  return <BaseLayout>{page}</BaseLayout>;
};
