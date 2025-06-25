/*import axios from 'axios'
import React, { createContext, useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const  userContext= createContext()

const AuthContext = ({children}) => {
    const [user,setUser]=useState(null)
   const [loading,setLoading]=useState(true)

    useEffect(()=>{
        const verifyUser=async()=>{
            try{
                const token =localStorage.getItem('token')
                if(token){
                const response=await axios.get('http://localhost:5000/api/auth/verify',{
                    headers:{
                        "Authorization":`Bearer ${token}`
                    }
                })
                if(response.data.success){
                    setUser(response.data.user)
                }
            } else{
                setUser(null)
                setLoading(false)
            }
            } catch(error){
               if(error.response && !error.response.data.error){
                setUser(null)
               }
            } finally{
                setLoading(false)
            }
        }
        verifyUser()
    },[])

    const login=()=>{
        setUser(user)
    }

    const logout=()=>{
        setUser(null)
        localStorage.removeItem("token")
    }
  return (
    <userContext.Provider value={{user, login, logout,loading}}>
        {children}
    </userContext.Provider>
  )
}

export const useAuth=()=>useContext(userContext)
export default AuthContext */ 


import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";


const UserContext = createContext(); // ✅ Use proper capitalization

const AuthProvider = ({ children }) => {
  // ✅ Correct component name
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyUser = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          const response = await axios.get(
            "https://worksphere-qbfu.onrender.com/api/auth/verify",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          if (response.data.success) {
            setUser(response.data.user);
          }
        } else {
          setUser(null);
          setLoading(false); // ✅ Ensure loading is updated
        }
      } catch (error) {
        if (error.response && !error.response.data.error) {
          setUser(null);
        }
      } finally {
        setLoading(false);
      }
    };
    verifyUser();
  }, []);

  const login = (userData) => {
    // ✅ Accept user data argument
    setUser(userData);
    localStorage.setItem("token", userData.token); // ✅ Store token on login
  };

  const logout = (navigate) => {
    setUser(null);
    localStorage.removeItem("token");
    if (navigate) navigate("/login"); // ⬅️ Redirect to login
  };


  return (
    <UserContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </UserContext.Provider>
  );
};

// ✅ Corrected useAuth Hook
export const useAuth = () => useContext(UserContext);

export { AuthProvider };
