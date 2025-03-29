import React from "react";

function FormField({
  labelName,
  type,
  name,
  placeholder,
  value,
  handleChange,
  isSurpriseMe,
  handleSurpriseMe,
}) {
  return (
    <div className="mb-4">
      <div className="flex items-center justify-between mb-2">
        <label
          htmlFor={name}
          className="block text-sm font-medium text-gray-900"
        >
          {labelName}
        </label>

        {isSurpriseMe && (
          <button
            className="font-semibold text-xs bg-gray-200 py-1 px-2 rounded-md text-gray-800 hover:bg-gray-300 transition duration-200"
            type="button"
            onClick={handleSurpriseMe}
          >
            Random
          </button>
        )}
      </div>

      <input
        type={type}
        id={name}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        required
        className="w-full py-2 px-4 border border-gray-300 rounded-md text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
      />
    </div>
  );
}

export default FormField;
