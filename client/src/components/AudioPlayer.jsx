import { useState, useRef } from "react";

export default function AudioPlayer({ audioUrl, loading }) {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);

  function toggle() {
    if (!audioRef.current) return;
    if (playing) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setPlaying(!playing);
  }

  if (loading) {
    return (
      <div className="flex items-center gap-3 px-4 py-3 bg-navy-50 rounded-lg border border-navy-200">
        <div className="w-8 h-8 rounded-full skeleton" />
        <div className="flex-1">
          <div className="h-3 w-32 skeleton rounded mb-1" />
          <div className="h-2 w-48 skeleton rounded" />
        </div>
      </div>
    );
  }

  if (!audioUrl) return null;

  return (
    <div className="flex items-center gap-3 px-4 py-3 bg-navy-50 rounded-lg border border-navy-200">
      <button
        onClick={toggle}
        className="flex items-center justify-center w-9 h-9 rounded-full bg-navy text-white hover:bg-navy-700 transition-colors"
      >
        {playing ? (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
          </svg>
        ) : (
          <svg className="w-4 h-4 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z" />
          </svg>
        )}
      </button>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-navy-800">Voice Report</p>
        <p className="text-xs text-surface-400">AI-narrated inspection summary</p>
      </div>
      <audio
        ref={audioRef}
        src={audioUrl}
        onEnded={() => setPlaying(false)}
      />
    </div>
  );
}
