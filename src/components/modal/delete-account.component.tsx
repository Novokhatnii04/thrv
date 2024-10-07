import { EButtonComponentVariant } from '../button/button.component';
import { ConfirmModalProps, CustomModal } from './modal.component';
import React from 'react';

export const DeleteAccountModal = ({
  isOpen,
  setIsOpen,
  onConfirm,
}: ConfirmModalProps) => {
  return (
    <CustomModal
      title="Delete account?"
      description="Are you sure that you want to delete account?"
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
