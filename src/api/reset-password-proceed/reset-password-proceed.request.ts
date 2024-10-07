import { ERequestContentType, ERequestMethod, IApiRoute } from '../api.type';

export const resetPasswordProceedRequest: IApiRoute = {
  route: 'forgot-password/proceed',
  method: ERequestMethod.POST,
  contentType: ERequestContentType.FormData,
};
