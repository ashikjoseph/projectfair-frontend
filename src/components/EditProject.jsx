import React, { useContext, useEffect } from 'react'
import { Button } from 'react-bootstrap'
import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';
import { BASE_URL } from '../services/baseurl';
import { editUserProjectApi } from '../services/allAPI';
import { editProjectResponseContext } from '../context/ContextShare';

function EditProject({ project }) {
  const { editProjectResponse, setEditProjectResponse } = useContext(editProjectResponseContext)
  const [preview, setPreview] = useState("")
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [projectDetails, setProjectDetails] = useState({
    id: project._id,
    title: project.title,
    technologies: project.technologies,
    github: project.github,
    website: project.website,
    overview: project.overview,
    projectImage: ""
  })
  useEffect(() => {
    if (projectDetails.projectImage) {
      setPreview(URL.createObjectURL(projectDetails.projectImage))
    }
  }, [projectDetails.projectImage])
  const handleReset = () => {
    setProjectDetails({
      title: project.title,
      technologies: project.technologies,
      github: project.github,
      website: project.website,
      overview: project.overview,
      projectImage: ""
    })
    setPreview("")
  }
  const handleUpdate = async (e) => {
    e.preventDefault()
    const { title, technologies, github, website, overview, id, projectImage } = projectDetails;
    if (!title || !technologies || !github || !website || !overview || !id) {
      alert("Please fill the form completely")
    }
    else {
      const reqBody = new FormData();
      reqBody.append("title", title);
      reqBody.append("technologies", technologies);
      reqBody.append("github", github);
      reqBody.append("website", website);
      reqBody.append("overview", overview);
      preview ? reqBody.append("projectImage", projectImage) :
        reqBody.append("projectImage", project.projectImage)
      const token = sessionStorage.getItem("token");
      if (preview) {
        const reqHeader = {
          "Content-Type": "multipart/form-data",
          "Authorization": `Bearer ${token}`
        }
        const result = await editUserProjectApi(id, reqBody, reqHeader);
        console.log(result)
        if (result.status === 200) {
          setEditProjectResponse(result)
          alert("Project updated successfully");
          handleClose()
        }
        else {
          alert(result.response.data)
        }
      }
      else {
        const reqHeader = {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
        const result = await editUserProjectApi(id, reqBody, reqHeader);
        console.log(result)
        if (result.status === 200) {
          setEditProjectResponse(result)
          alert("Project updated successfully");
          handleClose()
        }
        else {
          alert(result.response.data)
        }
      }
    }
  }
  return (
    <>
      <button className='btn'><i className="fa-solid fa-pen-to-square text-info" onClick={handleShow}></i></button>

      <Modal show={show} onHide={handleClose} size='lg'>
        <Modal.Header closeButton>
          <Modal.Title>Edit Project</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div className="row">
            <div className="col-12 col-md-6 mb-3 mb-md-0">
              <label htmlFor="projectImageupload" className='d-block text-center'>
                <input
                  onChange={(e) => setProjectDetails({ ...projectDetails, projectImage: e.target.files[0] })}
                  type="file" style={{ display: "none" }} id='projectImageupload' />
                <img
                  src={preview ? preview : `${BASE_URL}/uploads/${project.projectImage}`}
                  height={"200px"} width={"100%"} alt="Project"
                  style={{ objectFit: "contain", cursor: "pointer", borderRadius: '5px', border: '1px solid #ddd' }}
                />
              </label>
            </div>
            <div className='col-12 col-md-6 d-flex flex-column align-items-center justify-content-center'>
              <div className='w-100 mt-3 mb-3'>
                <input
                  value={projectDetails.title}
                  onChange={(e) => setProjectDetails({ ...projectDetails, title: e.target.value })}
                  type="text" className='form-control border border-success' placeholder='Project title' />
              </div>

              <div className='w-100 mt-3'>
                <input
                  value={projectDetails.technologies}
                  onChange={(e) => setProjectDetails({ ...projectDetails, technologies: e.target.value })}
                  type="text" className='form-control border border-success' placeholder='Technologies used' />
              </div>
              <div className='w-100 mt-3'>
                <input
                  value={projectDetails.github}
                  onChange={(e) => setProjectDetails({ ...projectDetails, github: e.target.value })}
                  type="text" className='form-control border border-success' placeholder='Github url' />
              </div>

              <div className='w-100 mt-3'>
                <input
                  value={projectDetails.website}
                  onChange={(e) => setProjectDetails({ ...projectDetails, website: e.target.value })}
                  type="text" className='form-control border border-success' placeholder='Website url' />
              </div>
              <div className='w-100 mt-3'>
                <textarea
                  value={projectDetails.overview}
                  onChange={(e) => setProjectDetails({ ...projectDetails, overview: e.target.value })}
                  className='form-control border border-success' placeholder='Overview'></textarea>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleReset} >
            Reset
          </Button>
          <Button variant="primary" onClick={handleUpdate} >
            Update Project
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default EditProject
