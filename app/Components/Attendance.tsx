import React, { useState } from 'react';
import { 
  Box, Typography, Button, Paper, TextField, 
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, 
  Chip, Avatar, IconButton, TablePagination,Grid 
} from '@mui/material';

import { Download, User, X } from 'lucide-react';

interface AttendanceRecord {
  id: number;
  employeeName: string;
  checkIn: string;
  checkOut: string;
  status: string;
  totalPresent: number;
  totalAbsent: number;
  totalLate: number;
}

// Generating 25 dummy records to demonstrate pagination
const DUMMY_DATA: AttendanceRecord[] = Array.from({ length: 25 }, (_, i) => ({
  id: i + 1,
  employeeName: [
    'Sarah Johnson', 'Michael Chen', 'Emma Wilson', 'James Miller', 'Sofia Rodriguez',
    'Liam Smith', 'Olivia Brown', 'Noah Davis', 'Ava Martinez', 'Lucas Garcia',
    'Isabella Taylor', 'Mason Anderson', 'Mia Thomas', 'Ethan Moore', 'Charlotte Jackson',
    'Alexander White', 'Amelia Harris', 'Daniel Martin', 'Evelyn Thompson', 'Henry Garcia',
    'Sebastian Clark', 'Luna Lewis', 'Jack Walker', 'Aria Hall', 'Owen Young'
  ][i] || `Employee ${i + 1}`,
  checkIn: i % 3 === 0 ? '-' : '09:00 AM',
  checkOut: i % 3 === 0 ? '-' : '05:30 PM',
  status: i % 3 === 0 ? 'Absent' : (i % 5 === 0 ? 'Late' : 'Present'),
  totalPresent: 20,
  totalAbsent: 2,
  totalLate: i % 5,
}));

