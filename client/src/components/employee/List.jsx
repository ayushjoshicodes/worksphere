import React, { useState,useEffect } from 'react'
import { Link } from 'react-router-dom'
import { EmployeeButtons } from '../../utils/EmployeeHelper'
import DataTable from 'react-data-table-component'
import { columns } from '../../utils/EmployeeHelper'
import axios from 'axios'
//import mongoose from 'mongoose'

const List = () => {
  const [employees,setEmployees]=useState([])
  const [empLoading,setEmpLoading]=useState(false)
  const [filteredEmployee,setFilteredEmployee]=useState([])

  useEffect(()=>{
    const fetchEmployees=async()=>{
     setEmpLoading(true)
     try{
       const response= await axios.get('http://localhost:4000/api/employee',{
         headers:{
           "Authorization":`Bearer ${localStorage.getItem('token')}`
         }
       })
       

      

       
       if(response.data.success){
         let sno=1
        
         console.log(response.data)
         const data = await response.data.employees.map((emp) => ({
           _id: emp._id,
           sno: sno++,
           dep_name: emp.department.dep_name,
           name: emp.userId.name,
           dob: new Date(emp.dob).toLocaleDateString(),
           profileImage: (
             <img
               className="w-[40px] h-[40px] rounded-full object-cover"
               src={emp.userId.profileImage}
             />
           ),
           action: <EmployeeButtons Id={emp._id} />,
         }));
         setEmployees(data)
         setFilteredEmployee(data)
       }
     } catch(error){
       if(error.response && !error.response.data.success){
         alert(error.response.data.error)
     }
     } finally{
       setEmpLoading(false)
     }
    }
    fetchEmployees()
   },[])

    // const handleFilter = (e)=>{
    //   const records= employees.filter((emp)=>{
    //     emp.name.toLowerCase().includes(e.target.value.toLowerCase())
    //   });
    //   setFilteredEmployee(records)
    // };
    const handleFilter = (e) => {
      //const value = ;
      const records = employees.filter((emp) =>
        (emp.name.toLowerCase().includes(e.target.value.toLowerCase()))
      );
      setFilteredEmployee(records);
    };

  return (
    <div  className="p-6">
      <div className='p-5'>
            <div className='text-center'>
              <h3 className='text-2xl font-bold'>Manage Employee</h3>
            </div>
            <div className='flex justify-between items-center'>
              <input type="text" 
              placeholder='Search by employee name' 
              className='px-4 py-0.5 border'
              onChange={handleFilter}
              />
              <Link 
              to="/admin-dashboard/add-employee" 
              className='px-4 py-1 bg-teal-600 rounded text-white'
              >
              Add New Employee
              </Link>
              </div>
            </div>
            <div className='mt-6'>
              <DataTable columns={columns} data={filteredEmployee} pagination/>
            </div>
    </div>
  )

}

export default List

// import React, { useEffect, useState, useCallback } from "react";
// import { Link } from "react-router-dom";
// import DataTable from "react-data-table-component";
// import axios from "axios";
// import { columns, EmployeeButtons } from "../../utils/EmployeeHelper";

// const List = () => {
//   const [employees, setEmployees] = useState([]);
//   const [filtered, setFiltered] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const fetchEmployees = useCallback(async () => {
//     const token = localStorage.getItem("token");
//     if (!token) return alert("Please log in again.");

//     setLoading(true);
//     try {
//       const response  = await axios.get("http://localhost:4000/api/employee", {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       console.log(response);


//       if (response.data.success) {
//         let sno = 1;
//         const rows = response.data.employees.map((emp) => ({
//           _id: emp._id,
//           sno: sno++,
//           dep_name: emp.department?.dep_name || '-',
           
//           name: emp.userId?.name || "—",
//           dob: emp.dob ? new Date(emp.dob).toLocaleDateString() : "—",
//           profileImage: (
//             <img
//               width={40}
//               className="rounded-full"
//               src={
//                 emp.userId?.profileImage
//                   ? `http://localhost:4000/${emp.userId.profileImage}`
//                   : "/placeholder.png"
//               }
//               alt="Profile"
//             />
//           ),
//           action: (
//             <EmployeeButtons _id={emp._id} onEmployeeDelete={fetchEmployees} />
//           ),
//         }));
//         setEmployees(rows);
//         setFiltered(rows);
//       }
//     } catch (err) {
//       console.error(err);
//       alert(err.response?.data?.error || "Failed to load employees");
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   useEffect(() => {
//     fetchEmployees();
//   }, [fetchEmployees]);

//   const handleFilter = (e) => {
//     const value = e.target.value.toLowerCase();
//     setFiltered(
//       employees.filter(
//         (emp) =>
//           emp.name.toLowerCase().includes(value) ||
//           emp.dep_name.toLowerCase().includes(value)
//       )
//     );
//   };

//   return (
//     <div className="p-6">
//       <h3 className="text-center text-2xl font-bold mb-4">Manage Employees</h3>

//       <div className="flex justify-between items-center mb-4">
//         <input
//           type="text"
//           placeholder="Search by name or department"
//           className="px-4 py-0.5 border"
//           onChange={handleFilter}
//         />
//         <Link
//           to="/admin-dashboard/add-employee"
//           className="px-4 py-1 bg-teal-600 rounded text-white"
//         >
//           Add New Employee
//         </Link>
//       </div>

//       {loading ? (
//         <div className="text-center">Loading…</div>
//       ) : (
//         <DataTable columns={columns} data={filtered} pagination />
//       )}
//     </div>
//   );
// };

// export default List;
