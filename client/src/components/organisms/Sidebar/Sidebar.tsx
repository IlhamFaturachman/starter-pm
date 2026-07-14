import { paths } from '@/routes/paths';
import { NavigationIcon } from '@/components/atoms/NavigationIcon';
import { SidebarNavItem, type SidebarNavItemProps } from '@/components/molecules/SidebarNavItem';
import { useUiStore } from '@/store/uiStore';

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
  const sidebarOpen = useUiStore((state) => state.sidebarOpen);
  const toggleSidebar = useUiStore((state) => state.toggleSidebar);

  return (
    <aside
      className={`hidden shrink-0 flex-col border-r border-surface-200 bg-white p-3 transition-[width] duration-200 dark:border-slate-700 dark:bg-slate-900 md:flex ${sidebarOpen ? 'w-64' : 'w-20'}`}
    >
      <nav className="flex flex-1 flex-col gap-1">
        {items.map((item) => (
          <SidebarNavItem key={item.to} {...item} isCollapsed={!sidebarOpen} />
        ))}
      </nav>
      <div className="mt-4 border-t border-surface-200 pt-3 dark:border-slate-700">
        <button
          type="button"
          aria-label={sidebarOpen ? 'Collapse sidebar' : 'Expand sidebar'}
          onClick={toggleSidebar}
          className={`flex h-9 w-full items-center justify-between rounded-lg text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white ${sidebarOpen ? 'gap-2 px-3' : 'justify-center'}`}
        >
          {sidebarOpen && <span className="text-sm font-semibold">Collapse</span>}
          <NavigationIcon
            name="chevron"
            className={`h-5 w-5 -rotate-90 transition-transform ${sidebarOpen ? '' : 'rotate-90'}`}
          />
        </button>
      </div>
    </aside>
  );
}
