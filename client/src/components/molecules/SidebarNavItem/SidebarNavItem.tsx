import { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router';
import { NavigationIcon, type NavigationIconName } from '@/components/atoms/NavigationIcon';
import { Tooltip } from '@/components/atoms/Tooltip';
import { cn } from '@/lib/cn';

export interface SidebarLinkItem {
  label: string;
  to: string;
  icon: NavigationIconName;
}

export interface SidebarNavItemProps extends SidebarLinkItem {
  children?: SidebarLinkItem[];
  isCollapsed?: boolean;
}

const itemClass = 'flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors';

export function SidebarNavItem({ label, to, icon, children, isCollapsed = false }: SidebarNavItemProps) {
  const location = useLocation();
  const hasChildren = Boolean(children?.length);
  const isChildActive = children?.some((child) => location.pathname === child.to) ?? false;
  const [isOpen, setIsOpen] = useState(isChildActive);

  useEffect(() => {
    if (isChildActive) setIsOpen(true);
  }, [isChildActive]);

  if (!hasChildren) {
    const link = (
      <NavLink
        to={to}
        aria-label={isCollapsed ? label : undefined}
        className={({ isActive }) =>
          cn(itemClass, isCollapsed && 'justify-center px-2', isActive ? 'bg-primary-50 text-primary-700 dark:bg-primary-900/30 dark:text-primary-200' : 'text-surface-700 hover:bg-surface-100 dark:text-slate-300 dark:hover:bg-slate-800')
        }
      >
        <NavigationIcon name={icon} className="h-5 w-5 shrink-0" />
        {!isCollapsed && label}
      </NavLink>
    );

    return isCollapsed ? <Tooltip label={label}>{link}</Tooltip> : link;
  }

  return (
    <div className="relative">
      <Tooltip label={label} className={isCollapsed ? undefined : 'contents'}>
        <button
          type="button"
          aria-label={isCollapsed ? label : undefined}
          aria-expanded={isOpen}
          onClick={() => setIsOpen((open) => !open)}
          className={cn(itemClass, isCollapsed && 'justify-center px-2', isChildActive ? 'bg-primary-50 text-primary-700 dark:bg-primary-900/30 dark:text-primary-200' : 'text-surface-700 hover:bg-surface-100 dark:text-slate-300 dark:hover:bg-slate-800')}
        >
          <NavigationIcon name={icon} className="h-5 w-5 shrink-0" />
          {!isCollapsed && <span className="flex-1 text-left">{label}</span>}
          {!isCollapsed && <NavigationIcon name="chevron" className={cn('h-4 w-4 transition-transform', isOpen && 'rotate-180')} />}
        </button>
      </Tooltip>
      {isOpen && (
        <div className={cn(isCollapsed ? 'absolute left-[calc(100%+0.75rem)] top-0 z-30 w-52 rounded-xl border border-slate-200 bg-white p-2 shadow-xl dark:border-slate-700 dark:bg-slate-800' : 'mt-1 ml-5 space-y-1 border-l border-slate-200 pl-3 dark:border-slate-700')}>
          {isCollapsed && <p className="px-2.5 pb-1.5 text-xs font-semibold uppercase tracking-wide text-slate-400">{label}</p>}
          {children?.map((child) => (
            <NavLink
              key={child.to}
              to={child.to}
              className={({ isActive }) =>
                cn('flex items-center gap-2 rounded-lg px-2.5 py-2 text-sm transition-colors', isActive ? 'bg-primary-50 font-semibold text-primary-700 dark:bg-primary-900/30 dark:text-primary-200' : 'text-slate-500 hover:bg-surface-100 hover:text-slate-800 dark:text-slate-400 dark:hover:bg-slate-700 dark:hover:text-slate-100')
              }
            >
              <NavigationIcon name={child.icon} className="h-4 w-4" />
              {child.label}
            </NavLink>
          ))}
        </div>
      )}
    </div>
  );
}
