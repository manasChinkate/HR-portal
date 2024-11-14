
import { Button } from '../../ui/button';
import axios from 'axios'
import { useForm, SubmitHandler } from 'react-hook-form'
import { BASE_URL } from '../../../constants';
import { useSelector } from 'react-redux';
import { RootState } from '../../../app/store'
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import toast from 'react-hot-toast';

type Inputs = {
  projectName: string;
  task: string;
  date: string;
  starttime: string;
  endtime: string;
  totaltime: string;
  remarks: string;

}

const Filltimesheet = () => {

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<Inputs>()


  const [totalTime, setTotalTime] = useState<string>('');
  const [loading, setloading] = useState(false)


  const startTime = watch('starttime');
  const endTime = watch('endtime');

  // Calculate total time whenever start or end time changes
  useEffect(() => {
    if (startTime && endTime) {
      const start = new Date(`1970-01-01T${startTime}`);
      const end = new Date(`1970-01-01T${endTime}`);
      const diff = (end.getTime() - start.getTime()) / (1000 * 60 * 60); // Difference in hours

      if (diff > 0) {
        setTotalTime(diff.toFixed(2) + ' hours');
      } else {
        setTotalTime('');
      }
    }
  }, [startTime, endTime]);


  const [projects, setProjects] = useState<Inputs[]>([]);


  const getProjects = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/getprojects`);
      setProjects(res.data); // Keep original dates for calculations
      setloading(false);
    } catch (error) {
      console.error('Error fetching Projects:', error);
    }
  };

  useEffect(() => {
    getProjects();
  }, []);

  const companyName = useSelector((state: RootState) => state.auth.companyName)

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    // console.log(data)
    const convertTo12HourFormat = (time: string) => {
      const date = new Date(`1970-01-01T${time}`);
      return format(date, 'hh:mm a'); // Format as 12-hour with AM/PM
    };

    const formattedStartTime = convertTo12HourFormat(data.starttime);
  const formattedEndTime = convertTo12HourFormat(data.endtime);

  const formdata = {
    ...data,
    starttime: formattedStartTime,
    endtime: formattedEndTime,
    // companyName: companyName,
    totaltime: totalTime,
  };

    console.log(formdata)
    const res = await axios.post(`${BASE_URL}/addtimesheet`, formdata)

    if (res.status === 201) {
        reset()
        toast.success("Added Successfully")
    }else{
      toast.error("Failed adding Timesheet")
    }
}






  return (
    <div className='w-full min-h-[90vh] dark:bg-primary1 bg-[#e5e7ec] p-2 overflow-y-auto'>
      <div className=' bg-white  rounded-lg w-full p-4 text-sm dark:bg-secondary1' >

        <div className=' '>
          <h1 className=' text-2xl font-bold     '>Fill Timesheet</h1>
          <p className=' text-gray-500 text-sm'>Add your daily activity</p>
        </div>
        <div className='flex justify-end mt-4'>
                    <Link
                        to={'/timesheet-history'}
                        className='inline-block bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-200 shadow-md'
                    >
                        Timesheet History
                    </Link>
                </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className=' grid md:grid-cols-3 sm:grid-cols-2  gap-4 mt-6 mb-5 '>

            <p className=' col-span-full border-b-2 pb-1 font-semibold'>Project/Task Details</p>
            <div className=' flex flex-col gap-2'>
              <label>Select Project</label>

              <select
                {...register("projectName", { required: true })}
                id="clientname"
                className={`hover:border-gray-400 dark:bg-secondary1 dark:border-gray-700 ease-in-out duration-500 py-2 pl-3 border rounded-md border-gray-200 placeholder:text-sm  text-sm  `}
              >
                <option value="">Select</option>
                {
                  projects.map((e)=>{
                    return(
                      <option value={e.projectName}>{e.projectName}</option>
                    )
                  })
                }
              </select>
            </div>
            <div className=' flex flex-col gap-2'>
              <label>Task performed</label>
              <textarea
                {...register("task")}
                className=' hover:border-gray-400 dark:hover:border-blue-900  dark:border-gray-700  dark:border-[0.2px] dark:bg-[#121212]    ease-in-out duration-500 py-2 px-3 border rounded-md border-gray-200 placeholder:text-sm  text-sm' placeholder=' Task performed by you today'></textarea>
            </div>


            <div className=' flex flex-col gap-2'>
              <label>Date</label>
              <input
                {...register("date")}
                className=' hover:border-gray-400 dark:hover:border-blue-900  dark:border-gray-700  dark:border-[0.2px] dark:bg-[#121212]    ease-in-out duration-500 py-2 px-3 border rounded-md border-gray-200 placeholder:text-sm  text-sm' type='date' placeholder=' name'></input>
            </div> 
            <div className=' flex flex-col gap-2'>
              <label>Start Time</label>
              <input
                {...register("starttime")}

                className=' hover:border-gray-400 dark:hover:border-blue-900  dark:border-gray-700  dark:border-[0.2px] dark:bg-[#121212]    ease-in-out duration-500 py-2 px-3 border rounded-md border-gray-200 placeholder:text-sm  text-sm' type='time' placeholder=' start time'></input>
            </div>
            <div className=' flex flex-col gap-2'>
              <label>End Time</label>
              <input
                {...register("endtime")}

                className=' hover:border-gray-400 dark:hover:border-blue-900  dark:border-gray-700  dark:border-[0.2px] dark:bg-[#121212]    ease-in-out duration-500 py-2 px-3 border rounded-md border-gray-200 placeholder:text-sm  text-sm' type='time' placeholder=' end time'></input>
            </div>
            <div className=' flex flex-col gap-2'>
              <label>Total time (In Hours) </label>
              <input
                {...register("totaltime")}
                value={totalTime} readOnly
                className=' hover:border-gray-400 dark:hover:border-blue-900  dark:border-gray-700  dark:border-[0.2px] dark:bg-[#121212]    ease-in-out duration-500 py-2 px-3 border rounded-md border-gray-200 placeholder:text-sm  text-sm' type='text' placeholder=' start time'></input>
            </div>
            <div className=' flex flex-col gap-2 col-span-3'>
              <label>Additional Remarks</label>
              <textarea
                {...register("remarks")}
                className=' hover:border-gray-400 dark:hover:border-blue-900  dark:border-gray-700  dark:border-[0.2px] dark:bg-[#121212]    ease-in-out duration-500 py-2 px-3 border rounded-md border-gray-200 placeholder:text-sm  text-sm' placeholder=' any remarks'></textarea>
            </div>




          </div>
          <Button className=' dark:bg-blue-600 dark:text-white' type='submit'>
            Fill Timesheet
          </Button>
        </form>
      </div >

    </div >
  )
}

export default Filltimesheet