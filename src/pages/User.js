import React from 'react'
import { CustomTable } from '../components/customTable/CustomTable';
import BackToHome from '../components/BackToHome'
import { userData } from '../sampleData/sampleData';
import Header from "../header/Header.js"
function User() {

    const columns = [
        {
          Header: "User Name",
          accessor: "name",
        },
        {
          Header: "Phone Number",
          accessor: "phone",
        },
        {
          Header: "Profile",
          accessor: "profile",
        },
        {
          Header: "Email",
          accessor: "email",
        },
        {
          Header: "Status",
          accessor: "status",
        },
        {
          Header: "Action",
          accessor: "action",
        },
      ];

    const inputData = [
        {
          value: "User Name",
          dropDown: {}
        },
        {
          value: "Phone Number",
          dropDown: {}
        },
        {
          value: "Profile",
          dropDown: {
            options: ["Admin", "Sales", "Operations", "Finance"]
          }
        },
        {
          value: "Email",
          dropDown: {}
        },
        {
          value: "Status",
          dropDown: {
            options: [<button className='p-2 bg-red-400'>Inactive</button>, 
            <button className='p-2 bg-green-400'>Active</button>]
          }
        }
      ];

  return (
    <div className='flex w-full h-screen p-4 justify-between'>
      {/* <Header /> */}
      <div className='relative w-full top-0 right-0'>
    <BackToHome />
        
    {/* <!-- User Profiles Page --> */}
    <CustomTable dataa={userData} columnss={columns} button={'Add User'} path={'/userForm'} size={"text-md"} />
    </div>
    </div>
  )
}

export default User;