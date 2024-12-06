import commonAPI from "./commonAPI";
import SERVER_BASE_URL from "./serverUrl";

// register api
export const  registerAPI = async(reqBody)=>{
  return  await commonAPI("POST",`${SERVER_BASE_URL}/register`,reqBody)
}


// login api
export const  loginAPI = async(reqBody)=>{
  return  await commonAPI("POST",`${SERVER_BASE_URL}/login`,reqBody)
}

// add-project
export const  addProjectAPI = async(reqBody,reqHeader)=>{
  return  await commonAPI("POST",`${SERVER_BASE_URL}/add-project`,reqBody,reqHeader)
}


// Home project
export const homeProjectsAPI = async()=>{
  return  await commonAPI("GET",`${SERVER_BASE_URL}/home-projects`,{})
}

// user project
export const  userProjectsAPI = async(reqHeader)=>{
  return  await commonAPI("GET",`${SERVER_BASE_URL}/user-projects`,{},reqHeader)
}


// all project
export const  allProjectsAPI = async(reqHeader)=>{
  return  await commonAPI("GET",`${SERVER_BASE_URL}/all-projects`,{},reqHeader)
}





