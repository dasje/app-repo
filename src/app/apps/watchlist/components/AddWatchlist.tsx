"use client";

import Image from "next/image";
import addIcon from "@/app/lib/icons/icons8-add-100.png";
import addIconOutline from "@/app/lib/icons/icons8-add-100-outline.png";
import { Dispatch, SetStateAction, useState } from "react";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/react";
import { UserType } from "@/app/lib/handlers/auth_handlers/getUser";
import { useRouter } from "next/navigation";
import { ListboxWrapper } from "@/app/components/layoutComponents/ListboxWrapper";
import { watchlistResponse, watchlistType } from "../schemas/watchlistResponse";

interface AddWatchlistInterface {
  user: UserType;
  dummyList?: watchlistResponse;
  setDummyList?: Dispatch<SetStateAction<watchlistResponse>>;
}

const AddWatchlist = ({
  user,
  dummyList,
  setDummyList,
}: AddWatchlistInterface) => {
  const router = useRouter();
  const [showCover, setShowCover] = useState<boolean>(true);
  const [onHoverIcon, setOnHoverIcon] = useState<boolean>(false);
  const [newListName, setNewListName] = useState<string>("");

  const handleAddButton = async () => {
    let x;
    try {
      if (user.email === "dummy") {
        const newDummyList: watchlistType = {
          id: (dummyList.length + 1).toString(),
          watchlist_id: (dummyList.length + 1).toString(),
          user_id: "dummy",
          name: newListName,
          created_at: Date(),
          created_by: "dummy",
          role: "owner",
        };
        setDummyList([...dummyList, newDummyList]);
      } else {
        const formData = { watchlistName: newListName, userEmail: user.email };

        x = await fetch(
          process.env.NEXT_PUBLIC_URL + "/api/watchlist/add-new-watchlist",
          {
            method: "POST",
            body: JSON.stringify(formData),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
      }
    } catch (error: any) {
      console.log(error);
    } finally {
      handleCancelAddButton();
      router.refresh();
      console.log("ADDED", x);
    }
  };

  const handleCancelAddButton = () => {
    setNewListName("");
    setShowCover(!showCover);
  };

  return (
    <div>
      {showCover ? (
        <div className="m-6 rounded bg-white flex flex-grow justify-center">
          <div className="font-bold text-3xl text-center grid-cols-4"></div>
          <ListboxWrapper>
            <div className="rounded-none border border-solid flex justify-center p-4">
              <div className="col-span-1">
                <Image
                  src={onHoverIcon ? addIcon : addIconOutline}
                  alt="Add new watch list"
                  onClick={() => setShowCover(!showCover)}
                  onMouseEnter={() => setOnHoverIcon(!onHoverIcon)}
                  onMouseLeave={() => setOnHoverIcon(!onHoverIcon)}
                  width={40}
                  height={40}
                />
              </div>
            </div>
          </ListboxWrapper>
        </div>
      ) : (
        <div className="m-6 rounded bg-white flex flex-grow justify-center">
          <div className="font-bold text-3xl text-center grid-cols-4"></div>
          <ListboxWrapper>
            <div className="rounded-none border border-solid flex justify-center p-4">
              <div className="space-y-4 flex-grow">
                <div className="">New list</div>
                <Input
                  type="text"
                  label="New list name"
                  placeholder="Enter a name for your list"
                  value={newListName}
                  onValueChange={(e) => setNewListName(e)}
                />
                <div className="space-x-4">
                  <Button onPress={handleAddButton}>Add</Button>
                  <Button onPress={handleCancelAddButton}>Cancel</Button>
                </div>
              </div>
            </div>
          </ListboxWrapper>
        </div>
      )}
    </div>
  );
};

export default AddWatchlist;
