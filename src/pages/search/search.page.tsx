'use client';
import { AppLayout } from '@/layout/app/app.layout';
import { SearchInput } from '@/components/input/search-input';
import { useMemo, useState } from 'react';
import { ERequestName } from '@/api/api';
import {
  IBrandResponse,
  IBrandResponseCollection,
  IBrandsCollectionApiRequest,
  IBrandsCollectionApiResponse,
} from '@/api/brand/brand.type';
import { useApi } from '@/hook/api.hook';
import { EResponseStatus } from '@/api/api.type';
import { BrandLogo } from '@/components/brand/brand-logo';
import Link from 'next/link';
import { SearchIcon } from '@/assets/icons/search.icon';
import {
  CouponComponent,
  ECouponType,
} from '@/components/coupon/coupon.component';

const SearchPageComponent = () => {
  const [search, setSearch] = useState('');
  const [activeBrand, setActiveBrand] = useState<IBrandResponse | null>(null);

  const onSearchBarChange = (value: string) => {
    setSearch(value);
    if (activeBrand && activeBrand.name !== value) {
      setActiveBrand(null);
    }
  };

  const brandsRequestData = useMemo(
    () => ({
      search,
    }),
    [search],
  );

  const { data: brandsResponseData, code: brandsResponseCode } = useApi<
    IBrandsCollectionApiRequest,
    IBrandsCollectionApiResponse
  >(ERequestName.BrandsCollection, brandsRequestData);

  const brands = useMemo<IBrandResponseCollection>(() => {
    const isValidResponse =
      brandsResponseData?.response &&
      !brandsResponseData.error &&
      brandsResponseData.status === EResponseStatus.OK &&
      brandsResponseCode === 200;

    return isValidResponse
      ? brandsResponseData.response.filter(
          br =>
            br.name.toLowerCase().includes(search.toLowerCase()) &&
            br.is_recommended,
        )
      : [];
  }, [brandsResponseCode, brandsResponseData, search]);

  const highlightSearchTerm = (brandName: string) => {
    if (!search) {
      return <span>{brandName}</span>;
    }

    const parts = brandName.split(new RegExp(`(${search})`, 'gi'));

    return (
      <span>
        {parts.map((part, index) =>
          part.toLowerCase() === search.toLowerCase() ? (
            <b key={part + index.toString()}>{part}</b>
          ) : (
            part
          ),
        )}
      </span>
    );
  };

  return (
    <AppLayout header={true}>
      <div className="grid gap-4 p-6 pt-0">
        <SearchInput
          onChange={onSearchBarChange}
          initial={activeBrand?.name || search}
          cStyles="mr-auto ml-0 lp:max-w-full lp:w-[699px] dp:w-[1090px]"
        />
        {activeBrand ? (
          <div className="grid gap-5 lp:mt-4 dp:gap-8">
            {activeBrand.coupons?.length ? (
              <>
                <div className="text-xl font-bold text-brand-dark">
                  {activeBrand.coupons?.length > 0
                    ? 'Offers found : '
                    : 'No offers found'}
                  <span className="font-bold">
                    {activeBrand.coupons?.length}
                  </span>
                </div>
                <ul className="grid gap-2.5 lp:gap-x-0 lp:gap-y-14 lp:grid-cols-2 lp:max-w-[1050px] dp:max-w-[1330px]">
                  {activeBrand.coupons?.map(coupon => (
                    <li key={coupon.id}>
                      <CouponComponent
                        coupon={coupon}
                        type={ECouponType.Secodary}
                      />
                    </li>
                  ))}
                </ul>
              </>
            ) : (
              <p className="mx-auto mt-36 max-w-48 text-center font-bold text-xl text-brand-grey">
                There are no offers for your request
              </p>
            )}
          </div>
        ) : (
          <>
            {search.length ? (
              <ul className="grid gap-6">
                {brands.map(brand => (
                  <li
                    key={brand.id}
                    className="flex pl-6 py-3 bg-white hover:bg-brand-green100 transition-all duration-500 cursor-pointer border-b-[1px] border-brand-gray100 lp:pl-3 lp:max-w-[699px] dp:max-w-[1090px]"
                    onClick={() => setActiveBrand(brand)}>
                    <SearchIcon color="#BDBDBD" />
                    <span className="ml-3 text-lg text-brand-black lp:ml-2">
                      {highlightSearchTerm(brand.name)}
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="grid gap-5 lp:hidden">
                <div className="capitalize text-xl font-bold text-brand-dark">
                  Popular brands
                </div>
                <ul className="grid gap-6">
                  {brands.map(brand => (
                    <li key={brand.id}>
                      <Link
                        href={`/brands/${brand.id}`}
                        className="flex items-center">
                        <BrandLogo brand={brand} />
                        <span className="ml-4">{brand.name}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </>
        )}
      </div>
    </AppLayout>
  );
};

export default SearchPageComponent;
