import { ERequestContentType, ERequestMethod, IApiRoute } from '../api.type';

export const sectionCollectionRequest: IApiRoute = {
  route: 'section/get',
  method: ERequestMethod.GET,
  contentType: ERequestContentType.Json,
};

export const sectionRequest: IApiRoute = {
  route: 'section/get/{id}',
  method: ERequestMethod.GET,
  contentType: ERequestContentType.Json,
};

export const sectionByCategoryRequest: IApiRoute = {
  route: 'section/one/by-categories',
  method: ERequestMethod.POST,
  contentType: ERequestContentType.FormData,
};

export const sectionCollectionByCategoryRequest: IApiRoute = {
  route: 'section/all/by-categories',
  method: ERequestMethod.POST,
  contentType: ERequestContentType.FormData,
};
