"use server";

export type signupBody = {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
};

export type resType = {
  msg: "success" | "error";
  data?: {
    errorMessage?: string;
  };
};

export const signupHandler = async (signupBody: signupBody) => {
  console.log("Handling signup request");
  try {
    const res = await fetch(process.env.NEXT_PUBLIC_URL + "/api/register", {
      method: "POST",
      body: JSON.stringify(signupBody),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      const errorData = await res.json();
      console.log("ERROR DATA ", errorData);

      if (Array.isArray(errorData.errors) && errorData.errors.length > 0) {
        errorData.errors.forEach((error: any) => {
          console.log(error.message);
        });

        return;
      }
      return { msg: "error", data: { errorMessage: errorData.message } };
    }
    return { msg: "success" };
  } catch (error: any) {
    return { msg: "error", data: { errorMessage: error.message } };
  }
};
