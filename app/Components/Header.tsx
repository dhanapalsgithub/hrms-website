"use client";

import { 
  AppBar, Toolbar, Box, InputBase, IconButton, 
  Badge, Typography, Avatar, Divider, Tooltip 
} from '@mui/material';
import { Bell, Search, LogOut } from 'lucide-react';

// Props-க்கான Interface
interface HeaderProps {
  onLogout: () => void;
  userRole: 'manager' | 'employee';
}

export function Header({ onLogout, userRole }: HeaderProps) {
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
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        
        {/* Search Bar - Desktop-ல் மட்டும் தெரியும் */}
        <Box sx={{ 
          display: { xs: 'none', md: 'flex' }, 
          alignItems: 'center', bgcolor: '#f3f4f6', 
          px: 2, py: 0.5, borderRadius: 2, width: '100%', maxWidth: 400 
        }}>
          <Search size={18} color="#9ca3af" />
          <InputBase 
            placeholder={userRole === 'manager' ? "Search employees..." : "Search tasks..."} 
            sx={{ ml: 1, flex: 1, fontSize: '0.9rem' }} 
          />
        </Box>

        {/* மொபைலில் லோகோ பெயர் தெரிய (Space-க்காக) */}
        <Box sx={{ display: { xs: 'block', md: 'none' }, flexGrow: 1 }} />

        {/* Right Section: Notifications & Profile */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1, sm: 2 } }}>
          
          {/* Notification Icon */}
          <IconButton size="small">
            <Badge variant="dot" color="error">
              <Bell size={20} />
            </Badge>
          </IconButton>
          
          <Divider orientation="vertical" flexItem sx={{ mx: 0.5, height: 24, alignSelf: 'center' }} />
          
          {/* User Details */}
          <Box sx={{ display: { xs: 'none', sm: 'block' }, textAlign: 'right', mr: 1 }}>
            <Typography variant="body2" sx={{ fontWeight: 700, lineHeight: 1.2, textTransform: 'capitalize' }}>
              {userRole === 'manager' ? 'Admin Manager' : 'Rahul Sharma'}
            </Typography>
            <Typography variant="caption" color="text.secondary" sx={{ textTransform: 'capitalize' }}>
              {userRole === 'manager' ? 'Human Resources' : 'Senior Developer'}
            </Typography>
          </Box>

          {/* Logout/Profile Button */}
          <Tooltip title="Logout">
            <IconButton 
              onClick={onLogout} 
              sx={{ 
                p: 0.5, 
                border: '1px solid #e5e7eb',
                '&:hover': { bgcolor: '#fee2e2', borderColor: '#fca5a5' } 
              }}
            >
              <Avatar 
                sx={{ 
                  bgcolor: userRole === 'manager' ? '#2563eb' : '#10b981', 
                  width: 32, height: 32, fontSize: '1rem' 
                }}
              >
                {userRole === 'manager' ? 'A' : 'R'}
              </Avatar>
              <Box sx={{ ml: 1, display: 'flex', alignItems: 'center', pr: 0.5 }}>
                <LogOut size={16} color="#ef4444" />
              </Box>
            </IconButton>
          </Tooltip>

        </Box>
      </Toolbar>
    </AppBar>
  );
}