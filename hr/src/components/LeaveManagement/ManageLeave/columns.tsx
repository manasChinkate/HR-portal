// column.tsx

import { Column } from "react-table";

import { useEffect, useState } from "react";
import axios from "axios";
// import toast from "react-hot-toast";
// import { useEffect, useState } from "react";
import { BASE_URL } from "../../../constants";
import toast from "react-hot-toast";

interface LeaveData {
  _id: string;
  name: string;
  email: string;
  leaveType: string;
  count: string;
  department: string;
  from_date: string;
  to_date: string;
  reason: string;
  status: string;
  companyName: string;
  createdAt: string;
  __v: number;
}




export const COLUMNS: Column<LeaveData>[] = [
  {
    Header: "Employee Name",
    accessor: "name",
  },
  {
    Header: "Department",
    accessor: "department",
  },
  {
    Header: "Leave Type",
    accessor: "leaveType",
  },
  {
    Header: "Days",
    accessor: "count",
  },
  {
    Header: "From Date",
    accessor: "from_date",
    Cell: ({ value }) => {
      const convertDate = (isoDate: string) => {
        const date = new Date(isoDate);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based in JavaScript
        const year = date.getFullYear();

        return `${day}/${month}/${year}`;
      };

      return <span>{convertDate(value)}</span>;
    },
  },
  {
    Header: "To Date",
    accessor: "to_date",
    Cell: ({ value }) => {
      const convertDate = (isoDate: string) => {
        const date = new Date(isoDate);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based in JavaScript
        const year = date.getFullYear();

        return `${day}/${month}/${year}`;
      };

      return <span>{convertDate(value)}</span>;
    },
  },
  {
    Header: "Reason",
    accessor: "reason",
  },
  {
    Header: "Action",
    accessor: "action",
    Cell: ({ row,getLeaves }) => {

      const setAccept = async () => {
        const res = await axios.patch(`${BASE_URL}/leaves/Accepted/${row.original._id}`)
        if (res.status == 200) {
          toast.success("Status Updated")
          getLeaves()
        }
      }
      const setReject = async () => {
        const res = await axios.patch(`${BASE_URL}/leaves/Rejected/${row.original._id}`)
        if (res.status == 200) {
          toast.success("Status Updated")
          getLeaves()
        }
      }
      return (
        <>

          {
            row.original.status === 'pending' ? (
              <>
              <p
                onClick={setAccept}
                className=" border hover:bg-green-500 hover:text-white transition-all border-green-500 mx-auto cursor-pointer font-semibold text-center py-0 px-1 lg:py-0.5 lg:px-2  rounded-lg text-green-600 w-fit text-xs"
              >
                Accept
              </p>
                <p
                  onClick={setReject}
                  className="mt-2 border hover:bg-red-500 hover:text-white transition-all border-red-500 mx-auto cursor-pointer font-semibold text-center py-0 px-1 lg:py-0.5 lg:px-2 rounded-lg text-red-600 w-fit text-xs"
                >
                  Reject
                </p>
              </>
            ) : (<></>)
        }

        </>
      )
    }
  },
  {
    Header: "Status",
    accessor: "status",
    Cell: ({ row }) => {
      return (
        <>
            {
              row.original.status === "Accepted" ? ( <p className="bg-cyan-100 mx-auto cursor-pointer font-semibold text-center py-0 px-1 lg:py-0.5 lg:px-2 rounded-lg dark:bg-secondary1 dark:border-blue-600 dark:border text-blue-600 w-fit text-xs">
                {row.original.status}
              </p>) : row.original.status === "Rejected" ?(
                 <p className="bg-cyan-100 mx-auto cursor-pointer font-semibold text-center py-0 px-1 lg:py-0.5 lg:px-2 rounded-lg dark:bg-secondary1 dark:border-red-600 dark:border text-red-600 w-fit text-xs">
                 {row.original.status}
               </p>
              ) : row.original.status === "pending" ? (
                <p className="bg-cyan-100 mx-auto cursor-pointer font-semibold text-center py-0 px-1 lg:py-0.5 lg:px-2 rounded-lg dark:bg-secondary1 dark:border-yellow-400 dark:border text-yellow-500 w-fit text-xs">
                 Pending
               </p>
              ) :(<></>)
            }
          </>
      )
    }
  },
  {
    Header: "Created At",
    accessor: "createdAt",
    Cell: ({ value }) => {
      const convertDate = (isoDate: string) => {
        const date = new Date(isoDate);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based in JavaScript
        const year = date.getFullYear();

        return `${day}/${month}/${year}`;
      };

      return <span>{convertDate(value)}</span>;
    },
  },



  //   {
  //     Header: "Edit",
  //     Cell: ({ row, setaddCategory }) => {
  //       // const dispatch = useDispatch<any>();
  //       // const { category, id } = row.original;
  //       const [data, setData] = useState(row.original.category);
  //       const [edit, setEdit] = useState(false);
  //       useEffect(() => {
  //         setData(row.original.category);
  //       }, [edit,row]);

  //       const handleUpdate = async (e: any) => {
  //         e.preventDefault();
  //         try {
  //           const body = {
  //             id: row.original.id,
  //             category_name: data,
  //           };
  //           const response = await axios.post(
  //             BASE_URL + "HR/Portal/update/add_category",
  //             body
  //           );
  //           if (response.status === 200) {
  //             const res = await axios.get(
  //               BASE_URL + "HR/Portal/add_category"
  //             );
  //             setaddCategory(res.data);
  //             toast.success("Updated");
  //           } else toast.error("not Updated");
  //         } catch (error) {
  //           toast.error("Something went wrong");
  //         }
  //         setEdit(false);
  //       };

  //       return (
  //         <>
  //           <form onSubmit={handleUpdate} className="flex gap-4">
  //             <input
  //               required
  //               type="text"
  //               disabled={!edit}
  //               value={data}
  //               onChange={(e: any) => setData(e.target.value)}
  //               className="border border-black rounded-sm px-1  disabled:text-gray-500 disabled:border-gray-500 disabled:cursor-not-allowed"
  //             />
  //             {edit ? (
  //               <button
  //                 type="submit"
  //                 className="bg-green-500 w-16 py-1 rounded-md text-white"
  //               >
  //                 Update
  //               </button>
  //             ) : (
  //               <div
  //                 onClick={() => setEdit(true)}
  //                 className="text-center bg-green-500 w-16 py-1 rounded-md cursor-pointer text-white"
  //               >
  //                 Edit
  //               </div>
  //             )}
  //           </form>
  //         </>
  //       );
  //     },
  //   },
];
