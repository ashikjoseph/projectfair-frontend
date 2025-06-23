import React from 'react'
import Card from 'react-bootstrap/Card';
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { Col, Row } from 'react-bootstrap';
import { BASE_URL } from '../services/baseurl';

function Projectcard({ project }) {

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <Card
        style={{ width: '100%', maxWidth: '18rem', cursor: 'pointer' }}
        onClick={handleShow}
        className="mb-3"
      >
        <Card.Img
          variant="top"
          src={`${BASE_URL}/uploads/${project?.projectImage}`}
          style={{ objectFit: 'cover', height: '200px', width: '100%' }}
          alt={project?.title}
        />
        <Card.Body>
          <Card.Title className="text-truncate" title={project?.title}>
            {project?.title}
          </Card.Title>
        </Card.Body>
      </Card>

      <Modal show={show} onHide={handleClose} size='lg' centered>
        <Modal.Header closeButton>
          <Modal.Title>{project.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col xs={12} md={6} className="mb-3 mb-md-0">
              <img
                src={`${BASE_URL}/uploads/${project?.projectImage}`}
                alt={project.title}
                style={{ width: '100%', height: 'auto', maxHeight: '250px', objectFit: 'cover' }}
              />
            </Col>
            <Col xs={12} md={6}>
              <h4>Description</h4>
              <p>{project.overview}.</p>
              <p><span className='fw-bold'>Technologies: </span>{project.technologies}</p>
            </Col>
          </Row>
          <div className='d-flex mt-3'>
            <a href={project.website} target='_blank' rel="noreferrer" style={{ color: "black", fontSize: "25px" }}>
              <i className="fa-solid fa-link ms-3"></i>
            </a>
            <a href={project.github} target='_blank' rel="noreferrer" style={{ color: "black", fontSize: "25px" }}>
              <i className="fa-brands fa-github ms-3"></i>
            </a>
          </div>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default Projectcard
