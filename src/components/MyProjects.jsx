import React, { useContext, useEffect, useState } from 'react'
import AddProject from './AddProject'
import { deleteProjectApi, userProjectApi } from '../services/allAPI'
import { addProjectResponseContext, editProjectResponseContext } from '../context/ContextShare'
import EditProject from './EditProject'

function MyProjects() {
  const { addProjectResponse, setAddProjectResponse } = useContext(addProjectResponseContext)
  const { editProjectResponse, setEditProjectResponse } = useContext(editProjectResponseContext)
  const [userProject, setUserProject] = useState([])

  const getUserProject = async () => {
    const token = sessionStorage.getItem("token")
    const reqHeader = {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    }
    const result = await userProjectApi(reqHeader);
    console.log("====inside my projects==")
    console.log(result.data)
    setUserProject(result.data)
  }

  useEffect(() => {
    getUserProject();
  }, [addProjectResponse, editProjectResponse])

  const handleDelete = async (id) => {
    const token = sessionStorage.getItem("token")
    const reqHeader = {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    }
    const result = await deleteProjectApi(id, reqHeader)
    if (result.status === 200) {
      alert("Project deleted successfully");
      getUserProject()
    }
  }

  return (
    <>
      <div className='card shadow p-4 p-md-5 mx-3 mb-5'>
        <div className='d-flex flex-column flex-md-row align-items-start align-items-md-center'>
          <h3 className='text-success mb-3 mb-md-0'>My Projects</h3>
          <div className='ms-md-auto'>
            <AddProject />
          </div>
        </div>
        <div className='mt-3'>
          {
            userProject.length > 0 ?
              userProject.map((item) => (
                <div
                  key={item._id}
                  className='border d-flex flex-column flex-sm-row align-items-start align-items-sm-center rounded p-2 mb-3'
                >
                  <h5 className='mb-2 mb-sm-0'>{item.title}</h5>
                  <div className='ms-sm-auto d-flex gap-2'>
                    <EditProject project={item} />
                    <a href={item.github} target='_blank' rel="noreferrer" className='btn p-1'>
                      <i className="fa-brands fa-github text-success"></i>
                    </a>
                    <button className='btn p-1' onClick={() => handleDelete(item._id)}>
                      <i className="fa-solid fa-trash text-danger"></i>
                    </button>
                  </div>
                </div>
              )) :
              <p className='text-danger fw-bolder fs-5 mt-3'>No projects uploaded yet!!</p>
          }
        </div>
      </div>
    </>
  )
}

export default MyProjects
