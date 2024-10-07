import { ERequestContentType, ERequestMethod, IApiRoute } from '../api.type';

export const loginRequest: IApiRoute = {
  route: 'login',
  method: ERequestMethod.POST,
  contentType: ERequestContentType.Json,
};
