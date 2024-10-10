'use client';
import {
  ButtonComponent,
  EButtonComponentState,
  EButtonComponentVariant,
} from '@/components/button/button.component';
import {
  InputComponent,
  InputTitleComponent,
} from '@/components/input/input.component';
import { AuthLayout, AuthLayoutTitle } from '@/layout/auth/auth.layout';
import { useAuth } from '@/hook/auth.hook';
import { useValidate } from '@/hook/validate.hook';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const ResetPasswordPage = () => {
  const {
    resetPasswordUser,
    setResetPasswordUser,
    resetGetCode,
    resetPasswordCodeCheck,
    setResetPasswordCodeCheck,
    resetSendCode,
    newPassword,
    setNewPassword,
    resetNewPassword,
  } = useAuth();
  const { validateEmail, validateCode, validatePassword } = useValidate();
  const [isValid, setIsValid] = useState<boolean>(false);
  const [step, setStep] = useState<number>(1);

  const navigation = useRouter();

  const handleBack = () => {
    navigation.back();
  };

  const handleEmailChange = (e: string) => {
    setResetPasswordUser({ email: e });

    if (validateEmail(e)) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  };

  const handleCodeChange = (e: string) => {
    setResetPasswordCodeCheck({
      email: resetPasswordUser.email,
      validation_code: e,
    });
  };

  const handleGetCode = () => {
    resetGetCode();
    setStep(2);
  };

  const handleSendCode = () => {
    resetSendCode();
    setNewPassword({
      email: resetPasswordCodeCheck.email,
      validation_code: resetPasswordCodeCheck.validation_code,
      password: '',
      confirmPassword: '',
    });
    setStep(3);
  };

  const handleNewPassword = (e: string) => {
    setNewPassword({ ...newPassword, password: e });
  };

  const handleConfirmPassword = (e: string) => {
    setNewPassword({ ...newPassword, confirmPassword: e });
  };

  const handleSaveNewPassword = () => {
    resetNewPassword();
    navigation.push('/login');
  };

  if (step === 2) {
    const authFormLayout = (
      <div>
        <AuthLayoutTitle cStyles="mb-2">Password reset</AuthLayoutTitle>
        <span className="text-sm text-brand-white leading-6 mb-4">
          We've sent an email with instructions to reset your password. Please
          check your email app and enter a code to continue
        </span>
      </div>
    );

    return (
      <AuthLayout title="Reset Password" authFormChildren={authFormLayout}>
        <div className="mb-1 flex flex-col">
          <span className="text-sm text-brand-white leading-6 mb-4 lp:hidden">
            We've sent an email with instructions to reset your password. Please
            check your email app and enter a code to continue
          </span>
          <div className="mb-4">
            <InputComponent
              placeholder="Enter code"
              value={resetPasswordCodeCheck.validation_code}
              setValue={handleCodeChange}
              validator={validateCode}
            />
          </div>
          <ButtonComponent
            variant={EButtonComponentVariant.Filled}
            label="Send code"
            onClick={handleSendCode}
            state={
              validateCode(resetPasswordCodeCheck.validation_code)
                ? EButtonComponentState.Active
                : EButtonComponentState.Disabled
            }
          />
        </div>
      </AuthLayout>
    );
  }

  if (step === 3) {
    const authFormLayout = (
      <div>
        <AuthLayoutTitle cStyles="mb-2">New password</AuthLayoutTitle>
        <span className="text-lg mt-2 text-brand-white leading-6">
          Your new password must be different from previous used passwords.
        </span>
      </div>
    );

    return (
      <AuthLayout title="New Password" authFormChildren={authFormLayout}>
        <div className="mb-1 grid gap-4 lp:gap-0">
          <span className="text-sm text-brand-white leading-6 lp:hidden">
            Your new password must be different from previous used passwords.
          </span>
          <InputTitleComponent cStyles="mb-4">Password</InputTitleComponent>
          <InputComponent
            placeholder="New Password"
            value={newPassword.password}
            setValue={handleNewPassword}
            validator={validatePassword}
            type="password"
          />
          <InputTitleComponent cStyles="mt-6 mb-0">
            Confirm password
          </InputTitleComponent>
          <InputComponent
            placeholder="Confirm Password"
            value={newPassword.confirmPassword}
            setValue={handleConfirmPassword}
            validator={validatePassword}
            type="password"
          />
          <ButtonComponent
            cStyles="mt-8"
            label="Save new password"
            state={
              validatePassword(newPassword.password) &&
              newPassword.password === newPassword.confirmPassword
                ? EButtonComponentState.Active
                : EButtonComponentState.Disabled
            }
            onClick={handleSaveNewPassword}
          />
        </div>
      </AuthLayout>
    );
  }

  const authFormLayout = (
    <div>
      <AuthLayoutTitle>Password reset</AuthLayoutTitle>
      <span className="text-sm lp:text-lg text-brand-white leading-6">
        Please enter the email associated with your account and we'll send an
        email with instructions to reset your password.
      </span>
    </div>
  );

  return (
    <AuthLayout title="Reset Password" authFormChildren={authFormLayout}>
      <div className="mb-1 grid gap-4 lp:gap-0">
        <span className="block text-sm text-brand-white leading-6 lp:hidden">
          Please enter the email associated with your account and we'll send an
          email with instructions to reset your password.
        </span>
        <InputTitleComponent>Email</InputTitleComponent>
        <InputComponent
          placeholder="Enter email"
          value={resetPasswordUser.email}
          setValue={handleEmailChange}
          validator={validateEmail}
          type="email"
        />
        <div className="grid grid-cols-2 gap-4 lp:mt-12 lp:flex lp:flex-col">
          <ButtonComponent
            variant={EButtonComponentVariant.Filled}
            label="Get code"
            onClick={handleGetCode}
            state={
              isValid
                ? EButtonComponentState.Active
                : EButtonComponentState.Disabled
            }
          />
          <ButtonComponent
            variant={EButtonComponentVariant.Outline}
            label="Go back"
            onClick={handleBack}
          />
        </div>
      </div>
    </AuthLayout>
  );
};

export default ResetPasswordPage;
