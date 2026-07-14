import { createBrowserRouter, Navigate } from 'react-router';
import { paths } from './paths';
import { authLoader, guestLoader, otpLoader } from './guards';
import { DashboardLayout } from '@/components/templates/DashboardLayout';
import { LoginPage } from '@/pages/LoginPage';
import { SignupPage } from '@/pages/SignupPage';
import { ForgotPasswordPage } from '@/pages/ForgotPasswordPage';
import { OtpPage } from '@/pages/OtpPage';
import { DashboardPage } from '@/pages/DashboardPage';
import { ProjectsPage } from '@/pages/ProjectsPage';
import { KanbanPage } from '@/pages/KanbanPage';
import { TableDemoPage } from '@/pages/TableDemoPage';
import { UserManagementPage } from '@/pages/UserManagementPage';
import { GroupManagementPage } from '@/pages/GroupManagementPage';

export const router = createBrowserRouter([
  {
    path: paths.root,
    element: <Navigate to={paths.dashboard} replace />,
  },
  {
    path: paths.login,
    loader: guestLoader,
    element: <LoginPage />,
  },
  {
    path: paths.signup,
    loader: guestLoader,
    element: <SignupPage />,
  },
  {
    path: paths.forgotPassword,
    loader: guestLoader,
    element: <ForgotPasswordPage />,
  },
  {
    path: paths.verifyOtp,
    loader: otpLoader,
    element: <OtpPage />,
  },
  {
    id: 'app',
    loader: guestLoader, // change to authLoader later when auth is implemented
    element: <DashboardLayout />,
    children: [
      { index: true, element: <Navigate to={paths.dashboard} replace /> },
      { path: paths.dashboard, element: <DashboardPage /> },
      { path: paths.projects, element: <ProjectsPage /> },
      { path: paths.kanban, element: <KanbanPage /> },
      { path: paths.tableDemo, element: <TableDemoPage /> },
      { path: paths.settings, element: <Navigate to={paths.userManagement} replace /> },
      { path: paths.userManagement, element: <UserManagementPage /> },
      { path: paths.groupManagement, element: <GroupManagementPage /> },
    ],
  },
  {
    path: '*',
    element: (
      <div className="flex min-h-screen items-center justify-center text-text-main-light dark:text-text-main-dark">
        404 — Not found
      </div>
    ),
  },
]);
