"use client";

import { useState, useEffect } from 'react';
import { Box, IconButton, AppBar, Toolbar, Typography } from '@mui/material';
import { Menu as MenuIcon } from 'lucide-react';

// Components
import { Sidebar, type Page } from './Components/Sidebar';
import { Header } from './Components/Header';
import LoginForm from './Components/LoginForm';
import { Home } from './Components/Home';

// Page Modules
import { Dashboard } from './Components/Dashboard';
import { EmployeeDashboard } from './Components/EmployeeDashboard';
import { Attendance } from './Components/Attendance';
import { LeaveManagement } from './Components/LeaveManagement';
import { EmployeeList } from './Components/EmployeeList';
import PayrollManagement from './Components/PayrollTable';
import IntegrationsPage from './integrations/page'; 


export default function App() {
  // --- States ---
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showLogin, setShowLogin] = useState(false); 
  const [userRole, setUserRole] = useState<'manager' | 'employee'>('employee');
  const [currentPage, setCurrentPage] = useState<Page>('dashboard');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  // --- Hydration Fix ---
  useEffect(() => {
    setMounted(true);
  }, []);

  // --- Handlers ---
  const handleLogin = (role: 'manager' | 'employee') => {
    setUserRole(role);
    setIsAuthenticated(true);
    setCurrentPage('dashboard');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setShowLogin(false); // Returns to Home Landing Page
    setCurrentPage('dashboard');
    setMobileOpen(false);
  };

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  // --- Router Logic ---
  const renderContent = () => {
    if (userRole === 'manager') {
      switch (currentPage) {
        case 'dashboard': return <Dashboard />;
        case 'employees': return <EmployeeList />;
        case 'attendance': return <Attendance />;
        case 'payroll': return <PayrollManagement />;
        case 'leave': return <LeaveManagement />;
        case 'integrations': return <IntegrationsPage />;
        default: return <Dashboard />;
      }
    }

    // Employee Role Pages
    switch (currentPage) {
      case 'dashboard': return <EmployeeDashboard />;
      case 'attendance': return <Attendance />;
      case 'leave': return <LeaveManagement />;
      default: return <EmployeeDashboard />;
    }
  };

  if (!mounted) return null;

  // --- VIEW 1: Landing Page (R & I Work Sphere Home) ---
  if (!isAuthenticated && !showLogin) {
    return <Home onGetStarted={() => setShowLogin(true)} />;
  }

  // --- VIEW 2: Authentication (Login / Sign Up / Role Selection) ---
  if (!isAuthenticated && showLogin) {
    return (
      <LoginForm 
        onLogin={handleLogin} 
        onBackToHome={() => setShowLogin(false)} 
      />
    );
  }

  // --- VIEW 3: Main HRMS Dashboard (Post-Login) ---
  return (
    <Box sx={{ display: 'flex', height: '100vh', width: '100vw', bgcolor: '#f8fafc', overflow: 'hidden' }}>
      
      {/* Sidebar Navigation */}
      <Box component="nav" sx={{ width: { md: 240 }, flexShrink: { md: 0 } }}>
        <Sidebar 
          userRole={userRole} 
          currentPage={currentPage} 
          onPageChange={setCurrentPage}
          isMobileOpen={mobileOpen}
          onMobileClose={handleDrawerToggle}
        />
      </Box>

      {/* Main Container */}
      <Box sx={{ 
        flexGrow: 1, 
        display: 'flex', 
        flexDirection: 'column', 
        width: { xs: '100%', md: 'calc(100% - 240px)' }, 
        height: '100vh', 
        overflow: 'hidden' 
      }}>
        
        {/* Mobile Header */}
        <AppBar position="static" color="inherit" elevation={0} sx={{ display: { md: 'none' }, borderBottom: '1px solid #e2e8f0' }}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleDrawerToggle} sx={{ mr: 2 }}>
              <MenuIcon size={20} />
            </IconButton>
            <Typography variant="subtitle1" sx={{ fontWeight: 800, color: '#2563eb' }}>
              R&I WorkSphere
            </Typography>
          </Toolbar>
        </AppBar>

        {/* Desktop Header */}
        <Header onLogout={handleLogout} userRole={userRole} />
        
        {/* Scrollable Page Body */}
        <Box sx={{ 
          p: { xs: 2, md: 4 }, 
          overflowY: 'auto', 
          flexGrow: 1, 
          bgcolor: '#f8fafc' 
        }}>
          <Box sx={{ maxWidth: '1600px', mx: 'auto' }}>
            {renderContent()}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}