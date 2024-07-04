/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { redirect } from "next/navigation";
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
} from "@nextui-org/react";
import { ListboxWrapper } from "@/app/components/ListboxWrapper";
import Image from "next/image";
import deleteIcon from "@/app/lib/icons/icons8-delete-120.png";
import { WatchlistContentTable } from "@/app/database/types";

interface Watchlist {
  user: UserType;
  watchlistName: string;
  watchlistId: string;
}

const Watchlist = ({ user, watchlistName, watchlistId }: Watchlist) => {
  const [fetchListValues, setFetchListValues] = useState<boolean>(false);
  const [watchlistContent, setWatchlistContent] = useState<
    WatchlistContentTable[]
  >([]);
  const [values, setValues] = useState(new Set([]));

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

  const arrayValues = Array.from(values);

  const topContent = useMemo(() => {
    if (!arrayValues.length) {
      return null;
    }
    return (
      <ScrollShadow
        hideScrollBar
        className="w-full flex py-0.5 px-2 gap-1"
        orientation="horizontal"
      >
        {arrayValues.map((value) => (
          <Chip key={value}>
            {
              watchlistContent.find((show) => `${show.id}` === `${show.id}`)
                .media_name
            }
            {/* Chip */}
          </Chip>
        ))}
      </ScrollShadow>
    );
  }, [arrayValues.length]);

  const addContent = useMemo(() => {
    return (
      <Input
        className="flex flex-grow"
        type="text"
        label="Item"
        placeholder="Enter a film or TV show"
      />
    );
  }, [arrayValues.length]);

  const removeListItem = (itemId: string) => {
    removeWatchlistItemHandler({ itemId });
  };
  return (
    <>
      <div className="m-6 rounded bg-white flex flex-grow justify-center">
        <ListboxWrapper>
          <Dropdown
            className=""
            onOpenChange={() => setFetchListValues(!fetchListValues)}
          >
            <DropdownTrigger>
              <div className="rounded-none border border-solid flex justify-center p-4">
                {watchlistName}
              </div>
            </DropdownTrigger>
            <DropdownMenu closeOnSelect={false}>
              <DropdownItem>
                <ListboxWrapper>
                  <Listbox
                    topContent={addContent}
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
