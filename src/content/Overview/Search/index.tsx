import { Button, Container, Dialog, DialogContent, Grid, Input } from "@mui/material";
import { useState } from "react";
import { SnackbarProvider, VariantType, useSnackbar } from 'notistack';
import React from "react";

function hexToText(hexString) {
    var text = '';
    for (var i = 0; i < hexString.length; i += 2) {
        var hex = hexString.substr(i, 2);
        var decimal = parseInt(hex, 16);
        text += String.fromCharCode(decimal);
    }
    return text;
}


// modal view cert
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

    console.log(certificates.onchain_metadata);

    return (
        <Dialog open={open} onClose={onClose} maxWidth='lg'>
            <DialogContent style={{ display: 'grid', gridTemplateColumns: '6fr 4fr', alignItems: 'center' }}>
                <div>
                    <img src={certificates.onchain_metadata.image.replace("ipfs://", "https://ipfs.io/ipfs/")} alt="Ảnh" style={{ maxWidth: "100%", maxHeight: "100%" }} />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'auto 2fr', marginLeft: '30px', fontSize: '15px', gap: '5px', backgroundColor: 'Background' }}>
                    <p style={{ fontWeight: 'bold' }}>Code:</p>
                    <p>{hexToText(certificates.asset_name)}</p>
                    <p style={{ fontWeight: 'bold' }}>PolicyId:</p>
                    <p style={{ marginTop: '0px', overflowX: 'auto', whiteSpace: 'nowrap' }}>{certificates.policy_id}</p>
                    <p style={{ fontWeight: 'bold' }}>Received Identity:</p>
                    <p>......</p>
                    <p style={{ fontWeight: 'bold' }}>Received name:</p>
                    <p>{certificates.onchain_metadata.receivedName}</p>
                </div>

                <div style={{ display: "flex", justifyContent: "space-between", marginTop: "10px" }}>
                    <Button onClick={handlePrevClick}>Prev</Button>
                    <Button onClick={handleNextClick}>Next</Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}

function MyApp() {
    const { enqueueSnackbar } = useSnackbar();
  
    const handleClick = () => {
      enqueueSnackbar('Not found certificates.', { variant: "error"});
    };
  
    const handleClickVariant = (variant: VariantType) => () => {
      // variant could be success, error, warning, info, or default
      enqueueSnackbar('This is a success message!', { variant });
    };
  
    return (
      <React.Fragment>
        <Button onClick={handleClick}>Show snackbar</Button>
        <Button onClick={handleClickVariant('success')}>Show success snackbar</Button>
      </React.Fragment>
    );
  }

function Search() {
    const [open, setOpen] = useState<boolean>(false);
    const [inputValue, setInputValue] = useState("");
    const [certificates, setCertificates] = useState("");

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    const handleClickOpen = () => {
        const url = "https://cardano-preprod.blockfrost.io/api/v0/assets/" + inputValue;
        var projectId = "preproddZ8hPQ8b90t4TcBfnnnx7CPIJ4omEG1H";

        fetch(url, {
            headers: {
                "project_id": projectId
            }
        })
            .then(response => response.json())
            .then(data => {
                // Xử lý dữ liệu trả về từ API\
                if (data.status_code == 400) {
                    alert("Not found")
                } else {
                    setCertificates(data)
                    setOpen(true);
                }
            })
            .catch(error => {
                // Xử lý lỗi nếu có
                console.error("khong tim thay");
            });
    };

    const handleClose = () => {
        setOpen(false);
    };
    return (
        <Container
            maxWidth='lg'
            sx={{
                textAlign: 'center',
            }}
        >
            <h1 style={{ color: 'white' }}>YOU CAN FIND CERTS IN HERE!</h1>
            <Grid
                justifyContent="center"
                alignItems="center"
                container
                style={{ background: 'rgba(255, 255, 255, 0.2)', padding: '30px', marginTop: '10px', width: '800px', margin: '0 auto' }}
            >
                <Input value={inputValue}
                    onChange={handleInputChange}
                    placeholder="Certificate URL"
                    type="text"
                    style={{ width: '550px', fontSize: '20px', backgroundColor: 'white', height: '40px', paddingLeft: '10px' }}
                />
                <Button variant="contained" onClick={handleClickOpen} style={{ background: '#26a06e', color: '#ffffff', borderRadius: '0' }}>Search</Button>
            </Grid>
            <SimpleDialog
                fullWidth={'md'}
                maxWidth={'800md'}
                open={open}
                onClose={handleClose}
                certificates={certificates}
            />
            <SnackbarProvider maxSnack={5}>
                <MyApp/>
            </SnackbarProvider>
        </Container>
    );
}

export default Search;
