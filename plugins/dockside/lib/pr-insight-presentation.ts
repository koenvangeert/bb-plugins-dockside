import type { PluginSidebarPullRequest } from "@bb/plugin-sdk";
import type { PrSummaryV1 } from "./pr-summary.ts";

export interface PrInsightCount {
  kind: "failed" | "running" | "pending";
  value: number;
  label: string;
}

export interface PrInsightPresentation {
  counts: PrInsightCount[];
  staleReason: string | null;
  failedNames: string[];
  pendingNames: string[];
  blockerTexts: string[];
}

function plural(value: number, noun: string): string {
  return `${value} ${noun}${value === 1 ? "" : "s"}`;
}

function blockerText(code: string, summary: PrSummaryV1): string | null {
  switch (code) {
    case "conflicts":
      return "Merge conflicts";
    case "checks_failed":
      return `${plural(summary.checks.failed, "check")} failed`;
    case "changes_requested":
      return "Changes requested";
    case "behind":
      return "Branch out of date";
    case "review_required":
      return "Review required";
    case "unresolved_threads":
      return "Unresolved review threads";
    case "checks_running":
      return `${plural(summary.checks.running, "check")} running`;
    case "draft":
      return "Draft";
    case "blocked":
      return "Blocked by branch rules";
    default:
      return null;
  }
}

function insightCounts(summary: PrSummaryV1): PrInsightCount[] {
  const counts: PrInsightCount[] = [
    {
      kind: "failed",
      value: summary.checks.failed,
      label: plural(summary.checks.failed, "failed check"),
    },
    {
      kind: "running",
      value: summary.checks.running,
      label: plural(summary.checks.running, "running check"),
    },
    {
      kind: "pending",
      value: summary.reviewers.pending,
      label: plural(summary.reviewers.pending, "pending reviewer"),
    },
  ];
  return counts.filter((count) => count.value > 0);
}

export function rowPullRequestInsight(
  pullRequest: PluginSidebarPullRequest | null,
  summary: PrSummaryV1 | null,
): {
  pullRequest: PluginSidebarPullRequest | null;
  insight: PrInsightPresentation | null;
} {
  if (
    pullRequest === null ||
    summary === null ||
    summary.pr.number !== pullRequest.number
  ) {
    return { pullRequest, insight: null };
  }
  const withSummaryState = { ...pullRequest, state: summary.pr.state };
  if (summary.pr.state === "merged" || summary.pr.state === "closed") {
    return { pullRequest: withSummaryState, insight: null };
  }
  const counts = insightCounts(summary);
  if (counts.length === 0) {
    return { pullRequest: withSummaryState, insight: null };
  }
  return {
    pullRequest: withSummaryState,
    insight: {
      counts,
      staleReason: summary.error,
      failedNames: summary.checks.failedNames,
      pendingNames: summary.reviewers.pendingNames,
      blockerTexts: summary.blockers.flatMap(
        (code) => blockerText(code, summary) ?? [],
      ),
    },
  };
}
