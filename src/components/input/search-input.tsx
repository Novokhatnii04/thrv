import { type ChangeEvent, useEffect, useState } from 'react';
import { SearchIcon } from '@/assets/icons/search.icon';
import { SearchCloseIcon } from '@/assets/icons/search-close.icon';
import debounce from '@mui/utils/debounce';

export const SearchInput: React.FC<{
  onChange?: (value: string) => void;
  initial?: string;
  cStyles?: string;
}> = ({ onChange, initial = '', cStyles = '' }) => {
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
    <div className={`relative w-full max-w-sm ${cStyles}`}>
      <input
        type="text"
        className="w-full p-2 pl-11 border border-1 border-[#BDBDBD] bg-white rounded-3xl outline-none shadow-[0_0_3px_rgba(74,85,104,0.2)] lp:p-[6px] lp:pl-[56px] dp:p-[10px] dp:pl-[60px] lp:ml-6"
        placeholder="Search"
        value={search}
        onChange={handleChange}
      />
      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 lp:left-10">
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
