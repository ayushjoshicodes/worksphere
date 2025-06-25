// import React, { useEffect, useState } from 'react'
// import {Link} from 'react-router-dom'
// import DataTable from 'react-data-table-component'  
// import {columns} from '../../utils/DepartmentHelper'
// import axios from 'axios'

// const departmentList = () => {
//    const [department,setDepartment]=useState([])
//    const [depLoading,setDepLoading]= useState(false)
//    const [filteredDepartments,setFilteredDepartments]=useState([])
//     const onDepartmentDelete= ()=>{
//       fetchDepartments()
//     }

//     const fetchDepartments=async()=>{
//   setDepLoading(true)
//   try{
//     const response= await axios.get('http://localhost:4000/api/department',{
//       headers:{
//         "Authorization":`Bearer ${localStorage.getItem('token')}`
//       }
//     })
//     if(response.data.success){
//       let sno=1
//       const data=await response.data.departments.map((dep)=>(
//         {
//           _id: dep._id,
//           sno: sno++,
//           dep_name:dep.dep_name,
//           action: (<DepartmentButtons _id={dep._id} onDepartmentDelete={onDepartmentDelete}/>)
//         }
//       ))
//       setDepartment(data)
//       setFilteredDepartments(data)
//     }
//   } catch(error){
//     if(error.response && !error.response.data.success){
//       alert(error.response.data.error)
//   }
//   } finally{
//     setDepLoading(false)
//   }
//  }

// useEffect(()=>{
 
//  fetchDepartments()
// },[])

//   const filterDepartments=(e)=>{
//     const records = department.filter((dep)=>{
//       dep.dep_name.toLowerCase().includes(e.target.value.toLowerCase())
//       setFilteredDepartments(records)
//     })
//   }

//   return (
//     <>{depLoading ? <div>Loading ...</div> : 
//     <div className='p-5'>
//       <div className='text-center'>
//         <h3 className='text-2xl font-bold'>Manage Departments</h3>
//       </div>
//       <div className='flex justify-between items-center'>
//         <input type="text" placeholder='Search by department name' className='px-4 py-0.5 border'
//         onChange={filterDepartments}
//         />
//         <Link to="/admin-dashboard/add-department" className='px-4 py-1 bg-teal-600 rounded text-white'>Add New Department</Link>
//       </div>
//       <div className='mt-5'>
//         <DataTable
//         columns={columns}
//         data={filteredDepartments} pagination
//         />
//       </div>
//     </div>
//     }</>
//   )
// }

// export default departmentList

// DepartmentList.jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import DataTable from 'react-data-table-component';
import { columns } from '../../utils/DepartmentHelper';
import axios from 'axios';
import { DepartmentButtons } from "../../utils/DepartmentHelper";   // assuming this exists

function DepartmentList() {
  const [departments, setDepartments] = useState([]);
  const [filtered, setFiltered]     = useState([]);
  const [loading, setLoading]       = useState(false);

  /* ───────────── Fetch once on mount ───────────── */
  const fetchDepartments = async () => {
    setLoading(true);
    try {
      const res = await axios.get('http://localhost:4000/api/department', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });

      if (res.data.success) {
        let sno = 1;
        const data = res.data.departments.map(dep => ({
          _id: dep._id,
          sno: sno++,
          dep_name: dep.dep_name,
          action: (
            <DepartmentButtons
              _id={dep._id}
              onDepartmentDelete={fetchDepartments}
            />
          )
        }));
        setDepartments(data);
        setFiltered(data);
      }
    } catch (err) {
      console.error(err);
      if (err.response?.data?.error) alert(err.response.data.error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDepartments();
  }, []);

  /* ───────────── Local search box ───────────── */
  const filterDepartments = e => {
    const value = e.target.value.toLowerCase();
    const records = departments.filter(dep =>
      dep.dep_name.toLowerCase().includes(value)
    );
    setFiltered(records);
  };

  /* ───────────── UI ───────────── */
  if (loading) return <div className="p-5 text-center">Loading…</div>;

  return (
    <div className="p-5">
      <h3 className="text-center text-2xl font-bold mb-4">Manage Departments</h3>

      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Search by department name"
          className="px-4 py-0.5 border"
          onChange={filterDepartments}
        />
        <Link
          to="/admin-dashboard/add-department"
          className="px-4 py-1 bg-teal-600 rounded text-white"
        >
          Add New Department
        </Link>
      </div>

      <DataTable columns={columns} data={filtered} pagination />
    </div>
  );
}

export default DepartmentList;
