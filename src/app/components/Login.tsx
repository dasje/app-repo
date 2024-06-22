"use client";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { Button, Divider } from "@nextui-org/react";
import { Input } from "@nextui-org/input";
import { useState } from "react";
import EyeFilledIcon from "@/app/lib/icons/eye_show_filled_icon_201405.png";
import EyeSlashFilledIcon from "@/app/lib/icons/eye_hide_filled_icon_200618.png";
import Image from "next/image";

interface LoginSignUpProps {
  process: "options" | "login" | "signup";
}
const LoginSignup = ({ process }: LoginSignUpProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  const setContent = () => {
    switch (process) {
      case "signup":
        return (
          <>
            <Input
              isRequired
              type="email"
              label="Email"
              color="secondary"
              isClearable
            />
            <Input
              label="Password"
              variant="bordered"
              placeholder="Enter your password"
              color="secondary"
              endContent={
                <button
                  className="focus:outline-none"
                  type="button"
                  onClick={toggleVisibility}
                >
                  {isVisible ? (
                    <Image
                      src={EyeFilledIcon}
                      alt="eye filled"
                      width={10}
                      height={10}
                    />
                  ) : (
                    <Image
                      src={EyeSlashFilledIcon}
                      alt="eye filled"
                      width={10}
                      height={10}
                    />
                  )}
                </button>
              }
              type={isVisible ? "text" : "password"}
              className="max-w-xs"
            />
            <Input
              label="Re-enter password"
              variant="bordered"
              placeholder="Re-enter your password"
              color="secondary"
              endContent={
                <button
                  className="focus:outline-none"
                  type="button"
                  onClick={toggleVisibility}
                >
                  {isVisible ? (
                    <Image
                      src={EyeFilledIcon}
                      alt="eye filled"
                      width={10}
                      height={10}
                    />
                  ) : (
                    <Image
                      src={EyeSlashFilledIcon}
                      alt="eye filled"
                      width={10}
                      height={10}
                    />
                  )}
                </button>
              }
              type={isVisible ? "text" : "password"}
              className="max-w-xs"
            />
          </>
        );
      case "login":
        return (
          <>
            <p>Log in to view apps.</p>
            <Input
              isRequired
              type="email"
              label="Email"
              color="secondary"
              isClearable
            />
            <Input
              label="Password"
              variant="bordered"
              placeholder="Enter your password"
              color="secondary"
              endContent={
                <button
                  className="focus:outline-none"
                  type="button"
                  onClick={toggleVisibility}
                >
                  {isVisible ? (
                    <Image
                      src={EyeFilledIcon}
                      alt="eye filled"
                      width={10}
                      height={10}
                    />
                  ) : (
                    <Image
                      src={EyeSlashFilledIcon}
                      alt="eye filled"
                      width={10}
                      height={10}
                    />
                  )}
                </button>
              }
              type={isVisible ? "text" : "password"}
              className="max-w-xs"
            />
          </>
        );
      default:
        return <p>Log in or sign up to view apps.</p>;
    }
  };
  const showButtons = () => {
    switch (process) {
      case "signup":
        return (
          <Button
            radius="full"
            color="secondary"
            isLoading={false}
            disabled={false}
            variant="ghost"
          >
            Sign up
          </Button>
        );
      case "login":
        return (
          <Button
            radius="full"
            color="primary"
            isLoading={false}
            disabled={false}
            variant="ghost"
          >
            Log in
          </Button>
        );
      default:
        return (
          <>
            <Button
              radius="full"
              color="primary"
              isLoading={false}
              disabled={false}
              variant="ghost"
            >
              Log in
            </Button>
            <Button
              radius="full"
              color="secondary"
              isLoading={false}
              disabled={false}
              variant="ghost"
            >
              Sign up
            </Button>
          </>
        );
    }
  };
  return (
    <Card className="md:w-[400px]">
      <CardHeader className="flex gap-3">
        {" "}
        <div className="flex flex-col">
          <p className="text-lg font-bold">
            {process === "options"
              ? "Log in"
              : process === "login"
              ? "Log in"
              : "Sign up"}
          </p>
        </div>
      </CardHeader>
      <Divider />
      <CardBody className="gap-4">{setContent()}</CardBody>
      <Divider />
      <CardFooter className="gap-4">{showButtons()}</CardFooter>
    </Card>
  );
};

export default LoginSignup;
