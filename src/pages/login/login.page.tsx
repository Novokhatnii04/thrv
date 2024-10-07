'use client';
import {
  ButtonComponent,
  EButtonComponentState,
} from '@/components/button/button.component';
import { InputComponent } from '@/components/input/input.component';
import { AuthLayout } from '@/layout/auth/auth.layout';
import { useAuth } from '@/hook/auth.hook';
import { useValidate } from '@/hook/validate.hook';
import Link from 'next/link';

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

  return (
    <AuthLayout title="Login">
      <div className="text-white mb-1 flex flex-col">
        <div className="mb-4">
          <InputComponent
            value={sighInUser.email}
            setValue={setEmail}
            placeholder="Email"
            type="email"
          />
        </div>
        <div className="mb-4">
          <InputComponent
            value={sighInUser.password}
            setValue={setPassword}
            placeholder="Password"
            type="password"
          />
        </div>
        <div className="mb-4">
          <div className={`text-sm text-brand-white`}>
            Forgot your{' '}
            <Link href="/reset-password" className="text-[#6EEAD2]">
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
