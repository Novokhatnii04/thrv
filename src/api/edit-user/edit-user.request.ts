import { ERequestContentType, ERequestMethod, IApiRoute } from '../api.type';

export const editUserRequest: IApiRoute = {
  route: 'user/edit',
  method: ERequestMethod.POST,
  contentType: ERequestContentType.FormData,
};
