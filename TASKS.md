# GMB LEGEND --- Implementation Tasks

**Document status:** Draft v1.0\
**Last updated:** 11 October 2026\
**Related documents:** `PRD.md`, `BRD.md`, `FRD.md`, `DESIGN.md`,
`ENGINEERING.md`, `DATABASE.md`, `API_SPEC.md`

## 1. Purpose

This document converts the current GMB LEGEND documentation into an
actionable implementation backlog. It defines phases, tasks,
dependencies, and acceptance criteria.

**Planning rule:** Complete feasibility and scope decisions before
building integrations. The zero-cost requirement is a delivery
constraint; no feature should be committed to production until its
hosting, data source, API permissions, quotas, and ongoing operational
requirements have been validated.

## Official Delivery Roadmap — 12 Phases

This is the approved project delivery sequence. Phase numbers in this
roadmap are authoritative. Existing task IDs and acceptance criteria
remain in force; task group headings below are organizational groupings,
not a competing phase plan. Before a phase starts, its task mapping and
acceptance criteria must be reviewed and any missing tasks added.

1. **Phase 0 — Discovery and project setup:** inspect the repository,
   reconcile specifications, confirm the local architecture, and record
   open decisions. Tasks: T-001 through T-006.
2. **Phase 1 — Website frontend:** build the public website using the
   approved design system and verified stack. Map existing UI foundation
   tasks where applicable; identify and add missing website tasks before
   implementation.
3. **Phase 2 — Dashboard and module UI:** implement navigation,
   responsive dashboard layouts, tables, forms, empty states, and module
   screens. Map T-011 and T-012; add missing screen-specific tasks.
4. **Phase 3 — Database and backend foundation:** implement persistence,
   migrations, server-side validation, tenant boundaries, and
   background-job foundations. Map T-013 and T-016 and relevant job tasks.
5. **Phase 4 — Authentication and security:** implement sign-in, sessions,
   organization roles, authorization, and security controls. Map T-014,
   T-015, and T-061.
6. **Phase 5 — Frontend–backend integration:** connect real APIs, loading
   and error states, mutations, pagination, filters, and exports. Map
   applicable provider, API, and export tasks; add missing integration tasks.
7. **Phase 6 — Core local SEO:** implement directories, keyword tracking,
   ranking dashboards, traffic analysis, keyword research, and geo-grid
   workflows. Map T-020 through T-034 where applicable.
8. **Phase 7 — Competitor intelligence:** implement competitor summaries,
   ranking comparisons, market research, and heatmaps. Map T-035 and T-036.
9. **Phase 8 — Operations, billing and reporting:** implement plan
   entitlements, billing interfaces, usage accounting, alerts, reports,
   and delivery history. Map T-050 through T-053 and add any missing
   entitlement and billing tasks. No paid service may be mandatory.
10. **Phase 9 — Advanced modules and integrations:** add approved AI
    capabilities and verified third-party integrations. Map applicable
    provider, review, content, and social tasks, including T-023 and
    T-040 through T-045.
11. **Phase 10 — Testing and QA:** run unit, integration, end-to-end,
    security, accessibility, and regression checks. Map T-060 through
    T-062 and T-065; testing also begins in every earlier phase.
12. **Phase 11 — Deployment and production readiness:** verify production
    configuration, migrations, monitoring, backups, privacy, deployment,
    and rollback. Map T-063 and T-064. Production deployment is deferred;
    local development and testing come first.

### Project-wide constraints

- Build and verify locally before planning or executing online deployment.
- Support multiple organizations with server-enforced tenant isolation.
- Require no paid production dependency for the core product. Defer
  features that cannot meet this constraint compliantly.
- Do not fabricate metrics or report unavailable integrations as successful.
- Keep the eight existing specification documents as the source of truth.
- Review changes and run applicable checks before each phase is committed
  and pushed to GitHub.

## 2. Task Conventions

