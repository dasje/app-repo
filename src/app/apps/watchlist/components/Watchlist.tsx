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
} from "@nextui-org/react";
import { ListboxWrapper } from "@/app/components/ListboxWrapper";
import Image from "next/image";
import deleteIcon from "@/app/lib/icons/icons8-delete-120.png";
import { WatchlistContentTable } from "@/app/database/types";
import { removeWatchlistItemHandler } from "@/app/lib/handlers/removeWatchlistItemHandler";
import { updateWatchlistItemStatusHandler } from "@/app/lib/handlers/updateWatchlistItemStatusHandler";
import WatchlistListMenuBar from "./WatchlistListMenuBar";
import AddWatchlistListItemBar from "./AddWatchlistListItemBar";

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

  useEffect(() => {
    const fetchWatchlistValues = async () => {
      await fetch(
        process.env.NEXT_PUBLIC_URL + "/api/watchlist/watchlist-items",
        {
          method: "POST",
          body: JSON.stringify({ watchlistId }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      ).then(async (res) => {
        if (res.status !== 200) {
          console.log("Error caught");
          setWatchlistContent([]);
        } else {
          const parsedRes = await res.json();
          setWatchlistContent(parsedRes.message);
          console.log("Success fetching user lists", watchlistContent);
          console.log("LIST", parsedRes);
        }
      });
    };
    fetchWatchlistValues();
  }, [fetchListValues]);

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
            {/* <div className="col-span-1"> */}
            <Button
              // className="rounded-none border border-solid flex justify-center p-4"
              onPress={onOpen}
              size="lg"
              fullWidth
              variant="ghost"
            >
              {watchlistName}
            </Button>
            {/* </div> */}
          </div>
          <Modal
            className="m-4"
            isOpen={isOpen}
            onOpenChange={() => {
              setFetchListValues(!fetchListValues);
              onOpenChange();
            }}
            backdrop="blur"
            placement="top-center"
            hideCloseButton={true}
          >
            <ModalContent>
              {(onClose) => (
                <>
                  {addContent}
                  <ListboxWrapper>
                    <Listbox
                      // topContent={addContent}
                      classNames={{
                        base: "w-full",
                        list: "max-h-[300px] overflow-scroll",
                      }}
                      items={watchlistContent}
                      label="Assigned to"
                      variant="flat"
                    >
                      {(item) => (
                        <ListboxItem key={item.id} textValue={item.media_name}>
                          <div className="flex flex-col">
                            <span className="text-tiny text-default-400 grid grid-cols-8 gap-4">
                              <Checkbox
                                className="col-span-7"
                                isSelected={item.watched === 1}
                                lineThrough={item.watched === 1}
                                onValueChange={(isSelected) => {
                                  updateWatchlistItemStatusHandler({
                                    itemId: item.id,
                                    watchStatus: isSelected ? 1 : 0,
                                  });
                                  setFetchListValues(!fetchListValues);
                                }}
                              >
                                {item.media_name}
                              </Checkbox>
                              <Image
                                onClick={() => removeListItem(item.id)}
                                className="col-span-1 justify-self-end"
                                src={deleteIcon}
                                height={20}
                                width={20}
                                alt="Delete item"
                              />
                            </span>
                          </div>
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
