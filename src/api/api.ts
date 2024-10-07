import { IApiRoutes } from './api.type';
import { loginRequest } from './login/login.request';
import { resetPasswordRequest } from './reset-password/reset-password.request';
import { registerRequest } from './register/register.request';
import { resetPasswordTestRequest } from './reset-password-test/reset-password-test.request';
import { resetPasswordProceedRequest } from './reset-password-proceed/reset-password-proceed.request';
import { logoutRequest } from './logout/logout.request';
import { categoryCollectionRequest } from './category/category-collection.request';
import {
  sectionByCategoryRequest,
  sectionCollectionByCategoryRequest,
  sectionCollectionRequest,
  sectionRequest,
} from './section/section.request';
import { couponRequest } from './coupon/coupon.request';
import { couponCodeRequest } from './coupon-code/coupon-code.request';
import { couponNotUsedRequest } from './coupon-not-used/coupon-not-used.request';
import { uploadIdRequest } from './upload-id/upload-id.request';
import { editUserRequest } from './edit-user/edit-user.request';
import { getUserRequest } from './get-user/get-user.request';
import { notificationRequest } from './notification/notification.request';
import { notificationReadRequest } from './notification/notification-read.request';
import {
  recommendedCollectionByCategoryRequest,
  recommendedCollectionRequest,
} from './recommended/recommended.request';
import { historyRequest } from './history/history.request';
import { vaultRequest } from './vault/vault.request';
import { couponUseRequest } from './coupon-use/coupon-use.request';
import { deleteUserRequest } from './delete-user/delete-user.request';
import {
  allBrandsRequest,
  brandsByCategoriesRequest,
  getBrandByCategory,
} from './brand/brand.request';
import { pushNotificationRequest } from './push-notification/push-notification.request';
import { checkReferralCodeRequest } from './check-referral-code/check-referral-code.request';
import { welcomeMailRequest } from './welcome-mail/welcome-mail.request';
import { walletRequest } from './wallet/wallet.request';
import { walletWithdrawRequest } from './wallet-withdraw/wallet-withdraw.request';
import { referralStatusRequest } from './referral-status/referral-status.request';

export enum ERequestName {
  // Auth routes
  Login,
  Register,
  LogOut,
  ResetPassword,
  ResetPasswordTest,
  ResetPasswordProceed,
  GetUser,
  Notification,
  NotificationRead,
  // Category routes
  CategoryCollection,
  // Section routes
  SectionCollection,
  SectionCollectionByCategory,
  Section,
  SectionByCategory,
  // Coupon routes
  Coupon,
  CouponCode,
  CouponUse,
  CouponNotUsed,
  // Profile routes
  UploadId,
  EditUser,
  DeleteUser,
  // Recommended routes
  RecommendedCollection,
  RecommendedCollectionByCategory,
  // History routes
  History,
  // Vault routes
  Vault,
  // Brands routes
  BrandsCollection,
  BrandsCollectionByCategory,
  GetBrandByCategory,
  // Push notifications routes
  PushNotificationCodeCopied,
  WelcomeMail,
  CheckReferralCode,
  Wallet,
  WalletWithdraw,
  ReferralStatus,
}

export const apiRoutes: IApiRoutes = {
  // Auth routes
  [ERequestName.Login]: loginRequest,
  [ERequestName.Register]: registerRequest,
  [ERequestName.LogOut]: logoutRequest,
  [ERequestName.ResetPassword]: resetPasswordRequest,
  [ERequestName.ResetPasswordTest]: resetPasswordTestRequest,
  [ERequestName.ResetPasswordProceed]: resetPasswordProceedRequest,
  [ERequestName.GetUser]: getUserRequest,
  [ERequestName.Notification]: notificationRequest,
  [ERequestName.NotificationRead]: notificationReadRequest,
  // Category routes
  [ERequestName.CategoryCollection]: categoryCollectionRequest,
  // Section routes
  [ERequestName.SectionCollection]: sectionCollectionRequest,
  [ERequestName.SectionCollectionByCategory]:
    sectionCollectionByCategoryRequest,
  [ERequestName.Section]: sectionRequest,
  [ERequestName.SectionByCategory]: sectionByCategoryRequest,
  // Coupon routes
  [ERequestName.Coupon]: couponRequest,
  [ERequestName.CouponCode]: couponCodeRequest,
  [ERequestName.CouponUse]: couponUseRequest,
  [ERequestName.CouponNotUsed]: couponNotUsedRequest,
  // Profile routes
  [ERequestName.UploadId]: uploadIdRequest,
  [ERequestName.EditUser]: editUserRequest,
  [ERequestName.DeleteUser]: deleteUserRequest,
  // Recommended routes
  [ERequestName.RecommendedCollection]: recommendedCollectionRequest,
  [ERequestName.RecommendedCollectionByCategory]:
    recommendedCollectionByCategoryRequest,
  // History routes
  [ERequestName.History]: historyRequest,
  [ERequestName.Vault]: vaultRequest,
  [ERequestName.BrandsCollection]: allBrandsRequest,
  [ERequestName.BrandsCollectionByCategory]: brandsByCategoriesRequest,
  [ERequestName.GetBrandByCategory]: getBrandByCategory,
  // Push notifications routes
  [ERequestName.PushNotificationCodeCopied]: pushNotificationRequest,
  [ERequestName.WelcomeMail]: welcomeMailRequest,
  [ERequestName.CheckReferralCode]: checkReferralCodeRequest,
  [ERequestName.Wallet]: walletRequest,
  [ERequestName.WalletWithdraw]: walletWithdrawRequest,
  [ERequestName.ReferralStatus]: referralStatusRequest,
};
