import { Button } from "../ui/button";
import axios from "axios";
import { useForm, SubmitHandler } from "react-hook-form";
import { BASE_URL } from "../../constants";
import { Link } from "react-router-dom";

type Inputs = {
  fromdate: string;
  todate: string;
  fullname: string;
  email: string;
  MobileNo: string;
  Gender: string;
  AadharNumber: number;
  PanNumber: string;
  CompanyName: string;
  CompanyPrefix: string;
  NoofEmployee: number;
  city: string;
  state: string;
  country: string;
  pincode: number;
  address: string;
  authority: string;
};

const AddnewCompany = () => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    console.log(data);
    const res = await axios.post(`${BASE_URL}/company`, data);

    if (res.status === 201) {
      reset();
    }
  };

  return (
    <div className="w-full max-h-[90vh] bg-background2 flex flex-col gap-2 dark:bg-primary1 py-2 pr-2 overflow-y-auto">
      <div className=" bg-background1 dark:bg-secondary1  rounded-lg w-full p-4 text-sm">
        <div className=" flex justify-between">
          <div className=" ">
            <h1 className=" text-2xl font-bold     ">Add Company</h1>
            <p className=" text-gray-500 text-sm">Add new company</p>
          </div>
          <div className="flex justify-end mt-4">
            <Link
              to={"/company/view"}
              className="inline-block bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-200 shadow-md"
            >
              Company List
            </Link>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className=" grid md:grid-cols-3 sm:grid-cols-2  gap-4 mt-6 mb-5 ">
            <p className=" col-span-full border-b-2 pb-1 font-semibold">
              Duration of Company
            </p>
            <div className=" flex flex-col gap-2">
              <label>From Date</label>
              <input
                {...register("fromdate")}
                className=" hover:border-gray-400 dark:hover:border-gray-600  dark:border-primary1  dark:border-[0.2px] dark:bg-secondary1    ease-in-out duration-500 py-2 px-3 border rounded-md border-gray-200 placeholder:text-sm  text-sm"
                type="date"
                placeholder=" name"
              ></input>
            </div>
            <div className=" flex flex-col gap-2">
              <label>To Date</label>
              <input
                {...register("todate")}
                className=" hover:border-gray-400 dark:hover:border-gray-600  dark:border-primary1  dark:border-[0.2px] dark:bg-secondary1    ease-in-out duration-500 py-2 px-3 border rounded-md border-gray-200 placeholder:text-sm  text-sm"
                type="date"
                placeholder=" name"
              ></input>
            </div>
          </div>
          <div className=" grid md:grid-cols-3 sm:grid-cols-2  gap-4 mt-6 ">
            <p className=" col-span-full border-b-2 pb-3 font-semibold">
              Owner Details
            </p>
            <div className=" flex flex-col gap-2">
              <label>Full Name</label>
              <input
                {...register("fullname")}
                className=" hover:border-gray-400 dark:hover:border-gray-600  dark:border-primary1  dark:border-[0.2px] dark:bg-secondary1    ease-in-out duration-500 py-2 px-3 border rounded-md border-gray-200 placeholder:text-sm  text-sm"
                placeholder=" name"
              ></input>
            </div>
            <div className=" flex flex-col gap-2">
              <label>Email</label>
              <input
                {...register("email")}
                className=" hover:border-gray-400 dark:hover:border-gray-600  dark:border-primary1  dark:border-[0.2px] dark:bg-secondary1    ease-in-out duration-500 py-2 px-3 border rounded-md border-gray-200 placeholder:text-sm  text-sm"
                placeholder="email"
              ></input>
            </div>
            <div className=" flex flex-col gap-2">
              <label>Mobile No.</label>
              <input
                {...register("MobileNo")}
                className=" hover:border-gray-400 dark:hover:border-gray-600  dark:border-primary1  dark:border-[0.2px] dark:bg-secondary1    ease-in-out duration-500 py-2 px-3 border rounded-md border-gray-200 placeholder:text-sm  text-sm"
                type="number"
                placeholder="Mobile No."
              ></input>
            </div>
            <div className=" flex flex-col gap-2">
              <label>Gender</label>

              <select
                {...register("Gender", { required: true })}
                id="clientname"
                className=" hover:border-gray-400 dark:hover:border-gray-600  dark:border-primary1  dark:border-[0.2px] dark:bg-secondary1    ease-in-out duration-500 py-2 px-3 border rounded-md border-gray-200 placeholder:text-sm  text-sm"
              >
                <option value="">Select</option>
                <option value="male">Male</option>
                <option value="femlae">Female</option>
              </select>
            </div>
            <div className=" flex flex-col gap-2">
              <label>Aadhaar Number</label>
              <input
                {...register("AadharNumber")}
                className=" hover:border-gray-400 dark:hover:border-gray-600  dark:border-primary1  dark:border-[0.2px] dark:bg-secondary1    ease-in-out duration-500 py-2 px-3 border rounded-md border-gray-200 placeholder:text-sm  text-sm"
                type="number"
                placeholder=" aadhaar number"
              ></input>
            </div>
            <div className=" flex flex-col gap-2">
              <label>Pan Number</label>
              <input
                {...register("PanNumber")}
                className=" hover:border-gray-400 dark:hover:border-gray-600  dark:border-primary1  dark:border-[0.2px] dark:bg-secondary1    ease-in-out duration-500 py-2 px-3 border rounded-md border-gray-200 placeholder:text-sm  text-sm"
                type="text"
                placeholder=" pan number"
              ></input>
            </div>
          </div>
          <div className=" grid md:grid-cols-3 sm:grid-cols-2  gap-4 mt-6 ">
            <p className=" col-span-full border-b-2 pb-1 font-semibold">
              Company Details
            </p>
            <div className=" flex flex-col gap-2">
              <label>Company Name</label>
              <input
                {...register("CompanyName")}
                className=" hover:border-gray-400 dark:hover:border-gray-600  dark:border-primary1  dark:border-[0.2px] dark:bg-secondary1    ease-in-out duration-500 py-2 px-3 border rounded-md border-gray-200 placeholder:text-sm  text-sm"
                placeholder=" company name"
              ></input>
            </div>
            <div className=" flex flex-col gap-2">
              <label>Compnay Prefix</label>
              <input
                {...register("CompanyPrefix")}
                className=" hover:border-gray-400 dark:hover:border-gray-600  dark:border-primary1  dark:border-[0.2px] dark:bg-secondary1    ease-in-out duration-500 py-2 px-3 border rounded-md border-gray-200 placeholder:text-sm  text-sm"
                placeholder=" prefix"
              ></input>
            </div>
            <div className=" flex flex-col gap-2">
              <label>Total Employee Count</label>
              <input
                {...register("NoofEmployee")}
                className=" hover:border-gray-400 dark:hover:border-gray-600  dark:border-primary1  dark:border-[0.2px] dark:bg-secondary1    ease-in-out duration-500 py-2 px-3 border rounded-md border-gray-200 placeholder:text-sm  text-sm"
                placeholder=" No. of employees"
              ></input>
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
          <Button type="submit">Add Company</Button>
        </form>
      </div>
    </div>
  );
};

export default AddnewCompany;
