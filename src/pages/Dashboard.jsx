import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import Profile from '../components/Profile'
import { Col, Row } from 'react-bootstrap'
import MyProjects from '../components/MyProjects'

function Dashboard({ }) {
  const [userName,setUserName] = useState("")
  const [email, setEmail] = useState("")
  useEffect(()=>{
    if(sessionStorage.getItem("existinguser")){
      const existingUserData = JSON.parse(sessionStorage.getItem("existinguser"));
      setUserName(existingUserData.username)
      setEmail(existingUserData.email);
    }
  })
  return (
    <>
      <Header dashboard={"dashboard"}/>
      <h2 className='mt-5 mt-3'>Welcome <span style={{color:"orange"}}>{userName}</span></h2>
      <Row>
        <Col xs={12} md={8} lg={8}>
          <MyProjects/>
        </Col>
        <Col xs={12} md={4} lg={4}>
          <Profile userName={userName} email={email} />
        </Col>
      </Row>
    </>
  )
}

export default Dashboard
