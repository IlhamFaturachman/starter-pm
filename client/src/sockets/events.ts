import type { Task, Project } from '@/types/api';

export interface ServerToClientEvents {
  'project:created': (project: Project) => void;
  'project:updated': (project: Project) => void;
  'task:created': (task: Task) => void;
  'task:updated': (task: Task) => void;
  'task:moved': (payload: { taskId: string; toStatus: string }) => void;
}

export interface ClientToServerEvents {
  'project:subscribe': (projectId: string) => void;
  'project:unsubscribe': (projectId: string) => void;
  'ping': () => void;
}
