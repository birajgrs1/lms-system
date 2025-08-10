import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, IconButton, Menu, MenuItem } from "@mui/material";
import { GraduationCap } from "lucide-react";
import { logoutUser } from "../../features/auth/authSlice";
import { useNavigate,  } from "react-router-dom";
import { useState } from "react";
import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleMenu = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const handleLogout = () => {
    navigate("/auth");
    dispatch(logoutUser());
    handleClose();
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <header
        className="px-4 lg:px-6 py-4 flex items-center justify-between border-b border-gray-200 bg-white shadow-sm"
        role="banner"
      >
        <Link to="/" className="flex items-center space-x-2" aria-label="Go to homepage">
          <GraduationCap className="w-6 h-6 sm:w-8 sm:h-8 text-indigo-600" />
          <span className="font-extrabold text-lg sm:text-xl text-gray-900">EduHub</span>
        </Link>

        <div className="flex items-center space-x-2">
          <div className="mr-2 text-sm font-medium">{user?.name}</div>
          <IconButton onClick={handleMenu} size="small">
            <Avatar sx={{ width: 32, height: 32 }}>{user?.name?.charAt(0)}</Avatar>
          </IconButton>
          <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
            <MenuItem disabled>{user?.name}</MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </div>
      </header>

      <main className="flex-grow px-4 py-6">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;