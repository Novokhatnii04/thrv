import { ENotificationType } from '@/api/notification/notification.type';
import { useRouter } from 'next/navigation';

type IHandlersConfig = {
  [key in ENotificationType]: (
    navigation: ReturnType<typeof useRouter>,
  ) => void;
};

const uploadIdHandler = (navigation: ReturnType<typeof useRouter>) => {
  navigation.push('/verify-identity');
};

export const NOTIFICATION_HANDLERS: IHandlersConfig = {
  [ENotificationType.IdVerificationRequired]: uploadIdHandler,
  [ENotificationType.NeedDocument]: uploadIdHandler,
  [ENotificationType.RejectedByAge]: () => {
    return;
  },
};
