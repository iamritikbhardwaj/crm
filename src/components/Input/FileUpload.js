import React from 'react'

function FileUpload({label, id, onChange, onRemove, files, catagory}) {
  return (
    <li className='flex justify-between'>
      <spna>{label}:</spna>
    <input type="file" accept='application/pdf,image/*' multiple onClick={(e) => console.log('clicked')} id={id} onChange={(e) => onChange(e,catagory)} className='hidden' />
    <label htmlFor={id} className='cursor-pointer bg-blue-500 px-2 py-1 rounded text-white'>Upload</label>
    {files && files.map((file, index) => (
      <>
      <a src={URL.createObjectURL(file)} key={index}>{file.name}</a>
      <button onClick={() => onRemove(index)}>Remove</button>
      </>
    ))}
    </li>
  )
}

export default FileUpload