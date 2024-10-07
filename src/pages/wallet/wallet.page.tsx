'use client';
import { AppLayout } from '@/layout/app/app.layout';
import { CircleArrowButtonComponent } from '@/components/button/circle-arrow-button.component';
import { useRouter } from 'next/navigation';
import { useMoneyFormatter } from '@/hook/money-formatter.hook';
import { useWallet } from '@/hook/wallet.hook';
import React, { useEffect, useMemo, useState } from 'react';
import { useUser } from '@/hook/user.hook';
import { ERequestName } from '@/api/api';
import { IWalletWithdrawResponse } from '@/api/wallet-withdraw/wallet-withdraw.type';
import { IRequest } from '@/api/api.type';
import { useApi } from '@/hook/api.hook';
import {
  ButtonComponent,
  EButtonComponentVariant,
} from '@/components/button/button.component';
import { WalletModal } from '@/components/modal/wallet-modal.component';

interface IWalletRow {
  id: number;
  amount: number;
}

type IWalletCollection = IWalletRow[];

type IWalletSection = {
  title: string;
  data: IWalletCollection;
};

const WalletPage = () => {
  const router = useRouter();
  const [withdrawOpen, setWithdrawOpen] = useState(false);

  const { moneyFormatter } = useMoneyFormatter();
  const { wallet, refetch } = useWallet();

  const handleBackHomeClick = () => {
    router.back();
  };

  const walletTransactionsCollection = useMemo<IWalletSection[]>(() => {
    if (!wallet?.response.transactions) {
      return [];
    }

    return Object.keys(wallet?.response.transactions).map(
      (key: string): IWalletSection => {
        // @ts-ignore
        const data = wallet?.response.transactions[key];

        return {
          title: key,
          data,
        };
      },
    );
  }, [wallet]);

  const {
    data: withdrawResponse,
    code: withdrawResponseCode,
    call: walletWithdrawApiCall,
  } = useApi<IRequest, IWalletWithdrawResponse>(
    ERequestName.WalletWithdraw,
    false,
    true,
  );

  const { user } = useUser();

  useEffect(() => {
    if (withdrawResponseCode === 200 && withdrawResponse?.response.sent) {
      refetch();
      alert(
        `Check your email ${user?.email} and follow the instructions to withdraw funds`,
      );
    }
  }, [withdrawResponse, withdrawResponseCode]);

  const onConfirmWithdraw = async () => {
    walletWithdrawApiCall();
    setWithdrawOpen(false);
  };

  const onPressWithdraw = () => {
    setWithdrawOpen(true);
  };

  return (
    <AppLayout>
      <div className="px-6">
        {wallet?.response.wallet && (
          <div>
            <div
              className="flex items-center mb-4 cursor-pointer"
              onClick={handleBackHomeClick}>
              <CircleArrowButtonComponent />
              <h4 className="ml-1.5 font-normal text-[0.75rem] leading-none sm:text-base">
                Back to Home
              </h4>
            </div>
            <div className="mt-2.5 mb-2">
              <p className="text-sm">
                Earn £5 for each friend you refer by sharing the referral code
                from your profile.
              </p>
            </div>
            <div className="flex justify-between items-end mb-6">
              <span className="font-bold text-[1.25rem]">My bonus balance</span>
              <span className="font-bold text-3xl/10">
                {moneyFormatter.format(wallet.response.wallet.amount)}
              </span>
            </div>
          </div>
        )}
        {walletTransactionsCollection.length ? (
          <div className="grid gap-2.5 mt-4 sm:grid-cols-2">
            {walletTransactionsCollection.map(item => (
              <div key={item.title} className="grid gap-2.5">
                <div className="text-sm">{item.title}</div>
                {item?.data?.map(data => (
                  <div
                    key={data.id}
                    className="text-sm px-5 py-3 border border-brand-green rounded-2xl flex justify-between items-center">
                    <span className="text-sm">
                      {data.amount > 0 ? 'Referral bonus' : 'Withdraw'}
                    </span>
                    <span className="text-xl">
                      {moneyFormatter.format(data.amount)}
                    </span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm">No transactions</p>
        )}
        {(wallet?.response.wallet?.amount ?? 0) > 0 ? (
          <div className="flex flex-col mt-4 sm:max-w-96 sm:mx-auto sm:mt-10">
            <ButtonComponent
              label="Withdraw"
              onClick={onPressWithdraw}
              variant={EButtonComponentVariant.Outline}
            />
          </div>
        ) : (
          <></>
        )}
        <WalletModal
          isOpen={withdrawOpen}
          setIsOpen={setWithdrawOpen}
          onConfirm={onConfirmWithdraw}
        />
      </div>
    </AppLayout>
  );
};

export default WalletPage;
