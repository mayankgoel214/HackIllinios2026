const CONFIG = {
  Critical: {
    dot: "bg-status-critical",
    badge: "bg-red-50 text-red-700 border border-red-200",
    pulse: true,
  },
  High: {
    dot: "bg-status-serious",
    badge: "bg-orange-50 text-orange-700 border border-orange-200",
    pulse: false,
  },
  Medium: {
    dot: "bg-status-caution",
    badge: "bg-amber-50 text-amber-700 border border-amber-200",
    pulse: false,
  },
  Low: {
    dot: "bg-green-50 text-green-700 border border-green-200",
    badge: "bg-green-50 text-green-700 border border-green-200",
    pulse: false,
  },
};

const FALLBACK = {
  dot: "bg-surface-400",
  badge: "bg-surface-100 text-surface-600 border border-surface-200",
  pulse: false,
};

export function StatusDot({ severity }) {
  const c = CONFIG[severity] || FALLBACK;
  return (
    <span className="relative flex h-2.5 w-2.5">
      {c.pulse && (
        <span
          className={`animate-ping absolute inline-flex h-full w-full rounded-full ${c.dot} opacity-60`}
        />
      )}
      <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${c.dot}`} />
    </span>
  );
}

export default function SeverityBadge({ severity }) {
  const c = CONFIG[severity] || FALLBACK;
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2 py-0.5 text-xs font-medium rounded ${c.badge}`}
    >
      <StatusDot severity={severity} />
      {severity || "Unknown"}
    </span>
  );
}
