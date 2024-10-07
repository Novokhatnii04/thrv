import { useAnalytics } from '@/hook/analytics.hook';

export const AnalyticsLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  useAnalytics();

  return <>{children}</>;
};
