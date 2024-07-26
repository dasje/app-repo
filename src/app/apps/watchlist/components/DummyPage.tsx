"use client";

import { useState } from "react";
import AddWatchlist from "./AddWatchlist";
import AvailableWatchlists from "./AvailableWatchlists";
import { watchlistResponse } from "../schemas/watchlistResponse";

const DummyPage = () => {
  const [dummyLists, setDummyLists] = useState<watchlistResponse>([]);
  return (
    <>
      <AddWatchlist
        user={{ name: "dummy", email: "dummy" }}
        dummyList={dummyLists}
        setDummyList={setDummyLists}
      />
      <AvailableWatchlists
        currentUser={{ name: "dummy", email: "dummy" }}
        dummyList={dummyLists}
        setDummyList={setDummyLists}
      />
    </>
  );
};

export default DummyPage;
