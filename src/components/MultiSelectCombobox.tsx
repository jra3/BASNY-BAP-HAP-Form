import { useState } from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

interface MultiSelectComboboxProps {
  options: string[];
  selectedValues?: string[];
  onChange?: (selected: string[]) => void;
  addsAllowed?: boolean;
  placeholder?: string;
}

export default function MultiSelectCombobox(attrs: MultiSelectComboboxProps) {
  const [open, setOpen] = useState(false)
  const [options, setOptions] = useState(attrs.options);
  const [needle, setNeedle] = useState<string>("");
  const [selected, setSelected] = useState<string[]>(attrs.selectedValues ?? []);

  const toggleSelection = (value: string) => {
    if (attrs.addsAllowed && !options.find(option => option == value)) {
      setOptions([...options, value]); // Add new value to options
    }
    setNeedle(""); // Clear search
    setSelected((prev) =>
      prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
    );

    attrs.onChange?.(selected);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {selected.map(
            value => {
              const selected = options.find(option => option === value);
              return selected || value;
            }).sort().join(", ") || attrs.placeholder || "Select options"}

          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command children={[

          <CommandInput
            placeholder={`Search${attrs?.addsAllowed ? " / Add" : ""} options...`}
            value={needle}
            onValueChange={setNeedle}
          />,

          <CommandList>
            <CommandEmpty>
              <Button
                variant="ghost"
                className="w-full"
                onClick={() => toggleSelection(needle)}>
                Add custom option, "{needle}"
              </Button>
            </CommandEmpty>
            {options.map((option) => (
              <CommandItem
                value={option}
                onSelect={toggleSelection}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    selected.includes(option) ? "opacity-100" : "opacity-0",
                  )}
                />
                {option}
              </CommandItem>
            ))}
          </CommandList>,

        ]} />
      </PopoverContent>
    </Popover>
  );
}