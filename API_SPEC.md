# GMB LEGEND --- API Specification

**Document status:** Draft v1.0\
**Last updated:** 11 October 2026\
**Related documents:** `PRD.md`, `BRD.md`, `FRD.md`, `ENGINEERING.md`,
`DATABASE.md`

## 1. Purpose and Status

This document proposes the API contract for GMB LEGEND. It defines API
conventions, authentication and authorization expectations, endpoint
groups, request/response shapes, validation, and error handling.

**Important:** These are proposed application endpoints, not evidence
that an API or integration already exists. Endpoint details must be
reconciled with the approved MVP, database migrations, and selected
authentication/provider implementations before coding.

## 2. API Design Principles

-   Use REST-style JSON endpoints for application resources.
-   Use a versioned base path: `/api/v1`.
-   Authenticate all private endpoints.
-   Enforce workspace authorization on the server for every request.
-   Validate request bodies, query parameters, and path parameters.
-   Use consistent error response formats.
-   Paginate large collections.
-   Return real status and source metadata; never fabricate provider
    success.
-   Keep external provider APIs behind server-side integration adapters.
-   Never expose provider tokens, secrets, internal stack traces, or
    other tenants' data.
-   For long-running work, return a job identifier and provide a status
    endpoint.
-   Keep all mandatory API dependencies within the approved zero-cost
    operating model.

## 3. Base URL and Formats

Local development example:

``` text
http://localhost:3000/api/v1
```

Production base URL depends on the approved deployment.

-   Request/response format: `application/json`, except file downloads
    and explicitly documented callbacks.
-   Timestamps: ISO 8601 with timezone, preferably UTC in API responses.
-   IDs: UUIDs for internal resources unless a documented contract says
    otherwise.
-   Pagination: cursor-based or page-based, chosen consistently for each
    resource.
-   All write endpoints must authenticate, authorize, and validate
    before changing state.

## 4. Authentication and Authorization

Authentication implementation is **TBD**. The following behavior is
required regardless of provider:

-   Private endpoints require a valid authenticated session or bearer
    credential.
-   The server derives the user identity from the validated credential,
    not from a client-supplied `user_id`.
-   Workspace membership and role are checked for every tenant-scoped
    resource.
-   Provider credentials are used only server-side.
-   Unauthenticated requests return `401`.
-   Authenticated users without required access receive `403` or a
    non-disclosing `404`, according to the security policy.
-   Logout/revocation invalidates the applicable session or token.

### 4.1 Suggested role matrix

Exact roles are **TBD**. This is a starting point.

  Action                              Owner/Admin          Editor       Viewer
  --------------------------------- ------------- --------------- ------------
  View permitted dashboards                   Yes             Yes          Yes
  Create/edit brands and listings             Yes      As granted           No
  Manage provider connections                 Yes      As granted           No
  Create/execute scans                        Yes      As granted           No
  Schedule/publish posts                      Yes      As granted           No
  Manage team and roles                       Yes   No by default           No
  View audit history                          Yes      As granted   As granted

Authorization must be enforced by server-side policy, not only by the
interface.

## 5. Standard Response Conventions

### 5.1 Success

A typical resource response:

``` json
{
  "data": {
    "id": "UUID",
    "name": "Example"
  },
  "meta": {
    "requestId": "request-id"
  }
}
```

A collection response:

``` json
{
  "data": [],
  "meta": {
    "requestId": "request-id",
    "pagination": {
      "page": 1,
      "pageSize": 25,
      "total": 0
    }
  }
}
```

These are illustrative schemas, not literal response data.

### 5.2 Error

All application errors should follow a stable shape:

``` json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "One or more fields are invalid.",
    "details": [
      {
        "field": "name",
        "issue": "Required"
      }
    ],
    "requestId": "request-id"
  }
}
```

Do not include secrets, SQL text, stack traces, provider tokens, or
internal infrastructure details in user-facing errors.

