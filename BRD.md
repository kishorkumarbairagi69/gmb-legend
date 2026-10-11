# GMB LEGEND --- Business Requirements Document (BRD)

**Document status:** Draft v1.0\

**Product:** GMB LEGEND\

**Document owner:** Product Team\

**Last updated:** 11 October 2026\

**Related document:** `PRD.md`\

**Primary constraint:** The product must be buildable and usable without

mandatory paid services.

------------------------------------------------------------------------

## 1. Purpose

This Business Requirements Document defines the business need, target

users, operating context, business objectives, business rules, and

high-level outcomes for GMB LEGEND.

It is based on the product screenshots and published release notes

supplied by the product owner. The reference product is used to

understand workflows and feature categories; GMB LEGEND must have its

own implementation, branding, and technical design. Requirements that

are not yet confirmed are explicitly marked **TBD**.

## 2. Business Background

Businesses and agencies managing multiple locations often need to work

across several systems to maintain business listings, monitor customer

reviews, review local-search rankings, understand competitors, publish

updates, and report results.

GMB LEGEND is intended to centralize these workflows in one platform so

users can manage supported listings, review performance data, track

local visibility, compare competitors, and configure reports and alerts.

The reference material provided so far demonstrates interfaces for:

-   Listing and directory management

-   Analytics and keyword position tracking

-   Geo Grid Ranker

-   Competitor analysis and market research

-   Brand and team management

-   Post scheduling and post history

-   Social media analytics and cross-platform social rules

-   Alerts and reports

-   Pricing, billing history, active listings, and settings

-   AI Rank Tracker and AI visibility features described in published

    release notes

The exact first-release scope remains subject to product-owner approval.

## 3. Business Vision

Provide a centralized, accessible, and cost-conscious workspace that

helps businesses and agencies manage local visibility and make better

decisions from listing, review, ranking, and competitor data.

## 4. Business Objectives

### 4.1 Primary objectives

1.  **Centralize operations:** Reduce the need to switch between

    multiple tools for supported listing-management workflows.

2.  **Improve visibility:** Help users understand local ranking,

    keyword, and listing-performance trends.

3.  **Improve reputation management:** Make supported reviews and

    review-related alerts easier to monitor.

4.  **Improve publishing efficiency:** Support content creation and

    scheduling for supported channels.

5.  **Support multi-location operations:** Organize listings by account,

    brand, and location.

6.  **Enable competitor analysis:** Help users compare supported metrics

    across configured competitors and markets.

7.  **Improve reporting:** Make key results available in dashboards,

    history views, and exports.

8.  **Support collaboration:** Allow appropriately authorized team

    members to work in the same account.

9.  **Control operating costs:** Design the product around the mandatory

    zero-cost constraint without misrepresenting free-tier limitations.

### 4.2 Business success measures

Numeric targets are **TBD** and must be agreed before launch. The

product should be able to measure:

-   Number of users who complete onboarding

-   Number of brands and listings successfully configured

-   Percentage of eligible integrations connected successfully

-   Successful completion rate for key user workflows

-   Successful versus failed ranking scans

-   Successful versus failed post publications

-   Alert and report generation/delivery success rates

-   Time needed to complete common operational tasks

-   Use of competitor reports and CSV exports

-   Application reliability and error rates

-   Actual recurring operating cost, which must remain within the

    approved zero-cost operating model

## 5. Stakeholders

  -----------------------------------------------------------------------

  Stakeholder             Business interest       Main decisions or

                                                  responsibilities

  ----------------------- ----------------------- -----------------------

  Product owner           Product value, scope,   Approves scope,

                          and priorities          requirements, and

                                                  changes

  Business users          Listing health,         Use the platform for

                          reviews, rankings, and  day-to-day work

                          reports

  Local SEO specialists   Keyword and map-ranking Configure keywords and

                          performance             analyze results

  Agency administrators   Multi-brand and         Organize accounts,

                          multi-location          brands, listings, and

                          management              team access

  Team members            Assigned operational    Perform work allowed by

                          tasks                   their permissions

  Read-only stakeholders  Visibility into         Review data without

                          performance and         making changes, if this

                          reporting               role is approved

  Engineering team        Secure and maintainable Validate feasibility,

                          implementation          integrations, and data

                                                  quality

  Design team             Usable and consistent   Define navigation,

                          interface               interactions, and

                                                  accessibility

  Integration providers   Access to external data Govern API access,

                          and publishing          permissions, quotas,

                          capabilities            and terms

  -----------------------------------------------------------------------

