import { useMemo, useState } from 'react';
import { useActiveCategory } from '@/store/active-category.store';
import { navigationLinks } from '@/entities/navigation-links';
import { useAuthStatus } from '@/hook/auth-status.hook';
import { usePathname } from 'next/navigation';
import { BrandsList, EBrandListLayoutType } from '../home/brands-list.component';
import { AuthModal } from '../modal/auth-modal.component';
import NavigationLink, { EResolutionType } from './navigation-link.component';

const NavigationBar = () => {
    const [isOpenModal, setIsOpenModal] = useState(false);
    const { activeCategory } = useActiveCategory();
    const { isAuthenticated } = useAuthStatus();
    const pathName = usePathname();

    const navLinks = useMemo(() => navigationLinks, []);

    const renderNavigationLinks = () => {
        return navLinks.map(({ href, icon, title, authCheck = true }, index) => {
            if (index !== 3) {
                return <NavigationLink
                    key={href}
                    href={href}
                    icon={icon}
                    pathName={pathName}
                    isAuthenticated={isAuthenticated}
                    setIsOpenModal={setIsOpenModal}
                    authCheck={authCheck}
                    resolutionType={EResolutionType.Desktop}
                    title={title}
                />
            }
        });
    };

    return (
        <div className="w-[320px] min-w-[320px] mt-[-1px] z-10 bg-white h-full flex items-center flex-col pt-[22px] dp:w-[378px] dp:min-w-[378px]">
            <AuthModal isOpen={isOpenModal} setIsOpen={setIsOpenModal} />
            <div className="w-full flex items-start flex-col gap-6 pl-[30px] mb-6 dp:mb-9 dp:pl-[35px] dp:pr-3">
                {renderNavigationLinks()}
            </div>
            <div className="w-[100%]">
                <BrandsList
                    category={activeCategory}
                    resolutionType={EResolutionType.Desktop}
                    layoutType={EBrandListLayoutType.Column}
                />
            </div>
        </div>
    );
};

export default NavigationBar;
