import Link from 'next/link';
import { MouseEvent, FC, useCallback, useState, useEffect } from 'react';

export enum EResolutionType {
  Mobile,
  Desktop,
}

export enum ENavigationType {
  Header,
}

interface NavigationLinkProps {
  href: string;
  icon: React.FC<{ fill: string }>;
  pathName: string | null;
  isAuthenticated: boolean;
  setIsOpenModal: (isOpen: boolean) => void;
  authCheck?: boolean;
  resolutionType: EResolutionType;
  navigationStylesType?: ENavigationType | null;
  title?: string;
}

const NavigationLink: FC<NavigationLinkProps> = ({
  href,
  icon: Icon,
  pathName,
  isAuthenticated,
  setIsOpenModal,
  authCheck = true,
  resolutionType,
  title,
  navigationStylesType = null,
}) => {
  const [isHydrated, setIsHydrated] = useState(false);
  const isActive = pathName === href;

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const handleClick = useCallback(
    (e: MouseEvent<HTMLAnchorElement>) => {
      if (!isAuthenticated && authCheck) {
        e.preventDefault();
        setIsOpenModal(true);
      }
    },
    [isAuthenticated, setIsOpenModal],
  );

  if (!isHydrated) {
    return null;
  }

  const textStyles = 'text-black text-xl font-bold';

  if (
    navigationStylesType === ENavigationType.Header &&
    EResolutionType.Desktop
  ) {
    return (
      <Link href={href} aria-disabled={!isAuthenticated} onClick={handleClick}>
        <div
          className={`flex gap-[15px] justify-start items-center ${isActive ? 'bg-brand-green100' : 'bg-transparent'} px-4 py-2 rounded-2xl`}>
          <Icon fill="#000000" />
          <h1 className={textStyles}>{title}</h1>
        </div>
      </Link>
    );
  }

  if (resolutionType === EResolutionType.Desktop) {
    return (
      <Link href={href} aria-disabled={!isAuthenticated} onClick={handleClick}>
        <div
          className={`flex w-[230px] pl-[27px] gap-[15px] h-[59px] justify-start items-center dp:w-[301px] 
          ${isActive ? 'bg-brand-green100' : 'bg-white'} rounded-xl`}>
          <Icon fill={isActive ? 'black' : '#A4A4A5'} />
          <h1
            className={`${isActive ? 'text-black font-bold' : 'text-[#A4A4A5] font-normal'} text-xl`}>
            {title}
          </h1>
        </div>
      </Link>
    );
  }

  if (resolutionType === EResolutionType.Mobile) {
    return (
      <Link href={href} aria-disabled={!isAuthenticated} onClick={handleClick}>
        <Icon fill={isActive ? '#6EEAD2' : '#A4A4A5'} />
      </Link>
    );
  }
};

export default NavigationLink;
