# Product Context

## Problem Statement
Many users, from beginners to intermediates, struggle to write prompts that consistently produce high-quality results from generative AI models. Their prompts are often:
- Vague and lacking context
- Poorly structured
- Missing critical details
- Leading to subpar, irrelevant, or unpredictable AI outputs

This creates a frustrating user experience and prevents users from unlocking the full potential of AI tools.

## Solution
Optimizer AI acts as an intelligent assistant for prompt engineering. It provides a guided interface where users can:
1. Input their initial idea
2. Specify its purpose (Image Generation, Code Generation, Creative Text, etc.)
3. Add relevant context through optional parameters
4. Receive an optimized, professional-grade prompt
5. Learn what was improved and why through educational feedback

The application uses the Google Gemini API to analyze and systematically rewrite prompts, making them more specific, context-rich, and structured for optimal performance.

## Goals and Objectives

### Primary Goal
Empower users of all skill levels to create high-quality, effective prompts that yield superior results from generative AI models.

### Key Objectives
1. **Improve Output Quality**: Drastically increase the quality and relevance of AI-generated content by refining input prompts
2. **Educate Users**: Teach prompt engineering principles through clear, concise feedback on improvements
3. **Streamline Workflow**: Offer a fast, intuitive, and repeatable process for prompt creation and refinement
4. **Enhance Accessibility**: Cater to a global audience through multilingual interface (EN, ES, PT-BR) and on-demand translation
5. **Maintain Context**: Provide session history for users to easily access, compare, and reuse past optimizations

## Target Audience

### Primary Audience
Novice to intermediate AI users, including:
- Content creators
- Marketers
- Developers
- Students
- Researchers

These users utilize generative AI but are not experts in prompt engineering.

### Secondary Audience
Experienced AI users and prompt engineers looking for tools to:
- Rapidly structure prompts
- Standardize prompt formats
- Document their prompts systematically

## Core User Experience Flow

### Input Phase
1. User enters their initial, unstructured prompt (up to 4000 characters)
2. User selects prompt purpose from dropdown:
   - Creative Text Generation
   - Image Generation
   - Code Generation
   - Analysis & Insights
   - Agents/Assistants
3. User provides optional context based on purpose:
   - Image: Style, Creativity Level
   - Code: Programming Language, Framework
   - Creative: Tone

### Processing Phase
1. Application constructs meta-prompt with all user inputs
2. Sends request to Google Gemini API (gemini-2.5-flash)
3. Receives structured JSON response with:
   - Optimized prompt (Markdown formatted)
   - List of improvements made
   - Additional tips for further refinement
   - Techniques applied

### Output Phase
1. Display optimized prompt with rich text rendering
2. Show improvements and tips in dedicated panels
3. Provide action buttons:
   - Copy to clipboard
   - Translate to other languages
   - Re-optimize with same inputs
4. Auto-save to history (last 10 sessions in localStorage)

## Key Features

### 1. Prompt Input & Contextualization
- Primary textarea (max 4000 chars)
- Mandatory purpose dropdown
- Dynamic optional parameters based on purpose
- Clear, guided interface

### 2. AI-Powered Optimization
- Google Gemini API integration
- Meta-prompting strategy
- Structured JSON output for consistency
- World-class prompt engineering expertise encoded

### 3. Results Display & Interaction
- Markdown-rendered optimized prompt
- Copy functionality
- On-demand translation (EN, ES, PT-BR)
- Re-optimization capability
- Improvement analysis panels
- Executable tip badges

### 4. Optimization History
- localStorage persistence
- Last 10 sessions saved
- Quick re-selection without API calls
- Clear history option
- Chronological list view

### 5. Internationalization
- Full UI translation (EN, ES, PT-BR)
- Language switcher in sidebar
- Instant language changes
- Consistent experience across languages

## Design Philosophy

### Visual Design
- **Layout**: Responsive two-column layout
  - Light-themed sidebar (left): Input and history
  - Dark-themed main area (right): Results display
  - Mobile: Single-column stack
- **Typography**: Inter font for readability and modern aesthetic
- **Icons**: Google Material Symbols for universal recognition
- **Theme**: Light/dark contrast for clear area delineation

### UX Principles
1. **Clear State Management**:
   - Idle/Placeholder state with instructions
   - Loading state with animated spinner
   - Error state with clear messaging
   - Success state with full results
2. **Immediate Feedback**: All actions provide visual confirmation
3. **Educational Focus**: Not just optimization, but teaching through feedback
4. **Accessibility**: Multilingual support, clear visuals, intuitive navigation

## Future Considerations (v2.0)
- User accounts for cross-device sync
- Prompt template library
- Diff view for comparing original vs optimized
- Model-specific optimization (Midjourney, Claude, etc.)
- Team collaboration and shared libraries
