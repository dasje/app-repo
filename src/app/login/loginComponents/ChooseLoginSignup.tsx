"use client";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { Button, Divider } from "@nextui-org/react";
import Link from "next/link";
import Login from "./Login";
import Signup from "./Signup";

interface ChooseLoginSignupInterface {
  textToDisplay?: string;
  pressLoginHandler?: () => void;
  pressSignupHandler?: () => void;
  loginText?: string;
  signupText?: string;
  successRedirectUrl?: string;
}

const ChooseLoginSignup = ({
  pressLoginHandler,
  pressSignupHandler,
  loginText,
  signupText,
  successRedirectUrl,
  textToDisplay,
}: ChooseLoginSignupInterface) => {
  return (
    <Card className="md:w-[400px]">
      <CardHeader className="flex gap-3">
        {" "}
        <div className="flex flex-col">
          <p className="text-lg font-bold">Log in</p>
        </div>
      </CardHeader>
      <Divider />
      <CardBody className="gap-4 ">
        <p className="text-sm font-medium">
          {textToDisplay ? textToDisplay : "Log in or sign up to view apps."}
        </p>
      </CardBody>
      <Divider />
      <CardFooter className="gap-4">
        <Login
          isDismissable={false}
          hasCloseButton={false}
          loginText={loginText ? loginText : undefined}
          successRedirectUrl={
            successRedirectUrl ? successRedirectUrl : undefined
          }
        />
        <Signup isDismissable={false} hasCloseButton={false} />
      </CardFooter>
    </Card>
  );
};

export default ChooseLoginSignup;
