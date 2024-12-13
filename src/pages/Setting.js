import React from 'react'
import BackToHome from '../components/BackToHome'
import { CustomTable } from '../components/customTable/CustomTable';
import { destData } from '../sampleData/sampleData';

function Setting() {

  const columns = [
    {
      Header: "Destination",
      accessor: "destination",
    },
    {
      Header: "Currency",
      accessor: "currency",
    },
    {
      Header: "Agent",
      accessor: "agent",
    },
    {
      Header: "Supplier",
      accessor: "supplier",
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
  return (
   <>
    <div className='p-0 md:p-10'>
      <BackToHome />
      <CustomTable dataa={destData} columnss={columns} button={'Add Destination'} path={'/destForm'} />
    </div>
   </>
  )
}

export default Setting