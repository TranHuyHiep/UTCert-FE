import { FC, ChangeEvent, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Divider,
  Box,
  Card,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TableContainer,
  Typography,
  useTheme,
  Tooltip,
  IconButton,
  Dialog,
  DialogContent
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import BulkActions from './BulkActions';
import {
  Certificate,
  CertificateStatus,
} from '@/models/certificate';

interface ReceivedCertsOrdersTableProps {
  className?: string;
  certificates: Certificate[];
}

interface Filters {
  status?: CertificateStatus;
}

// modal view cert
function SimpleDialog(props) {
  const { open, onClose, selectedCertifiate } = props;
  if (selectedCertifiate == undefined) {
    return (
      <>
      </>
    )
  }

  return (
    <Dialog
      maxWidth='lg'
      open={open} onClose={onClose}>
      <DialogContent style={{ display: 'grid', gridTemplateColumns: '6fr 4fr', alignItems: 'center' }}>
        <div>
          <img src={selectedCertifiate.imageLink} alt="Image" style={{ maxWidth: "100%", maxHeight: "100%" }} />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'auto 2fr', marginLeft: '30px', fontSize: '15px', gap: '5px', backgroundColor: 'Background' }}>
          <p style={{ fontWeight: 'bold', borderBottom: '1px solid #000', paddingBottom: '5px' }}>CERTIFICATE CODE:</p>
          <p style={{ borderBottom: '1px solid #000' }}>{selectedCertifiate.certificateCode}</p>
          <p style={{ fontWeight: 'bold', marginTop: '0px' }}>RECEIVED IDENTITY:</p>
          <p style={{ marginTop: '0px' }}>{selectedCertifiate.receivedIdentityNumber}</p>
          <p style={{ fontWeight: 'bold' }}>RECEIVED NAME:</p>
          <p>{selectedCertifiate.receivedName}</p>
        </div>

      </DialogContent>
    </Dialog>
  );
}


// const getStatusLabel = (certificateStatus: CertificateStatus): JSX.Element => {
//   const map = {
//     '0': {
//       text: 'Draft',
//       color: 'secondary'
//     },
//     '1': {
//       text: 'Signed',
//       color: 'primary'
//     },
//     '2': {
//       text: 'Sent',
//       color: 'success'
//     }
//   };
//   const { text, color }: any = map[certificateStatus];
//   return <Label color={color}>{text}</Label>;
// };

const applyFilters = (
  certificates: Certificate[],
  filters: Filters
): Certificate[] => {
  return certificates.filter((certificate) => {
    let matches = true;

    if (filters.status && certificate.certificateStatus !== filters.status) {
      matches = false;
    }

    return matches;
  });
};

const applyPagination = (
  certificates: Certificate[],
  page: number,
  limit: number
): Certificate[] => {
  return certificates.slice(page * limit, page * limit + limit);
};

