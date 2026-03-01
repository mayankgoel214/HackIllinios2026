import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { inspectEquipment } from "../utils/api";

const EQUIPMENT_TYPES = [
  "Excavator",
  "Bulldozer",
  "Wheel Loader",
  "Generator",
  "Crane",
  "Dump Truck",
  "Compactor",
  "Other",
];

export default function NewInspection() {
  const navigate = useNavigate();
  const fileRef = useRef(null);

  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [equipmentId, setEquipmentId] = useState("");
  const [equipmentType, setEquipmentType] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  function handleFile(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    setPreview(URL.createObjectURL(file));
  }

  function handleDrop(e) {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (!file || !file.type.startsWith("image/")) return;
    setImageFile(file);
    setPreview(URL.createObjectURL(file));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!imageFile || !equipmentId) return;

    setLoading(true);
    setError(null);

    try {
      const result = await inspectEquipment(imageFile, equipmentId, equipmentType);
      navigate("/report", { state: { result, preview } });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-surface-900">New Inspection</h1>
        <p className="mt-0.5 text-sm text-surface-400">
          Upload a photo to analyze equipment condition
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Image upload */}
        <div
          onClick={() => fileRef.current?.click()}
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          className={`relative border-2 border-dashed rounded-lg transition-colors cursor-pointer ${
            preview
              ? "border-navy-300 bg-navy-50"
              : "border-surface-300 hover:border-navy-400 hover:bg-surface-50"
          }`}
        >
          {preview ? (
            <div className="relative">
              <img
                src={preview}
                alt="Equipment preview"
                className="w-full max-h-80 object-contain rounded-lg"
              />
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setImageFile(null);
                  setPreview(null);
                }}
                className="absolute top-3 right-3 p-1.5 bg-white rounded-full shadow-md text-surface-500 hover:text-surface-800 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-16 px-6">
              <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-navy-50 mb-4">
                <svg className="w-7 h-7 text-navy-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0z" />
                </svg>
              </div>
              <p className="text-sm font-medium text-surface-700">
                Drop an image here or click to upload
              </p>
              <p className="text-xs text-surface-400 mt-1">
                JPEG, PNG, WebP up to 10MB
              </p>
            </div>
          )}
          <input
            ref={fileRef}
            type="file"
            accept="image/jpeg,image/png,image/webp,image/gif"
            onChange={handleFile}
            className="hidden"
          />
        </div>

        {/* Equipment details */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-surface-700 mb-1.5">
              Equipment ID *
            </label>
            <input
              type="text"
              value={equipmentId}
              onChange={(e) => setEquipmentId(e.target.value)}
              placeholder="e.g. CAT-EXC-001"
              required
              className="w-full px-3 py-2 text-sm border border-surface-300 rounded-md bg-white text-surface-900 placeholder:text-surface-400 focus:border-navy focus:ring-1 focus:ring-navy transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-surface-700 mb-1.5">
              Equipment Type
            </label>
            <select
              value={equipmentType}
              onChange={(e) => setEquipmentType(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-surface-300 rounded-md bg-white text-surface-900 focus:border-navy focus:ring-1 focus:ring-navy transition-colors"
            >
              <option value="">Select type...</option>
              {EQUIPMENT_TYPES.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="flex items-center gap-2 px-4 py-3 bg-red-50 border border-red-200 rounded-md">
            <svg className="w-4 h-4 text-red-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z" clipRule="evenodd" />
            </svg>
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={!imageFile || !equipmentId || loading}
          className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold rounded-md bg-cat text-navy-900 hover:bg-cat-600 transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <>
              <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Analyzing...
            </>
          ) : (
            <>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
              Analyze Equipment
            </>
          )}
        </button>
      </form>
    </div>
  );
}
