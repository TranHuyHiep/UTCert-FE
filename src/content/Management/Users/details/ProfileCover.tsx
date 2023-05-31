import PropTypes from 'prop-types';
import {
  Box,
  Typography,
  Card,
  Avatar,
  CardMedia,
  Button,
  IconButton,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import EditIcon from '@mui/icons-material/Edit';
import ArrowForwardTwoToneIcon from '@mui/icons-material/ArrowForwardTwoTone';
import UploadTwoToneIcon from '@mui/icons-material/UploadTwoTone';
import MoreHorizTwoToneIcon from '@mui/icons-material/MoreHorizTwoTone';
import { BrowserWallet } from '@meshsdk/core';
import { useState } from 'react';

const Input = styled('input')({
  display: 'none'
});

const AvatarWrapper = styled(Card)(
  ({ theme }) => `

    position: relative;
    overflow: visible;
    display: inline-block;
    margin-top: -${theme.spacing(9)};
    margin-left: ${theme.spacing(2)};

    .MuiAvatar-root {
      width: ${theme.spacing(16)};
      height: ${theme.spacing(16)};
    }
`
);

const ButtonUploadWrapper = styled(Box)(
  ({ theme }) => `
    position: absolute;
    width: ${theme.spacing(4)};
    height: ${theme.spacing(4)};
    bottom: -${theme.spacing(1)};
    right: -${theme.spacing(1)};

    .MuiIconButton-root {
      border-radius: 100%;
      background: ${theme.colors.primary.main};
      color: ${theme.palette.primary.contrastText};
      box-shadow: ${theme.colors.shadows.primary};
      width: ${theme.spacing(4)};
      height: ${theme.spacing(4)};
      padding: 0;
  
      &:hover {
        background: ${theme.colors.primary.dark};
      }
    }
`
);

const CardCover = styled(Card)(
  ({ theme }) => `
    position: relative;

    .MuiCardMedia-root {
      height: ${theme.spacing(26)};
    }
`
);

const CardCoverAction = styled(Box)(
  ({ theme }) => `
    position: absolute;
    right: ${theme.spacing(2)};
    bottom: ${theme.spacing(2)};
`
);

const ProfileCover = ({ user }) => {
  const [address, setAddress] = useState('');
  async function getAddress() {
    const wallet = await BrowserWallet.enable('eternl');
    const unusedAddresses = await wallet.getUnusedAddresses();
    setAddress(unusedAddresses[0])
  }
  getAddress();
  
  return (
    <>
      <CardCover>
        <CardMedia image={user.logo} />
        <CardCoverAction>
          <Input accept="image/*" id="change-cover" multiple type="file" />
          <label htmlFor="change-cover">
            <Button
              startIcon={<UploadTwoToneIcon />}
              variant="contained"
              component="span"
            >
              Change cover
            </Button>
          </label>
        </CardCoverAction>
      </CardCover>
      <AvatarWrapper>
        <Avatar variant="rounded" alt={user.username} src={user.logo} />
        <ButtonUploadWrapper>
          <Input
            accept="image/*"
            id="icon-button-file"
            name="icon-button-file"
            type="file"
          />
          <label htmlFor="icon-button-file">
            <IconButton component="span" color="primary">
              <UploadTwoToneIcon />
            </IconButton>
          </label>
        </ButtonUploadWrapper>
      </AvatarWrapper>
      <Box py={2} pl={2} mb={3}>
        <Typography gutterBottom variant="h4">
          {user.username}
          <label htmlFor="icon-button-file">
            <IconButton component="span" color="primary">
              <EditIcon />
            </IconButton>
          </label>
        </Typography>
        <Typography gutterBottom variant="h5">
          Your stake:
        </Typography>
        <Typography>
          {user.stakeId}
        </Typography>
        <Typography gutterBottom variant="h5" style={{paddingTop: '10px'}}>
          Your address:
        </Typography>
        <Typography variant="subtitle2">{user.address ? user.address : address}</Typography>
        <Typography sx={{ py: 2 }} variant="subtitle2" color="text.primary">
          {/* {user.jobtitle} | {user.location} | {user.followers} followers */}
        </Typography>
        <Box
          display={{ xs: 'block', md: 'flex' }}
          alignItems="center"
          justifyContent="space-between"
        >
          <Box>
            <Button size="small" variant="contained">
              Follow
            </Button>
            <Button size="small" sx={{ mx: 1 }} variant="outlined">
              View website
            </Button>
            <IconButton color="primary" sx={{ p: 0.5 }}>
              <MoreHorizTwoToneIcon />
            </IconButton>
          </Box>
          <Button
            sx={{ mt: { xs: 2, md: 0 } }}
            size="small"
            variant="text"
            endIcon={<ArrowForwardTwoToneIcon />}
          >
            See all {user.followers} connections
          </Button>
        </Box>
      </Box>
    </>
  );
};

ProfileCover.propTypes = {
  // @ts-ignore
  user: PropTypes.object.isRequired
};

export default ProfileCover;
