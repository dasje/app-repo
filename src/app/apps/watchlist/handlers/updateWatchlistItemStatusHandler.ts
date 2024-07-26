interface UpdateWatchlistItemHandlerInterface {
  itemId: string;
  watchStatus: number;
}

export const updateWatchlistItemStatusHandler = async ({
  itemId,
  watchStatus,
}: UpdateWatchlistItemHandlerInterface) => {
  console.log(itemId);
  const res = await fetch(
    process.env.NEXT_PUBLIC_URL + "/api/watchlist/update-watchlist-item-status",
    {
      method: "POST",
      body: JSON.stringify({
        watchlistItemId: itemId,
        watchlistItemWatchStatus: watchStatus,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  if (!res.ok) {
    console.log("Error caught in updateWatchlistItemStatusHandler");
    console.log(await res.json());
    return {
      message: "error",
    };
  }
  return {
    message: "success",
  };
};
