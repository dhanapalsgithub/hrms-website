import {
    Box, Typography, Grid, Paper, Card, CardContent,
    List, ListItem, ListItemAvatar, ListItemText, Divider, Avatar
} from '@mui/material';
import { Users, UserCheck, UserX, Calendar } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export function Dashboard() {
    // --- Data Arrays (Defined inside the component) ---
    const stats = [
        { label: 'Total Employees', value: '154', icon: Users },
        { label: 'Present Today', value: '142', icon: UserCheck },
        { label: 'On Leave', value: '8', icon: Calendar },
        { label: 'Absent', value: '4', icon: UserX },
    ];

    const attendanceData = [
        { month: 'Jan', present: 110 },
        { month: 'Feb', present: 130 },
        { month: 'Mar', present: 150 },
        { month: 'Apr', present: 142 },
        { month: 'May', present: 148 },
        { month: 'Jun', present: 154 },
    ];

    const recentActivities = [
        { employee: 'Sarah Johnson', action: 'Requested Vacation', time: '2h ago' },
        { employee: 'Michael Chen', action: 'Checked In', time: '3h ago' },
        { employee: 'Emma Wilson', action: 'Checked Out', time: '5h ago' },
    ];

    return (
        <Box sx={{ p: 3 }}>
            <Box sx={{ mb: 4 }}>
                <Typography variant="h5" fontWeight="bold">Dashboard Overview</Typography>
                <Typography variant="body2" color="text.secondary">Welcome back! Here's what's happening today.</Typography>
            </Box>

            {/* Stats Cards - Updated to Grid size syntax */}
            <Grid container spacing={3} sx={{ mb: 4 }}>
                {stats.map((stat) => (
                    <Grid size={{ xs: 12, sm: 6, md: 3 }} key={stat.label}>
                        <Card variant="outlined" sx={{ borderRadius: 2 }}>
                            <CardContent sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Box>
                                    <Typography variant="body2" color="text.secondary">{stat.label}</Typography>
                                    <Typography variant="h5" fontWeight="bold">{stat.value}</Typography>
                                </Box>
                                <Box sx={{ p: 1.5, borderRadius: 2, bgcolor: '#eff6ff', color: '#2563eb', display: 'flex' }}>
                                    <stat.icon size={24} />
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            {/* Charts and Activities */}
            <Grid container spacing={3}>
                {/* Attendance Trend Chart */}
                <Grid size={{ xs: 12, lg: 7 }}>
                    <Paper variant="outlined" sx={{ p: 3, borderRadius: 2 }}>
                        <Typography variant="h6" sx={{ mb: 3, fontWeight: 'bold' }}>Attendance Trend</Typography>
                        <Box sx={{ height: 300 }}>
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={attendanceData}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                    <XAxis dataKey="month" axisLine={false} tickLine={false} />
                                    <YAxis axisLine={false} tickLine={false} />
                                    <Tooltip cursor={{ fill: '#f3f4f6' }} />
                                    <Bar dataKey="present" fill="#2563eb" radius={[4, 4, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </Box>
                    </Paper>
                </Grid>

                {/* Recent Activity List */}
                <Grid size={{ xs: 12, lg: 5 }}>
                    <Paper variant="outlined" sx={{ p: 3, borderRadius: 2 }}>
                        <Typography variant="h6" sx={{ mb: 3, fontWeight: 'bold' }}>Recent Activity</Typography>
                        <List disablePadding>
                            {recentActivities.map((activity, index) => (
                                <Box key={index}>
                                    <ListItem sx={{ px: 0, py: 1.5 }}>
                                        <ListItemAvatar>
                                            <Avatar sx={{ bgcolor: '#f3f4f6', color: '#6b7280' }}>
                                                <Users size={18} />
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText
                                            primary={activity.employee}
                                            secondary={activity.action}
                                            primaryTypographyProps={{ variant: 'body2', fontWeight: 600 }}
                                        />
                                        <Typography variant="caption" color="text.secondary">{activity.time}</Typography>
                                    </ListItem>
                                    {index < recentActivities.length - 1 && <Divider />}
                                </Box>
                            ))}
                        </List>
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
}