import { ERequestContentType, ERequestMethod, IApiRoute } from '../api.type';

export const walletWithdrawRequest: IApiRoute = {
  route: 'wallet',
  method: ERequestMethod.POST,
  contentType: ERequestContentType.Json,
};
