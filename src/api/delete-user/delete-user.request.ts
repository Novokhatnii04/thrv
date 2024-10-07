import { ERequestContentType, ERequestMethod, IApiRoute } from '../api.type';

export const deleteUserRequest: IApiRoute = {
  route: 'user/delete',
  method: ERequestMethod.DELETE,
  contentType: ERequestContentType.Json,
};
