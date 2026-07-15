import type { ReactNode } from 'react';
import { Outlet } from 'react-router';
import { Navbar } from '@/components/organisms/Navbar';
import { Sidebar } from '@/components/organisms/Sidebar';
import { MobileBottomNav } from '@/components/organisms/MobileBottomNav';

export interface DashboardLayoutProps {
  children?: ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="flex h-full flex-col bg-slate-100 dark:bg-slate-900">
      <Navbar />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-y-auto p-6 dark:bg-slate-900">{children ?? <Outlet />}</main>
      </div>
      <MobileBottomNav />
    </div>
  );
}

