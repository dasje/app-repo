/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { UserConnectionsTable, UserTable } from "@/app/database/types";
import { fetcher } from "@/app/lib/handlers/swrFetcher";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import useSWR from "swr";
import ConnectionIcon from "@/app/lib/icons/icons8-connection-96.png";
import Image from "next/image";
import { Button, Card, CardBody, CardFooter, User } from "@nextui-org/react";
import { getUser } from "@/app/lib/handlers/auth_handlers/getUser";
import ChooseLoginSignup from "@/app/login/loginComponents/ChooseLoginSignup";
import NotThisUser from "@/app/login/loginComponents/NotThisUser";
import Loading from "@/app/apps/loading";

export default function Page() {
  const params = useParams<{ reset_code: string }>();
  const router = useRouter();

  const [connectionRequest, setConnectionRequest] = useState<
    UserConnectionsTable & UserTable
  >();
  const [confirmConnection, setConfirmConnection] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>();
  const [showLoginOptions, setShowLoginOptions] = useState<boolean>(false);
  const [showNotCurrentUser, setShowNotCurrentUser] = useState<boolean>(false);

  const {
    data: resetData,
    error: resetError,
    isLoading: resetIsLoading,
  } = useSWR(
    `${process.env.NEXT_PUBLIC_URL}/api/register/forgot-password/${params.reset_code}`,
    fetcher
  );

  //   useEffect(() => {
  //     const fetchData = async () => {

  //     };
  //     fetchData();
  //   }, []);

  useEffect(() => {
    const confirm = async () => {
      const updateConnectionBody = {
        userEmail: connectionRequest.email,
        friendEmail: connectionRequest.friend_email,
        inviteCode: connectionRequest.invite_code,
        connectionDate: Date(),
        connected: 1,
      };
      await fetch(
        process.env.NEXT_PUBLIC_URL + "/api/friend/update-connection",
        {
          method: "POST",
          body: JSON.stringify(updateConnectionBody),
          headers: {
            "Content-Type": "application/json",
          },
        }
      ).then((res) => {
        if (res.status === 409) {
          setErrorMessage("Friendship connection already made");
        } else if (res.status === 201) {
          router.push("/apps");
        }
        setConfirmConnection(false);
      });
    };
    confirmConnection && confirm();
  }, [confirmConnection]);

  return (
    <>
      {resetIsLoading ? (
        <Loading />
      ) : (
        <div className="m-6 rounded bg-white flex flex-grow justify-center"></div>
      )}
    </>
  );
}
