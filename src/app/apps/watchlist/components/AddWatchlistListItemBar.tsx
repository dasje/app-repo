/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { UserType } from "@/app/lib/handlers/auth_handlers/getUser";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import {
  Input,
  Button,
  Card,
  User,
  Listbox,
  ListboxItem,
} from "@nextui-org/react";
import Image from "next/image";
import searchIcon from "@/app/lib/icons/icons8-search-100.png";
import backIcon from "@/app/lib/icons/icons8-enter-90.png";
import cancelIcon from "@/app/lib/icons/icons8-cancel-100.png";
import { OMDBResItem } from "@/app/lib/schemas/watchlist-schemas/omdb-message-schemas";
import { fetchOMDBDataHandler } from "../handlers/fetchOMDBDataHandler";
import { removeWatchlistItemHandler } from "../handlers/removeWatchlistItemHandler";
import { WatchlistContentTable } from "@/app/database/types";

interface AddWatchlistListItemBarInterface {
  user: UserType;
  watchlistId: string;
  fetchListValues: boolean;
  setFetchListValues: Dispatch<SetStateAction<boolean>>;
  showSearchBox: boolean;
  setShowSearchBox: Dispatch<SetStateAction<boolean>>;
  watchlistContent?: WatchlistContentTable[];
  setWatchlistContent?: Dispatch<SetStateAction<WatchlistContentTable[]>>;
}

const AddWatchlistListItemBar = ({
  user,
  watchlistId,
  fetchListValues,
  setFetchListValues,
  showSearchBox,
  setShowSearchBox,
  watchlistContent,
  setWatchlistContent,
}: AddWatchlistListItemBarInterface) => {
  const [searchValue, setSearchValue] = useState<string>("");
  const [omdbRes, setOmdbRes] = useState<OMDBResItem[] | null>();
  const [submitNewListItem, setSubmitNewListItem] = useState<
    OMDBResItem | undefined
  >();
  const [searchForTitle, setSearchForTitle] = useState<boolean>(false);

  useEffect(() => {
    const submitListAddition = async () => {
      let item;
      if (omdbRes) {
        if (user.email === "dummy") {
          const newDummyItem: WatchlistContentTable = {
            id: (watchlistContent.length + 1).toString(),
            user_id: "dummy",
            watchlist_id: watchlistId,
            watched: 0,
            media_name: submitNewListItem.Title,
            year: submitNewListItem.Year,
            poster: submitNewListItem.Poster,
            imdb_id: submitNewListItem.imdbID,
          };
          setWatchlistContent([...watchlistContent, newDummyItem]);
          setFetchListValues(!fetchListValues);
          // setSearchValue("");
          // setOmdbRes(undefined);
          // setSearchForTitle(!searchForTitle);
          setSubmitNewListItem(undefined);
        } else {
          item = {
            watchlistId: watchlistId,
            userEmail: user.email,
            mediaName: submitNewListItem.Title,
            year: submitNewListItem.Year,
            //   rated: submitNewListItem.Rated,
            //   released: submitNewListItem.Released,
            //   runtime: submitNewListItem.Runtime,
            //   genre: submitNewListItem.Genre,
            //   director: submitNewListItem.Director,
            //   writer: submitNewListItem.Writer,
            //   plot: submitNewListItem.Plot,
            //   language: submitNewListItem.Language,
            //   country: submitNewListItem.Country,
            //   awards: submitNewListItem.Awards,
            poster: submitNewListItem.Poster,
            imdbId: submitNewListItem.imdbID,
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
            } else {
              setFetchListValues(!fetchListValues);
              // setSearchValue("");
              // setOmdbRes(undefined);
              // setSearchForTitle(!searchForTitle);
              setSubmitNewListItem(undefined);
            }
          });
        }
      }
    };
    submitNewListItem && submitListAddition();
  }, [submitNewListItem]);

  useEffect(() => {
    if (searchValue.length === 0) {
    } else if (searchForTitle) {
      const fetchTitle = async () => {
        const res = await fetchOMDBDataHandler({ mediaName: searchValue });
        // TODO: Handle res.msg === "error"
        if (res.msg === "error") {
        } else if (res.msg === "success") {
          console.log("Fetched title ", res);
          setOmdbRes(res.data.Search);
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

  const removeListItem = (itemId: string) => {
    removeWatchlistItemHandler({ itemId }).then(
      (res) => res.message === "success" && setFetchListValues(!fetchListValues)
    );
  };

  return (
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
        <Listbox
          className="max-h-[200px] overflow-y-scroll scrolling-touch"
          onAction={(key) => {
            console.log(omdbRes[key]);
            setSubmitNewListItem(omdbRes[key]);
          }}
        >
          {omdbRes.map((i, k) => (
            <ListboxItem
              key={k}
              className="flex flex-grow pl-2 pr-2 m-0 bg-yellow-100 bg-opacity-50"
            >
              {/* <Link onPress={() => setSubmitNewListItem(i)}> */}
              <User
                name={i.Title}
                description={i.Year}
                avatarProps={{
                  src: `${i.Poster}`,
                }}
              />
              {/* </Link> */}
            </ListboxItem>
          ))}
        </Listbox>
      )}
    </Card>
  );
};

export default AddWatchlistListItemBar;
