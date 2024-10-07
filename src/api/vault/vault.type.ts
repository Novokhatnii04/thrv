import { IResponse } from '../api.type';
import { ICouponResponse } from '../coupon/coupon.type';

export type IVaultResponse = ICouponResponse & {
  can_use: boolean;
  use_date: string;
};

export type IVaultCollection = IVaultResponse[];

export interface IVaultApiResponse extends IResponse {
  response: IVaultCollection;
}