-   **Priority P0:** Blocking foundation or decision required before
    implementation.
-   **Priority P1:** Required for the approved MVP.
-   **Priority P2:** Follow-up capability after MVP approval.
-   **Status:** All tasks begin as `Not Started`.
-   **Estimate:** Not assigned yet; estimate only after scope, provider
    access, and team capacity are known.
-   **Owner:** Product, design, frontend, backend, or QA responsibility;
    assign named owners separately.
-   **Dependency:** A task that must be completed or resolved first.

Do not treat this backlog as confirmation that every reference-product
module belongs in the first release.

## 3. Task Group --- Product Scope and Feasibility

### T-001 --- Approve MVP scope

-   **Priority:** P0
-   **Owner:** Product
-   **Dependencies:** None
-   **Status:** Not Started
-   **Work:** Identify the modules required for the first usable
    release; classify all other modules as later, conditional, or
    excluded.
-   **Acceptance criteria:**
    -   An approved MVP module list exists.
    -   Each module has a business goal and target user.
    -   Features that depend on unavailable providers are marked
        conditional or deferred.

### T-002 --- Confirm account and tenant model

-   **Priority:** P0
-   **Owner:** Product + Engineering
-   **Dependencies:** T-001
-   **Status:** Not Started
-   **Work:** Decide whether launch supports one organization or
    multiple workspaces with isolated data.
-   **Acceptance criteria:**
    -   Workspace/account model is documented.
    -   User roles and permission boundaries are approved.
    -   Cross-workspace data access requirements are defined.

### T-003 --- Validate zero-cost production architecture

-   **Priority:** P0
-   **Owner:** Engineering
-   **Dependencies:** T-001
-   **Work:** Verify candidate hosting, database, persistent storage,
    scheduling, backups, bandwidth, and commercial-use terms.
-   **Acceptance criteria:**
    -   Each production dependency has documented terms and limits.
    -   Recurring costs and free-tier quotas are recorded.
    -   No mandatory production dependency relies only on a temporary
        trial.
    -   A fallback or scope-reduction decision exists for each blocked
        dependency.

### T-004 --- Validate external providers and data sources

-   **Priority:** P0
-   **Owner:** Engineering + Product
-   **Dependencies:** T-001
-   **Work:** Review access, approvals, permissions, data fields,
    quotas, retention, costs, and terms for Google Business Profile,
    directories, social platforms, ranking/search-volume sources, email,
    and AI.
-   **Acceptance criteria:**
    -   Each proposed integration is marked Approved, Conditional,
        Blocked, or Deferred.
    -   Required credentials/approvals are identified.
    -   Unsupported operations are removed from MVP scope.
    -   No provider is treated as free without verification.

### T-005 --- Define metric formulas and data provenance

-   **Priority:** P0
-   **Owner:** Product + Analytics/Engineering
-   **Dependencies:** T-004
-   **Work:** Define the source, formula, scope, units, and refresh
    behavior for average rank, visibility, Share of Voice, completion
    score, intent, search volume, and other metrics used in the MVP.
-   **Acceptance criteria:**
    -   Every displayed metric has an approved definition.
    -   Missing and unavailable data behavior is specified.
    -   Conflicting totals from different scopes are not combined
        without justification.

### T-006 --- Approve retention and deletion policy

-   **Priority:** P0
-   **Owner:** Product + Engineering
-   **Dependencies:** T-002, T-004
-   **Work:** Define retention for provider credentials, reviews, rank
    observations, reports, job logs, and exports.
-   **Acceptance criteria:**
    -   Retention/deletion rules are documented for each data class.
    -   Provider terms are reflected in the rules.
    -   Workspace deletion and connection revocation behavior are
        specified.

## 4. Task Group --- Application Foundation

### T-010 --- Initialize application repository

