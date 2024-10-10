import React from 'react';

export enum EButtonComponentState {
  Active,
  Disabled,
  Loading,
}

export enum EButtonComponentVariant {
  CategoryFilled,
  Filled,
  FilledWithDynamicLabelColor,
  Outline,
  WhiteOutline,
  CategoryWhiteOutline,
}

type ButtonComponentProps = {
  state?: EButtonComponentState;
  variant?: EButtonComponentVariant;
  label: string;
  onClick?: () => void;
  cStyles?: string;
};

export const ButtonComponent: React.FC<ButtonComponentProps> = ({
  state = EButtonComponentState.Active,
  variant = EButtonComponentVariant.Filled,
  label,
  onClick,
  cStyles = '',
}) => {
  let buttonStyles = ``;
  let textStyles = ``;

  switch (state) {
    default:
    case EButtonComponentState.Active:
      switch (variant) {
        default:
        case EButtonComponentVariant.Filled:
          buttonStyles = `bg-brand-green border border-brand-green`;
          break;
        case EButtonComponentVariant.CategoryFilled:
          buttonStyles = `bg-brand-green border border-brand-green py-2.5 rounded-lg`;
          break;
        case EButtonComponentVariant.Outline:
          buttonStyles = `bg-brand-black border border-brand-white`;
          break;
        case EButtonComponentVariant.WhiteOutline:
          buttonStyles = `bg-brand-white border border-brand-green`;
          break;
        case EButtonComponentVariant.CategoryWhiteOutline:
          buttonStyles = `bg-brand-white border border-brand-green py-2.5 rounded-lg`;
          break;
      }
      break;
    case EButtonComponentState.Disabled:
      switch (variant) {
        default:
        case EButtonComponentVariant.Filled:
          buttonStyles = `bg-brand-green-disabled`;
          break;
        case EButtonComponentVariant.CategoryFilled:
          buttonStyles = `bg-brand-green-disabled py-2.5 rounded-lg`;
          break;
        case EButtonComponentVariant.Outline:
          buttonStyles = `bg-brand-black border border-brand-white`;
          break;
        case EButtonComponentVariant.WhiteOutline:
          buttonStyles = `bg-brand-white border border-brand-green`;
          break;
        case EButtonComponentVariant.CategoryWhiteOutline:
          buttonStyles = `bg-brand-white border border-brand-green py-2.5 rounded-lg`;
          break;
      }
      break;
  }

  switch (variant) {
    default:
    case EButtonComponentVariant.Filled:
      switch (state) {
        default:
          textStyles = `text-base text-brand-black`;
          break;
        case EButtonComponentState.Disabled:
          textStyles = `text-base text-brand-black opacity-60`;
          break;
      }
      break;
    case EButtonComponentVariant.CategoryFilled:
      textStyles = `text-sm text-brand-dark`;
      break;
    case EButtonComponentVariant.Outline:
      textStyles = `text-brand-white`;
      break;
    case EButtonComponentVariant.FilledWithDynamicLabelColor:
      switch (state) {
        default:
        case EButtonComponentState.Active:
          textStyles = `text-base text-brand-black`;
          break;
        case EButtonComponentState.Disabled:
          textStyles = `text-base text-brand-black-light`;
          break;
      }
      break;
    case EButtonComponentVariant.CategoryWhiteOutline:
      textStyles = `text-sm text-brand-dark`;
      break;
  }

  return (
    <button
      onClick={onClick}
      disabled={state === EButtonComponentState.Disabled}
      className={`w-full flex-shrink rounded-2xl items-center justify-center py-4 px-5 ${buttonStyles} ${cStyles}`}>
      {state === EButtonComponentState.Loading ? (
        <div>Loading</div>
      ) : (
        <div className={textStyles}>{label}</div>
      )}
    </button>
  );
};
