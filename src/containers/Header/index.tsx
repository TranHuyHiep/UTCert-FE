import React, { useEffect, useState } from 'react'
import styles from "styles/Header.module.css"
import ai from "@/public/assets/ai.png";
import { ChevronRight } from '@mui/icons-material';
import { Dialog, DialogContent, TextField, Button } from '@mui/material';
import { useRouter } from 'next/router';
import { SnackbarProvider, useSnackbar } from 'notistack';


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
      <DialogContent >
        <div className="container">
          <div className="image-container">
            <img className="image-show"
              src={certificates[currentIndex].onchain_metadata.image.replace("ipfs://", "https://ipfs.io/ipfs/")}
              alt="Ảnh"
            />
          </div>
          <div className="content-container" style={{ display: 'grid', gridTemplateColumns: 'auto 2fr', marginLeft: '30px', fontSize: '15px', gap: '5px', backgroundColor: 'white' }}>
            <p style={{ fontWeight: 'bold' }}>Code:</p>
            <p>{hexToText(certificates[currentIndex].asset_name)}</p>
            <p style={{ fontWeight: 'bold' }}>AssetId:</p>
            <a
              href={`https://preprod.cexplorer.io/asset/${certificates[currentIndex].asset}`}
              style={{
                display: 'flex',
                alignItems: 'center',
                textDecoration: 'none',
                color: 'black',
              }}
              target="_blank" rel="noopener noreferrer"
            >
              <span style={{ marginRight: '5px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {certificates[currentIndex].asset.substring(0, 7) + '.....' + certificates[currentIndex].asset.substring(certificates[currentIndex].asset.length - 5)}
              </span>
              <ChevronRight style={{ fontSize: '20px' }} />
            </a>
            <p style={{ fontWeight: 'bold' }}>PolicyId:</p>
            <a
              href={`https://preprod.cexplorer.io/policy/${certificates[currentIndex].policy_id}`}
              style={{
                display: 'flex',
                alignItems: 'center',
                textDecoration: 'none',
                color: 'black',
              }}
              target="_blank" rel="noopener noreferrer"
            >
              <span style={{ marginRight: '5px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {certificates[currentIndex].policy_id.substring(0, 7) + '.....' + certificates[currentIndex].policy_id.substring(certificates[currentIndex].policy_id.length - 5)}
              </span>
              <ChevronRight style={{ fontSize: '20px' }} />
            </a>
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
              style={{ gridColumn: 'span 2' }}
              color='success'
            />
          </div>
          <div className="button-container" style={{ display: "flex", justifyContent: "space-between", marginTop: "10px" }}>
            <Button onClick={handlePrevClick}>Prev</Button>
            <Button onClick={handleNextClick}>Next</Button>
          </div>
        </div>
        <style jsx>
          {`
                  .container {
                      display: grid;
                      grid-template-columns: 7fr 3fr;
                      align-items: center;
                    }
            
                    .content-container {
                      margin-left: 30px;
                      font-size: 15px;
                      gap: 5px;
                      background-color: white;
                    }
            
                    .button-container {
                      display: flex;
                      justify-content: space-between;
                      margin-top: 10px;
                    }

                    .image-show {
                      width: 90vh; /* Điều chỉnh chiều rộng cho màn hình điện thoại */
                      height: 100%; /* Đặt chiều cao tự động */
                  }

                  /* Responsive styles */
                  @media (max-width: 768px) {
                      .container {
                          grid-template-columns: 1fr; /* Chuyển sang hiển thị dạng hàng dọc */
                      }

                      .image-show {
                          width: 40vh; /* Điều chỉnh chiều rộng cho màn hình điện thoại */
                          height: 100%; /* Đặt chiều cao tự động */
                      }
                  }
                  `}
        </style>
      </DialogContent>
    </Dialog>
  );
}

function Header() {
  return (
    <SnackbarProvider maxSnack={5}>
      <Search />
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

const Search = () => {
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
    <>
      <div className={`${styles.utcert__header} ${styles.section__padding}`} id="home">
        <div className={styles.utcert__headerContent}>
          <h1 className={styles.gradient__text}>Let&apos;s explore the certificates available on the blockchain.</h1>
          <p>Explore blockchain for secure, tamper-proof certificates, enabling easy verification and trust in digital credentials.</p>

          <div className={styles.utcert__headerContent__input}>
            <input type="email" placeholder="Certificate URL" value={inputValue} onChange={handleInputChange} />
            <button type="button" onClick={handleClickOpen}>Verify</button>
          </div>

          {/* <div className={styles.utcert__headerContent__people}>
            <img src={people.src} />
            <p>1,600 people requested access a visit in last 24 hours</p>
          </div> */}
        </div>

        <div className={styles.utcert__headerImage}>
          <img src={ai.src} />
        </div >
        <SimpleDialog
          fullWidth={'md'}
          maxWidth={'800md'}
          open={open}
          onClose={handleClose}
          certificates={certificates}
        />
      </div >
      <SnackbarProvider />

    </>
  )
}



export default Header