import { ERequestContentType, ERequestMethod, IApiRoute } from '../api.type';

export const referralStatusRequest: IApiRoute = {
  route: 'referral/status',
  method: ERequestMethod.GET,
  contentType: ERequestContentType.Json,
};
