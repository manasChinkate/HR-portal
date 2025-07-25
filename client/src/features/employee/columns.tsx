import { convertDate } from "@/utils/dateHelper";
import { ColumnDef } from "@tanstack/react-table";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface Designation {
  _id: string;
  designation: string;
}
interface Employee {
  _id: string;
  fullName: string;
  email: string;
  mobileNo: string;
  gender: string;
  maritialStatus: string;
  adhaarNo: string;
  panNo: string;
  joiningDate: string;
  probationPeriod: string;
  authority: string;
  designation: Designation;
  reportingManager: Employee;
  city: string;
  state: string;
  country: string;
  pincode: number;
  address: string;
  companyName: string;
  createdDate: string;
  __v: number;
}


// 👇 TanStack Table v8 column definition
export const COLUMNS: ColumnDef<Employee>[] = [
  {
    id: "fullName",
    accessorKey: "fullName",
    header: "Full Name",
    cell: ({ row }) => {
      const employee = row.original as Employee;

      return (
        <Dialog>
          <DialogTrigger className="text-blue-500 font-semibold hover:underline">
            {employee.fullName}
          </DialogTrigger>

          <DialogContent className="max-h-[91vh] overflow-y-auto sm:max-w-3xl w-full bg-background1 dark:bg-secondary1">
            <DialogHeader>
              <h1 className="text-xl font-bold text-center border bg-background2 text-black dark:text-white dark:bg-primary1 py-2 px-4 rounded-sm">
                {employee.fullName} <span>Details</span>
              </h1>
            </DialogHeader>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
              {[
                ["Full Name", employee.fullName],
                ["Email", employee.email],
                ["Mobile No.", employee.mobileNo],
                ["Gender", employee.gender],
                ["Marital Status", employee.maritialStatus],
                ["Aadhar No.", employee.adhaarNo],
                ["PAN No.", employee.panNo],
                ["Joining Date", employee.joiningDate],
                ["Probation Period", employee.probationPeriod],
                ["Authority", employee.authority],
                ["Designation", employee.designation?.designation ?? "N/A"],
                ["Reporting Manager", employee.reportingManager?.fullName ?? "N/A"],
                ["City", employee.city],
                ["State", employee.state],
                ["Country", employee.country],
                ["Pincode", employee.pincode.toString()],
                ["Company Name", employee.companyName],
                ["Created Date", employee.createdDate],
                ["Address", employee.address],
              ].map(([label, value]) => (
                <div
                  key={label}
                  className={label === "Address" ? "col-span-full" : ""}
                >
                  <label className="block font-semibold text-gray-700 dark:text-blue-300">
                    {label}
                  </label>
                  <p className="text-sm">{value}</p>
                </div>
              ))}
            </div>
          </DialogContent>
        </Dialog>
      );
    },
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "mobileNo",
    header: "Mobile No.",
  },
  {
    accessorKey: "authority",
    header: "Authority",
  },
  {
    // accessorKey: "designation",
    header: "Designation",
    accessorFn: (row) => row.designation?.designation ?? "N/A",
  },
  {
    accessorKey: "createdDate",
    header: "Created At",
    cell: ({ getValue }) => <span>{convertDate(getValue() as string)}</span>,
  },
];
