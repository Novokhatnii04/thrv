'use client';
import React, { type HTMLInputTypeAttribute, useEffect, useState } from 'react';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';

export enum EInputComponentVariant {
  DarkTheme,
  LightTheme,
}

export enum EInputComponentState {
  Empty,
  Filled,
  Error,
}

interface InputComponentProps {
  value: string;
  setValue?: (value: string) => void;
  placeholder?: string;
  validator?: (value: string) => boolean;
  variant?: EInputComponentVariant;
  hidden?: boolean;
  type?: HTMLInputTypeAttribute;
}

export const InputTitleComponent = ({
  children,
  cStyles = '',
}: {
  children: React.ReactNode;
  cStyles?: string;
}) => {
  return (
    <span
      className={`hidden lp:block mb-4 text-base text-white leading-5 ${cStyles}`}>
      {children}
    </span>
  );
};

export const InputComponent: React.FC<InputComponentProps> = ({
  value,
  setValue,
  validator,
  variant = EInputComponentVariant.DarkTheme,
  hidden = false,
  type = 'text',
  placeholder,
  ...props
}) => {
  let borderColor = `border-brand-placeholder`;
  let textColor = `text-brand-white`;
  let placeholderTextColor: string | undefined = 'brand-placeholder';

  const [state, setState] = useState<EInputComponentState>(
    EInputComponentState.Empty,
  );

  const resetState = () => {
    if (value?.length > 0) {
      if (validator) {
        if (validator(value)) {
          setState(EInputComponentState.Filled);
        } else {
          setState(EInputComponentState.Error);
        }
      }
    } else {
      setState(EInputComponentState.Empty);
    }
  };

  useEffect(() => {
    resetState();
  }, [value]);

  switch (variant) {
    case EInputComponentVariant.DarkTheme:
    default:
      placeholderTextColor = 'brand-placeholder';
      textColor = `text-brand-white`;
      break;
    case EInputComponentVariant.LightTheme:
      placeholderTextColor = 'brand-black-light';
      textColor = `text-brand-black`;
      break;
  }

  switch (state) {
    default:
    case EInputComponentState.Empty:
      switch (variant) {
        case EInputComponentVariant.DarkTheme:
        default:
          borderColor = `border-brand-placeholder`;
          break;
        case EInputComponentVariant.LightTheme:
          borderColor = `border-brand-black-light`;
          break;
      }
      break;
    case EInputComponentState.Error:
      borderColor = `border-warning-red`;
      break;
    case EInputComponentState.Filled:
      switch (variant) {
        case EInputComponentVariant.DarkTheme:
        default:
          borderColor = `border-brand-white`;
          break;
        case EInputComponentVariant.LightTheme:
          borderColor = `border-brand-black`;
          break;
      }
      break;
  }

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (setValue) {
      setValue(e.target.value);
    }
  };

  if (type === 'tel') {
    return (
      <PhoneInput
        placeholder="Enter phone number"
        value={value}
        onChange={value => console.log(value)}
      />
    );
  }

  return (
    <input
      className={`${borderColor} ${textColor} font-avenir border bg-transparent w-full rounded-2xl py-4 px-6 text-base sm:rounded-xl`}
      onChange={onChange}
      value={value}
      type={type}
      placeholder={placeholder}
      {...props}
    />
  );
};
