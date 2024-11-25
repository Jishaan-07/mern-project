import React, { useState } from 'react'

import { Card, Modal } from 'react-bootstrap'


const ProjectCard = () => {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

  return (
    <>
      <Card onClick={handleShow} className='btn shadow' >
      <Card.Img className='rounded' variant="top" height={'200px'} src="https://images.shiksha.com/mediadata/shikshaOnline/mailers/2021/naukri-learning/oct/28oct/Project-Manager.jpg" />
      <Card.Body>
        <Card.Title>Card Title</Card.Title>
      </Card.Body>
    </Card>
    <Modal size='lg' show={show} centered onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Project Details !</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-lg-6">
              <img className='img-fluid' src="https://images.shiksha.com/mediadata/shikshaOnline/mailers/2021/naukri-learning/oct/28oct/Project-Manager.jpg" alt="" />
            </div>
            <div className="col-lg-6">
              <h3>Title</h3>
              <h6>Language Used : <span className='text-danger'>Language</span></h6>
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Obcaecati incidunt sit doloribus accusamus consequuntur. Magni esse doloribus similique aspernatur molestias distinctio quis aliquam dolorum illo assumenda. Ex blanditiis repellat laudantium?</p>
            </div>
            <div className="mt-2 float-start">
              <a href="https://github.com/Jishaan-07/E-Cart" target='_blank' className='btn btn-secondary me-2'><i class="fa-brands fa-linkedin"></i></a>
              <a href="https://recipe-list-app-jishhhh.netlify.app/" target='_blank' className='btn btn-secondary  '><i class="fa-solid fa-link"></i></a>
            </div>
          </div>
        </Modal.Body>

      </Modal>
    </>
  )
}

export default ProjectCard