import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import {
  CircleArrowButtonComponent,
  ECircleArrowButtonComponentVariant,
} from '../button/circle-arrow-button.component';
import { ICouponResponse } from '@/api/coupon/coupon.type';
import Link from 'next/link';
import { CouponComponent } from '@/components/coupon/coupon.component';

export const CategoryCard = ({
  category,
  sectionId,
  isRecommended = false,
  title,
  coupons = [],
  cStyles = '',
}: {
  category: { id: number; name: string };
  sectionId: number;
  isRecommended?: boolean;
  title: string;
  coupons: ICouponResponse[] | undefined;
  cStyles?: string;
}) => {
  return (
    <>
      <div className="rounded-lg">
        <div
          className={`flex w-full justify-between px-6 pt-6 pb-2.5 ${cStyles}`}>
          <div className="text-lg font-bold text-gray-900">{title}</div>
          <Link
            href={`/section-details/${isRecommended ? `recommended` : sectionId}`}
            className="text-brand-dark flex items-center cursor-pointer">
            <span className="mr-2 lp:text-lg">View all</span>
            <CircleArrowButtonComponent
              variant={ECircleArrowButtonComponentVariant.Right}
            />
          </Link>
        </div>
        <div>
          <Swiper
            modules={[Navigation]}
            breakpoints={{
              640: {
                slidesPerView: 2.5,
              },
            }}
            slidesPerView={1.25}
            slidesOffsetAfter={24}
            slidesOffsetBefore={24}
            style={{ height: 'full' }}>
            {coupons?.map(coupon => {
              return (
                <SwiperSlide
                  key={coupon.id}
                  className="mr-3 lp:mr-0 lp:max-w-[266px] dp:max-w-[374px]">
                  <CouponComponent key={coupon.id} coupon={coupon} />
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </div>
    </>
  );
};
