import { useState } from "react";
import { GetServerSideProps } from 'next';
import { getAllTodos, createTodo, updateTodo, deleteTodo } from "@/services/TodoService";
import TodoItem from "@/components/TodoItem";
import TodoFormModal from "@/components/TodoFormModal";
import TodoDeleteModal from "@/components/TodoDeleteModal";
import { Todo } from "@/types/Todo";

interface HomePageProps {
  todos: Todo[];
}

const HomePage: React.FC<HomePageProps> = ({ todos: initialTodos }) => {
  const [todos, setTodos] = useState<Todo[]>(initialTodos);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleCreate = async (title: string, description: string) => {
    const newTodo = await createTodo(title, description);
    setTodos((prevTodos) => [...prevTodos, newTodo]);
  };

  const handleUpdate = async (id: string, title: string, description: string) => {
    const updatedTodo = await updateTodo(id, title, description);
    setTodos((prevTodos) =>
      prevTodos.map((todo) => (todo.id === id ? { ...todo, ...updatedTodo } : todo))
    );
  };

  const handleCreateOrUpdate = (todo: Todo) => {
    if (todo.id) {
      setTodos((prevTodos) =>
        prevTodos.map((t) => (t.id === todo.id ? todo : t))
      );
    } else {
      setTodos((prevTodos) => [...prevTodos, { ...todo, id: Date.now().toString() }]);
    }
  };

  const handleDelete = async () => {
    if (selectedTodo) {
      await deleteTodo(selectedTodo?.id);
      setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== selectedTodo.id));
      setIsDeleteModalOpen(false);
    }
  };

  const handleOpenModal = (todo?: Todo) => {
    setSelectedTodo(todo || null);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedTodo(null);
    setIsModalOpen(false);
  };

  const handleOpenDeleteModal = (todo: Todo) => {
    setSelectedTodo(todo);
    setIsDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setSelectedTodo(null);
    setIsDeleteModalOpen(false);
  };

  return (
    <div className="flex flex-col items-center justify-center h-[93vh] bg-gray-100 text-black p-6">
      {todos.length === 0 ? (
        <div className="text-center">
          <p className="text-gray-500 mb-4">
            Empty press {"Create"} for add new todo
          </p>
        </div>
      ) : (
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg max-h-[80vh] overflow-y-auto">
          <h1 className="text-2xl font-bold mb-6 text-center">My Todos</h1>
          {/* Show list todos */}
          {todos?.length > 0 &&
            todos.map((todo: Todo, index: number) => (
              <TodoItem
                key={todo.id}
                title={todo.title}
                description={todo.description}
                date={todo.created_at}
                onDelete={() => handleOpenDeleteModal(todo)}
                onClick={() => handleOpenModal(todo)}
              />
            ))}
        </div>
      )}
      <button onClick={() => setIsModalOpen(true)} className="mt-4 p-2 bg-blue-500 text-white rounded-md">+ Create</button>
      {isModalOpen && (
        <TodoFormModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          todoId={selectedTodo?.id}
          onSubmit={(todo) => {
            if (todo.id) {
              handleUpdate(todo.id, todo.title, todo.description);
            } else {
              handleCreate(todo.title, todo.description);
            }
            handleCloseModal();
          }}
        />
      )}
      {isDeleteModalOpen && (
        <TodoDeleteModal
          isOpen={isDeleteModalOpen}
          onClose={handleCloseDeleteModal}
          onConfirm={handleDelete}
          title={selectedTodo?.title}
        />
      )}
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const todos = await getAllTodos(context);
    return {
      props: {
        todos,
      },
    };
  } catch (error) {
    console.error('Failed to fetch todos:', error);
    return {
      props: {
        todos: [],
      },
    };
  }
};

export default HomePage;