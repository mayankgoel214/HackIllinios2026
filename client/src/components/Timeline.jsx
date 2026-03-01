import { useState, useEffect } from "react";
import SeverityBadge from "./SeverityBadge";
import { getHistory } from "../utils/api";

export default function Timeline() {
  const [inspections, setInspections] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const data = await getHistory();
        setInspections(data.results || []);
      } catch {
        // No history
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-surface-900">Inspection Timeline</h1>
        <p className="mt-0.5 text-sm text-surface-400">
          All inspections across your fleet
        </p>
      </div>

      <div className="bg-white border border-surface-200 rounded-lg shadow-sm">
        {loading ? (
          <div className="p-5 space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-3 h-3 rounded-full skeleton" />
                  <div className="w-0.5 flex-1 bg-surface-200 mt-1" />
                </div>
                <div className="flex-1 pb-4">
                  <div className="h-3 w-40 skeleton rounded mb-2" />
                  <div className="h-3 w-full skeleton rounded mb-1" />
                  <div className="h-3 w-3/4 skeleton rounded" />
                </div>
              </div>
            ))}
          </div>
        ) : inspections.length > 0 ? (
          <div className="p-5">
            {inspections.map((r, i) => {
              const text =
                typeof r.memory === "string"
                  ? r.memory
                  : typeof r.chunk === "string"
                  ? r.chunk
                  : "Inspection recorded";
              const severity = r.metadata?.severity;
              const date = r.metadata?.date;
              const eqId = r.metadata?.equipmentId;
              const isLast = i === inspections.length - 1;

              return (
                <div key={i} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-3 h-3 rounded-full flex-shrink-0 ${
                        severity === "Critical"
                          ? "bg-status-critical"
                          : severity === "High"
                          ? "bg-status-serious"
                          : severity === "Medium"
                          ? "bg-status-caution"
                          : "bg-status-normal"
                      }`}
                    />
                    {!isLast && <div className="w-0.5 flex-1 bg-surface-200 mt-1" />}
                  </div>
                  <div className={`flex-1 ${!isLast ? "pb-6" : ""}`}>
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        {eqId && (
                          <span className="text-xs font-mono text-navy font-medium">
                            {eqId}
                          </span>
                        )}
                        {severity && <SeverityBadge severity={severity} />}
                      </div>
                      <span className="text-xs text-surface-400">
                        {date ? new Date(date).toLocaleDateString() : ""}
                      </span>
                    </div>
                    <p className="text-sm text-surface-600 leading-relaxed">{text}</p>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-16 px-5">
            <div className="flex items-center justify-center w-16 h-16 rounded-xl bg-navy-50 mx-auto mb-4">
              <svg className="w-8 h-8 text-navy-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="text-sm font-medium text-surface-700">No inspections recorded</p>
            <p className="text-xs text-surface-400 mt-1">
              Your inspection timeline will appear here
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
