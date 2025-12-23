"use client";

import { Card, Typography, Box, Button, Divider, Alert, Stack } from '@mui/material';
import Grid from '@mui/material/Grid'; // Using Grid2 for better mobile layout calculation
import { FileText, Calendar, Clock, BellRing } from 'lucide-react';

export function EmployeeDashboard() {
  return (
    <Box sx={{ 
      p: { xs: 2, sm: 3 }, 
      // Forces browsers to render text with high contrast and sharpness
      WebkitFontSmoothing: 'antialiased', 
      mozOsxFontSmoothing: 'grayscale',
      textRendering: 'optimizeLegibility',
      fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif'
    }}>
      
      <Typography 
        variant="h5" 
        sx={{ 
          fontWeight: 900, 
          mb: 3, 
          letterSpacing: '-0.02em', 
          fontSize: { xs: '1.6rem', md: '1.75rem' }, // Increased mobile size
          color: '#0f172a',
          lineHeight: 1.2
        }}
      >
        Welcome, Rahul
      </Typography>

      <Grid container spacing={2.5}>
        <Grid size={12}>
          <Alert 
            icon={<BellRing size={22} />} 
            severity="info" 
            sx={{ 
              borderRadius: '12px',
              fontSize: { xs: '0.95rem', sm: '1rem' }, // Larger for mobile
              fontWeight: 700, // Heavier weight is clearer on small screens
              color: '#0369a1', 
              border: '1px solid #bae6fd',
              '& .MuiAlert-message': { lineHeight: 1.4 }
            }}
          >
            HR Notice: Friday is a holiday for office maintenance work.
          </Alert>
        </Grid>

        {/* My Details Card */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Card sx={{ 
            p: 3, 
            borderRadius: '16px', 
            border: '2px solid #f1f5f9', // Thicker border for visual separation
            boxShadow: 'none',
            background: '#ffffff'
          }}>
            <Typography variant="subtitle2" sx={{ color: '#64748b', fontWeight: 800, textTransform: 'uppercase', fontSize: '0.75rem', letterSpacing: '0.05em' }}>
              My Details
            </Typography>
            <Typography variant="h6" sx={{ mt: 1.5, fontWeight: 900, color: '#0f172a', fontSize: '1.35rem' }}>
              Rahul Sharma
            </Typography>
            <Typography variant="body1" sx={{ color: '#475569', fontWeight: 600, mb: 2, fontSize: '0.9rem' }}>
              Senior Developer • EMP-1024
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Stack spacing={1}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                   <Typography variant="body2" sx={{ fontWeight: 800, color: '#1e293b' }}>Email</Typography>
                   <Typography variant="body2" sx={{ color: '#475569', fontWeight: 600 }}>rahul@riworks.com</Typography>
                </Box>
            </Stack>
          </Card>
        </Grid>

        {/* Leave Card */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Card sx={{ p: 3, borderRadius: '16px', border: '2px solid #f1f5f9', boxShadow: 'none' }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Typography variant="subtitle2" sx={{ color: '#64748b', fontWeight: 800 }}>REMAINING LEAVE</Typography>
              <Calendar size={24} color="#2563eb" />
            </Stack>
            <Typography variant="h2" sx={{ mt: 1, fontWeight: 900, color: '#2563eb', fontSize: { xs: '2.8rem', md: '3rem' } }}>
              14
              <Box component="span" sx={{ fontSize: '1.1rem', ml: 1, color: '#64748b', fontWeight: 700 }}>days</Box>
            </Typography>
            <Button variant="contained" sx={{ mt: 2, borderRadius: '8px', fontWeight: 800, textTransform: 'none', bgcolor: '#eff6ff', color: '#2563eb', boxShadow: 'none', '&:hover': { bgcolor: '#dbeafe' } }}>
              Apply Leave
            </Button>
          </Card>
        </Grid>

        {/* Attendance Card */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Card sx={{ p: 3, borderRadius: '16px', border: '2px solid #f1f5f9', boxShadow: 'none' }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Typography variant="subtitle2" sx={{ color: '#64748b', fontWeight: 800 }}>ATTENDANCE</Typography>
              <Clock size={24} color="#10b981" />
            </Stack>
            <Typography variant="h5" sx={{ mt: 2, fontWeight: 900, color: '#0f172a' }}>In: 09:15 AM</Typography>
            <Box sx={{ display: 'inline-flex', px: 2, py: 0.7, bgcolor: '#ecfdf5', borderRadius: '8px', mt: 1.5 }}>
              <Typography variant="caption" sx={{ color: '#059669', fontWeight: 900, fontSize: '0.8rem' }}>ON TIME</Typography>
            </Box>
          </Card>
        </Grid>

        {/* Salary Card */}
        <Grid size={12}>
          <Card sx={{ p: 3, borderRadius: '16px', border: '2px solid #f1f5f9', boxShadow: 'none' }}>
            <Typography variant="h6" sx={{ fontWeight: 900, mb: 2, color: '#0f172a' }}>Salary and Pay-Slip</Typography>
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, sm: 6 }}>
                <Box sx={{ p: 2.5, bgcolor: '#f8fafc', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                  <Typography variant="body2" sx={{ color: '#64748b', fontWeight: 700, mb: 0.5 }}>Gross Salary</Typography>
                  <Typography variant="h4" sx={{ fontWeight: 900, color: '#0f172a' }}>₹ 75,000</Typography>
                </Box>
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <Button 
                  variant="contained" 
                  fullWidth 
                  startIcon={<FileText size={20} />} 
                  sx={{ 
                    height: '100%', 
                    minHeight: '64px',
                    borderRadius: '12px', 
                    bgcolor: '#1e293b', 
                    fontWeight: 800, 
                    fontSize: '1rem',
                    textTransform: 'none',
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                  }}
                >
                  Download Pay Slip
                </Button>
              </Grid>
            </Grid>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}