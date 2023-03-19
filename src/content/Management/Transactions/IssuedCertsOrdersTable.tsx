import { FC, ChangeEvent, useState } from 'react';
import { format } from 'date-fns';
import numeral from 'numeral';
import PropTypes from 'prop-types';
import GetCookie from '@/hooks/getCookie';
import { BrowserWallet } from '@meshsdk/core';

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

import SendIcon from '@mui/icons-material/Send';
import Label from '@/components/Label';
import {
  Certificate,
  CertificateStatus,
  ContactStatus
} from '@/models/certificate';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import BulkActions from './BulkActions';
import { AssetMetadata, ForgeScript, Mint, Transaction } from '@meshsdk/core';
import BlockIcon from '@mui/icons-material/Block';
import { Filter } from '@mui/icons-material';
interface IssuedCertsOrdersTableProps {
  className?: string;
  certificates: Certificate[];
}

interface Filters {
  certificateStatus?: CertificateStatus;
}

const getStatusLabel = (certificateStatus: CertificateStatus): JSX.Element => {
  const map = {
    0: {
      text: 'Draft',
      color: 'secondary'
    },
    1: {
      text: 'Signed',
      color: 'primary'
    },
    2: {
      text: 'Sent',
      color: 'success'
    },
    3: {
      text: 'Banned',
      color: 'error',
    },
  };
  const { text, color }: any = map[certificateStatus];
  return <Label color={color}>{text}</Label>;
};

const getStatusContactLabel = (contactStatus: ContactStatus): JSX.Element => {
  const map = {
    '0': {
      text: 'Pending',
      color: 'info'
    },
    '1': {
      text: 'Connected',
      color: 'success'
    }
  };
  const { text, color }: any = map[contactStatus];
  return <Label color={color}>{text}</Label>;
};