### 5.3 Suggested HTTP status codes

  -----------------------------------------------------------------------
  Status                              Use
  ----------------------------------- -----------------------------------
  `200 OK`                            Successful read or action with a
                                      response

  `201 Created`                       Resource created

  `202 Accepted`                      Asynchronous job accepted

  `204 No Content`                    Successful action with no response
                                      body

  `400 Bad Request`                   Invalid request structure or
                                      parameters

  `401 Unauthorized`                  Missing or invalid authentication

  `403 Forbidden`                     Authenticated but not permitted

  `404 Not Found`                     Resource missing or intentionally
                                      hidden

  `409 Conflict`                      Duplicate, conflicting state, or
                                      invalid transition

  `422 Unprocessable Entity`          Well-formed request fails business
                                      validation

  `429 Too Many Requests`             Rate limit or quota exceeded

  `502 Bad Gateway`                   External provider failure where
                                      applicable

  `503 Service Unavailable`           Temporarily unavailable
                                      service/dependency
  -----------------------------------------------------------------------

## 6. Pagination, Filtering, and Sorting

For collection endpoints, support only the filters approved for that
resource.

Suggested query parameters:

-   `page`: one-based page number
-   `pageSize`: requested page size with a server-defined maximum
-   `search`: normalized text query
-   `sortBy`: allowlisted field
-   `sortOrder`: `asc` or `desc`
-   `status`: validated status filter
-   `from` / `to`: ISO date/time boundaries where relevant

The API must reject invalid page sizes and unsupported sort fields or
clamp them according to a documented rule. Do not interpolate
user-supplied sort fields directly into SQL.

## 7. Endpoint Inventory

