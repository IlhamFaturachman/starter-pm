import { useState, useRef, useEffect } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router';
import { NavigationIcon } from '@/components/atoms/NavigationIcon';
import { paths } from '@/routes/paths';
import { cn } from '@/lib/cn';

export function MobileBottomNav() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const settingsRef = useRef<HTMLDivElement>(null);

  // Close Settings popover when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (settingsRef.current && !settingsRef.current.contains(event.target as Node)) {
        setIsSettingsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const isSettingsActive = location.pathname.startsWith('/settings');

  const mainItems = [
    { to: paths.dashboard, label: 'Dashboard', icon: 'dashboard' as const },
    { to: paths.projects, label: 'Projects', icon: 'projects' as const },
    { to: paths.kanban, label: 'Kanban', icon: 'kanban' as const },
    { to: paths.tableDemo, label: 'Table Demo', icon: 'table' as const },
  ];

  return (
    <nav className="border-t border-slate-200 bg-white/95 backdrop-blur-md px-2 py-1.5 dark:border-slate-800 dark:bg-slate-900/95 md:hidden z-30 shadow-[0_-4px_12px_rgba(0,0,0,0.03)]">
      <div className="flex items-center justify-around">
        {mainItems.map((item) => {
          const isActive = location.pathname === item.to;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={() => setIsSettingsOpen(false)}
              className={({ isActive: linkActive }) =>
                cn(
                  "flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all duration-200 relative group",
                  linkActive 
                    ? "text-primary-600 dark:text-primary-400 font-semibold" 
                    : "text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200"
                )
              }
            >
              <NavigationIcon name={item.icon} className="h-5 w-5 mb-0.5" />
              <span className="text-[10px] tracking-wide font-medium">{item.label}</span>
              {isActive && (
                <span className="absolute bottom-[-2px] h-1 w-5 rounded-full bg-primary-600 dark:bg-primary-400" />
              )}
            </NavLink>
          );
        })}

        {/* Settings Item with Popover */}
        <div ref={settingsRef} className="relative">
          <button
            type="button"
            onClick={() => setIsSettingsOpen(!isSettingsOpen)}
            className={cn(
              "flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all duration-200 relative focus:outline-none",
              isSettingsActive
                ? "text-primary-600 dark:text-primary-400 font-semibold"
                : "text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200"
            )}
          >
            <NavigationIcon name="settings" className="h-5 w-5 mb-0.5" />
            <span className="text-[10px] tracking-wide font-medium">Settings</span>
            {isSettingsActive && (
              <span className="absolute bottom-[-2px] h-1 w-5 rounded-full bg-primary-600 dark:bg-primary-400" />
            )}
          </button>

          {/* Submenu Popover */}
          {isSettingsOpen && (
            <div className="absolute right-0 bottom-full mb-3 w-48 rounded-xl border border-slate-200 bg-white/95 backdrop-blur-md p-1.5 shadow-[0_10px_25px_-5px_rgba(0,0,0,0.1),0_8px_10px_-6px_rgba(0,0,0,0.1)] dark:border-slate-700 dark:bg-slate-800/95 z-50 animate-[slide-up_0.15s_ease-out]">
              <p className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 border-b border-slate-100 dark:border-slate-700/50 mb-1">
                Settings
              </p>
              <button
                type="button"
                onClick={() => {
                  navigate(paths.userManagement);
                  setIsSettingsOpen(false);
                }}
                className={cn(
                  "flex w-full items-center gap-2 rounded-lg px-2.5 py-2 text-left text-sm transition-colors cursor-pointer",
                  location.pathname === paths.userManagement
                    ? "bg-primary-50 font-semibold text-primary-700 dark:bg-primary-900/30 dark:text-primary-200"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-700"
                )}
              >
                <NavigationIcon name="users" className="h-4 w-4" />
                User Management
              </button>
              <button
                type="button"
                onClick={() => {
                  navigate(paths.groupManagement);
                  setIsSettingsOpen(false);
                }}
                className={cn(
                  "flex w-full items-center gap-2 rounded-lg px-2.5 py-2 text-left text-sm transition-colors cursor-pointer",
                  location.pathname === paths.groupManagement
                    ? "bg-primary-50 font-semibold text-primary-700 dark:bg-primary-900/30 dark:text-primary-200"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-700"
                )}
              >
                <NavigationIcon name="groups" className="h-4 w-4" />
                Group Management
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
