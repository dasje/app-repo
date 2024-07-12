"use client";

import { Button, Card, CardBody, CardFooter } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";

interface GhostDashboardCardInterface {
  buttonText?: string;
  image: string;
  imageAlt: string;
  byline: string;
  buttonLink?: string;
}

const GhostDashboardCard = ({
  buttonLink,
  image,
  imageAlt,
  byline,
  buttonText,
}: GhostDashboardCardInterface) => {
  return (
    <div className="p-4">
      <Card isFooterBlurred radius="lg" className="border-none">
        <Image
          alt={imageAlt}
          className="object-cover object-fill"
          height={200}
          src={image}
          width={200}
        />
        <CardBody className="text-left before:bg-gray/10 border-gray/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10"></CardBody>
        <CardFooter className="text-left before:bg-gray/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
          <div>
            <p className="text-tiny text-white/80">{byline}</p>
          </div>
          {buttonLink && (
            <div className="space-y-2">
              <Link href={buttonLink}>
                <Button
                  className="text-tiny text-white bg-white/20"
                  variant="flat"
                  color="default"
                  radius="lg"
                  size="sm"
                >
                  {buttonText}
                </Button>
              </Link>
            </div>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};

export default GhostDashboardCard;
