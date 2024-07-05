/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { redirect, useRouter } from "next/navigation";
import { Listbox, ListboxSection, ListboxItem } from "@nextui-org/listbox";
import { UserType, getUser } from "@/app/lib/handlers/getUser";
import { useEffect, useMemo, useState } from "react";
import {
  Avatar,
  Checkbox,
  Chip,
  Input,
  ScrollShadow,
  Dropdown,
  DropdownItem,
  DropdownTrigger,
  DropdownMenu,
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Card,
} from "@nextui-org/react";
import { ListboxWrapper } from "@/app/components/ListboxWrapper";
import Image from "next/image";
import deleteIcon from "@/app/lib/icons/icons8-delete-120.png";
import searchIcon from "@/app/lib/icons/icons8-search-100.png";
import { WatchlistContentTable } from "@/app/database/types";
import { fetchOMDBDataHandler } from "@/app/lib/handlers/fetchOMDBDataHandler";
import { OMDBResSchema } from "@/app/lib/schemas/watchlist-schemas/omdb-message-schemas";
import { removeWatchlistItemHandler } from "@/app/lib/handlers/removeWatchlistItemHandler";

interface Watchlist {
  user: UserType;
  watchlistName: string;
  watchlistId: string;
}

const Watchlist = ({ user, watchlistName, watchlistId }: Watchlist) => {
  const router = useRouter();
  const [fetchListValues, setFetchListValues] = useState<boolean>(false);
  const [watchlistContent, setWatchlistContent] = useState<
    WatchlistContentTable[]
  >([]);
  const [showSearchBox, setShowSearchBox] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>("");
  const [omdbRes, setOmdbRes] = useState<OMDBResSchema>();
  const [displayOmdbRes, setDisplayOmdbRes] = useState<boolean>(false);

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

  const [searchForTitle, setSearchForTitle] = useState<boolean>(false);

  useEffect(() => {
    if (searchValue.length === 0) {
    } else {
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

  useEffect(() => {
    setDisplayOmdbRes(!displayOmdbRes);
  }, [omdbRes]);

  const addContent = (
    <>
      {!showSearchBox && (
        <div className=" grid grid-cols-5 space-x-4">
          <div className="col-span-4">
            <Button onPress={() => setShowSearchBox(!showSearchBox)}>
              Add show or movie
            </Button>
          </div>
          <div className="col-span-1">
            <Button isIconOnly onPress={() => setShowSearchBox(!showSearchBox)}>
              <Image
                src={deleteIcon}
                alt="Delete list"
                height={15}
                width={15}
              />
            </Button>
          </div>
        </div>
      )}
      {showSearchBox && (
        <Card>
          <div className="grid grid-cols-5 space-x-4">
            <Input
              className="flex flex-grow col-span-4"
              type="text"
              label="Show/Film"
              placeholder="Enter a film or TV show"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
            <Button
              className="col-span-1 self-center"
              isIconOnly
              color="primary"
              aria-label="add"
              onPress={() => setSearchForTitle(!searchForTitle)}
            >
              <Image
                src={searchIcon}
                alt="Add item to list."
                width={20}
                height={20}
              />
            </Button>
          </div>
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
          <Dropdown
            className=""
            onOpenChange={() => setFetchListValues(!fetchListValues)}
            backdrop="blur"
          >
            <DropdownTrigger>
              <div className="rounded-none border border-solid flex justify-center p-4">
                {watchlistName}
              </div>
            </DropdownTrigger>

            <DropdownMenu closeOnSelect={false}>
              <DropdownItem>
                {addContent}
                {/* <Popover
                  placement="bottom"
                  backdrop="blur"
                  isOpen={displayOmdbRes}
                >
                  <PopoverTrigger>
                    <div></div>
                  </PopoverTrigger>
                  <PopoverContent>
                    <div className="grid grid-cols-5 space-x-4">
                      {omdbRes && omdbRes.Title}
                    </div>
                  </PopoverContent>
                </Popover> */}
              </DropdownItem>
              <DropdownItem>
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
                              defaultSelected
                              lineThrough={item.watched === 1}
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
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </ListboxWrapper>
      </div>
    </>
  );
};

export default Watchlist;
