import { LoginData } from '@/types/Auth';
import { apiClient } from './ApiClient';

// Login
export async function loginUser(data: LoginData) {
  return apiClient(`/auth/login`, {
    method: 'POST',
    body: JSON.stringify(data),
  })
}
