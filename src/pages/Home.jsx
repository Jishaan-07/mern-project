import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import img from '../assets/home.png'
import ProjectCard from '../components/ProjectCard'
import { Card } from 'react-bootstrap'
import { homeProjectsAPI } from '../services/allAPI'

const Home = () => {
const [homeProjects,setHomeProjects]=useState([])
const [isLogin,setIsLogin]=useState(false)

console.log(homeProjects);


useEffect(()=>{
  getHomeProjects()
  if(sessionStorage.getItem("token")){
    setIsLogin(true)
  }else{
    setIsLogin(false)
  }

},[])

const getHomeProjects = async()=>{
  try{
    const result = await homeProjectsAPI()
    console.log(result);
    if(result.status==200){
      setHomeProjects(result.data)
    }
    
  }catch(err){
    console.log(err);
    
  }
}

  return (
    <>
      {/* landing */}
      <div style={{ minHeight: '100vh' }} className="d-flex justify-content-center align-items-center rounded shadow w-100">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <h1 style={{ fontSize: '80px' }}>   <i style={{ color: 'orange' }} class="fa-solid fa-carrot"></i>      Project Fair</h1>
              <p style={{ textAlign: 'justify' }}>One Stop Destination for all Software Development Projects. Where User can add and manage their projects. As well as access all projects available in our website... What are you waiting for!!!</p>
              {
                isLogin ?  
                <Link to={'/dashboard'} className='btn btn-primary'>MANAGE YOUR PROJECTS</Link>
                
                :
                <Link to={'/login'} className='btn btn-primary'>STARTS TO EXPLORE</Link>
          }
            </div>
            <div className="col-lg-6">
              <img className='img-fluid' src={img} alt="" />
            </div>
          </div>
        </div>
      </div>

      {/* explore our projects */}
      <div className="my-5 text-center">
        <h1 className="mb-5">Explore Our Projects</h1>
        <marquee >
          <div className='d-flex'>
 {
  homeProjects?.map(project=>(
    <div className='me-5'>
    <ProjectCard displayData={project} />
  </div>
  ))
 }
          </div>
        </marquee>
        <button className='btn btn-link mt-5'>CLICK HERE TO VIEW MORE PROJECTS....</button>
      </div>

      {/* Our Testimonials */}
      <div className="d-flex justify-content-center align-items-center my-5 flex-column">
        <h1>Our Testimonials</h1>
        <div className="d-flex justify-content-evenly align-items-center mt-3 w-100">

          {/* card */}
          <Card style={{ width: '18rem' }}>
            <Card.Body>
              <Card.Text className='d-flex justify-content-center align-items-center flex-column'>
                <img src="https://e7.pngegg.com/pngimages/550/997/png-clipart-user-icon-foreigners-avatar-child-face.png" width={'60px'} height={'60px'} className='rounded-circle img-fluid' alt="" />
                <p>⭐⭐⭐⭐</p>
                <p style={{ textAlign: 'justify' }}>        Some quick example text to build on the card title and make up the bulk of the card's content.</p>
              </Card.Text>
            </Card.Body>
          </Card>

          
          {/* card */}
          <Card style={{ width: '18rem' }}>
            <Card.Body>
              <Card.Text className='d-flex justify-content-center align-items-center flex-column'>
                <img src="https://www.clipartmax.com/png/middle/70-707804_female-user-icon-user-icon-female.png" width={'60px'} height={'60px'} className='rounded-circle img-fluid' alt="" />
                <p>⭐⭐</p>
                <p style={{ textAlign: 'justify' }}>        Some quick example text to build on the card title and make up the bulk of the card's content.</p>
              </Card.Text>
            </Card.Body>
          </Card>

          
          {/* card */}
          <Card style={{ width: '18rem' }}>
            <Card.Body>
              <Card.Text className='d-flex justify-content-center align-items-center flex-column'>
                <img src="https://cdn-icons-png.flaticon.com/512/219/219983.png" width={'60px'} height={'60px'} className='rounded-circle img-fluid' alt="" />
                <p>⭐⭐⭐⭐⭐</p>
                <p style={{ textAlign: 'justify' }}>        Some quick example text to build on the card title and make up the bulk of the card's content.</p>
              </Card.Text>
            </Card.Body>
          </Card>
        </div>
      </div>
    </>
  )
}

export default Home