'use client';
import {
  CircleArrowButtonComponent,
  ECircleArrowButtonComponentVariant,
} from '@/components/button/circle-arrow-button.component';
import { AuthIllustration } from './auth-illustrarion.component';
import { useRouter } from 'next/navigation';
import { AnalyticsLayout } from '@/layout/analytics/analytics.layout';

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({ children, title }) => {
  const router = useRouter();
  const handleBack = () => {
    router.back();
  };

  return (
    <AnalyticsLayout>
      <div className="flex flex-col h-full bg-brand-black">
        <AuthIllustration />
        <div className="w-full sm:max-w-[576px] sm:mx-auto">
          <div className="flex items-center px-10">
            <CircleArrowButtonComponent
              onClick={handleBack}
              variant={ECircleArrowButtonComponentVariant.AuthBack}
            />
            <span className="ml-3 text-4xl font-bold text-brand-white">
              {title}
            </span>
          </div>
          <div className="flex flex-col p-7">{children}</div>
        </div>
      </div>
    </AnalyticsLayout>
  );
};
