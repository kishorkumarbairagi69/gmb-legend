# GMB LEGEND --- Database Specification

**Document status:** Draft v1.0\
**Last updated:** 11 October 2026\
**Related documents:** `PRD.md`, `BRD.md`, `FRD.md`, `ENGINEERING.md`

## 1. Purpose

This document proposes the logical relational data model for GMB LEGEND.
It is a design baseline for implementation, not a record of an existing
database. Table and field names may be adjusted to match the selected
ORM and engineering conventions.

The model is intended to support brands, business listings, provider
connections, analytics, keywords, ranking scans, reviews, publishing
workflows, competitors, alerts, reports, and audit history.

**Important:** Only store data that is necessary, authorized, and
permitted by the relevant provider. The existence of a table does not
mean a data source or integration is available.

## 2. Database Principles

1.  Use PostgreSQL or another product-owner-approved relational
    database.
2.  Use a consistent primary-key strategy; this draft uses UUIDs.
3.  Store timestamps in UTC and convert them for display using the
    configured timezone.
4.  Use foreign keys and database constraints to preserve data
    integrity.
5.  Apply workspace/tenant authorization to every tenant-owned record.
6.  Add indexes based on actual query patterns and measured performance.
7.  Use migrations for every schema change.
8.  Keep external provider identifiers separate from internal IDs.
9.  Track source, timestamps, and status for imported or computed data.
10. Avoid storing secrets in plain text.
11. Define retention and deletion rules before production.
12. Do not store or infer values when source data is missing.

## 3. Relationship Overview

``` text
users ──< workspace_memberships >── workspaces
workspaces ──< brands ──< business_listings
workspaces ──< provider_connections
business_listings ──< listing_sync_runs
business_listings ──< keyword_targets ──< rank_observations
business_listings ──< reviews
brands ──< competitor_brands ──< competitor_listings
business_listings ──< scheduled_posts ──< post_attempts
workspaces ──< social_rules
workspaces ──< alert_configurations ──< alert_events
workspaces ──< report_configurations ──< report_runs
workspaces ──< audit_events
workspaces ──< background_jobs
```

This is a logical overview. Exact cardinalities and optional
relationships must be confirmed as the product scope is finalized.

## 4. Common Conventions

### 4.1 Primary keys

Use `UUID` primary keys for internal entities unless an approved
implementation decision specifies otherwise.

### 4.2 Timestamps

Use: - `created_at TIMESTAMPTZ NOT NULL` -
`updated_at TIMESTAMPTZ NOT NULL`

Add `deleted_at TIMESTAMPTZ NULL` only where soft deletion is approved
and has a defined retention policy.

### 4.3 JSON fields

Use JSON/JSONB only for provider-specific payloads or flexible metadata
that cannot reasonably be normalized. Do not place core relational
fields exclusively inside JSON.

### 4.4 Status fields

Use constrained values (database enum, check constraint, or validated
reference table). Do not allow arbitrary status strings.

### 4.5 Tenant scoping

Tenant-owned tables should include `workspace_id` where it materially
improves isolation and query safety, or have a clearly enforced parent
relationship. The application must still verify authorization
server-side. PostgreSQL row-level security may be considered but must be
tested with the selected connection-pooling approach.

------------------------------------------------------------------------

## 5. Core Identity and Workspace Tables

### 5.1 `users`

Stores local application user profiles. Authentication secrets should be
handled by a maintained authentication implementation; if the selected
provider owns credentials, do not duplicate them here.

  -----------------------------------------------------------------------
  Column                  Type                    Rules / purpose
  ----------------------- ----------------------- -----------------------
  `id`                    UUID                    Primary key

  `email`                 CITEXT or normalized    Required; unique under
                          TEXT                    the approved
                                                  case-insensitive policy

  `display_name`          TEXT                    Optional

  `avatar_url`            TEXT                    Optional; validate
                                                  allowed URL schemes

  `status`                TEXT/ENUM               Active, disabled,
                                                  pending; approved
                                                  values TBD

  `created_at`            TIMESTAMPTZ             Required

  `updated_at`            TIMESTAMPTZ             Required
  -----------------------------------------------------------------------

### 5.2 `workspaces`

