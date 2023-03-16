import {
  Button,
  Card,
  Box,
  Grid,
  Typography,
  useTheme,
  styled,
  Avatar,
  Divider,
  alpha,
  ListItem,
  ListItemText,
  List,
  ListItemAvatar
} from '@mui/material';
import TrendingUp from '@mui/icons-material/TrendingUp';
import Text from 'src/components/Text';
import { Chart } from 'src/components/Chart';
import type { ApexOptions } from 'apexcharts';

const AvatarSuccess = styled(Avatar)(
  ({ theme }) => `
      background-color: ${theme.colors.success.main};
      color: ${theme.palette.success.contrastText};
      width: ${theme.spacing(8)};
      height: ${theme.spacing(8)};
      box-shadow: ${theme.colors.shadows.success};
`
);

const ListItemAvatarWrapper = styled(ListItemAvatar)(
  ({ theme }) => `
  min-width: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: ${theme.spacing(1)};
  padding: ${theme.spacing(0.5)};
  border-radius: 60px;
  background: ${theme.palette.mode === 'dark'
      ? theme.colors.alpha.trueWhite[30]
      : alpha(theme.colors.alpha.black[100], 0.07)
    };

  img {
    background: ${theme.colors.alpha.trueWhite[100]};
    padding: ${theme.spacing(0.5)};
    display: block;
    border-radius: inherit;
    height: ${theme.spacing(4.5)};
    width: ${theme.spacing(4.5)};
  }
`
);

