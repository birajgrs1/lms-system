import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  updateFormField,
  addLecture,
  updateLecture,
  deleteLecture,
  addTag,
  removeTag,
  resetCreateCourse
} from '../../../features/courses/createCourseSlice';
import {
  selectFormData,
  selectLectures,
  selectTags
} from '../../../features/courses/createCourseSlice';
import { addCourse } from '../../../features/courses/courseSlice';
import { useNavigate } from 'react-router-dom';
import { BackLink } from './add-courses/Heading';
import CourseLanding from './add-courses/CourseLanding';
import CourseCurriculum from './add-courses/CourseCurriculum';
import CourseSettings from './add-courses/CourseSettings';
import { Button } from '@mui/material';

const AddNewCourses = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formData = useSelector(selectFormData);
  const lectures = useSelector(selectLectures);
  const tags = useSelector(selectTags);
  const [activeSection, setActiveSection] = useState('landing');

  const handleFormChange = (field, value) => {
    dispatch(updateFormField({ field, value }));
  };

  const handleAddLecture = () => {
    dispatch(addLecture());
  };

  const handleUpdateLecture = (id, field, value) => {
    dispatch(updateLecture({ id, field, value }));
  };

  const handleDeleteLecture = (id) => {
    dispatch(deleteLecture(id));
  };

  const handleAddTag = (tag) => {
    dispatch(addTag(tag));
  };

  const handleRemoveTag = (tag) => {
    dispatch(removeTag(tag));
  };

  const handleSubmit = () => {
    const newCourse = {
      ...formData,
      lectures,
      tags,
      _id: Date.now().toString(),
      students: 0,
      revenue: 0,
      status: 'draft',
      createdAt: new Date().toISOString()
    };
    
    dispatch(addCourse(newCourse));
    dispatch(resetCreateCourse());
    navigate('/dashboard/courses');
  };

  const renderSection = () => {
    switch (activeSection) {
      case 'landing':
        return (
          <CourseLanding 
            formData={formData} 
            onFormChange={handleFormChange} 
          />
        );
      case 'curriculum':
        return (
          <CourseCurriculum
            lectures={lectures}
            onAddLecture={handleAddLecture}
            onUpdateLecture={handleUpdateLecture}
            onDeleteLecture={handleDeleteLecture}
          />
        );
      case 'settings':
        return (
          <CourseSettings
            tags={tags}
            onAddTag={handleAddTag}
            onRemoveTag={handleRemoveTag}
          />
        );
      default:
        return (
          <CourseLanding 
            formData={formData} 
            onFormChange={handleFormChange} 
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <BackLink />
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Create New Course</h1>

        <div className="sticky top-0 z-20 bg-gray-50 py-4 mb-6 border-b border-gray-200">
          <div className="flex flex-wrap gap-2">
            {['landing', 'curriculum', 'settings'].map((section) => (
              <Button
                key={section}
                variant={activeSection === section ? 'contained' : 'outlined'}
                onClick={() => setActiveSection(section)}
                className={`!rounded-lg ${
                  activeSection === section
                    ? '!bg-blue-600'
                    : '!border-gray-300 !text-gray-700 hover:!bg-gray-50'
                }`}
              >
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </Button>
            ))}
          </div>
        </div>

        {renderSection()}

        <div className="flex justify-end mt-8">
          <Button
            variant="contained"
            onClick={handleSubmit}
            className="!py-3 !px-8 !text-base !font-medium !rounded-lg !shadow-lg !bg-gradient-to-r !from-blue-600 !to-indigo-700 hover:!from-blue-700 hover:!to-indigo-800"
          >
            PUBLISH COURSE
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddNewCourses;
