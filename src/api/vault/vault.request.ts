import { ERequestContentType, ERequestMethod, IApiRoute } from '../api.type';

export const vaultRequest: IApiRoute = {
  route: 'vault',
  method: ERequestMethod.GET,
  contentType: ERequestContentType.Json,
};
