import { Card } from '@mui/material';
import ReceivedCertsOrdersTable from './ReceivedCertsOrdersTable';
import { subDays } from 'date-fns';
import { useState, useEffect  } from 'react';
import GetCookie from '@/hooks/getCookie';
import axios from 'axios';
import { CryptoOrder } from '@/models/crypto_order';

function ReceivedCertsOrders() {
  const [receivedCerts, setReceivedCerts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = 'https://localhost:44325/api/v1/Certificates/certificate-received';
        const payload = 'bf1f5570841b4ee812dc49e6111ba402813d19b3e1f8ec1e94ca9e35';
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
      <ReceivedCertsOrdersTable cryptoOrders={receivedCerts} />
    </Card>
  );
}

export default ReceivedCertsOrders;