Represents an organization/account boundary. Required if multi-tenant
operation is approved.

  Column                 Type          Rules / purpose
  ---------------------- ------------- ------------------------------------
  `id`                   UUID          Primary key
  `name`                 TEXT          Required
  `slug`                 TEXT          Unique workspace URL/key if needed
  `status`               TEXT/ENUM     Active, disabled, pending
  `created_by_user_id`   UUID          FK to `users.id`
  `created_at`           TIMESTAMPTZ   Required
  `updated_at`           TIMESTAMPTZ   Required

### 5.3 `workspace_memberships`

Maps users to workspaces and defines access.

  Column           Type          Rules / purpose
  ---------------- ------------- -----------------------------------------------
  `id`             UUID          Primary key
  `workspace_id`   UUID          FK to `workspaces.id`
  `user_id`        UUID          FK to `users.id`
  `role`           TEXT/ENUM     Owner, admin, editor, viewer; exact roles TBD
  `status`         TEXT/ENUM     Invited, active, suspended
  `created_at`     TIMESTAMPTZ   Required
  `updated_at`     TIMESTAMPTZ   Required

**Constraint:** Unique (`workspace_id`, `user_id`).

------------------------------------------------------------------------

## 6. Brand and Listing Tables

### 6.1 `brands`

Represents a brand configured in a workspace.

  Column                 Type          Rules / purpose
  ---------------------- ------------- ----------------------------
  `id`                   UUID          Primary key
  `workspace_id`         UUID          FK to `workspaces.id`
  `name`                 TEXT          Required
  `description`          TEXT          Optional
  `website_url`          TEXT          Optional; validate URL
  `status`               TEXT/ENUM     Active, disabled, archived
  `created_by_user_id`   UUID          FK to `users.id`
  `created_at`           TIMESTAMPTZ   Required
  `updated_at`           TIMESTAMPTZ   Required

**Indexes:** (`workspace_id`, `status`), normalized brand name by
workspace if duplicate detection is required.

### 6.2 `business_listings`

Represents a business location/listing known to GMB LEGEND. A local
record does not prove that an external profile is connected.

  -----------------------------------------------------------------------
  Column                  Type                    Rules / purpose
  ----------------------- ----------------------- -----------------------
  `id`                    UUID                    Primary key

  `workspace_id`          UUID                    FK to `workspaces.id`

  `brand_id`              UUID                    FK to `brands.id`

  `provider`              TEXT                    Provider namespace,
                                                  e.g. Google;
                                                  constrained values TBD

  `external_listing_id`   TEXT                    Provider ID, nullable
                                                  until linked

  `store_code`            TEXT                    Optional

  `name`                  TEXT                    Required

  `address_line_1`        TEXT                    Optional

  `address_line_2`        TEXT                    Optional

  `city`                  TEXT                    Optional

  `region`                TEXT                    Optional

  `postal_code`           TEXT                    Optional

  `country_code`          CHAR(2)                 Optional ISO country
                                                  code

  `latitude`              NUMERIC(9,6)            Optional; validate
                                                  geographic range

  `longitude`             NUMERIC(9,6)            Optional; validate
                                                  geographic range

  `phone`                 TEXT                    Optional

  `website_url`           TEXT                    Optional

  `primary_category`      TEXT                    Optional

  `status`                TEXT/ENUM               Active, inactive,
                                                  disconnected,
                                                  unavailable, error;
                                                  refine as needed

  `last_synced_at`        TIMESTAMPTZ             Nullable

  `created_at`            TIMESTAMPTZ             Required

  `updated_at`            TIMESTAMPTZ             Required
  -----------------------------------------------------------------------

**Constraints and indexes** - Latitude must be between -90 and 90;
longitude between -180 and 180. - Index (`workspace_id`, `brand_id`,
`status`). - Provider external ID uniqueness must be scoped
appropriately after provider behavior is confirmed. - Store the provider
connection status separately if it can vary independently from the
listing's business status.

### 6.3 `listing_provider_records`

**Proposed:** Normalized mapping for a listing's record on different
external directories.

  ------------------------------------------------------------------------
  Column                  Type                    Purpose
  ----------------------- ----------------------- ------------------------
  `id`                    UUID                    Primary key

  `workspace_id`          UUID                    Tenant scope

  `listing_id`            UUID                    FK to
                                                  `business_listings.id`

  `provider`              TEXT                    Directory/provider key

  `external_id`           TEXT                    Provider record
                                                  identifier, if available

  `profile_url`           TEXT                    Optional

  `status`                TEXT/ENUM               Connected, disconnected,
                                                  processing, unavailable,
                                                  error, unknown

  `last_checked_at`       TIMESTAMPTZ             Last verification time

  `metadata`              JSONB                   Minimal permitted
                                                  provider metadata

  `created_at`            TIMESTAMPTZ             Required

  `updated_at`            TIMESTAMPTZ             Required
  ------------------------------------------------------------------------

