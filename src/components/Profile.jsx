import React, { useEffect, useState } from 'react'
import { Collapse } from 'react-bootstrap'
import uploadig from '../assets/user.png'
import SERVER_BASE_URL from '../services/serverUrl';
import { updateProjectAPI } from '../services/allAPI';

const Profile = () => {
  const [open, setOpen] = useState(false);
  const [preview, setPreview] = useState("")
  const [existingProfilePic, setExistingProfilePic] = useState("")
  // profilePic of userDetails is used to store uploaded user profile pic file
  const [userDetails, setUserDetails] = useState({
    username: "", email: "", password: "", github: "", linkedin: "", profilePic: ""
  })
  console.log(userDetails);

  // get existing user details from session and store it to userDe3tails state
  useEffect(() => {
    if (sessionStorage.getItem("user")) {
      const user = JSON.parse(sessionStorage.getItem("user"))
      setUserDetails({
        ...userDetails, username: user.username, email: user.email, password: user.password, github: user.github, linkedin: user.linkedin
      })
      setExistingProfilePic(user.profilePic)
    }
  }, [open])


  // generate url fro upload profile pic 
  useEffect(() => {
    if (userDetails.profilePic) {
      setPreview(URL.createObjectURL(userDetails.profilePic))
    } else {
      setPreview("")
    }
  }, [userDetails.profilePic])

  const handleUserUpdate = async () => {
    // get all user details
    const { username, email, password, github, linkedin, profilePic } = userDetails
    // if text field have value
    if (github && linkedin) {
      // req Body
      const reqBody = new FormData()
      reqBody.append("username", username)
      reqBody.append("email", email)
      reqBody.append("password", password)
      reqBody.append("github", github)
      reqBody.append("linkedin", linkedin)
      preview ? reqBody.append("profilePic", profilePic) : reqBody.append("profilePic", existingProfilePic)
      //  reqheader
      const token = sessionStorage.getItem("token")
      console.log(token);
      
      if (token) {
        const reqHeader = {
          "Content-Type": "multipart/form-data",
          "Authorization": `Bearer ${token}`
        }
        // make api call
        try {
          const result = await updateProjectAPI(reqBody, reqHeader)
          console.log(result);
          
          if (result.status == 200) {
            // alert
            alert("User profile updated succesfully")
            // store update user in session
            sessionStorage.setItem("user",JSON.stringify(result.data))
            // collapse profile
            setOpen(!open)
          }
        } catch (err) {
          console.log(err);

        }
      }
    } else {
      alert("Please fill the form completely")
    }
  }

  return (
    <>
      <div className="d-flex justify-content-evenly">
        <h3 className='text-warning'>Profile</h3>
        <button onClick={() => setOpen(!open)} className='btn text-warning'><i class="fa-solid fa-angle-down"></i></button>
      </div>
      <Collapse in={open}>


        <div className='row container-fluid align-items-center justify-content-center shadow p-2 rounded' id="example-collapse-text">
          {/* label */}
          <label className='text-center'>
            <input onChange={e => setUserDetails({ ...userDetails, profilePic: e.target.files[0] })} type="file" style={{ display: 'none' }} />
            {
              existingProfilePic == "" ?
                <img className='rounded' src={preview ? preview : uploadig} width={'200px'} height={'200px'} alt="" />
                :
                <img className='rounded' src={preview ? preview : `${SERVER_BASE_URL}/uploads/${existingProfilePic}`} width={'200px'} height={'200px'} alt="" />
            }

          </label>

          <div className="mb-2  w-100"><input value={userDetails.github} onChange={e=>setUserDetails({ ...userDetails, github: e.target.value })} type="text" placeholder='User GIT HUB Link' className='form-control' /></div>

          <div className="mb-2  w-100"><input value={userDetails.linkedin} onChange={e=>setUserDetails({ ...userDetails, linkedin: e.target.value })} type="text" placeholder='User LINKEDIN Link' className='form-control' /></div>

          <div className="d-grid w-100"><button onClick={handleUserUpdate} className='btn btn-warning'>Update</button></div>
        </div>
      </Collapse>
    </>
  )
}

export default Profile