import { Button, Container, Dialog, DialogContent, Grid, Input, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { SnackbarProvider, useSnackbar } from 'notistack';
import React from "react";
import { useRouter } from "next/router";

function hexToText(hexString) {
    var text = '';
    for (var i = 0; i < hexString.length; i += 2) {
        var hex = hexString.substr(i, 2);
        var decimal = parseInt(hex, 16);
        text += String.fromCharCode(decimal);
    }
    return text;
}

function textToHex(text) {
    var result = '';
    for (var i = 0; i < text.length; i++) {
        var charCode = text.charCodeAt(i);
        var hexValue = charCode.toString(16);
        result += hexValue.padStart(2, '0');
    }
    return result;
}

// modal view cert
function SimpleDialog(props) {
    const { open, onClose, certificates } = props;
    const [currentIndex, setCurrentIndex] = useState(0);
    const [inputValue, setInputValue] = useState('');
    const [isValid, setIsValid] = useState(true);

    const handleInputChange = (event) => {
        const inputValue = event.target.value;
        setInputValue(inputValue);

        // Kiểm tra giá trị nhập vào so với giá trị trong p tag
        const policyId = certificates[currentIndex].policy_id;
        if (inputValue === policyId) {
            setIsValid(true);
        } else {
            setIsValid(false);
        }
    };


    const handlePrevClick = () => {
        setCurrentIndex((currentIndex - 1 + certificates.length) % certificates.length);
    };

    const handleNextClick = () => {
        setCurrentIndex((currentIndex + 1) % certificates.length);
    };

    if (!certificates || certificates.length === 0 || certificates.status_code == 404) {
        return null;
    }

    return (
        <Dialog open={open} onClose={onClose} maxWidth='lg'>
            <DialogContent style={{ display: 'grid', gridTemplateColumns: '7fr 3fr', alignItems: 'center' }}>
                <div>
                    <img src={certificates[currentIndex].onchain_metadata.image.replace("ipfs://", "https://ipfs.io/ipfs/")} alt="Ảnh" style={{ minWidth: "100%", minHeight: "100%" }} />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'auto 2fr', marginLeft: '30px', fontSize: '15px', gap: '5px', backgroundColor: 'Background' }}>
                    <p style={{ fontWeight: 'bold' }}>Code:</p>
                    <p>{hexToText(certificates[currentIndex].asset_name)}</p>
                    <p style={{ fontWeight: 'bold' }}>PolicyId:</p>
                    <p>{certificates[currentIndex].policy_id.substring(0, 5) + '.....' + certificates[currentIndex].policy_id.substring(certificates[currentIndex].policy_id.length - 10)}</p>
                    <p style={{ fontWeight: 'bold' }}>Received Identity:</p>
                    <p>{certificates[currentIndex].onchain_metadata.identity || '.....'}</p>
                    <p style={{ fontWeight: 'bold' }}>Received name:</p>
                    <p>{certificates[currentIndex].onchain_metadata.receivedName}</p>
                    <TextField
                        id="outlined-input"
                        label="Check PolicyId"
                        value={inputValue}
                        onChange={handleInputChange}
                        error={!isValid}
                        helperText={!isValid ? 'PolicyId is not correct!' : 'PolicyId is correct!'}
                        style={{ gridColumn: 'span 2'}}
                        color='success'
                    />
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
    return (
        <SnackbarProvider maxSnack={5}>
            <App />
        </SnackbarProvider>
    );
}

function compareLastDigits(str, arr) {
    var lastDigits = str.slice(-12); // Lấy 12 số cuối trong chuỗi str
    for (var i = 0; i < arr.length; i++) {
        var lastDigitsArr = arr[i].slice(-12); // Lấy 12 số cuối trong mỗi phần tử mảng arr
        if (lastDigits === lastDigitsArr) {
            return true; // Trả về true nếu có số cuối trùng nhau
        }
    }
    return false; // Trả về false nếu không có số cuối trùng nhau
}