**Constraint:** Unique (`listing_id`, `provider`) unless multiple
profiles per provider are supported.

### 6.4 `listing_sync_runs`

Tracks synchronization attempts and outcomes.

  Column              Type          Purpose
  ------------------- ------------- ---------------------------------------------
  `id`                UUID          Primary key
  `workspace_id`      UUID          Tenant scope
  `listing_id`        UUID          FK to listing
  `provider`          TEXT          Provider
  `status`            TEXT/ENUM     Queued, running, succeeded, failed, partial
  `started_at`        TIMESTAMPTZ   Nullable
  `finished_at`       TIMESTAMPTZ   Nullable
  `records_read`      INTEGER       Default 0
  `records_updated`   INTEGER       Default 0
  `error_code`        TEXT          Safe provider/application code
  `error_message`     TEXT          Redacted, safe message
  `created_at`        TIMESTAMPTZ   Required

------------------------------------------------------------------------

## 7. Provider Connections and Credentials

### 7.1 `provider_connections`

Stores connection metadata for an external account. Secret material
should be encrypted and access restricted.

  -------------------------------------------------------------------------
  Column                    Type                    Purpose
  ------------------------- ----------------------- -----------------------
  `id`                      UUID                    Primary key

  `workspace_id`            UUID                    Tenant scope

  `provider`                TEXT                    Provider key

  `provider_account_id`     TEXT                    External account
                                                    identifier

  `display_name`            TEXT                    Optional safe label

  `status`                  TEXT/ENUM               Connected, expired,
                                                    revoked, error, pending

  `scopes`                  TEXT\[\]                Granted scopes, where
                                                    relevant

  `encrypted_credentials`   BYTEA or protected      Encrypted
                            secret reference        token/credential
                                                    payload; never expose
                                                    to client

  `expires_at`              TIMESTAMPTZ             Nullable

  `last_success_at`         TIMESTAMPTZ             Nullable

  `last_error_code`         TEXT                    Nullable

  `created_at`              TIMESTAMPTZ             Required

  `updated_at`              TIMESTAMPTZ             Required
  -------------------------------------------------------------------------

**Security rules** - Encrypt credentials using a key kept outside the
database. - Do not log credential contents. - Limit access to
integration code that requires the credential. - Define token refresh,
revocation, and deletion behavior. - Confirm provider terms and security
requirements before storing any credential.

------------------------------------------------------------------------

## 8. Keywords and Ranking

### 8.1 `keyword_targets`

Stores configured keywords for a listing or approved brand scope.

  -----------------------------------------------------------------------
  Column                  Type                    Purpose
  ----------------------- ----------------------- -----------------------
  `id`                    UUID                    Primary key

  `workspace_id`          UUID                    Tenant scope

  `brand_id`              UUID                    FK to brand, nullable
                                                  if listing-scoped only

  `listing_id`            UUID                    FK to listing, nullable
                                                  if brand-scoped only

  `keyword`               TEXT                    Required

  `normalized_keyword`    TEXT                    Normalized
                                                  comparison/search key

  `intent`                TEXT/ENUM               Branded, navigational,
                                                  transactional,
                                                  informational, unknown;
                                                  methodology TBD

  `language_code`         TEXT                    Optional

  `country_code`          CHAR(2)                 Optional

  `city`                  TEXT                    Optional

  `is_active`             BOOLEAN                 Default true

  `created_by_user_id`    UUID                    FK to user

  `created_at`            TIMESTAMPTZ             Required

  `updated_at`            TIMESTAMPTZ             Required
  -----------------------------------------------------------------------

**Validation:** At least one of `brand_id` or `listing_id` must be
present. Confirm whether both are permitted. Uniqueness scope for
normalized keywords is **TBD**.

### 8.2 `rank_scans`

