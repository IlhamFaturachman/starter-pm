import { NavLink } from 'react-router';
import { paths } from '@/routes/paths';
import { cn } from '@/lib/cn';

const items = [
  { to: paths.dashboard, label: 'Dashboard' },
  { to: paths.projects, label: 'Projects' },
  { to: paths.kanban, label: 'Kanban' },
  { to: paths.tableDemo, label: 'Table Demo' },
];

export function Sidebar() {
  return (
    <aside className="hidden w-56 border-r border-surface-200 bg-white p-4 md:block">
      <nav className="flex flex-col gap-1">
        {items.map((it) => (
          <NavLink
            key={it.to}
            to={it.to}
            className={({ isActive }) =>
              cn(
                'rounded-md px-3 py-2 text-sm font-medium transition-colors',
                isActive
                  ? 'bg-primary-50 text-primary-700'
                  : 'text-surface-700 hover:bg-surface-100',
              )
            }
          >
            {it.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
