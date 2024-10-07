'use client';
import { AppLayout } from '@/layout/app/app.layout';
import {
  EInputComponentVariant,
  InputComponent,
} from '@/components/input/input.component';
import {
  ButtonComponent,
  EButtonComponentState,
  EButtonComponentVariant,
} from '@/components/button/button.component';
import { useEffect, useMemo, useState } from 'react';
import { useUser } from '@/hook/user.hook';
import {
  IEditUserApiRequest,
  IEditUserApiResponse,
} from '@/api/edit-user/edit-user.type';
import { useApi } from '@/hook/api.hook';
import { ERequestName } from '@/api/api';
import { ILogoutApiResponse } from '@/api/logout/logout.type';
import { EResponseStatus, IRequest, IResponse } from '@/api/api.type';
import { useAuth } from '@/hook/auth.hook';
import { useValidate } from '@/hook/validate.hook';
import { ChangePasswordModal } from '@/components/modal/change-password.component';
import { LogOutModal } from '@/components/modal/log-out.component';
import { EUserStatus } from '@/api/register/register.type';
import { WarningIcon } from '@/assets/icons/warning.icon';
import { useRouter } from 'next/navigation';
import { CheckmarkSmallIcon } from '@/assets/icons/checkmark-small.icon';
import { ErrorIcon } from '@/assets/icons/error.icon';
import { DeleteAccountModal } from '@/components/modal/delete-account.component';
import { toggleCookieInfoSidebar } from '@/utils/toggleCookieInfoSidebar';

export type IMyProfileType = {
  email: string;
  password: string;
  firstName: string;
  secondName: string;
  dob: Date | null;
  phone: string;
  referral_code: string;
  referral_number: number;
};

function parseDateString(dateString: string) {
  return new Date(dateString.split(' ')[0]);
}

