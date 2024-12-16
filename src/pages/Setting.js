import React from 'react'
import BackToHome from '../components/BackToHome'
import { CustomTable } from '../components/customTable/CustomTable';
import { destData } from '../sampleData/sampleData';
// import { z } from "zod";

function Setting() {
  // const destSchema = z.object({
  //   destination: z.string(),
  //   currency: z.string(),
  // })

  // const agentSchema = z.object({
  //   agent: z.string(),
  //   status: z.string()
  // })

  // const supplierSchema = z.object({
  //   supplier: z.string(),
  //   status: z.string()
  // })

  const [activeTab, setActiveTab] = React.useState(1);

  const columns = [
    {
      Header: "Destination",
      accessor: "destination",
    },
    {
      Header: "Currency",
      accessor: "currency",
    },
  ];
  return (
   <>
    <div className='flex justify-around p-4 w-full h-full items-center overflow-y-auto content-center'>
      <div className='absolute top-2 left-2'>
        <BackToHome path={'/'} />
        </div>
      <div className='flex-col w-[45%] h-[80vh] p-4 bg-slate-100'>
        <div className='text-center text-lg font-semibold text-slate-50 bg-slate-800'>
          <div>
            <ul className='flex justify-start'>
              <li className='border-x-2 p-2'> <button onClick={() => setActiveTab(1)}>Destinations</button></li>
              <li className='border-x-2 p-2'> <button onClick={() => setActiveTab(2)}>Agents</button></li>
              <li className='border-x-2 p-2'> <button onClick={() => setActiveTab(3)}>Suppliers</button></li>
            </ul>
          </div>
        </div>
        {activeTab === 1 && <form>
    <input className='w-full p-2 border-2 m-2' type="text" placeholder='Destination'/>
  <input className='w-full p-2 border-2 m-2' type="text" placeholder='Currency'/>
  <button className='w-1/2 p-2 border-2 m-2 bg-slate-700 text-white'>Save</button>
    </form>}
        {activeTab === 2 && <form>
    <input className='w-full p-2 border-2 m-2' type="text" placeholder='Agent'/>
  <input className='w-full p-2 border-2 m-2' type="text" placeholder='Status'/>
  <button className='w-1/2 p-2 border-2 m-2 bg-slate-700 text-white'>Save</button>
    </form>}
        {activeTab === 3 && <form>
      <input className='w-full p-2 border-2 m-2' type="text" placeholder='Supplier'/>
    <input className='w-full p-2 border-2 m-2' type="text" placeholder='Status'/>
    <button className='w-1/2 p-2 border-2 m-2 bg-slate-700 text-white'>Save</button>
      </form>}
      </div>
      <div className='flex-col w-[45%] h-[80vh] p-4 bg-slate-100'>
{activeTab === 1 && <CustomTable dataa={destData} columnss={columns} button={''} path={'/destForm'} />}
{activeTab === 2 && <CustomTable dataa={destData} columnss={columns} button={''} path={'/agentForm'} />}
{activeTab === 3 && <CustomTable dataa={destData} columnss={columns} button={''} path={'/supForm'} />}      
</div>
     </div>
   </>
  )
}

export default Setting