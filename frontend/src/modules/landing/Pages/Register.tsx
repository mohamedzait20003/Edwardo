import { type FC, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useGoogleLogin } from '@react-oauth/google';
import { toast } from 'react-toastify';

import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Box, TextField, Button, Typography, Container, Paper, Divider, IconButton, InputAdornment, CircularProgress, createTheme, ThemeProvider } from '@mui/material';

import { useRegisterMutation, useGoogleLoginMutation } from '../../../store/apis/authApi';

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

const Register: FC = () => {
    const navigate = useNavigate();
    const [register, { isLoading }] = useRegisterMutation();
    const [googleLogin, { isLoading: isGoogleLoading }] = useGoogleLoginMutation();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        try {
            e.preventDefault();
        
            if (formData.password !== formData.confirmPassword) {
                toast.error('Passwords do not match');
                return;
            }

            if (formData.password.length < 8) {
                toast.error('Password must be at least 8 characters long');
                return;
            }

            const { confirmPassword, ...registerData } = formData;
            await register(registerData).unwrap();
            toast.success('Account created successfully! Welcome to Edwardo!');
            navigate('/Dashboard');
        } catch (error: any) {
            toast.error(error?.data?.message || 'Registration failed. Please try again.');
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
                toast.error(error?.data?.message || 'Google sign up failed. Please try again.');
            }
        },
        onError: () => {
            toast.error('Google sign up failed. Please try again.');
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
                            top: '50%',
                            left: '25%',
                            width: '15rem',
                            height: '15rem',
                            bgcolor: 'rgba(6, 182, 212, 0.1)',
                            borderRadius: '50%',
                            filter: 'blur(80px)',
                            animationDelay: '500ms',
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
                            bgcolor: 'rgba(59, 130, 246, 0.1)',
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

                    {/* Register Card */}
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
                            Create Account
                        </Typography>
                        <Typography variant="body1" sx={{ color: 'text.secondary', mb: 4, textAlign: 'center' }}>
                            Get started with your AI household manager
                        </Typography>

                        {/* Google Sign Up Button */}
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
                            {isGoogleLoading ? 'Signing up...' : 'Continue with Google'}
                        </Button>

                        <Divider sx={{ mb: 3 }}>
                            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                Or register with email
                            </Typography>
                        </Divider>

                        {/* Register Form */}
                        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
                            <TextField
                                fullWidth
                                id="name"
                                name="name"
                                label="Full Name"
                                type="text"
                                required
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="John Doe"
                                autoComplete="name"
                                sx={{
                                    mb: 2.5,
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
                                    mb: 2.5,
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
                                autoComplete="new-password"
                                sx={{
                                    mb: 1,
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
                            <Typography variant="caption" sx={{ color: 'rgba(148, 163, 184, 0.7)', mb: 2.5, display: 'block' }}>
                                Must be at least 8 characters
                            </Typography>

                            <TextField
                                fullWidth
                                id="confirmPassword"
                                name="confirmPassword"
                                label="Confirm Password"
                                type={showConfirmPassword ? 'text' : 'password'}
                                required
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                placeholder="••••••••"
                                autoComplete="new-password"
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
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                edge="end"
                                                sx={{ color: 'text.secondary' }}
                                            >
                                                {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />

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
                                        Creating account...
                                    </Box>
                                ) : (
                                    'Create Account'
                                )}
                            </Button>
                        </Box>

                        <Typography variant="body1" sx={{ mt: 4, textAlign: 'center', color: 'text.secondary' }}>
                            Already have an account?{' '}
                            <Link to="/Login" style={{ textDecoration: 'none' }}>
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
                                    Sign in
                                </Typography>
                            </Link>
                        </Typography>
                    </Paper>

                    <Typography variant="body2" sx={{ mt: 3, textAlign: 'center', color: 'rgba(148, 163, 184, 0.7)' }}>
                        By creating an account, you agree to Edwardo's{' '}
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

export default Register;
