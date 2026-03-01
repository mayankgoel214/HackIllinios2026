import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import SeverityBadge from "./SeverityBadge";
import { getHistory } from "../utils/api";

// Demo equipment list matching seeded Supermemory data
const EQUIPMENT = [
  { id: "PIPE-001", name: "Industrial Pipe Section B-7", type: "Industrial Pipe", lastSeverity: "High", lastInspected: "Feb 10, 2026" },
  { id: "CAT-EXC-001", name: "Hydraulic Excavator 320", type: "Excavator", lastSeverity: "Medium", lastInspected: "Feb 15, 2026" },
  { id: "CAT-BLD-002", name: "D6 Bulldozer", type: "Bulldozer", lastSeverity: "Low", lastInspected: "Feb 1, 2026" },
  { id: "CAT-LDR-003", name: "Wheel Loader 950", type: "Wheel Loader", lastSeverity: null, lastInspected: null },
  { id: "CAT-GEN-004", name: "Diesel Generator C15", type: "Generator", lastSeverity: null, lastInspected: null },
];

export default function Dashboard() {
  const [equipment, setEquipment] = useState(EQUIPMENT);
  const [recentInspections, setRecentInspections] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const data = await getHistory();
        setRecentInspections(data.results || []);
      } catch {
        // No history yet — that's fine
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const stats = [
    { label: "Total Equipment", value: equipment.length, icon: "wrench" },
    { label: "Inspections Done", value: recentInspections.length, icon: "clipboard" },
    {
      label: "Critical Alerts",
      value: recentInspections.filter((r) => {
        const text = JSON.stringify(r);
        return text.toLowerCase().includes("critical");
      }).length,
      icon: "alert",
    },
    { label: "Status", value: "Active", icon: "shield" },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-surface-900">Equipment Overview</h1>
          <p className="mt-0.5 text-sm text-surface-400">
            Monitor and inspect your fleet
          </p>
        </div>
        <Link
          to="/inspect"
          className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-md bg-cat text-navy-900 hover:bg-cat-600 transition-colors shadow-sm"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          New Inspection
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {stats.map((s) => (
          <div
            key={s.label}
            className="bg-white border border-surface-200 rounded-lg shadow-sm p-5"
          >
            <p className="text-xs font-medium text-surface-400 uppercase tracking-wide">
              {s.label}
            </p>
            <p className="mt-1 text-2xl font-bold text-surface-900">{s.value}</p>
          </div>
        ))}
      </div>

      {/* Equipment list + Recent activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Equipment list */}
        <div className="lg:col-span-2">
          <div className="bg-white border border-surface-200 rounded-lg shadow-sm overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-surface-200">
              <h3 className="text-sm font-semibold text-surface-800">Equipment Fleet</h3>
              <span className="text-xs text-surface-400">{equipment.length} units</span>
            </div>

            {equipment.map((eq) => (
              <Link
                key={eq.id}
                to={`/equipment/${eq.id}`}
                className="flex items-center justify-between px-5 py-4 border-b border-surface-200 last:border-0 hover:bg-surface-50 transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-navy-50">
                    <svg className="w-5 h-5 text-navy" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-surface-800 group-hover:text-navy transition-colors">
                      {eq.name}
                    </p>
                    <p className="text-xs text-surface-400 font-mono">{eq.id}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  {eq.lastSeverity ? (
                    <SeverityBadge severity={eq.lastSeverity} />
                  ) : (
                    <span className="text-xs text-surface-400">No inspections</span>
                  )}
                  <svg className="w-4 h-4 text-surface-300 group-hover:text-surface-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Recent activity */}
        <div>
          <div className="bg-white border border-surface-200 rounded-lg shadow-sm">
            <div className="px-5 py-4 border-b border-surface-200">
              <h3 className="text-sm font-semibold text-surface-800">Recent Activity</h3>
            </div>
            <div className="px-5 py-4">
              {loading ? (
                <div className="space-y-3">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex gap-3">
                      <div className="w-2 h-2 mt-1.5 rounded-full skeleton" />
                      <div className="flex-1">
                        <div className="h-3 w-full skeleton rounded mb-1" />
                        <div className="h-2 w-20 skeleton rounded" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : recentInspections.length > 0 ? (
                <div className="space-y-3">
                  {recentInspections.slice(0, 5).map((r, i) => (
                    <div key={i} className="flex gap-3">
                      <div className="w-2 h-2 mt-1.5 rounded-full bg-cat flex-shrink-0" />
                      <div className="min-w-0">
                        <p className="text-sm text-surface-700 truncate">
                          {typeof r.memory === "string"
                            ? r.memory.slice(0, 80)
                            : "Inspection recorded"}
                        </p>
                        <p className="text-xs text-surface-400 mt-0.5">
                          {r.metadata?.date
                            ? new Date(r.metadata.date).toLocaleDateString()
                            : "Recently"}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-navy-50 mx-auto mb-3">
                    <svg className="w-6 h-6 text-navy-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25z" />
                    </svg>
                  </div>
                  <p className="text-sm font-medium text-surface-700">No inspections yet</p>
                  <p className="text-xs text-surface-400 mt-1">
                    Run your first inspection to see activity here
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
