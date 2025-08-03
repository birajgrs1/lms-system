import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { 
  Box, 
  TextField, 
  Button, 
  CircularProgress,
  InputAdornment,
  IconButton
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { signUp } from "../../features/auth/authSlice";

const SignUpForm = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ 
    username: "", 
    email: "", 
    password: "" 
  });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!formData.username.trim()) newErrors.username = "Required";
    if (!formData.email) newErrors.email = "Required";
    if (!emailRegex.test(formData.email)) newErrors.email = "Invalid email";
    if (!formData.password) newErrors.password = "Required";
    if (formData.password.length < 6) newErrors.password = "Min 6 characters";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
  e.preventDefault();
  if (!validate()) return;
  
  dispatch(signUp({
    username: formData.username,
    email: formData.email,
    password: formData.password
  }));
};


  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
      <TextField
        label="Username"
        fullWidth
        margin="normal"
        required
        error={!!errors.username}
        helperText={errors.username}
        value={formData.username}
        onChange={(e) => setFormData({ ...formData, username: e.target.value })}
      />
      
      <TextField
        label="Email"
        type="email"
        fullWidth
        margin="normal"
        required
        error={!!errors.email}
        helperText={errors.email}
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
      />
      
      <TextField
        label="Password"
        type={showPassword ? "text" : "password"}
        fullWidth
        margin="normal"
        required
        error={!!errors.password}
        helperText={errors.password}
        value={formData.password}
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={() => setShowPassword(!showPassword)}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          )
        }}
      />
      
      <Button
        type="submit"
        fullWidth
        variant="contained"
        disabled={loading}
        sx={{ py: 1.5, mt: 2 }}
      >
        {loading ? <CircularProgress size={24} /> : "Create Account"}
      </Button>
    </Box>
  );
};

export default SignUpForm;