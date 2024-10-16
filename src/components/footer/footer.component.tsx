import { LogoComponent } from '@/components/logo/logo.component';
import Image from 'next/image';
import GooglePlay from '@/assets/img/google-play.png';
import AppStore from '@/assets/img/app-store.png';
import Link from 'next/link';
import { FacebookIcon } from '@/assets/icons/facebook';
import { InstagramIcon } from '@/assets/icons/instagram';
import { TwitterIcon } from '@/assets/icons/twitter';
import FooterLinks from './footer.links.component';
import FooterContacts from './footer.contacts.component';

export const Footer = () => {
  return (
    <div className="px-6 relative py-12 z-10 bg-brand-black flex-col flex lp:px-12">
      <div className="max-w-[344px] lp:flex lp:justify-between lp:max-w-full">
        <div>
          <div className="mb-6 lp:w-[249px] lp:h-[60px]">
            <LogoComponent width={249} height={60} />
          </div>
          <div className="grid grid-cols-2 gap-6 mb-12">
            <Link href="https://play.google.com/store/apps/details?id=com.thrive.card">
              <Image
                src={GooglePlay}
                alt="google play"
                width={160}
                height={48}
              />
            </Link>
            <Link href="https://apps.apple.com/us/app/thrive-card/id6450324760">
              <Image src={AppStore} alt="app store" width={160} height={48} />
            </Link>
          </div>
        </div>
        <div className="grid gap-7 mb-8 lp:hidden">
          <FooterLinks />
          <FooterContacts />
        </div>
        <FooterLinks cStyles="hidden lp:block" />
        <FooterContacts cStyles="hidden lp:block" />
        <div className="grid gap-7 mb-8 lp:flex lp:flex-col lp:gap-6">
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
      <div className="text-center text-sm text-brand-white opacity-80 lp:mr-auto">
        Thrive Card Ltd 2024
      </div>
    </div>
  );
};
