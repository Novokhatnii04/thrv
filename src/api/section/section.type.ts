import { IResponse } from '../api.type';
import { ICouponResponseCollection } from '../coupon/coupon.type';

export type sectionId = number | 'recommended';

// TODO For testing
export type ISectionResponse = {
  id: sectionId;
  title: string;
  coupons: ICouponResponseCollection;
};

export type ISectionRequest = {
  id: number;
};

export type ISectionCollectionByCategoryRequest = {
  categories: string;
};

export type IByCategoriesApiRequest = {
  categories: string;
};

export type ISectionByCategoryRequest = ISectionRequest &
  IByCategoriesApiRequest;

export type ISectionResponseCollection = ISectionResponse[];

export interface ISectionCollectionApiResponse extends IResponse {
  response: ICouponResponseCollection;
}
export interface ISectionApiResponse extends IResponse {
  response: ISectionResponse | string;
}
