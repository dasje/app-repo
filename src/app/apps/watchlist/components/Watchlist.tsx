/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { Listbox, ListboxItem } from "@nextui-org/listbox";
import { UserType } from "@/app/lib/handlers/auth_handlers/getUser";
import { useEffect, useState } from "react";
import {
  Checkbox,
  Button,
  useDisclosure,
  Modal,
  ModalContent,
  User,
  ModalHeader,
  ModalBody,
} from "@nextui-org/react";
import Image from "next/image";
import deleteIcon from "@/app/lib/icons/icons8-delete-120.png";
import { WatchlistContentTable } from "@/app/database/types";
import WatchlistListMenuBar from "./WatchlistListMenuBar";
import AddWatchlistListItemBar from "./AddWatchlistListItemBar";
import useSWR, { useSWRConfig } from "swr";
import { fetcher } from "@/app/lib/handlers/swrFetcher";
import { ListboxWrapper } from "@/app/components/layoutComponents/ListboxWrapper";
import { removeWatchlistItemHandler } from "../handlers/removeWatchlistItemHandler";
import { updateWatchlistItemStatusHandler } from "../handlers/updateWatchlistItemStatusHandler";

interface WatchlistInterface {
  user: UserType;
  watchlistName: string;
  watchlistId: string;
  deleteWatchlist: (watchlistId: string) => void;
  owner: boolean;
}

const Watchlist = ({
  user,
  watchlistName,
  watchlistId,
  deleteWatchlist,
  owner,
}: WatchlistInterface) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [fetchListValues, setFetchListValues] = useState<boolean>(false);
  const [watchlistContent, setWatchlistContent] = useState<
    WatchlistContentTable[]
  >([]);
  const [showSearchBox, setShowSearchBox] = useState<boolean>(false);

  const { mutate } = useSWRConfig();

  const { data, error, isLoading } = useSWR(
    user.email !== "dummy"
      ? `${process.env.NEXT_PUBLIC_URL}/api/watchlist/watchlist-items/${watchlistId}`
      : null,
    fetcher,
    { refreshInterval: 500 }
  );

  useEffect(() => {
    data && setWatchlistContent(data["message"]);
  }, [data]);

  const addContent = (
    <>
      {!showSearchBox && (
        <WatchlistListMenuBar
          onOpenChange={onOpenChange}
          showSearchBox={showSearchBox}
          setShowSearchBox={setShowSearchBox}
          deleteTrigger={deleteWatchlist}
          watchlistId={watchlistId}
          user={user}
        />
      )}
      {showSearchBox && (
        <AddWatchlistListItemBar
          user={user}
          watchlistId={watchlistId}
          fetchListValues={fetchListValues}
          setFetchListValues={setFetchListValues}
          showSearchBox={showSearchBox}
          setShowSearchBox={setShowSearchBox}
          watchlistContent={watchlistContent}
          setWatchlistContent={setWatchlistContent}
        />
      )}
    </>
  );

  const removeListItem = (itemId: string) => {
    if (user.email === "dummy") {
      setWatchlistContent(watchlistContent.filter((i) => i.id !== itemId));
    } else {
      removeWatchlistItemHandler({ itemId }).then(
        (res) =>
          res.message === "success" && setFetchListValues(!fetchListValues)
      );
    }
  };

  const updateDummySelection = (itemId: string) => {
    const newContent = watchlistContent.map((item) => {
      if (item.id === itemId) {
        return { ...item, watched: item.watched === 0 ? 1 : 0 };
      }
      return item;
    });
    setWatchlistContent(newContent);
  };

  return (
    <>
      <div className={`m-6 rounded bg-white flex flex-grow justify-center`}>
        <ListboxWrapper owner={owner}>
          <div className="rounded-none flex justify-center">
            <Button onPress={onOpen} size="lg" fullWidth variant="ghost">
              {watchlistName}
            </Button>
            {/* </div> */}
          </div>
          <Modal
            className="m-4"
            isOpen={isOpen}
            onOpenChange={() => {
              //   setFetchListValues(!fetchListValues);
              onOpenChange();
            }}
            backdrop="blur"
            placement="top-center"
            hideCloseButton={true}
            size="lg"
            scrollBehavior="inside"
          >
            <ModalContent>
              {(onClose) => (
                <>
                  <ModalHeader>{addContent}</ModalHeader>
                  <ModalBody>
                    <Listbox
                      classNames={{
                        base: "w-full",
                        list: "overflow-scroll",
                      }}
                      items={watchlistContent}
                      label="Assigned to"
                      variant="flat"
                    >
                      {(item) => (
                        <ListboxItem
                          key={item.id}
                          endContent={
                            <Image
                              onClick={() => removeListItem(item.id)}
                              className="col-span-1 justify-self-end"
                              src={deleteIcon}
                              height={20}
                              width={20}
                              alt="Delete item"
                            />
                          }
                        >
                          <Checkbox
                            aria-label={item.media_name}
                            classNames={{
                              label: "w-full",
                            }}
                            isSelected={item.watched === 1}
                            color={item.watched === 1 ? "success" : "default"}
                            onValueChange={(isSelected) => {
                              if (user.email === "dummy") {
                                updateDummySelection(item.id);
                              } else {
                                updateWatchlistItemStatusHandler({
                                  itemId: item.id,
                                  watchStatus: isSelected ? 1 : 0,
                                });
                                mutate(
                                  `${process.env.NEXT_PUBLIC_URL}/api/watchlist/watchlist-items/${watchlistId}`
                                );
                              }
                            }}
                          >
                            <div className="w-full flex justify-between gap-2">
                              <User
                                avatarProps={{ size: "md", src: item.poster }}
                                description={`${item.year}`}
                                name={item.media_name}
                              />
                            </div>
                          </Checkbox>
                        </ListboxItem>
                      )}
                    </Listbox>
                  </ModalBody>
                </>
              )}
            </ModalContent>
          </Modal>
        </ListboxWrapper>
      </div>
    </>
  );
};

export default Watchlist;
