// import axios from "axios"
// import { useNavigate } from "react-router-dom"

// export const columns =[
//   {
//       name: "S No",
//       selector: (row) => row.sno,
//       width:"70px"
//   },
//   {
//       name: "Name",
//       selector: (row) => row.name,
//       sortable: true,
//       width: "150px"
//   },
//   {
//     name: "Image",
//     selector: (row) => row.profileImage,
//     width:"150px"
    
// },
// {
//   name: "Department",
//   selector: (row) => row.dep_name,
//   width:"150px"
// },
// {
//   name: "DOB",
//   selector: (row) => row.dob,
//   sortable: true,
//   width:"150px"
// },
//   {
//       name:"Action",
//       selector:(row)=> row.action,
//       //center:"true"
//   },
// ]

// export const fetchDepartments=async()=>{
//       let departments
//       try{
//         const response= await axios.get('http://localhost:4000/api/department',{
//           headers:{
//             "Authorization":`Bearer ${localStorage.getItem('token')}`
//           }
//         })
//         if(response.data.success){
//           departments=response.data.departments
//         }
//       } catch(error){
//         if(error.response && !error.response.data.success){
//           alert(error.response.data.error)
//       }
//       } 
//       return departments
//      }

//    //  employees for salary form

//    export const getEmployees=async(id)=>{
//     let employees
//     try{
//       const response= await axios.get(`http://localhost:4000/api/employee/department/${id}`,{
//         headers:{
//           "Authorization":`Bearer ${localStorage.getItem('token')}`
//         }
//       })
//       if(response.data.success){
//         employees=response.data.employees
//       }
//     } catch(error){
//       console.log(error);
      
//       if(error.response && !error.response.data.success){
//         alert(error.response.data.error)
//     }
//     } 
//     return employees
//    }


//      export const EmployeeButtons=({Id})=>{
//       const navigate=useNavigate()
    
//       return (
//           <div className="flex space-x-3">
//               <button className="px-4 py-1 bg-teal-600 text-white"
//               onClick={()=>navigate(`/admin-dashboard/employees/${Id}`)}
//               >View</button>
//               <button className="px-4 py-1 bg-blue-600 text-white"
//               onClick={()=>navigate(`/admin-dashboard/employees/edit/${Id}`)}
//               >Edit
//               </button>
//               <button className="px-4 py-1 bg-yellow-600 text-white"
//               onClick={()=>navigate(`/admin-dashboard/employees/salary/${Id}`)}
//               >Salary</button>
//               <button className="px-4 py-1 bg-red-600 text-white"
//               onClick={()=>navigate(`/admin-dashboard/employees/leaves/${Id}`)}
//               >Leave</button>
//           </div>
//       )
//   }

import axios from "axios";
import { useNavigate } from "react-router-dom";

/* ───── Table Columns ───── */
export const columns = [
  {
    name: "S No",
    selector: (row) => row.sno,
    width: "70px",
    //center: true,
  },
  {
    name: "Name",
    selector: (row) => row.name,
    sortable: true,
    width: "150px",
  },
  {
    name: "Image",
    selector: (row) => row.profileImage,
    width: "150px",
  },
  {
    name: "Department",
    selector: (row) => row.dep_name,
    width: "150px",
  },
  {
    name: "DOB",
    selector: (row) => row.dob,
    sortable: true,
    width: "150px",
  },
  {
    name: "Action",
    selector: (row) => row.action,
  },
];

// /* ───── Fetch All Departments ───── */
// export const fetchDepartments = async () => {
//   let departments;
//   try {
//     const responsne = await axios.get("http://localhost:4000/api/department", {
//       headers: {
//         Authorization: `Bearer ${localStorage.getItem("token")}`,
//       },
//     });
//     if (responsne.data.success) {
//       departments = responsne.data.departments;
//     }
//   } catch (error) {
//     if (error.response && !error.response.data.success) {
//       alert(error.response.data.error);
//     }
//   }
//   return departments;
// };

