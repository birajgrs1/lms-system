import { createSlice } from '@reduxjs/toolkit';
import { courseCategories, courseLevelOptions } from '../../config/index';

const initialState = {
  courses: [
    {
      _id: '1',
      title: 'Introduction to React',
      category: 'web-development',
      level: 'beginner',
      students: 42,
      revenue: 1260,
      status: 'published',
      createdAt: '2023-05-15'
    },
    {
      _id: '2',
      title: 'Advanced JavaScript',
      category: 'web-development',
      level: 'advanced',
      students: 28,
      revenue: 840,
      status: 'published',
      createdAt: '2023-06-20'
    }
  ],
  currentCourse: null,
  status: 'idle',
  error: null
};

const courseSlice = createSlice({
  name: 'courses',
  initialState,
  reducers: {
    addCourse: (state, action) => {
      const { category, level } = action.payload;
      if (!courseCategories.includes(category)) {
        throw new Error(`Invalid category: ${category}`);
      }
      if (!courseLevelOptions.includes(level)) {
        throw new Error(`Invalid level: ${level}`);
      }
      state.courses.push(action.payload);
    },
    updateCourse: (state, action) => {
      const index = state.courses.findIndex(c => c._id === action.payload._id);
      if (index !== -1) {
        state.courses[index] = action.payload;
      }
    },
    deleteCourse: (state, action) => {
      state.courses = state.courses.filter(course => course._id !== action.payload);
    }
  }
});

export const { addCourse, updateCourse, deleteCourse } = courseSlice.actions;
export const selectAllCourses = (state) => state.courses.courses;
export default courseSlice.reducer;
