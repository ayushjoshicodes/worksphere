// import React, { useState } from 'react'
// /*import axiosInstance from "../utils/api"*/
// import { useNavigate } from 'react-router-dom'

// import axios from 'axios'
// import { useAuth } from '../../context/AuthContext'

// const Setting = () => {
//   const navigate = useNavigate()
//   const {user} = useAuth()
//   const [setting,setSetting]=useState({
//     userId: user._id,
//     oldPassword:"",
//     newPassword:"",
//     confirmPassword:"",
//   })
//   const [error,setError]=useState(null)

//   const handleChange = (e)=>{
//     const {name,value}=e.target
//     setSetting({...setting,[name]:value})
//   }

//  const handleSubmit = async(e)=>{
//     e.preventDefault()
//     if( setting.newPassword !== setting.confirmPassword){
//       console.log(user._id);
//       setError("Password not matched")
//     } else{
//       try{
        
//         const response =  await axios.put(
//           "http://localhost:4000/api/setting/change-password",
//           setting,
//           {
//             headers:{
//               Authorization: `Bearer ${localStorage.getItem("token")}`,
//             },
//           }
//         )
//         if(response.data.success){
//           navigate("/login")
//           alert("password changed successfully")
//           setError("")
//         }
//       } catch (error){
//         if(error.response && !error.response.data.success){
//           setError(error.response.data.error)
//         }
//       }
//     }
//  }


//   return (
//     <div className='max-w-3xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md w-96'>
//       <h2 className='text-2xl font-bold mb-6'>Change Password</h2>
//       <p className='text-red-500'>{error}</p>
//       <form onSubmit={handleSubmit}>
      
//          {/*Department*/}
//          <div>
//             <label className=' text-sm font-medium text-gray-700'>
//               Old Password
//             </label>
//             <input 
//             type="password"
//             name='oldPassword'

//             onChange={handleChange}
//             placeholder='Change Password'
//             className='mt-1 p-2  w-full border border-gray-300 rounded-md'
//             required
//             />
//           </div>
//           {/*employee*/}
//          <div >
//             <label className=' text-sm font-medium text-gray-700'>
//               New Password
//             </label>
//             <input 
//             type="password"
//             name='newPassword'

//             onChange={handleChange}
//             placeholder='New Password'
//             className='mt-1 p-2  w-full border border-gray-300 rounded-md'
//             required
//             />
//           </div>

//           {/*Basic Salary*/}
//           <div>
//             <label className=' text-sm font-medium text-gray-700'>
//               Confirm Password
//             </label>
//             <input 
//             type="password"
//             name='confirmPassword'

//             onChange={handleChange}
//             placeholder='Confirm Password'
//             className='mt-1 p-2  w-full border border-gray-300 rounded-md'
//             required
//             />
//           </div>

//         <button type='submit'
//         className='w-full mt-6 bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded'
//         >
//           Change Password
//         </button>
//       </form>
//     </div>
//   )
// }

// export default Setting

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";

const Setting = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [setting, setSetting] = useState({
    userId: "",
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [error, setError] = useState(null);

  // ✅ Set userId when user is available
  useEffect(() => {
    if (user?._id) {
      setSetting((prev) => ({ ...prev, userId: user._id }));
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSetting((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (setting.newPassword !== setting.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const response = await axios.put(
        "https://worksphere-qbfu.onrender.com/api/setting/change-password",
        setting,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.data.success) {
        alert("Password changed successfully");
        if(user.role === "admin" ){
          navigate("/admin-dashboard");
        }
        if(user.role === "employee"){
          navigate("/employee-dashboard");
        }
        setError("");
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        setError(error.response.data.error);
      }
    }
  };

  // 🛡️ Optional fallback while loading user
  if (!user) return <div>Loading...</div>;

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md w-96">
      <h2 className="text-2xl font-bold mb-6">Change Password</h2>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label className="text-sm font-medium text-gray-700">
            Old Password
          </label>
          <input
            type="password"
            name="oldPassword"
            onChange={handleChange}
            placeholder="Old Password"
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            required
          />
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700">
            New Password
          </label>
          <input
            type="password"
            name="newPassword"
            onChange={handleChange}
            placeholder="New Password"
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            required
          />
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700">
            Confirm Password
          </label>
          <input
            type="password"
            name="confirmPassword"
            onChange={handleChange}
            placeholder="Confirm Password"
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full mt-6 bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded"
        >
          Change Password
        </button>
      </form>
    </div>
  );
};

export default Setting;
