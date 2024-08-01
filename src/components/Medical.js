import React, { useState, useEffect, useCallback } from 'react';
import {
  Tabs, Tab, Box, Typography, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, Button, TextField, IconButton, TablePagination,
  Snackbar, Alert, Dialog, DialogTitle, DialogContent, DialogActions, 
  MenuItem, CircularProgress, FormControl, InputLabel, Select, FormHelperText,
  Tooltip, Divider
} from '@mui/material';
import { Search, Edit, Delete, Add, Print } from '@mui/icons-material';
import jsPDF from 'jspdf';
import * as XLSX from 'xlsx';
import './Medical.css';

const initialMedicalRecordsData = [
  { id: 1, name: 'Amit Kumar', age: 45, bloodGroup: 'B+', condition: 'Diabetic', height: '5.7', weight: '85', allergies: 'None', medications: 'Metformin', medicalHistory: 'Hypertension', familyHistory: 'Heart Disease', lastVisit: '2023-07-15', emergencyContact: 'Sunita Kumar', insuranceInfo: 'Active', primaryCarePhysician: 'Dr. Rajesh Verma', immunizationRecords: 'Up to date', recentLabResults: 'High Blood Sugar' },
  { id: 2, name: 'Priya Singh', age: 29, bloodGroup: 'A-', condition: 'Healthy', height: '5.4', weight: '60', allergies: 'Peanuts', medications: 'None', medicalHistory: 'Asthma', familyHistory: 'None', lastVisit: '2023-07-18', emergencyContact: 'Ravi Singh', insuranceInfo: 'Active', primaryCarePhysician: 'Dr. Neha Gupta', immunizationRecords: 'Up to date', recentLabResults: 'Normal' },
  { id: 3, name: 'Rahul Sharma', age: 52, bloodGroup: 'AB+', condition: 'Heart Disease', height: '5.6', weight: '75', allergies: 'Penicillin', medications: 'Aspirin', medicalHistory: 'High Cholesterol', familyHistory: 'Diabetes', lastVisit: '2023-07-10', emergencyContact: 'Anita Sharma', insuranceInfo: 'Expired', primaryCarePhysician: 'Dr. Suresh Menon', immunizationRecords: 'Up to date', recentLabResults: 'Elevated Cholesterol' },
  { id: 4, name: 'Anjali Patel', age: 34, bloodGroup: 'O-', condition: 'Healthy', height: '5.5', weight: '65', allergies: 'None', medications: 'None', medicalHistory: 'None', familyHistory: 'None', lastVisit: '2023-07-20', emergencyContact: 'Vikas Patel', insuranceInfo: 'Active', primaryCarePhysician: 'Dr. Lakshmi Nair', immunizationRecords: 'Up to date', recentLabResults: 'Normal' },
  { id: 5, name: 'Rohit Joshi', age: 40, bloodGroup: 'B-', condition: 'Hypertension', height: '5.8', weight: '78', allergies: 'Sulfa Drugs', medications: 'Amlodipine', medicalHistory: 'Kidney Stones', familyHistory: 'None', lastVisit: '2023-07-17', emergencyContact: 'Seema Joshi', insuranceInfo: 'Active', primaryCarePhysician: 'Dr. Anand Deshmukh', immunizationRecords: 'Up to date', recentLabResults: 'High Blood Pressure' },
  { id: 6, name: 'Sonal Mehta', age: 38, bloodGroup: 'A+', condition: 'Healthy', height: '5.6', weight: '62', allergies: 'None', medications: 'None', medicalHistory: 'None', familyHistory: 'None', lastVisit: '2023-07-22', emergencyContact: 'Arun Mehta', insuranceInfo: 'Active', primaryCarePhysician: 'Dr. Kavita Rao', immunizationRecords: 'Up to date', recentLabResults: 'Normal' },
  { id: 7, name: 'Vikram Reddy', age: 55, bloodGroup: 'O+', condition: 'Arthritis', height: '5.9', weight: '80', allergies: 'None', medications: 'Ibuprofen', medicalHistory: 'Gout', familyHistory: 'Hypertension', lastVisit: '2023-07-13', emergencyContact: 'Rama Reddy', insuranceInfo: 'Expired', primaryCarePhysician: 'Dr. Sudhir Reddy', immunizationRecords: 'Up to date', recentLabResults: 'Normal' },
  { id: 8, name: 'Meena Rao', age: 31, bloodGroup: 'AB-', condition: 'Healthy', height: '5.3', weight: '55', allergies: 'None', medications: 'None', medicalHistory: 'None', familyHistory: 'None', lastVisit: '2023-07-19', emergencyContact: 'Amit Rao', insuranceInfo: 'Active', primaryCarePhysician: 'Dr. Anjali Gupta', immunizationRecords: 'Up to date', recentLabResults: 'Normal' },
  { id: 9, name: 'Suresh Iyer', age: 60, bloodGroup: 'B+', condition: 'Diabetic', height: '5.7', weight: '82', allergies: 'None', medications: 'Insulin', medicalHistory: 'Heart Surgery', familyHistory: 'Diabetes', lastVisit: '2023-07-16', emergencyContact: 'Lata Iyer', insuranceInfo: 'Active', primaryCarePhysician: 'Dr. Karthik Iyer', immunizationRecords: 'Up to date', recentLabResults: 'High Blood Sugar' },
  { id: 10, name: 'Kavita Shah', age: 27, bloodGroup: 'A-', condition: 'Healthy', height: '5.4', weight: '58', allergies: 'None', medications: 'None', medicalHistory: 'None', familyHistory: 'None', lastVisit: '2023-07-21', emergencyContact: 'Rajesh Shah', insuranceInfo: 'Active', primaryCarePhysician: 'Dr. Priya Mehta', immunizationRecords: 'Up to date', recentLabResults: 'Normal' },
  { id: 11, name: 'Arjun Kapoor', age: 48, bloodGroup: 'O+', condition: 'Hypertension', height: '5.9', weight: '85', allergies: 'None', medications: 'Losartan', medicalHistory: 'Kidney Disease', familyHistory: 'Hypertension', lastVisit: '2023-07-14', emergencyContact: 'Rekha Kapoor', insuranceInfo: 'Expired', primaryCarePhysician: 'Dr. Nitin Malhotra', immunizationRecords: 'Up to date', recentLabResults: 'High Blood Pressure' },
  { id: 12, name: 'Neha Desai', age: 36, bloodGroup: 'B-', condition: 'Healthy', height: '5.5', weight: '64', allergies: 'None', medications: 'None', medicalHistory: 'None', familyHistory: 'None', lastVisit: '2023-07-12', emergencyContact: 'Sandeep Desai', insuranceInfo: 'Active', primaryCarePhysician: 'Dr. Sunita Sharma', immunizationRecords: 'Up to date', recentLabResults: 'Normal' },
  { id: 13, name: 'Manoj Gupta', age: 50, bloodGroup: 'AB+', condition: 'Diabetic', height: '5.6', weight: '78', allergies: 'None', medications: 'Metformin', medicalHistory: 'Eye Surgery', familyHistory: 'Diabetes', lastVisit: '2023-07-11', emergencyContact: 'Kiran Gupta', insuranceInfo: 'Expired', primaryCarePhysician: 'Dr. Pradeep Saxena', immunizationRecords: 'Up to date', recentLabResults: 'High Blood Sugar' },
  { id: 14, name: 'Lakshmi Pillai', age: 33, bloodGroup: 'A+', condition: 'Healthy', height: '5.6', weight: '60', allergies: 'None', medications: 'None', medicalHistory: 'None', familyHistory: 'None', lastVisit: '2023-07-23', emergencyContact: 'Hari Pillai', insuranceInfo: 'Active', primaryCarePhysician: 'Dr. Renu Menon', immunizationRecords: 'Up to date', recentLabResults: 'Normal' },
  { id: 15, name: 'Sanjay Bhatt', age: 42, bloodGroup: 'O-', condition: 'Hypertension', height: '5.8', weight: '80', allergies: 'None', medications: 'Amlodipine', medicalHistory: 'None', familyHistory: 'Heart Disease', lastVisit: '2023-07-09', emergencyContact: 'Rita Bhatt', insuranceInfo: 'Active', primaryCarePhysician: 'Dr. Arvind Patel', immunizationRecords: 'Up to date', recentLabResults: 'High Blood Pressure' }
];


