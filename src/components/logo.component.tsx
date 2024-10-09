import Image from 'next/image';
import MainLogo from '@/assets/logo/main-logo.webp';
import Logo from '@/assets/logo/logo.webp';

export const LogoComponent = ({
  width = 155,
  height = 38,
  main = false,
}: {
  width?: number;
  height?: number;
  main?: boolean;
}) => {
  return (
    <Image
      src={main ? MainLogo : Logo}
      alt="logo"
      width={width}
      height={height}
      style={{ background: 'transparent' }}
      layout="intrinsic"
      priority
    />
  );
};
