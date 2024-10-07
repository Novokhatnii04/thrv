import { ERequestContentType, ERequestMethod, IApiRoute } from '../api.type';

export const allBrandsRequest: IApiRoute = {
  route: 'brand',
  method: ERequestMethod.GET,
  contentType: ERequestContentType.Json,
};

export const brandsByCategoriesRequest: IApiRoute = {
  route: 'brand/categories',
  method: ERequestMethod.POST,
  contentType: ERequestContentType.FormData,
};

export const getBrandByCategory: IApiRoute = {
  route: 'brand/{brandId}/categories',
  method: ERequestMethod.POST,
  contentType: ERequestContentType.FormData,
};
