import assert from "node:assert/strict";
import { describe, it } from "node:test";
import type { PluginSidebarProject, PluginSidebarThread } from "@bb/plugin-sdk";
import { groupThreadsByProject } from "../lib/inbox.ts";
import { DAY_MS } from "../lib/thread-management.ts";
import { groupFamiliesByStatus } from "../lib/status-groups.ts";

function thread(overrides: Partial<PluginSidebarThread>): PluginSidebarThread {
  return {
    id: "thread",
    projectId: "project",
    title: "Thread",
    titleFallback: null,
    displayTitle: "Thread",
    lifecycleOwnerThreadId: null,
    sourceThreadId: null,
    status: "idle",
    runtimeStatus: "idle",
    queuedWork: "none",
    parentThreadId: null,
    sectionId: null,
    originKind: null,
    originPluginId: null,
    providerId: "codex",
    hasPendingInteraction: false,
    activity: { workflows: 0, backgroundAgents: 0, backgroundCommands: 0, planMode: 0, goals: 0 },
    indicator: "none",
    indicatorLabel: null,
    isUnread: false,
    isPinned: false,
    isArchived: false,
    pinnedAt: null,
    pinSortKey: null,
    archivedAt: null,
    href: "/thread",
    isHidden: false,
    environment: null,
    host: null,
    createdAt: 1,
    updatedAt: 1,
    lastReadAt: 1,
    latestAttentionAt: 1,
    ...overrides,
  };
}

const projects: PluginSidebarProject[] = [
  { id: "project", name: "Project", isPersonal: false, href: "", settingsHref: "" },
];

describe("groupFamiliesByStatus", () => {
  it("orders semantic sections, omits empty sections, and includes each family once", () => {
    const now = 10 * DAY_MS;
    const families = groupThreadsByProject(
      [
        thread({ id: "inactive", updatedAt: now }),
        thread({ id: "working", indicator: "runtime", updatedAt: now }),
        thread({ id: "needs", hasPendingInteraction: true, updatedAt: now }),
        thread({ id: "stale", updatedAt: now - 7 * DAY_MS }),
      ],
      projects,
    )[0]!.families;

    const groups = groupFamiliesByStatus(families, now);
    assert.deepEqual(groups.map((group) => group.kind), [
      "needs-you",
      "working",
      "inactive",
      "stale",
    ]);
    assert.deepEqual(
      groups.flatMap((group) => group.families.map((family) => family.root.id)),
      ["needs", "working", "inactive", "stale"],
    );
    assert.ok(groups.every((group) => group.presentation.kind === group.kind));
  });
});
