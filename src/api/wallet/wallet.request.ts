import { ERequestContentType, ERequestMethod, IApiRoute } from '../api.type';

export const walletRequest: IApiRoute = {
  route: 'wallet',
  method: ERequestMethod.GET,
  contentType: ERequestContentType.Json,
};
