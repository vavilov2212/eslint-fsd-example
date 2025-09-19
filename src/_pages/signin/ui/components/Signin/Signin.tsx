"use client";

import { FC } from "react";
import { UseFormReturnType } from "@mantine/form";
import { ISigninFormValues } from "@features/sigin/lib";

interface ISigninProps {
  form: UseFormReturnType<ISigninFormValues>;
  onSubmit: (values: ISigninFormValues) => void;
}

const Signin: FC<ISigninProps> = ({ form, onSubmit }) => {
  
  const handleSubmit = form.onSubmit(onSubmit);

  return (
    <form target="#" onSubmit={handleSubmit} noValidate>
      <div>
        <input
          type="email"
          placeholder="Email"
          {...form.getInputProps("email")}
        />
        <p style={{display: form.getInputProps("email").error ? 'inherit' : 'none'}}>{form.getInputProps("email").error}</p>
      </div>
      <div>
        <input
          type="password"
          placeholder="Password"
          {...form.getInputProps("password")}
        />
        <p style={{display: form.getInputProps("password").error ? 'inherit' : 'none'}}>{form.getInputProps("password").error}</p>
      </div>
      <div>
        <input type="submit" value="Log in" formNoValidate />
      </div>
    </form>
  );
};

export default Signin;
