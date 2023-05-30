import { Card } from '@mui/material';
import ReceivedCertsOrdersTable from './ReceivedCertsOrdersTable';
import { useState, useEffect  } from 'react';
import axios from 'axios';
import GetCookie from '@/hooks/getCookie';

function ReceivedCertsOrders() {
  const [receivedCerts, setReceivedCerts] = useState([]);

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
  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log(encryptVigenere('stake_test1uqmw4ydawakkjwasf94w5f5frcrkt3t56taafgydh2wdkwqw3nksu,100001,100016,100020', 'KEYWORD'))
        const url = 'http://tamperproofcerts.somee.com/api/v1/Certificate/certificate-received';
        const payload = GetCookie('stakeId');
        const headers = {
          Accept: '*/*',
          'Content-Type': 'application/json'
        };

        const response = await axios.post(url, payload, { headers });
        setReceivedCerts(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  });
  
  return (
    <Card>
      <ReceivedCertsOrdersTable certificates={receivedCerts} />
    </Card>
  );
}

export default ReceivedCertsOrders;
