'use client';
import {
  AuthLayout,
  AuthLayoutTitle,
  EAuthLayoutType,
} from '@/layout/auth/auth.layout';
import { useAuth } from '@/hook/auth.hook';
import { useState } from 'react';
import SignUpFirstStep from './steps/sign-up-first-step';
import SignUpSecondStep from './steps/sign-up-second-step';
import { LogoComponent } from '@/components/logo/logo.component';
import { useRouter } from 'next/navigation';

const SignUpPage = () => {
  const { signUpUser, setSignUpUser, sighInUser, setSighInUser, register } =
    useAuth();

  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [isValid, setIsValid] = useState<boolean>(false);
  const [step, setStep] = useState<number>(1);

  const router = useRouter();

  const submitSignUp = () => {
    register();
  };

  const authFormLayout = (
    <div className="flex flex-col">
      <LogoComponent width={255} height={61} />
      <AuthLayoutTitle cStyles="mt-6">Sign Up</AuthLayoutTitle>
      <span className="font-[16px] text-white mt-2 leading-6">
        By signing up you agree with our{' '}
        <span className="text-brand-green">Term of Service</span> and{' '}
        <span className="text-brand-green">Privacy Policy</span>
      </span>
    </div>
  );

  return (
    <AuthLayout
      title="Sign Up"
      type={EAuthLayoutType.SignUp}
      authFormChildren={authFormLayout}>
      <div className="text-white mb-1 flex flex-col">
        {step === 1 && (
          <SignUpFirstStep
            signUpUser={signUpUser}
            setSignUpUser={setSignUpUser}
            signInUser={sighInUser}
            setSignInUser={setSighInUser}
            setConfirmPassword={setConfirmPassword}
            confirmPassword={confirmPassword}
            isValid={isValid}
            setIsValid={setIsValid}
            setStep={setStep}
            step={step}
          />
        )}
        {step === 2 && (
          <SignUpSecondStep
            signUpUser={signUpUser}
            setSignUpUser={setSignUpUser}
            isValid={isValid}
            setIsValid={setIsValid}
            submitSignUp={submitSignUp}
          />
        )}
      </div>
    </AuthLayout>
  );
};

export default SignUpPage;
