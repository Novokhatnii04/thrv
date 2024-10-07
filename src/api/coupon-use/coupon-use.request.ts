import { ERequestContentType, ERequestMethod, IApiRoute } from '../api.type';

export const couponUseRequest: IApiRoute = {
  route: 'coupon/{couponId}/use',
  method: ERequestMethod.GET,
  contentType: ERequestContentType.Json,
};
