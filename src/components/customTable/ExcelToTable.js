import { set } from 'mongoose';
import React, { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';

let transferPrice = 0;
function ExcelToTable({url, setPrice}) {
  console.log(url, "url");
  const [filesData, setFilesData] = useState([]); // Array to store data of multiple files
  const [selectedFileIndex, setSelectedFileIndex] = useState(null); // Index of the currently displayed file
  // Fetch the Excel file from the URL and convert it to data
  useEffect(() => {
    if (new String(url).includes('http')) {
      fetchExcelData(url);
    }
  }, [url]);

  const fetchExcelData = async (url) => {
    try {
      const response = await fetch(url);
      const arrayBuffer = await response.arrayBuffer();
      const workbook = XLSX.read(arrayBuffer, { type: 'array' });
  
      const firstSheetName = workbook.SheetNames[0]; // Get the first sheet name
      const worksheet = workbook.Sheets[firstSheetName];
  
      // Convert sheet to JSON (array format, keeping all data intact)
      const sheetData = XLSX.utils.sheet_to_json(worksheet, { header: 1, raw: true });
      console.log(sheetData, "Sheet Data")

      if (!sheetData || sheetData.length === 0) {
        console.error('Empty sheet or unreadable data');
        return;
      }
  
      console.log(sheetData, "Extracted Sheet Data");
  
      // Extract headers (row 0), ensuring no null headers
      const headers = sheetData[0].map((header, index) => ({
        Header: header ? String(header) : `Column ${index + 1}`,
        accessor: header ? String(header).toLowerCase().replace(/\s+/g, '_') : `column_${index}`,
      }));
  
      // Extract data (from row 1 onward)
      const rows = sheetData.slice(1).map((row) =>
        headers.reduce((acc, column, index) => {
          acc[column.accessor] = row[index] !== undefined ? row[index] : ''; // Handle empty cells
          return acc;
        }, {})
      );
  
      setFilesData([{ fileName: <a href={url}>{url.split('/').pop()}</a>, columns: headers, data: rows }]);
      setSelectedFileIndex(0);
  
    } catch (error) {
      console.error('Error fetching or parsing Excel file:', error);
    }
  };
  const ExcelLikeTable = ({ data, columns }) => {
    return (
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto text-sm border-collapse border">
          <thead className="bg-gray-200 border-b">
            <tr>
              {columns.map((column, index) => (
                <th key={index} className="px-2 py-1 text-center font-medium text-gray-700 border">
                  {column.Header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? (
              data.map((row, rowIndex) => (
                <tr key={rowIndex} className="border-b">
                  {columns.map((column, colIndex) => {
                    if(data.length - 1 === rowIndex && columns.length - 2 === colIndex){
                      setPrice(row[column.accessor]);
                    }
                    return(
                    <td key={colIndex} className={`px-4 py-2 border ${data.length - 1 === rowIndex ? 'font-extrabold' : ''}`}> 
                    {/* {row[column.accessor] ? row[column.accessor] : ' '} */}
                      {row[column.accessor] ? (new String(row[column.accessor]).includes('.') ? new String(row[column.accessor]).split('.')[0] + '.' + new String(row[column.accessor]).split('.')[1].slice(0, 2) : row[column.accessor] ) : ' '}
                      </td>
                  )})}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length} className="px-4 py-2 text-center text-gray-500">
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className="p-4">
      <h1 className="text-lg font-bold mb-4">Sales Sheet Preview</h1>

      {selectedFileIndex !== null && filesData[selectedFileIndex] && (
        <div>
          <h2 className="text-md font-semibold mb-2">
            Displaying: {filesData[selectedFileIndex].fileName}
          </h2>
          <div>
            <ExcelLikeTable
              data={filesData[selectedFileIndex].data}
              columns={filesData[selectedFileIndex].columns}
            />
          </div>
        </div>
      )}
    </div>
  );
}
export {transferPrice};
export default ExcelToTable;