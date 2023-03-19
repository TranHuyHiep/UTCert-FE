import { useState, useRef } from 'react';

import {
  Box,
  Menu,
  IconButton,
  Button,
  ListItemText,
  ListItem,
  List,
  Typography
} from '@mui/material';
import { styled } from '@mui/material/styles';

import CreateIcon from '@mui/icons-material/Create';
import MoreVertTwoToneIcon from '@mui/icons-material/MoreVertTwoTone';
import { AssetMetadata, BrowserWallet, ForgeScript, Mint, Transaction } from '@meshsdk/core';

const ButtonError = styled(Button)(
  ({ theme }) => `
     background: ${theme.colors.error.main};
     color: ${theme.palette.error.contrastText};

     &:hover {
        background: ${theme.colors.error.dark};
     }
    `
);

function BulkActions(props) {
  console.log(props.certificate);
  
  const [onMenuOpen, menuOpen] = useState<boolean>(false);
  const moreRef = useRef<HTMLButtonElement | null>(null);

  const openMenu = (): void => {
    menuOpen(true);
  };

  const closeMenu = (): void => {
    menuOpen(false);
  };

  async function SendAllCertificateSelected(certificates) {
    // console.log(certificates);
    // const wallet = await BrowserWallet.enable('eternl');
    // // prepare forgingScript
    // if (wallet) {
    //   const usedAddress = await wallet.getUsedAddresses();
    //   const address = usedAddress[0];
    //   const forgingScript = ForgeScript.withOneSignature(address);
    //   const tx = new Transaction({ initiator: wallet });
    //   // define asset#1 metadata
    //   var assets: Mint[] = [];
    //   console.log(certificates.length);
      
    //   for (let index = 0; index < certificates.length; index++) {
    //     const assetMetadata: AssetMetadata = {
    //       "certificateName": certificates[index].certificateName,
    //       "classification": certificates[index].classification,
    //       "image": certificates[index].ipfsLink,
    //       "mediaType": "image/jpg",
    //       "receivedName": certificates[index].receivedName,
    //       "yearOfGraduation": certificates[index].yearOfGraduation,
    //     };

    //     const asset1: Mint = {
    //       assetName: certificates[index].certificateType + certificates[index].certificateCode,
    //       assetQuantity: '1',
    //       metadata: assetMetadata,
    //       label: '721',
    //       recipient: certificates[index].receivedAddressWallet,
    //     };
    //     assets.push(asset1);
    //     tx.mintAsset(
    //       forgingScript,
    //       assets[index],
    //     );
    //   }
      
    //   console.log(assets);
    //   const unsignedTx = await tx.build();
    //   const signedTx = await wallet.signTx(unsignedTx);
    //   const txHash = await wallet.submitTx(signedTx);
    //   console.log(txHash);
    // }
  }

  return (
    <>
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Box display="flex" alignItems="center">
          <Typography variant="h5" color="text.secondary">
            Bulk actions:
          </Typography>
          <ButtonError
            sx={{ ml: 1 }}
            startIcon={<CreateIcon />}
            variant="contained"
            onClick={() => (SendAllCertificateSelected(props))}
          >
            Send
          </ButtonError>
        </Box>
        <IconButton
          color="primary"
          onClick={openMenu}
          ref={moreRef}
          sx={{ ml: 2, p: 1 }}
        >
          <MoreVertTwoToneIcon />
        </IconButton>
      </Box>

      <Menu
        keepMounted
        anchorEl={moreRef.current}
        open={onMenuOpen}
        onClose={closeMenu}
        anchorOrigin={{
          vertical: 'center',
          horizontal: 'center'
        }}
        transformOrigin={{
          vertical: 'center',
          horizontal: 'center'
        }}
      >
        <List sx={{ p: 1 }} component="nav">
          <ListItem button>
            <ListItemText primary="Bulk delete selected" />
          </ListItem>
          <ListItem button>
            <ListItemText primary="Bulk edit selected" />
          </ListItem>
        </List>
      </Menu>
    </>
  );
}

export default BulkActions;
