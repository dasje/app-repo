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
  const params = useParams<{ code: string }>();
  const router = useRouter();

  const [connectionRequest, setConnectionRequest] = useState<
    UserConnectionsTable & UserTable
  >();
  const [confirmConnection, setConfirmConnection] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>();
  const [showLoginOptions, setShowLoginOptions] = useState<boolean>(false);
  const [showNotCurrentUser, setShowNotCurrentUser] = useState<boolean>(false);

  const {
    data: inviteData,
    error: inviteError,
    isLoading: inviteIsLoading,
  } = useSWR(
    `${process.env.NEXT_PUBLIC_URL}/api/friend/find-invite/${params.code}`,
    fetcher
  );

  const {
    data: userData,
    error: userError,
    isLoading: userIsLoading,
  } = useSWR(
    `${process.env.NEXT_PUBLIC_URL}/api/find-user/${
      connectionRequest ? connectionRequest.friend_email : ""
    }`,
    fetcher
  );

  useEffect(() => {
    const fetchData = async () => {
      if (inviteData && inviteData["message"].length > 0) {
        setConnectionRequest(inviteData["message"][0]);
        if (userError) {
          console.log(userError);
        } else if (userData) {
          await getUser().then((res) => {
            if (!res) {
              setShowLoginOptions(true);
            } else if (res.email === connectionRequest.friend_email) {
              // Nothing. Show request.
            } else if (res.email !== connectionRequest.friend_email) {
              setShowNotCurrentUser(true);
            } else {
              setShowLoginOptions(true);
            }
          });
        }
      }
    };
    fetchData();
  }, [inviteData, userData]);

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
      {inviteIsLoading || userIsLoading ? (
        <Loading />
      ) : (
        <div className="m-6 rounded bg-white flex flex-grow justify-center">
          {showNotCurrentUser && (
            <NotThisUser
              displayText="This invitation is not for the current logged in user. Please log out."
              isDismissable={false}
              hasCloseButton={false}
              successRedirectUrl={`${process.env.NEXT_PUBLIC_URL}/invite/${connectionRequest.invite_code}`}
            />
          )}
          {showLoginOptions && (
            <ChooseLoginSignup
              pressLoginHandler={() => {
                setShowLoginOptions(false);
              }}
              loginText="Log in to accept this friend request."
              pressSignupHandler={() => {
                setShowLoginOptions(false);
              }}
              signupText="Sign up to accept this friend request."
              successRedirectUrl={`${process.env.NEXT_PUBLIC_URL}/invite/${connectionRequest.invite_code}`}
              textToDisplay="Login or sign up to accept this friend request."
            />
          )}

          {!showLoginOptions && !showNotCurrentUser && (
            <Card>
              <CardBody>
                <div className="grid grid-cols-3 place-items-center p-6">
                  <div className="col-span-1">
                    {connectionRequest && (
                      <User name={connectionRequest.email} />
                    )}
                  </div>
                  <div className="col-span-1 ">
                    <Image
                      className="self-center"
                      src={ConnectionIcon}
                      alt="Connection image"
                      width={50}
                      height={50}
                    />
                  </div>
                  <div className="col-span-1">
                    {connectionRequest && (
                      <User name={connectionRequest.friend_email} />
                    )}
                  </div>
                </div>
              </CardBody>
              <CardFooter className="flex justify-center">
                <div className="">
                  {!errorMessage && (
                    <Button
                      onPress={() => {
                        setConfirmConnection(true);
                      }}
                      isLoading={confirmConnection}
                    >
                      Confirm connection
                    </Button>
                  )}
                  {errorMessage && <div>{errorMessage}</div>}
                </div>
              </CardFooter>
            </Card>
          )}
        </div>
      )}
    </>
  );
}
