# GMB LEGEND --- Design Specification

**Document status:** Draft v1.0\
**Last updated:** 11 October 2026\
**Related documents:** `PRD.md`, `BRD.md`, `FRD.md`

## 1. Design Vision

GMB LEGEND should feel **aesthetic, futuristic, light, premium, and
calm**. The interface should combine modern SaaS clarity with subtle
AI-inspired visual details. It should feel advanced without becoming
dark, noisy, neon-heavy, or visually overwhelming.

### Design principles

1.  **Light-first:** Use a light theme as the default across the
    application.
2.  **Futuristic, not sci-fi clutter:** Use restrained gradients, soft
    glows, thin borders, and subtle geometric accents.
3.  **Data-first clarity:** Analytics, rankings, review data, and tables
    must remain easy to scan.
4.  **Consistent patterns:** Reuse the same sidebar, page header,
    filters, cards, tables, and feedback states.
5.  **Accessible contrast:** Light colors must not reduce readability or
    make statuses distinguishable by color alone.
6.  **Purposeful color:** Use color to communicate hierarchy, data, and
    state---not as decoration everywhere.
7.  **Responsive behavior:** Core workflows must work on desktop,
    tablet, and mobile layouts.
8.  **Honest data presentation:** Loading, empty, unavailable, stale,
    and error states must be visually distinct.

## 2. Visual Direction

### 2.1 Theme

-   **Default theme:** Light.
-   **Optional dark theme:** Not required for the first release; can be
    considered later.
-   **Background:** Very pale cool gray or blue-white.
-   **Surfaces:** White cards with subtle borders and restrained
    shadows.
-   **Primary accent:** Soft indigo or blue-violet.
-   **Secondary accent:** Light cyan/teal for selected data highlights.
-   **Positive state:** Muted green.
-   **Warning state:** Warm amber.
-   **Error state:** Soft red.
-   **Text:** Deep slate rather than pure black.
-   **Decorative effects:** Small gradient accents, faint radial glow
    behind selected hero panels, and subtle hover transitions.

### 2.2 Suggested color tokens

These are initial design tokens and may be refined during
implementation.

  -----------------------------------------------------------------------
  Token                   Suggested value         Intended use
  ----------------------- ----------------------- -----------------------
  `--background`          `#F7F9FC`               Main application
                                                  background

  `--surface`             `#FFFFFF`               Cards, menus, tables,
                                                  modal surfaces

  `--surface-subtle`      `#F0F5FF`               Selected areas and soft
                                                  information panels

  `--primary`             `#635BFF`               Main actions, selected
                                                  navigation, links

  `--primary-hover`       `#5148E5`               Hover/focus state for
                                                  primary actions

  `--primary-soft`        `#EEECFF`               Soft selected
                                                  backgrounds and chips

  `--secondary`           `#26B6C8`               Secondary highlights
                                                  and supporting charts

  `--text-primary`        `#172033`               Main headings and body
                                                  text

  `--text-secondary`      `#667085`               Supporting labels and
                                                  metadata

  `--border`              `#E4EAF2`               Dividers, card
                                                  outlines, table borders

  `--success`             `#16845B`               Successful states

  `--success-soft`        `#E7F7EF`               Success backgrounds

  `--warning`             `#A96509`               Warning states

  `--warning-soft`        `#FFF4DA`               Warning backgrounds

  `--danger`              `#C83E52`               Errors and destructive
                                                  actions

  `--danger-soft`         `#FDECEF`               Error backgrounds

  `--info`                `#2764C5`               Informational states

  `--info-soft`           `#EAF2FF`               Informational
                                                  backgrounds
  -----------------------------------------------------------------------

Color values are proposals, not a guarantee of accessibility. Check
contrast for final text/background combinations before release.

## 3. Typography

-   Use a clean sans-serif font such as **Inter**, **Geist**, or a
    system sans-serif fallback.
-   Use clear hierarchy rather than oversized text throughout the
    dashboard.
-   Page title: approximately 24--30 px on desktop.
-   Section heading: approximately 16--20 px.
-   Body text: approximately 14--16 px.
-   Table content and helper labels: approximately 12--14 px, without
    dropping below comfortable readability.
