import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { BASE_URL } from '../../constants';


type Inputs =  {
    _id: string;
    projectName: string;
    clientName: string;
    projectManager: string;
    startDate: string;
    deadline: string;
    priority: 'High' | 'Medium' | 'Low';
    description: string;
    companyName: string;
    createdAt: string;
    __v: number;
}

const OngoingProjects = () => {
  const [projects,setprojects] = useState<Inputs[]>([])
  const [loading,setloading] = useState(true)


  const getProjects = async () => {
    try {
        const res = await axios.get(`${BASE_URL}/getprojects`);
        const formattedProjects = res.data.map((project: Inputs) => ({
            ...project,
            startDate: new Date(project.startDate).toLocaleDateString('en-GB'),
            deadline: new Date(project.deadline).toLocaleDateString('en-GB'),
          }));
          setprojects(formattedProjects);
        // setprojects(res.data)
        console.log( 'projects :',projects);
        setloading(false)

    } catch (error) {
        // Handle any errors that occur during the request
        console.error('Error fetching Projects:', error);
    }
}



useEffect(()=>{
    getProjects()
},[])

  return (
    <div className="p-6 min-h-screen bg-gray-100 dark:bg-black">
      <h2 className="text-2xl font-bold mb-6 text-gray-700 dark:text-gray-100">Ongoing Projects</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <div
            key={project.id}
            className="bg-white dark:bg-[#121212] shadow-lg rounded-lg p-6 border border-gray-200 dark:border-gray-700"
          >
            <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-2">{project.projectName}</h1>
            <p className="text-gray-600 dark:text-gray-400 mb-4">{project.companyName}</p>
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">{project.description}</p>
            <p className="text-gray-700 dark:text-gray-300 mb-1">
              <span className="font-semibold">Assigned To:</span> {project.projectManager}
            </p>
            <p className="text-gray-700 dark:text-gray-300 mb-1">
              <span className="font-semibold">Start Date:</span> {project.startDate}
            </p>
            <p className="text-gray-700 dark:text-gray-300 mb-1">
              <span className="font-semibold">Deadline:</span> {project.deadline}
            </p>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              <span className="font-semibold">Priority:</span>{' '}
              <span
                className={`px-2 py-1 rounded-full text-white ${
                  project.priority === 'High'
                    ? 'bg-red-500'
                    : project.priority === 'Medium'
                    ? 'bg-yellow-500'
                    : 'bg-green-500'
                }`}
              >
                {project.priority}
              </span>
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default OngoingProjects