The following endpoint groups are proposed. Only implement endpoints
needed by the approved release.

  ---------------------------------------------------------------------------------------------------------------
  Area              Method            Endpoint                                            Purpose
  ----------------- ----------------- --------------------------------------------------- -----------------------
  Session           `GET`             `/auth/session`                                     Return current
                                                                                          session/user summary

  Session           `POST`            `/auth/logout`                                      End current session

  Workspace         `GET`             `/workspaces`                                       List workspaces the
                                                                                          user can access

  Workspace         `GET`             `/workspaces/{workspaceId}`                         Read workspace details

  Brands            `GET`             `/workspaces/{workspaceId}/brands`                  List brands

  Brands            `POST`            `/workspaces/{workspaceId}/brands`                  Create brand

  Brands            `GET`             `/brands/{brandId}`                                 Read a brand

  Brands            `PATCH`           `/brands/{brandId}`                                 Update a brand

  Brands            `DELETE`          `/brands/{brandId}`                                 Delete/archive a brand
                                                                                          according to policy

  Listings          `GET`             `/workspaces/{workspaceId}/listings`                List listings

  Listings          `POST`            `/workspaces/{workspaceId}/listings`                Add a local listing
                                                                                          record

  Listings          `GET`             `/listings/{listingId}`                             Read listing

  Listings          `PATCH`           `/listings/{listingId}`                             Update listing

  Listings          `POST`            `/listings/{listingId}/sync`                        Request supported sync
                                                                                          job

  Provider          `GET`             `/workspaces/{workspaceId}/connections`             List connection
  connections                                                                             metadata

  Provider          `POST`            `/connections/{provider}/start`                     Start provider
  connections                                                                             authorization flow

  Provider          `POST`            `/connections/{provider}/disconnect`                Disconnect authorized
  connections                                                                             provider

  Overview          `GET`             `/listings/{listingId}/overview`                    Retrieve available
                                                                                          listing summary

  Overview          `GET`             `/listings/{listingId}/performance`                 Retrieve supported
                                                                                          performance data

  Comparison        `POST`            `/comparisons`                                      Create/run approved
                                                                                          comparison

  Reviews           `GET`             `/listings/{listingId}/reviews`                     List permitted review
                                                                                          data

  Reviews           `POST`            `/reviews/{reviewId}/reply-drafts`                  Save a reply draft

  Reviews           `POST`            `/reviews/{reviewId}/reply-attempts`                Attempt
                                                                                          provider-supported
                                                                                          reply

  Keywords          `GET`             `/listings/{listingId}/keywords`                    List tracked keywords

  Keywords          `POST`            `/listings/{listingId}/keywords`                    Add keyword

  Keywords          `PATCH`           `/keywords/{keywordId}`                             Update keyword

  Keywords          `DELETE`          `/keywords/{keywordId}`                             Remove/deactivate
                                                                                          keyword

  Rank scans        `POST`            `/listings/{listingId}/rank-scans`                  Queue supported scan

  Rank scans        `GET`             `/rank-scans/{scanId}`                              Get scan status/results

  Rank scans        `GET`             `/listings/{listingId}/rank-scans`                  List scans

  Competitors       `GET`             `/brands/{brandId}/competitors`                     List configured
                                                                                          competitors

  Competitors       `POST`            `/brands/{brandId}/competitors`                     Add competitor

  Competitors       `PATCH`           `/competitors/{competitorId}`                       Update/enable/disable
                                                                                          competitor

  Market research   `GET`             `/brands/{brandId}/market-research`                 Retrieve supported
                                                                                          market metrics

  Posts             `GET`             `/workspaces/{workspaceId}/posts`                   List posts

  Posts             `POST`            `/workspaces/{workspaceId}/posts`                   Create draft or
                                                                                          scheduled post

  Posts             `GET`             `/posts/{postId}`                                   Read post

  Posts             `PATCH`           `/posts/{postId}`                                   Edit post

  Posts             `POST`            `/posts/{postId}/cancel`                            Cancel supported
                                                                                          scheduled post

  Social rules      `GET`             `/workspaces/{workspaceId}/social-rules`            List rules

  Social rules      `POST`            `/workspaces/{workspaceId}/social-rules`            Create rule

  Social rules      `PATCH`           `/social-rules/{ruleId}`                            Update rule

  Alerts            `GET`             `/workspaces/{workspaceId}/alert-configurations`    List alert
                                                                                          configurations

  Alerts            `POST`            `/workspaces/{workspaceId}/alert-configurations`    Create configuration

  Alerts            `PATCH`           `/alert-configurations/{id}`                        Update/disable
                                                                                          configuration

  Reports           `GET`             `/workspaces/{workspaceId}/report-configurations`   List report
                                                                                          configurations

  Reports           `POST`            `/workspaces/{workspaceId}/report-configurations`   Create report
                                                                                          configuration

  Reports           `POST`            `/report-configurations/{id}/run`                   Request report
                                                                                          generation

  Jobs              `GET`             `/jobs/{jobId}`                                     Get authorized job
                                                                                          status

  Exports           `POST`            `/exports`                                          Create export job

  Exports           `GET`             `/exports/{exportId}`                               Get export
                                                                                          status/download
                                                                                          metadata

  Audit             `GET`             `/workspaces/{workspaceId}/audit-events`            Read permitted audit
                                                                                          events
  ---------------------------------------------------------------------------------------------------------------

The endpoint inventory is intentionally broad. Remove out-of-scope
endpoints before implementation; do not create empty endpoints solely to
match this list.

------------------------------------------------------------------------

## 8. Representative Request and Response Contracts

### 8.1 Create a brand

`POST /api/v1/workspaces/{workspaceId}/brands`

Request:

``` json
{
  "name": "Example Brand",
  "description": "Optional description",
  "websiteUrl": "https://example.com"
}
```

Expected behavior: - Require authentication and permission to create
brands. - Validate name and URL. - Enforce workspace scope. - Return
`201 Created` with the created resource. - Return a validation or
conflict error when applicable.

### 8.2 Add a listing

`POST /api/v1/workspaces/{workspaceId}/listings`

