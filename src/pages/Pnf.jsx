import React from 'react'
import { Link } from 'react-router-dom'

const Pnf = () => {
  return (
    <div style={{height:'100vh'}} className='d-flex justify-content-center align-items-center flex-column'>
      <h1 style={{fontSize:'80px'}}>404</h1>
<img style={{height:'400px'}} className='img-fluid' src="https://freefrontend.com/assets/img/html-funny-404-pages/SVG-Animation-404-Page.gif" alt="" />
<h2>Looks Like You are Lost!</h2>
<h5 className='text-danger'> the page you are looking for is not avaliable</h5>
<Link to={'/'} className='btn btn-waring'>Go to HOME</Link>
    </div>
  )
}

export default Pnf