import { useEffect, useState } from "react"
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

  useEffect(() => {
    attrs.onChange?.(selected);
  }, [selected])

  const toggleSelection = (value: string) => {
    if (attrs.addsAllowed && !options.find(option => option == value)) {
      setOptions([...options, value]); // Add new value to options
    }
    setNeedle(""); // Clear search
    setSelected((prev) =>
      prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
    );
  };

  const weight = selected.length > 0 ? "font-medium" : "font-light";

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn(
            "w-full",
            "justify-between",
            weight,
          )}
        >
          {selected.map(
            value => {
              const selected = options.find(option => option === value);
              return selected || value;
            }).sort().join(", ") || attrs.placeholder || "Select options"}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[400px] p-0">
        <Command>
          <CommandInput
            className="w-full"
            placeholder={`Search${attrs?.addsAllowed ? " / Add" : ""} options...`}
            value={needle}
            onValueChange={setNeedle}
          />,

          <CommandList>
            <CommandEmpty>
              {
                attrs.addsAllowed ?
                  <Button variant="ghost" className="w-full" onClick={() => toggleSelection(needle)}>
                    Add custom option, "{needle}"
                  </Button> :
                  < Button variant="ghost" className="w-full">No matching results</Button>
              }
            </CommandEmpty>
            {
              options.map((option, index) => (
                <CommandItem
                  key={index}
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
              ))
            }
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover >
  );
}