import React, { useState } from 'react';
import { CopyClipboardIcon } from '@/assets/icons/copy-clipboard.icon';
import { ECouponType, ICouponResponse } from '@/api/coupon/coupon.type';
import { ClipboardModal } from '@/components/modal/clipboard-modal.component';
import { BrandLogo } from '@/components/brand/brand-logo';
import { copyToClipboard } from '@/utils/copyToClipboard';
import { useRouter } from 'next/navigation';

type SmallCardComponentProps = {
  id: number;
  disable?: boolean;
  title: string;
  image: {
    url: string;
    alt: string;
  };
  historyCode?: string;
  coupon: ICouponResponse;
};

export const SmallCard: React.FC<SmallCardComponentProps> = ({
  id,
  disable = false,
  title,
  image,
  historyCode,
  coupon,
}) => {
  const router = useRouter();
  const [clipboardModalOpen, setClipboardModalOpen] = useState(false);

  const goToSitePressHandler = async () => {
    if (historyCode) {
      copyToClipboard(historyCode);
      return redirectToWebsite(coupon);
    }

    return Promise.resolve();
  };

  const redirectToWebsite = async (coupon: ICouponResponse): Promise<void> => {
    try {
      const canOpenUrl =
        coupon.shop_link && coupon.shop_link.startsWith('http');

      if (canOpenUrl) {
        window.location.href = coupon.shop_link;
        return Promise.resolve();
      }
      return Promise.reject('Invalid or unsupported URL');
    } catch (error) {
      return Promise.reject('An error occurred while trying to open the link');
    }
  };

  const onHistoryCodeCopyButtonPressHandler = async (
    event: React.MouseEvent,
  ) => {
    event.preventDefault();

    if (!historyCode || disable) {
      return;
    }

    copyToClipboard(historyCode);

    setClipboardModalOpen(true);
  };

  const handleClick = (event: React.MouseEvent<HTMLDivElement>): void => {
    const isBrandLogo = (event.target as HTMLElement).closest('.brand-logo');

    if (!isBrandLogo) {
      router.push(`/coupon/${coupon.id}`);
    }
  };

  return (
    <>
      <ClipboardModal
        isOpen={clipboardModalOpen}
        setIsOpen={setClipboardModalOpen}
        goToSitePressHandler={goToSitePressHandler}
      />
      <div
        onClick={handleClick}
        className={`${disable ? 'opacity-40 pointer-events-none' : ''} text-sm px-6 py-2.5 border border-brand-green rounded-2xl flex justify-between items-center w-full`}>
        {title}
        {historyCode && coupon.type !== ECouponType.Link && (
          <div className="flex flex-grow flex-shrink px-2.5 flex-row items-center">
            <span className="mr-2.5 text-sm text-brand-dark">
              {historyCode}
            </span>
            <div
              className="h-5 min-w-5 w-5 hover:opacity-80"
              onClick={onHistoryCodeCopyButtonPressHandler}>
              <CopyClipboardIcon />
            </div>
          </div>
        )}
        <BrandLogo brand={coupon.brand} />
      </div>
    </>
  );
};
