/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { fetcher } from "@/app/lib/handlers/swrFetcher";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import useSWR from "swr";
import Image from "next/image";
import {
  Button,
  Divider,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import Loading from "@/app/apps/loading";

import EyeFilledIcon from "@/app/lib/icons/eye_show_filled_icon_201405.png";
import EyeSlashFilledIcon from "@/app/lib/icons/eye_hide_filled_icon_200618.png";
import { passwordValidation } from "@/app/lib/handlers/auth_handlers/passwordValidation";

export default function Page() {
  const params = useParams<{ reset_code: string }>();
  const router = useRouter();

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [newPasswordValue, setNewPasswordValue] = useState<string>();
  const [newPasswordValid, setNewPasswordValid] = useState<boolean>();
  const [newPasswordConfirmValue, setNewPasswordConfirmValue] =
    useState<string>();
  const [errorMessage, setErrorMessage] = useState<string>();
  const [changingPasswordProcessing, setChangingPasswordProcessing] =
    useState<boolean>(false);
  const [redirecting, setRedirecting] = useState<boolean>(false);

  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  const handleChangePasswordRequest = () => {
    if (
      passwordValidation(newPasswordValue) &&
      newPasswordValue === newPasswordConfirmValue
    ) {
      setChangingPasswordProcessing(!changingPasswordProcessing);
    }
  };

  const handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      handleChangePasswordRequest();
    }
  };

  const {
    data: resetData,
    error: resetError,
    isLoading: resetIsLoading,
  } = useSWR(
    `${process.env.NEXT_PUBLIC_URL}/api/register/forgot-password/${params.reset_code}`,
    fetcher
  );

  useEffect(() => {
    const confirm = async () => {
      console.log(resetData);
      const updatePasswordBody = {
        userEmail: resetData.user_email,
        newPassword: newPasswordValue,
      };
      console.log(updatePasswordBody);
      await fetch(
        process.env.NEXT_PUBLIC_URL +
          "/api/register/forgot-password/request-reset",
        {
          method: "POST",
          body: JSON.stringify(updatePasswordBody),
          headers: {
            "Content-Type": "application/json",
          },
        }
      ).then((res) => {
        if (res.status === 202) {
          setErrorMessage(
            "Password already used. Please use a different password."
          );
          setNewPasswordValue("");
          setNewPasswordConfirmValue("");
        } else if (res.status === 200) {
          onOpenChange();
        } else if (res.status === 500) {
          setErrorMessage("An error occurred. Please contact system admin.");
        }
        setChangingPasswordProcessing(false);
      });
    };
    changingPasswordProcessing && confirm();
  }, [changingPasswordProcessing]);

  return (
    <>
      {resetIsLoading ? (
        <Loading />
      ) : (
        <div className="m-6 rounded bg-white flex flex-grow justify-center">
          {resetError && <div>Error</div>}
          {resetData && (
            <div>
              <Modal
                isOpen={isOpen}
                onClose={() => {}}
                // onOpenChange={onOpenChange}
                isDismissable={false}
                closeButton={false}
                isKeyboardDismissDisabled={false}
                backdrop="blur"
                placement="center"
                hideCloseButton={true}
              >
                <ModalContent>
                  <ModalHeader>
                    <div className="flex flex-col">
                      <p className="text-lg font-bold">Password Reset</p>
                    </div>
                  </ModalHeader>
                  <ModalFooter>
                    <Button
                      color="success"
                      onClick={() => {
                        setRedirecting(!redirecting);
                        router.push("/");
                      }}
                      isLoading={redirecting}
                    >
                      Click to continue
                    </Button>
                  </ModalFooter>
                </ModalContent>
              </Modal>
              <Modal
                isOpen={true}
                onClose={() => {}}
                // onOpenChange={onOpenChange}
                isDismissable={false}
                closeButton={false}
                isKeyboardDismissDisabled={false}
                backdrop="blur"
                placement="center"
                hideCloseButton={true}
              >
                <ModalContent>
                  <ModalHeader>
                    <div className="flex flex-col">
                      <p className="text-lg font-bold">Reset Password</p>
                    </div>
                  </ModalHeader>

                  {resetData.status === 204 ? (
                    <>
                      <ModalBody>
                        <div>Request has expired or cannot be found.</div>
                      </ModalBody>
                      <ModalFooter>
                        <Button
                          radius="full"
                          color="primary"
                          variant="ghost"
                          onPress={() => router.push("/")}
                        >
                          Return
                        </Button>
                      </ModalFooter>
                    </>
                  ) : (
                    <>
                      <ModalBody className="gap-4">
                        <Divider />
                        <p>Enter new password</p>
                        <Input
                          label="Password"
                          variant="bordered"
                          placeholder="Enter your new password"
                          color="secondary"
                          value={newPasswordValue}
                          onChange={(e) => {
                            setNewPasswordValue(e.target.value);
                            setNewPasswordValid(
                              passwordValidation(e.target.value)
                            );
                            setErrorMessage(null);
                          }}
                          isInvalid={!newPasswordValid}
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
                        <p>Re-enter new password</p>
                        <Input
                          label="Password"
                          variant="bordered"
                          placeholder="Re-enter your new password"
                          color="secondary"
                          value={newPasswordConfirmValue}
                          onChange={(e) => {
                            setNewPasswordConfirmValue(e.target.value);
                            setErrorMessage(null);
                          }}
                          isInvalid={
                            !(newPasswordValue === newPasswordConfirmValue)
                          }
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
                        {errorMessage && (
                          <div className="text-red-600">{errorMessage}</div>
                        )}
                        <Divider />
                      </ModalBody>
                      <ModalFooter className="gap-4">
                        <Button
                          radius="full"
                          color="primary"
                          isLoading={changingPasswordProcessing}
                          disabled={
                            newPasswordValue !== newPasswordConfirmValue
                          }
                          variant="ghost"
                          onPress={handleChangePasswordRequest}
                        >
                          Change password
                        </Button>
                      </ModalFooter>
                    </>
                  )}
                </ModalContent>
              </Modal>
            </div>
          )}
        </div>
      )}
    </>
  );
}
