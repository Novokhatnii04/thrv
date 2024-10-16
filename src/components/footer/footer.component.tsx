import { LogoComponent } from '@/components/logo/logo.component';
import Image from 'next/image';
import GooglePlay from '@/assets/img/google-play.png';
import AppStore from '@/assets/img/app-store.png';
import Link from 'next/link';
import { FacebookIcon } from '@/assets/icons/facebook';
import { InstagramIcon } from '@/assets/icons/instagram';
import { TwitterIcon } from '@/assets/icons/twitter';
import { toggleCookieInfoSidebar } from '@/utils/toggleCookieInfoSidebar';

export const Footer = () => {
  return (
    <div className="px-6 relative py-12 z-10 bg-brand-black">
      <div className="max-w-[344px]">
        <div className="mb-6">
          <LogoComponent width={249} height={60} />
        </div>
        <div className="grid grid-cols-2 gap-6 mb-12">
          <Link href="https://play.google.com/store/apps/details?id=com.thrive.card">
            <Image src={GooglePlay} alt="google play" width={160} height={48} />
          </Link>
          <Link href="https://apps.apple.com/us/app/thrive-card/id6450324760">
            <Image src={AppStore} alt="app store" width={160} height={48} />
          </Link>
        </div>
        <div className="flex mb-12">
          <div className="mr-12">
            <h4 className="text-lg text-brand-white mb-3 capitalize">
              Navigation
            </h4>
            <div className="grid text-sm leading-8 text-brand-white opacity-80 whitespace-nowrap">
              <Link href="/">Home</Link>
              <Link href="https://info.thrivecard.co.uk/#partnership">
                Partnership
              </Link>
              <Link href="https://info.thrivecard.co.uk/#about-us">
                About us
              </Link>
              <Link href="https://info.thrivecard.co.uk/index.php/content/privacy-policy/">
                Privacy Policy
              </Link>
              <Link href="https://blog.thrivecard.co.uk/">Blog</Link>
              <span onClick={toggleCookieInfoSidebar}>Cookie Settings</span>
            </div>
          </div>
          <div>
            <h4 className="text-lg text-brand-white mb-3 capitalize">
              Contact Us
            </h4>
            <div className="text-sm leading-8 text-brand-white opacity-80">
              <span>Email: info@thrivecard.co.uk</span>
            </div>
          </div>
        </div>
        <div className="grid gap-7 mb-8">
          <h4 className="text-lg leading-6 text-brand-white font-medium">
            Social
          </h4>
          <div className="grid grid-cols-[repeat(3,auto)] gap-6 max-w-fit">
            <Link
              className="w-fit"
              href="https://www.facebook.com/profile.php?id=61551286884028">
              <FacebookIcon />
            </Link>
            <Link
              className="w-fit"
              href="https://www.instagram.com/thrive.card">
              <InstagramIcon />
            </Link>
            <Link className="w-fit" href="https://twitter.com/ThriveCard">
              <TwitterIcon />
            </Link>
          </div>
        </div>
      </div>
      <div className="text-center text-sm text-brand-white opacity-80">
        Thrive Card Ltd 2024
      </div>
    </div>
  );
};
