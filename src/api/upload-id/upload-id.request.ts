import { ERequestContentType, ERequestMethod, IApiRoute } from '../api.type';

export const uploadIdRequest: IApiRoute = {
  route: 'document/upload',
  method: ERequestMethod.POST,
  contentType: ERequestContentType.FormData,
};
