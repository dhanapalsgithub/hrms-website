"use client";

import { 
  AppBar, Toolbar, Box, InputBase, IconButton, 
  Badge, Typography, Avatar, Divider, Tooltip 
} from '@mui/material';
import { Bell, Search, LogOut, ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface HeaderProps {
  onLogout: () => void;
  userRole: 'manager' | 'employee';
}

export function Header({ onLogout, userRole }: HeaderProps) {
  const router = useRouter();

  // Full Logout: Clears state and redirects to Home
  const handleLogoutClick = () => {
    onLogout(); 
    router.push('/'); 
  };

  // Back Button: Specifically navigates to the Login/Selection view
  const handleBackToLogin = () => {
    // We navigate to '/' which represents your landing/login form state
    router.push('/'); 
  };

  return (
    <AppBar 
      position="static" 
      elevation={0} 
      sx={{ 
        bgcolor: 'white', 
        borderBottom: '1px solid #e5e7eb', 
        color: '#111827',
        zIndex: 1100 
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between', gap: 2 }}>
        
        {/* LEFT SECTION: Back Arrow & Search */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flex: 1 }}>
          <Tooltip title="Back to Login">
            <IconButton 
              onClick={handleBackToLogin} // Triggers navigation to LoginForm
              sx={{ 
                border: '1px solid #e5e7eb', 
                borderRadius: '8px',
                transition: 'all 0.2s',
                '&:hover': { 
                  bgcolor: '#f3f4f6',
                  transform: 'translateX(-3px)' // Subtle visual feedback
                } 
              }}
            >
              <ArrowLeft size={20} color="#374151" />
            </IconButton>
          </Tooltip>

          {/* Search Bar */}
          <Box sx={{ 
            display: { xs: 'none', md: 'flex' }, 
            alignItems: 'center', bgcolor: '#f3f4f6', 
            px: 2, py: 0.5, borderRadius: 2, width: '100%', maxWidth: 350 
          }}>
            <Search size={18} color="#9ca3af" />
            <InputBase 
              placeholder={userRole === 'manager' ? "Search team..." : "Search tasks..."} 
              sx={{ ml: 1, flex: 1, fontSize: '0.9rem' }} 
            />
          </Box>
        </Box>

        {/* RIGHT SECTION: Notifications, User Identity & Logout */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1, sm: 2 } }}>
          
          <IconButton size="small">
            <Badge variant="dot" color="error" overlap="circular">
              <Bell size={20} />
            </Badge>
          </IconButton>
          
          <Divider orientation="vertical" flexItem sx={{ mx: 0.5, height: 24, alignSelf: 'center' }} />
          
          {/* User Display Details */}
          <Box sx={{ display: { xs: 'none', sm: 'block' }, textAlign: 'right', mr: 1 }}>
            <Typography variant="body2" sx={{ fontWeight: 700, lineHeight: 1.2 }}>
              {userRole === 'manager' ? 'Admin Manager' : 'Rahul Sharma'}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {userRole === 'manager' ? 'HR Operations' : 'Senior Staff'}
            </Typography>
          </Box>

          {/* Logout Button */}
          <Tooltip title="Logout">
            <IconButton 
              onClick={handleLogoutClick} 
              sx={{ 
                p: 0.5, 
                gap: 1,
                border: '1px solid #e5e7eb',
                borderRadius: '12px',
                transition: 'all 0.2s',
                '&:hover': { 
                    bgcolor: '#fff1f2', 
                    borderColor: '#fecdd3',
                } 
              }}
            >
              <Avatar 
                sx={{ 
                  bgcolor: userRole === 'manager' ? '#1e293b' : '#059669', 
                  width: 32, height: 32, fontSize: '0.875rem'
                }}
              >
                {userRole === 'manager' ? 'AM' : 'RS'}
              </Avatar>
              <Box sx={{ display: 'flex', alignItems: 'center', pr: 1 }}>
                <LogOut size={18} color="#e11d48" />
                <Typography 
                    variant="button" 
                    sx={{ 
                        ml: 0.5, 
                        fontSize: '0.75rem', 
                        fontWeight: 700, 
                        color: '#e11d48', 
                        display: { xs: 'none', lg: 'block' } 
                    }}
                >
                    Logout
                </Typography>
              </Box>
            </IconButton>
          </Tooltip>
        </Box>
      </Toolbar>
    </AppBar>
  );
}