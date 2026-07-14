import { useState } from 'react';
import {
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
  closestCorners,
  useDroppable,
  type DragEndEvent,
} from '@dnd-kit/core';
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
  arrayMove,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import type { Task, TaskStatus } from '@/types/api';
import { Badge } from '@/components/atoms/Badge';
import { cn } from '@/lib/cn';

const COLUMNS: { id: TaskStatus; title: string; tone: 'neutral' | 'info' | 'warning' | 'success' }[] = [
  { id: 'todo', title: 'To Do', tone: 'neutral' },
  { id: 'in_progress', title: 'In Progress', tone: 'info' },
  { id: 'review', title: 'Review', tone: 'warning' },
  { id: 'done', title: 'Done', tone: 'success' },
];

export interface KanbanBoardProps {
  tasks: Task[];
  onTaskMove?: (taskId: string, toStatus: TaskStatus, newOrder: number) => void;
}

function TaskCard({ task }: { task: Task }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: task.id,
  });
  return (
    <div
      ref={setNodeRef}
      style={{ transform: CSS.Transform.toString(transform), transition }}
      {...attributes}
      {...listeners}
      className={cn(
        'cursor-grab select-none rounded-md border border-surface-200 bg-white p-3 text-sm shadow-sm',
        isDragging && 'opacity-50',
      )}
    >
      <div className="font-medium text-surface-900">{task.title}</div>
      {task.description && <p className="mt-1 text-xs text-surface-600">{task.description}</p>}
      <div className="mt-2">
        <Badge tone={task.priority === 'high' ? 'danger' : task.priority === 'medium' ? 'warning' : 'neutral'}>
          {task.priority}
        </Badge>
      </div>
    </div>
  );
}

function Column({
  status,
  title,
  tone,
  tasks,
}: {
  status: TaskStatus;
  title: string;
  tone: 'neutral' | 'info' | 'warning' | 'success';
  tasks: Task[];
}) {
  const { setNodeRef, isOver } = useDroppable({ id: status });
  return (
    <div
      ref={setNodeRef}
      data-column={status}
      className={cn(
        'flex w-72 flex-col gap-2 rounded-md bg-surface-50 p-3 transition-colors',
        isOver && 'bg-primary-50',
      )}
    >
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-surface-900">{title}</h3>
        <Badge tone={tone}>{tasks.length}</Badge>
      </div>
      <SortableContext items={tasks.map((t) => t.id)} strategy={verticalListSortingStrategy}>
        <div className="flex min-h-24 flex-col gap-2">
          {tasks.map((t) => (
            <TaskCard key={t.id} task={t} />
          ))}
        </div>
      </SortableContext>
    </div>
  );
}

export function KanbanBoard({ tasks, onTaskMove }: KanbanBoardProps) {
  const [state, setState] = useState(tasks);
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }));

  const grouped: Record<TaskStatus, Task[]> = {
    todo: [],
    in_progress: [],
    review: [],
    done: [],
  };
  for (const t of state) grouped[t.status].push(t);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    const taskId = String(active.id);
    const task = state.find((t) => t.id === taskId);
    if (!task) return;

    const isOverColumn = COLUMNS.some((c) => c.id === over.id);
    const destStatus: TaskStatus = isOverColumn
      ? (over.id as TaskStatus)
      : (state.find((t) => t.id === String(over.id))?.status ?? task.status);

    if (destStatus !== task.status) {
      setState((prev) =>
        prev.map((t) => (t.id === taskId ? { ...t, status: destStatus } : t)),
      );
      onTaskMove?.(taskId, destStatus, 0);
      return;
    }

    const fromIdx = grouped[task.status].findIndex((t) => t.id === taskId);
    const toIdx = grouped[task.status].findIndex((t) => t.id === String(over.id));
    if (fromIdx !== -1 && toIdx !== -1 && fromIdx !== toIdx) {
      const reordered = arrayMove(grouped[task.status], fromIdx, toIdx);
      const remaining = [...grouped[task.status]];
      setState((prev) =>
        prev.map((t) => {
          if (t.status !== task.status) return t;
          return reordered.shift() ?? remaining.shift() ?? t;
        }),
      );
    }
  };

  return (
    <DndContext sensors={sensors} collisionDetection={closestCorners} onDragEnd={handleDragEnd}>
      <div className="flex gap-4 overflow-x-auto p-2">
        {COLUMNS.map((c) => (
          <Column key={c.id} status={c.id} title={c.title} tone={c.tone} tasks={grouped[c.id]} />
        ))}
      </div>
    </DndContext>
  );
}
