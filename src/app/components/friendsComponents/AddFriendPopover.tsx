/* eslint-disable react-hooks/exhaustive-deps */
import { emailValidation } from "@/app/lib/auth/emailValidation";
import { UserType } from "@/app/lib/handlers/getUser";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import { useEffect, useState } from "react";

interface AddFriendPopoverInterface {
  user: UserType;
}

const AddFriendPopover = ({ user }: AddFriendPopoverInterface) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [friendEmail, setFriendEmail] = useState<string>(undefined);
  const [emailValid, setEmailValid] = useState<boolean>(undefined);
  const [submitting, setSubmitting] = useState<boolean>(false);

  useEffect(() => {
    const submitEmail = async () => {
      console.log(friendEmail);
      setFriendEmail(undefined);
      setSubmitting(false);
    };
    submitting && submitEmail().then((res) => onOpenChange());
  }, [submitting]);

  return (
    <>
      <div className="space-y-2">
        <Button
          className="text-tiny text-white bg-white/20"
          variant="flat"
          color="default"
          radius="lg"
          size="sm"
          onPress={onOpen}
        >
          Find friends
        </Button>
      </div>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        backdrop="blur"
        hideCloseButton
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Invite a friend
              </ModalHeader>
              <ModalBody>
                <Input
                  type="email"
                  label="Email"
                  value={friendEmail}
                  isInvalid={emailValid}
                  onChange={(e) => {
                    setFriendEmail(e.target.value);
                    setEmailValid(!emailValidation(friendEmail));
                  }}
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button
                  isLoading={submitting}
                  isDisabled={submitting || emailValid}
                  onPress={() => {
                    setSubmitting(true);
                  }}
                >
                  Invite
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddFriendPopover;