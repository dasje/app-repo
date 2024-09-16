/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import {
  Input,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import NewExpense from "../components/NewExpense";
import { ExpenseRowType } from "../types/ExpenseRowType";
import { useEffect, useState } from "react";
import PeriodicitySelector from "../components/PeriodicitySelector";
import { v4 as uuidv4 } from "uuid";
import Income from "../components/Income";

let dummyDataArray: ExpenseRowType[] = [
  {
    id: uuidv4(),
    expense_sheet_id: "dummy",
    entry_number: 1,
    expense_name: "dummy_expense_1",
    total_value: 100,
    share_of_value: 50,
    date_added: new Date(),
    date_due: null,
    due_periodicity: "monthly",
    expense_repeats: 12,
    paid: 0,
    active: 1,
    deleted: 0,
  },
];

export default function Page() {
  const [data, setData] = useState<ExpenseRowType[]>(dummyDataArray);

  //   const handleNewExpense = (newExpense: ExpenseRowType) => {
  //     setData((data) => [newExpense, ...data]);
  //     console.log(data);
  //   };

  useEffect(() => {
    console.log("DATA", data);
  }, [data]);

  const handleUpdateRowValue = (
    idx: number,
    input: any,
    updateItem: string
  ) => {
    const newData: ExpenseRowType[] = data.map((row, i) => {
      if (i === idx) {
        switch (updateItem) {
          case "expenseName":
            row.expense_name = input;
            break;
          case "shareOfValue":
            row.share_of_value = input;
            break;
          case "totalValue":
            row.total_value = input;
            break;
          case "periodicity":
            row.due_periodicity = input;
            break;
          case "expensePaid":
            row.paid = input;
            break;
          case "expenseActive":
            row.active = input;
            break;
          default:
            break;
        }
      }
      return row;
    });
    setData(newData);
    console.log(data);
  };

  const generateRows = () => {
    console.log("Re render table", data);
    return (
      <TableBody>
        {data &&
          data.length > 0 &&
          data.map((row, key) => (
            <TableRow key={row.id}>
              <TableCell>
                {" "}
                <Input
                  classNames={{
                    input: ["bg-transparent"],
                    innerWrapper: "bg-transparent",
                    inputWrapper: ["bg-transparent"],
                  }}
                  value={row.expense_name}
                  onValueChange={(input) =>
                    handleUpdateRowValue(key, input, "expenseName")
                  }
                />
              </TableCell>
              <TableCell>
                <div className="flex">
                  <Input
                    size="sm"
                    classNames={{
                      input: ["bg-transparent"],
                      innerWrapper: "bg-transparent",
                      inputWrapper: ["bg-transparent"],
                    }}
                    type="number"
                    value={row.share_of_value.toString()}
                    onValueChange={(input) =>
                      handleUpdateRowValue(
                        key,
                        Number.parseFloat(input),
                        "shareOfValue"
                      )
                    }
                  />
                  <div>/</div>
                  <Input
                    size="sm"
                    classNames={{
                      input: ["bg-transparent"],
                      innerWrapper: "bg-transparent",
                      inputWrapper: ["bg-transparent"],
                    }}
                    type="number"
                    value={row.total_value.toString()}
                    onValueChange={(input) =>
                      handleUpdateRowValue(
                        key,
                        Number.parseFloat(input),
                        "totalValue"
                      )
                    }
                  />
                </div>
              </TableCell>
              <TableCell>
                <PeriodicitySelector
                  selected={row.due_periodicity}
                  setPeriodicity={(str) =>
                    handleUpdateRowValue(key, str, "periodicity")
                  }
                />
                <div></div>
              </TableCell>
              <TableCell>
                <Switch
                  isSelected={row.paid === 1 ? true : false}
                  onValueChange={(isSelected) =>
                    handleUpdateRowValue(key, isSelected ? 1 : 0, "expensePaid")
                  }
                />
              </TableCell>
              <TableCell>
                <Switch
                  isSelected={row.active === 1 ? true : false}
                  onValueChange={(isSelected) =>
                    handleUpdateRowValue(
                      key,
                      isSelected ? 1 : 0,
                      "expenseActive"
                    )
                  }
                />
              </TableCell>
            </TableRow>
          ))}
      </TableBody>
    );
  };

  return (
    <>
      <div>Welcome to the Dummy Expenses Page.</div>
      <Table aria-label="Expense Table">
        <TableHeader>
          <TableColumn>Expense</TableColumn>
          <TableColumn>Value</TableColumn>
          <TableColumn>Due</TableColumn>
          <TableColumn>Paid</TableColumn>
          <TableColumn>Active</TableColumn>
        </TableHeader>
        {generateRows()}
      </Table>
      <NewExpense expenseSheetId="dummy" data={data} setData={setData} />
      <Income />
    </>
  );
}
