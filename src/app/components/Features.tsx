"use client";

import { Button } from "@nextui-org/react";
import Image from "next/image";
import Badger from "@/app/lib/images/badger-logo.jpg";
import HilariousIcon from "@/app/lib/icons/icons8-rolling-eyes-for-anything-strange-happening-emoji-96.png";
import { useRouter } from "next/navigation";

export const Features = () => {
  const router = useRouter();
  return (
    <>
      <div className="grid md:grid-cols-2 grid-cols-1 gap-4 place-content-center max-w-[850px] md:mt-[50px]">
        <div className="pt-4 flex flex-col gap-6">
          <span className="max-w-[400px] flex-row font-bold text-xl">
            Welcome to the home of Next.js application demos for apps built by
            Ben Sweeney
          </span>

          <span className="max-w-[400px] text-lg">
            Click on the application tabs to use demos with non-persistent data.
            If you wish to use the applications, and share access with friends,
            you can sign up and/or log in.
          </span>

          <div className="gap-4 pt-4 flex-wrap">
            <Button onPress={() => router.push("/login")}>Start here</Button>
          </div>
          <div className="gap-4 py-4">
            <div className="block">
              <div className="inline-flex">
                <Image
                  className="py-2"
                  src={HilariousIcon}
                  alt="laugh icon"
                  width={15}
                  height={15}
                />
                <div className="ml-2">No credit card required.</div>
              </div>
            </div>
            <div className="block">
              <div className="inline-flex">
                <Image
                  className="py-2"
                  src={HilariousIcon}
                  alt="laugh icon"
                  width={15}
                  height={15}
                />
                <div className="ml-2">All-days free trial.</div>
              </div>
            </div>
            <div className="block">
              <div className="inline-flex">
                <Image
                  className="py-2"
                  src={HilariousIcon}
                  alt="laugh icon"
                  width={15}
                  height={15}
                />
                <div className="ml-2">Cancel sometime.</div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex-col items-center hidden md:contents">
          <Image src={Badger} alt="mock alt" width={400} height={400} />
        </div>
      </div>
    </>
  );
};
