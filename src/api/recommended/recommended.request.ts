import { ERequestContentType, ERequestMethod, IApiRoute } from '../api.type';

export const recommendedCollectionRequest: IApiRoute = {
  route: 'recommended/get',
  method: ERequestMethod.GET,
  contentType: ERequestContentType.Json,
};

export const recommendedCollectionByCategoryRequest: IApiRoute = {
  route: 'recommended/all/by-categories',
  method: ERequestMethod.POST,
  contentType: ERequestContentType.FormData,
};
