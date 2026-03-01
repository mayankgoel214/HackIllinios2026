import Supermemory from "supermemory";

let _client;
function getClient() {
  if (!_client) {
    _client = new Supermemory({ apiKey: process.env.SUPERMEMORY_API_KEY });
  }
  return _client;
}

export async function storeInspection(equipmentId, inspectionData) {
  const { summary, overallSeverity, findings, recommendations } = inspectionData;
  const date = new Date().toISOString();

  const content = [
    `Inspection of equipment ${equipmentId} on ${date}.`,
    `Overall Severity: ${overallSeverity}.`,
    `Summary: ${summary}`,
    `Findings: ${findings.map((f) => `${f.issue} (${f.severity}): ${f.description}`).join("; ")}`,
    `Recommendations: ${recommendations.join("; ")}`
  ].join("\n");

  const response = await getClient().add({
    content,
    containerTag: equipmentId,
    metadata: {
      type: "inspection",
      equipmentId,
      date,
      severity: overallSeverity
    }
  });

  // Also store in a global container for cross-equipment searches
  await getClient().add({
    content,
    containerTag: "all-inspections",
    metadata: {
      type: "inspection",
      equipmentId,
      date,
      severity: overallSeverity
    }
  });

  return response;
}

export async function getInspectionHistory(equipmentId) {
  const results = await getClient().search.memories({
    q: `inspection damage wear condition findings for ${equipmentId}`,
    containerTag: equipmentId,
    limit: 10
  });

  return results;
}

export async function getEquipmentProfile(equipmentId) {
  const result = await getClient().profile({
    containerTag: equipmentId,
    q: "current condition, maintenance history, and recurring issues"
  });

  return result;
}

export async function searchAllInspections(query) {
  const results = await getClient().search.memories({
    q: query,
    containerTag: "all-inspections",
    limit: 20
  });

  return results;
}

export async function buildHistoricalContext(equipmentId) {
  try {
    const history = await getClient().search.memories({
      q: "past inspection findings damage severity condition",
      containerTag: equipmentId,
      limit: 5
    });

    if (!history.results || history.results.length === 0) {
      return null;
    }

    const context = history.results
      .map((r) => {
        const mem = r.memory || r.chunk || "";
        return typeof mem === "string" ? mem : JSON.stringify(mem);
      })
      .join("\n---\n");

    return context;
  } catch {
    return null;
  }
}
