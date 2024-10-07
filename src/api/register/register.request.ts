import { ERequestContentType, ERequestMethod, IApiRoute } from '../api.type';

export const registerRequest: IApiRoute = {
  route: 'register',
  method: ERequestMethod.POST,
  contentType: ERequestContentType.FormData,
};
