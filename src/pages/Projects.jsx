import React from 'react'
import  Header from '../components/Header'
import { Col, Row } from 'react-bootstrap'
import ProjectCard from '../components/ProjectCard'

const Projects = () => {
  return (
    <>
    <Header/>
    <div className="container-fluid">
      <div style={{paddingTop:'100px'}} className="d-flex justify-content-between align-items-center  ">
        <h1>All Projects</h1>
        <input type="text" placeholder='Search Projects By Their Language' className='form-control w-25' />
      </div>
      <Row>
        <Col className='mb-3' sm={12} md={6} lg={4}>
        <ProjectCard/>
        </Col>
      </Row>
    </div>
    </>
  )
}

export default Projects