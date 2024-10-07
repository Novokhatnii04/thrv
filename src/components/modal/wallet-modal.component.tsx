import { EButtonComponentVariant } from '../button/button.component';
import { ConfirmModalProps, CustomModal } from './modal.component';
import React from 'react';

export const WalletModal = ({
  isOpen,
  setIsOpen,
  onConfirm,
}: ConfirmModalProps) => {
  return (
    <CustomModal
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      title="Withdraw money"
      description="Confirm if you want to withdraw money?"
      buttons={[
        {
          label: 'Cancel',
          onClick: () => setIsOpen(false),
          variant: EButtonComponentVariant.Outline,
        },
        {
          label: 'Withdraw',
          onClick: onConfirm,
          variant: EButtonComponentVariant.Filled,
        },
      ]}
    />
  );
};
