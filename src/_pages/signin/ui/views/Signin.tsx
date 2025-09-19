"use client";

import { useSigninForm } from "@/_features/sigin/lib";
import { SignInUI } from "../components";

const SignIn = () => {
  /* Form state */
  const { form } = useSigninForm();

  return (
    <SignInUI
      form={form}
      onSubmit={(values) => alert(`Sign in form has been submitted with email: ${values.email} and password: ${values.password}`)}
    />
  );
};

export default SignIn;
