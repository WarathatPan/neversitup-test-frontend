import React from 'react';
import { formatDate } from '@/utils/Helpers';

interface TodoProps {
  title: string;
  description: string;
  date: string;
  onClick: () => void;
  onDelete: () => void;
}

const TodoItem: React.FC<TodoProps> = ({ title, description, date, onClick, onDelete  }) => {
  return (
    <div onClick={onClick} className="cursor-pointer relative p-6 bg-white border border-gray-300 rounded-lg shadow-lg w-full max-w-2xl mb-5">
      <button
        onClick={(e) => {
          e.stopPropagation();
          onDelete();
        }}
        className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition duration-300"
      >
        &#x2715;
      </button>
      <div onClick={onClick}>
        <h2 className="text-2xl font-bold mb-4">{title}</h2>
        <p className="text-gray-700 text-lg mb-4">
          {description}
        </p>
        <p className="text-gray-500 text-right text-sm">
          {formatDate(date)}
        </p>
      </div>
    </div>
  );
};

export default TodoItem;