import React from 'react';

interface TextInputProps {
  label?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  required?: boolean;
  className?: string;
}

export default function TextInput({
  label,
  placeholder,
  value,
  onChange,
  type = 'text',
  required = false,
  className = ''
}: TextInputProps) {
  return (
    <div className={`mb-4 ${className}`}>
      {label && (
        <label className="block mb-2 typewriter-text">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        className="w-full border-2 border-black p-2 typewriter-text bg-white"
      />
    </div>
  );
}
