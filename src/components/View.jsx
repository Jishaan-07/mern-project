import React from 'react'
import Add  from '../components/Add'
import Edit from '../components/Edit'
const View = () => {


  
  return (
    <>
    <div className="d-flex justify-content-between mt-3">
      <h2 className='text-warning'>All Projects</h2>
      <div><Add/></div>
    </div>
    <div className="mt-2">
      {/* project */}
      <div className="border rounded p-2 d-flex justify-content-between mb-3">
        <h3>Title</h3>
        <div className="d-flex align-items-center">
          <div><Edit/></div>
          <button className='btn'><a href="https://github.com/Jishaan-07/E-Cart" target='_blank'> <i class="fa-brands fa-github"></i></a></button>
          <button className='btn ms-4'><i class="fa-solid fa-trash text-danger" ></i></button>
        </div>
      </div>
    </div>
     </>
  )
}

export default View