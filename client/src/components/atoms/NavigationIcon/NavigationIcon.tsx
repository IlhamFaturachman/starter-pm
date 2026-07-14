export type NavigationIconName =
  | 'dashboard'
  | 'projects'
  | 'kanban'
  | 'table'
  | 'settings'
  | 'users'
  | 'groups'
  | 'chevron';

export interface NavigationIconProps {
  name: NavigationIconName;
  className?: string;
}

const paths: Record<Exclude<NavigationIconName, 'chevron'>, string> = {
  dashboard: 'M4 13h6V4H4v9Zm0 7h6v-4H4v4Zm10 0h6v-9h-6v9Zm0-16v4h6V4h-6Z',
  projects: 'M4.75 7.75h14.5v11.5H4.75V7.75Zm3-3h8.5l1.25 3H6.5l1.25-3Z',
  kanban: 'M5 4.75h14v14.5H5V4.75Zm4 3v8.5m3-8.5v5m3-5v8.5',
  table: 'M4.75 5.25h14.5v13.5H4.75V5.25ZM4.75 10h14.5M10 5.25v13.5',
  settings:
    'M12 15.25A3.25 3.25 0 1 0 12 8.75a3.25 3.25 0 0 0 0 6.5Zm7.4-.25a1.7 1.7 0 0 0 .34 1.88l.06.06-2.42 2.42-.06-.06a1.7 1.7 0 0 0-1.88-.34 1.7 1.7 0 0 0-1.03 1.56v.09h-3.42v-.09A1.7 1.7 0 0 0 9.96 19a1.7 1.7 0 0 0-1.88.34l-.06.06-2.42-2.42.06-.06A1.7 1.7 0 0 0 6 15.04a1.7 1.7 0 0 0-1.56-1.03h-.09v-3.42h.09A1.7 1.7 0 0 0 6 9.56a1.7 1.7 0 0 0-.34-1.88L5.6 7.62 8.02 5.2l.06.06a1.7 1.7 0 0 0 1.88.34 1.7 1.7 0 0 0 1.03-1.56v-.09h3.42v.09a1.7 1.7 0 0 0 1.03 1.56 1.7 1.7 0 0 0 1.88-.34l.06-.06 2.42 2.42-.06.06A1.7 1.7 0 0 0 19.4 9.56a1.7 1.7 0 0 0 1.56 1.03h.09v3.42h-.09A1.7 1.7 0 0 0 19.4 15Z',
  users: 'M16 19v-1.25A3.75 3.75 0 0 0 12.25 14h-5.5A3.75 3.75 0 0 0 3 17.75V19m6.5-9a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm7.25-5.75a3 3 0 0 1 0 5.5M21 19v-1.25a3.75 3.75 0 0 0-2.25-3.44',
  groups: 'M8 11a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Zm8 0a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5ZM3.5 19v-1a3.5 3.5 0 0 1 3.5-3.5h2A3.5 3.5 0 0 1 12.5 18v1m-1.5-3.25a3.5 3.5 0 0 1 2.5-1.25h2A3.5 3.5 0 0 1 19 18v1',
};

export function NavigationIcon({ name, className }: NavigationIconProps) {
  if (name === 'chevron') {
    return (
      <svg aria-hidden="true" viewBox="0 0 20 20" fill="none" className={className}>
        <path d="m6 7.5 4 4 4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className={className}>
      <path d={paths[name]} stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
