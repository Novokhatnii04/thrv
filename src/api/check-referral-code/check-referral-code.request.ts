import { ERequestContentType, ERequestMethod, IApiRoute } from '../api.type';

export const checkReferralCodeRequest: IApiRoute = {
  route: 'check-referral/{referral_code}',
  method: ERequestMethod.GET,
  contentType: ERequestContentType.Json,
};
