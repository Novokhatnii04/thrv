import React, { FC } from 'react';
import { IMyProfileType } from './profile.page';
import {
  EInputComponentVariant,
  InputComponent,
} from '@/components/input/input.component';

interface IProfileInputs {
  myProfileUser: IMyProfileType;
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  setFirstName: (firstName: string) => void;
  setSecondName: (secondName: string) => void;
  setDateOfBirth: (dob: Date | null) => void;
  formatDate: (date: Date) => string;
  validateEmail: any;
  validatePassword: any;
  user: any;
}

const ProfileInputs: FC<IProfileInputs> = ({
  myProfileUser,
  setEmail,
  setPassword,
  setFirstName,
  setSecondName,
  setDateOfBirth,
  formatDate,
  validateEmail,
  validatePassword,
  user,
}) => {
  const InputTitleComponent = ({ title }: { title: string }) => {
    return <h2 className="hidden w-[134px] mr-5 lp:block">{title}</h2>;
  };

  const InputEmailComponent = (
    <div className="flex justify-between items-center w-full">
      <InputTitleComponent title="Email" />
      <InputComponent
        value={myProfileUser?.email}
        setValue={setEmail}
        placeholder={user?.email}
        validator={validateEmail}
        type="email"
        variant={EInputComponentVariant.LightTheme}
      />
    </div>
  );

  const InputPasswordComponent = (
    <div className="flex justify-between items-center w-full">
      <InputTitleComponent title="Password" />
      <InputComponent
        value={myProfileUser?.password}
        setValue={setPassword}
        type="password"
        placeholder="*********"
        validator={validatePassword}
        variant={EInputComponentVariant.LightTheme}
      />
    </div>
  );

  const InputNameComponent = (
    <div className="flex justify-between items-center w-full">
      <InputTitleComponent title="Name" />
      <InputComponent
        value={myProfileUser?.firstName}
        setValue={setFirstName}
        placeholder={user?.first_name}
        variant={EInputComponentVariant.LightTheme}
      />
    </div>
  );

  const InputSurnameComponent = (
    <div className="flex justify-between items-center w-full">
      <InputTitleComponent title="Surname" />
      <InputComponent
        value={myProfileUser?.secondName}
        setValue={setSecondName}
        placeholder={user?.second_name}
        variant={EInputComponentVariant.LightTheme}
      />
    </div>
  );

  const InputDateOfBirthComponent = (
    <>
      {myProfileUser?.dob && (
        <div className="flex justify-between items-center w-full">
          <InputTitleComponent title="Date of birth" />
          <div
            className={`font-avenir border-brand-black-light text-brand-black opacity-80 h-[54px] border bg-transparent w-full rounded-2xl py-4 px-6 text-base`}>
            {formatDate(myProfileUser.dob)}
          </div>
        </div>
      )}
    </>
  );

  return (
    <>
      {/* Mobile */}
      <div className="grid gap-4 gap-x-14  mb-4 lp:hidden">
        {InputEmailComponent}
        {InputPasswordComponent}
        {InputNameComponent}
        {InputSurnameComponent}
        {InputDateOfBirthComponent}
      </div>

      {/* Desktop */}
      <div className="hidden lp:flex mb-10  gap-x-14">
        <div className="w-full flex flex-col  gap-4">
          <h3 className="font-bold capitalize text-xl mb-2.5">
            Basic information
          </h3>
          {InputNameComponent}
          {InputSurnameComponent}
          {InputDateOfBirthComponent}
        </div>
        <div className="w-full flex flex-col ml-8 gap-4">
          <h3 className="font-bold capitalize text-xl mb-2.5">
            Contact details
          </h3>
          {InputEmailComponent}
          {InputPasswordComponent}
        </div>
      </div>
    </>
  );
};

export default ProfileInputs;
