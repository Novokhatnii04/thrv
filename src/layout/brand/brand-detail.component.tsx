'use client';

import { useAnalytics } from '@/hook/analytics.hook';
import { useEffect } from 'react';
import { useBrandStore } from '@/store/brand.store';
import { SmallCard } from '@/components/small-card/small-card.component';

export const BrandDetailsComponent: React.FC = () => {
  const { logFirebaseEvent } = useAnalytics();

  const { brand } = useBrandStore();

  useEffect(() => {
    if (!brand) {
      return;
    }

    logFirebaseEvent('brand_view', {
      brand_id: brand.id,
      brand_name: brand.name,
    });
  }, [brand, logFirebaseEvent]);

  return (
    brand && (
      <div className="px-6">
        <h3 className="mt-6 text-xl text-nowrap text-center uppercase font-bold text-brand-dark sm:mb-4">
          {brand.name}
        </h3>
        <div className="mt-2 grid items-center gap-2 sm:max-w-[432px] sm:m-auto">
          {brand.coupons?.map(coupon => (
            <SmallCard
              key={coupon.id}
              id={coupon.id}
              title={coupon.title}
              image={{
                url: brand.logo,
                alt: brand.name,
              }}
              coupon={coupon}
            />
          ))}
        </div>
      </div>
    )
  );
};
