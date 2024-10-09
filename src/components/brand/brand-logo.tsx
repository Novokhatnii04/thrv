import { DOMAIN } from '@/config/api';
import Link from 'next/link';
import { IBrandResponse } from '@/api/brand/brand.type';

export enum EBrandLogoType {
  Small,
  Big,
  ExtraBig,
}

export const BrandLogo = ({
  brand,
  type = EBrandLogoType.Small,
}: {
  brand: IBrandResponse;
  type?: EBrandLogoType;
}) => {
  let brandSize: string = 'w-[54px] h-[54px] min-w-[54px]';
  let brandStyle: string = 'border border-brand-gray600';

  switch (type) {
    case EBrandLogoType.Big:
      brandSize = 'w-[64px] h-[64px]';
      break;
    case EBrandLogoType.ExtraBig:
      brandSize = 'w-[59px] h-[59px] dp:w-[69px] dp:h-[69px]';
      brandStyle = 'border-none drop-shadow-md border-gray-100';
      break;
  }

  return (
    <div className={`${brandSize} brand-logo w-fit`}>
      <Link
        href={`/brands/${brand.id}`}
        className={`flex items-center justify-center rounded-full w-full h-full overflow-hidden bg-white ${brandStyle}`}>
        <img
          src={DOMAIN + brand.logo}
          alt={`Brand logo ${brand.id}`}
          className={`object-contain ${brandSize}`}
        />
      </Link>
    </div>
  );
};
