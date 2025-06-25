// import React, { useEffect, useState } from 'react'
// import DataTable from 'react-data-table-component'
// import { columns } from '../../utils/LeaveHelper'
// import axios from 'axios'


// const Table = () => {
//     const [leaves,setLeaves] = useState([])
//     const [filteredLeaves,setFilteredLeaves] = useState([])
//     const fetchLeaves= async ()=>{
      
//         try{
//        const response= await axios.get('http://localhost:4000/api/leave',{
//          headers:{
//            "Authorization":`Bearer ${localStorage.getItem('token')}`
//          }
//        })
       
       
       
//        if(response.data.success){
        
//          let sno=1
//         //  const data = response.data.leaves.map((leave)=>
//         //    (
//         //      _id: leave._id,
//         //      sno: sno++,
//         //      employeeId:leave.employeeId.employeeId,
//         //      name:leave.employeeId.userId.name,
//         //      leaveType:leave.leaveType,
//         //      department:leave.employeeId.department.dep_name,
//         //      days:
//         //         new Date(leave.endDate).getDate() -
//         //         new Date(leave.startDate).getDate(),
//         //      status:leave.status,
//         //      action: (<LeaveButtons Id={leave._id}/>)
//         //   )
          
//         // )
//        // console.log(response.data);

//         response.data.leaves.map((leave) => {
//           console.log(leave);
          
//         })
        
//         const data = await response.data.leaves.map((leave, index) => ({
          
//             _id: leave._id,
//             sno: index + 1, 
//             employeeId: leave?.employeeId?.employeeId || "N/A",
//             name: leave?.employeeId?.userId?.name || "N/A",
//             leaveType: leave?.leaveType || "N/A",
//             department: leave?.employeeId?.department?.dep_name || "N/A",
//             days:
//               Math.ceil(
//                 (new Date(leave.endDate) - new Date(leave.startDate)) /
//                   (1000 * 60 * 60 * 24)
//               ) + 1, 
//             status: leave?.status || "Pending",
//             action: <LeaveButtons Id={leave._id} />,
          
//         }));

        
//          //console.log(response.data);
//          setLeaves(data)
//          setFilteredLeaves(data)
//        }
//      } catch(error){
//        if(error.response && !error.response.data.success){
//          alert(error.response.data.error)
//      }
//     }
//     }
//     useEffect(()=>{
//         fetchLeaves()
//     },[])

//      const filterByInput =(e)=>{
//          const data=leaves.filter(leave=>leave.employeeId.toLowerCase().includes(e.target.value.toLowerCase()))
//          setFilteredLeaves(data)
//      }
//      const filterByButton =(status)=>{
//          const data=leaves.filter(leave=>leave.status.toLowerCase().includes(status.toLowerCase()))
//          setFilteredLeaves(data)
//      }

//   return (
//     <>
//     { (filteredLeaves.length !== 0 ? (
//     <div className='p-6'>
//          <div className='text-center'>
//               <h3 className='text-2xl font-bold'>Manage Leaves</h3>
//             </div>
//             <div className='flex justify-between items-center'>
//               <input type="text" 
//               placeholder='Search by Emp Id' 
//               className='px-4 py-0.5 border'
//               onChange={filterByInput}
//               />
//               <div className='space-x-3'>
//               <button className='px-2 py-1 bg-teal-600 text-white hover:bg-teal-700'
//               onClick={()=>filterByButton("Pending")}>
//                 Pending
//                 </button>
//               <button className='px-2 py-1 bg-teal-600 text-white hover:bg-teal-700'
//               onClick={()=>filterByButton("Approved")}>
//                 Approved
//                 </button>
//               <button className='px-2 py-1 bg-teal-600 text-white hover:bg-teal-700'
//               onClick={()=>filterByButton("Rejected")}>
//                 Rejected
//                 </button>
//               </div>
//               </div>
//                 {/* <div className='mt-3'> */}
//                 <DataTable columns={columns} data={filteredLeaves} pagination/>
//               {/* </div> */}
//     </div>
//     ) : <div>loading...</div>)}
//     </>
//   )
// }

// export default Table


import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { columns, LeaveButtons } from "../../utils/LeaveHelper";
import axios from "axios";

const Table = () => {
  const [leaves, setLeaves] = useState([]);
  const [filteredLeaves, setFilteredLeaves] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchLeaves = async () => {
    try {
      const response = await axios.get("https://worksphere-qbfu.onrender.com/api/leave", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.data.success) {
        const data = response.data.leaves.map((leave, index) => ({
          _id: leave._id,
          sno: index + 1,
          employeeId: leave?.employeeId?.employeeId || "N/A",
          name: leave?.employeeId?.userId?.name || "N/A",
          leaveType: leave?.leaveType || "N/A",
          department: leave?.employeeId?.department?.dep_name || "N/A",
          days:
            Math.ceil(
              (new Date(leave.endDate) - new Date(leave.startDate)) /
                (1000 * 60 * 60 * 24)
            ) + 1,
          status: leave?.status || "Pending",
          action: <LeaveButtons Id={leave._id} />,
        }));

        setLeaves(data);
        setFilteredLeaves(data);
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        alert(error.response.data.error);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeaves();
  }, []);

  const filterByInput = (e) => {
    const data = leaves.filter((leave) =>
      leave.employeeId.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredLeaves(data);
  };

  const filterByButton = (status) => {
    const data = leaves.filter((leave) =>
      leave.status.toLowerCase().includes(status.toLowerCase())
    );
    setFilteredLeaves(data);
  };

  return (
    <>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="p-6">
          <div className="text-center">
            <h3 className="text-2xl font-bold">Manage Leaves</h3>
          </div>
          <div className="flex justify-between items-center">
            <input
              type="text"
              placeholder="Search by Emp Id"
              className="px-4 py-0.5 border"
              onChange={filterByInput}
            />
            <div className="space-x-3">
              <button
                className="px-2 py-1 bg-teal-600 text-white hover:bg-teal-700"
                onClick={() => filterByButton("Pending")}
              >
                Pending
              </button>
              <button
                className="px-2 py-1 bg-teal-600 text-white hover:bg-teal-700"
                onClick={() => filterByButton("Approved")}
              >
                Approved
              </button>
              <button
                className="px-2 py-1 bg-teal-600 text-white hover:bg-teal-700"
                onClick={() => filterByButton("Rejected")}
              >
                Rejected
              </button>
            </div>
          </div>
          <div className="mt-3">
            <DataTable
              columns={columns}
              data={filteredLeaves}
              pagination
              noDataComponent="No leaves found."
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Table;
