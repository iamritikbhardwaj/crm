import React, { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';

function ExcelToTable({url, setPrice}) {
  console.log(url, "url");
  const [filesData, setFilesData] = useState([]); // Array to store data of multiple files
  const [selectedFileIndex, setSelectedFileIndex] = useState(null); // Index of the currently displayed file
  
  // Fetch the Excel file from the URL and convert it to data
  useEffect(() => {
    // Reset data when URL changes
    setFilesData([]);
    setSelectedFileIndex(null);
  
    if (new String(url).includes('http')) {
      fetchExcelData(url);
    }
  }, [url]);
  
  const fetchExcelData = async (url) => {
    try {
      // Add cache busting parameter to URL
      const cacheBustUrl = new URL(url);
      cacheBustUrl.searchParams.append('_t', new Date().getTime());
      
      // Use cache: 'no-store' to bypass browser cache
      const response = await fetch(cacheBustUrl.toString(), {
        cache: 'no-store',
        headers: {
          'Pragma': 'no-cache',
          'Cache-Control': 'no-cache'
        }
      });
      
      const arrayBuffer = await response.arrayBuffer();
      const workbook = XLSX.read(arrayBuffer, { type: 'array' });

      const firstSheetName = workbook.SheetNames[0]; // Get the first sheet name
      const worksheet = workbook.Sheets[firstSheetName];
  
      // Convert sheet to JSON (array format, keeping all data intact)
      const sheetData = XLSX.utils.sheet_to_json(worksheet, { header: 1, raw: false });
      console.log(sheetData, "Sheet Data");

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
  
      // Filter out completely empty rows (rows with all cells empty)
      const filteredData = sheetData.slice(1).filter(row => {
        return row.some(cell => cell !== undefined && cell !== null && cell !== '');
      });
      
      // Extract data from filtered rows
      const rows = filteredData.map((row) =>
        headers.reduce((acc, column, index) => {
          acc[column.accessor] = row[index] !== undefined ? row[index] : ''; // Handle empty cells
          return acc;
        }, {})
      );
  
      // Update displayed filename without the cache busting parameter
      const displayUrl = url.split('?')[0]; // Remove any existing query parameters
      const filename = displayUrl.split('/').pop();
      
      setFilesData([{ 
        fileName: <a className='text-blue-500' href={url}>Download Freeze Quotation: {filename}</a>, 
        columns: headers, 
        data: rows 
      }]);
      setSelectedFileIndex(0);
  
    } catch (error) {
      console.error('Error fetching or parsing Excel file:', error);
    }
  };
  
  // Find the last non-empty row for price calculation
  const ExcelLikeTable = ({ data, columns }) => {
    // Ensure we set the price from the actual last row with data
    useEffect(() => {
      if (data.length > 0) {
        // Find the last non-empty row (from bottom to top)
        for (let i = data.length - 1; i >= 0; i--) {
          // Check if this is a total/summary row by examining content
          const row = data[i];
          const priceColumnIndex = columns.length - 2;
          
          if (priceColumnIndex >= 0 && row[columns[priceColumnIndex].accessor]) {
            setPrice(row[columns[priceColumnIndex].accessor]);
            break;
          }
        }
      }
    }, [data, columns, setPrice]);

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
                    // Format cell value for display
                    const cellValue = row[column.accessor];
                    const formattedValue = cellValue ? 
                      (String(cellValue).includes('.') ? 
                        String(cellValue).split('.')[0] + '.' + String(cellValue).split('.')[1].slice(0, 2) : 
                        cellValue) : 
                      ' ';
                    
                    // Determine total row styling
                    const isLikelyTotalRow = rowIndex === data.length - 1;
                    
                    return (
                      <td 
                        key={colIndex} 
                        className={`px-4 py-2 border ${isLikelyTotalRow ? 'font-extrabold' : ''}`}
                      >
                        {formattedValue}
                      </td>
                    );
                  })}
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

export default ExcelToTable;