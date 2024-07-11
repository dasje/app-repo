/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { Dispatch, SetStateAction } from "react";
import { Button } from "@nextui-org/react";
import Image from "next/image";
import deleteIcon from "@/app/lib/icons/icons8-delete-120.png";
import backIcon from "@/app/lib/icons/icons8-enter-90.png";
import addUserIcon from "@/app/lib/icons/icons8-add-user-100.png";

interface WatchlistListMenuBarInterface {
  onOpenChange: () => void;
  showSearchBox: boolean;
  setShowSearchBox: Dispatch<SetStateAction<boolean>>;
  deleteTrigger: (watchlistId: string) => void;
  watchlistId: string;
}

const WatchlistListMenuBar = ({
  onOpenChange,
  showSearchBox,
  setShowSearchBox,
  deleteTrigger,
  watchlistId,
}: WatchlistListMenuBarInterface) => {
  return (
    <div className="grid grid-cols-8 md:grid-cols-12 p-4 space-x-2">
      <div className="flex flex-grow col-span-5 md:col-span-9">
        <Button onPress={() => setShowSearchBox(!showSearchBox)} size="sm">
          Add show or movie
        </Button>
      </div>
      <div className="col-span-1 self-center space-x-2">
        <Button isIconOnly onPress={() => {}} size="sm">
          <Image
            src={addUserIcon}
            alt="Add user button"
            height={15}
            width={15}
          />
        </Button>
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
