'use client';
import { ERequestName } from '@/api/api';
import { EResponseStatus, IRequest } from '@/api/api.type';
import { IVaultApiResponse } from '@/api/vault/vault.type';
import { useApi } from '@/hook/api.hook';
import { useGroupByDate } from '@/hook/group-by-date.hook';
import { AppLayout } from '@/layout/app/app.layout';
import { useEffect, useMemo } from 'react';
import { SmallCard } from '@/components/small-card/small-card.component';

const VaultPage = () => {
  const { group } = useGroupByDate();
  const {
    call: vaultCouponsApiCall,
    data: vaultCouponsResponse,
    loading: vaultCouponsLoading,
    code: vaultCouponsCode,
  } = useApi<IRequest, IVaultApiResponse>(ERequestName.Vault, false, true);

  useEffect(() => {
    vaultCouponsApiCall();
  }, [vaultCouponsApiCall]);

  const vaultCollection = useMemo(() => {
    if (
      vaultCouponsResponse?.response &&
      vaultCouponsResponse.status === EResponseStatus.OK &&
      vaultCouponsCode === 200
    ) {
      return group(vaultCouponsResponse.response);
    }
    return [];
  }, [vaultCouponsResponse, vaultCouponsCode, group]);

  return (
    <AppLayout>
      <div className="px-6">
        <h3 className="font-bold text-xl mb-2.5 lp:text-2xl">Vault</h3>
        {vaultCollection.length ? (
          <div className="grid gap-2.5 mt-4">
            {vaultCollection.map(item => (
              <div key={item.title} className="grid gap-2.5">
                <div className="text-sm lp:text-lg">{item.title}</div>
                <div className="grid gap-2.5 sm:grid sm:grid-cols-2 sm:justify-between">
                  {item?.data?.map(data => (
                    <SmallCard
                      key={data.id}
                      id={data.id}
                      coupon={data}
                      disable={!data.can_use}
                      title={data.title}
                      image={{
                        url: data.brand.logo,
                        alt: data.brand.name,
                      }}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm">You do not have any available coupons</p>
        )}
      </div>
    </AppLayout>
  );
};

export default VaultPage;
