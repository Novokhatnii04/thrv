import { ERequestName } from './api';

export enum EResponseStatus {
  'OK' = 'ok',
  'Failed' = 'failed',
}

export enum ERequestMethod {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

export enum ERequestContentType {
  FormData = 'multipart/form-data',
  Json = 'application/json',
}

export type IResponseError = {
  error?: string;
};

export type IResponse = {
  status?: EResponseStatus;
  response?: unknown;
};

export type IRequest = object;

export type IApiRoute = {
  route: string;
  method: ERequestMethod;
  contentType: ERequestContentType;
};

export type IApiRoutes = {
  [key in ERequestName]: IApiRoute;
};
