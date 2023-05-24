import { FC, ChangeEvent, useState } from 'react';
import PropTypes from 'prop-types';
import { Asset, BrowserWallet } from '@meshsdk/core';

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
  CardHeader,
  Dialog,
  DialogContent,
} from '@mui/material';

import SendIcon from '@mui/icons-material/Send';
import Label from '@/components/Label';
import {
  Certificate,
  CertificateStatus,
  ContactStatus
} from '@/models/certificate';
import DeleteIcon from '@mui/icons-material/Delete';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import VisibilityIcon from '@mui/icons-material/Visibility';
import BulkActions from './BulkActions';
import BlockIcon from '@mui/icons-material/Block';
import { AssetMetadata, ForgeScript, Mint, Transaction } from '@meshsdk/core';
import React from 'react';
interface IssuedCertsOrdersTableProps {
  className?: string;
  certificates: Certificate[];
}

interface Filters {
  certificateStatus?: CertificateStatus;
}

const getStatusLabel = (certificateStatus: CertificateStatus): JSX.Element => {
  const map = {
    1: {
      text: 'Draft',
      color: 'secondary'
    },
    2: {
      text: 'Signed',
      color: 'primary'
    },
    3: {
      text: 'Sent',
      color: 'success'
    },
    4: {
      text: 'Banned',
      color: 'error',
    },
  };
  const { text, color }: any = map[certificateStatus];
  return <Label color={color}>{text}</Label>;
};

