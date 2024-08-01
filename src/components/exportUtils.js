import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';

// Function to export data to CSV
export const exportToCSV = (data) => {
  const csvRows = [];
  const headers = Object.keys(data[0]);

  csvRows.push(headers.join(','));

  for (const row of data) {
    csvRows.push(headers.map(header => JSON.stringify(row[header], (key, value) => value === null ? '' : value)).join(','));
  }

  const csvData = csvRows.join('\n');
  const blob = new Blob([csvData], { type: 'text/csv' });
  saveAs(blob, 'personnel-data.csv');
};

// Function to export data to Excel
export const exportToExcel = (data) => {
  const ws = XLSX.utils.json_to_sheet(data);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Personnel Data');
  
  const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'binary' });
  const blob = new Blob([s2ab(wbout)], { type: 'application/octet-stream' });
  saveAs(blob, 'personnel-data.xlsx');
};

// Helper function to convert string to array buffer
function s2ab(s) {
  const buf = new ArrayBuffer(s.length);
  const view = new Uint8Array(buf);
  for (let i = 0; i < s.length; i++) {
    view[i] = s.charCodeAt(i) & 0xFF;
  }
  return buf;
}





