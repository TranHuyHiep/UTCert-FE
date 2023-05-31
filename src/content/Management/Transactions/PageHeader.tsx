
import {
  Typography,
  Button,
  Grid,
  Dialog,
  DialogTitle,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText
} from '@mui/material';
import { useState } from 'react';
import PropTypes from 'prop-types';
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import AddIcon from '@mui/icons-material/Add';
import GetCookie from '@/hooks/getCookie';
import { API_CREATE_URL } from '@/constants/appConstants';
import { enqueueSnackbar } from 'notistack';

function SimpleDialog(props) {
  const { onClose, selectedValue, open } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    handleListItemClick('addCerts', selectedFile);
  };
  
  const handleListItemClick = async (destination, selectedFile) => {
    if (destination === 'addCerts') {
      if (selectedFile) {
        console.log(selectedFile);

        try {
          const formData = new FormData();
          formData.append('UserID', GetCookie('stakeId'));
          formData.append('fileCSV', selectedFile, selectedFile.name);
          
          const response = await fetch(API_CREATE_URL + '/Certificate/issuer', {
            method: 'POST',
            body: formData,
            headers: {
              'Accept': '*/*'
            }
          });
      
          if (response.ok) {
            enqueueSnackbar('File uploaded successfully!', { variant: 'success' });
          } else {
            enqueueSnackbar('Error uploading file!', { variant: 'error'});
          }
        } catch (error) {
          enqueueSnackbar('Error uploading file!', { variant: 'error'});
        }
      } else {
        enqueueSnackbar('Error uploading file!', { variant: 'error'});
      }
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Add file CSV</DialogTitle>
      <List sx={{ pt: 0 }}>
        <ListItem
          autoFocus
          button
          onClick={() => document.getElementById('fileInput').click()}
        >
          <ListItemAvatar>
            <Avatar>
              <AddIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary=".csv" />
          <input
            type="file"
            id="fileInput"
            accept=".csv"
            style={{ display: 'none' }}
            onChange={handleFileChange}
          />
        </ListItem>
      </List>
    </Dialog>
  );
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  // selectedValue: PropTypes.string.isRequireds
};

function PageHeader() {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Grid container justifyContent="space-between" alignItems="center">
      <Grid item>
        <Typography variant="h3" component="h3" gutterBottom>
          Create Certificates
        </Typography>
        <Typography variant="subtitle2">
          Do you want issued certs?
        </Typography>
      </Grid>
      <Grid item>
        <Button
          sx={{ mt: { xs: 2, md: 0 } }}
          variant="contained"
          startIcon={<AddTwoToneIcon fontSize="small" />}
          onClick={handleClickOpen}
        >
          Create certificate
        </Button>
        <SimpleDialog 
          open={open} 
          onClose={handleClose} 
        />
      </Grid>
    </Grid>
  );
}

export default PageHeader;
