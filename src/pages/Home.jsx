import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import homeImage from '../assets/WhatsApp Image 2024-01-29 at 13.22.39_b866afbc.jpg'
import Projectcard from '../components/Projectcard'
import { Link } from 'react-router-dom'
import { homeProjectApi } from '../services/allAPI'

function Home() {
  const [homeProject, setHomeProject] = useState([])
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      setIsLoggedIn(true)
    }
  }, [])
  const getHomeProject = async()=>{
    const result = await homeProjectApi();
    console.log(result)
    setHomeProject(result.data)
  }
  useEffect(()=>{
    getHomeProject();
  },[])
  return (
    <>
      <div className='mb-5 bg-success' style={{ width: "100%", minHeight: "100vh" }}>
        <div className='container-fluid rounded'>
          <Row className='align-items-center p-3 p-md-5'>
            <Col xs={12} md={6} lg={6} className="text-center text-md-start">
              <h1 className='text-light mb-3' style={{ fontSize: "calc(2.5rem + 2vw)", fontWeight: "600" }}>
                Project Fair
              </h1>
              <p className='text-light fs-5'>One time destination for all web application projects</p>
              {
                isLoggedIn ?
                  <Link to='/dashboard'>
                    <button className='btn btn-warning rounded'>Manage Projects</button>
                  </Link>
                  :
                  <Link to='/login'>
                    <button className='btn btn-warning rounded'>Get started</button>
                  </Link>
              }
            </Col>
            <Col xs={12} md={6} lg={6} className="d-flex justify-content-center mt-4 mt-md-0">
              <img 
                src={homeImage} 
                alt="" 
                style={{ 
                  maxWidth: "100%", 
                  height: "auto", 
                  marginTop: "50px", 
                  maxHeight: "450px",
                  objectFit: "contain"
                }}
              />
            </Col>
          </Row>
        </div>
      </div>

      <div className='mt-5 all-project'>
        <div className='text-center'>
          <h1>Explore My Projects</h1>
          <marquee scrollAmount={20}>
            <div className='d-flex mt-5 mb-5 flex-wrap justify-content-center'>
              {
                homeProject.length > 0 ?
                homeProject.map((item) => (
                  <div key={item._id} className='mx-3 mb-4' style={{ width: "300px", maxWidth: "100%" }}>
                    <Projectcard project={item} />
                  </div>
                )) :
                <p>No projects to load</p>
              }
             </div> 
          </marquee>
          <div className='text-center mt-5 mb-3'>
            <h6><Link to={'/project'}>See More Projects</Link></h6>
          </div>
        </div>
      </div>
    </>
  )
}

export default Home
