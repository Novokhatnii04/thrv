import { IRequest, IResponse } from '../api.type';

export interface IPushNotificationApiRequest extends IRequest {
  token: string;
}

export interface IPushNotificationApiResponse extends IResponse {
  response: null;
}
