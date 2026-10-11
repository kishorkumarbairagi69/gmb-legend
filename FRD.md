# GMB LEGEND --- Functional Requirements Document (FRD)

**Document status:** Draft v1.0\
**Product:** GMB LEGEND\
**Last updated:** 11 October 2026\
**Related documents:** `PRD.md`, `BRD.md`\
**Purpose:** Define observable system behavior for the modules evidenced
by the supplied screenshots and release-note references.

> **Scope note:** This FRD records observed screens and converts them
> into testable requirements where the behavior is sufficiently clear.
> Screenshots do not prove that a backend integration is implemented or
> that displayed data is live. Requirements marked **TBD**,
> **Conditional**, or **Proposed** require confirmation before
> implementation. GMB LEGEND must use its own branding and
> implementation.

------------------------------------------------------------------------

## 1. Requirement Language

-   **MUST**: required for an approved release.
-   **SHOULD**: recommended, subject to product-owner approval.
-   **MAY**: optional capability.
-   **TBD**: a decision or specification is missing.
-   **Conditional**: implement only if the required provider access and
    a compliant no-cost operating path are verified.
-   **Proposed**: useful behavior inferred for completeness, not
    confirmed by the supplied reference.

## 2. Global Functional Requirements

### FR-GEN-001 --- Navigation

The system MUST provide consistent navigation between enabled modules. A
module without implemented access or data MUST display an informative
state rather than a misleading success state.

### FR-GEN-002 --- Authentication and authorization

The system MUST authenticate users and enforce server-side authorization
for every protected action and data request. Hiding a button is not
sufficient authorization.

### FR-GEN-003 --- Account and tenant isolation

If the product supports multiple organizations, each account's brands,
listings, keywords, reports, integrations, and team members MUST be
isolated from other accounts.

### FR-GEN-004 --- Loading, empty, error, and stale states

Data-backed screens MUST distinguish at least: - Loading - Data
available - No data configured - No results for the selected filters -
Permission or connection required - Provider/API error - Stale or
partially updated data, when detectable

### FR-GEN-005 --- Search and filtering

Search and filter controls MUST affect the displayed dataset and MUST
not merely be decorative. Applied filters MUST be clear to the user.

### FR-GEN-006 --- Pagination

Tables with pagination MUST show the current page and total/available
results where known. Changing pages MUST update the rows correctly.

### FR-GEN-007 --- Export

An export action MUST export the data represented by the applicable
screen and filters, respect permissions, and report success or failure.
CSV export is required only on screens where approved.

### FR-GEN-008 --- Time and date handling

Date-based screens MUST use a documented timezone rule. Scheduled tasks
MUST store an unambiguous time and timezone. Display formats may vary by
screen but must be consistent within that screen.

### FR-GEN-009 --- Audit trail

**Proposed:** Material changes to brands, listings, permissions,
integrations, publishing workflows, and alert settings SHOULD record the
actor, action, target, timestamp, and outcome.

### FR-GEN-010 --- Zero-cost dependency gate

Before enabling a feature, the implementation MUST document its data
source, permissions, quota/limits, operational cost, and terms of use. A
feature MUST NOT be advertised as fully working if the required
compliant no-cost provider path is unavailable.

------------------------------------------------------------------------

## 3. Account, Business and Listing Setup

### 3.1 Add New Business

**Observed purpose:** Add a business/listing to the workspace.

-   **FR-BIZ-001:** Provide an Add New Business action from the relevant
    business/listing area.
-   **FR-BIZ-002:** Collect only the fields required by the approved
    listing workflow.
-   **FR-BIZ-003:** Validate required fields and reject malformed values
    with actionable messages.
-   **FR-BIZ-004:** Prevent accidental duplicate records using an
    approved matching strategy, such as an external profile ID or a
    normalized combination of business name and address. Matching rules
    are **TBD**.
-   **FR-BIZ-005:** After saving, show the created record and its actual
    connection/verification status.
-   **FR-BIZ-006:** If external verification or account authorization is
    required, explain the next step and do not claim that the listing is
    connected until verified.

**Acceptance checks** - Missing required fields produce validation
messages. - A valid submission creates one record. - Duplicate detection
does not silently merge unrelated businesses. - A provider failure does
not create a false connected status.

### 3.2 Connect Google Business Profile

**Status:** Conditional on provider access and current API policy.

-   **FR-GBP-001:** Offer an explicit action to connect an eligible
    Google account.
