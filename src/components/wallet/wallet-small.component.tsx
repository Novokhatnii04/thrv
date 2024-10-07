import React from 'react';
import { WalletIcon } from '@/assets/icons/wallet.icon';
import { useMoneyFormatter } from '@/hook/money-formatter.hook';
import { useRouter } from 'next/navigation';
import { useWallet } from '@/hook/wallet.hook';

export const WalletSmallComponent = () => {
  const router = useRouter();

  const { wallet } = useWallet();

  const onClick = () => {
    router.push('/wallet');
  };

  const { moneyFormatter } = useMoneyFormatter();

  if (
    wallet?.response === undefined ||
    wallet.response.mode === 'disabled' ||
    wallet.response.wallet?.amount === undefined
  ) {
    return null;
  }

  return (
    <div
      onClick={onClick}
      className="flex flex-row items-center rounded-3xl px-3 py-1.5 bg-wallet bg-opacity-10 cursor-pointer dp:px-5">
      <div className="mr-1 h-4 w-5">
        <WalletIcon />
      </div>
      <span className="text-base font-bold">
        {moneyFormatter.format(wallet.response.wallet.amount)}
      </span>
    </div>
  );
};
