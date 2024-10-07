import { IResponse } from '../api.type';

export type ICategoryResponse = {
  id: number;
  name: string;
};

export type ICategoryResponseCollection = ICategoryResponse[];

export enum ECategoryType {
  All,
  Default,
}

export type IAllCategory = {
  name: string;
  type: ECategoryType;
  active?: boolean;
};

export interface ICategory extends ICategoryResponse {
  id: number;
  name: string;
  type: ECategoryType;
  active?: boolean;
}

export type IActiveCategoryCollection = ICategory[];

export type ICategoryCollection = ICategory[];

export interface ICategoryCollectionApiResponse extends IResponse {
  response: ICategoryResponseCollection;
}
