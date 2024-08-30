import { GetServerSidePropsContext } from 'next';
import { Todo } from '@/types/Todo';
import { apiServer } from './ApiServer';
import { apiClient } from './ApiClient';

// Get All
export async function getAllTodos(context: GetServerSidePropsContext): Promise<Todo[]> {
  return apiServer(`/todo`, context, {
    method: 'GET',
    credentials: 'include',
  })
}

// Get by id
export async function getTodoById(id: string) {
  return apiClient(`/todo/${id}`, {
    method: 'GET',
  })
}
  
// Create
export async function createTodo(title: string, description: string) {
  return apiClient(`/todo`, {
    method: 'POST',
    body: JSON.stringify({ title, description }),
  })
}

// Update
export async function updateTodo(id: string, title: string, description: string) {
  return apiClient(`/todo/${id}`, {
    method: 'PATCH',
    body: JSON.stringify({ title, description }),
  })
}

// Delete
export async function deleteTodo(id: string) {
  return apiClient(`/todo/${id}`, {
    method: 'DELETE',
  })
}