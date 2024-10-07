import { IResponse } from '../api.type';
import { ICouponResponseCollection } from '../coupon/coupon.type';
import { IByCategoriesApiRequest } from '../section/section.type';

export interface IRecommendedApiResponse extends IResponse {
  response: ICouponResponseCollection;
}

export type IRecommendedByCategoryRequest = IByCategoriesApiRequest;
