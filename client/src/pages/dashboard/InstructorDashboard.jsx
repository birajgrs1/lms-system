import { Typography, Box } from '@mui/material';

const InstructorDashboard = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Instructor Dashboard
      </Typography>
      <Typography variant="body1">
        Welcome to your teaching dashboard. Here you can manage your courses, 
        interact with students, and track class progress.
      </Typography>
      {/* Add instructor-specific content here */}
    </Box>
  );
};

export default InstructorDashboard;