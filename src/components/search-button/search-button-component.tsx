import { usePathname } from 'next/navigation';
import React, { useLayoutEffect, useState } from 'react';
import { SearchIcon } from '@/assets/icons/search.icon';

interface ISearchButton {
  cStyles?: string;
  onClickHandler?: () => void;
}

const SearchButton: React.FC<ISearchButton> = ({
  cStyles = 'flex',
  onClickHandler,
}) => {
  const pathname = usePathname();
  const [isDisabled, setIsDisabled] = useState(true);

  useLayoutEffect(() => {
    if (pathname === '/search') {
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }

    return () => {
      setIsDisabled(false);
    };
  }, [pathname]);

  return (
    <button
      onClick={onClickHandler}
      className={`hover:bg-brand-green100 transition justify-center relative items-center border w-cxl h-cs rounded-xl ${cStyles} ${isDisabled ? 'pointer-events-none bg-brand-gray600 border-brand-gray100' : 'bg-white  border-brand-green'}`}>
      <div className="absolute left-3">
        <SearchIcon />
      </div>
      <span>Search</span>
    </button>
  );
};

export default SearchButton;
