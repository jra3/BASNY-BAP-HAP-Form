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

const frameworks = [
  {
    value: "next.js",
    label: "Next.js",
  },
  {
    value: "sveltekit",
    label: "SvelteKit",
  },
  {
    value: "nuxt.js",
    label: "Nuxt.js",
  },
  {
    value: "remix",
    label: "Remix",
  },
  {
    value: "astro",
    label: "Astro",
  },
]

export default function TypeaheadSelect() {
  const [open, setOpen] = useState(false)
  const [options, setOptions] = useState(frameworks);
  const [needle, setNeedle] = useState<string>("");
  const [selected, setSelected] = useState<string[]>([]);

  const toggleSelection = (value: string) => {
    if (!options.find(option => option.value == value)) {
      setOptions([...options, { value, label: value }]); // Add new value to options
    }

    setSelected((prev) =>
      prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
    );
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
          BOOP

          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command children={[

          <CommandInput
            placeholder="Search options..."
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
                key={option.value}
                value={option.value}
                onSelect={() => toggleSelection(option.value)}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    selected.includes(option.value) ? "opacity-100" : "opacity-0",
                  )}
                />
                {option.label}
              </CommandItem>
            ))}
          </CommandList>,

        ]} />
      </PopoverContent>
    </Popover>
  );
}