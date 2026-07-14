import { render, screen } from '@testing-library/react';
import { KanbanBoard } from './KanbanBoard';
import type { Task } from '@/types/api';

const tasks: Task[] = [
  { id: '1', title: 'Wire login', description: '', status: 'todo', projectId: 'p', assigneeId: null, priority: 'high', order: 0 },
  { id: '2', title: 'Design tokens', description: '', status: 'in_progress', projectId: 'p', assigneeId: null, priority: 'medium', order: 0 },
];

describe('KanbanBoard', () => {
  it('renders column titles and tasks', () => {
    render(<KanbanBoard tasks={tasks} />);
    expect(screen.getByText('To Do')).toBeInTheDocument();
    expect(screen.getByText('In Progress')).toBeInTheDocument();
    expect(screen.getByText('Wire login')).toBeInTheDocument();
    expect(screen.getByText('Design tokens')).toBeInTheDocument();
  });
});
