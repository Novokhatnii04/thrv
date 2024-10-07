import React from 'react';

export type NotificationIconProps = {
  state: ENotificationIconState;
  variant?: ENotificationIconVariant;
};

export enum ENotificationIconVariant {
  Warning,
  Error,
}

export enum ENotificationIconState {
  HasNotifications,
  NoNotifications,
}

export const NotificationIcon: React.FC<NotificationIconProps> = ({
  state,
  variant = ENotificationIconVariant.Warning,
}) => {
  return (
    <svg
      width="20"
      height="21"
      viewBox="0 0 20 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <path
        d="M8.99964 1.40002C5.02319 1.40002 1.79964 4.62357 1.79964 8.60002V12.903L0.951116 13.7515C0.607919 14.0947 0.505252 14.6108 0.690989 15.0592C0.876726 15.5077 1.31429 15.8 1.79964 15.8H16.1996C16.685 15.8 17.1226 15.5077 17.3083 15.0592C17.494 14.6108 17.3914 14.0947 17.0482 13.7515L16.1996 12.903V8.60002C16.1996 4.62357 12.9761 1.40002 8.99964 1.40002Z"
        fill="#1B1B1D"
      />
      <path
        d="M8.99961 20.6C7.01138 20.6 5.39961 18.9883 5.39961 17H12.5996C12.5996 18.9883 10.9878 20.6 8.99961 20.6Z"
        fill="#1B1B1D"
      />
      {state === ENotificationIconState.HasNotifications && (
        <path
          d="M15.0004 9.10002C17.2648 9.10002 19.1004 7.26439 19.1004 5.00002C19.1004 2.73566 17.2648 0.900024 15.0004 0.900024C12.736 0.900024 10.9004 2.73566 10.9004 5.00002C10.9004 7.26439 12.736 9.10002 15.0004 9.10002Z"
          stroke="white"
          fill={
            variant === ENotificationIconVariant.Warning ? '#FAB512' : '#FF4545'
          }
        />
      )}
    </svg>
  );
};
