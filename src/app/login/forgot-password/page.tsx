/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { emailValidation } from "@/app/lib/handlers/auth_handlers/emailValidation";
import { Input } from "@nextui-org/input";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
  const router = useRouter();
  const [userEmail, setUserEmail] = useState<string>(undefined);
  const [emailValid, setEmailValid] = useState<boolean>(undefined);
  const [submitting, setSubmitting] = useState<boolean>(false);

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  useEffect(() => {
    const submitEmail = async () => {
      const reqBody = { userEmail };
      await fetch(
        process.env.NEXT_PUBLIC_URL + "/api/register/forgot-password",
        {
          method: "POST",
          body: JSON.stringify(reqBody),
          headers: {
            "Content-Type": "application/json",
          },
        }
      ).then((res) => {
        setSubmitting(false);
        if (res.status === 201 || res.status === 200) {
          onOpenChange();
        }
      });
    };
    submitting && !emailValid && submitEmail();
  }, [submitting]);

  return (
    <>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        hideCloseButton={true}
        isDismissable={false}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalBody>
                <p>Email sent successfully. Click below to be redirected.</p>
              </ModalBody>
              <ModalFooter>
                <Button
                  color="primary"
                  onPress={() => {
                    onClose();
                    router.push("/");
                  }}
                >
                  Finish
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      <div className="m-6 rounded bg-white flex flex-grow justify-center">
        <Card className="min-w-[400px]">
          <CardHeader className="flex gap-3">Forgot password</CardHeader>
          <Divider />
          <CardBody>
            <p>
              Enter your email below. A link to reset your password will be sent
              to your email.
            </p>
            <Input
              type="email"
              label="Email"
              value={userEmail}
              isInvalid={emailValid}
              onChange={(e) => {
                setUserEmail(e.target.value);
                setEmailValid(!emailValidation(userEmail));
              }}
            />
          </CardBody>
          <Divider />
          <CardFooter>
            <Button
              isLoading={submitting}
              isDisabled={emailValid}
              onPress={() => {
                setSubmitting(true);
              }}
            >
              Reset password
            </Button>
          </CardFooter>
        </Card>
      </div>
    </>
  );
}
