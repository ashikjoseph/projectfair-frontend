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
  })
  console.log("==searchkey", searchKey)
  return (
    <>
      <Header />
      <div className='d-flex justify-content-center flex-column align-items-center mt-5'>
        <h2>All Projects</h2>
        <div className='mt-5 w-25 d-flex'>
          <input type="text" className='form-control' placeholder='Search projects using technology'
            onChange={(e) => setSearchKey(e.target.value)}
          />
          <i class="fa-solid fa-magnifying-glass fa-rotate-90" style={{ marginLeft: "-45px" }}></i>
        </div>
      </div>
      <Row className='m-5'>
        {
          allProject.length > 0 ?
            allProject.map((item) => (
              <Col sm={12} lg={6} md={6}>
                <Projectcard project={item} />
              </Col>
            )) :
            <div>
              {
                isToken?
                <p>No projects uploaded yet</p>:
                <div className='d-flex justify-content-center align-items-center flex-column'>
                  <img src="https://t4.ftcdn.net/jpg/01/19/11/55/360_F_119115529_mEnw3lGpLdlDkfLgRcVSbFRuVl6sMDty.jpg" alt="" height={"300px"} width={"400px"} />
                  <p className='text-danger fs-4'>Please <Link style={{textDecoration:"none"}} to={'/login'} >Login</Link>  to view projects</p>
                </div>
              }
            </div>
      
        }

      </Row>
    </>
  )
}

export default Project