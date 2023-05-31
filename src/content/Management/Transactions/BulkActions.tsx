import { useState, useEffect } from 'react';

import {
  Box,
  Button,
  Typography,
  Dialog,
  DialogContent,
  DialogActions,
  DialogContentText,
  DialogTitle,
  TextField
} from '@mui/material';
import { styled } from '@mui/material/styles';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import SendIcon from '@mui/icons-material/Send';
import DeleteIcon from '@mui/icons-material/Delete';
import { Asset, AssetMetadata, BrowserWallet, ForgeScript, Mint, Transaction } from '@meshsdk/core';
import { Certificate, CertificateStatus } from '@/models/certificate';
import VisibilityIcon from '@mui/icons-material/Visibility';
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
import QRCode from 'react-qr-code';
import GetCookie from '@/hooks/getCookie';
import { API_URL } from '@/constants/appConstants';
import { enqueueSnackbar } from 'notistack';
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

const ButtonGen = styled(Button)(
  ({ theme }) => `
     background: ${theme.colors.secondary.light};
     color: ${theme.palette.secondary.contrastText};

     &:hover {
        background: ${theme.colors.secondary.dark};
     }
    `
);


function SimpleDialog(props) {
  const { open, onClose, certificates } = props;
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrevClick = () => {
    setCurrentIndex((currentIndex - 1 + certificates.length) % certificates.length);
  };

  const handleNextClick = () => {
    setCurrentIndex((currentIndex + 1) % certificates.length);
  };

  if (!certificates || certificates.length === 0) {
    return null;
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth='lg'>
      <DialogContent style={{ display: 'grid', gridTemplateColumns: '6fr 4fr', alignItems: 'center' }}>
        <div>
          <img src={certificates[currentIndex].imageLink} alt="Ảnh" style={{ maxWidth: "100%", maxHeight: "100%" }} />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'auto 2fr', marginLeft: '30px', fontSize: '15px', gap: '5px', backgroundColor: 'Background' }}>
          <p style={{ fontWeight: 'bold' }}>CODE:</p>
          <p>{certificates[currentIndex].certificateCode}</p>
          <p style={{ fontWeight: 'bold' }}>ORGANIZATION :</p>
          <p>{certificates[currentIndex].organizationName}</p>
          <p style={{ fontWeight: 'bold', borderBottom: '1px solid #000', paddingBottom: '5px' }}>DATE RECEIVED:</p>
          <p style={{ borderBottom: '1px solid #000' }}>{certificates[currentIndex].receivedDoB}</p>
          <p style={{ fontWeight: 'bold', marginTop: '0px' }}>RECEIVED IDENTITY:</p>
          <p style={{ marginTop: '0px' }}>{certificates[currentIndex].receivedIdentityNumber}</p>
          <p style={{ fontWeight: 'bold' }}>RECEIVED NAME:</p>
          <p>{certificates[currentIndex].receivedName}</p>
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
  const [openQr, setOpenQr] = useState<boolean>(false);
  const [selectedCertificates, setSelectedCertificates] = useState<Certificate[]>([]);
  const [status, setStatus] = useState<CertificateStatus>();
  const [stringQr, setStringQr] = useState('');
  const [openDelete, setOpenDelete] = useState(false)

  function handleCloseDelete() {
    setOpenDelete(false);
  }

  useEffect(() => {
    var certificates = [];
    Object.keys(props).map((key) => (certificates = props[key]));
    setSelectedCertificates(certificates);
    // Hành động cập nhật status ở đây
    if (certificates.length > 0) {
      console.log(certificates)
      var temp = certificates[0].certificateStatus;
      for (let index = 1; index < certificates.length; index++) {
        if (temp != certificates[index].certificateStatus) {
          temp = 0;
          break;
        }
      }
      if (temp == 2) {
        for (let index = 0; index < certificates.length; index++) {
          if (certificates[index].contactStatus == 1) {
            temp = 0;
            break;
          }
        }
      }
      setStatus(temp);
    }
  }, [props]);

  async function SignAllCertificateSelected(certs) {
    var certificatesId: string[] = [];
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
          "identity": certificates[index].receivedIdentityNumber
        };

        const asset1: Mint = {
          assetName: certificates[index].certificateType + certificates[index].certificateCode,
          assetQuantity: '1',
          metadata: assetMetadata,
          label: '721',
          recipient: address,
        };
        assets.push(asset1);
        tx.mintAsset(
          forgingScript,
          assets[index],
        );
      }
      const unsignedTx = await tx.build();
      const signedTx = await wallet.signTx(unsignedTx);
      await wallet.submitTx(signedTx);
      myResolve(); // when successful
      myReject();  // when error
    });


    // "Consuming Code" (Must wait for a fulfilled Promise)
    myPromise.then(
      function () {
        /* code if successful */
        fetch(API_URL + '/Certificate/issued/sign-multiple', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(certificatesId)
        })
          .then(() => {
            // Xử lý phản hồi ở đây
            enqueueSnackbar('Sign Successful!', { variant: 'success' });
          })
          .catch(error => {
            // Xử lý lỗi ở đây
            console.log(error);
            enqueueSnackbar('Sign Error!', { variant: 'error' });
          });
      }
    ).catch(function () {
      enqueueSnackbar('Sign Error!', { variant: 'error' });
    })
  }

  function textToHex(text) {
    let hex = '';

    for (let i = 0; i < text.length; i++) {
      let charCode = text.charCodeAt(i).toString(16);
      hex += ('00' + charCode).slice(-2); // Ensure leading zero for single digit
    }

    return hex;
  }

  async function SendAllCertificateSelected(certs) {
    var certificatesId: string[] = [];
    let certificates: Certificate[];
    Object.keys(certs).map((key) => (certificates = props[key]));

    let myPromise = new Promise<void>(async function (myResolve, myReject) {
      const wallet = await BrowserWallet.enable('eternl');
      // prepare forgingScript
      await wallet.getUsedAddresses();
      const policyId = await wallet.getPolicyIds();
      const tx = new Transaction({ initiator: wallet });
      // define asset#1 metadata

      for (let i = 0; i < certificates.length; i++) {
        certificatesId.push(certificates[i].certificateID)
        const assetName = textToHex(certificates[i].certificateType + certificates[i].certificateCode);
        console.log(certificates[i].receivedAddressWallet);
        console.log(policyId[0] + assetName);
        const asset1: Asset = {
          unit: policyId[0] + assetName,
          quantity: '1',
        };
        tx.sendAssets(
          certificates[i].receivedAddressWallet,
          [asset1],
        );
      }
      const unsignedTx = await tx.build();
      const signedTx = await wallet.signTx(unsignedTx);
      await wallet.submitTx(signedTx);
      myResolve(); // when successful
      myReject();  // when error
    });


    // "Consuming Code" (Must wait for a fulfilled Promise)
    myPromise.then(
      function () {
        /* code if successful */
        fetch(API_URL + '/Certificate/issued/send-multiple', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(certificatesId)
        })
          .then(() => {
            // Xử lý phản hồi ở đây
            enqueueSnackbar('Send Successful!', { variant: 'success' });
          })
          .catch(() => {
            // Xử lý lỗi ở đây
            enqueueSnackbar('Send Error!', { variant: 'error' });
          });
      }
    ).catch(function () {
      enqueueSnackbar('Send Error!', { variant: 'error' });
    })

  }

  function handleDelete() {
    setOpenDelete(true);
  }

  function DeleteAllCertificateSelected(certs) {
    var certificatesId: string[] = [];
    let certificates: Certificate[];
    Object.keys(certs).map((key) => (certificates = props[key]));

    for (let index = 0; index < certificates.length; index++) {
      certificatesId.push(certificates[index].certificateID)
    }
    fetch(API_URL + '/Certificate/issued/delete-multiple', {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(certificatesId)
    })
      .then(() => {
        // Xử lý phản hồi ở đây
        enqueueSnackbar('Delete Successful!', { variant: 'success' });
      })
      .catch(() => {
        // Xử lý lỗi ở đây
        enqueueSnackbar('Delete Error!', { variant: 'error' });
      });
    setOpenDelete(false);
  }

  function ViewAllCertificateSelected(certs) {
    handleClickOpen(certs)
  }

  function GenQrAllCertificateSelected(certs) {
    handleClickOpenQr(certs)
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

  // Vigenère encode
  function encryptVigenere(plaintext: string, key: string): string {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ_,0123456789';
    const plaintextUpper = plaintext.toUpperCase();
    const keyUpper = key.toUpperCase();
    let ciphertext = '';

    for (let i = 0; i < plaintext.length; i++) {
      const plaintextChar = plaintextUpper[i];
      const keyChar = keyUpper[i % key.length];

      if (alphabet.includes(plaintextChar)) {
        const plaintextIndex = alphabet.indexOf(plaintextChar);
        const keyIndex = alphabet.indexOf(keyChar);
        const encryptedIndex = (plaintextIndex + keyIndex) % alphabet.length;
        const encryptedChar = alphabet[encryptedIndex];
        ciphertext += encryptedChar;
      } else {
        ciphertext += plaintextChar;
      }
    }

    return ciphertext;
  }





  // event of Generate Qrcode
  const handleClickOpenQr = (certs) => {
    let temp: string = GetCookie('stakeId')
    let certificates: Certificate[];

    console.log(certs);

    Object.keys(certs).map((key) => (certificates = props[key]));
    certificates.map(certificate => (temp += ',' + certificate.certificateCode))

    temp = encryptVigenere(temp, 'KEYWORD')
    setStringQr('https://utcert.vercel.app/?q=' + temp);

    setOpenQr(true);
  };

  const handleCloseQr = () => {
    setOpenQr(false);
  };



  return (
    <>
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Box display="flex" alignItems="center">
          <Typography variant="h5" color="text.secondary">
            Bulk actions:
          </Typography>
          {status == 1 ?
            <>
              <ButtonView
                sx={{ ml: 1 }}
                startIcon={<EditTwoToneIcon />}
                variant="contained"
                onClick={() => (SignAllCertificateSelected(props))}
              >
                Sign
              </ButtonView>
              <ButtonError
                sx={{ ml: 1 }}
                startIcon={<DeleteIcon />}
                variant="contained"
                onClick={handleDelete}
              >
                Delete
              </ButtonError>
            </>
            : (status == 2 ? <ButtonView
              sx={{ ml: 1 }}
              startIcon={<SendIcon />}
              variant="contained"
              onClick={() => (SendAllCertificateSelected(props))}
            >
              Send
            </ButtonView> : (status == 3 ?
              <></> : (!status && status != 0 ? <ButtonGen
                sx={{ ml: 1 }}
                startIcon={<QrCodeScannerIcon />}
                variant="contained"
                onClick={() => (GenQrAllCertificateSelected(props))}
              >
                Generate QR
              </ButtonGen>
                : <></>)))}
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
        certificates={selectedCertificates}
      />

      <Dialog
        open={openQr}
        onClose={handleCloseQr}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Your certifiates code here"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description" style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ marginBottom: "10px" }}>
              <QRCode
                size={300}
                bgColor="white"
                fgColor="black"
                value={stringQr}
              />
            </div>
            <TextField
              id="outlined-read-only-input"
              label="QR Code"
              defaultValue={stringQr}
              InputProps={{
                readOnly: true,
              }}
            />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseQr}>Confirm</Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={openDelete}
        onClose={handleCloseDelete}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are you sure to delete this certificate?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            You can't undo this operation
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDelete}>Disagree</Button>
          <Button onClick={() => DeleteAllCertificateSelected(props)} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default BulkActions;
