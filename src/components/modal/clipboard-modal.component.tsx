import { EButtonComponentVariant } from '../button/button.component';
import { CustomModal } from './modal.component';
import React from 'react';

export const ClipboardModal = ({
  isOpen,
  setIsOpen,
  goToSitePressHandler,
}: {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  goToSitePressHandler: () => void;
}) => {
  return (
    <CustomModal
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      title="Voucher is ready!"
      description="Code copied to clipboard"
      subDescription="Paste your code into the required field when needed."
      buttons={[
        {
          label: 'Go to site',
          variant: EButtonComponentVariant.Filled,
          onClick: goToSitePressHandler,
        },
        {
          label: 'Cancel',
          variant: EButtonComponentVariant.Outline,
          onClick: () => setIsOpen(false),
        },
      ]}
    />
  );
};
