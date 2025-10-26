# shadcn/ui and Radix UI Component Reference

## Common Component Mappings

This reference provides guidance on mapping UI elements to shadcn/ui and Radix UI components.

### Atoms - Base Components

**Buttons:**
- `Button` - Standard button with variants (default, destructive, outline, secondary, ghost, link)
- `Toggle` - Toggle button for binary states

**Inputs:**
- `Input` - Text input field
- `Textarea` - Multi-line text input
- `Checkbox` - Checkbox input
- `Radio` - Radio button
- `Switch` - Toggle switch
- `Slider` - Range slider

**Typography:**
- Use Tailwind typography utilities
- Standard font families: `font-sans`, `font-serif`, `font-mono`
- Heading levels: `text-4xl`, `text-3xl`, `text-2xl`, `text-xl`, `text-lg`
- Body text: `text-base`, `text-sm`, `text-xs`

**Icons:**
- lucide-react library (e.g., `IconSearch`, `IconMenu`, `IconUser`)

**Colors:**
- Primary palette: `primary`, `primary-foreground`
- Secondary palette: `secondary`, `secondary-foreground`
- Destructive: `destructive`, `destructive-foreground`
- Muted: `muted`, `muted-foreground`
- Accent: `accent`, `accent-foreground`
- Background: `background`, `foreground`

### Molecules - Composite Components

**Form Elements:**
- `Label` + `Input` → Form field
- `Label` + `Textarea` → Text area field
- `Label` + `Select` → Dropdown select
- `Input` + `Button` → Search input

**Navigation:**
- `NavigationMenu` - Main navigation menu
- `Menubar` - Menu bar component
- `DropdownMenu` - Dropdown menu
- `ContextMenu` - Right-click context menu

**Feedback:**
- `Alert` - Alert notification
- `Toast` - Toast notification
- `Badge` - Status badge
- `Progress` - Progress indicator

**Data Display:**
- `Avatar` - User avatar
- `Separator` - Visual separator
- `Tooltip` - Tooltip component

### Organisms - Complex Components

**Layout:**
- `Card` - Card container with header, content, footer
- `Dialog` - Modal dialog
- `Sheet` - Side panel/drawer
- `Tabs` - Tabbed interface
- `Accordion` - Collapsible sections
- `Collapsible` - Collapsible content

**Data:**
- `Table` - Data table
- `DataTable` - Advanced data table with sorting/filtering
- `Calendar` - Date picker calendar
- `Popover` - Popover container

**Forms:**
- `Form` - Form container with validation
- `Select` - Select dropdown
- `Combobox` - Searchable select

**Navigation:**
- `Breadcrumb` - Breadcrumb navigation
- `Pagination` - Pagination controls
- `Command` - Command palette

## Common Component Props

### Button
- `variant`: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
- `size`: "default" | "sm" | "lg" | "icon"
- `disabled`: boolean
- `asChild`: boolean

### Input
- `type`: "text" | "email" | "password" | "number" | etc.
- `placeholder`: string
- `disabled`: boolean
- `required`: boolean

### Card
- `CardHeader` - Header section
- `CardTitle` - Title element
- `CardDescription` - Description text
- `CardContent` - Main content
- `CardFooter` - Footer section

## Common States

- `hover` - Mouse hover state
- `active` - Active/pressed state
- `focus` - Keyboard focus state
- `disabled` - Disabled/inactive state
- `loading` - Loading state
- `error` - Error state
- `success` - Success state
