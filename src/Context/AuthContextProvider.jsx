import { createContext, useState } from "react"

export const AuthContext = createContext()

const AuthContextProvider = ({children}) => {

    const [authDetail,setAuthDetail] = useState({
        isLoggedIn :true,
        token:null
    })

    const login =(token)=>{
        setAuthDetail({
            isLoggedIn:true,
            token:token
        })
    }


    const logout=()=>{
        setAuthDetail({
            isLoggedIn:false,
            token:null
        })
    }

  return (
  <AuthContext.Provider value={{authDetail,login,logout}}>
    {children}
  </AuthContext.Provider>
  )
}

export default AuthContextProvider