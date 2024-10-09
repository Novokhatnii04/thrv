import { Navigation } from '@/components/navigation/navigation.component';
import { Header } from '@/components/header/header.component';
import { AnalyticsLayout } from '@/layout/analytics/analytics.layout';
import { Footer } from '@/components/footer/footer.component';
import { useInView } from 'react-intersection-observer';
import { usePreviousPath } from '@/store/previous-path.store';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import NavigationBar from '@/components/navigation/navigation-bar.component';

interface IAppLayout {
  children: React.ReactNode;
  header?: boolean;
  containerClass?: string;
}

export const AppLayout = ({
  children,
  header = true,
  containerClass = '',
}: IAppLayout) => {
  const pathname = usePathname();
  const { setPreviousPath } = usePreviousPath();

  useEffect(() => {
    if (!pathname?.includes('coupon')) {
      setPreviousPath(window.location.href ?? '');
    }
  }, [pathname, setPreviousPath]);

  const { ref, inView: inFooterView } = useInView({ threshold: 0.01 });

  const MobileLayout = (
    <div className="min-h-full pb-6 lp:hidden">{children}</div>
  );

  const DesktopLayout = (
    <div className="min-h-full pb-6 hidden lp:flex max-w-[1920px] dp:m-auto">
      <NavigationBar />
      <div className="overflow-hidden w-full">{children}</div>
    </div>
  );

  return (
    <AnalyticsLayout>
      <div className={`${containerClass} h-full flex flex-col`}>
        {header && <Header />}
        <div className="flex-1 overflow-y-scroll">
          {MobileLayout}
          {DesktopLayout}
          <footer ref={ref}>
            <Footer />
          </footer>
        </div>
        <div
          className={`${inFooterView ? 'opacity-0' : 'opacity-100'} transition-opacity`}>
          <Navigation />
        </div>
      </div>
    </AnalyticsLayout>
  );
};
