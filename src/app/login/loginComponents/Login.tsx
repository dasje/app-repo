"use client";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import {
  Button,
  Divider,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import { Input } from "@nextui-org/input";
import { useState } from "react";
import EyeFilledIcon from "@/app/lib/icons/eye_show_filled_icon_201405.png";
import EyeSlashFilledIcon from "@/app/lib/icons/eye_hide_filled_icon_200618.png";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";

interface LoginInterface {
  isDismissable: boolean;
  hasCloseButton: boolean;
  successRedirectUrl?: string;
  loginText?: string;
}
const Login = ({
  isDismissable,
  hasCloseButton,
  successRedirectUrl,
  loginText,
}: LoginInterface) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = successRedirectUrl
    ? successRedirectUrl
    : searchParams.get("callbackUrl") || "/apps";

  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  const [loginEmailValue, setLoginEmailValue] = useState<string>("");
  const [loginPasswordValue, setLoginPasswordValue] = useState<string>("");

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loginProcessing, setLoginProcessing] = useState<boolean>(false);

  const handleLoginRequest = async () => {
    try {
      setLoginProcessing(true);
      const res = await signIn("credentials", {
        redirect: false,
        email: loginEmailValue,
        password: loginPasswordValue,
        redirectTo: callbackUrl,
      });
      setLoginProcessing(false);
      if (!res?.error) {
        router.push(callbackUrl);
        window.location.reload();
      } else {
        setErrorMessage("Incorrect email or password.");
      }
    } catch (error: any) {
      setErrorMessage(error.message);
    } finally {
      setLoginProcessing(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      handleLoginRequest();
    }
  };

  const { isOpen, onClose, onOpen, onOpenChange } = useDisclosure();
  return (
    <>
      <Button color="primary" onClick={onOpen} variant="faded">
        Login
      </Button>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        onOpenChange={onOpenChange}
        isDismissable={isDismissable}
        closeButton={hasCloseButton}
        isKeyboardDismissDisabled={true}
        backdrop="blur"
        placement="center"
      >
        <ModalContent>
          <ModalHeader>
            <div className="flex flex-col">
              <p className="text-lg font-bold">Log in</p>
            </div>
          </ModalHeader>
          <ModalBody className="gap-4">
            <Divider />
            <p>{loginText ? loginText : "Log in to view apps."}</p>
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
              onKeyDown={(e) => handleKeyPress(e)}
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
              onKeyDown={(e) => {
                handleKeyPress(e);
              }}
            />
            {errorMessage && <div className="text-red-600">{errorMessage}</div>}
            <Divider />
          </ModalBody>
          <ModalFooter className="gap-4">
            <Button
              radius="full"
              color="primary"
              isLoading={loginProcessing}
              disabled={loginProcessing}
              variant="ghost"
              onPress={handleLoginRequest}
            >
              Log in
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Login;
