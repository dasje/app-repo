/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import {
  Button,
  Listbox,
  ListboxItem,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
  User,
} from "@nextui-org/react";
import Image from "next/image";
import deleteIcon from "@/app/lib/icons/icons8-delete-120.png";
import backIcon from "@/app/lib/icons/icons8-enter-90.png";
import addUserIcon from "@/app/lib/icons/icons8-add-user-100.png";
import useSWR from "swr";
import { fetcher } from "@/app/lib/handlers/swrFetcher";
import { UserType } from "@/app/lib/handlers/auth_handlers/getUser";
import Loading from "../../loading";

interface WatchlistListMenuBarInterface {
  onOpenChange: () => void;
  showSearchBox: boolean;
  setShowSearchBox: Dispatch<SetStateAction<boolean>>;
  deleteTrigger: (watchlistId: string) => void;
  watchlistId: string;
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

const WatchlistListMenuBar = ({
  onOpenChange,
  showSearchBox,
  setShowSearchBox,
  deleteTrigger,
  watchlistId,
  user,
}: WatchlistListMenuBarInterface) => {
  const [listFriends, setListFriends] = useState<friendsDataType[]>();
  const [listUsers, setListUsers] = useState<
    {
      added_date: string;
      id: string;
      role: string;
      user_id: string;
      email: string;
      image: string | null;
      name: string;
    }[]
  >();
  //   const { data, error, isLoading } = useSWR(
  //     `${process.env.NEXT_PUBLIC_URL}/api/watchlist/watchlist-items/${watchlistId}`,
  //     fetcher,

  //   );

  const {
    data: usersData,
    error: usersError,
    isLoading: usersIsLoading,
  } = useSWR(
    `${process.env.NEXT_PUBLIC_URL}/api/watchlist/${watchlistId}/find-users`,
    fetcher,
    { refreshInterval: 2000 }
  );

  useEffect(() => {
    console.log(usersData);
    usersData && setListUsers(usersData["message"]);
  }, [usersData]);

  const {
    data: friendsData,
    error: friendsError,
    isLoading: friendsIsLoading,
  } = useSWR(
    `${process.env.NEXT_PUBLIC_URL}/api/friend/find-friends/${user.email}`,
    fetcher,
    { refreshInterval: 2000 }
  );

  useEffect(() => {
    console.log(friendsData);
    if (friendsData && listUsers) {
      const fd: friendsDataType[] = friendsData["message"];
      console.log(fd);
      let updatedFd: friendsDataType[] = [];
      let listOfUserIds: string[] = [];
      listUsers.forEach((userItem) => {
        listOfUserIds.push(userItem.user_id);
      });
      fd.forEach((friendItem) => {
        if (listOfUserIds.includes(friendItem.friend_id)) {
        } else {
          updatedFd.push(friendItem);
        }
      });
      console.log(updatedFd, listOfUserIds);
      setListFriends(updatedFd);
    }
  }, [friendsData, listUsers]);

  const [removeUser, setRemoveUser] = useState<string | undefined>();
  useEffect(() => {
    const deleteUser = async () => {
      await fetch(
        `${process.env.NEXT_PUBLIC_URL}/api/watchlist/${watchlistId}/remove-friend`,
        {
          method: "POST",
          body: JSON.stringify({
            userEmail: user.email,
            friendEmail: removeUser,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      ).then((res) => {
        if (res.status === 201) {
          setRemoveUser(undefined);
        }
      });
    };
    removeUser && deleteUser();
  }, [removeUser]);

  const [addUser, setAddUser] = useState<string | undefined>();
  useEffect(() => {
    const addNewUser = async () => {
      await fetch(
        `${process.env.NEXT_PUBLIC_URL}/api/watchlist/${watchlistId}/add-friend`,
        {
          method: "POST",
          body: JSON.stringify({
            userEmail: user.email,
            friendEmail: addUser,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      ).then((res) => {
        if (res.status === 200) {
          setAddUser(undefined);
        }
      });
    };
    addUser && addNewUser();
  }, [addUser]);

  const {
    isOpen: handleFriendsIsOpen,
    onOpen: handleFriendsOnOpen,
    onOpenChange: handleFriendsOnOpenChange,
  } = useDisclosure();
  return (
    <div className="grid grid-cols-8 md:grid-cols-12 p-4 space-x-2">
      <div className="flex flex-grow col-span-5 md:col-span-9">
        <Button onPress={() => setShowSearchBox(!showSearchBox)} size="sm">
          Add show or movie
        </Button>
      </div>
      <div className="col-span-1 self-center space-x-2">
        <Button isIconOnly onClick={handleFriendsOnOpen} size="sm">
          <Image
            src={addUserIcon}
            alt="Add user button"
            height={15}
            width={15}
          />
        </Button>
        <Modal
          isOpen={handleFriendsIsOpen}
          onOpenChange={handleFriendsOnOpenChange}
          disableAnimation
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  Add or remove a friends from this list.
                </ModalHeader>
                <ModalBody>
                  {usersIsLoading && <Loading />}
                  {usersError && <div>Error fetching users for this list.</div>}
                  {listUsers && listUsers.length > 0 && (
                    <Listbox selectionMode="none">
                      {listUsers.map((i, k) => (
                        <ListboxItem
                          key={k}
                          endContent={
                            <>
                              {i.role !== "owner" && (
                                <Button
                                  isIconOnly
                                  isLoading={removeUser === i.email}
                                  onPress={() => {
                                    console.log("removing user");
                                    setRemoveUser(i.email);
                                  }}
                                >
                                  <Image
                                    src={deleteIcon}
                                    width={15}
                                    height={15}
                                    alt="Delete user from list"
                                  />
                                </Button>
                              )}
                            </>
                          }
                        >
                          <User
                            name={i.name}
                            description={i.email}
                            avatarProps={{ src: i.image }}
                          />
                        </ListboxItem>
                      ))}
                    </Listbox>
                  )}
                  <div>Add users</div>
                  {friendsIsLoading ? (
                    <Loading />
                  ) : friendsError ? (
                    <div>Error fetching friends.</div>
                  ) : (
                    listFriends &&
                    listFriends.length > 0 && (
                      <Listbox selectionMode="none">
                        {listFriends.map((i, k) => (
                          <ListboxItem
                            key={k}
                            endContent={
                              <Button
                                isIconOnly
                                isLoading={addUser === i.email}
                                onPress={() => {
                                  console.log("adding user");
                                  setAddUser(i.email);
                                }}
                              >
                                <Image
                                  src={addUserIcon}
                                  width={15}
                                  height={15}
                                  alt="Add user to list"
                                />
                              </Button>
                            }
                          >
                            <User
                              name={i.name}
                              description={i.email}
                              avatarProps={{ src: i.image }}
                            />
                          </ListboxItem>
                        ))}
                      </Listbox>
                    )
                  )}
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    Close
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </div>
      <div className="col-span-1 self-center  space-x-2">
        <Button
          isIconOnly
          onPress={() => {
            deleteTrigger(watchlistId);
            onOpenChange();
          }}
          size="sm"
        >
          <Image
            src={deleteIcon}
            alt="Delete watchlist button"
            height={15}
            width={15}
          />
        </Button>
      </div>
      <div className="col-span-1 self-center">
        <Button isIconOnly onPress={onOpenChange} size="sm">
          <Image
            src={backIcon}
            alt="Close watchlist button"
            height={15}
            width={15}
          />
        </Button>
      </div>
    </div>
  );
};

export default WatchlistListMenuBar;