Represents one scan execution, potentially containing many keywords and
geographic points.

  -----------------------------------------------------------------------
  Column                  Type                    Purpose
  ----------------------- ----------------------- -----------------------
  `id`                    UUID                    Primary key

  `workspace_id`          UUID                    Tenant scope

  `listing_id`            UUID                    FK to listing

  `scan_type`             TEXT/ENUM               Keyword rank or geo
                                                  grid

  `status`                TEXT/ENUM               Queued, running,
                                                  succeeded, partial,
                                                  failed, cancelled

  `configuration`         JSONB                   Validated scan
                                                  settings, not secrets

  `started_at`            TIMESTAMPTZ             Nullable

  `finished_at`           TIMESTAMPTZ             Nullable

  `source`                TEXT                    Approved data source

  `error_code`            TEXT                    Nullable

  `created_by_user_id`    UUID                    FK to user

  `created_at`            TIMESTAMPTZ             Required
  -----------------------------------------------------------------------

### 8.3 `rank_observations`

Stores a rank result for one keyword at one scan point/time.

  Column                 Type          Purpose
  ---------------------- ------------- ---------------------------------------
  `id`                   UUID          Primary key
  `workspace_id`         UUID          Tenant scope
  `scan_id`              UUID          FK to `rank_scans.id`
  `keyword_target_id`    UUID          FK to keyword target
  `grid_point_id`        UUID          Nullable FK to `geo_grid_points.id`
  `observed_at`          TIMESTAMPTZ   Required
  `rank_position`        INTEGER       Nullable; positive integer if present
  `result_status`        TEXT/ENUM     Found, not_found, unavailable, failed
  `matched_listing_id`   UUID          Nullable FK to business listing
  `source`               TEXT          Approved data source
  `raw_metadata`         JSONB         Minimal permitted metadata
  `created_at`           TIMESTAMPTZ   Required

**Rules:** `rank_position` must be positive when present. Do not convert
`not_found` or `failed` into a rank of zero.

### 8.4 `geo_grid_points`

Stores the geographic points used in a configured grid scan.

  Column           Type           Purpose
  ---------------- -------------- --------------------------------
  `id`             UUID           Primary key
  `workspace_id`   UUID           Tenant scope
  `scan_id`        UUID           FK to rank scan
  `point_index`    INTEGER        Stable order/index within scan
  `latitude`       NUMERIC(9,6)   Required
  `longitude`      NUMERIC(9,6)   Required
  `label`          TEXT           Optional
  `created_at`     TIMESTAMPTZ    Required

**Constraint:** Unique (`scan_id`, `point_index`). Validate coordinate
ranges.

### 8.5 `keyword_metrics`

**Proposed:** Store search-volume or trend snapshots only when a
validated data source exists.

  Column                Type          Purpose
  --------------------- ------------- ----------------------------
  `id`                  UUID          Primary key
  `workspace_id`        UUID          Tenant scope
  `keyword_target_id`   UUID          FK to keyword target
  `period_start`        DATE          Reporting period
  `period_end`          DATE          Reporting period
  `search_volume`       INTEGER       Nullable
  `difficulty_value`    NUMERIC       Nullable
  `difficulty_name`     TEXT          Provider's metric name
  `source`              TEXT          Required source identifier
  `retrieved_at`        TIMESTAMPTZ   Required

Do not store provider-specific difficulty values as `KI%` until the
definition and source are confirmed.

------------------------------------------------------------------------

## 9. Reviews and Sentiment

### 9.1 `reviews`

Store only review data that the provider permits the application to
retain.

  -------------------------------------------------------------------------
  Column                    Type                    Purpose
  ------------------------- ----------------------- -----------------------
  `id`                      UUID                    Primary key

  `workspace_id`            UUID                    Tenant scope

  `listing_id`              UUID                    FK to listing

  `provider`                TEXT                    Review source

  `external_review_id`      TEXT                    Provider review ID

  `rating`                  NUMERIC(2,1)            Nullable; validate
                                                    against provider scale

  `review_text`             TEXT                    Nullable; retention
                                                    permitted only

  `reviewer_display_name`   TEXT                    Nullable; store only if
                                                    permitted

  `review_url`              TEXT                    Nullable

  `reviewed_at`             TIMESTAMPTZ             Nullable

  `reply_status`            TEXT/ENUM               Not available, not
                                                    replied, draft,
                                                    replied, failed

  `provider_updated_at`     TIMESTAMPTZ             Nullable

  `last_synced_at`          TIMESTAMPTZ             Nullable

  `created_at`              TIMESTAMPTZ             Required

  `updated_at`              TIMESTAMPTZ             Required
  -------------------------------------------------------------------------

**Constraint:** Unique (`provider`, `external_review_id`) where both are
present, subject to tenant/provider rules.

### 9.2 `review_sentiment_results`

