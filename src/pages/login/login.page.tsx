'use client';
import {
  ButtonComponent,
  EButtonComponentState,
} from '@/components/button/button.component';
import {
  InputComponent,
  InputTitleComponent,
} from '@/components/input/input.component';
import {
  AuthLayout,
  AuthLayoutTitle,
  EAuthLayoutType,
} from '@/layout/auth/auth.layout';
import { useAuth } from '@/hook/auth.hook';
import { useValidate } from '@/hook/validate.hook';
import Link from 'next/link';
import { LogoComponent } from '@/components/logo.component';

export type ISignInUser = {
  email: string;
  password: string;
};

const LoginPage = () => {
  const { validateEmail, validatePassword } = useValidate();

  const { sighInUser, setSighInUser, login } = useAuth();

  const setEmail = (email: string) => {
    setSighInUser({ ...sighInUser, email });
  };

  const setPassword = (password: string) => {
    setSighInUser({ ...sighInUser, password });
  };

  const onSubmit = async () => {
    await login();
  };

  const isValid =
    sighInUser.email &&
    sighInUser.password &&
    validateEmail(sighInUser.email) &&
    validatePassword(sighInUser.password);

  const authFormLayout = (
    <div className="flex flex-col">
      <LogoComponent width={255} height={61} />
      <AuthLayoutTitle cStyles="mt-6">Welcome back !</AuthLayoutTitle>
      <h3 className="font-normal text-lg text-white mt-2 leading-6">
        Please enter your details
      </h3>
      <span className="font-[16px] text-white mt-2 leading-5">
        Don’t have an account?{' '}
        <Link href="/sign-up"
          className="text-brand-green">
          Sign up
        </Link>
      </span>
    </div>
  );

  return (
    <AuthLayout
      title="Login"
      authFormChildren={authFormLayout}
      type={EAuthLayoutType.SignIn}>
      <div className="text-white mb-1 flex flex-col">
        <div className="mb-4 lp:mb-6">
          <InputTitleComponent>Email</InputTitleComponent>
          <InputComponent
            value={sighInUser.email}
            setValue={setEmail}
            placeholder="Email"
            type="email"
          />
        </div>
        <div className="mb-4 lp:mb-6">
          <InputTitleComponent>Password</InputTitleComponent>
          <InputComponent
            value={sighInUser.password}
            setValue={setPassword}
            placeholder="Password"
            type="password"
          />
        </div>
        <div className="mb-4 lp:mb-12 lp:ml-auto">
          <div className={`text-sm lp:text-base text-brand-white`}>
            Forgot your{' '}
            <Link href="/reset-password" className="text-brand-green">
              Password?
            </Link>
          </div>
        </div>
        <ButtonComponent
          label="Login"
          onClick={onSubmit}
          state={
            isValid
              ? EButtonComponentState.Active
              : EButtonComponentState.Disabled
          }
        />
      </div>
    </AuthLayout>
  );
};

export default LoginPage;
