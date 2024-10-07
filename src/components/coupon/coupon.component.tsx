import { DOMAIN } from '@/config/api';
import React from 'react';
import { ICouponResponse } from '@/api/coupon/coupon.type';
import { BrandLogo } from '@/components/brand/brand-logo';
import { useRouter } from 'next/navigation';

export const CouponComponent = ({ coupon }: { coupon: ICouponResponse }) => {
  const router = useRouter();

  const handleClick = (event: React.MouseEvent<HTMLDivElement>): void => {
    const isBrandLogo = (event.target as HTMLElement).closest('.brand-logo');

    if (!isBrandLogo) {
      router.push(`/coupon/${coupon.id}`);
    }
  };

  return (
    <div
      onClick={handleClick}
      className="block lp:w-[255px] dp:w-[342px] rounded-2xl p-2 border-1 border border-brand-green cursor-pointer">
      <div
        className="relative w-full overflow-hidden rounded-xl"
        style={{ paddingTop: '56.25%' }}>
        <img
          className="absolute top-0 left-0 w-full h-full object-cover rounded-xl"
          src={DOMAIN + (coupon?.main_image ?? coupon?.brand.logo)}
          alt={coupon.title}
        />
      </div>
      <div className="flex justify-between items-center mt-2 px-4">
        <div className="mr-1 truncate-2-lines">{coupon.title}</div>
        <BrandLogo brand={coupon.brand} />
      </div>
    </div>
  );
};