**Proposed:** Keep computed sentiment separate from the original review
record.

  Column              Type           Purpose
  ------------------- -------------- --------------------------------------
  `id`                UUID           Primary key
  `workspace_id`      UUID           Tenant scope
  `review_id`         UUID           FK to review
  `model_or_method`   TEXT           Required method identifier
  `sentiment_label`   TEXT/ENUM      Positive, neutral, negative, unknown
  `confidence`        NUMERIC(5,4)   Optional, range 0--1
  `analyzed_at`       TIMESTAMPTZ    Required

AI-based analysis is conditional on an approved no-cost approach and
permitted use of the review content.

### 9.3 `review_reply_attempts`

**Proposed:** Track reply drafts and publication attempts.

  Column                  Type          Purpose
  ----------------------- ------------- ----------------------------------
  `id`                    UUID          Primary key
  `workspace_id`          UUID          Tenant scope
  `review_id`             UUID          FK to review
  `reply_text`            TEXT          Draft or attempted text
  `status`                TEXT/ENUM     Draft, queued, published, failed
  `provider_request_id`   TEXT          Nullable
  `error_code`            TEXT          Nullable
  `created_by_user_id`    UUID          FK to user
  `created_at`            TIMESTAMPTZ   Required
  `published_at`          TIMESTAMPTZ   Nullable

Do not store repeated copies of review content unnecessarily.

------------------------------------------------------------------------

## 10. Competitors and Market Research

### 10.1 `competitor_brands`

  Column           Type          Purpose
  ---------------- ------------- ---------------------------------------
  `id`             UUID          Primary key
  `workspace_id`   UUID          Tenant scope
  `brand_id`       UUID          FK to own brand/market-research scope
  `name`           TEXT          Required
  `website_url`    TEXT          Nullable
  `is_own_brand`   BOOLEAN       Default false
  `is_enabled`     BOOLEAN       Default true
  `created_at`     TIMESTAMPTZ   Required
  `updated_at`     TIMESTAMPTZ   Required

### 10.2 `competitor_listings`

  Column                  Type          Purpose
  ----------------------- ------------- ----------------------------------------
  `id`                    UUID          Primary key
  `workspace_id`          UUID          Tenant scope
  `competitor_brand_id`   UUID          FK to competitor brand
  `provider`              TEXT          Source/provider
  `external_listing_id`   TEXT          Nullable
  `name`                  TEXT          Required
  `city`                  TEXT          Nullable
  `address_summary`       TEXT          Nullable; minimize stored address data
  `profile_url`           TEXT          Nullable
  `last_checked_at`       TIMESTAMPTZ   Nullable
  `created_at`            TIMESTAMPTZ   Required
  `updated_at`            TIMESTAMPTZ   Required

### 10.3 `competitor_metric_snapshots`

**Proposed:** Store time-stamped metric snapshots so historical
comparisons are interpretable.

  Column                    Type          Purpose
  ------------------------- ------------- ----------------------------
  `id`                      UUID          Primary key
  `workspace_id`            UUID          Tenant scope
  `competitor_listing_id`   UUID          FK to competitor listing
  `metric_key`              TEXT          Approved metric identifier
  `metric_value`            NUMERIC       Nullable
  `metric_text_value`       TEXT          Nullable
  `unit`                    TEXT          Nullable
  `source`                  TEXT          Required
  `observed_at`             TIMESTAMPTZ   Required

Do not assume all competitor metrics can be obtained automatically. The
metric catalog and provider permissions remain TBD.

------------------------------------------------------------------------

## 11. Content and Social Publishing

### 11.1 `scheduled_posts`

  -----------------------------------------------------------------------
  Column                  Type                    Purpose
  ----------------------- ----------------------- -----------------------
  `id`                    UUID                    Primary key

  `workspace_id`          UUID                    Tenant scope

  `brand_id`              UUID                    Nullable FK to brand

  `listing_id`            UUID                    Nullable FK to listing

  `post_type`             TEXT/ENUM               Approved type list TBD

  `title`                 TEXT                    Nullable

  `body`                  TEXT                    Required if supported
                                                  by channel

  `media_references`      JSONB                   References to approved
                                                  media assets

  `status`                TEXT/ENUM               Draft, scheduled,
                                                  publishing, published,
                                                  failed, cancelled

  `scheduled_at`          TIMESTAMPTZ             Nullable for
                                                  unscheduled drafts

  `timezone`              TEXT                    Required for scheduled
                                                  posts

  `created_by_user_id`    UUID                    FK to user

  `created_at`            TIMESTAMPTZ             Required

  `updated_at`            TIMESTAMPTZ             Required
  -----------------------------------------------------------------------

