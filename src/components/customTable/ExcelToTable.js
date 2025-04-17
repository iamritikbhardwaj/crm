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
          'Cache-Control': 'no-cache',
          'Expires': '0'
        }
      });
      
      const arrayBuffer = await response.arrayBuffer();
      const workbook = XLSX.read(arrayBuffer, { type: 'array' });

      const firstSheetName = workbook.SheetNames[0]; // Get the first sheet name
      const worksheet = workbook.Sheets[firstSheetName];
      
      // IMPORTANT: Get direct access to the worksheet
      // This allows us to access cells directly using their addresses
      
      // Convert sheet to JSON with raw: false as requested
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
  
      // CRITICAL FIX: Direct access to the price cell using its address in the worksheet
      try {
        // Find the cell address for the price (second-to-last column of the last row)
        if (filteredData.length > 0) {
          const lastRowIndex = filteredData.length - 1; // Last row in filtered data
          const priceColumnIndex = headers.length - 2; // Second to last column
          
          // Access the raw value directly from the sheet data
          const priceValue = filteredData[lastRowIndex][priceColumnIndex];
          console.log("Raw price cell value:", priceValue);
          
          // Important: Because we're getting the price directly from the sheet data as a string,
          // we need to make sure we don't process it any further
          if (priceValue && typeof priceValue === 'string') {
            // Keep the full string value without any parsing/splitting
            const fullPrice = priceValue;
            console.log("Setting full price:", fullPrice);
            
            // Ensure we're passing the entire string without modifications
            setPrice(fullPrice);
          }
        }
      } catch (err) {
        console.error("Error extracting price:", err);
      }
    } catch (error) {
      console.error('Error fetching or parsing Excel file:', error);
    }
  };
  
  // Excel-like table with improved styling
  const ExcelLikeTable = ({ data, columns }) => {
    return (
      <div className="overflow-x-auto border border-gray-300 rounded shadow">
        <table className="min-w-full table-auto text-sm border-collapse">
          <thead>
            <tr className="bg-gray-100 border-b border-gray-300">
              {columns.map((column, index) => (
                <th 
                  key={index} 
                  className="px-4 py-2 text-left font-semibold text-gray-700 border-r border-gray-300 last:border-r-0"
                  style={{ 
                    backgroundColor: '#f3f4f6', 
                    position: 'sticky', 
                    top: 0,
                    boxShadow: '0 2px 2px -1px rgba(0, 0, 0, 0.1)'
                  }}
                >
                  {column.Header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.length > 0 ? (
              data.map((row, rowIndex) => {
                // Determine if this is likely a header or total row
                const isLastRow = rowIndex === data.length - 1;
                
                // Alternate row colors for better readability
                const rowColor = rowIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50';
                
                return (
                  <tr 
                    key={rowIndex} 
                    className={`${rowColor} hover:bg-blue-50 transition-colors ${isLastRow ? 'font-semibold' : ''}`}
                  >
                    {columns.map((column, colIndex) => {
                      // Get cell value
                      const cellValue = row[column.accessor];
                      
                      // Determine if this looks like a currency value
                      const isCurrency = typeof cellValue === 'string' && 
                        (cellValue.includes('$') || 
                         cellValue.includes('USD') || 
                         cellValue.includes('EUR') || 
                         cellValue.includes('£') || 
                         cellValue.includes('€'));
                      
                      // Determine if this looks like a number
                      const isNumber = !isNaN(parseFloat(cellValue)) && isFinite(cellValue);
                      
                      // Apply appropriate alignment and formatting
                      const cellAlignment = isCurrency || isNumber ? 'text-right' : 'text-left';
                      
                      // Additional styling for cells based on content or position
                      let cellStyle = {};
                      if (isLastRow && colIndex === columns.length - 2) {
                        console.log("Price cell value in table:", cellValue);
                        // Highlight the price cell
                        cellStyle = { 
                          backgroundColor: '#f0f9ff', 
                          fontWeight: 'bold',
                          color: '#0369a1'
                        };
                      }
                      
                      return (
                        <td 
                          key={colIndex} 
                          className={`px-4 py-2 border-r border-gray-200 last:border-r-0 ${cellAlignment} ${isLastRow ? 'font-semibold' : ''}`}
                          style={cellStyle}
                        >
                          {cellValue !== undefined && cellValue !== null && cellValue !== '' ? cellValue : ' '}
                        </td>
                      );
                    })}
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={columns.length} className="px-4 py-3 text-center text-gray-500 italic">
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
      <h1 className="text-xl font-bold mb-4 text-gray-800">Excel Sales Sheet Preview</h1>

      {selectedFileIndex !== null && filesData[selectedFileIndex] && (
        <div className="bg-white rounded-lg shadow p-4">
          <h2 className="text-md font-semibold mb-3 text-gray-700">
            {filesData[selectedFileIndex].fileName}
          </h2>
          <div className="mt-2">
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