import { Typography } from '@/components/atoms/Typography';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/molecules/Card';
import { useSocketStore } from '@/store/socketStore';
import { Badge } from '@/components/atoms/Badge';

export function DashboardPage() {
  const socketStatus = useSocketStore((s) => s.status);
  return (
    <div className="space-y-4">
      <Typography variant="h2">Dashboard</Typography>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Welcome</CardTitle>
          </CardHeader>
          <CardContent>
            <Typography variant="body">You're logged in to the PM frontend.</Typography>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Realtime</CardTitle>
          </CardHeader>
          <CardContent>
            <Badge tone={socketStatus === 'connected' ? 'success' : 'neutral'}>{socketStatus}</Badge>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Stack</CardTitle>
          </CardHeader>
          <CardContent>
            <Typography variant="caption">React 19 · Vite · Zustand · TanStack Query · react-data-table-component · @dnd-kit · react-router 8.2.0</Typography>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