### 11.2 `post_destinations`

Tracks the intended channel/account for each post.

  --------------------------------------------------------------------------
  Column                     Type                    Purpose
  -------------------------- ----------------------- -----------------------
  `id`                       UUID                    Primary key

  `workspace_id`             UUID                    Tenant scope

  `post_id`                  UUID                    FK to scheduled post

  `provider_connection_id`   UUID                    FK to provider
                                                     connection

  `platform`                 TEXT                    Platform key

  `status`                   TEXT/ENUM               Pending, scheduled,
                                                     published, failed,
                                                     skipped

  `external_post_id`         TEXT                    Nullable

  `published_at`             TIMESTAMPTZ             Nullable

  `created_at`               TIMESTAMPTZ             Required

  `updated_at`               TIMESTAMPTZ             Required
  --------------------------------------------------------------------------

### 11.3 `post_attempts`

Records publication attempts.

  Column                  Type          Purpose
  ----------------------- ------------- ----------------------------
  `id`                    UUID          Primary key
  `workspace_id`          UUID          Tenant scope
  `post_destination_id`   UUID          FK to destination
  `attempt_number`        INTEGER       Positive integer
  `status`                TEXT/ENUM     Running, succeeded, failed
  `provider_request_id`   TEXT          Nullable
  `error_code`            TEXT          Nullable
  `safe_error_message`    TEXT          Nullable
  `started_at`            TIMESTAMPTZ   Required
  `finished_at`           TIMESTAMPTZ   Nullable

### 11.4 `social_rules`

  Column                    Type          Purpose
  ------------------------- ------------- --------------------------------
  `id`                      UUID          Primary key
  `workspace_id`            UUID          Tenant scope
  `name`                    TEXT          Required
  `source_post_type`        TEXT          Approved post type
  `destination_platforms`   JSONB         Validated platform identifiers
  `is_enabled`              BOOLEAN       Default true
  `created_by_user_id`      UUID          FK to user
  `created_at`              TIMESTAMPTZ   Required
  `updated_at`              TIMESTAMPTZ   Required

Rules must prevent loops and duplicate publication. A normalized
rule-destination table may be preferable if querying individual
destinations becomes common.

------------------------------------------------------------------------

## 12. Alerts, Reports, and History

### 12.1 `alert_configurations`

  -----------------------------------------------------------------------
  Column                  Type                    Purpose
  ----------------------- ----------------------- -----------------------
  `id`                    UUID                    Primary key

  `workspace_id`          UUID                    Tenant scope

  `name`                  TEXT                    Optional label

  `alert_type`            TEXT                    Approved alert type

  `scope_config`          JSONB                   Validated listing/brand
                                                  scope

  `conditions`            JSONB                   Validated trigger
                                                  settings

  `delivery_channels`     JSONB                   Only supported channels

  `recipient_config`      JSONB                   Authorized recipients;
                                                  minimize personal data

  `frequency`             TEXT/ENUM               Event-based or approved
                                                  schedule

  `timezone`              TEXT                    Required for scheduled
                                                  evaluation

  `is_enabled`            BOOLEAN                 Default true

  `created_by_user_id`    UUID                    FK to user

  `created_at`            TIMESTAMPTZ             Required

  `updated_at`            TIMESTAMPTZ             Required
  -----------------------------------------------------------------------

### 12.2 `alert_events`

  -----------------------------------------------------------------------
  Column                  Type                    Purpose
  ----------------------- ----------------------- -----------------------
  `id`                    UUID                    Primary key

  `workspace_id`          UUID                    Tenant scope

  `configuration_id`      UUID                    FK to alert
                                                  configuration, nullable
                                                  if deleted/retained by
                                                  policy

  `alert_type`            TEXT                    Type at event time

  `entity_type`           TEXT                    Listing, review,
                                                  keyword, etc.

  `entity_id`             UUID                    Nullable generic
                                                  reference; validate in
                                                  application

  `status`                TEXT/ENUM               Created, queued, sent,
                                                  failed, skipped

  `summary`               TEXT                    Safe short summary

  `occurred_at`           TIMESTAMPTZ             Event time

  `processed_at`          TIMESTAMPTZ             Nullable

  `created_at`            TIMESTAMPTZ             Required
  -----------------------------------------------------------------------

