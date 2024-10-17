import React from 'react';

interface IArrowButton {
  cStyles?: string;
}

const ArrowButton: React.FC<IArrowButton> = ({
  cStyles = 'bg-brand-green',
}) => {
  return (
    <button
      className={`rounded-full lp:w-[36px] lp:h-[36px] dp:w-[46px] dp:h-[46px] flex items-center justify-center ${cStyles}`}>
      <svg
        width="10"
        height="16"
        viewBox="0 0 10 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <path
          d="M2.125 13.75L7.875 8L2.125 2.25"
          stroke="white"
          stroke-width="2.875"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </button>
  );
};

export default ArrowButton;