-   Use medium or semibold weights for headings and labels.
-   Use tabular numerals for metrics, rankings, percentages, and dates
    where supported.
-   Avoid long blocks of uppercase text.

## 4. Application Shell

### 4.1 Desktop layout

Use a persistent left navigation sidebar and a flexible main content
area.

-   **Sidebar width:** approximately 248 px when expanded; approximately
    72 px when collapsed.
-   **Top header:** approximately 64--72 px high.
-   **Main content:** flexible width with consistent page padding of
    approximately 24--32 px.
-   **Content max width:** allow analytics tables and dashboards to use
    available width; constrain text-heavy settings pages for
    readability.
-   **Spacing system:** base spacing unit of 4 px, with common gaps of
    8, 12, 16, 24, and 32 px.
-   **Page background:** `--background`.
-   **Cards and tables:** white surfaces with thin borders and modest
    shadows.

### 4.2 Sidebar navigation

The sidebar should be clean, grouped, and easy to scan. Use a simple
line icon per top-level area. Avoid giving every item a different color.

Suggested grouping based on the supplied reference navigation:

1.  Dashboard
2.  Business / Listings
    -   Add New Business
    -   Overview
    -   Directories
3.  Reputation
    -   Review Management
    -   FAQ
    -   Deleted Reviews
    -   QR Setting
4.  Content & Social
    -   Content Updates
    -   Post Scheduling
    -   Post History
    -   Social Media Analytics
    -   Social Rules
5.  Analytics
    -   Keyword Position
    -   Geo Grid Ranker
    -   Competitors
    -   Market Research
6.  Workspace
    -   Brand Details
    -   Team Management, if approved
    -   Alerts & Reports
7.  Settings
    -   Profile
    -   Billing and Active Listings only if retained in the free-product
        scope
    -   Release Notes

The exact grouping and labels must be confirmed against the approved
first-release scope. Do not display dead links or unfinished features as
active navigation items.

### 4.3 Top header

Recommended elements:

-   Sidebar collapse control
-   Current page breadcrumb/title context
-   Global search only if its behavior and scope are defined
-   Current brand/listing selector when relevant
-   Notification indicator only if notifications are implemented
-   User profile menu

Keep the header low-noise. Do not place every possible action in the top
bar.

## 5. Component Style

### 5.1 Cards

-   White background, 1 px border, 12--16 px corner radius.
-   Soft shadow only where elevation improves hierarchy.
-   Padding of 16--24 px.
-   Use subtle accent backgrounds for selected or featured cards, not
    for every card.
-   Metric cards should contain a label, value, comparison/trend if
    available, and data period or tooltip.

### 5.2 Buttons

-   Primary buttons use the indigo accent and clear action verbs.
-   Secondary buttons use white/light surfaces with a border.
-   Destructive buttons use the danger color and require confirmation
    for irreversible actions.
-   Disabled buttons must look disabled and explain the missing
    requirement where possible.
-   Use a consistent height (roughly 36--44 px) and corner radius (8--10
    px).
-   Avoid excessive gradients or oversized pill buttons across the whole
    interface.

### 5.3 Inputs and filters

-   White input surfaces with thin neutral borders.
-   Visible labels; placeholders must not replace labels.
-   Clear focus outline in the primary accent.
-   Show validation messages beside the relevant field.
-   Use searchable dropdowns for long listing, brand, city, or keyword
    lists.
-   Keep active filters visible and easy to remove.
-   Use date-range controls consistently across analytics screens.

### 5.4 Tables

-   Use a clear header row, restrained row dividers, and sufficient cell
    padding.
-   Align text fields left and numeric values consistently.
-   Use tabular numerals for rank, count, percentage, and currency-like
    metrics.
-   Use sticky headers only for long tables where they help.
-   Keep action menus consistent at the right side of a row.
-   On small screens, provide a deliberate responsive table strategy:
    horizontal scrolling, priority columns, or a card/list
    transformation.
-   Empty tables should show a short explanation and a relevant next
    action.

### 5.5 Status badges

Use concise labels and subtle tinted backgrounds for states such as
Connected, Disconnected, Processing, Published, Scheduled, Failed,
Unavailable, and Needs Attention. Never rely on color alone; include
text or an icon.

### 5.6 Charts

