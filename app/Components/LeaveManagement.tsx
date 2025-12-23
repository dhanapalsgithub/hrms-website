"use client";

import { useState, useMemo } from 'react';
import { 
  Box, Typography, Button, Paper, Table, TableBody, TableCell, 
  TableContainer, TableHead, TableRow, Chip, IconButton, 
  Dialog, DialogTitle, DialogContent, DialogActions, 
   Grid, 
  TextField, MenuItem, useMediaQuery, useTheme, Stack,
  TablePagination, Avatar, Badge, Tooltip, Drawer, Divider
} from '@mui/material';
import { 
  Plus, CheckCircle, XCircle, Clock, Bell, User, CalendarDays 
} from 'lucide-react';

interface LeaveRequest {
  id: number;
  name: string;
  type: string;
  date: string;
  days: number;
  status: 'Approved' | 'Pending' | 'Rejected';
  approvedThisMonth: number;
  deniedThisMonth: number;
  yearlyBalance: number;
}

export function LeaveManagement() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  // --- State ---
  const [open, setOpen] = useState(false);
  const [selectedEmp, setSelectedEmp] = useState<LeaveRequest | null>(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [requests, setRequests] = useState<LeaveRequest[]>([
    { id: 1, name: 'Arul', type: 'Sick Leave', date: '2024-03-20', days: 1, status: 'Pending', approvedThisMonth: 1, deniedThisMonth: 0, yearlyBalance: 12 },
    { id: 2, name: 'Jeni', type: 'Annual Leave', date: '2024-03-22', days: 3, status: 'Approved', approvedThisMonth: 3, deniedThisMonth: 1, yearlyBalance: 8 },
    { id: 3, name: 'Aswin', type: 'Casual Leave', date: '2024-03-25', days: 2, status: 'Rejected', approvedThisMonth: 0, deniedThisMonth: 2, yearlyBalance: 15 },
    { id: 4, name: 'Priya', type: 'Sick Leave', date: '2024-03-26', days: 1, status: 'Approved', approvedThisMonth: 2, deniedThisMonth: 0, yearlyBalance: 10 },
    { id: 5, name: 'Rahul', type: 'Annual Leave', date: '2024-03-27', days: 5, status: 'Pending', approvedThisMonth: 0, deniedThisMonth: 0, yearlyBalance: 20 },
    { id: 6, name: 'Sita', type: 'Casual Leave', date: '2024-03-28', days: 2, status: 'Approved', approvedThisMonth: 4, deniedThisMonth: 1, yearlyBalance: 5 },
  ]);

  const stats = useMemo(() => ({
    total: requests.length,
    pending: requests.filter(r => r.status === 'Pending').length,
    approved: requests.filter(r => r.status === 'Approved').length,
  }), [requests]);

  const handleStatusChange = (id: number, newStatus: 'Approved' | 'Rejected') => {
    setRequests(prev => prev.map(req => {
      if (req.id === id && req.status === 'Pending') {
        const isApprove = newStatus === 'Approved';
        return {
          ...req,
          status: newStatus,
          approvedThisMonth: isApprove ? req.approvedThisMonth + req.days : req.approvedThisMonth,
          deniedThisMonth: !isApprove ? req.deniedThisMonth + req.days : req.deniedThisMonth,
          yearlyBalance: isApprove ? req.yearlyBalance - req.days : req.yearlyBalance
        };
      }
      return req;
    }));
  };

  const getStatusChip = (status: string) => {
    const config: any = {
      Approved: { color: 'success', icon: <CheckCircle size={14} /> },
      Pending: { color: 'warning', icon: <Clock size={14} /> },
      Rejected: { color: 'error', icon: <XCircle size={14} /> },
    };
    const { color, icon } = config[status] || config.Pending;
    return <Chip label={status} size="small" icon={icon} color={color} variant="outlined" sx={{ fontWeight: 600 }} />;
  };

  const ActionButtons = ({ req }: { req: LeaveRequest }) => (
    <Stack direction="row" spacing={1} justifyContent={isMobile ? "flex-start" : "flex-end"}>
      {req.status === 'Pending' ? (
        <>
          <Button 
            size="small" 
            variant="contained" 
            color="success" 
            onClick={(e) => { e.stopPropagation(); handleStatusChange(req.id, 'Approved'); }}
            sx={{ textTransform: 'none' }}
          >
            Approve
          </Button>
          <Button 
            size="small" 
            variant="outlined" 
            color="error" 
            onClick={(e) => { e.stopPropagation(); handleStatusChange(req.id, 'Rejected'); }}
            sx={{ textTransform: 'none' }}
          >
            Reject
          </Button>
        </>
      ) : (
        <Typography variant="caption" color="text.disabled">Processed</Typography>
      )}
    </Stack>
  );

  return (
    <Box sx={{ p: { xs: 2, md: 3 } }}>
      {/* Header */}
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 4 }}>
        <Box>
          <Typography variant="h5" fontWeight="bold">Leave Management</Typography>
          <Typography variant="body2" color="text.secondary">Click name to view stats</Typography>
        </Box>
        <Button 
            variant="contained" 
            startIcon={<Plus size={18} />} 
            onClick={() => setOpen(true)}
            sx={{ textTransform: 'none', borderRadius: 2, bgcolor: '#2563eb' }}
          >
            New Request
        </Button>
      </Stack>

      <Paper variant="outlined" sx={{ borderRadius: 3, overflow: 'hidden' }}>
        {isMobile ? (
          <Box>
            {requests.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((req) => (
              <Box key={req.id} sx={{ p: 2, borderBottom: '1px solid #eee' }} onClick={() => setSelectedEmp(req)}>
                <Stack direction="row" justifyContent="space-between" sx={{ mb: 1 }}>
                  <Typography fontWeight="bold" color="primary">{req.name}</Typography>
                  {getStatusChip(req.status)}
                </Stack>
                <Typography variant="body2" sx={{ mb: 1 }}>{req.type} • {req.days} Days</Typography>
                <ActionButtons req={req} />
              </Box>
            ))}
          </Box>
        ) : (
          <TableContainer>
            <Table>
              <TableHead sx={{ bgcolor: '#f8fafc' }}>
                <TableRow>
                  <TableCell sx={{ fontWeight: 700 }}>Employee Name</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Type</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Days</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Status</TableCell>
                  <TableCell sx={{ fontWeight: 700 }} align="right">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {requests.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((req) => (
                  <TableRow key={req.id} hover onClick={() => setSelectedEmp(req)} sx={{ cursor: 'pointer' }}>
                    <TableCell>
                      <Typography variant="body2" fontWeight={600} color="primary.main">{req.name}</Typography>
                      <Typography variant="caption" color="text.secondary">{req.date}</Typography>
                    </TableCell>
                    <TableCell>{req.type}</TableCell>
                    <TableCell>{req.days}</TableCell>
                    <TableCell>{getStatusChip(req.status)}</TableCell>
                    <TableCell align="right"><ActionButtons req={req} /></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
        <TablePagination component="div" count={requests.length} rowsPerPage={rowsPerPage} page={page} onPageChange={(_, p) => setPage(p)} onRowsPerPageChange={(e) => setRowsPerPage(parseInt(e.target.value, 10))} />
      </Paper>

      {/* --- LEAVE DETAILS SIDE DRAWER --- */}
      <Drawer
        anchor="right"
        open={Boolean(selectedEmp)}
        onClose={() => setSelectedEmp(null)}
        PaperProps={{ sx: { width: { xs: '100%', sm: 350 }, p: 3 } }}
      >
        {selectedEmp && (
          <Box>
            <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 3 }}>
              <Avatar sx={{ bgcolor: '#2563eb', width: 56, height: 56 }}>{selectedEmp.name[0]}</Avatar>
              <Box>
                <Typography variant="h6" fontWeight="bold">{selectedEmp.name}</Typography>
                <Typography variant="body2" color="text.secondary">Employee ID: #00{selectedEmp.id}</Typography>
              </Box>
            </Stack>
            
            <Divider sx={{ mb: 3 }} />

            <Typography variant="subtitle2" fontWeight="bold" gutterBottom>Leave Performance</Typography>
            
            <Stack spacing={2}>
              <Paper variant="outlined" sx={{ p: 2, bgcolor: '#f0fdf4' }}>
                <Typography variant="caption" color="success.main" fontWeight="bold">MTD APPROVED</Typography>
                <Typography variant="h5" fontWeight="bold">{selectedEmp.approvedThisMonth} Days</Typography>
              </Paper>

              <Paper variant="outlined" sx={{ p: 2, bgcolor: '#fef2f2' }}>
                <Typography variant="caption" color="error.main" fontWeight="bold">MONTHLY DENIED</Typography>
                <Typography variant="h5" fontWeight="bold">{selectedEmp.deniedThisMonth} Days</Typography>
              </Paper>

              <Paper variant="outlined" sx={{ p: 2, bgcolor: '#eff6ff', border: '1px solid #bfdbfe' }}>
                <Typography variant="caption" color="primary.main" fontWeight="bold">YTD BALANCE (Available)</Typography>
                <Typography variant="h5" fontWeight="bold" color="primary.main">{selectedEmp.yearlyBalance} Days</Typography>
              </Paper>
            </Stack>

            <Button 
              fullWidth 
              variant="outlined" 
              sx={{ mt: 4 }} 
              onClick={() => setSelectedEmp(null)}
            >
              Close Details
            </Button>
          </Box>
        )}
      </Drawer>
    </Box>
  );
}