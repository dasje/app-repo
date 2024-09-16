/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { Input } from "@nextui-org/input";
import {
  Button,
  CalendarDate,
  DatePicker,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import { Dispatch, SetStateAction, useState } from "react";
import PeriodicitySelector from "./PeriodicitySelector";
import { ExpenseRowType } from "../types/ExpenseRowType";
import { v4 as uuidv4 } from "uuid";

interface NewIncomeSourceInterface {
  //   data: ExpenseRowType[];
  //   setData: Dispatch<SetStateAction<ExpenseRowType[]>>;
  //   expenseSheetId: string;
}

const NewIncomeSource = ({}: NewIncomeSourceInterface) => {
  const [newExpenseName, setNewExpenseName] = useState<string>();
  const [newExpenseTotalValue, setNewExpenseTotalValue] = useState<number>(0);
  const [newExpenseShareValue, setNewExpenseShareValue] = useState<number>(0);
  const [newExpenseDueDate, setNewExpenseDueDate] = useState<CalendarDate>();
  const [newExpensePeriodicity, setNewExpensePeriodicity] = useState<string>();
  const [newExpenseNumberOfPayments, setNewExpenseNumberOfPayments] =
    useState<number>(0);

  const handleNewIncome = () => {};

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Button onPress={onOpen}>Add a new income</Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Add a new income
              </ModalHeader>
              <ModalBody>
                <div className="container mx-auto px-10 m-6 md:m-0 rounded justify-center bg-white md:items-start grid-cols-1 space-y-4">
                  <Input
                    className="col-span-1"
                    label="Expense name"
                    value={newExpenseName}
                    onValueChange={(input) => setNewExpenseName(input)}
                  />
                  <Input
                    className="col-span-1"
                    label="Total value"
                    type="number"
                    value={newExpenseTotalValue.toLocaleString("en-US")}
                    onValueChange={(input) => {
                      setNewExpenseTotalValue(Number.parseFloat(input));
                    }}
                  />
                  <Input
                    label="Value share"
                    type="number"
                    value={newExpenseShareValue.toLocaleString("en-US")}
                    onValueChange={(input) => {
                      setNewExpenseShareValue(Number.parseFloat(input));
                    }}
                  />
                  <DatePicker
                    label="Next due date"
                    value={newExpenseDueDate}
                    onChange={(inputDate) => setNewExpenseDueDate(inputDate)}
                  />
                  <PeriodicitySelector
                    selected={newExpensePeriodicity}
                    setPeriodicity={setNewExpensePeriodicity}
                  />
                  <Input
                    label="Number of payments"
                    type="number"
                    value={newExpenseNumberOfPayments.toLocaleString("en-US")}
                    onValueChange={(input) => {
                      setNewExpenseNumberOfPayments(Number.parseFloat(input));
                    }}
                    description="How many periods should this payment be made? Leave as 0 if there is no end date."
                  />
                </div>
              </ModalBody>
              <ModalFooter>
                <Button
                  onClick={() => {
                    console.log("Adding new income source");
                    handleNewIncome();
                    onClose();
                  }}
                >
                  Add new income
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default NewIncomeSource;
