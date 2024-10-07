import { ERequestContentType, ERequestMethod, IApiRoute } from '../api.type';

export const pushNotificationRequest: IApiRoute = {
  route: 'push/copied',
  method: ERequestMethod.POST,
  contentType: ERequestContentType.FormData,
};
