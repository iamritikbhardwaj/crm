import React, { useState, useCallback } from 'react';
import * as XLSX from 'xlsx';

const UniversalJsonProcessor = () => {
  const [jsonData, setJsonData] = useState(null);
  const [processedData, setProcessedData] = useState([]);
  const [isProcessed, setIsProcessed] = useState(false);
  const [error, setError] = useState('');
  const [processing, setProcessing] = useState(false);
  const [fileName, setFileName] = useState('');
  const [jsonInput, setJsonInput] = useState('');
  const [dataStructure, setDataStructure] = useState('');

  const flattenObject = (obj, prefix = '', maxDepth = 10, currentDepth = 0) => {
    const flattened = {};
    
    if (currentDepth >= maxDepth) {
      flattened[prefix || 'data'] = JSON.stringify(obj);
      return flattened;
    }
    
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        const newKey = prefix ? `${prefix}.${key}` : key;
        
        if (obj[key] === null || obj[key] === undefined) {
          flattened[newKey] = null;
        } else if (Array.isArray(obj[key])) {
          // Handle arrays
          if (obj[key].length === 0) {
            flattened[newKey] = '[]';
          } else if (typeof obj[key][0] === 'object') {
            // Array of objects - don't flatten here, handle separately
            flattened[newKey] = `[Array of ${obj[key].length} objects]`;
          } else {
            // Array of primitives
            flattened[newKey] = obj[key].join(', ');
          }
        } else if (typeof obj[key] === 'object') {
          Object.assign(flattened, flattenObject(obj[key], newKey, maxDepth, currentDepth + 1));
        } else {
          flattened[newKey] = obj[key];
        }
      }
    }
    
    return flattened;
  };

  const findArraysInObject = (obj, path = '') => {
    const arrays = [];
    
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        const currentPath = path ? `${path}.${key}` : key;
        
        if (Array.isArray(obj[key]) && obj[key].length > 0 && typeof obj[key][0] === 'object') {
          arrays.push({
            path: currentPath,
            data: obj[key],
            length: obj[key].length
          });
        } else if (typeof obj[key] === 'object' && obj[key] !== null) {
          arrays.push(...findArraysInObject(obj[key], currentPath));
        }
      }
    }
    
    return arrays;
  };

  const extractAllData = (obj, path = '', allData = {}) => {
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        const currentPath = path ? `${path}.${key}` : key;
        const value = obj[key];
        
        if (Array.isArray(value)) {
          if (value.length > 0 && typeof value[0] === 'object') {
            // Array of objects - store as separate dataset
            allData[currentPath] = {
              type: 'array',
              data: value.map(item => flattenObject(item)),
              length: value.length,
              columns: value.length > 0 ? Object.keys(flattenObject(value[0])).length : 0
            };
          } else {
            // Array of primitives - store as single field
            if (!allData['_individual_fields']) {
              allData['_individual_fields'] = { type: 'fields', data: {}, length: 0, columns: 0 };
            }
            allData['_individual_fields'].data[currentPath] = value.join(', ');
          }
        } else if (typeof value === 'object' && value !== null) {
          // Nested object - recurse but also capture as individual fields
          extractAllData(value, currentPath, allData);
          
          // Also store the flattened version of this object
          const flattenedObj = flattenObject(value);
          if (Object.keys(flattenedObj).length > 0) {
            allData[currentPath] = {
              type: 'object',
              data: [flattenedObj],
              length: 1,
              columns: Object.keys(flattenedObj).length
            };
          }
        } else {
          // Primitive value - store in individual fields
          if (!allData['_individual_fields']) {
            allData['_individual_fields'] = { type: 'fields', data: {}, length: 0, columns: 0 };
          }
          allData['_individual_fields'].data[currentPath] = value;
        }
      }
    }
    
    // Convert individual fields to proper format
    if (allData['_individual_fields'] && Object.keys(allData['_individual_fields'].data).length > 0) {
      const fieldsData = allData['_individual_fields'].data;
      allData['_individual_fields'] = {
        type: 'fields',
        data: [fieldsData],
        length: 1,
        columns: Object.keys(fieldsData).length
      };
    }
    
    return allData;
  };

  const processJsonData = (data) => {
    setProcessing(true);
    setError('');
    
    try {
      // Extract ALL data - arrays, objects, and individual fields
      const allProcessedData = extractAllData(data);
      
      let structure = '';
      const dataTypes = {
        arrays: Object.keys(allProcessedData).filter(key => allProcessedData[key].type === 'array'),
        objects: Object.keys(allProcessedData).filter(key => allProcessedData[key].type === 'object'),
        fields: Object.keys(allProcessedData).filter(key => allProcessedData[key].type === 'fields')
      };
      
      const parts = [];
      if (dataTypes.arrays.length > 0) {
        parts.push(`${dataTypes.arrays.length} array(s): ${dataTypes.arrays.map(key => `${key} (${allProcessedData[key].length} items)`).join(', ')}`);
      }
      if (dataTypes.objects.length > 0) {
        parts.push(`${dataTypes.objects.length} nested object(s): ${dataTypes.objects.join(', ')}`);
      }
      if (dataTypes.fields.length > 0) {
        parts.push(`${allProcessedData['_individual_fields']?.columns || 0} individual field(s)`);
      }
      
      structure = `Found: ${parts.join('; ')}.`;
      
      setProcessedData(allProcessedData);
      setDataStructure(structure);
      setIsProcessed(true);
      
    } catch (err) {
      setError(`Processing error: ${err.message}`);
    } finally {
      setProcessing(false);
    }
  };

  const handleFileUpload = useCallback((event) => {
    const file = event.target.files[0];
    if (!file) return;
    
    setFileName(file.name);
    setError('');
    
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const jsonData = JSON.parse(e.target.result);
        setJsonData(jsonData);
        processJsonData(jsonData);
      } catch (err) {
        setError(`Invalid JSON file: ${err.message}`);
      }
    };
    reader.readAsText(file);
  }, []);

  const handleTextInput = () => {
    if (!jsonInput.trim()) {
      setError('Please enter some JSON data');
      return;
    }
    
    setError('');
    try {
      const data = JSON.parse(jsonInput);
      setJsonData(data);
      setFileName('Manual Input');
      processJsonData(data);
    } catch (err) {
      setError(`Invalid JSON: ${err.message}`);
    }
  };

  const downloadExcel = () => {
    if (!processedData || Object.keys(processedData).length === 0) return;
    
    const wb = XLSX.utils.book_new();
    
    // Add each array as a separate sheet
    Object.keys(processedData).forEach(sheetName => {
      const data = processedData[sheetName].data;
      if (data && data.length > 0) {
        const ws = XLSX.utils.json_to_sheet(data);
        const cleanSheetName = sheetName.replace(/[^\w\s]/g, '_').slice(0, 31);
        XLSX.utils.book_append_sheet(wb, ws, cleanSheetName);
      }
    });
    
    // Add summary sheet
    const summaryData = [
      { Info: 'File Name', Value: fileName || 'Manual Input' },
      { Info: 'Total Arrays Found', Value: Object.keys(processedData).length },
      { Info: 'Data Structure', Value: dataStructure },
      ...Object.keys(processedData).map(key => ({
        Info: `${key} Records`,
        Value: processedData[key].length
      }))
    ];
    const summaryWs = XLSX.utils.json_to_sheet(summaryData);
    XLSX.utils.book_append_sheet(wb, summaryWs, "Summary");
    
    const downloadFileName = fileName ? fileName.replace('.json', '') + '_complete.xlsx' : 'json_complete.xlsx';
    XLSX.writeFile(wb, downloadFileName);
  };

  const downloadCSV = () => {
    if (!processedData || Object.keys(processedData).length === 0) return;
    
    // Create a zip-like download by combining all arrays
    let combinedData = [];
    
    Object.keys(processedData).forEach(arrayName => {
      const data = processedData[arrayName].data;
      data.forEach((row, index) => {
        combinedData.push({
          _source_array: arrayName,
          _record_index: index + 1,
          ...row
        });
      });
    });
    
    const ws = XLSX.utils.json_to_sheet(combinedData);
    const csv = XLSX.utils.sheet_to_csv(ws);
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    const downloadFileName = fileName ? fileName.replace('.json', '') + '_complete.csv' : 'json_complete.csv';
    a.download = downloadFileName;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const getDataStats = () => {
    if (!processedData || Object.keys(processedData).length === 0) return {};
    
    let totalRecords = 0;
    let totalColumns = 0;
    let nullValues = 0;
    
    Object.keys(processedData).forEach(key => {
      const dataset = processedData[key];
      totalRecords += dataset.length;
      totalColumns += dataset.columns;
      
      // Count null values in this dataset
      dataset.data.forEach(row => {
        if (typeof row === 'object') {
          nullValues += Object.values(row).filter(value => 
            value === null || value === undefined || value === ''
          ).length;
        }
      });
    });
    
    return { 
      totalRecords, 
      totalColumns, 
      nullValues,
      totalDatasets: Object.keys(processedData).length
    };
  };

  const stats = getDataStats();

  const clearData = () => {
    setJsonData(null);
    setProcessedData([]);
    setIsProcessed(false);
    setError('');
    setFileName('');
    setJsonInput('');
    setDataStructure('');
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Universal JSON File Processor</h1>
      <p className="text-center text-gray-600 mb-8">
        Upload any JSON file or paste JSON data to automatically convert it to Excel/CSV format
      </p>
      
      {/* Input Section */}
      <div className="mb-8 bg-gray-50 p-6 rounded-lg">
        <div className="grid md:grid-cols-2 gap-6">
          {/* File Upload */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Upload JSON File</h3>
            <input
              type="file"
              accept=".json"
              onChange={handleFileUpload}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
            {fileName && (
              <p className="text-sm text-green-600 mt-2">📁 {fileName}</p>
            )}
          </div>
          
          {/* Text Input */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Or Paste JSON Data</h3>
            <textarea
              value={jsonInput}
              onChange={(e) => setJsonInput(e.target.value)}
              placeholder='Paste your JSON here, e.g., {"name": "John", "items": [...]}'
              className="w-full h-24 p-3 border rounded-lg resize-none text-sm"
            />
            <button
              onClick={handleTextInput}
              className="mt-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm transition-colors"
            >
              Process JSON
            </button>
          </div>
        </div>
        
        {/* Clear Button */}
        {(isProcessed || error) && (
          <div className="mt-4 text-center">
            <button
              onClick={clearData}
              className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg text-sm transition-colors"
            >
              Clear All Data
            </button>
          </div>
        )}
      </div>

      {/* Error Display */}
      {error && (
        <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-700">❌ {error}</p>
        </div>
      )}

      {/* Processing Indicator */}
      {processing && (
        <div className="mb-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-blue-700">🔄 Processing JSON data...</p>
        </div>
      )}

      {/* Results Section */}
      {isProcessed && !processing && (
        <>
          {/* Data Structure Info */}
          {dataStructure && (
            <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4">
              <h3 className="font-semibold text-green-800 mb-2">Data Structure Detected:</h3>
              <p className="text-green-700 text-sm">{dataStructure}</p>
            </div>
          )}
          
          {/* Statistics */}
          <div className="mb-6 bg-blue-50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Complete Data Extraction Results</h2>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{stats.totalDatasets}</div>
                <div className="text-sm text-gray-600">Data Sources</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{stats.totalRecords}</div>
                <div className="text-sm text-gray-600">Total Records</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">{stats.totalColumns}</div>
                <div className="text-sm text-gray-600">Total Fields</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">{stats.nullValues}</div>
                <div className="text-sm text-gray-600">Null Values</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600">
                  {stats.totalRecords > 0 ? ((stats.totalRecords * stats.totalColumns - stats.nullValues) / (stats.totalRecords * stats.totalColumns) * 100).toFixed(1) : 0}%
                </div>
                <div className="text-sm text-gray-600">Completeness</div>
              </div>
            </div>
          </div>

          {/* Download Buttons */}
          <div className="mb-6 flex gap-4 justify-center">
            <button
              onClick={downloadExcel}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center gap-2"
            >
              📊 Download Complete Excel (All Sheets)
            </button>
            <button
              onClick={downloadCSV}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center gap-2"
            >
              📄 Download Combined CSV
            </button>
          </div>

          {/* Individual Data Visualizations */}
          <div className="space-y-8">
            <h2 className="text-2xl font-semibold mb-4">Complete Data Breakdown</h2>
            
            {Object.keys(processedData).map(datasetName => {
              const dataset = processedData[datasetName];
              const displayName = datasetName === '_individual_fields' ? '🏷️ Individual Fields & Properties' : 
                                 dataset.type === 'array' ? `📋 Array: ${datasetName}` :
                                 dataset.type === 'object' ? `📦 Object: ${datasetName}` :
                                 `📄 ${datasetName}`;
              
              return (
                <div key={datasetName} className="border rounded-lg bg-white shadow-sm">
                  <div className="bg-gray-50 px-6 py-4 border-b rounded-t-lg">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-semibold">{displayName}</h3>
                      <div className="flex gap-4 text-sm text-gray-600">
                        <span>📊 {dataset.length} record(s)</span>
                        <span>📋 {dataset.columns} field(s)</span>
                        <span className="capitalize">🏷️ {dataset.type}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <div className="overflow-x-auto">
                      <div className="max-h-64 overflow-y-auto border rounded">
                        <table className="min-w-full border-collapse">
                          <thead className="bg-gray-50 sticky top-0">
                            <tr>
                              <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase border-b">#</th>
                              {dataset.data.length > 0 && Object.keys(dataset.data[0]).map((key) => (
                                <th key={key} className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase border-b">
                                  {key}
                                </th>
                              ))}
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-200">
                            {dataset.data.slice(0, 10).map((row, index) => (
                              <tr key={index} className="hover:bg-gray-50">
                                <td className="px-3 py-2 text-sm text-gray-500 border-b font-medium">{index + 1}</td>
                                {Object.values(row).map((value, cellIndex) => (
                                  <td key={cellIndex} className="px-3 py-2 text-sm text-gray-900 border-b max-w-xs">
                                    <div className="truncate" title={String(value || '')}>
                                      {value === null || value === undefined ? (
                                        <span className="text-gray-400 italic">null</span>
                                      ) : (
                                        String(value)
                                      )}
                                    </div>
                                  </td>
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                      {dataset.data.length > 10 && (
                        <p className="text-xs text-gray-600 mt-2">
                          Showing first 10 of {dataset.data.length} records. Download files for complete data.
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}

      {/* Instructions */}
      <div className="mt-8 bg-gray-50 p-6 rounded-lg">
        <h3 className="text-lg font-semibold mb-3">How It Works</h3>
        <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-700">
          <div>
            <h4 className="font-medium mb-2">✅ Supported JSON Formats:</h4>
            <ul className="list-disc list-inside space-y-1">
              <li>Single objects: <code>{`{"name": "John"}`}</code></li>
              <li>Arrays of objects: <code>{`[{"id": 1}, {"id": 2}]`}</code></li>
              <li>Nested objects with arrays</li>
              <li>Complex nested structures</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-2">🔧 Processing Features:</h4>
            <ul className="list-disc list-inside space-y-1">
              <li>Automatic structure detection</li>
              <li>Nested object flattening</li>
              <li>Array handling</li>
              <li>Null value preservation</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UniversalJsonProcessor;