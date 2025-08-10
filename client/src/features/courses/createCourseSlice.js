import { createSlice } from '@reduxjs/toolkit';
import { courseLandingInitialFormData } from '../../config/index';

const initialState = {
  formData: { ...courseLandingInitialFormData },
  lectures: [],
  tags: []
};

const createCourseSlice = createSlice({
  name: 'createCourse',
  initialState,
  reducers: {
    updateFormField: (state, action) => {
      const { field, value } = action.payload;
      state.formData[field] = value;
    },
    addLecture: (state) => {
      const newId = state.lectures.length + 1;
      state.lectures.push({
        id: newId,
        title: "",
        videoUrl: "",
        freePreview: false
      });
    },
    updateLecture: (state, action) => {
      const { id, field, value } = action.payload;
      const lecture = state.lectures.find(l => l.id === id);
      if (lecture) {
        lecture[field] = value;
      }
    },
    deleteLecture: (state, action) => {
      state.lectures = state.lectures.filter(l => l.id !== action.payload);
    },
    addTag: (state, action) => {
      if (!state.tags.includes(action.payload)) {
        state.tags.push(action.payload);
      }
    },
    removeTag: (state, action) => {
      state.tags = state.tags.filter(tag => tag !== action.payload);
    },
    resetCreateCourse: () => initialState
  }
});

export const { 
  updateFormField,
  addLecture,
  updateLecture,
  deleteLecture,
  addTag,
  removeTag,
  resetCreateCourse
} = createCourseSlice.actions;

export const selectFormData = (state) => state.createCourse.formData;
export const selectLectures = (state) => state.createCourse.lectures;
export const selectTags = (state) => state.createCourse.tags;

export default createCourseSlice.reducer;