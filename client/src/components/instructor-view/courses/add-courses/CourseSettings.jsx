import React, { useState } from 'react';
import { Button } from '@mui/material';
import { Settings } from 'lucide-react';

const CourseSettings = ({ tags, onAddTag, onRemoveTag }) => {
  const [newTag, setNewTag] = useState("");

  const handleAdd = () => {
    if (newTag.trim()) {
      onAddTag(newTag.trim());
      setNewTag("");
    }
  };

  return (
    <div className="mt-6 border border-gray-200 p-6 rounded-xl shadow-sm bg-white">
      <div className="flex items-center mb-5">
        <div className="bg-blue-100 p-2 rounded-lg mr-3 text-blue-600">
          <Settings size={20} />
        </div>
        <h3 className="text-xl font-semibold text-gray-800">Course Settings</h3>
      </div>

      <label className="block text-gray-700 font-medium mb-2">Course Tags</label>
      <div className="flex flex-wrap gap-2 mb-3">
        {tags.map((tag) => (
          <div
            key={tag}
            className="flex items-center bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm"
          >
            {tag}
            <button
              type="button"
              className="ml-2 text-blue-900 hover:text-blue-800"
              onClick={() => onRemoveTag(tag)}
            >
              &times;
            </button>
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          type="text"
          value={newTag}
          onChange={(e) => setNewTag(e.target.value)}
          placeholder="Add a tag"
          className="flex-1 border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          onKeyPress={(e) => e.key === 'Enter' && handleAdd()}
        />
        <Button 
          variant="contained" 
          className="!bg-blue-600 hover:!bg-blue-700" 
          onClick={handleAdd}
        >
          Add
        </Button>
      </div>
    </div>
  );
};

export default CourseSettings;