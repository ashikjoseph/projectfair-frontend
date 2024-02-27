import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import authImage from '../assets/WhatsApp Image 2024-01-29 at 13.22.39_4771701a.jpg'
import { Form } from 'react-bootstrap';
import { loginAPI, registerAPI } from '../services/allAPI';
import { isAuthTokenContext } from '../context/ContextShare';

function Auth({ register }) {
  const {isAuthToken, setIsAuthToken} = useContext(isAuthTokenContext)
  const registerForm = register ? true : false;
  const navigate = useNavigate()
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: ""
  })
  const handleRegister = async (e) => {
    e.preventDefault();
    console.log(userData)
    const { username, email, password } = userData;
    if (!username || !email || !password) {
      alert("Please fill the form completely")
    }
    else {
      const result = await registerAPI(userData);
      console.log(result)
      if (result.status === 200) {
        alert("User registered successfully")
        setUserData({
          username: "",
          email: "",
          password: ""
        })
        navigate('/login')
      }
      else {
        alert(result.response.data)
      }
    }
  }
  const handleLogin = async(e)=>{
    e.preventDefault();
    const {email, password}=userData;
    if(!email || !password){
      alert("Please fill the form completely")
    }
    else{
      const result = await loginAPI(userData);
      if(result.status === 200){
        console.log(result)
        sessionStorage.setItem("existinguser",JSON.stringify(result.data.existingUser));
        sessionStorage.setItem("token", result.data.token)
        setIsAuthToken(true)
        alert("User logged in successfully")
        setUserData({
          username:"",
          email:"",
          password:""
        })
        navigate('/')
      }
      else{
        alert(result.response.data)
      }
    }
  }
  return (
    <>
      <div className='d-flex justify-content-center align-items-center' style={{ width: "100%", height: "100vh" }}>
        <div className='w-75 container'>
          <Link to="/" style={{ textDecoration: "none" }}><i class="fa-solid fa-arrow-left me-2"></i>
            Back to home
          </Link>
          <div className='card bg-success p-5 mt-3'>
            <div className='row align-items-center'>
              <div className='col-lg-6 col-md-6'>
                <img src={authImage} alt="" width={"100%"} />
              </div>
              <div className='col-lg-6 col-md-6 p-3'>
                <div className='d-flex align-items-center flex-column'>
                  <h2 className='me-5'>
                    <i class="fa-brands fa-stack-overflow"></i>Project Fair
                  </h2>
                  <h5 className='me-5'>
                    {
                      registerForm ? "Sign Up your account" : "Sign into your account"
                    }
                  </h5>
                  <Form className='me-5'>
                    {
                      registerForm &&
                      <Form.Group md="4" controlId="validationCustom01">
                        <Form.Label>Username</Form.Label>
                        <Form.Control
                          value={userData.username}
                          onChange={(e) => setUserData({ ...userData, username: e.target.value })}
                          type="text"
                          placeholder="username"
                          style={{width:"200px"}}
                        />
                      </Form.Group>
                    }
                    <Form.Group md="4" controlId="validationCustom01">
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        value={userData.email}
                        onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                        type="text"
                        placeholder="email"
                        style={{width:"200px"}}
                      />
                    </Form.Group>
                    <Form.Group md="4" controlId="validationCustom01">
                      <Form.Label>Password</Form.Label>
                      <Form.Control
                        value={userData.password}
                        onChange={(e) => setUserData({ ...userData, password: e.target.value })}
                        type="password"
                        placeholder="password"
                        style={{width:"200px"}}
                      />
                    </Form.Group>
                  </Form>
                  {
                    registerForm ?
                      <div>
                        <button className='btn btn-warning rounded mt-3 me-2' onClick={handleRegister}>Register</button>
                        <p className='me-2'>Already a user? click here to <Link to="/login" style={{ textDecoration: "none" }}>Login</Link></p>
                      </div> :
                      <div>
                        
                          <button className='btn btn-warning rounded mt-3 ms-2' onClick={handleLogin}>Login</button>
                      

                        <p className='ms-2'>Already a user? click here to <Link to="/register" style={{ textDecoration: "none" }}>Register</Link></p>
                      </div>
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Auth