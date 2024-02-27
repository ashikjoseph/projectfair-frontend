import React from 'react'
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <>
      <div className='footer d-flex justify-content-center align-items-center mt-5 bg-success p-3'>
        <div className='footer d-flex align-item-center justify-content-evenly'>
          <div className='website' style={{ width: "400px" }}>
            <h5> <i class="fa-brands fa-stack-overflow me-2"></i>Project Fair</h5>
            <p style={{ textAlign: "justify" }}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iste ipsa quaerat dignissimos, et praesentium architecto cumque necessitatibus similique pariatur laudantium voluptate, officiis laborum consectetur doloremque repudiandae consequatur, quasi blanditiis delectus!</p>

          </div>
          <div className='links d-flex flex-column ms-5'>
            <h4>Links</h4>
            <Link to={'/'} style={{ textDecoration: "none", color: "white" }}>Home</Link>
            <Link to={'/login'}style={{ textDecoration: "none", color: "white" }}>Login</Link>
            <Link to={'/register'} style={{ textDecoration: "none", color: "white" }}>Register</Link>
          </div>
          <div className='guides d-flex flex-column ms-5'>
            <h4>Guides</h4>
            <Link to='https://react.dev/' target='_blank' style={{ textDecoration: "none", color: "white" }}>React</Link>
            <Link to='https://react-bootstrap.netlify.app/' target='_blank' style={{ textDecoration: "none", color: "white" }}>React Bootstrap</Link>
            <Link to='https://bootswatch.com/' target='_blank' style={{ textDecoration: "none", color: "white" }}>Boots Watch</Link>
          </div>
          <div className='contactus ms-5'>
            <h4>Contact us</h4>
            <div className='d-flex'>
              <input type="text" className='form-control' placeholder='enter your email' />
              <button className='btn btn-warning ms-3'>subscribe</button>
            </div>
            <div className='d-flex justify-content-evenly align-items-center mt-3'>
              <Link><i class="fa-brands fa-instagram fa-2x text-dark"></i></Link>
              <Link><i class="fa-brands fa-twitter fa-2x text-dark"></i></Link>
              <Link><i class="fa-brands fa-facebook fa-2x text-dark"></i></Link>
              <Link><i class="fa-brands fa-linkedin fa-2x text-dark "></i></Link>
            </div>
          </div>
        </div>
      </div>
      <p className='mt-5 text-center'>Copyright &copy; 2023 Project fair. Built with React</p>
    </>
  )
}

export default Footer