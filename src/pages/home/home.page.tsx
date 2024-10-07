'use client';

import { ERequestName } from '@/api/api';
import { IRequest } from '@/api/api.type';
import {
  ISectionCollectionApiResponse,
  ISectionCollectionByCategoryRequest,
} from '@/api/section/section.type';
import { BrandsList, EBrandListLayoutType } from '@/components/home/brands-list.component';
import { CategoryCard } from '@/components/home/category-card.component';
import { CategoryPicker } from '@/components/home/category-picker.component';
import { RecommendedSection } from '@/components/home/recommended-section.component';
import { EResolutionType } from '@/components/navigation/navigation-link.component';
import { useApi } from '@/hook/api.hook';
import { AppLayout } from '@/layout/app/app.layout';
import { useActiveCategory } from '@/store/active-category.store';
import { useMemo } from 'react';

const HomePage = () => {
  const { activeCategory, setActiveCategory } = useActiveCategory();

  const requestName = useMemo(
    () =>
      activeCategory.name !== 'All'
        ? ERequestName.SectionCollectionByCategory
        : ERequestName.SectionCollection,
    [activeCategory],
  );

  const requestData = useMemo<
    ISectionCollectionByCategoryRequest | boolean
  >(() => {
    if (requestName === ERequestName.SectionCollectionByCategory) {
      return {
        categories: JSON.stringify([activeCategory.id]),
      };
    }
    return false;
  }, [activeCategory]);

  const {
    data: sectionCollectionResponseData,
    code: sectionCollectionResponseCode,
    loading: sectionCollectionResponseLoading,
  } = useApi<IRequest, ISectionCollectionApiResponse>(requestName, requestData);

  return (
    <AppLayout>
      <CategoryPicker
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
      />
      <RecommendedSection category={activeCategory} />
      <BrandsList category={activeCategory} resolutionType={EResolutionType.Mobile} layoutType={EBrandListLayoutType.Slider} cStyles="lp:hidden" />
      {sectionCollectionResponseData?.response?.map(section => {
        if (section.coupons.length === 0) {
          return null;
        }
        return (
          <CategoryCard
            key={section.id}
            category={activeCategory}
            sectionId={section.id}
            title={section.title}
            coupons={section.coupons}
            cStyles='px-6 pt-6 pb-2.5 lp:pr-[43px] dp:pb-6 dp:pl-6 dp:pr-[55px]'
          />
        );
      })}
    </AppLayout>
  );
};

export default HomePage;
