import {
  INotificationApiResponse,
  INotificationCollection,
  INotificationReadApiRequest,
} from '@/api/notification/notification.type';
import { useApi } from '@/hook/api.hook';
import { ERequestName } from '@/api/api';
import { EResponseStatus, IRequest } from '@/api/api.type';
import { useCallback, useEffect, useState } from 'react';
import { ENotificationIconState } from '@/assets/icons/notification.icon';
import { useNotifications } from '@/store/notifications.store';

export enum ENotificationTrayState {
  Opened,
  Closed,
}

interface NotificationState {
  notifications: INotificationCollection;
  notificationTrayState: ENotificationTrayState;
  notificationIconState: ENotificationIconState;
  refetch: () => Promise<void>;
  readNotification: (request: INotificationReadApiRequest) => Promise<void>;
  toggleNotificationTray: () => void;
}

export const useNotification = (): NotificationState => {
  const { notifications, setNotifications } = useNotifications();

  const [notificationTrayState, setNotificationTrayState] =
    useState<ENotificationTrayState>(ENotificationTrayState.Closed);

  const [notificationIconState, setNotificationIconState] =
    useState<ENotificationIconState>(ENotificationIconState.NoNotifications);

  const {
    call: notificationApiCall,
    data: notificationResponse,
    code: notificationStatusCode,
  } = useApi<IRequest, INotificationApiResponse>(
    ERequestName.Notification,
    false,
  );

  const [notificationReadApiRequest, setNotificationReadApiRequest] = useState<
    INotificationReadApiRequest | undefined
  >(undefined);

  const { call: notificationReadApiCall } = useApi<
    IRequest,
    INotificationApiResponse
  >(ERequestName.NotificationRead, notificationReadApiRequest, true);

  useEffect(() => {
    if (
      notificationResponse &&
      notificationStatusCode === 200 &&
      notificationResponse.status === EResponseStatus.OK
    ) {
      setNotifications(notificationResponse.response);
    }
  }, [notificationStatusCode, notificationResponse]);

  const refetch = useCallback(async () => {
    await notificationApiCall();
  }, [notificationApiCall]);

  useEffect(() => {
    const newNotificationExists = notifications.some(notification => {
      return !notification.was_read;
    });

    setNotificationIconState(
      notifications.length > 0
        ? ENotificationIconState.HasNotifications
        : ENotificationIconState.NoNotifications,
    );

    setNotificationTrayState(
      newNotificationExists
        ? ENotificationTrayState.Opened
        : ENotificationTrayState.Closed,
    );
  }, [notifications]);

  useEffect(() => {
    if (!notificationReadApiRequest) {
      return;
    }

    notificationReadApiCall()
      .then(
        ({
          data: { status: notificationReadStatus },
          code: notificationReadCode,
        }) => {
          if (
            notificationReadStatus !== EResponseStatus.OK ||
            notificationReadCode !== 200
          ) {
            return Promise.reject();
          }
          return refetch();
        },
      )
      .catch(e => {
        console.error(e);
      });
  }, [notificationReadApiCall, notificationReadApiRequest, refetch]);

  const readNotification = async (
    notificationApiRequest: INotificationReadApiRequest,
  ) => {
    if (notificationApiRequest.was_read) {
      setNotificationTrayState(ENotificationTrayState.Closed);
    } else {
      setNotificationReadApiRequest(notificationApiRequest);
    }
  };

  const toggleNotificationTray = () => {
    setNotificationTrayState(prevState => {
      return prevState === ENotificationTrayState.Closed
        ? ENotificationTrayState.Opened
        : ENotificationTrayState.Closed;
    });
  };

  return {
    notifications,
    refetch,
    readNotification,
    notificationTrayState,
    toggleNotificationTray,
    notificationIconState,
  };
};
