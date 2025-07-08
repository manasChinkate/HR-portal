// column.tsx

import { Column } from "react-table";

import { useState } from "react";

import { convertDate } from "@/utils/dateHelper";
import { Row } from "@tanstack/react-table";

interface Timesheet {
  _id: {
    $oid: string;
  };
  companyName: string;
  name: string;
  email: string;
  projectName: string;
  task: string;
  date: string;
  starttime: string;
  endtime: string;
  totaltime: string;
  remarks: string;
  __v: number;
}

interface Employee {
  _id: string;
  fullname: string;
}

export const COLUMNS: Column<Timesheet>[] = [
  {
    Header: "Full Name",
    accessor: "fullname",
    Cell: ({ row }: {row:Row<Employee>}) => {
      const [show, setShow] = useState(false);
      return (
        <>
          <p
            onClick={() => setShow(true)}
            className=" hover:text-blue-500   text-blue-700 text-sm mx-auto cursor-pointer font-semibold text-center py-0 px-1 lg:py-0.5 lg:px-2 rounded-lg     w-fit "
          >
            {row.original.fullname}
          </p>

          {show && (
            <div
              onClick={() => setShow(false)}
              className="fixed top-0 left-0 z-50 h-full px-2 w-screen bg-[#000000b3] flex md:items-center items-center justify-center "
            >
              <div className="bg-white h-[80vh] overflow-y-scroll dark:bg-secondary1 overflow-auto px-4 rounded-sm w-full md:w-auto">
                <span
                  className="flex items-center justify-end text-3xl font-semibold cursor-pointer"
                  onClick={() => {
                    setShow(false);
                  }}
                >
                  &times;
                </span>
                <div className=" dark:bg-primary1">
                  <h1 className=" text-xl font-bold border text-center text-black dark:text-white  py-[7px] px-[15px] rounded-sm">
                    {row.original.fullname}
                    <span> Details</span>
                  </h1>
                </div>
                <div className="grid md:grid-cols-3 grid-cols-1  gap-10 p-4">
                  <div>
                    <label className="font-semibold dark:text-blue-300 ">
                      Full Name
                    </label>
                    <p>{row.original.fullname}</p>
                  </div>
                  <div>
                    <label className="font-semibold dark:text-blue-300">
                      Email
                    </label>
                    <p>{row.original.email}</p>
                  </div>
                  <div>
                    <label className="font-semibold dark:text-blue-300">
                      Mobile No.
                    </label>
                    <p>{row.original.mobileNo}</p>
                  </div>
                  <div>
                    <label className="font-semibold dark:text-blue-300">
                      Gender
                    </label>
                    <p>{row.original.gender}</p>
                  </div>
                  <div>
                    <label className="font-semibold dark:text-blue-300">
                      Marital Status
                    </label>
                    <p>{row.original.maritialStatus}</p>
                  </div>
                  <div>
                    <label className="font-semibold dark:text-blue-300">
                      Aadhar No.
                    </label>
                    <p>{row.original.adhaarNo}</p>
                  </div>
                  <div>
                    <label className="font-semibold dark:text-blue-300">
                      PAN No.
                    </label>
                    <p>{row.original.panNo}</p>
                  </div>
                  <div>
                    <label className="font-semibold dark:text-blue-300">
                      Joining Date
                    </label>
                    <p>{row.original.joiningDate}</p>
                  </div>
                  <div>
                    <label className="font-semibold dark:text-blue-300">
                      Probation Period
                    </label>
                    <p>{row.original.probationPeriod}</p>
                  </div>
                  <div>
                    <label className="font-semibold dark:text-blue-300">
                      Authority
                    </label>
                    <p>{row.original.authority}</p>
                  </div>
                  <div>
                    <label className="font-semibold dark:text-blue-300">
                      Designation
                    </label>
                    <p>{row.original.designation}</p>
                  </div>
                  <div>
                    <label className="font-semibold dark:text-blue-300">
                      Reporting Manager
                    </label>
                    <p>{row.original.reportingManager}</p>
                  </div>
                  <div>
                    <label className="font-semibold dark:text-blue-300">
                      City
                    </label>
                    <p>{row.original.city}</p>
                  </div>
                  <div>
                    <label className="font-semibold dark:text-blue-300">
                      State
                    </label>
                    <p>{row.original.state}</p>
                  </div>
                  <div>
                    <label className="font-semibold dark:text-blue-300">
                      Country
                    </label>
                    <p>{row.original.country}</p>
                  </div>
                  <div>
                    <label className="font-semibold dark:text-blue-300">
                      Pincode
                    </label>
                    <p>{row.original.pincode}</p>
                  </div>

                  <div>
                    <label className="font-semibold dark:text-blue-300">
                      Company Name
                    </label>
                    <p>{row.original.companyName}</p>
                  </div>
                  <div>
                    <label className="font-semibold dark:text-blue-300">
                      Created Date
                    </label>
                    <p>{row.original.createdDate}</p>
                  </div>
                  <div className=" col-span-full">
                    <label className="font-semibold  dark:text-blue-300">
                      Address
                    </label>
                    <p>{row.original.address}</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      );
    },
  },
  {
    Header: "Email",
    accessor: "email",
  },
  {
    Header: "Mobile No.",
    accessor: "mobileNo",
  },

  {
    Header: "Authority",
    accessor: "authority",
  },
  {
    Header: "Designation",
    accessor: "designation",
  },

  {
    Header: "Created at",
    accessor: "createdDate",
    Cell: ({ value }) => {
      const convertDate = (isoDate: string) => {
        const date = new Date(isoDate);
        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based in JavaScript
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

export const COLUMN1: Column<Timesheet>[] = [
  {
    Header: "Full Name",
    accessor: "employeeId",
    Cell: ({ value }: { value: Employee }) => {
      return <span>{value.fullname}</span>;
    },
  },
  {
    Header: "Date",
    accessor: "date",
    Cell: ({ value }: { value: string }) => {
      return <span>{convertDate(value)}</span>;
    },
  },
  {
    Header: "Project Name",
    accessor: "projectId",
    Cell: ({ value }: { value: { projectName: string } }) => {
      return <span>{value.projectName}</span>;
    },
  },
  {
    Header: "Task",
    accessor: "taskId",
    Cell: ({ value }: { value: { taskTitle: string } }) => {
      return <span>{value.taskTitle }</span>;
    },
  },
  {
    Header: "Start Time",
    accessor: "startTime",
  },
  {
    Header: "End Time",
    accessor: "endTime",
  },
  {
    Header: "Total Time",
    accessor: "totalTime",
  },
  {
    Header: "Remarks",
    accessor: "taskDesc",
  },
];
