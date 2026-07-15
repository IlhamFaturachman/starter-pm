export interface SparklineChartProps {
  /** Array of numeric data points */
  data: number[];
  /** Month/time labels rendered below the chart */
  labels: string[];
  /** Stroke + gradient color — should be a valid hex/rgb */
  color?: string;
}

/**
 * Pure SVG sparkline chart with cubic-bezier curve,
 * gradient area fill, subtle dashed grid lines, and
 * a highlighted endpoint dot.
 */
export function SparklineChart({
  data,
  labels,
  color = '#2563eb',
}: SparklineChartProps) {
  const W = 300;
  const H = 90;
  const PX = 6;
  const PY = 10;

  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;

  const pts = data.map((v, i) => ({
    x: PX + (i / (data.length - 1)) * (W - PX * 2),
    y: H - PY - ((v - min) / range) * (H - PY * 2),
  }));

  const linePath = pts.reduce((d, p, i) => {
    if (i === 0) return `M${p.x},${p.y}`;
    const prev = pts[i - 1];
    const cpx = (prev.x + p.x) / 2;
    return `${d} C${cpx},${prev.y} ${cpx},${p.y} ${p.x},${p.y}`;
  }, '');

  const areaPath = `${linePath} L${pts[pts.length - 1].x},${H} L${pts[0].x},${H} Z`;
  const last = pts[pts.length - 1];

  return (
    <div>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="w-full"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="sparkFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.18" />
            <stop offset="100%" stopColor={color} stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Dashed grid lines */}
        {[0.25, 0.5, 0.75].map((t) => (
          <line
            key={t}
            x1={PX}
            y1={PY + t * (H - PY * 2)}
            x2={W - PX}
            y2={PY + t * (H - PY * 2)}
            stroke="currentColor"
            strokeWidth="1"
            strokeDasharray="4 4"
            className="text-slate-200 dark:text-slate-700"
          />
        ))}

        {/* Area fill */}
        <path d={areaPath} fill="url(#sparkFill)" />

        {/* Line */}
        <path
          d={linePath}
          fill="none"
          stroke={color}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Endpoint dot */}
        <circle cx={last.x} cy={last.y} r="5" fill={color} />
        <circle
          cx={last.x}
          cy={last.y}
          r="8"
          fill="none"
          stroke={color}
          strokeWidth="1.5"
          strokeOpacity="0.3"
        />
      </svg>

      {/* X-axis labels */}
      <div className="mt-2 flex justify-between">
        {labels.map((l) => (
          <span
            key={l}
            className="text-[10px] font-medium text-slate-400 dark:text-slate-500"
          >
            {l}
          </span>
        ))}
      </div>
    </div>
  );
}
