import {
  ArrowIcon,
  EArrowFilledIconVariant,
} from '../../assets/icons/arrow-filled.icon';
import React from 'react';

export enum ECircleArrowButtonComponentVariant {
  Left,
  Right,
  AuthBack,
  LargeR,
  LargeL
}

type CircleArrowButtonComponentProps = {
  variant?: ECircleArrowButtonComponentVariant;
  onClick?: () => void;
};

export const CircleArrowButtonComponent: React.FC<
  CircleArrowButtonComponentProps
> = ({ variant = ECircleArrowButtonComponentVariant.Left, onClick }) => {
  let iconVariant: EArrowFilledIconVariant = EArrowFilledIconVariant.Left;

  switch (variant) {
    case ECircleArrowButtonComponentVariant.Left:
      iconVariant = EArrowFilledIconVariant.Left;
      break;
    case ECircleArrowButtonComponentVariant.AuthBack:
      iconVariant = EArrowFilledIconVariant.AuthBack;
      break;
    case ECircleArrowButtonComponentVariant.Right:
      iconVariant = EArrowFilledIconVariant.Right;
      break;
    case ECircleArrowButtonComponentVariant.LargeR:
    case ECircleArrowButtonComponentVariant.LargeL:
      iconVariant = EArrowFilledIconVariant.Large;
      break;
    default:
      iconVariant = EArrowFilledIconVariant.Left;
      break;
  }

  const isLarge = variant === ECircleArrowButtonComponentVariant.LargeL || variant === ECircleArrowButtonComponentVariant.LargeR

  const buttonSize =
    variant === ECircleArrowButtonComponentVariant.AuthBack || isLarge
      ? 'h-6 w-6 sm:w-6 sm:h-6'
      : 'h-4 w-4 lp:h-6 lp:w-6 sm:w-5 sm:h-5';

  const buttonColor =
    variant === ECircleArrowButtonComponentVariant.AuthBack
      ? 'bg-brand-white'
      : 'bg-brand-dark';

  const buttonPadding =
    variant === ECircleArrowButtonComponentVariant.AuthBack || isLarge 
      ? 'p-2' 
      : 'p-1 lp:p-2';

  return (
    <div
      onClick={onClick}
      className={`${buttonSize} ${buttonColor} rounded-full items-center justify-center`}>
      <div
        className={`${buttonPadding} h-full w-full flex items-center justify-center`}>
        <ArrowIcon variant={iconVariant} />
      </div>
    </div>
  );
};