const App = () => {
    const router = useRouter();
    const [open, setOpen] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [certificates, setCertificates] = useState([]);
    const [isInitialized, setIsInitialized] = useState(false);
    const { enqueueSnackbar } = useSnackbar();

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    useEffect(() => {
        const { q } = router.query;
        test()
        async function test() {
            if (isInitialized) {
                if (q) {
                    let temp = q.toString();
                    await setInputValue(temp);
                    handleClickOpen(q);
                }
            } else {
                setIsInitialized(true);
            }
        }



    }, [router.query, isInitialized]);

    function decryptVigenere(ciphertext: string, key: string): string {
        const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ_,0123456789';
        const ciphertextUpper = ciphertext.toUpperCase();
        const keyUpper = key.toUpperCase();
        let plaintext = '';

        for (let i = 0; i < ciphertext.length; i++) {
            const ciphertextChar = ciphertextUpper[i];
            const keyChar = keyUpper[i % key.length];

            if (alphabet.includes(ciphertextChar)) {
                const ciphertextIndex = alphabet.indexOf(ciphertextChar);
                const keyIndex = alphabet.indexOf(keyChar);
                const decryptedIndex = (ciphertextIndex - keyIndex + alphabet.length) % alphabet.length;
                const decryptedChar = alphabet[decryptedIndex];
                plaintext += decryptedChar;
            } else {
                plaintext += ciphertextChar;
            }
        }

        return plaintext;
    }

    const handleClickOpen = async (query) => {
        let timkiem = inputValue;
        if (query.length) {
            timkiem = query
        }

        const temp = decryptVigenere(timkiem, 'KEYWORD').toLowerCase().split(',')
        let asssetIds = [];
        for (let index = 1; index < temp.length; index++) {
            asssetIds.push(textToHex(temp[index]))
        }
        const projectId = 'preproddZ8hPQ8b90t4TcBfnnnx7CPIJ4omEG1H';

        // all asset of stakeId
        await fetch('https://cardano-preprod.blockfrost.io/api/v0/accounts/' + temp[0] + '/addresses/assets', {
            headers: {
                project_id: projectId,
            },
        })
            .then((response) => response.json())

            .then((data) => {
                if (data.status_code) {
                    enqueueSnackbar("Certificate not found!", { variant: 'error' })
                } else {
                    let result = [];
                    let promises = data.map(units => {
                        if (compareLastDigits(units.unit, asssetIds)) {
                            return fetch('https://cardano-preprod.blockfrost.io/api/v0/assets/' + units.unit, {
                                headers: {
                                    project_id: projectId,
                                },
                            })
                                .then(response1 => response1.json());
                        }
                    });

                    Promise.all(promises)
                        .then(data1 => {
                            result = data1.filter(Boolean); // Loại bỏ các giá trị null hoặc undefined từ mảng data1
                            setCertificates(result)

                            setOpen(true);
                        })
                        .catch(error => {
                            console.log(error);
                        });
                }
            })
    };

    const handleClose = () => {
        setOpen(false);
    };
    return (
        <div>
            <Container maxWidth="lg" sx={{ textAlign: 'center' }}>
                <h1 style={{ color: 'white' }}>YOU CAN FIND CERTS IN HERE!</h1>
                <Grid
                    justifyContent="center"
                    alignItems="center"
                    container
                    style={{
                        background: 'rgba(255, 255, 255, 0.2)',
                        padding: '30px',
                        marginTop: '10px',
                        width: '90%',
                        margin: '0 auto',
                    }}
                >
                    <Input
                        value={inputValue}
                        onChange={handleInputChange}
                        placeholder="Certificate URL"
                        type="text"
                        style={{
                            width: '80%',
                            fontSize: '20px',
                            backgroundColor: 'white',
                            height: '40px',
                            paddingLeft: '10px',
                        }}
                    />
                    <Button
                        variant="contained"
                        onClick={handleClickOpen}
                        style={{
                            background: '#26a06e',
                            color: '#ffffff',
                            borderRadius: '0',
                        }}
                    >
                        Search
                    </Button>
                </Grid>
                <SimpleDialog
                    fullWidth={'md'}
                    maxWidth={'800md'}
                    open={open}
                    onClose={handleClose}
                    certificates={certificates}
                />
            </Container>
            <SnackbarProvider />
        </div>
    )
}

export default Search;
