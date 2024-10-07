import { ERequestContentType, ERequestMethod, IApiRoute } from '../api.type';

export const notificationRequest: IApiRoute = {
  route: 'notification/get',
  method: ERequestMethod.GET,
  contentType: ERequestContentType.Json,
};
