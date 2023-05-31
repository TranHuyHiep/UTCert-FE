import Head from 'next/head';
import SidebarLayout from '@/layouts/SidebarLayout';
import Footer from '@/components/Footer';

import { Grid, Container, Typography, Skeleton, CircularProgress } from '@mui/material';

import ProfileCover from '@/content/Management/Users/details/ProfileCover';
import RecentActivity from '@/content/Management/Users/details/RecentActivity';
import { useEffect, useState } from 'react';
import GetCookie from '@/hooks/getCookie';
import axios from 'axios';
import { API_URL } from '@/constants/appConstants';

function ManagementUserProfile() {
  // const user = {
  //   savedCards: 7,
  //   name: 'Catherine Pike',
  //   coverImg: '/static/images/placeholders/covers/5.jpg',
  //   avatar: '/static/images/avatars/4.jpg',
  //   description:
  //     "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage",
  //   jobtitle: 'Web Developer',
  //   location: 'Barcelona, Spain',
  //   followers: '465'
  // };
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(null);

  useEffect(() => {
    axios.post(API_URL + '/Home',
      GetCookie("stakeId"),
      {
        headers: {
          'accept': '*/*',
          'Content-Type': 'application/json'
        }
      }
    ).then(response1 => {
      setUser(response1.data);

      fetch('https://cardano-preprod.blockfrost.io/api/v0/accounts/' + GetCookie('stakeId'), {
        headers: {
          'Content-Type': 'application/json',
          'project_id': 'preproddZ8hPQ8b90t4TcBfnnnx7CPIJ4omEG1H'
        }
      })
        .then(response2 => response2.json())
        .then(response2 => {
          let stakeId = GetCookie('stakeId');
          setUser(prevState => ({
            ...prevState,
            stakeId
          }));
          setData(response2);

          fetch('https://cardano-preprod.blockfrost.io/api/v0/accounts/' + GetCookie('stakeId') + '/addresses', {
            headers: {
              'Content-Type': 'application/json',
              'project_id': 'preproddZ8hPQ8b90t4TcBfnnnx7CPIJ4omEG1H'
            }
          })
            .then(response3 => response3.json())
            .then(response3 => {
              console.log(response3[0]);
              let address = response3[0]["address"];
              setUser(prevState => ({
                ...prevState,
                address
              }));
              setIsLoading(false); // set isLoading to false when the response is received
            })
            .catch(error => {
              console.error(error);
              setIsLoading(false); // set isLoading to false when there's an error
            });
        })
        .catch(error => {
          console.error(error);
        });
    }).catch(error => {
      console.log(error);
    });

  }, []);

  return (
    <>
      <Head>
        <title>User Details - Management</title>
      </Head>
      <Container sx={{ mt: 3 }} maxWidth="lg">
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12} md={8}>
            {isLoading ?
              <>
                <Skeleton variant="rectangular" width={800} height={500} />
              </>
              : <ProfileCover user={user} />}
          </Grid>
          <Grid item xs={12} md={4}>
            {isLoading ?
              <Skeleton variant="rectangular" width={400} height={200} />
              : <RecentActivity data={data} />}

          </Grid>
          {/* <Grid item xs={12} md={8}>
            <Feed />
          </Grid>
          <Grid item xs={12} md={4}>
            <PopularTags />
          </Grid>
          <Grid item xs={12} md={7}>
            <MyCards />
          </Grid>
          <Grid item xs={12} md={5}>
            <Addresses />
          </Grid> */}
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

ManagementUserProfile.getLayout = (page) => (
  <SidebarLayout>{page}</SidebarLayout>
);

export default ManagementUserProfile;
