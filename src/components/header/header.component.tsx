import {
  ENotificationIconVariant,
  NotificationIcon,
} from '@/assets/icons/notification.icon';
import { WalletSmallComponent } from '@/components/wallet/wallet-small.component';
import { useWallet } from '@/hook/wallet.hook';
import { useEffect, useMemo, useState } from 'react';
import {
  ENotificationType,
  INotificationReadApiRequest,
} from '@/api/notification/notification.type';
import { useApi } from '@/hook/api.hook';
import { IRequest } from '@/api/api.type';
import { IReferralStatusResponse } from '@/api/referral-status/referral-status.type';
import { ERequestName } from '@/api/api';
import { useAuthStatus } from '@/hook/auth-status.hook';
import { AuthModal } from '@/components/modal/auth-modal.component';
import { NotificationComponent } from '@/components/notification/notification';
import {
  ENotificationTrayState,
  useNotification,
} from '@/hook/notification.hook';
import Link from 'next/link';
import { SearchIcon } from '@/assets/icons/search.icon';
import { LogoComponent } from '@/components/logo.component';
import { SearchInput } from '../input/search-input';
import { navigationLinks } from '@/entities/navigation-links';
import NavigationLink, {
  ENavigationType,
  EResolutionType,
} from '../navigation/navigation-link.component';
import { usePathname } from 'next/navigation';

export const Header = () => {
  const pathName = usePathname();
  const { wallet } = useWallet();
  const [isAuthOpenModal, setIsAuthOpenModal] = useState(false);
  const { isAuthenticated } = useAuthStatus();

  const [isClient, setIsClient] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const {
    notifications,
    toggleNotificationTray,
    notificationTrayState,
    readNotification,
    notificationIconState,
  } = useNotification();

  const toggleNotificationsTrayHandler = () => {
    return isAuthenticated
      ? toggleNotificationTray()
      : setIsAuthOpenModal(true);
  };

  const [notificationIconVariant, setNotificationIconVariant] =
    useState<ENotificationIconVariant>(ENotificationIconVariant.Warning);

  useEffect(() => {
    const errorNotifications = notifications.filter(notification => {
      return (
        notification.notification_id === ENotificationType.NeedDocument ||
        notification.notification_id === ENotificationType.RejectedByAge
      );
    });
    if (errorNotifications.length > 0) {
      setNotificationIconVariant(ENotificationIconVariant.Error);
    } else {
      setNotificationIconVariant(ENotificationIconVariant.Warning);
    }
  }, [notifications]);

  const { data: referralStatusData } = useApi<
    IRequest,
    IReferralStatusResponse
  >(ERequestName.ReferralStatus, false);

  const onCloseNotification = async (notification: {
    id: number;
    was_read: boolean;
  }) => {
    const notificationRequest: INotificationReadApiRequest = {
      notificationId: notification.id,
      was_read: notification.was_read,
    };
    await readNotification(notificationRequest);
  };

  const isReferralStatusEnabled =
    referralStatusData?.response.mode === 'enabled';
  const walletAmount = wallet?.response.wallet?.amount;

  const iconsContent = useMemo(() => {
    if (!isClient) {
      return <></>;
    }

    if (!isAuthenticated) {
      return (
        <div className="flex items-center">
          <Link href="/search" className="block lp:hidden">
            <SearchIcon />
          </Link>
          <Link
            href="/welcome"
            className="ml-3 py-2 px-4 bg-brand-green text-base rounded-2xl">
            Sign in/up
          </Link>
        </div>
      );
    }

    return (
      <>
        <div className="flex items-center lp:hidden">
          <Link href="/search">
            <SearchIcon />
          </Link>
          <div className="ml-4" onClick={toggleNotificationsTrayHandler}>
            <NotificationIcon
              state={notificationIconState}
              variant={notificationIconVariant}
            />
          </div>
          {(isReferralStatusEnabled || (walletAmount ?? 0) > 0) && (
            <div className="ml-2.5">
              <WalletSmallComponent />
            </div>
          )}
        </div>

        <div className="hidden items-center lp:flex">
          <div className="mr-11" onClick={toggleNotificationsTrayHandler}>
            <div
              className={`${notificationTrayState === ENotificationTrayState.Opened ? 'bg-[#FAB512C7]' : 'bg-transparent'} w-10 h-10 flex items-center justify-center rounded-full`}>
              <NotificationIcon
                state={notificationIconState}
                variant={notificationIconVariant}
              />
            </div>
          </div>

          {navigationLinks.map(
            ({ href, icon, title, authCheck = true }, index) =>
              index === 3 && (
                <NavigationLink
                  key={href}
                  href={href}
                  icon={icon}
                  pathName={pathName}
                  isAuthenticated={isAuthenticated}
                  setIsOpenModal={setIsOpenModal}
                  authCheck={authCheck}
                  resolutionType={EResolutionType.Desktop}
                  navigationStylesType={ENavigationType.Header}
                  title={title}
                />
              ),
          )}

          {(isReferralStatusEnabled || (walletAmount ?? 0) > 0) && (
            <div className="ml-10">
              <WalletSmallComponent />
            </div>
          )}
        </div>
      </>
    );
  }, [
    isAuthenticated,
    isClient,
    notificationIconState,
    notificationIconVariant,
    referralStatusData?.response.mode,
    toggleNotificationsTrayHandler,
    wallet?.response.wallet?.amount,
  ]);

  return (
    <div className="mb-4 pt-4 px-6 w-full max-w-[1920px] lp:px-[30px] lp:pt-6 dp:m-auto dp:px-[35px] dp:mb-1">
      <AuthModal isOpen={isAuthOpenModal} setIsOpen={setIsAuthOpenModal} />
      <div className="flex flex-2 justify-between pb-1 bg-white flex-wrap items-center sticky top-0 w-full z-50">
        <div className="lp:w-[290px] dp:w-[343px]">
          <LogoComponent main />
        </div>
        <SearchInput cStyles="hidden lp:block mr-auto ml-0 lp:max-w-full lp:w-[699px] dp:w-[1090px]" />
        <div className="ml-1 flex items-center cursor-pointer">
          {iconsContent}
        </div>
      </div>
      <span
        className="font-bold text-base bg-clip-text text-transparent
                   bg-gradient-to-r from-[#09F3D1] via-[#33FAF0] to-[#33FAF0]">
        Exclusive Discounts For Under 30s
      </span>
      {notificationTrayState === ENotificationTrayState.Opened ? (
        <div className="grid gap-4">
          {notifications.map(notification => (
            <NotificationComponent
              key={notification.id}
              notification={notification}
              closeClickHandler={onCloseNotification}
              cStyles="absolute right-9 top-20 z-50 max-w-[460px]"
            />
          ))}
        </div>
      ) : null}
    </div>
  );
};