-   **FR-GBP-002:** Use an authorized consent flow; do not request or
    store the user's Google password.
-   **FR-GBP-003:** Display the listings actually returned and
    authorized by the provider.
-   **FR-GBP-004:** Record connection status, the authorized account
    identifier, and the time of the last successful sync, without
    exposing access tokens.
-   **FR-GBP-005:** Provide a refresh/sync action where supported and
    show its outcome.
-   **FR-GBP-006:** Handle revoked access, expired authorization,
    missing permissions, rate limits, and provider errors.
-   **FR-GBP-007:** Support disconnect/revoke behavior if approved,
    including secure removal or invalidation of stored credentials.
-   **FR-GBP-008:** Never simulate a successful Google connection when
    OAuth or provider access has not succeeded.

------------------------------------------------------------------------

## 4. Overview

The observed Overview area has **Listing**, **Performance Data**, and
**Detailed Comparison**.

### 4.1 Listing

-   **FR-OVR-001:** Show the selected account/brand's available
    listings.
-   **FR-OVR-002:** Display the approved listing fields and current
    connection/health status.
-   **FR-OVR-003:** Provide search, filters, or pagination where present
    in the approved design.
-   **FR-OVR-004:** Selecting a listing opens its supported detail or
    analytics view.

### 4.2 Performance Data

-   **FR-OVR-010:** Display performance metrics only when a valid data
    source is connected and data is available.
-   **FR-OVR-011:** Display reporting period and last-updated time.
-   **FR-OVR-012:** Distinguish zero values from missing or unavailable
    values.
-   **FR-OVR-013:** Support date-range selection only where the selected
    data source supports it.
-   **FR-OVR-014:** If the reference layout includes calendar, graph, or
    metric cards, each visualization MUST use the same selected listing
    and reporting scope unless explicitly labelled otherwise.

### 4.3 Detailed Comparison

-   **FR-OVR-020:** Allow users to compare eligible listings or
    competitors using approved metrics.
-   **FR-OVR-021:** Filters MUST update the comparison results.
-   **FR-OVR-022:** Each comparison metric MUST define its source and
    calculation.
-   **FR-OVR-023:** Missing data MUST be displayed as unavailable rather
    than silently treated as zero.
-   **FR-OVR-024:** Export is Conditional on the approved screen and
    data availability.

------------------------------------------------------------------------

## 5. Review Management

The supplied navigation identifies five areas: Dashboard & Sentiment
Analysis, Review Management, FAQ, Deleted Reviews, and QR Setting.

### 5.1 Dashboard & Sentiment Analysis

-   **FR-REV-001:** Show review metrics and sentiment analysis only for
    sources and reviews actually available to the connected account.
-   **FR-REV-002:** Show the date range and source scope.
-   **FR-REV-003:** Identify the method used for sentiment
    classification if sentiment analysis is enabled.
-   **FR-REV-004:** Do not imply that sentiment or review totals cover
    all platforms when only some platforms are connected.

### 5.2 Review Management

-   **FR-REV-010:** Provide a searchable/filterable list of supported
    reviews.
-   **FR-REV-011:** Display the available review details, rating,
    source, date, and reply status where the provider exposes them.
-   **FR-REV-012:** Allow replies or reply suggestions only when
    permitted by the connected provider and approved scope.
-   **FR-REV-013:** Clearly distinguish a generated reply draft from a
    reply actually published.
-   **FR-REV-014:** Record publication result and error where the
    provider supports reply actions.
-   **FR-REV-015:** Avoid duplicate replies when retrying after an
    uncertain response.

### 5.3 FAQ

-   **FR-REV-020:** Display and manage FAQ/question-and-answer items
    only for supported sources and permissions.
-   **FR-REV-021:** Distinguish locally saved drafts from content
    published to an external profile.
-   **FR-REV-022:** If FAQ publication is unsupported by the provider,
    the interface MUST state that limitation.

### 5.4 Deleted Reviews

-   **FR-REV-030:** Show deleted/removed review information only when
    the source provides or the product can lawfully retain that history.
-   **FR-REV-031:** Label inferred or previously captured records
    appropriately.
-   **FR-REV-032:** If analysis or a reinstatement-request workflow is
    implemented, show the action's actual status and do not promise that
    a third party will restore a review.

### 5.5 QR Setting

-   **FR-REV-040:** Allow users to configure a QR code for an approved
    destination, if QR generation is included.
-   **FR-REV-041:** Display the destination before generating or
    exporting the QR code.
