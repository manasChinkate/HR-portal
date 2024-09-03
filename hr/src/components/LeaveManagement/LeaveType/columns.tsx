// column.tsx

import { Column } from "react-table";

import { useEffect, useState } from "react";
import axios from "axios";
// import toast from "react-hot-toast";
// import { useEffect, useState } from "react";
import { BASE_URL } from "@/components/Constants";

interface Company {
  _id: string;
  clientName: string;
  state: string;
  country: string;
  companyName: string;
  createdAt: string; // ISO 8601 date string
  __v: number;
}




export const COLUMNS: Column<Company>[] = [
  {
    Header: "Client Name",
    accessor: "clientName",
  },
  {
    Header: "State",
    accessor: "state",
  },
  {
    Header: "Country",
    accessor: "country",
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