## 6. Target Business Segments

### 6.1 Small businesses

Need a straightforward way to manage a limited number of listings,

review performance, monitor customer feedback, and view essential

reports.

### 6.2 Medium-sized businesses

Need centralized management across several locations, brand-level

organization, recurring reports, and practical competitor comparisons.

### 6.3 Enterprise businesses and agencies

Need scalable multi-location organization, team access, bulk workflows,

exportable reports, consistent permissions, and clear visibility into

integration and job status.

The product must not promise unlimited capacity. Actual limits depend on

the selected free hosting, storage, processing, and API quotas and must

be documented.

## 7. Business Scope

### 7.1 In-scope capability areas

  -----------------------------------------------------------------------

  Capability                          Business outcome

  ----------------------------------- -----------------------------------

  Account and access management       Protect account data and control

                                      who can perform actions

  Listing management                  Centralize supported business

                                      listing information

  Directory connections               Show connection status and

                                      available directory data

  Analytics                           Summarize available performance

                                      data and trends

  Keyword Position                    Track configured keyword

                                      performance and review search

                                      trends

  Geo Grid Ranker                     Evaluate local ranking across

                                      configured locations where

                                      supported

  Competitor Analysis                 Compare the selected business with

                                      configured competitors

  Market Research                     Explore competitor presence and

                                      share of voice across markets

  Brand Details                       Organize listings and keywords by

                                      brand

  Team management                     Support collaboration within

                                      defined permissions

  Post Scheduling                     Plan and manage posts on supported

                                      channels

  Social Media Analytics              Display supported social-channel

                                      analytics after authorized

                                      connection

  Social Rules                        Configure supported cross-platform

                                      publishing workflows

  Alerts and Reports                  Configure approved notifications

                                      and recurring reports

  Export                              Allow users to download supported

                                      data for further analysis

  Settings and release notes          Manage account preferences and

                                      review product changes

  -----------------------------------------------------------------------

These capability areas are grounded in the supplied screenshots and

published release notes. Their inclusion does not mean every historical

feature is approved for the first release.

### 7.2 Out of scope unless approved

-   Charging customers or processing payments

-   Requiring paid API access, paid AI models, paid plugins, or paid

    SaaS dependencies

-   Unsupported directory creation or synchronization

-   Accessing third-party data without permission or through methods

    that violate platform terms

-   Promising real-time data when the source is delayed

-   Features whose operating requirements cannot be met under the

    zero-cost constraint

-   Unlimited listing counts, scans, storage, or team members without a

    feasible capacity model

## 8. Mandatory Zero-Cost Business Requirement

**GMB LEGEND must be designed so that no paid service is mandatory for

core product operation.**

### 8.1 Meaning of "free"

For planning purposes, "free" means no required subscription fee, usage

charge, paid API, paid model, paid plugin, or paid external SaaS

dependency for the agreed product scope.

Open-source software can have no license fee while still requiring paid

hosting, hardware, domains, storage, bandwidth, email, maintenance, or

operations. These costs must not be concealed or incorrectly described

as zero.

### 8.2 Business rules for zero-cost delivery

1.  Evaluate every dependency before committing to a feature.

2.  Prefer open-source and self-hostable technologies where practical.

3.  Verify the current terms and limits of any free-tier service before

    using it.

4.  Do not rely on temporary free trials for mandatory production

    functionality.

5.  Document rate limits, retention limits, quotas, and restrictions.

6.  Do not require paid AI inference for an AI feature.

7.  Do not assume email, WhatsApp, social publishing, rank data,

    search-volume data, or listing APIs are free.

8.  If a compliant and reliable no-cost implementation is not available,

    mark the feature **Blocked by zero-cost constraint** or defer it.

9.  Never bypass provider permissions, authentication, quotas, or terms

    to preserve a feature.

10. Reassess the zero-cost requirement whenever a dependency or hosting

    choice changes.

### 8.3 Free-tier capacity

