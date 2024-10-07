import { useEffect, useState } from 'react';
import { IWalletResponse } from '@/api/wallet/wallet.type';
import { ERequestName } from '@/api/api';
import { EResponseStatus, IRequest } from '@/api/api.type';
import { useApi } from '@/hook/api.hook';

export const useWallet = () => {
  const [wallet, setWallet] = useState<IWalletResponse | undefined>(undefined);

  const {
    data: walletData,
    code,
    call: refetch,
  } = useApi<IRequest, IWalletResponse>(ERequestName.Wallet, false);

  useEffect(() => {
    if (code === 200 && walletData?.status === EResponseStatus.OK) {
      setWallet(walletData);
    }
  }, [walletData, code]);

  return { wallet, refetch };
};
