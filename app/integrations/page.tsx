"use client";

import { useState, useEffect } from 'react';
import { 
  Box, Typography, Card, CardContent, Button, 
  Avatar, CircularProgress, Alert,  Grid 
} from '@mui/material';
import { Mail, MessageSquare, Video } from 'lucide-react';

export default function IntegrationsPage() {
  const [apps, setApps] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  // Hydration பிழையைத் தவிர்க்க Mounted செக்
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const fetchIntegrations = async () => {
      try {
        setError(null);
        // சோதனைக்காக JSONPlaceholder API
        const response = await fetch('https://jsonplaceholder.typicode.com/users'); 
        
        if (!response.ok) {
          throw new Error('தரவுகளைப் பெற முடியவில்லை');
        }

        const data = await response.json();
        
        // API தரவை Apps அமைப்பிற்கு மாற்றுதல்
        const mappedData = data.slice(0, 3).map((user: any, index: number) => ({
          id: user.id,
          name: index === 0 ? 'Google Workspace' : index === 1 ? 'Slack' : 'Zoom Meetings',
          desc: index === 0 ? 'Sync emails and calendar events.' : 
                index === 1 ? 'Get real-time attendance alerts.' : 
                'Schedule interviews directly.',
          icon: index === 0 ? <Mail color="#EA4335" /> : 
                index === 1 ? <MessageSquare color="#4A154B" /> : 
                <Video color="#2D8CFF" />
        }));

        setApps(mappedData);
      } catch (err: any) {
        setError("API இணைப்பில் சிக்கல். தயவுசெய்து பிறகு முயற்சிக்கவும்.");
      } finally {
        setLoading(false);
      }
    };

    fetchIntegrations();
  }, [mounted]);

  // சர்வர் மற்றும் கிளைண்ட் HTML மேட்ச் ஆவதை உறுதி செய்கிறது
  if (!mounted) return null;

  if (loading) {
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', mt: 10, gap: 2 }}>
        <CircularProgress size={40} thickness={4} />
        <Typography color="text.secondary">Loading integrations...</Typography>
      </Box>
    );
  }

  return (
    <Box>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" fontWeight="800" sx={{ color: '#1e293b', mb: 1 }}>
          Integrations
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Connect your favorite tools to streamline your workflow.
        </Typography>
      </Box>
      
      {error && (
        <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>{error}</Alert>
      )}

      {/* Grid2 ஐப் பயன்படுத்தி கச்சிதமான டிசைன் */}
      <Grid container spacing={3}>
        {apps.map((app) => (
          <Grid size={{ xs: 12, sm: 6, md: 4 }} key={app.id}>
            <Card 
              variant="outlined" 
              sx={{ 
                borderRadius: 4, 
                transition: 'all 0.2s',
                '&:hover': { transform: 'translateY(-4px)', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }
              }}
            >
              <CardContent sx={{ textAlign: 'center', p: 4 }}>
                <Avatar 
                  sx={{ 
                    bgcolor: '#f8fafc', 
                    mb: 3, 
                    mx: 'auto', 
                    width: 64, 
                    height: 64,
                    border: '1px solid #f1f5f9'
                  }}
                >
                  {app.icon}
                </Avatar>
                <Typography variant="h6" fontWeight="700" sx={{ mb: 1 }}>
                  {app.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 4, minHeight: '40px' }}>
                  {app.desc}
                </Typography>
                <Button 
                  variant="outlined" 
                  fullWidth 
                  sx={{ 
                    textTransform: 'none', 
                    borderRadius: '10px',
                    fontWeight: 600,
                    py: 1
                  }}
                >
                  Connect Now
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}