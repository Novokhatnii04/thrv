import { NOTIFICATION_HANDLERS } from '@/config/notification';
import { ENotificationType } from '@/api/notification/notification.type';
import { useRouter } from 'next/navigation';

export const useNotificationHandler = (notificationType: ENotificationType) => {
  const navigation = useRouter();
  const handler = () => NOTIFICATION_HANDLERS[notificationType](navigation);

  return { handler };
};
