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

interface Employee {
  _id: string;
  fullname: string;
  email: string;
  mobileNo: string;
  gender: string;
  maritialStatus: string;
  adhaarNo: string;
  panNo: string;
  joiningDate: string;
  probationPeriod: string;
  authority: string;
  designation: string;
  reportingManager: string;
  city: string;
  state: string;
  country: string;
  pincode: number;
  address: string;
  companyName: string;
  createdDate: string;
  __v: number;
}

// // 👇 Reusable component to show employee details in a modal
// const FullNameCell: React.FC<{ row: any }> = ({ row }) => {
//   const [show, setShow] = useState(false);
//   const employee = row.original as Employee;

//   return (
//     <>
//       <p
//         onClick={() => setShow(true)}
//         className=" hover:text-blue-500 text-blue-700 text-sm mx-auto cursor-pointer font-semibold text-center py-0 px-1 lg:py-0.5 lg:px-2 rounded-lg w-fit"
//       >
//         {employee.fullname}
//       </p>

//       {show && (
//         <div
//           onClick={() => setShow(false)}
//           className="fixed top-0 left-0 z-50 h-full px-2 w-screen bg-[#000000b3] flex md:items-center items-center justify-center"
//         >
//           <div className="bg-background2 h-[80vh] overflow-y-scroll dark:bg-secondary1 overflow-auto px-4 rounded-sm w-full md:w-auto">
//             <span
//               className="flex items-center justify-end text-3xl font-semibold cursor-pointer"
//               onClick={() => setShow(false)}
//             >
//               &times;
//             </span>

//             <div className="">
//               <h1 className=" text-xl font-bold border text-center bg-background1 text-black dark:text-white dark:bg-primary1 py-[7px] px-[15px] rounded-sm">
//                 {employee.fullname}
//                 <span> Details</span>
//               </h1>
//             </div>

//             <div className="grid md:grid-cols-3 grid-cols-1 gap-10 p-4">
//               {[
//                 ["Full Name", employee.fullname],
//                 ["Email", employee.email],
//                 ["Mobile No.", employee.mobileNo],
//                 ["Gender", employee.gender],
//                 ["Marital Status", employee.maritialStatus],
//                 ["Aadhar No.", employee.adhaarNo],
//                 ["PAN No.", employee.panNo],
//                 ["Joining Date", employee.joiningDate],
//                 ["Probation Period", employee.probationPeriod],
//                 ["Authority", employee.authority],
//                 ["Designation", employee.designation],
//                 ["Reporting Manager", employee.reportingManager],
//                 ["City", employee.city],
//                 ["State", employee.state],
//                 ["Country", employee.country],
//                 ["Pincode", employee.pincode.toString()],
//                 ["Company Name", employee.companyName],
//                 ["Created Date", employee.createdDate],
//                 ["Address", employee.address],
//               ].map(([label, value]) => (
//                 <div
//                   key={label}
//                   className={label === "Address" ? "col-span-full" : ""}
//                 >
//                   <label className="font-semibold dark:text-blue-300">
//                     {label}
//                   </label>
//                   <p>{value}</p>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// 👇 TanStack Table v8 column definition
export const COLUMNS: ColumnDef<Employee>[] = [
  {
    id: "fullname",
    accessorKey: "fullname",
    header: "Full Name",
    cell: ({ row }) => {
      const employee = row.original as Employee;

      return (
        <Dialog>
          <DialogTrigger className="text-blue-500 font-semibold hover:underline">
            {employee.fullname}
          </DialogTrigger>

          <DialogContent className="max-h-[91vh] overflow-y-auto sm:max-w-3xl w-full bg-background1 dark:bg-secondary1">
            <DialogHeader>
              <h1 className="text-xl font-bold text-center border bg-background2 text-black dark:text-white dark:bg-primary1 py-2 px-4 rounded-sm">
                {employee.fullname} <span>Details</span>
              </h1>
            </DialogHeader>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
              {[
                ["Full Name", employee.fullname],
                ["Email", employee.email],
                ["Mobile No.", employee.mobileNo],
                ["Gender", employee.gender],
                ["Marital Status", employee.maritialStatus],
                ["Aadhar No.", employee.adhaarNo],
                ["PAN No.", employee.panNo],
                ["Joining Date", employee.joiningDate],
                ["Probation Period", employee.probationPeriod],
                ["Authority", employee.authority],
                ["Designation", employee.designation],
                ["Reporting Manager", employee.reportingManager],
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
    accessorKey: "designation",
    header: "Designation",
  },
  {
    accessorKey: "createdDate",
    header: "Created At",
    cell: ({ getValue }) => <span>{convertDate(getValue() as string)}</span>,
  },
];
