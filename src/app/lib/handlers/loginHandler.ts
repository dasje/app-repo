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
