import React from 'react';
import { useSelector } from 'react-redux';
import { selectAllCourses } from '../../../features/courses/courseSlice';
import { courseCategories, courseLevelOptions } from '../../../config/index';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import { SquarePen, Trash } from 'lucide-react';

const InstructorCourse = () => {
  const courses = useSelector(selectAllCourses);

  const getCategoryLabel = (id) => {
    return courseCategories.find(cat => cat.id === id)?.label || id;
  };

  const getLevelLabel = (id) => {
    return courseLevelOptions.find(lvl => lvl.id === id)?.label || id;
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <header className="bg-white shadow-lg p-6 rounded-lg mb-8 flex justify-between items-center flex-col sm:flex-row">
        <h1 className="text-3xl font-semibold text-gray-900 mb-4 sm:mb-0">
          All Courses
        </h1>
        <Link to="/dashboard/add-new-courses">
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#2563eb",
              "&:hover": { backgroundColor: "#1d4ed8" },
              textTransform: "none",
              padding: "10px 24px",
              borderRadius: "8px",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            }}
          >
            Create New Course
          </Button>
        </Link>
      </header>

      <div className="overflow-x-auto shadow-lg rounded-lg bg-white">
        <table className="min-w-full">
          <thead className="bg-gray-100 border-b">
            <tr>
              <th className="px-6 py-4 text-left">Course</th>
              <th className="px-6 py-4 text-left">Category</th>
              <th className="px-6 py-4 text-left">Level</th>
              <th className="px-6 py-4 text-left">Students</th>
              <th className="px-6 py-4 text-left">Revenue</th>
              <th className="px-6 py-4 text-left">Status</th>
              <th className="px-6 py-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {courses.map((course) => (
              <tr key={course._id} className="hover:bg-gray-50">
                <td className="px-6 py-4 font-medium">{course.title}</td>
                <td className="px-6 py-4">{getCategoryLabel(course.category)}</td>
                <td className="px-6 py-4">{getLevelLabel(course.level)}</td>
                <td className="px-6 py-4">{course.students}</td>
                <td className="px-6 py-4">${course.revenue}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    course.status === 'published' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {course.status}
                  </span>
                </td>
                <td className="px-6 py-4 flex gap-2">
                  <Link to={`/dashboard/courses/${course._id}/edit`}>
                    <button className="p-2 text-white bg-blue-500 rounded-full hover:bg-blue-600">
                      <SquarePen size={18} />
                    </button>
                  </Link>
                  <button className="p-2 text-white bg-red-500 rounded-full hover:bg-red-600">
                    <Trash size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InstructorCourse;