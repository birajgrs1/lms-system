import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { 
  Box, 
  TextField, 
  Button, 
  Grid, 
  Link, 
  CircularProgress,
  InputAdornment,
  IconButton
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { signIn } from "../../features/auth/authSlice";
import ForgotPasswordDialog from "./ForgotPasswordDialog";

const SignInForm = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ 
    usernameOrEmail: "", 
    password: "" 
  });
  const [errors, setErrors] = useState({});
  const [openDialog, setOpenDialog] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!formData.usernameOrEmail) newErrors.usernameOrEmail = "Required";
    if (!formData.password) newErrors.password = "Required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    
    dispatch(
      signIn({
        username: formData.usernameOrEmail.includes("@") 
          ? undefined 
          : formData.usernameOrEmail,
        email: formData.usernameOrEmail.includes("@") 
          ? formData.usernameOrEmail 
          : undefined,
        password: formData.password,
      })
    );
  };

  return (
    <>
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
        <TextField
          label="Username or Email"
          fullWidth
          margin="normal"
          required
          error={!!errors.usernameOrEmail}
          helperText={errors.usernameOrEmail}
          value={formData.usernameOrEmail}
          onChange={(e) => setFormData({ ...formData, usernameOrEmail: e.target.value })}
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
        
        <Grid container sx={{ mt: 1, mb: 2 }}>
          <Grid item xs>
            <Link 
              component="button" 
              variant="body2" 
              onClick={() => setOpenDialog(true)}
              sx={{ textAlign: 'left' }}
            >
              Forgot password?
            </Link>
          </Grid>
        </Grid>
        
        <Button
          type="submit"
          fullWidth
          variant="contained"
          disabled={loading}
          sx={{ py: 1.5, mt: 1 }}
        >
          {loading ? <CircularProgress size={24} /> : "Sign In"}
        </Button>
      </Box>
      
      <ForgotPasswordDialog 
        open={openDialog} 
        onClose={() => setOpenDialog(false)} 
      />
    </>
  );
};

export default SignInForm;