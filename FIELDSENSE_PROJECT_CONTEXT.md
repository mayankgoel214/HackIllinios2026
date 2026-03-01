# FieldSense — AI-Powered Field Inspection Assistant
## Complete Project & Hackathon Context Document for Claude Code

---

## TABLE OF CONTENTS
1. [Project Overview](#project-overview)
2. [Hackathon Details](#hackathon-details)
3. [Prize Strategy](#prize-strategy)
4. [Judging Criteria](#judging-criteria)
5. [Technical Architecture](#technical-architecture)
6. [Supermemory API Integration](#supermemory-api-integration)
7. [OpenAI API Integration](#openai-api-integration)
8. [ElevenLabs Integration](#elevenlabs-integration)
9. [Feature Breakdown](#feature-breakdown)
10. [UI/UX Design Direction](#uiux-design-direction)
11. [Demo Flow](#demo-flow)
12. [Submission Requirements](#submission-requirements)
13. [File Structure](#file-structure)

---

## PROJECT OVERVIEW

**Name:** FieldSense — AI-Powered Field Inspection Assistant

**One-liner:** An intelligent inspection platform that uses AI vision to detect equipment damage and Supermemory to track inspection history across time — making field operations smarter, faster, and safer.

**Description:**
FieldSense is an intelligent inspection platform built for field workers, equipment operators, and site managers who need to identify issues fast and keep operations running safely. Snap a photo of any piece of equipment, vehicle, or job site, and FieldSense instantly analyzes it — detecting damage, wear, missing components, and potential safety hazards before they become costly failures.

What makes FieldSense different is its memory. Every inspection feeds into a persistent knowledge base tied to specific equipment and sites. Over time, FieldSense recognizes patterns: "This hydraulic arm showed early corrosion two inspections ago — it's progressing." It surfaces relevant history so inspectors don't start from scratch every time, and managers can track degradation trends across their entire fleet.

For hands-free fieldwork, FieldSense speaks. Inspectors wearing gloves, climbing equipment, or working in tight spaces can listen to findings narrated aloud rather than squinting at a screen. Reports are generated automatically with severity ratings, recommended actions, and historical context — ready to share with maintenance teams or compliance records.

FieldSense makes inspections smarter, faster, and safer — turning every field worker into an expert diagnostician backed by the full history of everything they've ever checked.

**Target Users:**
- Field inspectors and maintenance workers
- Equipment operators
- Site managers and supervisors
- Fleet management teams
- Safety compliance officers

**Core Problem Solved:**
Field inspections are repetitive, error-prone, and lack institutional memory. Inspectors often miss degradation patterns because each inspection starts from scratch. FieldSense solves this by combining AI vision analysis with persistent memory to detect issues AND track them over time.

---

## HACKATHON DETAILS

**Event:** HackIllinois 2026 (HackAstra theme)
**Location:** Siebel Center for Computer Science, UIUC
**Duration:** 36 hours
**Submission Deadline:** Sunday, March 1st, 2026 at 6:00 AM CST (NO LATE SUBMISSIONS)
**Project Showcase (Judging):** Sunday, March 1st, 9:00 AM – 11:30 AM
**Closing Ceremony:** Sunday, March 1st, 2:00 PM – 3:00 PM

**Path:** General Path (eligible for $2,500 Best General Hack)

**Team Rules:**
- Max 4 members per team
- All members must be registered, RSVPed, and checked in
- Project must be created during the 36 hours of the event
- At least one team member must be present at Project Showcase to demo

**Submission Requirements:**
- Submit on HackIllinois Devpost (https://hackillinois-2026.devpost.com)
- Must include: Public GitHub Repository
- Must include: Video demo or presentation video (unlisted or public, max 3 minutes)
- Must include: Description addressing the respective track
- Each project may only submit to AT MOST ONE Track
- Can apply for up to 2 HackIllinois category prizes
- Can apply for up to 3 sponsor prizes
- Can apply for as many MLH prizes as applicable

**AI Policy:**
- AI tools (ChatGPT, Copilot, Claude, etc.) are ALLOWED but must be disclosed
- Include a README section explaining which AI tools were used and what they generated/assisted with
- Project must NOT be a simple wrapper, reskin, or minimal modification of an existing AI tool
- Judging focuses on what YOU created, not just the tools used

---

## PRIZE STRATEGY

### Primary Track Target:
**Caterpillar Track: Best AI Inspection** — $1,500 + Ray-Ban Meta AI Glasses for each member (1st place)
- Description: "Use your creativity to build an AI solution that pushes the boundaries of what's possible in field operations and logistics. Show how AI can make inspections, parts identification, and site planning smarter, faster, and safer."
- This is our ONE track submission (can only submit to 1 track)
- 3 prize tiers: 1st ($1,500 + Ray-Bans + CAT Swag + Pitch to Caterpillar Executive), 2nd ($700 + Gaming Keyboard + CAT Swag), 3rd ($300 + Gaming Keyboard + CAT Swag)

### HackIllinois Category Prizes (pick up to 2):
1. **Best Social Impact** — MARSHALL Speakers + $50 charity donation per member
   - Angle: Worker safety, preventing equipment failures that endanger lives, reducing workplace injuries
2. **Best UI/UX Design** — FUJIFILM Instax Mini 12 Camera per member
   - Angle: Clean, accessible interface designed for field workers (gloves, outdoor visibility, simple flows)

### Sponsor Prizes (pick up to 3):
1. **Best Use of Supermemory** — Meta RayBans for each member
   - Angle: Deep integration — memory stores inspection history, builds equipment profiles, enables cross-inspection pattern detection, user profiles for inspectors
2. **Best Use of OpenAI API** — $5K OpenAI API credits per member
   - Angle: GPT-4 Vision for image analysis, GPT-4 for report generation, intelligent damage assessment
3. **Best Use of ElevenLabs** — Wireless Earbuds
   - Angle: Voice-narrated inspection reports for hands-free fieldwork

### Also Eligible (MLH, no limit):
- **Best Use of Gemini API** — Google Swag Kits (can use as backup/secondary AI)
- **Best .Tech Domain Name** — if we register fieldsense.tech

---

## JUDGING CRITERIA

Judges evaluate on four criteria (from the attendee guide):

1. **Idea & Creativity** — Originality and thoughtfulness of concept. Novel twist, unexpected combinations, "out of the box" thinking.
2. **Product Design** — Usability, user flow, visual clarity. Intuitive, accessible, thoughtfully designed.
3. **Execution and Technical Quality** — How well the project works. Reliable functionality, technical skill, sound engineering decisions.
4. **Impact & Intent** — Clarity of purpose and value to users. Addresses a real problem or meaningful need.

**Presentation Format:**
- Science fair-style Project Showcase
- 3 minutes to present, then 2-minute Q&A from judges
- At least one team member must be physically present

---

## TECHNICAL ARCHITECTURE

### Tech Stack:
- **Frontend:** React (Vite) with Tailwind CSS
- **Backend:** Node.js with Express
- **AI Vision:** OpenAI GPT-4 Vision API (image analysis)
- **AI Text:** OpenAI GPT-4 (report generation, conversation)
- **Memory/Context:** Supermemory API (inspection history, equipment profiles, pattern detection)
- **Voice Output:** ElevenLabs API (text-to-speech for hands-free reports)
- **Database:** Supermemory handles persistent storage (no need for separate DB)

### System Architecture:
```
┌─────────────────────────────────────────────────┐
│                  FRONTEND (React)                 │
│  ┌──────────┐ ┌──────────┐ ┌──────────────────┐ │
│  │  Upload   │ │ Inspect  │ │  History/Reports │ │
│  │  Photo    │ │ Results  │ │    Dashboard     │ │
│  └──────────┘ └──────────┘ └──────────────────┘ │
└─────────────────┬───────────────────────────────┘
                  │ API Calls
┌─────────────────▼───────────────────────────────┐
│              BACKEND (Node.js/Express)            │
│  ┌──────────┐ ┌──────────┐ ┌──────────────────┐ │
│  │ /inspect  │ │ /history │ │  /report         │ │
│  │ endpoint  │ │ endpoint │ │  endpoint        │ │
│  └─────┬────┘ └────┬─────┘ └────────┬─────────┘ │
└────────┼───────────┼────────────────┼────────────┘
         │           │                │
    ┌────▼────┐ ┌────▼──────┐ ┌──────▼───────┐
    │ OpenAI  │ │Supermemory│ │  ElevenLabs  │
    │ Vision  │ │  Memory   │ │    Voice     │
    │  API    │ │   API     │ │    API       │
    └─────────┘ └───────────┘ └──────────────┘
```

### API Flow for an Inspection:
1. User uploads photo of equipment + optional description + equipment ID
2. Backend sends image to OpenAI Vision API → gets damage analysis
3. Backend queries Supermemory for past inspections of this equipment → gets historical context
4. Backend combines AI analysis + historical context → generates comprehensive report
5. Report is stored in Supermemory as new memory (for future inspections)
6. Backend sends report text to ElevenLabs → gets audio narration
7. Frontend displays report with analysis, historical comparisons, severity rating, and audio playback

---

## SUPERMEMORY API INTEGRATION

### Overview:
Supermemory is the Context Engineering API that gives our app persistent memory. It's the key differentiator that makes FieldSense more than just an image analyzer — it's an inspection SYSTEM that learns over time.

### Installation:
```bash
npm install supermemory
```

### Configuration:
```javascript
import Supermemory from "supermemory";

const client = new Supermemory({
  apiKey: process.env.SUPERMEMORY_API_KEY
});
```

### How We Use Supermemory (3 key functions):

#### 1. Store Inspection Results (Add Memory)
After every inspection, we save the results to Supermemory tagged by equipment ID:
```javascript
await client.add({
  content: `Inspection of ${equipmentId} on ${date}: ${inspectionSummary}. Findings: ${findings}. Severity: ${severity}. Recommendations: ${recommendations}`,
  containerTag: equipmentId, // Groups memories by equipment
  metadata: {
    type: "inspection",
    equipmentId: equipmentId,
    date: new Date().toISOString(),
    severity: severity,
    inspector: inspectorName
  }
});
```

#### 2. Retrieve Past Inspections (Search Memory)
Before analyzing a new photo, we pull historical context:
```javascript
const history = await client.search({
  q: `inspection ${equipmentId} damage wear issues`,
  containerTag: equipmentId,
  topK: 5 // Get the 5 most relevant past inspections
});

// history.results contains past inspection summaries
// Use this to tell the AI about previous findings
```

#### 3. Build Equipment Profiles (User Profiles)
Supermemory auto-generates profiles from stored memories:
```javascript
const profile = await client.profile({
  containerTag: equipmentId,
  q: "current condition and maintenance history"
});

// profile.profile.static → Persistent facts about this equipment
// profile.profile.dynamic → Recent inspection context
// profile.searchResults → Relevant historical data
```

### Supermemory Value for Judging:
- **Retrieval:** Semantic search across all past inspections
- **Memory:** Auto-extracted facts about equipment condition over time
- **User Profiles:** Equipment profiles that evolve with each inspection
- **Multi-modal Extractors:** Can process inspection photos and text
- This is NOT just a wrapper — Supermemory is deeply integrated into the core inspection logic

---

## OPENAI API INTEGRATION

### Vision Analysis (Core Feature):
```javascript
import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

async function analyzeInspectionImage(imageBase64, equipmentType, historicalContext) {
  const response = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [
      {
        role: "system",
        content: `You are an expert field equipment inspector. Analyze the image for:
          - Visible damage (cracks, dents, corrosion, wear)
          - Missing or broken components
          - Safety hazards
          - Estimated severity (Critical/High/Medium/Low)
          - Recommended actions
          
          Historical context for this equipment:
          ${historicalContext}
          
          Compare current condition to past inspections when possible.
          Respond in structured JSON format.`
      },
      {
        role: "user",
        content: [
          { type: "text", text: `Inspect this ${equipmentType}. Provide a detailed analysis.` },
          { type: "image_url", image_url: { url: `data:image/jpeg;base64,${imageBase64}` } }
        ]
      }
    ],
    response_format: { type: "json_object" }
  });
  
  return JSON.parse(response.choices[0].message.content);
}
```

### Report Generation:
Use GPT-4 to combine vision analysis + Supermemory history into a professional inspection report.

---

## ELEVENLABS INTEGRATION

### Voice Narration for Hands-Free Field Reports:
```javascript
// Using ElevenLabs API for text-to-speech
async function generateVoiceReport(reportText) {
  const response = await fetch("https://api.elevenlabs.io/v1/text-to-speech/{voice_id}", {
    method: "POST",
    headers: {
      "xi-api-key": process.env.ELEVENLABS_API_KEY,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      text: reportText,
      model_id: "eleven_monolingual_v1",
      voice_settings: {
        stability: 0.5,
        similarity_boost: 0.75
      }
    })
  });
  
  const audioBuffer = await response.arrayBuffer();
  return audioBuffer; // Return as audio for frontend playback
}
```

**Why ElevenLabs matters for FieldSense:**
- Inspectors often wear gloves or are in positions where they can't read a screen
- Voice narration means they can hear findings while continuing to work
- Natural, clear voice makes reports accessible to all workers regardless of literacy level

---

## FEATURE BREAKDOWN

### MVP Features (Must Have):
1. **Photo Upload & Analysis** — Upload equipment photos, get AI-powered damage detection
2. **Inspection Report Generation** — Structured report with severity, findings, recommendations
3. **Historical Memory** — Past inspections stored and retrieved via Supermemory
4. **Equipment Dashboard** — View all equipment, their inspection history, and current status
5. **Pattern Detection** — "This issue was first noted 3 inspections ago and is worsening"

### Stretch Features (Nice to Have):
6. **Voice Reports** — ElevenLabs narration of inspection findings
7. **Severity Trends** — Visual chart showing equipment condition over time
8. **Multi-Equipment Comparison** — Compare condition across similar equipment
9. **Export Reports** — Download PDF/print inspection reports
10. **Camera Integration** — Use device camera directly instead of file upload

### Feature Priority for Demo:
Focus on features 1-5 for the core demo. Feature 6 (voice) adds the ElevenLabs wow factor. Features 7-10 are bonus.

---

## UI/UX DESIGN DIRECTION

### Design Philosophy:
- **Field-first design** — Large touch targets, high contrast, readable in sunlight
- **Minimal clicks** — Upload → Analyze → Report in 3 steps or fewer
- **Accessible** — Large fonts, clear icons, color-coded severity (Red/Orange/Yellow/Green)
- **Professional** — Clean, industrial feel — think Caterpillar meets modern SaaS

### Color Palette:
- Primary: Deep blue (#1E3A5F) — trust, reliability
- Accent: Caterpillar yellow (#FFCD00) — industrial, safety
- Severity: Red (#DC2626), Orange (#EA580C), Yellow (#CA8A04), Green (#16A34A)
- Background: Clean white/light gray
- Text: Dark navy/black

### Key Pages:
1. **Dashboard** — Overview of all equipment, recent inspections, alerts
2. **New Inspection** — Photo upload, equipment selection, AI analysis in progress
3. **Inspection Report** — Full analysis with severity, findings, history, recommendations, voice playback
4. **Equipment Detail** — Individual equipment profile with all past inspections and trend data
5. **History/Timeline** — Chronological view of all inspections across all equipment

### Mobile-Responsive:
MUST work well on mobile — field workers will use phones/tablets, not desktops.

---

## DEMO FLOW

### 3-Minute Demo Script:

**0:00 - 0:30 — The Problem**
"Every year, equipment failures cause X injuries and $Y in damages. Field inspections are done on paper, have no memory, and miss patterns that could prevent catastrophic failures."

**0:30 - 1:00 — The Solution**
"FieldSense uses AI vision to instantly detect damage, and Supermemory to track every piece of equipment over time — catching degradation patterns that humans miss."

**1:00 - 2:00 — Live Demo**
1. Show dashboard with equipment list
2. Upload a photo of damaged equipment
3. Watch AI analyze in real-time (severity, findings, recommendations)
4. Show historical comparison: "This corrosion was minor 2 inspections ago — it's now critical"
5. Play voice narration of the report (ElevenLabs)
6. Show equipment profile built by Supermemory

**2:00 - 2:30 — Technical Depth**
"Under the hood: OpenAI Vision detects the damage. Supermemory stores and connects every inspection — building an evolving knowledge graph for each piece of equipment. ElevenLabs makes it hands-free."

**2:30 - 3:00 — Impact**
"FieldSense turns every field worker into an expert inspector backed by the complete history of everything they've ever checked. Smarter inspections. Safer operations. Zero paperwork."

---

## SUBMISSION REQUIREMENTS CHECKLIST

- [ ] Public GitHub Repository (https://github.com/mayankgoel214/HackIllinios2026)
- [ ] Video demo (max 3 minutes, unlisted/public on YouTube)
- [ ] Devpost submission with project description
- [ ] README with:
  - [ ] AI tools disclosure (Claude Code, OpenAI Vision, etc.)
  - [ ] What AI generated vs. what we built
  - [ ] Setup instructions
  - [ ] Tech stack description
- [ ] Track selection: Caterpillar (Best AI Inspection) — ONE track only
- [ ] Category selections (up to 2): Best Social Impact + Best UI/UX
- [ ] Sponsor prize selections (up to 3): Supermemory + OpenAI + ElevenLabs
- [ ] At least one person present at Project Showcase (9:00 AM Sunday)

---

## FILE STRUCTURE

```
HackIllinios2026/
├── README.md                    # Project description + AI disclosure
├── FIELDSENSE_PROJECT_CONTEXT.md # This file
├── package.json
├── .env.example                 # Template for API keys
├── .gitignore
│
├── client/                      # React frontend (Vite)
│   ├── src/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   ├── components/
│   │   │   ├── Dashboard.jsx        # Equipment overview
│   │   │   ├── NewInspection.jsx    # Photo upload + analysis
│   │   │   ├── InspectionReport.jsx # Analysis results + voice
│   │   │   ├── EquipmentDetail.jsx  # Equipment history + profile
│   │   │   ├── Timeline.jsx         # Inspection history
│   │   │   ├── SeverityBadge.jsx    # Reusable severity indicator
│   │   │   └── AudioPlayer.jsx      # ElevenLabs voice playback
│   │   ├── styles/
│   │   └── utils/
│   ├── index.html
│   ├── vite.config.js
│   └── tailwind.config.js
│
├── server/                      # Node.js backend
│   ├── index.js                 # Express server entry point
│   ├── routes/
│   │   ├── inspect.js           # POST /api/inspect — main inspection endpoint
│   │   ├── history.js           # GET /api/history — past inspections
│   │   ├── equipment.js         # GET /api/equipment — equipment profiles
│   │   └── voice.js             # POST /api/voice — ElevenLabs TTS
│   ├── services/
│   │   ├── openai.js            # OpenAI Vision + GPT-4 service
│   │   ├── supermemory.js       # Supermemory client + helpers
│   │   └── elevenlabs.js        # ElevenLabs TTS service
│   └── utils/
│       └── imageUtils.js        # Image processing helpers
│
└── demo/                        # Demo assets
    ├── sample-images/           # Sample equipment photos for demo
    └── scripts/                 # Seed data scripts for demo
```

---

## ENVIRONMENT VARIABLES

```env
# .env (DO NOT COMMIT)
OPENAI_API_KEY=your_openai_api_key
SUPERMEMORY_API_KEY=your_supermemory_api_key
ELEVENLABS_API_KEY=your_elevenlabs_api_key
ELEVENLABS_VOICE_ID=your_preferred_voice_id
PORT=3001
```

---

## KEY IMPLEMENTATION NOTES FOR CLAUDE CODE

1. **Start with the backend** — Get the /api/inspect endpoint working first (OpenAI Vision + Supermemory store/retrieve). This is the core value.

2. **Supermemory containerTag strategy** — Use equipment IDs as containerTags. Each piece of equipment gets its own memory space. Use a global containerTag like "all-inspections" for cross-equipment pattern detection.

3. **Image handling** — Accept base64 images from the frontend, pass directly to OpenAI Vision. Don't try to store images in Supermemory — store the text analysis results.

4. **Error handling** — Gracefully handle API failures. If Supermemory is down, still show the vision analysis. If ElevenLabs fails, still show the text report.

5. **Demo data** — Pre-seed Supermemory with 3-4 past inspections for demo equipment so we can show the historical pattern detection during the showcase.

6. **Keep it simple** — We have ~12 hours. A polished, working MVP beats a broken ambitious project every time. Focus on the core flow: Upload → Analyze → Store → Retrieve History → Generate Report.

7. **Mobile responsive** — Use Tailwind responsive classes. Field workers use phones.

8. **The "wow" moments for judges:**
   - AI instantly identifying specific damage from a photo
   - "This equipment was last inspected 2 weeks ago — here's what changed"
   - Voice narration playing the report out loud
   - Equipment profile auto-generated by Supermemory showing condition trends
