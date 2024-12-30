import React, { useEffect, useState } from 'react'
import { CustomTable } from '../components/customTable/CustomTable';
import BackToHome from '../components/BackToHome'
import { MdModeEdit, MdDelete } from "react-icons/md";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
function User() {

  const navigate = useNavigate();

  const [data, setData] = useState([]);
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

      useEffect(() => {
        (async () => {
          try {
            const res = await axios.get('http://localhost:5001/api/users/getAllUsers',
            {
              headers : {
                'Content-Type': 'application/json',
              }
            });
            console.log(res.data.OUTPUT);
            setData(res.data.OUTPUT);
          } catch (error) {
            console.log(error);
          }
        })();
      }, []);

      const udata = data.map((item) => {
        return {
            name: item.name,
            phone: item.phone,
            profile: item.profile,
            email: item.email,
            status: <button className="m-1 p-1 rounded-lg bg-green-400">{item.status}</button>,
            action: <><button className=" rounded-lg text-blue-400" onClick={() => {
              navigate('/userForm', { state: item });
            }}><MdModeEdit />
            </button> <button className=" rounded-lg text-red-400" onClick={() => {
              (async () => {
                try {
                  const res = await axios.delete(`http://localhost:5001/api/users/deleteUser/${item.id}`,
                  {
                    headers : {
                      'Content-Type': 'application/json',
                    }
                  });
                  console.log(res.data.OUTPUT);
                  window.location.reload();
                } catch (error) {
                  console.log(error);
              }})();
            }}><MdDelete /></button></>,
        }
    });

  return (
    <div className='flex w-full h-screen p-4 justify-between'>
      {/* <Header /> */}
      <div className='relative w-full top-0 right-0'>
    <BackToHome />
        
    {/* <!-- User Profiles Page --> */}
    <CustomTable dataa={udata} columnss={columns} button={'Add User'} path={'/userForm'} size={"text-md"} />
    </div>
    </div>
  )
}

export default User;