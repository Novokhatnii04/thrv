import { useMemo } from 'react';
import {
  ISectionApiResponse,
  ISectionByCategoryRequest,
  ISectionRequest,
  ISectionResponse,
} from '@/api/section/section.type';
import { ERequestName } from '@/api/api';
import {
  IRecommendedApiResponse,
  IRecommendedByCategoryRequest,
} from '@/api/recommended/recommended.type';
import { useApi } from '@/hook/api.hook';
import { EResponseStatus, IRequest } from '@/api/api.type';
import { ICouponResponseCollection } from '@/api/coupon/coupon.type';
import { useActiveCategory } from '@/store/active-category.store';
import { AppLayout } from '@/layout/app/app.layout';
import { Loading } from '@/components/loding/loading.component';
import { CouponComponent } from '@/components/coupon/coupon.component';
import { CategoryPicker } from '@/components/home/category-picker.component';
import { BackButtonComponent } from '@/components/back-button/back-button.component';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/scrollbar';
import { Scrollbar } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

const SectionDetailsPage = ({
  id,
  isRecommended = false,
}: {
  id: string;
  isRecommended?: boolean;
}) => {
  const { activeCategory, setActiveCategory } = useActiveCategory();

  const recommendedSectionEmpty: ISectionResponse = useMemo(() => {
    return {
      id: 'recommended',
      title: 'Recommended',
      coupons: [],
    };
  }, []);

  const requestName = useMemo(() => {
    if (isRecommended) {
      return activeCategory.name !== 'All'
        ? ERequestName.RecommendedCollectionByCategory
        : ERequestName.RecommendedCollection;
    }
    return activeCategory.name !== 'All'
      ? ERequestName.SectionByCategory
      : ERequestName.Section;
  }, [activeCategory.name, isRecommended]);

  const requestData = useMemo<
    | ISectionByCategoryRequest
    | ISectionRequest
    | IRecommendedByCategoryRequest
    | boolean
  >(() => {
    if (requestName === ERequestName.RecommendedCollectionByCategory) {
      return {
        categories: JSON.stringify([activeCategory.id]),
      };
    }
    if (requestName === ERequestName.RecommendedCollection) {
      return false;
    }
    if (requestName === ERequestName.SectionByCategory) {
      const request: ISectionByCategoryRequest = {
        id: Number(id),
        categories: JSON.stringify([activeCategory.id]),
      };
      return request;
    }
    if (requestName === ERequestName.Section) {
      const request: ISectionRequest = {
        id: Number(id),
      };
      return request;
    }
    return false;
  }, [activeCategory.id, id, requestName]);

  const {
    data: sectionResponseData,
    code: sectionResponseCode,
    loading: sectionResponseLoading,
  } = useApi<IRequest, ISectionApiResponse | IRecommendedApiResponse>(
    requestName,
    requestData,
  );

  const section = useMemo<ISectionResponse | undefined>(() => {
    if (
      sectionResponseData?.response &&
      !sectionResponseData.error &&
      sectionResponseData.status === EResponseStatus.OK &&
      sectionResponseCode === 200 &&
      typeof sectionResponseData.response !== 'string'
    ) {
      if (isRecommended) {
        const coupons =
          sectionResponseData.response as ICouponResponseCollection;
        return {
          ...recommendedSectionEmpty,
          coupons: coupons,
        };
      }
      return sectionResponseData.response as ISectionResponse;
    }

    if (sectionResponseLoading) {
      return undefined;
    }

    if (typeof sectionResponseData?.response === 'string') {
      alert(sectionResponseData?.response);
    } else {
      alert(sectionResponseData?.error || 'Something went wrong');
    }

    return;
  }, [
    sectionResponseData?.response,
    sectionResponseData?.error,
    sectionResponseData?.status,
    sectionResponseCode,
    sectionResponseLoading,
    isRecommended,
    recommendedSectionEmpty,
  ]);

  const renderContent = useMemo(() => {
    if (sectionResponseLoading) {
      return <Loading />;
    }

    if (!section?.coupons.length) {
      return <p className="text-center pt-2">No coupons</p>;
    }

    return (
      <>
        <div className="px-6 grid gap-4 sm:grid-cols-2 lp:hidden">
          {section.coupons.map(item => (
            <CouponComponent key={item.id} coupon={item} />
          ))}
        </div>

        <div className="hidden lp:block">
          <Swiper
            modules={[Scrollbar]}
            breakpoints={{
              640: {
                slidesPerView: 2.5,
              },
            }}
            slidesPerView={1.25}
            slidesOffsetAfter={24}
            slidesOffsetBefore={24}
            scrollbar={{ draggable: true }}
            style={{
              height: 'full',
              paddingBottom: '20px',
              marginRight: '1.5rem',
            }}>
            {section.coupons.map(item => {
              return (
                <SwiperSlide
                  key={item.id}
                  className="mr-3 lp:mr-0 lp:max-w-[266px] dp:max-w-[374px]">
                  <CouponComponent key={item.id} coupon={item} />
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </>
    );
  }, [section?.coupons, sectionResponseLoading]);

  return (
    <AppLayout>
      <CategoryPicker
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
      />
      <div className="px-6 py-4 grid grid-cols-3">
        <BackButtonComponent />
        <h3 className="text-center text-xl font-bold">{section?.title}</h3>
      </div>
      {renderContent}
    </AppLayout>
  );
};

export default SectionDetailsPage;
