import { ERequestContentType, ERequestMethod, IApiRoute } from '../api.type';

export const resetPasswordTestRequest: IApiRoute = {
  route: 'forgot-password/test',
  method: ERequestMethod.POST,
  contentType: ERequestContentType.FormData,
};
