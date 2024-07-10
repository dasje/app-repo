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
}

const WatchlistListMenuBar = ({
  onOpenChange,
  showSearchBox,
  setShowSearchBox,
}: WatchlistListMenuBarInterface) => {
  return (
    <div className="grid grid-cols-8 p-4 space-x-2">
      <div className="flex flex-grow col-span-5">
        <Button onPress={() => setShowSearchBox(!showSearchBox)}>
          Add show or movie
        </Button>
      </div>
      <div className="col-span-1 self-center space-x-2">
        <Button isIconOnly onPress={() => {}}>
          <Image src={addUserIcon} alt="Delete list" height={15} width={15} />
        </Button>
      </div>
      <div className="col-span-1 self-center  space-x-2">
        <Button isIconOnly onPress={() => {}}>
          <Image src={deleteIcon} alt="Delete list" height={15} width={15} />
        </Button>
      </div>
      <div className="col-span-1 self-center">
        <Button isIconOnly onPress={onOpenChange}>
          <Image src={backIcon} alt="Delete list" height={15} width={15} />
        </Button>
      </div>
    </div>
  );
};

export default WatchlistListMenuBar;
