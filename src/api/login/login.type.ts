import { IResponse } from '../api.type';

export interface ILoginApiResponse extends IResponse {
  response?: {
    token?: string;
  };
}
