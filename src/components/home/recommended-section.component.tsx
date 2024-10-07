import { CategoryCard } from './category-card.component';
import { useMemo } from 'react';
import { ERequestName } from '@/api/api';
import { ISectionCollectionByCategoryRequest } from '@/api/section/section.type';
import { useApi } from '@/hook/api.hook';
import { IRecommendedApiResponse } from '@/api/recommended/recommended.type';
import { IRequest } from '@/api/api.type';

export const RecommendedSection = ({
  category,
}: {
  category: { id: number; name: string };
}) => {
  const recommendedRequestName = useMemo(
    () =>
      category.name !== 'All'
        ? ERequestName.RecommendedCollectionByCategory
        : ERequestName.RecommendedCollection,
    [category],
  );

  const requestName = useMemo(
    () =>
      category.name !== 'All'
        ? ERequestName.SectionCollectionByCategory
        : ERequestName.SectionCollection,
    [category],
  );

  const requestData = useMemo<
    ISectionCollectionByCategoryRequest | boolean
  >(() => {
    if (requestName === ERequestName.SectionCollectionByCategory) {
      return {
        categories: JSON.stringify([category.id]),
      };
    }
    return false;
  }, [category.id, requestName]);

  const {
    data: recommendedCollectionResponseData,
    code: recommendedCollectionResponseCode,
    loading: recommendedCollectionResponseLoading,
  } = useApi<IRequest, IRecommendedApiResponse>(
    recommendedRequestName,
    requestData,
  );

  if (recommendedCollectionResponseData?.response?.length === 0) {
    return null;
  }

  return (
    <div>
      <CategoryCard
        category={category}
        sectionId={-1}
        isRecommended={true}
        title="Recommended"
        coupons={recommendedCollectionResponseData?.response}
      />
    </div>
  );
};
