import {
  CircleArrowButtonComponent,
  ECircleArrowButtonComponentVariant,
} from '@/components/button/circle-arrow-button.component';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export const BackButtonComponent: React.FC = () => {
  const router = useRouter();
  const [previousPath, setPreviousPath] = useState<null | string>(null);

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    setPreviousPath(queryParams.get('previousPath'));
  }, []);

  const handleBack = () => {
    if (previousPath) {
      window.location.href = previousPath;
    }

    if (window.history.length > 1) {
      router.back();
    } else {
      router.push('/');
    }
  };

  return (
    <div className="flex items-center cursor-pointer" onClick={handleBack}>
      <CircleArrowButtonComponent
        variant={ECircleArrowButtonComponentVariant.Left}
      />
      <span className="ml-3 text-brand-dark text-sm sm:text-xl sm:font-medium">
        Back
      </span>
    </div>
  );
};
