import { Button } from "../ui/button";
import { useForm, SubmitHandler } from "react-hook-form";
import { useSelector } from "react-redux";
import { RootState } from "../../../app/store";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchDesignation } from "../MainMaster/services/masterServices";
import { addEmployee, fetchEmployees } from "./services";

export type Inputs = {
  // Personal Details
  fullname: string;
  email: string;
  mobileNo: string;
  gender: string;
  maritialStatus: string;
  adhaarNo: string;
  panNo: string;
  dob: string;

  // Employment Details
  joiningDate: string;
  probationPeriod: string;
  authority: string;
  designation: string;
  reportingManager: string;

  // Address Details
  city: string;
  state: string;
  country: string;
  pincode: number;
  address: string;
};

const AddnewEmployee = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>();

  const companyName = useSelector((state: RootState) => state.auth.companyName);
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: addEmployee,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employees"] });
      queryClient.invalidateQueries({ queryKey: ["departments"] });
      toast.success("Created Successfully");
      reset();
    },
  });

  const { data: designations = [] } = useQuery({
    queryKey: ["designation"],
    queryFn: fetchDesignation,
    staleTime: Infinity,
  });
  const { data: reportingManager = [] } = useQuery({
    queryKey: ["employees"],
    queryFn: fetchEmployees,
    staleTime: Infinity,
  });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const formData = {
      ...data,
      companyName: companyName,
    };
    mutation.mutate(formData);
  };

  return (
    <div className="w-full max-h-[90vh] dark:bg-primary1 bg-background2 py-2 pr-2 overflow-y-auto">
      <div className=" bg-background1  rounded-lg w-full p-4 text-sm dark:bg-secondary1">
        <div className=" flex justify-between">
          <div className=" ">
            <h1 className=" text-2xl font-bold     ">Add Employee</h1>
            <p className=" text-gray-500 text-sm">
              Add new employees to your company
            </p>
          </div>
          <div className="flex justify-end mt-4">
            <Link
              to={"/employees/view"}
              className="inline-block bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-200 shadow-md"
            >
              Employees List
            </Link>
          </div>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className=" grid md:grid-cols-3 sm:grid-cols-2  gap-4 mt-6 mb-5 ">
            <p className=" col-span-full border-b-2 pb-1 font-semibold">
              Personal Details
            </p>
            <div className=" flex flex-col gap-2">
              <label>Full name</label>
              <input
                {...register("fullname")}
                className=" hover:border-gray-400 dark:hover:border-gray-600  dark:border-primary1  dark:border-[0.2px] dark:bg-secondary1    ease-in-out duration-500 py-2 px-3 border rounded-md border-gray-200 placeholder:text-sm  text-sm"
                type="text"
                placeholder=" name"
              ></input>
            </div>
            <div className=" flex flex-col gap-2">
              <label>Email</label>
              <input
                {...register("email")}
                className=" hover:border-gray-400 dark:hover:border-gray-600  dark:border-primary1  dark:border-[0.2px] dark:bg-secondary1    ease-in-out duration-500 py-2 px-3 border rounded-md border-gray-200 placeholder:text-sm  text-sm"
                type="text"
                placeholder=" email"
              ></input>
            </div>
            <div className=" flex flex-col gap-2">
              <label>Mobile No</label>
              <input
                {...register("mobileNo")}
                className=" hover:border-gray-400 dark:hover:border-gray-600  dark:border-primary1  dark:border-[0.2px] dark:bg-secondary1    ease-in-out duration-500 py-2 px-3 border rounded-md border-gray-200 placeholder:text-sm  text-sm"
                type="text"
                placeholder=" Mobile no"
              ></input>
            </div>
            <div className=" flex flex-col gap-2">
              <label>Gender</label>

              <select
                {...register("gender", { required: true })}
                id="clientname"
                className={`hover:border-gray-400 dark:bg-secondary1 dark:border-primary1 ease-in-out duration-500 py-2 pl-3 border rounded-md border-gray-200 placeholder:text-sm  text-sm  `}
              >
                <option value="">Select</option>
                <option value="male">Male</option>
                <option value="femlae">Female</option>
              </select>
            </div>
            <div className=" flex flex-col gap-2">
              <label>Maritial Status</label>

              <select
                {...register("maritialStatus")}
                id="clientname"
                className={`hover:border-gray-400 dark:bg-secondary1 dark:border-primary1 ease-in-out duration-500 py-2 pl-3 border rounded-md border-gray-200 placeholder:text-sm  text-sm  `}
              >
                <option value="">Select</option>
                <option value="single">Single</option>
                <option value="married">Married</option>
                <option value="devorced">Divorced</option>
              </select>
            </div>
            <div className=" flex flex-col gap-2">
              <label>Aadhaar Number</label>
              <input
                {...register("adhaarNo")}
                className=" hover:border-gray-400 dark:hover:border-gray-600  dark:border-primary1  dark:border-[0.2px] dark:bg-secondary1    ease-in-out duration-500 py-2 px-3 border rounded-md border-gray-200 placeholder:text-sm  text-sm"
                type="number"
                placeholder=" aadhaar number"
              ></input>
            </div>
            <div className=" flex flex-col gap-2">
              <label>Pan Number</label>
              <input
                {...register("panNo")}
                className=" hover:border-gray-400 dark:hover:border-gray-600  dark:border-primary1  dark:border-[0.2px] dark:bg-secondary1    ease-in-out duration-500 py-2 px-3 border rounded-md border-gray-200 placeholder:text-sm  text-sm"
                type="text"
                placeholder=" pan number"
              ></input>
            </div>
            <div className=" flex flex-col gap-2">
              <label>DOB</label>
              <input
                {...register("dob")}
                className=" hover:border-gray-400 dark:hover:border-gray-600  dark:border-primary1  dark:border-[0.2px] dark:bg-secondary1    ease-in-out duration-500 py-2 px-3 border rounded-md border-gray-200 placeholder:text-sm  text-sm"
                type="date"
                placeholder=""
              ></input>
            </div>
          </div>
          <div className=" grid md:grid-cols-3 sm:grid-cols-2  gap-4 mt-6 mb-5 ">
            <p className=" col-span-full border-b-2 pb-1 font-semibold">
              Employeement Details
            </p>

            <div className=" flex flex-col gap-2">
              <label>Joining Date</label>
              <input
                {...register("joiningDate")}
                className=" hover:border-gray-400 dark:hover:border-gray-600  dark:border-primary1  dark:border-[0.2px] dark:bg-secondary1    ease-in-out duration-500 py-2 px-3 border rounded-md border-gray-200 placeholder:text-sm  text-sm"
                type="date"
                placeholder=" name"
              ></input>
            </div>
            <div className=" flex flex-col gap-2">
              <label>Probation Period</label>
              <input
                {...register("probationPeriod")}
                className=" hover:border-gray-400 dark:hover:border-gray-600  dark:border-primary1  dark:border-[0.2px] dark:bg-secondary1    ease-in-out duration-500 py-2 px-3 border rounded-md border-gray-200 placeholder:text-sm  text-sm"
                type="text"
                placeholder=" in months"
              ></input>
            </div>
            <div className=" flex flex-col gap-2">
              <label>Authority</label>

              <select
                {...register("authority")}
                id="clientname"
                className={`hover:border-gray-400 dark:bg-secondary1 dark:border-primary1 ease-in-out duration-500 py-2 pl-3 border rounded-md border-gray-200 placeholder:text-sm  text-sm  `}
              >
                <option value="">Select</option>
                <option value="Employee">Employee</option>
                <option value="ProjectManager">Project Manager</option>
                <option value="HiringManager">Hiring Manager</option>
              </select>
            </div>
            <div className=" flex flex-col gap-2">
              <label>Designation</label>

              <select
                {...register("designation")}
                id="clientname"
                className={`hover:border-gray-400 dark:bg-secondary1 dark:border-primary1 ease-in-out duration-500 py-2 pl-3 border rounded-md border-gray-200 placeholder:text-sm  text-sm  `}
              >
                <option value="">Select</option>
                {designations.map((data) => {
                  return (
                    <option value={data.designation}>{data.designation}</option>
                  );
                })}
              </select>
            </div>
            <div className=" flex flex-col gap-2">
              <label>Reporting manager</label>

              <select
                {...register("reportingManager")}
                id="clientname"
                className={`hover:border-gray-400 dark:bg-secondary1 dark:border-primary1 ease-in-out duration-500 py-2 pl-3 border rounded-md border-gray-200 placeholder:text-sm  text-sm  `}
              >
                <option value="">Select</option>
                {reportingManager.map((data) => {
                  return <option value={data.fullname}>{data.fullname}</option>;
                })}
              </select>
            </div>
          </div>
          <div className=" grid md:grid-cols-3 sm:grid-cols-2  gap-4 mt-6 mb-5 ">
            <p className=" col-span-full border-b-2 pb-1 font-semibold">
              Address Details
            </p>

            <div className=" flex flex-col gap-2">
              <label>City</label>
              <input
                {...register("city")}
                className=" hover:border-gray-400 dark:hover:border-gray-600  dark:border-primary1  dark:border-[0.2px] dark:bg-secondary1    ease-in-out duration-500 py-2 px-3 border rounded-md border-gray-200 placeholder:text-sm  text-sm"
                placeholder=" city"
              ></input>
            </div>
            <div className=" flex flex-col gap-2">
              <label>State</label>
              <input
                {...register("state")}
                className=" hover:border-gray-400 dark:hover:border-gray-600  dark:border-primary1  dark:border-[0.2px] dark:bg-secondary1    ease-in-out duration-500 py-2 px-3 border rounded-md border-gray-200 placeholder:text-sm  text-sm"
                placeholder="state"
              ></input>
            </div>
            <div className=" flex flex-col gap-2">
              <label>Country</label>
              <input
                {...register("country")}
                className=" hover:border-gray-400 dark:hover:border-gray-600  dark:border-primary1  dark:border-[0.2px] dark:bg-secondary1    ease-in-out duration-500 py-2 px-3 border rounded-md border-gray-200 placeholder:text-sm  text-sm"
                placeholder="country"
              ></input>
            </div>
            <div className=" flex flex-col gap-2">
              <label>Pincode</label>
              <input
                {...register("pincode")}
                className=" hover:border-gray-400 dark:hover:border-gray-600  dark:border-primary1  dark:border-[0.2px] dark:bg-secondary1    ease-in-out duration-500 py-2 px-3 border rounded-md border-gray-200 placeholder:text-sm  text-sm"
                type="number"
                placeholder="pincode"
              ></input>
            </div>
            <div className=" flex flex-col gap-2 col-span-2">
              <label>Address</label>
              <textarea
                {...register("address")}
                className=" hover:border-gray-400 dark:hover:border-gray-600  dark:border-primary1  dark:border-[0.2px] dark:bg-secondary1    ease-in-out duration-500 py-2 px-3 border rounded-md border-gray-200 placeholder:text-sm  text-sm"
                placeholder=" address"
              ></textarea>
            </div>
          </div>
          <Button className=" dark:bg-blue-600 dark:text-white" type="submit">
            Add Employee
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AddnewEmployee;
