import React, { useMemo } from 'react';

export enum EArrowFilledIconVariant {
  Left,
  Right,
  AuthBack,
  Bottom,
  Top,
  Large,
}

type ArrowFilledIconProps = {
  variant?: EArrowFilledIconVariant;
};

export const ArrowIcon: React.FC<ArrowFilledIconProps> = ({
  variant = EArrowFilledIconVariant.Left,
}) => {
  const topBottomVariantStyles = useMemo(() => {
    switch (variant) {
      case EArrowFilledIconVariant.Bottom:
        return `transform: [{ rotate: "1.57079633rad" }]`;
      case EArrowFilledIconVariant.Top:
        return `transform: [{ rotate: "-1.57079633rad" }]`;
      default:
        return '';
    }
  }, [variant]);

  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 4 5"
      fill="none"
      className={`${topBottomVariantStyles}`}>
      {variant === EArrowFilledIconVariant.Left && (
        <path
          d="M3 0.5L1 2.5L3 4.5"
          stroke="white"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      )}
      {variant === EArrowFilledIconVariant.AuthBack && (
        <path
          d="M3 0.5L1 2.5L3 4.5"
          stroke="black"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      )}
      {(variant === EArrowFilledIconVariant.Right ||
        variant === EArrowFilledIconVariant.Large) && (
        <path
          d="M1 4.5L3 2.5L1 0.5"
          stroke="white"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      )}
      {(variant === EArrowFilledIconVariant.Top ||
        variant === EArrowFilledIconVariant.Bottom) && (
        <path
          d="M1 4.5L3 2.5L1 0.5"
          stroke="black"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      )}
    </svg>
  );
};
