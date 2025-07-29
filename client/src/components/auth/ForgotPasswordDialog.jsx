import { useState } from "react";
import { 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  Button, 
  TextField,
  CircularProgress,
  Alert
} from "@mui/material";

const ForgotPasswordDialog = ({ open, onClose }) => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!email) {
      setError("Email is required");
      return;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email");
      return;
    }
    
    try {
      setLoading(true);
      setError("");
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      setSuccess(true);
    } catch (err) {
      setError("Failed to send reset link");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    onClose();
    setTimeout(() => {
      setEmail("");
      setError("");
      setSuccess(false);
    }, 300);
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle sx={{ pb: 1 }}>Reset Password</DialogTitle>
      
      <DialogContent sx={{ minWidth: 400 }}>
        {success ? (
          <Alert severity="success" sx={{ mb: 2 }}>
            Password reset link sent to your email
          </Alert>
        ) : (
          <>
            <TextField
              label="Email"
              type="email"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={!!error}
              helperText={error}
              sx={{ mt: 1 }}
              autoFocus
            />
            <Alert severity="info" sx={{ mt: 2 }}>
              Enter your email to receive a password reset link
            </Alert>
          </>
        )}
      </DialogContent>
      
      <DialogActions>
        <Button onClick={handleClose} color="inherit">
          {success ? "Close" : "Cancel"}
        </Button>
        {!success && (
          <Button 
            onClick={handleSubmit} 
            variant="contained"
            disabled={loading}
          >
            {loading 
              ? <CircularProgress size={24} /> 
              : "Send Reset Link"}
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default ForgotPasswordDialog;