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
          Header: "Assigned Permissions",
          accessor: "permissions",
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
            options: ["Active", "Inactive"]
          }
        },
        {
          value: "Assigned Permissions",
          dropDown: {}
        }
      ];

  return (
    <div className='flex justify-between'>
      {/* <Header /> */}
      <div className='relative w-full top-0 right-0'>
    <BackToHome />
        
    {/* <!-- User Profiles Page --> */}
    <CustomTable dataa={userData} columnss={columns} button={'Add User'} path={'/userForm'} />
    </div>
    </div>
  )
}

export default User