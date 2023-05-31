import { Typography, Avatar, Grid, Skeleton } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import GetCookie from '@/hooks/getCookie';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { API_URL } from '@/constants/appConstants';
function PageHeader() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios.post(API_URL + '/Home',
      GetCookie("stakeId"),
      {
        headers: {
          'accept': '*/*',
          'Content-Type': 'application/json'
        }
      }
    ).then(response => {
      console.log("Thanh cong");
      setUser(response.data);
      setIsLoading(false); // set isLoading to false when the response is received
    }).catch(error => {
      console.log(error);
      setIsLoading(false); // set isLoading to false when there's an error
    });
  }, []);

  const theme = useTheme();

  // render a loading message while the API is being called
  if (isLoading) {
    return (
      <>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 9fr' }}>
          <Skeleton animation="wave" variant="circular" width={90} height={90} />
          <Skeleton animation="wave" variant="rectangular" width={1000} height={90} />
        </div>
      </>
    );
  }

  // render the PageHeader component with the user data once it's available
  return (
    <Grid container alignItems="center">
      <Grid item>
        <Avatar
          sx={{
            mr: 2,
            width: theme.spacing(8),
            height: theme.spacing(8)
          }}
          variant="rounded"
          alt={user.username}
          src={user.logo}
        />
      </Grid>
      <Grid item>
        <Typography variant="h3" component="h3" gutterBottom>
          Welcome, {user.username}!
        </Typography>
        <Typography variant="subtitle2">
          Today is a good day to start study!
        </Typography>
      </Grid>
    </Grid>
  );
}


export default PageHeader;
