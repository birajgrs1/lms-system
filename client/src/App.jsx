import { Routes, Route, Navigate } from "react-router-dom";
import AuthPage from "./pages/auth/AuthPage";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/auth" />} />
      <Route path="/auth" element={<AuthPage />} />
    </Routes>
  );
};

export default App;
