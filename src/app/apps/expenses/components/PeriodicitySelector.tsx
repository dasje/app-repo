import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import { Dispatch, Key, SetStateAction } from "react";

interface PeriodicitySelectorInterface {
  selected?: string;
  setPeriodicity: (string) => void;
}

const PeriodicitySelector = ({
  selected,
  setPeriodicity,
}: PeriodicitySelectorInterface) => {
  return (
    <Dropdown closeOnSelect={true}>
      <DropdownTrigger>
        <Button>
          {selected ? selected.toUpperCase() : "Select periodicity"}
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        aria-label="Static Actions"
        selectionMode="single"
        onAction={(key) => {
          console.log(key);
          setPeriodicity(key.toString());
        }}
        selectedKeys={selected}
      >
        <DropdownItem key="daily">Daily</DropdownItem>
        <DropdownItem key="weekly">Weekly</DropdownItem>
        <DropdownItem key="monthly">Monthly</DropdownItem>
        <DropdownItem key="yearly">Yearly</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default PeriodicitySelector;
