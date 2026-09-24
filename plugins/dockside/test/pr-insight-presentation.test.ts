import assert from "node:assert/strict";
import { describe, it } from "node:test";
import type { PluginSidebarPullRequest } from "@bb/plugin-sdk";
import { rowPullRequestInsight } from "../lib/pr-insight-presentation.ts";
import type { PrSummaryV1 } from "../lib/pr-summary.ts";

const pullRequest: PluginSidebarPullRequest = {
  number: 25392,
  title: "Add PR insight",
  url: "https://github.com/collibra/frontend/pull/25392",
  state: "open",
  attention: "checks_failed",
};

function summary(overrides: Partial<PrSummaryV1> = {}): PrSummaryV1 {
  return {
    version: 1,
    updatedAt: "2026-09-24T11:59:00.000Z",
    pr: { number: 25392, url: pullRequest.url, state: "open" },
    checks: {
      failed: 2,
      running: 0,
      cancelled: 0,
      passed: 50,
      skipped: 0,
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

describe("rowPullRequestInsight", () => {
  it("keeps the core pull request when there is no summary", () => {
    assert.deepEqual(rowPullRequestInsight(pullRequest, null), {
      pullRequest,
      insight: null,
    });
  });

  it("shows nothing when bb reports no pull request", () => {
    assert.deepEqual(rowPullRequestInsight(null, summary()), {
      pullRequest: null,
      insight: null,
    });
  });

  it("shows only the non-zero counts", () => {
    const { insight } = rowPullRequestInsight(pullRequest, summary());
    assert.deepEqual(insight?.counts, [
      { kind: "failed", value: 2, label: "2 failed checks" },
      { kind: "pending", value: 1, label: "1 pending reviewer" },
    ]);
  });

  it("shows running checks", () => {
    const { insight } = rowPullRequestInsight(
      pullRequest,
      summary({
        checks: { ...summary().checks, failed: 0, running: 3, failedNames: [] },
        reviewers: { ...summary().reviewers, pending: 0, pendingNames: [] },
      }),
    );
    assert.deepEqual(insight?.counts, [
      { kind: "running", value: 3, label: "3 running checks" },
    ]);
  });

  it("lists failed check names, pending reviewers, and blocker texts", () => {
    const { insight } = rowPullRequestInsight(pullRequest, summary());
    assert.deepEqual(insight?.failedNames, ["lint", "unit"]);
    assert.deepEqual(insight?.pendingNames, ["ai-governance (team)"]);
    assert.deepEqual(insight?.blockerTexts, [
      "2 checks failed",
      "Review required",
    ]);
  });

  it("drops blocker codes it does not know", () => {
    const { insight } = rowPullRequestInsight(
      pullRequest,
      summary({ blockers: ["conflicts", "new_code"] }),
    );
    assert.deepEqual(insight?.blockerTexts, ["Merge conflicts"]);
  });

  it("marks the insight stale with the error of the last refresh", () => {
    assert.equal(
      rowPullRequestInsight(pullRequest, summary()).insight?.staleReason,
      null,
    );
    assert.equal(
      rowPullRequestInsight(pullRequest, summary({ error: "rate limited" }))
        .insight?.staleReason,
      "rate limited",
    );
  });

  it("shows a merged pull request without counts", () => {
    const result = rowPullRequestInsight(
      pullRequest,
      summary({ pr: { ...summary().pr, state: "merged" } }),
    );
    assert.equal(result.pullRequest?.state, "merged");
    assert.equal(result.insight, null);
  });

  it("shows a closed pull request without counts", () => {
    const result = rowPullRequestInsight(
      pullRequest,
      summary({ pr: { ...summary().pr, state: "closed" } }),
    );
    assert.equal(result.pullRequest?.state, "closed");
    assert.equal(result.insight, null);
  });

  it("shows no counts when bb already reports the pull request merged", () => {
    const merged = { ...pullRequest, state: "merged" as const };
    assert.deepEqual(rowPullRequestInsight(merged, summary()), {
      pullRequest: merged,
      insight: null,
    });
  });

  it("shows only the stale mark when every count is zero and the refresh failed", () => {
    const { insight } = rowPullRequestInsight(
      pullRequest,
      summary({
        checks: { ...summary().checks, failed: 0, failedNames: [] },
        reviewers: { ...summary().reviewers, pending: 0, pendingNames: [] },
        blockers: ["conflicts"],
        error: "rate limited",
      }),
    );
    assert.deepEqual(insight?.counts, []);
    assert.equal(insight?.staleReason, "rate limited");
    assert.deepEqual(insight?.blockerTexts, ["Merge conflicts"]);
  });

  it("ignores a summary for another pull request number", () => {
    assert.deepEqual(
      rowPullRequestInsight(
        pullRequest,
        summary({ pr: { ...summary().pr, number: 1, state: "merged" } }),
      ),
      { pullRequest, insight: null },
    );
  });

  it("gives no insight when every count is zero", () => {
    const { insight } = rowPullRequestInsight(
      pullRequest,
      summary({
        checks: { ...summary().checks, failed: 0, failedNames: [] },
        reviewers: { ...summary().reviewers, pending: 0, pendingNames: [] },
        blockers: ["conflicts"],
      }),
    );
    assert.equal(insight, null);
  });
});
