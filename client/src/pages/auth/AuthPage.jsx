import { useState } from "react";
import { Box, Container, Paper, Tabs, Tab, Button } from "@mui/material";
import Header from "../../components/layout/Header";
import SignInForm from "../../components/auth/SignInForm";
import SignUpForm from "../../components/auth/SignUpForm";
import SnackbarAlert from "../../components/auth/SnackbarAlert";
// import SignInForm
// import SignInForm from "../components/auth/SignInForm";
// import SignUpForm from "../components/auth/SignUpForm";
// import SnackbarAlert from "../components/auth/SnackbarAlert";

const AuthPage = () => {
  const [mode, setMode] = useState("signin");

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      
      <main className="flex-grow flex items-center justify-center px-4 py-6">
        <Container maxWidth="sm">
          <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
            <Tabs 
              value={mode} 
              onChange={(e, newValue) => setMode(newValue)}
              variant="fullWidth"
              sx={{ mb: 3 }}
            >
              <Tab 
                label="Sign In" 
                value="signin" 
                sx={{ fontWeight: 600, fontSize: '1rem' }}
              />
              <Tab 
                label="Sign Up" 
                value="signup" 
                sx={{ fontWeight: 600, fontSize: '1rem' }}
              />
            </Tabs>
            
            {mode === "signin" ? <SignInForm /> : <SignUpForm />}
            
            <Box sx={{ mt: 2, textAlign: 'center' }}>
              <Button 
                onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
                size="small"
              >
                {mode === "signin" 
                  ? "Don't have an account? Sign Up" 
                  : "Already have an account? Sign In"}
              </Button>
            </Box>
          </Paper>
          
          <SnackbarAlert />
        </Container>
      </main>
    </div>
  );
};

export default AuthPage;