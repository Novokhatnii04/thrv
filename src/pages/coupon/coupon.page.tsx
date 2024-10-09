'use client';
import { ERequestName } from '@/api/api';
import { EResponseStatus } from '@/api/api.type';
import {
  ICouponCodeApiRequest,
  ICouponCodeApiResponse,
} from '@/api/coupon-code/coupon-code.type';
import {
  ICouponUseApiRequest,
  ICouponUseApiResponse,
} from '@/api/coupon-use/coupon-use.type';
import {
  ECouponState,
  ICouponApiResponse,
  ICouponRequest,
  ICouponResponse,
} from '@/api/coupon/coupon.type';
import { EButtonComponentState } from '@/components/button/button.component';
import { AuthModal } from '@/components/modal/auth-modal.component';
import { useApi } from '@/hook/api.hook';
import { useAuthStatus } from '@/hook/auth-status.hook';
import { AppLayout } from '@/layout/app/app.layout';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Loading } from '@/components/loding/loading.component';
import { useAnalytics } from '@/hook/analytics.hook';
import { BackButtonComponent } from '@/components/back-button/back-button.component';
import { useSearchParams } from 'next/navigation';
import { useUser } from '@/hook/user.hook';
import { EUserStatus } from '@/api/register/register.type';
import { copyToClipboard } from '@/utils/copyToClipboard';
import { ClipboardModal } from '@/components/modal/clipboard-modal.component';
import {
  ICouponNotUsedApiRequest,
  ICouponNotUsedApiResponse,
} from '@/api/coupon-not-used/coupon-not-used.type';
import CouponLayout from './coupon.layout';
import { EResolutionType } from '@/components/navigation/navigation-link.component';

