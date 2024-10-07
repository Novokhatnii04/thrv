'use client';
import React, { useMemo } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { CalendarIcon } from '@/assets/icons/CalendarIcon';
import { EInputComponentVariant } from '@/components/input/input.component';

interface InputComponentProps {
  value: Date | null;
  setValue?: (value: Date | null) => void;
  placeholder?: string;
  variant?: EInputComponentVariant;
  name: string;
  disable?: boolean;
}

export const DateInputComponent: React.FC<InputComponentProps> = ({
  value,
  setValue,
  variant = EInputComponentVariant.DarkTheme,
  placeholder,
  name,
  disable,
}) => {
  let borderColor = `border-brand-placeholder`;
  let textColor = `text-brand-white`;
  let placeholderTextColor: string | undefined = 'brand-placeholder';

  const calendarIcon = useMemo(
    () => (
      <div className="right-3 top-1/2 translate-y-[-50%]">
        <CalendarIcon />
      </div>
    ),
    [],
  );

  switch (variant) {
    case EInputComponentVariant.DarkTheme:
    default:
      placeholderTextColor = 'brand-placeholder';
      textColor = `text-brand-white`;
      borderColor = `border-brand-placeholder`;
      break;
    case EInputComponentVariant.LightTheme:
      placeholderTextColor = 'brand-black-light';
      textColor = `text-brand-black`;
      borderColor = `border-brand-black-light`;
      break;
  }

  return (
    <div>
      <DatePicker
        selected={value}
        onChange={date => {
          setValue && setValue(date);
        }}
        placeholderText={placeholder}
        dateFormat="MM/dd/yyyy"
        wrapperClassName="w-full"
        icon={calendarIcon}
        disabled={disable}
        fixedHeight
        showYearDropdown
        scrollableYearDropdown
        yearDropdownItemNumber={35}
        onKeyDown={event => event.preventDefault()}
        showIcon
        toggleCalendarOnIconClick
        className={`${borderColor} ${textColor} font-avenir h-[54px] border bg-transparent w-full rounded-2xl py-4 px-6 text-base`}
      />
    </div>
  );
};
