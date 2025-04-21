import React, { useState } from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { fetchTrips } from "../apiCalls/fetchData.js";

const JsonToExcel = () => {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    try {
      setIsDownloading(true);
      
      // Fetch trip data from API
      let data = await fetchTrips();
      
      // Validate data
      if (!data || !Array.isArray(data) || data.length === 0) {
        throw new Error("Invalid or empty data received from API");
      }

      // Convert string numbers to actual numbers
      data = data.map(row => {
        const newRow = {};
        Object.keys(row).forEach(key => {
          // Check if the value is a string that can be converted to a number
          if (typeof row[key] === 'string' && !isNaN(Number(row[key])) && row[key].trim() !== '') {
            newRow[key] = Number(row[key]);
          } else {
            newRow[key] = row[key];
          }
        });
        return newRow;
      });

      // Create worksheet from converted JSON data
      const worksheet = XLSX.utils.json_to_sheet(data);
      
      // Determine the last row index
      const lastRow = data.length + 1;
      
      // Identify numeric columns to add SUM formulas
      const sampleRow = data[0];
      const numericColumns = [];
      
      // Find columns with numeric values
      Object.keys(sampleRow).forEach((key, colIndex) => {
        if (typeof sampleRow[key] === 'number') {
          // Get column letter (A, B, C, etc.)
          const colLetter = XLSX.utils.encode_col(colIndex);
          numericColumns.push({ colLetter, key });
        }
      });
      
      // Add a "Total" label in column A of the summary row
      worksheet[`A${lastRow + 1}`] = { t: 's', v: 'TOTAL' };
      
      // Add SUM formulas for each numeric column
      numericColumns.forEach(({ colLetter, key }) => {
        // Create Excel SUM formula (e.g., =SUM(C2:C10))
        const formula = `SUM(${colLetter}2:${colLetter}${lastRow})`;
        
        // Add cell with formula
        worksheet[`${colLetter}${lastRow + 1}`] = { t: 'n', f: formula };
      });
      
      // Set range to include our new summary row
      const range = XLSX.utils.decode_range(worksheet['!ref']);
      range.e.r = lastRow + 1;  // Extend the range to include summary row
      worksheet['!ref'] = XLSX.utils.encode_range(range);

      // Create workbook and append worksheet
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Trip Data");
      
      // Generate buffer with formulas enabled
      const excelBuffer = XLSX.write(workbook, { 
        type: "array", 
        bookType: "xlsx",
        cellDates: true,
        cellNF: true,
        cellFormula: true
      });
      
      // Create blob and download
      const blob = new Blob([excelBuffer], { 
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" 
      });
      
      saveAs(blob, "Trip data.xlsx");
    } catch (error) {
      console.error("Failed to generate Excel file:", error);
      alert("Failed to download Excel file. Please try again.");
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <button 
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" 
      onClick={handleDownload} 
      disabled={isDownloading}
    >
      {isDownloading ? "Downloading..." : "Download Excel"}
    </button>
  );
};

export default JsonToExcel;