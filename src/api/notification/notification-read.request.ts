import { ERequestContentType, ERequestMethod, IApiRoute } from '../api.type';

export const notificationReadRequest: IApiRoute = {
  route: 'notification/set-viewed/{notificationId}',
  method: ERequestMethod.GET,
  contentType: ERequestContentType.Json,
};
