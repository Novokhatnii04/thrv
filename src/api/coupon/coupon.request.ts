import { ERequestContentType, ERequestMethod, IApiRoute } from '../api.type';

export const couponRequest: IApiRoute = {
  route: 'coupon/{couponId}',
  method: ERequestMethod.GET,
  contentType: ERequestContentType.Json,
};
