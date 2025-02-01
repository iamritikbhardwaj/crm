import React, { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';
import { CustomTable } from './CustomTable'; // Assuming CustomTable is in the same folder

function ExcelToTable(fileUrl) {
  const [filesData, setFilesData] = useState([]); // Array to store data of multiple files
  const [selectedFileIndex, setSelectedFileIndex] = useState(null); // Index of the currently displayed file

  // Fetch the Excel file from the URL and convert it to data
  useEffect(() => {
    if (fileUrl) {
      fetchExcelData(fileUrl);
    }
  }, [fileUrl]);

  const fetchExcelData = async (url) => {
    try {
      const response = await fetch(url);
      const arrayBuffer = await response.arrayBuffer();
      const workbook = XLSX.read(arrayBuffer, { type: 'array' });
      console.log(workbook, "workbook");

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
        fileName: url.split('/').pop(), // Use the file name from the URL
        columns: headers,
        data: rows,
      };

      setFilesData([newFileData]);
      setSelectedFileIndex(0); // Automatically display the first (and only) file
    } catch (error) {
      console.error('Error fetching or parsing Excel file:', error);
    }
  };

  const handleRemoveFile = () => {
    setFilesData([]); // Clear filesData if you want to remove the displayed file
    setSelectedFileIndex(null);
  };

  return (
    <div className="p-4">
      <h1 className="text-lg font-bold mb-4">Sales Sheet Preview</h1>

      {filesData.length > 0 && (
        <div className="mb-4">
          <h2 className="text-md font-semibold mb-2">File:</h2>
          <span className="text-black">{filesData[0].fileName}</span>
          <button
            onClick={handleRemoveFile}
            className="ml-4 bg-red-500 text-white px-2 py-1 rounded hover:bg-red-700"
          >
            Remove
          </button>
        </div>
      )}

      {selectedFileIndex !== null && filesData[selectedFileIndex] && (
        <div>
          <h2 className="text-md font-semibold mb-2">
            Displaying: {filesData[selectedFileIndex].fileName}
          </h2>
          <div>
            <CustomTable
              className="overflow-x-auto"
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
