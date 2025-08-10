import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import courseReducer from "../features/courses/courseSlice";
import createCourseReducer from "../features/courses/createCourseSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  courses: courseReducer,
  createCourse: createCourseReducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActionPaths: ['payload.config', 'payload.request', 'error', 'meta.arg'],
      },
    }),
  devTools: import.meta.env.MODE !== 'production',
});

export default store;

// import { configureStore, combineReducers } from "@reduxjs/toolkit";
// import authReducer from "../features/auth/authSlice"; // Adjust if path changes

// const rootReducer = combineReducers({
//   auth: authReducer,
// });

// const store = configureStore({
//   reducer: rootReducer,
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({
//       serializableCheck: {
//         ignoredActionPaths: ['payload.config', 'payload.request', 'error', 'meta.arg'],
//       },
//     }),
//   devTools: import.meta.env.MODE !== 'production',
// });

// export default store;
