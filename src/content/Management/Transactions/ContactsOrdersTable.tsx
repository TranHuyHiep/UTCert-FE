import { FC, ChangeEvent, useState } from 'react';
import {
  Tooltip,
  Divider,
  Box,
  FormControl,
  InputLabel,
  Card,
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
  CardHeader,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from '@mui/material';

import Label from '@/components/Label';
import HandshakeIcon from '@mui/icons-material/Handshake';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import BulkActions from './BulkActions';
import { Contact, ContactStatus } from '@/models/contact';
import GetCookie from '@/hooks/getCookie';
import { API_URL } from '@/constants/appConstants';
import { enqueueSnackbar } from 'notistack';
interface ContactsOrdersTableProps {
  className?: string;
  contactOrders: Contact[];
}

interface Filters {
  status?: ContactStatus;
}

const getStatusLabel = (contactStatus: ContactStatus): JSX.Element => {
  const map = {
    1: {
      text: 'Pending',
      color: 'primary'
    },
    2: {
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
  return contactOrders.filter((contactOrder) => {
    let matches = true;

    if (filters.status && contactOrder.contactStatus != filters.status) {
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
  const [selectedContactOrders] = useState<string[]>(
    []
  );
  const selectedBulkActions = selectedContactOrders.length > 0;
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(5);
  const [filters, setFilters] = useState<Filters>({
    status: null
  });
  const [selectedId, setSelectedId] = useState('');
  const [open, setOpen] = useState(false)

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  const statusOptions = [
    {
      id: 'all',
      name: 'All'
    },
    {
      id: '1',
      name: 'Pending'
    },
    {
      id: '2',
      name: 'Connected'
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
  const theme = useTheme();

  function handleSelectDelete(contactId) {
    setSelectedId(contactId);
    handleClickOpen();
  }

  function handleDelete(contactId) {
    const apiUrl = API_URL + '/Contact';

    fetch(apiUrl, {
      method: 'DELETE',
      headers: {
        'Accept': '*/*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(contactId)
    })
      .then(response => response.json())
      .then(() => {
        enqueueSnackbar('Delete Successful!', { variant: 'success' });
        // Xử lý dữ liệu trả về nếu cần
      })
      .catch(() => {
        enqueueSnackbar('Delete Error!', { variant: 'error' });
        // Xử lý lỗi nếu có
      });
    setOpen(false);
  }

  function handleAccept(contactId) {
    const apiUrl = API_URL + '/Contact/accept';

    fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Accept': '*/*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(contactId)
    })
      .then(response => response.json())
      .then(() => {
        enqueueSnackbar('Accept Successful!', { variant: 'success' });
        // Xử lý dữ liệu trả về nếu cần
      })
      .catch(() => {
        enqueueSnackbar('Accept Fail!', { variant: 'error' });
      });
  }

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
                contactOrder.contactID
              );
              return (
                <TableRow
                  hover
                  key={contactOrder.contactID}
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
                    {contactOrder.contactStatus == 1 && contactOrder.receivedID == GetCookie('stakeId') &&
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
                          onClick={() => handleAccept(contactOrder.contactID)}
                        >
                          <HandshakeIcon fontSize="medium" />
                        </IconButton>
                      </Tooltip>
                    }
                    {contactOrder.contactStatus == 1 && <Tooltip title="Delete" arrow>
                      <IconButton
                        sx={{
                          '&:hover': { background: theme.colors.error.lighter },
                          color: theme.palette.error.main
                        }}
                        color="inherit"
                        size="small"
                        onClick={() => handleSelectDelete(contactOrder.contactID)}
                      >
                        <DeleteTwoToneIcon fontSize="medium" />
                      </IconButton>
                    </Tooltip>}
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
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are you sure to delete friend?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            You can't undo this operation
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={() => handleDelete(selectedId)} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
};

export default ContactsOrdersTable;
