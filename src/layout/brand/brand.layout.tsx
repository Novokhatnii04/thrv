'use client';
import { AppLayout } from '@/layout/app/app.layout';
import { BrickComponent } from '@/components/brick/brick.component';
import { useRouter } from 'next/navigation';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  ArrowIcon,
  EArrowFilledIconVariant,
} from '@/assets/icons/arrow-filled.icon';
import { BackButtonComponent } from '@/components/back-button/back-button.component';
import { useActiveCategory } from '@/store/active-category.store';
import { IBrandApiRequest, IBrandApiResponse } from '@/api/brand/brand.type';
import { useApi } from '@/hook/api.hook';
import { ERequestName } from '@/api/api';
import { EResponseStatus } from '@/api/api.type';
import { Loading } from '@/components/loding/loading.component';
import { useBrandStore } from '@/store/brand.store';
import { BrandInfoComponent } from '@/layout/brand/brand-info.component';
import { BrandDetailsComponent } from '@/layout/brand/brand-detail.component';
import { DOMAIN } from '@/config/api';
import { BrandLogo, EBrandLogoType } from '@/components/brand/brand-logo';
import { useAnalytics } from '@/hook/analytics.hook';

type TabName = 'Offers' | 'Browse' | 'About';

interface BrandLayoutProps {
  id: string;
}

interface ITab {
  name: TabName;
  component?: React.ReactNode;
  onClick?: () => void;
}

export const BrandLayout: React.FC<BrandLayoutProps> = ({ id }) => {
  const router = useRouter();
  const { logFirebaseEvent, logPixelEvent } = useAnalytics();

  const { activeCategory } = useActiveCategory();
  const { brand, setBrand } = useBrandStore();

  const handleBrowseClick = useCallback(() => {
    if (!brand) {
      return;
    }

    const eventName = 'brand_browse';
    const params = {
      brand_id: brand.id,
      brand_name: brand.name,
    };

    logFirebaseEvent(eventName, params);
    logPixelEvent(eventName, params);

    window.open(brand?.brand_url, '_blank');
  }, [brand, logFirebaseEvent, logPixelEvent]);

  const tabs = useMemo<ITab[]>(
    () => [
      {
        name: 'Offers',
        component: <BrandDetailsComponent />,
      },
      {
        name: 'Browse',
        onClick: handleBrowseClick,
      },
      {
        name: 'About',
        component: <BrandInfoComponent />,
      },
    ],
    [handleBrowseClick],
  );

  const getTabByName = useCallback(
    (name?: TabName) => {
      return tabs.find(tab => tab.name === name) ?? tabs[0];
    },
    [tabs],
  );

  const [activeTab, setActiveTab] = useState<ITab>(tabs[0]);

  const handleBack = () => {
    router.back();
  };

  const brandRequestData = useMemo<IBrandApiRequest>(() => {
    if (activeCategory.name !== 'All') {
      return {
        brandId: Number(id),
        categories: JSON.stringify([activeCategory.id]),
      };
    }

    return {
      brandId: Number(id),
    };
  }, [activeCategory, id]);

  const {
    data: brandResponseData,
    code: brandResponseCode,
    loading: brandLoading,
    call: callBrandApi,
  } = useApi<IBrandApiRequest, IBrandApiResponse>(
    ERequestName.GetBrandByCategory,
    brandRequestData,
    true,
  );

  useEffect(() => {
    if (
      brandResponseData &&
      brandResponseCode === 200 &&
      !brandResponseData.error &&
      brandResponseData.status === EResponseStatus.OK
    ) {
      setBrand(brandResponseData.response);
    }
  }, [brandResponseCode, brandResponseData, setBrand]);

  useEffect(() => {
    callBrandApi().catch(error => {
      console.error(error);
    });
  }, [brandRequestData, callBrandApi]);

  if (brandLoading) {
    return (
      <AppLayout>
        <Loading />
      </AppLayout>
    );
  }

  return (
    <AppLayout header={false} containerClass="pt-0">
      <div>
        <div className={`relative ${brand?.image && 'mb-12'} sm:mt-8`}>
          {brand?.image ? (
            <>
              <div className="absolute top-2 left-1">
                <div className="flex items-center sm:hidden">
                  <div className="w-8 h-8" onClick={handleBack}>
                    <ArrowIcon variant={EArrowFilledIconVariant.Left} />
                  </div>
                  <span className="ml-1 text-brand-white text-xl">Back</span>
                </div>
                <div className="hidden sm:block pl-6">
                  <BackButtonComponent />
                </div>
              </div>
              <img
                src={DOMAIN + brand?.image}
                alt="brand"
                className={`w-full aspect-video max-h-[300px] object-cover sm:max-w-[432px] sm:m-auto sm:rounded-xl sm:overflow-hidden`}
              />
            </>
          ) : (
            <div className="pl-6 pt-6 sm:pt-0">
              <BackButtonComponent />
            </div>
          )}
          {brand && brand?.image && (
            <div className="absolute left-1/2 -bottom-7 -translate-x-1/2">
              <BrandLogo brand={brand} type={EBrandLogoType.Big} />
            </div>
          )}
        </div>
        <div className="grid grid-cols-3 gap-4 justify-between items-center flex-wrap mt-4 px-6 max-w-96 mx-auto">
          {tabs.map(tab => (
            <BrickComponent
              key={tab.name}
              text={tab.name}
              active={activeTab.name === tab.name}
              onClick={() => {
                if (tab.onClick) {
                  tab.onClick();
                } else {
                  setActiveTab(getTabByName(tab.name));
                }
              }}
            />
          ))}
        </div>
      </div>
      {activeTab.component}
    </AppLayout>
  );
};