Request:

``` json
{
  "brandId": "UUID",
  "name": "Example Business",
  "storeCode": "STORE-001",
  "address": {
    "line1": "Example Street",
    "city": "Example City",
    "region": "Example Region",
    "postalCode": "000000",
    "countryCode": "IN"
  },
  "latitude": 28.000000,
  "longitude": 77.000000,
  "phone": null,
  "websiteUrl": "https://example.com"
}
```

Expected behavior: - Verify the brand belongs to the requested
workspace. - Validate coordinates and URL. - Store the local listing
record. - Return its actual connection status, normally unlinked until
verified. - Do not claim that an external profile was created or
connected unless that action occurred.

### 8.3 Add a keyword

`POST /api/v1/listings/{listingId}/keywords`

Request:

``` json
{
  "keyword": "example local service",
  "intent": "transactional",
  "languageCode": "en",
  "countryCode": "IN",
  "city": "Example City"
}
```

Expected behavior: - Verify access to the listing. - Normalize the
keyword for duplicate detection according to the approved rule. -
Validate supported intent values. - Do not promise search volume or
ranking data until a valid source is configured.

### 8.4 Start a rank scan

`POST /api/v1/listings/{listingId}/rank-scans`

Request:

``` json
{
  "scanType": "keyword_rank",
  "keywordIds": ["UUID"],
  "configuration": {
    "countryCode": "IN",
    "city": "Example City"
  }
}
```

Expected response: `202 Accepted`

``` json
{
  "data": {
    "jobId": "UUID",
    "scanId": "UUID",
    "status": "queued"
  },
  "meta": {
    "requestId": "request-id"
  }
}
```

Expected behavior: - Validate the scan type, keyword scope, and
supported configuration. - Confirm that the data source is enabled and
within quota. - Queue work instead of holding the request open for a
long scan. - If no compliant source is configured, return a clear `503`
or business error and do not create a fake successful scan.

### 8.5 Create a scheduled post

`POST /api/v1/workspaces/{workspaceId}/posts`

Request:

``` json
{
  "title": "Example update",
  "body": "Post content",
  "postType": "whats_new",
  "scheduledAt": "2026-11-01T10:00:00Z",
  "timezone": "Asia/Kolkata",
  "destinations": [
    {
      "providerConnectionId": "UUID",
      "platform": "approved_platform"
    }
  ]
}
```

Expected behavior: - Validate content, media requirements, schedule, and
destinations. - Verify that each destination is authorized and supports
the post type. - Save as scheduled only when the schedule is valid and
the required publication path is configured. - Prevent duplicate
publication when retries occur. - Return the actual state and any
destination-specific limitations.

### 8.6 Create an alert configuration

`POST /api/v1/workspaces/{workspaceId}/alert-configurations`

Request:

``` json
{
  "name": "Negative review alert",
  "alertType": "negative_review",
  "scopeConfig": {
    "listingIds": ["UUID"]
  },
  "frequency": "event",
  "timezone": "Asia/Kolkata",
  "deliveryChannels": ["in_app"],
  "isEnabled": true
}
```

Expected behavior: - Validate alert type and scope. - Validate that the
delivery channel is supported. - Store configuration only after
authorization and validation. - Do not accept unsupported channels as if
they were active.

------------------------------------------------------------------------

## 9. Long-Running Jobs

For scans, report generation, large exports, and synchronization:

1.  Accept the request and validate it.
2.  Create a job record with a stable ID.
3.  Return `202 Accepted` with the job ID.
4.  Process the job asynchronously.
5.  Allow the client to poll `GET /api/v1/jobs/{jobId}` or the
    resource-specific status endpoint.
6.  Return progress/status, timestamps, and safe error information.
7.  Enforce tenant authorization when reading job status.
8.  Use bounded retries and idempotency controls.
9.  Mark partial success accurately.

Suggested job response:

