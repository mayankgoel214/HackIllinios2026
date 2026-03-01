import { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import SeverityBadge from "./SeverityBadge";
import AudioPlayer from "./AudioPlayer";
import { generateVoice } from "../utils/api";

export default function InspectionReport() {
  const { state } = useLocation();
  const [audioUrl, setAudioUrl] = useState(null);
  const [audioLoading, setAudioLoading] = useState(false);
  const [audioError, setAudioError] = useState(null);

  if (!state?.result) {
    return (
      <div className="max-w-2xl mx-auto text-center py-16">
        <div className="flex items-center justify-center w-16 h-16 rounded-xl bg-navy-50 mx-auto mb-4">
          <svg className="w-8 h-8 text-navy-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
          </svg>
        </div>
        <p className="text-sm font-medium text-surface-700">No report data</p>
        <p className="text-xs text-surface-400 mt-1 mb-4">Run an inspection first to see results</p>
        <Link
          to="/inspect"
          className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-md bg-cat text-navy-900 hover:bg-cat-600 transition-colors shadow-sm"
        >
          Start Inspection
        </Link>
      </div>
    );
  }

  const { result, preview } = state;
  const { analysis, reportText, equipmentId, equipmentType, inspectedAt } = result;

  async function handlePlayVoice() {
    if (audioUrl) return;
    setAudioLoading(true);
    setAudioError(null);
    try {
      const url = await generateVoice(reportText);
      setAudioUrl(url);
    } catch (err) {
      setAudioError(err.message || "Voice generation failed");
    } finally {
      setAudioLoading(false);
    }
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <h1 className="text-2xl font-bold text-surface-900">Inspection Report</h1>
            <SeverityBadge severity={analysis.overallSeverity} />
          </div>
          <p className="text-sm text-surface-400">
            {equipmentType} &middot; {equipmentId} &middot;{" "}
            {new Date(inspectedAt).toLocaleString()}
          </p>
        </div>
        <Link
          to="/inspect"
          className="inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded-md bg-white text-navy border border-navy hover:bg-navy-50 transition-colors"
        >
          New Inspection
        </Link>
      </div>

      {/* Image + Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {preview && (
          <div className="bg-white border border-surface-200 rounded-lg overflow-hidden">
            <img
              src={preview}
              alt="Inspected equipment"
              className="w-full h-56 object-contain bg-surface-50"
            />
          </div>
        )}
        <div className="bg-white border border-surface-200 rounded-lg p-5 flex flex-col justify-between">
          <div>
            <h3 className="text-xs font-medium text-surface-400 uppercase tracking-wide mb-2">
              Summary
            </h3>
            <p className="text-sm text-surface-700 leading-relaxed">{analysis.summary}</p>
          </div>
          <div className="mt-4 flex items-center gap-4">
            <div>
              <p className="text-xs text-surface-400">Condition</p>
              <p className="text-lg font-bold text-surface-900">
                {analysis.estimatedCondition}%
              </p>
            </div>
            <div>
              <p className="text-xs text-surface-400">Findings</p>
              <p className="text-lg font-bold text-surface-900">
                {analysis.findings?.length || 0}
              </p>
            </div>
            <div>
              <p className="text-xs text-surface-400">Hazards</p>
              <p className="text-lg font-bold text-status-critical">
                {analysis.safetyHazards?.length || 0}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Findings */}
      <div className="bg-white border border-surface-200 rounded-lg shadow-sm overflow-hidden">
        <div className="px-5 py-4 border-b border-surface-200">
          <h3 className="text-sm font-semibold text-surface-800">Findings</h3>
        </div>
        <div className="divide-y divide-surface-200">
          {analysis.findings?.map((f, i) => (
            <div key={i} className="px-5 py-4">
              <div className="flex items-center justify-between mb-1">
                <p className="text-sm font-medium text-surface-800">{f.issue}</p>
                <SeverityBadge severity={f.severity} />
              </div>
              <p className="text-sm text-surface-600">{f.description}</p>
              {f.location && (
                <p className="text-xs text-surface-400 mt-1">Location: {f.location}</p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Recommendations */}
      {analysis.recommendations?.length > 0 && (
        <div className="bg-white border border-surface-200 rounded-lg shadow-sm">
          <div className="px-5 py-4 border-b border-surface-200">
            <h3 className="text-sm font-semibold text-surface-800">Recommendations</h3>
          </div>
          <ul className="px-5 py-4 space-y-2">
            {analysis.recommendations.map((r, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-surface-700">
                <svg className="w-4 h-4 text-cat-700 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                </svg>
                {r}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Historical comparison */}
      {analysis.historicalComparison && analysis.historicalComparison !== "null" && (
        <div className="bg-navy-50 border border-navy-200 rounded-lg p-5">
          <h3 className="text-sm font-semibold text-navy-800 mb-2 flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Historical Comparison
          </h3>
          <p className="text-sm text-navy-700">{analysis.historicalComparison}</p>
        </div>
      )}

      {/* Safety hazards */}
      {analysis.safetyHazards?.length > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-5">
          <h3 className="text-sm font-semibold text-red-800 mb-2 flex items-center gap-2">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 5a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 5zm0 9a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
            </svg>
            Safety Hazards
          </h3>
          <ul className="space-y-1">
            {analysis.safetyHazards.map((h, i) => (
              <li key={i} className="text-sm text-red-700">
                &bull; {h}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Voice report */}
      <div>
        {!audioUrl && !audioLoading && (
          <button
            onClick={handlePlayVoice}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold rounded-lg bg-navy text-white hover:bg-navy-700 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z" />
            </svg>
            Generate Voice Report
          </button>
        )}
        <AudioPlayer audioUrl={audioUrl} loading={audioLoading} />
        {audioError && (
          <div className="flex items-center gap-2 px-4 py-3 bg-red-50 border border-red-200 rounded-md mt-2">
            <svg className="w-4 h-4 text-red-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z" clipRule="evenodd" />
            </svg>
            <p className="text-sm text-red-700">{audioError}</p>
          </div>
        )}
      </div>

      {/* Full report text */}
      <div className="bg-white border border-surface-200 rounded-lg shadow-sm">
        <div className="px-5 py-4 border-b border-surface-200">
          <h3 className="text-sm font-semibold text-surface-800">Full Report</h3>
        </div>
        <div className="px-5 py-4">
          <p className="text-sm text-surface-700 whitespace-pre-line leading-relaxed">
            {reportText}
          </p>
        </div>
      </div>
    </div>
  );
}
