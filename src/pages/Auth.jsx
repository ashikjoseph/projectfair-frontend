import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import authImage from '../assets/WhatsApp Image 2024-01-29 at 13.22.39_4771701a.jpg'
import { Form } from 'react-bootstrap';
import { loginAPI, registerAPI } from '../services/allAPI';
import { isAuthTokenContext } from '../context/ContextShare';
import toast from 'react-hot-toast';

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
    const { username, email, password } = userData;
    if (!username || !email || !password) {
      alert("Please fill the form completely")
    }
    else {
      const result = await registerAPI(userData);
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
        sessionStorage.setItem("existinguser",JSON.stringify(result.data.existingUser));
        sessionStorage.setItem("token", result.data.token)
        setIsAuthToken(true)
        toast.success("User logged in successfully");
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
      <div className='d-flex justify-content-center align-items-center' style={{ width: "100%", minHeight: "100vh" }}>
        <div className='container w-100' style={{ maxWidth: "900px" }}>
          <Link to="/" className="d-inline-block mb-3" style={{ textDecoration: "none" }}>
            <i className="fa-solid fa-arrow-left me-2"></i>
            Back to home
          </Link>
          <div className='card bg-success p-4 p-md-5'>
            <div className='row align-items-center g-4'>
              <div className='col-12 col-md-6'>
                <img src={authImage} alt="" style={{ width: "100%", height: "auto", borderRadius: "8px" }} />
              </div>
              <div className='col-12 col-md-6'>
                <div className='d-flex flex-column align-items-center align-items-md-start'>
                  <h2 className='mb-3 text-center text-md-start'>
                    <i className="fa-brands fa-stack-overflow me-2"></i>Project Fair
                  </h2>
                  <h5 className='mb-4 text-center text-md-start'>
                    {registerForm ? "Sign Up your account" : "Sign into your account"}
                  </h5>
                  <Form className='w-100' style={{ maxWidth: "300px" }}>
                    {
                      registerForm &&
                      <Form.Group className="mb-3" controlId="validationCustom01">
                        <Form.Label>Username</Form.Label>
                        <Form.Control
                          value={userData.username}
                          onChange={(e) => setUserData({ ...userData, username: e.target.value })}
                          type="text"
                          placeholder="username"
                        />
                      </Form.Group>
                    }
                    <Form.Group className="mb-3" controlId="validationCustom02">
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        value={userData.email}
                        onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                        type="email"
                        placeholder="email"
                      />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="validationCustom03">
                      <Form.Label>Password</Form.Label>
                      <Form.Control
                        value={userData.password}
                        onChange={(e) => setUserData({ ...userData, password: e.target.value })}
                        type="password"
                        placeholder="password"
                      />
                    </Form.Group>
                  </Form>
                  {
                    registerForm ?
                      <div className='text-center text-md-start'>
                        <button
                          className='btn btn-warning rounded mt-3 px-4'
                          onClick={handleRegister}
                          style={{ minWidth: "120px" }}
                        >
                          Register
                        </button>
                        <p className='mt-3'>
                          Already a user? click here to <Link to="/login" style={{ textDecoration: "none", color: "#0000cc" }}>Login</Link>
                        </p>
                      </div> :
                      <div className='text-center text-md-start'>
                        <button
                          className='btn btn-warning rounded mt-3 px-4'
                          onClick={handleLogin}
                          style={{ minWidth: "120px" }}
                        >
                          Login
                        </button>
                        <p className='mt-3'>
                          Don't have an account? click here to <Link to="/register"   style={{ textDecoration: "none", color: "#0000cc" }}>Register</Link>
                        </p>
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
