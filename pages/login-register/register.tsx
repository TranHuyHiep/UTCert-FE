import React, { useState } from 'react';
import {
  Card,
  Spacer,
  Button,
  Text,
  Input,
  Row,
  Checkbox,
  Container,
} from '@nextui-org/react';
import { CardActions, CardContent, Box } from '@mui/material';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Collapse from '@mui/material/Collapse';
import UploadTwoToneIcon from '@mui/icons-material/UploadTwoTone';

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest
  })
}));


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
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const registerAccount = () => {
    const checkbox = document.getElementById('policy') as HTMLInputElement;
    if (checkbox.checked) {
      alert('ok')
    } else {
      alert('ko')
    }

  }

  return (
    <>
      <div>
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
              placeholder="Kim Sao"
            />
            <Text size={18} weight="bold">Upload your logo
              <ButtonUploadWrapper>
                <Input
                  accept="image/*"
                  id="icon-button-file"
                  name="icon-button-file"
                  type="file"
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
            <CardActions disableSpacing style={{ padding: '0px', margin: '0px' }}>
              <Text size={14}>Before using our services, please read and agree to the following terms and conditions.</Text>
              <ExpandMore
                expand={expanded}
                onClick={handleExpandClick}
                aria-expanded={expanded}
                aria-label="show more"
              >
                <ExpandMoreIcon />
              </ExpandMore>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
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
            </Collapse>
            <Row justify="space-between">
              <Checkbox id='policy'>
                <Text size={14}>I Agree </Text>
              </Checkbox>
            </Row>
            <Button onClick={registerAccount}>Confirm</Button>
          </Card>
        </Container>
      </div>
    </>
  );
}


export default Register;
