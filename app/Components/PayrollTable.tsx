"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { 
  Box, Typography, Paper, Table, TableBody, TableCell, 
  TableContainer, TableHead, TableRow, Chip, Button, Stack,
  TablePagination, Divider, useMediaQuery, useTheme, Card
} from '@mui/material';
import { Calculator, Users, CheckCircle } from 'lucide-react';

interface AttendanceRecord {
  empId: string;
  status: 'Present' | 'Absent';
}

interface Employee {
  id: string;
  name: string;
  baseSalary: number;
  daysWorked: number;
}

const PayrollWithAttendance = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  // --- 1. Generate 25 Dummy Employees ---
  const initialEmployees: Employee[] = Array.from({ length: 25 }, (_, i) => ({
    id: `EMP${String(i + 1).padStart(3, '0')}`,
    name: [
      "Arul", "Aswin", "Mani", "Priya", "Jeni", "Rahul", "Sita", "Kavin", 
      "Divya", "Balan", "Abhi", "Surya", "Anu", "Giri", "Vicky", "Deepa",
      "Ram", "Somu", "Latha", "Meena", "Raj", "Vijay", "Tara", "Ezhil", "Guru"
    ][i] || `Employee ${i + 1}`,
    baseSalary: Math.floor(Math.random() * (40000 - 15000 + 1) + 15000),
    daysWorked: Math.floor(Math.random() * 5) + 20, // Starting with some base attendance
  }));

  const [employees, setEmployees] = useState<Employee[]>(initialEmployees);
  
  // --- 2. Pagination State ---
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const daysInMonth = 30;

  // --- 3. Salary Calculation Engine ---
  const calculatePayroll = (emp: Employee) => {
    const earnedBasic = (emp.baseSalary / daysInMonth) * emp.daysWorked;
    const hra = earnedBasic * 0.40;
    const grossSalary = earnedBasic + hra;
    const epf = earnedBasic * 0.12;
    const esi = grossSalary * 0.0075;
    const netSalary = grossSalary - (epf + esi);

    return { grossSalary, epf, esi, netSalary };
  };

  // --- 4. Attendance Action ---
  const markPresent = (id: string) => {
    setEmployees(prev => prev.map(emp => 
      emp.id === id ? { ...emp, daysWorked: Math.min(emp.daysWorked + 1, 30) } : emp
    ));
  };

  const handleChangePage = (_: any, newPage: number) => setPage(newPage);
  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Pagination Logic
  const paginatedEmployees = employees.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, display: 'flex', flexDirection: 'column', gap: 4 }}>
      
      {/* Attendance Simulation Section (Mobile Responsive Grid) */}
      <Paper variant="outlined" sx={{ p: 2, borderRadius: 3, bgcolor: '#fdfcfe' }}>
        <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2 }}>
          <Users size={20} color="#6366f1" />
          <Typography variant="h6" fontWeight="bold">Attendance Menu (Quick Mark)</Typography>
        </Stack>
        <Box sx={{ 
          display: 'grid', 
          gridTemplateColumns: { xs: '1fr 1fr', sm: '1fr 1fr 1fr', md: 'repeat(5, 1fr)' }, 
          gap: 1 
        }}>
          {paginatedEmployees.map(emp => (
            <Button 
              key={emp.id} 
              variant="outlined" 
              size="small"
              startIcon={<CheckCircle size={14}/>}
              onClick={() => markPresent(emp.id)}
              sx={{ textTransform: 'none', fontSize: '0.75rem' }}
            >
              {emp.name}
            </Button>
          ))}
        </Box>
        <Typography variant="caption" sx={{ mt: 2, display: 'block', color: 'text.secondary' }}>
          *Click a name to increase attendance. Currently showing page {page + 1}.
        </Typography>
      </Paper>

      {/* Payroll Section */}
      <Box>
        <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2 }}>
          <Calculator size={24} color="#2563eb" />
          <Typography variant="h5" fontWeight="bold">Payroll Summary</Typography>
        </Stack>

        <Paper variant="outlined" sx={{ borderRadius: 3, overflow: 'hidden' }}>
          {isMobile ? (
            // MOBILE VIEW: Card-based layout
            <Box>
              {paginatedEmployees.map((emp) => {
                const data = calculatePayroll(emp);
                return (
                  <Box key={emp.id} sx={{ p: 2, borderBottom: '1px solid #eee' }}>
                    <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}>
                      <Box>
                        <Typography fontWeight="bold">{emp.name}</Typography>
                        <Typography variant="caption" color="text.secondary">{emp.id}</Typography>
                      </Box>
                      <Chip label={`${emp.daysWorked} Days`} size="small" color="primary" />
                    </Stack>
                    <Stack direction="row" justifyContent="space-between">
                      <Typography variant="body2">Net Pay:</Typography>
                      <Typography variant="body2" fontWeight="bold" color="primary.main">
                        ₹{data.netSalary.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                      </Typography>
                    </Stack>
                  </Box>
                );
              })}
            </Box>
          ) : (
            // DESKTOP VIEW: Table layout
            <TableContainer>
              <Table>
                <TableHead sx={{ bgcolor: '#f8fafc' }}>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 'bold' }}>Employee</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Attendance</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Gross Salary</TableCell>
                    <TableCell sx={{ fontWeight: 'bold', color: '#dc2626' }}>Deductions</TableCell>
                    <TableCell sx={{ fontWeight: 'bold', bgcolor: '#f0f9ff', color: '#2563eb' }}>Net Pay</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {paginatedEmployees.map((emp) => {
                    const data = calculatePayroll(emp);
                    return (
                      <TableRow key={emp.id} hover>
                        <TableCell>
                          <Typography variant="body2" fontWeight="bold">{emp.name}</Typography>
                          <Typography variant="caption" color="text.secondary">{emp.id}</Typography>
                        </TableCell>
                        <TableCell>
                          <Chip label={`${emp.daysWorked}/30`} size="small" variant="outlined" />
                        </TableCell>
                        <TableCell>₹{data.grossSalary.toLocaleString(undefined, { maximumFractionDigits: 0 })}</TableCell>
                        <TableCell sx={{ color: '#dc2626' }}>-₹{(data.epf + data.esi).toFixed(0)}</TableCell>
                        <TableCell sx={{ bgcolor: '#f0f9ff', fontWeight: 'bold' }}>
                          ₹{data.netSalary.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          )}
          
          <TablePagination
            component="div"
            count={employees.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            rowsPerPageOptions={[5, 10, 25]}
          />
        </Paper>
      </Box>
    </Box>
  );
};

export default PayrollWithAttendance;