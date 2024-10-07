'use client';
import { ERequestName } from '@/api/api';
import { EResponseStatus } from '@/api/api.type';
import {
  IBrandResponseCollection,
  IBrandsCollectionApiRequest,
  IBrandsCollectionApiResponse,
} from '@/api/brand/brand.type';

import { CategoryPicker } from '@/components/home/category-picker.component';
import { useApi } from '@/hook/api.hook';
import { AppLayout } from '@/layout/app/app.layout';
import { useActiveCategory } from '@/store/active-category.store';
import React, { useMemo } from 'react';
import { BackButtonComponent } from '@/components/back-button/back-button.component';
import { BrandLogo } from '@/components/brand/brand-logo';

const BrandsPage = () => {
  const { activeCategory, setActiveCategory } = useActiveCategory();

  const brandsRequestName = useMemo(
    () =>
      activeCategory.name !== 'All'
        ? ERequestName.BrandsCollectionByCategory
        : ERequestName.BrandsCollection,
    [activeCategory],
  );

  const brandsRequestData = useMemo<
    IBrandsCollectionApiRequest | boolean
  >(() => {
    if (activeCategory.name !== 'All') {
      return {
        categories: JSON.stringify([activeCategory.id]),
      };
    }
    return false;
  }, [activeCategory]);

  const {
    data: brandsResponseData,
    code: brandsResponseCode,
    loading: brandsResponseLoading,
  } = useApi<IBrandsCollectionApiRequest, IBrandsCollectionApiResponse>(
    brandsRequestName,
    brandsRequestData,
  );

  const brands = useMemo<IBrandResponseCollection>(() => {
    if (
      brandsResponseData?.response &&
      !brandsResponseData.error &&
      brandsResponseData.status === EResponseStatus.OK &&
      brandsResponseCode === 200
    ) {
      return brandsResponseData.response;
    }

    return [];
  }, [brandsResponseCode, brandsResponseData]);

  return (
    <AppLayout>
      <CategoryPicker
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
      />
      <div className="grid-cols-3 grid mt-6 px-6">
        <BackButtonComponent />
        <span className="text-xl text-nowrap text-center font-bold text-brand-dark">
          Popular Brand
        </span>
      </div>
      <div className="grid grid-cols-3 gap-9 justify-between mt-6 px-6">
        {brands.map(brand => (
          <div key={brand.id} className="m-auto">
            <BrandLogo brand={brand} />
          </div>
        ))}
      </div>
    </AppLayout>
  );
};

export default BrandsPage;
