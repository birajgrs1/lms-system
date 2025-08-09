import { useState } from 'react';
import { Menu, Book, LayoutDashboard, User } from 'lucide-react';
import Dashboard from "../../components/instructor-view/dashboard/Index.jsx";
import InstructorCourse from "../../components/instructor-view/courses/InstructorCourse.jsx";

const menuItems = [
  {
    icon: LayoutDashboard,
    label: 'Dashboard',
    value: 'dashboard',
    component: <Dashboard />
  },
  {
    icon: Book,
    label: 'Courses',
    value: 'courses',
    component: <InstructorCourse />
  },
  {
    icon: User,
    label: 'Profile',
    value: 'profile',
    component: <div>Profile Content</div>  
  }
];

const InstructorDashboard = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">

      <aside className={`fixed inset-0 sm:relative z-40 top-0 left-0 h-full w-64 bg-white shadow-md transition-transform duration-300 sm:translate-x-0 ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex items-center justify-between bg-blue-600 text-white px-4 py-4">
          <span className="text-lg font-semibold">Instructor</span>
          <button className="sm:hidden" onClick={handleDrawerToggle}>
            <Menu className="h-5 w-5" />
          </button>
        </div>

        <nav className="mt-8">
          <ul>
            {menuItems.map((item) => (
              <li key={item.value}>
                <button
                  onClick={() => {
                    setActiveTab(item.value);
                    setMobileOpen(false);
                  }}
                  className={`flex items-center w-full px-6 py-3 text-left text-sm hover:bg-gray-200 transition duration-300 font-semibold ${activeTab === item.value ? 'bg-blue-100 text-blue-700 border-l-4 border-blue-600' : 'text-gray-700'}`}
                >
                  <item.icon className="mr-3 h-5 w-5" />
                  <span>{item.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-30 sm:hidden"
          onClick={handleDrawerToggle}
        />
      )}

      <div className="flex-1 flex flex-col sm:ml-46 sm:mr-8">
        <main className="p-4 sm:p-6 flex-1">
          <div className="bg-white rounded-lg shadow p-6">
            {menuItems.find((item) => item.value === activeTab)?.component}
          </div>
        </main>
      </div>
    </div>
  );
};

export default InstructorDashboard;
