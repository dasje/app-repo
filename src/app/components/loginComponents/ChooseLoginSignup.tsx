"use client";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { Button, Divider } from "@nextui-org/react";

interface ChooseLoginSignupInterface {
  choose: (choice: "login" | "signup") => void;
}
const ChooseLoginSignup = ({ choose }: ChooseLoginSignupInterface) => {
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
        <p>Log in or sign up to view apps.</p>
      </CardBody>
      <Divider />
      <CardFooter className="gap-4">
        {" "}
        <Button
          radius="full"
          color="primary"
          isLoading={false}
          disabled={false}
          variant="ghost"
          onPress={() => choose("login")}
        >
          Log in
        </Button>
        <Button
          radius="full"
          color="secondary"
          isLoading={false}
          disabled={false}
          variant="ghost"
          onPress={() => choose("signup")}
        >
          Sign up
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ChooseLoginSignup;
