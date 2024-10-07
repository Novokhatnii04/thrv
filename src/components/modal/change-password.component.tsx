import { EButtonComponentVariant } from '../button/button.component';
import { ConfirmModalProps, CustomModal } from './modal.component';
import React from 'react';

export const ChangePasswordModal = ({
  isOpen,
  setIsOpen,
  onConfirm,
}: ConfirmModalProps) => {
  return (
    <CustomModal
      title="Change Password"
      description="Are you sure that you want to change your password?"
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
