import React from 'react'
import BackToHome from '../components/BackToHome'
import { CustomTable } from '../components/customTable/CustomTable'
import { bookings } from '../sampleData/sampleData'
import bookingColumns from '../components/customTable/columns'

function Schedule() {
  return (
   <div className='p-0 md:p-10'>
   <BackToHome />
   <CustomTable dataa={bookings} columnss={bookingColumns} button={'Add Booking'} path={'/booking'} />
   </div>
  )
}

export default Schedule