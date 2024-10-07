import { EButtonComponentVariant } from '../button/button.component';
import { ConfirmModalProps, CustomModal } from './modal.component';
import React from 'react';

export const LogOutModal = ({
  isOpen,
  setIsOpen,
  onConfirm,
}: ConfirmModalProps) => {
  return (
    <CustomModal
      title="Log out"
      description="Are you sure that you want to log out?"
      buttons={[
        {
          variant: EButtonComponentVariant.Filled,
          label: 'Confirm',
          onClick: onConfirm,
        },
        {
          variant: EButtonComponentVariant.Outline,
          label: 'Cancel',
          onClick: () => setIsOpen(false),
        },
      ]}
      isOpen={isOpen}
      setIsOpen={() => setIsOpen(false)}
    />
  );
};
