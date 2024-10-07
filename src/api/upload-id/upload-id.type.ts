import { IResponse } from '../api.type';
// import {Asset} from 'react-native-image-picker';

export interface IUploadIdApiRequest extends IResponse {
  document?: any;
}

export interface IUploadIdApiResponse extends IResponse {
  response: null | string;
}
