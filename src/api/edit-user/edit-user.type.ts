import { ISignUpUser } from '@/hook/auth.hook';
import { IResponse } from '../api.type';
import { IUserResponse } from '../register/register.type';

export type IEditUserApiRequest = Omit<ISignUpUser, 'date_of_birth'>;

export interface IEditUserApiResponse extends IResponse {
  response: IUserResponse | string;
}