-   **Priority:** P0
-   **Owner:** Engineering
-   **Dependencies:** T-003
-   **Work:** Create the application structure using the approved stack,
    package manager, formatting, linting, and environment configuration.
-   **Acceptance criteria:**
    -   The application starts locally from documented instructions.
    -   Environment variables are documented with example placeholders.
    -   No real secrets are committed.
    -   Lint/type-check commands run successfully.

### T-011 --- Implement design tokens and shared UI shell

-   **Priority:** P1
-   **Owner:** Design + Frontend
-   **Dependencies:** T-001, T-010
-   **Work:** Implement the light futuristic theme from `DESIGN.md`,
    including palette, typography, spacing, buttons, inputs, cards,
    tables, status badges, and responsive layout.
-   **Acceptance criteria:**
    -   Default theme uses light surfaces and restrained indigo/cyan
        accents.
    -   Shared components are reusable.
    -   Focus states and keyboard interaction are visible.
    -   Common mobile, tablet, and desktop layouts are tested.

### T-012 --- Implement navigation and page scaffolds

-   **Priority:** P1
-   **Owner:** Frontend
-   **Dependencies:** T-011
-   **Work:** Build the sidebar, header, breadcrumbs/page titles, and
    empty page scaffolds for approved MVP modules.
-   **Acceptance criteria:**
    -   Navigation matches the approved MVP.
    -   No active navigation item leads to a dead page.
    -   Loading, empty, disconnected, and error states have shared
        patterns.

### T-013 --- Configure database and migrations

-   **Priority:** P0
-   **Owner:** Backend
-   **Dependencies:** T-003, T-010, T-002
-   **Work:** Configure the selected database, migration workflow,
    development seed data, and database access layer.
-   **Acceptance criteria:**
    -   A clean environment can create the schema using migrations.
    -   Test data is clearly distinguishable from production data.
    -   Migration and rollback guidance is documented.

### T-014 --- Implement authentication and sessions

-   **Priority:** P0
-   **Owner:** Backend + Frontend
-   **Dependencies:** T-002, T-010
-   **Work:** Implement the approved authentication method, session
    handling, login/logout flows, and protected routes.
-   **Acceptance criteria:**
    -   Unauthenticated users cannot access protected resources.
    -   Logout invalidates the relevant session.
    -   Secrets are never exposed to the browser.
    -   Authentication behavior is covered by automated tests.

### T-015 --- Implement workspace authorization

-   **Priority:** P0
-   **Owner:** Backend
-   **Dependencies:** T-013, T-014
-   **Work:** Enforce workspace membership, roles, and resource
    ownership on server-side reads and writes.
-   **Acceptance criteria:**
    -   Every tenant-scoped endpoint verifies authorization.
    -   Cross-workspace access tests fail safely.
    -   Role permissions match the approved access matrix.

### T-016 --- Add logging and standard error handling

-   **Priority:** P1
-   **Owner:** Backend
-   **Dependencies:** T-010
-   **Work:** Add structured logs, request IDs, safe error responses,
    and consistent handling for validation, permission, and provider
    failures.
-   **Acceptance criteria:**
    -   Errors have stable codes and safe messages.
    -   Tokens and secrets are redacted.
    -   Relevant requests/jobs can be traced without exposing sensitive
        content.

## 5. Task Group --- Core Business Data

### T-020 --- Implement brand management

-   **Priority:** P1
-   **Owner:** Full-stack
-   **Dependencies:** T-013, T-015
-   **Work:** Implement brand list, create, detail, edit, validation,
    and archive/delete behavior according to the approved policy.
-   **Acceptance criteria:**
    -   Authorized users can manage permitted brands.
    -   Invalid fields show useful messages.
    -   Brand data is workspace-scoped.

### T-021 --- Implement local listing management

-   **Priority:** P1
-   **Owner:** Full-stack
-   **Dependencies:** T-020
-   **Work:** Implement Add New Business, listing list/detail, edit,
    status, search, and approved filters.
