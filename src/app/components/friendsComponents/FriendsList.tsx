/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import useSWR, { useSWRConfig } from "swr";
import { fetcher } from "@/app/lib/handlers/swrFetcher";
import { useEffect, useState } from "react";
import { UserType } from "@/app/lib/handlers/getUser";
import { UserConnectionsTable, UserTable } from "@/app/database/types";
import { AppBoxWrapper } from "../layoutComponents/AppBoxWrapper";
import GhostDashboardCard from "../GhostDashboardCard";

interface FriendsListInterface {
  user: UserType;
}

type friendsDataType = UserTable & UserConnectionsTable;

const FriendsList = ({ user }: FriendsListInterface) => {
  const [friends, setFriends] = useState<friendsDataType[]>();
  const [displayError, setDisplayError] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);
  const { mutate } = useSWRConfig();

  const { data, error, isLoading } = useSWR(
    `${process.env.NEXT_PUBLIC_URL}/api/friend/find-friends/${user.email}`,
    fetcher
    // { refreshInterval: 500 }
  );

  useEffect(() => {
    data && setFriends(data["message"]);
    console.log(data);
    error && setDisplayError(error);
  }, [data, error, isLoading]);

  return (
    <AppBoxWrapper>
      {friends && friends.length > 0 ? (
        <>
          <div>
            {friends && friends.map((i, k) => <div key={k}>{i.email}</div>)}
          </div>
          <div>{isLoading && <div>Loading...</div>}</div>
        </>
      ) : (
        <GhostDashboardCard
          byline="So many no friends! Find a friend here."
          image="https://i.postimg.cc/7Z8MfCJF/badger-dummy-friends.png"
          imageAlt="Badger friends"
          buttonText="Add a friend"
          buttonLink="/"
        />
      )}
    </AppBoxWrapper>
  );
};
export default FriendsList;
