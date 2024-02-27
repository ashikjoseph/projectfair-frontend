import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import Profile from '../components/Profile'
import { Col, Row } from 'react-bootstrap'
import MyProjects from '../components/MyProjects'

function Dashboard({ }) {
  const [userName,setUserName] = useState("")
  useEffect(()=>{
    if(sessionStorage.getItem("existinguser")){
      const existingUserData = JSON.parse(sessionStorage.getItem("existinguser"));
      setUserName(existingUserData.username)
    }
  })
  return (
    <>
    <Header dashboard={"dashboard"}/>
    <h2 className='mt-5 mt-3'>Welcome <span style={{color:"orange"}}>{userName}</span></h2>
    <Row>
      <Col md={8} lg={8}>
      <MyProjects/>
      </Col>
      <Col md={4} lg={4}>
      <Profile/>
      </Col>
    </Row>
    </>
  )
}

export default Dashboard