"use client";
import { useRouter } from "next/navigation";
import ChooseLoginSignup from "./loginComponents/ChooseLoginSignup";

export default function Page() {
  const router = useRouter();
  return (
    <div className="m-6 rounded bg-white flex flex-grow justify-center">
      <ChooseLoginSignup
      // pressLoginHandler={() => router.push("/login/login")}
      // pressSignupHandler={() => router.push("/login/signup")}
      />
    </div>
  );
}
