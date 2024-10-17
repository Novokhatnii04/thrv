import React from 'react';
import { DOMAIN } from '@/config/api';
import { ICouponResponse } from '@/api/coupon/coupon.type';
import { BrandLogo } from '@/components/brand/brand-logo';
import { useRouter } from 'next/navigation';
import ArrowButton from '@/components/arrow-button/arrow-button.component';

export enum ECouponType {
  Primary,
  Secodary,
}

export const CouponComponent = ({
  coupon,
  type = ECouponType.Primary,
}: {
  coupon: ICouponResponse;
  type?: ECouponType;
}) => {
  const router = useRouter();

  const handleClick = (event: React.MouseEvent<HTMLDivElement>): void => {
    const isBrandLogo = (event.target as HTMLElement).closest('.brand-logo');

    if (!isBrandLogo) {
      router.push(`/coupon/${coupon.id}`);
    }
  };

  let couponWrapperStyles: string = '';
  let couponTitleStyles: string = '';

  //Switch for other styles in future
  switch (type) {
    case ECouponType.Secodary:
      couponWrapperStyles = 'border-0 p-0 lp:w-[426px] dp:w-[569px]';
      couponTitleStyles =
        'text-xl font-extrabold leading-7 mr-auto dp:text-2xl dp:leading-8';
      break;
  }

  return (
    <div
      onClick={handleClick}
      className={`block lp:w-[255px] dp:w-[342px] rounded-2xl p-2 border-1 border border-brand-green cursor-pointer ${couponWrapperStyles}`}>
      <div
        className="relative w-full overflow-hidden rounded-xl"
        style={{ paddingTop: '56.25%' }}>
        <img
          className="absolute top-0 left-0 w-full h-full object-cover rounded-xl"
          src={DOMAIN + (coupon?.main_image ?? coupon?.brand.logo)}
          alt={coupon.title}
        />
        {type === ECouponType.Secodary &&
          <div className="hidden lp:block absolute top-3 right-4">
            <ArrowButton />
          </div>
        }
      </div>

      <div
        className={`flex justify-between items-center mt-2 px-4 ${type === ECouponType.Secodary && 'px-0 mt-4'}`}>
        <div className={`mr-1 truncate-2-lines ${couponTitleStyles}`}>
          {coupon.title}
        </div>
        {type === ECouponType.Primary ? <BrandLogo brand={coupon.brand} /> : ''}
      </div>
    </div>
  );
};
