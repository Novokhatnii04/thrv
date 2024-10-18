import { type ChangeEvent, FC, useEffect, useState } from 'react';
import { SearchIcon } from '@/assets/icons/search.icon';
import { SearchCloseIcon } from '@/assets/icons/search-close.icon';
import debounce from '@mui/utils/debounce';

interface ISearchInput {
  onChange?: (value: string) => void;
  initial?: string;
  cStyles?: string;
  onClickhandler?: () => void;
}

export const SearchInput: FC<ISearchInput> = ({
  onChange,
  initial = '',
  onClickhandler,
  cStyles = '',
}) => {
  const [search, setSearch] = useState(initial);

  useEffect(() => {
    setSearch(initial);
  }, [initial]);

  useEffect(() => {
    const debouncedChange = debounce((value: string) => {
      if (onChange) {
        onChange(value.trim());
      }
    }, 300);

    debouncedChange(search);

    return () => debouncedChange.clear?.();
  }, [search, onChange]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  return (
    <div
      className={`relative w-full max-w-sm ${cStyles}`}
      onClick={onClickhandler}>
      <input
        type="text"
        className="w-full p-2 pl-11 border border-1 border-[#BDBDBD] bg-white rounded-3xl outline-none shadow-[0_0_3px_rgba(74,85,104,0.2)] lp:placeholder:text-base lp:p-3 lp:pl-[43px] dp:p-[10px] dp:pl-[45px]"
        placeholder="Search"
        value={search}
        onChange={handleChange}
      />
      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 lp:left-3">
        <SearchIcon />
      </span>
      {search && (
        <button
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 focus:outline-none"
          onClick={() => setSearch('')}>
          <SearchCloseIcon />
        </button>
      )}
    </div>
  );
};
