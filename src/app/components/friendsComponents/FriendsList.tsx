/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import useSWR, { useSWRConfig } from "swr";
import { fetcher } from "@/app/lib/handlers/swrFetcher";
import { useEffect, useState } from "react";
import { UserType } from "@/app/lib/handlers/getUser";
import { UserConnectionsTable, UserTable } from "@/app/database/types";
import { AppBoxWrapper } from "../layoutComponents/AppBoxWrapper";
import GhostDashboardCard from "../GhostDashboardCard";
import { Card, CardBody, CardFooter } from "@nextui-org/react";
import Image from "next/image";
import AddFriendPopover from "./AddFriendPopover";

interface FriendsListInterface {
  user: UserType;
}

type friendsDataType = UserTable & UserConnectionsTable;

const FriendsList = ({ user }: FriendsListInterface) => {
  const [friends, setFriends] = useState<friendsDataType[]>();
  const [displayError, setDisplayError] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);
  const { mutate } = useSWRConfig();

  const { data, error, isLoading } = useSWR(
    `${process.env.NEXT_PUBLIC_URL}/api/friend/find-friends/${user.email}`,
    fetcher
    // { refreshInterval: 500 }
  );

  useEffect(() => {
    data && setFriends(data["message"]);
    console.log(data);
    error && setDisplayError(error);
  }, [data, error, isLoading]);

  return (
    <AppBoxWrapper>
      {friends && friends.length > 0 ? (
        <>
          <div>
            {friends && friends.map((i, k) => <div key={k}>{i.email}</div>)}
          </div>
          <div>{isLoading && <div>Loading...</div>}</div>
        </>
      ) : (
        <div className="p-4">
          <Card isFooterBlurred radius="lg" className="border-none">
            <Image
              alt="Badger friends"
              className="object-cover object-fill"
              height={200}
              src="https://i.postimg.cc/7Z8MfCJF/badger-dummy-friends.png"
              width={200}
            />
            <CardBody className="text-left before:bg-gray/10 border-gray/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10"></CardBody>
            <CardFooter className="text-left before:bg-gray/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
              <div>
                <p className="text-tiny text-white/80">
                  So many no friends! Find a friend here.
                </p>
              </div>
              <div className="space-y-2">
                <AddFriendPopover />
              </div>
            </CardFooter>
          </Card>
        </div>
      )}
    </AppBoxWrapper>
  );
};
export default FriendsList;