-   **FR-REV-042:** Test that the generated code resolves to the
    configured destination.
-   **FR-REV-043:** Do not imply that a QR scan creates a review or
    guarantees a review outcome.

------------------------------------------------------------------------

## 6. Content Updates

The supplied navigation includes Dashboard, Update History, and Bulk
Product Update, with Add Products, Add Inventory, and Add Services. The
service screenshot appears to show a product-style form; the exact
service-specific fields are **TBD**.

### 6.1 Dashboard and Update History

-   **FR-CONT-001:** Show available update activity and its current
    status.
-   **FR-CONT-002:** Provide a history view of supported update
    attempts.
-   **FR-CONT-003:** Where available, display target listing, update
    type, creation time, completion status, and error reason.
-   **FR-CONT-004:** Never label an update as successful before
    receiving confirmation from the target system.

### 6.2 Bulk Product Update

-   **FR-CONT-010:** Allow users to select the approved product/update
    workflow.
-   **FR-CONT-011:** Validate each required field before submission.
-   **FR-CONT-012:** Clearly identify the listings/products included in
    a bulk operation.
-   **FR-CONT-013:** Show per-item results when a bulk action partially
    succeeds.
-   **FR-CONT-014:** Prevent accidental duplicate submissions where
    feasible.
-   **FR-CONT-015:** Add Products, Add Inventory, and Add Services MUST
    use separately defined field sets after product-owner confirmation.
-   **FR-CONT-016:** The product MUST NOT reuse a product form for
    services without confirming that the fields and provider operation
    are correct.

------------------------------------------------------------------------

## 7. Post Scheduling and Social Publishing

The supplied references show Post Scheduling, Post History, Social Media
Analytics, and Social Rules.

### 7.1 Post Scheduling Calendar

-   **FR-POST-001:** Display a calendar with the approved weekly/monthly
    views.
-   **FR-POST-002:** Show the configured timezone and use it
    consistently for scheduled times.
-   **FR-POST-003:** Provide filters and an Add New Post action where
    approved.
-   **FR-POST-004:** Support only post types and channels that are
    technically available and authorized.
-   **FR-POST-005:** Allow the user to review destination, content,
    media, and scheduled time before saving.
-   **FR-POST-006:** Validate required media/text and channel-specific
    restrictions before scheduling.
-   **FR-POST-007:** Holiday lists and AI post ideas are optional; their
    data source and generation cost must be verified.
-   **FR-POST-008:** Display a clear scheduled, published, failed, or
    draft state as appropriate.

### 7.2 Post History

-   **FR-POST-020:** Show previous and scheduled posts in separate views
    where supported.
-   **FR-POST-021:** Support channel/date filters and search if included
    in the approved design.
-   **FR-POST-022:** Show post type, title/description, creation time,
    timezone, and status when available.
-   **FR-POST-023:** Export the filtered history to CSV if the export
    control is enabled.
-   **FR-POST-024:** A post's displayed status MUST reflect the recorded
    publication result.

### 7.3 Social Media Analytics

-   **FR-POST-030:** Require an authorized connection before showing
    account-specific analytics.
-   **FR-POST-031:** Display a connection prompt and useful empty state
    when the account is not connected.
-   **FR-POST-032:** Identify the platform and reporting period for
    displayed metrics.
-   **FR-POST-033:** Display only metrics returned by the connected
    platform or clearly identified derived metrics.
-   **FR-POST-034:** Handle missing permissions, expired access, and
    provider errors without fabricating data.

### 7.4 Social Rules

-   **FR-POST-040:** Allow an authorized user to create a cross-platform
    publishing rule when the required destinations are supported.
-   **FR-POST-041:** Record source post type, destination platforms,
    creation time, and enabled/disabled state.
-   **FR-POST-042:** Validate incompatible destinations or content
    formats before saving.
-   **FR-POST-043:** Show rule history and provide an appropriate
    edit/disable/delete action if approved.
-   **FR-POST-044:** Prevent loops, repeated cross-posts, and duplicate
    publishing.
-   **FR-POST-045:** If no rules exist, show a useful empty state with a
    clear create action.

------------------------------------------------------------------------

## 8. Directories

### 8.1 Directory Status Matrix

-   **FR-DIR-001:** Show directory connection/status summaries for the
    selected set of listings.
-   **FR-DIR-002:** Show the denominator and definition behind
    completion percentages.
-   **FR-DIR-003:** Support search and export where included in the
    approved design.
