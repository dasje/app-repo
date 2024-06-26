"use client";
import { useState } from "react";
import ChooseLoginSignup from "@/app/login/loginComponents/ChooseLoginSignup";
import Login from "@/app/login/loginComponents/Login";
import Signup from "@/app/login/loginComponents/Signup";

interface LoginOptionsInterface {
  choose: "login" | "signup" | "choose";
}
export default function LoginOptions({ choose }: LoginOptionsInterface) {
  const [displayContent, setDisplayContent] = useState<
    "signup" | "login" | "choose"
  >(choose);
  const showContent = () => {
    switch (displayContent) {
      case "signup":
        return <Signup />;
      case "login":
        return <Login />;
      default:
        return <ChooseLoginSignup />;
    }
  };
  return (
    <div className="m-6 rounded bg-white flex flex-grow justify-center">
      {showContent()}
    </div>
  );
}
