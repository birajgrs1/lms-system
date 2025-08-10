import { Image } from 'lucide-react';
import { courseLandingPageFormControls } from '../../../../config/index';

const CourseLanding = ({ formData, onFormChange }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    onFormChange(name, value);
  };

  return (
    <div className="mt-6 border border-gray-200 p-6 rounded-xl shadow-sm bg-white">
      <div className="flex items-center mb-5">
        <div className="bg-blue-100 p-2 rounded-lg mr-3 text-blue-600">
          <Image size={20} />
        </div>
        <h3 className="text-xl font-semibold text-gray-800">Course Landing Page</h3>
      </div>
      <div className="grid grid-cols-1 gap-6">
        {courseLandingPageFormControls.map((control) => (
          <div key={control.name}>
            <label className="block text-gray-700 font-medium mb-2">
              {control.label}
            </label>
            {control.componentType === 'input' ? (
              <input
                type={control.type}
                name={control.name}
                value={formData[control.name] || ''}
                onChange={handleChange}
                placeholder={control.placeholder}
                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            ) : control.componentType === 'textarea' ? (
              <textarea
                name={control.name}
                value={formData[control.name] || ''}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows="4"
                placeholder={control.placeholder}
              />
            ) : control.componentType === 'select' ? (
              <select
                name={control.name}
                value={formData[control.name] || ''}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select {control.label}</option>
                {control.options.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.label}
                  </option>
                ))}
              </select>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseLanding;