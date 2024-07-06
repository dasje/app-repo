"use client";

import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@nextui-org/react";

const Test = () => {
  return (
    <Dropdown closeOnSelect={false}>
      <DropdownTrigger>This</DropdownTrigger>
      <DropdownMenu>
        <DropdownItem>
          <Popover placement="bottom" backdrop="blur">
            <PopoverTrigger>
              <Button color="primary">Customize</Button>
            </PopoverTrigger>
            <PopoverContent>
              <Input
                type="text"
                label="here"
                //   value={iValue}
                //   onChange={(e) => setIValue(e.target.value)}
              />
            </PopoverContent>
          </Popover>
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default Test;
