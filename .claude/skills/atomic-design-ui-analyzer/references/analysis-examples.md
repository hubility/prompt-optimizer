# Example UI Analysis with Atomic Design

## Example 1: Login Form Analysis

### Atoms
- **Colors:**
  - Primary: `#3B82F6` (Blue-500)
  - Background: `#FFFFFF` (White)
  - Text: `#1F2937` (Gray-800)
  - Error: `#EF4444` (Red-500)
  
- **Typography:**
  - Heading: `font-sans, 24px, 600 weight`
  - Body: `font-sans, 14px, 400 weight`
  - Label: `font-sans, 14px, 500 weight`

- **Icons:**
  - `IconMail` - Email icon
  - `IconLock` - Password icon
  - `IconEye` - Show password icon

- **Base Inputs:**
  - Text input field
  - Password input field
  - Primary button
  - Link button

### Molecules
- **EmailInput:**
  - Constituents: `IconMail` + `Label` + `Input`
  - Props: `value`, `onChange`, `error`, `disabled`
  - States: `default`, `focused`, `error`, `disabled`

- **PasswordInput:**
  - Constituents: `IconLock` + `Label` + `Input` + `IconEye` (toggle)
  - Props: `value`, `onChange`, `error`, `showPassword`, `onToggleVisibility`
  - States: `default`, `focused`, `error`, `disabled`, `visible`

- **PrimaryButton:**
  - Constituents: `Button` + `Text`
  - Props: `label`, `onClick`, `loading`, `disabled`
  - States: `default`, `hover`, `active`, `loading`, `disabled`

### Organisms
- **LoginForm:**
  - Constituents: `EmailInput` + `PasswordInput` + `PrimaryButton` + `Link` (forgot password)
  - Props: `onSubmit`, `onForgotPassword`, `loading`, `error`
  - States: `idle`, `validating`, `submitting`, `error`, `success`

- **LoginCard:**
  - Constituents: `Card` + `Logo` + `LoginForm`
  - shadcn/ui mapping: `Card` with `CardHeader`, `CardContent`

### Template
- Centered layout with single column
- Maximum width: 400px
- Vertical spacing between elements: 16px
- Card shadow: `shadow-lg`

---

## Example 2: E-commerce Product Card

### Atoms
- **Colors:**
  - Primary: `#10B981` (Green-500)
  - Background: `#F9FAFB` (Gray-50)
  - Text: `#111827` (Gray-900)
  - Muted: `#6B7280` (Gray-500)

- **Typography:**
  - Product title: `font-sans, 18px, 600 weight`
  - Price: `font-sans, 20px, 700 weight`
  - Description: `font-sans, 14px, 400 weight`

- **Icons:**
  - `IconHeart` - Wishlist icon
  - `IconShoppingCart` - Add to cart icon
  - `IconStar` - Rating star

### Molecules
- **ProductImage:**
  - Constituents: `Image` + `Badge` (discount)
  - Props: `src`, `alt`, `discount`
  - States: `loading`, `loaded`, `error`

- **PriceDisplay:**
  - Constituents: `Original Price` (strikethrough) + `Current Price`
  - Props: `originalPrice`, `currentPrice`, `currency`

- **RatingDisplay:**
  - Constituents: 5x `IconStar` + `Text` (rating count)
  - Props: `rating`, `count`

- **AddToCartButton:**
  - Constituents: `IconShoppingCart` + `Button`
  - Props: `onClick`, `disabled`, `loading`
  - States: `default`, `hover`, `loading`, `added`

### Organisms
- **ProductCard:**
  - Constituents: `ProductImage` + `Product Title` + `PriceDisplay` + `RatingDisplay` + `AddToCartButton` + `IconHeart` (wishlist)
  - Props: `product`, `onAddToCart`, `onAddToWishlist`
  - shadcn/ui mapping: `Card` with `CardContent`, `CardFooter`

### Template
- Grid layout: 3-4 columns on desktop, 2 on tablet, 1 on mobile
- Card spacing: 24px gap
- Card hover effect: Slight elevation increase

---

## Example 3: Dashboard Header

### Atoms
- **Colors:**
  - Primary: `#6366F1` (Indigo-500)
  - Background: `#FFFFFF` (White)
  - Border: `#E5E7EB` (Gray-200)

- **Icons:**
  - `IconMenu` - Hamburger menu
  - `IconSearch` - Search icon
  - `IconBell` - Notifications
  - `IconUser` - User avatar

### Molecules
- **SearchBar:**
  - Constituents: `IconSearch` + `Input`
  - Props: `placeholder`, `value`, `onChange`
  - shadcn/ui mapping: `Input` with icon prefix

- **NotificationBadge:**
  - Constituents: `IconBell` + `Badge` (count)
  - Props: `count`, `onClick`
  - States: `default`, `hover`, `hasNew`

- **UserMenu:**
  - Constituents: `Avatar` + `DropdownMenu`
  - Props: `userName`, `userImage`, `menuItems`
  - shadcn/ui mapping: `Avatar` + `DropdownMenu`

### Organisms
- **DashboardHeader:**
  - Constituents: `Logo` + `NavigationMenu` + `SearchBar` + `NotificationBadge` + `UserMenu`
  - Props: `user`, `notifications`, `onSearch`, `onNavigate`
  - shadcn/ui mapping: `NavigationMenu` for main nav

### Template
- Horizontal layout with sticky positioning
- Left section: Logo + Navigation (60%)
- Right section: Search + Actions (40%)
- Height: 64px
- Border bottom: 1px solid gray-200