const CouponPage = ({ params }: { params: { id: string } }) => {
  const searchParams = useSearchParams();
  const { user } = useUser();
  const { logFirebaseEvent, logPixelEvent } = useAnalytics();

  const { isAuthenticated } = useAuthStatus();
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isCopyClipboardModalOpen, setIsCopyClipboardModalOpen] =
    useState(false);

  const [couponState, setCouponState] = useState<ECouponState>(
    user?.status === EUserStatus.WaitingVerify ||
      user?.status === EUserStatus.Verified
      ? ECouponState.NotUsed
      : ECouponState.Blocked,
  );

  useEffect(() => {
    setCouponState(
      user?.status === EUserStatus.WaitingVerify ||
        user?.status === EUserStatus.Verified
        ? ECouponState.NotUsed
        : ECouponState.Blocked,
    );
  }, [user?.status]);

  const [couponCode, setCouponCode] = useState<{ code: string } | null>(null);

  const couponRequestParams = useMemo<ICouponRequest>(() => {
    return {
      couponId: Number(params?.id),
    };
  }, [params?.id]);

  const { data: couponResponseData, loading: couponLoading } = useApi<
    ICouponRequest,
    ICouponApiResponse
  >(ERequestName.Coupon, couponRequestParams);

  const coupon = useMemo<ICouponResponse | undefined>(() => {
    return couponResponseData?.response;
  }, [couponResponseData]);

  useEffect(() => {
    if (!coupon) {
      return;
    }

    logFirebaseEvent('coupon_view', {
      coupon_id: coupon.id,
      coupon_title: coupon.title,
      brand_name: coupon.brand.name,
    });
  }, [coupon, logFirebaseEvent]);

  const couponRequest = useMemo<ICouponCodeApiRequest>(() => {
    return { couponId: Number(params?.id) };
  }, [params?.id]);

  const {
    call: couponNotUsedCall,
    data: couponNotUsedData,
    loading: couponNotUsedLoading,
  } = useApi<ICouponNotUsedApiRequest, ICouponNotUsedApiResponse>(
    ERequestName.CouponNotUsed,
    couponRequest,
    couponState === ECouponState.Blocked,
  );

  const { call: callCouponCodeRequest, loading: couponCodeLoading } = useApi<
    ICouponCodeApiRequest,
    ICouponCodeApiResponse
  >(ERequestName.CouponCode, couponRequest, true);

  const { call: callCouponUseRequest, loading: couponUseLoading } = useApi<
    ICouponUseApiRequest,
    ICouponUseApiResponse
  >(ERequestName.CouponUse, couponRequest, true);

  const getCouponCode = useCallback(async () => {
    const {
      data: { response, status, error },
      code,
    } = await callCouponCodeRequest();

    if (code === 200 && response && status === EResponseStatus.OK) {
      return Promise.resolve({ code: response });
    }
    return Promise.reject(response || error || 'Something went wrong');
  }, [callCouponCodeRequest]);

  const logCoupon = (coupon: ICouponResponse) => {
    const analyticsPayload = {
      coupon_id: coupon.id,
      coupon_title: coupon.title,
      brand_name: coupon.brand.name,
    };
    logFirebaseEvent('coupon_request', analyticsPayload);
    logPixelEvent('coupon_request', analyticsPayload);
  };

  const requestCodeHandler = async (coupon: ICouponResponse) => {
    if (!isAuthenticated) {
      setIsOpenModal(true);
      return;
    }

    await couponNotUsedCall();
    logCoupon(coupon);

    window.open(coupon.shop_link, '_self');
  };

  const goToWebsitePressHandlerWithPreview = async (
    coupon: ICouponResponse,
  ) => {
    if (!isAuthenticated) {
      setIsOpenModal(true);
    }

    logCoupon(coupon);
    window.location.href = coupon.shop_link;
  };

  const browseProductsHandler = () => {
    if (!coupon) {
      return;
    }

    const eventName = 'coupon_browse_products';
    const params = {
      coupon_id: coupon.id,
      coupon_title: coupon.title,
      brand_name: coupon.brand.name,
    };

    logFirebaseEvent(eventName, params);
    logPixelEvent(eventName, params);

    window.open(coupon.brand.brand_url, '_blank');
  };

  const buttonCodeState = useMemo(() => {
    if (!isAuthenticated) {
      return EButtonComponentState.Active;
    }
    if (couponState === ECouponState.Blocked) {
      return EButtonComponentState.Disabled;
    }
    return couponCodeLoading || couponNotUsedLoading
      ? EButtonComponentState.Loading
      : EButtonComponentState.Active;
  }, [isAuthenticated, couponState, couponCodeLoading, couponNotUsedLoading]);

  useEffect(() => {
    if (
      couponNotUsedData?.response === true &&
      !couponNotUsedData.error &&
      couponNotUsedData.status === EResponseStatus.OK
    ) {
      getCouponCode()
        .then(({ code }) => {
          setCouponCode({ code });
          setCouponState(prevState =>
            prevState === ECouponState.Blocked
              ? ECouponState.Blocked
              : ECouponState.ReadyForUse,
          );
        })
        .catch((error: string) => {
          alert(error);
        });
    } else {
      setCouponState(prevState =>
        prevState === ECouponState.Blocked
          ? ECouponState.Blocked
          : ECouponState.NotUsed,
      );
    }
  }, [couponNotUsedData, getCouponCode]);

  useEffect(() => {
    if (searchParams?.has('use')) {
      getCouponCode().then(data => setCouponCode(data));
    }
  }, [getCouponCode, searchParams]);

  const copyClipboard = (openModal?: boolean) => {
    if (couponCode) {
      copyToClipboard(couponCode.code);
      setIsCopyClipboardModalOpen(openModal ?? true);
    }
  };

  const useCodeHandler = async () => {
    const {
      data: { response, status, error },
      code: codeRes,
    } = await callCouponUseRequest();

    copyClipboard(false);

    if (status === EResponseStatus.OK && codeRes === 200 && !error && coupon) {
      logFirebaseEvent('coupon_use', {
        coupon_id: coupon?.id,
        coupon_title: coupon?.title,
        brand_name: coupon?.brand.name,
      });

      window.location.href = coupon.shop_link;
    } else {
      alert(response || error || 'Something went wrong');
    }
  };

  if (!coupon || couponLoading) {
    return (
      <AppLayout>
        <Loading />
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <AuthModal isOpen={isOpenModal} setIsOpen={setIsOpenModal} />
      <ClipboardModal
        isOpen={isCopyClipboardModalOpen}
        setIsOpen={setIsCopyClipboardModalOpen}
        goToSitePressHandler={() => (window.location.href = coupon.shop_link)}
      />
      <div className="grid gap-4 px-6 lp:gap-8 sm:mx-auto sm:max-w-[576px] lp:pr-12">
        <div className="grid-cols-3 grid">
          <BackButtonComponent />
          <span
            className={`block text-xl text-nowrap text-center uppercase text-brand-dark font-bold lp:hidden`}>
            {coupon?.brand?.name}
          </span>
        </div>

        <CouponLayout
          coupon={coupon}
          couponCode={couponCode}
          copyClipboard={copyClipboard}
          requestCodeHandler={requestCodeHandler}
          buttonCodeState={buttonCodeState}
          webRedirectHandler={goToWebsitePressHandlerWithPreview}
          couponUseLoading={couponUseLoading}
          useCodeHandler={useCodeHandler}
          browseProductsHandler={browseProductsHandler}
        />
      </div>
    </AppLayout>
  );
};

export default CouponPage;
