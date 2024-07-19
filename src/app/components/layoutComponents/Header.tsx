/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/navbar";
import { Button } from "@nextui-org/react";
import Link from "next/link";
import Logo from "@/app/lib/images/badger-logo.jpg";
import Image from "next/image";
import { useState } from "react";
import { UserType } from "@/app/lib/handlers/auth_handlers/getUser";
import { Session } from "next-auth";
import Login from "@/app/login/loginComponents/Login";
import Signup from "@/app/login/loginComponents/Signup";
import { signOut } from "next-auth/react";

interface HeaderInterface {
  session: Session;
}
const Header = ({ session }: HeaderInterface) => {
  const user: UserType = session?.user;
  //   const [initiateLogout, setInitiateLogout] = useState<boolean>(false);

  const [showLogin, setShowLogin] = useState<boolean>(false);

  //   useEffect(() => {
  // const logoutAction = async () => {
  //   await signOut({ redirectTo: "/apps", redirect: true });
  //   //   window.location.reload();
  // };
  // initiateLogout && logoutAction();
  //   }, [initiateLogout]);

  return (
    <>
      {showLogin && <Login isDismissable={true} hasCloseButton={true} />}
      <Navbar position="static">
        <NavbarBrand className="gap-4">
          <Link href="/apps">
            <Image src={Logo} alt="badger-logo" width={50} height={50} />
          </Link>
          <p className="font-bold text-inherit">Badger Apps</p>
        </NavbarBrand>
        <NavbarContent className="hidden sm:flex gap-4" justify="center">
          <NavbarItem>
            <Link href={user ? "/apps" : "/"} aria-current="page">
              Home
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link color="foreground" href="/apps/watchlist">
              Watchlist
            </Link>
          </NavbarItem>
        </NavbarContent>
        <NavbarContent justify="end">
          {!user && (
            <>
              <NavbarItem className="lg:flex">
                <Login isDismissable={true} hasCloseButton={true} />
              </NavbarItem>
              <NavbarItem>
                <Signup isDismissable={true} hasCloseButton={true} />
              </NavbarItem>
            </>
          )}
          {user && (
            <>
              <NavbarItem>
                <Button
                  type="submit"
                  color="primary"
                  variant="flat"
                  onPress={() => signOut()}
                >
                  Sign Out
                </Button>
              </NavbarItem>
            </>
          )}
        </NavbarContent>
      </Navbar>
    </>
  );
};
export default Header;
