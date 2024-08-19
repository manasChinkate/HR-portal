import AddnewEmployee from "../../components/AddnewEmployee/AddnewEmployee";
import EmployeeTable from "../../components/AddnewEmployee/EmployeeTable";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FaList } from "react-icons/fa";
import { MdCreate } from "react-icons/md";

const NewEmployeePage = () => {
  return (
    <div className="p-4">
      <Tabs defaultValue="create" className="w-full">
        <TabsList className="bg-gray-800 text-white rounded-lg mt-5 p-2 shadow-lg">
          <TabsTrigger
            value="create"
            className="tabButton flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 text-xs sm:text-sm hover:bg-gray-700"
          >
            <MdCreate className="text-base" />
            <span>Create</span>
          </TabsTrigger>
          <TabsTrigger
            value="report"
            className="tabButton flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 text-xs sm:text-sm hover:bg-gray-700"
          >
            <FaList className="text-base" />
            <span>Report</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="create" className="mt-6">
          <AddnewEmployee />
        </TabsContent>
        <TabsContent value="report" className="mt-6">
          <EmployeeTable />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default NewEmployeePage;
