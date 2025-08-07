import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, Search, Check } from "lucide-react"; // or other icon library
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
type Option = {
  value: string;
  label: string;
  children?: Option[]; // For hierarchical options
};

type CollapsibleDropdownProps = {
  options: Option[];
  value: string | null;
  onChange: (value: string) => void;
  placeholder?: string;
};

export function CollapsibleDropdown({
  options,
  value,
  onChange,
  placeholder = "Select option",
}: CollapsibleDropdownProps) {
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  const toggleExpand = (key: string) => {
    setExpanded((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleSelect = (val: string) => {
    onChange(val);
    setOpen(false);
  };

  const renderOptions = (opts: Option[], indent = 0) =>
    opts.map((opt) => {
      const isExpanded = expanded[opt.value] ?? false;
      const hasChildren = opt.children?.length > 0;

      return (
        <div key={opt.value}>
          <div
            className={cn(
              "flex items-center justify-between group hover:bg-muted rounded px-2 py-1",
              value === opt.value && "bg-muted font-medium"
            )}
            style={{ paddingLeft: `${indent * 1.25}rem` }}
          >
            <div
              className="flex items-center gap-2 cursor-pointer grow"
              onClick={() => handleSelect(opt.value)}
            >
              {opt.label}
            </div>
            {hasChildren && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleExpand(opt.value);
                }}
                className="p-1 hover:bg-accent rounded"
              >
                {isExpanded ? (
                  <ChevronDown className="w-4 h-4" />
                ) : (
                  <ChevronRight className="w-4 h-4" />
                )}
              </button>
            )}
          </div>

          {hasChildren && isExpanded && (
            <div className="space-y-1">
              {renderOptions(opt.children!, indent + 1)}
            </div>
          )}
        </div>
      );
    });

  const selectedLabel = (() => {
    const findLabel = (opts: Option[]): string | null => {
      for (const opt of opts) {
        if (opt.value === value) return opt.label;
        if (opt.children) {
          const child = findLabel(opt.children);
          if (child) return child;
        }
      }
      return null;
    };
    return findLabel(options);
  })();

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          className="w-[300px] justify-between"
        >
          {selectedLabel || placeholder}
          <ChevronDown className="ml-2 h-4 w-4 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] max-h-[300px] overflow-auto p-2">
        <div className="space-y-1">{renderOptions(options)}</div>
      </PopoverContent>
    </Popover>
  );
}
