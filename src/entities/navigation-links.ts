import { ChartPie, Clock, HomeIcon, UserIcon } from '@/assets/icons/Icons';

export const navigationLinks = [
  { href: '/', icon: HomeIcon, authCheck: false, title: 'Home' },
  { href: '/vault', icon: ChartPie, title: 'Vault' },
  { href: '/history', icon: Clock, title: 'Used coupons' },
  { href: '/profile', icon: UserIcon, title: 'My Profile' },
];