### 12.3 `alert_delivery_attempts`

**Proposed:** Track individual channel deliveries.

  Column                  Type          Purpose
  ----------------------- ------------- ---------------------------------------
  `id`                    UUID          Primary key
  `workspace_id`          UUID          Tenant scope
  `alert_event_id`        UUID          FK to alert event
  `channel`               TEXT          Email, WhatsApp, in-app, etc.
  `recipient_reference`   TEXT          Minimized/secured recipient reference
  `status`                TEXT/ENUM     Queued, sent, failed
  `provider_message_id`   TEXT          Nullable
  `error_code`            TEXT          Nullable
  `attempted_at`          TIMESTAMPTZ   Required

### 12.4 `report_configurations`

  Column                 Type          Purpose
  ---------------------- ------------- -----------------------------------
  `id`                   UUID          Primary key
  `workspace_id`         UUID          Tenant scope
  `name`                 TEXT          Required
  `report_type`          TEXT          Approved report type
  `scope_config`         JSONB         Validated brand/listing scope
  `schedule_rule`        TEXT          Validated schedule representation
  `timezone`             TEXT          Required for recurring schedules
  `delivery_channels`    JSONB         Supported channels only
  `recipient_config`     JSONB         Authorized recipients
  `is_enabled`           BOOLEAN       Default true
  `created_by_user_id`   UUID          FK to user
  `created_at`           TIMESTAMPTZ   Required
  `updated_at`           TIMESTAMPTZ   Required

### 12.5 `report_runs`

  Column                 Type          Purpose
  ---------------------- ------------- ---------------------------------------------
  `id`                   UUID          Primary key
  `workspace_id`         UUID          Tenant scope
  `configuration_id`     UUID          FK to report configuration
  `status`               TEXT/ENUM     Queued, running, succeeded, partial, failed
  `period_start`         TIMESTAMPTZ   Reporting period start
  `period_end`           TIMESTAMPTZ   Reporting period end
  `artifact_reference`   TEXT          Optional secure export reference
  `error_code`           TEXT          Nullable
  `started_at`           TIMESTAMPTZ   Nullable
  `finished_at`          TIMESTAMPTZ   Nullable
  `created_at`           TIMESTAMPTZ   Required

------------------------------------------------------------------------

## 13. Background Jobs, Exports, and Audit

### 13.1 `background_jobs`

  -----------------------------------------------------------------------
  Column                  Type                    Purpose
  ----------------------- ----------------------- -----------------------
  `id`                    UUID                    Primary key

  `workspace_id`          UUID                    Tenant scope, nullable
                                                  only for system-level
                                                  jobs

  `job_type`              TEXT                    Approved job type

  `status`                TEXT/ENUM               Queued, running,
                                                  succeeded, failed,
                                                  cancelled

  `payload`               JSONB                   Validated non-secret
                                                  job parameters

  `attempt_count`         INTEGER                 Default 0

  `max_attempts`          INTEGER                 Bounded retry limit

  `run_after`             TIMESTAMPTZ             Earliest execution time

  `locked_at`             TIMESTAMPTZ             Nullable

  `started_at`            TIMESTAMPTZ             Nullable

  `finished_at`           TIMESTAMPTZ             Nullable

  `error_code`            TEXT                    Nullable

  `safe_error_message`    TEXT                    Nullable

  `created_at`            TIMESTAMPTZ             Required
  -----------------------------------------------------------------------

Use row locking or an equivalent claim mechanism to prevent multiple
workers from executing the same job concurrently. Idempotency keys
should be added for operations that can cause duplicate external side
effects.

### 13.2 `export_jobs`

**Proposed:** Track large or asynchronous exports.

  Column                   Type          Purpose
  ------------------------ ------------- ---------------------------------------------
  `id`                     UUID          Primary key
  `workspace_id`           UUID          Tenant scope
  `requested_by_user_id`   UUID          FK to user
  `export_type`            TEXT          Approved export type
  `filter_config`          JSONB         Validated filter parameters
  `status`                 TEXT/ENUM     Queued, running, succeeded, failed, expired
  `artifact_reference`     TEXT          Secure file reference, nullable
  `expires_at`             TIMESTAMPTZ   Nullable
  `created_at`             TIMESTAMPTZ   Required
  `finished_at`            TIMESTAMPTZ   Nullable

