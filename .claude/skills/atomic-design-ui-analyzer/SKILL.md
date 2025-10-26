---
name: atomic-design-ui-analyzer
description: Analyze user interfaces and decompose them into Atomic Design specifications (atoms, molecules, organisms, templates) with shadcn/ui and Radix UI component mappings. Use when users provide UI screenshots, URLs, or descriptions and request component breakdown, design system analysis, or technical specifications following atomic design methodology.
---

# Atomic Design UI Analyzer

## Overview

Transform UI designs into comprehensive technical specifications using Atomic Design methodology. Decompose interfaces into atoms, molecules, organisms, and templates while mapping to shadcn/ui and Radix UI components.

## When to Use This Skill

Trigger this skill when users:
- Provide a UI screenshot, mockup, or design file
- Share a website URL for UI analysis
- Describe an interface requiring component breakdown
- Request atomic design decomposition
- Need component specifications for development
- Ask for shadcn/ui or Radix UI component mappings

## Analysis Workflow

### Step 1: Understand the UI Context

**Input sources:**
- Image uploads (screenshots, mockups, design files)
- Website URLs (use web_fetch if provided)
- Textual descriptions of the interface

**Initial assessment:**
- Identify the UI type (dashboard, landing page, form, e-commerce, etc.)
- Note the primary user flows visible
- Determine complexity level (simple, moderate, complex)

### Step 2: Atomic Decomposition Process

Analyze the UI systematically from smallest to largest components:

#### 2.1 Identify Atoms

Extract the fundamental, indivisible UI elements:

**Colors:**
- Document all colors with hex codes
- Group into semantic categories: primary, secondary, accent, background, text, borders
- Note color usage patterns (backgrounds, text, borders, states)

**Typography:**
- Font families (e.g., `font-sans`, `Inter`, `Roboto`)
- Font sizes for all text hierarchies (headings: h1-h6, body, captions, labels)
- Font weights (100-900)
- Line heights and letter spacing if notable

**Icons:**
- List all unique icons with semantic names (e.g., `IconSearch`, `IconMenu`, `IconUser`)
- Suggest icon library (lucide-react for shadcn/ui compatibility)
- Note icon sizes and usage contexts

**Base Elements:**
- Basic buttons (without complex compositions)
- Plain input fields
- Simple labels and text elements
- Basic shapes (borders, dividers, backgrounds)

#### 2.2 Identify Molecules

Find functional groups of atoms working together:

**For each molecule:**
- **Name:** Use PascalCase (e.g., `SearchInput`, `ProfileAvatar`, `PriceTag`)
- **Constituents:** List the atoms that compose it
- **Props:** Suggest component properties
  - Required props (e.g., `value`, `onChange`)
  - Optional props (e.g., `placeholder`, `disabled`)
  - Callback props (e.g., `onClick`, `onSubmit`)
- **States:** Document visual states
  - Interactive states: `hover`, `active`, `focus`
  - Functional states: `disabled`, `loading`, `error`, `success`
- **shadcn/ui mapping:** Suggest equivalent components when applicable

**Common molecule patterns:**
- Form fields: Label + Input + Error message
- Search bars: Icon + Input + Button
- Navigation items: Icon + Label + Badge
- User info: Avatar + Name + Status indicator

#### 2.3 Identify Organisms

Locate complex UI sections combining multiple molecules:

**For each organism:**
- **Name:** Descriptive, component-like name (e.g., `SiteHeader`, `ProductCard`, `LoginForm`)
- **Constituents:** List molecules and atoms
- **Props:** Interface for the component
- **States:** Overall organism states (e.g., `loading`, `empty`, `error`)
- **shadcn/ui mapping:** Suggest composite components (e.g., `Card`, `Dialog`, `Sheet`)
- **Behavior notes:** Key interactions or animations

**Common organism patterns:**
- Headers: Logo + Navigation + Search + User menu
- Cards: Image + Title + Description + Actions
- Forms: Multiple input molecules + Submit button
- Sidebars: Navigation + User profile + Settings

#### 2.4 Define Templates

Describe the overall page structure:

**Layout specifications:**
- Grid system (columns, rows, gaps)
- Responsive breakpoints (mobile, tablet, desktop)
- Spacing system (margins, padding, gaps)
- Positioning (fixed headers, sticky elements)

**Structure:**
- Main sections and their arrangement
- Content flow and hierarchy
- Visual organization principles

### Step 3: Generate Technical Specifications

Create detailed specifications for implementation:

**Component specifications should include:**
- Component name and purpose
- Props interface with types
- State management requirements
- Event handlers needed
- Styling approach (Tailwind classes, CSS-in-JS)
- Accessibility considerations (ARIA labels, keyboard navigation)

**Example component spec format:**
```
## ButtonPrimary

**Purpose:** Main call-to-action button

**Props:**
- `label: string` - Button text
- `onClick: () => void` - Click handler
- `disabled?: boolean` - Disabled state (default: false)
- `loading?: boolean` - Loading state (default: false)
- `size?: 'sm' | 'md' | 'lg'` - Button size (default: 'md')

**States:**
- `default` - Normal appearance
- `hover` - Elevated, slightly darker
- `active` - Pressed appearance
- `disabled` - Reduced opacity, no pointer
- `loading` - Spinner icon, disabled interaction

**shadcn/ui:** Use `Button` component with `variant="default"`

**Styling:** 
- Background: `bg-primary`
- Text: `text-primary-foreground`
- Padding: `px-4 py-2` (md)
- Border radius: `rounded-md`
```

### Step 4: Create Output Document

Generate a structured markdown document with all findings:

**Document structure:**
```markdown
# UI Analysis: [Interface Name]

## 1. Atoms
### Colors
### Typography  
### Icons
### Base Elements

## 2. Molecules
### [MoleculeName1]
### [MoleculeName2]

## 3. Organisms
### [OrganismName1]
### [OrganismName2]

## 4. Templates
### Layout Structure
### Responsive Behavior

## 5. Implementation Notes
### Component Hierarchy
### State Management
### Recommended Libraries
```

## Best Practices

**Naming conventions:**
- Use PascalCase for all component names
- Be descriptive but concise (e.g., `UserProfileCard` not `CardForUserProfile`)
- Avoid generic names when specific ones work (e.g., `SearchInput` not `Input1`)

**Component organization:**
- Start with the smallest units and build up
- Group related components together
- Maintain clear parent-child relationships

**Technical accuracy:**
- Provide realistic prop types and interfaces
- Include all common states, not just happy paths
- Consider edge cases (loading, error, empty states)

**shadcn/ui integration:**
- Leverage existing shadcn/ui components when possible
- Suggest customizations needed for specific designs
- Note when custom components are required

**Documentation quality:**
- Be comprehensive but concise
- Use bullet points for scannability
- Include code examples when helpful
- Provide visual hierarchy in the document

## Reference Materials

**Component library reference:**
Load `references/component-library-reference.md` for detailed shadcn/ui and Radix UI component mappings, common props, and states.

**Example analyses:**
Load `references/analysis-examples.md` to see concrete examples of UI decomposition following this methodology.

## Output Format

Always generate the analysis in **English** as a well-structured markdown document. Create the document as a .md file that users can reference during development.

The analysis should be:
- **Actionable** - Developers can implement directly from it
- **Complete** - All visible components documented
- **Organized** - Clear hierarchy and grouping
- **Technical** - Specific prop types, states, and mappings
- **Professional** - Suitable for handoff to development teams
