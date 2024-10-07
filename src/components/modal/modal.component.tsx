'use client';
import React from 'react';
import Dialog from '@mui/material/Dialog';
import {
  ButtonComponent,
  EButtonComponentVariant,
} from '../button/button.component';

export type ConfirmModalProps = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  onConfirm: () => void;
};

export const CustomModal = ({
  isOpen,
  setIsOpen,
  title,
  description,
  subDescription,
  buttons,
}: {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  title: string;
  description: string;
  subDescription?: string;
  buttons?: {
    variant: EButtonComponentVariant;
    label: string;
    onClick: () => void;
  }[];
}) => {
  if (!isOpen) {
    return null;
  }

  return (
    <Dialog
      open={isOpen}
      onClose={() => setIsOpen(false)}
      aria-labelledby="parent-modal-title"
      aria-describedby="parent-modal-description"
      slotProps={{
        backdrop: {
          sx: {
            backdropFilter: 'blur(3px)',
          },
        },
      }}>
      <div className="bg-white rounded-lg sm:rounded-3xl">
        <div className="p-4 text-center w-64 sm:w-96">
          <div className="text-xl">{title}</div>
          <div className="text-xs mt-3 text-brand-placeholder sm:text-sm sm:mt-1">
            {description}
          </div>
          <div className="text-xs text-brand-placeholder">{subDescription}</div>
          <div className="flex flex-col mt-4 sm:max-w-48 sm:mx-auto sm:mb-4">
            {buttons?.map((button, index) => (
              <div
                className={index !== buttons.length - 1 ? 'mb-2' : ''}
                key={button.label}>
                <ButtonComponent
                  variant={button.variant}
                  label={button.label}
                  onClick={button.onClick}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </Dialog>
  );
};
