import { useAuth } from '@/hook/auth.hook';
import { IUserResponse } from '@/api/register/register.type';
import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  IUserApiRequest,
  IUserApiResponse,
} from '@/api/get-user/get-user.type';
import { useApi } from '@/hook/api.hook';
import { ERequestName } from '@/api/api';
import { EResponseStatus } from '@/api/api.type';
import { useRouter } from 'next/navigation';
import { getCookie } from 'cookies-next';
import { useAuthStatus } from '@/hook/auth-status.hook';

export const useUser = () => {
  const navigation = useRouter();
  const [user, setUser] = useState<IUserResponse | undefined>(undefined);
  const { logout } = useAuth();
  const { isAuthenticated } = useAuthStatus();
  const token = getCookie('thrive.auth_token');

  const userApiRequest = useMemo<IUserApiRequest>(() => {
    return {
      token,
    };
  }, [token]);

  const {
    call: userApiCall,
    data: userResponse,
    loading,
    code,
  } = useApi<IUserApiRequest, IUserApiResponse>(
    ERequestName.GetUser,
    userApiRequest,
  );

  useEffect(() => {
    if (!isAuthenticated) {
      return;
    }

    if (!(userResponse && code)) {
      return;
    }

    if (code === 200 && userResponse.status === EResponseStatus.OK) {
      setUser(userResponse?.response);
    } else {
      logout().then(() => {
        navigation.push('/welcome');
      });
    }
  }, [code, isAuthenticated, logout, navigation, userResponse]);

  const refetch = useCallback(async () => {
    await userApiCall();
  }, [userApiCall]);

  return { user, setUser, refetch, loading };
};
