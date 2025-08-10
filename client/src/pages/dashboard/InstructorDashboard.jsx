import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { 
  Menu, 
  Book, 
  LayoutDashboard, 
  User, 
  X,
  GraduationCap
} from "lucide-react";

const menuItems = [
  {
    icon: LayoutDashboard,
    label: "Dashboard",
    to: "/dashboard",
  },
  {
    icon: Book,
    label: "Courses",
    to: "/dashboard/courses",
  },
  {
    icon: User,
    label: "Profile",
    to: "/dashboard/profile",
  },
];

const InstructorLayout = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleDrawer = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <button
        className={`fixed z-50 top-4 left-4 p-2 rounded-md bg-blue-600 text-white shadow-lg transition-opacity sm:hidden ${
          mobileOpen ? "opacity-0" : "opacity-100"
        }`}
        onClick={toggleDrawer}
        aria-label="Open menu"
      >
        <Menu className="h-6 w-6" />
      </button>

      <aside
        className={`fixed inset-y-0 left-0 mt-16 z-40 w-64 bg-white shadow-xl transform transition-transform duration-300 ease-in-out sm:translate-x-0 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between bg-blue-600 text-white px-4 py-4">
            <div className="flex items-center space-x-2">
              <GraduationCap className="h-8 w-8" />
              <span className="text-xl font-bold">EduHub</span>
            </div>
            <button
              className="sm:hidden"
              onClick={toggleDrawer}
              aria-label="Close menu"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <nav className="flex-1 overflow-y-auto py-4">
            <ul>
              {menuItems.map(({ icon, label, to }) => {
                const Icon = icon;
                return (
                  <li key={to}>
                    <NavLink
                      to={to}
                      onClick={() => setMobileOpen(false)}
                      className={({ isActive }) =>
                        `flex items-center px-6 py-3 my-1 text-left text-base transition-all duration-200 font-medium ${
                          isActive
                            ? "bg-blue-50 text-blue-700 border-l-4 border-blue-600"
                            : "text-gray-700 hover:bg-gray-100"
                        }`
                      }
                    >
                      <Icon className="mr-4 h-5 w-5" />
                      <span>{label}</span>
                    </NavLink>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </aside>

      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 sm:hidden"
          onClick={toggleDrawer}
          aria-hidden="true"
        />
      )}

      <div className="flex-1 flex flex-col min-w-0">
        <div className="sm:ml-64">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default InstructorLayout;