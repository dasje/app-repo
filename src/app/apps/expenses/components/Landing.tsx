"use client";

import { Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";

const Landing = () => {
  const router = useRouter();
  return (
    <div>
      <Button onClick={() => router.push("/apps/expenses/dummy-expense-sheet")}>
        Go to dummy expense sheet
      </Button>
    </div>
  );
};

export default Landing;
