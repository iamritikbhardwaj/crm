import React, { useEffect, useState } from 'react'
import { CustomTable } from '../components/customTable/CustomTable';
import BackToHome from '../components/BackToHome'
import { MdModeEdit, MdDelete } from "react-icons/md";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../AppConstant';
import Swal from 'sweetalert2';
import SampleFile from '../components/Form/sampleFile';
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
            const res = await axios.get(`${API_URL}users/getAllUsers`,
            { 
              withCredentials: true,
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
              Swal.fire({
                title: "Do you want to delete?",
                showDenyButton: true,
                confirmButtonText: "Delete",
                denyButtonText: `Don't Delete`
              }).then((result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
                  (async () => {
                    try {
                      const res = await axios.delete(`http://localhost:5001/api/users/deleteUser/${item.id}`,
                      {
                        withCredentials: true,
                        headers : {
                          'Content-Type': 'application/json',
                        }
                      });
                      console.log(res.data.OUTPUT);
                      await Swal.fire("Deleted!", "", "success");
                      window.location.reload();
                    } catch (error) {
                      console.log(error);
                  }})();
                 
                } else if (result.isDenied) {
                  Swal.fire("Changes are not deleted", "", "info");
                }
              });
              
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