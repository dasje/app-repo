"use client";

import { Input } from "@nextui-org/input";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import PeriodicitySelector from "./PeriodicitySelector";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import NewIncomeSource from "./NewIncomeSource";

interface IncomeInterface {
  income: IncomeRowType[];
  setIncome: Dispatch<SetStateAction<IncomeRowType[]>>;
}

const Income = ({ income, setIncome }: IncomeInterface) => {
  const [sources, setSources] = useState<string[]>([]);

  useEffect(() => {
    let s: string[] = [];
    income.forEach((item) => {
      if (s.includes(item.source)) {
      } else {
        s.push(item.source);
      }
    });
    setSources(s);
  }, [income]);

  const calculateTotal = () => {
    let tot = 0;
    income.forEach((i) => {
      console.log(i);
      tot += i.value;
    });
    return tot.toString();
  };

  const handleUpdateRowValue = (
    idx: number,
    input: any,
    updateItem: string
  ) => {
    const newData: IncomeRowType[] = income.map((row, i) => {
      if (i === idx) {
        switch (updateItem) {
          case "incomeValue":
            row.value = input;
            break;
          case "source":
            row.source = input;
            break;
          default:
            break;
        }
      }
      return row;
    });
    setIncome(newData);
    console.log(income);
  };

  return (
    <div>
      <div>
        <div>Total income</div>
        <div>{calculateTotal()}</div>
      </div>
      {income && (
        <Table aria-label="Income table">
          <TableHeader>
            <TableColumn>Value</TableColumn>
            <TableColumn>Source</TableColumn>
            <TableColumn>Periodicity</TableColumn>
            <TableColumn>Next due date</TableColumn>
            <TableColumn>Active income</TableColumn>
          </TableHeader>

          <TableBody>
            {income.map((incomeRow, k) => (
              <TableRow key={incomeRow.id.toString()}>
                <TableCell>
                  <Input
                    classNames={{
                      input: ["bg-transparent"],
                      innerWrapper: "bg-transparent",
                      inputWrapper: ["bg-transparent"],
                    }}
                    type="number"
                    value={incomeRow.value.toString()}
                    onValueChange={(input) =>
                      handleUpdateRowValue(
                        k,
                        Number.parseFloat(input),
                        "incomeValue"
                      )
                    }
                  />
                </TableCell>
                <TableCell>
                  <Dropdown closeOnSelect={true}>
                    <DropdownTrigger>
                      <Button>{incomeRow.source}</Button>
                    </DropdownTrigger>
                    <DropdownMenu
                      aria-label="Static Actions"
                      selectionMode="single"
                      onAction={(key) => {
                        console.log(key);
                        handleUpdateRowValue(k, key, "source");
                      }}
                      selectedKeys={incomeRow.source}
                    >
                      {sources.map((s, idx) => (
                        <DropdownItem key={s}>{s}</DropdownItem>
                      ))}
                    </DropdownMenu>
                  </Dropdown>
                </TableCell>
                <TableCell>
                  <PeriodicitySelector
                    selected={incomeRow.periodicity}
                    setPeriodicity={() => {}}
                  />
                </TableCell>
                <TableCell>{incomeRow.due_date.toISOString()}</TableCell>
                <TableCell>{incomeRow.active}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
      <NewIncomeSource />
    </div>
  );
};

export default Income;
