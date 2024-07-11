/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { Listbox, ListboxItem } from "@nextui-org/listbox";
import { UserType } from "@/app/lib/handlers/getUser";
import { useEffect, useState } from "react";
import {
  Checkbox,
  Button,
  useDisclosure,
  Modal,
  ModalContent,
  User,
} from "@nextui-org/react";
import { ListboxWrapper } from "@/app/components/ListboxWrapper";
import Image from "next/image";
import deleteIcon from "@/app/lib/icons/icons8-delete-120.png";
import { WatchlistContentTable } from "@/app/database/types";
import { removeWatchlistItemHandler } from "@/app/lib/handlers/removeWatchlistItemHandler";
import { updateWatchlistItemStatusHandler } from "@/app/lib/handlers/updateWatchlistItemStatusHandler";
import WatchlistListMenuBar from "./WatchlistListMenuBar";
import AddWatchlistListItemBar from "./AddWatchlistListItemBar";
import { useWatchlistItems } from "@/app/lib/handlers/useWatchlistItems";
import useSWR, { useSWRConfig } from "swr";
import { fetcher } from "@/app/lib/handlers/swrFetcher";

interface WatchlistInterface {
  user: UserType;
  watchlistName: string;
  watchlistId: string;
  deleteWatchlist: (watchlistId: string) => void;
}

const Watchlist = ({
  user,
  watchlistName,
  watchlistId,
  deleteWatchlist,
}: WatchlistInterface) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [fetchListValues, setFetchListValues] = useState<boolean>(false);
  const [watchlistContent, setWatchlistContent] = useState<
    WatchlistContentTable[]
  >([]);
  const [showSearchBox, setShowSearchBox] = useState<boolean>(false);

  const { mutate } = useSWRConfig();

  const { data, error, isLoading } = useSWR(
    `${process.env.NEXT_PUBLIC_URL}/api/watchlist/watchlist-items/${watchlistId}`,
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
        />
      )}
    </>
  );

  const removeListItem = (itemId: string) => {
    removeWatchlistItemHandler({ itemId }).then(
      (res) => res.message === "success" && setFetchListValues(!fetchListValues)
    );
  };

  return (
    <>
      <div className="m-6 rounded bg-white flex flex-grow justify-center">
        <ListboxWrapper>
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
          >
            <ModalContent>
              {(onClose) => (
                <>
                  {addContent}
                  <ListboxWrapper>
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
                              updateWatchlistItemStatusHandler({
                                itemId: item.id,
                                watchStatus: isSelected ? 1 : 0,
                              });
                              mutate(
                                `${process.env.NEXT_PUBLIC_URL}/api/watchlist/watchlist-items/${watchlistId}`
                              );
                            }}
                          >
                            <div className="w-full flex justify-between gap-2">
                              <User
                                avatarProps={{ size: "md", src: item.poster }}
                                description={`${item.year} - ${item.runtime}`}
                                name={item.media_name}
                              />
                            </div>
                          </Checkbox>
                        </ListboxItem>
                      )}
                    </Listbox>
                  </ListboxWrapper>
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
