# GMB LEGEND --- Engineering Specification

**Document status:** Draft v1.0\

**Last updated:** 11 October 2026\

**Related documents:** `PRD.md`, `BRD.md`, `FRD.md`, `DESIGN.md`

## 1. Purpose

This document proposes the technical architecture, engineering

standards, integration strategy, and deployment constraints for GMB

LEGEND.

The product must follow the approved zero-cost requirement: **no paid

service may be mandatory for the agreed core scope**. This is a

constraint to validate, not a claim that production operation can always

be free. Hosting, domains, data providers, AI inference, email, storage,

and operational work can incur costs even when the software itself is

open source.

Architecture decisions in this draft are proposals and must be validated

before implementation.

## 2. Engineering Principles

1.  **Zero-cost feasibility first:** Validate provider terms, free-tier

    limits, and operational requirements before committing to a feature.

2.  **Modular architecture:** Keep business logic separate from external

    integrations.

3.  **Secure by default:** Enforce authorization on the server, protect

    secrets, and minimize stored personal data.

4.  **Truthful data:** Preserve source, timestamp, scope, and failure

    states for external data.

5.  **Graceful degradation:** An unavailable integration should not

    break unrelated modules.

6.  **Observable jobs:** Background tasks must have status, retries, and

    failure details.

7.  **Incremental delivery:** Ship a coherent MVP before implementing

    all reference-product capabilities.

8.  **No hidden dependencies:** Document every service, package,

    external API, and operational requirement.

9.  **Maintainability:** Use typed contracts, automated tests, linting,

    and consistent code review.

10. **Provider compliance:** Do not bypass authentication, API quotas,

    access restrictions, or provider terms.

## 3. Proposed Technology Stack

The following is a candidate stack, not a final commitment.

  -----------------------------------------------------------------------

  Layer                   Candidate               Rationale / validation

                                                  required

  ----------------------- ----------------------- -----------------------

  Web application         Next.js with TypeScript Component-based UI and

                                                  server routes; verify

                                                  current version/runtime

                                                  support

  UI styling              Tailwind CSS            Consistent design

                                                  tokens and responsive

                                                  layout

  UI components           Accessible component    Reusable forms, menus,

                          library such as         dialogs, and tables

                          shadcn/ui

  Validation              Zod or equivalent       Shared schema

                                                  validation at

                                                  boundaries

  Database                PostgreSQL              Relational data,

                                                  transactions, and

                                                  constraints

  Database access         A typed ORM or query    Migrations and safe,

                          layer                   maintainable queries

  Authentication          Established             Must support secure

                          authentication          sessions and the

                          library/provider        zero-cost deployment

                                                  plan

  Background jobs         Database-backed job     Avoid assuming a paid

                          queue or a compliant    queue is available

                          scheduler

  Charts                  A maintained React      Accessible, responsive

                          chart library           charts

  Testing                 Unit, integration, and  Verify critical

                          browser tests           workflows

  Hosting                 Self-hosted or verified Confirm persistent

                          free-tier platform      database, scheduled

                                                  jobs, bandwidth, and

                                                  commercial-use terms

  File/object storage     Local storage for       Production persistence

                          development; approved   and quota must be

                          storage for production  validated

  Monitoring              Structured application  Hosted monitoring is

                          logs and health checks  optional if paid;

                                                  minimum observability

                                                  remains required

  -----------------------------------------------------------------------

**Decision rule:** Do not select a technology only because it has a free

development tier. Confirm production limits, data persistence,

background job support, commercial-use terms, and migration options.

## 4. Proposed Architecture

Use a modular monolith for the initial release unless scale or

deployment requirements justify splitting services. A modular monolith

is easier to develop and operate within a constrained budget.

### 4.1 Logical layers

1.  **Presentation layer:** Pages, components, forms, charts,

    navigation, and client interactions.

2.  **Application layer:** Use cases, authorization checks, validation,

    orchestration, and transaction boundaries.

3.  **Domain layer:** Business rules for brands, listings, reviews,

    keywords, competitors, posts, alerts, and reports.

4.  **Integration layer:** Adapters for Google and other approved

    providers.

5.  **Persistence layer:** Database queries, migrations, and

    transactional writes.

6.  **Job layer:** Scheduled syncs, ranking scans, report generation,

    and publication attempts where supported.

### 4.2 Architectural flow