Export files must be access-controlled and expire according to the
approved retention policy.

### 13.3 `audit_events`

  Column            Type          Purpose
  ----------------- ------------- ----------------------------
  `id`              UUID          Primary key
  `workspace_id`    UUID          Tenant scope
  `actor_user_id`   UUID          Nullable for system action
  `action`          TEXT          Stable action key
  `entity_type`     TEXT          Entity category
  `entity_id`       UUID          Nullable
  `outcome`         TEXT/ENUM     Succeeded, failed
  `request_id`      TEXT          Nullable correlation ID
  `metadata`        JSONB         Non-sensitive context only
  `created_at`      TIMESTAMPTZ   Required

Do not write passwords, access tokens, secret payloads, or unnecessary
review/customer content into audit metadata.

------------------------------------------------------------------------

## 14. Optional Tables Requiring Scope Confirmation

The following capabilities were referenced but do not yet have enough
approved detail to define a final schema:

-   Billing records and payment events
-   FAQ/question-and-answer content
-   QR code templates and scan analytics
-   Directory synchronization jobs beyond status tracking
-   Social analytics snapshots
-   AI prompts, model runs, and citation results
-   Google Ads metrics
-   Calls and intent analysis
-   Task recommendations
-   Media asset storage
-   Team invitations and detailed permission grants

Add these only after their user journeys, data sources, retention
requirements, and zero-cost feasibility are approved.

------------------------------------------------------------------------

## 15. Indexing and Constraints

Initial index recommendations:

-   Unique index on normalized user email.
-   Unique index on (`workspace_id`, `user_id`) for memberships.
-   Index brands by (`workspace_id`, `status`).
-   Index listings by (`workspace_id`, `brand_id`, `status`).
-   Index provider connections by (`workspace_id`, `provider`,
    `status`).
-   Index keywords by (`workspace_id`, `listing_id`, `is_active`).
-   Index rank observations by (`workspace_id`, `keyword_target_id`,
    `observed_at DESC`).
-   Index rank observations by (`scan_id`, `grid_point_id`).
-   Index reviews by (`workspace_id`, `listing_id`, `reviewed_at DESC`).
-   Index posts by (`workspace_id`, `status`, `scheduled_at`).
-   Index jobs by (`status`, `run_after`) for job claiming.
-   Index alert/report history by (`workspace_id`, `created_at DESC`).

Validate indexes against real query plans. Avoid adding indexes to every
column without evidence.

## 16. Deletion, Retention, and Privacy

Before production, define retention policies for:

-   Provider credentials and revoked connections
-   Imported reviews and external listing data
-   Rank observations and keyword metrics
-   Job logs and error payloads
-   Alert/report history
-   Generated exports and media assets
-   Audit records

Rules: - Delete or anonymize data according to the approved policy and
provider terms. - Ensure workspace deletion does not leave orphaned
tenant data. - Use cascading deletes only where the relationship and
retention policy justify them. - Preserve audit evidence only where
policy and law permit. - Avoid storing complete provider payloads by
default. - Apply secure deletion/invalidation to credentials on
disconnect.

## 17. Database Acceptance Criteria

The database design is ready for implementation when:

1.  Every approved feature maps to defined entities and relationships.
2.  Tenant-owned data has a clear and tested isolation strategy.
3.  Foreign keys, unique constraints, and validation rules are
    documented.
4.  External IDs are separated from internal primary keys.
5.  Timestamps and timezones follow a consistent rule.
6.  Missing, unavailable, and failed measurements are not stored as
    fabricated zeros.
7.  Provider credentials are encrypted or securely referenced outside
    ordinary application data access.
8.  Retention, export, and deletion policies are approved.
9.  Migrations can create and update the schema reproducibly.
10. Critical query paths have appropriate indexes and integration tests.

## 18. Open Database Decisions

1.  Is the application multi-tenant from the first release?
2.  Which authentication system will own user credentials?
3.  Can a keyword belong to a brand, a listing, or both?
4.  Can one listing have multiple external profiles per provider?
5.  Which review fields may legally and contractually be retained?
6.  What rank-scan granularity and grid configuration are required?
7.  Which provider metrics have validated definitions and data sources?
8.  What are the retention periods for scans, reviews, jobs, reports,
    and exports?
9.  Will media files be stored locally, in a database, or in an approved
    object store?
10. Which optional modules belong in the MVP?

**End of DATABASE --- GMB LEGEND**
