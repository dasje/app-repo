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

interface NewExpenseInterface {
  //   addNewExpense: (ExpenseRowType) => void;
  data: ExpenseRowType[];
  setData: Dispatch<SetStateAction<ExpenseRowType[]>>;
  expenseSheetId: string;
}

const NewExpense = ({ data, setData, expenseSheetId }: NewExpenseInterface) => {
  const [newExpenseName, setNewExpenseName] = useState<string>();
  const [newExpenseTotalValue, setNewExpenseTotalValue] = useState<number>(0);
  const [newExpenseShareValue, setNewExpenseShareValue] = useState<number>(0);
  const [newExpenseDueDate, setNewExpenseDueDate] = useState<CalendarDate>();
  const [newExpensePeriodicity, setNewExpensePeriodicity] = useState<string>();
  const [newExpenseNumberOfPayments, setNewExpenseNumberOfPayments] =
    useState<number>(0);

  const handleNewExpense = () => {
    if (
      newExpenseName.length > 0 &&
      newExpenseShareValue <= newExpenseTotalValue &&
      newExpenseDueDate &&
      newExpensePeriodicity
    ) {
      const newId: string = uuidv4();
      const dateAdded: Date = new Date();
      const dueDateType: Date = new Date(newExpenseDueDate.toString());
      let expenseToAdd: ExpenseRowType = {
        id: newId,
        expense_sheet_id: expenseSheetId,
        entry_number: 1,
        expense_name: newExpenseName,
        total_value: newExpenseTotalValue,
        share_of_value: newExpenseShareValue,
        date_added: dateAdded,
        date_due: dueDateType,
        due_periodicity: newExpensePeriodicity,
        expense_repeats: newExpenseNumberOfPayments,
        paid: 0,
        active: 1,
        deleted: 0,
      };
      setData((prevRows) => [...prevRows, expenseToAdd]);
    }
    console.log(data);
  };

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Button onPress={onOpen}>Add a new expense</Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Add a new expense
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
                    console.log("Adding new expense");
                    handleNewExpense();
                    onClose();
                  }}
                >
                  Add new expense
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default NewExpense;
