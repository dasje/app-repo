"use client";
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
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { signOut } from "next-auth/react";

interface NotThisUserInterface {
  isDismissable: boolean;
  hasCloseButton: boolean;
  successRedirectUrl?: string;
  displayText?: string;
}
const NotThisUser = ({
  isDismissable,
  hasCloseButton,
  successRedirectUrl,
  displayText,
}: NotThisUserInterface) => {
  const searchParams = useSearchParams();
  const callbackUrl = successRedirectUrl
    ? successRedirectUrl
    : searchParams.get("callbackUrl") || "/login";

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      //   handleLoginRequest();
    }
  };

  const { isOpen, onClose, onOpen, onOpenChange } = useDisclosure();
  return (
    <>
      <Card className="md:w-[400px]">
        <CardHeader className="flex gap-3">
          <div className="flex flex-col">
            <p className="text-lg font-bold">Log in</p>
          </div>
        </CardHeader>
        <CardBody className="gap-4">
          <Divider />
          <p>{displayText ? displayText : ""}</p>

          {errorMessage && <div className="text-red-600">{errorMessage}</div>}
          <Divider />
        </CardBody>
        <CardFooter className="gap-4">
          <Button
            radius="full"
            color="primary"
            //   isLoading={}
            //   disabled={}
            variant="ghost"
            onPress={() => signOut()}
          >
            Sign out
          </Button>
        </CardFooter>
      </Card>
    </>
  );
};

export default NotThisUser;
