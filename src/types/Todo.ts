export interface User {
  id: string;
  username: string;
}

export interface Todo {
  id: string;
  title: string;
  description: string;
  created_at: string;
  updated_at?: string;
  created_by?: User;
}
