import { ERequestContentType, ERequestMethod, IApiRoute } from '../api.type';

export const categoryCollectionRequest: IApiRoute = {
  route: 'category',
  method: ERequestMethod.GET,
  contentType: ERequestContentType.Json,
};
