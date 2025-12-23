"use client";

import { useState } from 'react';
import { Box, Typography, Button, TextField, Divider, Card } from '@mui/material';
import Grid from '@mui/material/Grid'; // Using Grid2 for modern MUI support
import { ArrowLeft, Globe, X } from 'lucide-react';
import styles from './SignUpForm.module.css';

type Step = 'purpose' | 'details';

interface SignUpFormProps {
  onBackToLogin: () => void;
}

export default function SignUpForm({ onBackToLogin }: SignUpFormProps) {
  const [step, setStep] = useState<Step>('purpose');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');

  const handlePurposeSelect = (selectedRole: string) => {
    setRole(selectedRole);
    setStep('details');
  };

  return (
    <Box className={styles.container} sx={{ position: 'relative', minHeight: '100vh', pt: 8 }}>
      
      {/* TOP RIGHT BACK BUTTON */}
      <Box 
        sx={{ 
          position: 'absolute', 
          top: 24, 
          right: 24, 
          display: 'flex', 
          alignItems: 'center', 
          gap: 1,
          zIndex: 10
        }}
      >
        <Typography 
          variant="body2" 
          sx={{ display: { xs: 'none', sm: 'block' }, color: 'text.secondary' }}
        >
          Already have an account?
        </Typography>
        <Button 
          variant="text" 
          startIcon={<X size={18} />}
          onClick={onBackToLogin}
          sx={{ 
            fontWeight: 700, 
            color: '#2563eb',
            '&:hover': { backgroundColor: 'rgba(37, 99, 235, 0.04)' }
          }}
        >
          Login
        </Button>
      </Box>

      {/* Language/Globe Icon (Top Left) */}
      <Box sx={{ position: 'absolute', top: 24, left: 24 }}>
        <Globe size={20} color="#64748b" />
      </Box>

      {step === 'purpose' ? (
        <Box sx={{ textAlign: 'center', width: '100%', maxWidth: '1200px', mx: 'auto', px: 3 }}>
          <Typography variant="h4" className={styles.title} sx={{ fontWeight: 800, mb: 1 }}>
            What will you use the platform for?
          </Typography>
          <Typography className={styles.subtitle} sx={{ mb: 6, color: 'text.secondary' }}>
            Select one of the options below
          </Typography>

          <Grid container spacing={3} sx={{ justifyContent: 'center' }}>
            {[
              { id: 'manager', title: 'Hire people globally', desc: 'Hire in 150+ countries without opening an organization.', color: '#f3efff' },
              { id: 'contractor', title: 'Work as a contractor', desc: 'Work compliantly, automate invoicing, and avoid fees.', color: '#e0f2fe' },
              { id: 'profile', title: 'Create a profile', desc: 'Build your profile to unlock opportunities worldwide.', color: '#ffedd5' }
            ].map((item) => (
              <Grid size={{ xs: 12, md: 4 }} key={item.id}>
                <Card 
                  className={styles.purposeCard} 
                  onClick={() => handlePurposeSelect(item.title)}
                  sx={{ 
                    p: 4, 
                    cursor: 'pointer', 
                    height: '100%', 
                    transition: '0.3s', 
                    '&:hover': { transform: 'translateY(-5px)', boxShadow: 3 } 
                  }}
                >
                  <Box className={styles.iconBox} sx={{ bgcolor: item.color, width: 48, height: 48, borderRadius: '50%', mb: 3 }} />
                  <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>{item.title}</Typography>
                  <Typography variant="body2" color="text.secondary">{item.desc}</Typography>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      ) : (
        <Box className={styles.formWrapper} sx={{ maxWidth: 450, mx: 'auto', px: 3 }}>
          <Button 
            startIcon={<ArrowLeft size={18} />} 
            onClick={() => setStep('purpose')}
            sx={{ mb: 3, textTransform: 'none', color: 'text.secondary' }}
          >
             Back
          </Button>

          <Typography variant="h4" className={styles.title} sx={{ fontWeight: 800, mb: 1 }}>
            Create your {role.toLowerCase()} account
          </Typography>
          <Typography className={styles.subtitle} sx={{ mb: 4, color: 'text.secondary' }}>
            Sign up using the form, or your work Google account
          </Typography>

          <Button 
            fullWidth 
            variant="outlined" 
            className={styles.socialButton}
            startIcon={<img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/smartlock/google.svg" width="20" alt="google" />}
            sx={{ py: 1.5, mb: 3, borderRadius: 2, borderColor: '#e2e8f0', color: '#1e293b', textTransform: 'none' }}
          >
            Sign up with Google
          </Button>

          <Divider sx={{ mb: 3, color: 'text.disabled', fontSize: '0.875rem' }}>or</Divider>

          <TextField
            fullWidth
            label="Email address *"
            variant="outlined"
            sx={{ mb: 3 }}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Button 
            fullWidth 
            variant="contained" 
            disabled={!email}
            sx={{ 
              py: 2, 
              borderRadius: 2, 
              bgcolor: email ? '#2563eb' : '#e2e8f0',
              textTransform: 'none',
              fontWeight: 700
            }}
          >
            Continue
          </Button>

          <Typography sx={{ mt: 4, fontSize: '0.75rem', color: 'text.secondary', textAlign: 'center' }}>
            By creating your account, you confirm that you have read, understood, and agree to the 
            <span> WorkSphere Legal Hub</span>
          </Typography>
        </Box>
      )}
    </Box>
  );
}