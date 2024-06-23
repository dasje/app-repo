"use client";
import { useState } from "react";
import ChooseLoginSignup from "./ChooseLoginSignup";
import Login from "./Login";
import Signup from "../login/Signup";

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
        return <ChooseLoginSignup choose={setDisplayContent} />;
    }
  };
  return (
    <div className="m-6 rounded bg-white flex flex-grow justify-center">
      {showContent()}
    </div>
  );
}