The business must approve realistic limits for listings, users,

scheduled jobs, exports, and scan frequency after the technical design

identifies available capacity. Until then, capacity is **TBD**.

## 9. Business Rules

The following rules apply across the product unless a more specific

approved rule supersedes them.

### 9.1 Account and data access

-   A user may access only the accounts, brands, listings, and reports

    they are authorized to access.

-   Administrative actions must require appropriate permissions.

-   A read-only role, if enabled, must not be able to change or delete

    operational data.

-   Disabling a user or revoking access must prevent subsequent

    unauthorized requests.

### 9.2 Brand and listing organization

-   Listings may be organized by brand and account.

-   Listing identifiers must be stored consistently to avoid accidental

    duplication.

-   A listing must not be considered connected solely because a local

    record exists.

-   External connection status must reflect the most recent verified

    state available.

-   Inactive, unavailable, disconnected, and error states must be

    distinguishable.

### 9.3 Data quality and reporting

-   Missing data must not be displayed as zero unless zero is the actual

    measured value.

-   Estimated values must be labelled as estimates.

-   Important metrics must include a defined source, calculation method,

    and reporting period.

-   Reports must identify the selected date range and timezone when

    applicable.

-   Comparisons must use compatible definitions and time periods.

-   Stale or partial data must be identified clearly.

### 9.4 Keyword and rank tracking

-   A rank observation must be associated with the keyword, listing,

    scan location/configuration, and timestamp.

-   Ranking values must not be described as universal positions for all

    searchers.

-   Scan failures and missing results must not be converted into

    fabricated ranks.

-   The meaning and formula of average rank and visibility must be

    documented before launch.

### 9.5 Competitor and market research

-   Competitors must be explicitly configured or discovered through an

    approved, documented method.

-   The selected business must be clearly distinguished from

    competitors.

-   Share of Voice and other derived metrics must have documented

    formulas and denominators.

-   A disabled competitor should be excluded from new calculations

    according to a defined rule; historical reports should retain enough

    context to remain interpretable.

-   Unavailable competitor metrics must not be treated as zero.

### 9.6 Publishing and social integrations

-   Publishing actions must use authorized accounts and supported APIs

    or methods.

-   A post must show an accurate status such as draft, scheduled,

    published, or failed where supported.

-   A retry must not unintentionally publish duplicate content.

-   Cross-platform workflows must account for destination-specific

    constraints.

-   Failed publication should show the available failure reason and

    recovery options.

-   Social analytics must only be shown when the relevant account is

    connected and the data is available.

### 9.7 Alerts and reports

-   Alert configurations must identify the event or schedule, scope,

    recipients, and delivery method where applicable.

-   The system must avoid unintended duplicate alerts.

-   Delivery failure must be visible when delivery status can be

    determined.

-   A report must not claim successful delivery if the delivery provider

    has not confirmed it.

-   Recurring schedules must specify timezone behavior.

### 9.8 Export and auditability

-   Exports must include clear column headings and respect the user's

    access permissions.

-   Exported data must reflect the selected filters and reporting

    period.

-   Sensitive credentials and secrets must never be included in exports.

-   Material administrative changes should be recorded in an audit log.

## 10. High-Level Business Processes

### 10.1 Onboarding and connection

1.  User signs in or creates an account.

2.  User creates or selects a brand.

3.  User connects an eligible external account or adds supported listing

    details.

4.  The system validates access and records the connection state.

5.  The user sees the listings available to that account.

6.  The user configures keywords, competitors, reports, or other

    approved workflows.

### 10.2 Local ranking review

1.  User selects a listing and configures target keywords.

2.  User selects the available scan settings.

3.  The system executes the scan using a compliant data source.

4.  The system stores the result, timestamp, and status.

5.  User reviews trends and exports data if required.

### 10.3 Competitor research

1.  User chooses a brand and market.

2.  User configures competitor brands.

3.  The system retrieves supported data and calculates approved metrics.

4.  User reviews comparison tables, heatmaps, and summaries.

5.  User exports data or uses it to inform business decisions.

### 10.4 Alert and report management

1.  User selects a supported alert or report type.

2.  User defines scope, recipients, schedule, and delivery method.

3.  The system validates and saves the configuration.

4.  The configured job runs when its schedule or trigger is met.

