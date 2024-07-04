interface RemoveWatchlistItemHandlerInterface {
  itemId: string;
}

const removeWatchlistItemHandler = async ({
  itemId,
}: RemoveWatchlistItemHandlerInterface) => {
  const res = await fetch(
    process.env.NEXT_PUBLIC_URL + "/api/remove-watchlist-item",
    {
      method: "POST",
      body: JSON.stringify({ watchlistItemId: itemId }),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  if (!res.ok) {
    console.log("Error caught in fetchUserApps");
    console.log(await res.json());
    return {
      message: "error",
    };
  }
  return {
    message: "success",
  };
};
