'use client';
import { useApi } from './api.hook';
import { ILoginApiResponse } from '@/api/login/login.type';
import { ERequestName } from '@/api/api';
import { deleteCookie, setCookie } from 'cookies-next';
import { EResponseStatus } from '@/api/api.type';
import { useState } from 'react';
import { IRegisterApiResponse } from '@/api/register/register.type';
import moment from 'moment';
import { IResetPasswordApiResponse } from '@/api/reset-password/reset-password.type';
import { useRouter } from 'next/navigation';
import { ISignInUser } from '@/pages/login/login.page';
import { useAnalytics } from '@/hook/analytics.hook';

export type ISignUpUser = {
  first_name: string;
  second_name: string;
  date_of_birth: string | Date | null;
  email: string;
  password: string;
  phone: string;
  referral_code: string;
};

export type IResetPasswordUser = {
  email: string;
};

export type IResetPasswordCodeCheck = {
  email: string;
  validation_code: string;
};

export type INewPasswordUser = {
  email: string;
  password: string;
  validation_code: string;
  confirmPassword: string;
};

export function useAuth() {
  const router = useRouter();

  const { logFirebaseEvent, logPixelEvent } = useAnalytics();

  const [sighInUser, setSighInUser] = useState<ISignInUser>({
    email: '',
    password: '',
  });

  const [signUpUser, setSignUpUser] = useState<ISignUpUser>({
    first_name: '',
    second_name: '',
    date_of_birth: '',
    email: '',
    password: '',
    phone: '',
    referral_code: '',
  });

  const [resetPasswordUser, setResetPasswordUser] =
    useState<IResetPasswordUser>({
      email: '',
    });

  const [resetPasswordCodeCheck, setResetPasswordCodeCheck] =
    useState<IResetPasswordCodeCheck>({
      email: '',
      validation_code: '',
    });

  const [newPassword, setNewPassword] = useState<INewPasswordUser>({
    password: '',
    confirmPassword: '',
    validation_code: '',
    email: '',
  });

  const { call: loginApiCall, loading: loginLoading } = useApi<
    ISignInUser,
    ILoginApiResponse
  >(ERequestName.Login, sighInUser, true);

  const { call: signUpCall, loading: registrationLoading } = useApi<
    ISignUpUser,
    IRegisterApiResponse
  >(
    ERequestName.Register,
    {
      email: signUpUser.email,
      password: signUpUser.password,
      phone: '',
      date_of_birth: moment(signUpUser.date_of_birth).format(
        'YYYY-MM-DD HH:MM:SS',
      ),
      first_name: signUpUser.first_name,
      second_name: signUpUser.second_name,
      referral_code: 'referral_code',
    },
    true,
  );

  const { call: resetPasswordCall, loading: resetLoading } = useApi<
    IResetPasswordUser,
    IResetPasswordApiResponse
  >(ERequestName.ResetPassword, resetPasswordUser, true);

  const { call: resetPasswordTestCall, loading: resetTestPassLoading } = useApi<
    IResetPasswordCodeCheck,
    IResetPasswordApiResponse
  >(ERequestName.ResetPasswordTest, resetPasswordCodeCheck, true);

  const { call: resetPasswordProceedCall, loading } = useApi<
    INewPasswordUser,
    IResetPasswordApiResponse
  >(ERequestName.ResetPasswordProceed, newPassword, true);

  const register = async () => {
    const {
      data: { response, status },
      code,
    } = await signUpCall();

    if (code === 200 && status === EResponseStatus.OK) {
      logFirebaseEvent('sign_up');
      logPixelEvent('sign_up');

      login(false);
    } else {
      alert(response || 'Something went wrong');
    }
  };

  const login = async (logEvent: boolean = true) => {
    const {
      data: { response, error, status },
      code,
    } = await loginApiCall();

    if (code === 200 && status === EResponseStatus.OK && response?.token) {
      setCookie('thrive.auth_token', response.token);
      if (logEvent) {
        logFirebaseEvent('login');
      }
      location.reload();
    } else {
      alert(error || 'Something went wrong');
    }
  };

  const resetGetCode = async () => {
    const {
      data: { response, error, status },
      code,
    } = await resetPasswordCall();
    if (code === 200 && status === EResponseStatus.OK) {
    } else {
      alert(error || 'Something went wrong');
    }
  };

  const resetSendCode = async () => {
    const {
      code,
      data: { error, response, status },
    } = await resetPasswordTestCall();
    if (code === 200 && status === EResponseStatus.OK) {
    } else {
      alert(error || 'Something went wrong');
    }
  };

  const resetNewPassword = async () => {
    const {
      code,
      data: { error, response, status },
    } = await resetPasswordProceedCall();
    if (code === 200 && status === EResponseStatus.OK) {
    } else {
      alert(error || 'Something went wrong');
    }
  };

  const logout = async () => {
    deleteCookie('thrive.auth_token');
    router.push('/');
    location.reload();
  };

  return {
    sighInUser,
    setSighInUser,
    login,
    signUpUser,
    setSignUpUser,
    register,
    resetPasswordUser,
    setResetPasswordUser,
    resetGetCode,
    newPassword,
    setNewPassword,
    resetPasswordCodeCheck,
    setResetPasswordCodeCheck,
    resetSendCode,
    resetNewPassword,
    logout,
  };
}
