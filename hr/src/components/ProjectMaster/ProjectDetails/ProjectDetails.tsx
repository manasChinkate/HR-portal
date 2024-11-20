import { useEffect, useState } from "react";
import { Button } from "../../ui/button"
import { BASE_URL } from "../../../constants";
import axios from "axios";
import { useForm, SubmitHandler } from 'react-hook-form'
import { RootState } from "../../../../app/store";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

type Inputs = {
    clientName: string;
    authority:string;
    fullname:string;
    projectName:string,
    // clientName:String,
    projectManager:string,
    startDate:string,
    deadline:string,
    priority:string,
    description:string,
}
const ProjectDetails = () => {
    const [clients, setClient] = useState<Inputs[]>([])
    const [ProjectM, setProjectM] = useState<Inputs[]>([])
    const [FilteredPm, setFilteredPm] = useState<Inputs[]>([])
    const [loading, setloading] = useState(true)

    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors },
    } = useForm<Inputs>()

    let filtered;
    
    const getClient = async () => {
        try {
            const res = await axios.get(`${BASE_URL}/getclient`);
            // Handle the response, e.g., store in state or display the data
            console.log(res.data);
            setClient(res.data.clients)
            // setloading(false)

        } catch (error) {
            // Handle any errors that occur during the request
            console.error('Error fetching Clients:', error);
        }
    }

    const getPm = async () => {
        try {
            const res = await axios.get(`${BASE_URL}/reportingmanager`);
            setProjectM(res.data);
    
            const filtered = res.data.filter((e: Inputs) => e.authority === 'ProjectManager');
            setFilteredPm(filtered);
        } catch (error) {
            console.error('Error fetching project managers:', error);
        }
    };
    
    const companyName = useSelector((state: RootState) => state.auth.companyName)
    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        console.log(data)
        const formdata = {
            ...data,
            companyName: companyName
        }

        try {
            const res = await axios.post(`${BASE_URL}/projects`, formdata)

            if (res.status === 201) {
                reset()
                // getClient()
                toast.success("Added Successfully")
            }
        } catch (error) {
            toast.error("Failed adding client");

        }


    }

    useEffect(()=>{
        getClient()
        getPm()
    },[])

    return (
        <div className='w-full min-h-[90vh] bg-background2 dark:bg-primary1 pt-2 overflow-y-auto'>
        <div className='w-full min-h-[90vh] bg-background2 dark:bg-primary1  overflow-y-auto'>
            <div className=' bg-background1 dark:bg-secondary1  rounded-lg w-full p-4 text-sm' >
                <div className=' border-b border-gray-200 pb-2'>
                    <h1 className=' text-2xl font-bold      '>Add Project</h1>
                    <p className=' text-gray-500 text-sm'>Add Projects here</p>
                </div>
                <form onSubmit={handleSubmit(onSubmit)} >

                    <div className=' grid md:grid-cols-3 sm:grid-cols-2  gap-4 mt-4 mb-5 '>
                    <div className=' flex flex-col gap-2'>
                            <label>Project Name</label>
                            <input

                                {...register("projectName")}

                                className=' hover:border-gray-400 dark:hover:border-gray-600 dark:border-gray-700 dark:border-[0.2px] dark:bg-[#121212]    ease-in-out duration-500 py-2 px-3 border rounded-md border-gray-200 placeholder:text-sm  text-sm' type='text' placeholder='name of your project' ></input>
                        </div>
                    <div className=' flex flex-col gap-2'>
                            <label>Client</label>
                            <select
                                {...register("clientName")}
                                id="clientname"
                                className={`hover:border-gray-400 dark:bg-secondary1 dark:border-gray-700 ease-in-out duration-500 py-2 pl-3 border rounded-md border-gray-200 placeholder:text-sm  text-sm  `}
                            >
                                <option value="">Select</option>
                                {
                                    clients.map((e)=>{
                                        return(
                                            <option value={e.clientName}>{e.clientName}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                    <div className=' flex flex-col gap-2'>
                            <label>Assign Project Manager</label>
                            <select
                                {...register("projectManager")}
                                id="clientname"
                                className={`hover:border-gray-400 dark:bg-secondary1 dark:border-gray-700 ease-in-out duration-500 py-2 pl-3 border rounded-md border-gray-200 placeholder:text-sm  text-sm  `}
                            >
                                <option value="">Select</option>
                                {
                                    FilteredPm.map((e)=>{
                                        return(
                                            <option value={e.fullname}>{e.fullname}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                        <div className=' flex flex-col gap-2'>
                            <label>Start Date</label>
                            <input

                                {...register("startDate")}

                                className=' hover:border-gray-400 dark:hover:border-gray-600 dark:border-black dark:border-[0.2px] dark:bg-[#121212]    ease-in-out duration-500 py-2 px-3 border rounded-md border-gray-200 placeholder:text-sm  text-sm' type='date' placeholder='holiday'></input>
                        </div>
                        <div className=' flex flex-col gap-2'>
                            <label>Deadline</label>
                            <input

                                {...register("deadline")}

                                className=' hover:border-gray-400 dark:hover:border-gray-600 dark:border-black dark:border-[0.2px] dark:bg-[#121212]    ease-in-out duration-500 py-2 px-3 border rounded-md border-gray-200 placeholder:text-sm  text-sm' type='date' placeholder='holiday'></input>
                        </div>
                        <div className=' flex flex-col gap-2'>
                            <label>Priority</label>
                            <select
                                {...register("priority")}
                                id="clientname"
                                className={`hover:border-gray-400 dark:bg-secondary1 dark:border-gray-700 ease-in-out duration-500 py-2 pl-3 border rounded-md border-gray-200 placeholder:text-sm  text-sm  `}
                            >
                                <option value="">Select</option>
                                <option value="Low">Low</option>
                                <option value="Medium">Medium</option>
                                <option value="High">High</option>
                               
                            </select>
                        </div>
                        <div className=' flex flex-col gap-2 col-span-3'>
                            <label>Project Description</label>
                            <textarea
                                {...register("description")}
                                className=' hover:border-gray-400 dark:hover:border-blue-900  dark:border-gray-700  dark:border-[0.2px] dark:bg-[#121212]    ease-in-out duration-500 py-2 px-3 border rounded-md border-gray-200 placeholder:text-sm  text-sm' placeholder=' description'></textarea>
                        </div>
                    </div>
                    <Button className=' dark:bg-[#3b5ae4] dark:text-[#ffffff] dark:shadow-[#1f1f1f] dark:shadow-md  ' type='submit'>
                        Add
                    </Button>
                </form>
            </div>
            </div>
        </div>
    )
}

export default ProjectDetails