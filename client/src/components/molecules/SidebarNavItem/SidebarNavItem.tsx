import { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router';
import { NavigationIcon, type NavigationIconName } from '@/components/atoms/NavigationIcon';
import { cn } from '@/lib/cn';

export interface SidebarLinkItem {
  label: string;
  to: string;
  icon: NavigationIconName;
}

export interface SidebarNavItemProps extends SidebarLinkItem {
  children?: SidebarLinkItem[];
}

const itemClass = 'flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors';

export function SidebarNavItem({ label, to, icon, children }: SidebarNavItemProps) {
  const location = useLocation();
  const hasChildren = Boolean(children?.length);
  const isChildActive = children?.some((child) => location.pathname === child.to) ?? false;
  const [isOpen, setIsOpen] = useState(isChildActive);

  useEffect(() => {
    if (isChildActive) setIsOpen(true);
  }, [isChildActive]);

  if (!hasChildren) {
    return (
      <NavLink
        to={to}
        className={({ isActive }) =>
          cn(itemClass, isActive ? 'bg-primary-50 text-primary-700 dark:bg-primary-900/30 dark:text-primary-200' : 'text-surface-700 hover:bg-surface-100 dark:text-slate-300 dark:hover:bg-slate-800')
        }
      >
        <NavigationIcon name={icon} className="h-5 w-5 shrink-0" />
        {label}
      </NavLink>
    );
  }

  return (
    <div>
      <button
        type="button"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((open) => !open)}
        className={cn(itemClass, isChildActive ? 'bg-primary-50 text-primary-700 dark:bg-primary-900/30 dark:text-primary-200' : 'text-surface-700 hover:bg-surface-100 dark:text-slate-300 dark:hover:bg-slate-800')}
      >
        <NavigationIcon name={icon} className="h-5 w-5 shrink-0" />
        <span className="flex-1 text-left">{label}</span>
        <NavigationIcon name="chevron" className={cn('h-4 w-4 transition-transform', isOpen && 'rotate-180')} />
      </button>
      {isOpen && (
        <div className="mt-1 ml-5 space-y-1 border-l border-slate-200 pl-3 dark:border-slate-700">
          {children?.map((child) => (
            <NavLink
              key={child.to}
              to={child.to}
              className={({ isActive }) =>
                cn('flex items-center gap-2 rounded-lg px-2.5 py-2 text-sm transition-colors', isActive ? 'bg-primary-50 font-semibold text-primary-700 dark:bg-primary-900/30 dark:text-primary-200' : 'text-slate-500 hover:bg-surface-100 hover:text-slate-800 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-100')
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
