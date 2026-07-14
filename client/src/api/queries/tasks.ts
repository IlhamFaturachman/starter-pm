import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/api/client';
import type { Task, TaskStatus } from '@/types/api';

const tasksKey = (projectId: string) => ['projects', projectId, 'tasks'] as const;

export function useTasksQuery(projectId: string) {
  return useQuery({
    queryKey: tasksKey(projectId),
    queryFn: async () => {
      const { data } = await apiClient.get<Task[]>(`/projects/${projectId}/tasks`);
      return data;
    },
    enabled: Boolean(projectId),
  });
}

export interface MoveTaskPayload {
  taskId: string;
  toStatus: TaskStatus;
  newOrder: number;
}

export function useMoveTaskMutation(projectId: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (payload: MoveTaskPayload) => {
      const { data } = await apiClient.patch<Task>(`/tasks/${payload.taskId}`, {
        status: payload.toStatus,
        order: payload.newOrder,
      });
      return data;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: tasksKey(projectId) }),
  });
}
