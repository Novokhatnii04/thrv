import { ERequestContentType, ERequestMethod, IApiRoute } from '../api.type';

export const resetPasswordRequest: IApiRoute = {
  route: 'forgot-password',
  method: ERequestMethod.POST,
  contentType: ERequestContentType.FormData,
};
