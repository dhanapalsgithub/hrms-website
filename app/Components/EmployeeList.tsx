"use client";

import { useState, useMemo } from 'react';
import { 
  Box, Button, Typography, Table, TableBody, TableCell, TableContainer, 
  TableHead, TableRow, Paper, Avatar, Chip, IconButton, TextField, 
  MenuItem, Dialog, DialogTitle, DialogContent, DialogActions, 
   Grid, TablePagination, Stack, useMediaQuery, useTheme,
  Divider, Tooltip
} from '@mui/material';
import { Plus, Mail, Edit, Trash2, Search, Briefcase, AlertTriangle, Calendar, Wallet, Building2, User } from 'lucide-react';

// --- Expanded Types ---
interface Employee {
  id: number;
  name: string;
  email: string;
  phone: string;
  department: string;
  role: string;
  status: 'Active' | 'On Leave' | 'Notice Period';
  joiningDate: string;
  experience: number; // in years
  previousSalary: number;
  currentSalary: number; // Basic/Gross
  esi: number;
  pf: number;
  grossSalary: number;
}

// --- Data Generator ---
const generateDummyData = (): Employee[] => {
  const depts = ['Engineering', 'HR', 'Marketing', 'Finance', 'Sales'];
  const firstNames = ['Sarah', 'Michael', 'Emma', 'David', 'James', 'Olivia', 'Robert', 'Sophia', 'William', 'Isabella'];
  const lastNames = ['Johnson', 'Chen', 'Wilson', 'Miller', 'Davis', 'Brown', 'Garcia', 'Martinez', 'Anderson', 'Taylor'];

  return Array.from({ length: 250 }, (_, i) => {
    const fn = firstNames[Math.floor(Math.random() * firstNames.length)];
    const ln = lastNames[Math.floor(Math.random() * lastNames.length)];
    const dept = depts[Math.floor(Math.random() * depts.length)];
    const currentSalary = Math.floor(Math.random() * 50000) + 30000;
    const esi = Math.round(currentSalary * 0.0075);
    const pf = Math.round(currentSalary * 0.12);
    
    return {
      id: i + 1,
      name: `${fn} ${ln}`,
      email: `${fn.toLowerCase()}.${ln.toLowerCase()}${i}@company.com`,
      phone: `+1 ${Math.floor(Math.random() * 900 + 100)} 555 ${Math.floor(Math.random() * 9000 + 1000)}`,
      department: dept,
      role: `Senior ${dept} Associate`,
      status: ['Active', 'On Leave', 'Notice Period'][Math.floor(Math.random() * 3)] as any,
      joiningDate: new Date(2020, 0, Math.floor(Math.random() * 1000)).toLocaleDateString(),
      experience: Math.floor(Math.random() * 10) + 1,
      previousSalary: currentSalary - 10000,
      currentSalary,
      esi,
      pf,
      grossSalary: currentSalary + esi + pf,
    };
  });
};

