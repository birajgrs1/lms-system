import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export const Heading = ({ title }) => (
  <div className="mb-6 flex items-center">
    <h1 className="text-2xl md:text-3xl font-bold text-gray-800">{title}</h1>
  </div>
);

export const BackLink = () => (
  <div className="mb-6">
    <Link
      to="/dashboard/courses"
      className="flex items-center text-blue-600 hover:text-blue-800 transition-colors duration-200 font-medium"
      aria-label="Back to Courses"
    >
      <ArrowLeft className="mr-2" size={20} />
      Back to Courses
    </Link>
  </div>
);