-   **Acceptance criteria:**
    -   Required fields are validated.
    -   Listings are linked to the correct brand/workspace.
    -   Local record status is distinct from external connection status.
    -   Duplicate detection follows an approved rule.

### T-022 --- Implement provider connection framework

-   **Priority:** P0
-   **Owner:** Backend
-   **Dependencies:** T-004, T-014, T-015
-   **Work:** Create the common provider-adapter interface, connection
    status model, credential protection, sync status, and safe
    disconnect behavior.
-   **Acceptance criteria:**
    -   Provider-specific logic is isolated from business modules.
    -   Connection state reflects actual authorization.
    -   Credentials are protected and never returned by API endpoints.
    -   An unavailable provider does not break unrelated modules.

### T-023 --- Implement approved Google Business Profile connection

-   **Priority:** P1 if approved; otherwise Deferred
-   **Owner:** Backend
-   **Dependencies:** T-004, T-022
-   **Work:** Implement authorized account connection and listing
    retrieval only for operations approved by the provider.
-   **Acceptance criteria:**
    -   Required access/approval is in place.
    -   Only authorized listings are displayed.
    -   Revoked/expired permissions are handled.
    -   The UI never simulates a successful connection.

### T-024 --- Implement listing overview

-   **Priority:** P1
-   **Owner:** Full-stack
-   **Dependencies:** T-021, T-022
-   **Work:** Implement listing overview and performance panels using
    available, validated data.
-   **Acceptance criteria:**
    -   Reporting scope and last-updated time are shown.
    -   Missing data is not represented as zero.
    -   Disconnected and no-data states are clear.
    -   Metrics have approved definitions.

## 6. Task Group --- Keywords, Ranking, and Competitors

### T-030 --- Implement keyword configuration

-   **Priority:** P1
-   **Owner:** Full-stack
-   **Dependencies:** T-005, T-021
-   **Work:** Add, edit, deactivate, search, and categorize tracked
    keywords.
-   **Acceptance criteria:**
    -   Keyword ownership/scope is enforced.
    -   Duplicate behavior follows the approved normalization rule.
    -   Intent values use the approved taxonomy.

### T-031 --- Implement rank scan job framework

-   **Priority:** P0
-   **Owner:** Backend
-   **Dependencies:** T-003, T-013, T-016
-   **Work:** Implement queued job records, bounded retries, status
    polling, idempotency, and safe error handling.
-   **Acceptance criteria:**
    -   Jobs transition through valid states.
    -   Duplicate work is prevented where possible.
    -   Failed and partial results are represented accurately.
    -   Quotas and job frequency are enforced.

### T-032 --- Integrate approved ranking data source

-   **Priority:** P1 if approved; otherwise Deferred
-   **Owner:** Backend
-   **Dependencies:** T-004, T-005, T-030, T-031
-   **Work:** Connect an approved rank-data provider or implement an
    alternative that complies with the approved policy.
-   **Acceptance criteria:**
    -   Data source, methodology, quotas, and terms are documented.
    -   Rank observations include timestamp and scope.
    -   No-result and scan-failure states are distinct.
    -   If no compliant source exists, the feature is blocked or
        deferred.

### T-033 --- Implement Ranking Dashboard and Traffic Analysis

-   **Priority:** P1 if data is available
-   **Owner:** Full-stack
-   **Dependencies:** T-030, T-032
-   **Work:** Build ranking metrics, trends, intent tables, and traffic
    analysis using only validated data.
-   **Acceptance criteria:**
    -   Formulas and reporting periods are documented.
    -   Filters apply consistently.
    -   Metrics show last-updated/source information where appropriate.
    -   Empty and stale states are handled.

### T-034 --- Implement Geo Grid Ranker

-   **Priority:** P2 unless approved for MVP
-   **Owner:** Full-stack
-   **Dependencies:** T-031, T-032
-   **Work:** Configure scan points, keywords, scan execution, results,
    and CSV export.
