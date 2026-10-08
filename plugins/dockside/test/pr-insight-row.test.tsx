// @vitest-environment jsdom
import { fireEvent, within } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import type {
  JsonValue,
  PluginSidebarProject,
  PluginSidebarPullRequest,
  PluginSidebarThread,
} from "@get-bb/plugin-sdk";
import { loadPluginApp, renderSlot } from "@get-bb/plugin-sdk/testing/app";

type Metadata = { [key: string]: JsonValue };

const THREAD_ID = "thr_pr";
const PROJECT_ID = "proj_1";

const project: PluginSidebarProject = {
  id: PROJECT_ID,
  name: "Frontend",
  isPersonal: false,
  href: `/projects/${PROJECT_ID}`,
  settingsHref: `/projects/${PROJECT_ID}/settings`,
};

const thread: PluginSidebarThread = {
  id: THREAD_ID,
  projectId: PROJECT_ID,
  title: "Fix the build",
  titleFallback: null,
  displayTitle: "Fix the build",
  parentThreadId: null,
  lifecycleOwnerThreadId: null,
  sourceThreadId: null,
  sectionId: null,
  originKind: null,
  originPluginId: null,
  providerId: "claude-code",
  status: "idle",
  runtimeStatus: "idle",
  queuedWork: "none",
  hasPendingInteraction: false,
  activity: {
    workflows: 0,
    backgroundAgents: 0,
    backgroundCommands: 0,
    planMode: 0,
    goals: 0,
  },
  indicator: "none",
  indicatorLabel: null,
  isUnread: false,
  isPinned: false,
  pinnedAt: null,
  pinSortKey: null,
  isArchived: false,
  archivedAt: null,
  href: `/projects/${PROJECT_ID}/threads/${THREAD_ID}`,
  isHidden: false,
  environment: null,
  host: null,
  createdAt: Date.now() - 60_000,
  updatedAt: Date.now() - 60_000,
  lastReadAt: Date.now(),
  latestAttentionAt: Date.now() - 60_000,
};

const pullRequest: PluginSidebarPullRequest = {
  number: 25392,
  title: "Add PR insight",
  url: "https://github.com/collibra/frontend/pull/25392",
  state: "open",
  attention: "checks_failed",
};

function summary(overrides: Metadata = {}): Metadata {
  return {
    version: 1,
    updatedAt: new Date().toISOString(),
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

async function renderRow(metadata: Metadata | (() => Metadata)) {
  const app = await loadPluginApp(() => import("../app.tsx"));
  const getPluginMetadata = async () =>
    typeof metadata === "function" ? metadata() : metadata;
  return renderSlot(
    app.threadLists[0]!,
    {
      activeThreadId: null,
      activeProjectId: PROJECT_ID,
      isCompactViewport: false,
      searchQuery: "",
      onNavigate: () => {},
    },
    {
      sidebarThreads: { status: "ready", threads: [thread], projects: [project] },
      sidebarPullRequests: { [THREAD_ID]: pullRequest },
      sdk: { threads: { getPluginMetadata } },
      rpc: {
        listLifecycle: async () => ({ rows: [] }),
        listSettledThreads: async () => ({ threads: [] }),
        listProjectColors: async () => ({ colors: {} }),
      },
    },
  );
}

type Slot = Awaited<ReturnType<typeof renderRow>>;

function insightButton(slot: Slot) {
  return slot.findByRole("button", { name: /open thread$/ });
}

let current: Slot | null = null;
afterEach(() => {
  current?.lifecycle.unmount();
  current = null;
  vi.useRealTimers();
});

describe("PR insight on the sidebar row", () => {
  it("shows the failed check and pending reviewer counts next to the PR number", async () => {
    current = await renderRow({ prSummary: summary() });
    const button = await insightButton(current);

    expect(button.getAttribute("aria-label")).toBe(
      "2 failed checks, 1 pending reviewer; open thread",
    );
    expect(button.querySelector('[data-dockside-pr-insight="failed"]')?.textContent).toBe("2");
    expect(button.querySelector('[data-dockside-pr-insight="pending"]')?.textContent).toBe("1");
    expect(button.querySelector('[data-dockside-pr-insight="running"]')).toBeNull();
    expect(current.getByText("#25392")).toBeTruthy();
  });

  it("lists failed checks, pending reviewers, and blockers in the tooltip", async () => {
    current = await renderRow({ prSummary: summary() });
    const tooltip = within(await insightButton(current)).getByRole("tooltip", {
      hidden: true,
    });

    for (const text of [
      "lint",
      "unit",
      "ai-governance (team)",
      "2 checks failed",
      "Review required",
    ]) {
      expect(within(tooltip).getByText(text)).toBeTruthy();
    }
  });

  it("shows a stale mark with the error when the last refresh failed", async () => {
    current = await renderRow({ prSummary: summary({ error: "rate limited" }) });
    const button = await insightButton(current);

    expect(button.getAttribute("aria-label")).toBe(
      "2 failed checks, 1 pending reviewer, PR data stale; open thread",
    );
    expect(button.querySelector("[data-dockside-pr-insight-stale]")).not.toBeNull();
    expect(within(button).getByText("rate limited")).toBeTruthy();
  });

  it("shows a merged PR without counts", async () => {
    current = await renderRow({
      prSummary: summary({ pr: { number: 25392, url: pullRequest.url, state: "merged" } }),
    });

    expect(
      await current.findByRole("link", { name: /^MERGED pull request 25392/ }),
    ).toBeTruthy();
    expect(current.queryByRole("button", { name: /open thread$/ })).toBeNull();
  });

  it("falls back to the core PR data without a summary", async () => {
    current = await renderRow({});

    expect(
      await current.findByRole("link", { name: /^BLOCKED pull request 25392/ }),
    ).toBeTruthy();
    expect(current.queryByRole("button", { name: /open thread$/ })).toBeNull();
  });

  it("falls back to the core PR data when the summary is older than 1 hour", async () => {
    const updatedAt = new Date(Date.now() - 61 * 60_000).toISOString();
    current = await renderRow({ prSummary: summary({ updatedAt }) });

    expect(
      await current.findByRole("link", { name: /^BLOCKED pull request 25392/ }),
    ).toBeTruthy();
    expect(current.queryByRole("button", { name: /open thread$/ })).toBeNull();
  });

  it("opens the thread on click", async () => {
    current = await renderRow({ prSummary: summary() });
    fireEvent.click(await insightButton(current));

    expect(current.inspection.sidebarActionCalls).toContainEqual(
      expect.objectContaining({ method: "open", threadId: THREAD_ID }),
    );
  });

  it("picks up a new summary on the next minute tick", async () => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
    let metadata: Metadata = {};
    current = await renderRow(() => metadata);
    await current.findByRole("link", { name: /^BLOCKED pull request 25392/ });
    expect(current.queryByRole("button", { name: /open thread$/ })).toBeNull();

    metadata = { prSummary: summary() };
    await vi.advanceTimersByTimeAsync(60_000);

    expect(await insightButton(current)).toBeTruthy();
  });
});
