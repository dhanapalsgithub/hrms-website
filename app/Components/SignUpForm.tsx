"use client";

import { useState, useMemo } from 'react';
import {
  Box,
  Typography,
  Button,
  TextField,
  Card,
  Container,
   Grid,
  Dialog,
  DialogContent,
  Zoom,
  InputAdornment,
  IconButton,
  Alert,
  LinearProgress
} from '@mui/material';
import { ArrowLeft, ChevronsLeft, Globe, Eye, EyeOff, Mail } from 'lucide-react';

type Step = 'purpose' | 'details';

interface SignUpFormProps {
  onBackToLogin: () => void;
}

export default function SignUpForm({ onBackToLogin }: SignUpFormProps) {
  const [step, setStep] = useState<Step>('purpose');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState('');

  const existingUsers = ['admin@company.com', 'test@test.com'];

  // --- Real-time Password Strength Logic ---
  const getPasswordStrength = (pwd: string) => {
    let score = 0;
    if (!pwd) return { score: 0, color: '#e2e8f0', label: '' };
    
    if (pwd.length >= 6) score += 25;
    if (pwd.length >= 10) score += 25;
    if (/[0-9]/.test(pwd)) score += 25;
    if (/[^A-Za-z0-9]/.test(pwd)) score += 25;

    if (score <= 25) return { score, color: '#ef4444', label: 'Weak' }; 
    if (score <= 50) return { score, color: '#f97316', label: 'Fair' }; 
    if (score <= 75) return { score, color: '#eab308', label: 'Good' }; 
    return { score, color: '#22c55e', label: 'Strong' }; 
  };

  const strength = useMemo(() => getPasswordStrength(password), [password]);

  const validateEmail = (email: string) => /\S+@\S+\.\S+/.test(email);

  const handleRegister = () => {
    setError('');
    if (!validateEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }
    if (existingUsers.includes(email.toLowerCase())) {
      setError('This email is already registered.');
      return;
    }
    setShowSuccess(true);
  };

  return (
    <Box sx={{ minHeight: '100vh', background: 'linear-gradient(180deg, #d9dad6c9 0%, #5276b3c9 100%)' }}>
      {/* Top Nav */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', p: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: '#64748b' }}>
          <Globe size={20} />
          <Typography variant="caption" sx={{ fontWeight: 700 }}>EN</Typography>
        </Box>
        <Button 
          variant="contained" 
          startIcon={<ChevronsLeft size={18} />}
          onClick={onBackToLogin}
          sx={{ bgcolor: '#242845', borderRadius: '10px', textTransform: 'none' }}
        >
          Login
        </Button>
      </Box>

      <Container maxWidth="lg" sx={{ pt: 4, pb: 8 }}>
        {step === 'purpose' ? (
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h3" sx={{ fontWeight: 800, mb: 1, color: '#0f172a' }}>Join the platform</Typography>
            <Grid container spacing={3} justifyContent="center" sx={{ mt: 4 }}>
              {[
                { id: 'emp', title: 'The Employee', img: 'https://cdn.pixabay.com/photo/2024/04/05/17/15/man-8677824_1280.png' },
                { id: 'mgr', title: 'The Manager', img: 'https://cdn.pixabay.com/photo/2017/05/16/13/41/work-2317806_1280.png' },
                { id: 'hr', title: 'The HR Admin', img: 'https://cdn-icons-png.flaticon.com/512/7858/7858502.png' }
              ].map((item) => (
                <Grid key={item.id} size={{ xs: 12, sm: 4 }}>
                  <Card 
                    onClick={() => { setRole(item.title); setStep('details'); }} 
                    sx={{ p: 4, borderRadius: '24px', textAlign: 'center', cursor: 'pointer', bgcolor: '#242845', color: '#fff', transition: '0.3s', '&:hover': { transform: 'translateY(-5px)' } }}
                  >
                    <Box component="img" src={item.img} sx={{ width: 80, mb: 2 }} />
                    <Typography variant="h6" fontWeight={800}>{item.title}</Typography>
                    
                  </Card>
                  
                </Grid>
              ))}
            </Grid>
            <Typography 
  variant="body2" 
  sx={{ 
    opacity: 0.8, 
    fontSize: '20px',
    color: '#242845',
    marginTop :'50px',
    lineHeight: 1.4 // Optional: improves readability at larger font sizes
  }}
>
  A comprehensive software suite designed to manage an organization’s most valuable asset: its people. 
  It acts as a digital "brain" for the company, centralizing all employee data and automating the 
  lifecycle of a staff member—from the day they apply for a job to the day they retire.
</Typography>
          </Box>
        ) : (
          <Box sx={{ maxWidth: 440, mx: 'auto' }}>
            <Button startIcon={<ArrowLeft />} onClick={() => setStep('purpose')} sx={{ mb: 2, color: '#7592b9ff' }}>Back</Button>
            <Typography variant="h4" fontWeight={800} mb={3}>Account Setup</Typography>

            {error && <Alert severity="error" sx={{ mb: 2, borderRadius: '12px' }}>{error}</Alert>}

            {/* --- LINE STYLE INPUT (Email) --- */}
            <TextField
              fullWidth 
              label="Email Address" 
              variant="standard" 
              sx={{ mb: 4 }}
              value={email} 
              onChange={(e) => setEmail(e.target.value)}
              error={email !== '' && !validateEmail(email)}
              helperText={email !== '' && !validateEmail(email) ? "Please enter a valid email format" : ""}
            />

            {/* --- LINE STYLE INPUT (Password) --- */}
            <Box sx={{ mb: 4 }}>
              <TextField
                fullWidth 
                label="Set Password" 
                variant="standard"
                type={showPassword ? 'text' : 'password'}
                value={password} 
                onChange={(e) => setPassword(e.target.value)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
              {password.length > 0 && (
                <Box sx={{ mt: 2 }}>
                  <LinearProgress 
                    variant="determinate" 
                    value={strength.score} 
                    sx={{ 
                      height: 4, 
                      borderRadius: 2, 
                      bgcolor: '#e2e8f0', 
                      '& .MuiLinearProgress-bar': { bgcolor: strength.color } 
                    }} 
                  />
                  <Typography variant="caption" sx={{ color: strength.color, fontWeight: 700, mt: 0.5, display: 'block' }}>
                    {strength.label} Strength
                  </Typography>
                </Box>
              )}
            </Box>

            <Button
              fullWidth variant="contained" size="large" onClick={handleRegister}
              disabled={!email || !password}
              sx={{ py: 2, borderRadius: '12px', fontWeight: 700, bgcolor: '#2563eb', transition: '0.3s', '&:hover': { bgcolor: '#1d4ed8' } }}
            >
              Create Account
            </Button>
          </Box>
        )}
      </Container>

      {/* Activation Dialog */}
      <Dialog open={showSuccess} TransitionComponent={Zoom} PaperProps={{ sx: { borderRadius: '24px', bgcolor: '#242845', color: '#fff', p: 4, textAlign: 'center' } }}>
        <DialogContent>
          <Mail size={48} color="#4ade80" style={{ marginBottom: '16px' }} />
          <Typography variant="h5" fontWeight={800} mb={2}>Check your Inbox</Typography>
          <Typography sx={{ opacity: 0.8, mb: 4 }}>We sent an activation link to <b>{email}</b>. Click the button below to simulate the activation process.</Typography>
          <Button 
            fullWidth variant="contained" onClick={onBackToLogin}
            sx={{ bgcolor: '#4ade80', color: '#242845', fontWeight: 800, py: 1.5, borderRadius: '12px', '&:hover': { bgcolor: '#22c55e' } }}
          >
            Active your account
          </Button>
        </DialogContent>
      </Dialog>
    </Box>
  );
}