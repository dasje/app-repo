"use client";

import { Input } from "@nextui-org/input";
import { Dispatch, SetStateAction, useState } from "react";
import PeriodicitySelector from "./PeriodicitySelector";
import {
  Button,
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
  return (
    <div>
      {income && (
        <Table aria-label="Income table">
          <TableHeader>
            <TableColumn>Value</TableColumn>
            <TableColumn>Source</TableColumn>
            <TableColumn>Periodicity</TableColumn>
          </TableHeader>
          <TableBody>
            {income.map((incomeRow, key) => (
              <TableRow key={incomeRow.id}>
                <TableCell>{incomeRow.value}</TableCell>
                <TableCell>{incomeRow.source}</TableCell>
                <TableCell>
                  <PeriodicitySelector
                    selected={incomeRow.periodicity}
                    setPeriodicity={() => {}}
                  />
                </TableCell>
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
