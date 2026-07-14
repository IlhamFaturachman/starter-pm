import { Typography } from '@/components/atoms/Typography';
import { KanbanBoard } from '@/components/organisms/KanbanBoard';
import type { Task } from '@/types/api';

const SAMPLE: Task[] = [
  { id: '1', title: 'Bootstrap Vite', description: 'Vite + React 19 + TS', status: 'done', projectId: 'p1', assigneeId: null, priority: 'low', order: 0 },
  { id: '2', title: 'Wire Zustand + Query', description: 'Two state layers', status: 'in_progress', projectId: 'p1', assigneeId: null, priority: 'high', order: 0 },
  { id: '3', title: 'Build Kanban', description: '@dnd-kit', status: 'in_progress', projectId: 'p1', assigneeId: null, priority: 'high', order: 1 },
  { id: '4', title: 'React Router v8', description: 'loaders as middleware', status: 'review', projectId: 'p1', assigneeId: null, priority: 'medium', order: 0 },
  { id: '5', title: 'Storybook Autodocs', description: 'Like Scalar for components', status: 'todo', projectId: 'p1', assigneeId: null, priority: 'medium', order: 0 },
  { id: '6', title: 'Socket.IO manager', description: 'behind clean interface', status: 'todo', projectId: 'p1', assigneeId: null, priority: 'low', order: 1 },
];

export function KanbanPage() {
  return (
    <div className="space-y-4">
      <Typography variant="h2">Kanban</Typography>
      <KanbanBoard tasks={SAMPLE} />
    </div>
  );
}
