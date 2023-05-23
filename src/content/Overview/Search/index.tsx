import { Button, Container, Dialog, DialogContent, Grid, Input } from "@mui/material";
import { useState } from "react";


// modal view cert
function SimpleDialog(props) {
    const { open, onClose, certifiates } = props;
    const [currentIndex, setCurrentIndex] = useState(0);

    const handlePrevClick = () => {
        setCurrentIndex((currentIndex - 1 + certifiates.length) % certifiates.length);
    };

    const handleNextClick = () => {
        setCurrentIndex((currentIndex + 1) % certifiates.length);
    };

    if (!certifiates || certifiates.length === 0) {
        return null;
    }

    console.log(certifiates.onchain_metadata);

    return (
        <Dialog open={open} onClose={onClose} maxWidth='lg'>
            <DialogContent style={{ display: 'grid', gridTemplateColumns: '6fr 4fr', alignItems: 'center' }}>
                <div>
                    <img src={certifiates.onchain_metadata.image.replace("ipfs://", "https://ipfs.io/ipfs/")} alt="Ảnh" style={{ maxWidth: "100%", maxHeight: "100%" }} />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'auto 2fr', marginLeft: '30px', fontSize: '15px', gap: '5px', backgroundColor: 'Background' }}>
                    <p style={{ fontWeight: 'bold' }}>CODE:</p>
                    <p>{certifiates.asset_name}</p>
                    <p style={{ fontWeight: 'bold' }}>PolicyId:</p>
                    <p style={{ marginTop: '0px' }}>{certifiates.policy_id}</p>
                    <p style={{ fontWeight: 'bold', marginTop: '0px' }}>RECEIVED IDENTITY:</p>
                    <p>{certifiates.asset_name}</p>
                    <p style={{ fontWeight: 'bold' }}>RECEIVED NAME:</p>
                    <p>{certifiates.onchain_metadata.receivedName}</p>
                </div>

                <div style={{ display: "flex", justifyContent: "space-between", marginTop: "10px" }}>
                    <Button onClick={handlePrevClick}>Prev</Button>
                    <Button onClick={handleNextClick}>Next</Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
function Search() {
    const [open, setOpen] = useState<boolean>(false);
    const [inputValue, setInputValue] = useState("");
    const [certifiates, setCertificates] = useState("");

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
                if(data.status_code == 400) {
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
                certifiates={certifiates}
            />
        </Container>
    );
}

export default Search;