const ReceivedCertsOrdersTable: FC<ReceivedCertsOrdersTableProps> = ({
  certificates
}) => {
  const [open, setOpen] = useState(false);
  const [selectedCertifiates, setSelectedCertificates] = useState<string[]>([]);
  const [selectedCertifiate, setSelectedCertificate] = useState<Certificate>();
  const [selectedCertifiatesInformation, setSelectedCertificatesInformation] = useState<Certificate[]>([]);

  const selectedBulkActions = selectedCertifiates.length > 0;
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(5);
  const [filters] = useState<Filters>({
    status: null
  });

  const handleSelectAllCertificateOrders = (
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    setSelectedCertificates(
      event.target.checked
        ? certificates.map((certificate) => certificate.certificateID)
        : []
    );
    setSelectedCertificatesInformation(
      event.target.checked
        ? certificates
        : []
    );
  };

  const handleSelectOneCertificateOrder = (
    _event: ChangeEvent<HTMLInputElement>,
    certificateId: string,
    certificate: Certificate
  ): void => {
    if (!selectedCertifiates.includes(certificateId)) {
      setSelectedCertificates((prevSelected) => [
        ...prevSelected,
        certificateId
      ]);
      setSelectedCertificatesInformation((prevSelectedInformation) => [
        ...prevSelectedInformation,
        certificate
      ])
    } else {
      setSelectedCertificates((prevSelected) =>
        prevSelected.filter((id) => id !== certificateId)
      );

      setSelectedCertificatesInformation((prevSelected) =>
        prevSelected.filter((cert) => cert.certificateID !== certificateId)
      );
    }
  };

  const handlePageChange = (_event: any, newPage: number): void => {
    setPage(newPage);
  };

  const handleLimitChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setLimit(parseInt(event.target.value));
  };

  const filteredCertificateOrders = applyFilters(certificates, filters);
  const paginatedCertificateOrders = applyPagination(
    filteredCertificateOrders,
    page,
    limit
  );
  const selectedSomeCertificateOrders =
    selectedCertifiates.length > 0 &&
    selectedCertifiates.length < certificates.length;
  const selectedAllCertificateOrders =
    selectedCertifiates.length === certificates.length;
  const theme = useTheme();

  const handleClickOpen = (certificate) => {
    setSelectedCertificate(certificate);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  return (
    <Card>
      {selectedBulkActions && (
        <Box flex={1} p={2}>
          <BulkActions
            certificates={selectedCertifiatesInformation}
          />
        </Box>
      )}
      {!selectedBulkActions && (
        <></>
        // <CardHeader
        //   action={
        //     <Box width={150}>
        //       <FormControl fullWidth variant="outlined">
        //         <InputLabel>Status</InputLabel>
        //         <Select
        //           value={filters.status || 'all'}
        //           onChange={handleStatusChange}
        //           label="Status"
        //           autoWidth
        //         >
        //           {statusOptions.map((statusOption) => (
        //             <MenuItem key={statusOption.id} value={statusOption.id}>
        //               {statusOption.name}
        //             </MenuItem>
        //           ))}
        //         </Select>
        //       </FormControl>
        //     </Box>
        //   }
        //   title="Received Certs"
        // />
      )}
      <Divider />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  color="primary"
                  checked={selectedAllCertificateOrders}
                  indeterminate={selectedSomeCertificateOrders}
                  onChange={handleSelectAllCertificateOrders}
                />
              </TableCell>
              <TableCell>Code</TableCell>
              <TableCell>Certificate name</TableCell>
              <TableCell>Graduation year</TableCell>
              <TableCell>Organization name</TableCell>
              <TableCell>Received date</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedCertificateOrders.map((certificate) => {
              const isCertificateOrderSelected = selectedCertifiates.includes(
                certificate.certificateID
              );
              return (
                <TableRow
                  hover
                  key={certificate.certificateID}
                  selected={isCertificateOrderSelected}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      color="primary"
                      checked={isCertificateOrderSelected}
                      onChange={(event: ChangeEvent<HTMLInputElement>) =>
                        handleSelectOneCertificateOrder(
                          event,
                          certificate.certificateID,
                          certificate
                        )
                      }
                      value={isCertificateOrderSelected}
                    />
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {certificate.certificateCode}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      maxWidth={200}
                      gutterBottom
                      noWrap
                    >
                      {certificate.certificateName}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" noWrap>
                      {certificate.classification}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      align='center'
                      gutterBottom
                      noWrap
                    >
                      {certificate.yearOfGraduation}
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
                      {certificate.oganizationName}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                      align='center'
                    >
                      {new Date(certificate.receivedDate).toLocaleDateString('en-GB')}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Tooltip title="View" arrow>
                      <IconButton
                        sx={{
                          '&:hover': { background: theme.colors.info.lighter },
                          color: theme.palette.info.main
                        }}
                        color="inherit"
                        size="small"
                        onClick={() => handleClickOpen(certificate)}
                      >
                        <VisibilityIcon fontSize="small" />
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
          count={filteredCertificateOrders.length}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleLimitChange}
          page={page}
          rowsPerPage={limit}
          rowsPerPageOptions={[5, 10, 25, 30]}
        />
      </Box>
      <SimpleDialog
        fullWidth={'md'}
        maxWidth={'800md'}
        open={open}
        onClose={handleClose}
        selectedCertifiate={selectedCertifiate}
      />
    </Card>
  );
};

ReceivedCertsOrdersTable.propTypes = {
  certificates: PropTypes.array.isRequired
};

ReceivedCertsOrdersTable.defaultProps = {
  certificates: []
};

export default ReceivedCertsOrdersTable;
