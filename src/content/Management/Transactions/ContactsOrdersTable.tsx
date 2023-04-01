import { FC, ChangeEvent, useState } from 'react';
import {
  Tooltip,
  Divider,
  Box,
  FormControl,
  InputLabel,
  Card,
  Checkbox,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TableContainer,
  Select,
  MenuItem,
  Typography,
  useTheme,
  CardHeader
} from '@mui/material';

import Label from '@/components/Label';
import HandshakeIcon from '@mui/icons-material/Handshake';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import BulkActions from './BulkActions';
import { Contact, ContactStatus } from '@/models/Contact';

interface ContactsOrdersTableProps {
  className?: string;
  contactOrders: Contact[];
}

interface Filters {
  status?: ContactStatus;
}

const getStatusLabel = (contactStatus: ContactStatus): JSX.Element => {
  const map = {
    1 : {
      text: 'Pending',
      color: 'primary'
    },
    2 : {
      text: 'Connected',
      color: 'success'
    }
  };
  const { text, color }: any = map[contactStatus];
  return <Label color={color}>{text}</Label>;
};

const applyFilters = (
  contactOrders: Contact[],
  filters: Filters
): Contact[] => {
  return contactOrders.filter((contactOrders) => {
    let matches = true;

    if (filters.status && contactOrders.contactStatus !== filters.status) {
      matches = false;
    }

    return matches;
  });
};

const applyPagination = (
  contactOrders: Contact[],
  page: number,
  limit: number
): Contact[] => {
  return contactOrders.slice(page * limit, page * limit + limit);
};

const ContactsOrdersTable: FC<ContactsOrdersTableProps> = ({
  contactOrders
}) => {
  const [selectedContactOrders, setSelectedContactOrders] = useState<string[]>(
    []
  );
  const selectedBulkActions = selectedContactOrders.length > 0;
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(5);
  const [filters, setFilters] = useState<Filters>({
    status: null
  });

  const statusOptions = [
    {
      id: 'all',
      name: 'All'
    },
    {
      id: '2',
      name: 'Sent'
    },
    {
      id: 'pending',
      name: 'Pending'
    },
    {
      id: 'failed',
      name: 'Failed'
    }
  ];

  const handleStatusChange = (e: ChangeEvent<HTMLInputElement>): void => {
    let value = null;

    if (e.target.value !== 'all') {
      value = e.target.value;
    }

    setFilters((prevFilters) => ({
      ...prevFilters,
      status: value
    }));
  };

  const handleSelectAllContactOrders = (
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    setSelectedContactOrders(
      event.target.checked
        ? contactOrders.map((contactOrder) => contactOrder.contactId)
        : []
    );
  };

  const handleSelectOneContactOrder = (
    _event: ChangeEvent<HTMLInputElement>,
    contactOrderId: string
  ): void => {
    if (!selectedContactOrders.includes(contactOrderId)) {
      setSelectedContactOrders((prevSelected) => [
        ...prevSelected,
        contactOrderId
      ]);
    } else {
      setSelectedContactOrders((prevSelected) =>
        prevSelected.filter((id) => id !== contactOrderId)
      );
    }
  };

  const handlePageChange = (_event: any, newPage: number): void => {
    setPage(newPage);
  };

  const handleLimitChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setLimit(parseInt(event.target.value));
  };

  const filteredContactOrders = applyFilters(contactOrders, filters);
  const paginatedContactOrders = applyPagination(
    filteredContactOrders,
    page,
    limit
  );
  const selectedSomeContactOrders =
    selectedContactOrders.length > 0 &&
    selectedContactOrders.length < contactOrders.length;
  const selectedAllContactOrders =
    selectedContactOrders.length === contactOrders.length;
  const theme = useTheme();

  return (
    <Card>
      {selectedBulkActions && (
        <Box flex={1} p={2}>
          <BulkActions />
        </Box>
      )}
      {!selectedBulkActions && (
        <CardHeader
          action={
            <Box width={150}>
              <FormControl fullWidth variant="outlined">
                <InputLabel>Status</InputLabel>
                <Select
                  value={filters.status || 'all'}
                  onChange={handleStatusChange}
                  label="Status"
                  autoWidth
                >
                  {statusOptions.map((statusOption) => (
                    <MenuItem key={statusOption.id} value={statusOption.id}>
                      {statusOption.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          }
          title="Contacts"
        />
      )}
      <Divider />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Code</TableCell>
              <TableCell>Contact Name</TableCell>
              <TableCell>Created Date</TableCell>
              <TableCell>Status</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedContactOrders.map((contactOrder) => {
              const isContactOrderSelected = selectedContactOrders.includes(
                contactOrder.contactId
              );
              return (
                <TableRow
                  hover
                  key={contactOrder.contactId}
                  selected={isContactOrderSelected}
                >
                  <TableCell>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {contactOrder.contactCode}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {contactOrder.contactName}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                    >
                      {contactOrder.createdDate}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      align="left"
                      gutterBottom
                      noWrap
                    >
                      {getStatusLabel(contactOrder.contactStatus)}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    {contactOrder.contactStatus == 1 && 
                    <Tooltip title="Accept" arrow>
                      <IconButton
                        sx={{
                          '&:hover': {
                            background: theme.colors.primary.lighter
                          },
                          color: theme.palette.primary.main
                        }}
                        color="inherit"
                        size="small"
                      >
                        <HandshakeIcon fontSize="medium" />
                      </IconButton>
                    </Tooltip>
                    }
                    <Tooltip title="Delete" arrow>
                      <IconButton
                        sx={{
                          '&:hover': { background: theme.colors.error.lighter },
                          color: theme.palette.error.main
                        }}
                        color="inherit"
                        size="small"
                      >
                        <DeleteTwoToneIcon fontSize="medium" />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <Box p={2}>
        <TablePagination
          component="div"
          count={filteredContactOrders.length}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleLimitChange}
          page={page}
          rowsPerPage={limit}
          rowsPerPageOptions={[5, 10, 25, 30]}
        />
      </Box>
    </Card>
  );
};

// ReceivedCertsOrdersTable.propTypes = {
//   cryptoOrders: PropTypes.array.isRequired
// };

// ReceivedCertsOrdersTable.defaultProps = {
//   cryptoOrders: []
// };

export default ContactsOrdersTable;
