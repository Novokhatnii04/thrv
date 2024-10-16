import { IResponse } from '../api.type';

export type IUserId = number;

export enum EUserStatus {
  // New user
  'New' = 'new',
  // User uploaded document and waiting result
  'WaitingVerify' = 'waiting_verify',
  // Successfully verified
  'Verified' = 'verified',
  // Rejected
  'Unverified' = 'unverified',
  // Verification period expired
  'NeedDocument' = 'need_document',
  // The user's age no longer allowed to use the services
  'RejectedByAge' = 'rejected_by_age',
}

export type IUserResponse = {
  id: IUserId;
  email: string;
  first_name: string;
  second_name: string;
  phone?: string | null;
  date_of_birth: Date;
  status: EUserStatus;
  status_label?: [keyof EUserStatus];
  referral_code?: string;
  referral_number?: number;
};

export interface IRegisterApiResponse extends IResponse {
  response: IUserResponse | string;
}