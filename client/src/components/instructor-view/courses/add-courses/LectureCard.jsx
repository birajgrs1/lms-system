import { Button } from '@mui/material';
import { Upload, Video } from 'lucide-react';
import { FaTrash } from 'react-icons/fa';

const LectureCard = ({ lecture, index, onUpdate, onDelete }) => {
  const { id, title, videoUrl, freePreview } = lecture;

  const handleVideoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const videoUrl = URL.createObjectURL(file);
      onUpdate(id, 'videoUrl', videoUrl);
    }
  };

  return (
    <div className="border border-gray-200 p-5 rounded-xl bg-white mb-4">
      <div className="flex flex-wrap gap-3 items-center mb-4">
        <div className="flex items-center bg-gray-100 px-3 py-1 rounded-full">
          <Video size={16} className="text-gray-600 mr-2" />
          <span className="font-medium text-gray-700">Lecture {index + 1}</span>
        </div>

        <input
          type="text"
          value={title}
          onChange={(e) => onUpdate(id, 'title', e.target.value)}
          placeholder="Lecture title"
          className="flex-1 min-w-[200px] border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />

        <div className="flex items-center space-x-2">
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={freePreview}
              onChange={(e) => onUpdate(id, 'freePreview', e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-12 h-6 bg-gray-300 rounded-full peer peer-checked:bg-blue-500"></div>
            <div className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform peer-checked:translate-x-6"></div>
          </label>
          <span className="text-gray-700">Free Preview</span>
        </div>
      </div>

      <div className="mt-4">
        {videoUrl ? (
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1">
              <div className="relative pb-[56.25%] rounded-lg overflow-hidden bg-gray-900">
                <video className="absolute inset-0 w-full h-full" controls>
                  <source src={videoUrl} type="video/mp4" />
                  Your browser doesn't support videos
                </video>
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <Button
                variant="outlined"
                size="small"
                onClick={() => document.getElementById(`video-upload-${id}`).click()}
                className="!border-gray-300 !text-gray-700 hover:!bg-gray-50"
              >
                Replace Video
              </Button>
              <Button
                variant="outlined"
                size="small"
                onClick={() => onDelete(id)}
                className="!border-red-100 !bg-red-50 !text-red-600 hover:!bg-red-100"
              >
                <FaTrash className="mr-2" /> Delete Lecture
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-xl p-8 bg-gray-50 text-center">
            <Upload size={40} className="text-gray-400 mb-3" />
            <p className="text-gray-600 mb-4">Upload lecture video</p>
            <input
              type="file"
              id={`video-upload-${id}`}
              accept="video/*"
              onChange={handleVideoUpload}
              className="hidden"
            />
            <Button
              variant="outlined"
              onClick={() => document.getElementById(`video-upload-${id}`).click()}
              className="!border-gray-300 !text-gray-700 hover:!bg-gray-50"
            >
              Select Video File
            </Button>
            <p className="text-xs text-gray-500 mt-3">MP4, MOV, or AVI (Max 2GB)</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LectureCard;