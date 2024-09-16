export type ExpenseRowType = {
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