5.  The system records the outcome and displays it in history where

    supported.

## 11. Business Reporting Requirements

The platform should provide reports that help users answer:

-   Which listings are connected, disconnected, or experiencing errors?

-   How are tracked keywords performing over time?

-   Where does local ranking vary across the configured scan area?

-   How does the selected business compare with competitors?

-   Which cities show stronger or weaker competitive visibility?

-   How are available reviews and ratings changing?

-   Which scheduled posts were published or failed?

-   Which alerts and reports ran successfully?

-   When was each data source last updated?

The actual report list, data availability, and delivery options must be

confirmed for each integration.

## 12. Risks and Business Constraints

  -----------------------------------------------------------------------

  Risk or constraint      Business impact         Required response

  ----------------------- ----------------------- -----------------------

  Third-party API is paid A requested feature may Validate early; defer

  or has restrictive free not be sustainable      or redesign if

  limits                                          necessary

  Platform permissions or Data retrieval or       Use official access

  approvals are           publishing may not work routes; show a clear

  unavailable                                     limitation

  Free hosting cannot     Large accounts may      Define realistic limits

  support                 exceed capacity         and test capacity

  enterprise-scale jobs

  Search metrics have     Users may make          Document source,

  uncertain provenance    decisions from          methodology, and

                          inaccurate information  uncertainty

  External APIs change    Integrations may fail   Isolate integrations

                          after release           and provide

                                                  health/status

                                                  monitoring

  AI requires paid        AI functionality        Use a validated no-cost

  inference or hardware   breaches the cost       approach or defer

                          requirement

  Email/WhatsApp delivery Notifications may be    Verify free, compliant

  requires payment        unavailable under the   options and provide

                          current constraint      alternatives if

                                                  possible

  Product scope grows too Delayed delivery and    Prioritize a clearly

  quickly                 inconsistent            defined first release

                          implementation

  -----------------------------------------------------------------------

## 13. Business Acceptance Criteria

The business requirements are satisfied when:

1.  The product owner approves the initial release scope.

2.  Target user types and their permissions are defined.

3.  Every included module has an agreed business purpose.

4.  Key business metrics have approved definitions and sources.

5.  Zero-cost feasibility is reviewed for every required integration and

    operational dependency.

6.  No mandatory feature silently depends on a paid service.

7.  Unsupported or unavailable capabilities are clearly communicated.

8.  Business data is separated by account and protected by

    authorization.

9.  The product can provide useful reporting without fabricating

    unavailable values.

10. Capacity limitations for the selected free operating model are

    documented.

11. Business acceptance tests are mapped to the functional requirements.

## 14. Open Business Decisions

The following decisions require product-owner confirmation:

1.  Which modules are required for the first production release?

2.  Is GMB LEGEND intended for a single organization, agencies, or a

    multi-tenant public SaaS from launch?

3.  What account roles are required?

4.  Which directory and social integrations are essential?

5.  Which data providers are available at no cost and under acceptable

    terms?

6.  What are the practical listing, user, scan, and storage limits?

7.  Are recurring email reports mandatory if no suitable free delivery

    method exists?

8.  Are AI summaries, AI Rank Tracker, and AI-generated content

    mandatory or optional?

9.  Should pricing and billing screens be removed from the free product,

    retained as informational screens, or used only for internal

    administration?

10. What data retention, export, and account-deletion policies are

    required?

11. What are the approved formulas for Share of Voice, visibility,

    average rank, and completion score?

12. What measurable targets should define a successful launch?

## 15. Relationship to Other Documents

-   `PRD.md` defines the product scope and high-level requirements.

-   `BRD.md` defines the business objectives, rules, stakeholders, and

    business processes.

-   `FRD.md` will specify exact module and screen behavior.

-   `DESIGN.md` will define the user interface and interaction patterns.

-   `ENGINEERING.md` will define architecture and technology decisions.

-   `DATABASE.md` will define entities, relationships, and data

    constraints.

-   `API_SPEC.md` will define API contracts and integration boundaries.

-   `TASKS.md` will turn the approved requirements into implementation

    work.

When a business decision changes, update the affected documents and

record the change.

------------------------------------------------------------------------

**End of BRD --- GMB LEGEND**
