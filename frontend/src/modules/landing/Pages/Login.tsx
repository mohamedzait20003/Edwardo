import { type FC, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useGoogleLogin } from '@react-oauth/google';
import { toast } from 'react-toastify';

import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Box, TextField, Button, Typography, Container, Paper, Divider, IconButton, InputAdornment, Checkbox, FormControlLabel, CircularProgress, createTheme, ThemeProvider } from '@mui/material';

import { useLoginMutation, useGoogleLoginMutation } from '../../../store/apis/authApi';

const theme = createTheme({
    palette: {
        primary: {
            main: '#14B8A6',
            light: '#06B6D4',
            dark: '#0D9488',
        },
        secondary: {
            main: '#06B6D4',
        },
        background: {
            default: '#0F172A',
            paper: 'rgba(30, 41, 59, 0.5)',
        },
        text: {
            primary: '#F1F5F9',
            secondary: '#94A3B8',
        },
    },
    shape: {
        borderRadius: 12,
    },
});

const Login: FC = () => {
    const navigate = useNavigate();
    const [login, { isLoading }] = useLoginMutation();
    const [googleLogin, { isLoading: isGoogleLoading }] = useGoogleLoginMutation();

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        try {
            e.preventDefault();
            await login(formData).unwrap();
            toast.success('Welcome back to Edwardo!');
            navigate('/Dashboard');
        } catch (error: any) {
            toast.error(error?.data?.message || 'Login failed. Please try again.');
        }
    };

    const handleGoogleLogin = useGoogleLogin({
        onSuccess: async (tokenResponse) => {
            try {
                await googleLogin({ 
                    access_token: tokenResponse.access_token 
                }).unwrap();
                toast.success('Welcome to Edwardo!');
                navigate('/Dashboard');
            } catch (error: any) {
                toast.error(error?.data?.message || 'Google login failed. Please try again.');
            }
        },
        onError: () => {
            toast.error('Google login failed. Please try again.');
        },
    });

    return (
        <ThemeProvider theme={theme}>
            <Box
                sx={{
                    minHeight: '100vh',
                    background: 'linear-gradient(to bottom right, #0F172A, #1E293B, #0F172A)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    px: 2,
                    py: 6,
                    position: 'relative',
                }}
            >
                {/* Animated background elements */}
                <Box
                    sx={{
                        position: 'absolute',
                        inset: 0,
                        overflow: 'hidden',
                    }}
                >
                    <Box
                        className="animate-pulse"
                        sx={{
                            position: 'absolute',
                            top: '-10rem',
                            right: '-10rem',
                            width: '20rem',
                            height: '20rem',
                            bgcolor: 'rgba(20, 184, 166, 0.1)',
                            borderRadius: '50%',
                            filter: 'blur(80px)',
                        }}
                    />
                    <Box
                        className="animate-pulse"
                        sx={{
                            position: 'absolute',
                            bottom: '-10rem',
                            left: '-10rem',
                            width: '20rem',
                            height: '20rem',
                            bgcolor: 'rgba(6, 182, 212, 0.1)',
                            borderRadius: '50%',
                            filter: 'blur(80px)',
                            animationDelay: '1s',
                        }}
                    />
                </Box>

                <Container maxWidth="sm" sx={{ position: 'relative', zIndex: 1 }}>
                    {/* Logo */}
                    <Box className="animate-fade-in" sx={{ textAlign: 'center', mb: 4 }}>
                        <Link to="/Home" style={{ textDecoration: 'none' }}>
                            <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 1 }}>
                                <Box
                                    sx={{
                                        width: 48,
                                        height: 48,
                                        background: 'linear-gradient(to bottom right, #14B8A6, #06B6D4)',
                                        borderRadius: 2,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        boxShadow: '0 10px 15px -3px rgba(20, 184, 166, 0.3)',
                                        transition: 'all 0.3s',
                                        '&:hover': {
                                            boxShadow: '0 10px 15px -3px rgba(20, 184, 166, 0.5)',
                                        },
                                    }}
                                >
                                    <Typography variant="h4" sx={{ color: 'white', fontWeight: 'bold' }}>
                                        E
                                    </Typography>
                                </Box>
                                <Typography
                                    variant="h3"
                                    sx={{
                                        fontWeight: 'bold',
                                        background: 'linear-gradient(to right, #2DD4BF, #06B6D4)',
                                        WebkitBackgroundClip: 'text',
                                        WebkitTextFillColor: 'transparent',
                                    }}
                                >
                                    Edwardo
                                </Typography>
                            </Box>
                        </Link>
                        <Typography variant="body2" sx={{ mt: 1, color: 'text.secondary' }}>
                            Your Household's Chief of Operations
                        </Typography>
                    </Box>

                    {/* Login Card */}
                    <Paper
                        className="animate-slide-up"
                        elevation={24}
                        sx={{
                            bgcolor: 'rgba(30, 41, 59, 0.5)',
                            backdropFilter: 'blur(20px)',
                            border: '1px solid rgba(51, 65, 85, 0.5)',
                            borderRadius: 4,
                            p: 4,
                        }}
                    >
                        <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'text.primary', mb: 1, textAlign: 'center' }}>
                            Welcome Back
                        </Typography>
                        <Typography variant="body1" sx={{ color: 'text.secondary', mb: 4, textAlign: 'center' }}>
                            Sign in to continue managing your household
                        </Typography>

                        {/* Google Login Button */}
                        <Button
                            onClick={() => handleGoogleLogin()}
                            disabled={isGoogleLoading}
                            fullWidth
                            variant="outlined"
                            sx={{
                                bgcolor: 'white',
                                color: '#374151',
                                fontWeight: 600,
                                py: 1.5,
                                mb: 3,
                                border: 'none',
                                transition: 'all 0.3s',
                                '&:hover': {
                                    bgcolor: '#F9FAFB',
                                    transform: 'scale(1.02)',
                                    border: 'none',
                                },
                                '&:disabled': {
                                    opacity: 0.5,
                                },
                            }}
                            startIcon={
                                <svg width="20" height="20" viewBox="0 0 24 24">
                                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                                </svg>
                            }
                        >
                            {isGoogleLoading ? 'Signing in...' : 'Continue with Google'}
                        </Button>

                        <Divider sx={{ mb: 3 }}>
                            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                Or continue with email
                            </Typography>
                        </Divider>

                        {/* Login Form */}
                        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
                            <TextField
                                fullWidth
                                id="email"
                                name="email"
                                label="Email Address"
                                type="email"
                                required
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="you@example.com"
                                autoComplete="email"
                                sx={{
                                    mb: 3,
                                    '& .MuiOutlinedInput-root': {
                                        bgcolor: 'rgba(15, 23, 42, 0.5)',
                                        '& fieldset': {
                                            borderColor: 'rgba(71, 85, 105, 0.5)',
                                        },
                                        '&:hover fieldset': {
                                            borderColor: 'primary.main',
                                        },
                                    },
                                    '& .MuiInputLabel-root': {
                                        color: 'text.secondary',
                                    },
                                    '& input:-webkit-autofill': {
                                        WebkitBoxShadow: '0 0 0 100px rgba(15, 23, 42, 0.9) inset !important',
                                        WebkitTextFillColor: '#F1F5F9 !important',
                                        caretColor: '#F1F5F9',
                                        transition: 'background-color 5000s ease-in-out 0s',
                                    },
                                    '& input:-webkit-autofill:hover': {
                                        WebkitBoxShadow: '0 0 0 100px rgba(15, 23, 42, 0.9) inset !important',
                                        WebkitTextFillColor: '#F1F5F9 !important',
                                    },
                                    '& input:-webkit-autofill:focus': {
                                        WebkitBoxShadow: '0 0 0 100px rgba(15, 23, 42, 0.9) inset !important',
                                        WebkitTextFillColor: '#F1F5F9 !important',
                                    },
                                    '& input:-webkit-autofill:active': {
                                        WebkitBoxShadow: '0 0 0 100px rgba(15, 23, 42, 0.9) inset !important',
                                        WebkitTextFillColor: '#F1F5F9 !important',
                                    },
                                }}
                            />

                            <TextField
                                fullWidth
                                id="password"
                                name="password"
                                label="Password"
                                type={showPassword ? 'text' : 'password'}
                                required
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="••••••••"
                                autoComplete="current-password"
                                sx={{
                                    mb: 2,
                                    '& .MuiOutlinedInput-root': {
                                        bgcolor: 'rgba(15, 23, 42, 0.5)',
                                        '& fieldset': {
                                            borderColor: 'rgba(71, 85, 105, 0.5)',
                                        },
                                        '&:hover fieldset': {
                                            borderColor: 'primary.main',
                                        },
                                    },
                                    '& .MuiInputLabel-root': {
                                        color: 'text.secondary',
                                    },
                                    '& input:-webkit-autofill': {
                                        WebkitBoxShadow: '0 0 0 100px rgba(15, 23, 42, 0.9) inset !important',
                                        WebkitTextFillColor: '#F1F5F9 !important',
                                        caretColor: '#F1F5F9',
                                        transition: 'background-color 5000s ease-in-out 0s',
                                    },
                                    '& input:-webkit-autofill:hover': {
                                        WebkitBoxShadow: '0 0 0 100px rgba(15, 23, 42, 0.9) inset !important',
                                        WebkitTextFillColor: '#F1F5F9 !important',
                                    },
                                    '& input:-webkit-autofill:focus': {
                                        WebkitBoxShadow: '0 0 0 100px rgba(15, 23, 42, 0.9) inset !important',
                                        WebkitTextFillColor: '#F1F5F9 !important',
                                    },
                                    '& input:-webkit-autofill:active': {
                                        WebkitBoxShadow: '0 0 0 100px rgba(15, 23, 42, 0.9) inset !important',
                                        WebkitTextFillColor: '#F1F5F9 !important',
                                    },
                                }}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                onClick={() => setShowPassword(!showPassword)}
                                                edge="end"
                                                sx={{ color: 'text.secondary' }}
                                            >
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />

                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={rememberMe}
                                            onChange={(e) => setRememberMe(e.target.checked)}
                                            sx={{
                                                color: 'text.secondary',
                                                '&.Mui-checked': {
                                                    color: 'primary.main',
                                                },
                                            }}
                                        />
                                    }
                                    label={
                                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                            Remember me
                                        </Typography>
                                    }
                                />
                                <Link
                                    to="/forgot-password"
                                    style={{ textDecoration: 'none' }}
                                >
                                    <Typography
                                        variant="body2"
                                        sx={{
                                            color: 'primary.main',
                                            '&:hover': {
                                                color: 'primary.light',
                                            },
                                            transition: 'color 0.3s',
                                        }}
                                    >
                                        Forgot password?
                                    </Typography>
                                </Link>
                            </Box>

                            <Button
                                type="submit"
                                fullWidth
                                disabled={isLoading}
                                variant="contained"
                                sx={{
                                    py: 1.5,
                                    fontWeight: 600,
                                    background: 'linear-gradient(to right, #14B8A6, #06B6D4)',
                                    boxShadow: '0 10px 15px -3px rgba(20, 184, 166, 0.3)',
                                    transition: 'all 0.3s',
                                    '&:hover': {
                                        boxShadow: '0 10px 15px -3px rgba(20, 184, 166, 0.5)',
                                        transform: 'scale(1.02)',
                                        background: 'linear-gradient(to right, #14B8A6, #06B6D4)',
                                    },
                                    '&:disabled': {
                                        opacity: 0.5,
                                        transform: 'none',
                                    },
                                }}
                            >
                                {isLoading ? (
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                        <CircularProgress size={20} sx={{ color: 'white' }} />
                                        Signing in...
                                    </Box>
                                ) : (
                                    'Sign In'
                                )}
                            </Button>
                        </Box>

                        <Typography variant="body1" sx={{ mt: 4, textAlign: 'center', color: 'text.secondary' }}>
                            Don't have an account?{' '}
                            <Link to="/Register" style={{ textDecoration: 'none' }}>
                                <Typography
                                    component="span"
                                    sx={{
                                        color: 'primary.main',
                                        fontWeight: 600,
                                        '&:hover': {
                                            color: 'primary.light',
                                        },
                                        transition: 'color 0.3s',
                                    }}
                                >
                                    Sign up
                                </Typography>
                            </Link>
                        </Typography>
                    </Paper>

                    <Typography variant="body2" sx={{ mt: 3, textAlign: 'center', color: 'rgba(148, 163, 184, 0.7)' }}>
                        By continuing, you agree to Edwardo's{' '}
                        <Link to="/terms" style={{ textDecoration: 'none' }}>
                            <Typography
                                component="span"
                                variant="body2"
                                sx={{
                                    color: 'primary.main',
                                    '&:hover': {
                                        color: 'primary.light',
                                    },
                                    transition: 'color 0.3s',
                                }}
                            >
                                Terms of Service
                            </Typography>
                        </Link>{' '}
                        and{' '}
                        <Link to="/privacy" style={{ textDecoration: 'none' }}>
                            <Typography
                                component="span"
                                variant="body2"
                                sx={{
                                    color: 'primary.main',
                                    '&:hover': {
                                        color: 'primary.light',
                                    },
                                    transition: 'color 0.3s',
                                }}
                            >
                                Privacy Policy
                            </Typography>
                        </Link>
                    </Typography>
                </Container>
            </Box>
        </ThemeProvider>
    );
};

export default Login;
