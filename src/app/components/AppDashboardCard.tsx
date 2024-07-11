"use client";

import { Button, Card, CardBody, CardFooter } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useState } from "react";

interface AppDashboardCardInterface {
  appLink: string;
  image: string;
  imageAlt: string;
  appByline: string;
  appId: string;
  currentUser: string;
  triggerUserAppResfresh: Dispatch<SetStateAction<boolean>>;
}

const AppDashboardCard = ({
  appLink,
  image,
  imageAlt,
  appByline,
  appId,
  currentUser,
  triggerUserAppResfresh,
}: AppDashboardCardInterface) => {
  const router = useRouter();
  const [addNewAppLoading, setAddNewAppLoading] = useState<boolean>(false);
  const addAppHandler = async (userEmail: string, appId: string) => {
    await fetch("/api/add-user-app", {
      method: "POST",
      body: JSON.stringify({ userEmail: userEmail, appId: appId }),
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });
  };
  return (
    <div className="p-4">
      <Card isFooterBlurred radius="lg" className="border-none">
        <Image
          alt={imageAlt}
          className="object-cover object-fill"
          height={200}
          src={image}
          width={200}
        />
        <CardBody className="text-left before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10"></CardBody>
        <CardFooter className="text-left before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
          <div>
            <p className="text-tiny text-white/80">{appByline}</p>
          </div>
          <div className="space-y-2">
            <Link href={appLink}>
              <Button
                className="text-tiny text-white bg-black/20"
                variant="flat"
                color="default"
                radius="lg"
                size="sm"
              >
                More...
              </Button>
            </Link>

            <Button
              className="text-tiny text-white bg-black/20"
              variant="flat"
              color="default"
              radius="lg"
              size="sm"
              isLoading={addNewAppLoading}
              onPress={() => {
                setAddNewAppLoading(!addNewAppLoading);
                addAppHandler(currentUser, appId).then(() => {
                  setAddNewAppLoading(!addNewAppLoading);
                  triggerUserAppResfresh(true);
                  setAddNewAppLoading(!addNewAppLoading);
                });
              }}
            >
              Add
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default AppDashboardCard;
