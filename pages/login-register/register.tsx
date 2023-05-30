import React, { useState } from 'react';
// import bg from '@/public/background.jpg'
import {
  Card,
  Text,
  Input,
  Row,
  Container,
} from '@nextui-org/react';

import { CardContent, Checkbox, Box, FormControlLabel, Button } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';
import UploadTwoToneIcon from '@mui/icons-material/UploadTwoTone';
import GetCookie from '@/hooks/getCookie';
import axios from 'axios';
import FormData from 'form-data';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { API_URL } from '@/constants/appConstants';

const ButtonUploadWrapper = styled(Box)(
  ({ theme }) => `

    .MuiIconButton-root {
      border-radius: 5%;
      width: 375px;
      background: ${theme.colors.primary.main};
      color: ${theme.palette.primary.contrastText};
      box-shadow: ${theme.colors.shadows.primary};
  
      &:hover {
        background: ${theme.colors.primary.dark};
      }
    }
`
);

function Register() {
  const [nameValue, setNameValue] = useState('');
  const [fileValue, setFileValue] = useState('');
  const [isChecked, setIsChecked] = useState(false);

  const handleNameChange = (event) => {
    setNameValue(event.target.value);
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFileValue(selectedFile);
  };

  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
  };

  const registerAccount = async () => {
    const checkbox = document.getElementById('policy') as HTMLInputElement;
    if (nameValue === "" || nameValue === null) {
      alert("You must enter name!");
      return;
    }
    if (fileValue === "" || fileValue === null) {
      alert("You select logo name!");
      return;
    }
    if (checkbox.checked) {
      try {
        const url = API_URL + '/Home/add-user';

        const formData = new FormData();
        formData.append('UserID', GetCookie('stakeId'));
        formData.append('UserName', nameValue);
        formData.append('Logo', fileValue);

        await axios.post(url, formData);
        alert('Register Account Successfully!')
        window.location.href = '/dashboards/home'
      } catch (error) {
        console.error(error);
      }
    } else {
      alert('You have to confirm policy!')
    }
  }

  return (
    <>
      <div style={{
        backgroundImage: `url(https://res.cloudinary.com/dgkr0cmla/image/upload/v1685119889/background_r0uspa.jpg)`,
        width: '100%',
        height: '100%',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat'
      }}>
        <Container
          display="flex"
          alignItems="center"
          justify="center"
          css={{ minHeight: '100vh' }}
        >
          <Card css={{ mw: '420px', p: '20px' }} variant="bordered">
            <Text
              size={24}
              weight="bold"
              css={{
                as: 'center',
                mb: '20px',
              }}
            >
              YOUR INFOMATION
            </Text>
            <Text size={18} weight="bold">Your name</Text>
            <Input
              clearable
              underlined
              fullWidth
              color="primary"
              size="lg"
              placeholder="Nguyen Van An"
              value={nameValue}
              onChange={handleNameChange}
            />
            <Text size={18} weight="bold">Upload your logo
              <ButtonUploadWrapper>
                <Input
                  accept="image/*"
                  id="icon-button-file"
                  name="icon-button-file"
                  type="file"
                  onChange={handleFileChange}
                  hidden
                />
                <label htmlFor="icon-button-file">
                  <IconButton component="span" color="primary" size='small'>
                    Select file
                    <UploadTwoToneIcon />
                  </IconButton>
                </label>
              </ButtonUploadWrapper>
            </Text>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography>Before using our services, please read and agree to the following terms and conditions.</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  <CardContent style={{ padding: '0px', margin: '0px' }}> 
                    <Text size={13}>
                      1. I certify that all the information I provide during the registration process is accurate, complete, and not deceptive.
                    </Text>
                    <Text size={13}>
                      2. I will keep my password secure and not share my account information with anyone else.
                    </Text>
                    <Text size={13}>
                      3. I agree that the use of blockchain services will comply with current local and international regulations and laws.
                    </Text>
                    <Text size={13}>
                      4. I agree that my transactions on the blockchain will be subject to the conditions and regulations specified in the blockchain system.
                    </Text>
                    <Text size={13}>
                      5. I certify that I am the lawful owner of my blockchain account and will not use the service to engage in illegal or unlawful activities.
                    </Text>
                    <Text size={13}>
                      6. I agree that blockchain is not responsible for any damages or losses arising from my failure to comply with these terms and conditions or from technical errors or other issues on the blockchain system.
                    </Text>
                  </CardContent>
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Row justify="space-between">
              <FormControlLabel
                control={
                  <Checkbox
                    checked={isChecked}
                    onChange={handleCheckboxChange}
                    id="policy"
                  />
                }
                label={<Typography variant="body1">I Agree</Typography>}
                htmlFor="policy"
              />
            </Row>
            <Button variant="contained" onClick={registerAccount}>Confirm</Button>
          </Card>
        </Container>
      </div>
    </>
  );
}


export default Register;
