import { IUserId } from '../register/register.type';
import { IRequest, IResponse } from '../api.type';

export enum ENotificationType {
  NeedDocument = 'need_document',
  IdVerificationRequired = 'id_verification_required',
  RejectedByAge = 'rejected_by_age',
}

export type INotificationResponse = {
  id: number;
  user: IUserId;
  text: string;
  notification_id: ENotificationType;
  was_read: boolean;
};

export type INotificationCollection = INotificationResponse[];

export interface INotificationApiResponse extends IResponse {
  response: INotificationCollection;
}

export interface INotificationReadApiRequest extends IRequest {
  notificationId: number;
  was_read: boolean;
}
