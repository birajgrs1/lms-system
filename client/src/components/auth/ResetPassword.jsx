import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { 
  Box, 
  TextField, 
  Button, 
  CircularProgress,
  Typography,
  Link
} from '@mui/material';
import { useDispatch } from 'react-redux';
import { resetPassword } from '../../features/auth/authSlice';

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!password || !confirmPassword) {
      setError('Both fields are required');
      return;
    }
    
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    try {
      setLoading(true);
      setError('');
      await dispatch(resetPassword({ token, newPassword: password }));
      setSuccess(true);
    } catch (err) {
      console.error(err);
      setError('Password reset failed. Token may be invalid or expired.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <Box sx={{ textAlign: 'center', p: 4 }}>
        <Typography variant="h5" gutterBottom>
          Password Changed Successfully!
        </Typography>
        <Typography sx={{ mb: 3 }}>
          Your password has been updated successfully.
        </Typography>
        <Button 
          variant="contained" 
          onClick={() => navigate('/auth')}
          sx={{ mt: 2 }}
        >
          Sign In Now
        </Button>
      </Box>
    );
  }

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ 
      maxWidth: 400, 
      mx: 'auto', 
      p: 3,
      display: 'flex',
      flexDirection: 'column',
      minHeight: '70vh',
      justifyContent: 'center'
    }}>
      <Typography variant="h5" gutterBottom sx={{ textAlign: 'center' }}>
        Reset Your Password
      </Typography>
      
      <TextField
        label="New Password"
        type="password"
        fullWidth
        margin="normal"
        required
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        sx={{ mb: 2 }}
      />
      
      <TextField
        label="Confirm Password"
        type="password"
        fullWidth
        margin="normal"
        required
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        error={!!error}
        helperText={error}
        sx={{ mb: 2 }}
      />
      
      <Button
        type="submit"
        fullWidth
        variant="contained"
        disabled={loading}
        sx={{ py: 1.5, mt: 2 }}
      >
        {loading ? <CircularProgress size={24} /> : "Reset Password"}
      </Button>
      
      <Box sx={{ textAlign: 'center', mt: 2 }}>
        <Link href="/auth" variant="body2">
          Back to Sign In
        </Link>
      </Box>
    </Box>
  );
};

export default ResetPassword;