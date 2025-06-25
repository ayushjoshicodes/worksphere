import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

const View = () => {

    const [salaries,setSalareies]=useState([])
    const [filteredSalaries,setFilteredSalaries]=useState([])
    const {id}=useParams()
    let sno=1
    const {user}=useAuth()
    
    
    const fetchSalaries=async()=>{
      //console.log("Token:", localStorage.getItem("token")); // 👈 ADD THIS
      try {
        //console.log(id);
        const response = await axios.get(
          `https://worksphere-qbfu.onrender.com/api/salary/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        console.log(response.data);
        if (response.data.success) {
          setSalareies(response.data.salary);
          setFilteredSalaries(response.data.salary);
        }
      } catch (error) {
        if (error.response && !error.response.data.success) {
          alert(error.message);
        }
      }
    }

    useEffect(()=>{
        fetchSalaries()
    },[])

    const filterSalaries = (q)=>{
        const filteredRecords = salaries.filter((leave) =>
          leave.employeeId.employeeId
            .toLocaleLowerCase()
            .includes(q.toLocaleLowerCase())
        );
        setFilteredSalaries(filteredRecords)
    }

  return (
    <>
      {filteredSalaries === null ? (
        <div>Loading ...</div>
      ) : (
        <div className="overflow-x-auto p-5">
          <div className="text-center">
            <h2 className="text-2xl font-bold">Salary History</h2>
          </div>
          <div className="flex justify-end my-3">
            <input
              type="text"
              placeholder="Search By Emp ID"
              className="border px-2 rounded-md py-0.5 border-gray-300"
              onChange={filterSalaries}
            />
          </div>

          {filteredSalaries.length > 0 ? (
            <table className="w-full text-sm text-left text-gray-500">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 border border-gray-200">
                <tr>
                  <th className="px-6 py-3">SNO</th>
                  <th className="px-6 py-3">Emp ID</th>
                  <th className="px-6 py-3">Salary</th>
                  <th className="px-6 py-3">Allowance</th>
                  <th className="px-6 py-3">Deduction</th>
                  <th className="px-6 py-3">Total</th>
                  <th className="px-6 py-3">PayDate</th>
                </tr>
              </thead>
              <tbody>
                {filteredSalaries.map((salary) => (
                  <tr
                    key={salary._id}
                    className="bg-white border-b dark:bg-white-800 dark:border-gray-700"
                  >
                    <td className="px-6 py-3">{sno++}</td>
                    <td className="px-6 py-3">
                      {salary.employeeId.employeeId}
                    </td>
                    <td className="px-6 py-3">{salary.basicSalary}</td>
                    <td className="px-6 py-3">{salary.allowances}</td>
                    <td className="px-6 py-3">{salary.deductions}</td>
                    <td className="px-6 py-3">{salary.netSalary}</td>
                    <td className="px-6 py-3">
                      {new Date(salary.payDate).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div>No Records </div>
          )}
        </div>
      )}
    </>
  );
}


export default View


