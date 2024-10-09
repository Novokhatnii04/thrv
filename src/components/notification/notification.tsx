import {
  ENotificationType,
  INotificationResponse,
} from '@/api/notification/notification.type';
import React, { useEffect, useState } from 'react';
import { CloseIcon } from '@/assets/icons/close.icon';
import { ErrorIcon } from '@/assets/icons/error.icon';
import { WarningIcon } from '@/assets/icons/warning.icon';
import { useNotificationHandler } from '@/hook/notification-handler.hook';

export enum ENotificationComponentVariant {
  Warning,
  Error,
}

type NotificationComponentProps = {
  notification: INotificationResponse;
  closeClickHandler: (notification: {
    id: number;
    was_read: boolean;
  }) => Promise<void>;
  cStyles?: string;
};

export const NotificationComponent: React.FC<NotificationComponentProps> = ({
  notification,
  closeClickHandler,
  cStyles = '',
}) => {
  const [variant, setVariant] = useState<ENotificationComponentVariant>(
    ENotificationComponentVariant.Warning,
  );

  const { handler: onClick } = useNotificationHandler(
    notification.notification_id,
  );

  useEffect(() => {
    switch (notification.notification_id) {
      case ENotificationType.NeedDocument:
        setVariant(ENotificationComponentVariant.Error);
        break;
      case ENotificationType.RejectedByAge:
        setVariant(ENotificationComponentVariant.Error);
        break;
      case ENotificationType.IdVerificationRequired:
        setVariant(ENotificationComponentVariant.Warning);
        break;
    }
  }, [notification]);

  const notificationWrapperStyle = cStyles ? cStyles : 'relative';

  const notificationBorderColor =
    variant === ENotificationComponentVariant.Warning
      ? // ? 'border-warning-yellow'
        'border-none shadow'
      : 'border-warning-red';

  const notificationBgColor =
    variant === ENotificationComponentVariant.Warning
      ? // ? 'bg-warning-yellow-light'
        'bg-white'
      : 'bg-warning-red-light';

  const notificationTextColor =
    variant === ENotificationComponentVariant.Warning ? 'text-[#FAB512]' : '';

  return (
    <div className={notificationWrapperStyle}>
      <div
        onClick={onClick}
        className={`w-full rounded-xl p-5 pr-9 border flex items-center flex-row ${notificationBorderColor} ${notificationBgColor}`}>
        <div className="mr-6 h-10 min-w-10 w-10">
          {variant === ENotificationComponentVariant.Warning && <WarningIcon />}
          {variant === ENotificationComponentVariant.Error && <ErrorIcon />}
        </div>
        <div className="flex-shrink">
          <span className={notificationTextColor}>{notification.text}</span>
        </div>
      </div>
      <div
        className="absolute right-3 top-3 z-10"
        onClick={() =>
          closeClickHandler({
            id: notification.id,
            was_read: notification.was_read,
          })
        }>
        <CloseIcon />
      </div>
    </div>
  );
};
