import { EUserStatus } from '@/api/register/register.type';
import { CheckmarkSmallIcon } from '@/assets/icons/checkmark-small.icon';
import { ErrorIcon } from '@/assets/icons/error.icon';
import { WarningIcon } from '@/assets/icons/Icons';
import React, { FC } from 'react';
import { useRouter } from 'next/navigation';

interface IStatusMessageFunc {
  borderColor: string;
  bgColor: string;
  icon: React.ReactNode;
  message: string;
  textColor?: string;
  onClick?: () => void;
}

const StatusMessage = ({
  borderColor,
  bgColor,
  icon,
  message,
  textColor = 'text-sm',
  onClick,
}: IStatusMessageFunc) => {
  return (
    <div
      className={`w-full py-4 my-1 px-6 border-${borderColor} border rounded-lg ${bgColor} bg-opacity-10 flex flex-row items-center`}
      onClick={onClick}>
      <div className="min-w-10 w-10 h-10 mr-6">{icon}</div>
      <p className={`${textColor} flex-shrink`}>{message}</p>
    </div>
  );
};

const StatusBlock: FC<{ status: EUserStatus }> = ({ status }) => {
  const router = useRouter();

  switch (status) {
    case EUserStatus.New:
      return (
        <StatusMessage
          borderColor="warning-yellow"
          bgColor="bg-warning-yellow"
          icon={<WarningIcon />}
          message="The app can be used by users up to 30 years old only. Click here to upload your ID."
          onClick={() => router.push('/verify-identity')}
        />
      );
    case EUserStatus.Verified:
      return (
        <StatusMessage
          borderColor="brand-green"
          bgColor="bg-brand-green"
          icon={<CheckmarkSmallIcon />}
          message="Age of user is verified"
          textColor="text-brand-green"
        />
      );
    case EUserStatus.Unverified:
    case EUserStatus.RejectedByAge:
      return (
        <StatusMessage
          borderColor="warning-red"
          bgColor="bg-warning-red"
          icon={<ErrorIcon />}
          message="Apologies, you did not pass verification. The app can be used by users up to 30 years old only."
        />
      );
    case EUserStatus.NeedDocument:
      return (
        <StatusMessage
          borderColor="warning-red"
          bgColor="bg-warning-red"
          icon={<ErrorIcon />}
          message="The verification period has expired. To continue using the app, click here to upload your ID."
          onClick={() => router.push('/verify-identity')}
        />
      );
    default:
      return null;
  }
};

export default StatusBlock;
