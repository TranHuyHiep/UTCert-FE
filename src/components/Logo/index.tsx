import { styled } from '@mui/material';
import Link from 'src/components/Link';
import Image from 'next/image';
import logo from '@/public/logo.png'

const LogoWrapper = styled(Link)(
  ({ theme }) => `
        color: ${theme.palette.text.primary};
        padding: ${theme.spacing(0, 1, 0, 0)};
        display: flex;
        text-decoration: none;
        font-weight: ${theme.typography.fontWeightBold};

        &:hover {
          text-decoration: none;
        }
`
);


function Logo() {
  return (
    <LogoWrapper href="/">
      <Image
            src={logo.src}
            width={logo.width}
            height={logo.height}
            alt="Picture of the author"
          />
    </LogoWrapper>
  );
}

export default Logo;
