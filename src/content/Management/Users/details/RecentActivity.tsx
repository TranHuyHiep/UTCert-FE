import {
  Box,
  Typography,
  Card,
  CardHeader,
  Divider,
  Avatar,
  useTheme,
  styled
} from '@mui/material';

import ShoppingBagTwoToneIcon from '@mui/icons-material/ShoppingBagTwoTone';
import FavoriteTwoToneIcon from '@mui/icons-material/FavoriteTwoTone';
import StarTwoToneIcon from '@mui/icons-material/StarTwoTone';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
const AvatarPrimary = styled(Avatar)(
  ({ theme }) => `
      background: ${theme.colors.primary.lighter};
      color: ${theme.colors.primary.main};
      width: ${theme.spacing(7)};
      height: ${theme.spacing(7)};
`
);

function RecentActivity({ data }) {
  const theme = useTheme();

  return (
    <Card>
      <CardHeader title="Detail" />
      <Divider />
      <Box px={2} py={4} display="flex" alignItems="flex-start">
        <AvatarPrimary>
          <AttachMoneyIcon />
        </AvatarPrimary>
        <Box pl={2} flex={1}>
          <Typography variant="h3">Money</Typography>
          <Box pt={2} display="flex">
            <Box pr={8}>
              <Typography
                gutterBottom
                variant="caption"
                sx={{ fontSize: `${theme.typography.pxToRem(16)}` }}
              >
                Total tAda
              </Typography>
              <Typography variant="h2">{Number(data.controlled_amount.toString().substring(0, data.controlled_amount.toString().length - 6)).toLocaleString()}</Typography>
            </Box>
          </Box>
        </Box>
      </Box>
      <Divider />
    </Card>
  );
}

export default RecentActivity;
