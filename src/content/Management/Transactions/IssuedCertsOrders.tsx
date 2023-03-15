import { Card } from '@mui/material';
import IssuedCertsOrdersTable from './IssuedCertsOrdersTable';
import { Certificate } from '@/models/certificate';

function IssuedCertsOrders() {
  var issuedCert:Certificate[] = [];

  const axios = require('axios');

  const url = 'https://localhost:44325/api/v1/Certificates/certificate-issued';

  const payload = '"146d28b014f87920fa81c3b91007606d03ce0376c365befb5a3df1f7"';

  const headers = {
    Accept: '*/*',
    'Content-Type': 'application/json'
  };

  axios
    .post(url, payload, { headers })
    .then((response) => {
      issuedCert = response.data;
      console.log(issuedCert);
    })
    .catch((error) => {
      console.error(error);
    });


  return (
    <Card>
      <IssuedCertsOrdersTable certificates={issuedCert} />
    </Card>
  );
}

export default IssuedCertsOrders;
