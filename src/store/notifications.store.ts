import { create } from 'zustand';
import { INotificationCollection } from '@/api/notification/notification.type';

interface ActiveCategory {
  notifications: INotificationCollection;
  setNotifications: (notifications: INotificationCollection) => void;
}

export const useNotifications = create<ActiveCategory>(set => ({
  notifications: [],
  setNotifications: newNotifications =>
    set(() => ({ notifications: newNotifications })),
}));
