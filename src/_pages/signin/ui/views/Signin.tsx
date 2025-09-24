"use client";

import { useSigninForm } from "@features/sigin/lib/useSigninForm";
import { SignInUI } from "../components";

const SignIn = () => {
  /* Form state */
  const { form } = useSigninForm();

  const foo = 'baz';
  
  return (
    <SignInUI
      form={form}
      onSubmit={(values) => alert(`Sign in form has been submitted with email: ${values.email} and password: ${values.password}`)}
    />
  );
};

export default SignIn;
