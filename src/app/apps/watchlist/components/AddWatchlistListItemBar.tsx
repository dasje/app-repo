/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { UserType } from "@/app/lib/handlers/auth_handlers/getUser";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Input, Button, Card, User, Link } from "@nextui-org/react";
import Image from "next/image";
import searchIcon from "@/app/lib/icons/icons8-search-100.png";
import backIcon from "@/app/lib/icons/icons8-enter-90.png";
import cancelIcon from "@/app/lib/icons/icons8-cancel-100.png";
import { fetchOMDBDataHandler } from "@/app/lib/handlers/watchlist_handlers/fetchOMDBDataHandler";
import { OMDBResSchema } from "@/app/lib/schemas/watchlist-schemas/omdb-message-schemas";
import { removeWatchlistItemHandler } from "@/app/lib/handlers/watchlist_handlers/removeWatchlistItemHandler";

interface AddWatchlistListItemBarInterface {
  user: UserType;
  watchlistId: string;
  fetchListValues: boolean;
  setFetchListValues: Dispatch<SetStateAction<boolean>>;
  showSearchBox: boolean;
  setShowSearchBox: Dispatch<SetStateAction<boolean>>;
}

const AddWatchlistListItemBar = ({
  user,
  watchlistId,
  fetchListValues,
  setFetchListValues,
  showSearchBox,
  setShowSearchBox,
}: AddWatchlistListItemBarInterface) => {
  const [searchValue, setSearchValue] = useState<string>("");
  const [omdbRes, setOmdbRes] = useState<OMDBResSchema | null>();
  const [submitNewListItem, setSubmitNewListItem] = useState<boolean>(false);
  const [searchForTitle, setSearchForTitle] = useState<boolean>(false);

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
          } else {
            setFetchListValues(!fetchListValues);
            setSearchValue("");
            setOmdbRes(undefined);
            setSearchForTitle(!searchForTitle);
          }
        });
      }
    };
    submitListAddition();
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
  );
};

export default AddWatchlistListItemBar;
