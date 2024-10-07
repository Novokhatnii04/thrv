import { IRequest, IResponse } from '../api.type';
import { ICouponResponseCollection } from '../coupon/coupon.type';

export type IBrandResponse = {
  id: number;
  name: string;
  logo: string;
  image: string;
  description?: string;
  brand_url?: string;
  coupons?: ICouponResponseCollection;
  is_recommended: boolean;
};

export type IBrandResponseCollection = IBrandResponse[];

export interface IBrandsCollectionApiRequest extends IRequest {
  categories?: string;
  search?: string;
}

export interface IBrandsCollectionApiResponse extends IResponse {
  response: IBrandResponseCollection;
}

export interface IBrandApiRequest extends IRequest {
  brandId: number;
  categories?: string;
}

export interface IBrandApiResponse extends IResponse {
  response: IBrandResponse;
}
