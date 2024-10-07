import { ERequestContentType, ERequestMethod, IApiRoute } from '../api.type';

export const welcomeMailRequest: IApiRoute = {
  route: 'user/welcome',
  method: ERequestMethod.POST,
  contentType: ERequestContentType.Json,
};
