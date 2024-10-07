import { ICategoryResponseCollection } from '../category/category.type';
import { IResponse } from '../api.type';
import { IBrandResponse } from '../brand/brand.type';

export enum ECouponType {
  Unique = 'unique',
  Simple = 'simple',
  Link = 'link',
}

export type ICouponResponse = {
  id: number;
  title: string;
  description: string;
  main_image?: string;
  start_date: string;
  end_date: string;
  shop_link: string;
  type: ECouponType;
  coupons: [];
  categories: ICategoryResponseCollection;
  terms_and_conditions?: string;
  brand: IBrandResponse;
};

export type ICouponResponseCollection = ICouponResponse[];

export type ICouponRequest = {
  couponId: number;
};

export interface ICouponApiResponse extends IResponse {
  response: ICouponResponse;
}

export enum ECouponState {
  NotUsed,
  ReadyForUse,
  Used,
  Blocked,
}
