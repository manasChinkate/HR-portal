import { cn } from "@/lib/utils";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
interface TabsContextProps {
  value: string;
  setValue: (value: string) => void;
}

interface Tabs {
  defaultValue?: string;
  tabValue?: string; // Controlled value
  onTabChange?: (value: string) => void; // Controlled change handler
  children: React.ReactNode;
}
interface TabTriggerContainer {
  className?: string;
  children: ReactNode;
}

interface TabTrigger {
  value: string;
  className?: string;
  children: ReactNode;
}
interface TabContent {
  value: string;
  className?: string;
  children: ReactNode;
}

const TabContext = createContext<TabsContextProps | undefined>(undefined);
export const useTabs = () => {
  const context = useContext(TabContext);
  if (!context) {
    throw new Error("useTabs must be used within <Tabs>");
  }

  return context;
};

const Tabs = ({ defaultValue, children, tabValue, onTabChange }: Tabs) => {
  console.log(defaultValue);
  const [internalValue, setInternalValue] = useState("");
  const isControlled = tabValue !== undefined || onTabChange !== undefined;

  const value = (isControlled ? tabValue : internalValue) ?? "";
  const setValue = isControlled ? onTabChange ?? (() => {}) : setInternalValue;
  console.log(value, setValue);
  return (
    <TabContext.Provider value={{ value, setValue }}>
      <div className=" w-full">{children}</div>
    </TabContext.Provider>
  );
};

const TabTriggerContainer = ({ className, children }: TabTriggerContainer) => {
  return (
    <div className={cn(`flex gap-2 w-full flex-nowrap p-1 `, className)}>
      {children}
    </div>
  );
};

const TabTrigger = ({ value, children, className }: TabTrigger) => {
  const { value: selected, setValue } = useTabs();
  const isActive = value === selected;
  return (
    <button
      className={cn(
        "px-4 py-2 text-sm font-medium ",
        isActive
          ? "bg-slate-50"
          : "border-transparent text-gray-500 hover:text-gray-700",
        className
      )}
      onClick={() => setValue(value)}
    >
      {children}
    </button>
  );
};

const TabsContent = ({ value, children, className }: TabContent) => {
  const { value: selected } = useTabs();
  if (value !== selected) return null;

  return <div className={cn(className)}> {children}</div>;
};

export { Tabs, TabsContent, TabTrigger, TabTriggerContainer };
