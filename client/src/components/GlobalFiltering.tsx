import { Search } from "lucide-react"; // or your preferred icon library
import { Input } from "./ui/input";

const GlobalFiltering = ({
  filter,
  setFilter,
}: {
  filter: string;
  setFilter: (value: string) => void;
}) => {
  return (
    <div className="relative w-full lg:w-[250px]">
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
      <Input
        className="w-full pl-9"
        placeholder="Search Here..."
        value={filter || ""}
        onChange={(e) => setFilter(e.target.value)}
      />
    </div>
  );
};
export default GlobalFiltering;
