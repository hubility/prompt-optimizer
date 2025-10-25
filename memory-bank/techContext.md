# Tech Context

## Stack
- **Framework**: Next.js 15 (App Router)
- **Runtime**: React 19
- **Database**: Prisma ORM + PostgreSQL
- **Authentication**: NextAuth.js v4 + bcryptjs
- **API**: tRPC for type-safe APIs (planned)
- **UI**: shadcn/ui v4 + Tailwind CSS v4
- **Forms**: React Hook Form + Zod validation
- **Themes**: next-themes + system detection
- **Fonts**: Oxanium + Fira Code (Google Fonts)
- **Icons**: Lucide React
- **TypeScript**: Full-stack type safety

## Authentication Architecture
- **Sessions**: JWT tokens
- **Provider**: Credentials (email/password)
- **Adapter**: Prisma adapter for database
- **Middleware**: Route protection for /dashboard, /agents, /settings
- **Password**: bcryptjs hashing

## Design Agents Used
- **design-to-code-architect**: Landing page architecture
- **shadcn-ui-builder**: Component implementation

## Development
- ESLint + TypeScript strict mode
- Prisma schema with NextAuth.js models

## AI Integration (Optimizer AI Feature)
- **AI Provider**: Google Gemini API
- **Model**: `gemini-2.5-flash`
- **Purpose**: Prompt optimization and enhancement
- **Response Format**: Structured JSON
- **Features**:
  - Meta-prompting for prompt engineering
  - Markdown formatting for optimized prompts
  - Improvement analysis and tips generation
  - Technique identification
- **API Key**: Environment variable `GEMINI_API_KEY`

## Internationalization
- **Languages Supported**: English (EN), Spanish (ES), Portuguese Brazil (PT-BR)
- **i18n Implementation**: Translation files for full UI
- **Translation Feature**: On-demand translation of optimized prompts via Gemini API

## Storage Strategy
- **History Storage**: localStorage (browser-based)
  - Max: 10 most recent optimization sessions
  - Persistent across browser sessions
  - No backend required for v1.0
- **Future (v2.0)**: Database storage for cross-device sync with user accounts