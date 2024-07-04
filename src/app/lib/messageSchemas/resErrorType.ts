import { AppTable } from "@/app/database/types";

export type fetchAppsBody = {
  userEmail: string;
};

export type ResDataType<TReturnMessage, TReturnData> = {
  msg: TReturnMessage;
  data: { apps: TReturnData };
};

export type ResType = {
  message: ResDataType<string, AppTable[]>;
  status: number;
};

export type ResSuccessMessageType = {
  message: ResDataType<string, Promise<AppTable[]>>;
  status: number;
};

export type ResErrorMessageType = {
  message: ResDataType<string, string>;
  status: number;
};