-   **Acceptance criteria:**
    -   Each result is linked to a scan point and keyword.
    -   A geographic heatmap is shown only when multiple point results
        exist.
    -   Partial scans and failures are visible.
    -   Scan limits match the approved free operating model.

### T-035 --- Implement competitor configuration and comparison

-   **Priority:** P2 unless approved for MVP
-   **Owner:** Full-stack
-   **Dependencies:** T-005, T-021, T-032
-   **Work:** Add/edit/enable/disable competitors and show supported
    ranking/profile metrics.
-   **Acceptance criteria:**
    -   Own brand is clearly distinguished.
    -   Metrics use approved definitions and sources.
    -   Missing competitor data is not treated as zero.
    -   Comparison filters and export work as specified.

### T-036 --- Implement Market Research and Heatmap

-   **Priority:** P2 unless approved for MVP
-   **Owner:** Full-stack
-   **Dependencies:** T-035
-   **Work:** Build market/city filters, competitor heatmap, summary
    metrics, and exports.
-   **Acceptance criteria:**
    -   Each cell represents a documented metric.
    -   Color scale has a legend and accessible labels.
    -   City and competitor scope is explicit.
    -   AI summaries are omitted unless approved and feasible without a
        mandatory paid service.

## 7. Task Group --- Reviews, Content, and Social

### T-040 --- Implement review data model and list

-   **Priority:** P1 if review data access is approved
-   **Owner:** Full-stack
-   **Dependencies:** T-004, T-021, T-022
-   **Work:** Implement review retrieval, filters, status display, and
    history within provider retention rules.
-   **Acceptance criteria:**
    -   Data source and reporting scope are visible.
    -   Stored fields comply with provider rules.
    -   Disconnected and unavailable states are handled.

### T-041 --- Implement sentiment analysis

-   **Priority:** P2 / Conditional
-   **Owner:** Backend + Frontend
-   **Dependencies:** T-040, T-004
-   **Work:** Add sentiment labels and summary charts only after the
    analysis method and no-cost runtime are approved.
-   **Acceptance criteria:**
    -   Analysis method is recorded.
    -   Generated analysis is distinguishable from source review text.
    -   The feature is deferred if no compliant no-cost approach is
        available.

### T-042 --- Implement supported review replies

-   **Priority:** P2 / Conditional
-   **Owner:** Backend
-   **Dependencies:** T-040, T-004
-   **Work:** Support reply drafts and provider publication only where
    allowed.
-   **Acceptance criteria:**
    -   Draft and published states are distinct.
    -   Provider result and errors are recorded.
    -   Retries do not create duplicate replies.

### T-043 --- Implement Content Updates

-   **Priority:** P2 unless approved for MVP
-   **Owner:** Full-stack
-   **Dependencies:** T-004, T-021, T-022
-   **Work:** Implement approved product, inventory, and service update
    forms and history.
-   **Acceptance criteria:**
    -   Product, inventory, and service fields are separately specified.
    -   Bulk operations show per-item results.
    -   Unsupported external operations are not presented as available.

### T-044 --- Implement Post Scheduling and History

-   **Priority:** P2 unless approved for MVP
-   **Owner:** Full-stack
-   **Dependencies:** T-004, T-022, T-031
-   **Work:** Implement calendar, post forms, scheduling, history, and
    destination-specific status.
-   **Acceptance criteria:**
    -   Timezone behavior is consistent.
    -   Destination capabilities are validated before scheduling.
    -   Post statuses reflect provider results.
    -   Retry logic prevents duplicate publication.

### T-045 --- Implement Social Rules and Analytics

-   **Priority:** P2 / Conditional
-   **Owner:** Full-stack
-   **Dependencies:** T-044, T-004
-   **Work:** Implement cross-platform rules and account analytics only
    for supported providers.
