import { useEffect, useState } from "react";
import { Button } from "../../ui/button"
import { BASE_URL } from "../../../constants";
import axios from "axios";

type Inputs = {
    clientName: string;
    state: string;
    country: string;
    authority:string;
    fullname:string;

}
const ProjectDetails = () => {
    const [clients, setClient] = useState<Inputs[]>([])
    const [ProjectM, setProjectM] = useState<Inputs[]>([])
    const [FilteredPm, setFilteredPm] = useState<Inputs[]>([])
    const [loading, setloading] = useState(true)

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

    const getPm = async () =>{
        const res = await axios.get(`${BASE_URL}/reportingmanager`)
        setProjectM(res.data)
        console.log('ProjectM :', ProjectM)

         filtered = ProjectM.filter((e: Inputs) => e.authority === 'ProjectManager');
        // console.log(filtered)
        setFilteredPm(filtered)
    
    }

    useEffect(()=>{
        getClient()
        getPm()
    },[])

    return (
        <div className='w-full min-h-[90vh] bg-[#e5e7ec] dark:bg-primary1 p-2 overflow-y-auto'>
            <div className=' bg-white dark:bg-secondary1  rounded-lg w-full p-4 text-sm' >
                <div className=' border-b border-gray-200 pb-2'>
                    <h1 className=' text-2xl font-bold      '>Add Project</h1>
                    <p className=' text-gray-500 text-sm'>Add Projects here</p>
                </div>
                <form  >

                    <div className=' grid md:grid-cols-3 sm:grid-cols-2  gap-4 mt-4 mb-5 '>
                    <div className=' flex flex-col gap-2'>
                            <label>Project Name</label>
                            <input

                                // {...register("count")}

                                className=' hover:border-gray-400 dark:hover:border-gray-600 dark:border-gray-700 dark:border-[0.2px] dark:bg-[#121212]    ease-in-out duration-500 py-2 px-3 border rounded-md border-gray-200 placeholder:text-sm  text-sm' type='text' placeholder='name of your project' ></input>
                        </div>
                    <div className=' flex flex-col gap-2'>
                            <label>Client</label>
                            <select
                                // {...register("leaveType")}
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
                            <label>Project Manager</label>
                            <select
                                // {...register("leaveType")}
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

                                // {...register("from_date")}

                                className=' hover:border-gray-400 dark:hover:border-gray-600 dark:border-black dark:border-[0.2px] dark:bg-[#121212]    ease-in-out duration-500 py-2 px-3 border rounded-md border-gray-200 placeholder:text-sm  text-sm' type='date' placeholder='holiday'></input>
                        </div>
                        <div className=' flex flex-col gap-2'>
                            <label>Deadline</label>
                            <input

                                // {...register("from_date")}

                                className=' hover:border-gray-400 dark:hover:border-gray-600 dark:border-black dark:border-[0.2px] dark:bg-[#121212]    ease-in-out duration-500 py-2 px-3 border rounded-md border-gray-200 placeholder:text-sm  text-sm' type='date' placeholder='holiday'></input>
                        </div>
                    </div>
                    <Button className=' dark:bg-[#3b5ae4] dark:text-[#ffffff] dark:shadow-[#1f1f1f] dark:shadow-md  ' type='submit'>
                        Add
                    </Button>
                </form>
            </div>
        </div>
    )
}

export default ProjectDetails