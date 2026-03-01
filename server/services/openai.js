import OpenAI from "openai";

let _openai;
function getClient() {
  if (!_openai) {
    _openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  }
  return _openai;
}

export async function analyzeImage(imageBase64, equipmentType, historicalContext) {
  const response = await getClient().chat.completions.create({
    model: "gpt-4o",
    messages: [
      {
        role: "system",
        content: `You are an expert field equipment inspector. Analyze the image for:
- Visible damage (cracks, dents, corrosion, wear, rust, leaks)
- Missing or broken components
- Safety hazards
- Estimated severity: Critical, High, Medium, or Low
- Recommended actions

${historicalContext ? `Historical inspection context for this equipment:\n${historicalContext}\n\nCompare the current condition to past inspections. Note any progression or improvement.` : "No prior inspection history available for this equipment."}

Respond in this exact JSON format:
{
  "overallSeverity": "Critical|High|Medium|Low",
  "summary": "Brief 1-2 sentence overview",
  "findings": [
    {
      "issue": "Name of the issue",
      "description": "Detailed description",
      "severity": "Critical|High|Medium|Low",
      "location": "Where on the equipment"
    }
  ],
  "historicalComparison": "How condition compares to past inspections (or null if no history)",
  "recommendations": [
    "Action item 1",
    "Action item 2"
  ],
  "safetyHazards": ["Hazard 1"],
  "estimatedCondition": "percentage 0-100 representing overall equipment health"
}`
      },
      {
        role: "user",
        content: [
          {
            type: "text",
            text: `Inspect this ${equipmentType || "equipment"}. Provide a detailed damage and condition analysis.`
          },
          {
            type: "image_url",
            image_url: { url: `data:image/jpeg;base64,${imageBase64}` }
          }
        ]
      }
    ],
    response_format: { type: "json_object" },
    max_tokens: 1500
  });

  return JSON.parse(response.choices[0].message.content);
}

export async function generateReport(analysis, equipmentId, equipmentType, historicalContext) {
  const response = await getClient().chat.completions.create({
    model: "gpt-4o",
    messages: [
      {
        role: "system",
        content: `You are a professional field inspection report writer. Generate a clear, concise inspection report suitable for field workers and managers. Use plain language. The report should be easy to read aloud for voice narration.`
      },
      {
        role: "user",
        content: `Generate a professional inspection report from this data:

Equipment ID: ${equipmentId}
Equipment Type: ${equipmentType || "General Equipment"}
Analysis: ${JSON.stringify(analysis)}
Historical Context: ${historicalContext || "No prior inspections on file."}

Write a narration-friendly report (3-5 paragraphs). Start with the overall condition, then key findings, then recommendations. If there's historical context, mention how the condition has changed.`
      }
    ],
    max_tokens: 800
  });

  return response.choices[0].message.content;
}
