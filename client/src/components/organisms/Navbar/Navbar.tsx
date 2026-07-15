import { useEffect, useRef, useState } from 'react';
import { ThemeToggle } from '@/components/atoms/ThemeToggle';
import { useNavigate } from 'react-router';
import { Typography } from '@/components/atoms/Typography';
import { useAuthStore } from '@/store/authStore';
import { paths } from '@/routes/paths';

const defaultProfile = {
  name: 'Raka Pratama',
  email: 'raka@pm-fe.com',
  role: 'admin' as const,
};

const roleLabel = {
  admin: 'Administrator',
  member: 'Team Member',
};

function ChevronDownIcon({ open }: { open: boolean }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      fill="none"
      className={`h-4 w-4 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
    >
      <path
        d="m5 7.5 5 5 5-5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function DefaultProfilePhoto({ className }: { className?: string }) {
  return (
    <span
      className={`flex items-center justify-center rounded-full bg-slate-200 text-slate-500 dark:bg-slate-600 dark:text-slate-300 ${className ?? ''}`}
    >
      <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="h-[62%] w-[62%]">
        <path
          d="M12 12a3.75 3.75 0 1 0 0-7.5 3.75 3.75 0 0 0 0 7.5Zm-7 7.5c.9-3.25 3.5-5 7-5s6.1 1.75 7 5"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
    </span>
  );
}

function SettingsIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="h-4 w-4">
      <path
        d="M12 15.25A3.25 3.25 0 1 0 12 8.75a3.25 3.25 0 0 0 0 6.5Z"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path
        d="M19.4 15a1.7 1.7 0 0 0 .34 1.88l.06.06-2.42 2.42-.06-.06a1.7 1.7 0 0 0-1.88-.34 1.7 1.7 0 0 0-1.03 1.56v.09h-3.42v-.09A1.7 1.7 0 0 0 9.96 19a1.7 1.7 0 0 0-1.88.34l-.06.06-2.42-2.42.06-.06A1.7 1.7 0 0 0 6 15.04a1.7 1.7 0 0 0-1.56-1.03h-.09v-3.42h.09A1.7 1.7 0 0 0 6 9.56a1.7 1.7 0 0 0-.34-1.88L5.6 7.62 8.02 5.2l.06.06a1.7 1.7 0 0 0 1.88.34 1.7 1.7 0 0 0 1.03-1.56v-.09h3.42v.09a1.7 1.7 0 0 0 1.03 1.56 1.7 1.7 0 0 0 1.88-.34l.06-.06 2.42 2.42-.06.06A1.7 1.7 0 0 0 19.4 9.56a1.7 1.7 0 0 0 1.56 1.03h.09v3.42h-.09A1.7 1.7 0 0 0 19.4 15Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function LogoutIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="h-4 w-4">
      <path
        d="M14 8V5.5A1.5 1.5 0 0 0 12.5 4h-6A1.5 1.5 0 0 0 5 5.5v13A1.5 1.5 0 0 0 6.5 20h6a1.5 1.5 0 0 0 1.5-1.5V16M11 12h8m0 0-3-3m3 3-3 3"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Navbar() {
  const navigate = useNavigate();
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const profileMenuRef = useRef<HTMLDivElement>(null);
  const profile = user ?? defaultProfile;

  useEffect(() => {
    const closeMenu = (event: MouseEvent) => {
      if (!profileMenuRef.current?.contains(event.target as Node)) setIsProfileMenuOpen(false);
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsProfileMenuOpen(false);
    };

    document.addEventListener('mousedown', closeMenu);
    document.addEventListener('keydown', closeOnEscape);
    return () => {
      document.removeEventListener('mousedown', closeMenu);
      document.removeEventListener('keydown', closeOnEscape);
    };
  }, []);

  const handleLogout = () => {
    setIsProfileMenuOpen(false);
    logout();
    navigate(paths.login);
  };

  return (
    <header className="relative z-20 flex h-[72px] items-center justify-between border-b border-slate-200/80 bg-white/95 px-4 shadow-[0_1px_2px_rgba(15,23,42,0.03)] backdrop-blur sm:px-6 dark:border-slate-700 dark:bg-slate-900/95">
      <div className="flex items-center gap-3">
        <img src="/pm-logo.svg" alt="PM" className="h-14 w-16 object-contain" />
        <div>
          <Typography
            variant="h4"
            className="!text-base !font-bold !text-slate-900 dark:!text-white"
          >
            Project Management
          </Typography>
          <p className="hidden text-xs font-medium text-slate-400 sm:block">Workspace</p>
        </div>
      </div>

      {/* Right side: theme toggle + profile */}
      <div className="flex items-center gap-3">
        {/* Theme toggle */}
        <div className="hidden items-center gap-2 sm:flex">
          <span className="text-xs font-medium text-slate-400 dark:text-slate-500">
            {/* label hidden, toggle is self-explanatory */}
          </span>
          <ThemeToggle />
        </div>

        <div className="h-6 w-px bg-slate-200 dark:bg-slate-700" aria-hidden="true" />

      <div ref={profileMenuRef} className="relative">
        <button
          type="button"
          aria-label="Open user menu"
          aria-haspopup="menu"
          aria-expanded={isProfileMenuOpen}
          onClick={() => setIsProfileMenuOpen((open) => !open)}
          className="group flex items-center gap-2 rounded-2xl p-1.5 text-left transition-colors hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 dark:hover:bg-slate-800 dark:focus-visible:ring-offset-slate-900 sm:gap-3 sm:pr-3"
        >
          <DefaultProfilePhoto className="h-9 w-9 shrink-0 ring-2 ring-white shadow-sm dark:ring-slate-900" />
          <span className="hidden min-w-0 sm:block">
            <span className="block max-w-36 truncate text-sm font-semibold text-slate-700 dark:text-slate-100">
              {profile.name}
            </span>
            <span className="block text-xs font-medium text-slate-400">
              {roleLabel[profile.role]}
            </span>
          </span>
          <span className="text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300">
            <ChevronDownIcon open={isProfileMenuOpen} />
          </span>
        </button>

        {isProfileMenuOpen && (
          <div
            role="menu"
            aria-label="User menu"
            className="absolute right-0 top-[calc(100%+0.65rem)] w-72 overflow-hidden rounded-2xl border border-slate-200 bg-white p-2 shadow-[0_20px_40px_-12px_rgba(15,23,42,0.22)] dark:border-slate-700 dark:bg-slate-800"
          >
            <div className="flex items-center gap-3 rounded-xl bg-slate-50 p-3 dark:bg-slate-700/50">
              <DefaultProfilePhoto className="h-11 w-11 shrink-0" />
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-slate-800 dark:text-white">
                  {profile.name}
                </p>
                <p className="truncate text-xs text-slate-500 dark:text-slate-300">
                  {profile.email}
                </p>
                <span className="mt-1 inline-flex rounded-full bg-primary-100 px-2 py-0.5 text-[11px] font-semibold text-primary-700 dark:bg-primary-900/50 dark:text-primary-200">
                  {roleLabel[profile.role]}
                </span>
              </div>
            </div>
            <div className="my-2 border-t border-slate-100 dark:border-slate-700" />
            <button
              type="button"
              role="menuitem"
              onClick={() => setIsProfileMenuOpen(false)}
              className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 dark:text-slate-200 dark:hover:bg-slate-700 dark:hover:text-white"
            >
              <SettingsIcon />
              Settings
            </button>
            <button
              type="button"
              role="menuitem"
              onClick={handleLogout}
              className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-rose-600 transition-colors hover:bg-rose-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500 dark:text-rose-400 dark:hover:bg-rose-500/10"
            >
              <LogoutIcon />
              Logout
            </button>
          </div>
        )}
      </div>
      </div>
    </header>
  );
}
