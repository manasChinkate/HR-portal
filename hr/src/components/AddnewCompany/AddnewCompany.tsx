import React from 'react'
import { Select } from '../ui/select'
import { Button } from '../ui/button'

const AddnewCompany = () => {
    return (
        <div className='w-full max-h-[90vh] bg-[#e5e7ec] p-2 overflow-y-auto'>
            <div className=' bg-white  rounded-lg w-full p-4 text-sm' >

                <div className=' '>
                    <h1 className=' text-2xl font-bold     '>Create Company</h1>
                    <p className=' text-gray-500 text-xs'>create your new company</p>
                </div>

                <form>
                    <div className=' grid md:grid-cols-3 sm:grid-cols-2  gap-4 mt-6 '>
                        <p className=' col-span-full border-b-2 pb-3 font-semibold'>Owner Details</p>
                        <div className=' flex flex-col gap-2'>
                            <label>Full Name</label>
                            <input className=' hover:border-gray-400    ease-in-out duration-500 py-2 pl-3 border rounded-md border-gray-200 placeholder:text-xs italic text-xs' placeholder=' name'></input>
                        </div>
                        <div className=' flex flex-col gap-2'>
                            <label>Email</label>
                            <input className=' hover:border-gray-400 ease-in-out duration-500 py-2 pl-3 border rounded-md border-gray-200 placeholder:text-xs italic text-xs' placeholder='email'></input>
                        </div>
                        <div className=' flex flex-col gap-2'>
                            <label>Mobile No.</label>
                            <input className=' hover:border-gray-400 ease-in-out duration-500 py-2 pl-3 border rounded-md border-gray-200 placeholder:text-xs  text-xs italic' type='number' placeholder='Mobile No.'></input>
                        </div>
                        <div className=' flex flex-col gap-2'>
                            <label>Gender</label>

                            <select
                                // {...register("client_name", { required: true })}
                                id="clientname"
                                className={`hover:border-gray-400 ease-in-out duration-500 py-2 pl-3 border rounded-md border-gray-200 placeholder:text-xs  text-xs italic `}
                            >
                                <option value="">Select</option>
                                <option value="male">Male</option>
                                <option value="femlae">Female</option>
                                
                               
                            
                            </select>
                        </div>
                        <div className=' flex flex-col gap-2'>
                            <label>Aadhaar Number</label>
                            <input className=' hover:border-gray-400 ease-in-out duration-500 py-2 pl-3 border rounded-md border-gray-200 text-xs placeholder:text-xs italic  ' type='number' placeholder=' aadhaar number'></input>
                        </div>
                        <div className=' flex flex-col gap-2'>
                            <label>Pan Number</label>
                            <input className=' hover:border-gray-400 ease-in-out duration-500 py-2 pl-3 border rounded-md border-gray-200 text-xs placeholder:text-xs italic' type='number' placeholder=' pan number'></input>
                        </div>
                      

                    </div>
                    <div className=' grid md:grid-cols-3 sm:grid-cols-2  gap-4 mt-6 '>

                        <p className=' col-span-full border-b-2 pb-1 font-semibold'>Company Details</p>
                        <div className=' flex flex-col gap-2'>
                            <label>Company Name</label>
                            <input className=' hover:border-gray-400    ease-in-out duration-500 py-2 pl-3 border rounded-md border-gray-200 text-xs placeholder:text-xs italic' placeholder=' company name'></input>
                        </div>
                        <div className=' flex flex-col gap-2'>
                            <label>Compnay Prefix</label>
                            <input className=' hover:border-gray-400    ease-in-out duration-500 py-2 pl-3 border rounded-md border-gray-200 text-xs placeholder:text-xs italic' placeholder=' prefix'></input>
                        </div>
                        <div className=' flex flex-col gap-2'>
                            <label>Total Employee Count</label>
                            <input className=' hover:border-gray-400    ease-in-out duration-500 py-2 pl-3 border rounded-md border-gray-200 text-xs placeholder:text-xs italic' placeholder=' No. of employees'></input>
                        </div>
                        
                        

                    </div>
                    <div className=' grid md:grid-cols-3 sm:grid-cols-2  gap-4 mt-6 mb-5 '>

                        <p className=' col-span-full border-b-2 pb-1 font-semibold'>Address Details</p>
                        <div className=' flex flex-col gap-2'>
                            <label>City</label>
                            <input className=' hover:border-gray-400 ease-in-out duration-500 py-2 pl-3 border rounded-md border-gray-200 text-xs placeholder:text-xs italic ' placeholder=' city'></input>
                        </div>
                        <div className=' flex flex-col gap-2'>
                            <label>State</label>
                            <input className=' hover:border-gray-400 ease-in-out duration-500 py-2 pl-3 border rounded-md border-gray-200 text-xs placeholder:text-xs italic ' placeholder='state'></input>
                        </div>
                        <div className=' flex flex-col gap-2'>
                            <label>Country</label>
                            <input className=' hover:border-gray-400 ease-in-out duration-500 py-2 pl-3 border rounded-md border-gray-200 text-xs placeholder:text-xs italic ' placeholder='country'></input>
                        </div>
                        <div className=' flex flex-col gap-2'>
                            <label>Pincode</label>
                            <input className=' hover:border-gray-400 ease-in-out duration-500 py-2 pl-3 border rounded-md border-gray-200 text-xs placeholder:text-xs italic ' type='number' placeholder='pincode'></input>
                        </div>
                        <div className=' flex flex-col gap-2'>
                            <label>Address</label>
                            <textarea className=' hover:border-gray-400 ease-in-out duration-500 py-2 pl-3 border rounded-md border-gray-200 text-xs placeholder:text-xs italic ' placeholder=' Input 1'></textarea>
                        </div>
                        

                    </div>
                    <Button>
                        Add Company
                    </Button>
                </form>
            </div>
        </div>
    )
}

export default AddnewCompany