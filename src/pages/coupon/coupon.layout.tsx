import React, { FC, ReactNode } from 'react';
import { DOMAIN } from '@/config/api';
import { ICouponResponse } from '@/api/coupon/coupon.type';
import { CopyClipboardIcon } from '@/assets/icons/copy-clipboard.icon';
import { ECouponType } from '@/api/coupon/coupon.type';
import { usePreviousPath } from '@/store/previous-path.store';
import { useAuthStatus } from '@/hook/auth-status.hook';
import {
    ButtonComponent,
    EButtonComponentState,
    EButtonComponentVariant,
} from '@/components/button/button.component';
import moment from 'moment';

interface ICouponLayout {
    coupon: ICouponResponse;
    couponCode: { code: string } | null;
    copyClipboard: () => void;
    requestCodeHandler: (coupon: ICouponResponse) => void;
    buttonCodeState: EButtonComponentState;
    webRedirectHandler: (coupon: ICouponResponse) => void;
    couponUseLoading: boolean;
    useCodeHandler: () => void;
    browseProductsHandler: () => void;
}

const CouponLayout: FC<ICouponLayout> = ({
    coupon,
    couponCode,
    copyClipboard,
    requestCodeHandler,
    buttonCodeState,
    webRedirectHandler: goToWebsitePressHandlerWithPreview,
    couponUseLoading,
    useCodeHandler,
    browseProductsHandler,
}) => {
    const { previousPath } = usePreviousPath();
    const { isAuthenticated } = useAuthStatus();

    const ImageBrandRender = (cStyles: string = '') => {
        return <img
            src={DOMAIN + (coupon?.main_image ?? coupon?.brand.logo)}
            alt={coupon?.title}
            className={`aspect-video object-cover rounded-xl ${cStyles}`}
        />
    }

    const CouponCodeButtonsRender = (
        <>
            {!couponCode ? (
                coupon?.type !== ECouponType.Link ? (
                    <a
                        href={typeof window !== 'undefined' ? `${window.location?.href}?use=true&previousPath=${previousPath}` : '#'}
                        target="_blank"
                        className={`w-full ${!isAuthenticated ? 'pointer-events-none' : ''}`}
                        onClick={() => requestCodeHandler(coupon)}
                        rel="noopener noreferrer">
                        <ButtonComponent
                            variant={EButtonComponentVariant.Filled}
                            state={buttonCodeState}
                            label={'Request a code'}
                        />
                    </a>
                ) : (
                    <ButtonComponent
                        variant={EButtonComponentVariant.Filled}
                        state={buttonCodeState}
                        label={'Go to shop'}
                        onClick={() => goToWebsitePressHandlerWithPreview(coupon)}
                    />
                )
            ) : (
                <ButtonComponent
                    variant={EButtonComponentVariant.Filled}
                    state={
                        couponUseLoading
                            ? EButtonComponentState.Loading
                            : EButtonComponentState.Active
                    }
                    label={'Use code'}
                    onClick={useCodeHandler}
                />
            )}
        </>
    )


    const ExpiresRender = (
        <div className="text-xs text-brand-black w-full ">
            Expires: {moment(coupon?.end_date).format('MMM Do YYYY')}
        </div>
    )

    const CouponCodeRender = (
        <div className="flex items-center text-3xl font-bold text-brand-black">
            {couponCode?.code}
            {couponCode && (
                <div
                    className="ml-4 h-5 min-w-5 w-5 hover:opacity-80"
                    onClick={() => copyClipboard()}>
                    <CopyClipboardIcon />
                </div>
            )}
        </div>
    )

    return (
        <>
            {/* Mobile */}
            <div className="lp:hidden flex flex-col gap-4">
                <div className="p-2 rounded-2xl border border-[#6EEAD2] lp:hidden">
                    {ImageBrandRender('w-full')}

                    <div className="mt-5 p-2 pt-0">
                        {couponCode ? (
                            <div className="flex flex-col items-center">
                                <div className="mb-2 uppercase">Coupon code</div>
                                {CouponCodeRender}
                            </div>
                        ) : (
                            coupon?.description
                        )}
                    </div>
                </div>
                {CouponCodeButtonsRender}

                <ButtonComponent
                    variant={EButtonComponentVariant.WhiteOutline}
                    label={'Browse Products'}
                    onClick={browseProductsHandler}
                />

                {ExpiresRender}
            </div>

            {/* Desktop */}
            <div className="hidden lp:flex justify-between items-start p-8 min-h-[411px] w-full max-w-[1497px] rounded-2xl border border-[#6EEAD2]">
                <div className="flex flex-col w-[342px] items-start gap-6">
                    <span
                        className={`block text-xl text-nowrap text-center uppercase text-brand-dark font-bold lp:font-extrabold`}>
                        {coupon?.brand?.name}
                    </span>

                    <span className="font-normal text-lg">{coupon?.description}</span>

                    {couponCode && (
                        <div className="flex flex-col items-start">
                            <div className="flex flex-col">
                                <div className="mb-6 uppercase">Coupon code</div>
                                {CouponCodeRender}
                            </div>
                        </div>
                    )}

                    {ExpiresRender}

                    {CouponCodeButtonsRender}

                    <ButtonComponent
                        variant={EButtonComponentVariant.WhiteOutline}
                        label={'Browse Products'}
                        onClick={browseProductsHandler}
                    />
                </div>

                {ImageBrandRender('h-full w-[62%]')}
            </div>
        </>
    );
};

export default CouponLayout;
