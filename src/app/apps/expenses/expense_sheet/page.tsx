/* eslint-disable react-hooks/exhaustive-deps */
"use server";
import { getUser } from "@/app/lib/handlers/auth_handlers/getUser";
import LoginOrSignUpBanner from "@/app/login/loginComponents/LoginOrSignUpBanner";
import DummyPage from "../watchlist/components/DummyPage";
import { Input } from "@nextui-org/input";
import { useState } from "react";

type ExpenseRow = {
  id: string;
  expense_sheet_id: string;
  entry_number: number;
  expense_name: string;
  total_value: number;
  share_of_value: number;
  date_added: Date;
  date_due: Date | undefined;
  due_periodicity: string;
  expense_repeats: number;
  paid: number;
  active: number;
  deleted: number;
};

export default async function Page() {
  const user = await getUser();

  let dummyDataArray: ExpenseRow[] = [
    {
      id: "abc123",
      expense_sheet_id: "a",
      entry_number: 1,
      expense_name: "dummy_expense_1",
      total_value: 100,
      share_of_value: 50,
      date_added: new Date(),
      date_due: null,
      due_periodicity: "month",
      expense_repeats: 12,
      paid: 0,
      active: 1,
      deleted: 0,
    },
  ];

  const [expenseName, setExpenseName] = useState<string>();

  return (
    <>
      {!user ? (
        <>
          <LoginOrSignUpBanner textToDisplay="This is a demo version of this application." />
          <DummyPage />
        </>
      ) : (
        <>
          <div>Welcome to the Expenses App.</div>
          <Input label="Expense name" value={expenseName} />
        </>
      )}
    </>
  );
}
