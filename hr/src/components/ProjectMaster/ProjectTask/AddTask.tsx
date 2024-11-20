import { Button } from "../../ui/button"


const AddTask = () => {
    return (
        <div className='w-full min-h-[90vh] bg-background2  dark:bg-primary1 pt-2 overflow-y-auto'>
            
           
            <div className='w-full min-h-[90vh] bg-background2 dark:bg-primary1  overflow-y-auto'>
                <div className=' bg-background1 dark:bg-secondary1  rounded-lg w-full p-4 text-sm' >
                    <div className=' border-b border-gray-200 pb-2'>
                        <h1 className=' text-2xl font-bold      '>Add Project</h1>
                        <p className=' text-gray-500 text-sm'>Add Projects here</p>
                    </div>
                    <form className="flex flex-col gap-2"  >

                        <div className=' grid md:grid-cols-3 sm:grid-cols-2  gap-4 mt-4 mb-5 '>
                            <div className=' flex flex-col gap-2'>
                                <label>Add Task</label>
                                <input

                                    // {...register("projectName")}

                                    className=' hover:border-gray-400 dark:hover:border-gray-600 dark:border-gray-700 dark:border-[0.2px] dark:bg-[#121212]    ease-in-out duration-500 py-2 px-3 border rounded-md border-gray-200 placeholder:text-sm  text-sm' type='text' placeholder='name of your project' ></input>
                            </div>
                            
                            <div className=' flex flex-col gap-2'>
                                <label>Select Project</label>
                                <select
                                    // {...register("projectManager")}
                                    id="clientname"
                                    className={`hover:border-gray-400 dark:bg-secondary1 dark:border-gray-700 ease-in-out duration-500 py-2 pl-3 border rounded-md border-gray-200 placeholder:text-sm  text-sm  `}
                                >
                                    <option value="">Select</option>
                                    {/* {
                                        FilteredPm.map((e) => {
                                            return (
                                                <option value={e.fullname}>{e.fullname}</option>
                                            )
                                        })
                                    } */}
                                </select>
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

export default AddTask