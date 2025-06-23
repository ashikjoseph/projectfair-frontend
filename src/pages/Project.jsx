import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { Col, Row } from 'react-bootstrap'
import Projectcard from '../components/Projectcard'
import { allProjectApi } from '../services/allAPI'
import { Link } from 'react-router-dom'

function Project() {
  const [isToken, setIsToken] = useState(false)
  const [searchKey, setSearchKey] = useState("")
  const [allProject, setAllProject] = useState([])

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);


  const getAllProject = async () => {
    if (sessionStorage.getItem("token")) {
      const token = sessionStorage.getItem("token")
      const reqHeader = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
      const result = await allProjectApi(searchKey, reqHeader);
      console.log("==result for all projects==")
      console.log(result)
      setAllProject(result.data)
    }
  }

  useEffect(() => {
    getAllProject();
  }, [searchKey])

  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      setIsToken(true)
    }
  }, [])

  console.log("==searchkey", searchKey)

  return (
    <>
      <Header />

      <div className='d-flex justify-content-center flex-column align-items-center mt-5'>
        <h2>All Projects</h2>

        <div className='mt-4 w-75 w-md-50 w-lg-25 d-flex align-items-center position-relative'>
          <input
            type="text"
            className='form-control ps-4'
            placeholder='Search projects using technology'
            onChange={(e) => setSearchKey(e.target.value)}
          />
          <i className="fa-solid fa-magnifying-glass fa-rotate-90 position-absolute end-0 me-3 text-secondary"></i>
        </div>
      </div>

      <Row className='m-4 gy-4'>
        {
          allProject.length > 0 ? (
            allProject.map((item, index) => (
              <Col key={index} xs={12} sm={6} lg={4} className="d-flex justify-content-center">
                <Projectcard project={item} />
              </Col>
            ))
          ) : (
            <div className='w-100 d-flex justify-content-center align-items-center flex-column mt-5'>
              {
                isToken ? (
                  <p className='text-secondary fs-5'>No projects uploaded yet</p>
                ) : (
                  <>
                    <img
                      src="https://t4.ftcdn.net/jpg/01/19/11/55/360_F_119115529_mEnw3lGpLdlDkfLgRcVSbFRuVl6sMDty.jpg"
                      alt="Login prompt"
                      className="img-fluid"
                      style={{ maxHeight: "300px", width: "auto" }}
                    />
                    <p className='text-danger fs-4 mt-3'>
                      Please <Link to='/login' className="text-primary text-decoration-none">Login</Link> to view projects
                    </p>
                  </>
                )
              }
            </div>
          )
        }
      </Row>
    </>
  )
}

export default Project