``` text

Browser

  |

  v

Next.js UI / Server Routes

  |

  v

Authentication + Authorization + Validation

  |

  v

Application Services

  |---------------------|

  v                     v

Domain Modules       Integration Adapters

  |                     |

  v                     v

PostgreSQL          Approved External APIs

  ^

  |

Background Jobs / Scheduler

```

### 4.3 Module boundaries

Suggested domain modules:

-   Identity and workspace

-   Brands and listings

-   Provider connections

-   Overview and analytics

-   Reviews and sentiment

-   Content updates

-   Post scheduling and social rules

-   Directories

-   Keywords and rank observations

-   Geo Grid scans

-   Competitors and market research

-   Alerts and reports

-   Audit events

-   Export jobs

Each module should expose defined services and data contracts. Avoid

circular dependencies and direct database access from UI components.

## 5. Multi-Tenancy and Authorization

If GMB LEGEND serves multiple organizations, treat it as a multi-tenant

application from the start.

-   Every tenant-owned record must include a workspace/account scope or

    be linked through a parent record that provides the scope.

-   Every read and write must enforce that scope on the server.

-   Never trust a tenant or user ID supplied by the browser without

    checking the authenticated session and authorization.

-   Add database constraints and indexes that support tenant-safe

    queries.

-   Test cross-tenant access denial for all major entity types.

-   Use explicit roles and permissions; the exact role model is **TBD**.

-   Keep provider credentials scoped to the account that authorized

    them.

-   Revoking a connection must invalidate or delete stored credentials

    safely.

-   Do not log secrets, tokens, full authorization headers, or

    unnecessary personal information.

## 6. Security Requirements

### 6.1 Authentication and sessions

-   Use a maintained authentication implementation.

-   Store passwords only using a modern password-hashing approach if

    password authentication is selected.

-   Prefer secure, HTTP-only, same-site cookies for browser sessions

    where appropriate.

-   Apply CSRF protections where required by the chosen session and

    request architecture.

-   Rate-limit sensitive endpoints such as login, connection initiation,

    and expensive scan actions.

### 6.2 Input and output safety

-   Validate all external and user-supplied input on the server.

-   Use parameterized database queries or a safe ORM.

-   Escape or sanitize untrusted content before rendering.

-   Protect against cross-site scripting, SQL injection, request

    forgery, and server-side request forgery.

-   For URL fetch features, restrict protocols and destinations, block

    private/internal network ranges, and set response-size and timeout

    limits.

-   Treat external API content as untrusted data, not instructions.

### 6.3 Secrets and provider tokens

-   Keep secrets in environment variables or a suitable secret manager.

-   Never commit `.env` files containing real secrets.

-   Never expose provider credentials in client bundles or API

    responses.

-   Encrypt stored provider tokens at rest when they must be persisted,

    and restrict access to the encryption key.

-   Provide token refresh, expiry, and revocation handling where

    applicable.

-   Redact sensitive values from logs and errors.

### 6.4 Data lifecycle

-   Define retention and deletion policies before production.

-   Support account-data export/deletion where required by product

    policy.

-   Use least-privilege database credentials.

-   Establish a backup and restore procedure for any persistent

    production data.

-   Do not store review or third-party content longer than permitted by

    the provider's terms.

## 7. External Integrations

Every integration must use an adapter boundary so provider-specific

behavior does not leak into the rest of the application.

Each adapter must document:

-   Provider and API/product

-   Authentication and required permissions

-   Allowed use and applicable terms

-   Data fields and refresh behavior

-   Rate limits and quotas

-   Failure codes and retry policy

-   Data retention requirements

-   Cost and free-tier limits

-   Test strategy and sandbox availability

### 7.1 Google Business Profile

**Conditional.** Before implementation, confirm the current API

eligibility, approval process, scopes, supported operations, quotas, and

terms. Use an authorized OAuth flow. Do not scrape restricted interfaces

or simulate successful operations.

### 7.2 Directories and social platforms

**Conditional per provider.** Some platforms may not allow automated

listing creation, data retrieval, or publishing for the desired use

case. Implement only supported operations and display unsupported

actions clearly.

### 7.3 Keyword volume and rank data

Search-volume and rank data may require licensed providers, paid APIs,

or methods that are not suitable for production. Before implementation,

identify a permitted data source and define the measurement methodology.

If no acceptable zero-cost source exists, defer the metric or clearly

label a limited alternative.

### 7.4 AI features

AI summaries, generated content, brand personas, and AI rank tracking

require a model or inference path. Verify model licensing, hardware

requirements, commercial use, privacy, and ongoing compute cost. Do not

make a paid AI endpoint mandatory under the current business constraint.

