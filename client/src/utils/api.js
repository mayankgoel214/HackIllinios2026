const API_BASE = "/api";

export async function inspectEquipment(imageFile, equipmentId, equipmentType) {
  const formData = new FormData();
  formData.append("image", imageFile);
  formData.append("equipmentId", equipmentId);
  formData.append("equipmentType", equipmentType || "General Equipment");

  const res = await fetch(`${API_BASE}/inspect`, {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || "Inspection failed");
  }

  return res.json();
}

export async function getHistory(equipmentId) {
  const url = equipmentId
    ? `${API_BASE}/history/${encodeURIComponent(equipmentId)}`
    : `${API_BASE}/history`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch history");
  return res.json();
}

export async function getEquipmentProfile(equipmentId) {
  const res = await fetch(`${API_BASE}/equipment/${encodeURIComponent(equipmentId)}`);
  if (!res.ok) throw new Error("Failed to fetch equipment profile");
  return res.json();
}

export async function generateVoice(text) {
  const res = await fetch(`${API_BASE}/voice`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text }),
  });

  if (!res.ok) throw new Error("Voice generation failed");

  const blob = await res.blob();
  return URL.createObjectURL(blob);
}
