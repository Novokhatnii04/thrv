'use client';
import { ERequestName } from '@/api/api';
import { EResponseStatus, IRequest } from '@/api/api.type';
import { IHistoryApiResponse } from '@/api/history/history.type';
import { useApi } from '@/hook/api.hook';
import { useGroupByDate } from '@/hook/group-by-date.hook';
import { AppLayout } from '@/layout/app/app.layout';
import { useEffect, useMemo } from 'react';
import { SmallCard } from '@/components/small-card/small-card.component';

const HistoryPage = () => {
  const { group } = useGroupByDate();
  const {
    data: historyCouponsResponse,
    call: historyApiCall,
    code: historyResponseCode,
  } = useApi<IRequest, IHistoryApiResponse>(ERequestName.History, false, true);

  useEffect(() => {
    historyApiCall();
  }, [historyApiCall]);

  const history = useMemo(() => {
    if (
      historyCouponsResponse?.response &&
      historyCouponsResponse.status === EResponseStatus.OK &&
      historyResponseCode === 200
    ) {
      return group(historyCouponsResponse.response);
    }
    return [];
  }, [group, historyCouponsResponse, historyResponseCode]);

  return (
    <AppLayout>
      <div className="px-6">
        <h3 className="font-bold text-xl mb-2.5 lp:text-2xl">Used coupons</h3>
        {history.length ? (
          <div className="grid gap-4">
            {history.map(item => (
              <div key={item.title} className="grid gap-2.5">
                <div className="text-sm lp:text-lg">{item.title}</div>
                <div className="grid gap-2 sm:grid-cols-2 sm:justify-between lp:gap-4">
                  {item?.data?.map((data, index) => (
                    <div key={`${data.id + index}`}>
                      <SmallCard
                        key={data.id}
                        id={data.id}
                        disable={!data.can_reuse}
                        title={data.title}
                        image={{
                          url: data.brand.logo,
                          alt: data.brand.name,
                        }}
                        historyCode={data.coupon_code}
                        coupon={data}
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm">You have not used any coupons yet</p>
        )}
      </div>
    </AppLayout>
  );
};

export default HistoryPage;
