import { Card } from '@mui/material';
import ReceivedCertsOrdersTable from './ReceivedCertsOrdersTable';
import { useState, useEffect  } from 'react';
import axios from 'axios';

function ReceivedCertsOrders() {
  const [receivedCerts, setReceivedCerts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = 'http://tamperproofcerts.somee.com/api/v1/Certificate/certificate-received';
        const payload = 'stake_test1uqmw4ydawakkjwasf94w5f5frcrkt3t56taafgydh2wdkwqw3nksu';
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
  }, []);
  
  return (
    <Card>
      <ReceivedCertsOrdersTable certificates={receivedCerts} />
    </Card>
  );
}

export default ReceivedCertsOrders;
