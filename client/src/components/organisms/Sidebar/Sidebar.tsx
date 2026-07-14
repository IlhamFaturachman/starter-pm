import { paths } from '@/routes/paths';
import { SidebarNavItem, type SidebarNavItemProps } from '@/components/molecules/SidebarNavItem';

const items: SidebarNavItemProps[] = [
  { to: paths.dashboard, label: 'Dashboard', icon: 'dashboard' },
  { to: paths.projects, label: 'Projects', icon: 'projects' },
  { to: paths.kanban, label: 'Kanban', icon: 'kanban' },
  { to: paths.tableDemo, label: 'Table Demo', icon: 'table' },
  {
    to: paths.settings,
    label: 'Settings',
    icon: 'settings',
    children: [
      { to: paths.userManagement, label: 'User Management', icon: 'users' },
      { to: paths.groupManagement, label: 'Group Management', icon: 'groups' },
    ],
  },
];

export function Sidebar() {
  return (
    <aside className="hidden w-64 border-r border-surface-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-900 md:block">
      <nav className="flex flex-col gap-1">
        {items.map((item) => <SidebarNavItem key={item.to} {...item} />)}
      </nav>
    </aside>
  );
}
