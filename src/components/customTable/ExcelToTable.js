import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import { CustomTable } from './CustomTable'; // Assuming CustomTable is in the same folder

function ExcelToTable() {
  const [filesData, setFilesData] = useState([]); // Array to store data of multiple files
  const [selectedFileIndex, setSelectedFileIndex] = useState(null); // Index of the currently displayed file

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = (e) => {
      const binaryStr = e.target.result;
      const workbook = XLSX.read(binaryStr, { type: 'binary' });

      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const sheetData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

      const headers = sheetData[0].map((header, index) => ({
        Header: header ? String(header) : `Column ${index + 1}`, // Convert to string and handle nulls
        accessor: header
          ? String(header).toLowerCase().replace(/\s+/g, '_')
          : `column_${index}`, // Unique keys for null headers
      }));

      const rows = sheetData.slice(1).map((row) =>
        row.reduce((acc, cell, index) => {
          acc[headers[index].accessor] = cell;
          return acc;
        }, {})
      );

      const newFileData = {
        fileName: file.name,
        columns: headers,
        data: rows,
      };

      setFilesData((prev) => [...prev, newFileData]);
      setSelectedFileIndex(filesData.length); // Automatically display the most recent file
    };

    reader.readAsBinaryString(file);
  };

  const handleRemoveFile = (index) => {
    setFilesData((prev) => prev.filter((_, i) => i !== index));
    if (index === selectedFileIndex) {
      setSelectedFileIndex(null); // Clear selection if the removed file was selected
    } else if (index < selectedFileIndex) {
      setSelectedFileIndex((prev) => prev - 1); // Adjust selected index if necessary
    }
  };

  const handleSelectFile = (index) => {
    setSelectedFileIndex(index);
  };

  return (
    <div className="p-4">
      <h1 className="text-lg font-bold mb-4">Upload Freeze Quotation</h1>
      <input
        type="file"
        accept=".xlsx, .xls"
        onChange={handleFileUpload}
        className="mb-4"
      />
      {filesData.length > 0 && (
        <div className="mb-4">
          <h2 className="text-md font-semibold mb-2">Uploaded Files:</h2>
          <ul className="list-disc ml-6">
            {filesData.map((file, index) => (
              <li key={index} className="flex items-center mb-2">
                <span
                  className={`cursor-pointer ${
                    index === selectedFileIndex
                      ? 'font-bold text-blue-600'
                      : 'text-black'
                  }`}
                  onClick={() => handleSelectFile(index)}
                >
                  {file.fileName}
                </span>
                <button
                  onClick={() => handleRemoveFile(index)}
                  className="ml-4 bg-red-500 text-white px-2 py-1 rounded hover:bg-red-700"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
      {selectedFileIndex !== null && filesData[selectedFileIndex] && (
        <div>
          <h2 className="text-md font-semibold mb-2">
            Displaying: {filesData[selectedFileIndex].fileName}
          </h2>
          <div >
          <CustomTable
          className='overflow-x-auto'
            dataa={filesData[selectedFileIndex].data}
            columnss={filesData[selectedFileIndex].columns}
            button={false}
            path="/"
            size="text-sm"
            hideFilter={true}
          />
          </div>
        </div>
      )}
    </div>
  );
}

export default ExcelToTable;