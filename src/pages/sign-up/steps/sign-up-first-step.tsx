'use client';
import {
  ButtonComponent,
  EButtonComponentState,
} from '@/components/button/button.component';
import {
  InputComponent,
  InputTitleComponent,
} from '@/components/input/input.component';
import { ISignUpUser } from '@/hook/auth.hook';
import { useValidate } from '@/hook/validate.hook';
import { useEffect } from 'react';
import { ISignInUser } from '@/pages/login/login.page';

const SignUpFirstStep = ({
  signUpUser,
  setSignUpUser,
  signInUser,
  setSignInUser,
  confirmPassword,
  isValid,
  setConfirmPassword,
  setIsValid,
  step,
  setStep,
}: {
  signUpUser: ISignUpUser;
  signInUser: ISignInUser;
  setSignUpUser: (signUpUser: ISignUpUser) => void;
  setSignInUser: (signInUser: ISignInUser) => void;
  confirmPassword: string;
  setConfirmPassword: (confirmPassword: string) => void;
  isValid: boolean;
  setStep: (step: number) => void;
  setIsValid: (isValid: boolean) => void;
  step: number;
}) => {
  const { validateEmail, validatePassword } = useValidate();

  useEffect(() => {
    if (signUpUser.email && signUpUser.password && confirmPassword) {
      if (
        validateEmail(signUpUser.email) &&
        validatePassword(signUpUser.password) &&
        signUpUser.password === confirmPassword
      ) {
        setIsValid(true);
      } else {
        setIsValid(false);
      }
    } else {
      setIsValid(false);
    }
  }, [signUpUser?.email, signUpUser?.password, confirmPassword]);

  const setEmail = (email: string) => {
    setSignUpUser({ ...signUpUser, email });
    setSignInUser({ ...signInUser, email });
  };

  const setPassword = (password: string) => {
    setSignUpUser({ ...signUpUser, password });
    setSignInUser({ ...signInUser, password });
  };

  const confirmPasswordHandle = (confirmPassword: string) => {
    setConfirmPassword(confirmPassword);
  };

  const onSubmit = () => {
    setStep(step + 1);
    setIsValid(false);
  };

  return (
    <>
      <div className="mb-4">
        <InputTitleComponent>Email</InputTitleComponent>
        <InputComponent
          value={signUpUser?.email}
          setValue={setEmail}
          placeholder="Email"
          type="email"
          validator={validateEmail}
        />
      </div>
      <div className="mb-4">
        <InputTitleComponent>Password</InputTitleComponent>
        <InputComponent
          value={signUpUser?.password}
          setValue={setPassword}
          placeholder="Password"
          type="password"
          validator={validatePassword}
        />
      </div>
      <div className="mb-4">
        <InputTitleComponent>Confirm password</InputTitleComponent>
        <InputComponent
          value={confirmPassword}
          setValue={confirmPasswordHandle}
          placeholder="Confirm password"
          type="password"
          validator={value => value === signUpUser.password}
        />
      </div>
      <ButtonComponent
        cStyles="lp:mt-[44px]"
        label="Next Step"
        state={
          isValid
            ? EButtonComponentState.Active
            : EButtonComponentState.Disabled
        }
        onClick={onSubmit}
      />
    </>
  );
};

export default SignUpFirstStep;