### 7.5 Email, WhatsApp, and notifications

Verify provider costs, message limits, recipient consent, and delivery

rules. Keep delivery behind an interface so an unavailable channel can

be disabled without breaking report generation. Do not promise free

WhatsApp or email delivery until verified.

## 8. Background Jobs and Scheduling

Use background jobs for work that is long-running, rate-limited, or

scheduled.

Potential jobs include:

-   Listing synchronization

-   Keyword/rank scans

-   Geo Grid scans

-   Report generation

-   Alert evaluation

-   Scheduled post publication

-   Provider data refresh

-   Export generation

Requirements:

1.  Each job must have an ID, type, scope, creation time, status,

    attempt count, and outcome.

2.  Job states should include queued, running, succeeded, failed, and

    cancelled where cancellation is supported.

3.  Retries must be bounded and use backoff for transient failures.

4.  Permanent errors must not be retried indefinitely.

5.  Jobs must be idempotent where possible.

6.  Duplicate scheduling and duplicate publishing must be prevented.

7.  Rate limits must be respected per provider and account.

8.  Job history must be available to authorized users or operators where

    relevant.

9.  A job must not be reported as successful until the operation has

    actually succeeded.

10. The scheduler and queue must fit the approved no-cost operating

    model; if not, reduce frequency or defer the feature.

## 9. Data and API Design Standards

-   Use explicit request/response schemas.

-   Validate at API boundaries.

-   Return consistent error objects with a stable error code and safe

    user-facing message.

-   Use appropriate HTTP status codes.

-   Apply pagination to potentially large collections.

-   Support filtering and sorting through explicit, validated

    parameters.

-   Add request IDs or correlation IDs for troubleshooting.

-   Avoid returning fields that the caller is not authorized to see.

-   Use transactions for multi-step changes that must succeed or fail

    together.

-   Version public API contracts if external clients depend on them.

-   Document rate limits for expensive operations.

Detailed schemas belong in `DATABASE.md`; endpoint contracts belong in

`API_SPEC.md`.

## 10. Observability and Operational Readiness

At minimum, provide:

-   Structured logs with timestamp, severity, request/job ID, and module

-   Health endpoint for application availability

-   Database connectivity checks

-   Integration status and last-successful-sync timestamps

-   Job success/failure counts and retry visibility

-   Safe error reporting with secrets redacted

-   Basic resource and quota monitoring where the host exposes it

A paid monitoring service is not required if the zero-cost constraint

prohibits it, but lack of paid monitoring must not mean lack of error

visibility.

## 11. Performance and Reliability Targets

Numeric service-level targets are **TBD** and should be set after

expected workload and hosting are known. Initial engineering

expectations:

-   Avoid unnecessary blocking work in user-facing requests.

-   Paginate large tables and load heavy charts only when needed.

-   Index common filters and tenant-scoped query paths.

-   Use bounded timeouts for external requests.

-   Handle provider outages without taking down unrelated modules.

-   Cache only where data freshness and provider terms allow.

-   Show progress for long-running scans and bulk operations.

-   Do not promise real-time updates unless the provider and

    architecture support them.

## 12. Testing Strategy

### Unit tests

Test domain calculations, validation, permissions, status transitions,

and utility functions.

### Integration tests

Test database operations, migrations, provider adapters with mocked

responses, job execution, and export generation.

### End-to-end tests

Test key user journeys: - Sign in and create/select a brand -

Add/connect a listing - Configure a keyword - Run a supported rank

scan - Review scan results and export them - Configure an alert/report -

Schedule a post where a provider supports it - Verify unauthorized

access is denied

### Security tests

Test cross-tenant isolation, permission boundaries, unsafe input, token

leakage, and rate limits.

### Data correctness tests

Verify metric formulas, timezones, missing-data behavior, partial

failures, and export/filter consistency.

Use provider sandboxes or mocks where available. Never require real

production credentials for the default test suite.

## 13. Deployment and Environment Strategy

Recommended environments:

-   **Local:** Developer machine with non-production data and test

    credentials.

-   **Test/Staging:** Isolated environment for integration and

    acceptance tests, if available within the cost limit.

-   **Production:** Only after the chosen host, database persistence,

    backups, access controls, and operating costs are verified.

Requirements:

-   Keep configuration environment-specific.

-   Use repeatable database migrations.

-   Do not store persistent production data on ephemeral filesystems.

-   Document deployment, rollback, backup, and restore procedures.

-   Pin or lock dependency versions.

-   Scan dependencies and apply security updates.

