import React from 'react';

function FileUpload({ label, id, onChange, catagory, toAccept }) {
  const [fileSelected, setFileSelected] = React.useState(false);

  const handleChange = (e) => {
    const files = e.target.files;
    if (files.length > 0) {
      setFileSelected(true);
      onChange(e, catagory);
    }
    console.log("files");
  };


  return (
    <div className='flex justify-between'>
      <span>{label}:</span>

      {/* Hidden file input */}
      <input
        type="file"
        accept={toAccept || "application/pdf,image/*,.msg,application/vnd.ms-outlook"}
        multiple
        id={id}
        onChange={handleChange}  // assigning the click event handler
        className='hidden'
      />

      {/* Button to trigger file input click */}
      <button
        type="button"
        onClick={() => document.querySelector(`#${id}`).click()}
        className='cursor-pointer bg-blue-500 px-2 py-1 rounded text-white'
      >
        {fileSelected ?  "Add more files" : "Upload"}
      </button>
    </div>
  );
}

export default FileUpload;
