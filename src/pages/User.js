import React from 'react'
import { CustomTable } from '../components/customTable/CustomTable';
import BackToHome from '../components/BackToHome'
import {ProfileDropdown} from '../components/dropDown/DropDown'
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
    
      const data = 
      [
        {
          name: "John Doe",
          phone: "1234567890",
          profile: <ProfileDropdown />,
          email: "jdoe@me.com",
          status: "Active",
          permissions: "View, Edit, Delete",
          action: <button onClick={() => alert('Edit')}>Edit</button>,
        },
        {
          name: "Jane Doe",
          phone: "1234567890",
          profile: <ProfileDropdown />,
          email: "jdoe@me.com",
          status: "Inactive",
          permissions: "View, Edit, Delete",
          action: <button onClick={() => alert('Edit')}>Edit</button>,
        },
        {
          name: "John Doe",
          phone: "1234567890",
          profile: <ProfileDropdown />,
          email: "jdoe@me.com",
          status: "Active",
          permissions: "View, Edit, Delete",
          action: <button onClick={() => alert('Edit')}>Edit</button>,
        },
        {
          name: "Jane Doe",
          phone: "1234567890",
          profile: <ProfileDropdown />,
          email: "jdoe@me.com",
          status: "Inactive",
          permissions: "View, Edit, Delete",
          action: <button onClick={() => alert('Edit')}>Edit</button>,
        },
        {
          name: "John Doe",
          phone: "1234567890",
          profile: <ProfileDropdown />,
          email: "jdoe@me.com",
          status: "Active",
          permissions: "View, Edit, Delete",
          action: <button onClick={() => alert('Edit')}>Edit</button>,
        },
        {
            id: 1,
          name: "Jane Doe",
          phone: "1234567890",
          profile: <ProfileDropdown />,
          email: "jdoe@me.com",
          status: "Inactive",
          permissions: "View, Edit, Delete",
          action: <button onClick={() => alert('Edit')}>Edit</button>,
        },
      ];

  return (
    <div className='p-0 md:p-10'>
    <BackToHome />
    <div className='container text-center'>
        
    {/* <!-- User Profiles Page --> */}
    <CustomTable dataa={data} columnss={columns} button={'Add User'} path={'/userForm'}/></div>
    </div>
  )
}

export default User