const diseases = [
  'Hypertension',
  'Diabetes Mellitus',
  'Chronic Respiratory Conditions',
  'Post-Traumatic Stress Disorder (PTSD)',
  'Musculoskeletal Injuries',
  'Heat Stroke',
  'Infectious Diseases (e.g., Tuberculosis, Malaria)',
  'Gastrointestinal Disorders',
  'Chronic Fatigue Syndrome',
  'Cardiovascular Diseases',
  'Hearing Loss',
  'Traumatic Brain Injury (TBI)',
  'Skin Infections',
  'Allergic Reactions',
  'Mental Health Disorders (e.g., Anxiety, Depression)',
  'Joints Disorders',
  'Occupational Asthma',
  'Diarrheal Diseases',
  'Vision Problems'
];

const useFormValidation = (initialState) => {
  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState({});

  const validate = useCallback(() => {
    let errors = {};
    if (!values.name) errors.name = 'Name is required';
    if (!values.age || values.age < 0) errors.age = 'Age must be a positive number';
    setErrors(errors);
    return Object.keys(errors).length === 0;
  }, [values]);

  return [values, setValues, errors, validate];
};

function ErrorBoundary({ children }) {
  const [hasError, setHasError] = useState(false);

  const handleError = () => setHasError(true);

  useEffect(() => {
    window.addEventListener('error', handleError);
    return () => window.removeEventListener('error', handleError);
  }, []);

  if (hasError) {
    return <h1>Something went wrong. Please try again later.</h1>;
  }

  return children;
}

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function Medical() {
  const [value, setValue] = useState(0);
  const [medicalRecordsData, setMedicalRecordsData] = useState(initialMedicalRecordsData);
  const [openModal, setOpenModal] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogType, setDialogType] = useState('');
  const [newRecord, setNewRecord] = useState({});
  const [bookingRecordId, setBookingRecordId] = useState(null);
  const [bookingDate, setBookingDate] = useState('');
  const [bookingTime, setBookingTime] = useState('');
  const [bookingDisease, setBookingDisease] = useState('');
  const [diseaseOptions, setDiseaseOptions] = useState(diseases);
  const [loading, setLoading] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [userRole, setUserRole] = useState('user'); // Simulate user role

  // Use custom hook for form validation
  const [values, setValues, errors, validate] = useFormValidation(newRecord);

  useEffect(() => {
   setUserRole('admin');
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleOpenModal = (record) => {
    setSelectedRecord(record);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedRecord(null);
  };

  const handleModify = (id) => {
    console.log('User Role:', userRole); // Debug role
    if (userRole === 'admin') {
      const record = medicalRecordsData.find(r => r.id === id);
      if (record) {
        setValues(record);
        setDialogType('edit');
        setDialogOpen(true);
      } else {
        setSnackbarMessage('Record not found');
        setShowSnackbar(true);
      }
    } else {
      setSnackbarMessage('You do not have permission to edit records');
      setShowSnackbar(true);
    }
  };
  

  const handleDelete = (id) => {
    if (userRole === 'admin') {
      if (window.confirm('Are you sure you want to delete this record?')) {
        setMedicalRecordsData(prevData => prevData.filter(record => record.id !== id));
        setSnackbarMessage('Record deleted successfully');
        setShowSnackbar(true);
      }
    } else {
      setSnackbarMessage('You do not have permission to delete records');
      setShowSnackbar(true);
    }
  };

  const handleBookAppointment = (id) => {
    setDialogOpen(true);
    setDialogType('book');
    setBookingRecordId(id);
  };

  const handleBookAppointmentSubmit = () => {
    if (bookingDate && bookingTime && bookingDisease) {
      const bookingDetails = `Booking done for ID ${bookingRecordId}, person ${medicalRecordsData.find(r => r.id === bookingRecordId).name} on ${bookingDate} at ${bookingTime} for ${bookingDisease} disease.`;
      setSnackbarMessage(bookingDetails);
      setShowSnackbar(true);
      setDialogOpen(false);
      setBookingRecordId(null);
      setBookingDate('');
      setBookingTime('');
      setBookingDisease('');
    } else {
      setSnackbarMessage('Please fill all booking details');
      setShowSnackbar(true);
    }
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleExport = (type) => {
    setLoading(true);
    try {
      if (type === 'pdf') {
        const doc = new jsPDF();
        doc.text('Medical Records', 10, 10);
        medicalRecordsData.forEach((record, index) => {
          doc.text(`Record ${index + 1}: ${record.name}, Age: ${record.age}`, 10, 20 + index * 10);
        });
        doc.save('medical_records.pdf');
      } else if (type === 'excel') {
        const worksheet = XLSX.utils.json_to_sheet(medicalRecordsData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Medical Records');
        XLSX.writeFile(workbook, 'medical_records.xlsx');
      }
      setSnackbarMessage('Export successful');
    } catch (error) {
      setSnackbarMessage('Export failed');
    } finally {
      setLoading(false);
      setShowSnackbar(true);
    }
  };

  const filteredRecords = medicalRecordsData.filter(record =>
    record.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <ErrorBoundary>
      <Box sx={{ width: '100%' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
        </Tabs>
        <TabPanel value={value} index={0}>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <TextField
              variant="outlined"
              placeholder="Search by name"
              value={searchTerm}
              onChange={handleSearch}
              InputProps={{
                startAdornment: (
                  <IconButton>
                    <Search />
                  </IconButton>
                )
              }}
            />
            <Box>
              <Button
                variant="contained"
                color="primary"
                startIcon={<Add />}
                onClick={() => {
                  setDialogType('add');
                  setDialogOpen(true);
                }}
              >
                Add Record
              </Button>
              <Button
                variant="contained"
                color="secondary"
                startIcon={<Print />}
                onClick={() => handleExport('pdf')}
                sx={{ ml: 2 }}
              >
                Export PDF
              </Button>
              <Button
                variant="contained"
                color="success"
                startIcon={<Print />}
                onClick={() => handleExport('excel')}
                sx={{ ml: 2 }}
              >
                Export Excel
              </Button>
            </Box>
          </Box>
          <TableContainer component={Paper}>
            <Table>
            <TableHead>
  <TableRow>
    <TableCell>Name</TableCell>
    <TableCell>Age</TableCell>
    <TableCell>Gender</TableCell> 
    <TableCell>Blood Group</TableCell>
    <TableCell>Condition</TableCell>
    <TableCell>Height</TableCell> 
    <TableCell>Weight</TableCell> 
    <TableCell>Allergies</TableCell> 
    <TableCell>Medications</TableCell> 
    <TableCell>Medical History</TableCell> 
    <TableCell>Family History</TableCell> 
    <TableCell>Last Visit</TableCell> 
    <TableCell>Emergency Contact</TableCell> 
    <TableCell>Insurance Info</TableCell> 
    <TableCell>Primary Care Physician</TableCell> 
    <TableCell>Immunization Records</TableCell>
    <TableCell>Recent Lab Results</TableCell> 
    <TableCell>Actions</TableCell>
  </TableRow>
</TableHead>

              <TableBody>
                {filteredRecords.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((record) => (
                  <TableRow key={record.id}>
  <TableCell>{record.name}</TableCell>
  <TableCell>{record.age}</TableCell>
  <TableCell>{record.gender}</TableCell> 
  <TableCell>{record.bloodGroup}</TableCell>
  <TableCell>{record.condition}</TableCell>
  <TableCell>{record.height}</TableCell> 
  <TableCell>{record.weight}</TableCell> 
  <TableCell>{record.allergies}</TableCell> 
  <TableCell>{record.medications}</TableCell> 
  <TableCell>{record.medicalHistory}</TableCell> 
  <TableCell>{record.familyHistory}</TableCell>
  <TableCell>{record.lastVisit}</TableCell> 
  <TableCell>{record.emergencyContact}</TableCell> 
  <TableCell>{record.insuranceInfo}</TableCell> 
  <TableCell>{record.primaryCarePhysician}</TableCell> 
  <TableCell>{record.immunizationRecords}</TableCell> 
  <TableCell>{record.recentLabResults}</TableCell> 

                    <TableCell>
                      <Tooltip title="Edit">
                        <IconButton onClick={() => handleModify(record.id)} color="primary">
                          <Edit />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete">
                        <IconButton onClick={() => handleDelete(record.id)} color="secondary">
                          <Delete />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Book Appointment">
                        <IconButton onClick={() => handleBookAppointment(record.id)} color="default">
                          <Add />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={filteredRecords.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Typography variant="h6" gutterBottom>
            Appointments
          </Typography>
          <Box mt={2}>
            <TextField
              label="Search Appointments"
              variant="outlined"
              value={searchTerm}
              onChange={handleSearch}
              InputProps={{
                startAdornment: (
                  <IconButton>
                    <Search />
                  </IconButton>
                ),
              }}
              fullWidth
            />
          </Box>
        </TabPanel>
      </Box>

      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogTitle>{dialogType === 'edit' ? 'Edit Record' : dialogType === 'add' ? 'Add Record' : 'Book Appointment'}</DialogTitle>
        <DialogContent>
          {dialogType === 'book' ? (
            <>
              <TextField
                margin="dense"
                label="Booking Date"
                type="date"
                fullWidth
                variant="outlined"
                value={bookingDate}
                onChange={(e) => setBookingDate(e.target.value)}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <TextField
                margin="dense"
                label="Booking Time"
                type="time"
                fullWidth
                variant="outlined"
                value={bookingTime}
                onChange={(e) => setBookingTime(e.target.value)}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <FormControl fullWidth margin="dense">
                <InputLabel>Disease</InputLabel>
                <Select
                  value={bookingDisease}
                  onChange={(e) => setBookingDisease(e.target.value)}
                >
                  {diseaseOptions.map((disease, index) => (
                    <MenuItem key={index} value={disease}>{disease}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </>
          ) : (
            <>
            <TextField
    margin="dense"
    label="Name"
    type="text"
    fullWidth
    variant="outlined"
    value={values.name}
    onChange={(e) => setValues({ ...values, name: e.target.value })}
  />
  <TextField
    margin="dense"
    label="Age"
    type="number"
    fullWidth
    variant="outlined"
    value={values.age}
    onChange={(e) => setValues({ ...values, age: e.target.value })}
  />
  <TextField
    margin="dense"
    label="Gender"
    type="text"
    fullWidth
    variant="outlined"
    value={values.gender}
    onChange={(e) => setValues({ ...values, gender: e.target.value })}
  />
  <TextField
    margin="dense"
    label="Blood Group"
    type="text"
    fullWidth
    variant="outlined"
    value={values.bloodGroup}
    onChange={(e) => setValues({ ...values, bloodGroup: e.target.value })}
  />
  <TextField
    margin="dense"
    label="Condition"
    type="text"
    fullWidth
    variant="outlined"
    value={values.condition}
    onChange={(e) => setValues({ ...values, condition: e.target.value })}
  />
  <TextField
    margin="dense"
    label="Height"
    type="text"
    fullWidth
    variant="outlined"
    value={values.height}
    onChange={(e) => setValues({ ...values, height: e.target.value })}
  />
  <TextField
    margin="dense"
    label="Weight"
    type="text"
    fullWidth
    variant="outlined"
    value={values.weight}
    onChange={(e) => setValues({ ...values, weight: e.target.value })}
  />
  <TextField
    margin="dense"
    label="Allergies"
    type="text"
    fullWidth
    variant="outlined"
    value={values.allergies}
    onChange={(e) => setValues({ ...values, allergies: e.target.value })}
  />
  <TextField
    margin="dense"
    label="Medications"
    type="text"
    fullWidth
    variant="outlined"
    value={values.medications}
    onChange={(e) => setValues({ ...values, medications: e.target.value })}
  />
  <TextField
    margin="dense"
    label="Medical History"
    type="text"
    fullWidth
    variant="outlined"
    value={values.medicalHistory}
    onChange={(e) => setValues({ ...values, medicalHistory: e.target.value })}
  />
  <TextField
    margin="dense"
    label="Family History"
    type="text"
    fullWidth
    variant="outlined"
    value={values.familyHistory}
    onChange={(e) => setValues({ ...values, familyHistory: e.target.value })}
  />
  <TextField
    margin="dense"
    label="Last Visit"
    type="date"
    fullWidth
    variant="outlined"
    value={values.lastVisit}
    onChange={(e) => setValues({ ...values, lastVisit: e.target.value })}
    InputLabelProps={{
      shrink: true,
    }}
  />
  <TextField
    margin="dense"
    label="Emergency Contact"
    type="text"
    fullWidth
    variant="outlined"
    value={values.emergencyContact}
    onChange={(e) => setValues({ ...values, emergencyContact: e.target.value })}
  />
  <TextField
    margin="dense"
    label="Insurance Info"
    type="text"
    fullWidth
    variant="outlined"
    value={values.insuranceInfo}
    onChange={(e) => setValues({ ...values, insuranceInfo: e.target.value })}
  />
  <TextField
    margin="dense"
    label="Primary Care Physician"
    type="text"
    fullWidth
    variant="outlined"
    value={values.primaryCarePhysician}
    onChange={(e) => setValues({ ...values, primaryCarePhysician: e.target.value })}
  />
  <TextField
    margin="dense"
    label="Immunization Records"
    type="text"
    fullWidth
    variant="outlined"
    value={values.immunizationRecords}
    onChange={(e) => setValues({ ...values, immunizationRecords: e.target.value })}
  />
  <TextField
    margin="dense"
    label="Recent Lab Results"
    type="text"
    fullWidth
    variant="outlined"
    value={values.recentLabResults}
    onChange={(e) => setValues({ ...values, recentLabResults: e.target.value })}
  />
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)} color="primary">Cancel</Button>
          <Button
            onClick={() => {
              if (dialogType === 'book') {
                handleBookAppointmentSubmit();
              } else if (dialogType === 'edit' && validate()) {
                setMedicalRecordsData(medicalRecordsData.map(record => record.id === values.id ? values : record));
                setSnackbarMessage('Record updated successfully');
                setShowSnackbar(true);
                setDialogOpen(false);
              } else if (dialogType === 'add' && validate()) {
                setMedicalRecordsData([...medicalRecordsData, { ...values, id: medicalRecordsData.length + 1 }]);
                setSnackbarMessage('Record added successfully');
                setShowSnackbar(true);
                setDialogOpen(false);
              }
            }}
            color="primary"
          >
            {dialogType === 'book' ? 'Book' : dialogType === 'edit' ? 'Save' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={showSnackbar}
        autoHideDuration={6000}
        onClose={() => setShowSnackbar(false)}
      >
        <Alert onClose={() => setShowSnackbar(false)} severity="success">
          {snackbarMessage}
        </Alert>
      </Snackbar>

      {loading && (
        <Box display="flex" justifyContent="center" alignItems="center" mt={2}>
          <CircularProgress />
        </Box>
      )}
    </ErrorBoundary>
  );
}

export default Medical;