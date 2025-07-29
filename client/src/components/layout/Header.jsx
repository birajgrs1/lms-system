import { Link } from "react-router-dom";
import { GraduationCap } from "lucide-react";

const Header = () => (
  <header className="px-4 lg:px-6 py-4 flex items-center justify-between border-b border-gray-200" role="banner">
    <Link to="/" className="flex items-center space-x-2" aria-label="Go to homepage">
      <GraduationCap className="w-8 h-8 text-indigo-600" />
      <span className="font-extrabold text-xl text-gray-900">EduHub</span>
    </Link>
  </header>
);

export default Header;