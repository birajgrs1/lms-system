import { Typography, Box } from '@mui/material';

const StudentDashboard = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Student Dashboard
      </Typography>
      <Typography variant="body1">
        Welcome to your learning dashboard. Here you can access your courses, 
        track your progress, and interact with instructors.
      </Typography>
    </Box>
  );
};

export default StudentDashboard;