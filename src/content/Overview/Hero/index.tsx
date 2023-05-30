import {Button, Container, Grid, Snackbar, Stack} from '@mui/material';

import { useState } from 'react';
import { useWallet } from '@meshsdk/react';
import { CardanoWallet } from '@meshsdk/react';
import SetCookie from '@/hooks/setCookie';
import GetCookie from '@/hooks/getCookie';
import React from 'react';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { API_URL } from '@/constants/appConstants';


const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function Hero() {
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (_event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };


  const { connected, wallet } = useWallet();
  const [assets, setAssets] = useState<null | any>(null);
  const [loading, setLoading] = useState<boolean>(false);

  async function getAssets() {
    if (wallet) {
      setLoading(true);
      const _assets = await wallet.getAssets();
      const stakeId = await wallet.getRewardAddresses();
      await wallet.getUsedAddresses();
      SetCookie('stakeId', stakeId);
      setAssets(_assets);
      setLoading(false);

      fetch(API_URL + '/Home', {
        method: 'POST',
        headers: {
          'Accept': '*/*',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(GetCookie('stakeId'))
      })
        .then(response => response.json())
        .then(data => {
          // Xử lý dữ liệu trả về từ API
          handleClick()
          if (data.username != undefined) {
            window.location.href = '/dashboards/home'
          }
          else {
            window.location.href = '/login-register/register'
          }
        })
        .catch(error => {
          // Xử lý lỗi nếu có
          console.error(error);
        });
    }
  }
  return (
    <Container maxWidth="lg" sx={{ textAlign: 'center' }}>
      <Grid
        justifyContent="center"
        alignItems="center"
        container
      >
        <div>
          <h1>LOGIN</h1>
          <CardanoWallet />
          {connected && (
            <>
              {assets ? (
                <pre>

                </pre>
              ) : (
                <Button
                  onClick={() => getAssets()}
                  disabled={loading}
                  style={{
                    marginTop: '20px',
                  }}
                >
                  CONFIRM
                </Button>
              )}
            </>
          )}
          <Stack spacing={2} sx={{ width: '100%' }}>
            <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }} open={open} autoHideDuration={6000} onClose={handleClose}>
              <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                Login Successful!
              </Alert>
            </Snackbar>
          </Stack>
        </div>
      </Grid>
    </Container>
  );
}

export default Hero;
