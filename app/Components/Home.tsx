import React from 'react';
import { Box, Button, Typography, Container, Paper } from '@mui/material';
// Notice we import Grid2 as Grid
import Grid from '@mui/material/Grid'; 
import { Users, Clock, CreditCard } from 'lucide-react';
import './Home.css';

interface HomeProps {
  onGetStarted: () => void;
}

export const Home = ({ onGetStarted }: HomeProps) => {
  return (
    <Box className="home-container">
      <Container maxWidth="lg" className="hero-section">
        <Box>
          <Typography variant="overline" className="brand-overline">
            Welcome to the Future of Work
          </Typography>
          
          <Typography variant="h2" className="hero-title">
            Manage your Workforce with <br />
            <span className="brand-name">R & I Work Sphere</span>
          </Typography>
          
          <Typography variant="h6" className="hero-description">
            The ultimate HRMS solution for modern businesses. Streamline attendance, 
            automate payroll, and manage employee records in one powerful platform.
          </Typography>
          
          <Button 
            variant="contained" 
            className="get-started-btn"
            onClick={onGetStarted}
          >
            Get Started
          </Button>
        </Box>

        {/* In Grid2, we don't use the 'item' prop anymore */}
        <Grid container spacing={4} sx={{ mt: 6 }}>
          {[
            { title: 'Employee Management', desc: 'Centralized database for all staff info.', icon: <Users color="#2563eb" /> },
            { title: 'Attendance Tracking', desc: 'Real-time monitoring and reporting.', icon: <Clock color="#2563eb" /> },
            { title: 'Payroll Automation', desc: 'Error-free salary and tax processing.', icon: <CreditCard color="#2563eb" /> },
          ].map((feature, index) => (
            /* We use size instead of xs/md directly, and remove 'item' */
            <Grid size={{ xs: 12, md: 4 }} key={index}>
              <Paper elevation={0} className="feature-card">
                <Box className="feature-icon-wrapper">{feature.icon}</Box>
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
                    {feature.title}
                </Typography>
                <Typography sx={{ color: '#64748b' }}>
                    {feature.desc}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};