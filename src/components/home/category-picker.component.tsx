import { ERequestName } from '@/api/api';
import { EResponseStatus, IRequest } from '@/api/api.type';
import {
  ECategoryType,
  ICategory,
  ICategoryCollection,
  ICategoryCollectionApiResponse,
} from '@/api/category/category.type';
import { useApi } from '@/hook/api.hook';
import { useMemo } from 'react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Virtual } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { BrickComponent } from '@/components/brick/brick.component';

export const CategoryPicker = ({
  activeCategory,
  setActiveCategory,
}: {
  activeCategory: {
    id: number;
    name: string;
  };
  setActiveCategory: (category: { id: number; name: string }) => void;
}) => {
  const {
    data: categoryCollectionResponse,
    code,
    loading,
  } = useApi<IRequest, ICategoryCollectionApiResponse>(
    ERequestName.CategoryCollection,
  );

  const categoryCollection = useMemo<ICategoryCollection>(() => {
    if (
      categoryCollectionResponse?.response &&
      categoryCollectionResponse?.status === EResponseStatus.OK &&
      code === 200
    ) {
      const categoryResponse = categoryCollectionResponse?.response;
      categoryResponse.unshift({ id: 0, name: 'All' });
      return (
        categoryResponse.map(item => {
          return { ...item, type: ECategoryType.Default } as ICategory;
        }) || []
      );
    }
    return [];
  }, [
    categoryCollectionResponse?.response,
    categoryCollectionResponse?.status,
    code,
  ]);

  return (
    <div className="flex">
      <Swiper
        className="dp:w-[100%] py-[1px] pr-[1px]"
        modules={[Virtual]}
        breakpoints={{
          320: {
            spaceBetween: 12,
          },
          1440: {
            spaceBetween: 24,
          },
        }}
        slidesPerView={'auto'}
        slidesOffsetBefore={24}
        slidesOffsetAfter={24}>
        {categoryCollection.map((category, index) => (
          <SwiperSlide
            key={category.id}
            virtualIndex={index}
            style={{ width: 'fit-content' }}>
            <BrickComponent
              text={category.name}
              active={category.name === activeCategory.name}
              cStyles="lp:min-w-[140px]"
              onClick={() =>
                setActiveCategory({ id: category.id, name: category.name })
              }
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
