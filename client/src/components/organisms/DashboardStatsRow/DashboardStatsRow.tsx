import { StatCard } from '@/components/molecules/StatCard';

const STATS = [
  {
    id: 'velocity',
    label: 'Project Velocity',
    value: '87%',
    change: '+12%',
    trend: 'up' as const,
    sub: 'Active Sprints: 4',
    color: 'teal' as const,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
        <path d="M13 3L4 14h7l-1 7 9-11h-7l1-7Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    id: 'tasks',
    label: 'Task Completion',
    value: '245',
    change: '/ 310',
    trend: 'neutral' as const,
    sub: 'Due This Week: 18',
    color: 'violet' as const,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
        <path d="M9 11l3 3L22 4M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    id: 'capacity',
    label: 'Team Capacity',
    value: '82%',
    change: '-3%',
    trend: 'down' as const,
    sub: 'Utilized',
    color: 'amber' as const,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm8 4a3 3 0 0 0 0-6m4 8v-2a3 3 0 0 0-2.27-2.91" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    id: 'bugs',
    label: 'Open Bugs',
    value: '7',
    change: '-5',
    trend: 'up' as const,
    sub: 'vs last sprint',
    color: 'rose' as const,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
        <path d="M12 8v4m0 4h.01M22 12a10 10 0 1 1-20 0 10 10 0 0 1 20 0Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

/**
 * Organism: renders the 4-column KPI stat card grid.
 * Uses StatCard molecule internally.
 */
export function DashboardStatsRow() {
  return (
    <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
      {STATS.map((s) => (
        <StatCard key={s.id} {...s} />
      ))}
    </div>
  );
}
