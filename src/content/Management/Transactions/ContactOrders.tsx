import { Card } from '@mui/material';
import { useState, useEffect  } from 'react';
import GetCookie from '@/hooks/getCookie';
import axios from 'axios';
import ContactsOrdersTable from './ContactsOrdersTable';

function ContactOrders() {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = 'http://tamperproofcerts.somee.com/api/v1/Home';
        const payload = GetCookie("stakeId");
        const headers = {
          Accept: '*/*',
          'Content-Type': 'application/json'
        };

        const response = await axios.post(url, payload, { headers });
        setContacts(response.data);
    } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);
  
  return (
    <Card>
      <ContactsOrdersTable contactOrders={contacts} />
    </Card>
  );
}

export default ContactOrders;
