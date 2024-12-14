import React, { createContext, useEffect, useState } from 'react'
export  const tokenContext = createContext()
const TokenAuth = ({children}) => {
    const [authorisedUser,setAuthoriseUser]=useState(false)

    useEffect(()=>{
        if(sessionStorage.getItem("token")){
            setAuthoriseUser(true)
        }else{
            setAuthoriseUser(false)
        }
    },[authorisedUser])
  return (
    <>
    <tokenContext.Provider value={{authorisedUser,setAuthoriseUser}}>{children}</tokenContext.Provider>
    </>
  )
}

export default TokenAuth