export function EmployeeList() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  // --- State ---
  const [employees] = useState<Employee[]>(generateDummyData());
  const [selectedEmp, setSelectedEmp] = useState<Employee | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [deptFilter, setDeptFilter] = useState('All');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // --- Filter Logic ---
  const filteredEmployees = useMemo(() => {
    return employees.filter(emp => {
      const matchesName = emp.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesDept = deptFilter === 'All' || emp.department === deptFilter;
      return matchesName && matchesDept;
    });
  }, [employees, searchQuery, deptFilter]);

  const paginatedEmployees = filteredEmployees.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  const formatCurr = (val: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(val);

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, maxWidth: '1200px', mx: 'auto', bgcolor: '#f8fafc' }}>
      
      {/* Header */}
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 900, color: '#0f172a' }}>HR Management</Typography>
        <Button variant="contained" startIcon={<Plus size={18} />} sx={{ borderRadius: 2, fontWeight: 700 }}>Add New</Button>
      </Stack>

      {/* Filter Bar */}
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mb: 3 }}>
        <TextField 
          placeholder="Search by name..." 
          fullWidth size="small"
          value={searchQuery}
          onChange={(e) => {setSearchQuery(e.target.value); setPage(0);}}
          slotProps={{ input: { startAdornment: <Search size={18} style={{ marginRight: 8, color: '#64748b' }} /> }}}
          sx={{ bgcolor: 'white' }}
        />
        <TextField
          select
          value={deptFilter}
          onChange={(e) => {setDeptFilter(e.target.value); setPage(0);}}
          size="small"
          sx={{ minWidth: 200, bgcolor: 'white' }}
        >
          {['All', 'Engineering', 'HR', 'Marketing', 'Finance', 'Sales'].map(d => (
            <MenuItem key={d} value={d}>{d}</MenuItem>
          ))}
        </TextField>
      </Stack>

      {/* Main Table */}
      <TableContainer component={Paper} variant="outlined" sx={{ borderRadius: 3, border: '1px solid #e2e8f0' }}>
        <Table>
          <TableHead sx={{ bgcolor: '#f1f5f9' }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 800 }}>Employee</TableCell>
              <TableCell sx={{ fontWeight: 800 }}>Department</TableCell>
              {!isMobile && <TableCell sx={{ fontWeight: 800 }}>Gross Salary</TableCell>}
              <TableCell align="right" sx={{ fontWeight: 800 }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedEmployees.map((emp) => (
              <TableRow key={emp.id} hover>
                <TableCell>
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Avatar sx={{ bgcolor: '#2563eb', fontWeight: 700, cursor: 'pointer' }} onClick={() => setSelectedEmp(emp)}>
                      {emp.name[0]}
                    </Avatar>
                    <Box>
                      <Typography 
                        variant="body2" 
                        onClick={() => setSelectedEmp(emp)}
                        sx={{ fontWeight: 800, cursor: 'pointer', '&:hover': { color: '#2563eb' } }}
                      >
                        {emp.name}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">{emp.role}</Typography>
                    </Box>
                  </Stack>
                </TableCell>
                <TableCell>
                   <Chip label={emp.department} size="small" sx={{ fontWeight: 600, bgcolor: '#f1f5f9' }} />
                </TableCell>
                {!isMobile && <TableCell sx={{ fontWeight: 700 }}>{formatCurr(emp.grossSalary)}</TableCell>}
                <TableCell align="right">
                  <IconButton size="small" onClick={() => setSelectedEmp(emp)}><Search size={16} /></IconButton>
                  <IconButton size="small" color="error"><Trash2 size={16} /></IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
          component="div"
          count={filteredEmployees.length}
          page={page}
          onPageChange={(_, p) => setPage(p)}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={(e) => setRowsPerPage(parseInt(e.target.value, 10))}
        />
      </TableContainer>

      {/* --- Detailed Profile Dialog --- */}
      <Dialog open={!!selectedEmp} onClose={() => setSelectedEmp(null)} fullWidth maxWidth="md">
        {selectedEmp && (
          <>
            <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', bgcolor: '#f8fafc', p: 3 }}>
              <Stack direction="row" spacing={2} alignItems="center">
                <Avatar sx={{ width: 60, height: 60, bgcolor: '#2563eb', fontSize: '1.5rem', fontWeight: 800 }}>{selectedEmp.name[0]}</Avatar>
                <Box>
                  <Typography variant="h5" sx={{ fontWeight: 900 }}>{selectedEmp.name}</Typography>
                  <Typography variant="body2" color="primary" sx={{ fontWeight: 700 }}>ID: EMP-{selectedEmp.id}2024</Typography>
                </Box>
              </Stack>
              <Chip label={selectedEmp.status} color="success" sx={{ fontWeight: 800 }} />
            </DialogTitle>
            
            <DialogContent sx={{ p: 4 }}>
              <Grid container spacing={4}>
                {/* Employment Info */}
                <Grid size={{ xs: 12, md: 6 }}>
                  <Typography variant="subtitle2" sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1, fontWeight: 800, color: '#64748b' }}>
                    <Building2 size={18} /> PROFESSIONAL DETAILS
                  </Typography>
                  <Stack spacing={2}>
                    <DetailRow label="Department" value={selectedEmp.department} />
                    <DetailRow label="Designation" value={selectedEmp.role} />
                    <DetailRow label="Joining Date" value={selectedEmp.joiningDate} />
                    <DetailRow label="Experience" value={`${selectedEmp.experience} Years`} />
                  </Stack>
                </Grid>

                {/* Salary Info */}
                <Grid size={{ xs: 12, md: 6 }}>
                  <Typography variant="subtitle2" sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1, fontWeight: 800, color: '#64748b' }}>
                    <Wallet size={18} /> SALARY BREAKUP (MONTHLY)
                  </Typography>
                  <Paper variant="outlined" sx={{ p: 2, bgcolor: '#f8fafc', borderRadius: 2 }}>
                    <Stack spacing={1.5}>
                      <DetailRow label="This Company Basic" value={formatCurr(selectedEmp.currentSalary)} />
                      <DetailRow label="Previous Company" value={formatCurr(selectedEmp.previousSalary)} />
                      <Divider />
                      <DetailRow label="ESI Contribution" value={formatCurr(selectedEmp.esi)} />
                      <DetailRow label="PF Contribution" value={formatCurr(selectedEmp.pf)} />
                      <Divider />
                      <Stack direction="row" justifyContent="space-between">
                        <Typography sx={{ fontWeight: 900 }}>GROSS SALARY</Typography>
                        <Typography sx={{ fontWeight: 900, color: '#16a34a' }}>{formatCurr(selectedEmp.grossSalary)}</Typography>
                      </Stack>
                    </Stack>
                  </Paper>
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions sx={{ p: 3, bgcolor: '#f8fafc' }}>
              <Button onClick={() => setSelectedEmp(null)} variant="outlined" sx={{ fontWeight: 700 }}>Close Record</Button>
              <Button variant="contained" startIcon={<Edit size={16} />} sx={{ fontWeight: 700 }}>Edit Details</Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Box>
  );
}

// Helper component for detail rows
function DetailRow({ label, value }: { label: string, value: string | number }) {
  return (
    <Stack direction="row" justifyContent="space-between" alignItems="center">
      <Typography variant="body2" sx={{ color: '#64748b', fontWeight: 600 }}>{label}</Typography>
      <Typography variant="body2" sx={{ fontWeight: 700, color: '#0f172a' }}>{value}</Typography>
    </Stack>
  );
}