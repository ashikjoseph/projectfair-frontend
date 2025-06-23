import React from 'react'
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <>
      <div className='footer mt-5 bg-success p-4'>
        <div className='container'>
          <div className='row gy-4'>
            <div className='col-12 col-md-6 col-lg-3'>
              <h5><i className="fa-brands fa-stack-overflow me-2"></i>Project Fair</h5>
              <p style={{ textAlign: "justify" }}>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iste ipsa quaerat dignissimos, et praesentium architecto cumque necessitatibus similique pariatur laudantium voluptate, officiis laborum consectetur doloremque repudiandae consequatur, quasi blanditiis delectus!
              </p>
            </div>

            <div className='col-6 col-md-3 col-lg-2'>
              <h4>Links</h4>
              <div className='d-flex flex-column'>
                <Link to='/' style={{ textDecoration: "none", color: "white" }}>Home</Link>
                <Link to='/login' style={{ textDecoration: "none", color: "white" }}>Login</Link>
                <Link to='/register' style={{ textDecoration: "none", color: "white" }}>Register</Link>
              </div>
            </div>

            <div className='col-6 col-md-3 col-lg-2'>
              <h4>Guides</h4>
              <div className='d-flex flex-column'>
                <Link to='https://react.dev/' target='_blank' style={{ textDecoration: "none", color: "white" }}>React</Link>
                <Link to='https://react-bootstrap.netlify.app/' target='_blank' style={{ textDecoration: "none", color: "white" }}>React Bootstrap</Link>
                <Link to='https://bootswatch.com/' target='_blank' style={{ textDecoration: "none", color: "white" }}>Boots Watch</Link>
              </div>
            </div>

            <div className='col-12 col-md-12 col-lg-5'>
              <h4>Contact us</h4>
              <div className='d-flex flex-column flex-sm-row'>
                <input type="text" className='form-control' placeholder='Enter your email' />
                <button className='btn btn-warning ms-sm-3 mt-3 mt-sm-0'>Subscribe</button>
              </div>
              <div className='d-flex justify-content-evenly align-items-center mt-3 flex-wrap'>
                <Link><i className="fa-brands fa-instagram fa-2x text-dark"></i></Link>
                <Link><i className="fa-brands fa-twitter fa-2x text-dark"></i></Link>
                <Link><i className="fa-brands fa-facebook fa-2x text-dark"></i></Link>
                <Link><i className="fa-brands fa-linkedin fa-2x text-dark"></i></Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <p className='mt-5 text-center'>Copyright &copy; 2023 Project fair. Built with React</p>
    </>
  )
}

export default Footer