-   **Acceptance criteria:**
    -   Rules cannot trigger loops or repeated publishing.
    -   Disconnected accounts show a clear prompt.
    -   Analytics are not fabricated when unavailable.

## 8. Task Group --- Alerts, Reports, and Operations

### T-050 --- Implement alert configuration and history

-   **Priority:** P2 unless approved for MVP
-   **Owner:** Full-stack
-   **Dependencies:** T-031, T-004
-   **Work:** Configure supported alert types, scope, schedule,
    recipients, delivery channel, and history.
-   **Acceptance criteria:**
    -   Only supported delivery channels can be enabled.
    -   Alert configuration and delivery status are distinct.
    -   Duplicate alerts are controlled.

### T-051 --- Implement report configuration and generation

-   **Priority:** P2 unless approved for MVP
-   **Owner:** Full-stack
-   **Dependencies:** T-031, T-024
-   **Work:** Configure approved report types, date ranges, schedules,
    and report runs.
-   **Acceptance criteria:**
    -   Each report identifies its scope and reporting period.
    -   Generation status is accurate.
    -   Delivery success is not claimed without confirmation.

### T-052 --- Implement export jobs

-   **Priority:** P1 for approved CSV exports
-   **Owner:** Backend + Frontend
-   **Dependencies:** T-013, T-015
-   **Work:** Generate authorized CSV exports with filters and secure
    download behavior.
-   **Acceptance criteria:**
    -   Export respects the same access rules and filters as the screen.
    -   Large exports use an asynchronous job where needed.
    -   Download links expire according to policy.
    -   Sensitive credentials are never included.

### T-053 --- Implement audit events

-   **Priority:** P1
-   **Owner:** Backend
-   **Dependencies:** T-015, T-016
-   **Work:** Record material user and system actions with non-sensitive
    metadata.
-   **Acceptance criteria:**
    -   Important actions have actor, target, timestamp, and outcome.
    -   Secrets and unnecessary personal data are excluded.
    -   Audit access is permission-controlled.

## 9. Task Group --- Quality, Security, and Launch

### T-060 --- Build automated test suite

-   **Priority:** P0
-   **Owner:** QA + Engineering
-   **Dependencies:** T-010, T-013, T-014
-   **Work:** Add unit, integration, API, and end-to-end tests for the
    approved MVP.
-   **Acceptance criteria:**
    -   Critical user journeys have automated coverage.
    -   Authorization and cross-tenant tests are included.
    -   Tests can run without paid production credentials.
    -   CI fails on relevant test, lint, or type errors.

### T-061 --- Perform security review

-   **Priority:** P0
-   **Owner:** Engineering
-   **Dependencies:** T-014, T-015, T-022
-   **Work:** Review authentication, authorization, secrets, file
    handling, input validation, rate limits, dependency vulnerabilities,
    and logging.
-   **Acceptance criteria:**
    -   No unresolved critical security issue remains at release.
    -   Secrets are absent from client bundles and logs.
    -   Cross-tenant access tests pass.

### T-062 --- Validate performance and capacity

-   **Priority:** P1
-   **Owner:** Engineering
-   **Dependencies:** T-003, T-031, T-060
-   **Work:** Test the expected free-tier capacity, query performance,
    background job throughput, and external quota behavior.
-   **Acceptance criteria:**
    -   Limits for users, listings, keywords, scans, and exports are
        documented.
    -   The app degrades gracefully when quotas are reached.
    -   No unbounded job or retry loop exists.

### T-063 --- Verify backup and restore

-   **Priority:** P0 for production with persistent user data
-   **Owner:** Engineering
-   **Dependencies:** T-003, T-013
-   **Work:** Configure and test backups and restore procedures that fit
    the selected hosting model and cost constraint.
-   **Acceptance criteria:**
    -   Backup frequency and retention are documented.
    -   A restore test succeeds.
    -   Any limits of the free infrastructure are disclosed.

