import React, { useContext } from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import { isAuthTokenContext } from '../context/ContextShare';

function Header({ dashboard }) {
  const {isAuthToken, setIsAuthToken} = useContext(isAuthTokenContext)
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
      <Navbar className="bg-success">
        <Container>
          <Link to={'/'} style={{ "textDecoration": "none" }}>
            <Navbar.Brand className='text-light'>
              <i class="fa-brands fa-stack-overflow me-3 ms-5"></i>
              Project Fair


            </Navbar.Brand>
          </Link>
          {
            isDashboard &&
            <button className='btn btn-warning rounded' onClick={handleLogout}>logout</button>
          }

        </Container>
      </Navbar>
    </>
  )
}

export default Header