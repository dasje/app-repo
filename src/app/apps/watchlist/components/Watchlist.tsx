/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { Listbox, ListboxItem } from "@nextui-org/listbox";
import { UserType } from "@/app/lib/handlers/getUser";
import { useEffect, useState } from "react";
import {
  Checkbox,
  Input,
  Button,
  Card,
  useDisclosure,
  Modal,
  ModalContent,
  User,
  Link,
} from "@nextui-org/react";
import { ListboxWrapper } from "@/app/components/ListboxWrapper";
import Image from "next/image";
import deleteIcon from "@/app/lib/icons/icons8-delete-120.png";
import searchIcon from "@/app/lib/icons/icons8-search-100.png";
import backIcon from "@/app/lib/icons/icons8-enter-90.png";
import cancelIcon from "@/app/lib/icons/icons8-cancel-100.png";
import addUserIcon from "@/app/lib/icons/icons8-add-user-100.png";
import { WatchlistContentTable } from "@/app/database/types";
import { fetchOMDBDataHandler } from "@/app/lib/handlers/fetchOMDBDataHandler";
import { OMDBResSchema } from "@/app/lib/schemas/watchlist-schemas/omdb-message-schemas";
import { removeWatchlistItemHandler } from "@/app/lib/handlers/removeWatchlistItemHandler";
import { updateWatchlistItemStatusHandler } from "@/app/lib/handlers/updateWatchlistItemStatusHandler";

interface Watchlist {
  user: UserType;
  watchlistName: string;
  watchlistId: string;
}

const Watchlist = ({ user, watchlistName, watchlistId }: Watchlist) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [fetchListValues, setFetchListValues] = useState<boolean>(false);
  const [watchlistContent, setWatchlistContent] = useState<
    WatchlistContentTable[]
  >([]);
  const [showSearchBox, setShowSearchBox] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>("");
  const [omdbRes, setOmdbRes] = useState<OMDBResSchema | null>();
  const [displayOmdbRes, setDisplayOmdbRes] = useState<boolean>(false);
  const [submitNewListItem, setSubmitNewListItem] = useState<boolean>(false);

  useEffect(() => {
    const submitListAddition = async () => {
      let item;
      if (omdbRes) {
        item = {
          watchlistId: watchlistId,
          userEmail: user.email,
          mediaName: omdbRes.Title,
          year: omdbRes.Year,
          rated: omdbRes.Rated,
          released: omdbRes.Released,
          runtime: omdbRes.Runtime,
          genre: omdbRes.Genre,
          director: omdbRes.Director,
          writer: omdbRes.Writer,
          plot: omdbRes.Plot,
          language: omdbRes.Language,
          country: omdbRes.Country,
          awards: omdbRes.Awards,
          poster: omdbRes.Poster,
          imdbId: omdbRes.imdbID,
        };
        await fetch(
          process.env.NEXT_PUBLIC_URL + "/api/watchlist/add-watchlist-item",
          {
            method: "POST",
            body: JSON.stringify(item),
            headers: {
              "Content-Type": "application/json",
            },
          }
        ).then(async (res) => {
          if (res.status !== 201) {
            console.log("Error caught");
            //   setWatchlistContent([]);
          } else {
            const parsedRes = await res.json();
            setFetchListValues(!fetchListValues);
            console.log("Success fetching user lists", watchlistContent);
            console.log("LIST", parsedRes);
          }
        });
      }
    };
    submitListAddition();
  }, [submitNewListItem]);

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
          setSearchValue("");
          setSearchForTitle(false);
          console.log("Success fetching user lists", watchlistContent);
          console.log("LIST", parsedRes);
        }
      });
    };
    fetchWatchlistValues();
  }, [fetchListValues]);

  const [searchForTitle, setSearchForTitle] = useState<boolean>(false);

  useEffect(() => {
    if (searchValue.length === 0) {
    } else if (searchForTitle) {
      const fetchTitle = async () => {
        const res = await fetchOMDBDataHandler({ mediaName: searchValue });
        // TODO: Handle res.msg === "error"
        if (res.msg === "error") {
        } else if (res.msg === "success") {
          console.log("Fetched title ", res);
          setOmdbRes(res.data);
        }
      };
      fetchTitle();
    }
  }, [searchForTitle]);

  const cancelSearch = () => {
    setSearchValue("");
    setOmdbRes(null);
    setSearchForTitle(false);
  };

  const addContent = (
    <>
      {!showSearchBox && (
        <div className="grid grid-cols-8 p-4 space-x-2">
          <div className="flex flex-grow col-span-5">
            <Button onPress={() => setShowSearchBox(!showSearchBox)}>
              Add show or movie
            </Button>
          </div>
          <div className="col-span-1 self-center space-x-2">
            <Button isIconOnly onPress={() => {}}>
              <Image
                src={addUserIcon}
                alt="Delete list"
                height={15}
                width={15}
              />
            </Button>
          </div>
          <div className="col-span-1 self-center  space-x-2">
            <Button isIconOnly onPress={() => {}}>
              <Image
                src={deleteIcon}
                alt="Delete list"
                height={15}
                width={15}
              />
            </Button>
          </div>
          <div className="col-span-1 self-center">
            <Button isIconOnly onPress={() => onOpenChange()}>
              <Image src={backIcon} alt="Delete list" height={15} width={15} />
            </Button>
          </div>
        </div>
      )}
      {showSearchBox && (
        <Card>
          <div className="grid grid-cols-8 pl-2 pr-2 pt-2 space-x-2">
            <Input
              className="flex flex-grow col-span-6"
              type="text"
              label="Show/Film"
              placeholder="Enter a film or TV show"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              isDisabled={searchForTitle}
              color={omdbRes ? "success" : "default"}
            />
            <Button
              className="col-span-1 self-center m-2"
              isIconOnly
              color="primary"
              aria-label="add"
              onPress={() => setSearchForTitle(!searchForTitle)}
              isLoading={searchForTitle}
            >
              <Image
                src={searchIcon}
                alt="Add item to list."
                width={20}
                height={20}
              />
            </Button>
            <Button
              className="col-span-1 self-center m-2"
              isIconOnly
              color="primary"
              aria-label="add"
              onPress={() => {
                if (searchForTitle) {
                  cancelSearch();
                } else {
                  setShowSearchBox(!showSearchBox);
                }
              }}
            >
              <Image
                src={searchForTitle ? cancelIcon : backIcon}
                alt="Back icon."
                width={20}
                height={20}
              />
            </Button>
          </div>
          {omdbRes && searchForTitle && (
            <div className="flex flex-grow pl-2 pr-2 pb-2 m-4 bg-yellow-100 bg-opacity-50">
              <Link onPress={() => setSubmitNewListItem(!submitNewListItem)}>
                <User
                  name={omdbRes.Title}
                  description={omdbRes.Year}
                  avatarProps={{
                    src: `${omdbRes.Poster}`,
                  }}
                />
              </Link>
            </div>
          )}
        </Card>
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
