import { ERequestContentType, ERequestMethod, IApiRoute } from '../api.type';

export const couponNotUsedRequest: IApiRoute = {
  route: 'coupon/{couponId}/has-not-used',
  method: ERequestMethod.GET,
  contentType: ERequestContentType.Json,
};