const getStatusContactLabel = (contactStatus: ContactStatus): JSX.Element => {
  const map = {
    '1': {
      text: 'Pending',
      color: 'info'
    },
    '2': {
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
          <img src={selectedCertifiate.ipfsLink.replace("ipfs://", "https://ipfs.io/ipfs/")} alt="Image" style={{ maxWidth: "100%", maxHeight: "100%" }} />
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

// table certs
const IssuedCertsOrdersTable: FC<IssuedCertsOrdersTableProps> = ({
  certificates
}) => {
  const [open, setOpen] = useState(false);
  const [selectedCertifiates, setSelectedCertificates] = useState<string[]>([]);
  const [selectedCertifiate, setSelectedCertificate] = useState<Certificate>();
  const [selectedCertifiatesInformation, setSelectedCertificatesInformation] = useState<Certificate[]>([]);

  const selectedBulkActions = selectedCertifiates.length > 0;
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(5);
  const [filters, setFilters] = useState<Filters>({
    certificateStatus: null
  });

  const handleClickOpen = (certificate) => {
    setSelectedCertificate(certificate);
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
      id: 1,
      name: 'Draft'
    },
    {
      id: 2,
      name: 'Signed'
    },
    {
      id: 3,
      name: 'Sent'
    },
    {
      id: 4,
      name: 'Banned'
    },

  ];

  const handleStatusChange = (e: ChangeEvent<HTMLInputElement>): void => {
    let value = null;

    if (e.target.value !== 'all') {
      value = e.target.value;
    }

    setFilters((prevFilters) => ({
      ...prevFilters,
      certificateStatus: value
    }));

  };

  const handleSelectAllCertificateOrders = (
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    setSelectedCertificates(
      event.target.checked
        ? paginatedCertificateOrders.map((certificate) => certificate.certificateID)
        : []
    );
    setSelectedCertificatesInformation(
      event.target.checked
        ? paginatedCertificateOrders
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

  const filteredCertificates = applyFilters(certificates, filters);
  const paginatedCertificateOrders = applyPagination(
    filteredCertificates,
    page,
    limit
  );
  const selectedSomeCertificateOrders =
    selectedCertifiates.length > 0 &&
    selectedCertifiates.length < paginatedCertificateOrders.length;
  const selectedAllCertificateOrders =
    selectedCertifiates.length === paginatedCertificateOrders.length;
  const theme = useTheme();

  function handleSign(certificate: Certificate) {
    try {
      let myPromise = new Promise<void>(async function (myResolve, myReject) {
        const wallet = await BrowserWallet.enable('eternl');
        // prepare forgingScript
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
          "identity": certificate.receivedIdentityNumber
        };
        const asset1: Mint = {
          assetName: certificate.certificateType + certificate.certificateCode,
          assetQuantity: '1',
          metadata: assetMetadata1,
          label: '721',
          recipient: address,
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
        console.log("txHash");
        console.log(txHash);
        myResolve(); // when successful
        myReject();  // when error
      });

      // "Consuming Code" (Must wait for a fulfilled Promise)
      myPromise.then(
        function () {
          /* code if successful */
          fetch('http://tamperproofcerts.somee.com/api/v1/Certificate/issued/sign', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(certificate.certificateID)
          })
            .then(() => {
              // Xử lý phản hồi ở đây
              alert("Ký thành công!");
            })
            .catch(() => {
              // Xử lý lỗi ở đây
              alert("Ký thất bại!")
            });
        }
      ).catch(function () {
        alert("Gửi thất bại!")
      })
    }
    catch (error) {
      alert('Loi');
    }


  }

  function textToHex(text) {
    let hex = '';

    for (let i = 0; i < text.length; i++) {
      let charCode = text.charCodeAt(i).toString(16);
      hex += ('00' + charCode).slice(-2); // Ensure leading zero for single digit
    }

    return hex;
  }

  function handleBan(certificateId) {
    fetch('http://tamperproofcerts.somee.com/api/v1/Certificate/issued/ban', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(certificateId)
    })
      .then(() => {
        // Xử lý phản hồi ở đây
        alert("Ban thành công!");
      })
      .catch(() => {
        // Xử lý lỗi ở đây
        alert("Ban thất bại!")
      });
  }

  function handleDelete(certificateId) {
    var certs = []
    certs.push(certificateId)
    fetch('http://tamperproofcerts.somee.com/api/v1/Certificate/issued/delete-multiple', {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(certs)
    })
      .then(() => {
        // Xử lý phản hồi ở đây
        alert("Delete Successful!");
      })
      .catch(() => {
        // Xử lý lỗi ở đây
        alert("Delete Error!")
      });
  }

  async function handleSend(certificate) {
    let myPromise = new Promise<void>(async function (myResolve, myReject) {
      const wallet = await BrowserWallet.enable('eternl');
      // prepare forgingScript
      const usedAddress = await wallet.getUsedAddresses();
      const policyId = await wallet.getPolicyIds();
      const tx = new Transaction({ initiator: wallet });
      // define asset#1 metadata
      const assetName = textToHex(certificate.certificateType + certificate.certificateCode);
      const asset1: Asset = {
        unit: policyId[0] + assetName,
        quantity: '1',
      };
      console.log(certificate.receivedAddressWallet);

      tx.sendAssets(
        certificate.receivedAddressWallet,
        [asset1],
      );
      const unsignedTx = await tx.build();
      const signedTx = await wallet.signTx(unsignedTx);
      const txHash = await wallet.submitTx(signedTx);
      console.log("txHash");
      console.log(txHash);
      myResolve(); // when successful
      myReject();  // when error
    });


    // "Consuming Code" (Must wait for a fulfilled Promise)
    myPromise.then(
      function () {
        /* code if successful */
        fetch('http://tamperproofcerts.somee.com/api/v1/Certificate/issued/send', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(certificate.certificateID)
        })
          .then(() => {
            // Xử lý phản hồi ở đây
            alert("Send successful!");
          })
          .catch(error => {
            // Xử lý lỗi ở đây
            console.log(error);
            alert("Send error!")
          });
      }
    ).catch(function () {
      alert("Send error!")
    })

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
                  checked={selectedAllCertificateOrders}
                  indeterminate={selectedSomeCertificateOrders}
                  onChange={handleSelectAllCertificateOrders}
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
                      {new Date(certificate.receivedDoB).toLocaleDateString('en-GB')}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    {getStatusLabel(certificate.certificateStatus)}
                  </TableCell>
                  <TableCell align="right">
                    {getStatusContactLabel(certificate.contactStatus)}
                  </TableCell>
                  <TableCell align="right">
                    {certificate.certificateStatus == 1 ? (
                      <>
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
                            onClick={() => handleSign(certificate)}
                          >
                            <EditTwoToneIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete" arrow>
                          <IconButton
                            sx={{
                              '&:hover': {
                                background: theme.colors.primary.lighter
                              },
                              color: theme.palette.error.main
                            }}
                            color="error"
                            size="small"
                            onClick={() => handleDelete(certificate.certificateID)}
                          >
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      </>
                    ) : (
                      certificate.certificateStatus == 2 ? (
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
                        certificate.certificateStatus == 3 ? (
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
          count={filteredCertificates.length}
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

IssuedCertsOrdersTable.propTypes = {
  certificates: PropTypes.array.isRequired
};

IssuedCertsOrdersTable.defaultProps = {
  certificates: []
};

export default IssuedCertsOrdersTable;