### T-064 --- Prepare deployment and rollback

-   **Priority:** P1
-   **Owner:** Engineering
-   **Dependencies:** T-010, T-013, T-060, T-061
-   **Work:** Document environment variables, migration/deploy steps,
    health checks, rollback, and incident response.
-   **Acceptance criteria:**
    -   Deployment can be repeated from documentation.
    -   Production secrets are configured securely.
    -   Rollback and database migration recovery steps are documented.

### T-065 --- Run business acceptance testing

-   **Priority:** P0
-   **Owner:** Product + QA
-   **Dependencies:** All approved MVP tasks
-   **Work:** Validate the product against `BRD.md`, `FRD.md`, and
    `DESIGN.md`.
-   **Acceptance criteria:**
    -   Product owner signs off on critical workflows.
    -   Unsupported/conditional features are clearly disabled or
        labelled.
    -   No mandatory dependency violates the zero-cost constraint.
    -   Release blockers are resolved or formally accepted.

## 10. Recommended MVP Gate

Before the team estimates or starts implementation, approve:

-   [ ] MVP modules and excluded modules
-   [ ] Account/tenant model and role matrix
-   [ ] Production hosting/database/scheduler feasibility
-   [ ] Approved provider and data-source list
-   [ ] Metric formulas and data freshness requirements
-   [ ] Data retention and deletion policy
-   [ ] First-release capacity limits
-   [ ] Acceptance criteria and release-blocker definition

## 11. Suggested First Implementation Order

This is a dependency-based proposal, not a promise of dates:

1.  T-001 through T-006: scope and feasibility
2.  T-010, T-013, T-014, T-015, T-016: application and security
    foundation
3.  T-011 and T-012: design system and navigation
4.  T-020, T-021, T-022: brands, listings, provider framework
5.  T-024 and T-052: useful overview and export capability using
    validated data
6.  T-030, T-031, and T-032 only if a compliant ranking source is
    approved
7.  Add other modules in order of business priority and verified
    feasibility
8.  T-060 through T-065: testing, security, operations, and acceptance

## 12. Task Tracking Template

Use this format when moving tasks into a project tracker:

  ------------------------------------------------------------------------------------------------------
  ID       Task             Priority   Owner         Status    Dependency   Estimate   Notes
  -------- ---------------- ---------- ------------- --------- ------------ ---------- -----------------
  T-001    Approve MVP      P0         Product       Not       None         TBD        Required before
           scope                                     Started                           feature
                                                                                       commitments

  T-003    Validate         P0         Engineering   Not       T-001        TBD        Confirm
           zero-cost                                 Started                           production, not
           architecture                                                                just local
                                                                                       development

  T-014    Implement        P0         Backend +     Not       T-002, T-010 TBD        Must be
           authentication              Frontend      Started                           server-enforced

  T-021    Implement local  P1         Full-stack    Not       T-020        TBD        External
           listing                                   Started                           connection is
           management                                                                  separate

  T-031    Implement rank   P0         Backend       Not       T-013, T-016 TBD        Provider
           scan job                                  Started                           integration is a
           framework                                                                   separate task

  T-065    Run business     P0         Product + QA  Not       Approved MVP TBD        Required release
           acceptance                                Started   tasks                   gate
           testing
  ------------------------------------------------------------------------------------------------------

## 13. Definition of Done

A task is complete only when:

-   Acceptance criteria pass.
-   Code is reviewed and follows project conventions.
-   Relevant automated tests pass.
-   Authorization and error states are implemented.
-   Documentation is updated where behavior or contracts changed.
-   No secrets are committed or exposed.
-   Data source, cost, and provider constraints are respected.
-   UI states are consistent with `DESIGN.md`.
-   The feature does not claim unsupported provider success.
-   The product owner accepts the outcome where business acceptance is
    required.

**End of TASKS --- GMB LEGEND**
