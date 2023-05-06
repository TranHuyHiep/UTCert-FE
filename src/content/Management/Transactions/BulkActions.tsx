import { useState, useRef, useEffect } from 'react';

import {
  Box,
  Menu,
  IconButton,
  Button,
  ListItemText,
  ListItem,
  List,
  Typography,
  Dialog,
  DialogContent
} from '@mui/material';
import { styled } from '@mui/material/styles';

import CreateIcon from '@mui/icons-material/Create';
import MoreVertTwoToneIcon from '@mui/icons-material/MoreVertTwoTone';
import { AssetMetadata, BrowserWallet, ForgeScript, Mint, Transaction } from '@meshsdk/core';
import { Certificate } from '@/models/certificate';
import VisibilityIcon from '@mui/icons-material/Visibility';
const ButtonError = styled(Button)(
  ({ theme }) => `
     background: ${theme.colors.error.main};
     color: ${theme.palette.error.contrastText};

     &:hover {
        background: ${theme.colors.error.dark};
     }
    `
);

const ButtonView = styled(Button)(
  ({ theme }) => `
     background: ${theme.colors.info.main};
     color: ${theme.palette.info.contrastText};

     &:hover {
        background: ${theme.colors.info.dark};
     }
    `
);

function SimpleDialog(props) {
  const { open, onClose, images } = props;
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrevClick = () => {
    setCurrentIndex((currentIndex - 1 + images.length) % images.length);
  };

  const handleNextClick = () => {
    setCurrentIndex((currentIndex + 1) % images.length);
  };

  if (!images || images.length === 0) {
    return null;
  }
  
  console.log(images);
  
  return (
    <Dialog open={open} onClose={onClose} maxWidth='lg'>
      <DialogContent style={{ display: 'grid', gridTemplateColumns: '6fr 4fr', alignItems: 'center' }}>
        <div>
          <img src={images[currentIndex].imageLink} alt="Ảnh" style={{ maxWidth: "100%", maxHeight: "100%" }} />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'auto 2fr', marginLeft: '30px', fontSize: '15px', gap: '5px', backgroundColor: 'Background'}}>
          <p style={{ fontWeight: 'bold' }}>CODE:</p>
          <p>{images[currentIndex].certificateCode}</p>
          <p style={{ fontWeight: 'bold' }}>CERTIFICATE NAME:</p>
          <p>{images[currentIndex].certificateName}</p>
          <p style={{ fontWeight: 'bold' }}>CERTIFICATE TYPE:</p>
          <p>{images[currentIndex].certificateType}</p>
          <p style={{ fontWeight: 'bold' }}>MODE OF STUDY:</p>
          <p>{images[currentIndex].modeOfStudy}</p>
          <p style={{ fontWeight: 'bold' }}>CLASSIFICATION:</p>
          <p>{images[currentIndex].classification}</p>
          <p style={{ fontWeight: 'bold' }}>YEAR OF GRADUATION:</p>
          <p>{images[currentIndex].yearOfGraduation}</p>
          <p style={{ fontWeight: 'bold' }}>DATE SIGNED:</p>
          <p>{images[currentIndex].signedDate}</p>
          <p style={{ fontWeight: 'bold', borderBottom: '1px solid #000', paddingBottom: '5px' }}>DATE RECEIVED:</p>
          <p style={{ borderBottom: '1px solid #000' }}>{images[currentIndex].receivedDoB}</p>
          <p style={{ fontWeight: 'bold', marginTop: '0px' }}>RECEIVED IDENTITY:</p>
          <p style={{ marginTop: '0px' }}>{images[currentIndex].receivedIdentityNumber}</p>
          <p style={{ fontWeight: 'bold' }}>RECEIVED NAME:</p>
          <p>{images[currentIndex].receivedName}</p>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", marginTop: "10px" }}>
          <Button onClick={handlePrevClick}>Prev</Button>
          <Button onClick={handleNextClick}>Next</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}


function BulkActions(props) {
  const [open, setOpen] = useState<boolean>(false);
  const [selectedCertifiates, setSelectedCertificates] = useState([]);

  var certificatesId: string[] = [];
  async function SendAllCertificateSelected(certs) {
    let certificates: Certificate[];
    Object.keys(certs).map((key) => (certificates = props[key]));

    const wallet = await BrowserWallet.enable('eternl');
    // prepare forgingScript
    let myPromise = new Promise<void>(async function (myResolve, myReject) {
      // "Producing Code" (May take some time)
      const usedAddress = await wallet.getUsedAddresses();
      const address = usedAddress[0];
      const forgingScript = ForgeScript.withOneSignature(address);
      const tx = new Transaction({ initiator: wallet });
      // define asset#1 metadata
      var assets: Mint[] = [];
      for (let index = 0; index < certificates.length; index++) {
        certificatesId.push(certificates[index].certificateID)
        const assetMetadata: AssetMetadata = {
          "certificateName": certificates[index].certificateName,
          "classification": certificates[index].classification,
          "image": certificates[index].ipfsLink,
          "mediaType": "image/jpg",
          "receivedName": certificates[index].receivedName,
          "yearOfGraduation": "" + certificates[index].yearOfGraduation,
        };

        const asset1: Mint = {
          assetName: certificates[index].certificateType + certificates[index].certificateCode,
          assetQuantity: '1',
          metadata: assetMetadata,
          label: '721',
          recipient: certificates[index].receivedAddressWallet,
        };
        assets.push(asset1);
        tx.mintAsset(
          forgingScript,
          assets[index],
        );
      }
      const unsignedTx = await tx.build();
      const signedTx = await wallet.signTx(unsignedTx);
      const txHash = await wallet.submitTx(signedTx);
      console.log("txHash");
      console.log(txHash);
      myResolve(); // when successful
      myReject();  // when error
    });


    // "Consuming Code" (Must wait for a fulfilled Promise)
    myPromise.then(
      function () {
        /* code if successful */
        fetch('http://tamperproofcerts.somee.com/api/v1/Certificate/issued/send-multiple', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(certificatesId)
        })
          .then(response => {
            // Xử lý phản hồi ở đây
            alert("Gửi thành công!");
          })
          .catch(error => {
            // Xử lý lỗi ở đây
            console.log(error);
            alert("Gửi thất bại!")
          });
      }
    ).catch(function () {
      alert("Gửi thất bại!")
    })
  }

  function ViewAllCertificateSelected(certs) {
    handleClickOpen(certs)
  }

  const handleClickOpen = (certs) => {
    let certificates: Certificate[];
    Object.keys(certs).map((key) => (certificates = props[key]));
    setSelectedCertificates(certificates);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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
          <ButtonView
            sx={{ ml: 1 }}
            startIcon={<VisibilityIcon />}
            variant="contained"
            onClick={() => (ViewAllCertificateSelected(props))}
          >
            View
          </ButtonView>
        </Box>
      </Box>

      <SimpleDialog
        open={open}
        onClose={handleClose}
        images={selectedCertifiates}
      />
    </>
  );
}

export default BulkActions;
