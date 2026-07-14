import type { Meta, StoryObj } from '@storybook/react';
import { KanbanBoard } from './KanbanBoard';
import type { Task } from '@/types/api';

const tasks: Task[] = [
  { id: '1', title: 'Wire login', description: 'Connect to Express BE', status: 'todo', projectId: 'p', assigneeId: null, priority: 'high', order: 0 },
  { id: '2', title: 'Set up design tokens', description: '', status: 'in_progress', projectId: 'p', assigneeId: null, priority: 'medium', order: 0 },
  { id: '3', title: 'Build Kanban drag', description: '@dnd-kit', status: 'in_progress', projectId: 'p', assigneeId: null, priority: 'high', order: 1 },
  { id: '4', title: 'PR review', description: '', status: 'review', projectId: 'p', assigneeId: null, priority: 'low', order: 0 },
  { id: '5', title: 'Bootstrap Vite', description: '', status: 'done', projectId: 'p', assigneeId: null, priority: 'low', order: 0 },
];

const meta: Meta<typeof KanbanBoard> = {
  title: 'Organisms/KanbanBoard',
  component: KanbanBoard,
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof KanbanBoard>;

export const Default: Story = { args: { tasks } };