-   Use a limited, consistent chart palette.
-   Keep gridlines light and labels readable.
-   Include titles, date ranges, units, legends, and helpful tooltips.
-   Use the same color for the same metric across modules.
-   Do not use 3D charts or decorative chart effects.
-   If a chart has no data, show an empty state rather than a blank
    panel.
-   Provide an accessible textual summary or table for critical chart
    information where practical.

### 5.7 Modals and confirmation dialogs

-   Use modals for focused tasks only.
-   Prefer a side panel for complex forms where it preserves context.
-   Confirmation dialogs must clearly state the action and its
    consequence.
-   Do not use a modal for every small action.

### 5.8 Toasts and feedback

-   Show success feedback only after confirmed success.
-   Provide actionable error messages without exposing secrets or raw
    stack traces.
-   For long-running tasks, show progress and allow the user to leave
    the page if safe.

## 6. Futuristic Visual Details

Use these elements selectively:

-   A very subtle indigo-to-cyan gradient on the logo mark or one key
    dashboard accent.
-   A faint radial glow behind a main dashboard summary area.
-   Thin gradient outlines only for a featured AI/insight panel.
-   Smooth 150--220 ms hover and focus transitions.
-   Small animated progress indicators for active jobs, with
    reduced-motion support.
-   Soft tinted chart highlights for selected data points.

Avoid:

-   Full-page neon gradients
-   Excessive blur/glassmorphism that reduces text contrast
-   Constantly moving backgrounds
-   Large glowing borders around all cards
-   Dark backgrounds as the default
-   Rainbow-colored charts without semantic meaning

## 7. Key Screen Layouts

These are layout requirements, not final pixel-perfect mockups.

### 7.1 Dashboard

1.  Page title and selected brand/listing context.
2.  A compact row of key metrics, only for data that is actually
    available.
3.  Main performance/ranking visualization.
4.  Recent reviews or listing status panel, where supported.
5.  Recent posts and alert activity.
6.  A small quick-actions area for common tasks.

Do not show fabricated metric values in a production dashboard. Use
skeleton loading states while fetching and clear empty states when no
data is connected.

### 7.2 Listing and Overview

-   Page title with listing selector and status.
-   Listing information card.
-   Performance metrics and reporting period.
-   Trend visualization.
-   Detailed comparison section where relevant.
-   Clear connection or permission prompt if the data source is not
    available.

### 7.3 Review Management

-   Header with selected listing/source and date filter.
-   Metric summary cards.
-   Sentiment visualization if enabled.
-   Searchable review table with rating, review text, source, date, and
    reply status when available.
-   Row actions only when supported by the provider.
-   Separate tabs or sub-navigation for FAQ, Deleted Reviews, and QR
    Setting.

### 7.4 Content Updates

-   Header and current listing scope.
-   Tabs for Dashboard, Update History, and Bulk Product Update.
-   Clear operation type selection.
-   Bulk forms separated for products, inventory, and services.
-   Preview and confirmation step for bulk changes.
-   Per-listing result summary after execution.

### 7.5 Post Scheduling

-   Header with timezone and channel/listing selectors.
-   Weekly/monthly calendar toggle.
-   Filters and Add New Post action.
-   Calendar cards with readable post type, scheduled time, and status.
-   Side panel for upcoming holidays or AI post ideas only if those
    features are approved.
-   Post creation panel containing content, media, destination, and
    schedule controls.

### 7.6 Keyword Position

-   Header with selected listing, date range, and refresh status.
-   Metric cards for tracked keywords, average rank, and visibility only
    if their definitions are approved.
-   Ranking distribution chart.
-   Keyword table with search, intent filters, rank changes, and
    supported volume/trend fields.
-   Add/Edit Keywords action and export where enabled.

### 7.7 Geo Grid Ranker

-   Configuration panel for business, coordinates/grid configuration,
    and keywords.
-   Clear Run Rank Check action.
-   Progress and per-keyword/per-point results.
-   Map/heatmap visualization only if the scan returns multiple
    geographic points.
-   Table view for exact scan results and CSV export.
-   Explicit distinction between no result and scan failure.

### 7.8 Competitors and Market Research

-   Market and city selector.
-   Competitor selection and management.
-   Summary metrics with definitions/tooltips.
-   Comparison table and city heatmap.
-   AI-generated summary panel only if approved and available without a
    mandatory paid dependency.
