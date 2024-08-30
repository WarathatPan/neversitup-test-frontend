import React, { useState, useEffect, useRef } from 'react';
import { getTodoById } from '@/services/TodoService';
import { Todo } from '@/types/Todo';

interface TodoFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  todoId?: string;
  onSubmit: (todo: Todo) => void;
}

const TodoFormModal: React.FC<TodoFormModalProps> = ({ isOpen, onClose, todoId, onSubmit }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(!!todoId);

  const titleInputRef = useRef<HTMLInputElement>(null)
  
  useEffect(() => {
    if (isOpen && todoId) {
      const fetchTodo = async () => {
        try {
          const result = await getTodoById(todoId);
          setTitle(result.title);
          setDescription(result.description);
        } catch (error) {
          console.error('Failed to fetch todo:', error);
        } finally {
          setLoading(false);
        }
      };

      fetchTodo();
    } else {
      setTitle('');
      setDescription('');
      setLoading(false);
    }

    if (isOpen && titleInputRef.current) {
      titleInputRef.current.focus();
    }
  }, [isOpen, todoId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      let submittedTodo: any;
      if (todoId) {
        const updatedFields = { title, description };
        submittedTodo = { id: todoId, ...updatedFields };
      } else {
        submittedTodo = { title, description };
      }
      onSubmit(submittedTodo);
      onClose();
    } catch (error) {
      console.error('Error submitting todo:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md relative">
        <button
          onClick={onClose}
          className="bg-white border border-gray rounded-full w-7 absolute top-0 right-0 text-gray-500 hover:text-gray-700 translate-x-2 -translate-y-3 duration-300"
        >
          &#x2715;
        </button>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="title" className="block text-gray-700 font-medium mb-2">
                TITLE
              </label>
              <input
                type="text"
                id="title"
                ref={titleInputRef}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
              />
            </div>
            <div className="mb-6">
              <label htmlFor="description" className="block text-gray-700 font-medium mb-2">
                DESCRIPTION
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500 h-32"
              />
            </div>
            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={onClose}
                className="bg-gray-300 hover:bg-gray-400 text-black py-2 px-4 rounded-md"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md"
              >
                {todoId ? 'Edit' : 'Create'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default TodoFormModal;