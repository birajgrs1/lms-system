import { useState } from 'react';
import { Menu, Book, LayoutDashboard } from 'lucide-react';
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
];

const InstructorDashboard = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <aside className={`
      mt-[75px]
        fixed z-40 top-0 left-0 h-full w-60 bg-white shadow-md transition-transform duration-300
        sm:translate-x-0 ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex items-center justify-between bg-blue-600 text-white px-4 py-4">
          <span className="text-lg font-semibold">Instructor</span>
          <button className="sm:hidden" onClick={handleDrawerToggle}>
            <Menu className="h-5 w-5" />
          </button>
        </div>

        <nav className="mt-4">
          <ul>
            {menuItems.map((item) => (
              <li key={item.value}>
                <button
                  onClick={() => {
                    setActiveTab(item.value);
                    setMobileOpen(false);
                  }}
                  className={`
                    flex items-center w-full px-6 py-3 text-left text-sm
                    hover:bg-gray-300 transition   font-semibold
                    ${activeTab === item.value ? 'border-l-4 border-blue-600 bg-gray-100' : ''}
                  `}
                >
                  <item.icon className="mr-3 h-5 w-5 text-gray-700" />
                  <span>{item.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      {/* Mobile overlay when drawer is open */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-30 sm:hidden"
          onClick={handleDrawerToggle}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col sm:ml-60">
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
