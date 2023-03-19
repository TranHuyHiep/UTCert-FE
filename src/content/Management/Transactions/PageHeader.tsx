
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

function SimpleDialog(props) {
  const { onClose, selectedValue, open } = props;
  const [selectedFile, setSelectedFile] = useState(null);

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    handleListItemClick('addAccount');
  };
  
  const handleListItemClick = async (destination) => {
    if (destination === 'addAccount') {
      if (selectedFile) {
        const formData = new FormData();
        formData.append('file', selectedFile);
        formData.append('policyId', GetCookie('policyId'));

        try {
          const response = await fetch(
            'https://localhost:44325/api/v1/Certificates/issuer',
            {
              method: 'POST',
              body: formData
            }
          );

          if (response.ok) {
            console.log('File uploaded successfully');
          } else {
            console.error('Error uploading file');
          }
        } catch (error) {
          console.error('Error uploading file', error);
        }
      } else {
        console.error('No file selected');
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

  const user = {
    name: 'Catherine Pike',
    avatar: '/static/images/avatars/1.jpg'
  };
  return (
    <Grid container justifyContent="space-between" alignItems="center">
      <Grid item>
        <Typography variant="h3" component="h3" gutterBottom>
          Create Certificates
        </Typography>
        <Typography variant="subtitle2">
          {user.name}, do you want issued certs?
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