const ProfilePage = () => {
  const { logout } = useAuth();
  const { user, refetch } = useUser();
  const { validateEmail, validatePassword } = useValidate();

  const router = useRouter();

  const [isValid, setIsValid] = useState<boolean>(false);
  const [passwordModalOpen, setPasswordModalOpen] = useState<boolean>(false);
  const [logoutModalOpen, setLogoutModalOpen] = useState<boolean>(false);
  const [deleteAccountModalOpen, setDeleteAccountModalOpen] =
    useState<boolean>(false);

  const [myProfileUser, setMyProfileUser] = useState<IMyProfileType>({
    email: '',
    password: '',
    firstName: '',
    secondName: '',
    dob: null,
    phone: '',
    referral_code: '',
    referral_number: 0,
  });

  useEffect(() => {
    if (user) {
      setMyProfileUser({
        ...user,
        firstName: user.first_name,
        secondName: user.second_name,
        password: '',
        dob: parseDateString(user.date_of_birth.toString()),
        phone: user.phone || '',
        referral_code: user.referral_code || '',
        referral_number: user.referral_number || 0,
      });
    }
  }, [user]);

  useEffect(() => {
    setIsValid(() => {
      const isEmailChanged = myProfileUser.email !== user?.email;
      const isEmailValid =
        !!myProfileUser.email.length && validateEmail(myProfileUser.email);

      const isPasswordValid =
        validatePassword(myProfileUser.password) ||
        myProfileUser.password.length === 0;

      return isPasswordValid && (isEmailChanged ? isEmailValid : true);
    });
  }, [myProfileUser]);

  const editUserRequest = useMemo<IEditUserApiRequest>(() => {
    return {
      first_name: myProfileUser.firstName || user?.first_name || '',
      second_name: myProfileUser.secondName || user?.second_name || '',
      password: myProfileUser.password,
      email: myProfileUser.email,
      phone: user?.phone ?? '',
      referral_code: '',
    };
  }, [myProfileUser]);

  const { call: editUserApiCall, loading: editUserLoading } = useApi<
    IEditUserApiRequest,
    IEditUserApiResponse
  >(ERequestName.EditUser, editUserRequest, true);

  const { call: deleteUserApiCall, loading: deleteUserLoading } = useApi<
    IRequest,
    IResponse
  >(ERequestName.DeleteUser, false, true);

  const { call: logOutCall } = useApi<object, ILogoutApiResponse>(
    ERequestName.LogOut,
    {},
    true,
  );

  const saveChangesButtonVariant = useMemo(() => {
    if (editUserLoading) {
      return EButtonComponentState.Loading;
    }

    return isValid
      ? EButtonComponentState.Active
      : EButtonComponentState.Disabled;
  }, [editUserLoading, isValid]);

  const logOutPressHandler = async () => {
    const {
      code,
      data: { status, response, error },
    } = await logOutCall();

    if (code === 200 && status === EResponseStatus.OK) {
      await logout();
    } else {
      console.error(response || error || 'Something went wrong');
    }
  };

  const setEmail = (email: string) => {
    setMyProfileUser(prevState => {
      return { ...prevState, email };
    });
  };

  const setPassword = (password: string) => {
    setMyProfileUser(prevState => {
      return { ...prevState, password };
    });
  };

  const setFirstName = (firstName: string) => {
    setMyProfileUser(prevState => {
      return { ...prevState, firstName };
    });
  };

  const setSecondName = (secondName: string) => {
    setMyProfileUser(prevState => {
      return { ...prevState, secondName };
    });
  };

  const setDateOfBirth = () => {
    // Not possible
  };

  const onSubmit = async () => {
    const {
      data: { status, response, error },
      code,
    } = await editUserApiCall();

    if (code === 200 && status === EResponseStatus.OK) {
      try {
        await refetch();
      } catch (refetchError) {
        console.error('Something went wrong');
      }
    } else {
      console.error(error || 'Something went wrong');
    }
  };

  const handleSaveChanges = async () => {
    if (
      myProfileUser.password.length > 0 &&
      validatePassword(myProfileUser.password)
    ) {
      setPasswordModalOpen(true);
      return;
    }
    await onSubmit();
  };

  const handleConfirmSavePassword = async () => {
    setPasswordModalOpen(false);
    await onSubmit();
  };

  const deleteUser = async () => {
    try {
      const { data, code } = await deleteUserApiCall();

      if (data.status === EResponseStatus.OK && code === 200) {
        await logout();
      } else {
        alert('Something went wrong');
      }
    } catch (error) {
      alert('Something went wrong');
    }
  };

  const deleteButtonHandler = () => {
    setDeleteAccountModalOpen(true);
  };

  function formatDate(date: Date) {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');

    return `${month}/${day}/${year}`;
  }

  return (
    <AppLayout>
      <div className="px-6">
        <h3 className="font-bold capitalize text-xl mb-2.5">My Profile</h3>
        <div className="flex flex-col items-center sm:mt-10">
          <div className="grid gap-4 mb-2.5 w-full sm:max-w-96">
            <InputComponent
              value={myProfileUser.email}
              setValue={setEmail}
              placeholder={user?.email}
              validator={validateEmail}
              type="email"
              variant={EInputComponentVariant.LightTheme}
            />
            <InputComponent
              value={myProfileUser.password}
              setValue={setPassword}
              type="password"
              placeholder="*********"
              validator={validatePassword}
              variant={EInputComponentVariant.LightTheme}
            />
            <InputComponent
              value={myProfileUser.firstName}
              setValue={setFirstName}
              placeholder={user?.first_name}
              variant={EInputComponentVariant.LightTheme}
            />
            <InputComponent
              value={myProfileUser.secondName}
              setValue={setSecondName}
              placeholder={user?.second_name}
              variant={EInputComponentVariant.LightTheme}
            />

            {myProfileUser.dob && (
              <div
                className={`font-avenir border-brand-black-light text-brand-black opacity-80 h-[54px] border bg-transparent w-full rounded-2xl py-4 px-6 text-base`}>
                {formatDate(myProfileUser.dob)}
              </div>
            )}
            {user?.status === EUserStatus.New && (
              <div
                className="w-full py-4 px-6 border-warning-yellow border rounded-lg bg-warning-yellow bg-opacity-10 flex flex-row items-center"
                onClick={() => router.push('/verify-identity')}>
                <div className="min-w-10 w-10 h-10 mr-6">
                  <WarningIcon />
                </div>
                <p className="text-sm flex-shrink">
                  The app can be used by users up to 30 years old only. Click
                  here to upload your ID.
                </p>
              </div>
            )}
            {user?.status === EUserStatus.Verified && (
              <div className="w-full py-4 px-6 border-brand-green border rounded-lg bg-brand-green bg-opacity-10 flex flex-row items-center">
                <div className="min-w-6 w-6 h-6 mr-2">
                  <CheckmarkSmallIcon />
                </div>
                <p className="text-sm text-brand-green flex-shrink">
                  Age of user is verified
                </p>
              </div>
            )}
            {user?.status === EUserStatus.Unverified && (
              <div className="w-full py-4 px-6 border-warning-red border rounded-lg bg-warning-red bg-opacity-10 flex flex-row items-center flex-shrink">
                <div className="min-w-10 w-10 h-10 mr-6">
                  <ErrorIcon />
                </div>
                <p className="text-sm flex-shrink">
                  Apologies, you did not pass verification. The app can be used
                  by users up to 30 years old only.
                </p>
              </div>
            )}
            {user?.status === EUserStatus.NeedDocument && (
              <div
                className="w-full py-4 px-6 border-warning-red border rounded-lg bg-warning-red bg-opacity-10 flex flex-row items-center flex-shrink"
                onClick={() => router.push('/verify-identity')}>
                <div className="min-w-10 w-10 h-10 mr-6">
                  <ErrorIcon />
                </div>
                <p className="text-sm flex-shrink">
                  The verification period has expired. To continue using the
                  app, click here to upload your ID
                </p>
              </div>
            )}
            {user?.status === EUserStatus.RejectedByAge && (
              <div className="w-full py-4 px-6 border-warning-red border rounded-lg bg-warning-red bg-opacity-10 flex flex-row items-center flex-shrink">
                <div className="min-w-10 w-10 h-10 mr-6">
                  <ErrorIcon />
                </div>
                <p className="text-sm flex-shrink">
                  Apologies, you did not pass verification. The app can be used
                  by users up to 30 years old only.
                </p>
              </div>
            )}
            <ButtonComponent
              label="Save changes"
              state={saveChangesButtonVariant}
              onClick={handleSaveChanges}
            />
            <ButtonComponent
              variant={EButtonComponentVariant.CategoryWhiteOutline}
              onClick={toggleCookieInfoSidebar}
              label="Show cookie settings"
            />
            <ButtonComponent
              variant={EButtonComponentVariant.CategoryWhiteOutline}
              state={
                deleteUserLoading
                  ? EButtonComponentState.Loading
                  : EButtonComponentState.Active
              }
              onClick={() => setLogoutModalOpen(true)}
              label="Log out"
            />
          </div>
          <span className="text-center text-xs">
            <span
              onClick={deleteButtonHandler}
              className="text-[#96E9D4] cursor-pointer">
              Delete
            </span>{' '}
            the account
          </span>
        </div>
      </div>
      <ChangePasswordModal
        isOpen={passwordModalOpen}
        setIsOpen={setPasswordModalOpen}
        onConfirm={handleConfirmSavePassword}
      />
      <LogOutModal
        isOpen={logoutModalOpen}
        setIsOpen={setLogoutModalOpen}
        onConfirm={logOutPressHandler}
      />
      <DeleteAccountModal
        isOpen={deleteAccountModalOpen}
        setIsOpen={setDeleteAccountModalOpen}
        onConfirm={deleteUser}
      />
    </AppLayout>
  );
};

export default ProfilePage;
