export type loginBody = {
  email: string;
  password: string;
};

export type resType = {
  msg: "success" | "error";
  data?: {
    errorMessage?: string;
  };
};

const handleLoginRequest = async (loginBody: loginBody) => {
  try {
    const res = await signIn("credentials", {
      redirect: false,
      email: loginEmailValue,
      password: loginPasswordValue,
      redirectTo: callbackUrl,
    });
    setLoginProcessing(false);
    if (!res?.error) {
      router.push(callbackUrl);
    } else {
      setErrorMessage("Incorrect email or password.");
    }
  } catch (error: any) {
    setErrorMessage(error.message);
  } finally {
    setLoginProcessing(false);
  }
};