-   Use HTTPS for production.

-   Restrict production access and rotate exposed credentials.

-   Document the recurring cost and quota profile before release.

## 14. Zero-Cost Feasibility Checklist

For every production dependency, answer:

-   Is it open source or available under acceptable no-cost terms?

-   Is commercial use permitted?

-   Does the free tier permit the expected production workload?

-   Are scheduled jobs supported?

-   Is data persistence included?

-   Are backups and restores possible?

-   Are API quotas adequate?

-   Are there limits on users, listings, requests, storage, bandwidth,

    or retention?

-   Is there a migration path if the free tier changes?

-   What functionality must be disabled if the quota is exhausted?

If a required answer is unknown, the dependency is **not yet approved**.

## 15. Proposed Delivery Sequence

### Phase 0 --- Feasibility

-   Confirm MVP modules and account model.

-   Validate integration access and terms.

-   Validate the no-cost hosting/database/scheduling approach.

-   Define metric formulas and data retention.

### Phase 1 --- Application foundation

-   Authentication and workspace isolation

-   Core layout and navigation

-   Database migrations and authorization

-   Logging, error states, and automated tests

### Phase 2 --- Core listing and reporting foundation

-   Brands and listing records

-   Provider connection status

-   Overview with real/verified data

-   CSV export and basic report infrastructure

### Phase 3 --- Analytics capabilities

-   Keyword configuration

-   Rank observations and Geo Grid workflows where data is available

-   Competitor and market-research calculations using validated sources

### Phase 4 --- Reputation and publishing

-   Review workflows supported by approved providers

-   Content update workflows

-   Post scheduling and social rules where supported

### Phase 5 --- Alerts, hardening, and launch

-   Alerts and report scheduling

-   Security and tenant-isolation tests

-   Capacity tests, backup/restore validation, documentation, and launch

    review

This sequence is a proposal; final ordering depends on confirmed

provider access and product-owner priorities.

## 16. Architecture Decision Log

  -----------------------------------------------------------------------

  Decision                Current proposal        Status

  ----------------------- ----------------------- -----------------------

  Application             Modular monolith        Proposed

  architecture

  Frontend                Next.js + TypeScript    Proposed

  Styling                 Tailwind CSS and        Proposed

                          accessible reusable

                          components

  Database                PostgreSQL              Proposed

  Background work         Database-backed jobs or TBD

                          verified scheduler

  Authentication          Maintained              TBD

                          implementation

                          compatible with

                          zero-cost constraints

  Hosting                 Self-hosted or verified TBD

                          free-tier platform

  AI inference            Optional unless a       TBD

                          reliable compliant

                          no-cost path is

                          verified

  External provider       Adapter-based, enabled  Required approach

  integrations            only after validation

  Multi-tenancy           Multiple organizations  Approved direction

                          with server-enforced

                          tenant isolation

  -----------------------------------------------------------------------

## 17. Open Engineering Decisions

1.  Is the existing development stack already fixed, or can the proposed

    stack be adjusted?

2.  What organization roles and membership permissions are required for the approved multi-organization model?

3.  Which hosting and database options meet the zero-cost requirement

    for production?

4.  Which integrations have approved credentials and documented access?

5.  What are the required job frequency and expected listing/keyword

    volumes?

6.  Which metrics can be calculated from validated data sources?

7.  What are the data retention and deletion requirements?

8.  What authentication and team-role model is required?

9.  Is AI required in the MVP, or can it be deferred?

10. What backup and recovery expectations are required for production?

**End of ENGINEERING --- GMB LEGEND**

## 18. Local-First Development and Deployment Boundary

- **Current delivery target:** local development and local testing on the

  developer's machine.

- **Production deployment:** explicitly deferred to official Phase 11.

  Production hosting, production database hosting, domains, and deployment

  services are not prerequisites for the early local phases.

- **Local stack:** choose and document the framework, database, migration

  workflow, authentication approach, and job mechanism after checking the

  existing specifications and local development constraints.

- **Zero-cost requirement:** do not make a paid service mandatory for the

  core product. Verify licensing and operational constraints; defer a

  feature if no compliant implementation satisfies the requirement.

- **Multi-organization support:** required product direction. Every

  organization-owned read and write must be authorized server-side.

  Client-supplied organization identifiers must never be trusted as proof

  of access. Add automated cross-organization isolation tests.

- **Decision status:** local-first development and multi-organization

  support are approved directions. Exact technology selections and

  production deployment choices remain open until validated at the

  appropriate phase.
