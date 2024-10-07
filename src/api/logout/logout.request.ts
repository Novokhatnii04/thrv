import { ERequestContentType, ERequestMethod, IApiRoute } from '../api.type';

export const logoutRequest: IApiRoute = {
  route: 'logout',
  method: ERequestMethod.POST,
  contentType: ERequestContentType.Json,
};
