import React from 'react';

type BrickProps = {
  active: boolean;
  onClick?: () => void;
  text: string;
  cStyles?: string;
};

export const BrickComponent: React.FC<BrickProps> = ({
  active,
  onClick,
  text,
  cStyles = '',
}) => {
  return (
    <div
      className={`${active ? 'bg-brand-green' : 'bg-transparent'} ${cStyles} cursor-pointer border border-1 border-brand-green flex justify-center rounded-xl px-5 py-2.5`}
      onClick={() => onClick && onClick()}>
      {text}
    </div>
  );
};
