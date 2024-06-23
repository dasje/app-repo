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
import { login } from "@/app/lib/api/login";

const Login = () => {
  const router = useRouter();

  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  const [loginEmailValue, setLoginEmailValue] = useState<string>("");
  const [loginPasswordValue, setLoginPasswordValue] = useState<string>("");

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleLoginRequest = async () => {
    const res = await login(loginEmailValue, loginPasswordValue);
    if (res.message === "user_exists") {
      router.push("/login");
    } else if (res.message === "wrong_credentials") {
      setErrorMessage("Incorrect email or password.");
    }
  };

  return (
    <Card className="md:w-[400px]">
      <CardHeader className="flex gap-3">
        {" "}
        <div className="flex flex-col">
          <p className="text-lg font-bold">Log in</p>
        </div>
      </CardHeader>
      <Divider />
      <CardBody className="gap-4">
        <p>Log in to view apps.</p>
        <Input
          isRequired
          type="email"
          label="Email"
          color="secondary"
          isClearable
          value={loginEmailValue}
          onChange={(e) => {
            setLoginEmailValue(e.target.value);
            setErrorMessage(null);
          }}
          onClear={() => setLoginEmailValue("")}
        />
        <Input
          label="Password"
          variant="bordered"
          placeholder="Enter your password"
          color="secondary"
          value={loginPasswordValue}
          onChange={(e) => {
            setLoginPasswordValue(e.target.value);
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
          color="primary"
          isLoading={false}
          disabled={false}
          variant="ghost"
          onPress={handleLoginRequest}
        >
          Log in
        </Button>
      </CardFooter>
    </Card>
  );
};

export default Login;
