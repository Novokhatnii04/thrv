import { IResponse } from '../api.type';
import { ICouponResponse } from '../coupon/coupon.type';

export type ICouponHistoryResponse = ICouponResponse & {
  can_reuse: boolean;
  use_date: string;
  coupon_code?: string;
};

export type ICouponHistoryCollection = ICouponHistoryResponse[];

export interface IHistoryApiResponse extends IResponse {
  response: ICouponHistoryCollection;
}
