'use client';
import {
  ButtonComponent,
  EButtonComponentState,
} from '@/components/button/button.component';
import {
  InputComponent,
  InputTitleComponent,
} from '@/components/input/input.component';
import { ISignUpUser } from '@/hook/auth.hook';
import { DateInputComponent } from '@/components/input/date-input.component';

const SignUpSecondStep = ({
  signUpUser,
  setSignUpUser,
  isValid,
  setIsValid,
  submitSignUp,
}: {
  signUpUser: ISignUpUser;
  setSignUpUser: (signUpUser: ISignUpUser) => void;
  isValid: boolean;
  setIsValid: (isValid: boolean) => void;
  submitSignUp: () => void;
}) => {
  const setFirstName = (first_name: string) => {
    setSignUpUser({ ...signUpUser, first_name });
  };

  const setSecondName = (second_name: string) => {
    setSignUpUser({ ...signUpUser, second_name });
  };

  const setPhone = (phone: string) => {
    setSignUpUser({ ...signUpUser, phone });
  };

  const setDateOfBirth = (e: Date | null) => {
    setSignUpUser({ ...signUpUser, date_of_birth: e });
    setIsValid(true);
  };

  return (
    <>
      <div className="mb-4">
        <InputTitleComponent>First name</InputTitleComponent>
        <InputComponent
          value={signUpUser?.first_name}
          setValue={setFirstName}
          placeholder="First name"
        />
      </div>
      <div className="mb-4">
        <InputTitleComponent>Last name</InputTitleComponent>
        <InputComponent
          value={signUpUser?.second_name}
          setValue={setSecondName}
          placeholder="Second name"
        />
      </div>
      {/* <InputComponent
        value={signUpUser.phone}
        setValue={setPhone}
        placeholder="Phone"
        name="phone"
        isPhone
      /> */}
      <div className="mb-4">
        <InputTitleComponent>Date of birth</InputTitleComponent>
        <DateInputComponent
          value={(signUpUser?.date_of_birth as Date) ?? null}
          setValue={setDateOfBirth}
          placeholder="mm/dd/yyyy"
          name="date_of_birth"
        />
      </div>
      <ButtonComponent
        cStyles="mt-[44px]"
        label="Sign up"
        state={
          isValid
            ? EButtonComponentState.Active
            : EButtonComponentState.Disabled
        }
        onClick={submitSignUp}
      />
    </>
  );
};

export default SignUpSecondStep;
