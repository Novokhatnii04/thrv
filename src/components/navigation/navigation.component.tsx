import NavigationLink, { EResolutionType } from '@/components/navigation/navigation-link.component';
import { useMemo, useState } from 'react';
import { navigationLinks } from '@/entities/navigation-links'
import { useAuthStatus } from '@/hook/auth-status.hook';
import { usePathname } from 'next/navigation';
import { AuthModal } from '../modal/auth-modal.component';

export const Navigation = () => {
  const pathName = usePathname();
  const { isAuthenticated } = useAuthStatus();
  const [isOpenModal, setIsOpenModal] = useState(false);

  const navLinksEntity = useMemo(() => navigationLinks, [],);

  return (
    <div className="fixed w-full flex justify-between px-6 py-4 bg-white flex-2 items-center bottom-0 z-50 shadow-[0_3px_13px_rgba(74,85,104,0.15)] sm:px-28 lp:hidden">
      <AuthModal isOpen={isOpenModal} setIsOpen={setIsOpenModal} />
      {navLinksEntity.map(({ href, icon, authCheck = true }) => (
        <NavigationLink
          key={href}
          href={href}
          icon={icon}
          pathName={pathName}
          isAuthenticated={isAuthenticated}
          setIsOpenModal={setIsOpenModal}
          authCheck={authCheck}
          resolutionType={EResolutionType.Mobile}
        />
      ))}
    </div>
  );
};
