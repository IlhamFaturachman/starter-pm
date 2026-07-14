import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/api/client';
import type { Project } from '@/types/api';

const PROJECTS_KEY = ['projects'] as const;

export function useProjectsQuery() {
  return useQuery({
    queryKey: PROJECTS_KEY,
    queryFn: async () => {
      const { data } = await apiClient.get<Project[]>('/projects');
      return data;
    },
  });
}

export function useCreateProjectMutation() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (payload: Pick<Project, 'name' | 'description'>) => {
      const { data } = await apiClient.post<Project>('/projects', payload);
      return data;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: PROJECTS_KEY }),
  });
}