``` json
{
  "data": {
    "id": "UUID",
    "status": "running",
    "progress": {
      "completed": 3,
      "total": 10
    },
    "createdAt": "2026-11-01T10:00:00Z",
    "finishedAt": null
  }
}
```

Progress may be omitted when it cannot be calculated reliably.

## 10. Provider Callback and Webhook Rules

Only implement provider callbacks/webhooks when the provider supports
them and the integration is approved.

-   Verify provider signatures or equivalent authenticity controls.
-   Reject invalid signatures.
-   Prevent replay and duplicate processing.
-   Validate payload structure and size.
-   Store only required event data.
-   Return promptly and enqueue expensive work.
-   Do not trust a callback merely because it reaches a public endpoint.
-   Keep webhook secrets server-side and rotate them according to
    provider requirements.

Specific webhook endpoints are **TBD** until the selected providers are
known.

## 11. Idempotency, Rate Limits, and Concurrency

-   For side-effecting operations that may be retried, support an
    idempotency key where appropriate.
-   Scope idempotency records by workspace, operation, and key.
-   Define expiration and conflict behavior.
-   Rate-limit authentication, provider connection, scan, bulk update,
    post publishing, and export endpoints.
-   Respect upstream provider quotas.
-   Use job locking or database concurrency controls to prevent
    duplicate work.
-   Return `429` with retry guidance when the application limit is
    reached.
-   Do not automatically retry non-idempotent publishing operations
    without checking the prior outcome.

## 12. Security and Privacy

-   Do not accept `workspaceId` as proof of authorization; verify
    membership.
-   Enforce ownership checks on every referenced listing, brand,
    keyword, review, post, and job.
-   Validate all payloads server-side.
-   Restrict CORS to approved origins if browser cross-origin access is
    used.
-   Apply CSRF protection when required by the authentication model.
-   Redact tokens and personal data from logs.
-   Keep external API keys and credentials out of client responses.
-   Apply safe file-upload and download controls.
-   Return non-disclosing errors when revealing resource existence could
    leak tenant information.
-   Log material administrative actions without logging secrets.

## 13. Testing Requirements

Each endpoint must have tests for:

-   Valid request and expected response
-   Missing/invalid authentication
-   Wrong workspace or insufficient permission
-   Invalid body, query, and path parameters
-   Resource not found
-   Duplicate/conflicting request
-   Provider unavailable or quota exceeded
-   Partial job failure where relevant
-   Idempotent retry for side-effecting actions
-   Pagination/filter/export correctness
-   Sensitive-field redaction

Provider tests should use mocks or sandboxes where available. Automated
tests must not depend on paid production credentials.

## 14. API Acceptance Criteria

The API specification is ready for implementation when:

1.  The MVP endpoint list is approved.
2.  Authentication and workspace authorization are defined.
3.  Each endpoint has a request schema, response schema, and error
    behavior.
4.  Database entities and API resources are aligned.
5.  Long-running work has an explicit job/status contract.
6.  External provider calls are isolated behind adapters.
7.  Rate limits, retries, and idempotency are defined for sensitive
    operations.
8.  No endpoint leaks credentials or cross-tenant data.
9.  The zero-cost feasibility of every required provider is documented.
10. Automated tests cover authorization, validation, errors, and core
    success paths.

## 15. Open API Decisions

1.  Which endpoints are required for the MVP?
2.  What authentication implementation will be used?
3.  Will clients use cookie sessions, bearer tokens, or both?
4.  Will pagination be page-based or cursor-based?
5.  Which provider APIs and callback endpoints are approved?
6.  Which endpoints need idempotency keys?
7.  What are the rate limits for rank scans, exports, and bulk
    operations?
8.  Should destructive operations use soft deletion, archival, or hard
    deletion?
9.  Which reports and exports are synchronous versus asynchronous?
10. What API compatibility/versioning policy is required for external
    consumers?

**End of API_SPEC --- GMB LEGEND**
