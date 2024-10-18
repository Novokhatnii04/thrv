'use client';
import { AppLayout } from '@/layout/app/app.layout';
import { useRouter } from 'next/navigation';
import { useNotification } from '@/hook/notification.hook';
import { useUser } from '@/hook/user.hook';
import { useMemo, useState } from 'react';
import {
  IUploadIdApiRequest,
  IUploadIdApiResponse,
} from '@/api/upload-id/upload-id.type';
import {
  CircleArrowButtonComponent,
  ECircleArrowButtonComponentVariant,
} from '@/components/button/circle-arrow-button.component';
import {
  ButtonComponent,
  EButtonComponentState,
  EButtonComponentVariant,
} from '@/components/button/button.component';
import { PassportIcon } from '@/assets/icons/passport.icon';
import { CheckmarkRoundedIcon } from '@/assets/icons/checkmark-rounded.icon';
import { ERequestName } from '@/api/api';
import { useApi } from '@/hook/api.hook';
import { EResponseStatus } from '@/api/api.type';
import { useDropzone } from 'react-dropzone';
import { useAnalytics } from '@/hook/analytics.hook';

enum EVerifyIdentityScreenState {
  Empty,
  ReadyToUpload,
  Uploading,
  Uploaded,
}

interface ExtendedFile extends File {
  preview?: string;
  path?: string;
}