export function Attendance() {
  const [selectedEmployee, setSelectedEmployee] = useState<AttendanceRecord | null>(null);
  
  // --- PAGINATION STATE ---
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  
  const currentTimeInZone = new Intl.DateTimeFormat('en-US', {
    timeZone: userTimeZone,
    year: 'numeric',
    month: 'short',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    timeZoneName: 'short',
  }).format(new Date());

  // --- PAGINATION LOGIC ---
  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Get only the records for the current page
  const visibleRecords = DUMMY_DATA.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const stats = [
    { label: 'Present', value: '142', color: 'success.main' },
    { label: 'Late', value: '12', color: 'warning.main' },
    { label: 'Absent', value: '4', color: 'error.main' },
    { label: 'On Leave', value: '8', color: 'info.main' },
  ];

  const handleExport = () => {
    const headers = ['Employee Name, Check In, Check Out, Status, TimeZone\n'];
    const csvRows = DUMMY_DATA.map(r => 
      `${r.employeeName}, ${r.checkIn}, ${r.checkOut}, ${r.status}, ${userTimeZone}`
    );
    const csvContent = headers.concat(csvRows.join('\n')).join('');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Full_Attendance_Report.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Box sx={{ p: { xs: 2, sm: 3 } }}>
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'space-between', alignItems: { xs: 'flex-start', sm: 'center' }, gap: 2, mb: 4 }}>
        <Box>
          <Typography variant="h5" fontWeight="bold">Attendance Tracking</Typography>
          <Typography variant="body2" color="text.secondary">System Time: {currentTimeInZone}</Typography>
        </Box>
        <Button variant="contained" onClick={handleExport} startIcon={<Download size={18} />} sx={{ textTransform: 'none', borderRadius: 2, bgcolor: '#2563eb' }}>
          Export All CSV
        </Button>
      </Box>

      {selectedEmployee && (
        <Paper elevation={0} sx={{ p: 3, mb: 4, borderRadius: 3, bgcolor: '#f0f7ff', border: '1px solid #cce3ff', position: 'relative' }}>
          <IconButton size="small" onClick={() => setSelectedEmployee(null)} sx={{ position: 'absolute', top: 8, right: 8 }}><X size={18} /></IconButton>
          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, alignItems: 'center', gap: 2 }}>
            <Avatar sx={{ bgcolor: '#2563eb', width: 64, height: 64 }}><User size={32} /></Avatar>
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="h6" fontWeight="bold">{selectedEmployee.employeeName}</Typography>
              <Typography variant="body2" color="text.secondary">Detailed Records</Typography>
            </Box>
            <Grid container spacing={1} sx={{ width: { xs: '100%', md: '400px' } }}>
              {[
                { label: 'Present', val: selectedEmployee.totalPresent, col: 'success.main' }, 
                { label: 'Late', val: selectedEmployee.totalLate, col: 'warning.main' }, 
                { label: 'Absent', val: selectedEmployee.totalAbsent, col: 'error.main' }
              ].map((item) => (
                <Grid size={{ xs: 4 }} key={item.label}>
                  <Box sx={{ bgcolor: 'white', p: 1, borderRadius: 2, border: '1px solid #e2e8f0', textAlign: 'center' }}>
                    <Typography variant="caption" fontWeight={600}>{item.label}</Typography>
                    <Typography variant="h6" color={item.col} fontWeight="bold">{item.val}</Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Paper>
      )}

      {/* Stats Cards */}
      <Grid container spacing={2} sx={{ mb: 4 }}>
        <Grid size={{ xs: 12, lg: 4 }}>
          <Paper variant="outlined" sx={{ p: 2, borderRadius: 2 }}>
            <Typography variant="caption" color="text.secondary" fontWeight={600}>Filter Date</Typography>
            <TextField type="date" fullWidth size="small" sx={{ mt: 1 }} defaultValue={new Date().toISOString().split('T')[0]} />
          </Paper>
        </Grid>
        <Grid size={{ xs: 12, lg: 8 }}>
          <Grid container spacing={2}>
            {stats.map((s) => (
              <Grid size={{ xs: 6, sm: 3 }} key={s.label}>
                <Paper variant="outlined" sx={{ p: 2, textAlign: 'center', borderRadius: 2 }}>
                  <Typography variant="caption" color="text.secondary" fontWeight={600}>{s.label}</Typography>
                  <Typography variant="h6" sx={{ color: s.color, fontWeight: 'bold' }}>{s.value}</Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>

      {/* Table with Pagination */}
      <Paper variant="outlined" sx={{ borderRadius: 2, overflow: 'hidden' }}>
        <TableContainer sx={{ maxHeight: 600 }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold', bgcolor: '#f9fafb' }}>Employee</TableCell>
                <TableCell sx={{ fontWeight: 'bold', bgcolor: '#f9fafb' }}>Check In</TableCell>
                <TableCell sx={{ fontWeight: 'bold', bgcolor: '#f9fafb' }}>Check Out</TableCell>
                <TableCell sx={{ fontWeight: 'bold', bgcolor: '#f9fafb' }}>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {visibleRecords.map((record) => (
                <TableRow 
                  key={record.id} 
                  hover 
                  onClick={() => setSelectedEmployee(record)} 
                  sx={{ cursor: 'pointer', bgcolor: selectedEmployee?.id === record.id ? '#f0f7ff' : 'inherit' }}
                >
                  <TableCell sx={{ fontWeight: 500 }}>{record.employeeName}</TableCell>
                  <TableCell>{record.checkIn}</TableCell>
                  <TableCell>{record.checkOut}</TableCell>
                  <TableCell>
                    <Chip 
                      label={record.status} 
                      size="small" 
                      color={record.status === 'Present' ? 'success' : record.status === 'Late' ? 'warning' : 'error'} 
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        
        {/* MUI PAGINATION COMPONENT */}
        <TablePagination
          component="div"
          count={DUMMY_DATA.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPageOptions={[5, 10, 25]}
        />
      </Paper>
    </Box>
  );
}