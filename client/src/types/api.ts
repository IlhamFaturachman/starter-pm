export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'member';
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'archived';
  ownerId: string;
  createdAt: string;
}

export type TaskStatus = 'todo' | 'in_progress' | 'review' | 'done';

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  projectId: string;
  assigneeId: string | null;
  priority: 'low' | 'medium' | 'high';
  order: number;
}

export interface ApiError {
  message: string;
  errors?: Record<string, string[]>;
}

export type ApiErrorResponse = { data: ApiError; status: number };