-   **FR-DIR-004:** Use explicit statuses such as linked, processing,
    unlinked, unavailable, and error only when their definitions are
    documented.
-   **FR-DIR-005:** A status must reflect verified provider data or be
    labelled as locally recorded/unknown.

### 8.2 Directory Details

-   **FR-DIR-010:** Display supported directory rows and available
    fields, such as name, address, category, phone, map link, website,
    review count, and rating.
-   **FR-DIR-011:** Display a connection action only when the provider
    offers a supported, compliant connection workflow.
-   **FR-DIR-012:** Do not imply that all directories support automated
    creation, synchronization, or editing.
-   **FR-DIR-013:** Clearly distinguish unavailable, unsupported,
    disconnected, and failed states.

------------------------------------------------------------------------

## 9. Analytics --- Keyword Position

The observed navigation includes Ranking Dashboard, Traffic Analysis,
and Keyword Researcher.

### 9.1 Ranking Dashboard

-   **FR-KW-001:** Show the number of configured keywords and approved
    category/intent breakdowns.
-   **FR-KW-002:** Display average rank and visibility only after their
    formulas and source are defined.
-   **FR-KW-003:** Provide supported time-range filters, such as 1M, 6M,
    1Y, and All Time, if data retention allows.
-   **FR-KW-004:** Display rank-distribution buckets with a documented
    definition for each bucket.
-   **FR-KW-005:** Show tracked keyword, average rank, intent, search
    volume, rank change, and trend only when the data is available.
-   **FR-KW-006:** Provide Add/Edit Keywords, search, filters, and CSV
    export where approved.
-   **FR-KW-007:** Record the time and status of the last successful
    refresh.
-   **FR-KW-008:** A keyword's ranking must include the relevant listing
    and scan configuration.

### 9.2 Traffic Analysis

-   **FR-KW-020:** Show month-on-month metrics only where comparable
    historical data exists.
-   **FR-KW-021:** Show branded versus discovery traffic only if the
    source provides a defensible classification and metric definition.
-   **FR-KW-022:** Show intent breakdowns with a documented
    classification method.
-   **FR-KW-023:** Tables and charts must use compatible scopes and date
    ranges or clearly label differences.
-   **FR-KW-024:** Do not reconcile or combine totals from separate
    screens unless their definitions, filters, and data sources match.

### 9.3 Keyword Researcher

-   **FR-KW-030:** Allow the user to enter a seed keyword/category or
    website URL, according to the approved research mode.
-   **FR-KW-031:** Provide language and geographic filters only when
    supported by the data source.
-   **FR-KW-032:** Validate that at least one valid research input is
    provided.
-   **FR-KW-033:** Show research progress and clear results, no-results,
    quota, and error states.
-   **FR-KW-034:** Display keyword, intent, search volume, trend, and
    difficulty/index metrics only if the provider supplies or the
    product calculates them with a documented method.
-   **FR-KW-035:** The meaning of KI% must be defined before displaying
    or using it.

------------------------------------------------------------------------

## 10. Geo Grid Ranker

-   **FR-GEO-001:** Allow a user to select or enter a business identity
    and the supported scan coordinates/configuration.
-   **FR-GEO-002:** Allow one or more target keywords to be configured.
-   **FR-GEO-003:** Support adding/removing keyword rows and bulk entry
    where approved.
-   **FR-GEO-004:** Provide a run-rank-check action only when the scan
    method and data source are configured.
-   **FR-GEO-005:** Store scan date/time, business, keyword, scan
    location/grid point, returned rank or no-result state, and
    source/status.
-   **FR-GEO-006:** Display a clear distinction between exact match,
    similar result, not found, and scan failure if these states are
    supported by the data source.
-   **FR-GEO-007:** Export supported results to CSV.
-   **FR-GEO-008:** Do not present one rank observation as a complete
    geographic heatmap. A true grid scan requires multiple defined grid
    points and results for each point.
-   **FR-GEO-009:** If a scan is partial, show which points or keywords
    succeeded and which failed.

------------------------------------------------------------------------

## 11. Competitors

### 11.1 Competitors Summary

-   **FR-COMP-001:** Display configured competitors and supported
    comparison metrics.
-   **FR-COMP-002:** Show the selected user's business distinctly from
    competitor businesses.
-   **FR-COMP-003:** Metrics such as reviews, rating, categories,
    photos, products, services, and Q&A must show their source and
    availability.
-   **FR-COMP-004:** Share of Voice and completion scores must use
    documented formulas.
