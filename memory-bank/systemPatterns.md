# System Patterns

## Database Schema
```
User (NextAuth.js compatible)
- id (String, cuid)
- name, email, password (optional for OAuth)
- emailVerified, image
- accounts[], sessions[] (NextAuth.js)
- agents[] (app relation)

NextAuth.js Models
- Account (OAuth providers)
- Session (user sessions)
- VerificationToken (email verification)

```

Note: Additional models must to be implemented.

## Authentication Pattern
- NextAuth.js with Prisma adapter
- JWT sessions with credentials provider
- Middleware protection for routes
- Server-side session validation

## Frontend Patterns
- shadcn/ui components with consistent theming
- Server components for data fetching and session checks
- Client components for forms and interactivity
- Theme provider wrapping entire app

## Application Architecture (Optimizer AI)

### Core Optimization Flow
```
User Input → Form Validation → API Request → Gemini AI → Structured Response → UI Rendering → History Storage
```

### Gemini API Integration Pattern
```typescript
// Meta-prompt construction
const metaPrompt = `
  You are a world-class prompt engineering expert.

  Original prompt: ${userInput}
  Purpose: ${purpose}
  Context: ${optionalParams}

  Return JSON with:
  - optimized_prompt (Markdown)
  - improvements (array)
  - tips (array)
  - techniques_applied (array)
`

// API Response Structure
interface GeminiResponse {
  optimized_prompt: string;  // Markdown formatted
  improvements: string[];    // "Title: Description" format
  tips: string[];           // Actionable suggestions
  techniques_applied: string[]; // Engineering techniques
}
```

### Data Storage Pattern
- **History**: localStorage (last 10 sessions)
- **Future**: Optimization model in Prisma for cross-device sync
```
Optimization (to be added)
- id, userId, originalPrompt, purpose
- optionalParams (JSON), optimizedPrompt
- improvements, tips, techniquesApplied (JSON)
- createdAt, updatedAt
```

### UI Layout Pattern
- **Two-column responsive layout**:
  - Left sidebar (light theme): Input form + history
  - Right main area (dark theme): Results display
  - Mobile: Single-column stack

### Internationalization Pattern
- Languages: EN, ES, PT-BR
- Full UI translation
- Language switcher in sidebar
- Translation endpoint for optimized prompts