const VerifyIdentity = () => {
  const router = useRouter();

  const { refetch: refetchNotifications } = useNotification();
  const { refetch: refetchUser } = useUser();
  const { logFirebaseEvent, logPixelEvent } = useAnalytics();

  const [image, setImage] = useState<ExtendedFile | undefined>();
  const { getRootProps, getInputProps } = useDropzone({
    maxFiles: 1,
    accept: {
      'image/jpg': [],
      'image/jpeg': [],
      'image/png': [],
    },
    onDrop: acceptedFiles => {
      const file = acceptedFiles[0];
      if (!file) {
        return;
      }

      const fileToObject = Object.assign(file, {
        preview: URL.createObjectURL(file),
      });

      setImage(fileToObject);
      setState(EVerifyIdentityScreenState.ReadyToUpload);
    },
  });

  const [state, setState] = useState<EVerifyIdentityScreenState>(
    EVerifyIdentityScreenState.Empty,
  );

  const uploadIdRequest: IUploadIdApiRequest | undefined = useMemo(() => {
    if (!image) {
      return { document: null };
    }

    return {
      document: new File([image], image.path ?? ''),
    };
  }, [image]);

  const { call: uploadIdApiCall } = useApi<
    IUploadIdApiRequest,
    IUploadIdApiResponse
  >(ERequestName.UploadId, uploadIdRequest, true);

  const onUploadButtonClickHandler = async () => {
    setState(EVerifyIdentityScreenState.Uploading);
    const {
      data: { response, error, status },
      code,
    } = await uploadIdApiCall();

    if (code === 200 && status === EResponseStatus.OK) {
      logFirebaseEvent('user_verification');
      logPixelEvent('user_verification');
      setState(EVerifyIdentityScreenState.Uploaded);
      await refetchNotifications();
      await refetchUser();
    } else {
      alert(response || error || 'Something went wrong');
      setState(EVerifyIdentityScreenState.ReadyToUpload);
    }
  };

  const goToTheHomePagePressHandler = () => {
    router.push('/');
  };

  const goBackPressHandler = () => {
    router.push('/profile');
  };

  const buttonState = useMemo(() => {
    if (image && state === EVerifyIdentityScreenState.ReadyToUpload) {
      return EButtonComponentState.Active;
    }

    if (state === EVerifyIdentityScreenState.Uploading) {
      return EButtonComponentState.Loading;
    }

    return EButtonComponentState.Disabled;
  }, [image, state]);

  const TitleComponent = ({ cStyles = '' }: { cStyles?: string }) => {
    return (
      <h3
        className={`text-brand-dark text-[20px] lp:text-2xl font-black ${cStyles}`}>
        Upload your ID
      </h3>
    );
  };

  const SubTitleComponent = ({ cStyles = '' }: { cStyles?: string }) => {
    return (
      <p
        className={`mt-3.5 mb-6 lp:mb-0 text-xs w-full text-left lp:text-lg lp:text-center text-brand-black ${cStyles}`}>
        Accepted forms of ID: Driving licence, National identity card, Passport,
        Residence permit.
        <br />
        (1 file is the maximum number of files you can drop here)
      </p>
    );
  };

  const ButtonUploadComponent = ({ cStyles = '' }: { cStyles?: string }) => {
    return (
      <div className={`max-w-full mx-auto ${cStyles}`}>
        <ButtonComponent
          state={buttonState}
          label="Upload"
          variant={EButtonComponentVariant.FilledWithDynamicLabelColor}
          onClick={onUploadButtonClickHandler}
        />
      </div>
    );
  };

  const NotificationTextComponent = ({
    cStyles = '',
  }: {
    cStyles?: string;
  }) => {
    return (
      <p
        className={`my-2.5 text-xs w-full lp:text-sm lp:text-center text-brand-black opacity-60 ${cStyles}`}>
        The document will be deleted following its use for verification.
      </p>
    );
  };

  return (
    <AppLayout>
      <div className="items-center px-6 h-full">
        {state !== EVerifyIdentityScreenState.Uploaded && (
          <>
            <div className="flex justify-center items-center relative">
              <div
                className="flex items-center gap-2 absolute cursor-pointer left-0 lp:relative lp:mr-auto"
                onClick={goBackPressHandler}>
                <CircleArrowButtonComponent
                  variant={ECircleArrowButtonComponentVariant.Left}
                />
                <h3 className="font-normal text-brand-black text-base">Back</h3>
              </div>
              <TitleComponent cStyles="lp:hidden" />
            </div>
            <SubTitleComponent cStyles="lp:hidden" />
            <input {...getInputProps()} />
            <div>
              <div className="w-full opacity-100 hover:opacity-80 active:opacity-80 ease-linear transition-opacity flex cursor-pointer aspect-square border border-brand-green rounded-2xl items-center justify-center mb-2.5 lp:mt-6 lp:max-h-cxxl">
                <div
                  className={`h-full w-full relative flex items-center lp:flex-col justify-center lp:justify-between lp:py-10`}>
                  <div className="flex-col items-center hidden lp:flex">
                    <TitleComponent />
                    <SubTitleComponent />
                  </div>
                  <div {...getRootProps({ className: 'dropzone' })}>
                    {image && (
                      <img
                        className="w-full h-full lp:w-96 lp:h-56 z-20 object-contain rounded-2xl"
                        onError={() => {
                          setState(EVerifyIdentityScreenState.Empty);
                        }}
                        src={image?.preview}
                        alt="document"
                      />
                    )}
                    {state === EVerifyIdentityScreenState.Empty && (
                      <div className="opacity-10 w-[40vw] m-auto lp:max-w-48">
                        <PassportIcon />
                      </div>
                    )}
                  </div>
                  <div className="hidden lp:flex flex-col w-96">
                    <NotificationTextComponent />
                    <ButtonUploadComponent cStyles="w-full" />
                  </div>
                </div>
              </div>
            </div>
            <ButtonUploadComponent cStyles="lp:hidden" />
            <NotificationTextComponent cStyles="lp:hidden" />
          </>
        )}
        {state === EVerifyIdentityScreenState.Uploaded && (
          <div className="flex flex-col items-center justify-center h-full mt-20 lp:mt-0 lp:border-2 rounded-3xl lp:max-h-[457px] lp:border-brand-gray600">
            <CheckmarkRoundedIcon width={'144'} height={'144'} />
            <div className="w-2/3 items-center">
              <p className="text-brand-dark text-xl font-black mt-7 text-center">
                Upload Successful
              </p>
            </div>
            <h3 className="text-lg text-center leading-6 mt-4">
              Verification takes 3-5 business days. We will inform you about the
              result
            </h3>
            <div className="mt-8 w-full lp:w-[360px]">
              <ButtonComponent
                label="Go to the home page"
                onClick={goToTheHomePagePressHandler}
              />
            </div>
          </div>
        )}
      </div>
    </AppLayout>
  );
};

export default VerifyIdentity;
