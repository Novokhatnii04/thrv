import { IRequest, IResponse } from '../api.type';
import { IUserResponse } from '../register/register.type';
export interface IUserApiResponse extends IResponse {
  response: IUserResponse;
}
export interface IUserApiRequest extends IRequest {
  token: string | undefined;
}
