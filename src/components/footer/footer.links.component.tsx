import Link from 'next/link';
import { toggleCookieInfoSidebar } from '@/utils/toggleCookieInfoSidebar';

const FooterLinks = ({ cStyles = '' }: { cStyles?: string }) => {
  return (
    <div className={`mr-12 ${cStyles}`}>
      <h4 className="text-lg text-brand-white mb-3 capitalize">Navigation</h4>
      <div className="grid text-sm leading-8 text-brand-white opacity-80 whitespace-nowrap">
        <Link href="/">Home</Link>
        <Link href="https://info.thrivecard.co.uk/#partnership">
          Partnership
        </Link>
        <Link href="https://info.thrivecard.co.uk/#about-us">About us</Link>
        <Link href="https://info.thrivecard.co.uk/index.php/content/privacy-policy/">
          Privacy Policy
        </Link>
        <Link href="https://blog.thrivecard.co.uk/">Blog</Link>
        <span onClick={toggleCookieInfoSidebar}>Cookie Settings</span>
      </div>
    </div>
  );
};

export default FooterLinks;
