import { Button } from '@mui/material';
import { Upload, Plus, FileText } from 'lucide-react';
import LectureCard from './LectureCard';

const CourseCurriculum = ({ 
  lectures, 
  onAddLecture, 
  onUpdateLecture, 
  onDeleteLecture 
}) => {
  return (
    <div className="mt-6 border border-gray-200 p-6 rounded-xl shadow-sm bg-white">
      <div className="flex items-center mb-5">
        <div className="bg-blue-100 p-2 rounded-lg mr-3 text-blue-600">
          <FileText size={20} />
        </div>
        <h3 className="text-xl font-semibold text-gray-800">Course Curriculum</h3>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
        <Button 
          variant="outlined" 
          className="!border-gray-300 !text-gray-700 hover:!bg-gray-50 flex items-center gap-2"
        >
          <Upload size={16} /> Bulk Upload
        </Button>
        <Button
          variant="contained"
          className="!bg-blue-600 hover:!bg-blue-700 flex items-center gap-2"
          onClick={onAddLecture}
        >
          <Plus size={16} /> Add Lecture
        </Button>
      </div>

      <div className="space-y-4">
        {lectures.map((lecture, index) => (
          <LectureCard
            key={lecture.id}
            lecture={lecture}
            index={index}
            onUpdate={onUpdateLecture}
            onDelete={onDeleteLecture}
          />
        ))}
      </div>
    </div>
  );
};
export default CourseCurriculum;

