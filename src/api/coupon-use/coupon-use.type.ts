import { IResponse } from '../api.type';

export interface ICouponUseApiRequest extends IResponse {
  couponId?: number;
}

export interface ICouponUseApiResponse extends IResponse {
  response: ICouponUseResponse;
}

export type ICouponUseResponse = string | null;