function AccountBalance() {
  const theme = useTheme();

  const chartOptions: ApexOptions = {
    chart: {
      background: 'transparent',
      stacked: false,
      toolbar: {
        show: false
      }
    },
    plotOptions: {
      pie: {
        donut: {
          size: '60%'
        }
      }
    },
    colors: ['#ff9900', '#1c81c2', '#5c6ac0', "#f6abb6"],
    dataLabels: {
      enabled: true,
      formatter: function (val) {
        return val + '%';
      },
      style: {
        colors: [theme.colors.alpha.trueWhite[100]]
      },
      background: {
        enabled: true,
        foreColor: theme.colors.alpha.trueWhite[100],
        padding: 8,
        borderRadius: 4,
        borderWidth: 0,
        opacity: 0.3,
        dropShadow: {
          enabled: true,
          top: 1,
          left: 1,
          blur: 1,
          color: theme.colors.alpha.black[70],
          opacity: 0.5
        }
      },
      dropShadow: {
        enabled: true,
        top: 1,
        left: 1,
        blur: 1,
        color: theme.colors.alpha.black[50],
        opacity: 0.5
      }
    },
    fill: {
      opacity: 1
    },
    labels: ['Draft', 'Signed', 'Sent', 'Received'],
    legend: {
      labels: {
        colors: theme.colors.alpha.trueWhite[100]
      },
      show: false
    },
    stroke: {
      width: 0
    },
    theme: {
      mode: theme.palette.mode
    }
  };

  const contactSeries = [9, 1];
  const certificateSeries = [10, 20, 60, 10];

  return (
    <Card>
      <Grid spacing={0} container>
        <Grid item xs={12} md={6}>
          <Box p={4}>
            <Typography variant="h2">Contacts</Typography>
            <Box
              component="span"
              sx={{
                display: { xs: 'none', md: 'inline-block' }
              }}
            >
              <Divider absolute orientation="vertical" />
            </Box>
            <Box flex={1}>
              <Grid container spacing={0}>
                <Grid
                  xs={12}
                  sm={5}
                  item
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                >
                  <Chart
                    height={250}
                    options={chartOptions}
                    series={contactSeries}
                    type="donut"
                  />
                </Grid>
                <Grid xs={12} sm={7} item display="flex" alignItems="center">
                  <List
                    disablePadding
                    sx={{
                      width: '100%'
                    }}
                  >
                    <ListItem disableGutters>
                      <ListItemAvatarWrapper>
                        <img
                          alt="Pending"
                          src="/static/images/placeholders/logo/bitcoin.png"
                        />
                      </ListItemAvatarWrapper>
                      <ListItemText
                        primary="Pending"
                        primaryTypographyProps={{ variant: 'h5', noWrap: true }}
                        secondary="Pending Connection"
                        secondaryTypographyProps={{
                          variant: 'subtitle2',
                          noWrap: true
                        }}
                      />
                      <Box>
                        <Typography align="right" variant="h4" noWrap>
                          20%
                        </Typography>
                        <Text color="success">+2.54%</Text>
                      </Box>
                    </ListItem>
                    <ListItem disableGutters>
                      <ListItemAvatarWrapper>
                        <img
                          alt="Connected"
                          src="/static/images/placeholders/logo/ripple.png"
                        />
                      </ListItemAvatarWrapper>
                      <ListItemText
                        primary="Connected"
                        primaryTypographyProps={{ variant: 'h5', noWrap: true }}
                        secondary="Connected"
                        secondaryTypographyProps={{
                          variant: 'subtitle2',
                          noWrap: true
                        }}
                      />
                      <Box>
                        <Typography align="right" variant="h4" noWrap>
                          10%
                        </Typography>
                        <Text color="error">-1.22%</Text>
                      </Box>
                    </ListItem>
                  </List>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box p={4}>
            <Typography variant="h2">Credentials</Typography>
            <Box
              component="span"
              sx={{
                display: { xs: 'none', md: 'inline-block' }
              }}
            >
              <Divider absolute orientation="vertical" />
            </Box>
            <Box flex={1}>
              <Grid container spacing={0}>
                <Grid
                  xs={12}
                  sm={5}
                  item
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                >
                  <Chart
                    height={250}
                    options={chartOptions}
                    series={certificateSeries}
                    type="donut"
                  />
                </Grid>
                <Grid xs={12} sm={7} item display="flex" alignItems="center">
                  <List
                    disablePadding
                    sx={{
                      width: '100%'
                    }}
                  >
                    <ListItem disableGutters>
                      <ListItemAvatarWrapper>
                        <img
                          alt="Draft"
                          src="/static/images/placeholders/logo/ripple.png"
                        />
                      </ListItemAvatarWrapper>
                      <ListItemText
                        primary="Draft"
                        primaryTypographyProps={{ variant: 'h5', noWrap: true }}
                        secondary="Draft certificates"
                        secondaryTypographyProps={{
                          variant: 'subtitle2',
                          noWrap: true
                        }}
                      />
                      <Box>
                        <Typography align="right" variant="h4" noWrap>
                          10
                        </Typography>
                        <Text color="error">10%</Text>
                      </Box>
                    </ListItem>
                    <ListItem disableGutters>
                      <ListItemAvatarWrapper>
                        <img
                          alt="Signed"
                          src="/static/images/placeholders/logo/cardano.png"
                        />
                      </ListItemAvatarWrapper>
                      <ListItemText
                        primary="Signed"
                        primaryTypographyProps={{ variant: 'h5', noWrap: true }}
                        secondary="Signed certificates"
                        secondaryTypographyProps={{
                          variant: 'subtitle2',
                          noWrap: true
                        }}
                      />
                      <Box>
                        <Typography align="right" variant="h4" noWrap>
                          20
                        </Typography>
                        <Text color="success">20%</Text>
                      </Box>
                    </ListItem>
                    <ListItem disableGutters>
                      <ListItemAvatarWrapper>
                        <img
                          alt="Sent"
                          src="/static/images/placeholders/logo/ethereum.png"
                        />
                      </ListItemAvatarWrapper>
                      <ListItemText
                        primary="Sent"
                        primaryTypographyProps={{ variant: 'h5', noWrap: true }}
                        secondary="Sent certificates"
                        secondaryTypographyProps={{
                          variant: 'subtitle2',
                          noWrap: true
                        }}
                      />
                      <Box>
                        <Typography align="right" variant="h4" noWrap>
                          30
                        </Typography>
                        <Text color="error">30%</Text>
                      </Box>
                    </ListItem>
                    <ListItem disableGutters>
                      <ListItemAvatarWrapper>
                        <img
                          alt="Received"
                          src="/static/images/placeholders/logo/ethereum.png"
                        />
                      </ListItemAvatarWrapper>
                      <ListItemText
                        primary="Received"
                        primaryTypographyProps={{ variant: 'h5', noWrap: true }}
                        secondary="Received certificates"
                        secondaryTypographyProps={{
                          variant: 'subtitle2',
                          noWrap: true
                        }}
                      />
                      <Box>
                        <Typography align="right" variant="h4" noWrap>
                          40
                        </Typography>
                        <Text color="error">40%</Text>
                      </Box>
                    </ListItem>
                  </List>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Card>
  );
}

export default AccountBalance;