-   **FR-COMP-005:** Search and filters must update the result set.
-   **FR-COMP-006:** Do not infer missing competitor data as a negative
    score or zero without an explicit rule.

### 11.2 Ranking Comparison

-   **FR-COMP-020:** Provide a comparison table for configured
    competitors.
-   **FR-COMP-021:** Show average rank, rating, review count, completion
    score, and supported profile attributes.
-   **FR-COMP-022:** Provide search, filtering, pagination, and CSV
    export where approved.
-   **FR-COMP-023:** Show the measurement date or last-updated
    timestamp.

------------------------------------------------------------------------

## 12. Market Research

The observed navigation includes Market Research, Competitor Heatmap,
Competitor List, and Market Research Settings.

### 12.1 Market Research Dashboard

-   **FR-MKT-001:** Display the selected market/city and configured
    competitor scope.
-   **FR-MKT-002:** Show total reviews, average reviews, average rating,
    and Share of Voice only when data exists and calculations are
    documented.
-   **FR-MKT-003:** Provide city filtering and CSV export where
    approved.
-   **FR-MKT-004:** A generated AI summary must be labelled as generated
    content and must not be presented as a verified fact source.
-   **FR-MKT-005:** AI summaries are Conditional on a compliant no-cost
    model/runtime; otherwise provide non-AI summaries or defer the
    feature.
-   **FR-MKT-006:** Bubble size, axes, and colors in charts must have
    clear legends.
-   **FR-MKT-007:** City-wise tables must show the scope and reporting
    date.

### 12.2 Competitor Heatmap

-   **FR-MKT-020:** Display the configured cities and competitors in a
    matrix.
-   **FR-MKT-021:** Each cell must represent a documented metric, such
    as Share of Voice, for the displayed city and competitor.
-   **FR-MKT-022:** Color scales must include a legend or another
    accessible value cue.
-   **FR-MKT-023:** Support city search and CSV export where approved.
-   **FR-MKT-024:** Empty or unavailable cells must not be colored as if
    they represent zero.

### 12.3 Competitor List

-   **FR-MKT-030:** List configured competitor brands and relevant
    details, such as website and listing count, when available.
-   **FR-MKT-031:** Allow an authorized user to add, edit, enable, or
    disable a custom competitor.
-   **FR-MKT-032:** Distinguish the user's own brand from competitor
    brands.
-   **FR-MKT-033:** Disabling a competitor must not delete historical
    records unless the user explicitly confirms deletion.

### 12.4 Market Research Settings

-   **FR-MKT-040:** Allow authorized users to create and edit brand
    profiles used by market research.
-   **FR-MKT-041:** Validate required brand details and locations.
-   **FR-MKT-042:** Provide search and pagination where needed.
-   **FR-MKT-043:** A brand profile must not be treated as a verified
    external listing unless it has been matched to a supported provider
    record.

------------------------------------------------------------------------

## 13. Settings and Account Administration

### 13.1 Brand Details

-   **FR-SET-001:** Display account and brand information permitted for
    the current user.
-   **FR-SET-002:** Display Google account connection state and
    subscription information only when those states are real and
    available.
-   **FR-SET-003:** Provide refresh-account and add-brand actions only
    when their operations are implemented.
-   **FR-SET-004:** Display team members, social account connections,
    listings, and keyword counts from actual stored records.
-   **FR-SET-005:** AI-generated brand profiles/personas are Conditional
    on a compliant no-cost implementation.

### 13.2 Alert and Reports

-   **FR-SET-020:** Provide separate configuration areas for supported
    mail reports and event alerts.
-   **FR-SET-021:** Support the approved report types: Performance
    Analysis, Review Analysis, Profile Strength, Weekly Task, Average
    Rank Position, Google Ads, and Post Summary, subject to source
    availability.
-   **FR-SET-022:** Support the approved alert types: Negative Review,
    New Review, Edited/Deleted Review, Listing Status Change, Google
    Updates, and Detailed Comparison, subject to source availability.
-   **FR-SET-023:** Each configuration must identify the event/report
    type, scope, schedule/frequency, recipients, and delivery channel as
    applicable.
-   **FR-SET-024:** Alert History must display the actual recorded type,
    time, delivery configuration, listing scope, frequency, members, and
    available actions.
-   **FR-SET-025:** WhatsApp delivery is Conditional; do not promise it
    without a verified, compliant no-cost provider path.
-   **FR-SET-026:** Google Ads alerts are Conditional on access to the
    required account and data.
