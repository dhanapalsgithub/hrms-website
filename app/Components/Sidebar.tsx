"use client";

import { 
  Box, List, ListItem, ListItemButton, ListItemIcon, 
  ListItemText, Typography, Drawer 
} from "@mui/material";
import { 
  LayoutDashboard, Users, Calendar, ClipboardList, 
  Settings, IndianRupee 
} from "lucide-react";

export type Page = "dashboard" | "employees" | "leave" | "attendance" | "payroll" | "integrations";

interface SidebarProps {
  currentPage: Page;
  onPageChange: (page: Page) => void;
  userRole: 'manager' | 'employee';
  isMobileOpen?: boolean;      // மொபைல் வியூவிற்காக
  onMobileClose?: () => void;  // மொபைல் வியூவிற்காக
}

export function Sidebar({ currentPage, onPageChange, userRole, isMobileOpen, onMobileClose }: SidebarProps) {
  
  const menuItems = [
    { id: "dashboard" as Page, label: "Dashboard", icon: LayoutDashboard, roles: ['manager', 'employee'] },
    { id: "attendance" as Page, label: "Attendance", icon: ClipboardList, roles: ['manager', 'employee'] },
    { id: "leave" as Page, label: "Leave Mgmt", icon: Calendar, roles: ['manager', 'employee'] },
    { id: "employees" as Page, label: "Employees", icon: Users, roles: ['manager'] },
    { id: "payroll" as Page, label: "Payroll", icon: IndianRupee, roles: ['manager'] },
    { id: "integrations" as Page, label: "Integrations", icon: Settings, roles: ['manager'] },
  ];

  const filteredMenuItems = menuItems.filter(item => item.roles.includes(userRole));

  // மெனு உள்ளடக்கம் (Desktop மற்றும் Mobile இரண்டிற்கும் பொதுவானது)
  const sidebarContent = (
    <Box sx={{ width: 240, display: 'flex', flexDirection: 'column', height: '100%', bgcolor: 'white' }}>
      <Box sx={{ p: 2.5, borderBottom: '1px solid #f1f5f9' }}>
        <Typography variant="h6" sx={{ color: '#2563eb', fontWeight: 800, fontSize: '1.1rem' }}>
          R & I<br />WorkSphere
        </Typography>
        <Typography variant="caption" sx={{ color: '#94a3b8', fontWeight: 600 }}>
          {userRole} Portal
        </Typography>
      </Box>

      <List sx={{ flex: 1, px: 1.5, mt: 2 }}>
        {filteredMenuItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPage === item.id;
          return (
            <ListItem key={item.id} disablePadding sx={{ mb: 0.5 }}>
              <ListItemButton
                onClick={() => {
                  onPageChange(item.id);
                  if (onMobileClose) onMobileClose(); // கிளிக் செய்ததும் மொபைலில் மெனு மூடும்
                }}
                sx={{
                  borderRadius: '10px',
                  bgcolor: isActive ? '#eff6ff' : 'transparent',
                  color: isActive ? '#2563eb' : '#475569',
                }}
              >
                <ListItemIcon sx={{ minWidth: 35, color: 'inherit' }}>
                  <Icon size={19} />
                </ListItemIcon>
                <ListItemText primary={item.label} primaryTypographyProps={{ fontSize: '0.85rem', fontWeight: isActive ? 700 : 500 }} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
      
      <Box sx={{ p: 2, borderTop: '1px solid #f1f5f9' }}>
        <Typography variant="caption" sx={{ color: '#cbd5e1', display: 'block', textAlign: 'center', fontSize: '0.7rem' }}>
          v1.0.4 • WorkSphere
        </Typography>
      </Box>
    </Box>
  );

  return (
    <>
      {/* 1. மொபைல் வியூ (Temporary Drawer) */}
      <Drawer
        variant="temporary"
        open={isMobileOpen}
        onClose={onMobileClose}
        ModalProps={{ keepMounted: true }}
        sx={{ display: { xs: 'block', md: 'none' } }}
      >
        {sidebarContent}
      </Drawer>

      {/* 2. டெஸ்க்டாப் வியூ (Permanent Drawer) */}
      <Box sx={{ display: { xs: 'none', md: 'block' }, height: '100%' }}>
        {sidebarContent}
      </Box>
    </>
  );
}