-   Export controls near the relevant table or visualization.

### 7.9 Brand Details and Settings

-   Use a calmer settings layout with a secondary settings navigation.
-   Group related fields into sections rather than one long form.
-   Show connection state and last sync clearly.
-   Require confirmation for destructive changes.
-   Do not display billing controls as active if billing is not part of
    the approved free product.

### 7.10 Alerts and Reports

-   Separate report and alert configuration tabs.
-   Use a structured form for type, scope, schedule/frequency,
    recipients, and delivery method.
-   Show existing configurations in a table.
-   Provide history and clear delivery status.
-   Mark unsupported delivery methods as unavailable rather than
    implying they are configured.

## 8. Responsive Behavior

### Desktop

-   Expanded sidebar and multi-column dashboard cards.
-   Full analytics tables and wide charts.

### Tablet

-   Collapsible sidebar.
-   Two-column card grids where space permits.
-   Filters may wrap to a second row.

### Mobile

-   Sidebar becomes a drawer or compact navigation.
-   Stack metric cards vertically or in a compact horizontal layout.
-   Use full-width forms and touch-friendly controls.
-   Keep key actions accessible without horizontal page scrolling.
-   Tables must have a defined mobile behavior rather than shrinking
    text excessively.
-   Calendar should use an agenda/list view if the full month grid is
    impractical.

Exact breakpoints are implementation decisions; validate the layouts at
common mobile, tablet, and desktop widths.

## 9. Accessibility and Usability

-   Meet WCAG 2.2 AA contrast targets where applicable.
-   All interactive elements must be keyboard accessible.
-   Focus indicators must be visible.
-   Form controls must have labels and understandable error messages.
-   Icons must have accessible labels when they convey meaning.
-   Status must not rely on color alone.
-   Respect reduced-motion preferences.
-   Provide sensible focus management in dialogs and side panels.
-   Charts should include labels and, where practical, a tabular
    alternative.
-   Do not use color as the only distinction between chart series or
    ranking states.

## 10. Interaction States

Every data-backed component should define the relevant states:

  -----------------------------------------------------------------------
  State                               Expected appearance/behavior
  ----------------------------------- -----------------------------------
  Loading                             Skeletons or compact progress
                                      indicator; avoid layout jumps

  Empty                               Short explanation and next action

  No search results                   Explain that the current filters
                                      returned no matches; offer to clear
                                      filters

  Disconnected                        Connection prompt and a clear
                                      explanation of what is unavailable

  Permission required                 Explain the permission needed and
                                      provide a safe next step

  Stale data                          Show last-updated time and refresh
                                      option if supported

  Partial success                     Summarize successful and failed
                                      items separately

  Error                               Concise message and retry path
                                      where appropriate

  Disabled feature                    Explain that the feature is
                                      unavailable or not configured
  -----------------------------------------------------------------------

## 11. Design Acceptance Criteria

The design is ready for implementation when:

1.  The default visual theme is light, calm, and consistent.
2.  The palette uses soft, light surfaces with readable text and
    restrained indigo/cyan accents.
3.  All enabled modules share a consistent application shell and
    component system.
4.  The sidebar reflects only approved and implemented modules.
5.  Each key screen has defined loading, empty, error, and disconnected
    states.
6.  Tables, filters, buttons, and forms have consistent interactions.
7.  Charts have labels, legends, date ranges, and metric definitions
    where applicable.
8.  Responsive behavior is defined for desktop, tablet, and mobile.
9.  Accessibility and keyboard behavior are included in component
    design.
10. The interface does not display fabricated production data or imply
    unavailable integrations are working.
11. Futuristic effects remain subtle and do not reduce usability.
12. Final colors and typography pass contrast and readability checks.

## 12. Open Design Decisions

-   Final logo and brand mark
-   Final font selection
-   Exact sidebar labels and grouping
-   Whether dark mode is needed after the first release
-   Final chart palette and semantic metric colors
-   Exact responsive breakpoints
-   Which dashboard cards are included in the first release
-   Which modules are enabled for the initial launch
-   Whether the user prefers a more minimal look or a more expressive
    gradient treatment

**End of DESIGN --- GMB LEGEND**
