import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  PR_SUMMARY_MAX_AGE_MS,
  parsePrSummary,
} from "../lib/pr-summary.ts";

const NOW = Date.parse("2026-09-24T12:00:00.000Z");

function summary(overrides: Record<string, unknown> = {}) {
  return {
    version: 1,
    updatedAt: "2026-09-24T11:59:00.000Z",
    pr: {
      number: 25392,
      url: "https://github.com/collibra/frontend/pull/25392",
      state: "open",
    },
    checks: {
      failed: 2,
      running: 1,
      cancelled: 0,
      passed: 50,
      skipped: 3,
      failedNames: ["lint", "unit"],
    },
    reviewers: {
      pending: 1,
      approved: 0,
      changesRequested: 0,
      pendingNames: ["ai-governance (team)"],
    },
    blockers: ["checks_failed", "review_required"],
    error: null,
    ...overrides,
  };
}

describe("parsePrSummary", () => {
  it("returns a valid version 1 summary", () => {
    assert.deepEqual(parsePrSummary(summary(), NOW), summary());
  });

  it("accepts optional fields a later version 1 release adds", () => {
    const parsed = parsePrSummary(summary({ mergeable: true }), NOW);
    assert.equal(parsed?.pr.number, 25392);
  });

  it("returns null when the summary is missing", () => {
    assert.equal(parsePrSummary(undefined, NOW), null);
    assert.equal(parsePrSummary(null, NOW), null);
  });

  it("returns null for another version", () => {
    assert.equal(parsePrSummary(summary({ version: 2 }), NOW), null);
  });

  it("returns null when a field has the wrong type", () => {
    const cases = [
      summary({ updatedAt: 1 }),
      summary({ updatedAt: "yesterday" }),
      summary({ pr: { number: "25392", url: "x", state: "open" } }),
      summary({ pr: { number: 1, url: "x", state: "reopened" } }),
      summary({ checks: { ...summary().checks, failed: -1 } }),
      summary({ checks: { ...summary().checks, failedNames: "lint" } }),
      summary({ reviewers: { ...summary().reviewers, pending: 1.5 } }),
      summary({ blockers: [1] }),
      summary({ error: false }),
      "not an object",
    ];
    for (const value of cases) {
      assert.equal(parsePrSummary(value, NOW), null, JSON.stringify(value));
    }
  });

  it("returns null when the summary is older than 1 hour", () => {
    const updatedAt = new Date(NOW - PR_SUMMARY_MAX_AGE_MS - 1).toISOString();
    assert.equal(parsePrSummary(summary({ updatedAt }), NOW), null);
  });

  it("accepts a summary exactly 1 hour old", () => {
    const updatedAt = new Date(NOW - PR_SUMMARY_MAX_AGE_MS).toISOString();
    assert.notEqual(parsePrSummary(summary({ updatedAt }), NOW), null);
  });

  it("keeps the data of a summary with an error", () => {
    const parsed = parsePrSummary(summary({ error: "rate limited" }), NOW);
    assert.equal(parsed?.error, "rate limited");
    assert.equal(parsed?.checks.failed, 2);
  });
});
