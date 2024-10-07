import { ERequestName } from '@/api/api';
import { EResponseStatus } from '@/api/api.type';
import {
  IBrandResponseCollection,
  IBrandsCollectionApiRequest,
  IBrandsCollectionApiResponse,
} from '@/api/brand/brand.type';
import { useApi } from '@/hook/api.hook';
import React, { useMemo } from 'react';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import {
  CircleArrowButtonComponent,
  ECircleArrowButtonComponentVariant,
} from '../button/circle-arrow-button.component';
import Link from 'next/link';
import { BrandLogo, EBrandLogoType } from '@/components/brand/brand-logo';
import { EResolutionType } from '../navigation/navigation-link.component';

export enum EBrandListLayoutType {
  Slider,
  Column
}

export const BrandsList = ({
  category,
  resolutionType,
  layoutType,
  cStyles = '',
}: {
  category: { id: number; name: string };
  resolutionType?: EResolutionType,
  layoutType?: EBrandListLayoutType,
  cStyles?: string;
}) => {
  const brandsRequestName = useMemo(
    () =>
      category.name !== 'All'
        ? ERequestName.BrandsCollectionByCategory
        : ERequestName.BrandsCollection,
    [category],
  );

  const brandsRequestData = useMemo<
    IBrandsCollectionApiRequest | boolean
  >(() => {
    if (category.name !== 'All') {
      return {
        categories: JSON.stringify([category.id]),
      };
    }
    return false;
  }, [category]);

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
      return brandsResponseData.response.filter(brand => brand.is_recommended);
    }

    return [];
  }, [brandsResponseCode, brandsResponseData]);

  const isResolutionTypeMobile: boolean = resolutionType === EResolutionType.Mobile

  return (
    <div className={`${cStyles} dp:pl-[35px]`}>
      <div className="flex w-full justify-between pt-6 px-6 pb-2.5 lp:px-[30px] lp:pr-16 dp:px-0 dp:pb-0 dp:pr-11">
        <div className="text-lg font-bold text-gray-900 dp:text-2xl">Popular brands</div>
        <Link href={'/brands'} className="text-brand-dark flex items-center">
          {isResolutionTypeMobile && <div className="mr-2">View all</div>}
          <CircleArrowButtonComponent
            variant={isResolutionTypeMobile ? ECircleArrowButtonComponentVariant.Right : ECircleArrowButtonComponentVariant.LargeR}
          />
        </Link>
      </div>

      {layoutType === EBrandListLayoutType.Slider &&
        <Swiper
          modules={[Navigation]}
          spaceBetween={12}
          slidesPerView={'auto'}
          slidesOffsetBefore={24}
          slidesOffsetAfter={24}
          style={{ height: 'full' }}>
          {brands.map((brand, index) => (
            <SwiperSlide
              key={brand.id}
              virtualIndex={index}
              style={{ width: 'fit-content' }}>
              <BrandLogo brand={brand} />
            </SwiperSlide>
          ))}
        </Swiper>
      }

      {layoutType === EBrandListLayoutType.Column &&
        <div className='flex flex-wrap gap-6 pr-11 pt-3 pl-[30px] dp:pl-0 dp:pt-6 dp:gap-7'>
          {brands.map((brand) => (
            <React.Fragment key={brand.id}>
              <BrandLogo brand={brand} type={EBrandLogoType.ExtraBig} />
            </React.Fragment>
          ))}
        </div>
      }

    </div>
  );
};
