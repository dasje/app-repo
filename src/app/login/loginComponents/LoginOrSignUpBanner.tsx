/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { Navbar, NavbarContent, NavbarItem } from "@nextui-org/navbar";
import Signup from "@/app/login/loginComponents/Signup";

interface LoginOrSignUpBannerInterface {
  textToDisplay?: string;
}
const LoginOrSignUpBanner = ({
  textToDisplay,
}: LoginOrSignUpBannerInterface) => {
  return (
    <>
      <Navbar className="border-solid border bg-gray-50" position="static">
        <NavbarContent className="hidden sm:flex gap-4" justify="center">
          <NavbarItem>
            <div className="text-center">
              {textToDisplay
                ? textToDisplay
                : "If you like this demo, sign up here to use."}
            </div>
          </NavbarItem>
          <NavbarItem>
            <Signup isDismissable={true} hasCloseButton={true} />
          </NavbarItem>
        </NavbarContent>
      </Navbar>
    </>
  );
};
export default LoginOrSignUpBanner;
