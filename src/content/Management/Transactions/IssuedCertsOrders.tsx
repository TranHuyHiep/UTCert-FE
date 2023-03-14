import { Card } from '@mui/material';
import { CryptoOrder } from '@/models/crypto_order';
import IssuedCertsOrdersTable from './IssuedCertsOrdersTable';
import { subDays } from 'date-fns';

function IssuedCertsOrders() {
  var api = 'https://jsonplaceholder.typicode.com/todos/1'
  fetch(api)
  .then(response => response.json())
  .then(json => console.log(json))
  const cryptoOrders: CryptoOrder[] = [
    
  ];

  return (
    <Card>
      <IssuedCertsOrdersTable cryptoOrders={cryptoOrders} />
    </Card>
  );
}

export default IssuedCertsOrders;
