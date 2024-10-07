import { ERequestContentType, ERequestMethod, IApiRoute } from '../api.type';

export const couponCodeRequest: IApiRoute = {
  route: 'code/{couponId}/request',
  method: ERequestMethod.GET,
  contentType: ERequestContentType.Json,
};