-   **FR-SET-027:** Users must be able to disable a configuration if
    that operation is approved and implemented.

### 13.3 User Profile and Session

-   **FR-SET-040:** Provide a profile/settings view for the
    authenticated user.
-   **FR-SET-041:** Logout must invalidate the local session and any
    relevant server session according to the authentication design.
-   **FR-SET-042:** Do not expose credentials, tokens, or sensitive
    provider data in the user interface.

### 13.4 Billing and Active Listings

The supplied navigation includes Billing, Billing History, and Active
Listings, but the Billing and Billing History screen details were not
provided.

-   **FR-BILL-001:** The product owner must decide whether billing
    screens are needed in a free product.
-   **FR-BILL-002:** If Active Listings is retained, display store code,
    listing name, address, and current status where available.
-   **FR-BILL-003:** Marking a listing inactive must require
    confirmation and must not delete the listing.
-   **FR-BILL-004:** Billing fields, history, and actions are **TBD**;
    do not invent a payment workflow.

------------------------------------------------------------------------

## 14. Release Notes --- Candidate Features Requiring Scope Approval

The supplied Rightchoice.ai release notes mention additional
capabilities. They are reference material, not automatic GMB LEGEND
commitments. Candidate items include:

-   AI Rank Tracking and prompt research
-   Search/AI citation tracking
-   AI tasks for on-page/off-page work
-   Google Ads reporting
-   Tasks and weekly recommendations
-   Calls and intent analysis
-   Weather data in performance reports
-   White-label dashboard/custom domains
-   Google Play Store integration
-   Team sharing for AI projects
-   Self content improvements
-   QR code templates/posters
-   Mobile app support
-   Additional directory integrations

Each candidate feature must have its own scope decision, data-source
assessment, privacy/security review, acceptance criteria, and zero-cost
feasibility review before being added to a release.

------------------------------------------------------------------------

## 15. Cross-Module Acceptance Criteria

A release candidate is functionally acceptable when:

1.  Every enabled navigation item opens the intended module.
2.  All visible controls have a defined, working action or are clearly
    disabled with an explanation.
3.  Search, filters, pagination, and exports behave according to the
    selected screen.
4.  Loading, empty, permission, stale-data, and error states are handled
    consistently.
5.  External connections are based on real authorization and provider
    responses.
6.  Data values have a documented source and definition.
7.  No success message is shown before the operation succeeds.
8.  No paid dependency is mandatory unless the product owner formally
    changes the zero-cost requirement.
9.  Account data is protected by server-side authorization and
    isolation.
10. Every external integration has a failure path and an observable
    status.
11. Test data is clearly identified and cannot be confused with
    production data.
12. Each module passes the module-specific acceptance checks in this
    document.

------------------------------------------------------------------------

## 16. Open Questions and Required Decisions

Before implementation, confirm:

1.  Which modules belong in the first release?
2.  What authentication method and account/tenant model will be used?
3.  Which Google Business Profile capabilities are available and
    approved for the intended implementation?
4.  Which listing, review, directory, social, keyword, and rank data
    sources are allowed and feasible at zero cost?
5.  What are the approved definitions for Average Rank, Visibility
    Score, Share of Voice, Completion Score, branded/discovery traffic,
    and KI%?
6.  What are the exact fields for Add New Business, Add Products, Add
    Inventory, and Add Services?
7.  What is the intended behavior of FAQ and Deleted Reviews?
8.  Which social platforms are required at launch?
9.  What are the scheduling, retry, and duplicate-prevention rules for
    publishing?
10. What does a "grid" mean in Geo Grid Ranker: number of points,
    spacing, radius, and coordinate selection?
11. What are the exact fields and actions for Billing and Billing
    History, or should they be omitted?
12. Which reports and alerts are mandatory, and what delivery channels
    are acceptable?
13. Are AI features required for the first release if no reliable
    no-cost model is available?
14. What data retention, deletion, backup, and export rules are
    required?
15. What listing/user/keyword/scan limits can the free infrastructure
    sustain?

------------------------------------------------------------------------

## 17. Traceability

Each approved FRD requirement should map to: - A PRD feature or user
outcome - A business requirement or rule in `BRD.md` - A design/screen
in `DESIGN.md` - An API or integration contract in `API_SPEC.md`, if
applicable - A data entity or constraint in `DATABASE.md`, if
applicable - One or more implementation tasks in `TASKS.md` - A test
case in `TEST_PLAN.md`

**End of FRD --- GMB LEGEND**
