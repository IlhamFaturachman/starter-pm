import type React from 'react';
import { MetricChip } from '@/components/molecules/MetricChip';

const METRICS: React.ComponentProps<typeof MetricChip>[] = [
  { label: 'Sprints Done', value: '13', icon: '🏁', color: 'emerald' },
  { label: 'Avg Cycle Time', value: '3.2d', icon: '⏱', color: 'blue' },
  { label: 'Code Reviews', value: '47', icon: '🔍', color: 'violet' },
  { label: 'Deployments', value: '28', icon: '🚀', color: 'amber' },
];

/**
 * Organism: bottom row of 4 quick-metric chips.
 * Composed entirely from MetricChip molecules.
 */
export function DashboardMetricsRow() {
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
      {METRICS.map((m) => (
        <MetricChip key={m.label} {...m} />
      ))}
    </div>
  );
}
