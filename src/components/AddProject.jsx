import React, { useContext, useEffect } from 'react'
import { Button } from 'react-bootstrap'
import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';
import { addProjectAPI } from '../services/allAPI';
import { addProjectResponseContext } from '../context/ContextShare';

function AddProject() {
  // useContext() is used to access context-api
  const {addProjectResponse, setAddProjectResponse}= useContext(addProjectResponseContext)
  const [preview, setPreview] = useState("")
  const [token, setToken] = useState("")
  const [projectDetails, setprojectDetails] = useState({
    title: "",
    language: "",
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
    console.log("Get project Details :");
    const { title, language, github, website, overview, projectImage } = projectDetails;
    if (!title || !language || !github || !website || !overview || !projectImage) {
      alert("Please fill the form completely")
    }
    else {
      // for uploading we have to send data as form-data
      // content type is multipart/form-data
      const reqBody = new FormData();
      reqBody.append('title', title)
      reqBody.append('language', language)
      reqBody.append('github', github)
      reqBody.append('website', website)
      reqBody.append('overview', overview)
      reqBody.append('projectImage', projectImage)

      const reqHeader = {
        "Content-Type": "multipart/form-data",
        "Authorization": `Bearer ${token}`
      }
      const result = await addProjectAPI(reqBody, reqHeader)
      if(result.status === 200){
        alert("project added successfully")
        setAddProjectResponse(result)
        handleCloseClear();
        handleClose()
      }
      else{
        alert(result.response.data)
      }
    }
    console.log(projectDetails);
  }
  useEffect(() => {
    if (projectDetails.projectImage) {
      // defauly code to preview of image thatwe take from inputbox with type file
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
        language: "",
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

      <Modal show={show} onHide={handleClose} size='lg'>
        <Modal.Header closeButton>
          <Modal.Title>Add Project</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='row'>
            <div className='col-lg-6'>
              <label htmlFor="projectImageupload">
                <input
                  onChange={(e) => setprojectDetails({ ...projectDetails, projectImage: e.target.files[0] })}
                  type="file" style={{ display: "none" }} id="projectImageupload" />
                <img
                  height={"200px"}
                  width={"100%"}
                  src={preview ? preview : "https://cdn.pixabay.com/photo/2016/01/03/00/43/upload-1118929_1280.png"} alt="" />
              </label>
            </div>
            <div className='col-lg-6 d-flex justify-content-center align-items-center flex-column'>
              <div className='w-100 mt-3 mb-3'>
                <input
                  value={projectDetails.title}
                  onChange={((e) => setprojectDetails({ ...projectDetails, title: e.target.value }))}
                  type="text" className='form-control' placeholder='Project title' />
              </div>
              <div className='mt-3 w-100'>
                <input
                  value={projectDetails.language}
                  onChange={(e) => setprojectDetails({ ...projectDetails, language: e.target.value })}
                  type="text" className='form-control' placeholder='Languages used' />
              </div>
              <div className='mt-3 w-100'>
                <input
                  value={projectDetails.github}
                  onChange={(e) => setprojectDetails({ ...projectDetails, github: e.target.value })}
                  type="text" className='form-control' placeholder='Github Url' />
              </div>
              <div className='mt-3 w-100'>
                <input
                  value={projectDetails.website}
                  onChange={(e) => setprojectDetails({ ...projectDetails, website: e.target.value })}
                  type="text" className='form-control' placeholder='Website Url' />
              </div>
              <div className='mt-3 w-100'>
                <textarea
                  value={projectDetails.overview}
                  onChange={(e) => setprojectDetails({ ...projectDetails, overview: e.target.value })}
                  className='form-control' placeholder='overview'></textarea>
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