import { Card } from '@mui/material';
import { useState, useEffect } from 'react';
import GetCookie from '@/hooks/getCookie';
import axios from 'axios';
import ContactsOrdersTable from './ContactsOrdersTable';
import { API_URL } from '@/constants/appConstants';
import { SnackbarProvider } from 'notistack';

function ContactOrders() {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = API_URL + '/Contact';
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
  });

  return (
    <Card>
      <ContactsOrdersTable contactOrders={contacts} />
      <SnackbarProvider  
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        />
    </Card>
  );
}

export default ContactOrders;
