'use client';
import {
  CircleArrowButtonComponent,
  ECircleArrowButtonComponentVariant,
} from '@/components/button/circle-arrow-button.component';
import { AuthIllustration } from './auth-illustrarion.component';
import { useRouter } from 'next/navigation';
import { AnalyticsLayout } from '@/layout/analytics/analytics.layout';
import { WelcomeIllustration } from '@/components/welcome/welcome-illustration.component';
import { EResolutionType } from '@/components/navigation/navigation-link.component';
import {
  ButtonComponent,
  EButtonComponentState,
  EButtonComponentVariant,
} from '@/components/button/button.component';
import Logo2 from '@/assets/logo/logoIcon';
import { ReactNode } from 'react';
import { LogoComponent } from '@/components/logo.component';

export enum EAuthLayoutType {
  SignIn,
  SignUp,
}
interface AuthLayoutProps {
  children: React.ReactNode;
  authFormChildren?: React.ReactNode;
  title: string;
  type?: EAuthLayoutType;
}

export const AuthLayoutTitle = ({
  children,
  cStyles = '',
}: {
  children: React.ReactNode;
  cStyles?: string;
}) => {
  return (
    <h1
      className={`font-extrabold text-white text-[40px] leading-[54px] ${cStyles}`}>
      {children}
    </h1>
  );
};

export const AuthLayout: React.FC<AuthLayoutProps> = ({
  children,
  authFormChildren,
  title,
  type,
}) => {
  const router = useRouter();
  const handleBack = () => {
    router.back();
  };

  let authButtonRender: ReactNode;

  switch (type) {
    case EAuthLayoutType.SignIn:
    default:
      authButtonRender = (
        <ButtonComponent
          state={EButtonComponentState.Active}
          variant={EButtonComponentVariant.Outline}
          label="Sign up"
          onClick={() => router.push('/sign-up')}
        />
      );
      break;
    case EAuthLayoutType.SignUp:
      authButtonRender = (
        <ButtonComponent
          state={EButtonComponentState.Active}
          variant={EButtonComponentVariant.Outline}
          label="Sign in"
          onClick={() => router.push('/login')}
        />
      );
      break;
  }

  const MobileAuthLayout = (
    <div className="flex flex-col w-full h-full bg-brand-black lp:hidden">
      <AuthIllustration />
      <div className="w-full sm:max-w-[576px]">
        <div className="flex items-center px-10">
          <CircleArrowButtonComponent
            onClick={handleBack}
            variant={ECircleArrowButtonComponentVariant.AuthBack}
          />
          <span className="ml-3 text-4xl font-bold text-brand-white">
            {title}
          </span>
        </div>
        <div className="flex flex-col p-7">{children}</div>
      </div>
    </div>
  );

  const DesktopAuthLayout = (
    <div className="hidden lp:flex flex-col w-full h-full bg-brand-black justify-start items-center overflow-y-auto">
      <WelcomeIllustration
        type={EResolutionType.Desktop}
        cStyles="hidden lp:block w-[100vw] h-[100vh] z-0 absolute"
      />
      <div className="w-full z-10 min-w-[846px] max-w-[1132px] bg-[#1B1B1B] my-[20vh] rounded-[40px]">
        <div className="flex justify-between py-[60px] px-[120px]">
          <div className="w-[47%]">{authFormChildren}</div>
          <div className="w-[48%]">{children}</div>
        </div>
      </div>
    </div>
  );

  return (
    <AnalyticsLayout>
      <div className="hidden lp:flex justify-between top-8 left-1/2 transform -translate-x-1/2 w-full max-w-[1920px] z-20 px-24 absolute">
        <div
          className="flex items-center gap-2.5"
          onClick={() => router.push('/')}>
          <Logo2 />
          <LogoComponent />
        </div>
        <div className="w-[147px]">{authButtonRender}</div>
      </div>
      {MobileAuthLayout}
      {DesktopAuthLayout}
    </AnalyticsLayout>
  );
};
