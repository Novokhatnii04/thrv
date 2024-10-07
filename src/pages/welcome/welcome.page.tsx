'use client';
import {
  ButtonComponent,
  EButtonComponentVariant,
} from '@/components/button/button.component';
import { WelcomeIllustration } from '@/components/welcome/welcome-illustration.component';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const WelcomePage = () => {
  const router = useRouter();

  const handleSignUp = () => {
    router.push('/sign-up');
  };

  const handleSignIn = () => {
    router.push('/login');
  };

  const handlePreview = () => {
    router.push('/');
  };

  useEffect(() => {
    window.scrollTo(0, document.body.scrollHeight);
  }, []);

  return (
    <div className="bg-brand-black font-avenir min-h-screen flex flex-col">
      <div className="aspect-square mt-auto">
        <WelcomeIllustration />
      </div>
      <div className="mt-9 p-8">
        <div className="text-[34px] text-white font-black">
          We make the world <br />
          more <span className="font-normal text-[#6EEAD2]"> affordable.</span>
        </div>
        <div className="text-white my-4 text-sm font-normal">
          Easily and quickly access hot deals and exclusive discounts from the
          best brands and stores
        </div>
        <div className="text-white flex mt-16 ">
          <div className="mr-4 w-full">
            <ButtonComponent label="Sign Up" onClick={handleSignUp} />
          </div>
          <div className="w-full">
            <ButtonComponent
              label="Sign In"
              onClick={handleSignIn}
              variant={EButtonComponentVariant.Outline}
            />
          </div>
        </div>
        <div className="text-xs text-white mt-4">
          You can skip the authorisation process and{' '}
          <span
            onClick={handlePreview}
            className="text-[#6EEAD2] cursor-pointer">
            try out the app.
          </span>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
