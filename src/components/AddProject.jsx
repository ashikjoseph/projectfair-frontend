import React, { useContext, useEffect } from 'react'
import { Button } from 'react-bootstrap'
import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';
import { addProjectAPI } from '../services/allAPI';
import { addProjectResponseContext } from '../context/ContextShare';

function AddProject() {
  const { addProjectResponse, setAddProjectResponse } = useContext(addProjectResponseContext)
  const [preview, setPreview] = useState("")
  const [token, setToken] = useState("")
  const [projectDetails, setprojectDetails] = useState({
    title: "",
    technologies: "",
    github: "",
    website: "",
    overview: "",
    projectImage: ""
  })

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleAdd = async (e) => {
    e.preventDefault();
    const { title, technologies, github, website, overview, projectImage } = projectDetails;
    if (!title || !technologies || !github || !website || !overview || !projectImage) {
      alert("Please fill the form completely")
    }
    else {
      const reqBody = new FormData();
      reqBody.append('title', title)
      reqBody.append('technologies', technologies)
      reqBody.append('github', github)
      reqBody.append('website', website)
      reqBody.append('overview', overview)
      reqBody.append('projectImage', projectImage)

      const reqHeader = {
        "Content-Type": "multipart/form-data",
        "Authorization": `Bearer ${token}`
      }
      const result = await addProjectAPI(reqBody, reqHeader)
      if (result.status === 200) {
        alert("project added successfully")
        setAddProjectResponse(result)
        handleCloseClear();
        handleClose()
      }
      else {
        alert(result.response.data)
      }
    }
  }
  useEffect(() => {
    if (projectDetails.projectImage) {
      setPreview(URL.createObjectURL(projectDetails.projectImage))
    }
  }, [projectDetails.projectImage])
  useEffect(() => {
    setToken(sessionStorage.getItem("token"))
  }, [])
  const handleCloseClear = () => {
    setprojectDetails(
      {
        title: "",
        technologies: "",
        github: "",
        website: "",
        overview: "",
        projectImage: ""
      }
    )
    setPreview("")
  }
  return (
    <>
      <Button variant='success' onClick={handleShow}>Add Project</Button>

      <Modal show={show} onHide={handleClose} size='lg' centered>
        <Modal.Header closeButton>
          <Modal.Title>Add Project</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='container-fluid'>
            <div className='row'>
              <div className='col-12 col-md-6 mb-3 mb-md-0 d-flex justify-content-center align-items-center'>
                <label htmlFor="projectImageupload" className="w-100" style={{ cursor: "pointer" }}>
                  <input
                    onChange={(e) => setprojectDetails({ ...projectDetails, projectImage: e.target.files[0] })}
                    type="file" style={{ display: "none" }} id="projectImageupload" />
                  <img
                    className="img-fluid rounded"
                    style={{ maxHeight: "200px", width: "100%", objectFit: "contain" }}
                    src={preview ? preview : "https://cdn.pixabay.com/photo/2016/01/03/00/43/upload-1118929_1280.png"} alt="Project preview" />
                </label>
              </div>
              <div className='col-12 col-md-6 d-flex flex-column justify-content-center'>
                <div className='mb-3'>
                  <input
                    value={projectDetails.title}
                    onChange={((e) => setprojectDetails({ ...projectDetails, title: e.target.value }))}
                    type="text" className='form-control' placeholder='Project title' />
                </div>
                <div className='mb-3'>
                  <input
                    value={projectDetails.technologies}
                    onChange={(e) => setprojectDetails({ ...projectDetails, technologies: e.target.value })}
                    type="text" className='form-control' placeholder='Technologies used' />
                </div>
                <div className='mb-3'>
                  <input
                    value={projectDetails.github}
                    onChange={(e) => setprojectDetails({ ...projectDetails, github: e.target.value })}
                    type="text" className='form-control' placeholder='Github Url' />
                </div>
                <div className='mb-3'>
                  <input
                    value={projectDetails.website}
                    onChange={(e) => setprojectDetails({ ...projectDetails, website: e.target.value })}
                    type="text" className='form-control' placeholder='Website Url' />
                </div>
                <div>
                  <textarea
                    value={projectDetails.overview}
                    onChange={(e) => setprojectDetails({ ...projectDetails, overview: e.target.value })}
                    className='form-control' placeholder='overview' rows={3}></textarea>
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseClear}>
            Clear
          </Button>
          <Button variant="primary" onClick={handleAdd}>
            Add Project
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default AddProject
