"use client";
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
import { emailValidation } from "../../lib/handlers/auth_handlers/emailValidation";
import { passwordValidation } from "../../lib/handlers/auth_handlers/passwordValidation";
import { signIn } from "next-auth/react";
import { signupHandler } from "@/app/lib/handlers/signupHandler";

interface SignupInterface {
  isDismissable: boolean;
  hasCloseButton: boolean;
  successRedirectUrl?: string;
}

const Signup = ({
  isDismissable,
  hasCloseButton,
  successRedirectUrl,
}: SignupInterface) => {
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  const [signupNameValue, setSignupNameValue] = useState<string>("");
  const [signupEmailValue, setSignupEmailValue] = useState<string>("");
  const [signupPasswordValue, setSignupPasswordValue] = useState<string>("");
  const [signupRepeatPasswordValue, setSignupRepeatPasswordValue] =
    useState<string>("");
  const [signupNameValid, setSignupNameValid] = useState<boolean>(true);
  const [signupEmailValid, setSignupEmailValid] = useState<boolean>(true);
  const [signupPasswordValid, setSignupPasswordValid] = useState<boolean>(true);
  const [signupProcessing, setSignupProcessing] = useState<boolean>(false);

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSignupRequest = async () => {
    console.log("Handling signup request");
    try {
      setSignupProcessing(true);
      const signupBody = {
        name: signupNameValue,
        email: signupEmailValue,
        password: signupPasswordValue,
        passwordConfirm: signupRepeatPasswordValue,
      };
      const res = await signupHandler(signupBody);
      res.msg === "success" &&
        signIn(undefined, {
          callbackUrl: successRedirectUrl ? successRedirectUrl : "/login",
        });
      if (res.msg === "error") {
        if (res.msg.search("Duplicate entry")) {
          setErrorMessage("User already exists.");
        } else if (res.msg.search("Access denied")) {
          setErrorMessage("An errror occurred. Please contant administrator.");
        } else {
          setErrorMessage(res.data.errorMessage);
        }
      }
    } finally {
      setSignupProcessing(false);
    }
  };

  const { isOpen, onClose, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Button color="primary" onPress={onOpen} variant="flat">
        Sign up
      </Button>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        onOpenChange={onOpenChange}
        isDismissable={isDismissable}
        closeButton={hasCloseButton}
        isKeyboardDismissDisabled={true}
        backdrop="blur"
      >
        <ModalContent>
          <ModalHeader>
            <div className="flex flex-col">
              <p className="text-lg font-bold">Sign up</p>
            </div>
          </ModalHeader>
          <ModalBody className="gap-4">
            <Divider />
            <Input
              isRequired
              type="name"
              label="Name"
              color="secondary"
              isClearable
              value={signupNameValue}
              isInvalid={!signupNameValid}
              onChange={(e) => {
                setSignupNameValue(e.target.value);
                signupNameValue.length < 2
                  ? setSignupNameValid(false)
                  : setSignupNameValid(true);
                setErrorMessage(null);
              }}
              onClear={() => setSignupNameValue("")}
            />
            <Input
              isRequired
              type="email"
              label="Email"
              color="secondary"
              isClearable
              value={signupEmailValue}
              isInvalid={!signupEmailValid}
              errorMessage="This is not a valid email."
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
              errorMessage="Password must contain one digit from 1 to 9, one lowercase letter, one uppercase letter, one special character, no space, and it must be 8-16 characters long."
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
          </ModalBody>
          <Divider />
          <ModalFooter className="gap-4">
            <Button
              radius="full"
              color="secondary"
              isLoading={signupProcessing}
              isDisabled={
                !signupNameValid ||
                !signupEmailValid ||
                !signupPasswordValid ||
                signupPasswordValue !== signupRepeatPasswordValue
              }
              variant="ghost"
              onPress={handleSignupRequest}
            >
              Sign up
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Signup;