const applyFilters = (
  certificates: Certificate[],
  filters: Filters
): Certificate[] => {
  return certificates.filter((certificate) => {
    let matches = true;

    if (
      filters.certificateStatus &&
      certificate.certificateStatus !== filters.certificateStatus
    ) {
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

const IssuedCertsOrdersTable: FC<IssuedCertsOrdersTableProps> = ({
  certificates
}) => {
  const [selectedCertifiates, setSelectedCertificates] = useState<string[]>([]);
  const [selectedCertifiatesInformation, setSelectedCertificatesInformation] = useState<Certificate[]>([]);

  const selectedBulkActions = selectedCertifiates.length > 0;
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(5);
  const [filters, setFilters] = useState<Filters>({
    certificateStatus: null
  });

  const statusOptions = [
    {
      id: 0,
      name: 'Draft'
    },
    {
      id: 1,
      name: 'Pending'
    },
    {
      id: 2,
      name: 'Sent'
    },
    {
      id: 3,
      name: 'Banned'
    },
    {
      id: 'all',
      name: 'All'
    },
  ];

  const handleStatusChange = (e: ChangeEvent<HTMLInputElement>): void => {
    let value = null;
    console.log(e.target.value);
    
    if (e.target.value !== 'all') {
      value = e.target.value;
    }
    
    setFilters((prevFilters) => ({
      ...prevFilters,
      certificateStatus: value
    }));
    
  };

  const handleSelectAllCryptoOrders = (
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    setSelectedCertificates(
      event.target.checked
        ? certificates.map((certificate) => certificate.certificateID)
        : []
    );
  };

  const handleSelectOneCryptoOrder = (
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
    }
  };

  const handlePageChange = (_event: any, newPage: number): void => {
    setPage(newPage);
  };

  const handleLimitChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setLimit(parseInt(event.target.value));
  };

  const filteredCertificates = applyFilters(certificates, filters);
  const paginatedCryptoOrders = applyPagination(
    filteredCertificates,
    page,
    limit
  );
  const selectedSomeCryptoOrders =
    selectedCertifiates.length > 0 &&
    selectedCertifiates.length < certificates.length;
  const selectedAllCryptoOrders =
    selectedCertifiates.length === certificates.length;
  const theme = useTheme();

  function handleSign(certificateId) {
    fetch('https://localhost:44325/api/v1/Certificates/issued/sign', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(certificateId)
    })
      .then(response => {
        // Xử lý phản hồi ở đây
        alert("Ký thành công!");
        location.reload();
      })
      .catch(error => {
        // Xử lý lỗi ở đây
        alert("Ký thất bại!")
      });

  }

  function handleBan(certificateId) {
    // TODO
  }

  async function handleSend(certificate) {
    const wallet = await BrowserWallet.enable('eternl');
    // prepare forgingScript
    if (wallet) {
      const usedAddress = await wallet.getUsedAddresses();
      const address = usedAddress[0];
      const forgingScript = ForgeScript.withOneSignature(address);
      const tx = new Transaction({ initiator: wallet });
      // define asset#1 metadata
      const assetMetadata1: AssetMetadata = {
        "certificateName": certificate.certificateName,
        "classification": certificate.classification,
        "image": certificate.ipfsLink,
        "mediaType": "image/jpg",
        "receivedName": certificate.receivedName,
        "yearOfGraduation": certificate.yearOfGraduation,
      };
      const asset1: Mint = {
        assetName: certificate.certificateType + certificate.certificateCode,
        assetQuantity: '1',
        metadata: assetMetadata1,
        label: '721',
        recipient: certificate.receivedAddressWallet,
      };
      console.log(asset1);
      console.log(assetMetadata1);

      tx.mintAsset(
        forgingScript,
        asset1,
      );

      const unsignedTx = await tx.build();
      const signedTx = await wallet.signTx(unsignedTx);
      const txHash = await wallet.submitTx(signedTx);
      console.log(txHash);
    }
    // TODO viet ham gui api

  }

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
        <CardHeader
          action={
            <Box width={150}>
              <FormControl fullWidth variant="outlined">
                <InputLabel>Status</InputLabel>
                <Select
                  value={filters.certificateStatus || 'all'}
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
          title="Issued Certs"
        />
      )}
      <Divider />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  color="primary"
                  checked={selectedAllCryptoOrders}
                  indeterminate={selectedSomeCryptoOrders}
                  onChange={handleSelectAllCryptoOrders}
                />
              </TableCell>
              <TableCell>Code</TableCell>
              <TableCell>Certificate Name</TableCell>
              <TableCell>Received name</TableCell>
              <TableCell align="center">Date signed</TableCell>
              <TableCell align="right">Certificate status</TableCell>
              <TableCell align="right">Contact status</TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedCryptoOrders.map((certificate) => {
              const isCryptoOrderSelected = selectedCertifiates.includes(
                certificate.certificateID
              );
              return (
                <TableRow
                  hover
                  key={certificate.certificateID}
                  selected={isCryptoOrderSelected}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      color="primary"
                      checked={isCryptoOrderSelected}
                      onChange={(event: ChangeEvent<HTMLInputElement>) =>
                        handleSelectOneCryptoOrder(
                          event,
                          certificate.certificateID,
                          certificate
                        )
                      }
                      value={isCryptoOrderSelected}
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
                      gutterBottom
                      noWrap
                    >
                      {certificate.certificateName}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" noWrap>
                      {certificate.classification}
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
                      {certificate.receivedName}
                    </Typography>
                  </TableCell>

                  <TableCell align="right">
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {certificate.receivedDoB}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    {getStatusLabel(certificate.certificateStatus)}
                  </TableCell>
                  <TableCell align="right">
                    {getStatusContactLabel(certificate.contactStatus)}
                  </TableCell>
                  <TableCell align="right">
                    {certificate.certificateStatus == 0 ? (
                      <Tooltip title="Sign" arrow>
                        <IconButton
                          sx={{
                            '&:hover': {
                              background: theme.colors.primary.lighter
                            },
                            color: theme.palette.primary.main
                          }}
                          color="inherit"
                          size="small"
                          onClick={() => handleSign(certificate.certificateID)}
                        >
                          <EditTwoToneIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    ) : (
                      certificate.certificateStatus == 1 ? (
                        <Tooltip title="Send" arrow>
                          <IconButton
                            sx={{
                              '&:hover': {
                                background: theme.colors.primary.lighter
                              },
                              color: theme.palette.primary.main
                            }}
                            color="inherit"
                            size="small"
                            onClick={() => handleSend(certificate)}
                          >
                            <SendIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>) : (
                        certificate.certificateStatus == 2 ? (
                          <Tooltip title="Ban" arrow>
                            <IconButton
                              sx={{
                                '&:hover': {
                                  background: theme.colors.primary.lighter
                                },
                                color: theme.palette.primary.main
                              }}
                              color="error"
                              size="small"
                              onClick={() => handleBan(certificate.certificateID)}
                            >
                              <BlockIcon
                                color='error'
                                fontSize="small"
                              />
                            </IconButton>
                          </Tooltip>
                        ) : (<></>)
                      )
                    )}
                    <Tooltip title="View" arrow>
                      <IconButton
                        sx={{
                          '&:hover': { background: theme.colors.error.lighter },
                          color: theme.palette.error.main
                        }}
                        color="inherit"
                        size="small"
                      >
                        <DeleteTwoToneIcon fontSize="small" />
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
          count={filteredCertificates.length}
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

IssuedCertsOrdersTable.propTypes = {
  certificates: PropTypes.array.isRequired
};

IssuedCertsOrdersTable.defaultProps = {
  certificates: []
};

export default IssuedCertsOrdersTable;
