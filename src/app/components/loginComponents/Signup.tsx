"use client";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { Button, Divider } from "@nextui-org/react";
import { Input } from "@nextui-org/input";
import { useState } from "react";
import EyeFilledIcon from "@/app/lib/icons/eye_show_filled_icon_201405.png";
import EyeSlashFilledIcon from "@/app/lib/icons/eye_hide_filled_icon_200618.png";
import Image from "next/image";
import { emailValidation } from "../../lib/auth/emailValidation";
import { passwordValidation } from "../../lib/auth/passwordValidation";
import { useRouter } from "next/navigation";
import { signUp } from "../../lib/api/signUp";

const Signup = () => {
  const router = useRouter();

  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  const [signupEmailValue, setSignupEmailValue] = useState<string>("");
  const [signupPasswordValue, setSignupPasswordValue] = useState<string>("");
  const [signupRepeatPasswordValue, setSignupRepeatPasswordValue] =
    useState<string>("");
  const [signupEmailValid, setSignupEmailValid] = useState<boolean>(false);
  const [signupPasswordValid, setSignupPasswordValid] =
    useState<boolean>(false);
  const [signupProcessing, setSignupProcessing] = useState<boolean>(false);

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSignupRequest = async () => {
    console.log("Handling signup request");
    setSignupProcessing(true);
    const res = await signUp(signupEmailValue, signupPasswordValue);
    if (res?.message === "user_exists") {
      setErrorMessage("User already exists");
    } else if (res?.message === "user_added") {
    }
    setSignupProcessing(false);
  };

  return (
    <Card className="md:w-[400px]">
      <CardHeader className="flex gap-3">
        {" "}
        <div className="flex flex-col">
          <p className="text-lg font-bold">Sign up</p>
        </div>
      </CardHeader>
      <Divider />
      <CardBody className="gap-4">
        {" "}
        <Input
          isRequired
          type="email"
          label="Email"
          color="secondary"
          isClearable
          value={signupEmailValue}
          isInvalid={!signupEmailValid}
          onChange={(e) => {
            setSignupEmailValue(e.target.value);
            setSignupEmailValid(emailValidation(e.target.value));
            setErrorMessage(null);
          }}
          onClear={() => setSignupEmailValue("")}
        />
        <Input
          label="Password"
          variant="bordered"
          placeholder="Enter your password"
          color="secondary"
          isInvalid={!signupPasswordValid}
          value={signupPasswordValue}
          onChange={(e) => {
            setSignupPasswordValue(e.target.value);
            setSignupPasswordValid(passwordValidation(e.target.value));
            setErrorMessage(null);
          }}
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
          color={
            signupRepeatPasswordValue === signupPasswordValue
              ? "secondary"
              : "danger"
          }
          value={signupRepeatPasswordValue}
          onChange={(e) => {
            setSignupRepeatPasswordValue(e.target.value);
            setErrorMessage(null);
          }}
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
        {errorMessage && <div className="text-red-600">{errorMessage}</div>}
      </CardBody>
      <Divider />
      <CardFooter className="gap-4">
        <Button
          radius="full"
          color="secondary"
          isLoading={signupProcessing}
          isDisabled={
            !signupEmailValid ||
            !signupPasswordValid ||
            signupPasswordValue !== signupRepeatPasswordValue
          }
          variant="ghost"
          onPress={handleSignupRequest}
        >
          Sign up
        </Button>
      </CardFooter>
    </Card>
  );
};

export default Signup;
