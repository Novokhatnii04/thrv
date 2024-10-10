'use client';
import {
  ButtonComponent,
  EButtonComponentVariant,
} from '@/components/button/button.component';
import { WelcomeIllustration } from '@/components/welcome/welcome-illustration.component';
import { AuthLayout, AuthLayoutTitle } from '@/layout/auth/auth.layout';
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

  const MobileWelcomePage = () => {
    return (
      <div className="bg-brand-black font-avenir min-h-screen flex flex-col lp:hidden">
        <div className="aspect-square mt-auto">
          <WelcomeIllustration />
        </div>
        <div className="mt-9 p-8">
          <div className="text-[34px] text-white font-black">
            We make the world <br />
            more{' '}
            <span className="font-normal text-brand-green"> affordable.</span>
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
              className="text-brand-green cursor-pointer">
              try out the app.
            </span>
          </div>
        </div>
      </div>
    );
  };

  const DesktopWelcomePage = () => {
    const authFormLayout = (
      <>
        <AuthLayoutTitle cStyles="leading-[48px]">
          We make the world more{' '}
          <span className="font-normal text-brand-green"> affordable.</span>
        </AuthLayoutTitle>
        <div className="text-white mt-5 font-normal text-lg">
          Easily and quickly access hot deals and exclusive discounts from the
          best brands and stores
        </div>
        <div className="text-lg text-white mt-5">
          You can skip the authorisation process and{' '}
          <span
            onClick={handlePreview}
            className="text-brand-green cursor-pointer">
            try out the app.
          </span>
        </div>
      </>
    );

    return (
      <section className="hidden lp:block w-full h-full">
        <AuthLayout title="" authFormChildren={authFormLayout}>
          <div className="flex justify-center h-full gap-6 items-center flex-col">
            <ButtonComponent label="Sign Up" onClick={handleSignUp} />
            <ButtonComponent
              label="Sign In"
              onClick={handleSignIn}
              variant={EButtonComponentVariant.Outline}
            />
          </div>
        </AuthLayout>
      </section>
    );
  };

  return (
    <>
      <MobileWelcomePage />
      <DesktopWelcomePage />
    </>
  );
};

export default WelcomePage;