// /* ───── Get Employees by Department ID (For Salary Form) ───── */
// export const getEmployees = async (id) => {
//   try {
//     const response = await axios.get(
//       `http://localhost:4000/api/employee/department/${id}`,
//       {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//       }
//     );
//     if (response.data.success) {
//       return response.data.employees || [];
//     } else {
//       alert(response.data.error || "Failed to load employees");
//     }
//   } catch (error) {
//     console.error(error);
//     if (error.response && error.response.data?.error) {
//       alert(error.response.data.error);
//     }
//   }
//   return [];
// };

// /* ───── Employee Action Buttons ───── */
// export const EmployeeButtons = ({ _id }) => {
//   const navigate = useNavigate();

//   return (
//     <div className="flex space-x-3">
//       <button
//         className="px-4 py-1 bg-teal-600 text-white"
//         onClick={() => navigate(`/admin-dashboard/employees/${_id}`)}
//       >
//         View
//       </button>
//       <button
//         className="px-4 py-1 bg-blue-600 text-white"
//         onClick={() => navigate(`/admin-dashboard/employees/edit/${_id}`)}
//       >
//         Edit
//       </button>
//       <button
//         className="px-4 py-1 bg-yellow-600 text-white"
//         onClick={() => navigate(`/admin-dashboard/employees/salary/${_id}`)}
//       >
//         Salary
//       </button>
//       <button
//         className="px-4 py-1 bg-red-600 text-white"
//         onClick={() => navigate(`/admin-dashboard/employees/leaves/${_id}`)}
//       >
//         Leave
//       </button>
//     </div>
//   );
// };

export const fetchDepartments=async()=>{
      let departments
      try{
        const response= await axios.get('http://localhost:4000/api/department',{
          headers:{
            "Authorization":`Bearer ${localStorage.getItem('token')}`
          }
        })
        if(response.data.success){
          departments=response.data.departments
        }
      } catch(error){
        if(error.response && !error.response.data.success){
          alert(error.response.data.error)
      }
      } 
      return departments
     }

   //  employees for salary form

   export const getEmployees=async(id)=>{
    let employees
    try{
      const response= await axios.get(`http://localhost:4000/api/employee/department/${id}`,{
        headers:{
          "Authorization":`Bearer ${localStorage.getItem('token')}`
        }
      })
      if(response.data.success){
        employees=response.data.employees
      }
    } catch(error){
      console.log(error);
      
      if(error.response && !error.response.data.success){
        alert(error.response.data.error)
    }
    } 
    return employees
   }


  //    export const EmployeeButtons=({Id})=>{
  //     const navigate=useNavigate()
    
  //     return (
  //         <div className="flex space-x-3">
  //             <button className="px-4 py-1 bg-teal-600 text-white"
  //             onClick={()=>navigate(`/admin-dashboard/employees/${Id}`)}
  //             >View</button>
  //             <button className="px-4 py-1 bg-blue-600 text-white"
  //             onClick={()=>navigate(`/admin-dashboard/employees/edit/${Id}`)}
  //             >Edit
  //             </button>
  //             <button className="px-4 py-1 bg-yellow-600 text-white"
  //             onClick={()=>navigate(`/admin-dashboard/employees/salary/${Id}`)}
  //             >Salary</button>
  //             <button className="px-4 py-1 bg-red-600 text-white"
  //             onClick={()=>navigate(`/admin-dashboard/employees/leaves/${Id}`)}
  //             >Leave</button>
  //         </div>
  //     )
  // }

  /* ───── Employee Action Buttons ───── */
export const EmployeeButtons = ({ Id }) => {
  const navigate = useNavigate();
  //console.log(Id)
  return (
    <div className="flex space-x-3">
      <button
        className="px-4 py-1 bg-teal-600 text-white"
        onClick={() => navigate(`/admin-dashboard/employees/${Id}`)}
      >
        View
      </button>
      <button
        className="px-4 py-1 bg-blue-600 text-white"
        onClick={() => navigate(`/admin-dashboard/employees/edit/${Id}`)}
      >
        Edit
      </button>
      <button
        className="px-4 py-1 bg-yellow-600 text-white"
        onClick={() => navigate(`/admin-dashboard/employees/salary/${Id}`)}
      >
        Salary
      </button>
      <button
        className="px-4 py-1 bg-red-600 text-white"
        onClick={() => navigate(`/admin-dashboard/employees/leaves/${Id}`)}
      >
        Leave
      </button>
    </div>
  );
};

