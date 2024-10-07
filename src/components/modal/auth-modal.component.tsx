import { useRouter } from 'next/navigation';
import { EButtonComponentVariant } from '../button/button.component';
import { CustomModal } from './modal.component';

export const AuthModal = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}) => {
  const navigate = useRouter();
  return (
    <CustomModal
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      title="Authorization is Required"
      description="To enjoy all the app's advantages, please sign up or log in."
      buttons={[
        {
          variant: EButtonComponentVariant.Filled,
          label: 'Sign Up',
          onClick: () => navigate.push('/sign-up'),
        },
        {
          variant: EButtonComponentVariant.Outline,
          label: 'Login',
          onClick: () => navigate.push('/login'),
        },
        {
          variant: EButtonComponentVariant.WhiteOutline,
          label: 'Close',
          onClick: () => setIsOpen(false),
        },
      ]}
    />
  );
};
