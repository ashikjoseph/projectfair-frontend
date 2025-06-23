import React, { useContext } from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import { isAuthTokenContext } from '../context/ContextShare';

function Header({ dashboard }) {
  const { isAuthToken, setIsAuthToken } = useContext(isAuthTokenContext)
  const navigate = useNavigate()
  const isDashboard = dashboard ? true : false;
  const handleLogout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("existingUser");
    setIsAuthToken(false)
    navigate('/')
  }
  return (
    <>
      <Navbar bg="success" expand="md" className="py-2">
        <Container fluid="md" className="d-flex justify-content-between align-items-center">
          <Link to={'/'} className="text-decoration-none d-flex align-items-center">
            <Navbar.Brand className='text-light m-0 d-flex align-items-center'>
              <i className="fa-brands fa-stack-overflow me-3"></i>
              <span className="d-none d-sm-inline">Project Fair</span>
            </Navbar.Brand>
          </Link>
          {
            isDashboard &&
            <button className='btn btn-warning rounded ms-3' onClick={handleLogout}>Logout</button>
          }
        </Container>
      </Navbar>
    </>
  )
}

export default Header
