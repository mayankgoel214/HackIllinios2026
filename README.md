# FieldSense — AI-Powered Field Inspection Assistant

An intelligent inspection platform that uses AI vision to detect equipment damage and persistent memory to track inspection history across time — making field operations smarter, faster, and safer.

## What It Does

Snap a photo of any piece of equipment, and FieldSense instantly analyzes it — detecting damage, wear, corrosion, missing components, and safety hazards. Every inspection is stored in a persistent memory layer tied to the specific equipment. Over time, FieldSense recognizes patterns and tracks degradation so inspectors don't start from scratch every time.

For hands-free fieldwork, reports are narrated aloud via text-to-speech so workers wearing gloves or climbing equipment can listen instead of reading a screen.

## Features

- **AI Image Analysis** — Upload a photo and get instant damage detection with severity ratings, findings, and recommendations
- **Persistent Memory** — Every inspection is stored and connected. The system tracks how damage progresses over time across inspections
- **Equipment Profiles** — Auto-generated profiles for each piece of equipment summarizing long-term facts and recent context
- **Historical Comparison** — New inspections reference past ones to identify degradation patterns
- **Voice Reports** — Full inspection reports narrated via text-to-speech for hands-free fieldwork
- **Severity Tracking** — Color-coded severity levels (Critical / High / Medium / Low) across the dashboard
- **Mobile Responsive** — Designed for field use on phones and tablets

## Tech Stack

| Layer | Technology | Purpose |
|---|---|---|
| Frontend | React (Vite) + Tailwind CSS | UI with responsive, field-first design |
| Backend | Node.js + Express | API server with image upload handling |
| AI Vision | OpenAI GPT-4o Vision | Image analysis and damage detection |
| AI Text | OpenAI GPT-4o | Report generation |
| Memory | Supermemory API | Persistent inspection storage, semantic search, equipment profiles |
| Voice | ElevenLabs API | Text-to-speech for narrated reports |

## How It Works

```
1. User uploads a photo of equipment + enters equipment ID
2. Backend queries Supermemory for past inspections of this equipment
3. Photo + historical context sent to GPT-4o Vision for analysis
4. AI returns structured findings (severity, issues, recommendations, hazards)
5. Results stored back in Supermemory for future inspections
6. Report displayed with option for voice narration via ElevenLabs
```

## Setup

### Prerequisites

- Node.js 18+
- API keys for OpenAI, Supermemory, and ElevenLabs

### Installation

```bash
# Clone the repo
git clone https://github.com/mayankgoel214/HackIllinios2026.git
cd HackIllinios2026

# Create .env file from template
cp .env.example .env
# Edit .env and add your API keys

# Install all dependencies
npm run install:all
```

### Environment Variables

Create a `.env` file in the project root:

```env
OPENAI_API_KEY=your_openai_api_key
SUPERMEMORY_API_KEY=your_supermemory_api_key
ELEVENLABS_API_KEY=your_elevenlabs_api_key
ELEVENLABS_VOICE_ID=your_preferred_voice_id
PORT=3001
```

### Running

```bash
# Start both frontend and backend
npm run dev

# Or run separately
npm run dev:server   # Backend on http://localhost:3001
npm run dev:client   # Frontend on http://localhost:5173
```

### Seed Demo Data (Optional)

Pre-populate Supermemory with sample inspection history for demo purposes:

```bash
node demo/scripts/seed.js
```

## Project Structure

```
├── client/                  # React frontend (Vite)
│   └── src/
│       ├── components/      # Dashboard, NewInspection, InspectionReport,
│       │                    # EquipmentDetail, Timeline, SeverityBadge, AudioPlayer
│       ├── utils/api.js     # API client helpers
│       └── styles/          # Tailwind CSS
│
├── server/                  # Node.js backend
│   ├── routes/              # /api/inspect, /api/history, /api/equipment, /api/voice
│   ├── services/            # OpenAI, Supermemory, ElevenLabs integrations
│   └── utils/               # Image processing helpers
│
└── demo/
    ├── sample-images/       # Sample equipment photos for testing
    └── scripts/seed.js      # Supermemory seed script
```

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/inspect` | Upload image + get AI analysis with historical context |
| GET | `/api/history/:equipmentId` | Past inspections for specific equipment |
| GET | `/api/history` | Search all inspections |
| GET | `/api/equipment/:equipmentId` | Equipment profile from Supermemory |
| POST | `/api/voice` | Generate voice narration from report text |
| GET | `/api/health` | Health check |

## Team

Built at HackIllinois 2026 (HackAstra)
