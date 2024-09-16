/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import useSWR, { useSWRConfig } from "swr";
import { fetcher } from "@/app/lib/handlers/swrFetcher";
import { useEffect, useState } from "react";
import { UserType } from "@/app/lib/handlers/auth_handlers/getUser";
import { AppBoxWrapper } from "../layoutComponents/AppBoxWrapper";
import { Card, CardBody, CardFooter, Divider, User } from "@nextui-org/react";
import Image from "next/image";
import AddFriendPopover from "./AddFriendPopover";

interface FriendsListInterface {
  user: UserType;
}

type friendsDataType = {
  connected: number;
  connection_date: string;
  friend_email: string;
  friend_id: string;
  invite_code: string;
  invite_date: string;
  user_id: string;
  email: string;
  image: string | null;
  name: string;
};

const FriendsList = ({ user }: FriendsListInterface) => {
  const [friends, setFriends] = useState<friendsDataType[]>();
  const [displayError, setDisplayError] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);
  const { mutate } = useSWRConfig();

  const { data, error, isLoading } = useSWR(
    `${process.env.NEXT_PUBLIC_URL}/api/friend/find-friends/${user.email}`,
    fetcher
  );

  useEffect(() => {
    data && setFriends(data["message"]);
    error && setDisplayError(error);
  }, [data, error, isLoading]);

  return (
    <>
      <div className="font-bold text-3xl text-center">
        <div className="container max-h-80 md:overflow-y-hidden scrolling-auto scrolling-touch">
          <div className="self-center tracking-wide font-bold text-lg p-4">
            Your sett
          </div>
          <Divider />

          <div className="container max-h-80 overflow-y-hidden scrolling-auto scrolling-touch">
            <AppBoxWrapper>
              {friends && friends.length > 0 ? (
                <>
                  <div className="col-span-1">
                    <div className="tracking-wide font-semibold text-lg">
                      Friends
                    </div>
                    <div className="p-4">
                      <Card isFooterBlurred radius="lg" className="border-none">
                        <CardBody className="absolute bg-gray-100 bg-opacity-40 h-full">
                          {friends &&
                            friends.map((i, k) => (
                              <div
                                key={k}
                                className="text-left before:bg-gray/10 border-white/20 border-1 before:rounded-xl rounded-large w-[calc(100%_-_2px)] shadow-small ml-1 z-10 pt-1 pl-1 pr-1 bg-white"
                              >
                                <User
                                  name={i.name}
                                  description={i.email}
                                  avatarProps={{ src: i.image }}
                                />
                              </div>
                            ))}

                          <div>{isLoading && <div>Loading...</div>}</div>
                        </CardBody>
                        <Image
                          alt="Badger friends"
                          className="object-cover"
                          height={200}
                          src="https://i.postimg.cc/7Z8MfCJF/badger-dummy-friends.png"
                          width={200}
                        />
                        <CardFooter className="text-left before:bg-gray/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
                          <AddFriendPopover user={user} />
                        </CardFooter>
                      </Card>
                    </div>
                  </div>
                </>
              ) : (
                <div className="p-4">
                  <Card isFooterBlurred radius="lg" className="border-none">
                    <Image
                      alt="Badger friends"
                      className="object-cover"
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
                        <AddFriendPopover user={user} />
                      </div>
                    </CardFooter>
                  </Card>
                </div>
              )}
            </AppBoxWrapper>
          </div>
        </div>
      </div>
    </>
  );
};
export default FriendsList;
