import React, { useState } from "react";
import FileUpload from "../Input/FileUpload";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { API_URL } from "../../AppConstant";

function DocForm() {
  const [documents, setDocuments] = useState([]);
  const location = useLocation();
  const bookingId = location.state?.bookingId;

  const addDocument = (e, catagory) => {
    const files = e.target.files;
    if (files.length > 0) {
      Array.from(files).forEach((file) => {
        const fileURL = URL.createObjectURL(file);
        setDocuments((prevDocs) => [
          ...prevDocs,
          { file: file, fileURL, catagory },
        ]);
        console.log(documents, "documents");
      });
    }
  };

  const removeDocument = (index) => {
    const updatedDocs = documents.filter((_, i) => i !== index);
    setDocuments(updatedDocs);
  };

  const submitDocs = async (e) => {
    e.preventDefault();
    console.log(documents, "documents");
    const formData = new FormData();

    formData.append("files", documents);

    const response = await axios.post(
      `${API_URL}upload/docs/?id=${bookingId}`,
      formData,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data", // This is required for file uploads
        },
      }
    );
  };

  return (
    <form onSubmit={submitDocs}>
      <div
        className={`w-2/3 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border border-slate-400 p-4`}
      >
        <h3 className="text-2xl font-bold mb-4">Documents Upload</h3>
        <div className="flex">
          {/* Document Upload List */}
          <div className="w-1/2 border-r border-gray-300 px-2 space-y-2">
            <FileUpload
              label={"Air Ticket & Hotel"}
              id={"airTicket"}
              onChange={addDocument}
              onRemove={removeDocument}
              files={documents}
              catagory={"airTicket"}
            />
            <FileUpload
              label={"Passport"}
              id={"passport"}
              onChange={addDocument}
              onRemove={removeDocument}
              files={documents}
              catagory={"passport"}
            />
            <FileUpload
              label={"PAN"}
              id={"pan"}
              onChange={addDocument}
              onRemove={removeDocument}
              files={documents}
              catagory={"pan"}
            />
            <FileUpload
              label={"Sales Sheet"}
              id={"misc"}
              onChange={addDocument}
              onRemove={removeDocument}
              files={documents}
              catagory={"freezeQuotation"}
              toAccept=".xls,.xlsx,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
            />
            <FileUpload
              label={"Email Confirmation"}
              id={"emailConf"}
              onChange={addDocument}
              onRemove={removeDocument}
              files={documents}
              catagory={"emailConf"}
            />
          </div>

          {/* Document Preview */}
          <div className="w-1/2 pl-4">
            <ul>
              {documents.length > 0
                ? documents.map((doc, index) => (
                    <li className="space-x-2" key={index}>
                      <a
                        href={doc.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {doc.file.name}
                      </a>
                      <button
                        className="text-red-400 hover:text-red-700"
                        onClick={() => removeDocument(index)}
                      >
                        Remove
                      </button>
                    </li>
                  ))
                : "No documents uploaded"}
            </ul>
          </div>
        </div>
        <button
          type="submit"
          className="bg-blue-500 m-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Submit
        </button>
      </div>
    </form>
  );
}

export default DocForm;


// const DocForm = () => {
//   const [files, setFiles] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const location = useLocation();
//   const id = location.state?.booking_id;
//   console.log(id, 'bookingId');

//   const handleFileChange = (event) => {
//     const newFiles = Array.from(event.target.files);
//     setFiles((prevFiles) => [...prevFiles, ...newFiles]);
//   };

//   const handleCategoryChange = (index, event) => {
//     const newCategories = [...categories];
//     newCategories[index] = event.target.value;
//     setCategories(newCategories);
//   };

//   const handleRemoveFile = (index) => {
//     const newFiles = [...files];
//     newFiles.splice(index, 1);
//     setFiles(newFiles);
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     const formdata = {
//       files: files }
//     console.log(formdata, 'data');

//     try {
//       const response = await axios.post(`${API_URL}upload/docs`, formdata ,{
//         withCredentials: true,
//         Headers: {
//           "Content-Type": "multipart/form-data"
//         }
//       });
//       const data = await response.json();
//       console.log('Upload successful:', data);
//     } catch (error) {
//       console.error('Error uploading files:', error);
//     }
//   };

//   const url = async (file) => {
//     if(!file) return;
//     const data = await URL.createObjectURL(file);
//     return data;
//   };

//   const handleAddFileInput = () => {
//     // Allow adding new file inputs with categories
//     setFiles([...files, null]); // Add a placeholder for the new file input
//     setCategories([...categories, '']); // Add a placeholder category
//   };

//   return (
//     <form className='flex flex-col space-y-4 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2' onSubmit={handleSubmit}>
//       {files.map((file, index) => (
//         <div key={index}>
//           <label className='text-sm bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' htmlFor='file'>Upload File</label>
//           <input
//             id='file'
//             type="file"
//             className='hidden'
//             multiple
//             onChange={(e) => handleFileChange(e, index)}
//           />
//           <select
//             value={categories[index] || ''}
//             onChange={(e) => handleCategoryChange(index, e)}
//             placeholder="Enter category"
//             required
//           >
//             <option value="">Select Category</option>
//             <option value="airTicket">Air Ticket</option>
//             <option value="passport">Passport</option>
//             <option value="pan">PAN</option>
//             <option value="freezeQuotation">Sales Sheet</option>
//             <option value="emailConf">Email Confirmation</option>
//           </select>
//           <a href={url(file)} target="_blank" rel="noopener noreferrer">
//             {file && file.name}
//           </a>
//           <button type='button' className='text-sm text-red-400 hover:text-red-700' onClick={() => handleRemoveFile(index)}>Remove</button>
//         </div>
//       ))}
//       <button className='text-sm bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' type="button" onClick={handleAddFileInput}>
//         Add Another File
//       </button>
//       <button className='text-sm bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' type="submit">Submit</button>
//     </form>
//   );
// };

// export default DocForm;
