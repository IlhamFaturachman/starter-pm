import { useNavigate } from 'react-router';
import { Button } from '@/components/atoms/Button';
import { Typography } from '@/components/atoms/Typography';
import { useAuthStore } from '@/store/authStore';
import { paths } from '@/routes/paths';

export function Navbar() {
  const navigate = useNavigate();
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);

  return (
    <header className="flex h-14 items-center justify-between border-b border-surface-200 bg-white px-6">
      <div className="flex items-center gap-3">
        <div className="h-7 w-7 rounded-md bg-primary-600" />
        <Typography variant="h4" className="!text-base !font-semibold">
          PM-FE
        </Typography>
      </div>

      <div className="flex items-center gap-3">
        {user && (
          <Typography variant="body" className="!text-surface-600">
            {user.email}
          </Typography>
        )}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => {
            logout();
            navigate(paths.login);
          }}
        >
          Logout
        </Button>
      </div>
    </header>
  );
}
