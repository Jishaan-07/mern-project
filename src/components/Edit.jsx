import React, { useState, useEffect, useContext } from 'react'
import { Button, Modal } from 'react-bootstrap'
import SERVER_BASE_URL from '../services/serverUrl'
import { editProjectContext } from '../contexts/ContextShare'
import { updateProjectAPI } from '../services/allAPI'

const Edit = ({ project }) => {
    // project key in the props will hold project data to be displayed in edit component 
    const {editProjectResponse,setEditProjectResponse} =useContext(editProjectContext)
    const [preview, setPreview] = useState("")
    const [uploadFileStatus, setUploadFileStatus] = useState(false)
    const [projectDetails, setProjectDetails] = useState({
        id: project?._id, title: project?.title, languages: project?.languages, overview: project?.overview, github: project?.github, website: project?.website, projectImage: ""
    })
    // projectImage is used to hold user uploaded file instead of existing file 
    console.log(projectDetails);
    const [show, setShow] = useState(false);


    useEffect(() => {
        if (projectDetails.projectImage.type == "image/png" || projectDetails.projectImage.type == "image/jpg" || projectDetails.projectImage.type == "image/jpeg") {
            setUploadFileStatus(true)
            setPreview(URL.createObjectURL(projectDetails.projectImage))
        } else {
            // inavlid image file 
            setUploadFileStatus(false)
            setProjectDetails({ ...projectDetails, projectImage: "" })
        }
    }, [projectDetails.projectImage])


    const handleClose = () => {
        setShow(false)
        setProjectDetails({ id: project?._id, title: project?.title, languages: project?.languages, overview: project?.overview, github: project?.github, website: project?.website, projectImage: ""})
    };   
    
    const handleShow = () => 
        {
            setShow(true)
            setProjectDetails({ id: project?._id, title: project?.title, languages: project?.languages, overview: project?.overview, github: project?.github, website: project?.website, projectImage: ""})
        };   
        
        // steps to update project details 
        // 1.create a function for defining update project logic
     const handleUpdateProject = async ()=>{
            const {id,title,languages,overview,github,website,projectImage} = projectDetails
            if(title && languages && overview && github && website){
              // api call
              const reqBody = new FormData()
              reqBody.append("title",title)
              reqBody.append("languages",languages)
              reqBody.append("overview",overview)
              reqBody.append("github",github)
              reqBody.append("website",website)
              // projectImage will have value only when user re-upload project picture
            preview ? reqBody.append("projectImage",projectImage): reqBody.append("projectImage",project?.projectImage)
              const token = sessionStorage.getItem("token")
              if(token){
                const reqHeader = {
                  "projectImage" : "multipart/form-data",
                  "Authorization" : `Bearer ${token}`
                }
                // make api call
                try{
                    const result = await updateProjectAPI(id,reqBody,reqHeader)
                    if(result.status==200){
                        alert("Project updated successfully!!!")
                        handleClose()
                        // share result with view using context
                        setEditProjectResponse(result)
                    }
                }catch(err){
                    console.log(err);
                    
                }
              }
            }else{
              alert("Please fill the form completely!!!")
            }
          }




    return (
        < >
            <button onClick={handleShow} className='btn  me-4'><i className="fa-solid fa-edit"></i></button>

            <Modal size='lg' centered show={show} onHide={handleClose} backdrop="static" keyboard={false} >
                <Modal.Header closeButton>
                    <Modal.Title>Edit Project Details :)</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="row align-items-center">
                        <div className="col-lg-4">
                            <label >
                                <input onChange={e => setProjectDetails({ ...projectDetails, projectImage: e.target.files[0] })} type="file" style={{ display: 'none' }} />
                                <img src={preview?preview:`${SERVER_BASE_URL}/uploads/${project?.projectImage}`} className='img-fluid' height={'200px'} alt="" />
                            </label>
                            {
                                !uploadFileStatus &&
                                <div className="text-warning fw-bolder">
                                    *Upload only the folowing types (jpeg,png,jpg) here!!!
                                </div>
                            }
                        </div>
                        <div className="col-lg-8">
                            <div className="mb-2">
                                <input value={projectDetails.title} onChange={e => setProjectDetails({ ...projectDetails, title: e.target.value })} type="text" className='form-control ' placeholder='Project Title' />
                            </div>
                            <div className="mb-2">
                                <input value={projectDetails.languages} onChange={e => setProjectDetails({ ...projectDetails, languages: e.target.value })} type="text" className='form-control ' placeholder='Project Languages' />
                            </div>
                            <div className="mb-2">
                                <input value={projectDetails.overview} onChange={e => setProjectDetails({ ...projectDetails, overview: e.target.value })} type="text" className='form-control ' placeholder='Project OverView' />
                            </div>
                            <div className="mb-2">
                                <input value={projectDetails.github} onChange={e => setProjectDetails({ ...projectDetails, github: e.target.value })} type="text" className='form-control ' placeholder='Project Github Link' />
                            </div>
                            <div className="mb-2">
                                <input value={projectDetails.website} onChange={e => setProjectDetails({ ...projectDetails, website: e.target.value })} type="text" className='form-control ' placeholder='Project Website Link' />
                            </div>

                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button onClick={handleUpdateProject} variant="primary">Update</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default Edit