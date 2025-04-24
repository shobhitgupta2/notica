
# Notica: AI-Powered Note Taker

Capture your thoughts effortlessly with Notica, the smart note-taking solution that organizes your ideas, delivers instant AI summaries, and keeps your most important information—all in one beautifully intuitive workspace.


## Key Features

### 1. Intuitive Note Management:
- **Seamless Organization:** Create, edit, and organize notes with an intuitive interface designed for productivity
- **Tag Categorisation:** Apply tags to notes for quick visual categorization and filtering
- **Time-Based Sorting:** Arrange notes based on most recent or earliest modifications for optimal user experience

### 2. AI-Powered Summarisation:
- **Intelligent Content Distillation:** Transform lengthy notes into concise, readable summaries with AI
- **One-Click Efficiency:** Generate comprehensive summaries instantly without manual editing or review
- **Content Comprehension:** Maintain core message integrity while significantly reducing text volume

### 3. User Experience
- **Intuitive Interface:** Navigate effortlessly with a modern, streamlined design optimized for productivity
- **Interactive Feedback:** Receive system notifications through elegant toast messages
- **Optimistic Updates:** Experience instant interface responses with behind-the-scenes data synchronization

### 4. Security & Privacy:
- **Flexible Authentication Options:** Sign in securely with either traditional email/password or Google Authentication
- **Identity Verification:** Robust user verification system maintaining security without compromising convenience
- **Real-Time Data Protection:** Continuous security monitoring and protection for all stored notes


## Tech Stack

### Frontend

- **Framework:** Next.js 15.3.1 with App Router
- **Language:** TypeScript
- **Styling:**
    - Tailwind CSS for utility-first styling
    - Shadcn UI for component library
    - Lucide and Hero Icons for SVGs
- **State Management:**
    - React Hooks and Context API for client state
    - React Query for server state

### Backend
- **Database:** PostgreSQL (via Supabase)
- **AI Service:**
    - Vercel AI SDK for interaction
    - Google Gemini 2.0 Flash for inference
- **Security:** Supabase Auth
    - JWT authentication
    - Row Level Security
- **Hosting:** Vercel


## Run Locally

1. Clone the project

```bash
  git clone https://github.com/shobhitgupta2/notica
```

2. Go to the project directory

```bash
  cd notica
```

3. Set up environment variables

```bash
NEXT_PUBLIC_SUPABASE_URL=[your_supabase_project_url]
NEXT_PUBLIC_SUPABASE_ANON_KEY=[your_supabase_project_api_anon_key]
GOOGLE_GENERATIVE_AI_API_KEY=[your_gemini_api_key]
```

3. Install dependencies

```bash
  npm install
```

4. Start the development server

```bash
  npm run dev
```

