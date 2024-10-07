'use client';
import { AuthLayout } from '@/layout/auth/auth.layout';
import { useAuth } from '@/hook/auth.hook';
import { useState } from 'react';
import SignUpFirstStep from './steps/sign-up-first-step';
import SignUpSecondStep from './steps/sign-up-second-step';

const SignUpPage = () => {
  const { signUpUser, setSignUpUser, sighInUser, setSighInUser, register } =
    useAuth();

  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [isValid, setIsValid] = useState<boolean>(false);
  const [step, setStep] = useState<number>(1);

  const submitSignUp = () => {
    register();
  };

  return (
    <AuthLayout title="Sign Up">
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
