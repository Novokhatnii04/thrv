import { ERequestContentType, ERequestMethod, IApiRoute } from '../api.type';

export const historyRequest: IApiRoute = {
  route: 'history',
  method: ERequestMethod.GET,
  contentType: ERequestContentType.Json,
};
