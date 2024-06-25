"use client";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { Button, Divider } from "@nextui-org/react";
import Link from "next/link";

const ChooseLoginSignup = () => {
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
        <Link href="/login/login">
          <Button
            radius="full"
            color="primary"
            isLoading={false}
            disabled={false}
            variant="ghost"
          >
            Log in
          </Button>
        </Link>
        <Link href="/login/signup">
          <Button
            radius="full"
            color="secondary"
            isLoading={false}
            disabled={false}
            variant="ghost"
          >
            Sign up
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default ChooseLoginSignup;
