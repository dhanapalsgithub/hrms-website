"use client";

import { useState } from 'react';
import {
  Box,
  Card,
  Typography,
  Button,
  TextField,
  InputAdornment
} from '@mui/material';
import Grid from '@mui/material/Grid'; // Updated to Grid2 to avoid the "item" prop error
import {
  ArrowLeft,
  User,
  ShieldCheck,
  Mail,
  Lock,
  Home as HomeIcon
} from 'lucide-react';
import styles from './LoginForm.module.css';
import SignUpForm from './SignUpForm';

type ViewState = 'login' | 'role' | 'signup';

interface LoginFormProps {
  onLogin: (role: 'manager' | 'employee') => void;
  onBackToHome: () => void; // Function to return to the landing page
}

export default function LoginForm({ onLogin, onBackToHome }: LoginFormProps) {
  const [view, setView] = useState<ViewState>('login');

  if (view === 'signup') {
    return <SignUpForm onBackToLogin={() => setView('login')} />;
  }

  if (view === 'login') {
    return (
      <Box className={styles.mainContainer}>
        {/* Left Panel: Branding & Curve */}
        <Box className={styles.leftBrandPanel}>
          <Typography className={styles.brandLogo}>R & I Worksphere</Typography>

          <Box className={styles.heroTextContainer}>
            <Typography variant="h2" className={styles.brandHeadline}>
              Welcome <br /> Back
            </Typography>
            <Typography className={styles.brandSubtext}>
              Empowering your workforce.
            </Typography>
          </Box>

          <Box className={styles.illustrationContainer}>
            <img
              src="https://illustrations.popsy.co/white/remote-work.svg"
              alt="HR Management"
              className={styles.brandImage}
            />
          </Box>
        </Box>

        {/* Right Panel: Form */}
        <Box className={styles.rightAuthPanel}>
          <Box className={styles.loginCard}>
            <Box className={styles.topNav}>
              {/* BACK TO HOME ACTION */}
              <Box
                className={styles.navItem}
                onClick={onBackToHome}
                sx={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 0.5 }}
              >
                <HomeIcon size={16} />
                <Typography variant="body2" fontWeight={600}>Home</Typography>
              </Box>

              <Box
                className={`${styles.navItem} ${styles.signUpLink}`}
                onClick={() => setView('signup')}
                sx={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 0.5 }}
              >
                <User size={16} />
                <Typography variant="body2" fontWeight={600}>Sign up</Typography>
              </Box>
            </Box>

            <Box component="form" className={styles.formContent}>
              <TextField
                fullWidth
                placeholder="Email Address"
                variant="standard"
                className={styles.textField}
                sx={{ mb: 4 }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Mail size={20} color="#666" />
                    </InputAdornment>
                  ),
                }}
              />

              <TextField
                fullWidth
                type="password"
                placeholder="Password"
                variant="standard"
                className={styles.textField}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock size={20} color="#666" />
                    </InputAdornment>
                  ),
                }}
              />

              <Typography className={styles.forgotPassword}>
                Forgot Password?
              </Typography>

              <Button
                fullWidth
                variant="contained"
                onClick={() => setView('role')}
                className={styles.loginButton}
              >
                LOGIN
              </Button>

              <Typography className={styles.footerText}>
                Your Property, Our Platform, Endless Possibility
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    );
  }

  return (
    <Box
      className={styles.roleSelectionContainer}
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        backgroundImage: `linear-gradient(rgba(8, 3, 15, 0.1), rgba(21, 97, 184, 0.75)), url('https://cdn.pixabay.com/photo/2012/02/22/19/38/business-15498_1280.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backdropFilter: 'blur(1px)',//urs the office slightly for a premium feel
      }}
    >
      <Button
        startIcon={<ArrowLeft size={18} />}
        onClick={() => setView('login')}
        className={styles.backButton}
        sx={{ mb: 4, color:'#242845',}
        }
      >
        Back
      </Button>

      <Typography variant="h3" className={styles.roleBrandTitle}>R & I Worksphere</Typography>
      <Typography variant="h6" className={styles.roleSubTitle} sx={{ mb: 4 }}>
        Select your portal to continue
      </Typography>

      <Grid container spacing={3} className={styles.roleGrid} sx={{ maxWidth: 800, mx: 'auto' }}>
        <Grid size={{ xs: 12, sm: 6 }}>
          <Card onClick={() => onLogin('manager')} className={styles.selectionCard} sx={{ p: 4, textAlign: 'center', cursor: 'pointer' }}>
            <Box className={styles.iconWrapperManager} sx={{ mb: 2 }}>
              <ShieldCheck size={30} color="#242845" />
            </Box>
            <Typography variant="h5" fontWeight="700">Manager</Typography>
            <Typography variant="body2" color="text.secondary">Administration </Typography>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, sm: 6 }}>
          <Card
            onClick={() => onLogin('employee')}
            sx={{
              p: 4,
              textAlign: 'center',
              cursor: 'pointer',
              borderRadius: '24px',
              background: 'rgba(255, 255, 255, 0.9)', // Soft white
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.15)',
              transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
              '&:hover': {
                transform: 'translateY(-10px)',
                boxShadow: '0 20px 40px rgba(0,0,0,0.12)',
                background: '#ffffff',
              }
            }}
          >
            <Box
              sx={{
                mb: 3,
                display: 'inline-flex',
                p: 2,
                borderRadius: '16px',
                bgcolor: 'rgba(36, 40, 69, 0.05)',
                transition: '0.3s',
              }}
              className="icon-container"
            >
              <User size={40} color="#242845" />
            </Box>
            <Typography variant="h5" fontWeight="800" sx={{ color: '#242845', mb: 1 }}>
              Employee
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: '#64748b',
                textTransform: 'uppercase',
                letterSpacing: '1px',
                fontWeight: 600,
                fontSize: '0.75rem'
              }}
            >
              Attendance
            </Typography>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}