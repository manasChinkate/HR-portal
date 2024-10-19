const  jwt  = require("jsonwebtoken");
const ProjectModel = require("../models/Project");


const CreateProject = async(req, res)=>{
    try {
        const project = req.body;

        if(project){
            const data =  await ProjectModel.create(project) 
             // console.log(data)
             res.status(201).json('Created successfully')
         }else{
             res.status(500).json('Error Creating ')
             console.log('error')
     
         }
    } catch (error) {
        res.status(500).json('Internal Server Error')
        console.log('Internal Server Error')
    }
}


const getProjects = async(req,res)=>{
    try {
        const token = req.headers.token;

        if (!token) {
            return res.status(401).json({ message: 'No token provided' });
        }

        const decodedtoken = jwt.verify(token, 'jwt-secret-key')

        const companyName = decodedtoken.companyName;


        const Projects = await ProjectModel.find({companyName})
        if (Projects.length === 0) {
            return res.status(404).json({ message: 'No projects found for this company.' });
        }

        res.status(200).json(Projects);
    } catch (error) {
        res.status(500).json('Internal Server Error');
    }
}


module.exports = { CreateProject, getProjects }