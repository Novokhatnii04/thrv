'use client';
import {
  ButtonComponent,
  EButtonComponentState,
  EButtonComponentVariant,
} from '@/components/button/button.component';
import { InputComponent } from '@/components/input/input.component';
import { AuthLayout } from '@/layout/auth/auth.layout';
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
    return (
      <AuthLayout title="Reset Password">
        <div className="mb-1 flex flex-col">
          <span className="text-sm text-brand-white leading-6 mb-4">
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
    return (
      <AuthLayout title="New Password">
        <div className="mb-1 grid gap-4">
          <span className="text-sm text-brand-white leading-6">
            Your new password must be different from previous used passwords.
          </span>
          <InputComponent
            placeholder="New Password"
            value={newPassword.password}
            setValue={handleNewPassword}
            validator={validatePassword}
            type="password"
          />
          <InputComponent
            placeholder="Confirm Password"
            value={newPassword.confirmPassword}
            setValue={handleConfirmPassword}
            validator={validatePassword}
            type="password"
          />
          <ButtonComponent
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

  return (
    <AuthLayout title="Reset Password">
      <div className="mb-1 grid gap-4">
        <span className="text-sm text-brand-white leading-6">
          Please enter the email associated with your account and we'll send an
          email with instructions to reset your password.
        </span>
        <InputComponent
          placeholder="Enter email"
          value={resetPasswordUser.email}
          setValue={handleEmailChange}
          validator={validateEmail}
          type="email"
        />
        <div className="grid grid-cols-2 gap-4">
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
