import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
  CommandInput,
  CommandEmpty,
} from "@/components/ui/command";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export type Option = {
  _id: string;
  fullName: string;
};

type MultiSelectComboBoxProps = {
  options: Option[];
  selectedValues: string[];
  setSelectedValues: (values: string[]) => void;
  placeholder?: string;
  setFormValue?: (val: any[]) => void;
  disabled: boolean;

  widthClass?: string;
};

export default function MultiSelectComboBox({
  options,
  disabled,
  selectedValues,
  setSelectedValues,
  setFormValue,
  placeholder = "Select options...",
  widthClass = "w-[300px]",
}: MultiSelectComboBoxProps) {
  const [open, setOpen] = React.useState(false);

  const handleSelectionChange = (newSelectedValues: any[]) => {
    setSelectedValues(newSelectedValues);
    if (setFormValue) {
      setFormValue(newSelectedValues);
    }
  };
  const toggleValue = (value: string) => {
    const newValues = selectedValues.includes(value)
      ? selectedValues.filter((v) => v !== value)
      : [...selectedValues, value];

    handleSelectionChange(newValues);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          disabled={disabled}
          variant="outline"
          role="combobox"
          className={cn(
            widthClass,
            "w-full justify-between "
          )}
        >
          {selectedValues.length > 0
            ? options
                .filter((o) => selectedValues.includes(o._id))
                .map((o) => o.fullName)
                .join(", ")
            : placeholder}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className={cn(widthClass, "p-0")}>
        <Command>
          <CommandInput placeholder="Search..." />
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandList>
            <CommandGroup>
              {options.map((option) => (
                <CommandItem
                  key={option._id}
                  onSelect={() => toggleValue(option._id)}
                >
                  <div
                    className={cn(
                      "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                      selectedValues.includes(option._id)
                        ? "bg-primary text-primary-foreground"
                        : "opacity-50"
                    )}
                  >
                    {selectedValues.includes(option._id) && (
                      <Check className="h-4 w-4" />
                    )}
                  </div>
                  {option.fullName}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
