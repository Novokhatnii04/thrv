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

  return (
    <AppLayout>
      <div className="items-center px-6 h-full">
        {state !== EVerifyIdentityScreenState.Uploaded && (
          <>
            <div className="flex justify-between items-center">
              <CircleArrowButtonComponent
                onClick={goBackPressHandler}
                variant={ECircleArrowButtonComponentVariant.Left}
              />
              <h3 className="mt-3 text-brand-dark text-[20px] font-black">
                Upload your ID
              </h3>
              <span className="w-4 mt-3" />
            </div>
            <p className="mt-3.5 mb-6 text-xs w-full text-left text-brand-black">
              Accepted forms of ID: Driving licence, National identity card,
              Passport, Residence permit.
              <br />
              (1 file is the maximum number of files you can drop here)
            </p>
            <div {...getRootProps({ className: 'dropzone' })}>
              <input {...getInputProps()} />
              <div className="w-full opacity-100 hover:opacity-80 active:opacity-80 ease-linear transition-opacity flex cursor-pointer aspect-square border border-brand-green rounded-2xl items-center justify-center mb-2.5">
                {state !== EVerifyIdentityScreenState.Empty && (
                  <div className="h-full w-full relative">
                    {image && (
                      <img
                        className="w-full h-full z-20 object-contain rounded-2xl"
                        onError={() => {
                          setState(EVerifyIdentityScreenState.Empty);
                        }}
                        src={image?.preview}
                        alt="document"
                      />
                    )}
                  </div>
                )}
                {state === EVerifyIdentityScreenState.Empty && (
                  <div className="opacity-10 max-w-16">
                    <PassportIcon />
                  </div>
                )}
              </div>
            </div>
            <ButtonComponent
              state={buttonState}
              label="Upload"
              variant={EButtonComponentVariant.FilledWithDynamicLabelColor}
              onClick={onUploadButtonClickHandler}
            />
            <p className="my-2.5 text-xs w-full text-brand-black opacity-60">
              The document will be deleted following its use for verification.
            </p>
          </>
        )}
        {state === EVerifyIdentityScreenState.Uploaded && (
          <div className="flex flex-col items-center justify-center h-full mt-20">
            <CheckmarkRoundedIcon />
            <div className="w-2/3 items-center">
              <p className="text-brand-dark text-xl font-black mt-7 text-center">
                Upload Successful
              </p>
            </div>
            <div className="mt-8 w-full">
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
