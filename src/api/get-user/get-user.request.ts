import { ERequestContentType, ERequestMethod, IApiRoute } from '../api.type';

export const getUserRequest: IApiRoute = {
  route: 'user',
  method: ERequestMethod.GET,
  contentType: ERequestContentType.Json,
};
