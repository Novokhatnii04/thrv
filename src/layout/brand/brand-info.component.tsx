'use client';
import {
  ButtonComponent,
  EButtonComponentVariant,
} from '@/components/button/button.component';
import { useAnalytics } from '@/hook/analytics.hook';
import { useEffect } from 'react';
import { useBrandStore } from '@/store/brand.store';

export const BrandInfoComponent: React.FC = () => {
  const { logFirebaseEvent } = useAnalytics();

  const { brand } = useBrandStore();

  useEffect(() => {
    if (!brand) {
      return;
    }

    logFirebaseEvent('brand_info_view', {
      brand_id: brand.id,
      brand_name: brand.name,
    });
  }, [brand, logFirebaseEvent]);

  const handleVisitWebsite = () => {
    if (brand) {
      window.open(brand.brand_url, '_blank');
    }
  };

  return (
    brand && (
      <div className="px-6 sm:max-w-[432px] sm:m-auto sm:px-0">
        <h3 className="mt-6 text-xl text-nowrap text-center uppercase font-bold text-brand-dark sm:mb-4">
          {brand.name}
        </h3>
        <div className="my-6">{brand.description}</div>
        <ButtonComponent
          label="Visit Website"
          onClick={handleVisitWebsite}
          variant={EButtonComponentVariant.Filled}
        />
      </div>
    )
  );
};
