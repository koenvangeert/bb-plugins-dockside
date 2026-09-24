// Portable type declarations for `@get-bb/plugin-sdk`. Unpublished BB
// workspace contracts are flattened; public subpaths may reuse the
// package root without requiring any other @bb/* package.
//
// Confused by the API, or need a symbol that isn't here? Clone the BB repo
// and read the real source: https://github.com/get-bb/bb

import * as react from 'react';
import { ComponentType, ComponentPropsWithoutRef, CSSProperties, ReactNode } from 'react';
import * as z from 'zod';
import { z as z$1 } from 'zod';
import * as zod_v4_core from 'zod/v4/core';

/**
 * A value that survives a JSON round trip without coercion or data loss.
 *
 * Host boundaries still validate values at runtime because TypeScript cannot
 * exclude non-finite numbers and plugin bundles can bypass static types.
 */
type JsonValue$1 = string | number | boolean | null | JsonValue$1[] | {
    [key: string]: JsonValue$1;
};
/**
 * A `JsonValue` that is read-only at every depth. BB uses it for JSON
 * snapshots it deep-freezes before handing them to a plugin, where any write
 * throws at runtime.
 */
type ReadonlyJsonValue = string | number | boolean | null | readonly ReadonlyJsonValue[] | {
    readonly [key: string]: ReadonlyJsonValue;
};

/** A JSON-safe path segment reported by a Standard Schema validation issue. */
type PluginRpcIssuePathSegment = string | number;
/** Validator-neutral validation detail carried by an RPC error envelope. */
interface PluginRpcValidationIssue {
    message: string;
    path?: PluginRpcIssuePathSegment[];
}
/** Stable wire error categories for plugin RPC. */
type PluginRpcErrorCode = "handler_error" | "invalid_input" | "invalid_json" | "invalid_output" | "non_json_result" | "unknown_method";
/** Structured RPC failure returned as `{ ok: false, error }`. */
interface PluginRpcError {
    code: PluginRpcErrorCode;
    message: string;
    issues?: PluginRpcValidationIssue[];
}
/**
 * The validator-neutral subset of Standard Schema v1 used by plugin contracts.
 * Zod 4 schemas implement this interface directly; other validators can do
 * the same without becoming part of BB's public protocol.
 */
interface StandardSchemaV1<Input = unknown, Output = Input> {
    readonly "~standard": {
        readonly version: 1;
        readonly vendor: string;
        readonly validate: (value: unknown) => StandardSchemaV1Result<Output> | Promise<StandardSchemaV1Result<Output>>;
        readonly jsonSchema?: {
            readonly input: (options: {
                target: string;
            }) => Record<string, unknown>;
            readonly output: (options: {
                target: string;
            }) => Record<string, unknown>;
        };
        readonly types?: {
            readonly input: Input;
            readonly output: Output;
        };
    };
}
type StandardSchemaV1Result<Output> = {
    readonly value: Output;
    readonly issues?: undefined;
} | {
    readonly issues: readonly StandardSchemaV1Issue[];
};
interface StandardSchemaV1Issue {
    readonly message: string;
    readonly path?: PropertyKey | readonly (PropertyKey | {
        readonly key: PropertyKey;
    })[];
}
type StandardSchemaV1InferInput<Schema extends StandardSchemaV1> = NonNullable<Schema["~standard"]["types"]>["input"];
type StandardSchemaV1InferOutput<Schema extends StandardSchemaV1> = NonNullable<Schema["~standard"]["types"]>["output"];
interface PluginRpcMethodContract<InputSchema extends StandardSchemaV1 = StandardSchemaV1, OutputSchema extends StandardSchemaV1 = StandardSchemaV1> {
    readonly experimental_description?: string;
    readonly input: InputSchema;
    readonly output: OutputSchema;
}
type PluginRpcContract = Readonly<Record<string, PluginRpcMethodContract>>;
type PluginRpcHandlers<Contract extends PluginRpcContract> = {
    [Method in keyof Contract]: (input: StandardSchemaV1InferOutput<Contract[Method]["input"]>) => StandardSchemaV1InferInput<Contract[Method]["output"]> | Promise<StandardSchemaV1InferInput<Contract[Method]["output"]>>;
};
type PluginRpcCallInput<Method extends PluginRpcMethodContract> = StandardSchemaV1InferInput<Method["input"]>;
type PluginRpcCallArgs<Method extends PluginRpcMethodContract> = null extends PluginRpcCallInput<Method> ? [input?: PluginRpcCallInput<Method>] : [input: PluginRpcCallInput<Method>];
type PluginRpcResult<Method extends PluginRpcMethodContract> = StandardSchemaV1InferOutput<Method["output"]>;

declare const appSettingsSchema: z$1.ZodObject<{
    defaultMachineAccess: z$1.ZodNullable<z$1.ZodString>;
    defaultProviderId: z$1.ZodNullable<z$1.ZodString>;
    machineGitCredentialsEnabled: z$1.ZodBoolean;
    machineServerUrl: z$1.ZodNullable<z$1.ZodString>;
    managedBranchPrefix: z$1.ZodString;
    providerCompletedTurnDisplay: z$1.ZodRecord<z$1.ZodString, z$1.ZodEnum<{
        collapse: "collapse";
        flat: "flat";
    }>>;
    providerOrder: z$1.ZodArray<z$1.ZodString>;
    showDiagnosticEvents: z$1.ZodBoolean;
    showKeyboardHints: z$1.ZodBoolean;
    steerActiveThreadOnEnter: z$1.ZodBoolean;
    streamerMode: z$1.ZodBoolean;
    telemetryEnabled: z$1.ZodBoolean;
}, z$1.core.$strict>;
type AppSettings = z$1.infer<typeof appSettingsSchema>;
declare const appSettingsUpdateSchema: z$1.ZodUnion<readonly [z$1.ZodObject<{
    defaultMachineAccess: z$1.ZodNullable<z$1.ZodString>;
    defaultProviderId: z$1.ZodNullable<z$1.ZodString>;
    machineGitCredentialsEnabled: z$1.ZodBoolean;
    machineServerUrl: z$1.ZodNullable<z$1.ZodString>;
    managedBranchPrefix: z$1.ZodString;
    providerCompletedTurnDisplay: z$1.ZodRecord<z$1.ZodString, z$1.ZodEnum<{
        collapse: "collapse";
        flat: "flat";
    }>>;
    providerOrder: z$1.ZodArray<z$1.ZodString>;
    showDiagnosticEvents: z$1.ZodBoolean;
    showKeyboardHints: z$1.ZodBoolean;
    showUnhandledProviderEvents: z$1.ZodOptional<z$1.ZodBoolean>;
    steerActiveThreadOnEnter: z$1.ZodBoolean;
    streamerMode: z$1.ZodBoolean;
    telemetryEnabled: z$1.ZodOptional<z$1.ZodBoolean>;
}, z$1.core.$strict>, z$1.ZodObject<{
    defaultMachineAccess: z$1.ZodNullable<z$1.ZodString>;
    defaultProviderId: z$1.ZodNullable<z$1.ZodString>;
    machineGitCredentialsEnabled: z$1.ZodBoolean;
    machineServerUrl: z$1.ZodNullable<z$1.ZodString>;
    managedBranchPrefix: z$1.ZodString;
    providerCompletedTurnDisplay: z$1.ZodRecord<z$1.ZodString, z$1.ZodEnum<{
        collapse: "collapse";
        flat: "flat";
    }>>;
    providerOrder: z$1.ZodArray<z$1.ZodString>;
    showKeyboardHints: z$1.ZodBoolean;
    showUnhandledProviderEvents: z$1.ZodBoolean;
    steerActiveThreadOnEnter: z$1.ZodBoolean;
    streamerMode: z$1.ZodBoolean;
    telemetryEnabled: z$1.ZodOptional<z$1.ZodBoolean>;
}, z$1.core.$strict>]>;
type AppSettingsUpdate = z$1.infer<typeof appSettingsUpdateSchema>;

declare const UI_PREFERENCE_KEYS: readonly ["sidebar.organizationMode", "sidebar.threadGrouping.environment", "sidebar.chronologicalSort", "sidebar.sortDirection", "sidebar.sectionOrder", "sidebar.manualSectionOrder", "sidebar.machineSectionOrder", "sidebar.hiddenGroups", "sidebar.collapsedSections", "sidebar.collapsedProjects", "sidebar.collapsedThreads", "sidebar.collapsedEnvironments", "sidebar.collapsedThreadSections", "sidebar.collapsedMachines", "sidebar.footerOrder", "sidebar.hiddenFooterItems", "sidebar.pluginPanelOrder", "sidebar.visiblePluginPanels", "sidebar.navigationProvider", "sidebar.threadListProvider"];
type UiPreferenceKey = (typeof UI_PREFERENCE_KEYS)[number];
interface UiPreferenceDefinition<Schema extends z$1.ZodTypeAny = z$1.ZodTypeAny> {
    schema: Schema;
    defaultValue: z$1.infer<Schema>;
    description: string;
}
declare const uiPreferenceDefinitions: {
    readonly "sidebar.organizationMode": UiPreferenceDefinition<z$1.ZodEnum<{
        chronological: "chronological";
        machine: "machine";
        project: "project";
    }>>;
    readonly "sidebar.threadGrouping.environment": UiPreferenceDefinition<z$1.ZodUnion<readonly [z$1.ZodLiteral<"auto">, z$1.ZodBoolean]>>;
    readonly "sidebar.chronologicalSort": UiPreferenceDefinition<z$1.ZodEnum<{
        alpha: "alpha";
        created: "created";
        none: "none";
        updated: "updated";
    }>>;
    readonly "sidebar.sortDirection": UiPreferenceDefinition<z$1.ZodEnum<{
        ascending: "ascending";
        default: "default";
        descending: "descending";
    }>>;
    readonly "sidebar.sectionOrder": UiPreferenceDefinition<z$1.ZodArray<z$1.ZodString>>;
    readonly "sidebar.manualSectionOrder": UiPreferenceDefinition<z$1.ZodArray<z$1.ZodString>>;
    readonly "sidebar.machineSectionOrder": UiPreferenceDefinition<z$1.ZodArray<z$1.ZodString>>;
    readonly "sidebar.hiddenGroups": UiPreferenceDefinition<z$1.ZodPipe<z$1.ZodArray<z$1.ZodString>, z$1.ZodTransform<string[], string[]>>>;
    readonly "sidebar.collapsedSections": UiPreferenceDefinition<z$1.ZodArray<z$1.ZodEnum<{
        pinned: "pinned";
        threads: "threads";
    }>>>;
    readonly "sidebar.collapsedProjects": UiPreferenceDefinition<z$1.ZodArray<z$1.ZodString>>;
    readonly "sidebar.collapsedThreads": UiPreferenceDefinition<z$1.ZodArray<z$1.ZodString>>;
    readonly "sidebar.collapsedEnvironments": UiPreferenceDefinition<z$1.ZodArray<z$1.ZodString>>;
    readonly "sidebar.collapsedThreadSections": UiPreferenceDefinition<z$1.ZodArray<z$1.ZodString>>;
    readonly "sidebar.collapsedMachines": UiPreferenceDefinition<z$1.ZodArray<z$1.ZodString>>;
    readonly "sidebar.footerOrder": UiPreferenceDefinition<z$1.ZodArray<z$1.ZodString>>;
    readonly "sidebar.hiddenFooterItems": UiPreferenceDefinition<z$1.ZodArray<z$1.ZodString>>;
    readonly "sidebar.pluginPanelOrder": UiPreferenceDefinition<z$1.ZodArray<z$1.ZodString>>;
    readonly "sidebar.visiblePluginPanels": UiPreferenceDefinition<z$1.ZodNullable<z$1.ZodArray<z$1.ZodString>>>;
    readonly "sidebar.navigationProvider": UiPreferenceDefinition<z$1.ZodString>;
    readonly "sidebar.threadListProvider": UiPreferenceDefinition<z$1.ZodPipe<z$1.ZodString, z$1.ZodTransform<string, string>>>;
};
type UiPreferenceValue<Key extends UiPreferenceKey> = z$1.infer<(typeof uiPreferenceDefinitions)[Key]["schema"]>;
interface UiPreferenceEntry<Key extends UiPreferenceKey = UiPreferenceKey> {
    revision: number;
    value: UiPreferenceValue<Key>;
}
type UiPreferenceEntries = {
    [Key in UiPreferenceKey]: UiPreferenceEntry<Key>;
};

declare const appKeybindingOverridesSchema: z$1.ZodArray<z$1.ZodObject<{
    command: z$1.ZodUnion<readonly [z$1.ZodEnum<{
        "app.back": "app.back";
        "browser.find": "browser.find";
        "browser.focusLocation": "browser.focusLocation";
        "browser.reload": "browser.reload";
        "composer.focus": "composer.focus";
        "diff.toggle": "diff.toggle";
        "file.quickOpen": "file.quickOpen";
        "logs.openServerDaemon": "logs.openServerDaemon";
        "modelPicker.cycleModel": "modelPicker.cycleModel";
        "modelPicker.cycleModelBackward": "modelPicker.cycleModelBackward";
        "modelPicker.cycleProvider": "modelPicker.cycleProvider";
        "modelPicker.cycleProviderBackward": "modelPicker.cycleProviderBackward";
        "modelPicker.cycleReasoning": "modelPicker.cycleReasoning";
        "modelPicker.cycleReasoningBackward": "modelPicker.cycleReasoningBackward";
        "modelPicker.toggle": "modelPicker.toggle";
        "notifications.open": "notifications.open";
        "palette.open": "palette.open";
        "pane.close": "pane.close";
        "pane.focus.1": "pane.focus.1";
        "pane.focus.2": "pane.focus.2";
        "pane.focus.3": "pane.focus.3";
        "pane.focus.4": "pane.focus.4";
        "pane.focus.5": "pane.focus.5";
        "pane.focus.6": "pane.focus.6";
        "pane.focus.7": "pane.focus.7";
        "pane.focus.8": "pane.focus.8";
        "pane.focus.down": "pane.focus.down";
        "pane.focus.left": "pane.focus.left";
        "pane.focus.next": "pane.focus.next";
        "pane.focus.previous": "pane.focus.previous";
        "pane.focus.right": "pane.focus.right";
        "pane.focus.up": "pane.focus.up";
        "pane.maximize.toggle": "pane.maximize.toggle";
        "panel.close": "panel.close";
        "panel.newTab": "panel.newTab";
        "panel.nextNewTabItem": "panel.nextNewTabItem";
        "panel.nextTab": "panel.nextTab";
        "panel.previousNewTabItem": "panel.previousNewTabItem";
        "panel.previousTab": "panel.previousTab";
        "panel.reopenClosedTab": "panel.reopenClosedTab";
        "panel.toggle": "panel.toggle";
        "question.select.1": "question.select.1";
        "question.select.2": "question.select.2";
        "question.select.3": "question.select.3";
        "question.select.4": "question.select.4";
        "question.select.5": "question.select.5";
        "question.select.6": "question.select.6";
        "question.select.7": "question.select.7";
        "question.select.8": "question.select.8";
        "question.select.9": "question.select.9";
        "settings.open": "settings.open";
        "settings.openServers": "settings.openServers";
        "sidebar.toggle": "sidebar.toggle";
        "terminal.open": "terminal.open";
        "thread.archive": "thread.archive";
        "thread.jump.1": "thread.jump.1";
        "thread.jump.2": "thread.jump.2";
        "thread.jump.3": "thread.jump.3";
        "thread.jump.4": "thread.jump.4";
        "thread.jump.5": "thread.jump.5";
        "thread.jump.6": "thread.jump.6";
        "thread.jump.7": "thread.jump.7";
        "thread.jump.8": "thread.jump.8";
        "thread.jump.9": "thread.jump.9";
        "thread.new": "thread.new";
        "thread.next": "thread.next";
        "thread.previous": "thread.previous";
        "thread.rename": "thread.rename";
        "thread.search": "thread.search";
        "window.new": "window.new";
        "workspace.openPreferred": "workspace.openPreferred";
    }>, z$1.ZodTemplateLiteral<`plugin:${string}/${string}`>]>;
    shortcut: z$1.ZodNullable<z$1.ZodObject<{
        alt: z$1.ZodBoolean;
        control: z$1.ZodBoolean;
        key: z$1.ZodString;
        meta: z$1.ZodBoolean;
        mod: z$1.ZodBoolean;
        shift: z$1.ZodBoolean;
    }, z$1.core.$strict>>;
}, z$1.core.$strict>>;
type AppKeybindingOverrides = z$1.infer<typeof appKeybindingOverridesSchema>;

interface JsonObject {
    [key: string]: JsonValue;
}
type JsonValue = string | number | boolean | null | JsonValue[] | JsonObject;

declare const appThemeSchema: z$1.ZodObject<{
    customCss: z$1.ZodNullable<z$1.ZodString>;
    faviconColor: z$1.ZodEnum<{
        blue: "blue";
        default: "default";
        green: "green";
        orange: "orange";
        pink: "pink";
        purple: "purple";
        red: "red";
        teal: "teal";
        yellow: "yellow";
    }>;
    resolvedCodeTheme: z$1.ZodDefault<z$1.ZodObject<{
        dark: z$1.ZodString;
        files: z$1.ZodRecord<z$1.ZodString, z$1.ZodType<JsonObject, unknown, z$1.core.$ZodTypeInternals<JsonObject, unknown>>>;
        light: z$1.ZodString;
    }, z$1.core.$strict>>;
    themeId: z$1.ZodString;
}, z$1.core.$strip>;
type AppTheme = z$1.infer<typeof appThemeSchema>;
declare const appThemeSelectionSchema: z$1.ZodObject<{
    faviconColor: z$1.ZodEnum<{
        blue: "blue";
        default: "default";
        green: "green";
        orange: "orange";
        pink: "pink";
        purple: "purple";
        red: "red";
        teal: "teal";
        yellow: "yellow";
    }>;
    themeId: z$1.ZodString;
}, z$1.core.$strip>;
type AppThemeSelection = z$1.infer<typeof appThemeSelectionSchema>;

declare const changedMessageSchema: z$1.ZodDiscriminatedUnion<[z$1.ZodObject<{
    changes: z$1.ZodReadonly<z$1.ZodArray<z$1.ZodEnum<{
        "archived-changed": "archived-changed";
        "environment-changed": "environment-changed";
        "events-appended": "events-appended";
        "history-rewritten": "history-rewritten";
        "interactions-changed": "interactions-changed";
        "order-changed": "order-changed";
        "parent-changed": "parent-changed";
        "pin-state-changed": "pin-state-changed";
        "queue-changed": "queue-changed";
        "read-state-changed": "read-state-changed";
        "status-changed": "status-changed";
        "tabs-changed": "tabs-changed";
        "terminals-changed": "terminals-changed";
        "thread-created": "thread-created";
        "thread-deleted": "thread-deleted";
        "title-changed": "title-changed";
    }>>>;
    entity: z$1.ZodLiteral<"thread">;
    id: z$1.ZodOptional<z$1.ZodString>;
    metadata: z$1.ZodOptional<z$1.ZodObject<{
        backgroundActivityChanged: z$1.ZodOptional<z$1.ZodBoolean>;
        eventTypes: z$1.ZodOptional<z$1.ZodReadonly<z$1.ZodArray<z$1.ZodString & z$1.ZodType<"client/thread/start" | "client/turn/rejected" | "client/turn/requested" | "client/turn/start" | "item/agentMessage/delta" | "item/backgroundTask/completed" | "item/backgroundTask/progress" | "item/commandExecution/outputDelta" | "item/completed" | "item/delegation/completed" | "item/delegation/progress" | "item/fileChange/outputDelta" | "item/mcpToolCall/progress" | "item/plan/delta" | "item/reasoning/summaryTextDelta" | "item/reasoning/textDelta" | "item/started" | "item/toolCall/progress" | "provider.env-resolved" | "provider/error" | "provider/modelFallback" | "provider/rateLimits/updated" | "provider/unhandled" | "provider/warning" | "system/error" | "system/interaction/lifecycle" | "system/manager/user_message" | "system/operation" | "system/permissionGrant/lifecycle" | "system/provider-turn-watchdog" | "system/thread-provisioning" | "system/thread/interrupted" | "system/userQuestion/lifecycle" | "thread/compacted" | "thread/context/cleared" | "thread/contextWindowUsage/updated" | "thread/extensionState/updated" | "thread/goal/cleared" | "thread/goal/updated" | "thread/identity" | "thread/name/updated" | "thread/started" | "thread/tokenUsage/updated" | "turn/completed" | "turn/diff/updated" | "turn/input/accepted" | "turn/plan/updated" | "turn/started", string, z$1.core.$ZodTypeInternals<"client/thread/start" | "client/turn/rejected" | "client/turn/requested" | "client/turn/start" | "item/agentMessage/delta" | "item/backgroundTask/completed" | "item/backgroundTask/progress" | "item/commandExecution/outputDelta" | "item/completed" | "item/delegation/completed" | "item/delegation/progress" | "item/fileChange/outputDelta" | "item/mcpToolCall/progress" | "item/plan/delta" | "item/reasoning/summaryTextDelta" | "item/reasoning/textDelta" | "item/started" | "item/toolCall/progress" | "provider.env-resolved" | "provider/error" | "provider/modelFallback" | "provider/rateLimits/updated" | "provider/unhandled" | "provider/warning" | "system/error" | "system/interaction/lifecycle" | "system/manager/user_message" | "system/operation" | "system/permissionGrant/lifecycle" | "system/provider-turn-watchdog" | "system/thread-provisioning" | "system/thread/interrupted" | "system/userQuestion/lifecycle" | "thread/compacted" | "thread/context/cleared" | "thread/contextWindowUsage/updated" | "thread/extensionState/updated" | "thread/goal/cleared" | "thread/goal/updated" | "thread/identity" | "thread/name/updated" | "thread/started" | "thread/tokenUsage/updated" | "turn/completed" | "turn/diff/updated" | "turn/input/accepted" | "turn/plan/updated" | "turn/started", string>>>>>;
        hasPendingInteraction: z$1.ZodOptional<z$1.ZodBoolean>;
        projectId: z$1.ZodOptional<z$1.ZodString>;
        statusChange: z$1.ZodOptional<z$1.ZodObject<{
            activity: z$1.ZodObject<{
                activeBackgroundAgentCount: z$1.ZodNumber;
                activeBackgroundCommandCount: z$1.ZodNumber;
                activeGoalCount: z$1.ZodNumber;
                activePlanModeCount: z$1.ZodNumber;
                activeWorkflowCount: z$1.ZodNumber;
            }, z$1.core.$strip>;
            latestAttentionAt: z$1.ZodNumber;
            runtime: z$1.ZodObject<{
                displayStatus: z$1.ZodEnum<{
                    "host-reconnecting": "host-reconnecting";
                    "waiting-for-host": "waiting-for-host";
                    active: "active";
                    error: "error";
                    idle: "idle";
                    pending: "pending";
                    provisioning: "provisioning";
                    starting: "starting";
                    stopping: "stopping";
                }>;
                hostReconnectGraceExpiresAt: z$1.ZodNullable<z$1.ZodNumber>;
            }, z$1.core.$strip>;
            status: z$1.ZodEnum<{
                active: "active";
                error: "error";
                idle: "idle";
                pending: "pending";
                starting: "starting";
                stopping: "stopping";
            }>;
            updatedAt: z$1.ZodNumber;
        }, z$1.core.$strict>>;
    }, z$1.core.$strict>>;
    type: z$1.ZodLiteral<"changed">;
}, z$1.core.$strict>, z$1.ZodObject<{
    changes: z$1.ZodReadonly<z$1.ZodArray<z$1.ZodEnum<{
        "project-created": "project-created";
        "project-deleted": "project-deleted";
        "project-order-changed": "project-order-changed";
        "project-sources-changed": "project-sources-changed";
        "project-updated": "project-updated";
        "threads-changed": "threads-changed";
    }>>>;
    entity: z$1.ZodLiteral<"project">;
    id: z$1.ZodOptional<z$1.ZodString>;
    type: z$1.ZodLiteral<"changed">;
}, z$1.core.$strict>, z$1.ZodObject<{
    changes: z$1.ZodReadonly<z$1.ZodArray<z$1.ZodEnum<{
        "environment-created": "environment-created";
        "environment-deleted": "environment-deleted";
        "git-refs-changed": "git-refs-changed";
        "metadata-changed": "metadata-changed";
        "status-changed": "status-changed";
        "thread-storage-changed": "thread-storage-changed";
        "work-status-changed": "work-status-changed";
    }>>>;
    entity: z$1.ZodLiteral<"environment">;
    id: z$1.ZodOptional<z$1.ZodString>;
    type: z$1.ZodLiteral<"changed">;
}, z$1.core.$strict>, z$1.ZodObject<{
    changes: z$1.ZodReadonly<z$1.ZodArray<z$1.ZodEnum<{
        "host-connected": "host-connected";
        "host-disconnected": "host-disconnected";
        "provider-model-catalog-changed": "provider-model-catalog-changed";
    }>>>;
    entity: z$1.ZodLiteral<"host">;
    id: z$1.ZodOptional<z$1.ZodString>;
    type: z$1.ZodLiteral<"changed">;
}, z$1.core.$strict>, z$1.ZodObject<{
    changes: z$1.ZodReadonly<z$1.ZodArray<z$1.ZodEnum<{
        "config-changed": "config-changed";
        "environment-availability-changed": "environment-availability-changed";
        "plugins-changed": "plugins-changed";
        "provider-registrations-changed": "provider-registrations-changed";
        "server-move-changed": "server-move-changed";
        "ui-preferences-changed": "ui-preferences-changed";
    }>>>;
    entity: z$1.ZodLiteral<"system">;
    type: z$1.ZodLiteral<"changed">;
}, z$1.core.$strict>], "entity">;
type ChangedMessage = z$1.infer<typeof changedMessageSchema>;

declare const environmentStatusSchema: z$1.ZodEnum<{
    creating: "creating";
    destroyed: "destroyed";
    error: "error";
    provisioning: "provisioning";
    ready: "ready";
}>;
type EnvironmentStatus = z$1.infer<typeof environmentStatusSchema>;
declare const environmentWorkspaceDisplayKindSchema: z$1.ZodEnum<{
    "managed-worktree": "managed-worktree";
    "unmanaged-worktree": "unmanaged-worktree";
    other: "other";
}>;
type EnvironmentWorkspaceDisplayKind = z$1.infer<typeof environmentWorkspaceDisplayKindSchema>;
declare const environmentSchema: z$1.ZodObject<{
    baseBranch: z$1.ZodNullable<z$1.ZodString>;
    branchName: z$1.ZodNullable<z$1.ZodString>;
    createdAt: z$1.ZodNumber;
    defaultBranch: z$1.ZodNullable<z$1.ZodString>;
    environmentProviderId: z$1.ZodNullable<z$1.ZodString>;
    environmentProviderInstanceKey: z$1.ZodNullable<z$1.ZodString>;
    environmentProviderSelection: z$1.ZodNullable<z$1.ZodObject<{
        inputs: z$1.ZodNullable<z$1.ZodType<JsonValue, unknown, z$1.core.$ZodTypeInternals<JsonValue, unknown>>>;
        machine: z$1.ZodDiscriminatedUnion<[z$1.ZodObject<{
            hostId: z$1.ZodString;
            type: z$1.ZodLiteral<"existing">;
        }, z$1.core.$strip>, z$1.ZodObject<{
            inputs: z$1.ZodNullable<z$1.ZodType<JsonValue, unknown, z$1.core.$ZodTypeInternals<JsonValue, unknown>>>;
            machineProviderId: z$1.ZodString;
            type: z$1.ZodLiteral<"new">;
        }, z$1.core.$strip>], "type">;
    }, z$1.core.$strip>>;
    hostId: z$1.ZodString;
    id: z$1.ZodString;
    isGitRepo: z$1.ZodBoolean;
    isWorktree: z$1.ZodBoolean;
    lifecycle: z$1.ZodObject<{
        phase: z$1.ZodEnum<{
            active: "active";
            destroyed: "destroyed";
            retiring: "retiring";
            teardown: "teardown";
        }>;
        retireAt: z$1.ZodNullable<z$1.ZodNumber>;
        teardown: z$1.ZodNullable<z$1.ZodObject<{
            attempt: z$1.ZodNumber;
            message: z$1.ZodOptional<z$1.ZodString>;
            status: z$1.ZodEnum<{
                failed: "failed";
                removed: "removed";
                running: "running";
            }>;
        }, z$1.core.$strip>>;
    }, z$1.core.$strip>;
    managed: z$1.ZodBoolean;
    mergeBaseBranch: z$1.ZodNullable<z$1.ZodString>;
    name: z$1.ZodNullable<z$1.ZodString>;
    path: z$1.ZodNullable<z$1.ZodString>;
    projectId: z$1.ZodString;
    status: z$1.ZodEnum<{
        creating: "creating";
        destroyed: "destroyed";
        error: "error";
        provisioning: "provisioning";
        ready: "ready";
    }>;
    updatedAt: z$1.ZodNumber;
    workspaceProvisionType: z$1.ZodNullable<z$1.ZodEnum<{
        "managed-worktree": "managed-worktree";
        personal: "personal";
        unmanaged: "unmanaged";
    }>>;
}, z$1.core.$strip>;
type Environment = z$1.infer<typeof environmentSchema>;

declare const experimentsSchema: z$1.ZodRecord<z$1.ZodEnum<{
    changelogPreview: "changelogPreview";
    mobileApp: "mobileApp";
    multiMachinePicker: "multiMachinePicker";
    serverMove: "serverMove";
    sidebarProgressiveDisclosure: "sidebarProgressiveDisclosure";
    timelineWindowing: "timelineWindowing";
}>, z$1.ZodBoolean>;
type Experiments = z$1.infer<typeof experimentsSchema>;

declare const workspaceGitOperationSchema: z$1.ZodDiscriminatedUnion<[z$1.ZodObject<{
    kind: z$1.ZodLiteral<"none">;
}, z$1.core.$strip>, z$1.ZodObject<{
    hasConflicts: z$1.ZodBoolean;
    kind: z$1.ZodLiteral<"merge">;
}, z$1.core.$strip>, z$1.ZodObject<{
    hasConflicts: z$1.ZodBoolean;
    kind: z$1.ZodLiteral<"rebase">;
}, z$1.core.$strip>, z$1.ZodObject<{
    hasConflicts: z$1.ZodBoolean;
    kind: z$1.ZodLiteral<"cherry-pick">;
}, z$1.core.$strip>, z$1.ZodObject<{
    hasConflicts: z$1.ZodBoolean;
    kind: z$1.ZodLiteral<"revert">;
}, z$1.core.$strip>, z$1.ZodObject<{
    hasConflicts: z$1.ZodBoolean;
    kind: z$1.ZodLiteral<"unknown">;
    reason: z$1.ZodString;
}, z$1.core.$strip>], "kind">;
type WorkspaceGitOperation = z$1.infer<typeof workspaceGitOperationSchema>;

declare const hostSchema: z$1.ZodObject<{
    createdAt: z$1.ZodNumber;
    id: z$1.ZodString;
    lastRejectedProtocolVersion: z$1.ZodNullable<z$1.ZodNumber>;
    lastSeenAt: z$1.ZodNullable<z$1.ZodNumber>;
    lifecycle: z$1.ZodObject<{
        message: z$1.ZodNullable<z$1.ZodString>;
        pendingLog: z$1.ZodString;
        phase: z$1.ZodEnum<{
            active: "active";
            creating: "creating";
            destroyed: "destroyed";
            removing: "removing";
            resuming: "resuming";
            suspended: "suspended";
            suspending: "suspending";
        }>;
        suspendedAt: z$1.ZodNullable<z$1.ZodNumber>;
        teardown: z$1.ZodNullable<z$1.ZodObject<{
            attempt: z$1.ZodNumber;
            status: z$1.ZodEnum<{
                failed: "failed";
                removed: "removed";
                running: "running";
            }>;
        }, z$1.core.$strip>>;
    }, z$1.core.$strip>;
    machineProviderId: z$1.ZodNullable<z$1.ZodString>;
    maxPermissionMode: z$1.ZodEnum<{
        "accept-edits": "accept-edits";
        auto: "auto";
        full: "full";
    }>;
    name: z$1.ZodString;
    status: z$1.ZodEnum<{
        connected: "connected";
        disconnected: "disconnected";
    }>;
    type: z$1.ZodEnum<{
        ephemeral: "ephemeral";
        persistent: "persistent";
    }>;
    updatedAt: z$1.ZodNumber;
}, z$1.core.$strip>;
type Host = z$1.infer<typeof hostSchema>;

declare const threadEventItemPresentationSchema: z$1.ZodObject<{
    badge: z$1.ZodOptional<z$1.ZodObject<{
        glyph: z$1.ZodString;
        hint: z$1.ZodString;
        label: z$1.ZodString;
        tone: z$1.ZodEnum<{
            destructive: "destructive";
            neutral: "neutral";
        }>;
    }, z$1.core.$strip>>;
    detail: z$1.ZodOptional<z$1.ZodString>;
    icon: z$1.ZodObject<{
        glyph: z$1.ZodString;
    }, z$1.core.$strip>;
    label: z$1.ZodObject<{
        completed: z$1.ZodString;
        pending: z$1.ZodString;
    }, z$1.core.$strip>;
    suppress: z$1.ZodOptional<z$1.ZodBoolean>;
    tint: z$1.ZodOptional<z$1.ZodObject<{
        dark: z$1.ZodString;
        light: z$1.ZodString;
    }, z$1.core.$strip>>;
    title: z$1.ZodOptional<z$1.ZodString>;
}, z$1.core.$strip>;
type ThreadEventItemPresentation = z$1.infer<typeof threadEventItemPresentationSchema>;

declare const threadEventSchema: z$1.ZodPipe<z$1.ZodUnknown, z$1.ZodUnion<readonly [z$1.ZodIntersection<z$1.ZodDiscriminatedUnion<[z$1.ZodObject<{
    threadId: z$1.ZodString;
    type: z$1.ZodLiteral<"thread/started">;
}, z$1.core.$strip>, z$1.ZodObject<{
    providerThreadId: z$1.ZodString;
    threadId: z$1.ZodString;
    type: z$1.ZodLiteral<"thread/identity">;
}, z$1.core.$strip>, z$1.ZodObject<{
    parentToolCallId: z$1.ZodOptional<z$1.ZodString>;
    providerThreadId: z$1.ZodString;
    threadId: z$1.ZodString;
    type: z$1.ZodLiteral<"turn/started">;
}, z$1.core.$strip>, z$1.ZodObject<{
    error: z$1.ZodOptional<z$1.ZodObject<{
        message: z$1.ZodString;
    }, z$1.core.$strip>>;
    providerCheckpointId: z$1.ZodOptional<z$1.ZodString>;
    providerThreadId: z$1.ZodNullable<z$1.ZodString>;
    status: z$1.ZodEnum<{
        completed: "completed";
        failed: "failed";
        interrupted: "interrupted";
    }>;
    threadId: z$1.ZodString;
    type: z$1.ZodLiteral<"turn/completed">;
}, z$1.core.$strip>, z$1.ZodObject<{
    clientRequestId: z$1.ZodString;
    providerThreadId: z$1.ZodString;
    scope: z$1.ZodDiscriminatedUnion<[z$1.ZodObject<{
        kind: z$1.ZodLiteral<"thread">;
    }, z$1.core.$strip>, z$1.ZodObject<{
        kind: z$1.ZodLiteral<"turn">;
        turnId: z$1.ZodString;
    }, z$1.core.$strip>], "kind">;
    threadId: z$1.ZodString;
    type: z$1.ZodLiteral<"turn/input/accepted">;
}, z$1.core.$strict>, z$1.ZodObject<{
    providerThreadId: z$1.ZodString;
    threadId: z$1.ZodString;
    threadName: z$1.ZodString;
    type: z$1.ZodLiteral<"thread/name/updated">;
}, z$1.core.$strip>, z$1.ZodObject<{
    providerThreadId: z$1.ZodString;
    threadId: z$1.ZodString;
    type: z$1.ZodLiteral<"thread/compacted">;
}, z$1.core.$strip>, z$1.ZodObject<{
    providerThreadId: z$1.ZodString;
    threadId: z$1.ZodString;
    type: z$1.ZodLiteral<"thread/context/cleared">;
}, z$1.core.$strip>, z$1.ZodObject<{
    objective: z$1.ZodString;
    providerThreadId: z$1.ZodString;
    status: z$1.ZodEnum<{
        active: "active";
        budgetLimited: "budgetLimited";
        complete: "complete";
        paused: "paused";
    }>;
    threadId: z$1.ZodString;
    timeUsedSeconds: z$1.ZodNumber;
    tokenBudget: z$1.ZodNullable<z$1.ZodNumber>;
    tokensUsed: z$1.ZodNumber;
    type: z$1.ZodLiteral<"thread/goal/updated">;
}, z$1.core.$strip>, z$1.ZodObject<{
    providerThreadId: z$1.ZodString;
    threadId: z$1.ZodString;
    type: z$1.ZodLiteral<"thread/goal/cleared">;
}, z$1.core.$strip>, z$1.ZodObject<{
    item: z$1.ZodDiscriminatedUnion<[z$1.ZodObject<{
        clientRequestId: z$1.ZodOptional<z$1.ZodString>;
        content: z$1.ZodArray<z$1.ZodDiscriminatedUnion<[z$1.ZodObject<{
            text: z$1.ZodString;
            type: z$1.ZodLiteral<"text">;
        }, z$1.core.$strip>, z$1.ZodObject<{
            type: z$1.ZodLiteral<"image">;
            url: z$1.ZodString;
        }, z$1.core.$strip>, z$1.ZodObject<{
            path: z$1.ZodString;
            type: z$1.ZodLiteral<"localImage">;
        }, z$1.core.$strip>, z$1.ZodObject<{
            path: z$1.ZodString;
            type: z$1.ZodLiteral<"localFile">;
        }, z$1.core.$strip>], "type">>;
        id: z$1.ZodString;
        parentToolCallId: z$1.ZodOptional<z$1.ZodString>;
        type: z$1.ZodLiteral<"userMessage">;
    }, z$1.core.$strict>, z$1.ZodObject<{
        id: z$1.ZodString;
        parentToolCallId: z$1.ZodOptional<z$1.ZodString>;
        presentation: z$1.ZodOptional<z$1.ZodObject<{
            badge: z$1.ZodOptional<z$1.ZodObject<{
                glyph: z$1.ZodString;
                hint: z$1.ZodString;
                label: z$1.ZodString;
                tone: z$1.ZodEnum<{
                    destructive: "destructive";
                    neutral: "neutral";
                }>;
            }, z$1.core.$strip>>;
            detail: z$1.ZodOptional<z$1.ZodString>;
            icon: z$1.ZodObject<{
                glyph: z$1.ZodString;
            }, z$1.core.$strip>;
            label: z$1.ZodObject<{
                completed: z$1.ZodString;
                pending: z$1.ZodString;
            }, z$1.core.$strip>;
            suppress: z$1.ZodOptional<z$1.ZodBoolean>;
            tint: z$1.ZodOptional<z$1.ZodObject<{
                dark: z$1.ZodString;
                light: z$1.ZodString;
            }, z$1.core.$strip>>;
            title: z$1.ZodOptional<z$1.ZodString>;
        }, z$1.core.$strip>>;
        text: z$1.ZodString;
        type: z$1.ZodLiteral<"agentMessage">;
    }, z$1.core.$strip>, z$1.ZodObject<{
        aggregatedOutput: z$1.ZodOptional<z$1.ZodString>;
        approvalStatus: z$1.ZodNullable<z$1.ZodEnum<{
            denied: "denied";
            waiting_for_approval: "waiting_for_approval";
        }>>;
        command: z$1.ZodString;
        cwd: z$1.ZodString;
        durationMs: z$1.ZodOptional<z$1.ZodNumber>;
        exitCode: z$1.ZodOptional<z$1.ZodNumber>;
        id: z$1.ZodString;
        parentToolCallId: z$1.ZodOptional<z$1.ZodString>;
        presentation: z$1.ZodOptional<z$1.ZodObject<{
            badge: z$1.ZodOptional<z$1.ZodObject<{
                glyph: z$1.ZodString;
                hint: z$1.ZodString;
                label: z$1.ZodString;
                tone: z$1.ZodEnum<{
                    destructive: "destructive";
                    neutral: "neutral";
                }>;
            }, z$1.core.$strip>>;
            detail: z$1.ZodOptional<z$1.ZodString>;
            icon: z$1.ZodObject<{
                glyph: z$1.ZodString;
            }, z$1.core.$strip>;
            label: z$1.ZodObject<{
                completed: z$1.ZodString;
                pending: z$1.ZodString;
            }, z$1.core.$strip>;
            suppress: z$1.ZodOptional<z$1.ZodBoolean>;
            tint: z$1.ZodOptional<z$1.ZodObject<{
                dark: z$1.ZodString;
                light: z$1.ZodString;
            }, z$1.core.$strip>>;
            title: z$1.ZodOptional<z$1.ZodString>;
        }, z$1.core.$strip>>;
        status: z$1.ZodEnum<{
            completed: "completed";
            failed: "failed";
            interrupted: "interrupted";
            pending: "pending";
        }>;
        truncation: z$1.ZodOptional<z$1.ZodObject<{
            aggregatedOutput: z$1.ZodOptional<z$1.ZodObject<{
                originalLength: z$1.ZodNumber;
                retainedHeadLength: z$1.ZodNumber;
                retainedTailLength: z$1.ZodNumber;
                truncatedAt: z$1.ZodNumber;
            }, z$1.core.$strip>>;
            result: z$1.ZodOptional<z$1.ZodObject<{
                originalLength: z$1.ZodNumber;
                retainedHeadLength: z$1.ZodNumber;
                retainedTailLength: z$1.ZodNumber;
                truncatedAt: z$1.ZodNumber;
            }, z$1.core.$strip>>;
            resultText: z$1.ZodOptional<z$1.ZodObject<{
                originalLength: z$1.ZodNumber;
                retainedHeadLength: z$1.ZodNumber;
                retainedTailLength: z$1.ZodNumber;
                truncatedAt: z$1.ZodNumber;
            }, z$1.core.$strip>>;
        }, z$1.core.$strip>>;
        type: z$1.ZodLiteral<"commandExecution">;
    }, z$1.core.$strip>, z$1.ZodObject<{
        approvalStatus: z$1.ZodNullable<z$1.ZodEnum<{
            denied: "denied";
            waiting_for_approval: "waiting_for_approval";
        }>>;
        changes: z$1.ZodArray<z$1.ZodObject<{
            diff: z$1.ZodOptional<z$1.ZodString>;
            kind: z$1.ZodEnum<{
                add: "add";
                delete: "delete";
                update: "update";
            }>;
            movePath: z$1.ZodOptional<z$1.ZodString>;
            path: z$1.ZodString;
        }, z$1.core.$strip>>;
        id: z$1.ZodString;
        parentToolCallId: z$1.ZodOptional<z$1.ZodString>;
        presentation: z$1.ZodOptional<z$1.ZodObject<{
            badge: z$1.ZodOptional<z$1.ZodObject<{
                glyph: z$1.ZodString;
                hint: z$1.ZodString;
                label: z$1.ZodString;
                tone: z$1.ZodEnum<{
                    destructive: "destructive";
                    neutral: "neutral";
                }>;
            }, z$1.core.$strip>>;
            detail: z$1.ZodOptional<z$1.ZodString>;
            icon: z$1.ZodObject<{
                glyph: z$1.ZodString;
            }, z$1.core.$strip>;
            label: z$1.ZodObject<{
                completed: z$1.ZodString;
                pending: z$1.ZodString;
            }, z$1.core.$strip>;
            suppress: z$1.ZodOptional<z$1.ZodBoolean>;
            tint: z$1.ZodOptional<z$1.ZodObject<{
                dark: z$1.ZodString;
                light: z$1.ZodString;
            }, z$1.core.$strip>>;
            title: z$1.ZodOptional<z$1.ZodString>;
        }, z$1.core.$strip>>;
        status: z$1.ZodEnum<{
            completed: "completed";
            failed: "failed";
            interrupted: "interrupted";
            pending: "pending";
        }>;
        type: z$1.ZodLiteral<"fileChange">;
    }, z$1.core.$strip>, z$1.ZodObject<{
        id: z$1.ZodString;
        parentToolCallId: z$1.ZodOptional<z$1.ZodString>;
        presentation: z$1.ZodOptional<z$1.ZodObject<{
            badge: z$1.ZodOptional<z$1.ZodObject<{
                glyph: z$1.ZodString;
                hint: z$1.ZodString;
                label: z$1.ZodString;
                tone: z$1.ZodEnum<{
                    destructive: "destructive";
                    neutral: "neutral";
                }>;
            }, z$1.core.$strip>>;
            detail: z$1.ZodOptional<z$1.ZodString>;
            icon: z$1.ZodObject<{
                glyph: z$1.ZodString;
            }, z$1.core.$strip>;
            label: z$1.ZodObject<{
                completed: z$1.ZodString;
                pending: z$1.ZodString;
            }, z$1.core.$strip>;
            suppress: z$1.ZodOptional<z$1.ZodBoolean>;
            tint: z$1.ZodOptional<z$1.ZodObject<{
                dark: z$1.ZodString;
                light: z$1.ZodString;
            }, z$1.core.$strip>>;
            title: z$1.ZodOptional<z$1.ZodString>;
        }, z$1.core.$strip>>;
        queries: z$1.ZodArray<z$1.ZodString>;
        resultText: z$1.ZodNullable<z$1.ZodString>;
        type: z$1.ZodLiteral<"webSearch">;
    }, z$1.core.$strip>, z$1.ZodObject<{
        id: z$1.ZodString;
        parentToolCallId: z$1.ZodOptional<z$1.ZodString>;
        pattern: z$1.ZodNullable<z$1.ZodString>;
        presentation: z$1.ZodOptional<z$1.ZodObject<{
            badge: z$1.ZodOptional<z$1.ZodObject<{
                glyph: z$1.ZodString;
                hint: z$1.ZodString;
                label: z$1.ZodString;
                tone: z$1.ZodEnum<{
                    destructive: "destructive";
                    neutral: "neutral";
                }>;
            }, z$1.core.$strip>>;
            detail: z$1.ZodOptional<z$1.ZodString>;
            icon: z$1.ZodObject<{
                glyph: z$1.ZodString;
            }, z$1.core.$strip>;
            label: z$1.ZodObject<{
                completed: z$1.ZodString;
                pending: z$1.ZodString;
            }, z$1.core.$strip>;
            suppress: z$1.ZodOptional<z$1.ZodBoolean>;
            tint: z$1.ZodOptional<z$1.ZodObject<{
                dark: z$1.ZodString;
                light: z$1.ZodString;
            }, z$1.core.$strip>>;
            title: z$1.ZodOptional<z$1.ZodString>;
        }, z$1.core.$strip>>;
        prompt: z$1.ZodNullable<z$1.ZodString>;
        resultText: z$1.ZodNullable<z$1.ZodString>;
        type: z$1.ZodLiteral<"webFetch">;
        url: z$1.ZodString;
    }, z$1.core.$strip>, z$1.ZodObject<{
        id: z$1.ZodString;
        parentToolCallId: z$1.ZodOptional<z$1.ZodString>;
        path: z$1.ZodString;
        presentation: z$1.ZodOptional<z$1.ZodObject<{
            badge: z$1.ZodOptional<z$1.ZodObject<{
                glyph: z$1.ZodString;
                hint: z$1.ZodString;
                label: z$1.ZodString;
                tone: z$1.ZodEnum<{
                    destructive: "destructive";
                    neutral: "neutral";
                }>;
            }, z$1.core.$strip>>;
            detail: z$1.ZodOptional<z$1.ZodString>;
            icon: z$1.ZodObject<{
                glyph: z$1.ZodString;
            }, z$1.core.$strip>;
            label: z$1.ZodObject<{
                completed: z$1.ZodString;
                pending: z$1.ZodString;
            }, z$1.core.$strip>;
            suppress: z$1.ZodOptional<z$1.ZodBoolean>;
            tint: z$1.ZodOptional<z$1.ZodObject<{
                dark: z$1.ZodString;
                light: z$1.ZodString;
            }, z$1.core.$strip>>;
            title: z$1.ZodOptional<z$1.ZodString>;
        }, z$1.core.$strip>>;
        type: z$1.ZodLiteral<"imageView">;
    }, z$1.core.$strip>, z$1.ZodObject<{
        error: z$1.ZodNullable<z$1.ZodString>;
        id: z$1.ZodString;
        parentToolCallId: z$1.ZodOptional<z$1.ZodString>;
        path: z$1.ZodNullable<z$1.ZodString>;
        presentation: z$1.ZodOptional<z$1.ZodObject<{
            badge: z$1.ZodOptional<z$1.ZodObject<{
                glyph: z$1.ZodString;
                hint: z$1.ZodString;
                label: z$1.ZodString;
                tone: z$1.ZodEnum<{
                    destructive: "destructive";
                    neutral: "neutral";
                }>;
            }, z$1.core.$strip>>;
            detail: z$1.ZodOptional<z$1.ZodString>;
            icon: z$1.ZodObject<{
                glyph: z$1.ZodString;
            }, z$1.core.$strip>;
            label: z$1.ZodObject<{
                completed: z$1.ZodString;
                pending: z$1.ZodString;
            }, z$1.core.$strip>;
            suppress: z$1.ZodOptional<z$1.ZodBoolean>;
            tint: z$1.ZodOptional<z$1.ZodObject<{
                dark: z$1.ZodString;
                light: z$1.ZodString;
            }, z$1.core.$strip>>;
            title: z$1.ZodOptional<z$1.ZodString>;
        }, z$1.core.$strip>>;
        prompt: z$1.ZodNullable<z$1.ZodString>;
        result: z$1.ZodOptional<z$1.ZodString>;
        status: z$1.ZodEnum<{
            completed: "completed";
            failed: "failed";
            interrupted: "interrupted";
            pending: "pending";
        }>;
        transparentBackground: z$1.ZodBoolean;
        truncation: z$1.ZodOptional<z$1.ZodObject<{
            aggregatedOutput: z$1.ZodOptional<z$1.ZodObject<{
                originalLength: z$1.ZodNumber;
                retainedHeadLength: z$1.ZodNumber;
                retainedTailLength: z$1.ZodNumber;
                truncatedAt: z$1.ZodNumber;
            }, z$1.core.$strip>>;
            result: z$1.ZodOptional<z$1.ZodObject<{
                originalLength: z$1.ZodNumber;
                retainedHeadLength: z$1.ZodNumber;
                retainedTailLength: z$1.ZodNumber;
                truncatedAt: z$1.ZodNumber;
            }, z$1.core.$strip>>;
            resultText: z$1.ZodOptional<z$1.ZodObject<{
                originalLength: z$1.ZodNumber;
                retainedHeadLength: z$1.ZodNumber;
                retainedTailLength: z$1.ZodNumber;
                truncatedAt: z$1.ZodNumber;
            }, z$1.core.$strip>>;
        }, z$1.core.$strip>>;
        type: z$1.ZodLiteral<"imageGeneration">;
    }, z$1.core.$strip>, z$1.ZodObject<{
        cmd: z$1.ZodOptional<z$1.ZodString>;
        id: z$1.ZodString;
        parentToolCallId: z$1.ZodOptional<z$1.ZodString>;
        path: z$1.ZodString;
        presentation: z$1.ZodOptional<z$1.ZodObject<{
            badge: z$1.ZodOptional<z$1.ZodObject<{
                glyph: z$1.ZodString;
                hint: z$1.ZodString;
                label: z$1.ZodString;
                tone: z$1.ZodEnum<{
                    destructive: "destructive";
                    neutral: "neutral";
                }>;
            }, z$1.core.$strip>>;
            detail: z$1.ZodOptional<z$1.ZodString>;
            icon: z$1.ZodObject<{
                glyph: z$1.ZodString;
            }, z$1.core.$strip>;
            label: z$1.ZodObject<{
                completed: z$1.ZodString;
                pending: z$1.ZodString;
            }, z$1.core.$strip>;
            suppress: z$1.ZodOptional<z$1.ZodBoolean>;
            tint: z$1.ZodOptional<z$1.ZodObject<{
                dark: z$1.ZodString;
                light: z$1.ZodString;
            }, z$1.core.$strip>>;
            title: z$1.ZodOptional<z$1.ZodString>;
        }, z$1.core.$strip>>;
        status: z$1.ZodEnum<{
            completed: "completed";
            failed: "failed";
            interrupted: "interrupted";
            pending: "pending";
        }>;
        type: z$1.ZodLiteral<"fileRead">;
    }, z$1.core.$strip>, z$1.ZodObject<{
        cmd: z$1.ZodOptional<z$1.ZodString>;
        id: z$1.ZodString;
        mode: z$1.ZodEnum<{
            content: "content";
            list: "list";
            path: "path";
        }>;
        parentToolCallId: z$1.ZodOptional<z$1.ZodString>;
        path: z$1.ZodOptional<z$1.ZodString>;
        presentation: z$1.ZodOptional<z$1.ZodObject<{
            badge: z$1.ZodOptional<z$1.ZodObject<{
                glyph: z$1.ZodString;
                hint: z$1.ZodString;
                label: z$1.ZodString;
                tone: z$1.ZodEnum<{
                    destructive: "destructive";
                    neutral: "neutral";
                }>;
            }, z$1.core.$strip>>;
            detail: z$1.ZodOptional<z$1.ZodString>;
            icon: z$1.ZodObject<{
                glyph: z$1.ZodString;
            }, z$1.core.$strip>;
            label: z$1.ZodObject<{
                completed: z$1.ZodString;
                pending: z$1.ZodString;
            }, z$1.core.$strip>;
            suppress: z$1.ZodOptional<z$1.ZodBoolean>;
            tint: z$1.ZodOptional<z$1.ZodObject<{
                dark: z$1.ZodString;
                light: z$1.ZodString;
            }, z$1.core.$strip>>;
            title: z$1.ZodOptional<z$1.ZodString>;
        }, z$1.core.$strip>>;
        query: z$1.ZodString;
        status: z$1.ZodEnum<{
            completed: "completed";
            failed: "failed";
            interrupted: "interrupted";
            pending: "pending";
        }>;
        type: z$1.ZodLiteral<"search">;
    }, z$1.core.$strip>, z$1.ZodObject<{
        arguments: z$1.ZodOptional<z$1.ZodRecord<z$1.ZodString, z$1.ZodUnknown>>;
        durationMs: z$1.ZodOptional<z$1.ZodNumber>;
        error: z$1.ZodOptional<z$1.ZodString>;
        id: z$1.ZodString;
        parentToolCallId: z$1.ZodOptional<z$1.ZodString>;
        presentation: z$1.ZodOptional<z$1.ZodObject<{
            badge: z$1.ZodOptional<z$1.ZodObject<{
                glyph: z$1.ZodString;
                hint: z$1.ZodString;
                label: z$1.ZodString;
                tone: z$1.ZodEnum<{
                    destructive: "destructive";
                    neutral: "neutral";
                }>;
            }, z$1.core.$strip>>;
            detail: z$1.ZodOptional<z$1.ZodString>;
            icon: z$1.ZodObject<{
                glyph: z$1.ZodString;
            }, z$1.core.$strip>;
            label: z$1.ZodObject<{
                completed: z$1.ZodString;
                pending: z$1.ZodString;
            }, z$1.core.$strip>;
            suppress: z$1.ZodOptional<z$1.ZodBoolean>;
            tint: z$1.ZodOptional<z$1.ZodObject<{
                dark: z$1.ZodString;
                light: z$1.ZodString;
            }, z$1.core.$strip>>;
            title: z$1.ZodOptional<z$1.ZodString>;
        }, z$1.core.$strip>>;
        result: z$1.ZodOptional<z$1.ZodUnknown>;
        server: z$1.ZodOptional<z$1.ZodString>;
        status: z$1.ZodEnum<{
            completed: "completed";
            failed: "failed";
            interrupted: "interrupted";
            pending: "pending";
        }>;
        tool: z$1.ZodString;
        truncation: z$1.ZodOptional<z$1.ZodObject<{
            aggregatedOutput: z$1.ZodOptional<z$1.ZodObject<{
                originalLength: z$1.ZodNumber;
                retainedHeadLength: z$1.ZodNumber;
                retainedTailLength: z$1.ZodNumber;
                truncatedAt: z$1.ZodNumber;
            }, z$1.core.$strip>>;
            result: z$1.ZodOptional<z$1.ZodObject<{
                originalLength: z$1.ZodNumber;
                retainedHeadLength: z$1.ZodNumber;
                retainedTailLength: z$1.ZodNumber;
                truncatedAt: z$1.ZodNumber;
            }, z$1.core.$strip>>;
            resultText: z$1.ZodOptional<z$1.ZodObject<{
                originalLength: z$1.ZodNumber;
                retainedHeadLength: z$1.ZodNumber;
                retainedTailLength: z$1.ZodNumber;
                truncatedAt: z$1.ZodNumber;
            }, z$1.core.$strip>>;
        }, z$1.core.$strip>>;
        type: z$1.ZodLiteral<"toolCall">;
    }, z$1.core.$strip>, z$1.ZodObject<{
        content: z$1.ZodArray<z$1.ZodString>;
        id: z$1.ZodString;
        parentToolCallId: z$1.ZodOptional<z$1.ZodString>;
        presentation: z$1.ZodOptional<z$1.ZodObject<{
            badge: z$1.ZodOptional<z$1.ZodObject<{
                glyph: z$1.ZodString;
                hint: z$1.ZodString;
                label: z$1.ZodString;
                tone: z$1.ZodEnum<{
                    destructive: "destructive";
                    neutral: "neutral";
                }>;
            }, z$1.core.$strip>>;
            detail: z$1.ZodOptional<z$1.ZodString>;
            icon: z$1.ZodObject<{
                glyph: z$1.ZodString;
            }, z$1.core.$strip>;
            label: z$1.ZodObject<{
                completed: z$1.ZodString;
                pending: z$1.ZodString;
            }, z$1.core.$strip>;
            suppress: z$1.ZodOptional<z$1.ZodBoolean>;
            tint: z$1.ZodOptional<z$1.ZodObject<{
                dark: z$1.ZodString;
                light: z$1.ZodString;
            }, z$1.core.$strip>>;
            title: z$1.ZodOptional<z$1.ZodString>;
        }, z$1.core.$strip>>;
        summary: z$1.ZodArray<z$1.ZodString>;
        type: z$1.ZodLiteral<"reasoning">;
    }, z$1.core.$strip>, z$1.ZodObject<{
        id: z$1.ZodString;
        parentToolCallId: z$1.ZodOptional<z$1.ZodString>;
        presentation: z$1.ZodOptional<z$1.ZodObject<{
            badge: z$1.ZodOptional<z$1.ZodObject<{
                glyph: z$1.ZodString;
                hint: z$1.ZodString;
                label: z$1.ZodString;
                tone: z$1.ZodEnum<{
                    destructive: "destructive";
                    neutral: "neutral";
                }>;
            }, z$1.core.$strip>>;
            detail: z$1.ZodOptional<z$1.ZodString>;
            icon: z$1.ZodObject<{
                glyph: z$1.ZodString;
            }, z$1.core.$strip>;
            label: z$1.ZodObject<{
                completed: z$1.ZodString;
                pending: z$1.ZodString;
            }, z$1.core.$strip>;
            suppress: z$1.ZodOptional<z$1.ZodBoolean>;
            tint: z$1.ZodOptional<z$1.ZodObject<{
                dark: z$1.ZodString;
                light: z$1.ZodString;
            }, z$1.core.$strip>>;
            title: z$1.ZodOptional<z$1.ZodString>;
        }, z$1.core.$strip>>;
        text: z$1.ZodString;
        type: z$1.ZodLiteral<"plan">;
    }, z$1.core.$strip>, z$1.ZodObject<{
        explanation: z$1.ZodOptional<z$1.ZodString>;
        id: z$1.ZodString;
        parentToolCallId: z$1.ZodOptional<z$1.ZodString>;
        presentation: z$1.ZodOptional<z$1.ZodObject<{
            badge: z$1.ZodOptional<z$1.ZodObject<{
                glyph: z$1.ZodString;
                hint: z$1.ZodString;
                label: z$1.ZodString;
                tone: z$1.ZodEnum<{
                    destructive: "destructive";
                    neutral: "neutral";
                }>;
            }, z$1.core.$strip>>;
            detail: z$1.ZodOptional<z$1.ZodString>;
            icon: z$1.ZodObject<{
                glyph: z$1.ZodString;
            }, z$1.core.$strip>;
            label: z$1.ZodObject<{
                completed: z$1.ZodString;
                pending: z$1.ZodString;
            }, z$1.core.$strip>;
            suppress: z$1.ZodOptional<z$1.ZodBoolean>;
            tint: z$1.ZodOptional<z$1.ZodObject<{
                dark: z$1.ZodString;
                light: z$1.ZodString;
            }, z$1.core.$strip>>;
            title: z$1.ZodOptional<z$1.ZodString>;
        }, z$1.core.$strip>>;
        status: z$1.ZodEnum<{
            completed: "completed";
            failed: "failed";
            interrupted: "interrupted";
            pending: "pending";
        }>;
        steps: z$1.ZodArray<z$1.ZodObject<{
            status: z$1.ZodOptional<z$1.ZodEnum<{
                active: "active";
                completed: "completed";
                failed: "failed";
                pending: "pending";
            }>>;
            step: z$1.ZodString;
        }, z$1.core.$strip>>;
        type: z$1.ZodLiteral<"planSteps">;
    }, z$1.core.$strip>, z$1.ZodObject<{
        id: z$1.ZodString;
        parentToolCallId: z$1.ZodOptional<z$1.ZodString>;
        presentation: z$1.ZodOptional<z$1.ZodObject<{
            badge: z$1.ZodOptional<z$1.ZodObject<{
                glyph: z$1.ZodString;
                hint: z$1.ZodString;
                label: z$1.ZodString;
                tone: z$1.ZodEnum<{
                    destructive: "destructive";
                    neutral: "neutral";
                }>;
            }, z$1.core.$strip>>;
            detail: z$1.ZodOptional<z$1.ZodString>;
            icon: z$1.ZodObject<{
                glyph: z$1.ZodString;
            }, z$1.core.$strip>;
            label: z$1.ZodObject<{
                completed: z$1.ZodString;
                pending: z$1.ZodString;
            }, z$1.core.$strip>;
            suppress: z$1.ZodOptional<z$1.ZodBoolean>;
            tint: z$1.ZodOptional<z$1.ZodObject<{
                dark: z$1.ZodString;
                light: z$1.ZodString;
            }, z$1.core.$strip>>;
            title: z$1.ZodOptional<z$1.ZodString>;
        }, z$1.core.$strip>>;
        type: z$1.ZodLiteral<"contextCompaction">;
    }, z$1.core.$strip>, z$1.ZodObject<{
        description: z$1.ZodString;
        error: z$1.ZodOptional<z$1.ZodString>;
        familyId: z$1.ZodOptional<z$1.ZodString>;
        id: z$1.ZodString;
        outputFile: z$1.ZodOptional<z$1.ZodString>;
        parentToolCallId: z$1.ZodOptional<z$1.ZodString>;
        presentation: z$1.ZodOptional<z$1.ZodObject<{
            badge: z$1.ZodOptional<z$1.ZodObject<{
                glyph: z$1.ZodString;
                hint: z$1.ZodString;
                label: z$1.ZodString;
                tone: z$1.ZodEnum<{
                    destructive: "destructive";
                    neutral: "neutral";
                }>;
            }, z$1.core.$strip>>;
            detail: z$1.ZodOptional<z$1.ZodString>;
            icon: z$1.ZodObject<{
                glyph: z$1.ZodString;
            }, z$1.core.$strip>;
            label: z$1.ZodObject<{
                completed: z$1.ZodString;
                pending: z$1.ZodString;
            }, z$1.core.$strip>;
            suppress: z$1.ZodOptional<z$1.ZodBoolean>;
            tint: z$1.ZodOptional<z$1.ZodObject<{
                dark: z$1.ZodString;
                light: z$1.ZodString;
            }, z$1.core.$strip>>;
            title: z$1.ZodOptional<z$1.ZodString>;
        }, z$1.core.$strip>>;
        skipTranscript: z$1.ZodBoolean;
        status: z$1.ZodEnum<{
            completed: "completed";
            failed: "failed";
            interrupted: "interrupted";
            pending: "pending";
        }>;
        summary: z$1.ZodOptional<z$1.ZodString>;
        taskStatus: z$1.ZodEnum<{
            completed: "completed";
            failed: "failed";
            killed: "killed";
            paused: "paused";
            pending: "pending";
            running: "running";
            stopped: "stopped";
        }>;
        taskType: z$1.ZodString;
        type: z$1.ZodLiteral<"backgroundTask">;
        usage: z$1.ZodOptional<z$1.ZodObject<{
            durationMs: z$1.ZodNumber;
            toolUses: z$1.ZodNumber;
            totalTokens: z$1.ZodNumber;
        }, z$1.core.$strip>>;
        workflow: z$1.ZodOptional<z$1.ZodObject<{
            agents: z$1.ZodArray<z$1.ZodObject<{
                agentType: z$1.ZodOptional<z$1.ZodString>;
                attempt: z$1.ZodNumber;
                cached: z$1.ZodBoolean;
                durationMs: z$1.ZodOptional<z$1.ZodNumber>;
                error: z$1.ZodOptional<z$1.ZodString>;
                index: z$1.ZodNumber;
                isolation: z$1.ZodOptional<z$1.ZodString>;
                label: z$1.ZodString;
                lastProgressAt: z$1.ZodNumber;
                lastToolName: z$1.ZodOptional<z$1.ZodString>;
                lastToolSummary: z$1.ZodOptional<z$1.ZodString>;
                model: z$1.ZodString;
                phaseIndex: z$1.ZodOptional<z$1.ZodNumber>;
                phaseTitle: z$1.ZodOptional<z$1.ZodString>;
                promptPreview: z$1.ZodOptional<z$1.ZodString>;
                queuedAt: z$1.ZodOptional<z$1.ZodNumber>;
                resultPreview: z$1.ZodOptional<z$1.ZodString>;
                startedAt: z$1.ZodOptional<z$1.ZodNumber>;
                state: z$1.ZodEnum<{
                    done: "done";
                    failed: "failed";
                    queued: "queued";
                    running: "running";
                    skipped: "skipped";
                }>;
                tokens: z$1.ZodOptional<z$1.ZodNumber>;
                toolCalls: z$1.ZodOptional<z$1.ZodNumber>;
            }, z$1.core.$strip>>;
            phases: z$1.ZodArray<z$1.ZodObject<{
                index: z$1.ZodNumber;
                kind: z$1.ZodOptional<z$1.ZodString>;
                title: z$1.ZodString;
            }, z$1.core.$strip>>;
        }, z$1.core.$strip>>;
        workflowName: z$1.ZodOptional<z$1.ZodString>;
    }, z$1.core.$strip>, z$1.ZodObject<{
        background: z$1.ZodBoolean;
        childRef: z$1.ZodString;
        id: z$1.ZodString;
        label: z$1.ZodString;
        parentToolCallId: z$1.ZodOptional<z$1.ZodString>;
        presentation: z$1.ZodOptional<z$1.ZodObject<{
            badge: z$1.ZodOptional<z$1.ZodObject<{
                glyph: z$1.ZodString;
                hint: z$1.ZodString;
                label: z$1.ZodString;
                tone: z$1.ZodEnum<{
                    destructive: "destructive";
                    neutral: "neutral";
                }>;
            }, z$1.core.$strip>>;
            detail: z$1.ZodOptional<z$1.ZodString>;
            icon: z$1.ZodObject<{
                glyph: z$1.ZodString;
            }, z$1.core.$strip>;
            label: z$1.ZodObject<{
                completed: z$1.ZodString;
                pending: z$1.ZodString;
            }, z$1.core.$strip>;
            suppress: z$1.ZodOptional<z$1.ZodBoolean>;
            tint: z$1.ZodOptional<z$1.ZodObject<{
                dark: z$1.ZodString;
                light: z$1.ZodString;
            }, z$1.core.$strip>>;
            title: z$1.ZodOptional<z$1.ZodString>;
        }, z$1.core.$strip>>;
        status: z$1.ZodEnum<{
            completed: "completed";
            failed: "failed";
            interrupted: "interrupted";
            pending: "pending";
        }>;
        summary: z$1.ZodOptional<z$1.ZodString>;
        type: z$1.ZodLiteral<"delegation">;
    }, z$1.core.$strip>, z$1.ZodObject<{
        id: z$1.ZodString;
        kind: z$1.ZodString & z$1.ZodType<`${string}/${string}`, string, z$1.core.$ZodTypeInternals<`${string}/${string}`, string>>;
        parentToolCallId: z$1.ZodOptional<z$1.ZodString>;
        payload: z$1.ZodType<JsonValue, unknown, z$1.core.$ZodTypeInternals<JsonValue, unknown>>;
        presentation: z$1.ZodObject<{
            badge: z$1.ZodOptional<z$1.ZodObject<{
                glyph: z$1.ZodString;
                hint: z$1.ZodString;
                label: z$1.ZodString;
                tone: z$1.ZodEnum<{
                    destructive: "destructive";
                    neutral: "neutral";
                }>;
            }, z$1.core.$strip>>;
            detail: z$1.ZodOptional<z$1.ZodString>;
            icon: z$1.ZodObject<{
                glyph: z$1.ZodString;
            }, z$1.core.$strip>;
            label: z$1.ZodObject<{
                completed: z$1.ZodString;
                pending: z$1.ZodString;
            }, z$1.core.$strip>;
            suppress: z$1.ZodOptional<z$1.ZodBoolean>;
            tint: z$1.ZodOptional<z$1.ZodObject<{
                dark: z$1.ZodString;
                light: z$1.ZodString;
            }, z$1.core.$strip>>;
            title: z$1.ZodOptional<z$1.ZodString>;
        }, z$1.core.$strip>;
        status: z$1.ZodEnum<{
            completed: "completed";
            failed: "failed";
            interrupted: "interrupted";
            pending: "pending";
        }>;
        type: z$1.ZodLiteral<"extension">;
    }, z$1.core.$strip>], "type">;
    providerThreadId: z$1.ZodString;
    threadId: z$1.ZodString;
    type: z$1.ZodLiteral<"item/started">;
}, z$1.core.$strip>, z$1.ZodObject<{
    item: z$1.ZodDiscriminatedUnion<[z$1.ZodObject<{
        clientRequestId: z$1.ZodOptional<z$1.ZodString>;
        content: z$1.ZodArray<z$1.ZodDiscriminatedUnion<[z$1.ZodObject<{
            text: z$1.ZodString;
            type: z$1.ZodLiteral<"text">;
        }, z$1.core.$strip>, z$1.ZodObject<{
            type: z$1.ZodLiteral<"image">;
            url: z$1.ZodString;
        }, z$1.core.$strip>, z$1.ZodObject<{
            path: z$1.ZodString;
            type: z$1.ZodLiteral<"localImage">;
        }, z$1.core.$strip>, z$1.ZodObject<{
            path: z$1.ZodString;
            type: z$1.ZodLiteral<"localFile">;
        }, z$1.core.$strip>], "type">>;
        id: z$1.ZodString;
        parentToolCallId: z$1.ZodOptional<z$1.ZodString>;
        type: z$1.ZodLiteral<"userMessage">;
    }, z$1.core.$strict>, z$1.ZodObject<{
        id: z$1.ZodString;
        parentToolCallId: z$1.ZodOptional<z$1.ZodString>;
        presentation: z$1.ZodOptional<z$1.ZodObject<{
            badge: z$1.ZodOptional<z$1.ZodObject<{
                glyph: z$1.ZodString;
                hint: z$1.ZodString;
                label: z$1.ZodString;
                tone: z$1.ZodEnum<{
                    destructive: "destructive";
                    neutral: "neutral";
                }>;
            }, z$1.core.$strip>>;
            detail: z$1.ZodOptional<z$1.ZodString>;
            icon: z$1.ZodObject<{
                glyph: z$1.ZodString;
            }, z$1.core.$strip>;
            label: z$1.ZodObject<{
                completed: z$1.ZodString;
                pending: z$1.ZodString;
            }, z$1.core.$strip>;
            suppress: z$1.ZodOptional<z$1.ZodBoolean>;
            tint: z$1.ZodOptional<z$1.ZodObject<{
                dark: z$1.ZodString;
                light: z$1.ZodString;
            }, z$1.core.$strip>>;
            title: z$1.ZodOptional<z$1.ZodString>;
        }, z$1.core.$strip>>;
        text: z$1.ZodString;
        type: z$1.ZodLiteral<"agentMessage">;
    }, z$1.core.$strip>, z$1.ZodObject<{
        aggregatedOutput: z$1.ZodOptional<z$1.ZodString>;
        approvalStatus: z$1.ZodNullable<z$1.ZodEnum<{
            denied: "denied";
            waiting_for_approval: "waiting_for_approval";
        }>>;
        command: z$1.ZodString;
        cwd: z$1.ZodString;
        durationMs: z$1.ZodOptional<z$1.ZodNumber>;
        exitCode: z$1.ZodOptional<z$1.ZodNumber>;
        id: z$1.ZodString;
        parentToolCallId: z$1.ZodOptional<z$1.ZodString>;
        presentation: z$1.ZodOptional<z$1.ZodObject<{
            badge: z$1.ZodOptional<z$1.ZodObject<{
                glyph: z$1.ZodString;
                hint: z$1.ZodString;
                label: z$1.ZodString;
                tone: z$1.ZodEnum<{
                    destructive: "destructive";
                    neutral: "neutral";
                }>;
            }, z$1.core.$strip>>;
            detail: z$1.ZodOptional<z$1.ZodString>;
            icon: z$1.ZodObject<{
                glyph: z$1.ZodString;
            }, z$1.core.$strip>;
            label: z$1.ZodObject<{
                completed: z$1.ZodString;
                pending: z$1.ZodString;
            }, z$1.core.$strip>;
            suppress: z$1.ZodOptional<z$1.ZodBoolean>;
            tint: z$1.ZodOptional<z$1.ZodObject<{
                dark: z$1.ZodString;
                light: z$1.ZodString;
            }, z$1.core.$strip>>;
            title: z$1.ZodOptional<z$1.ZodString>;
        }, z$1.core.$strip>>;
        status: z$1.ZodEnum<{
            completed: "completed";
            failed: "failed";
            interrupted: "interrupted";
            pending: "pending";
        }>;
        truncation: z$1.ZodOptional<z$1.ZodObject<{
            aggregatedOutput: z$1.ZodOptional<z$1.ZodObject<{
                originalLength: z$1.ZodNumber;
                retainedHeadLength: z$1.ZodNumber;
                retainedTailLength: z$1.ZodNumber;
                truncatedAt: z$1.ZodNumber;
            }, z$1.core.$strip>>;
            result: z$1.ZodOptional<z$1.ZodObject<{
                originalLength: z$1.ZodNumber;
                retainedHeadLength: z$1.ZodNumber;
                retainedTailLength: z$1.ZodNumber;
                truncatedAt: z$1.ZodNumber;
            }, z$1.core.$strip>>;
            resultText: z$1.ZodOptional<z$1.ZodObject<{
                originalLength: z$1.ZodNumber;
                retainedHeadLength: z$1.ZodNumber;
                retainedTailLength: z$1.ZodNumber;
                truncatedAt: z$1.ZodNumber;
            }, z$1.core.$strip>>;
        }, z$1.core.$strip>>;
        type: z$1.ZodLiteral<"commandExecution">;
    }, z$1.core.$strip>, z$1.ZodObject<{
        approvalStatus: z$1.ZodNullable<z$1.ZodEnum<{
            denied: "denied";
            waiting_for_approval: "waiting_for_approval";
        }>>;
        changes: z$1.ZodArray<z$1.ZodObject<{
            diff: z$1.ZodOptional<z$1.ZodString>;
            kind: z$1.ZodEnum<{
                add: "add";
                delete: "delete";
                update: "update";
            }>;
            movePath: z$1.ZodOptional<z$1.ZodString>;
            path: z$1.ZodString;
        }, z$1.core.$strip>>;
        id: z$1.ZodString;
        parentToolCallId: z$1.ZodOptional<z$1.ZodString>;
        presentation: z$1.ZodOptional<z$1.ZodObject<{
            badge: z$1.ZodOptional<z$1.ZodObject<{
                glyph: z$1.ZodString;
                hint: z$1.ZodString;
                label: z$1.ZodString;
                tone: z$1.ZodEnum<{
                    destructive: "destructive";
                    neutral: "neutral";
                }>;
            }, z$1.core.$strip>>;
            detail: z$1.ZodOptional<z$1.ZodString>;
            icon: z$1.ZodObject<{
                glyph: z$1.ZodString;
            }, z$1.core.$strip>;
            label: z$1.ZodObject<{
                completed: z$1.ZodString;
                pending: z$1.ZodString;
            }, z$1.core.$strip>;
            suppress: z$1.ZodOptional<z$1.ZodBoolean>;
            tint: z$1.ZodOptional<z$1.ZodObject<{
                dark: z$1.ZodString;
                light: z$1.ZodString;
            }, z$1.core.$strip>>;
            title: z$1.ZodOptional<z$1.ZodString>;
        }, z$1.core.$strip>>;
        status: z$1.ZodEnum<{
            completed: "completed";
            failed: "failed";
            interrupted: "interrupted";
            pending: "pending";
        }>;
        type: z$1.ZodLiteral<"fileChange">;
    }, z$1.core.$strip>, z$1.ZodObject<{
        id: z$1.ZodString;
        parentToolCallId: z$1.ZodOptional<z$1.ZodString>;
        presentation: z$1.ZodOptional<z$1.ZodObject<{
            badge: z$1.ZodOptional<z$1.ZodObject<{
                glyph: z$1.ZodString;
                hint: z$1.ZodString;
                label: z$1.ZodString;
                tone: z$1.ZodEnum<{
                    destructive: "destructive";
                    neutral: "neutral";
                }>;
            }, z$1.core.$strip>>;
            detail: z$1.ZodOptional<z$1.ZodString>;
            icon: z$1.ZodObject<{
                glyph: z$1.ZodString;
            }, z$1.core.$strip>;
            label: z$1.ZodObject<{
                completed: z$1.ZodString;
                pending: z$1.ZodString;
            }, z$1.core.$strip>;
            suppress: z$1.ZodOptional<z$1.ZodBoolean>;
            tint: z$1.ZodOptional<z$1.ZodObject<{
                dark: z$1.ZodString;
                light: z$1.ZodString;
            }, z$1.core.$strip>>;
            title: z$1.ZodOptional<z$1.ZodString>;
        }, z$1.core.$strip>>;
        queries: z$1.ZodArray<z$1.ZodString>;
        resultText: z$1.ZodNullable<z$1.ZodString>;
        type: z$1.ZodLiteral<"webSearch">;
    }, z$1.core.$strip>, z$1.ZodObject<{
        id: z$1.ZodString;
        parentToolCallId: z$1.ZodOptional<z$1.ZodString>;
        pattern: z$1.ZodNullable<z$1.ZodString>;
        presentation: z$1.ZodOptional<z$1.ZodObject<{
            badge: z$1.ZodOptional<z$1.ZodObject<{
                glyph: z$1.ZodString;
                hint: z$1.ZodString;
                label: z$1.ZodString;
                tone: z$1.ZodEnum<{
                    destructive: "destructive";
                    neutral: "neutral";
                }>;
            }, z$1.core.$strip>>;
            detail: z$1.ZodOptional<z$1.ZodString>;
            icon: z$1.ZodObject<{
                glyph: z$1.ZodString;
            }, z$1.core.$strip>;
            label: z$1.ZodObject<{
                completed: z$1.ZodString;
                pending: z$1.ZodString;
            }, z$1.core.$strip>;
            suppress: z$1.ZodOptional<z$1.ZodBoolean>;
            tint: z$1.ZodOptional<z$1.ZodObject<{
                dark: z$1.ZodString;
                light: z$1.ZodString;
            }, z$1.core.$strip>>;
            title: z$1.ZodOptional<z$1.ZodString>;
        }, z$1.core.$strip>>;
        prompt: z$1.ZodNullable<z$1.ZodString>;
        resultText: z$1.ZodNullable<z$1.ZodString>;
        type: z$1.ZodLiteral<"webFetch">;
        url: z$1.ZodString;
    }, z$1.core.$strip>, z$1.ZodObject<{
        id: z$1.ZodString;
        parentToolCallId: z$1.ZodOptional<z$1.ZodString>;
        path: z$1.ZodString;
        presentation: z$1.ZodOptional<z$1.ZodObject<{
            badge: z$1.ZodOptional<z$1.ZodObject<{
                glyph: z$1.ZodString;
                hint: z$1.ZodString;
                label: z$1.ZodString;
                tone: z$1.ZodEnum<{
                    destructive: "destructive";
                    neutral: "neutral";
                }>;
            }, z$1.core.$strip>>;
            detail: z$1.ZodOptional<z$1.ZodString>;
            icon: z$1.ZodObject<{
                glyph: z$1.ZodString;
            }, z$1.core.$strip>;
            label: z$1.ZodObject<{
                completed: z$1.ZodString;
                pending: z$1.ZodString;
            }, z$1.core.$strip>;
            suppress: z$1.ZodOptional<z$1.ZodBoolean>;
            tint: z$1.ZodOptional<z$1.ZodObject<{
                dark: z$1.ZodString;
                light: z$1.ZodString;
            }, z$1.core.$strip>>;
            title: z$1.ZodOptional<z$1.ZodString>;
        }, z$1.core.$strip>>;
        type: z$1.ZodLiteral<"imageView">;
    }, z$1.core.$strip>, z$1.ZodObject<{
        error: z$1.ZodNullable<z$1.ZodString>;
        id: z$1.ZodString;
        parentToolCallId: z$1.ZodOptional<z$1.ZodString>;
        path: z$1.ZodNullable<z$1.ZodString>;
        presentation: z$1.ZodOptional<z$1.ZodObject<{
            badge: z$1.ZodOptional<z$1.ZodObject<{
                glyph: z$1.ZodString;
                hint: z$1.ZodString;
                label: z$1.ZodString;
                tone: z$1.ZodEnum<{
                    destructive: "destructive";
                    neutral: "neutral";
                }>;
            }, z$1.core.$strip>>;
            detail: z$1.ZodOptional<z$1.ZodString>;
            icon: z$1.ZodObject<{
                glyph: z$1.ZodString;
            }, z$1.core.$strip>;
            label: z$1.ZodObject<{
                completed: z$1.ZodString;
                pending: z$1.ZodString;
            }, z$1.core.$strip>;
            suppress: z$1.ZodOptional<z$1.ZodBoolean>;
            tint: z$1.ZodOptional<z$1.ZodObject<{
                dark: z$1.ZodString;
                light: z$1.ZodString;
            }, z$1.core.$strip>>;
            title: z$1.ZodOptional<z$1.ZodString>;
        }, z$1.core.$strip>>;
        prompt: z$1.ZodNullable<z$1.ZodString>;
        result: z$1.ZodOptional<z$1.ZodString>;
        status: z$1.ZodEnum<{
            completed: "completed";
            failed: "failed";
            interrupted: "interrupted";
            pending: "pending";
        }>;
        transparentBackground: z$1.ZodBoolean;
        truncation: z$1.ZodOptional<z$1.ZodObject<{
            aggregatedOutput: z$1.ZodOptional<z$1.ZodObject<{
                originalLength: z$1.ZodNumber;
                retainedHeadLength: z$1.ZodNumber;
                retainedTailLength: z$1.ZodNumber;
                truncatedAt: z$1.ZodNumber;
            }, z$1.core.$strip>>;
            result: z$1.ZodOptional<z$1.ZodObject<{
                originalLength: z$1.ZodNumber;
                retainedHeadLength: z$1.ZodNumber;
                retainedTailLength: z$1.ZodNumber;
                truncatedAt: z$1.ZodNumber;
            }, z$1.core.$strip>>;
            resultText: z$1.ZodOptional<z$1.ZodObject<{
                originalLength: z$1.ZodNumber;
                retainedHeadLength: z$1.ZodNumber;
                retainedTailLength: z$1.ZodNumber;
                truncatedAt: z$1.ZodNumber;
            }, z$1.core.$strip>>;
        }, z$1.core.$strip>>;
        type: z$1.ZodLiteral<"imageGeneration">;
    }, z$1.core.$strip>, z$1.ZodObject<{
        cmd: z$1.ZodOptional<z$1.ZodString>;
        id: z$1.ZodString;
        parentToolCallId: z$1.ZodOptional<z$1.ZodString>;
        path: z$1.ZodString;
        presentation: z$1.ZodOptional<z$1.ZodObject<{
            badge: z$1.ZodOptional<z$1.ZodObject<{
                glyph: z$1.ZodString;
                hint: z$1.ZodString;
                label: z$1.ZodString;
                tone: z$1.ZodEnum<{
                    destructive: "destructive";
                    neutral: "neutral";
                }>;
            }, z$1.core.$strip>>;
            detail: z$1.ZodOptional<z$1.ZodString>;
            icon: z$1.ZodObject<{
                glyph: z$1.ZodString;
            }, z$1.core.$strip>;
            label: z$1.ZodObject<{
                completed: z$1.ZodString;
                pending: z$1.ZodString;
            }, z$1.core.$strip>;
            suppress: z$1.ZodOptional<z$1.ZodBoolean>;
            tint: z$1.ZodOptional<z$1.ZodObject<{
                dark: z$1.ZodString;
                light: z$1.ZodString;
            }, z$1.core.$strip>>;
            title: z$1.ZodOptional<z$1.ZodString>;
        }, z$1.core.$strip>>;
        status: z$1.ZodEnum<{
            completed: "completed";
            failed: "failed";
            interrupted: "interrupted";
            pending: "pending";
        }>;
        type: z$1.ZodLiteral<"fileRead">;
    }, z$1.core.$strip>, z$1.ZodObject<{
        cmd: z$1.ZodOptional<z$1.ZodString>;
        id: z$1.ZodString;
        mode: z$1.ZodEnum<{
            content: "content";
            list: "list";
            path: "path";
        }>;
        parentToolCallId: z$1.ZodOptional<z$1.ZodString>;
        path: z$1.ZodOptional<z$1.ZodString>;
        presentation: z$1.ZodOptional<z$1.ZodObject<{
            badge: z$1.ZodOptional<z$1.ZodObject<{
                glyph: z$1.ZodString;
                hint: z$1.ZodString;
                label: z$1.ZodString;
                tone: z$1.ZodEnum<{
                    destructive: "destructive";
                    neutral: "neutral";
                }>;
            }, z$1.core.$strip>>;
            detail: z$1.ZodOptional<z$1.ZodString>;
            icon: z$1.ZodObject<{
                glyph: z$1.ZodString;
            }, z$1.core.$strip>;
            label: z$1.ZodObject<{
                completed: z$1.ZodString;
                pending: z$1.ZodString;
            }, z$1.core.$strip>;
            suppress: z$1.ZodOptional<z$1.ZodBoolean>;
            tint: z$1.ZodOptional<z$1.ZodObject<{
                dark: z$1.ZodString;
                light: z$1.ZodString;
            }, z$1.core.$strip>>;
            title: z$1.ZodOptional<z$1.ZodString>;
        }, z$1.core.$strip>>;
        query: z$1.ZodString;
        status: z$1.ZodEnum<{
            completed: "completed";
            failed: "failed";
            interrupted: "interrupted";
            pending: "pending";
        }>;
        type: z$1.ZodLiteral<"search">;
    }, z$1.core.$strip>, z$1.ZodObject<{
        arguments: z$1.ZodOptional<z$1.ZodRecord<z$1.ZodString, z$1.ZodUnknown>>;
        durationMs: z$1.ZodOptional<z$1.ZodNumber>;
        error: z$1.ZodOptional<z$1.ZodString>;
        id: z$1.ZodString;
        parentToolCallId: z$1.ZodOptional<z$1.ZodString>;
        presentation: z$1.ZodOptional<z$1.ZodObject<{
            badge: z$1.ZodOptional<z$1.ZodObject<{
                glyph: z$1.ZodString;
                hint: z$1.ZodString;
                label: z$1.ZodString;
                tone: z$1.ZodEnum<{
                    destructive: "destructive";
                    neutral: "neutral";
                }>;
            }, z$1.core.$strip>>;
            detail: z$1.ZodOptional<z$1.ZodString>;
            icon: z$1.ZodObject<{
                glyph: z$1.ZodString;
            }, z$1.core.$strip>;
            label: z$1.ZodObject<{
                completed: z$1.ZodString;
                pending: z$1.ZodString;
            }, z$1.core.$strip>;
            suppress: z$1.ZodOptional<z$1.ZodBoolean>;
            tint: z$1.ZodOptional<z$1.ZodObject<{
                dark: z$1.ZodString;
                light: z$1.ZodString;
            }, z$1.core.$strip>>;
            title: z$1.ZodOptional<z$1.ZodString>;
        }, z$1.core.$strip>>;
        result: z$1.ZodOptional<z$1.ZodUnknown>;
        server: z$1.ZodOptional<z$1.ZodString>;
        status: z$1.ZodEnum<{
            completed: "completed";
            failed: "failed";
            interrupted: "interrupted";
            pending: "pending";
        }>;
        tool: z$1.ZodString;
        truncation: z$1.ZodOptional<z$1.ZodObject<{
            aggregatedOutput: z$1.ZodOptional<z$1.ZodObject<{
                originalLength: z$1.ZodNumber;
                retainedHeadLength: z$1.ZodNumber;
                retainedTailLength: z$1.ZodNumber;
                truncatedAt: z$1.ZodNumber;
            }, z$1.core.$strip>>;
            result: z$1.ZodOptional<z$1.ZodObject<{
                originalLength: z$1.ZodNumber;
                retainedHeadLength: z$1.ZodNumber;
                retainedTailLength: z$1.ZodNumber;
                truncatedAt: z$1.ZodNumber;
            }, z$1.core.$strip>>;
            resultText: z$1.ZodOptional<z$1.ZodObject<{
                originalLength: z$1.ZodNumber;
                retainedHeadLength: z$1.ZodNumber;
                retainedTailLength: z$1.ZodNumber;
                truncatedAt: z$1.ZodNumber;
            }, z$1.core.$strip>>;
        }, z$1.core.$strip>>;
        type: z$1.ZodLiteral<"toolCall">;
    }, z$1.core.$strip>, z$1.ZodObject<{
        content: z$1.ZodArray<z$1.ZodString>;
        id: z$1.ZodString;
        parentToolCallId: z$1.ZodOptional<z$1.ZodString>;
        presentation: z$1.ZodOptional<z$1.ZodObject<{
            badge: z$1.ZodOptional<z$1.ZodObject<{
                glyph: z$1.ZodString;
                hint: z$1.ZodString;
                label: z$1.ZodString;
                tone: z$1.ZodEnum<{
                    destructive: "destructive";
                    neutral: "neutral";
                }>;
            }, z$1.core.$strip>>;
            detail: z$1.ZodOptional<z$1.ZodString>;
            icon: z$1.ZodObject<{
                glyph: z$1.ZodString;
            }, z$1.core.$strip>;
            label: z$1.ZodObject<{
                completed: z$1.ZodString;
                pending: z$1.ZodString;
            }, z$1.core.$strip>;
            suppress: z$1.ZodOptional<z$1.ZodBoolean>;
            tint: z$1.ZodOptional<z$1.ZodObject<{
                dark: z$1.ZodString;
                light: z$1.ZodString;
            }, z$1.core.$strip>>;
            title: z$1.ZodOptional<z$1.ZodString>;
        }, z$1.core.$strip>>;
        summary: z$1.ZodArray<z$1.ZodString>;
        type: z$1.ZodLiteral<"reasoning">;
    }, z$1.core.$strip>, z$1.ZodObject<{
        id: z$1.ZodString;
        parentToolCallId: z$1.ZodOptional<z$1.ZodString>;
        presentation: z$1.ZodOptional<z$1.ZodObject<{
            badge: z$1.ZodOptional<z$1.ZodObject<{
                glyph: z$1.ZodString;
                hint: z$1.ZodString;
                label: z$1.ZodString;
                tone: z$1.ZodEnum<{
                    destructive: "destructive";
                    neutral: "neutral";
                }>;
            }, z$1.core.$strip>>;
            detail: z$1.ZodOptional<z$1.ZodString>;
            icon: z$1.ZodObject<{
                glyph: z$1.ZodString;
            }, z$1.core.$strip>;
            label: z$1.ZodObject<{
                completed: z$1.ZodString;
                pending: z$1.ZodString;
            }, z$1.core.$strip>;
            suppress: z$1.ZodOptional<z$1.ZodBoolean>;
            tint: z$1.ZodOptional<z$1.ZodObject<{
                dark: z$1.ZodString;
                light: z$1.ZodString;
            }, z$1.core.$strip>>;
            title: z$1.ZodOptional<z$1.ZodString>;
        }, z$1.core.$strip>>;
        text: z$1.ZodString;
        type: z$1.ZodLiteral<"plan">;
    }, z$1.core.$strip>, z$1.ZodObject<{
        explanation: z$1.ZodOptional<z$1.ZodString>;
        id: z$1.ZodString;
        parentToolCallId: z$1.ZodOptional<z$1.ZodString>;
        presentation: z$1.ZodOptional<z$1.ZodObject<{
            badge: z$1.ZodOptional<z$1.ZodObject<{
                glyph: z$1.ZodString;
                hint: z$1.ZodString;
                label: z$1.ZodString;
                tone: z$1.ZodEnum<{
                    destructive: "destructive";
                    neutral: "neutral";
                }>;
            }, z$1.core.$strip>>;
            detail: z$1.ZodOptional<z$1.ZodString>;
            icon: z$1.ZodObject<{
                glyph: z$1.ZodString;
            }, z$1.core.$strip>;
            label: z$1.ZodObject<{
                completed: z$1.ZodString;
                pending: z$1.ZodString;
            }, z$1.core.$strip>;
            suppress: z$1.ZodOptional<z$1.ZodBoolean>;
            tint: z$1.ZodOptional<z$1.ZodObject<{
                dark: z$1.ZodString;
                light: z$1.ZodString;
            }, z$1.core.$strip>>;
            title: z$1.ZodOptional<z$1.ZodString>;
        }, z$1.core.$strip>>;
        status: z$1.ZodEnum<{
            completed: "completed";
            failed: "failed";
            interrupted: "interrupted";
            pending: "pending";
        }>;
        steps: z$1.ZodArray<z$1.ZodObject<{
            status: z$1.ZodOptional<z$1.ZodEnum<{
                active: "active";
                completed: "completed";
                failed: "failed";
                pending: "pending";
            }>>;
            step: z$1.ZodString;
        }, z$1.core.$strip>>;
        type: z$1.ZodLiteral<"planSteps">;
    }, z$1.core.$strip>, z$1.ZodObject<{
        id: z$1.ZodString;
        parentToolCallId: z$1.ZodOptional<z$1.ZodString>;
        presentation: z$1.ZodOptional<z$1.ZodObject<{
            badge: z$1.ZodOptional<z$1.ZodObject<{
                glyph: z$1.ZodString;
                hint: z$1.ZodString;
                label: z$1.ZodString;
                tone: z$1.ZodEnum<{
                    destructive: "destructive";
                    neutral: "neutral";
                }>;
            }, z$1.core.$strip>>;
            detail: z$1.ZodOptional<z$1.ZodString>;
            icon: z$1.ZodObject<{
                glyph: z$1.ZodString;
            }, z$1.core.$strip>;
            label: z$1.ZodObject<{
                completed: z$1.ZodString;
                pending: z$1.ZodString;
            }, z$1.core.$strip>;
            suppress: z$1.ZodOptional<z$1.ZodBoolean>;
            tint: z$1.ZodOptional<z$1.ZodObject<{
                dark: z$1.ZodString;
                light: z$1.ZodString;
            }, z$1.core.$strip>>;
            title: z$1.ZodOptional<z$1.ZodString>;
        }, z$1.core.$strip>>;
        type: z$1.ZodLiteral<"contextCompaction">;
    }, z$1.core.$strip>, z$1.ZodObject<{
        description: z$1.ZodString;
        error: z$1.ZodOptional<z$1.ZodString>;
        familyId: z$1.ZodOptional<z$1.ZodString>;
        id: z$1.ZodString;
        outputFile: z$1.ZodOptional<z$1.ZodString>;
        parentToolCallId: z$1.ZodOptional<z$1.ZodString>;
        presentation: z$1.ZodOptional<z$1.ZodObject<{
            badge: z$1.ZodOptional<z$1.ZodObject<{
                glyph: z$1.ZodString;
                hint: z$1.ZodString;
                label: z$1.ZodString;
                tone: z$1.ZodEnum<{
                    destructive: "destructive";
                    neutral: "neutral";
                }>;
            }, z$1.core.$strip>>;
            detail: z$1.ZodOptional<z$1.ZodString>;
            icon: z$1.ZodObject<{
                glyph: z$1.ZodString;
            }, z$1.core.$strip>;
            label: z$1.ZodObject<{
                completed: z$1.ZodString;
                pending: z$1.ZodString;
            }, z$1.core.$strip>;
            suppress: z$1.ZodOptional<z$1.ZodBoolean>;
            tint: z$1.ZodOptional<z$1.ZodObject<{
                dark: z$1.ZodString;
                light: z$1.ZodString;
            }, z$1.core.$strip>>;
            title: z$1.ZodOptional<z$1.ZodString>;
        }, z$1.core.$strip>>;
        skipTranscript: z$1.ZodBoolean;
        status: z$1.ZodEnum<{
            completed: "completed";
            failed: "failed";
            interrupted: "interrupted";
            pending: "pending";
        }>;
        summary: z$1.ZodOptional<z$1.ZodString>;
        taskStatus: z$1.ZodEnum<{
            completed: "completed";
            failed: "failed";
            killed: "killed";
            paused: "paused";
            pending: "pending";
            running: "running";
            stopped: "stopped";
        }>;
        taskType: z$1.ZodString;
        type: z$1.ZodLiteral<"backgroundTask">;
        usage: z$1.ZodOptional<z$1.ZodObject<{
            durationMs: z$1.ZodNumber;
            toolUses: z$1.ZodNumber;
            totalTokens: z$1.ZodNumber;
        }, z$1.core.$strip>>;
        workflow: z$1.ZodOptional<z$1.ZodObject<{
            agents: z$1.ZodArray<z$1.ZodObject<{
                agentType: z$1.ZodOptional<z$1.ZodString>;
                attempt: z$1.ZodNumber;
                cached: z$1.ZodBoolean;
                durationMs: z$1.ZodOptional<z$1.ZodNumber>;
                error: z$1.ZodOptional<z$1.ZodString>;
                index: z$1.ZodNumber;
                isolation: z$1.ZodOptional<z$1.ZodString>;
                label: z$1.ZodString;
                lastProgressAt: z$1.ZodNumber;
                lastToolName: z$1.ZodOptional<z$1.ZodString>;
                lastToolSummary: z$1.ZodOptional<z$1.ZodString>;
                model: z$1.ZodString;
                phaseIndex: z$1.ZodOptional<z$1.ZodNumber>;
                phaseTitle: z$1.ZodOptional<z$1.ZodString>;
                promptPreview: z$1.ZodOptional<z$1.ZodString>;
                queuedAt: z$1.ZodOptional<z$1.ZodNumber>;
                resultPreview: z$1.ZodOptional<z$1.ZodString>;
                startedAt: z$1.ZodOptional<z$1.ZodNumber>;
                state: z$1.ZodEnum<{
                    done: "done";
                    failed: "failed";
                    queued: "queued";
                    running: "running";
                    skipped: "skipped";
                }>;
                tokens: z$1.ZodOptional<z$1.ZodNumber>;
                toolCalls: z$1.ZodOptional<z$1.ZodNumber>;
            }, z$1.core.$strip>>;
            phases: z$1.ZodArray<z$1.ZodObject<{
                index: z$1.ZodNumber;
                kind: z$1.ZodOptional<z$1.ZodString>;
                title: z$1.ZodString;
            }, z$1.core.$strip>>;
        }, z$1.core.$strip>>;
        workflowName: z$1.ZodOptional<z$1.ZodString>;
    }, z$1.core.$strip>, z$1.ZodObject<{
        background: z$1.ZodBoolean;
        childRef: z$1.ZodString;
        id: z$1.ZodString;
        label: z$1.ZodString;
        parentToolCallId: z$1.ZodOptional<z$1.ZodString>;
        presentation: z$1.ZodOptional<z$1.ZodObject<{
            badge: z$1.ZodOptional<z$1.ZodObject<{
                glyph: z$1.ZodString;
                hint: z$1.ZodString;
                label: z$1.ZodString;
                tone: z$1.ZodEnum<{
                    destructive: "destructive";
                    neutral: "neutral";
                }>;
            }, z$1.core.$strip>>;
            detail: z$1.ZodOptional<z$1.ZodString>;
            icon: z$1.ZodObject<{
                glyph: z$1.ZodString;
            }, z$1.core.$strip>;
            label: z$1.ZodObject<{
                completed: z$1.ZodString;
                pending: z$1.ZodString;
            }, z$1.core.$strip>;
            suppress: z$1.ZodOptional<z$1.ZodBoolean>;
            tint: z$1.ZodOptional<z$1.ZodObject<{
                dark: z$1.ZodString;
                light: z$1.ZodString;
            }, z$1.core.$strip>>;
            title: z$1.ZodOptional<z$1.ZodString>;
        }, z$1.core.$strip>>;
        status: z$1.ZodEnum<{
            completed: "completed";
            failed: "failed";
            interrupted: "interrupted";
            pending: "pending";
        }>;
        summary: z$1.ZodOptional<z$1.ZodString>;
        type: z$1.ZodLiteral<"delegation">;
    }, z$1.core.$strip>, z$1.ZodObject<{
        id: z$1.ZodString;
        kind: z$1.ZodString & z$1.ZodType<`${string}/${string}`, string, z$1.core.$ZodTypeInternals<`${string}/${string}`, string>>;
        parentToolCallId: z$1.ZodOptional<z$1.ZodString>;
        payload: z$1.ZodType<JsonValue, unknown, z$1.core.$ZodTypeInternals<JsonValue, unknown>>;
        presentation: z$1.ZodObject<{
            badge: z$1.ZodOptional<z$1.ZodObject<{
                glyph: z$1.ZodString;
                hint: z$1.ZodString;
                label: z$1.ZodString;
                tone: z$1.ZodEnum<{
                    destructive: "destructive";
                    neutral: "neutral";
                }>;
            }, z$1.core.$strip>>;
            detail: z$1.ZodOptional<z$1.ZodString>;
            icon: z$1.ZodObject<{
                glyph: z$1.ZodString;
            }, z$1.core.$strip>;
            label: z$1.ZodObject<{
                completed: z$1.ZodString;
                pending: z$1.ZodString;
            }, z$1.core.$strip>;
            suppress: z$1.ZodOptional<z$1.ZodBoolean>;
            tint: z$1.ZodOptional<z$1.ZodObject<{
                dark: z$1.ZodString;
                light: z$1.ZodString;
            }, z$1.core.$strip>>;
            title: z$1.ZodOptional<z$1.ZodString>;
        }, z$1.core.$strip>;
        status: z$1.ZodEnum<{
            completed: "completed";
            failed: "failed";
            interrupted: "interrupted";
            pending: "pending";
        }>;
        type: z$1.ZodLiteral<"extension">;
    }, z$1.core.$strip>], "type">;
    providerThreadId: z$1.ZodString;
    threadId: z$1.ZodString;
    type: z$1.ZodLiteral<"item/completed">;
}, z$1.core.$strip>, z$1.ZodObject<{
    delta: z$1.ZodString;
    itemId: z$1.ZodString;
    parentToolCallId: z$1.ZodOptional<z$1.ZodString>;
    providerThreadId: z$1.ZodString;
    threadId: z$1.ZodString;
    type: z$1.ZodLiteral<"item/agentMessage/delta">;
}, z$1.core.$strip>, z$1.ZodObject<{
    delta: z$1.ZodString;
    itemId: z$1.ZodString;
    parentToolCallId: z$1.ZodOptional<z$1.ZodString>;
    providerThreadId: z$1.ZodString;
    reset: z$1.ZodOptional<z$1.ZodBoolean>;
    threadId: z$1.ZodString;
    type: z$1.ZodLiteral<"item/commandExecution/outputDelta">;
}, z$1.core.$strip>, z$1.ZodObject<{
    delta: z$1.ZodString;
    itemId: z$1.ZodString;
    parentToolCallId: z$1.ZodOptional<z$1.ZodString>;
    providerThreadId: z$1.ZodString;
    threadId: z$1.ZodString;
    type: z$1.ZodLiteral<"item/fileChange/outputDelta">;
}, z$1.core.$strip>, z$1.ZodObject<{
    delta: z$1.ZodString;
    itemId: z$1.ZodString;
    parentToolCallId: z$1.ZodOptional<z$1.ZodString>;
    providerThreadId: z$1.ZodString;
    threadId: z$1.ZodString;
    type: z$1.ZodLiteral<"item/reasoning/summaryTextDelta">;
}, z$1.core.$strip>, z$1.ZodObject<{
    delta: z$1.ZodString;
    itemId: z$1.ZodString;
    parentToolCallId: z$1.ZodOptional<z$1.ZodString>;
    providerThreadId: z$1.ZodString;
    threadId: z$1.ZodString;
    type: z$1.ZodLiteral<"item/reasoning/textDelta">;
}, z$1.core.$strip>, z$1.ZodObject<{
    delta: z$1.ZodString;
    itemId: z$1.ZodString;
    parentToolCallId: z$1.ZodOptional<z$1.ZodString>;
    providerThreadId: z$1.ZodString;
    threadId: z$1.ZodString;
    type: z$1.ZodLiteral<"item/plan/delta">;
}, z$1.core.$strip>, z$1.ZodObject<{
    itemId: z$1.ZodString;
    message: z$1.ZodOptional<z$1.ZodString>;
    parentToolCallId: z$1.ZodOptional<z$1.ZodString>;
    providerThreadId: z$1.ZodString;
    threadId: z$1.ZodString;
    type: z$1.ZodLiteral<"item/mcpToolCall/progress">;
}, z$1.core.$strip>, z$1.ZodObject<{
    itemId: z$1.ZodString;
    message: z$1.ZodOptional<z$1.ZodString>;
    parentToolCallId: z$1.ZodOptional<z$1.ZodString>;
    providerThreadId: z$1.ZodString;
    threadId: z$1.ZodString;
    type: z$1.ZodLiteral<"item/toolCall/progress">;
}, z$1.core.$strip>, z$1.ZodObject<{
    item: z$1.ZodObject<{
        description: z$1.ZodString;
        error: z$1.ZodOptional<z$1.ZodString>;
        familyId: z$1.ZodOptional<z$1.ZodString>;
        id: z$1.ZodString;
        outputFile: z$1.ZodOptional<z$1.ZodString>;
        parentToolCallId: z$1.ZodOptional<z$1.ZodString>;
        presentation: z$1.ZodOptional<z$1.ZodObject<{
            badge: z$1.ZodOptional<z$1.ZodObject<{
                glyph: z$1.ZodString;
                hint: z$1.ZodString;
                label: z$1.ZodString;
                tone: z$1.ZodEnum<{
                    destructive: "destructive";
                    neutral: "neutral";
                }>;
            }, z$1.core.$strip>>;
            detail: z$1.ZodOptional<z$1.ZodString>;
            icon: z$1.ZodObject<{
                glyph: z$1.ZodString;
            }, z$1.core.$strip>;
            label: z$1.ZodObject<{
                completed: z$1.ZodString;
                pending: z$1.ZodString;
            }, z$1.core.$strip>;
            suppress: z$1.ZodOptional<z$1.ZodBoolean>;
            tint: z$1.ZodOptional<z$1.ZodObject<{
                dark: z$1.ZodString;
                light: z$1.ZodString;
            }, z$1.core.$strip>>;
            title: z$1.ZodOptional<z$1.ZodString>;
        }, z$1.core.$strip>>;
        skipTranscript: z$1.ZodBoolean;
        status: z$1.ZodEnum<{
            completed: "completed";
            failed: "failed";
            interrupted: "interrupted";
            pending: "pending";
        }>;
        summary: z$1.ZodOptional<z$1.ZodString>;
        taskStatus: z$1.ZodEnum<{
            completed: "completed";
            failed: "failed";
            killed: "killed";
            paused: "paused";
            pending: "pending";
            running: "running";
            stopped: "stopped";
        }>;
        taskType: z$1.ZodString;
        type: z$1.ZodLiteral<"backgroundTask">;
        usage: z$1.ZodOptional<z$1.ZodObject<{
            durationMs: z$1.ZodNumber;
            toolUses: z$1.ZodNumber;
            totalTokens: z$1.ZodNumber;
        }, z$1.core.$strip>>;
        workflow: z$1.ZodOptional<z$1.ZodObject<{
            agents: z$1.ZodArray<z$1.ZodObject<{
                agentType: z$1.ZodOptional<z$1.ZodString>;
                attempt: z$1.ZodNumber;
                cached: z$1.ZodBoolean;
                durationMs: z$1.ZodOptional<z$1.ZodNumber>;
                error: z$1.ZodOptional<z$1.ZodString>;
                index: z$1.ZodNumber;
                isolation: z$1.ZodOptional<z$1.ZodString>;
                label: z$1.ZodString;
                lastProgressAt: z$1.ZodNumber;
                lastToolName: z$1.ZodOptional<z$1.ZodString>;
                lastToolSummary: z$1.ZodOptional<z$1.ZodString>;
                model: z$1.ZodString;
                phaseIndex: z$1.ZodOptional<z$1.ZodNumber>;
                phaseTitle: z$1.ZodOptional<z$1.ZodString>;
                promptPreview: z$1.ZodOptional<z$1.ZodString>;
                queuedAt: z$1.ZodOptional<z$1.ZodNumber>;
                resultPreview: z$1.ZodOptional<z$1.ZodString>;
                startedAt: z$1.ZodOptional<z$1.ZodNumber>;
                state: z$1.ZodEnum<{
                    done: "done";
                    failed: "failed";
                    queued: "queued";
                    running: "running";
                    skipped: "skipped";
                }>;
                tokens: z$1.ZodOptional<z$1.ZodNumber>;
                toolCalls: z$1.ZodOptional<z$1.ZodNumber>;
            }, z$1.core.$strip>>;
            phases: z$1.ZodArray<z$1.ZodObject<{
                index: z$1.ZodNumber;
                kind: z$1.ZodOptional<z$1.ZodString>;
                title: z$1.ZodString;
            }, z$1.core.$strip>>;
        }, z$1.core.$strip>>;
        workflowName: z$1.ZodOptional<z$1.ZodString>;
    }, z$1.core.$strip>;
    providerThreadId: z$1.ZodString;
    threadId: z$1.ZodString;
    type: z$1.ZodLiteral<"item/backgroundTask/progress">;
}, z$1.core.$strip>, z$1.ZodObject<{
    item: z$1.ZodObject<{
        description: z$1.ZodString;
        error: z$1.ZodOptional<z$1.ZodString>;
        familyId: z$1.ZodOptional<z$1.ZodString>;
        id: z$1.ZodString;
        outputFile: z$1.ZodOptional<z$1.ZodString>;
        parentToolCallId: z$1.ZodOptional<z$1.ZodString>;
        presentation: z$1.ZodOptional<z$1.ZodObject<{
            badge: z$1.ZodOptional<z$1.ZodObject<{
                glyph: z$1.ZodString;
                hint: z$1.ZodString;
                label: z$1.ZodString;
                tone: z$1.ZodEnum<{
                    destructive: "destructive";
                    neutral: "neutral";
                }>;
            }, z$1.core.$strip>>;
            detail: z$1.ZodOptional<z$1.ZodString>;
            icon: z$1.ZodObject<{
                glyph: z$1.ZodString;
            }, z$1.core.$strip>;
            label: z$1.ZodObject<{
                completed: z$1.ZodString;
                pending: z$1.ZodString;
            }, z$1.core.$strip>;
            suppress: z$1.ZodOptional<z$1.ZodBoolean>;
            tint: z$1.ZodOptional<z$1.ZodObject<{
                dark: z$1.ZodString;
                light: z$1.ZodString;
            }, z$1.core.$strip>>;
            title: z$1.ZodOptional<z$1.ZodString>;
        }, z$1.core.$strip>>;
        skipTranscript: z$1.ZodBoolean;
        status: z$1.ZodEnum<{
            completed: "completed";
            failed: "failed";
            interrupted: "interrupted";
            pending: "pending";
        }>;
        summary: z$1.ZodOptional<z$1.ZodString>;
        taskStatus: z$1.ZodEnum<{
            completed: "completed";
            failed: "failed";
            killed: "killed";
            paused: "paused";
            pending: "pending";
            running: "running";
            stopped: "stopped";
        }>;
        taskType: z$1.ZodString;
        type: z$1.ZodLiteral<"backgroundTask">;
        usage: z$1.ZodOptional<z$1.ZodObject<{
            durationMs: z$1.ZodNumber;
            toolUses: z$1.ZodNumber;
            totalTokens: z$1.ZodNumber;
        }, z$1.core.$strip>>;
        workflow: z$1.ZodOptional<z$1.ZodObject<{
            agents: z$1.ZodArray<z$1.ZodObject<{
                agentType: z$1.ZodOptional<z$1.ZodString>;
                attempt: z$1.ZodNumber;
                cached: z$1.ZodBoolean;
                durationMs: z$1.ZodOptional<z$1.ZodNumber>;
                error: z$1.ZodOptional<z$1.ZodString>;
                index: z$1.ZodNumber;
                isolation: z$1.ZodOptional<z$1.ZodString>;
                label: z$1.ZodString;
                lastProgressAt: z$1.ZodNumber;
                lastToolName: z$1.ZodOptional<z$1.ZodString>;
                lastToolSummary: z$1.ZodOptional<z$1.ZodString>;
                model: z$1.ZodString;
                phaseIndex: z$1.ZodOptional<z$1.ZodNumber>;
                phaseTitle: z$1.ZodOptional<z$1.ZodString>;
                promptPreview: z$1.ZodOptional<z$1.ZodString>;
                queuedAt: z$1.ZodOptional<z$1.ZodNumber>;
                resultPreview: z$1.ZodOptional<z$1.ZodString>;
                startedAt: z$1.ZodOptional<z$1.ZodNumber>;
                state: z$1.ZodEnum<{
                    done: "done";
                    failed: "failed";
                    queued: "queued";
                    running: "running";
                    skipped: "skipped";
                }>;
                tokens: z$1.ZodOptional<z$1.ZodNumber>;
                toolCalls: z$1.ZodOptional<z$1.ZodNumber>;
            }, z$1.core.$strip>>;
            phases: z$1.ZodArray<z$1.ZodObject<{
                index: z$1.ZodNumber;
                kind: z$1.ZodOptional<z$1.ZodString>;
                title: z$1.ZodString;
            }, z$1.core.$strip>>;
        }, z$1.core.$strip>>;
        workflowName: z$1.ZodOptional<z$1.ZodString>;
    }, z$1.core.$strip>;
    providerThreadId: z$1.ZodString;
    threadId: z$1.ZodString;
    type: z$1.ZodLiteral<"item/backgroundTask/completed">;
}, z$1.core.$strip>, z$1.ZodObject<{
    item: z$1.ZodObject<{
        background: z$1.ZodBoolean;
        childRef: z$1.ZodString;
        id: z$1.ZodString;
        label: z$1.ZodString;
        parentToolCallId: z$1.ZodOptional<z$1.ZodString>;
        presentation: z$1.ZodOptional<z$1.ZodObject<{
            badge: z$1.ZodOptional<z$1.ZodObject<{
                glyph: z$1.ZodString;
                hint: z$1.ZodString;
                label: z$1.ZodString;
                tone: z$1.ZodEnum<{
                    destructive: "destructive";
                    neutral: "neutral";
                }>;
            }, z$1.core.$strip>>;
            detail: z$1.ZodOptional<z$1.ZodString>;
            icon: z$1.ZodObject<{
                glyph: z$1.ZodString;
            }, z$1.core.$strip>;
            label: z$1.ZodObject<{
                completed: z$1.ZodString;
                pending: z$1.ZodString;
            }, z$1.core.$strip>;
            suppress: z$1.ZodOptional<z$1.ZodBoolean>;
            tint: z$1.ZodOptional<z$1.ZodObject<{
                dark: z$1.ZodString;
                light: z$1.ZodString;
            }, z$1.core.$strip>>;
            title: z$1.ZodOptional<z$1.ZodString>;
        }, z$1.core.$strip>>;
        status: z$1.ZodEnum<{
            completed: "completed";
            failed: "failed";
            interrupted: "interrupted";
            pending: "pending";
        }>;
        summary: z$1.ZodOptional<z$1.ZodString>;
        type: z$1.ZodLiteral<"delegation">;
    }, z$1.core.$strip>;
    providerThreadId: z$1.ZodString;
    threadId: z$1.ZodString;
    type: z$1.ZodLiteral<"item/delegation/progress">;
}, z$1.core.$strip>, z$1.ZodObject<{
    item: z$1.ZodObject<{
        background: z$1.ZodBoolean;
        childRef: z$1.ZodString;
        id: z$1.ZodString;
        label: z$1.ZodString;
        parentToolCallId: z$1.ZodOptional<z$1.ZodString>;
        presentation: z$1.ZodOptional<z$1.ZodObject<{
            badge: z$1.ZodOptional<z$1.ZodObject<{
                glyph: z$1.ZodString;
                hint: z$1.ZodString;
                label: z$1.ZodString;
                tone: z$1.ZodEnum<{
                    destructive: "destructive";
                    neutral: "neutral";
                }>;
            }, z$1.core.$strip>>;
            detail: z$1.ZodOptional<z$1.ZodString>;
            icon: z$1.ZodObject<{
                glyph: z$1.ZodString;
            }, z$1.core.$strip>;
            label: z$1.ZodObject<{
                completed: z$1.ZodString;
                pending: z$1.ZodString;
            }, z$1.core.$strip>;
            suppress: z$1.ZodOptional<z$1.ZodBoolean>;
            tint: z$1.ZodOptional<z$1.ZodObject<{
                dark: z$1.ZodString;
                light: z$1.ZodString;
            }, z$1.core.$strip>>;
            title: z$1.ZodOptional<z$1.ZodString>;
        }, z$1.core.$strip>>;
        status: z$1.ZodEnum<{
            completed: "completed";
            failed: "failed";
            interrupted: "interrupted";
            pending: "pending";
        }>;
        summary: z$1.ZodOptional<z$1.ZodString>;
        type: z$1.ZodLiteral<"delegation">;
    }, z$1.core.$strip>;
    providerThreadId: z$1.ZodString;
    threadId: z$1.ZodString;
    type: z$1.ZodLiteral<"item/delegation/completed">;
}, z$1.core.$strip>, z$1.ZodObject<{
    providerThreadId: z$1.ZodString;
    threadId: z$1.ZodString;
    tokenUsage: z$1.ZodObject<{
        last: z$1.ZodObject<{
            cacheReadInputTokens: z$1.ZodOptional<z$1.ZodNumber>;
            cacheWriteInputTokens: z$1.ZodOptional<z$1.ZodNumber>;
            cachedInputTokens: z$1.ZodNumber;
            inputTokens: z$1.ZodNumber;
            outputTokens: z$1.ZodNumber;
            reasoningOutputTokens: z$1.ZodNumber;
            totalTokens: z$1.ZodNumber;
        }, z$1.core.$strip>;
        modelContextWindow: z$1.ZodNullable<z$1.ZodNumber>;
        total: z$1.ZodObject<{
            cacheReadInputTokens: z$1.ZodOptional<z$1.ZodNumber>;
            cacheWriteInputTokens: z$1.ZodOptional<z$1.ZodNumber>;
            cachedInputTokens: z$1.ZodNumber;
            inputTokens: z$1.ZodNumber;
            outputTokens: z$1.ZodNumber;
            reasoningOutputTokens: z$1.ZodNumber;
            totalTokens: z$1.ZodNumber;
        }, z$1.core.$strip>;
    }, z$1.core.$strip>;
    type: z$1.ZodLiteral<"thread/tokenUsage/updated">;
}, z$1.core.$strip>, z$1.ZodObject<{
    contextWindowUsage: z$1.ZodObject<{
        estimated: z$1.ZodBoolean;
        modelContextWindow: z$1.ZodNullable<z$1.ZodNumber>;
        snapshot: z$1.ZodOptional<z$1.ZodObject<{
            autoCompactAtTokens: z$1.ZodNullable<z$1.ZodNumber>;
            capturedAt: z$1.ZodISODateTime;
            categories: z$1.ZodArray<z$1.ZodObject<{
                entries: z$1.ZodArray<z$1.ZodObject<{
                    id: z$1.ZodString;
                    label: z$1.ZodString;
                    tokens: z$1.ZodNumber;
                }, z$1.core.$strip>>;
                id: z$1.ZodString;
                kind: z$1.ZodEnum<{
                    deferred: "deferred";
                    free: "free";
                    reserved: "reserved";
                    used: "used";
                }>;
                label: z$1.ZodString;
                tokens: z$1.ZodNumber;
            }, z$1.core.$strip>>;
            contextWindowTokens: z$1.ZodNumber;
            estimated: z$1.ZodBoolean;
            model: z$1.ZodString;
            providerSessionId: z$1.ZodString;
            providerTurnId: z$1.ZodNullable<z$1.ZodString>;
            usedTokens: z$1.ZodNumber;
        }, z$1.core.$strip>>;
        usedTokens: z$1.ZodNullable<z$1.ZodNumber>;
    }, z$1.core.$strip>;
    providerThreadId: z$1.ZodString;
    threadId: z$1.ZodString;
    type: z$1.ZodLiteral<"thread/contextWindowUsage/updated">;
}, z$1.core.$strip>, z$1.ZodObject<{
    explanation: z$1.ZodOptional<z$1.ZodString>;
    plan: z$1.ZodArray<z$1.ZodObject<{
        status: z$1.ZodOptional<z$1.ZodEnum<{
            active: "active";
            completed: "completed";
            failed: "failed";
            pending: "pending";
        }>>;
        step: z$1.ZodString;
    }, z$1.core.$strip>>;
    providerThreadId: z$1.ZodString;
    threadId: z$1.ZodString;
    type: z$1.ZodLiteral<"turn/plan/updated">;
}, z$1.core.$strip>, z$1.ZodObject<{
    diff: z$1.ZodOptional<z$1.ZodString>;
    providerThreadId: z$1.ZodString;
    threadId: z$1.ZodString;
    type: z$1.ZodLiteral<"turn/diff/updated">;
}, z$1.core.$strip>, z$1.ZodObject<{
    detail: z$1.ZodOptional<z$1.ZodString>;
    errorInfo: z$1.ZodOptional<z$1.ZodObject<{
        category: z$1.ZodEnum<{
            "active-turn-not-steerable": "active-turn-not-steerable";
            "bad-request": "bad-request";
            "budget-exceeded": "budget-exceeded";
            "connection-failed": "connection-failed";
            "context-window-exceeded": "context-window-exceeded";
            "max-output-tokens": "max-output-tokens";
            "max-turns": "max-turns";
            "rate-limit": "rate-limit";
            "stream-disconnected": "stream-disconnected";
            "structured-output-retries": "structured-output-retries";
            "thread-rollback-failed": "thread-rollback-failed";
            "too-many-failed-attempts": "too-many-failed-attempts";
            billing: "billing";
            internal: "internal";
            overloaded: "overloaded";
            policy: "policy";
            sandbox: "sandbox";
            unauthorized: "unauthorized";
            unknown: "unknown";
        }>;
        httpStatusCode: z$1.ZodNullable<z$1.ZodNumber>;
        providerCode: z$1.ZodNullable<z$1.ZodString>;
    }, z$1.core.$strip>>;
    message: z$1.ZodString;
    providerThreadId: z$1.ZodString;
    threadId: z$1.ZodString;
    type: z$1.ZodLiteral<"provider/error">;
    willRetry: z$1.ZodOptional<z$1.ZodBoolean>;
}, z$1.core.$strip>, z$1.ZodObject<{
    providerThreadId: z$1.ZodString;
    rateLimits: z$1.ZodObject<{
        kind: z$1.ZodEnum<{
            "spend-control": "spend-control";
            "subscription-window": "subscription-window";
            credits: "credits";
            unknown: "unknown";
        }>;
        overageReason: z$1.ZodNullable<z$1.ZodString>;
        overageStatus: z$1.ZodNullable<z$1.ZodEnum<{
            allowed: "allowed";
            rejected: "rejected";
            unavailable: "unavailable";
            warning: "warning";
        }>>;
        providerId: z$1.ZodString;
        reachedReason: z$1.ZodNullable<z$1.ZodString>;
        status: z$1.ZodEnum<{
            allowed: "allowed";
            blocked: "blocked";
            unknown: "unknown";
            warning: "warning";
        }>;
        windows: z$1.ZodArray<z$1.ZodObject<{
            label: z$1.ZodNullable<z$1.ZodString>;
            providerKey: z$1.ZodNullable<z$1.ZodString>;
            resetsAtMs: z$1.ZodNullable<z$1.ZodNumber>;
            status: z$1.ZodEnum<{
                allowed: "allowed";
                blocked: "blocked";
                unknown: "unknown";
                warning: "warning";
            }>;
        }, z$1.core.$strip>>;
    }, z$1.core.$strip>;
    threadId: z$1.ZodString;
    type: z$1.ZodLiteral<"provider/rateLimits/updated">;
}, z$1.core.$strip>, z$1.ZodObject<{
    entries: z$1.ZodArray<z$1.ZodObject<{
        name: z$1.ZodString;
        reason: z$1.ZodOptional<z$1.ZodString>;
        source: z$1.ZodUnion<readonly [z$1.ZodLiteral<"shell">, z$1.ZodObject<{
            plugin: z$1.ZodString;
        }, z$1.core.$strict>, z$1.ZodObject<{
            core: z$1.ZodEnum<{
                "machine-environment": "machine-environment";
                "machine-git": "machine-git";
                "project-environment": "project-environment";
            }>;
        }, z$1.core.$strict>]>;
        value: z$1.ZodUnion<readonly [z$1.ZodString, z$1.ZodObject<{
            masked: z$1.ZodLiteral<true>;
        }, z$1.core.$strict>]>;
    }, z$1.core.$strict>>;
    providerThreadId: z$1.ZodString;
    threadId: z$1.ZodString;
    type: z$1.ZodLiteral<"provider.env-resolved">;
}, z$1.core.$strip>, z$1.ZodObject<{
    kind: z$1.ZodString & z$1.ZodType<`${string}/${string}`, string, z$1.core.$ZodTypeInternals<`${string}/${string}`, string>>;
    payload: z$1.ZodType<JsonValue, unknown, z$1.core.$ZodTypeInternals<JsonValue, unknown>>;
    providerThreadId: z$1.ZodString;
    threadId: z$1.ZodString;
    type: z$1.ZodLiteral<"thread/extensionState/updated">;
}, z$1.core.$strip>, z$1.ZodObject<{
    category: z$1.ZodEnum<{
        "compaction-skipped": "compaction-skipped";
        config: "config";
        deprecation: "deprecation";
        general: "general";
    }>;
    details: z$1.ZodOptional<z$1.ZodString>;
    providerThreadId: z$1.ZodString;
    summary: z$1.ZodOptional<z$1.ZodString>;
    threadId: z$1.ZodString;
    type: z$1.ZodLiteral<"provider/warning">;
}, z$1.core.$strip>, z$1.ZodObject<{
    fallbackModel: z$1.ZodString;
    message: z$1.ZodString;
    originalModel: z$1.ZodString;
    providerThreadId: z$1.ZodString;
    reason: z$1.ZodEnum<{
        provider: "provider";
        refusal: "refusal";
    }>;
    threadId: z$1.ZodString;
    type: z$1.ZodLiteral<"provider/modelFallback">;
}, z$1.core.$strip>, z$1.ZodObject<{
    parentToolCallId: z$1.ZodOptional<z$1.ZodString>;
    providerId: z$1.ZodString;
    providerThreadId: z$1.ZodString;
    rawEvent: z$1.ZodObject<{
        id: z$1.ZodOptional<z$1.ZodUnion<readonly [z$1.ZodString, z$1.ZodNumber]>>;
        jsonrpc: z$1.ZodLiteral<"2.0">;
        method: z$1.ZodString;
        params: z$1.ZodOptional<z$1.ZodType<JsonValue, unknown, z$1.core.$ZodTypeInternals<JsonValue, unknown>>>;
    }, z$1.core.$strip>;
    rawType: z$1.ZodString;
    threadId: z$1.ZodString;
    type: z$1.ZodLiteral<"provider/unhandled">;
}, z$1.core.$strip>], "type">, z$1.ZodObject<{
    scope: z$1.ZodDiscriminatedUnion<[z$1.ZodObject<{
        kind: z$1.ZodLiteral<"thread">;
    }, z$1.core.$strip>, z$1.ZodObject<{
        kind: z$1.ZodLiteral<"turn">;
        turnId: z$1.ZodString;
    }, z$1.core.$strip>], "kind">;
}, z$1.core.$strip>>, z$1.ZodIntersection<z$1.ZodDiscriminatedUnion<[z$1.ZodObject<{
    direction: z$1.ZodLiteral<"outbound">;
    initiator: z$1.ZodEnum<{
        agent: "agent";
        system: "system";
        user: "user";
    }>;
    request: z$1.ZodObject<{
        method: z$1.ZodEnum<{
            "thread/start": "thread/start";
            "turn/start": "turn/start";
        }>;
        params: z$1.ZodRecord<z$1.ZodString, z$1.ZodUnknown>;
    }, z$1.core.$strip>;
    source: z$1.ZodEnum<{
        spawn: "spawn";
        tell: "tell";
    }>;
    threadId: z$1.ZodString;
    type: z$1.ZodLiteral<"client/thread/start">;
}, z$1.core.$strip>, z$1.ZodObject<{
    direction: z$1.ZodLiteral<"outbound">;
    execution: z$1.ZodObject<{
        model: z$1.ZodString;
        permissionMode: z$1.ZodEnum<{
            "accept-edits": "accept-edits";
            "workspace-write": "workspace-write";
            auto: "auto";
            full: "full";
            readonly: "readonly";
        }>;
        reasoningLevel: z$1.ZodEnum<{
            high: "high";
            low: "low";
            max: "max";
            medium: "medium";
            none: "none";
            ultra: "ultra";
            ultracode: "ultracode";
            xhigh: "xhigh";
        }>;
        seq: z$1.ZodOptional<z$1.ZodNumber>;
        serviceTier: z$1.ZodEnum<{
            default: "default";
            fast: "fast";
        }>;
        source: z$1.ZodEnum<{
            "client/thread/start": "client/thread/start";
            "client/turn/requested": "client/turn/requested";
            "client/turn/start": "client/turn/start";
        }>;
    }, z$1.core.$strip>;
    initiator: z$1.ZodEnum<{
        agent: "agent";
        system: "system";
        user: "user";
    }>;
    input: z$1.ZodArray<z$1.ZodDiscriminatedUnion<[z$1.ZodObject<{
        mentions: z$1.ZodDefault<z$1.ZodArray<z$1.ZodObject<{
            end: z$1.ZodNumber;
            resource: z$1.ZodPipe<z$1.ZodTransform<unknown, unknown>, z$1.ZodDiscriminatedUnion<[z$1.ZodObject<{
                kind: z$1.ZodLiteral<"thread">;
                label: z$1.ZodString;
                projectId: z$1.ZodOptional<z$1.ZodString>;
                threadId: z$1.ZodString;
            }, z$1.core.$strip>, z$1.ZodObject<{
                kind: z$1.ZodLiteral<"project">;
                label: z$1.ZodString;
                projectId: z$1.ZodString;
            }, z$1.core.$strip>, z$1.ZodObject<{
                kind: z$1.ZodLiteral<"section">;
                label: z$1.ZodString;
                sectionId: z$1.ZodString;
            }, z$1.core.$strip>, z$1.ZodObject<{
                entryKind: z$1.ZodEnum<{
                    directory: "directory";
                    file: "file";
                }>;
                kind: z$1.ZodLiteral<"path">;
                label: z$1.ZodString;
                path: z$1.ZodString;
                source: z$1.ZodEnum<{
                    "thread-storage": "thread-storage";
                    workspace: "workspace";
                }>;
            }, z$1.core.$strip>, z$1.ZodObject<{
                argumentHint: z$1.ZodNullable<z$1.ZodString>;
                kind: z$1.ZodLiteral<"command">;
                label: z$1.ZodString;
                name: z$1.ZodString;
                origin: z$1.ZodEnum<{
                    builtin: "builtin";
                    project: "project";
                    user: "user";
                }>;
                source: z$1.ZodEnum<{
                    command: "command";
                    skill: "skill";
                }>;
                trigger: z$1.ZodEnum<{
                    "/": "/";
                    $: "$";
                }>;
            }, z$1.core.$strip>, z$1.ZodObject<{
                icon: z$1.ZodOptional<z$1.ZodNullable<z$1.ZodString>>;
                itemId: z$1.ZodString;
                kind: z$1.ZodLiteral<"plugin">;
                label: z$1.ZodString;
                pluginId: z$1.ZodString;
            }, z$1.core.$strip>], "kind">>;
            start: z$1.ZodNumber;
        }, z$1.core.$strip>>>;
        text: z$1.ZodString;
        type: z$1.ZodLiteral<"text">;
        visibility: z$1.ZodOptional<z$1.ZodEnum<{
            "agent-only": "agent-only";
        }>>;
    }, z$1.core.$strip>, z$1.ZodObject<{
        type: z$1.ZodLiteral<"image">;
        url: z$1.ZodString;
        visibility: z$1.ZodOptional<z$1.ZodEnum<{
            "agent-only": "agent-only";
        }>>;
    }, z$1.core.$strip>, z$1.ZodObject<{
        path: z$1.ZodString;
        type: z$1.ZodLiteral<"localImage">;
        visibility: z$1.ZodOptional<z$1.ZodEnum<{
            "agent-only": "agent-only";
        }>>;
    }, z$1.core.$strip>, z$1.ZodObject<{
        mimeType: z$1.ZodOptional<z$1.ZodString>;
        name: z$1.ZodOptional<z$1.ZodString>;
        path: z$1.ZodString;
        sizeBytes: z$1.ZodOptional<z$1.ZodNumber>;
        type: z$1.ZodLiteral<"localFile">;
        visibility: z$1.ZodOptional<z$1.ZodEnum<{
            "agent-only": "agent-only";
        }>>;
    }, z$1.core.$strip>], "type">>;
    inputGroups: z$1.ZodOptional<z$1.ZodArray<z$1.ZodArray<z$1.ZodDiscriminatedUnion<[z$1.ZodObject<{
        mentions: z$1.ZodDefault<z$1.ZodArray<z$1.ZodObject<{
            end: z$1.ZodNumber;
            resource: z$1.ZodPipe<z$1.ZodTransform<unknown, unknown>, z$1.ZodDiscriminatedUnion<[z$1.ZodObject<{
                kind: z$1.ZodLiteral<"thread">;
                label: z$1.ZodString;
                projectId: z$1.ZodOptional<z$1.ZodString>;
                threadId: z$1.ZodString;
            }, z$1.core.$strip>, z$1.ZodObject<{
                kind: z$1.ZodLiteral<"project">;
                label: z$1.ZodString;
                projectId: z$1.ZodString;
            }, z$1.core.$strip>, z$1.ZodObject<{
                kind: z$1.ZodLiteral<"section">;
                label: z$1.ZodString;
                sectionId: z$1.ZodString;
            }, z$1.core.$strip>, z$1.ZodObject<{
                entryKind: z$1.ZodEnum<{
                    directory: "directory";
                    file: "file";
                }>;
                kind: z$1.ZodLiteral<"path">;
                label: z$1.ZodString;
                path: z$1.ZodString;
                source: z$1.ZodEnum<{
                    "thread-storage": "thread-storage";
                    workspace: "workspace";
                }>;
            }, z$1.core.$strip>, z$1.ZodObject<{
                argumentHint: z$1.ZodNullable<z$1.ZodString>;
                kind: z$1.ZodLiteral<"command">;
                label: z$1.ZodString;
                name: z$1.ZodString;
                origin: z$1.ZodEnum<{
                    builtin: "builtin";
                    project: "project";
                    user: "user";
                }>;
                source: z$1.ZodEnum<{
                    command: "command";
                    skill: "skill";
                }>;
                trigger: z$1.ZodEnum<{
                    "/": "/";
                    $: "$";
                }>;
            }, z$1.core.$strip>, z$1.ZodObject<{
                icon: z$1.ZodOptional<z$1.ZodNullable<z$1.ZodString>>;
                itemId: z$1.ZodString;
                kind: z$1.ZodLiteral<"plugin">;
                label: z$1.ZodString;
                pluginId: z$1.ZodString;
            }, z$1.core.$strip>], "kind">>;
            start: z$1.ZodNumber;
        }, z$1.core.$strip>>>;
        text: z$1.ZodString;
        type: z$1.ZodLiteral<"text">;
        visibility: z$1.ZodOptional<z$1.ZodEnum<{
            "agent-only": "agent-only";
        }>>;
    }, z$1.core.$strip>, z$1.ZodObject<{
        type: z$1.ZodLiteral<"image">;
        url: z$1.ZodString;
        visibility: z$1.ZodOptional<z$1.ZodEnum<{
            "agent-only": "agent-only";
        }>>;
    }, z$1.core.$strip>, z$1.ZodObject<{
        path: z$1.ZodString;
        type: z$1.ZodLiteral<"localImage">;
        visibility: z$1.ZodOptional<z$1.ZodEnum<{
            "agent-only": "agent-only";
        }>>;
    }, z$1.core.$strip>, z$1.ZodObject<{
        mimeType: z$1.ZodOptional<z$1.ZodString>;
        name: z$1.ZodOptional<z$1.ZodString>;
        path: z$1.ZodString;
        sizeBytes: z$1.ZodOptional<z$1.ZodNumber>;
        type: z$1.ZodLiteral<"localFile">;
        visibility: z$1.ZodOptional<z$1.ZodEnum<{
            "agent-only": "agent-only";
        }>>;
    }, z$1.core.$strip>], "type">>>>;
    request: z$1.ZodObject<{
        method: z$1.ZodEnum<{
            "thread/start": "thread/start";
            "turn/start": "turn/start";
        }>;
        params: z$1.ZodRecord<z$1.ZodString, z$1.ZodUnknown>;
    }, z$1.core.$strip>;
    requestId: z$1.ZodString;
    retryAttempt: z$1.ZodOptional<z$1.ZodNumber>;
    retryOfRequestId: z$1.ZodOptional<z$1.ZodString>;
    senderThreadId: z$1.ZodNullable<z$1.ZodString>;
    source: z$1.ZodEnum<{
        spawn: "spawn";
        tell: "tell";
    }>;
    systemMessageKind: z$1.ZodOptional<z$1.ZodEnum<{
        "child-completed": "child-completed";
        "child-failed": "child-failed";
        "child-interrupted": "child-interrupted";
        "child-needs-attention": "child-needs-attention";
        "child-outcome-batch": "child-outcome-batch";
        "ownership-assigned": "ownership-assigned";
        "ownership-removed": "ownership-removed";
        "tool-result-delivered": "tool-result-delivered";
        unlabeled: "unlabeled";
    }>>;
    systemMessageSubject: z$1.ZodOptional<z$1.ZodNullable<z$1.ZodDiscriminatedUnion<[z$1.ZodObject<{
        kind: z$1.ZodLiteral<"thread">;
        threadId: z$1.ZodString;
        threadName: z$1.ZodString;
    }, z$1.core.$strip>, z$1.ZodObject<{
        count: z$1.ZodNumber;
        kind: z$1.ZodLiteral<"thread-batch">;
    }, z$1.core.$strip>, z$1.ZodObject<{
        kind: z$1.ZodLiteral<"tool-call">;
        suppress: z$1.ZodBoolean;
        toolName: z$1.ZodString;
    }, z$1.core.$strip>], "kind">>>;
    target: z$1.ZodDiscriminatedUnion<[z$1.ZodObject<{
        kind: z$1.ZodLiteral<"thread-start">;
    }, z$1.core.$strip>, z$1.ZodObject<{
        kind: z$1.ZodLiteral<"new-turn">;
    }, z$1.core.$strip>, z$1.ZodObject<{
        expectedTurnId: z$1.ZodNullable<z$1.ZodString>;
        kind: z$1.ZodLiteral<"auto">;
    }, z$1.core.$strip>, z$1.ZodObject<{
        expectedTurnId: z$1.ZodNullable<z$1.ZodString>;
        kind: z$1.ZodLiteral<"steer">;
    }, z$1.core.$strip>], "kind">;
    threadId: z$1.ZodString;
    type: z$1.ZodLiteral<"client/turn/requested">;
}, z$1.core.$strip>, z$1.ZodObject<{
    message: z$1.ZodString;
    reason: z$1.ZodString;
    requestId: z$1.ZodString;
    threadId: z$1.ZodString;
    type: z$1.ZodLiteral<"client/turn/rejected">;
}, z$1.core.$strip>, z$1.ZodObject<{
    direction: z$1.ZodLiteral<"outbound">;
    initiator: z$1.ZodEnum<{
        agent: "agent";
        system: "system";
        user: "user";
    }>;
    request: z$1.ZodObject<{
        method: z$1.ZodEnum<{
            "thread/start": "thread/start";
            "turn/start": "turn/start";
        }>;
        params: z$1.ZodRecord<z$1.ZodString, z$1.ZodUnknown>;
    }, z$1.core.$strip>;
    source: z$1.ZodEnum<{
        spawn: "spawn";
        tell: "tell";
    }>;
    threadId: z$1.ZodString;
    type: z$1.ZodLiteral<"client/turn/start">;
}, z$1.core.$strip>, z$1.ZodObject<{
    code: z$1.ZodOptional<z$1.ZodString>;
    detail: z$1.ZodOptional<z$1.ZodString>;
    message: z$1.ZodString;
    reconnectAttempt: z$1.ZodOptional<z$1.ZodNumber>;
    reconnectTotal: z$1.ZodOptional<z$1.ZodNumber>;
    threadId: z$1.ZodString;
    type: z$1.ZodLiteral<"system/error">;
}, z$1.core.$strip>, z$1.ZodObject<{
    text: z$1.ZodString;
    threadId: z$1.ZodString;
    toolCallId: z$1.ZodOptional<z$1.ZodString>;
    turnId: z$1.ZodOptional<z$1.ZodString>;
    type: z$1.ZodLiteral<"system/manager/user_message">;
}, z$1.core.$strip>, z$1.ZodObject<{
    cause: z$1.ZodOptional<z$1.ZodLiteral<"host-connection-lost">>;
    reason: z$1.ZodEnum<{
        "host-daemon-restarted": "host-daemon-restarted";
        "manual-stop": "manual-stop";
        "provider-turn-idle": "provider-turn-idle";
    }>;
    threadId: z$1.ZodString;
    type: z$1.ZodLiteral<"system/thread/interrupted">;
}, z$1.core.$strip>, z$1.ZodObject<{
    message: z$1.ZodString;
    metadata: z$1.ZodOptional<z$1.ZodRecord<z$1.ZodString, z$1.ZodType<JsonValue, unknown, z$1.core.$ZodTypeInternals<JsonValue, unknown>>>>;
    operation: z$1.ZodString;
    operationId: z$1.ZodString;
    status: z$1.ZodString;
    threadId: z$1.ZodString;
    type: z$1.ZodLiteral<"system/operation">;
}, z$1.core.$strip>, z$1.ZodObject<{
    interaction: z$1.ZodUnion<readonly [z$1.ZodObject<{
        id: z$1.ZodString;
        origin: z$1.ZodObject<{
            kind: z$1.ZodLiteral<"provider">;
            providerId: z$1.ZodString;
            providerRequestId: z$1.ZodString;
        }, z$1.core.$strip>;
        payload: z$1.ZodObject<{
            kind: z$1.ZodLiteral<"approval">;
            reason: z$1.ZodNullable<z$1.ZodString>;
            subject: z$1.ZodDiscriminatedUnion<[z$1.ZodObject<{
                actions: z$1.ZodArray<z$1.ZodDiscriminatedUnion<[z$1.ZodObject<{
                    command: z$1.ZodString;
                    name: z$1.ZodString;
                    path: z$1.ZodString;
                    type: z$1.ZodLiteral<"read">;
                }, z$1.core.$strip>, z$1.ZodObject<{
                    command: z$1.ZodString;
                    path: z$1.ZodNullable<z$1.ZodString>;
                    type: z$1.ZodLiteral<"listFiles">;
                }, z$1.core.$strip>, z$1.ZodObject<{
                    command: z$1.ZodString;
                    path: z$1.ZodNullable<z$1.ZodString>;
                    query: z$1.ZodNullable<z$1.ZodString>;
                    type: z$1.ZodLiteral<"search">;
                }, z$1.core.$strip>, z$1.ZodObject<{
                    command: z$1.ZodString;
                    type: z$1.ZodLiteral<"unknown">;
                }, z$1.core.$strip>], "type">>;
                command: z$1.ZodString;
                cwd: z$1.ZodNullable<z$1.ZodString>;
                itemId: z$1.ZodString;
                kind: z$1.ZodLiteral<"command">;
                sessionGrant: z$1.ZodNullable<z$1.ZodObject<{
                    fileSystem: z$1.ZodNullable<z$1.ZodObject<{
                        read: z$1.ZodArray<z$1.ZodString>;
                        write: z$1.ZodArray<z$1.ZodString>;
                    }, z$1.core.$strip>>;
                    network: z$1.ZodNullable<z$1.ZodObject<{
                        enabled: z$1.ZodNullable<z$1.ZodBoolean>;
                    }, z$1.core.$strip>>;
                }, z$1.core.$strict>>;
            }, z$1.core.$strip>, z$1.ZodObject<{
                itemId: z$1.ZodString;
                kind: z$1.ZodLiteral<"file_change">;
                sessionGrant: z$1.ZodNullable<z$1.ZodObject<{
                    fileSystem: z$1.ZodNullable<z$1.ZodObject<{
                        read: z$1.ZodArray<z$1.ZodString>;
                        write: z$1.ZodArray<z$1.ZodString>;
                    }, z$1.core.$strip>>;
                    network: z$1.ZodNullable<z$1.ZodObject<{
                        enabled: z$1.ZodNullable<z$1.ZodBoolean>;
                    }, z$1.core.$strip>>;
                }, z$1.core.$strict>>;
                writeScope: z$1.ZodNullable<z$1.ZodString>;
            }, z$1.core.$strip>, z$1.ZodObject<{
                itemId: z$1.ZodString;
                kind: z$1.ZodLiteral<"permission_grant">;
                permissions: z$1.ZodObject<{
                    fileSystem: z$1.ZodNullable<z$1.ZodObject<{
                        read: z$1.ZodArray<z$1.ZodString>;
                        write: z$1.ZodArray<z$1.ZodString>;
                    }, z$1.core.$strip>>;
                    network: z$1.ZodNullable<z$1.ZodObject<{
                        enabled: z$1.ZodNullable<z$1.ZodBoolean>;
                    }, z$1.core.$strip>>;
                }, z$1.core.$strict>;
                toolName: z$1.ZodNullable<z$1.ZodString>;
            }, z$1.core.$strip>, z$1.ZodObject<{
                itemId: z$1.ZodString;
                kind: z$1.ZodLiteral<"plan">;
                plan: z$1.ZodString;
                planFilePath: z$1.ZodNullable<z$1.ZodString>;
            }, z$1.core.$strip>, z$1.ZodObject<{
                itemId: z$1.ZodString;
                kind: z$1.ZodLiteral<"tool_use">;
                presentation: z$1.ZodObject<{
                    badge: z$1.ZodOptional<z$1.ZodObject<{
                        glyph: z$1.ZodString;
                        hint: z$1.ZodString;
                        label: z$1.ZodString;
                        tone: z$1.ZodEnum<{
                            destructive: "destructive";
                            neutral: "neutral";
                        }>;
                    }, z$1.core.$strip>>;
                    detail: z$1.ZodOptional<z$1.ZodString>;
                    icon: z$1.ZodObject<{
                        glyph: z$1.ZodString;
                    }, z$1.core.$strip>;
                    label: z$1.ZodObject<{
                        completed: z$1.ZodString;
                        pending: z$1.ZodString;
                    }, z$1.core.$strip>;
                    suppress: z$1.ZodOptional<z$1.ZodBoolean>;
                    tint: z$1.ZodOptional<z$1.ZodObject<{
                        dark: z$1.ZodString;
                        light: z$1.ZodString;
                    }, z$1.core.$strip>>;
                    title: z$1.ZodOptional<z$1.ZodString>;
                }, z$1.core.$strip>;
                tool: z$1.ZodString;
            }, z$1.core.$strip>], "kind">;
        }, z$1.core.$strip>;
        resolution: z$1.ZodNullable<z$1.ZodDiscriminatedUnion<[z$1.ZodObject<{
            decision: z$1.ZodLiteral<"allow_once">;
            grantedPermissions: z$1.ZodNullable<z$1.ZodObject<{
                fileSystem: z$1.ZodNullable<z$1.ZodObject<{
                    read: z$1.ZodArray<z$1.ZodString>;
                    write: z$1.ZodArray<z$1.ZodString>;
                }, z$1.core.$strip>>;
                network: z$1.ZodNullable<z$1.ZodObject<{
                    enabled: z$1.ZodNullable<z$1.ZodBoolean>;
                }, z$1.core.$strip>>;
            }, z$1.core.$strict>>;
        }, z$1.core.$strip>, z$1.ZodObject<{
            decision: z$1.ZodLiteral<"allow_for_session">;
            grantedPermissions: z$1.ZodNullable<z$1.ZodObject<{
                fileSystem: z$1.ZodNullable<z$1.ZodObject<{
                    read: z$1.ZodArray<z$1.ZodString>;
                    write: z$1.ZodArray<z$1.ZodString>;
                }, z$1.core.$strip>>;
                network: z$1.ZodNullable<z$1.ZodObject<{
                    enabled: z$1.ZodNullable<z$1.ZodBoolean>;
                }, z$1.core.$strip>>;
            }, z$1.core.$strict>>;
        }, z$1.core.$strip>, z$1.ZodObject<{
            decision: z$1.ZodLiteral<"deny">;
        }, z$1.core.$strip>], "decision">>;
        status: z$1.ZodEnum<{
            interrupted: "interrupted";
            pending: "pending";
            resolved: "resolved";
            resolving: "resolving";
        }>;
        statusReason: z$1.ZodNullable<z$1.ZodString>;
    }, z$1.core.$strip>, z$1.ZodObject<{
        id: z$1.ZodString;
        origin: z$1.ZodObject<{
            kind: z$1.ZodLiteral<"provider">;
            providerId: z$1.ZodString;
            providerRequestId: z$1.ZodString;
        }, z$1.core.$strip>;
        payload: z$1.ZodObject<{
            kind: z$1.ZodLiteral<"user_question">;
            questions: z$1.ZodArray<z$1.ZodObject<{
                allowFreeText: z$1.ZodBoolean;
                id: z$1.ZodString;
                multiSelect: z$1.ZodBoolean;
                options: z$1.ZodOptional<z$1.ZodArray<z$1.ZodObject<{
                    description: z$1.ZodOptional<z$1.ZodString>;
                    label: z$1.ZodString;
                    value: z$1.ZodString;
                }, z$1.core.$strip>>>;
                prompt: z$1.ZodString;
                shortLabel: z$1.ZodOptional<z$1.ZodString>;
            }, z$1.core.$strip>>;
        }, z$1.core.$strip>;
        resolution: z$1.ZodNullable<z$1.ZodObject<{
            answers: z$1.ZodRecord<z$1.ZodString, z$1.ZodObject<{
                freeText: z$1.ZodOptional<z$1.ZodString>;
                selected: z$1.ZodArray<z$1.ZodString>;
            }, z$1.core.$strip>>;
            kind: z$1.ZodLiteral<"user_answer">;
        }, z$1.core.$strip>>;
        status: z$1.ZodEnum<{
            interrupted: "interrupted";
            pending: "pending";
            resolved: "resolved";
            resolving: "resolving";
        }>;
        statusReason: z$1.ZodNullable<z$1.ZodString>;
    }, z$1.core.$strip>, z$1.ZodObject<{
        id: z$1.ZodString;
        origin: z$1.ZodObject<{
            kind: z$1.ZodLiteral<"plugin">;
            pluginId: z$1.ZodString;
            rendererId: z$1.ZodString;
        }, z$1.core.$strip>;
        payload: z$1.ZodObject<{
            kind: z$1.ZodLiteral<"plugin">;
            presentation: z$1.ZodOptional<z$1.ZodObject<{
                badge: z$1.ZodOptional<z$1.ZodObject<{
                    glyph: z$1.ZodString;
                    hint: z$1.ZodString;
                    label: z$1.ZodString;
                    tone: z$1.ZodEnum<{
                        destructive: "destructive";
                        neutral: "neutral";
                    }>;
                }, z$1.core.$strip>>;
                detail: z$1.ZodOptional<z$1.ZodString>;
                icon: z$1.ZodObject<{
                    glyph: z$1.ZodString;
                }, z$1.core.$strip>;
                label: z$1.ZodObject<{
                    completed: z$1.ZodString;
                    pending: z$1.ZodString;
                }, z$1.core.$strip>;
                suppress: z$1.ZodOptional<z$1.ZodBoolean>;
                tint: z$1.ZodOptional<z$1.ZodObject<{
                    dark: z$1.ZodString;
                    light: z$1.ZodString;
                }, z$1.core.$strip>>;
                title: z$1.ZodOptional<z$1.ZodString>;
            }, z$1.core.$strip>>;
            title: z$1.ZodString;
        }, z$1.core.$strip>;
        resolution: z$1.ZodNullable<z$1.ZodObject<{
            description: z$1.ZodOptional<z$1.ZodObject<{
                detail: z$1.ZodOptional<z$1.ZodString>;
                payload: z$1.ZodOptional<z$1.ZodType<JsonValue, unknown, z$1.core.$ZodTypeInternals<JsonValue, unknown>>>;
                title: z$1.ZodOptional<z$1.ZodString>;
            }, z$1.core.$strip>>;
            kind: z$1.ZodLiteral<"plugin_submitted">;
        }, z$1.core.$strip>>;
        status: z$1.ZodEnum<{
            interrupted: "interrupted";
            pending: "pending";
            resolved: "resolved";
            resolving: "resolving";
        }>;
        statusReason: z$1.ZodNullable<z$1.ZodString>;
    }, z$1.core.$strip>, z$1.ZodObject<{
        id: z$1.ZodString;
        origin: z$1.ZodObject<{
            kind: z$1.ZodLiteral<"provider">;
            providerId: z$1.ZodString;
            providerRequestId: z$1.ZodString;
        }, z$1.core.$strip>;
        payload: z$1.ZodObject<{
            kind: z$1.ZodString & z$1.ZodType<`${string}/${string}`, string, z$1.core.$ZodTypeInternals<`${string}/${string}`, string>>;
            title: z$1.ZodString;
        }, z$1.core.$strip>;
        resolution: z$1.ZodNullable<z$1.ZodObject<{
            kind: z$1.ZodLiteral<"request_answer">;
        }, z$1.core.$strip>>;
        status: z$1.ZodEnum<{
            interrupted: "interrupted";
            pending: "pending";
            resolved: "resolved";
            resolving: "resolving";
        }>;
        statusReason: z$1.ZodNullable<z$1.ZodString>;
    }, z$1.core.$strip>]>;
    threadId: z$1.ZodString;
    type: z$1.ZodLiteral<"system/interaction/lifecycle">;
}, z$1.core.$strip>, z$1.ZodObject<{
    interactionId: z$1.ZodString;
    providerId: z$1.ZodString;
    providerRequestId: z$1.ZodString;
    resolution: z$1.ZodDefault<z$1.ZodNullable<z$1.ZodDiscriminatedUnion<[z$1.ZodObject<{
        decision: z$1.ZodLiteral<"allow_once">;
        grantedPermissions: z$1.ZodNullable<z$1.ZodObject<{
            fileSystem: z$1.ZodNullable<z$1.ZodObject<{
                read: z$1.ZodArray<z$1.ZodString>;
                write: z$1.ZodArray<z$1.ZodString>;
            }, z$1.core.$strip>>;
            network: z$1.ZodNullable<z$1.ZodObject<{
                enabled: z$1.ZodNullable<z$1.ZodBoolean>;
            }, z$1.core.$strip>>;
        }, z$1.core.$strict>>;
    }, z$1.core.$strip>, z$1.ZodObject<{
        decision: z$1.ZodLiteral<"allow_for_session">;
        grantedPermissions: z$1.ZodNullable<z$1.ZodObject<{
            fileSystem: z$1.ZodNullable<z$1.ZodObject<{
                read: z$1.ZodArray<z$1.ZodString>;
                write: z$1.ZodArray<z$1.ZodString>;
            }, z$1.core.$strip>>;
            network: z$1.ZodNullable<z$1.ZodObject<{
                enabled: z$1.ZodNullable<z$1.ZodBoolean>;
            }, z$1.core.$strip>>;
        }, z$1.core.$strict>>;
    }, z$1.core.$strip>, z$1.ZodObject<{
        decision: z$1.ZodLiteral<"deny">;
    }, z$1.core.$strip>], "decision">>>;
    status: z$1.ZodEnum<{
        interrupted: "interrupted";
        pending: "pending";
        resolved: "resolved";
        resolving: "resolving";
    }>;
    statusReason: z$1.ZodDefault<z$1.ZodNullable<z$1.ZodString>>;
    subject: z$1.ZodObject<{
        itemId: z$1.ZodString;
        kind: z$1.ZodLiteral<"permission_grant">;
        permissions: z$1.ZodObject<{
            fileSystem: z$1.ZodNullable<z$1.ZodObject<{
                read: z$1.ZodArray<z$1.ZodString>;
                write: z$1.ZodArray<z$1.ZodString>;
            }, z$1.core.$strip>>;
            network: z$1.ZodNullable<z$1.ZodObject<{
                enabled: z$1.ZodNullable<z$1.ZodBoolean>;
            }, z$1.core.$strip>>;
        }, z$1.core.$strict>;
        toolName: z$1.ZodNullable<z$1.ZodString>;
    }, z$1.core.$strip>;
    threadId: z$1.ZodString;
    type: z$1.ZodLiteral<"system/permissionGrant/lifecycle">;
}, z$1.core.$strip>, z$1.ZodObject<{
    interactionId: z$1.ZodString;
    payload: z$1.ZodObject<{
        kind: z$1.ZodLiteral<"user_question">;
        questions: z$1.ZodArray<z$1.ZodObject<{
            allowFreeText: z$1.ZodBoolean;
            id: z$1.ZodString;
            multiSelect: z$1.ZodBoolean;
            options: z$1.ZodOptional<z$1.ZodArray<z$1.ZodObject<{
                description: z$1.ZodOptional<z$1.ZodString>;
                label: z$1.ZodString;
                value: z$1.ZodString;
            }, z$1.core.$strip>>>;
            prompt: z$1.ZodString;
            shortLabel: z$1.ZodOptional<z$1.ZodString>;
        }, z$1.core.$strip>>;
    }, z$1.core.$strip>;
    providerId: z$1.ZodString;
    providerRequestId: z$1.ZodString;
    resolution: z$1.ZodDefault<z$1.ZodNullable<z$1.ZodObject<{
        answers: z$1.ZodRecord<z$1.ZodString, z$1.ZodObject<{
            freeText: z$1.ZodOptional<z$1.ZodString>;
            selected: z$1.ZodArray<z$1.ZodString>;
        }, z$1.core.$strip>>;
        kind: z$1.ZodLiteral<"user_answer">;
    }, z$1.core.$strip>>>;
    status: z$1.ZodEnum<{
        interrupted: "interrupted";
        pending: "pending";
        resolved: "resolved";
        resolving: "resolving";
    }>;
    statusReason: z$1.ZodDefault<z$1.ZodNullable<z$1.ZodString>>;
    threadId: z$1.ZodString;
    type: z$1.ZodLiteral<"system/userQuestion/lifecycle">;
}, z$1.core.$strip>, z$1.ZodObject<{
    entries: z$1.ZodArray<z$1.ZodObject<{
        key: z$1.ZodString;
        metadata: z$1.ZodOptional<z$1.ZodRecord<z$1.ZodString, z$1.ZodUnknown>>;
        startedAt: z$1.ZodOptional<z$1.ZodNumber>;
        status: z$1.ZodOptional<z$1.ZodEnum<{
            completed: "completed";
            failed: "failed";
            started: "started";
        }>>;
        text: z$1.ZodString;
        type: z$1.ZodEnum<{
            output: "output";
            step: "step";
        }>;
    }, z$1.core.$strip>>;
    environmentId: z$1.ZodNullable<z$1.ZodString>;
    provisioningId: z$1.ZodString;
    status: z$1.ZodEnum<{
        active: "active";
        cancelled: "cancelled";
        completed: "completed";
        failed: "failed";
    }>;
    threadId: z$1.ZodString;
    type: z$1.ZodLiteral<"system/thread-provisioning">;
}, z$1.core.$strip>, z$1.ZodObject<{
    activeTurnId: z$1.ZodString;
    activeTurnStartedAt: z$1.ZodNumber;
    elapsedMs: z$1.ZodNumber;
    firedAt: z$1.ZodNumber;
    lastActivityEventAt: z$1.ZodNumber;
    lastActivityEventSequence: z$1.ZodNumber;
    lastActivityEventType: z$1.ZodString;
    providerId: z$1.ZodString;
    providerThreadId: z$1.ZodNullable<z$1.ZodString>;
    reason: z$1.ZodLiteral<"provider-turn-idle">;
    threadId: z$1.ZodString;
    thresholdMs: z$1.ZodNumber;
    type: z$1.ZodLiteral<"system/provider-turn-watchdog">;
}, z$1.core.$strip>], "type">, z$1.ZodObject<{
    scope: z$1.ZodDiscriminatedUnion<[z$1.ZodObject<{
        kind: z$1.ZodLiteral<"thread">;
    }, z$1.core.$strip>, z$1.ZodObject<{
        kind: z$1.ZodLiteral<"turn">;
        turnId: z$1.ZodString;
    }, z$1.core.$strip>], "kind">;
}, z$1.core.$strip>>]>>;
type ThreadEvent = z$1.infer<typeof threadEventSchema>;
type ThreadEventType = ThreadEvent["type"];

declare const pendingInteractionResolutionSchema: z$1.ZodUnion<readonly [z$1.ZodDiscriminatedUnion<[z$1.ZodObject<{
    decision: z$1.ZodLiteral<"allow_once">;
    grantedPermissions: z$1.ZodNullable<z$1.ZodObject<{
        fileSystem: z$1.ZodNullable<z$1.ZodObject<{
            read: z$1.ZodArray<z$1.ZodString>;
            write: z$1.ZodArray<z$1.ZodString>;
        }, z$1.core.$strip>>;
        network: z$1.ZodNullable<z$1.ZodObject<{
            enabled: z$1.ZodNullable<z$1.ZodBoolean>;
        }, z$1.core.$strip>>;
    }, z$1.core.$strict>>;
}, z$1.core.$strip>, z$1.ZodObject<{
    decision: z$1.ZodLiteral<"allow_for_session">;
    grantedPermissions: z$1.ZodNullable<z$1.ZodObject<{
        fileSystem: z$1.ZodNullable<z$1.ZodObject<{
            read: z$1.ZodArray<z$1.ZodString>;
            write: z$1.ZodArray<z$1.ZodString>;
        }, z$1.core.$strip>>;
        network: z$1.ZodNullable<z$1.ZodObject<{
            enabled: z$1.ZodNullable<z$1.ZodBoolean>;
        }, z$1.core.$strip>>;
    }, z$1.core.$strict>>;
}, z$1.core.$strip>, z$1.ZodObject<{
    decision: z$1.ZodLiteral<"deny">;
}, z$1.core.$strip>], "decision">, z$1.ZodObject<{
    answers: z$1.ZodRecord<z$1.ZodString, z$1.ZodObject<{
        freeText: z$1.ZodOptional<z$1.ZodString>;
        selected: z$1.ZodArray<z$1.ZodString>;
    }, z$1.core.$strip>>;
    kind: z$1.ZodLiteral<"user_answer">;
}, z$1.core.$strip>, z$1.ZodObject<{
    description: z$1.ZodOptional<z$1.ZodObject<{
        detail: z$1.ZodOptional<z$1.ZodString>;
        payload: z$1.ZodOptional<z$1.ZodType<JsonValue, unknown, z$1.core.$ZodTypeInternals<JsonValue, unknown>>>;
        title: z$1.ZodOptional<z$1.ZodString>;
    }, z$1.core.$strip>>;
    kind: z$1.ZodLiteral<"plugin_submitted">;
}, z$1.core.$strip>, z$1.ZodObject<{
    kind: z$1.ZodLiteral<"request_answer">;
    value: z$1.ZodType<JsonValue, unknown, z$1.core.$ZodTypeInternals<JsonValue, unknown>>;
}, z$1.core.$strip>]>;
type PendingInteractionResolution = z$1.infer<typeof pendingInteractionResolutionSchema>;
declare const providerPendingInteractionSchema: z$1.ZodUnion<readonly [z$1.ZodObject<{
    createdAt: z$1.ZodNumber;
    expiresAt: z$1.ZodOptional<z$1.ZodNullable<z$1.ZodNumber>>;
    id: z$1.ZodString;
    origin: z$1.ZodOptional<z$1.ZodObject<{
        kind: z$1.ZodLiteral<"provider">;
        providerId: z$1.ZodString;
        providerRequestId: z$1.ZodString;
        providerThreadId: z$1.ZodString;
    }, z$1.core.$strip>>;
    payload: z$1.ZodObject<{
        availableDecisions: z$1.ZodArray<z$1.ZodEnum<{
            allow_for_session: "allow_for_session";
            allow_once: "allow_once";
            deny: "deny";
        }>>;
        kind: z$1.ZodLiteral<"approval">;
        reason: z$1.ZodNullable<z$1.ZodString>;
        subject: z$1.ZodDiscriminatedUnion<[z$1.ZodObject<{
            actions: z$1.ZodArray<z$1.ZodDiscriminatedUnion<[z$1.ZodObject<{
                command: z$1.ZodString;
                name: z$1.ZodString;
                path: z$1.ZodString;
                type: z$1.ZodLiteral<"read">;
            }, z$1.core.$strip>, z$1.ZodObject<{
                command: z$1.ZodString;
                path: z$1.ZodNullable<z$1.ZodString>;
                type: z$1.ZodLiteral<"listFiles">;
            }, z$1.core.$strip>, z$1.ZodObject<{
                command: z$1.ZodString;
                path: z$1.ZodNullable<z$1.ZodString>;
                query: z$1.ZodNullable<z$1.ZodString>;
                type: z$1.ZodLiteral<"search">;
            }, z$1.core.$strip>, z$1.ZodObject<{
                command: z$1.ZodString;
                type: z$1.ZodLiteral<"unknown">;
            }, z$1.core.$strip>], "type">>;
            command: z$1.ZodString;
            cwd: z$1.ZodNullable<z$1.ZodString>;
            itemId: z$1.ZodString;
            kind: z$1.ZodLiteral<"command">;
            sessionGrant: z$1.ZodNullable<z$1.ZodObject<{
                fileSystem: z$1.ZodNullable<z$1.ZodObject<{
                    read: z$1.ZodArray<z$1.ZodString>;
                    write: z$1.ZodArray<z$1.ZodString>;
                }, z$1.core.$strip>>;
                network: z$1.ZodNullable<z$1.ZodObject<{
                    enabled: z$1.ZodNullable<z$1.ZodBoolean>;
                }, z$1.core.$strip>>;
            }, z$1.core.$strict>>;
        }, z$1.core.$strip>, z$1.ZodObject<{
            itemId: z$1.ZodString;
            kind: z$1.ZodLiteral<"file_change">;
            sessionGrant: z$1.ZodNullable<z$1.ZodObject<{
                fileSystem: z$1.ZodNullable<z$1.ZodObject<{
                    read: z$1.ZodArray<z$1.ZodString>;
                    write: z$1.ZodArray<z$1.ZodString>;
                }, z$1.core.$strip>>;
                network: z$1.ZodNullable<z$1.ZodObject<{
                    enabled: z$1.ZodNullable<z$1.ZodBoolean>;
                }, z$1.core.$strip>>;
            }, z$1.core.$strict>>;
            writeScope: z$1.ZodNullable<z$1.ZodString>;
        }, z$1.core.$strip>, z$1.ZodObject<{
            itemId: z$1.ZodString;
            kind: z$1.ZodLiteral<"permission_grant">;
            permissions: z$1.ZodObject<{
                fileSystem: z$1.ZodNullable<z$1.ZodObject<{
                    read: z$1.ZodArray<z$1.ZodString>;
                    write: z$1.ZodArray<z$1.ZodString>;
                }, z$1.core.$strip>>;
                network: z$1.ZodNullable<z$1.ZodObject<{
                    enabled: z$1.ZodNullable<z$1.ZodBoolean>;
                }, z$1.core.$strip>>;
            }, z$1.core.$strict>;
            toolName: z$1.ZodNullable<z$1.ZodString>;
        }, z$1.core.$strip>, z$1.ZodObject<{
            itemId: z$1.ZodString;
            kind: z$1.ZodLiteral<"plan">;
            plan: z$1.ZodString;
            planFilePath: z$1.ZodNullable<z$1.ZodString>;
        }, z$1.core.$strip>, z$1.ZodObject<{
            itemId: z$1.ZodString;
            kind: z$1.ZodLiteral<"tool_use">;
            presentation: z$1.ZodObject<{
                badge: z$1.ZodOptional<z$1.ZodObject<{
                    glyph: z$1.ZodString;
                    hint: z$1.ZodString;
                    label: z$1.ZodString;
                    tone: z$1.ZodEnum<{
                        destructive: "destructive";
                        neutral: "neutral";
                    }>;
                }, z$1.core.$strip>>;
                detail: z$1.ZodOptional<z$1.ZodString>;
                icon: z$1.ZodObject<{
                    glyph: z$1.ZodString;
                }, z$1.core.$strip>;
                label: z$1.ZodObject<{
                    completed: z$1.ZodString;
                    pending: z$1.ZodString;
                }, z$1.core.$strip>;
                suppress: z$1.ZodOptional<z$1.ZodBoolean>;
                tint: z$1.ZodOptional<z$1.ZodObject<{
                    dark: z$1.ZodString;
                    light: z$1.ZodString;
                }, z$1.core.$strip>>;
                title: z$1.ZodOptional<z$1.ZodString>;
            }, z$1.core.$strip>;
            tool: z$1.ZodString;
        }, z$1.core.$strip>], "kind">;
    }, z$1.core.$strip>;
    providerId: z$1.ZodString;
    providerRequestId: z$1.ZodString;
    providerThreadId: z$1.ZodString;
    resolution: z$1.ZodNullable<z$1.ZodDiscriminatedUnion<[z$1.ZodObject<{
        decision: z$1.ZodLiteral<"allow_once">;
        grantedPermissions: z$1.ZodNullable<z$1.ZodObject<{
            fileSystem: z$1.ZodNullable<z$1.ZodObject<{
                read: z$1.ZodArray<z$1.ZodString>;
                write: z$1.ZodArray<z$1.ZodString>;
            }, z$1.core.$strip>>;
            network: z$1.ZodNullable<z$1.ZodObject<{
                enabled: z$1.ZodNullable<z$1.ZodBoolean>;
            }, z$1.core.$strip>>;
        }, z$1.core.$strict>>;
    }, z$1.core.$strip>, z$1.ZodObject<{
        decision: z$1.ZodLiteral<"allow_for_session">;
        grantedPermissions: z$1.ZodNullable<z$1.ZodObject<{
            fileSystem: z$1.ZodNullable<z$1.ZodObject<{
                read: z$1.ZodArray<z$1.ZodString>;
                write: z$1.ZodArray<z$1.ZodString>;
            }, z$1.core.$strip>>;
            network: z$1.ZodNullable<z$1.ZodObject<{
                enabled: z$1.ZodNullable<z$1.ZodBoolean>;
            }, z$1.core.$strip>>;
        }, z$1.core.$strict>>;
    }, z$1.core.$strip>, z$1.ZodObject<{
        decision: z$1.ZodLiteral<"deny">;
    }, z$1.core.$strip>], "decision">>;
    resolvedAt: z$1.ZodNullable<z$1.ZodNumber>;
    status: z$1.ZodEnum<{
        interrupted: "interrupted";
        pending: "pending";
        resolved: "resolved";
        resolving: "resolving";
    }>;
    statusReason: z$1.ZodNullable<z$1.ZodString>;
    threadId: z$1.ZodString;
    turnId: z$1.ZodString;
}, z$1.core.$strip>, z$1.ZodObject<{
    createdAt: z$1.ZodNumber;
    expiresAt: z$1.ZodOptional<z$1.ZodNullable<z$1.ZodNumber>>;
    id: z$1.ZodString;
    origin: z$1.ZodOptional<z$1.ZodObject<{
        kind: z$1.ZodLiteral<"provider">;
        providerId: z$1.ZodString;
        providerRequestId: z$1.ZodString;
        providerThreadId: z$1.ZodString;
    }, z$1.core.$strip>>;
    payload: z$1.ZodObject<{
        kind: z$1.ZodLiteral<"user_question">;
        questions: z$1.ZodArray<z$1.ZodObject<{
            allowFreeText: z$1.ZodBoolean;
            id: z$1.ZodString;
            multiSelect: z$1.ZodBoolean;
            options: z$1.ZodOptional<z$1.ZodArray<z$1.ZodObject<{
                description: z$1.ZodOptional<z$1.ZodString>;
                label: z$1.ZodString;
                value: z$1.ZodString;
            }, z$1.core.$strip>>>;
            prompt: z$1.ZodString;
            shortLabel: z$1.ZodOptional<z$1.ZodString>;
        }, z$1.core.$strip>>;
    }, z$1.core.$strip>;
    providerId: z$1.ZodString;
    providerRequestId: z$1.ZodString;
    providerThreadId: z$1.ZodString;
    resolution: z$1.ZodNullable<z$1.ZodObject<{
        answers: z$1.ZodRecord<z$1.ZodString, z$1.ZodObject<{
            freeText: z$1.ZodOptional<z$1.ZodString>;
            selected: z$1.ZodArray<z$1.ZodString>;
        }, z$1.core.$strip>>;
        kind: z$1.ZodLiteral<"user_answer">;
    }, z$1.core.$strip>>;
    resolvedAt: z$1.ZodNullable<z$1.ZodNumber>;
    status: z$1.ZodEnum<{
        interrupted: "interrupted";
        pending: "pending";
        resolved: "resolved";
        resolving: "resolving";
    }>;
    statusReason: z$1.ZodNullable<z$1.ZodString>;
    threadId: z$1.ZodString;
    turnId: z$1.ZodString;
}, z$1.core.$strip>, z$1.ZodObject<{
    createdAt: z$1.ZodNumber;
    expiresAt: z$1.ZodOptional<z$1.ZodNullable<z$1.ZodNumber>>;
    id: z$1.ZodString;
    origin: z$1.ZodOptional<z$1.ZodObject<{
        kind: z$1.ZodLiteral<"provider">;
        providerId: z$1.ZodString;
        providerRequestId: z$1.ZodString;
        providerThreadId: z$1.ZodString;
    }, z$1.core.$strip>>;
    payload: z$1.ZodObject<{
        data: z$1.ZodType<JsonValue, unknown, z$1.core.$ZodTypeInternals<JsonValue, unknown>>;
        kind: z$1.ZodString & z$1.ZodType<`${string}/${string}`, string, z$1.core.$ZodTypeInternals<`${string}/${string}`, string>>;
        title: z$1.ZodString;
    }, z$1.core.$strip>;
    providerId: z$1.ZodString;
    providerRequestId: z$1.ZodString;
    providerThreadId: z$1.ZodString;
    resolution: z$1.ZodNullable<z$1.ZodObject<{
        kind: z$1.ZodLiteral<"request_answer">;
        value: z$1.ZodType<JsonValue, unknown, z$1.core.$ZodTypeInternals<JsonValue, unknown>>;
    }, z$1.core.$strip>>;
    resolvedAt: z$1.ZodNullable<z$1.ZodNumber>;
    status: z$1.ZodEnum<{
        interrupted: "interrupted";
        pending: "pending";
        resolved: "resolved";
        resolving: "resolving";
    }>;
    statusReason: z$1.ZodNullable<z$1.ZodString>;
    threadId: z$1.ZodString;
    turnId: z$1.ZodString;
}, z$1.core.$strip>]>;
type ProviderPendingInteraction = z$1.infer<typeof providerPendingInteractionSchema>;
declare const pluginPendingInteractionSchema: z$1.ZodObject<{
    createdAt: z$1.ZodNumber;
    expiresAt: z$1.ZodOptional<z$1.ZodNullable<z$1.ZodNumber>>;
    id: z$1.ZodString;
    origin: z$1.ZodObject<{
        kind: z$1.ZodLiteral<"plugin">;
        pluginId: z$1.ZodString;
        rendererId: z$1.ZodString;
    }, z$1.core.$strip>;
    payload: z$1.ZodObject<{
        data: z$1.ZodType<JsonValue, unknown, z$1.core.$ZodTypeInternals<JsonValue, unknown>>;
        kind: z$1.ZodLiteral<"plugin">;
        presentation: z$1.ZodOptional<z$1.ZodObject<{
            badge: z$1.ZodOptional<z$1.ZodObject<{
                glyph: z$1.ZodString;
                hint: z$1.ZodString;
                label: z$1.ZodString;
                tone: z$1.ZodEnum<{
                    destructive: "destructive";
                    neutral: "neutral";
                }>;
            }, z$1.core.$strip>>;
            detail: z$1.ZodOptional<z$1.ZodString>;
            icon: z$1.ZodObject<{
                glyph: z$1.ZodString;
            }, z$1.core.$strip>;
            label: z$1.ZodObject<{
                completed: z$1.ZodString;
                pending: z$1.ZodString;
            }, z$1.core.$strip>;
            suppress: z$1.ZodOptional<z$1.ZodBoolean>;
            tint: z$1.ZodOptional<z$1.ZodObject<{
                dark: z$1.ZodString;
                light: z$1.ZodString;
            }, z$1.core.$strip>>;
            title: z$1.ZodOptional<z$1.ZodString>;
        }, z$1.core.$strip>>;
        title: z$1.ZodString;
    }, z$1.core.$strip>;
    resolution: z$1.ZodNullable<z$1.ZodObject<{
        description: z$1.ZodOptional<z$1.ZodObject<{
            detail: z$1.ZodOptional<z$1.ZodString>;
            payload: z$1.ZodOptional<z$1.ZodType<JsonValue, unknown, z$1.core.$ZodTypeInternals<JsonValue, unknown>>>;
            title: z$1.ZodOptional<z$1.ZodString>;
        }, z$1.core.$strip>>;
        kind: z$1.ZodLiteral<"plugin_submitted">;
    }, z$1.core.$strip>>;
    resolvedAt: z$1.ZodNullable<z$1.ZodNumber>;
    status: z$1.ZodEnum<{
        interrupted: "interrupted";
        pending: "pending";
        resolved: "resolved";
        resolving: "resolving";
    }>;
    statusReason: z$1.ZodNullable<z$1.ZodString>;
    threadId: z$1.ZodString;
    turnId: z$1.ZodNullable<z$1.ZodString>;
}, z$1.core.$strip>;
type PluginPendingInteraction = z$1.infer<typeof pluginPendingInteractionSchema>;
type PendingInteraction = ProviderPendingInteraction | PluginPendingInteraction;

declare const pluginMetadataSchema: z.ZodType<JsonObject, unknown, zod_v4_core.$ZodTypeInternals<JsonObject, unknown>>;

declare const projectSourceSchema: z$1.ZodObject<{
    createdAt: z$1.ZodNumber;
    hostId: z$1.ZodString;
    id: z$1.ZodString;
    isDefault: z$1.ZodBoolean;
    path: z$1.ZodString;
    projectId: z$1.ZodString;
    type: z$1.ZodLiteral<"local_path">;
    updatedAt: z$1.ZodNumber;
}, z$1.core.$strip>;
type ProjectSource = z$1.infer<typeof projectSourceSchema>;

declare const reasoningLevelSchema: z$1.ZodEnum<{
    high: "high";
    low: "low";
    max: "max";
    medium: "medium";
    none: "none";
    ultra: "ultra";
    ultracode: "ultracode";
    xhigh: "xhigh";
}>;
type ReasoningLevel = z$1.infer<typeof reasoningLevelSchema>;
declare const serviceTierSchema: z$1.ZodEnum<{
    default: "default";
    fast: "fast";
}>;
type ServiceTier = z$1.infer<typeof serviceTierSchema>;
declare const permissionModeSchema: z$1.ZodEnum<{
    "accept-edits": "accept-edits";
    auto: "auto";
    full: "full";
}>;
type PermissionMode = z$1.infer<typeof permissionModeSchema>;
declare const promptInputSchema: z$1.ZodDiscriminatedUnion<[z$1.ZodObject<{
    mentions: z$1.ZodDefault<z$1.ZodArray<z$1.ZodObject<{
        end: z$1.ZodNumber;
        resource: z$1.ZodPipe<z$1.ZodTransform<unknown, unknown>, z$1.ZodDiscriminatedUnion<[z$1.ZodObject<{
            kind: z$1.ZodLiteral<"thread">;
            label: z$1.ZodString;
            projectId: z$1.ZodOptional<z$1.ZodString>;
            threadId: z$1.ZodString;
        }, z$1.core.$strip>, z$1.ZodObject<{
            kind: z$1.ZodLiteral<"project">;
            label: z$1.ZodString;
            projectId: z$1.ZodString;
        }, z$1.core.$strip>, z$1.ZodObject<{
            kind: z$1.ZodLiteral<"section">;
            label: z$1.ZodString;
            sectionId: z$1.ZodString;
        }, z$1.core.$strip>, z$1.ZodObject<{
            entryKind: z$1.ZodEnum<{
                directory: "directory";
                file: "file";
            }>;
            kind: z$1.ZodLiteral<"path">;
            label: z$1.ZodString;
            path: z$1.ZodString;
            source: z$1.ZodEnum<{
                "thread-storage": "thread-storage";
                workspace: "workspace";
            }>;
        }, z$1.core.$strip>, z$1.ZodObject<{
            argumentHint: z$1.ZodNullable<z$1.ZodString>;
            kind: z$1.ZodLiteral<"command">;
            label: z$1.ZodString;
            name: z$1.ZodString;
            origin: z$1.ZodEnum<{
                builtin: "builtin";
                project: "project";
                user: "user";
            }>;
            source: z$1.ZodEnum<{
                command: "command";
                skill: "skill";
            }>;
            trigger: z$1.ZodEnum<{
                "/": "/";
                $: "$";
            }>;
        }, z$1.core.$strip>, z$1.ZodObject<{
            icon: z$1.ZodOptional<z$1.ZodNullable<z$1.ZodString>>;
            itemId: z$1.ZodString;
            kind: z$1.ZodLiteral<"plugin">;
            label: z$1.ZodString;
            pluginId: z$1.ZodString;
        }, z$1.core.$strip>], "kind">>;
        start: z$1.ZodNumber;
    }, z$1.core.$strip>>>;
    text: z$1.ZodString;
    type: z$1.ZodLiteral<"text">;
    visibility: z$1.ZodOptional<z$1.ZodEnum<{
        "agent-only": "agent-only";
    }>>;
}, z$1.core.$strip>, z$1.ZodObject<{
    type: z$1.ZodLiteral<"image">;
    url: z$1.ZodString;
    visibility: z$1.ZodOptional<z$1.ZodEnum<{
        "agent-only": "agent-only";
    }>>;
}, z$1.core.$strip>, z$1.ZodObject<{
    path: z$1.ZodString;
    type: z$1.ZodLiteral<"localImage">;
    visibility: z$1.ZodOptional<z$1.ZodEnum<{
        "agent-only": "agent-only";
    }>>;
}, z$1.core.$strip>, z$1.ZodObject<{
    mimeType: z$1.ZodOptional<z$1.ZodString>;
    name: z$1.ZodOptional<z$1.ZodString>;
    path: z$1.ZodString;
    sizeBytes: z$1.ZodOptional<z$1.ZodNumber>;
    type: z$1.ZodLiteral<"localFile">;
    visibility: z$1.ZodOptional<z$1.ZodEnum<{
        "agent-only": "agent-only";
    }>>;
}, z$1.core.$strip>], "type">;
type PromptInput = z$1.infer<typeof promptInputSchema>;
declare const resolvedThreadExecutionOptionsSchema: z$1.ZodObject<{
    model: z$1.ZodString;
    permissionMode: z$1.ZodEnum<{
        "accept-edits": "accept-edits";
        auto: "auto";
        full: "full";
    }>;
    reasoningLevel: z$1.ZodEnum<{
        high: "high";
        low: "low";
        max: "max";
        medium: "medium";
        none: "none";
        ultra: "ultra";
        ultracode: "ultracode";
        xhigh: "xhigh";
    }>;
    seq: z$1.ZodOptional<z$1.ZodNumber>;
    serviceTier: z$1.ZodEnum<{
        default: "default";
        fast: "fast";
    }>;
    source: z$1.ZodEnum<{
        "client/thread/start": "client/thread/start";
        "client/turn/requested": "client/turn/requested";
        "client/turn/start": "client/turn/start";
    }>;
}, z$1.core.$strip>;
type ResolvedThreadExecutionOptions = z$1.infer<typeof resolvedThreadExecutionOptionsSchema>;
declare const projectExecutionDefaultsSchema: z$1.ZodObject<{
    model: z$1.ZodString;
    permissionMode: z$1.ZodEnum<{
        "accept-edits": "accept-edits";
        auto: "auto";
        full: "full";
    }>;
    providerId: z$1.ZodString;
    reasoningLevel: z$1.ZodEnum<{
        high: "high";
        low: "low";
        max: "max";
        medium: "medium";
        none: "none";
        ultra: "ultra";
        ultracode: "ultracode";
        xhigh: "xhigh";
    }>;
    serviceTier: z$1.ZodEnum<{
        default: "default";
        fast: "fast";
    }>;
}, z$1.core.$strip>;
type ProjectExecutionDefaults = z$1.infer<typeof projectExecutionDefaultsSchema>;

/**
 * Who owns a wait, as the denormalized `waitHolder` column stores it.
 *
 * This exists only because the orphan sweep and the per-plugin release both
 * need an indexed equality lookup ("every row this plugin is holding"), which
 * a JSON `waitingOn` cannot serve. It is written by the same single writer
 * that writes `waitingOn`, derived from it — never set independently — so the
 * two cannot drift. Core waits have no holder.
 */
declare const queuedMessageWaitHolderSchema: z$1.ZodTemplateLiteral<`plugin:${string}`>;
type QueuedMessageWaitHolder = z$1.infer<typeof queuedMessageWaitHolderSchema>;

declare const providerInfoSchema: z$1.ZodObject<{
    available: z$1.ZodBoolean;
    capabilities: z$1.ZodObject<{
        modelCatalogScope: z$1.ZodEnum<{
            host: "host";
            workspace: "workspace";
        }>;
        permissionModes: z$1.ZodArray<z$1.ZodEnum<{
            "accept-edits": "accept-edits";
            auto: "auto";
            full: "full";
        }>>;
        supportsFork: z$1.ZodBoolean;
        supportsNativeUserQuestion: z$1.ZodBoolean;
        supportsServiceTier: z$1.ZodBoolean;
        supportsSessionRewind: z$1.ZodBoolean;
        supportsThreadArchive: z$1.ZodBoolean;
        supportsThreadRename: z$1.ZodBoolean;
    }, z$1.core.$strip>;
    completedTurnDisplay: z$1.ZodEnum<{
        collapse: "collapse";
        flat: "flat";
    }>;
    composerActions: z$1.ZodArray<z$1.ZodDiscriminatedUnion<[z$1.ZodObject<{
        kind: z$1.ZodLiteral<"skills">;
        trigger: z$1.ZodEnum<{
            "/": "/";
            $: "$";
        }>;
    }, z$1.core.$strip>, z$1.ZodObject<{
        command: z$1.ZodObject<{
            name: z$1.ZodString;
            trailingText: z$1.ZodString;
            trigger: z$1.ZodEnum<{
                "/": "/";
                $: "$";
            }>;
        }, z$1.core.$strip>;
        kind: z$1.ZodLiteral<"plan">;
    }, z$1.core.$strip>, z$1.ZodObject<{
        command: z$1.ZodObject<{
            name: z$1.ZodString;
            trailingText: z$1.ZodString;
            trigger: z$1.ZodEnum<{
                "/": "/";
                $: "$";
            }>;
        }, z$1.core.$strip>;
        kind: z$1.ZodLiteral<"goal">;
    }, z$1.core.$strip>], "kind">>;
    displayName: z$1.ZodString;
    extensionKinds: z$1.ZodOptional<z$1.ZodRecord<z$1.ZodString & z$1.ZodType<`${string}/${string}`, string, z$1.core.$ZodTypeInternals<`${string}/${string}`, string>>, z$1.ZodObject<{
        item: z$1.ZodBoolean;
        state: z$1.ZodBoolean;
    }, z$1.core.$strip>>>;
    family: z$1.ZodOptional<z$1.ZodString>;
    icon: z$1.ZodOptional<z$1.ZodObject<{
        glyph: z$1.ZodString;
    }, z$1.core.$strip>>;
    id: z$1.ZodString;
    logoUrl: z$1.ZodNullable<z$1.ZodString>;
    maintenance: z$1.ZodObject<{
        health: z$1.ZodBoolean;
        installation: z$1.ZodBoolean;
        usage: z$1.ZodBoolean;
    }, z$1.core.$strip>;
    pluginId: z$1.ZodString;
    reasoningLevels: z$1.ZodOptional<z$1.ZodArray<z$1.ZodObject<{
        description: z$1.ZodOptional<z$1.ZodString>;
        id: z$1.ZodString;
        label: z$1.ZodString;
    }, z$1.core.$strip>>>;
    serviceTiers: z$1.ZodOptional<z$1.ZodArray<z$1.ZodObject<{
        description: z$1.ZodOptional<z$1.ZodString>;
        id: z$1.ZodString;
        label: z$1.ZodString;
    }, z$1.core.$strip>>>;
    strings: z$1.ZodOptional<z$1.ZodObject<{
        brandPrefix: z$1.ZodOptional<z$1.ZodString>;
        expiredHint: z$1.ZodString;
        iconTint: z$1.ZodOptional<z$1.ZodObject<{
            dark: z$1.ZodString;
            light: z$1.ZodString;
        }, z$1.core.$strip>>;
        installUrl: z$1.ZodString;
        planModeCopy: z$1.ZodOptional<z$1.ZodString>;
        signInHint: z$1.ZodString;
    }, z$1.core.$strip>>;
}, z$1.core.$strip>;
type ProviderInfo = z$1.infer<typeof providerInfoSchema>;

declare const threadEventScopeSchema: z$1.ZodDiscriminatedUnion<[z$1.ZodObject<{
    kind: z$1.ZodLiteral<"thread">;
}, z$1.core.$strip>, z$1.ZodObject<{
    kind: z$1.ZodLiteral<"turn">;
    turnId: z$1.ZodString;
}, z$1.core.$strip>], "kind">;
type ThreadEventScope = z$1.infer<typeof threadEventScopeSchema>;

type ThreadEventByType = {
    [TType in ThreadEventType]: Extract<ThreadEvent, {
        type: TType;
    }>;
};
type ThreadEventForType<TType extends ThreadEventType> = ThreadEventByType[TType];
type StoredThreadEventDataFromEvent<TEvent extends ThreadEvent> = Omit<TEvent, "scope" | "threadId" | "type">;
interface ThreadEventRowBase {
    id: string;
    scope: ThreadEventScope;
    threadId: string;
    seq: number;
    createdAt: number;
}
type ThreadEventRowFromEvent<TEvent extends ThreadEvent> = ThreadEventRowBase & {
    type: TEvent["type"];
    data: StoredThreadEventDataFromEvent<TEvent>;
};
type ThreadEventRowOfType<TType extends ThreadEventType> = ThreadEventRowFromEvent<ThreadEventForType<TType>>;
type ThreadEventRow = {
    [TType in ThreadEventType]: ThreadEventRowOfType<TType>;
}[ThreadEventType];

declare const threadStatusSchema: z$1.ZodEnum<{
    active: "active";
    error: "error";
    idle: "idle";
    pending: "pending";
    starting: "starting";
    stopping: "stopping";
}>;
type ThreadStatus = z$1.infer<typeof threadStatusSchema>;

declare const threadTimelinePendingTodosSchema: z$1.ZodObject<{
    items: z$1.ZodArray<z$1.ZodObject<{
        id: z$1.ZodString;
        status: z$1.ZodEnum<{
            completed: "completed";
            in_progress: "in_progress";
            pending: "pending";
        }>;
        text: z$1.ZodString;
    }, z$1.core.$strip>>;
    sourceSeq: z$1.ZodNumber;
    updatedAt: z$1.ZodNumber;
}, z$1.core.$strip>;
type ThreadTimelinePendingTodos = z$1.infer<typeof threadTimelinePendingTodosSchema>;

declare const threadRuntimeDisplayStatusSchema: z$1.ZodEnum<{
    "host-reconnecting": "host-reconnecting";
    "waiting-for-host": "waiting-for-host";
    active: "active";
    error: "error";
    idle: "idle";
    pending: "pending";
    provisioning: "provisioning";
    starting: "starting";
    stopping: "stopping";
}>;
type ThreadRuntimeDisplayStatus = z$1.infer<typeof threadRuntimeDisplayStatusSchema>;
declare const threadQueuedMessageSchema: z$1.ZodObject<{
    content: z$1.ZodArray<z$1.ZodDiscriminatedUnion<[z$1.ZodObject<{
        mentions: z$1.ZodDefault<z$1.ZodArray<z$1.ZodObject<{
            end: z$1.ZodNumber;
            resource: z$1.ZodPipe<z$1.ZodTransform<unknown, unknown>, z$1.ZodDiscriminatedUnion<[z$1.ZodObject<{
                kind: z$1.ZodLiteral<"thread">;
                label: z$1.ZodString;
                projectId: z$1.ZodOptional<z$1.ZodString>;
                threadId: z$1.ZodString;
            }, z$1.core.$strip>, z$1.ZodObject<{
                kind: z$1.ZodLiteral<"project">;
                label: z$1.ZodString;
                projectId: z$1.ZodString;
            }, z$1.core.$strip>, z$1.ZodObject<{
                kind: z$1.ZodLiteral<"section">;
                label: z$1.ZodString;
                sectionId: z$1.ZodString;
            }, z$1.core.$strip>, z$1.ZodObject<{
                entryKind: z$1.ZodEnum<{
                    directory: "directory";
                    file: "file";
                }>;
                kind: z$1.ZodLiteral<"path">;
                label: z$1.ZodString;
                path: z$1.ZodString;
                source: z$1.ZodEnum<{
                    "thread-storage": "thread-storage";
                    workspace: "workspace";
                }>;
            }, z$1.core.$strip>, z$1.ZodObject<{
                argumentHint: z$1.ZodNullable<z$1.ZodString>;
                kind: z$1.ZodLiteral<"command">;
                label: z$1.ZodString;
                name: z$1.ZodString;
                origin: z$1.ZodEnum<{
                    builtin: "builtin";
                    project: "project";
                    user: "user";
                }>;
                source: z$1.ZodEnum<{
                    command: "command";
                    skill: "skill";
                }>;
                trigger: z$1.ZodEnum<{
                    "/": "/";
                    $: "$";
                }>;
            }, z$1.core.$strip>, z$1.ZodObject<{
                icon: z$1.ZodOptional<z$1.ZodNullable<z$1.ZodString>>;
                itemId: z$1.ZodString;
                kind: z$1.ZodLiteral<"plugin">;
                label: z$1.ZodString;
                pluginId: z$1.ZodString;
            }, z$1.core.$strip>], "kind">>;
            start: z$1.ZodNumber;
        }, z$1.core.$strip>>>;
        text: z$1.ZodString;
        type: z$1.ZodLiteral<"text">;
        visibility: z$1.ZodOptional<z$1.ZodEnum<{
            "agent-only": "agent-only";
        }>>;
    }, z$1.core.$strip>, z$1.ZodObject<{
        type: z$1.ZodLiteral<"image">;
        url: z$1.ZodString;
        visibility: z$1.ZodOptional<z$1.ZodEnum<{
            "agent-only": "agent-only";
        }>>;
    }, z$1.core.$strip>, z$1.ZodObject<{
        path: z$1.ZodString;
        type: z$1.ZodLiteral<"localImage">;
        visibility: z$1.ZodOptional<z$1.ZodEnum<{
            "agent-only": "agent-only";
        }>>;
    }, z$1.core.$strip>, z$1.ZodObject<{
        mimeType: z$1.ZodOptional<z$1.ZodString>;
        name: z$1.ZodOptional<z$1.ZodString>;
        path: z$1.ZodString;
        sizeBytes: z$1.ZodOptional<z$1.ZodNumber>;
        type: z$1.ZodLiteral<"localFile">;
        visibility: z$1.ZodOptional<z$1.ZodEnum<{
            "agent-only": "agent-only";
        }>>;
    }, z$1.core.$strip>], "type">>;
    createdAt: z$1.ZodNumber;
    editable: z$1.ZodBoolean;
    failureReason: z$1.ZodNullable<z$1.ZodString>;
    groupWithNext: z$1.ZodBoolean;
    id: z$1.ZodString;
    initiator: z$1.ZodEnum<{
        agent: "agent";
        system: "system";
        user: "user";
    }>;
    model: z$1.ZodString;
    origin: z$1.ZodNullable<z$1.ZodEnum<{
        app: "app";
        cli: "cli";
        plugin: "plugin";
        sdk: "sdk";
    }>>;
    originPluginId: z$1.ZodNullable<z$1.ZodString>;
    payload: z$1.ZodDiscriminatedUnion<[z$1.ZodObject<{
        kind: z$1.ZodLiteral<"inline">;
    }, z$1.core.$strip>, z$1.ZodObject<{
        attempt: z$1.ZodNumber;
        kind: z$1.ZodLiteral<"retry">;
        reason: z$1.ZodString;
        retryOfTurnRequestId: z$1.ZodString;
    }, z$1.core.$strip>], "kind">;
    permissionMode: z$1.ZodEnum<{
        "accept-edits": "accept-edits";
        auto: "auto";
        full: "full";
    }>;
    reasoningLevel: z$1.ZodEnum<{
        high: "high";
        low: "low";
        max: "max";
        medium: "medium";
        none: "none";
        ultra: "ultra";
        ultracode: "ultracode";
        xhigh: "xhigh";
    }>;
    sendAt: z$1.ZodNullable<z$1.ZodNumber>;
    senderThreadId: z$1.ZodNullable<z$1.ZodString>;
    serviceTier: z$1.ZodEnum<{
        default: "default";
        fast: "fast";
    }>;
    threadId: z$1.ZodString;
    updatedAt: z$1.ZodNumber;
    waitingOn: z$1.ZodNullable<z$1.ZodDiscriminatedUnion<[z$1.ZodObject<{
        kind: z$1.ZodLiteral<"time">;
    }, z$1.core.$strip>, z$1.ZodObject<{
        kind: z$1.ZodLiteral<"thread-busy">;
    }, z$1.core.$strip>, z$1.ZodObject<{
        kind: z$1.ZodLiteral<"stopping">;
    }, z$1.core.$strip>, z$1.ZodObject<{
        kind: z$1.ZodLiteral<"turn-starting">;
    }, z$1.core.$strip>, z$1.ZodObject<{
        kind: z$1.ZodLiteral<"provisioning">;
    }, z$1.core.$strip>, z$1.ZodObject<{
        hostName: z$1.ZodString;
        kind: z$1.ZodLiteral<"host-offline">;
    }, z$1.core.$strip>, z$1.ZodObject<{
        kind: z$1.ZodLiteral<"interaction">;
    }, z$1.core.$strip>, z$1.ZodObject<{
        kind: z$1.ZodLiteral<"plugin">;
        pluginId: z$1.ZodString;
        reason: z$1.ZodString;
    }, z$1.core.$strip>], "kind">>;
}, z$1.core.$strip>;
type ThreadQueuedMessage = z$1.infer<typeof threadQueuedMessageSchema>;
declare const threadQueuedWorkSchema: z$1.ZodEnum<{
    failed: "failed";
    none: "none";
    waiting: "waiting";
}>;
type ThreadQueuedWork = z$1.infer<typeof threadQueuedWorkSchema>;

declare const threadContextResponseSchema: z$1.ZodObject<{
    usage: z$1.ZodNullable<z$1.ZodObject<{
        estimated: z$1.ZodBoolean;
        modelContextWindow: z$1.ZodNumber;
        snapshot: z$1.ZodOptional<z$1.ZodObject<{
            autoCompactAtTokens: z$1.ZodNullable<z$1.ZodNumber>;
            capturedAt: z$1.ZodISODateTime;
            categories: z$1.ZodArray<z$1.ZodObject<{
                entries: z$1.ZodArray<z$1.ZodObject<{
                    id: z$1.ZodString;
                    label: z$1.ZodString;
                    tokens: z$1.ZodNumber;
                }, z$1.core.$strip>>;
                id: z$1.ZodString;
                kind: z$1.ZodEnum<{
                    deferred: "deferred";
                    free: "free";
                    reserved: "reserved";
                    used: "used";
                }>;
                label: z$1.ZodString;
                tokens: z$1.ZodNumber;
            }, z$1.core.$strip>>;
            contextWindowTokens: z$1.ZodNumber;
            estimated: z$1.ZodBoolean;
            model: z$1.ZodString;
            providerSessionId: z$1.ZodString;
            providerTurnId: z$1.ZodNullable<z$1.ZodString>;
            usedTokens: z$1.ZodNumber;
        }, z$1.core.$strip>>;
        usedTokens: z$1.ZodNumber;
    }, z$1.core.$strip>>;
}, z$1.core.$strip>;
type ThreadContextResponse = z$1.infer<typeof threadContextResponseSchema>;

declare const createThreadEnvironmentArgsSchema: z$1.ZodDiscriminatedUnion<[z$1.ZodObject<{
    environmentId: z$1.ZodString;
    type: z$1.ZodLiteral<"reuse">;
}, z$1.core.$strip>, z$1.ZodObject<{
    hostId: z$1.ZodOptional<z$1.ZodString>;
    type: z$1.ZodLiteral<"host">;
    workspace: z$1.ZodDiscriminatedUnion<[z$1.ZodObject<{
        branch: z$1.ZodOptional<z$1.ZodDiscriminatedUnion<[z$1.ZodObject<{
            kind: z$1.ZodLiteral<"existing">;
            name: z$1.ZodString;
        }, z$1.core.$strict>, z$1.ZodObject<{
            baseBranch: z$1.ZodString;
            kind: z$1.ZodLiteral<"new">;
        }, z$1.core.$strict>], "kind">>;
        path: z$1.ZodNullable<z$1.ZodString>;
        type: z$1.ZodLiteral<"unmanaged">;
    }, z$1.core.$strip>, z$1.ZodObject<{
        baseBranch: z$1.ZodDiscriminatedUnion<[z$1.ZodObject<{
            kind: z$1.ZodLiteral<"named">;
            name: z$1.ZodString;
        }, z$1.core.$strip>, z$1.ZodObject<{
            kind: z$1.ZodLiteral<"default">;
        }, z$1.core.$strip>], "kind">;
        type: z$1.ZodLiteral<"managed-worktree">;
    }, z$1.core.$strip>, z$1.ZodObject<{
        type: z$1.ZodLiteral<"personal">;
    }, z$1.core.$strip>], "type">;
}, z$1.core.$strip>, z$1.ZodObject<{
    type: z$1.ZodLiteral<"project-default">;
}, z$1.core.$strip>, z$1.ZodObject<{
    environmentProviderId: z$1.ZodString;
    inputs: z$1.ZodDefault<z$1.ZodNullable<z$1.ZodType<JsonValue, unknown, z$1.core.$ZodTypeInternals<JsonValue, unknown>>>>;
    machine: z$1.ZodOptional<z$1.ZodDiscriminatedUnion<[z$1.ZodObject<{
        hostId: z$1.ZodString;
        type: z$1.ZodLiteral<"existing">;
    }, z$1.core.$strip>, z$1.ZodObject<{
        inputs: z$1.ZodDefault<z$1.ZodNullable<z$1.ZodType<JsonValue, unknown, z$1.core.$ZodTypeInternals<JsonValue, unknown>>>>;
        machineProviderId: z$1.ZodString;
        type: z$1.ZodLiteral<"new">;
    }, z$1.core.$strip>], "type">>;
    type: z$1.ZodLiteral<"provider">;
}, z$1.core.$strip>], "type">;
type CreateThreadEnvironmentArgs = z$1.infer<typeof createThreadEnvironmentArgsSchema>;
declare const workspaceFileListResponseSchema: z$1.ZodObject<{
    files: z$1.ZodArray<z$1.ZodObject<{
        name: z$1.ZodString;
        path: z$1.ZodString;
    }, z$1.core.$strip>>;
    truncated: z$1.ZodBoolean;
}, z$1.core.$strip>;
type WorkspaceFileListResponse = z$1.infer<typeof workspaceFileListResponseSchema>;
declare const workspacePathListResponseSchema: z$1.ZodObject<{
    paths: z$1.ZodArray<z$1.ZodObject<{
        kind: z$1.ZodEnum<{
            directory: "directory";
            file: "file";
        }>;
        name: z$1.ZodString;
        path: z$1.ZodString;
        positions: z$1.ZodArray<z$1.ZodNumber>;
        score: z$1.ZodNumber;
    }, z$1.core.$strip>>;
    truncated: z$1.ZodBoolean;
}, z$1.core.$strip>;
type WorkspacePathListResponse = z$1.infer<typeof workspacePathListResponseSchema>;

declare const createProjectSourceRequestSchema: z$1.ZodDiscriminatedUnion<[z$1.ZodObject<{
    hostId: z$1.ZodString;
    path: z$1.ZodPipe<z$1.ZodString, z$1.ZodTransform<string, string>>;
    type: z$1.ZodLiteral<"local_path">;
}, z$1.core.$strict>, z$1.ZodObject<{
    hostId: z$1.ZodString;
    remoteUrl: z$1.ZodOptional<z$1.ZodString>;
    targetPath: z$1.ZodOptional<z$1.ZodPipe<z$1.ZodString, z$1.ZodTransform<string, string>>>;
    type: z$1.ZodLiteral<"clone">;
}, z$1.core.$strict>], "type">;
type CreateProjectSourceRequest = z$1.infer<typeof createProjectSourceRequestSchema>;
declare const createProjectRequestSchema: z$1.ZodObject<{
    name: z$1.ZodString;
    source: z$1.ZodObject<{
        hostId: z$1.ZodString;
        path: z$1.ZodPipe<z$1.ZodString, z$1.ZodTransform<string, string>>;
        type: z$1.ZodLiteral<"local_path">;
    }, z$1.core.$strict>;
}, z$1.core.$strip>;
type CreateProjectRequest = z$1.infer<typeof createProjectRequestSchema>;
declare const threadSectionSchema: z$1.ZodObject<{
    createdAt: z$1.ZodNumber;
    id: z$1.ZodString;
    name: z$1.ZodString;
    updatedAt: z$1.ZodNumber;
}, z$1.core.$strict>;
type ThreadSectionResponse = z$1.infer<typeof threadSectionSchema>;
declare const createThreadSectionRequestSchema: z$1.ZodObject<{
    name: z$1.ZodString;
}, z$1.core.$strict>;
type CreateThreadSectionRequest = z$1.infer<typeof createThreadSectionRequestSchema>;
declare const updateThreadSectionRequestSchema: z$1.ZodObject<{
    id: z$1.ZodString;
    name: z$1.ZodString;
}, z$1.core.$strict>;
type UpdateThreadSectionRequest = z$1.infer<typeof updateThreadSectionRequestSchema>;
declare const deleteThreadSectionRequestSchema: z$1.ZodObject<{
    id: z$1.ZodString;
}, z$1.core.$strict>;
type DeleteThreadSectionRequest = z$1.infer<typeof deleteThreadSectionRequestSchema>;
declare const threadSectionMutationResponseSchema: z$1.ZodObject<{
    id: z$1.ZodString;
    name: z$1.ZodString;
    updatedThreadCount: z$1.ZodNumber;
}, z$1.core.$strict>;
type ThreadSectionMutationResponse = z$1.infer<typeof threadSectionMutationResponseSchema>;
declare const reorderProjectRequestSchema: z$1.ZodObject<{
    nextProjectId: z$1.ZodNullable<z$1.ZodString>;
    previousProjectId: z$1.ZodNullable<z$1.ZodString>;
}, z$1.core.$strip>;
type ReorderProjectRequest = z$1.infer<typeof reorderProjectRequestSchema>;
declare const projectListQuerySchema: z$1.ZodObject<{
    include: z$1.ZodOptional<z$1.ZodString>;
    includePersonal: z$1.ZodOptional<z$1.ZodEnum<{
        false: "false";
        true: "true";
    }>>;
}, z$1.core.$strip>;
type ProjectListQuery = z$1.infer<typeof projectListQuerySchema>;
declare const projectFilesQuerySchema: z$1.ZodObject<{
    environmentId: z$1.ZodOptional<z$1.ZodPipe<z$1.ZodTransform<unknown, unknown>, z$1.ZodOptional<z$1.ZodString>>>;
    hostId: z$1.ZodOptional<z$1.ZodString>;
    limit: z$1.ZodOptional<z$1.ZodOptional<z$1.ZodString>>;
    query: z$1.ZodOptional<z$1.ZodOptional<z$1.ZodString>>;
}, z$1.core.$strip>;
type ProjectFilesQuery = z$1.infer<typeof projectFilesQuerySchema>;
declare const projectPathsQuerySchema: z$1.ZodObject<{
    environmentId: z$1.ZodOptional<z$1.ZodPipe<z$1.ZodTransform<unknown, unknown>, z$1.ZodOptional<z$1.ZodString>>>;
    hostId: z$1.ZodOptional<z$1.ZodString>;
    includeDirectories: z$1.ZodEnum<{
        false: "false";
        true: "true";
    }>;
    includeFiles: z$1.ZodEnum<{
        false: "false";
        true: "true";
    }>;
    limit: z$1.ZodOptional<z$1.ZodOptional<z$1.ZodString>>;
    query: z$1.ZodOptional<z$1.ZodOptional<z$1.ZodString>>;
}, z$1.core.$strip>;
type ProjectPathsQuery = z$1.infer<typeof projectPathsQuerySchema>;
declare const projectFileContentQuerySchema: z$1.ZodObject<{
    environmentId: z$1.ZodOptional<z$1.ZodPipe<z$1.ZodTransform<unknown, unknown>, z$1.ZodOptional<z$1.ZodString>>>;
    hostId: z$1.ZodOptional<z$1.ZodString>;
    path: z$1.ZodString;
}, z$1.core.$strip>;
type ProjectFileContentQuery = z$1.infer<typeof projectFileContentQuerySchema>;
declare const projectBranchesQuerySchema: z$1.ZodObject<{
    hostId: z$1.ZodString;
    limit: z$1.ZodOptional<z$1.ZodString>;
    query: z$1.ZodOptional<z$1.ZodString>;
    selectedBranch: z$1.ZodOptional<z$1.ZodString>;
}, z$1.core.$strict>;
type ProjectBranchesQuery = z$1.infer<typeof projectBranchesQuerySchema>;
declare const projectBranchesResponseSchema: z$1.ZodObject<{
    branches: z$1.ZodArray<z$1.ZodString>;
    branchesTruncated: z$1.ZodBoolean;
    checkout: z$1.ZodDiscriminatedUnion<[z$1.ZodObject<{
        branchName: z$1.ZodString;
        headSha: z$1.ZodNullable<z$1.ZodString>;
        kind: z$1.ZodLiteral<"branch">;
    }, z$1.core.$strip>, z$1.ZodObject<{
        headSha: z$1.ZodNullable<z$1.ZodString>;
        kind: z$1.ZodLiteral<"detached">;
    }, z$1.core.$strip>, z$1.ZodObject<{
        branchName: z$1.ZodNullable<z$1.ZodString>;
        kind: z$1.ZodLiteral<"unborn">;
    }, z$1.core.$strip>, z$1.ZodObject<{
        kind: z$1.ZodLiteral<"unknown">;
        reason: z$1.ZodString;
    }, z$1.core.$strip>], "kind">;
    defaultBranch: z$1.ZodNullable<z$1.ZodString>;
    defaultBranchRelation: z$1.ZodNullable<z$1.ZodEnum<{
        "local-ahead": "local-ahead";
        "local-behind": "local-behind";
        diverged: "diverged";
        equal: "equal";
        unknown: "unknown";
    }>>;
    defaultWorktreeBaseBranch: z$1.ZodNullable<z$1.ZodString>;
    hasUncommittedChanges: z$1.ZodBoolean;
    isWorktree: z$1.ZodBoolean;
    operation: z$1.ZodDiscriminatedUnion<[z$1.ZodObject<{
        kind: z$1.ZodLiteral<"none">;
    }, z$1.core.$strip>, z$1.ZodObject<{
        hasConflicts: z$1.ZodBoolean;
        kind: z$1.ZodLiteral<"merge">;
    }, z$1.core.$strip>, z$1.ZodObject<{
        hasConflicts: z$1.ZodBoolean;
        kind: z$1.ZodLiteral<"rebase">;
    }, z$1.core.$strip>, z$1.ZodObject<{
        hasConflicts: z$1.ZodBoolean;
        kind: z$1.ZodLiteral<"cherry-pick">;
    }, z$1.core.$strip>, z$1.ZodObject<{
        hasConflicts: z$1.ZodBoolean;
        kind: z$1.ZodLiteral<"revert">;
    }, z$1.core.$strip>, z$1.ZodObject<{
        hasConflicts: z$1.ZodBoolean;
        kind: z$1.ZodLiteral<"unknown">;
        reason: z$1.ZodString;
    }, z$1.core.$strip>], "kind">;
    originDefaultBranch: z$1.ZodNullable<z$1.ZodString>;
    remoteBranches: z$1.ZodArray<z$1.ZodString>;
    remoteBranchesTruncated: z$1.ZodBoolean;
    selectedBranch: z$1.ZodNullable<z$1.ZodObject<{
        kind: z$1.ZodEnum<{
            local: "local";
            missing: "missing";
            remote: "remote";
        }>;
        name: z$1.ZodString;
    }, z$1.core.$strip>>;
}, z$1.core.$strip>;
type ProjectBranchesResponse = z$1.infer<typeof projectBranchesResponseSchema>;
declare const promptHistoryQuerySchema: z$1.ZodObject<{
    limit: z$1.ZodOptional<z$1.ZodString>;
}, z$1.core.$strip>;
type PromptHistoryQuery = z$1.infer<typeof promptHistoryQuerySchema>;
declare const promptHistoryResponseSchema: z$1.ZodArray<z$1.ZodObject<{
    createdAt: z$1.ZodNumber;
    id: z$1.ZodString;
    input: z$1.ZodArray<z$1.ZodDiscriminatedUnion<[z$1.ZodObject<{
        mentions: z$1.ZodDefault<z$1.ZodArray<z$1.ZodObject<{
            end: z$1.ZodNumber;
            resource: z$1.ZodPipe<z$1.ZodTransform<unknown, unknown>, z$1.ZodDiscriminatedUnion<[z$1.ZodObject<{
                kind: z$1.ZodLiteral<"thread">;
                label: z$1.ZodString;
                projectId: z$1.ZodOptional<z$1.ZodString>;
                threadId: z$1.ZodString;
            }, z$1.core.$strip>, z$1.ZodObject<{
                kind: z$1.ZodLiteral<"project">;
                label: z$1.ZodString;
                projectId: z$1.ZodString;
            }, z$1.core.$strip>, z$1.ZodObject<{
                kind: z$1.ZodLiteral<"section">;
                label: z$1.ZodString;
                sectionId: z$1.ZodString;
            }, z$1.core.$strip>, z$1.ZodObject<{
                entryKind: z$1.ZodEnum<{
                    directory: "directory";
                    file: "file";
                }>;
                kind: z$1.ZodLiteral<"path">;
                label: z$1.ZodString;
                path: z$1.ZodString;
                source: z$1.ZodEnum<{
                    "thread-storage": "thread-storage";
                    workspace: "workspace";
                }>;
            }, z$1.core.$strip>, z$1.ZodObject<{
                argumentHint: z$1.ZodNullable<z$1.ZodString>;
                kind: z$1.ZodLiteral<"command">;
                label: z$1.ZodString;
                name: z$1.ZodString;
                origin: z$1.ZodEnum<{
                    builtin: "builtin";
                    project: "project";
                    user: "user";
                }>;
                source: z$1.ZodEnum<{
                    command: "command";
                    skill: "skill";
                }>;
                trigger: z$1.ZodEnum<{
                    "/": "/";
                    $: "$";
                }>;
            }, z$1.core.$strip>, z$1.ZodObject<{
                icon: z$1.ZodOptional<z$1.ZodNullable<z$1.ZodString>>;
                itemId: z$1.ZodString;
                kind: z$1.ZodLiteral<"plugin">;
                label: z$1.ZodString;
                pluginId: z$1.ZodString;
            }, z$1.core.$strip>], "kind">>;
            start: z$1.ZodNumber;
        }, z$1.core.$strip>>>;
        text: z$1.ZodString;
        type: z$1.ZodLiteral<"text">;
        visibility: z$1.ZodOptional<z$1.ZodEnum<{
            "agent-only": "agent-only";
        }>>;
    }, z$1.core.$strip>, z$1.ZodObject<{
        type: z$1.ZodLiteral<"image">;
        url: z$1.ZodString;
        visibility: z$1.ZodOptional<z$1.ZodEnum<{
            "agent-only": "agent-only";
        }>>;
    }, z$1.core.$strip>, z$1.ZodObject<{
        path: z$1.ZodString;
        type: z$1.ZodLiteral<"localImage">;
        visibility: z$1.ZodOptional<z$1.ZodEnum<{
            "agent-only": "agent-only";
        }>>;
    }, z$1.core.$strip>, z$1.ZodObject<{
        mimeType: z$1.ZodOptional<z$1.ZodString>;
        name: z$1.ZodOptional<z$1.ZodString>;
        path: z$1.ZodString;
        sizeBytes: z$1.ZodOptional<z$1.ZodNumber>;
        type: z$1.ZodLiteral<"localFile">;
        visibility: z$1.ZodOptional<z$1.ZodEnum<{
            "agent-only": "agent-only";
        }>>;
    }, z$1.core.$strip>], "type">>;
}, z$1.core.$strip>>;
type PromptHistoryResponse = z$1.infer<typeof promptHistoryResponseSchema>;
declare const updateProjectRequestSchema: z$1.ZodObject<{
    name: z$1.ZodOptional<z$1.ZodString>;
}, z$1.core.$strip>;
type UpdateProjectRequest = z$1.infer<typeof updateProjectRequestSchema>;
declare const updateProjectSourceRequestSchema: z$1.ZodObject<{
    isDefault: z$1.ZodOptional<z$1.ZodLiteral<true>>;
    path: z$1.ZodOptional<z$1.ZodPipe<z$1.ZodString, z$1.ZodTransform<string, string>>>;
    type: z$1.ZodLiteral<"local_path">;
}, z$1.core.$strict>;
type UpdateProjectSourceRequest = z$1.infer<typeof updateProjectSourceRequestSchema>;
declare const commandListResponseSchema: z$1.ZodObject<{
    commands: z$1.ZodArray<z$1.ZodObject<{
        argumentHint: z$1.ZodNullable<z$1.ZodString>;
        description: z$1.ZodNullable<z$1.ZodString>;
        name: z$1.ZodString;
        origin: z$1.ZodEnum<{
            builtin: "builtin";
            project: "project";
            user: "user";
        }>;
        pluginId: z$1.ZodOptional<z$1.ZodString>;
        source: z$1.ZodEnum<{
            command: "command";
            skill: "skill";
        }>;
    }, z$1.core.$strip>>;
}, z$1.core.$strip>;
type CommandListResponse = z$1.infer<typeof commandListResponseSchema>;
declare const projectCommandsQuerySchema: z$1.ZodObject<{
    environmentId: z$1.ZodOptional<z$1.ZodPipe<z$1.ZodTransform<unknown, unknown>, z$1.ZodOptional<z$1.ZodString>>>;
    hostId: z$1.ZodOptional<z$1.ZodString>;
    provider: z$1.ZodString;
}, z$1.core.$strict>;
type ProjectCommandsQuery = z$1.infer<typeof projectCommandsQuerySchema>;
declare const skillListResponseSchema: z$1.ZodObject<{
    skills: z$1.ZodArray<z$1.ZodObject<{
        description: z$1.ZodNullable<z$1.ZodString>;
        filePath: z$1.ZodString;
        id: z$1.ZodString;
        manageable: z$1.ZodBoolean;
        name: z$1.ZodString;
        pluginId: z$1.ZodNullable<z$1.ZodString>;
        provider: z$1.ZodNullable<z$1.ZodString>;
        registrySkillId: z$1.ZodNullable<z$1.ZodString>;
        scope: z$1.ZodEnum<{
            "bb-builtin": "bb-builtin";
            "bb-project": "bb-project";
            "bb-user": "bb-user";
            "provider-project": "provider-project";
            "provider-user": "provider-user";
            "shared-project": "shared-project";
            "shared-user": "shared-user";
            plugin: "plugin";
        }>;
    }, z$1.core.$strip>>;
}, z$1.core.$strip>;
type SkillListResponse = z$1.infer<typeof skillListResponseSchema>;
declare const skillContentResponseSchema: z$1.ZodObject<{
    content: z$1.ZodString;
    revision: z$1.ZodString;
}, z$1.core.$strip>;
type SkillContentResponse = z$1.infer<typeof skillContentResponseSchema>;
declare const skillFilesResponseSchema: z$1.ZodObject<{
    files: z$1.ZodArray<z$1.ZodString>;
    truncated: z$1.ZodBoolean;
}, z$1.core.$strip>;
type SkillFilesResponse = z$1.infer<typeof skillFilesResponseSchema>;
declare const projectResponseSchema: z$1.ZodObject<{
    createdAt: z$1.ZodNumber;
    gitRemoteUrl: z$1.ZodNullable<z$1.ZodString>;
    id: z$1.ZodString;
    kind: z$1.ZodEnum<{
        personal: "personal";
        standard: "standard";
    }>;
    name: z$1.ZodString;
    sources: z$1.ZodArray<z$1.ZodObject<{
        createdAt: z$1.ZodNumber;
        hostId: z$1.ZodString;
        id: z$1.ZodString;
        isDefault: z$1.ZodBoolean;
        path: z$1.ZodString;
        projectId: z$1.ZodString;
        type: z$1.ZodLiteral<"local_path">;
        updatedAt: z$1.ZodNumber;
    }, z$1.core.$strip>>;
    updatedAt: z$1.ZodNumber;
}, z$1.core.$strip>;
type ProjectResponse = z$1.infer<typeof projectResponseSchema>;
declare const projectWithThreadsResponseSchema: z$1.ZodObject<{
    createdAt: z$1.ZodNumber;
    defaultExecutionOptions: z$1.ZodNullable<z$1.ZodObject<{
        model: z$1.ZodString;
        permissionMode: z$1.ZodEnum<{
            "accept-edits": "accept-edits";
            auto: "auto";
            full: "full";
        }>;
        providerId: z$1.ZodString;
        reasoningLevel: z$1.ZodEnum<{
            high: "high";
            low: "low";
            max: "max";
            medium: "medium";
            none: "none";
            ultra: "ultra";
            ultracode: "ultracode";
            xhigh: "xhigh";
        }>;
        serviceTier: z$1.ZodEnum<{
            default: "default";
            fast: "fast";
        }>;
    }, z$1.core.$strip>>;
    gitRemoteUrl: z$1.ZodNullable<z$1.ZodString>;
    id: z$1.ZodString;
    kind: z$1.ZodEnum<{
        personal: "personal";
        standard: "standard";
    }>;
    name: z$1.ZodString;
    sources: z$1.ZodArray<z$1.ZodObject<{
        createdAt: z$1.ZodNumber;
        hostId: z$1.ZodString;
        id: z$1.ZodString;
        isDefault: z$1.ZodBoolean;
        path: z$1.ZodString;
        projectId: z$1.ZodString;
        type: z$1.ZodLiteral<"local_path">;
        updatedAt: z$1.ZodNumber;
    }, z$1.core.$strip>>;
    threads: z$1.ZodArray<z$1.ZodObject<{
        activity: z$1.ZodObject<{
            activeBackgroundAgentCount: z$1.ZodNumber;
            activeBackgroundCommandCount: z$1.ZodNumber;
            activeGoalCount: z$1.ZodNumber;
            activePlanModeCount: z$1.ZodNumber;
            activeWorkflowCount: z$1.ZodNumber;
        }, z$1.core.$strip>;
        archivedAt: z$1.ZodNullable<z$1.ZodNumber>;
        createdAt: z$1.ZodNumber;
        deletedAt: z$1.ZodNullable<z$1.ZodNumber>;
        environmentBranchName: z$1.ZodNullable<z$1.ZodString>;
        environmentHostId: z$1.ZodNullable<z$1.ZodString>;
        environmentId: z$1.ZodNullable<z$1.ZodString>;
        environmentIsWorktree: z$1.ZodNullable<z$1.ZodBoolean>;
        environmentName: z$1.ZodNullable<z$1.ZodString>;
        environmentPath: z$1.ZodNullable<z$1.ZodString>;
        environmentProviderId: z$1.ZodNullable<z$1.ZodString>;
        environmentWorkspaceDisplayKind: z$1.ZodEnum<{
            "managed-worktree": "managed-worktree";
            "unmanaged-worktree": "unmanaged-worktree";
            other: "other";
        }>;
        hasPendingInteraction: z$1.ZodBoolean;
        id: z$1.ZodString;
        lastReadAt: z$1.ZodNullable<z$1.ZodNumber>;
        latestAttentionAt: z$1.ZodNumber;
        lifecycleOwnerThreadId: z$1.ZodNullable<z$1.ZodString>;
        originKind: z$1.ZodNullable<z$1.ZodEnum<{
            fork: "fork";
        }>>;
        originPluginId: z$1.ZodNullable<z$1.ZodString>;
        parentThreadId: z$1.ZodNullable<z$1.ZodString>;
        pinSortKey: z$1.ZodNullable<z$1.ZodString>;
        pinnedAt: z$1.ZodNullable<z$1.ZodNumber>;
        projectId: z$1.ZodString;
        providerId: z$1.ZodString;
        queuedWork: z$1.ZodEnum<{
            failed: "failed";
            none: "none";
            waiting: "waiting";
        }>;
        runtime: z$1.ZodObject<{
            displayStatus: z$1.ZodEnum<{
                "host-reconnecting": "host-reconnecting";
                "waiting-for-host": "waiting-for-host";
                active: "active";
                error: "error";
                idle: "idle";
                pending: "pending";
                provisioning: "provisioning";
                starting: "starting";
                stopping: "stopping";
            }>;
            hostReconnectGraceExpiresAt: z$1.ZodNullable<z$1.ZodNumber>;
        }, z$1.core.$strip>;
        sectionId: z$1.ZodNullable<z$1.ZodString>;
        sourceThreadId: z$1.ZodNullable<z$1.ZodString>;
        status: z$1.ZodEnum<{
            active: "active";
            error: "error";
            idle: "idle";
            pending: "pending";
            starting: "starting";
            stopping: "stopping";
        }>;
        title: z$1.ZodNullable<z$1.ZodString>;
        titleFallback: z$1.ZodNullable<z$1.ZodString>;
        updatedAt: z$1.ZodNumber;
        visibility: z$1.ZodEnum<{
            hidden: "hidden";
            visible: "visible";
        }>;
    }, z$1.core.$strip>>;
    updatedAt: z$1.ZodNumber;
}, z$1.core.$strip>;
type ProjectWithThreadsResponse = z$1.infer<typeof projectWithThreadsResponseSchema>;
declare const sidebarBootstrapResponseSchema: z$1.ZodObject<{
    personalProject: z$1.ZodObject<{
        createdAt: z$1.ZodNumber;
        defaultExecutionOptions: z$1.ZodNullable<z$1.ZodObject<{
            model: z$1.ZodString;
            permissionMode: z$1.ZodEnum<{
                "accept-edits": "accept-edits";
                auto: "auto";
                full: "full";
            }>;
            providerId: z$1.ZodString;
            reasoningLevel: z$1.ZodEnum<{
                high: "high";
                low: "low";
                max: "max";
                medium: "medium";
                none: "none";
                ultra: "ultra";
                ultracode: "ultracode";
                xhigh: "xhigh";
            }>;
            serviceTier: z$1.ZodEnum<{
                default: "default";
                fast: "fast";
            }>;
        }, z$1.core.$strip>>;
        gitRemoteUrl: z$1.ZodNullable<z$1.ZodString>;
        id: z$1.ZodString;
        kind: z$1.ZodEnum<{
            personal: "personal";
            standard: "standard";
        }>;
        name: z$1.ZodString;
        sources: z$1.ZodArray<z$1.ZodObject<{
            createdAt: z$1.ZodNumber;
            hostId: z$1.ZodString;
            id: z$1.ZodString;
            isDefault: z$1.ZodBoolean;
            path: z$1.ZodString;
            projectId: z$1.ZodString;
            type: z$1.ZodLiteral<"local_path">;
            updatedAt: z$1.ZodNumber;
        }, z$1.core.$strip>>;
        threads: z$1.ZodArray<z$1.ZodObject<{
            activity: z$1.ZodObject<{
                activeBackgroundAgentCount: z$1.ZodNumber;
                activeBackgroundCommandCount: z$1.ZodNumber;
                activeGoalCount: z$1.ZodNumber;
                activePlanModeCount: z$1.ZodNumber;
                activeWorkflowCount: z$1.ZodNumber;
            }, z$1.core.$strip>;
            archivedAt: z$1.ZodNullable<z$1.ZodNumber>;
            createdAt: z$1.ZodNumber;
            deletedAt: z$1.ZodNullable<z$1.ZodNumber>;
            environmentBranchName: z$1.ZodNullable<z$1.ZodString>;
            environmentHostId: z$1.ZodNullable<z$1.ZodString>;
            environmentId: z$1.ZodNullable<z$1.ZodString>;
            environmentIsWorktree: z$1.ZodNullable<z$1.ZodBoolean>;
            environmentName: z$1.ZodNullable<z$1.ZodString>;
            environmentPath: z$1.ZodNullable<z$1.ZodString>;
            environmentProviderId: z$1.ZodNullable<z$1.ZodString>;
            environmentWorkspaceDisplayKind: z$1.ZodEnum<{
                "managed-worktree": "managed-worktree";
                "unmanaged-worktree": "unmanaged-worktree";
                other: "other";
            }>;
            hasPendingInteraction: z$1.ZodBoolean;
            id: z$1.ZodString;
            lastReadAt: z$1.ZodNullable<z$1.ZodNumber>;
            latestAttentionAt: z$1.ZodNumber;
            lifecycleOwnerThreadId: z$1.ZodNullable<z$1.ZodString>;
            originKind: z$1.ZodNullable<z$1.ZodEnum<{
                fork: "fork";
            }>>;
            originPluginId: z$1.ZodNullable<z$1.ZodString>;
            parentThreadId: z$1.ZodNullable<z$1.ZodString>;
            pinSortKey: z$1.ZodNullable<z$1.ZodString>;
            pinnedAt: z$1.ZodNullable<z$1.ZodNumber>;
            projectId: z$1.ZodString;
            providerId: z$1.ZodString;
            queuedWork: z$1.ZodEnum<{
                failed: "failed";
                none: "none";
                waiting: "waiting";
            }>;
            runtime: z$1.ZodObject<{
                displayStatus: z$1.ZodEnum<{
                    "host-reconnecting": "host-reconnecting";
                    "waiting-for-host": "waiting-for-host";
                    active: "active";
                    error: "error";
                    idle: "idle";
                    pending: "pending";
                    provisioning: "provisioning";
                    starting: "starting";
                    stopping: "stopping";
                }>;
                hostReconnectGraceExpiresAt: z$1.ZodNullable<z$1.ZodNumber>;
            }, z$1.core.$strip>;
            sectionId: z$1.ZodNullable<z$1.ZodString>;
            sourceThreadId: z$1.ZodNullable<z$1.ZodString>;
            status: z$1.ZodEnum<{
                active: "active";
                error: "error";
                idle: "idle";
                pending: "pending";
                starting: "starting";
                stopping: "stopping";
            }>;
            title: z$1.ZodNullable<z$1.ZodString>;
            titleFallback: z$1.ZodNullable<z$1.ZodString>;
            updatedAt: z$1.ZodNumber;
            visibility: z$1.ZodEnum<{
                hidden: "hidden";
                visible: "visible";
            }>;
        }, z$1.core.$strip>>;
        updatedAt: z$1.ZodNumber;
    }, z$1.core.$strip>;
    projects: z$1.ZodArray<z$1.ZodObject<{
        createdAt: z$1.ZodNumber;
        defaultExecutionOptions: z$1.ZodNullable<z$1.ZodObject<{
            model: z$1.ZodString;
            permissionMode: z$1.ZodEnum<{
                "accept-edits": "accept-edits";
                auto: "auto";
                full: "full";
            }>;
            providerId: z$1.ZodString;
            reasoningLevel: z$1.ZodEnum<{
                high: "high";
                low: "low";
                max: "max";
                medium: "medium";
                none: "none";
                ultra: "ultra";
                ultracode: "ultracode";
                xhigh: "xhigh";
            }>;
            serviceTier: z$1.ZodEnum<{
                default: "default";
                fast: "fast";
            }>;
        }, z$1.core.$strip>>;
        gitRemoteUrl: z$1.ZodNullable<z$1.ZodString>;
        id: z$1.ZodString;
        kind: z$1.ZodEnum<{
            personal: "personal";
            standard: "standard";
        }>;
        name: z$1.ZodString;
        sources: z$1.ZodArray<z$1.ZodObject<{
            createdAt: z$1.ZodNumber;
            hostId: z$1.ZodString;
            id: z$1.ZodString;
            isDefault: z$1.ZodBoolean;
            path: z$1.ZodString;
            projectId: z$1.ZodString;
            type: z$1.ZodLiteral<"local_path">;
            updatedAt: z$1.ZodNumber;
        }, z$1.core.$strip>>;
        threads: z$1.ZodArray<z$1.ZodObject<{
            activity: z$1.ZodObject<{
                activeBackgroundAgentCount: z$1.ZodNumber;
                activeBackgroundCommandCount: z$1.ZodNumber;
                activeGoalCount: z$1.ZodNumber;
                activePlanModeCount: z$1.ZodNumber;
                activeWorkflowCount: z$1.ZodNumber;
            }, z$1.core.$strip>;
            archivedAt: z$1.ZodNullable<z$1.ZodNumber>;
            createdAt: z$1.ZodNumber;
            deletedAt: z$1.ZodNullable<z$1.ZodNumber>;
            environmentBranchName: z$1.ZodNullable<z$1.ZodString>;
            environmentHostId: z$1.ZodNullable<z$1.ZodString>;
            environmentId: z$1.ZodNullable<z$1.ZodString>;
            environmentIsWorktree: z$1.ZodNullable<z$1.ZodBoolean>;
            environmentName: z$1.ZodNullable<z$1.ZodString>;
            environmentPath: z$1.ZodNullable<z$1.ZodString>;
            environmentProviderId: z$1.ZodNullable<z$1.ZodString>;
            environmentWorkspaceDisplayKind: z$1.ZodEnum<{
                "managed-worktree": "managed-worktree";
                "unmanaged-worktree": "unmanaged-worktree";
                other: "other";
            }>;
            hasPendingInteraction: z$1.ZodBoolean;
            id: z$1.ZodString;
            lastReadAt: z$1.ZodNullable<z$1.ZodNumber>;
            latestAttentionAt: z$1.ZodNumber;
            lifecycleOwnerThreadId: z$1.ZodNullable<z$1.ZodString>;
            originKind: z$1.ZodNullable<z$1.ZodEnum<{
                fork: "fork";
            }>>;
            originPluginId: z$1.ZodNullable<z$1.ZodString>;
            parentThreadId: z$1.ZodNullable<z$1.ZodString>;
            pinSortKey: z$1.ZodNullable<z$1.ZodString>;
            pinnedAt: z$1.ZodNullable<z$1.ZodNumber>;
            projectId: z$1.ZodString;
            providerId: z$1.ZodString;
            queuedWork: z$1.ZodEnum<{
                failed: "failed";
                none: "none";
                waiting: "waiting";
            }>;
            runtime: z$1.ZodObject<{
                displayStatus: z$1.ZodEnum<{
                    "host-reconnecting": "host-reconnecting";
                    "waiting-for-host": "waiting-for-host";
                    active: "active";
                    error: "error";
                    idle: "idle";
                    pending: "pending";
                    provisioning: "provisioning";
                    starting: "starting";
                    stopping: "stopping";
                }>;
                hostReconnectGraceExpiresAt: z$1.ZodNullable<z$1.ZodNumber>;
            }, z$1.core.$strip>;
            sectionId: z$1.ZodNullable<z$1.ZodString>;
            sourceThreadId: z$1.ZodNullable<z$1.ZodString>;
            status: z$1.ZodEnum<{
                active: "active";
                error: "error";
                idle: "idle";
                pending: "pending";
                starting: "starting";
                stopping: "stopping";
            }>;
            title: z$1.ZodNullable<z$1.ZodString>;
            titleFallback: z$1.ZodNullable<z$1.ZodString>;
            updatedAt: z$1.ZodNumber;
            visibility: z$1.ZodEnum<{
                hidden: "hidden";
                visible: "visible";
            }>;
        }, z$1.core.$strip>>;
        updatedAt: z$1.ZodNumber;
    }, z$1.core.$strip>>;
    sections: z$1.ZodArray<z$1.ZodObject<{
        createdAt: z$1.ZodNumber;
        id: z$1.ZodString;
        name: z$1.ZodString;
        updatedAt: z$1.ZodNumber;
    }, z$1.core.$strict>>;
}, z$1.core.$strip>;
type SidebarBootstrapResponse = z$1.infer<typeof sidebarBootstrapResponseSchema>;
declare const uploadedPromptAttachmentSchema: z$1.ZodObject<{
    mimeType: z$1.ZodOptional<z$1.ZodString>;
    name: z$1.ZodString;
    path: z$1.ZodString;
    sizeBytes: z$1.ZodNumber;
    type: z$1.ZodEnum<{
        localFile: "localFile";
        localImage: "localImage";
    }>;
}, z$1.core.$strip>;
type UploadedPromptAttachment = z$1.infer<typeof uploadedPromptAttachmentSchema>;
declare const copyProjectAttachmentsRequestSchema: z$1.ZodObject<{
    paths: z$1.ZodArray<z$1.ZodString>;
    sourceProjectId: z$1.ZodString;
}, z$1.core.$strict>;
type CopyProjectAttachmentsRequest = z$1.infer<typeof copyProjectAttachmentsRequestSchema>;

declare const registrySkillSchema: z$1.ZodObject<{
    id: z$1.ZodString;
    installUrl: z$1.ZodNullable<z$1.ZodString>;
    installs: z$1.ZodNumber;
    name: z$1.ZodString;
    skillId: z$1.ZodString;
    source: z$1.ZodString;
    stars: z$1.ZodNullable<z$1.ZodNumber>;
    summary: z$1.ZodNullable<z$1.ZodString>;
    topic: z$1.ZodNullable<z$1.ZodString>;
    url: z$1.ZodString;
}, z$1.core.$strip>;
type RegistrySkill = z$1.infer<typeof registrySkillSchema>;
declare const registrySkillsPageSchema: z$1.ZodObject<{
    pagination: z$1.ZodObject<{
        hasMore: z$1.ZodBoolean;
        page: z$1.ZodNumber;
        perPage: z$1.ZodNumber;
        total: z$1.ZodNumber;
    }, z$1.core.$strip>;
    ranking: z$1.ZodEnum<{
        "all-time": "all-time";
        trending: "trending";
    }>;
    skills: z$1.ZodArray<z$1.ZodObject<{
        id: z$1.ZodString;
        installUrl: z$1.ZodNullable<z$1.ZodString>;
        installs: z$1.ZodNumber;
        name: z$1.ZodString;
        skillId: z$1.ZodString;
        source: z$1.ZodString;
        stars: z$1.ZodNullable<z$1.ZodNumber>;
        summary: z$1.ZodNullable<z$1.ZodString>;
        topic: z$1.ZodNullable<z$1.ZodString>;
        url: z$1.ZodString;
    }, z$1.core.$strip>>;
}, z$1.core.$strip>;
type RegistrySkillsPage = z$1.infer<typeof registrySkillsPageSchema>;
declare const registryRepositoryStarsSchema: z$1.ZodObject<{
    stars: z$1.ZodNumber;
}, z$1.core.$strip>;
type RegistryRepositoryStars = z$1.infer<typeof registryRepositoryStarsSchema>;
declare const registrySkillDetailSchema: z$1.ZodObject<{
    files: z$1.ZodNullable<z$1.ZodArray<z$1.ZodObject<{
        contents: z$1.ZodString;
        path: z$1.ZodString;
    }, z$1.core.$strip>>>;
    hash: z$1.ZodNullable<z$1.ZodString>;
    id: z$1.ZodString;
    skillId: z$1.ZodString;
    source: z$1.ZodString;
}, z$1.core.$strip>;
type RegistrySkillDetail = z$1.infer<typeof registrySkillDetailSchema>;
declare const registrySkillEntriesResponseSchema: z$1.ZodObject<{
    entries: z$1.ZodArray<z$1.ZodObject<{
        id: z$1.ZodString;
        installUrl: z$1.ZodNullable<z$1.ZodString>;
        installs: z$1.ZodNumber;
        name: z$1.ZodString;
        skillId: z$1.ZodString;
        source: z$1.ZodString;
        stars: z$1.ZodNullable<z$1.ZodNumber>;
        summary: z$1.ZodNullable<z$1.ZodString>;
        topic: z$1.ZodNullable<z$1.ZodString>;
        url: z$1.ZodString;
    }, z$1.core.$strip>>;
}, z$1.core.$strip>;
type RegistrySkillEntriesResponse = z$1.infer<typeof registrySkillEntriesResponseSchema>;
declare const registrySkillInstallResponseSchema: z$1.ZodObject<{
    filePath: z$1.ZodString;
    ok: z$1.ZodLiteral<true>;
}, z$1.core.$strip>;
type RegistrySkillInstallResponse = z$1.infer<typeof registrySkillInstallResponseSchema>;

declare const updateEnvironmentRequestSchema: z$1.ZodObject<{
    mergeBaseBranch: z$1.ZodOptional<z$1.ZodNullable<z$1.ZodString>>;
    name: z$1.ZodOptional<z$1.ZodNullable<z$1.ZodString>>;
}, z$1.core.$strip>;
type UpdateEnvironmentRequest = z$1.infer<typeof updateEnvironmentRequestSchema>;
declare const environmentPathsQuerySchema: z$1.ZodObject<{
    includeDirectories: z$1.ZodEnum<{
        false: "false";
        true: "true";
    }>;
    includeFiles: z$1.ZodEnum<{
        false: "false";
        true: "true";
    }>;
    limit: z$1.ZodOptional<z$1.ZodString>;
    query: z$1.ZodOptional<z$1.ZodString>;
}, z$1.core.$strip>;
type EnvironmentPathsQuery = z$1.infer<typeof environmentPathsQuerySchema>;
declare const environmentDiffBranchesQuerySchema: z$1.ZodObject<{
    limit: z$1.ZodOptional<z$1.ZodString>;
    query: z$1.ZodOptional<z$1.ZodString>;
    selectedBranch: z$1.ZodOptional<z$1.ZodString>;
}, z$1.core.$strip>;
type EnvironmentDiffBranchesQuery = z$1.infer<typeof environmentDiffBranchesQuerySchema>;
declare const environmentDiffBranchesResponseSchema: z$1.ZodObject<{
    branches: z$1.ZodArray<z$1.ZodString>;
    branchesTruncated: z$1.ZodBoolean;
    remoteBranches: z$1.ZodArray<z$1.ZodString>;
    remoteBranchesTruncated: z$1.ZodBoolean;
    selectedBranch: z$1.ZodNullable<z$1.ZodObject<{
        kind: z$1.ZodEnum<{
            local: "local";
            missing: "missing";
            remote: "remote";
        }>;
        name: z$1.ZodString;
    }, z$1.core.$strip>>;
}, z$1.core.$strip>;
type EnvironmentDiffBranchesResponse = z$1.infer<typeof environmentDiffBranchesResponseSchema>;
declare const environmentStatusQuerySchema: z$1.ZodObject<{
    mergeBaseBranch: z$1.ZodOptional<z$1.ZodPipe<z$1.ZodString, z$1.ZodString>>;
}, z$1.core.$strip>;
type EnvironmentStatusQuery = z$1.infer<typeof environmentStatusQuerySchema>;
declare const environmentDiffQuerySchema: z$1.ZodDiscriminatedUnion<[z$1.ZodObject<{
    target: z$1.ZodLiteral<"uncommitted">;
}, z$1.core.$strip>, z$1.ZodObject<{
    mergeBaseBranch: z$1.ZodPipe<z$1.ZodString, z$1.ZodString>;
    target: z$1.ZodLiteral<"branch_committed">;
}, z$1.core.$strip>, z$1.ZodObject<{
    mergeBaseBranch: z$1.ZodPipe<z$1.ZodString, z$1.ZodString>;
    target: z$1.ZodLiteral<"all">;
}, z$1.core.$strip>, z$1.ZodObject<{
    sha: z$1.ZodString;
    target: z$1.ZodLiteral<"commit">;
}, z$1.core.$strip>], "target">;
type EnvironmentDiffQuery = z$1.infer<typeof environmentDiffQuerySchema>;
declare const environmentDiffFileQuerySchema: z$1.ZodDiscriminatedUnion<[z$1.ZodObject<{
    path: z$1.ZodString;
    side: z$1.ZodEnum<{
        new: "new";
        old: "old";
    }>;
    target: z$1.ZodLiteral<"uncommitted">;
}, z$1.core.$strip>, z$1.ZodObject<{
    mergeBaseRef: z$1.ZodString;
    path: z$1.ZodString;
    side: z$1.ZodEnum<{
        new: "new";
        old: "old";
    }>;
    target: z$1.ZodLiteral<"branch_committed">;
}, z$1.core.$strip>, z$1.ZodObject<{
    mergeBaseRef: z$1.ZodString;
    path: z$1.ZodString;
    side: z$1.ZodEnum<{
        new: "new";
        old: "old";
    }>;
    target: z$1.ZodLiteral<"all">;
}, z$1.core.$strip>, z$1.ZodObject<{
    path: z$1.ZodString;
    sha: z$1.ZodString;
    side: z$1.ZodEnum<{
        new: "new";
        old: "old";
    }>;
    target: z$1.ZodLiteral<"commit">;
}, z$1.core.$strip>], "target">;
type EnvironmentDiffFileQuery = z$1.infer<typeof environmentDiffFileQuerySchema>;
declare const environmentDiffFileResponseSchema: z$1.ZodObject<{
    content: z$1.ZodString;
    contentEncoding: z$1.ZodEnum<{
        base64: "base64";
        utf8: "utf8";
    }>;
    mimeType: z$1.ZodOptional<z$1.ZodString>;
    path: z$1.ZodString;
    sizeBytes: z$1.ZodNumber;
}, z$1.core.$strip>;
type EnvironmentDiffFileResponse = z$1.infer<typeof environmentDiffFileResponseSchema>;
declare const environmentArchiveThreadsResponseSchema: z$1.ZodObject<{
    archivedThreadIds: z$1.ZodArray<z$1.ZodString>;
    ok: z$1.ZodLiteral<true>;
}, z$1.core.$strip>;
type EnvironmentArchiveThreadsResponse = z$1.infer<typeof environmentArchiveThreadsResponseSchema>;
declare const pullRequestMergeMethodSchema: z$1.ZodEnum<{
    merge: "merge";
    rebase: "rebase";
    squash: "squash";
}>;
type PullRequestMergeMethod = z$1.infer<typeof pullRequestMergeMethodSchema>;
declare const commitActionResponseSchema: z$1.ZodObject<{
    action: z$1.ZodLiteral<"commit">;
    commitSha: z$1.ZodString;
    commitSubject: z$1.ZodString;
    message: z$1.ZodString;
    ok: z$1.ZodLiteral<true>;
}, z$1.core.$strip>;
type CommitActionResponse = z$1.infer<typeof commitActionResponseSchema>;
declare const pullRequestReadyActionResponseSchema: z$1.ZodObject<{
    action: z$1.ZodLiteral<"pull_request_ready">;
    message: z$1.ZodString;
    ok: z$1.ZodLiteral<true>;
}, z$1.core.$strip>;
type PullRequestReadyActionResponse = z$1.infer<typeof pullRequestReadyActionResponseSchema>;
declare const pullRequestMergeActionResponseSchema: z$1.ZodObject<{
    action: z$1.ZodLiteral<"pull_request_merge">;
    message: z$1.ZodString;
    method: z$1.ZodEnum<{
        merge: "merge";
        rebase: "rebase";
        squash: "squash";
    }>;
    ok: z$1.ZodLiteral<true>;
}, z$1.core.$strip>;
type PullRequestMergeActionResponse = z$1.infer<typeof pullRequestMergeActionResponseSchema>;
declare const pullRequestDraftActionResponseSchema: z$1.ZodObject<{
    action: z$1.ZodLiteral<"pull_request_draft">;
    message: z$1.ZodString;
    ok: z$1.ZodLiteral<true>;
}, z$1.core.$strip>;
type PullRequestDraftActionResponse = z$1.infer<typeof pullRequestDraftActionResponseSchema>;
declare const environmentStatusResponseSchema: z$1.ZodDiscriminatedUnion<[z$1.ZodObject<{
    outcome: z$1.ZodLiteral<"available">;
    workspace: z$1.ZodObject<{
        branch: z$1.ZodObject<{
            currentBranch: z$1.ZodNullable<z$1.ZodString>;
            defaultBranch: z$1.ZodString;
        }, z$1.core.$strip>;
        checkout: z$1.ZodDiscriminatedUnion<[z$1.ZodObject<{
            branchName: z$1.ZodString;
            headSha: z$1.ZodNullable<z$1.ZodString>;
            kind: z$1.ZodLiteral<"branch">;
        }, z$1.core.$strip>, z$1.ZodObject<{
            headSha: z$1.ZodNullable<z$1.ZodString>;
            kind: z$1.ZodLiteral<"detached">;
        }, z$1.core.$strip>, z$1.ZodObject<{
            branchName: z$1.ZodNullable<z$1.ZodString>;
            kind: z$1.ZodLiteral<"unborn">;
        }, z$1.core.$strip>, z$1.ZodObject<{
            kind: z$1.ZodLiteral<"unknown">;
            reason: z$1.ZodString;
        }, z$1.core.$strip>], "kind">;
        mergeBase: z$1.ZodNullable<z$1.ZodObject<{
            aheadCount: z$1.ZodNumber;
            baseRef: z$1.ZodNullable<z$1.ZodString>;
            behindCount: z$1.ZodNumber;
            commits: z$1.ZodArray<z$1.ZodObject<{
                authorName: z$1.ZodString;
                authoredAt: z$1.ZodNumber;
                sha: z$1.ZodString;
                shortSha: z$1.ZodString;
                subject: z$1.ZodString;
            }, z$1.core.$strip>>;
            deletions: z$1.ZodNumber;
            files: z$1.ZodArray<z$1.ZodObject<{
                deletions: z$1.ZodNullable<z$1.ZodNumber>;
                insertions: z$1.ZodNullable<z$1.ZodNumber>;
                path: z$1.ZodString;
                status: z$1.ZodEnum<{
                    "?": "?";
                    "??": "??";
                    A: "A";
                    C: "C";
                    D: "D";
                    M: "M";
                    R: "R";
                    U: "U";
                }>;
            }, z$1.core.$strip>>;
            hasCommittedUnmergedChanges: z$1.ZodBoolean;
            insertions: z$1.ZodNumber;
            lineStatsComplete: z$1.ZodBoolean;
            mergeBaseBranch: z$1.ZodString;
        }, z$1.core.$strip>>;
        workingTree: z$1.ZodObject<{
            deletions: z$1.ZodNumber;
            files: z$1.ZodArray<z$1.ZodObject<{
                deletions: z$1.ZodNullable<z$1.ZodNumber>;
                insertions: z$1.ZodNullable<z$1.ZodNumber>;
                path: z$1.ZodString;
                status: z$1.ZodEnum<{
                    "?": "?";
                    "??": "??";
                    A: "A";
                    C: "C";
                    D: "D";
                    M: "M";
                    R: "R";
                    U: "U";
                }>;
            }, z$1.core.$strip>>;
            hasUncommittedChanges: z$1.ZodBoolean;
            insertions: z$1.ZodNumber;
            lineStatsComplete: z$1.ZodBoolean;
            state: z$1.ZodEnum<{
                clean: "clean";
                committed_unmerged: "committed_unmerged";
                dirty_and_committed_unmerged: "dirty_and_committed_unmerged";
                dirty_uncommitted: "dirty_uncommitted";
                untracked: "untracked";
            }>;
        }, z$1.core.$strip>;
    }, z$1.core.$strip>;
}, z$1.core.$strict>, z$1.ZodObject<{
    message: z$1.ZodString;
    outcome: z$1.ZodLiteral<"not_applicable">;
    reason: z$1.ZodEnum<{
        non_git_environment: "non_git_environment";
    }>;
}, z$1.core.$strict>, z$1.ZodObject<{
    failure: z$1.ZodObject<{
        code: z$1.ZodEnum<{
            not_git_repo: "not_git_repo";
            path_not_found: "path_not_found";
            permission_denied: "permission_denied";
            unknown: "unknown";
            unknown_environment: "unknown_environment";
            workspace_type_mismatch: "workspace_type_mismatch";
        }>;
        message: z$1.ZodString;
        workspacePath: z$1.ZodString;
    }, z$1.core.$strict>;
    outcome: z$1.ZodLiteral<"unavailable">;
}, z$1.core.$strict>], "outcome">;
declare const environmentPullRequestResponseSchema: z$1.ZodDiscriminatedUnion<[z$1.ZodObject<{
    outcome: z$1.ZodLiteral<"available">;
    pullRequest: z$1.ZodObject<{
        attention: z$1.ZodEnum<{
            blocked: "blocked";
            changes_requested: "changes_requested";
            checks_failed: "checks_failed";
            checks_pending: "checks_pending";
            closed: "closed";
            conflicts: "conflicts";
            draft: "draft";
            merged: "merged";
            none: "none";
            ready_to_merge: "ready_to_merge";
            review_requested: "review_requested";
        }>;
        baseRefName: z$1.ZodString;
        checks: z$1.ZodObject<{
            failedCount: z$1.ZodNumber;
            passedCount: z$1.ZodNumber;
            pendingCount: z$1.ZodNumber;
            state: z$1.ZodEnum<{
                failing: "failing";
                no_checks: "no_checks";
                passing: "passing";
                pending: "pending";
                unknown: "unknown";
            }>;
            totalCount: z$1.ZodNumber;
        }, z$1.core.$strict>;
        headRefName: z$1.ZodString;
        mergeability: z$1.ZodObject<{
            mergeStateStatus: z$1.ZodNullable<z$1.ZodEnum<{
                BEHIND: "BEHIND";
                BLOCKED: "BLOCKED";
                CLEAN: "CLEAN";
                DIRTY: "DIRTY";
                DRAFT: "DRAFT";
                HAS_HOOKS: "HAS_HOOKS";
                UNKNOWN: "UNKNOWN";
                UNSTABLE: "UNSTABLE";
            }>>;
            mergeable: z$1.ZodNullable<z$1.ZodEnum<{
                CONFLICTING: "CONFLICTING";
                MERGEABLE: "MERGEABLE";
                UNKNOWN: "UNKNOWN";
            }>>;
            state: z$1.ZodEnum<{
                blocked: "blocked";
                conflicts: "conflicts";
                draft: "draft";
                mergeable: "mergeable";
                unknown: "unknown";
            }>;
        }, z$1.core.$strict>;
        number: z$1.ZodNumber;
        review: z$1.ZodObject<{
            reviewRequestCount: z$1.ZodNumber;
            state: z$1.ZodEnum<{
                approved: "approved";
                changes_requested: "changes_requested";
                none: "none";
                review_requested: "review_requested";
                review_required: "review_required";
            }>;
        }, z$1.core.$strict>;
        state: z$1.ZodEnum<{
            closed: "closed";
            draft: "draft";
            merged: "merged";
            open: "open";
        }>;
        title: z$1.ZodString;
        updatedAt: z$1.ZodString;
        url: z$1.ZodString;
    }, z$1.core.$strict>;
}, z$1.core.$strict>, z$1.ZodObject<{
    outcome: z$1.ZodLiteral<"absent">;
}, z$1.core.$strict>, z$1.ZodObject<{
    message: z$1.ZodString;
    outcome: z$1.ZodLiteral<"unavailable">;
}, z$1.core.$strict>], "outcome">;
type EnvironmentPullRequestResponse = z$1.infer<typeof environmentPullRequestResponseSchema>;
declare const environmentDiffResponseSchema: z$1.ZodDiscriminatedUnion<[z$1.ZodObject<{
    diff: z$1.ZodObject<{
        diff: z$1.ZodString;
        files: z$1.ZodString;
        mergeBaseRef: z$1.ZodNullable<z$1.ZodString>;
        shortstat: z$1.ZodString;
        truncated: z$1.ZodBoolean;
    }, z$1.core.$strip>;
    outcome: z$1.ZodLiteral<"available">;
}, z$1.core.$strict>, z$1.ZodObject<{
    message: z$1.ZodString;
    outcome: z$1.ZodLiteral<"not_applicable">;
    reason: z$1.ZodEnum<{
        non_git_environment: "non_git_environment";
    }>;
}, z$1.core.$strict>, z$1.ZodObject<{
    failure: z$1.ZodObject<{
        code: z$1.ZodEnum<{
            not_git_repo: "not_git_repo";
            path_not_found: "path_not_found";
            permission_denied: "permission_denied";
            unknown: "unknown";
            unknown_environment: "unknown_environment";
            workspace_type_mismatch: "workspace_type_mismatch";
        }>;
        message: z$1.ZodString;
        workspacePath: z$1.ZodString;
    }, z$1.core.$strict>;
    outcome: z$1.ZodLiteral<"unavailable">;
}, z$1.core.$strict>], "outcome">;
type EnvironmentDiffResponse = z$1.infer<typeof environmentDiffResponseSchema>;
declare const environmentDiffFilesResponseSchema: z$1.ZodDiscriminatedUnion<[z$1.ZodObject<{
    files: z$1.ZodArray<z$1.ZodObject<{
        additions: z$1.ZodNumber;
        binary: z$1.ZodBoolean;
        changeKind: z$1.ZodEnum<{
            added: "added";
            copied: "copied";
            deleted: "deleted";
            modified: "modified";
            renamed: "renamed";
            type_changed: "type_changed";
        }>;
        deletions: z$1.ZodNumber;
        loadMode: z$1.ZodEnum<{
            auto: "auto";
            on_demand: "on_demand";
            too_large: "too_large";
        }>;
        origin: z$1.ZodEnum<{
            tracked: "tracked";
            untracked: "untracked";
        }>;
        path: z$1.ZodString;
        previousPath: z$1.ZodNullable<z$1.ZodString>;
    }, z$1.core.$strip>>;
    initialPatches: z$1.ZodArray<z$1.ZodObject<{
        patch: z$1.ZodString;
        path: z$1.ZodString;
        truncated: z$1.ZodBoolean;
    }, z$1.core.$strip>>;
    mergeBaseRef: z$1.ZodNullable<z$1.ZodString>;
    outcome: z$1.ZodLiteral<"available">;
    shortstat: z$1.ZodString;
    truncated: z$1.ZodBoolean;
}, z$1.core.$strict>, z$1.ZodObject<{
    message: z$1.ZodString;
    outcome: z$1.ZodLiteral<"not_applicable">;
    reason: z$1.ZodEnum<{
        non_git_environment: "non_git_environment";
    }>;
}, z$1.core.$strict>, z$1.ZodObject<{
    failure: z$1.ZodObject<{
        code: z$1.ZodEnum<{
            not_git_repo: "not_git_repo";
            path_not_found: "path_not_found";
            permission_denied: "permission_denied";
            unknown: "unknown";
            unknown_environment: "unknown_environment";
            workspace_type_mismatch: "workspace_type_mismatch";
        }>;
        message: z$1.ZodString;
        workspacePath: z$1.ZodString;
    }, z$1.core.$strict>;
    outcome: z$1.ZodLiteral<"unavailable">;
}, z$1.core.$strict>], "outcome">;
type EnvironmentDiffFilesResponse = z$1.infer<typeof environmentDiffFilesResponseSchema>;
declare const environmentDiffPatchResponseSchema: z$1.ZodDiscriminatedUnion<[z$1.ZodObject<{
    outcome: z$1.ZodLiteral<"available">;
    patches: z$1.ZodArray<z$1.ZodObject<{
        patch: z$1.ZodString;
        path: z$1.ZodString;
        truncated: z$1.ZodBoolean;
    }, z$1.core.$strip>>;
}, z$1.core.$strict>, z$1.ZodObject<{
    message: z$1.ZodString;
    outcome: z$1.ZodLiteral<"not_applicable">;
    reason: z$1.ZodEnum<{
        non_git_environment: "non_git_environment";
    }>;
}, z$1.core.$strict>, z$1.ZodObject<{
    failure: z$1.ZodObject<{
        code: z$1.ZodEnum<{
            not_git_repo: "not_git_repo";
            path_not_found: "path_not_found";
            permission_denied: "permission_denied";
            unknown: "unknown";
            unknown_environment: "unknown_environment";
            workspace_type_mismatch: "workspace_type_mismatch";
        }>;
        message: z$1.ZodString;
        workspacePath: z$1.ZodString;
    }, z$1.core.$strict>;
    outcome: z$1.ZodLiteral<"unavailable">;
}, z$1.core.$strict>], "outcome">;
type EnvironmentDiffPatchResponse = z$1.infer<typeof environmentDiffPatchResponseSchema>;
declare const environmentDiffPatchRequestSchema: z$1.ZodObject<{
    paths: z$1.ZodArray<z$1.ZodString>;
    target: z$1.ZodDiscriminatedUnion<[z$1.ZodObject<{
        type: z$1.ZodLiteral<"uncommitted">;
    }, z$1.core.$strip>, z$1.ZodObject<{
        mergeBaseBranch: z$1.ZodString;
        type: z$1.ZodLiteral<"branch_committed">;
    }, z$1.core.$strip>, z$1.ZodObject<{
        mergeBaseBranch: z$1.ZodString;
        type: z$1.ZodLiteral<"all">;
    }, z$1.core.$strip>, z$1.ZodObject<{
        sha: z$1.ZodString;
        type: z$1.ZodLiteral<"commit">;
    }, z$1.core.$strip>], "type">;
}, z$1.core.$strict>;
type EnvironmentDiffPatchRequest = z$1.infer<typeof environmentDiffPatchRequestSchema>;
type EnvironmentStatusResponse = z$1.infer<typeof environmentStatusResponseSchema>;

declare const providerUsageResponseSchema: z$1.ZodRecord<z$1.ZodString, z$1.ZodDiscriminatedUnion<[z$1.ZodObject<{
    accountEmail: z$1.ZodNullable<z$1.ZodString>;
    planLabel: z$1.ZodNullable<z$1.ZodString>;
    status: z$1.ZodLiteral<"ok">;
    windows: z$1.ZodArray<z$1.ZodObject<{
        cost: z$1.ZodOptional<z$1.ZodObject<{
            limitUsdCents: z$1.ZodNumber;
            usedUsdCents: z$1.ZodNumber;
        }, z$1.core.$strip>>;
        label: z$1.ZodString;
        resetsAt: z$1.ZodNullable<z$1.ZodString>;
        usedPercent: z$1.ZodNumber;
    }, z$1.core.$loose>>;
}, z$1.core.$loose>, z$1.ZodObject<{
    status: z$1.ZodLiteral<"not_installed">;
}, z$1.core.$loose>, z$1.ZodObject<{
    status: z$1.ZodLiteral<"unauthenticated">;
}, z$1.core.$loose>, z$1.ZodObject<{
    status: z$1.ZodLiteral<"expired">;
}, z$1.core.$loose>, z$1.ZodObject<{
    accountEmail: z$1.ZodDefault<z$1.ZodNullable<z$1.ZodString>>;
    message: z$1.ZodString;
    planLabel: z$1.ZodDefault<z$1.ZodNullable<z$1.ZodString>>;
    status: z$1.ZodLiteral<"error">;
}, z$1.core.$loose>], "status">>;
type ProviderUsageResponse = z$1.infer<typeof providerUsageResponseSchema>;
type HostDaemonCommandTransport = "onlineRpc" | "settled";
type HostDaemonCommandEnvironmentLane = "read" | "write";
type HostDaemonFlushEventsBeforeResult = boolean | "when-initiated";
interface HostDaemonCommandDescriptor<Type extends string, Schema extends z$1.ZodTypeAny, ResultSchema extends z$1.ZodTypeAny, Transport extends HostDaemonCommandTransport, Retryable extends boolean> {
    type: Type;
    schema: Schema;
    resultSchema: ResultSchema;
    transport: Transport;
    retryable: Retryable;
    flushEventsBeforeResult: HostDaemonFlushEventsBeforeResult;
    envLane: HostDaemonCommandEnvironmentLane | null;
}
declare const hostDaemonCommandRegistry: {
    "desktop.browser.list_instances": HostDaemonCommandDescriptor<"desktop.browser.list_instances", z$1.ZodObject<{
        type: z$1.ZodLiteral<"desktop.browser.list_instances">;
    }, z$1.core.$strict>, z$1.ZodObject<{
        instances: z$1.ZodArray<z$1.ZodObject<{
            generation: z$1.ZodString;
            instanceId: z$1.ZodString;
            label: z$1.ZodString;
        }, z$1.core.$strip>>;
    }, z$1.core.$strip>, "onlineRpc", false>;
    "desktop.browser.list_tabs": HostDaemonCommandDescriptor<"desktop.browser.list_tabs", z$1.ZodObject<{
        generation: z$1.ZodString;
        instanceId: z$1.ZodString;
        threadId: z$1.ZodString;
        type: z$1.ZodLiteral<"desktop.browser.list_tabs">;
    }, z$1.core.$strict>, z$1.ZodObject<{
        tabs: z$1.ZodArray<z$1.ZodObject<{
            control: z$1.ZodNullable<z$1.ZodObject<{
                controllerLabel: z$1.ZodString;
                expiresAt: z$1.ZodNumber;
                leaseId: z$1.ZodString;
            }, z$1.core.$strip>>;
            presentation: z$1.ZodEnum<{
                hidden: "hidden";
                reveal: "reveal";
            }>;
            profile: z$1.ZodDiscriminatedUnion<[z$1.ZodObject<{
                id: z$1.ZodString;
                kind: z$1.ZodLiteral<"automation">;
            }, z$1.core.$strip>, z$1.ZodObject<{
                kind: z$1.ZodLiteral<"personal">;
            }, z$1.core.$strip>], "kind">;
            tabId: z$1.ZodString;
            threadId: z$1.ZodString;
            title: z$1.ZodString;
            url: z$1.ZodString;
        }, z$1.core.$strip>>;
    }, z$1.core.$strip>, "onlineRpc", false>;
    "desktop.browser.create_tab": HostDaemonCommandDescriptor<"desktop.browser.create_tab", z$1.ZodObject<{
        generation: z$1.ZodString;
        instanceId: z$1.ZodString;
        presentation: z$1.ZodEnum<{
            hidden: "hidden";
            reveal: "reveal";
        }>;
        profile: z$1.ZodDiscriminatedUnion<[z$1.ZodObject<{
            id: z$1.ZodString;
            kind: z$1.ZodLiteral<"automation">;
        }, z$1.core.$strip>, z$1.ZodObject<{
            kind: z$1.ZodLiteral<"personal">;
        }, z$1.core.$strip>], "kind">;
        tabId: z$1.ZodString;
        threadId: z$1.ZodString;
        type: z$1.ZodLiteral<"desktop.browser.create_tab">;
        url: z$1.ZodString;
    }, z$1.core.$strict>, z$1.ZodObject<{
        tab: z$1.ZodObject<{
            control: z$1.ZodNullable<z$1.ZodObject<{
                controllerLabel: z$1.ZodString;
                expiresAt: z$1.ZodNumber;
                leaseId: z$1.ZodString;
            }, z$1.core.$strip>>;
            presentation: z$1.ZodEnum<{
                hidden: "hidden";
                reveal: "reveal";
            }>;
            profile: z$1.ZodDiscriminatedUnion<[z$1.ZodObject<{
                id: z$1.ZodString;
                kind: z$1.ZodLiteral<"automation">;
            }, z$1.core.$strip>, z$1.ZodObject<{
                kind: z$1.ZodLiteral<"personal">;
            }, z$1.core.$strip>], "kind">;
            tabId: z$1.ZodString;
            threadId: z$1.ZodString;
            title: z$1.ZodString;
            url: z$1.ZodString;
        }, z$1.core.$strip>;
    }, z$1.core.$strip>, "onlineRpc", false>;
    "desktop.browser.reveal_tab": HostDaemonCommandDescriptor<"desktop.browser.reveal_tab", z$1.ZodObject<{
        generation: z$1.ZodString;
        instanceId: z$1.ZodString;
        tabId: z$1.ZodString;
        threadId: z$1.ZodString;
        type: z$1.ZodLiteral<"desktop.browser.reveal_tab">;
    }, z$1.core.$strict>, z$1.ZodObject<{
        ok: z$1.ZodLiteral<true>;
    }, z$1.core.$strip>, "onlineRpc", false>;
    "desktop.browser.close_tab": HostDaemonCommandDescriptor<"desktop.browser.close_tab", z$1.ZodObject<{
        generation: z$1.ZodString;
        instanceId: z$1.ZodString;
        tabId: z$1.ZodString;
        threadId: z$1.ZodString;
        type: z$1.ZodLiteral<"desktop.browser.close_tab">;
    }, z$1.core.$strict>, z$1.ZodObject<{
        ok: z$1.ZodLiteral<true>;
    }, z$1.core.$strip>, "onlineRpc", false>;
    "desktop.browser.capture_tab": HostDaemonCommandDescriptor<"desktop.browser.capture_tab", z$1.ZodObject<{
        generation: z$1.ZodString;
        instanceId: z$1.ZodString;
        tabId: z$1.ZodString;
        threadId: z$1.ZodString;
        type: z$1.ZodLiteral<"desktop.browser.capture_tab">;
    }, z$1.core.$strict>, z$1.ZodObject<{
        base64: z$1.ZodString;
        height: z$1.ZodNumber;
        mimeType: z$1.ZodLiteral<"image/jpeg">;
        width: z$1.ZodNumber;
    }, z$1.core.$strip>, "onlineRpc", false>;
    "desktop.browser.acquire_control": HostDaemonCommandDescriptor<"desktop.browser.acquire_control", z$1.ZodObject<{
        controllerLabel: z$1.ZodString;
        expiresAt: z$1.ZodNumber;
        generation: z$1.ZodString;
        instanceId: z$1.ZodString;
        leaseId: z$1.ZodString;
        tabIds: z$1.ZodArray<z$1.ZodString>;
        threadId: z$1.ZodString;
        type: z$1.ZodLiteral<"desktop.browser.acquire_control">;
    }, z$1.core.$strict>, z$1.ZodObject<{
        lease: z$1.ZodObject<{
            controllerLabel: z$1.ZodString;
            expiresAt: z$1.ZodNumber;
            leaseId: z$1.ZodString;
        }, z$1.core.$strip>;
    }, z$1.core.$strip>, "onlineRpc", false>;
    "desktop.browser.open_connection": HostDaemonCommandDescriptor<"desktop.browser.open_connection", z$1.ZodObject<{
        generation: z$1.ZodString;
        instanceId: z$1.ZodString;
        leaseId: z$1.ZodString;
        tabIds: z$1.ZodArray<z$1.ZodString>;
        threadId: z$1.ZodString;
        type: z$1.ZodLiteral<"desktop.browser.open_connection">;
    }, z$1.core.$strict>, z$1.ZodObject<{
        expiresAt: z$1.ZodNumber;
        wsEndpoint: z$1.ZodString;
    }, z$1.core.$strip>, "onlineRpc", false>;
    "desktop.browser.release_control": HostDaemonCommandDescriptor<"desktop.browser.release_control", z$1.ZodObject<{
        generation: z$1.ZodString;
        instanceId: z$1.ZodString;
        leaseId: z$1.ZodString;
        threadId: z$1.ZodString;
        type: z$1.ZodLiteral<"desktop.browser.release_control">;
    }, z$1.core.$strict>, z$1.ZodObject<{
        ok: z$1.ZodLiteral<true>;
    }, z$1.core.$strip>, "onlineRpc", false>;
    "desktop.browser.list_import_sources": HostDaemonCommandDescriptor<"desktop.browser.list_import_sources", z$1.ZodObject<{
        generation: z$1.ZodString;
        instanceId: z$1.ZodString;
        type: z$1.ZodLiteral<"desktop.browser.list_import_sources">;
    }, z$1.core.$strict>, z$1.ZodObject<{
        sources: z$1.ZodArray<z$1.ZodObject<{
            icon: z$1.ZodOptional<z$1.ZodString>;
            id: z$1.ZodEnum<{
                arc: "arc";
                brave: "brave";
                chrome: "chrome";
                chromium: "chromium";
                edge: "edge";
                firefox: "firefox";
                helium: "helium";
                opera: "opera";
                safari: "safari";
                vivaldi: "vivaldi";
            }>;
            name: z$1.ZodString;
            profiles: z$1.ZodArray<z$1.ZodObject<{
                cookieCount: z$1.ZodOptional<z$1.ZodNumber>;
                directory: z$1.ZodString;
                name: z$1.ZodString;
            }, z$1.core.$strict>>;
            unavailable: z$1.ZodOptional<z$1.ZodEnum<{
                browserRunning: "browserRunning";
                keychainItemMissing: "keychainItemMissing";
                needsFullDiskAccess: "needsFullDiskAccess";
                needsKeychainApproval: "needsKeychainApproval";
                notInstalled: "notInstalled";
                unsupportedPlatform: "unsupportedPlatform";
            }>>;
        }, z$1.core.$strict>>;
    }, z$1.core.$strip>, "onlineRpc", false>;
    "desktop.browser.import_cookies": HostDaemonCommandDescriptor<"desktop.browser.import_cookies", z$1.ZodObject<{
        generation: z$1.ZodString;
        instanceId: z$1.ZodString;
        profile: z$1.ZodDiscriminatedUnion<[z$1.ZodObject<{
            id: z$1.ZodString;
            kind: z$1.ZodLiteral<"automation">;
        }, z$1.core.$strip>, z$1.ZodObject<{
            kind: z$1.ZodLiteral<"personal">;
        }, z$1.core.$strip>], "kind">;
        sourceId: z$1.ZodEnum<{
            arc: "arc";
            brave: "brave";
            chrome: "chrome";
            chromium: "chromium";
            edge: "edge";
            firefox: "firefox";
            helium: "helium";
            opera: "opera";
            safari: "safari";
            vivaldi: "vivaldi";
        }>;
        sourceProfileDirectory: z$1.ZodString;
        type: z$1.ZodLiteral<"desktop.browser.import_cookies">;
    }, z$1.core.$strict>, z$1.ZodDiscriminatedUnion<[z$1.ZodObject<{
        imported: z$1.ZodNumber;
        ok: z$1.ZodLiteral<true>;
        skipped: z$1.ZodNumber;
        skippedDomains: z$1.ZodArray<z$1.ZodString>;
    }, z$1.core.$strict>, z$1.ZodObject<{
        ok: z$1.ZodLiteral<false>;
        reason: z$1.ZodEnum<{
            browserRunning: "browserRunning";
            keychainItemMissing: "keychainItemMissing";
            keychainUnavailable: "keychainUnavailable";
            needsFullDiskAccess: "needsFullDiskAccess";
            needsKeychainApproval: "needsKeychainApproval";
            notInstalled: "notInstalled";
            readFailed: "readFailed";
            unknownSource: "unknownSource";
            unknownSourceProfile: "unknownSourceProfile";
            unsupportedPlatform: "unsupportedPlatform";
        }>;
    }, z$1.core.$strict>], "ok">, "onlineRpc", false>;
    "thread.rewind.discard": HostDaemonCommandDescriptor<"thread.rewind.discard", z$1.ZodObject<{
        environmentId: z$1.ZodString;
        leaseId: z$1.ZodString;
        threadId: z$1.ZodString;
        type: z$1.ZodLiteral<"thread.rewind.discard">;
    }, z$1.core.$strict>, z$1.ZodObject<{}, z$1.core.$strip>, "settled", false>;
    "thread.rewind.prepare": HostDaemonCommandDescriptor<"thread.rewind.prepare", z$1.ZodObject<{
        bridgeLaunch: z$1.ZodObject<{
            capabilities: z$1.ZodObject<{
                fork: z$1.ZodEnum<{
                    checkpoint: "checkpoint";
                    none: "none";
                    tip: "tip";
                }>;
                permissionModes: z$1.ZodArray<z$1.ZodEnum<{
                    "accept-edits": "accept-edits";
                    auto: "auto";
                    full: "full";
                }>>;
                providerInstallation: z$1.ZodBoolean;
                supportsServiceTier: z$1.ZodBoolean;
                supportsThreadArchive: z$1.ZodBoolean;
                supportsThreadRename: z$1.ZodBoolean;
            }, z$1.core.$strict>;
            envPassthrough: z$1.ZodArray<z$1.ZodString>;
            pluginId: z$1.ZodString;
            providerOptions: z$1.ZodType<JsonObject, unknown, z$1.core.$ZodTypeInternals<JsonObject, unknown>>;
            source: z$1.ZodObject<{
                byteLength: z$1.ZodNumber;
                digest: z$1.ZodString;
                kind: z$1.ZodLiteral<"artifact">;
            }, z$1.core.$strict>;
        }, z$1.core.$strict>;
        contributedEnv: z$1.ZodDefault<z$1.ZodArray<z$1.ZodObject<{
            name: z$1.ZodString;
            reason: z$1.ZodString;
            source: z$1.ZodUnion<readonly [z$1.ZodObject<{
                plugin: z$1.ZodString;
            }, z$1.core.$strict>, z$1.ZodObject<{
                core: z$1.ZodEnum<{
                    "machine-environment": "machine-environment";
                    "machine-git": "machine-git";
                    "project-environment": "project-environment";
                }>;
            }, z$1.core.$strict>]>;
            value: z$1.ZodUnion<readonly [z$1.ZodString, z$1.ZodObject<{
                serverPath: z$1.ZodString;
            }, z$1.core.$strict>]>;
        }, z$1.core.$strict>>>;
        disallowedTools: z$1.ZodOptional<z$1.ZodArray<z$1.ZodString>>;
        dynamicTools: z$1.ZodArray<z$1.ZodObject<{
            description: z$1.ZodString;
            inputSchema: z$1.ZodUnknown;
            name: z$1.ZodString;
            presentation: z$1.ZodOptional<z$1.ZodObject<{
                badge: z$1.ZodOptional<z$1.ZodObject<{
                    glyph: z$1.ZodString;
                    hint: z$1.ZodString;
                    label: z$1.ZodString;
                    tone: z$1.ZodEnum<{
                        destructive: "destructive";
                        neutral: "neutral";
                    }>;
                }, z$1.core.$strip>>;
                detail: z$1.ZodOptional<z$1.ZodString>;
                icon: z$1.ZodObject<{
                    glyph: z$1.ZodString;
                }, z$1.core.$strip>;
                label: z$1.ZodObject<{
                    completed: z$1.ZodString;
                    pending: z$1.ZodString;
                }, z$1.core.$strip>;
                suppress: z$1.ZodOptional<z$1.ZodBoolean>;
                tint: z$1.ZodOptional<z$1.ZodObject<{
                    dark: z$1.ZodString;
                    light: z$1.ZodString;
                }, z$1.core.$strip>>;
                title: z$1.ZodOptional<z$1.ZodString>;
            }, z$1.core.$strip>>;
        }, z$1.core.$strip>>;
        environmentId: z$1.ZodString;
        injectedSkillSources: z$1.ZodArray<z$1.ZodDiscriminatedUnion<[z$1.ZodObject<{
            description: z$1.ZodString;
            entryPath: z$1.ZodString;
            kind: z$1.ZodLiteral<"tree">;
            name: z$1.ZodString;
            sourceType: z$1.ZodEnum<{
                "data-dir": "data-dir";
                builtin: "builtin";
            }>;
            treeHash: z$1.ZodString;
        }, z$1.core.$strict>, z$1.ZodObject<{
            description: z$1.ZodString;
            kind: z$1.ZodLiteral<"workspace-path">;
            name: z$1.ZodString;
            skillFilePath: z$1.ZodString;
            sourceRootPath: z$1.ZodString;
            sourceType: z$1.ZodLiteral<"project">;
        }, z$1.core.$strict>, z$1.ZodObject<{
            description: z$1.ZodString;
            kind: z$1.ZodLiteral<"host-path">;
            name: z$1.ZodString;
            skillFilePath: z$1.ZodString;
            sourceRootPath: z$1.ZodString;
            sourceType: z$1.ZodEnum<{
                "shared-project": "shared-project";
                "shared-user": "shared-user";
            }>;
        }, z$1.core.$strict>], "kind">>;
        instructionMode: z$1.ZodEnum<{
            append: "append";
            replace: "replace";
        }>;
        instructions: z$1.ZodString;
        leaseId: z$1.ZodString;
        options: z$1.ZodIntersection<z$1.ZodObject<{
            model: z$1.ZodString;
            promptMode: z$1.ZodOptional<z$1.ZodLiteral<"plan">>;
            providerOptions: z$1.ZodType<JsonObject, unknown, z$1.core.$ZodTypeInternals<JsonObject, unknown>>;
            reasoningLevel: z$1.ZodEnum<{
                high: "high";
                low: "low";
                max: "max";
                medium: "medium";
                none: "none";
                ultra: "ultra";
                ultracode: "ultracode";
                xhigh: "xhigh";
            }>;
            serviceTier: z$1.ZodEnum<{
                default: "default";
                fast: "fast";
            }>;
        }, z$1.core.$strip>, z$1.ZodDiscriminatedUnion<[z$1.ZodObject<{
            approvalReviewer: z$1.ZodLiteral<"user">;
            permissionEscalation: z$1.ZodEnum<{
                ask: "ask";
                deny: "deny";
            }>;
            permissionMode: z$1.ZodLiteral<"accept-edits">;
            permissionScope: z$1.ZodLiteral<"workspace">;
        }, z$1.core.$strip>, z$1.ZodObject<{
            approvalReviewer: z$1.ZodLiteral<"automatic">;
            permissionEscalation: z$1.ZodEnum<{
                ask: "ask";
                deny: "deny";
            }>;
            permissionMode: z$1.ZodLiteral<"auto">;
            permissionScope: z$1.ZodLiteral<"workspace">;
        }, z$1.core.$strip>, z$1.ZodObject<{
            approvalReviewer: z$1.ZodNull;
            permissionEscalation: z$1.ZodNull;
            permissionMode: z$1.ZodLiteral<"full">;
            permissionScope: z$1.ZodLiteral<"full">;
        }, z$1.core.$strip>], "permissionMode">>;
        projectId: z$1.ZodString;
        providerId: z$1.ZodString;
        retainThroughProviderCheckpoint: z$1.ZodString;
        sourceProviderThreadId: z$1.ZodString;
        threadId: z$1.ZodString;
        type: z$1.ZodLiteral<"thread.rewind.prepare">;
        workspaceContext: z$1.ZodObject<{
            workspacePath: z$1.ZodString;
        }, z$1.core.$strip>;
    }, z$1.core.$strict>, z$1.ZodObject<{
        providerThreadId: z$1.ZodString;
    }, z$1.core.$strip>, "settled", false>;
    "thread.start": HostDaemonCommandDescriptor<"thread.start", z$1.ZodObject<{
        bridgeLaunch: z$1.ZodObject<{
            capabilities: z$1.ZodObject<{
                fork: z$1.ZodEnum<{
                    checkpoint: "checkpoint";
                    none: "none";
                    tip: "tip";
                }>;
                permissionModes: z$1.ZodArray<z$1.ZodEnum<{
                    "accept-edits": "accept-edits";
                    auto: "auto";
                    full: "full";
                }>>;
                providerInstallation: z$1.ZodBoolean;
                supportsServiceTier: z$1.ZodBoolean;
                supportsThreadArchive: z$1.ZodBoolean;
                supportsThreadRename: z$1.ZodBoolean;
            }, z$1.core.$strict>;
            envPassthrough: z$1.ZodArray<z$1.ZodString>;
            pluginId: z$1.ZodString;
            providerOptions: z$1.ZodType<JsonObject, unknown, z$1.core.$ZodTypeInternals<JsonObject, unknown>>;
            source: z$1.ZodObject<{
                byteLength: z$1.ZodNumber;
                digest: z$1.ZodString;
                kind: z$1.ZodLiteral<"artifact">;
            }, z$1.core.$strict>;
        }, z$1.core.$strict>;
        contributedEnv: z$1.ZodDefault<z$1.ZodArray<z$1.ZodObject<{
            name: z$1.ZodString;
            reason: z$1.ZodString;
            source: z$1.ZodUnion<readonly [z$1.ZodObject<{
                plugin: z$1.ZodString;
            }, z$1.core.$strict>, z$1.ZodObject<{
                core: z$1.ZodEnum<{
                    "machine-environment": "machine-environment";
                    "machine-git": "machine-git";
                    "project-environment": "project-environment";
                }>;
            }, z$1.core.$strict>]>;
            value: z$1.ZodUnion<readonly [z$1.ZodString, z$1.ZodObject<{
                serverPath: z$1.ZodString;
            }, z$1.core.$strict>]>;
        }, z$1.core.$strict>>>;
        disallowedTools: z$1.ZodOptional<z$1.ZodArray<z$1.ZodString>>;
        dynamicTools: z$1.ZodArray<z$1.ZodObject<{
            description: z$1.ZodString;
            inputSchema: z$1.ZodUnknown;
            name: z$1.ZodString;
            presentation: z$1.ZodOptional<z$1.ZodObject<{
                badge: z$1.ZodOptional<z$1.ZodObject<{
                    glyph: z$1.ZodString;
                    hint: z$1.ZodString;
                    label: z$1.ZodString;
                    tone: z$1.ZodEnum<{
                        destructive: "destructive";
                        neutral: "neutral";
                    }>;
                }, z$1.core.$strip>>;
                detail: z$1.ZodOptional<z$1.ZodString>;
                icon: z$1.ZodObject<{
                    glyph: z$1.ZodString;
                }, z$1.core.$strip>;
                label: z$1.ZodObject<{
                    completed: z$1.ZodString;
                    pending: z$1.ZodString;
                }, z$1.core.$strip>;
                suppress: z$1.ZodOptional<z$1.ZodBoolean>;
                tint: z$1.ZodOptional<z$1.ZodObject<{
                    dark: z$1.ZodString;
                    light: z$1.ZodString;
                }, z$1.core.$strip>>;
                title: z$1.ZodOptional<z$1.ZodString>;
            }, z$1.core.$strip>>;
        }, z$1.core.$strip>>;
        environmentId: z$1.ZodString;
        fork: z$1.ZodOptional<z$1.ZodObject<{
            sourceProviderCheckpointId: z$1.ZodOptional<z$1.ZodString>;
            sourceProviderThreadId: z$1.ZodString;
        }, z$1.core.$strip>>;
        injectedSkillSources: z$1.ZodArray<z$1.ZodDiscriminatedUnion<[z$1.ZodObject<{
            description: z$1.ZodString;
            entryPath: z$1.ZodString;
            kind: z$1.ZodLiteral<"tree">;
            name: z$1.ZodString;
            sourceType: z$1.ZodEnum<{
                "data-dir": "data-dir";
                builtin: "builtin";
            }>;
            treeHash: z$1.ZodString;
        }, z$1.core.$strict>, z$1.ZodObject<{
            description: z$1.ZodString;
            kind: z$1.ZodLiteral<"workspace-path">;
            name: z$1.ZodString;
            skillFilePath: z$1.ZodString;
            sourceRootPath: z$1.ZodString;
            sourceType: z$1.ZodLiteral<"project">;
        }, z$1.core.$strict>, z$1.ZodObject<{
            description: z$1.ZodString;
            kind: z$1.ZodLiteral<"host-path">;
            name: z$1.ZodString;
            skillFilePath: z$1.ZodString;
            sourceRootPath: z$1.ZodString;
            sourceType: z$1.ZodEnum<{
                "shared-project": "shared-project";
                "shared-user": "shared-user";
            }>;
        }, z$1.core.$strict>], "kind">>;
        input: z$1.ZodArray<z$1.ZodDiscriminatedUnion<[z$1.ZodObject<{
            mentions: z$1.ZodDefault<z$1.ZodArray<z$1.ZodObject<{
                end: z$1.ZodNumber;
                resource: z$1.ZodPipe<z$1.ZodTransform<unknown, unknown>, z$1.ZodDiscriminatedUnion<[z$1.ZodObject<{
                    kind: z$1.ZodLiteral<"thread">;
                    label: z$1.ZodString;
                    projectId: z$1.ZodOptional<z$1.ZodString>;
                    threadId: z$1.ZodString;
                }, z$1.core.$strip>, z$1.ZodObject<{
                    kind: z$1.ZodLiteral<"project">;
                    label: z$1.ZodString;
                    projectId: z$1.ZodString;
                }, z$1.core.$strip>, z$1.ZodObject<{
                    kind: z$1.ZodLiteral<"section">;
                    label: z$1.ZodString;
                    sectionId: z$1.ZodString;
                }, z$1.core.$strip>, z$1.ZodObject<{
                    entryKind: z$1.ZodEnum<{
                        directory: "directory";
                        file: "file";
                    }>;
                    kind: z$1.ZodLiteral<"path">;
                    label: z$1.ZodString;
                    path: z$1.ZodString;
                    source: z$1.ZodEnum<{
                        "thread-storage": "thread-storage";
                        workspace: "workspace";
                    }>;
                }, z$1.core.$strip>, z$1.ZodObject<{
                    argumentHint: z$1.ZodNullable<z$1.ZodString>;
                    kind: z$1.ZodLiteral<"command">;
                    label: z$1.ZodString;
                    name: z$1.ZodString;
                    origin: z$1.ZodEnum<{
                        builtin: "builtin";
                        project: "project";
                        user: "user";
                    }>;
                    source: z$1.ZodEnum<{
                        command: "command";
                        skill: "skill";
                    }>;
                    trigger: z$1.ZodEnum<{
                        "/": "/";
                        $: "$";
                    }>;
                }, z$1.core.$strip>, z$1.ZodObject<{
                    icon: z$1.ZodOptional<z$1.ZodNullable<z$1.ZodString>>;
                    itemId: z$1.ZodString;
                    kind: z$1.ZodLiteral<"plugin">;
                    label: z$1.ZodString;
                    pluginId: z$1.ZodString;
                }, z$1.core.$strip>], "kind">>;
                start: z$1.ZodNumber;
            }, z$1.core.$strip>>>;
            text: z$1.ZodString;
            type: z$1.ZodLiteral<"text">;
            visibility: z$1.ZodOptional<z$1.ZodEnum<{
                "agent-only": "agent-only";
            }>>;
        }, z$1.core.$strip>, z$1.ZodObject<{
            type: z$1.ZodLiteral<"image">;
            url: z$1.ZodString;
            visibility: z$1.ZodOptional<z$1.ZodEnum<{
                "agent-only": "agent-only";
            }>>;
        }, z$1.core.$strip>, z$1.ZodObject<{
            path: z$1.ZodString;
            type: z$1.ZodLiteral<"localImage">;
            visibility: z$1.ZodOptional<z$1.ZodEnum<{
                "agent-only": "agent-only";
            }>>;
        }, z$1.core.$strip>, z$1.ZodObject<{
            mimeType: z$1.ZodOptional<z$1.ZodString>;
            name: z$1.ZodOptional<z$1.ZodString>;
            path: z$1.ZodString;
            sizeBytes: z$1.ZodOptional<z$1.ZodNumber>;
            type: z$1.ZodLiteral<"localFile">;
            visibility: z$1.ZodOptional<z$1.ZodEnum<{
                "agent-only": "agent-only";
            }>>;
        }, z$1.core.$strip>], "type">>;
        inputGroups: z$1.ZodOptional<z$1.ZodArray<z$1.ZodArray<z$1.ZodDiscriminatedUnion<[z$1.ZodObject<{
            mentions: z$1.ZodDefault<z$1.ZodArray<z$1.ZodObject<{
                end: z$1.ZodNumber;
                resource: z$1.ZodPipe<z$1.ZodTransform<unknown, unknown>, z$1.ZodDiscriminatedUnion<[z$1.ZodObject<{
                    kind: z$1.ZodLiteral<"thread">;
                    label: z$1.ZodString;
                    projectId: z$1.ZodOptional<z$1.ZodString>;
                    threadId: z$1.ZodString;
                }, z$1.core.$strip>, z$1.ZodObject<{
                    kind: z$1.ZodLiteral<"project">;
                    label: z$1.ZodString;
                    projectId: z$1.ZodString;
                }, z$1.core.$strip>, z$1.ZodObject<{
                    kind: z$1.ZodLiteral<"section">;
                    label: z$1.ZodString;
                    sectionId: z$1.ZodString;
                }, z$1.core.$strip>, z$1.ZodObject<{
                    entryKind: z$1.ZodEnum<{
                        directory: "directory";
                        file: "file";
                    }>;
                    kind: z$1.ZodLiteral<"path">;
                    label: z$1.ZodString;
                    path: z$1.ZodString;
                    source: z$1.ZodEnum<{
                        "thread-storage": "thread-storage";
                        workspace: "workspace";
                    }>;
                }, z$1.core.$strip>, z$1.ZodObject<{
                    argumentHint: z$1.ZodNullable<z$1.ZodString>;
                    kind: z$1.ZodLiteral<"command">;
                    label: z$1.ZodString;
                    name: z$1.ZodString;
                    origin: z$1.ZodEnum<{
                        builtin: "builtin";
                        project: "project";
                        user: "user";
                    }>;
                    source: z$1.ZodEnum<{
                        command: "command";
                        skill: "skill";
                    }>;
                    trigger: z$1.ZodEnum<{
                        "/": "/";
                        $: "$";
                    }>;
                }, z$1.core.$strip>, z$1.ZodObject<{
                    icon: z$1.ZodOptional<z$1.ZodNullable<z$1.ZodString>>;
                    itemId: z$1.ZodString;
                    kind: z$1.ZodLiteral<"plugin">;
                    label: z$1.ZodString;
                    pluginId: z$1.ZodString;
                }, z$1.core.$strip>], "kind">>;
                start: z$1.ZodNumber;
            }, z$1.core.$strip>>>;
            text: z$1.ZodString;
            type: z$1.ZodLiteral<"text">;
            visibility: z$1.ZodOptional<z$1.ZodEnum<{
                "agent-only": "agent-only";
            }>>;
        }, z$1.core.$strip>, z$1.ZodObject<{
            type: z$1.ZodLiteral<"image">;
            url: z$1.ZodString;
            visibility: z$1.ZodOptional<z$1.ZodEnum<{
                "agent-only": "agent-only";
            }>>;
        }, z$1.core.$strip>, z$1.ZodObject<{
            path: z$1.ZodString;
            type: z$1.ZodLiteral<"localImage">;
            visibility: z$1.ZodOptional<z$1.ZodEnum<{
                "agent-only": "agent-only";
            }>>;
        }, z$1.core.$strip>, z$1.ZodObject<{
            mimeType: z$1.ZodOptional<z$1.ZodString>;
            name: z$1.ZodOptional<z$1.ZodString>;
            path: z$1.ZodString;
            sizeBytes: z$1.ZodOptional<z$1.ZodNumber>;
            type: z$1.ZodLiteral<"localFile">;
            visibility: z$1.ZodOptional<z$1.ZodEnum<{
                "agent-only": "agent-only";
            }>>;
        }, z$1.core.$strip>], "type">>>>;
        instructionMode: z$1.ZodEnum<{
            append: "append";
            replace: "replace";
        }>;
        instructions: z$1.ZodString;
        options: z$1.ZodIntersection<z$1.ZodObject<{
            model: z$1.ZodString;
            promptMode: z$1.ZodOptional<z$1.ZodLiteral<"plan">>;
            providerOptions: z$1.ZodType<JsonObject, unknown, z$1.core.$ZodTypeInternals<JsonObject, unknown>>;
            reasoningLevel: z$1.ZodEnum<{
                high: "high";
                low: "low";
                max: "max";
                medium: "medium";
                none: "none";
                ultra: "ultra";
                ultracode: "ultracode";
                xhigh: "xhigh";
            }>;
            serviceTier: z$1.ZodEnum<{
                default: "default";
                fast: "fast";
            }>;
        }, z$1.core.$strip>, z$1.ZodDiscriminatedUnion<[z$1.ZodObject<{
            approvalReviewer: z$1.ZodLiteral<"user">;
            permissionEscalation: z$1.ZodEnum<{
                ask: "ask";
                deny: "deny";
            }>;
            permissionMode: z$1.ZodLiteral<"accept-edits">;
            permissionScope: z$1.ZodLiteral<"workspace">;
        }, z$1.core.$strip>, z$1.ZodObject<{
            approvalReviewer: z$1.ZodLiteral<"automatic">;
            permissionEscalation: z$1.ZodEnum<{
                ask: "ask";
                deny: "deny";
            }>;
            permissionMode: z$1.ZodLiteral<"auto">;
            permissionScope: z$1.ZodLiteral<"workspace">;
        }, z$1.core.$strip>, z$1.ZodObject<{
            approvalReviewer: z$1.ZodNull;
            permissionEscalation: z$1.ZodNull;
            permissionMode: z$1.ZodLiteral<"full">;
            permissionScope: z$1.ZodLiteral<"full">;
        }, z$1.core.$strip>], "permissionMode">>;
        projectId: z$1.ZodString;
        providerId: z$1.ZodString;
        requestId: z$1.ZodString;
        threadId: z$1.ZodString;
        threadStoragePath: z$1.ZodOptional<z$1.ZodString>;
        type: z$1.ZodLiteral<"thread.start">;
        workspaceContext: z$1.ZodObject<{
            workspacePath: z$1.ZodString;
        }, z$1.core.$strip>;
    }, z$1.core.$strict>, z$1.ZodObject<{
        providerThreadId: z$1.ZodString;
    }, z$1.core.$strip>, "settled", false>;
    "turn.submit": HostDaemonCommandDescriptor<"turn.submit", z$1.ZodObject<{
        bridgeLaunch: z$1.ZodObject<{
            capabilities: z$1.ZodObject<{
                fork: z$1.ZodEnum<{
                    checkpoint: "checkpoint";
                    none: "none";
                    tip: "tip";
                }>;
                permissionModes: z$1.ZodArray<z$1.ZodEnum<{
                    "accept-edits": "accept-edits";
                    auto: "auto";
                    full: "full";
                }>>;
                providerInstallation: z$1.ZodBoolean;
                supportsServiceTier: z$1.ZodBoolean;
                supportsThreadArchive: z$1.ZodBoolean;
                supportsThreadRename: z$1.ZodBoolean;
            }, z$1.core.$strict>;
            envPassthrough: z$1.ZodArray<z$1.ZodString>;
            pluginId: z$1.ZodString;
            providerOptions: z$1.ZodType<JsonObject, unknown, z$1.core.$ZodTypeInternals<JsonObject, unknown>>;
            source: z$1.ZodObject<{
                byteLength: z$1.ZodNumber;
                digest: z$1.ZodString;
                kind: z$1.ZodLiteral<"artifact">;
            }, z$1.core.$strict>;
        }, z$1.core.$strict>;
        environmentId: z$1.ZodString;
        input: z$1.ZodArray<z$1.ZodDiscriminatedUnion<[z$1.ZodObject<{
            mentions: z$1.ZodDefault<z$1.ZodArray<z$1.ZodObject<{
                end: z$1.ZodNumber;
                resource: z$1.ZodPipe<z$1.ZodTransform<unknown, unknown>, z$1.ZodDiscriminatedUnion<[z$1.ZodObject<{
                    kind: z$1.ZodLiteral<"thread">;
                    label: z$1.ZodString;
                    projectId: z$1.ZodOptional<z$1.ZodString>;
                    threadId: z$1.ZodString;
                }, z$1.core.$strip>, z$1.ZodObject<{
                    kind: z$1.ZodLiteral<"project">;
                    label: z$1.ZodString;
                    projectId: z$1.ZodString;
                }, z$1.core.$strip>, z$1.ZodObject<{
                    kind: z$1.ZodLiteral<"section">;
                    label: z$1.ZodString;
                    sectionId: z$1.ZodString;
                }, z$1.core.$strip>, z$1.ZodObject<{
                    entryKind: z$1.ZodEnum<{
                        directory: "directory";
                        file: "file";
                    }>;
                    kind: z$1.ZodLiteral<"path">;
                    label: z$1.ZodString;
                    path: z$1.ZodString;
                    source: z$1.ZodEnum<{
                        "thread-storage": "thread-storage";
                        workspace: "workspace";
                    }>;
                }, z$1.core.$strip>, z$1.ZodObject<{
                    argumentHint: z$1.ZodNullable<z$1.ZodString>;
                    kind: z$1.ZodLiteral<"command">;
                    label: z$1.ZodString;
                    name: z$1.ZodString;
                    origin: z$1.ZodEnum<{
                        builtin: "builtin";
                        project: "project";
                        user: "user";
                    }>;
                    source: z$1.ZodEnum<{
                        command: "command";
                        skill: "skill";
                    }>;
                    trigger: z$1.ZodEnum<{
                        "/": "/";
                        $: "$";
                    }>;
                }, z$1.core.$strip>, z$1.ZodObject<{
                    icon: z$1.ZodOptional<z$1.ZodNullable<z$1.ZodString>>;
                    itemId: z$1.ZodString;
                    kind: z$1.ZodLiteral<"plugin">;
                    label: z$1.ZodString;
                    pluginId: z$1.ZodString;
                }, z$1.core.$strip>], "kind">>;
                start: z$1.ZodNumber;
            }, z$1.core.$strip>>>;
            text: z$1.ZodString;
            type: z$1.ZodLiteral<"text">;
            visibility: z$1.ZodOptional<z$1.ZodEnum<{
                "agent-only": "agent-only";
            }>>;
        }, z$1.core.$strip>, z$1.ZodObject<{
            type: z$1.ZodLiteral<"image">;
            url: z$1.ZodString;
            visibility: z$1.ZodOptional<z$1.ZodEnum<{
                "agent-only": "agent-only";
            }>>;
        }, z$1.core.$strip>, z$1.ZodObject<{
            path: z$1.ZodString;
            type: z$1.ZodLiteral<"localImage">;
            visibility: z$1.ZodOptional<z$1.ZodEnum<{
                "agent-only": "agent-only";
            }>>;
        }, z$1.core.$strip>, z$1.ZodObject<{
            mimeType: z$1.ZodOptional<z$1.ZodString>;
            name: z$1.ZodOptional<z$1.ZodString>;
            path: z$1.ZodString;
            sizeBytes: z$1.ZodOptional<z$1.ZodNumber>;
            type: z$1.ZodLiteral<"localFile">;
            visibility: z$1.ZodOptional<z$1.ZodEnum<{
                "agent-only": "agent-only";
            }>>;
        }, z$1.core.$strip>], "type">>;
        inputGroups: z$1.ZodOptional<z$1.ZodArray<z$1.ZodArray<z$1.ZodDiscriminatedUnion<[z$1.ZodObject<{
            mentions: z$1.ZodDefault<z$1.ZodArray<z$1.ZodObject<{
                end: z$1.ZodNumber;
                resource: z$1.ZodPipe<z$1.ZodTransform<unknown, unknown>, z$1.ZodDiscriminatedUnion<[z$1.ZodObject<{
                    kind: z$1.ZodLiteral<"thread">;
                    label: z$1.ZodString;
                    projectId: z$1.ZodOptional<z$1.ZodString>;
                    threadId: z$1.ZodString;
                }, z$1.core.$strip>, z$1.ZodObject<{
                    kind: z$1.ZodLiteral<"project">;
                    label: z$1.ZodString;
                    projectId: z$1.ZodString;
                }, z$1.core.$strip>, z$1.ZodObject<{
                    kind: z$1.ZodLiteral<"section">;
                    label: z$1.ZodString;
                    sectionId: z$1.ZodString;
                }, z$1.core.$strip>, z$1.ZodObject<{
                    entryKind: z$1.ZodEnum<{
                        directory: "directory";
                        file: "file";
                    }>;
                    kind: z$1.ZodLiteral<"path">;
                    label: z$1.ZodString;
                    path: z$1.ZodString;
                    source: z$1.ZodEnum<{
                        "thread-storage": "thread-storage";
                        workspace: "workspace";
                    }>;
                }, z$1.core.$strip>, z$1.ZodObject<{
                    argumentHint: z$1.ZodNullable<z$1.ZodString>;
                    kind: z$1.ZodLiteral<"command">;
                    label: z$1.ZodString;
                    name: z$1.ZodString;
                    origin: z$1.ZodEnum<{
                        builtin: "builtin";
                        project: "project";
                        user: "user";
                    }>;
                    source: z$1.ZodEnum<{
                        command: "command";
                        skill: "skill";
                    }>;
                    trigger: z$1.ZodEnum<{
                        "/": "/";
                        $: "$";
                    }>;
                }, z$1.core.$strip>, z$1.ZodObject<{
                    icon: z$1.ZodOptional<z$1.ZodNullable<z$1.ZodString>>;
                    itemId: z$1.ZodString;
                    kind: z$1.ZodLiteral<"plugin">;
                    label: z$1.ZodString;
                    pluginId: z$1.ZodString;
                }, z$1.core.$strip>], "kind">>;
                start: z$1.ZodNumber;
            }, z$1.core.$strip>>>;
            text: z$1.ZodString;
            type: z$1.ZodLiteral<"text">;
            visibility: z$1.ZodOptional<z$1.ZodEnum<{
                "agent-only": "agent-only";
            }>>;
        }, z$1.core.$strip>, z$1.ZodObject<{
            type: z$1.ZodLiteral<"image">;
            url: z$1.ZodString;
            visibility: z$1.ZodOptional<z$1.ZodEnum<{
                "agent-only": "agent-only";
            }>>;
        }, z$1.core.$strip>, z$1.ZodObject<{
            path: z$1.ZodString;
            type: z$1.ZodLiteral<"localImage">;
            visibility: z$1.ZodOptional<z$1.ZodEnum<{
                "agent-only": "agent-only";
            }>>;
        }, z$1.core.$strip>, z$1.ZodObject<{
            mimeType: z$1.ZodOptional<z$1.ZodString>;
            name: z$1.ZodOptional<z$1.ZodString>;
            path: z$1.ZodString;
            sizeBytes: z$1.ZodOptional<z$1.ZodNumber>;
            type: z$1.ZodLiteral<"localFile">;
            visibility: z$1.ZodOptional<z$1.ZodEnum<{
                "agent-only": "agent-only";
            }>>;
        }, z$1.core.$strip>], "type">>>>;
        options: z$1.ZodIntersection<z$1.ZodObject<{
            model: z$1.ZodString;
            promptMode: z$1.ZodOptional<z$1.ZodLiteral<"plan">>;
            providerOptions: z$1.ZodType<JsonObject, unknown, z$1.core.$ZodTypeInternals<JsonObject, unknown>>;
            reasoningLevel: z$1.ZodEnum<{
                high: "high";
                low: "low";
                max: "max";
                medium: "medium";
                none: "none";
                ultra: "ultra";
                ultracode: "ultracode";
                xhigh: "xhigh";
            }>;
            serviceTier: z$1.ZodEnum<{
                default: "default";
                fast: "fast";
            }>;
        }, z$1.core.$strip>, z$1.ZodDiscriminatedUnion<[z$1.ZodObject<{
            approvalReviewer: z$1.ZodLiteral<"user">;
            permissionEscalation: z$1.ZodEnum<{
                ask: "ask";
                deny: "deny";
            }>;
            permissionMode: z$1.ZodLiteral<"accept-edits">;
            permissionScope: z$1.ZodLiteral<"workspace">;
        }, z$1.core.$strip>, z$1.ZodObject<{
            approvalReviewer: z$1.ZodLiteral<"automatic">;
            permissionEscalation: z$1.ZodEnum<{
                ask: "ask";
                deny: "deny";
            }>;
            permissionMode: z$1.ZodLiteral<"auto">;
            permissionScope: z$1.ZodLiteral<"workspace">;
        }, z$1.core.$strip>, z$1.ZodObject<{
            approvalReviewer: z$1.ZodNull;
            permissionEscalation: z$1.ZodNull;
            permissionMode: z$1.ZodLiteral<"full">;
            permissionScope: z$1.ZodLiteral<"full">;
        }, z$1.core.$strip>], "permissionMode">>;
        requestId: z$1.ZodString;
        resumeContext: z$1.ZodObject<{
            bridgeLaunch: z$1.ZodObject<{
                capabilities: z$1.ZodObject<{
                    fork: z$1.ZodEnum<{
                        checkpoint: "checkpoint";
                        none: "none";
                        tip: "tip";
                    }>;
                    permissionModes: z$1.ZodArray<z$1.ZodEnum<{
                        "accept-edits": "accept-edits";
                        auto: "auto";
                        full: "full";
                    }>>;
                    providerInstallation: z$1.ZodBoolean;
                    supportsServiceTier: z$1.ZodBoolean;
                    supportsThreadArchive: z$1.ZodBoolean;
                    supportsThreadRename: z$1.ZodBoolean;
                }, z$1.core.$strict>;
                envPassthrough: z$1.ZodArray<z$1.ZodString>;
                pluginId: z$1.ZodString;
                providerOptions: z$1.ZodType<JsonObject, unknown, z$1.core.$ZodTypeInternals<JsonObject, unknown>>;
                source: z$1.ZodObject<{
                    byteLength: z$1.ZodNumber;
                    digest: z$1.ZodString;
                    kind: z$1.ZodLiteral<"artifact">;
                }, z$1.core.$strict>;
            }, z$1.core.$strict>;
            contributedEnv: z$1.ZodDefault<z$1.ZodArray<z$1.ZodObject<{
                name: z$1.ZodString;
                reason: z$1.ZodString;
                source: z$1.ZodUnion<readonly [z$1.ZodObject<{
                    plugin: z$1.ZodString;
                }, z$1.core.$strict>, z$1.ZodObject<{
                    core: z$1.ZodEnum<{
                        "machine-environment": "machine-environment";
                        "machine-git": "machine-git";
                        "project-environment": "project-environment";
                    }>;
                }, z$1.core.$strict>]>;
                value: z$1.ZodUnion<readonly [z$1.ZodString, z$1.ZodObject<{
                    serverPath: z$1.ZodString;
                }, z$1.core.$strict>]>;
            }, z$1.core.$strict>>>;
            disallowedTools: z$1.ZodOptional<z$1.ZodArray<z$1.ZodString>>;
            dynamicTools: z$1.ZodArray<z$1.ZodObject<{
                description: z$1.ZodString;
                inputSchema: z$1.ZodUnknown;
                name: z$1.ZodString;
                presentation: z$1.ZodOptional<z$1.ZodObject<{
                    badge: z$1.ZodOptional<z$1.ZodObject<{
                        glyph: z$1.ZodString;
                        hint: z$1.ZodString;
                        label: z$1.ZodString;
                        tone: z$1.ZodEnum<{
                            destructive: "destructive";
                            neutral: "neutral";
                        }>;
                    }, z$1.core.$strip>>;
                    detail: z$1.ZodOptional<z$1.ZodString>;
                    icon: z$1.ZodObject<{
                        glyph: z$1.ZodString;
                    }, z$1.core.$strip>;
                    label: z$1.ZodObject<{
                        completed: z$1.ZodString;
                        pending: z$1.ZodString;
                    }, z$1.core.$strip>;
                    suppress: z$1.ZodOptional<z$1.ZodBoolean>;
                    tint: z$1.ZodOptional<z$1.ZodObject<{
                        dark: z$1.ZodString;
                        light: z$1.ZodString;
                    }, z$1.core.$strip>>;
                    title: z$1.ZodOptional<z$1.ZodString>;
                }, z$1.core.$strip>>;
            }, z$1.core.$strip>>;
            injectedSkillSources: z$1.ZodArray<z$1.ZodDiscriminatedUnion<[z$1.ZodObject<{
                description: z$1.ZodString;
                entryPath: z$1.ZodString;
                kind: z$1.ZodLiteral<"tree">;
                name: z$1.ZodString;
                sourceType: z$1.ZodEnum<{
                    "data-dir": "data-dir";
                    builtin: "builtin";
                }>;
                treeHash: z$1.ZodString;
            }, z$1.core.$strict>, z$1.ZodObject<{
                description: z$1.ZodString;
                kind: z$1.ZodLiteral<"workspace-path">;
                name: z$1.ZodString;
                skillFilePath: z$1.ZodString;
                sourceRootPath: z$1.ZodString;
                sourceType: z$1.ZodLiteral<"project">;
            }, z$1.core.$strict>, z$1.ZodObject<{
                description: z$1.ZodString;
                kind: z$1.ZodLiteral<"host-path">;
                name: z$1.ZodString;
                skillFilePath: z$1.ZodString;
                sourceRootPath: z$1.ZodString;
                sourceType: z$1.ZodEnum<{
                    "shared-project": "shared-project";
                    "shared-user": "shared-user";
                }>;
            }, z$1.core.$strict>], "kind">>;
            instructionMode: z$1.ZodEnum<{
                append: "append";
                replace: "replace";
            }>;
            instructions: z$1.ZodString;
            projectId: z$1.ZodString;
            providerId: z$1.ZodString;
            providerThreadId: z$1.ZodString;
            workspaceContext: z$1.ZodObject<{
                workspacePath: z$1.ZodString;
            }, z$1.core.$strip>;
        }, z$1.core.$strict>;
        target: z$1.ZodDiscriminatedUnion<[z$1.ZodObject<{
            mode: z$1.ZodLiteral<"start">;
        }, z$1.core.$strip>, z$1.ZodObject<{
            expectedTurnId: z$1.ZodNullable<z$1.ZodString>;
            mode: z$1.ZodLiteral<"auto">;
        }, z$1.core.$strip>, z$1.ZodObject<{
            expectedTurnId: z$1.ZodNullable<z$1.ZodString>;
            mode: z$1.ZodLiteral<"steer">;
        }, z$1.core.$strip>], "mode">;
        threadId: z$1.ZodString;
        type: z$1.ZodLiteral<"turn.submit">;
    }, z$1.core.$strict>, z$1.ZodObject<{
        appliedAs: z$1.ZodEnum<{
            "new-turn": "new-turn";
            steer: "steer";
        }>;
    }, z$1.core.$strip>, "settled", false>;
    "thread.stop": HostDaemonCommandDescriptor<"thread.stop", z$1.ZodObject<{
        environmentId: z$1.ZodString;
        intent: z$1.ZodEnum<{
            interrupt: "interrupt";
            release: "release";
        }>;
        threadId: z$1.ZodString;
        type: z$1.ZodLiteral<"thread.stop">;
    }, z$1.core.$strict>, z$1.ZodObject<{
        activeTurnRetained: z$1.ZodOptional<z$1.ZodBoolean>;
        providerCheckpointId: z$1.ZodNullable<z$1.ZodString>;
    }, z$1.core.$strict>, "settled", false>;
    "thread.storage.delete": HostDaemonCommandDescriptor<"thread.storage.delete", z$1.ZodObject<{
        environmentId: z$1.ZodString;
        threadId: z$1.ZodString;
        type: z$1.ZodLiteral<"thread.storage.delete">;
    }, z$1.core.$strict>, z$1.ZodObject<{
        activeTurnRetained: z$1.ZodOptional<z$1.ZodBoolean>;
        providerCheckpointId: z$1.ZodNullable<z$1.ZodString>;
    }, z$1.core.$strict>, "settled", false>;
    "thread.goal.clear": HostDaemonCommandDescriptor<"thread.goal.clear", z$1.ZodObject<{
        bridgeLaunch: z$1.ZodObject<{
            capabilities: z$1.ZodObject<{
                fork: z$1.ZodEnum<{
                    checkpoint: "checkpoint";
                    none: "none";
                    tip: "tip";
                }>;
                permissionModes: z$1.ZodArray<z$1.ZodEnum<{
                    "accept-edits": "accept-edits";
                    auto: "auto";
                    full: "full";
                }>>;
                providerInstallation: z$1.ZodBoolean;
                supportsServiceTier: z$1.ZodBoolean;
                supportsThreadArchive: z$1.ZodBoolean;
                supportsThreadRename: z$1.ZodBoolean;
            }, z$1.core.$strict>;
            envPassthrough: z$1.ZodArray<z$1.ZodString>;
            pluginId: z$1.ZodString;
            providerOptions: z$1.ZodType<JsonObject, unknown, z$1.core.$ZodTypeInternals<JsonObject, unknown>>;
            source: z$1.ZodObject<{
                byteLength: z$1.ZodNumber;
                digest: z$1.ZodString;
                kind: z$1.ZodLiteral<"artifact">;
            }, z$1.core.$strict>;
        }, z$1.core.$strict>;
        environmentId: z$1.ZodString;
        options: z$1.ZodIntersection<z$1.ZodObject<{
            model: z$1.ZodString;
            promptMode: z$1.ZodOptional<z$1.ZodLiteral<"plan">>;
            providerOptions: z$1.ZodType<JsonObject, unknown, z$1.core.$ZodTypeInternals<JsonObject, unknown>>;
            reasoningLevel: z$1.ZodEnum<{
                high: "high";
                low: "low";
                max: "max";
                medium: "medium";
                none: "none";
                ultra: "ultra";
                ultracode: "ultracode";
                xhigh: "xhigh";
            }>;
            serviceTier: z$1.ZodEnum<{
                default: "default";
                fast: "fast";
            }>;
        }, z$1.core.$strip>, z$1.ZodDiscriminatedUnion<[z$1.ZodObject<{
            approvalReviewer: z$1.ZodLiteral<"user">;
            permissionEscalation: z$1.ZodEnum<{
                ask: "ask";
                deny: "deny";
            }>;
            permissionMode: z$1.ZodLiteral<"accept-edits">;
            permissionScope: z$1.ZodLiteral<"workspace">;
        }, z$1.core.$strip>, z$1.ZodObject<{
            approvalReviewer: z$1.ZodLiteral<"automatic">;
            permissionEscalation: z$1.ZodEnum<{
                ask: "ask";
                deny: "deny";
            }>;
            permissionMode: z$1.ZodLiteral<"auto">;
            permissionScope: z$1.ZodLiteral<"workspace">;
        }, z$1.core.$strip>, z$1.ZodObject<{
            approvalReviewer: z$1.ZodNull;
            permissionEscalation: z$1.ZodNull;
            permissionMode: z$1.ZodLiteral<"full">;
            permissionScope: z$1.ZodLiteral<"full">;
        }, z$1.core.$strip>], "permissionMode">>;
        resumeContext: z$1.ZodObject<{
            bridgeLaunch: z$1.ZodObject<{
                capabilities: z$1.ZodObject<{
                    fork: z$1.ZodEnum<{
                        checkpoint: "checkpoint";
                        none: "none";
                        tip: "tip";
                    }>;
                    permissionModes: z$1.ZodArray<z$1.ZodEnum<{
                        "accept-edits": "accept-edits";
                        auto: "auto";
                        full: "full";
                    }>>;
                    providerInstallation: z$1.ZodBoolean;
                    supportsServiceTier: z$1.ZodBoolean;
                    supportsThreadArchive: z$1.ZodBoolean;
                    supportsThreadRename: z$1.ZodBoolean;
                }, z$1.core.$strict>;
                envPassthrough: z$1.ZodArray<z$1.ZodString>;
                pluginId: z$1.ZodString;
                providerOptions: z$1.ZodType<JsonObject, unknown, z$1.core.$ZodTypeInternals<JsonObject, unknown>>;
                source: z$1.ZodObject<{
                    byteLength: z$1.ZodNumber;
                    digest: z$1.ZodString;
                    kind: z$1.ZodLiteral<"artifact">;
                }, z$1.core.$strict>;
            }, z$1.core.$strict>;
            contributedEnv: z$1.ZodDefault<z$1.ZodArray<z$1.ZodObject<{
                name: z$1.ZodString;
                reason: z$1.ZodString;
                source: z$1.ZodUnion<readonly [z$1.ZodObject<{
                    plugin: z$1.ZodString;
                }, z$1.core.$strict>, z$1.ZodObject<{
                    core: z$1.ZodEnum<{
                        "machine-environment": "machine-environment";
                        "machine-git": "machine-git";
                        "project-environment": "project-environment";
                    }>;
                }, z$1.core.$strict>]>;
                value: z$1.ZodUnion<readonly [z$1.ZodString, z$1.ZodObject<{
                    serverPath: z$1.ZodString;
                }, z$1.core.$strict>]>;
            }, z$1.core.$strict>>>;
            disallowedTools: z$1.ZodOptional<z$1.ZodArray<z$1.ZodString>>;
            dynamicTools: z$1.ZodArray<z$1.ZodObject<{
                description: z$1.ZodString;
                inputSchema: z$1.ZodUnknown;
                name: z$1.ZodString;
                presentation: z$1.ZodOptional<z$1.ZodObject<{
                    badge: z$1.ZodOptional<z$1.ZodObject<{
                        glyph: z$1.ZodString;
                        hint: z$1.ZodString;
                        label: z$1.ZodString;
                        tone: z$1.ZodEnum<{
                            destructive: "destructive";
                            neutral: "neutral";
                        }>;
                    }, z$1.core.$strip>>;
                    detail: z$1.ZodOptional<z$1.ZodString>;
                    icon: z$1.ZodObject<{
                        glyph: z$1.ZodString;
                    }, z$1.core.$strip>;
                    label: z$1.ZodObject<{
                        completed: z$1.ZodString;
                        pending: z$1.ZodString;
                    }, z$1.core.$strip>;
                    suppress: z$1.ZodOptional<z$1.ZodBoolean>;
                    tint: z$1.ZodOptional<z$1.ZodObject<{
                        dark: z$1.ZodString;
                        light: z$1.ZodString;
                    }, z$1.core.$strip>>;
                    title: z$1.ZodOptional<z$1.ZodString>;
                }, z$1.core.$strip>>;
            }, z$1.core.$strip>>;
            injectedSkillSources: z$1.ZodArray<z$1.ZodDiscriminatedUnion<[z$1.ZodObject<{
                description: z$1.ZodString;
                entryPath: z$1.ZodString;
                kind: z$1.ZodLiteral<"tree">;
                name: z$1.ZodString;
                sourceType: z$1.ZodEnum<{
                    "data-dir": "data-dir";
                    builtin: "builtin";
                }>;
                treeHash: z$1.ZodString;
            }, z$1.core.$strict>, z$1.ZodObject<{
                description: z$1.ZodString;
                kind: z$1.ZodLiteral<"workspace-path">;
                name: z$1.ZodString;
                skillFilePath: z$1.ZodString;
                sourceRootPath: z$1.ZodString;
                sourceType: z$1.ZodLiteral<"project">;
            }, z$1.core.$strict>, z$1.ZodObject<{
                description: z$1.ZodString;
                kind: z$1.ZodLiteral<"host-path">;
                name: z$1.ZodString;
                skillFilePath: z$1.ZodString;
                sourceRootPath: z$1.ZodString;
                sourceType: z$1.ZodEnum<{
                    "shared-project": "shared-project";
                    "shared-user": "shared-user";
                }>;
            }, z$1.core.$strict>], "kind">>;
            instructionMode: z$1.ZodEnum<{
                append: "append";
                replace: "replace";
            }>;
            instructions: z$1.ZodString;
            projectId: z$1.ZodString;
            providerId: z$1.ZodString;
            providerThreadId: z$1.ZodString;
            workspaceContext: z$1.ZodObject<{
                workspacePath: z$1.ZodString;
            }, z$1.core.$strip>;
        }, z$1.core.$strict>;
        threadId: z$1.ZodString;
        type: z$1.ZodLiteral<"thread.goal.clear">;
    }, z$1.core.$strict>, z$1.ZodObject<{
        cleared: z$1.ZodBoolean;
    }, z$1.core.$strict>, "settled", false>;
    "thread.plan.cancel": HostDaemonCommandDescriptor<"thread.plan.cancel", z$1.ZodObject<{
        environmentId: z$1.ZodString;
        expectedTurnId: z$1.ZodString;
        threadId: z$1.ZodString;
        type: z$1.ZodLiteral<"thread.plan.cancel">;
    }, z$1.core.$strict>, z$1.ZodObject<{
        cancelled: z$1.ZodBoolean;
    }, z$1.core.$strict>, "settled", false>;
    "thread.rename": HostDaemonCommandDescriptor<"thread.rename", z$1.ZodObject<{
        environmentId: z$1.ZodString;
        threadId: z$1.ZodString;
        title: z$1.ZodString;
        type: z$1.ZodLiteral<"thread.rename">;
    }, z$1.core.$strict>, z$1.ZodObject<{}, z$1.core.$strip>, "settled", false>;
    "thread.archive": HostDaemonCommandDescriptor<"thread.archive", z$1.ZodObject<{
        bridgeLaunch: z$1.ZodObject<{
            capabilities: z$1.ZodObject<{
                fork: z$1.ZodEnum<{
                    checkpoint: "checkpoint";
                    none: "none";
                    tip: "tip";
                }>;
                permissionModes: z$1.ZodArray<z$1.ZodEnum<{
                    "accept-edits": "accept-edits";
                    auto: "auto";
                    full: "full";
                }>>;
                providerInstallation: z$1.ZodBoolean;
                supportsServiceTier: z$1.ZodBoolean;
                supportsThreadArchive: z$1.ZodBoolean;
                supportsThreadRename: z$1.ZodBoolean;
            }, z$1.core.$strict>;
            envPassthrough: z$1.ZodArray<z$1.ZodString>;
            pluginId: z$1.ZodString;
            providerOptions: z$1.ZodType<JsonObject, unknown, z$1.core.$ZodTypeInternals<JsonObject, unknown>>;
            source: z$1.ZodObject<{
                byteLength: z$1.ZodNumber;
                digest: z$1.ZodString;
                kind: z$1.ZodLiteral<"artifact">;
            }, z$1.core.$strict>;
        }, z$1.core.$strict>;
        environmentId: z$1.ZodString;
        providerId: z$1.ZodString;
        providerThreadId: z$1.ZodString;
        threadId: z$1.ZodString;
        type: z$1.ZodLiteral<"thread.archive">;
        workspaceContext: z$1.ZodObject<{
            workspacePath: z$1.ZodString;
        }, z$1.core.$strip>;
    }, z$1.core.$strict>, z$1.ZodObject<{}, z$1.core.$strip>, "settled", false>;
    "thread.unarchive": HostDaemonCommandDescriptor<"thread.unarchive", z$1.ZodObject<{
        bridgeLaunch: z$1.ZodObject<{
            capabilities: z$1.ZodObject<{
                fork: z$1.ZodEnum<{
                    checkpoint: "checkpoint";
                    none: "none";
                    tip: "tip";
                }>;
                permissionModes: z$1.ZodArray<z$1.ZodEnum<{
                    "accept-edits": "accept-edits";
                    auto: "auto";
                    full: "full";
                }>>;
                providerInstallation: z$1.ZodBoolean;
                supportsServiceTier: z$1.ZodBoolean;
                supportsThreadArchive: z$1.ZodBoolean;
                supportsThreadRename: z$1.ZodBoolean;
            }, z$1.core.$strict>;
            envPassthrough: z$1.ZodArray<z$1.ZodString>;
            pluginId: z$1.ZodString;
            providerOptions: z$1.ZodType<JsonObject, unknown, z$1.core.$ZodTypeInternals<JsonObject, unknown>>;
            source: z$1.ZodObject<{
                byteLength: z$1.ZodNumber;
                digest: z$1.ZodString;
                kind: z$1.ZodLiteral<"artifact">;
            }, z$1.core.$strict>;
        }, z$1.core.$strict>;
        environmentId: z$1.ZodString;
        providerId: z$1.ZodString;
        providerThreadId: z$1.ZodString;
        threadId: z$1.ZodString;
        type: z$1.ZodLiteral<"thread.unarchive">;
    }, z$1.core.$strict>, z$1.ZodObject<{}, z$1.core.$strip>, "settled", false>;
    "interactive.resolve": HostDaemonCommandDescriptor<"interactive.resolve", z$1.ZodObject<{
        environmentId: z$1.ZodString;
        interactionId: z$1.ZodString;
        providerId: z$1.ZodString;
        providerRequestId: z$1.ZodString;
        providerThreadId: z$1.ZodString;
        resolution: z$1.ZodUnion<readonly [z$1.ZodDiscriminatedUnion<[z$1.ZodObject<{
            decision: z$1.ZodLiteral<"allow_once">;
            grantedPermissions: z$1.ZodNullable<z$1.ZodObject<{
                fileSystem: z$1.ZodNullable<z$1.ZodObject<{
                    read: z$1.ZodArray<z$1.ZodString>;
                    write: z$1.ZodArray<z$1.ZodString>;
                }, z$1.core.$strip>>;
                network: z$1.ZodNullable<z$1.ZodObject<{
                    enabled: z$1.ZodNullable<z$1.ZodBoolean>;
                }, z$1.core.$strip>>;
            }, z$1.core.$strict>>;
        }, z$1.core.$strip>, z$1.ZodObject<{
            decision: z$1.ZodLiteral<"allow_for_session">;
            grantedPermissions: z$1.ZodNullable<z$1.ZodObject<{
                fileSystem: z$1.ZodNullable<z$1.ZodObject<{
                    read: z$1.ZodArray<z$1.ZodString>;
                    write: z$1.ZodArray<z$1.ZodString>;
                }, z$1.core.$strip>>;
                network: z$1.ZodNullable<z$1.ZodObject<{
                    enabled: z$1.ZodNullable<z$1.ZodBoolean>;
                }, z$1.core.$strip>>;
            }, z$1.core.$strict>>;
        }, z$1.core.$strip>, z$1.ZodObject<{
            decision: z$1.ZodLiteral<"deny">;
        }, z$1.core.$strip>], "decision">, z$1.ZodObject<{
            answers: z$1.ZodRecord<z$1.ZodString, z$1.ZodObject<{
                freeText: z$1.ZodOptional<z$1.ZodString>;
                selected: z$1.ZodArray<z$1.ZodString>;
            }, z$1.core.$strip>>;
            kind: z$1.ZodLiteral<"user_answer">;
        }, z$1.core.$strip>, z$1.ZodObject<{
            description: z$1.ZodOptional<z$1.ZodObject<{
                detail: z$1.ZodOptional<z$1.ZodString>;
                payload: z$1.ZodOptional<z$1.ZodType<JsonValue, unknown, z$1.core.$ZodTypeInternals<JsonValue, unknown>>>;
                title: z$1.ZodOptional<z$1.ZodString>;
            }, z$1.core.$strip>>;
            kind: z$1.ZodLiteral<"plugin_submitted">;
        }, z$1.core.$strip>, z$1.ZodObject<{
            kind: z$1.ZodLiteral<"request_answer">;
            value: z$1.ZodType<JsonValue, unknown, z$1.core.$ZodTypeInternals<JsonValue, unknown>>;
        }, z$1.core.$strip>]>;
        threadId: z$1.ZodString;
        type: z$1.ZodLiteral<"interactive.resolve">;
    }, z$1.core.$strict>, z$1.ZodObject<{}, z$1.core.$strip>, "settled", false>;
    "environment.attach": HostDaemonCommandDescriptor<"environment.attach", z$1.ZodObject<{
        contributedEnv: z$1.ZodArray<z$1.ZodObject<{
            name: z$1.ZodString;
            reason: z$1.ZodString;
            source: z$1.ZodUnion<readonly [z$1.ZodObject<{
                plugin: z$1.ZodString;
            }, z$1.core.$strict>, z$1.ZodObject<{
                core: z$1.ZodEnum<{
                    "machine-environment": "machine-environment";
                    "machine-git": "machine-git";
                    "project-environment": "project-environment";
                }>;
            }, z$1.core.$strict>]>;
            value: z$1.ZodUnion<readonly [z$1.ZodString, z$1.ZodObject<{
                serverPath: z$1.ZodString;
            }, z$1.core.$strict>]>;
        }, z$1.core.$strict>>;
        environmentId: z$1.ZodString;
        initiator: z$1.ZodNullable<z$1.ZodObject<{
            provisioningId: z$1.ZodString;
            threadId: z$1.ZodString;
        }, z$1.core.$strict>>;
        path: z$1.ZodString;
        setupScriptTimeoutMs: z$1.ZodNullable<z$1.ZodNumber>;
        type: z$1.ZodLiteral<"environment.attach">;
    }, z$1.core.$strict>, z$1.ZodObject<{
        branchName: z$1.ZodNullable<z$1.ZodString>;
        defaultBranch: z$1.ZodNullable<z$1.ZodString>;
        isGitRepo: z$1.ZodBoolean;
        isWorktree: z$1.ZodBoolean;
        path: z$1.ZodString;
    }, z$1.core.$strip>, "settled", false>;
    "project.clone": HostDaemonCommandDescriptor<"project.clone", z$1.ZodObject<{
        contributedEnv: z$1.ZodDefault<z$1.ZodArray<z$1.ZodObject<{
            name: z$1.ZodString;
            reason: z$1.ZodString;
            source: z$1.ZodUnion<readonly [z$1.ZodObject<{
                plugin: z$1.ZodString;
            }, z$1.core.$strict>, z$1.ZodObject<{
                core: z$1.ZodEnum<{
                    "machine-environment": "machine-environment";
                    "machine-git": "machine-git";
                    "project-environment": "project-environment";
                }>;
            }, z$1.core.$strict>]>;
            value: z$1.ZodUnion<readonly [z$1.ZodString, z$1.ZodObject<{
                serverPath: z$1.ZodString;
            }, z$1.core.$strict>]>;
        }, z$1.core.$strict>>>;
        operationId: z$1.ZodString;
        projectSlug: z$1.ZodString;
        remoteUrl: z$1.ZodString;
        targetPath: z$1.ZodOptional<z$1.ZodString>;
        type: z$1.ZodLiteral<"project.clone">;
    }, z$1.core.$strict>, z$1.ZodObject<{
        gitRemoteUrl: z$1.ZodNullable<z$1.ZodString>;
        path: z$1.ZodString;
    }, z$1.core.$strict>, "settled", false>;
    "environment.attach.cancel": HostDaemonCommandDescriptor<"environment.attach.cancel", z$1.ZodObject<{
        environmentId: z$1.ZodString;
        type: z$1.ZodLiteral<"environment.attach.cancel">;
    }, z$1.core.$strict>, z$1.ZodObject<{
        aborted: z$1.ZodBoolean;
    }, z$1.core.$strip>, "settled", false>;
    "workspace.commit": HostDaemonCommandDescriptor<"workspace.commit", z$1.ZodObject<{
        environmentId: z$1.ZodString;
        message: z$1.ZodString;
        type: z$1.ZodLiteral<"workspace.commit">;
        workspaceContext: z$1.ZodObject<{
            workspacePath: z$1.ZodString;
        }, z$1.core.$strip>;
    }, z$1.core.$strict>, z$1.ZodObject<{
        commitSha: z$1.ZodString;
        commitSubject: z$1.ZodString;
    }, z$1.core.$strip>, "settled", false>;
    "workspace.pull_request_action": HostDaemonCommandDescriptor<"workspace.pull_request_action", z$1.ZodDiscriminatedUnion<[z$1.ZodObject<{
        environmentId: z$1.ZodString;
        operation: z$1.ZodLiteral<"ready">;
        type: z$1.ZodLiteral<"workspace.pull_request_action">;
        workspaceContext: z$1.ZodObject<{
            workspacePath: z$1.ZodString;
        }, z$1.core.$strip>;
    }, z$1.core.$strict>, z$1.ZodObject<{
        environmentId: z$1.ZodString;
        operation: z$1.ZodLiteral<"draft">;
        type: z$1.ZodLiteral<"workspace.pull_request_action">;
        workspaceContext: z$1.ZodObject<{
            workspacePath: z$1.ZodString;
        }, z$1.core.$strip>;
    }, z$1.core.$strict>, z$1.ZodObject<{
        environmentId: z$1.ZodString;
        method: z$1.ZodEnum<{
            merge: "merge";
            rebase: "rebase";
            squash: "squash";
        }>;
        operation: z$1.ZodLiteral<"merge">;
        type: z$1.ZodLiteral<"workspace.pull_request_action">;
        workspaceContext: z$1.ZodObject<{
            workspacePath: z$1.ZodString;
        }, z$1.core.$strip>;
    }, z$1.core.$strict>], "operation">, z$1.ZodObject<{}, z$1.core.$strict>, "settled", false>;
    "host.list_files": HostDaemonCommandDescriptor<"host.list_files", z$1.ZodObject<{
        excludeNames: z$1.ZodArray<z$1.ZodString>;
        includeHidden: z$1.ZodBoolean;
        limit: z$1.ZodNumber;
        path: z$1.ZodString;
        query: z$1.ZodOptional<z$1.ZodString>;
        respectGitIgnore: z$1.ZodBoolean;
        type: z$1.ZodLiteral<"host.list_files">;
    }, z$1.core.$strip>, z$1.ZodObject<{
        files: z$1.ZodArray<z$1.ZodObject<{
            name: z$1.ZodString;
            path: z$1.ZodString;
        }, z$1.core.$strip>>;
        truncated: z$1.ZodBoolean;
    }, z$1.core.$strip>, "onlineRpc", true>;
    "host.list_paths": HostDaemonCommandDescriptor<"host.list_paths", z$1.ZodObject<{
        excludeNames: z$1.ZodArray<z$1.ZodString>;
        includeDirectories: z$1.ZodBoolean;
        includeFiles: z$1.ZodBoolean;
        includeHidden: z$1.ZodBoolean;
        limit: z$1.ZodNumber;
        path: z$1.ZodString;
        query: z$1.ZodOptional<z$1.ZodString>;
        respectGitIgnore: z$1.ZodBoolean;
        type: z$1.ZodLiteral<"host.list_paths">;
    }, z$1.core.$strip>, z$1.ZodObject<{
        paths: z$1.ZodArray<z$1.ZodObject<{
            kind: z$1.ZodEnum<{
                directory: "directory";
                file: "file";
            }>;
            name: z$1.ZodString;
            path: z$1.ZodString;
            positions: z$1.ZodArray<z$1.ZodNumber>;
            score: z$1.ZodNumber;
        }, z$1.core.$strip>>;
        truncated: z$1.ZodBoolean;
    }, z$1.core.$strip>, "onlineRpc", true>;
    "host.mkdir": HostDaemonCommandDescriptor<"host.mkdir", z$1.ZodObject<{
        path: z$1.ZodString;
        recursive: z$1.ZodBoolean;
        rootPath: z$1.ZodOptional<z$1.ZodString>;
        type: z$1.ZodLiteral<"host.mkdir">;
    }, z$1.core.$strict>, z$1.ZodObject<{
        ok: z$1.ZodLiteral<true>;
    }, z$1.core.$strict>, "onlineRpc", false>;
    "host.move_path": HostDaemonCommandDescriptor<"host.move_path", z$1.ZodObject<{
        destinationPath: z$1.ZodString;
        rootPath: z$1.ZodOptional<z$1.ZodString>;
        sourcePath: z$1.ZodString;
        type: z$1.ZodLiteral<"host.move_path">;
    }, z$1.core.$strict>, z$1.ZodObject<{
        ok: z$1.ZodLiteral<true>;
    }, z$1.core.$strict>, "onlineRpc", false>;
    "host.remove_path": HostDaemonCommandDescriptor<"host.remove_path", z$1.ZodObject<{
        path: z$1.ZodString;
        recursive: z$1.ZodBoolean;
        rootPath: z$1.ZodOptional<z$1.ZodString>;
        type: z$1.ZodLiteral<"host.remove_path">;
    }, z$1.core.$strict>, z$1.ZodObject<{
        ok: z$1.ZodLiteral<true>;
    }, z$1.core.$strict>, "onlineRpc", false>;
    "host.browse_directory": HostDaemonCommandDescriptor<"host.browse_directory", z$1.ZodObject<{
        path: z$1.ZodOptional<z$1.ZodString>;
        type: z$1.ZodLiteral<"host.browse_directory">;
    }, z$1.core.$strip>, z$1.ZodObject<{
        directory: z$1.ZodString;
        entries: z$1.ZodArray<z$1.ZodObject<{
            kind: z$1.ZodEnum<{
                directory: "directory";
                file: "file";
            }>;
            name: z$1.ZodString;
            path: z$1.ZodString;
        }, z$1.core.$strip>>;
        parent: z$1.ZodNullable<z$1.ZodString>;
    }, z$1.core.$strip>, "onlineRpc", true>;
    "host.paths_exist": HostDaemonCommandDescriptor<"host.paths_exist", z$1.ZodObject<{
        paths: z$1.ZodPipe<z$1.ZodArray<z$1.ZodString>, z$1.ZodTransform<string[], string[]>>;
        type: z$1.ZodLiteral<"host.paths_exist">;
    }, z$1.core.$strict>, z$1.ZodObject<{
        existence: z$1.ZodRecord<z$1.ZodString, z$1.ZodBoolean>;
    }, z$1.core.$strip>, "onlineRpc", true>;
    "project.inspect": HostDaemonCommandDescriptor<"project.inspect", z$1.ZodObject<{
        path: z$1.ZodString;
        type: z$1.ZodLiteral<"project.inspect">;
    }, z$1.core.$strict>, z$1.ZodObject<{
        gitRemoteUrl: z$1.ZodNullable<z$1.ZodString>;
        path: z$1.ZodString;
    }, z$1.core.$strict>, "onlineRpc", true>;
    "project.clone_default_path": HostDaemonCommandDescriptor<"project.clone_default_path", z$1.ZodObject<{
        projectSlug: z$1.ZodString;
        type: z$1.ZodLiteral<"project.clone_default_path">;
    }, z$1.core.$strict>, z$1.ZodObject<{
        path: z$1.ZodString;
    }, z$1.core.$strict>, "onlineRpc", true>;
    "host.pick_folder": HostDaemonCommandDescriptor<"host.pick_folder", z$1.ZodObject<{
        type: z$1.ZodLiteral<"host.pick_folder">;
    }, z$1.core.$strict>, z$1.ZodObject<{
        path: z$1.ZodNullable<z$1.ZodString>;
    }, z$1.core.$strip>, "onlineRpc", false>;
    "environment.hook.run": HostDaemonCommandDescriptor<"environment.hook.run", z$1.ZodObject<{
        contributedEnv: z$1.ZodDefault<z$1.ZodArray<z$1.ZodObject<{
            name: z$1.ZodString;
            reason: z$1.ZodString;
            source: z$1.ZodUnion<readonly [z$1.ZodObject<{
                plugin: z$1.ZodString;
            }, z$1.core.$strict>, z$1.ZodObject<{
                core: z$1.ZodEnum<{
                    "machine-environment": "machine-environment";
                    "machine-git": "machine-git";
                    "project-environment": "project-environment";
                }>;
            }, z$1.core.$strict>]>;
            value: z$1.ZodUnion<readonly [z$1.ZodString, z$1.ZodObject<{
                serverPath: z$1.ZodString;
            }, z$1.core.$strict>]>;
        }, z$1.core.$strict>>>;
        kind: z$1.ZodEnum<{
            setup: "setup";
            teardown: "teardown";
        }>;
        operationId: z$1.ZodString;
        path: z$1.ZodString;
        resumeOnly: z$1.ZodDefault<z$1.ZodBoolean>;
        timeoutMs: z$1.ZodNumber;
        type: z$1.ZodLiteral<"environment.hook.run">;
    }, z$1.core.$strict>, z$1.ZodObject<{}, z$1.core.$strip>, "onlineRpc", false>;
    "environment.hook.cancel": HostDaemonCommandDescriptor<"environment.hook.cancel", z$1.ZodObject<{
        operationId: z$1.ZodString;
        type: z$1.ZodLiteral<"environment.hook.cancel">;
    }, z$1.core.$strict>, z$1.ZodObject<{
        status: z$1.ZodEnum<{
            terminated: "terminated";
            unknown: "unknown";
        }>;
    }, z$1.core.$strict>, "onlineRpc", true>;
    "plugin.host.call": HostDaemonCommandDescriptor<"plugin.host.call", z$1.ZodObject<{
        artifact: z$1.ZodObject<{
            byteLength: z$1.ZodNumber;
            digest: z$1.ZodString;
        }, z$1.core.$strict>;
        callId: z$1.ZodString;
        contributedEnv: z$1.ZodDefault<z$1.ZodArray<z$1.ZodObject<{
            name: z$1.ZodString;
            reason: z$1.ZodString;
            source: z$1.ZodUnion<readonly [z$1.ZodObject<{
                plugin: z$1.ZodString;
            }, z$1.core.$strict>, z$1.ZodObject<{
                core: z$1.ZodEnum<{
                    "machine-environment": "machine-environment";
                    "machine-git": "machine-git";
                    "project-environment": "project-environment";
                }>;
            }, z$1.core.$strict>]>;
            value: z$1.ZodUnion<readonly [z$1.ZodString, z$1.ZodObject<{
                serverPath: z$1.ZodString;
            }, z$1.core.$strict>]>;
        }, z$1.core.$strict>>>;
        generation: z$1.ZodString;
        input: z$1.ZodType<JsonValue, unknown, z$1.core.$ZodTypeInternals<JsonValue, unknown>>;
        method: z$1.ZodString;
        pluginId: z$1.ZodString;
        timeoutMs: z$1.ZodNumber;
        type: z$1.ZodLiteral<"plugin.host.call">;
    }, z$1.core.$strict>, z$1.ZodObject<{
        output: z$1.ZodType<JsonValue, unknown, z$1.core.$ZodTypeInternals<JsonValue, unknown>>;
    }, z$1.core.$strict>, "onlineRpc", false>;
    "plugin.host.cancel": HostDaemonCommandDescriptor<"plugin.host.cancel", z$1.ZodObject<{
        callId: z$1.ZodString;
        generation: z$1.ZodString;
        pluginId: z$1.ZodString;
        type: z$1.ZodLiteral<"plugin.host.cancel">;
    }, z$1.core.$strict>, z$1.ZodObject<{
        cancelled: z$1.ZodBoolean;
    }, z$1.core.$strict>, "onlineRpc", true>;
    "plugin.host.dispose": HostDaemonCommandDescriptor<"plugin.host.dispose", z$1.ZodObject<{
        generation: z$1.ZodString;
        pluginId: z$1.ZodString;
        type: z$1.ZodLiteral<"plugin.host.dispose">;
    }, z$1.core.$strict>, z$1.ZodObject<{
        disposed: z$1.ZodBoolean;
    }, z$1.core.$strict>, "onlineRpc", true>;
    "connect-tunnel.ensure-identity": HostDaemonCommandDescriptor<"connect-tunnel.ensure-identity", z$1.ZodObject<{
        type: z$1.ZodLiteral<"connect-tunnel.ensure-identity">;
    }, z$1.core.$strict>, z$1.ZodObject<{
        baseDomain: z$1.ZodString;
        label: z$1.ZodString;
    }, z$1.core.$strict>, "onlineRpc", true>;
    "host.list_commands": HostDaemonCommandDescriptor<"host.list_commands", z$1.ZodObject<{
        cwd: z$1.ZodNullable<z$1.ZodString>;
        nativeRoots: z$1.ZodObject<{
            commands: z$1.ZodObject<{
                project: z$1.ZodArray<z$1.ZodObject<{
                    ancestors: z$1.ZodBoolean;
                    namePrefix: z$1.ZodString;
                    path: z$1.ZodString;
                    recursive: z$1.ZodBoolean;
                    skipIfManifest: z$1.ZodOptional<z$1.ZodString>;
                }, z$1.core.$strict>>;
                user: z$1.ZodArray<z$1.ZodObject<{
                    ancestors: z$1.ZodBoolean;
                    namePrefix: z$1.ZodString;
                    path: z$1.ZodString;
                    recursive: z$1.ZodBoolean;
                    skipIfManifest: z$1.ZodOptional<z$1.ZodString>;
                }, z$1.core.$strict>>;
            }, z$1.core.$strict>;
            resolved: z$1.ZodObject<{
                commands: z$1.ZodArray<z$1.ZodObject<{
                    ancestors: z$1.ZodBoolean;
                    fallbackName: z$1.ZodOptional<z$1.ZodString>;
                    namePrefix: z$1.ZodString;
                    origin: z$1.ZodEnum<{
                        project: "project";
                        user: "user";
                    }>;
                    path: z$1.ZodString;
                    recursive: z$1.ZodBoolean;
                    shape: z$1.ZodEnum<{
                        "command-file": "command-file";
                        "skill-file": "skill-file";
                        commands: "commands";
                        skill: "skill";
                        skills: "skills";
                    }>;
                    skipIfManifest: z$1.ZodOptional<z$1.ZodString>;
                }, z$1.core.$strict>>;
                skills: z$1.ZodArray<z$1.ZodObject<{
                    ancestors: z$1.ZodBoolean;
                    fallbackName: z$1.ZodOptional<z$1.ZodString>;
                    namePrefix: z$1.ZodString;
                    origin: z$1.ZodEnum<{
                        project: "project";
                        user: "user";
                    }>;
                    path: z$1.ZodString;
                    recursive: z$1.ZodBoolean;
                    shape: z$1.ZodEnum<{
                        "command-file": "command-file";
                        "skill-file": "skill-file";
                        commands: "commands";
                        skill: "skill";
                        skills: "skills";
                    }>;
                    skipIfManifest: z$1.ZodOptional<z$1.ZodString>;
                }, z$1.core.$strict>>;
            }, z$1.core.$strict>;
            skills: z$1.ZodObject<{
                project: z$1.ZodArray<z$1.ZodObject<{
                    ancestors: z$1.ZodBoolean;
                    namePrefix: z$1.ZodString;
                    path: z$1.ZodString;
                    recursive: z$1.ZodBoolean;
                    skipIfManifest: z$1.ZodOptional<z$1.ZodString>;
                }, z$1.core.$strict>>;
                user: z$1.ZodArray<z$1.ZodObject<{
                    ancestors: z$1.ZodBoolean;
                    namePrefix: z$1.ZodString;
                    path: z$1.ZodString;
                    recursive: z$1.ZodBoolean;
                    skipIfManifest: z$1.ZodOptional<z$1.ZodString>;
                }, z$1.core.$strict>>;
            }, z$1.core.$strict>;
        }, z$1.core.$strict>;
        providerId: z$1.ZodString;
        type: z$1.ZodLiteral<"host.list_commands">;
    }, z$1.core.$strict>, z$1.ZodObject<{
        commands: z$1.ZodArray<z$1.ZodObject<{
            argumentHint: z$1.ZodNullable<z$1.ZodString>;
            description: z$1.ZodNullable<z$1.ZodString>;
            name: z$1.ZodString;
            origin: z$1.ZodEnum<{
                project: "project";
                user: "user";
            }>;
            source: z$1.ZodEnum<{
                command: "command";
                skill: "skill";
            }>;
        }, z$1.core.$strip>>;
    }, z$1.core.$strip>, "onlineRpc", true>;
    "host.list_skills": HostDaemonCommandDescriptor<"host.list_skills", z$1.ZodObject<{
        cwd: z$1.ZodNullable<z$1.ZodString>;
        nativeRoots: z$1.ZodObject<{
            commands: z$1.ZodObject<{
                project: z$1.ZodArray<z$1.ZodObject<{
                    ancestors: z$1.ZodBoolean;
                    namePrefix: z$1.ZodString;
                    path: z$1.ZodString;
                    recursive: z$1.ZodBoolean;
                    skipIfManifest: z$1.ZodOptional<z$1.ZodString>;
                }, z$1.core.$strict>>;
                user: z$1.ZodArray<z$1.ZodObject<{
                    ancestors: z$1.ZodBoolean;
                    namePrefix: z$1.ZodString;
                    path: z$1.ZodString;
                    recursive: z$1.ZodBoolean;
                    skipIfManifest: z$1.ZodOptional<z$1.ZodString>;
                }, z$1.core.$strict>>;
            }, z$1.core.$strict>;
            resolved: z$1.ZodObject<{
                commands: z$1.ZodArray<z$1.ZodObject<{
                    ancestors: z$1.ZodBoolean;
                    fallbackName: z$1.ZodOptional<z$1.ZodString>;
                    namePrefix: z$1.ZodString;
                    origin: z$1.ZodEnum<{
                        project: "project";
                        user: "user";
                    }>;
                    path: z$1.ZodString;
                    recursive: z$1.ZodBoolean;
                    shape: z$1.ZodEnum<{
                        "command-file": "command-file";
                        "skill-file": "skill-file";
                        commands: "commands";
                        skill: "skill";
                        skills: "skills";
                    }>;
                    skipIfManifest: z$1.ZodOptional<z$1.ZodString>;
                }, z$1.core.$strict>>;
                skills: z$1.ZodArray<z$1.ZodObject<{
                    ancestors: z$1.ZodBoolean;
                    fallbackName: z$1.ZodOptional<z$1.ZodString>;
                    namePrefix: z$1.ZodString;
                    origin: z$1.ZodEnum<{
                        project: "project";
                        user: "user";
                    }>;
                    path: z$1.ZodString;
                    recursive: z$1.ZodBoolean;
                    shape: z$1.ZodEnum<{
                        "command-file": "command-file";
                        "skill-file": "skill-file";
                        commands: "commands";
                        skill: "skill";
                        skills: "skills";
                    }>;
                    skipIfManifest: z$1.ZodOptional<z$1.ZodString>;
                }, z$1.core.$strict>>;
            }, z$1.core.$strict>;
            skills: z$1.ZodObject<{
                project: z$1.ZodArray<z$1.ZodObject<{
                    ancestors: z$1.ZodBoolean;
                    namePrefix: z$1.ZodString;
                    path: z$1.ZodString;
                    recursive: z$1.ZodBoolean;
                    skipIfManifest: z$1.ZodOptional<z$1.ZodString>;
                }, z$1.core.$strict>>;
                user: z$1.ZodArray<z$1.ZodObject<{
                    ancestors: z$1.ZodBoolean;
                    namePrefix: z$1.ZodString;
                    path: z$1.ZodString;
                    recursive: z$1.ZodBoolean;
                    skipIfManifest: z$1.ZodOptional<z$1.ZodString>;
                }, z$1.core.$strict>>;
            }, z$1.core.$strict>;
        }, z$1.core.$strict>;
        providerId: z$1.ZodString;
        type: z$1.ZodLiteral<"host.list_skills">;
    }, z$1.core.$strict>, z$1.ZodObject<{
        skills: z$1.ZodArray<z$1.ZodObject<{
            description: z$1.ZodNullable<z$1.ZodString>;
            filePath: z$1.ZodString;
            id: z$1.ZodString;
            linked: z$1.ZodBoolean;
            name: z$1.ZodString;
            rootKind: z$1.ZodEnum<{
                "bb-builtin": "bb-builtin";
                "bb-data-dir": "bb-data-dir";
                "bb-project": "bb-project";
                "provider-project": "provider-project";
                "provider-user": "provider-user";
                "shared-project": "shared-project";
                "shared-user": "shared-user";
                plugin: "plugin";
            }>;
        }, z$1.core.$strip>>;
    }, z$1.core.$strip>, "onlineRpc", true>;
    "host.delete_skill": HostDaemonCommandDescriptor<"host.delete_skill", z$1.ZodObject<{
        cwd: z$1.ZodNullable<z$1.ZodString>;
        name: z$1.ZodString;
        rootPath: z$1.ZodNullable<z$1.ZodString>;
        scope: z$1.ZodEnum<{
            "bb-project": "bb-project";
            "bb-user": "bb-user";
            "provider-project": "provider-project";
            "provider-user": "provider-user";
        }>;
        type: z$1.ZodLiteral<"host.delete_skill">;
    }, z$1.core.$strict>, z$1.ZodObject<{
        deletedPath: z$1.ZodString;
    }, z$1.core.$strip>, "onlineRpc", false>;
    "host.write_skill": HostDaemonCommandDescriptor<"host.write_skill", z$1.ZodObject<{
        content: z$1.ZodString;
        cwd: z$1.ZodNullable<z$1.ZodString>;
        expectedSha256: z$1.ZodString;
        name: z$1.ZodString;
        scope: z$1.ZodEnum<{
            "bb-project": "bb-project";
            "bb-user": "bb-user";
        }>;
        type: z$1.ZodLiteral<"host.write_skill">;
    }, z$1.core.$strict>, z$1.ZodDiscriminatedUnion<[z$1.ZodObject<{
        filePath: z$1.ZodString;
        outcome: z$1.ZodLiteral<"written">;
        sha256: z$1.ZodString;
    }, z$1.core.$strip>, z$1.ZodObject<{
        currentSha256: z$1.ZodNullable<z$1.ZodString>;
        outcome: z$1.ZodLiteral<"conflict">;
    }, z$1.core.$strip>], "outcome">, "onlineRpc", false>;
    "host.install_global_skills": HostDaemonCommandDescriptor<"host.install_global_skills", z$1.ZodObject<{
        skills: z$1.ZodArray<z$1.ZodObject<{
            entryPath: z$1.ZodString;
            name: z$1.ZodString;
            treeHash: z$1.ZodString;
        }, z$1.core.$strict>>;
        type: z$1.ZodLiteral<"host.install_global_skills">;
    }, z$1.core.$strict>, z$1.ZodObject<{
        installations: z$1.ZodArray<z$1.ZodObject<{
            name: z$1.ZodString;
            path: z$1.ZodString;
        }, z$1.core.$strict>>;
    }, z$1.core.$strict>, "onlineRpc", false>;
    "host.global_skills_status": HostDaemonCommandDescriptor<"host.global_skills_status", z$1.ZodObject<{
        names: z$1.ZodArray<z$1.ZodString>;
        type: z$1.ZodLiteral<"host.global_skills_status">;
    }, z$1.core.$strict>, z$1.ZodObject<{
        entries: z$1.ZodArray<z$1.ZodObject<{
            name: z$1.ZodString;
            path: z$1.ZodString;
            treeHash: z$1.ZodNullable<z$1.ZodString>;
        }, z$1.core.$strict>>;
    }, z$1.core.$strict>, "onlineRpc", true>;
    "host.inspect_git_source": HostDaemonCommandDescriptor<"host.inspect_git_source", z$1.ZodObject<{
        path: z$1.ZodString;
        remoteRefresh: z$1.ZodEnum<{
            background: "background";
            blocking: "blocking";
        }>;
        type: z$1.ZodLiteral<"host.inspect_git_source">;
    }, z$1.core.$strict>, z$1.ZodObject<{
        checkout: z$1.ZodDiscriminatedUnion<[z$1.ZodObject<{
            branchName: z$1.ZodString;
            headSha: z$1.ZodNullable<z$1.ZodString>;
            kind: z$1.ZodLiteral<"branch">;
        }, z$1.core.$strip>, z$1.ZodObject<{
            headSha: z$1.ZodNullable<z$1.ZodString>;
            kind: z$1.ZodLiteral<"detached">;
        }, z$1.core.$strip>, z$1.ZodObject<{
            branchName: z$1.ZodNullable<z$1.ZodString>;
            kind: z$1.ZodLiteral<"unborn">;
        }, z$1.core.$strip>, z$1.ZodObject<{
            kind: z$1.ZodLiteral<"unknown">;
            reason: z$1.ZodString;
        }, z$1.core.$strip>], "kind">;
        defaultBranch: z$1.ZodNullable<z$1.ZodString>;
        defaultBranchRelation: z$1.ZodNullable<z$1.ZodEnum<{
            "local-ahead": "local-ahead";
            "local-behind": "local-behind";
            diverged: "diverged";
            equal: "equal";
            unknown: "unknown";
        }>>;
        hasUncommittedChanges: z$1.ZodBoolean;
        isWorktree: z$1.ZodBoolean;
        operation: z$1.ZodDiscriminatedUnion<[z$1.ZodObject<{
            kind: z$1.ZodLiteral<"none">;
        }, z$1.core.$strip>, z$1.ZodObject<{
            hasConflicts: z$1.ZodBoolean;
            kind: z$1.ZodLiteral<"merge">;
        }, z$1.core.$strip>, z$1.ZodObject<{
            hasConflicts: z$1.ZodBoolean;
            kind: z$1.ZodLiteral<"rebase">;
        }, z$1.core.$strip>, z$1.ZodObject<{
            hasConflicts: z$1.ZodBoolean;
            kind: z$1.ZodLiteral<"cherry-pick">;
        }, z$1.core.$strip>, z$1.ZodObject<{
            hasConflicts: z$1.ZodBoolean;
            kind: z$1.ZodLiteral<"revert">;
        }, z$1.core.$strip>, z$1.ZodObject<{
            hasConflicts: z$1.ZodBoolean;
            kind: z$1.ZodLiteral<"unknown">;
            reason: z$1.ZodString;
        }, z$1.core.$strip>], "kind">;
        originDefaultBranch: z$1.ZodNullable<z$1.ZodString>;
    }, z$1.core.$strip>, "onlineRpc", true>;
    "host.list_branch_options": HostDaemonCommandDescriptor<"host.list_branch_options", z$1.ZodObject<{
        limit: z$1.ZodNumber;
        path: z$1.ZodString;
        query: z$1.ZodOptional<z$1.ZodString>;
        remoteRefresh: z$1.ZodEnum<{
            background: "background";
            none: "none";
        }>;
        selectedBranch: z$1.ZodOptional<z$1.ZodString>;
        type: z$1.ZodLiteral<"host.list_branch_options">;
    }, z$1.core.$strict>, z$1.ZodObject<{
        branches: z$1.ZodArray<z$1.ZodString>;
        branchesTruncated: z$1.ZodBoolean;
        remoteBranches: z$1.ZodArray<z$1.ZodString>;
        remoteBranchesTruncated: z$1.ZodBoolean;
        selectedBranch: z$1.ZodNullable<z$1.ZodObject<{
            kind: z$1.ZodEnum<{
                local: "local";
                missing: "missing";
                remote: "remote";
            }>;
            name: z$1.ZodString;
        }, z$1.core.$strip>>;
    }, z$1.core.$strip>, "onlineRpc", true>;
    "host.file_metadata": HostDaemonCommandDescriptor<"host.file_metadata", z$1.ZodObject<{
        path: z$1.ZodString;
        rootPath: z$1.ZodOptional<z$1.ZodString>;
        type: z$1.ZodLiteral<"host.file_metadata">;
    }, z$1.core.$strict>, z$1.ZodObject<{
        modifiedAtMs: z$1.ZodNumber;
        path: z$1.ZodString;
        sizeBytes: z$1.ZodNumber;
    }, z$1.core.$strip>, "onlineRpc", true>;
    "host.read_file": HostDaemonCommandDescriptor<"host.read_file", z$1.ZodObject<{
        ifNoneMatch: z$1.ZodOptional<z$1.ZodDiscriminatedUnion<[z$1.ZodObject<{
            kind: z$1.ZodLiteral<"any">;
        }, z$1.core.$strict>, z$1.ZodObject<{
            kind: z$1.ZodLiteral<"sha256">;
            values: z$1.ZodArray<z$1.ZodString>;
        }, z$1.core.$strict>], "kind">>;
        path: z$1.ZodString;
        ref: z$1.ZodOptional<z$1.ZodString>;
        rootPath: z$1.ZodOptional<z$1.ZodString>;
        type: z$1.ZodLiteral<"host.read_file">;
    }, z$1.core.$strip>, z$1.ZodUnion<readonly [z$1.ZodObject<{
        content: z$1.ZodString;
        contentEncoding: z$1.ZodEnum<{
            base64: "base64";
            utf8: "utf8";
        }>;
        mimeType: z$1.ZodOptional<z$1.ZodString>;
        modifiedAtMs: z$1.ZodOptional<z$1.ZodNumber>;
        path: z$1.ZodString;
        sha256: z$1.ZodString;
        sizeBytes: z$1.ZodNumber;
    }, z$1.core.$strip>, z$1.ZodObject<{
        contentEncoding: z$1.ZodEnum<{
            base64: "base64";
            utf8: "utf8";
        }>;
        mimeType: z$1.ZodOptional<z$1.ZodString>;
        modifiedAtMs: z$1.ZodOptional<z$1.ZodNumber>;
        notModified: z$1.ZodLiteral<true>;
        path: z$1.ZodString;
        sha256: z$1.ZodString;
        sizeBytes: z$1.ZodNumber;
    }, z$1.core.$strip>]>, "onlineRpc", true>;
    "host.read_file_relative": HostDaemonCommandDescriptor<"host.read_file_relative", z$1.ZodObject<{
        dotfiles: z$1.ZodEnum<{
            allow: "allow";
            deny: "deny";
        }>;
        path: z$1.ZodString;
        rootPath: z$1.ZodString;
        type: z$1.ZodLiteral<"host.read_file_relative">;
    }, z$1.core.$strict>, z$1.ZodObject<{
        content: z$1.ZodString;
        contentEncoding: z$1.ZodEnum<{
            base64: "base64";
            utf8: "utf8";
        }>;
        mimeType: z$1.ZodOptional<z$1.ZodString>;
        modifiedAtMs: z$1.ZodOptional<z$1.ZodNumber>;
        path: z$1.ZodString;
        sha256: z$1.ZodString;
        sizeBytes: z$1.ZodNumber;
    }, z$1.core.$strip>, "onlineRpc", true>;
    "host.write_file": HostDaemonCommandDescriptor<"host.write_file", z$1.ZodObject<{
        content: z$1.ZodString;
        contentEncoding: z$1.ZodEnum<{
            base64: "base64";
            utf8: "utf8";
        }>;
        createParents: z$1.ZodBoolean;
        expectedSha256: z$1.ZodOptional<z$1.ZodNullable<z$1.ZodString>>;
        mode: z$1.ZodOptional<z$1.ZodNumber>;
        path: z$1.ZodString;
        rootPath: z$1.ZodOptional<z$1.ZodString>;
        type: z$1.ZodLiteral<"host.write_file">;
    }, z$1.core.$strict>, z$1.ZodDiscriminatedUnion<[z$1.ZodObject<{
        outcome: z$1.ZodLiteral<"written">;
        sha256: z$1.ZodString;
        sizeBytes: z$1.ZodNumber;
    }, z$1.core.$strict>, z$1.ZodObject<{
        currentSha256: z$1.ZodNullable<z$1.ZodString>;
        outcome: z$1.ZodLiteral<"conflict">;
    }, z$1.core.$strict>], "outcome">, "onlineRpc", false>;
    "provider.list_models": HostDaemonCommandDescriptor<"provider.list_models", z$1.ZodObject<{
        bridgeLaunch: z$1.ZodObject<{
            capabilities: z$1.ZodObject<{
                fork: z$1.ZodEnum<{
                    checkpoint: "checkpoint";
                    none: "none";
                    tip: "tip";
                }>;
                permissionModes: z$1.ZodArray<z$1.ZodEnum<{
                    "accept-edits": "accept-edits";
                    auto: "auto";
                    full: "full";
                }>>;
                providerInstallation: z$1.ZodBoolean;
                supportsServiceTier: z$1.ZodBoolean;
                supportsThreadArchive: z$1.ZodBoolean;
                supportsThreadRename: z$1.ZodBoolean;
            }, z$1.core.$strict>;
            envPassthrough: z$1.ZodArray<z$1.ZodString>;
            pluginId: z$1.ZodString;
            providerOptions: z$1.ZodType<JsonObject, unknown, z$1.core.$ZodTypeInternals<JsonObject, unknown>>;
            source: z$1.ZodObject<{
                byteLength: z$1.ZodNumber;
                digest: z$1.ZodString;
                kind: z$1.ZodLiteral<"artifact">;
            }, z$1.core.$strict>;
        }, z$1.core.$strict>;
        cwd: z$1.ZodOptional<z$1.ZodString>;
        providerId: z$1.ZodString;
        type: z$1.ZodLiteral<"provider.list_models">;
    }, z$1.core.$strip>, z$1.ZodObject<{
        models: z$1.ZodArray<z$1.ZodObject<{
            defaultReasoningEffort: z$1.ZodEnum<{
                high: "high";
                low: "low";
                max: "max";
                medium: "medium";
                none: "none";
                ultra: "ultra";
                ultracode: "ultracode";
                xhigh: "xhigh";
            }>;
            description: z$1.ZodString;
            displayName: z$1.ZodString;
            id: z$1.ZodString;
            isDefault: z$1.ZodBoolean;
            model: z$1.ZodString;
            routeProviderId: z$1.ZodOptional<z$1.ZodString>;
            supportedReasoningEfforts: z$1.ZodArray<z$1.ZodObject<{
                description: z$1.ZodString;
                reasoningEffort: z$1.ZodEnum<{
                    high: "high";
                    low: "low";
                    max: "max";
                    medium: "medium";
                    none: "none";
                    ultra: "ultra";
                    ultracode: "ultracode";
                    xhigh: "xhigh";
                }>;
            }, z$1.core.$strip>>;
        }, z$1.core.$strip>>;
        selectedOnlyModels: z$1.ZodArray<z$1.ZodObject<{
            defaultReasoningEffort: z$1.ZodEnum<{
                high: "high";
                low: "low";
                max: "max";
                medium: "medium";
                none: "none";
                ultra: "ultra";
                ultracode: "ultracode";
                xhigh: "xhigh";
            }>;
            description: z$1.ZodString;
            displayName: z$1.ZodString;
            id: z$1.ZodString;
            isDefault: z$1.ZodBoolean;
            model: z$1.ZodString;
            routeProviderId: z$1.ZodOptional<z$1.ZodString>;
            supportedReasoningEfforts: z$1.ZodArray<z$1.ZodObject<{
                description: z$1.ZodString;
                reasoningEffort: z$1.ZodEnum<{
                    high: "high";
                    low: "low";
                    max: "max";
                    medium: "medium";
                    none: "none";
                    ultra: "ultra";
                    ultracode: "ultracode";
                    xhigh: "xhigh";
                }>;
            }, z$1.core.$strip>>;
        }, z$1.core.$strip>>;
    }, z$1.core.$strip>, "onlineRpc", true>;
    "provider.health": HostDaemonCommandDescriptor<"provider.health", z$1.ZodObject<{
        bridgeLaunch: z$1.ZodObject<{
            capabilities: z$1.ZodObject<{
                fork: z$1.ZodEnum<{
                    checkpoint: "checkpoint";
                    none: "none";
                    tip: "tip";
                }>;
                permissionModes: z$1.ZodArray<z$1.ZodEnum<{
                    "accept-edits": "accept-edits";
                    auto: "auto";
                    full: "full";
                }>>;
                providerInstallation: z$1.ZodBoolean;
                supportsServiceTier: z$1.ZodBoolean;
                supportsThreadArchive: z$1.ZodBoolean;
                supportsThreadRename: z$1.ZodBoolean;
            }, z$1.core.$strict>;
            envPassthrough: z$1.ZodArray<z$1.ZodString>;
            pluginId: z$1.ZodString;
            providerOptions: z$1.ZodType<JsonObject, unknown, z$1.core.$ZodTypeInternals<JsonObject, unknown>>;
            source: z$1.ZodObject<{
                byteLength: z$1.ZodNumber;
                digest: z$1.ZodString;
                kind: z$1.ZodLiteral<"artifact">;
            }, z$1.core.$strict>;
        }, z$1.core.$strict>;
        cwd: z$1.ZodOptional<z$1.ZodString>;
        providerId: z$1.ZodString;
        type: z$1.ZodLiteral<"provider.health">;
    }, z$1.core.$strict>, z$1.ZodDiscriminatedUnion<[z$1.ZodObject<{
        supported: z$1.ZodLiteral<false>;
    }, z$1.core.$loose>, z$1.ZodObject<{
        health: z$1.ZodObject<{
            accountEmail: z$1.ZodNullable<z$1.ZodString>;
            canInstall: z$1.ZodBoolean;
            canUpdate: z$1.ZodBoolean;
            installedVersion: z$1.ZodNullable<z$1.ZodString>;
            loginCommand: z$1.ZodNullable<z$1.ZodString>;
            minimumSupportedVersion: z$1.ZodNullable<z$1.ZodString>;
            planLabel: z$1.ZodNullable<z$1.ZodString>;
            status: z$1.ZodEnum<{
                expired: "expired";
                not_installed: "not_installed";
                ready: "ready";
                unauthenticated: "unauthenticated";
                unknown: "unknown";
                unsupported_version: "unsupported_version";
            }>;
            statusMessage: z$1.ZodNullable<z$1.ZodString>;
        }, z$1.core.$loose>;
        supported: z$1.ZodLiteral<true>;
    }, z$1.core.$loose>], "supported">, "onlineRpc", true>;
    "provider.installation.status": HostDaemonCommandDescriptor<"provider.installation.status", z$1.ZodObject<{
        bridgeLaunch: z$1.ZodObject<{
            capabilities: z$1.ZodObject<{
                fork: z$1.ZodEnum<{
                    checkpoint: "checkpoint";
                    none: "none";
                    tip: "tip";
                }>;
                permissionModes: z$1.ZodArray<z$1.ZodEnum<{
                    "accept-edits": "accept-edits";
                    auto: "auto";
                    full: "full";
                }>>;
                providerInstallation: z$1.ZodBoolean;
                supportsServiceTier: z$1.ZodBoolean;
                supportsThreadArchive: z$1.ZodBoolean;
                supportsThreadRename: z$1.ZodBoolean;
            }, z$1.core.$strict>;
            envPassthrough: z$1.ZodArray<z$1.ZodString>;
            pluginId: z$1.ZodString;
            providerOptions: z$1.ZodType<JsonObject, unknown, z$1.core.$ZodTypeInternals<JsonObject, unknown>>;
            source: z$1.ZodObject<{
                byteLength: z$1.ZodNumber;
                digest: z$1.ZodString;
                kind: z$1.ZodLiteral<"artifact">;
            }, z$1.core.$strict>;
        }, z$1.core.$strict>;
        cwd: z$1.ZodOptional<z$1.ZodString>;
        providerId: z$1.ZodString;
        requirement: z$1.ZodOptional<z$1.ZodLiteral<"thread_rewind">>;
        type: z$1.ZodLiteral<"provider.installation.status">;
    }, z$1.core.$strict>, z$1.ZodObject<{
        currentVersion: z$1.ZodNullable<z$1.ZodString>;
        executableName: z$1.ZodString;
        executablePath: z$1.ZodNullable<z$1.ZodString>;
        installAction: z$1.ZodNullable<z$1.ZodObject<{
            command: z$1.ZodString;
            kind: z$1.ZodEnum<{
                install: "install";
                update: "update";
            }>;
            label: z$1.ZodEnum<{
                Install: "Install";
                Update: "Update";
            }>;
        }, z$1.core.$loose>>;
        installSource: z$1.ZodEnum<{
            external: "external";
            notInstalled: "notInstalled";
            npmGlobal: "npmGlobal";
        }>;
        installed: z$1.ZodBoolean;
        latestVersion: z$1.ZodNullable<z$1.ZodString>;
        minimumSupportedVersion: z$1.ZodNullable<z$1.ZodString>;
        needsUpdate: z$1.ZodBoolean;
        npmGlobalPackageVersion: z$1.ZodNullable<z$1.ZodString>;
        npmPackageName: z$1.ZodNullable<z$1.ZodString>;
        versionUnsupported: z$1.ZodBoolean;
    }, z$1.core.$loose>, "onlineRpc", true>;
    "provider.installation.run": HostDaemonCommandDescriptor<"provider.installation.run", z$1.ZodObject<{
        action: z$1.ZodEnum<{
            install: "install";
            update: "update";
        }>;
        bridgeLaunch: z$1.ZodObject<{
            capabilities: z$1.ZodObject<{
                fork: z$1.ZodEnum<{
                    checkpoint: "checkpoint";
                    none: "none";
                    tip: "tip";
                }>;
                permissionModes: z$1.ZodArray<z$1.ZodEnum<{
                    "accept-edits": "accept-edits";
                    auto: "auto";
                    full: "full";
                }>>;
                providerInstallation: z$1.ZodBoolean;
                supportsServiceTier: z$1.ZodBoolean;
                supportsThreadArchive: z$1.ZodBoolean;
                supportsThreadRename: z$1.ZodBoolean;
            }, z$1.core.$strict>;
            envPassthrough: z$1.ZodArray<z$1.ZodString>;
            pluginId: z$1.ZodString;
            providerOptions: z$1.ZodType<JsonObject, unknown, z$1.core.$ZodTypeInternals<JsonObject, unknown>>;
            source: z$1.ZodObject<{
                byteLength: z$1.ZodNumber;
                digest: z$1.ZodString;
                kind: z$1.ZodLiteral<"artifact">;
            }, z$1.core.$strict>;
        }, z$1.core.$strict>;
        cwd: z$1.ZodOptional<z$1.ZodString>;
        providerId: z$1.ZodString;
        type: z$1.ZodLiteral<"provider.installation.run">;
    }, z$1.core.$strict>, z$1.ZodObject<{
        events: z$1.ZodArray<z$1.ZodDiscriminatedUnion<[z$1.ZodObject<{
            command: z$1.ZodString;
            provider: z$1.ZodString;
            type: z$1.ZodLiteral<"started">;
        }, z$1.core.$strip>, z$1.ZodObject<{
            provider: z$1.ZodString;
            stream: z$1.ZodEnum<{
                stderr: "stderr";
                stdout: "stdout";
            }>;
            text: z$1.ZodString;
            type: z$1.ZodLiteral<"output">;
        }, z$1.core.$strip>, z$1.ZodObject<{
            exitCode: z$1.ZodNullable<z$1.ZodNumber>;
            provider: z$1.ZodString;
            signal: z$1.ZodNullable<z$1.ZodString>;
            success: z$1.ZodBoolean;
            type: z$1.ZodLiteral<"completed">;
        }, z$1.core.$strip>, z$1.ZodObject<{
            message: z$1.ZodString;
            provider: z$1.ZodString;
            type: z$1.ZodLiteral<"error">;
        }, z$1.core.$strip>], "type">>;
    }, z$1.core.$strict>, "onlineRpc", false>;
    "provider.usage": HostDaemonCommandDescriptor<"provider.usage", z$1.ZodObject<{
        bridgeLaunch: z$1.ZodObject<{
            capabilities: z$1.ZodObject<{
                fork: z$1.ZodEnum<{
                    checkpoint: "checkpoint";
                    none: "none";
                    tip: "tip";
                }>;
                permissionModes: z$1.ZodArray<z$1.ZodEnum<{
                    "accept-edits": "accept-edits";
                    auto: "auto";
                    full: "full";
                }>>;
                providerInstallation: z$1.ZodBoolean;
                supportsServiceTier: z$1.ZodBoolean;
                supportsThreadArchive: z$1.ZodBoolean;
                supportsThreadRename: z$1.ZodBoolean;
            }, z$1.core.$strict>;
            envPassthrough: z$1.ZodArray<z$1.ZodString>;
            pluginId: z$1.ZodString;
            providerOptions: z$1.ZodType<JsonObject, unknown, z$1.core.$ZodTypeInternals<JsonObject, unknown>>;
            source: z$1.ZodObject<{
                byteLength: z$1.ZodNumber;
                digest: z$1.ZodString;
                kind: z$1.ZodLiteral<"artifact">;
            }, z$1.core.$strict>;
        }, z$1.core.$strict>;
        cwd: z$1.ZodOptional<z$1.ZodString>;
        providerId: z$1.ZodString;
        type: z$1.ZodLiteral<"provider.usage">;
    }, z$1.core.$strict>, z$1.ZodDiscriminatedUnion<[z$1.ZodObject<{
        supported: z$1.ZodLiteral<false>;
    }, z$1.core.$loose>, z$1.ZodObject<{
        supported: z$1.ZodLiteral<true>;
        usage: z$1.ZodDiscriminatedUnion<[z$1.ZodObject<{
            accountEmail: z$1.ZodNullable<z$1.ZodString>;
            planLabel: z$1.ZodNullable<z$1.ZodString>;
            status: z$1.ZodLiteral<"ok">;
            windows: z$1.ZodArray<z$1.ZodObject<{
                cost: z$1.ZodOptional<z$1.ZodObject<{
                    limitUsdCents: z$1.ZodNumber;
                    usedUsdCents: z$1.ZodNumber;
                }, z$1.core.$strip>>;
                label: z$1.ZodString;
                resetsAt: z$1.ZodNullable<z$1.ZodString>;
                usedPercent: z$1.ZodNumber;
            }, z$1.core.$loose>>;
        }, z$1.core.$loose>, z$1.ZodObject<{
            status: z$1.ZodLiteral<"not_installed">;
        }, z$1.core.$loose>, z$1.ZodObject<{
            status: z$1.ZodLiteral<"unauthenticated">;
        }, z$1.core.$loose>, z$1.ZodObject<{
            status: z$1.ZodLiteral<"expired">;
        }, z$1.core.$loose>, z$1.ZodObject<{
            accountEmail: z$1.ZodDefault<z$1.ZodNullable<z$1.ZodString>>;
            message: z$1.ZodString;
            planLabel: z$1.ZodDefault<z$1.ZodNullable<z$1.ZodString>>;
            status: z$1.ZodLiteral<"error">;
        }, z$1.core.$loose>], "status">;
    }, z$1.core.$loose>], "supported">, "onlineRpc", true>;
    "workspace.status": HostDaemonCommandDescriptor<"workspace.status", z$1.ZodObject<{
        environmentId: z$1.ZodString;
        maxUntrackedLineStatBytes: z$1.ZodNumber;
        maxUntrackedLineStatFiles: z$1.ZodNumber;
        mergeBaseBranch: z$1.ZodOptional<z$1.ZodString>;
        type: z$1.ZodLiteral<"workspace.status">;
        workspaceContext: z$1.ZodObject<{
            workspacePath: z$1.ZodString;
        }, z$1.core.$strip>;
    }, z$1.core.$strict>, z$1.ZodDiscriminatedUnion<[z$1.ZodObject<{
        outcome: z$1.ZodLiteral<"available">;
        workspaceStatus: z$1.ZodObject<{
            branch: z$1.ZodObject<{
                currentBranch: z$1.ZodNullable<z$1.ZodString>;
                defaultBranch: z$1.ZodString;
            }, z$1.core.$strip>;
            checkout: z$1.ZodDiscriminatedUnion<[z$1.ZodObject<{
                branchName: z$1.ZodString;
                headSha: z$1.ZodNullable<z$1.ZodString>;
                kind: z$1.ZodLiteral<"branch">;
            }, z$1.core.$strip>, z$1.ZodObject<{
                headSha: z$1.ZodNullable<z$1.ZodString>;
                kind: z$1.ZodLiteral<"detached">;
            }, z$1.core.$strip>, z$1.ZodObject<{
                branchName: z$1.ZodNullable<z$1.ZodString>;
                kind: z$1.ZodLiteral<"unborn">;
            }, z$1.core.$strip>, z$1.ZodObject<{
                kind: z$1.ZodLiteral<"unknown">;
                reason: z$1.ZodString;
            }, z$1.core.$strip>], "kind">;
            mergeBase: z$1.ZodNullable<z$1.ZodObject<{
                aheadCount: z$1.ZodNumber;
                baseRef: z$1.ZodNullable<z$1.ZodString>;
                behindCount: z$1.ZodNumber;
                commits: z$1.ZodArray<z$1.ZodObject<{
                    authorName: z$1.ZodString;
                    authoredAt: z$1.ZodNumber;
                    sha: z$1.ZodString;
                    shortSha: z$1.ZodString;
                    subject: z$1.ZodString;
                }, z$1.core.$strip>>;
                deletions: z$1.ZodNumber;
                files: z$1.ZodArray<z$1.ZodObject<{
                    deletions: z$1.ZodNullable<z$1.ZodNumber>;
                    insertions: z$1.ZodNullable<z$1.ZodNumber>;
                    path: z$1.ZodString;
                    status: z$1.ZodEnum<{
                        "?": "?";
                        "??": "??";
                        A: "A";
                        C: "C";
                        D: "D";
                        M: "M";
                        R: "R";
                        U: "U";
                    }>;
                }, z$1.core.$strip>>;
                hasCommittedUnmergedChanges: z$1.ZodBoolean;
                insertions: z$1.ZodNumber;
                lineStatsComplete: z$1.ZodBoolean;
                mergeBaseBranch: z$1.ZodString;
            }, z$1.core.$strip>>;
            workingTree: z$1.ZodObject<{
                deletions: z$1.ZodNumber;
                files: z$1.ZodArray<z$1.ZodObject<{
                    deletions: z$1.ZodNullable<z$1.ZodNumber>;
                    insertions: z$1.ZodNullable<z$1.ZodNumber>;
                    path: z$1.ZodString;
                    status: z$1.ZodEnum<{
                        "?": "?";
                        "??": "??";
                        A: "A";
                        C: "C";
                        D: "D";
                        M: "M";
                        R: "R";
                        U: "U";
                    }>;
                }, z$1.core.$strip>>;
                hasUncommittedChanges: z$1.ZodBoolean;
                insertions: z$1.ZodNumber;
                lineStatsComplete: z$1.ZodBoolean;
                state: z$1.ZodEnum<{
                    clean: "clean";
                    committed_unmerged: "committed_unmerged";
                    dirty_and_committed_unmerged: "dirty_and_committed_unmerged";
                    dirty_uncommitted: "dirty_uncommitted";
                    untracked: "untracked";
                }>;
            }, z$1.core.$strip>;
        }, z$1.core.$strip>;
    }, z$1.core.$strict>, z$1.ZodObject<{
        failure: z$1.ZodObject<{
            code: z$1.ZodEnum<{
                not_git_repo: "not_git_repo";
                path_not_found: "path_not_found";
                permission_denied: "permission_denied";
                unknown: "unknown";
                unknown_environment: "unknown_environment";
                workspace_type_mismatch: "workspace_type_mismatch";
            }>;
            message: z$1.ZodString;
            workspacePath: z$1.ZodString;
        }, z$1.core.$strict>;
        outcome: z$1.ZodLiteral<"unavailable">;
    }, z$1.core.$strict>], "outcome">, "onlineRpc", true>;
    "workspace.diff": HostDaemonCommandDescriptor<"workspace.diff", z$1.ZodObject<{
        environmentId: z$1.ZodString;
        maxDiffBytes: z$1.ZodNumber;
        maxFileListBytes: z$1.ZodNumber;
        maxUntrackedFiles: z$1.ZodNumber;
        target: z$1.ZodDiscriminatedUnion<[z$1.ZodObject<{
            type: z$1.ZodLiteral<"uncommitted">;
        }, z$1.core.$strip>, z$1.ZodObject<{
            mergeBaseBranch: z$1.ZodString;
            type: z$1.ZodLiteral<"branch_committed">;
        }, z$1.core.$strip>, z$1.ZodObject<{
            mergeBaseBranch: z$1.ZodString;
            type: z$1.ZodLiteral<"all">;
        }, z$1.core.$strip>, z$1.ZodObject<{
            sha: z$1.ZodString;
            type: z$1.ZodLiteral<"commit">;
        }, z$1.core.$strip>], "type">;
        type: z$1.ZodLiteral<"workspace.diff">;
        workspaceContext: z$1.ZodObject<{
            workspacePath: z$1.ZodString;
        }, z$1.core.$strip>;
    }, z$1.core.$strict>, z$1.ZodDiscriminatedUnion<[z$1.ZodObject<{
        diff: z$1.ZodObject<{
            diff: z$1.ZodString;
            files: z$1.ZodString;
            mergeBaseRef: z$1.ZodNullable<z$1.ZodString>;
            shortstat: z$1.ZodString;
            truncated: z$1.ZodBoolean;
        }, z$1.core.$strip>;
        outcome: z$1.ZodLiteral<"available">;
    }, z$1.core.$strict>, z$1.ZodObject<{
        failure: z$1.ZodObject<{
            code: z$1.ZodEnum<{
                not_git_repo: "not_git_repo";
                path_not_found: "path_not_found";
                permission_denied: "permission_denied";
                unknown: "unknown";
                unknown_environment: "unknown_environment";
                workspace_type_mismatch: "workspace_type_mismatch";
            }>;
            message: z$1.ZodString;
            workspacePath: z$1.ZodString;
        }, z$1.core.$strict>;
        outcome: z$1.ZodLiteral<"unavailable">;
    }, z$1.core.$strict>], "outcome">, "onlineRpc", true>;
    "workspace.diffFiles": HostDaemonCommandDescriptor<"workspace.diffFiles", z$1.ZodObject<{
        environmentId: z$1.ZodString;
        maxFiles: z$1.ZodNumber;
        target: z$1.ZodDiscriminatedUnion<[z$1.ZodObject<{
            type: z$1.ZodLiteral<"uncommitted">;
        }, z$1.core.$strip>, z$1.ZodObject<{
            mergeBaseBranch: z$1.ZodString;
            type: z$1.ZodLiteral<"branch_committed">;
        }, z$1.core.$strip>, z$1.ZodObject<{
            mergeBaseBranch: z$1.ZodString;
            type: z$1.ZodLiteral<"all">;
        }, z$1.core.$strip>, z$1.ZodObject<{
            sha: z$1.ZodString;
            type: z$1.ZodLiteral<"commit">;
        }, z$1.core.$strip>], "type">;
        type: z$1.ZodLiteral<"workspace.diffFiles">;
        workspaceContext: z$1.ZodObject<{
            workspacePath: z$1.ZodString;
        }, z$1.core.$strip>;
    }, z$1.core.$strict>, z$1.ZodDiscriminatedUnion<[z$1.ZodObject<{
        files: z$1.ZodArray<z$1.ZodObject<{
            additions: z$1.ZodNumber;
            binary: z$1.ZodBoolean;
            deletions: z$1.ZodNumber;
            origin: z$1.ZodEnum<{
                tracked: "tracked";
                untracked: "untracked";
            }>;
            path: z$1.ZodString;
            previousPath: z$1.ZodNullable<z$1.ZodString>;
            statusLetter: z$1.ZodEnum<{
                A: "A";
                C: "C";
                D: "D";
                M: "M";
                R: "R";
                T: "T";
            }>;
        }, z$1.core.$strip>>;
        mergeBaseRef: z$1.ZodNullable<z$1.ZodString>;
        outcome: z$1.ZodLiteral<"available">;
        shortstat: z$1.ZodString;
        truncated: z$1.ZodBoolean;
    }, z$1.core.$strict>, z$1.ZodObject<{
        failure: z$1.ZodObject<{
            code: z$1.ZodEnum<{
                not_git_repo: "not_git_repo";
                path_not_found: "path_not_found";
                permission_denied: "permission_denied";
                unknown: "unknown";
                unknown_environment: "unknown_environment";
                workspace_type_mismatch: "workspace_type_mismatch";
            }>;
            message: z$1.ZodString;
            workspacePath: z$1.ZodString;
        }, z$1.core.$strict>;
        outcome: z$1.ZodLiteral<"unavailable">;
    }, z$1.core.$strict>], "outcome">, "onlineRpc", true>;
    "workspace.diffPatch": HostDaemonCommandDescriptor<"workspace.diffPatch", z$1.ZodObject<{
        environmentId: z$1.ZodString;
        maxBytesPerFile: z$1.ZodNumber;
        paths: z$1.ZodArray<z$1.ZodString>;
        target: z$1.ZodDiscriminatedUnion<[z$1.ZodObject<{
            type: z$1.ZodLiteral<"uncommitted">;
        }, z$1.core.$strip>, z$1.ZodObject<{
            mergeBaseBranch: z$1.ZodString;
            type: z$1.ZodLiteral<"branch_committed">;
        }, z$1.core.$strip>, z$1.ZodObject<{
            mergeBaseBranch: z$1.ZodString;
            type: z$1.ZodLiteral<"all">;
        }, z$1.core.$strip>, z$1.ZodObject<{
            sha: z$1.ZodString;
            type: z$1.ZodLiteral<"commit">;
        }, z$1.core.$strip>], "type">;
        type: z$1.ZodLiteral<"workspace.diffPatch">;
        workspaceContext: z$1.ZodObject<{
            workspacePath: z$1.ZodString;
        }, z$1.core.$strip>;
    }, z$1.core.$strict>, z$1.ZodDiscriminatedUnion<[z$1.ZodObject<{
        outcome: z$1.ZodLiteral<"available">;
        patches: z$1.ZodArray<z$1.ZodObject<{
            patch: z$1.ZodString;
            path: z$1.ZodString;
            truncated: z$1.ZodBoolean;
        }, z$1.core.$strict>>;
    }, z$1.core.$strict>, z$1.ZodObject<{
        failure: z$1.ZodObject<{
            code: z$1.ZodEnum<{
                not_git_repo: "not_git_repo";
                path_not_found: "path_not_found";
                permission_denied: "permission_denied";
                unknown: "unknown";
                unknown_environment: "unknown_environment";
                workspace_type_mismatch: "workspace_type_mismatch";
            }>;
            message: z$1.ZodString;
            workspacePath: z$1.ZodString;
        }, z$1.core.$strict>;
        outcome: z$1.ZodLiteral<"unavailable">;
    }, z$1.core.$strict>], "outcome">, "onlineRpc", true>;
    "workspace.pull_request": HostDaemonCommandDescriptor<"workspace.pull_request", z$1.ZodObject<{
        environmentId: z$1.ZodString;
        type: z$1.ZodLiteral<"workspace.pull_request">;
        workspaceContext: z$1.ZodObject<{
            workspacePath: z$1.ZodString;
        }, z$1.core.$strip>;
    }, z$1.core.$strict>, z$1.ZodDiscriminatedUnion<[z$1.ZodObject<{
        outcome: z$1.ZodLiteral<"available">;
        pullRequest: z$1.ZodObject<{
            baseRefName: z$1.ZodString;
            checks: z$1.ZodArray<z$1.ZodObject<{
                conclusion: z$1.ZodNullable<z$1.ZodEnum<{
                    action_required: "action_required";
                    cancelled: "cancelled";
                    failure: "failure";
                    neutral: "neutral";
                    skipped: "skipped";
                    stale: "stale";
                    startup_failure: "startup_failure";
                    success: "success";
                    timed_out: "timed_out";
                    unknown: "unknown";
                }>>;
                name: z$1.ZodString;
                startedAt: z$1.ZodNullable<z$1.ZodString>;
                status: z$1.ZodEnum<{
                    completed: "completed";
                    in_progress: "in_progress";
                    queued: "queued";
                    unknown: "unknown";
                }>;
                url: z$1.ZodNullable<z$1.ZodString>;
            }, z$1.core.$strict>>;
            headRefName: z$1.ZodString;
            isDraft: z$1.ZodBoolean;
            mergeStateStatus: z$1.ZodNullable<z$1.ZodEnum<{
                BEHIND: "BEHIND";
                BLOCKED: "BLOCKED";
                CLEAN: "CLEAN";
                DIRTY: "DIRTY";
                DRAFT: "DRAFT";
                HAS_HOOKS: "HAS_HOOKS";
                UNKNOWN: "UNKNOWN";
                UNSTABLE: "UNSTABLE";
            }>>;
            mergeable: z$1.ZodNullable<z$1.ZodEnum<{
                CONFLICTING: "CONFLICTING";
                MERGEABLE: "MERGEABLE";
                UNKNOWN: "UNKNOWN";
            }>>;
            number: z$1.ZodNumber;
            reviewDecision: z$1.ZodNullable<z$1.ZodEnum<{
                APPROVED: "APPROVED";
                CHANGES_REQUESTED: "CHANGES_REQUESTED";
                REVIEW_REQUIRED: "REVIEW_REQUIRED";
            }>>;
            reviewRequestCount: z$1.ZodNumber;
            state: z$1.ZodEnum<{
                CLOSED: "CLOSED";
                MERGED: "MERGED";
                OPEN: "OPEN";
            }>;
            title: z$1.ZodString;
            updatedAt: z$1.ZodString;
            url: z$1.ZodString;
        }, z$1.core.$strict>;
    }, z$1.core.$strict>, z$1.ZodObject<{
        outcome: z$1.ZodLiteral<"absent">;
    }, z$1.core.$strict>, z$1.ZodObject<{
        message: z$1.ZodString;
        outcome: z$1.ZodLiteral<"unavailable">;
    }, z$1.core.$strict>], "outcome">, "onlineRpc", true>;
    "server_move.inspect": HostDaemonCommandDescriptor<"server_move.inspect", z$1.ZodObject<{
        paths: z$1.ZodArray<z$1.ZodString>;
        port: z$1.ZodNumber;
        type: z$1.ZodLiteral<"server_move.inspect">;
    }, z$1.core.$strict>, z$1.ZodObject<{
        bbAppVersion: z$1.ZodString;
        codexCredentialsPresent: z$1.ZodBoolean;
        dataDir: z$1.ZodString;
        dataDirHasServerData: z$1.ZodBoolean;
        diskFreeBytes: z$1.ZodNullable<z$1.ZodNumber>;
        existingServerData: z$1.ZodNullable<z$1.ZodObject<{
            path: z$1.ZodString;
            sizeBytes: z$1.ZodNumber;
        }, z$1.core.$strict>>;
        ghAuthenticated: z$1.ZodNullable<z$1.ZodBoolean>;
        pathsExist: z$1.ZodRecord<z$1.ZodString, z$1.ZodBoolean>;
        platform: z$1.ZodEnum<{
            darwin: "darwin";
            linux: "linux";
            unknown: "unknown";
            wsl: "wsl";
        }>;
        portAvailable: z$1.ZodBoolean;
        serverEntryAvailable: z$1.ZodBoolean;
        serviceManager: z$1.ZodEnum<{
            "systemd-system": "systemd-system";
            "systemd-user": "systemd-user";
            launchd: "launchd";
            none: "none";
        }>;
        timeZone: z$1.ZodNullable<z$1.ZodString>;
    }, z$1.core.$strict>, "onlineRpc", true>;
    "server_move.probe": HostDaemonCommandDescriptor<"server_move.probe", z$1.ZodObject<{
        moveId: z$1.ZodString;
        type: z$1.ZodLiteral<"server_move.probe">;
        url: z$1.ZodString;
    }, z$1.core.$strict>, z$1.ZodObject<{
        message: z$1.ZodNullable<z$1.ZodString>;
        reachable: z$1.ZodBoolean;
        state: z$1.ZodNullable<z$1.ZodEnum<{
            activating: "activating";
            pending: "pending";
            ready: "ready";
        }>>;
    }, z$1.core.$strict>, "onlineRpc", true>;
    "server_move.prepare": HostDaemonCommandDescriptor<"server_move.prepare", z$1.ZodObject<{
        activationToken: z$1.ZodString;
        archive: z$1.ZodObject<{
            downloadPath: z$1.ZodString;
            sha256: z$1.ZodString;
            sizeBytes: z$1.ZodNumber;
        }, z$1.core.$strict>;
        archiveExistingServerData: z$1.ZodBoolean;
        bbApp: z$1.ZodNullable<z$1.ZodObject<{
            downloadPath: z$1.ZodString;
            sha256: z$1.ZodString;
            sizeBytes: z$1.ZodNumber;
            version: z$1.ZodString;
        }, z$1.core.$strict>>;
        bindHost: z$1.ZodNullable<z$1.ZodEnum<{
            "0.0.0.0": "0.0.0.0";
            "127.0.0.1": "127.0.0.1";
        }>>;
        moveId: z$1.ZodString;
        serverPort: z$1.ZodNumber;
        serverUrl: z$1.ZodString;
        sourceDataDir: z$1.ZodString;
        sourceServerHostId: z$1.ZodNullable<z$1.ZodString>;
        type: z$1.ZodLiteral<"server_move.prepare">;
    }, z$1.core.$strict>, z$1.ZodObject<{
        localServerUrl: z$1.ZodString;
        pid: z$1.ZodNumber;
    }, z$1.core.$strict>, "onlineRpc", false>;
    "server_move.activate": HostDaemonCommandDescriptor<"server_move.activate", z$1.ZodObject<{
        activationToken: z$1.ZodString;
        lastMove: z$1.ZodObject<{
            completedAt: z$1.ZodNumber;
            fromHostId: z$1.ZodString;
            fromHostName: z$1.ZodString;
            moveId: z$1.ZodString;
            oldCopyDeletedAt: z$1.ZodNullable<z$1.ZodNumber>;
            toHostId: z$1.ZodString;
            toHostName: z$1.ZodString;
        }, z$1.core.$strict>;
        moveId: z$1.ZodString;
        type: z$1.ZodLiteral<"server_move.activate">;
    }, z$1.core.$strict>, z$1.ZodObject<{
        ok: z$1.ZodLiteral<true>;
    }, z$1.core.$strict>, "onlineRpc", false>;
    "server_move.abort": HostDaemonCommandDescriptor<"server_move.abort", z$1.ZodObject<{
        moveId: z$1.ZodString;
        type: z$1.ZodLiteral<"server_move.abort">;
    }, z$1.core.$strict>, z$1.ZodObject<{
        ok: z$1.ZodLiteral<true>;
    }, z$1.core.$strict>, "onlineRpc", false>;
    "server_move.delete_old_copy": HostDaemonCommandDescriptor<"server_move.delete_old_copy", z$1.ZodObject<{
        type: z$1.ZodLiteral<"server_move.delete_old_copy">;
    }, z$1.core.$strict>, z$1.ZodObject<{
        deleted: z$1.ZodBoolean;
    }, z$1.core.$strict>, "onlineRpc", false>;
};
type HostDaemonCommandRegistry = typeof hostDaemonCommandRegistry;
type AnyHostDaemonCommandDescriptor = HostDaemonCommandRegistry[keyof HostDaemonCommandRegistry];
type HostDaemonCommandDescriptorForTransport<Transport extends HostDaemonCommandTransport> = Extract<AnyHostDaemonCommandDescriptor, {
    transport: Transport;
}>;
type HostDaemonResultSchemaMapForTransport<Transport extends HostDaemonCommandTransport> = {
    [Descriptor in HostDaemonCommandDescriptorForTransport<Transport> as Descriptor["type"]]: Descriptor["resultSchema"];
};
type HostDaemonOnlineRpcResultSchemaMap = HostDaemonResultSchemaMapForTransport<"onlineRpc">;
type HostDaemonOnlineRpcResultByType = {
    [K in keyof HostDaemonOnlineRpcResultSchemaMap]: z$1.infer<HostDaemonOnlineRpcResultSchemaMap[K]>;
};

declare const pickFolderResponseSchema: z$1.ZodObject<{
    path: z$1.ZodNullable<z$1.ZodString>;
}, z$1.core.$strip>;
type PickFolderResponse = z$1.infer<typeof pickFolderResponseSchema>;
declare const pathsExistRequestSchema: z$1.ZodObject<{
    paths: z$1.ZodPipe<z$1.ZodArray<z$1.ZodString>, z$1.ZodTransform<string[], string[]>>;
}, z$1.core.$strip>;
type PathsExistRequest = z$1.infer<typeof pathsExistRequestSchema>;
declare const pathsExistResponseSchema: z$1.ZodObject<{
    existence: z$1.ZodRecord<z$1.ZodString, z$1.ZodBoolean>;
}, z$1.core.$strip>;
type PathsExistResponse = z$1.infer<typeof pathsExistResponseSchema>;
declare const providerCliStatusResponseSchema: z$1.ZodRecord<z$1.ZodString, z$1.ZodObject<{
    currentVersion: z$1.ZodNullable<z$1.ZodString>;
    displayName: z$1.ZodString;
    executableName: z$1.ZodString;
    executablePath: z$1.ZodNullable<z$1.ZodString>;
    installAction: z$1.ZodNullable<z$1.ZodObject<{
        command: z$1.ZodString;
        kind: z$1.ZodEnum<{
            install: "install";
            update: "update";
        }>;
        label: z$1.ZodEnum<{
            Install: "Install";
            Update: "Update";
        }>;
    }, z$1.core.$strip>>;
    installSource: z$1.ZodEnum<{
        external: "external";
        notInstalled: "notInstalled";
        npmGlobal: "npmGlobal";
    }>;
    installed: z$1.ZodBoolean;
    latestVersion: z$1.ZodNullable<z$1.ZodString>;
    minimumSupportedVersion: z$1.ZodNullable<z$1.ZodString>;
    needsUpdate: z$1.ZodBoolean;
    npmGlobalPackageVersion: z$1.ZodNullable<z$1.ZodString>;
    npmPackageName: z$1.ZodNullable<z$1.ZodString>;
    versionUnsupported: z$1.ZodBoolean;
}, z$1.core.$strip>>;
type ProviderCliStatusResponse = z$1.infer<typeof providerCliStatusResponseSchema>;
declare const providerCliInstallRequestSchema: z$1.ZodObject<{
    actionKind: z$1.ZodEnum<{
        install: "install";
        update: "update";
    }>;
    provider: z$1.ZodString;
}, z$1.core.$strip>;
type ProviderCliInstallRequest = z$1.infer<typeof providerCliInstallRequestSchema>;
declare const providerCliInstallEventSchema: z$1.ZodDiscriminatedUnion<[z$1.ZodObject<{
    command: z$1.ZodString;
    provider: z$1.ZodString;
    type: z$1.ZodLiteral<"started">;
}, z$1.core.$strip>, z$1.ZodObject<{
    provider: z$1.ZodString;
    stream: z$1.ZodEnum<{
        stderr: "stderr";
        stdout: "stdout";
    }>;
    text: z$1.ZodString;
    type: z$1.ZodLiteral<"output">;
}, z$1.core.$strip>, z$1.ZodObject<{
    exitCode: z$1.ZodNullable<z$1.ZodNumber>;
    provider: z$1.ZodString;
    signal: z$1.ZodNullable<z$1.ZodString>;
    success: z$1.ZodBoolean;
    type: z$1.ZodLiteral<"completed">;
}, z$1.core.$strip>, z$1.ZodObject<{
    message: z$1.ZodString;
    provider: z$1.ZodString;
    type: z$1.ZodLiteral<"error">;
}, z$1.core.$strip>], "type">;
type ProviderCliInstallEvent = z$1.infer<typeof providerCliInstallEventSchema>;

declare const desktopBrowserInstanceSchema: z$1.ZodObject<{
    generation: z$1.ZodString;
    instanceId: z$1.ZodString;
    label: z$1.ZodString;
}, z$1.core.$strip>;
declare const desktopBrowserCommandSchema: z$1.ZodDiscriminatedUnion<[z$1.ZodObject<{
    type: z$1.ZodLiteral<"desktop.browser.list_instances">;
}, z$1.core.$strict>, z$1.ZodObject<{
    generation: z$1.ZodString;
    instanceId: z$1.ZodString;
    threadId: z$1.ZodString;
    type: z$1.ZodLiteral<"desktop.browser.list_tabs">;
}, z$1.core.$strict>, z$1.ZodObject<{
    generation: z$1.ZodString;
    instanceId: z$1.ZodString;
    presentation: z$1.ZodEnum<{
        hidden: "hidden";
        reveal: "reveal";
    }>;
    profile: z$1.ZodDiscriminatedUnion<[z$1.ZodObject<{
        id: z$1.ZodString;
        kind: z$1.ZodLiteral<"automation">;
    }, z$1.core.$strip>, z$1.ZodObject<{
        kind: z$1.ZodLiteral<"personal">;
    }, z$1.core.$strip>], "kind">;
    tabId: z$1.ZodString;
    threadId: z$1.ZodString;
    type: z$1.ZodLiteral<"desktop.browser.create_tab">;
    url: z$1.ZodString;
}, z$1.core.$strict>, z$1.ZodObject<{
    generation: z$1.ZodString;
    instanceId: z$1.ZodString;
    tabId: z$1.ZodString;
    threadId: z$1.ZodString;
    type: z$1.ZodLiteral<"desktop.browser.reveal_tab">;
}, z$1.core.$strict>, z$1.ZodObject<{
    generation: z$1.ZodString;
    instanceId: z$1.ZodString;
    tabId: z$1.ZodString;
    threadId: z$1.ZodString;
    type: z$1.ZodLiteral<"desktop.browser.close_tab">;
}, z$1.core.$strict>, z$1.ZodObject<{
    generation: z$1.ZodString;
    instanceId: z$1.ZodString;
    tabId: z$1.ZodString;
    threadId: z$1.ZodString;
    type: z$1.ZodLiteral<"desktop.browser.capture_tab">;
}, z$1.core.$strict>, z$1.ZodObject<{
    controllerLabel: z$1.ZodString;
    expiresAt: z$1.ZodNumber;
    generation: z$1.ZodString;
    instanceId: z$1.ZodString;
    leaseId: z$1.ZodString;
    tabIds: z$1.ZodArray<z$1.ZodString>;
    threadId: z$1.ZodString;
    type: z$1.ZodLiteral<"desktop.browser.acquire_control">;
}, z$1.core.$strict>, z$1.ZodObject<{
    generation: z$1.ZodString;
    instanceId: z$1.ZodString;
    leaseId: z$1.ZodString;
    tabIds: z$1.ZodArray<z$1.ZodString>;
    threadId: z$1.ZodString;
    type: z$1.ZodLiteral<"desktop.browser.open_connection">;
}, z$1.core.$strict>, z$1.ZodObject<{
    generation: z$1.ZodString;
    instanceId: z$1.ZodString;
    leaseId: z$1.ZodString;
    threadId: z$1.ZodString;
    type: z$1.ZodLiteral<"desktop.browser.release_control">;
}, z$1.core.$strict>, z$1.ZodObject<{
    generation: z$1.ZodString;
    instanceId: z$1.ZodString;
    type: z$1.ZodLiteral<"desktop.browser.list_import_sources">;
}, z$1.core.$strict>, z$1.ZodObject<{
    generation: z$1.ZodString;
    instanceId: z$1.ZodString;
    profile: z$1.ZodDiscriminatedUnion<[z$1.ZodObject<{
        id: z$1.ZodString;
        kind: z$1.ZodLiteral<"automation">;
    }, z$1.core.$strip>, z$1.ZodObject<{
        kind: z$1.ZodLiteral<"personal">;
    }, z$1.core.$strip>], "kind">;
    sourceId: z$1.ZodEnum<{
        arc: "arc";
        brave: "brave";
        chrome: "chrome";
        chromium: "chromium";
        edge: "edge";
        firefox: "firefox";
        helium: "helium";
        opera: "opera";
        safari: "safari";
        vivaldi: "vivaldi";
    }>;
    sourceProfileDirectory: z$1.ZodString;
    type: z$1.ZodLiteral<"desktop.browser.import_cookies">;
}, z$1.core.$strict>], "type">;
declare const desktopBrowserResultSchemas: {
    "desktop.browser.list_instances": z$1.ZodObject<{
        instances: z$1.ZodArray<z$1.ZodObject<{
            generation: z$1.ZodString;
            instanceId: z$1.ZodString;
            label: z$1.ZodString;
        }, z$1.core.$strip>>;
    }, z$1.core.$strip>;
    "desktop.browser.list_tabs": z$1.ZodObject<{
        tabs: z$1.ZodArray<z$1.ZodObject<{
            control: z$1.ZodNullable<z$1.ZodObject<{
                controllerLabel: z$1.ZodString;
                expiresAt: z$1.ZodNumber;
                leaseId: z$1.ZodString;
            }, z$1.core.$strip>>;
            presentation: z$1.ZodEnum<{
                hidden: "hidden";
                reveal: "reveal";
            }>;
            profile: z$1.ZodDiscriminatedUnion<[z$1.ZodObject<{
                id: z$1.ZodString;
                kind: z$1.ZodLiteral<"automation">;
            }, z$1.core.$strip>, z$1.ZodObject<{
                kind: z$1.ZodLiteral<"personal">;
            }, z$1.core.$strip>], "kind">;
            tabId: z$1.ZodString;
            threadId: z$1.ZodString;
            title: z$1.ZodString;
            url: z$1.ZodString;
        }, z$1.core.$strip>>;
    }, z$1.core.$strip>;
    "desktop.browser.create_tab": z$1.ZodObject<{
        tab: z$1.ZodObject<{
            control: z$1.ZodNullable<z$1.ZodObject<{
                controllerLabel: z$1.ZodString;
                expiresAt: z$1.ZodNumber;
                leaseId: z$1.ZodString;
            }, z$1.core.$strip>>;
            presentation: z$1.ZodEnum<{
                hidden: "hidden";
                reveal: "reveal";
            }>;
            profile: z$1.ZodDiscriminatedUnion<[z$1.ZodObject<{
                id: z$1.ZodString;
                kind: z$1.ZodLiteral<"automation">;
            }, z$1.core.$strip>, z$1.ZodObject<{
                kind: z$1.ZodLiteral<"personal">;
            }, z$1.core.$strip>], "kind">;
            tabId: z$1.ZodString;
            threadId: z$1.ZodString;
            title: z$1.ZodString;
            url: z$1.ZodString;
        }, z$1.core.$strip>;
    }, z$1.core.$strip>;
    "desktop.browser.reveal_tab": z$1.ZodObject<{
        ok: z$1.ZodLiteral<true>;
    }, z$1.core.$strip>;
    "desktop.browser.close_tab": z$1.ZodObject<{
        ok: z$1.ZodLiteral<true>;
    }, z$1.core.$strip>;
    "desktop.browser.capture_tab": z$1.ZodObject<{
        base64: z$1.ZodString;
        height: z$1.ZodNumber;
        mimeType: z$1.ZodLiteral<"image/jpeg">;
        width: z$1.ZodNumber;
    }, z$1.core.$strip>;
    "desktop.browser.acquire_control": z$1.ZodObject<{
        lease: z$1.ZodObject<{
            controllerLabel: z$1.ZodString;
            expiresAt: z$1.ZodNumber;
            leaseId: z$1.ZodString;
        }, z$1.core.$strip>;
    }, z$1.core.$strip>;
    "desktop.browser.open_connection": z$1.ZodObject<{
        expiresAt: z$1.ZodNumber;
        wsEndpoint: z$1.ZodString;
    }, z$1.core.$strip>;
    "desktop.browser.release_control": z$1.ZodObject<{
        ok: z$1.ZodLiteral<true>;
    }, z$1.core.$strip>;
    "desktop.browser.list_import_sources": z$1.ZodObject<{
        sources: z$1.ZodArray<z$1.ZodObject<{
            icon: z$1.ZodOptional<z$1.ZodString>;
            id: z$1.ZodEnum<{
                arc: "arc";
                brave: "brave";
                chrome: "chrome";
                chromium: "chromium";
                edge: "edge";
                firefox: "firefox";
                helium: "helium";
                opera: "opera";
                safari: "safari";
                vivaldi: "vivaldi";
            }>;
            name: z$1.ZodString;
            profiles: z$1.ZodArray<z$1.ZodObject<{
                cookieCount: z$1.ZodOptional<z$1.ZodNumber>;
                directory: z$1.ZodString;
                name: z$1.ZodString;
            }, z$1.core.$strict>>;
            unavailable: z$1.ZodOptional<z$1.ZodEnum<{
                browserRunning: "browserRunning";
                keychainItemMissing: "keychainItemMissing";
                needsFullDiskAccess: "needsFullDiskAccess";
                needsKeychainApproval: "needsKeychainApproval";
                notInstalled: "notInstalled";
                unsupportedPlatform: "unsupportedPlatform";
            }>>;
        }, z$1.core.$strict>>;
    }, z$1.core.$strip>;
    "desktop.browser.import_cookies": z$1.ZodDiscriminatedUnion<[z$1.ZodObject<{
        imported: z$1.ZodNumber;
        ok: z$1.ZodLiteral<true>;
        skipped: z$1.ZodNumber;
        skippedDomains: z$1.ZodArray<z$1.ZodString>;
    }, z$1.core.$strict>, z$1.ZodObject<{
        ok: z$1.ZodLiteral<false>;
        reason: z$1.ZodEnum<{
            browserRunning: "browserRunning";
            keychainItemMissing: "keychainItemMissing";
            keychainUnavailable: "keychainUnavailable";
            needsFullDiskAccess: "needsFullDiskAccess";
            needsKeychainApproval: "needsKeychainApproval";
            notInstalled: "notInstalled";
            readFailed: "readFailed";
            unknownSource: "unknownSource";
            unknownSourceProfile: "unknownSourceProfile";
            unsupportedPlatform: "unsupportedPlatform";
        }>;
    }, z$1.core.$strict>], "ok">;
};
type DesktopBrowserCommand = z$1.infer<typeof desktopBrowserCommandSchema>;
type DesktopBrowserCommandType = DesktopBrowserCommand["type"];
type DesktopBrowserResult<T extends DesktopBrowserCommandType = DesktopBrowserCommandType> = z$1.infer<(typeof desktopBrowserResultSchemas)[T]>;
type DesktopBrowserInstance = z$1.infer<typeof desktopBrowserInstanceSchema>;

interface CreateFilePreviewResponse {
    baseUrl: string;
    expiresAtMs: number;
}
type HostFileReadResponse = Exclude<HostDaemonOnlineRpcResultByType["host.read_file"], {
    notModified: true;
}>;
type HostFileWriteResponse = HostDaemonOnlineRpcResultByType["host.write_file"];
type HostFileListResponse = HostDaemonOnlineRpcResultByType["host.list_files"];
type HostPathListResponse = HostDaemonOnlineRpcResultByType["host.list_paths"];
type HostMkdirResponse = HostDaemonOnlineRpcResultByType["host.mkdir"];
type HostMovePathResponse = HostDaemonOnlineRpcResultByType["host.move_path"];
type HostRemovePathResponse = HostDaemonOnlineRpcResultByType["host.remove_path"];

declare const hostDirectoryQuerySchema: z$1.ZodObject<{
    path: z$1.ZodOptional<z$1.ZodString>;
}, z$1.core.$strip>;
type HostDirectoryQuery = z$1.infer<typeof hostDirectoryQuerySchema>;
declare const hostDirectoryListingSchema: z$1.ZodObject<{
    directory: z$1.ZodString;
    entries: z$1.ZodArray<z$1.ZodObject<{
        kind: z$1.ZodEnum<{
            directory: "directory";
            file: "file";
        }>;
        name: z$1.ZodString;
        path: z$1.ZodString;
    }, z$1.core.$strip>>;
    parent: z$1.ZodNullable<z$1.ZodString>;
}, z$1.core.$strip>;
type HostDirectoryListing = z$1.infer<typeof hostDirectoryListingSchema>;
declare const hostCloneDefaultPathQuerySchema: z$1.ZodObject<{
    projectId: z$1.ZodString;
}, z$1.core.$strip>;
type HostCloneDefaultPathQuery = z$1.infer<typeof hostCloneDefaultPathQuerySchema>;
declare const hostCloneDefaultPathResponseSchema: z$1.ZodObject<{
    path: z$1.ZodString;
}, z$1.core.$strict>;
type HostCloneDefaultPathResponse = z$1.infer<typeof hostCloneDefaultPathResponseSchema>;
declare const createMachineRequestSchema: z$1.ZodObject<{
    inputs: z$1.ZodNullable<z$1.ZodType<JsonValue, unknown, z$1.core.$ZodTypeInternals<JsonValue, unknown>>>;
    key: z$1.ZodOptional<z$1.ZodString>;
    machineProviderId: z$1.ZodString;
}, z$1.core.$strict>;
type CreateMachineRequest = z$1.infer<typeof createMachineRequestSchema>;
declare const hostEnrollmentCommandResponseSchema: z$1.ZodNullable<z$1.ZodObject<{
    command: z$1.ZodString;
    expiresAt: z$1.ZodNumber;
}, z$1.core.$strip>>;
type HostEnrollmentCommandResponse = z$1.infer<typeof hostEnrollmentCommandResponseSchema>;
declare const createHostJoinCodeResponseSchema: z$1.ZodObject<{
    expiresAt: z$1.ZodNumber;
    hostId: z$1.ZodString;
    joinCode: z$1.ZodString;
}, z$1.core.$strip>;
type CreateHostJoinCodeResponse = z$1.infer<typeof createHostJoinCodeResponseSchema>;
declare const updateHostRequestSchema: z$1.ZodObject<{
    name: z$1.ZodString;
}, z$1.core.$strict>;
type UpdateHostRequest = z$1.infer<typeof updateHostRequestSchema>;
declare const hostActionResponseSchema: z$1.ZodObject<{
    ok: z$1.ZodLiteral<true>;
}, z$1.core.$strict>;
type HostActionResponse = z$1.infer<typeof hostActionResponseSchema>;
declare const hostRetryUpdateResponseSchema: z$1.ZodObject<{
    ok: z$1.ZodLiteral<true>;
}, z$1.core.$strict>;
type HostRetryUpdateResponse = z$1.infer<typeof hostRetryUpdateResponseSchema>;
type HostPathsExistRequest = PathsExistRequest;
type HostPathsExistResponse = PathsExistResponse;
declare const hostPickFolderRequestSchema: z$1.ZodObject<{
    clientHostId: z$1.ZodString;
}, z$1.core.$strict>;
type HostPickFolderRequest = z$1.infer<typeof hostPickFolderRequestSchema>;
type HostPickFolderResponse = PickFolderResponse;
type HostProviderCliStatusResponse = ProviderCliStatusResponse;
type HostProviderCliInstallRequest = ProviderCliInstallRequest;
type HostProviderCliInstallEvent = ProviderCliInstallEvent;

declare const pluginUpdateCheckEntrySchema: z$1.ZodObject<{
    blocked: z$1.ZodOptional<z$1.ZodObject<{
        reasons: z$1.ZodArray<z$1.ZodString>;
        version: z$1.ZodString;
    }, z$1.core.$strip>>;
    candidate: z$1.ZodOptional<z$1.ZodObject<{
        display: z$1.ZodString;
        version: z$1.ZodString;
    }, z$1.core.$strip>>;
    detail: z$1.ZodOptional<z$1.ZodString>;
    devMode: z$1.ZodOptional<z$1.ZodLiteral<true>>;
    id: z$1.ZodString;
    installed: z$1.ZodObject<{
        display: z$1.ZodString;
        version: z$1.ZodString;
    }, z$1.core.$strip>;
    outcome: z$1.ZodEnum<{
        "update-available": "update-available";
        current: "current";
        incompatible: "incompatible";
        pinned: "pinned";
        unavailable: "unavailable";
    }>;
}, z$1.core.$strip>;
type PluginUpdateCheckEntry = z$1.infer<typeof pluginUpdateCheckEntrySchema>;
declare const pluginApplyUpdateResultSchema: z$1.ZodObject<{
    applied: z$1.ZodBoolean;
    detail: z$1.ZodOptional<z$1.ZodString>;
    from: z$1.ZodObject<{
        display: z$1.ZodString;
        version: z$1.ZodString;
    }, z$1.core.$strip>;
    outcome: z$1.ZodEnum<{
        "rolled-back": "rolled-back";
        current: "current";
        updated: "updated";
    }>;
    to: z$1.ZodOptional<z$1.ZodObject<{
        display: z$1.ZodString;
        version: z$1.ZodString;
    }, z$1.core.$strip>>;
}, z$1.core.$strip>;
type PluginApplyUpdateResult$1 = z$1.infer<typeof pluginApplyUpdateResultSchema>;
declare const pluginSourceDetailSchema: z$1.ZodObject<{
    engines: z$1.ZodObject<{
        bb: z$1.ZodOptional<z$1.ZodString>;
        bbPluginSdk: z$1.ZodOptional<z$1.ZodString>;
    }, z$1.core.$strip>;
    history: z$1.ZodArray<z$1.ZodObject<{
        activatedAt: z$1.ZodNumber;
        version: z$1.ZodString;
    }, z$1.core.$strip>>;
    installedAt: z$1.ZodOptional<z$1.ZodNumber>;
    integrity: z$1.ZodOptional<z$1.ZodString>;
    range: z$1.ZodOptional<z$1.ZodString>;
    registry: z$1.ZodOptional<z$1.ZodString>;
    requested: z$1.ZodString;
    resolved: z$1.ZodString;
    resolvedTag: z$1.ZodOptional<z$1.ZodString>;
    subdirectory: z$1.ZodOptional<z$1.ZodString>;
    tagPrefix: z$1.ZodOptional<z$1.ZodString>;
}, z$1.core.$strip>;
type PluginSourceDetail = z$1.infer<typeof pluginSourceDetailSchema>;
declare const installedPluginSchema: z$1.ZodObject<{
    app: z$1.ZodObject<{
        bundle: z$1.ZodNullable<z$1.ZodObject<{
            compatible: z$1.ZodBoolean;
            cssUrl: z$1.ZodNullable<z$1.ZodString>;
            hash: z$1.ZodString;
            jsBytes: z$1.ZodNumber;
            jsUrl: z$1.ZodString;
            sdkMajor: z$1.ZodNumber;
            sdkVersion: z$1.ZodString;
        }, z$1.core.$strip>>;
        hasApp: z$1.ZodBoolean;
    }, z$1.core.$strip>;
    capabilities: z$1.ZodDefault<z$1.ZodArray<z$1.ZodObject<{
        detail: z$1.ZodNullable<z$1.ZodString>;
        id: z$1.ZodString;
        kind: z$1.ZodEnum<{
            "agent-tool": "agent-tool";
            "thread-integration": "thread-integration";
            skill: "skill";
            theme: "theme";
        }>;
        label: z$1.ZodString;
    }, z$1.core.$strip>>>;
    catalogEntryId: z$1.ZodOptional<z$1.ZodString>;
    catalogMarketplaceName: z$1.ZodOptional<z$1.ZodString>;
    category: z$1.ZodOptional<z$1.ZodString>;
    categoryId: z$1.ZodOptional<z$1.ZodString>;
    cliCommand: z$1.ZodNullable<z$1.ZodObject<{
        name: z$1.ZodString;
        summary: z$1.ZodString;
    }, z$1.core.$strip>>;
    collections: z$1.ZodArray<z$1.ZodObject<{
        id: z$1.ZodString;
        rank: z$1.ZodNumber;
    }, z$1.core.$strip>>;
    description: z$1.ZodNullable<z$1.ZodString>;
    enabled: z$1.ZodBoolean;
    handlerStats: z$1.ZodObject<{
        count: z$1.ZodNumber;
        errorCount: z$1.ZodNumber;
        maxMs: z$1.ZodNumber;
        totalMs: z$1.ZodNumber;
    }, z$1.core.$strip>;
    hasSettings: z$1.ZodBoolean;
    icon: z$1.ZodNullable<z$1.ZodString>;
    iconUrl: z$1.ZodNullable<z$1.ZodString>;
    icons: z$1.ZodRecord<z$1.ZodString, z$1.ZodString>;
    id: z$1.ZodString;
    isOrphanedBuiltin: z$1.ZodBoolean;
    logoDarkUrl: z$1.ZodNullable<z$1.ZodString>;
    logoUrl: z$1.ZodNullable<z$1.ZodString>;
    name: z$1.ZodNullable<z$1.ZodString>;
    provenance: z$1.ZodEnum<{
        builtin: "builtin";
        catalog: "catalog";
        direct: "direct";
    }>;
    providerIds: z$1.ZodArray<z$1.ZodString>;
    publishedAt: z$1.ZodOptional<z$1.ZodISODateTime>;
    publisherLabel: z$1.ZodDefault<z$1.ZodNullable<z$1.ZodString>>;
    rootDir: z$1.ZodString;
    schedules: z$1.ZodArray<z$1.ZodObject<{
        cron: z$1.ZodString;
        lastError: z$1.ZodNullable<z$1.ZodString>;
        lastRunAt: z$1.ZodNullable<z$1.ZodNumber>;
        lastStatus: z$1.ZodNullable<z$1.ZodEnum<{
            error: "error";
            ok: "ok";
            running: "running";
        }>>;
        name: z$1.ZodString;
        nextRunAt: z$1.ZodNumber;
    }, z$1.core.$strip>>;
    screenshots: z$1.ZodArray<z$1.ZodString>;
    services: z$1.ZodArray<z$1.ZodObject<{
        name: z$1.ZodString;
        state: z$1.ZodEnum<{
            backoff: "backoff";
            running: "running";
            stopped: "stopped";
        }>;
    }, z$1.core.$strip>>;
    source: z$1.ZodString;
    sourceDisplay: z$1.ZodString;
    status: z$1.ZodEnum<{
        "needs-configuration": "needs-configuration";
        degraded: "degraded";
        disabled: "disabled";
        error: "error";
        incompatible: "incompatible";
        missing: "missing";
        running: "running";
        starting: "starting";
    }>;
    statusDetail: z$1.ZodNullable<z$1.ZodString>;
    updateState: z$1.ZodObject<{
        availableVersion: z$1.ZodOptional<z$1.ZodString>;
        blockedReasons: z$1.ZodOptional<z$1.ZodArray<z$1.ZodString>>;
        blockedVersion: z$1.ZodOptional<z$1.ZodString>;
        detail: z$1.ZodOptional<z$1.ZodString>;
        lastCheckAt: z$1.ZodOptional<z$1.ZodNumber>;
        lastFailure: z$1.ZodOptional<z$1.ZodObject<{
            at: z$1.ZodNumber;
            detail: z$1.ZodString;
            version: z$1.ZodString;
        }, z$1.core.$strip>>;
        outcome: z$1.ZodOptional<z$1.ZodEnum<{
            "update-available": "update-available";
            current: "current";
            incompatible: "incompatible";
            pinned: "pinned";
            unavailable: "unavailable";
        }>>;
    }, z$1.core.$strip>;
    updatedAt: z$1.ZodOptional<z$1.ZodISODateTime>;
    version: z$1.ZodString;
}, z$1.core.$strip>;
type InstalledPlugin = z$1.infer<typeof installedPluginSchema>;
declare const pluginListResponseSchema: z$1.ZodObject<{
    plugins: z$1.ZodArray<z$1.ZodObject<{
        app: z$1.ZodObject<{
            bundle: z$1.ZodNullable<z$1.ZodObject<{
                compatible: z$1.ZodBoolean;
                cssUrl: z$1.ZodNullable<z$1.ZodString>;
                hash: z$1.ZodString;
                jsBytes: z$1.ZodNumber;
                jsUrl: z$1.ZodString;
                sdkMajor: z$1.ZodNumber;
                sdkVersion: z$1.ZodString;
            }, z$1.core.$strip>>;
            hasApp: z$1.ZodBoolean;
        }, z$1.core.$strip>;
        capabilities: z$1.ZodDefault<z$1.ZodArray<z$1.ZodObject<{
            detail: z$1.ZodNullable<z$1.ZodString>;
            id: z$1.ZodString;
            kind: z$1.ZodEnum<{
                "agent-tool": "agent-tool";
                "thread-integration": "thread-integration";
                skill: "skill";
                theme: "theme";
            }>;
            label: z$1.ZodString;
        }, z$1.core.$strip>>>;
        catalogEntryId: z$1.ZodOptional<z$1.ZodString>;
        catalogMarketplaceName: z$1.ZodOptional<z$1.ZodString>;
        category: z$1.ZodOptional<z$1.ZodString>;
        categoryId: z$1.ZodOptional<z$1.ZodString>;
        cliCommand: z$1.ZodNullable<z$1.ZodObject<{
            name: z$1.ZodString;
            summary: z$1.ZodString;
        }, z$1.core.$strip>>;
        collections: z$1.ZodArray<z$1.ZodObject<{
            id: z$1.ZodString;
            rank: z$1.ZodNumber;
        }, z$1.core.$strip>>;
        description: z$1.ZodNullable<z$1.ZodString>;
        enabled: z$1.ZodBoolean;
        handlerStats: z$1.ZodObject<{
            count: z$1.ZodNumber;
            errorCount: z$1.ZodNumber;
            maxMs: z$1.ZodNumber;
            totalMs: z$1.ZodNumber;
        }, z$1.core.$strip>;
        hasSettings: z$1.ZodBoolean;
        icon: z$1.ZodNullable<z$1.ZodString>;
        iconUrl: z$1.ZodNullable<z$1.ZodString>;
        icons: z$1.ZodRecord<z$1.ZodString, z$1.ZodString>;
        id: z$1.ZodString;
        isOrphanedBuiltin: z$1.ZodBoolean;
        logoDarkUrl: z$1.ZodNullable<z$1.ZodString>;
        logoUrl: z$1.ZodNullable<z$1.ZodString>;
        name: z$1.ZodNullable<z$1.ZodString>;
        provenance: z$1.ZodEnum<{
            builtin: "builtin";
            catalog: "catalog";
            direct: "direct";
        }>;
        providerIds: z$1.ZodArray<z$1.ZodString>;
        publishedAt: z$1.ZodOptional<z$1.ZodISODateTime>;
        publisherLabel: z$1.ZodDefault<z$1.ZodNullable<z$1.ZodString>>;
        rootDir: z$1.ZodString;
        schedules: z$1.ZodArray<z$1.ZodObject<{
            cron: z$1.ZodString;
            lastError: z$1.ZodNullable<z$1.ZodString>;
            lastRunAt: z$1.ZodNullable<z$1.ZodNumber>;
            lastStatus: z$1.ZodNullable<z$1.ZodEnum<{
                error: "error";
                ok: "ok";
                running: "running";
            }>>;
            name: z$1.ZodString;
            nextRunAt: z$1.ZodNumber;
        }, z$1.core.$strip>>;
        screenshots: z$1.ZodArray<z$1.ZodString>;
        services: z$1.ZodArray<z$1.ZodObject<{
            name: z$1.ZodString;
            state: z$1.ZodEnum<{
                backoff: "backoff";
                running: "running";
                stopped: "stopped";
            }>;
        }, z$1.core.$strip>>;
        source: z$1.ZodString;
        sourceDisplay: z$1.ZodString;
        status: z$1.ZodEnum<{
            "needs-configuration": "needs-configuration";
            degraded: "degraded";
            disabled: "disabled";
            error: "error";
            incompatible: "incompatible";
            missing: "missing";
            running: "running";
            starting: "starting";
        }>;
        statusDetail: z$1.ZodNullable<z$1.ZodString>;
        updateState: z$1.ZodObject<{
            availableVersion: z$1.ZodOptional<z$1.ZodString>;
            blockedReasons: z$1.ZodOptional<z$1.ZodArray<z$1.ZodString>>;
            blockedVersion: z$1.ZodOptional<z$1.ZodString>;
            detail: z$1.ZodOptional<z$1.ZodString>;
            lastCheckAt: z$1.ZodOptional<z$1.ZodNumber>;
            lastFailure: z$1.ZodOptional<z$1.ZodObject<{
                at: z$1.ZodNumber;
                detail: z$1.ZodString;
                version: z$1.ZodString;
            }, z$1.core.$strip>>;
            outcome: z$1.ZodOptional<z$1.ZodEnum<{
                "update-available": "update-available";
                current: "current";
                incompatible: "incompatible";
                pinned: "pinned";
                unavailable: "unavailable";
            }>>;
        }, z$1.core.$strip>;
        updatedAt: z$1.ZodOptional<z$1.ZodISODateTime>;
        version: z$1.ZodString;
    }, z$1.core.$strip>>;
}, z$1.core.$strip>;
type PluginListResponse = z$1.infer<typeof pluginListResponseSchema>;
declare const pluginReloadResponseSchema: z$1.ZodObject<{
    ok: z$1.ZodLiteral<true>;
    plugins: z$1.ZodArray<z$1.ZodObject<{
        app: z$1.ZodObject<{
            bundle: z$1.ZodNullable<z$1.ZodObject<{
                compatible: z$1.ZodBoolean;
                cssUrl: z$1.ZodNullable<z$1.ZodString>;
                hash: z$1.ZodString;
                jsBytes: z$1.ZodNumber;
                jsUrl: z$1.ZodString;
                sdkMajor: z$1.ZodNumber;
                sdkVersion: z$1.ZodString;
            }, z$1.core.$strip>>;
            hasApp: z$1.ZodBoolean;
        }, z$1.core.$strip>;
        capabilities: z$1.ZodDefault<z$1.ZodArray<z$1.ZodObject<{
            detail: z$1.ZodNullable<z$1.ZodString>;
            id: z$1.ZodString;
            kind: z$1.ZodEnum<{
                "agent-tool": "agent-tool";
                "thread-integration": "thread-integration";
                skill: "skill";
                theme: "theme";
            }>;
            label: z$1.ZodString;
        }, z$1.core.$strip>>>;
        catalogEntryId: z$1.ZodOptional<z$1.ZodString>;
        catalogMarketplaceName: z$1.ZodOptional<z$1.ZodString>;
        category: z$1.ZodOptional<z$1.ZodString>;
        categoryId: z$1.ZodOptional<z$1.ZodString>;
        cliCommand: z$1.ZodNullable<z$1.ZodObject<{
            name: z$1.ZodString;
            summary: z$1.ZodString;
        }, z$1.core.$strip>>;
        collections: z$1.ZodArray<z$1.ZodObject<{
            id: z$1.ZodString;
            rank: z$1.ZodNumber;
        }, z$1.core.$strip>>;
        description: z$1.ZodNullable<z$1.ZodString>;
        enabled: z$1.ZodBoolean;
        handlerStats: z$1.ZodObject<{
            count: z$1.ZodNumber;
            errorCount: z$1.ZodNumber;
            maxMs: z$1.ZodNumber;
            totalMs: z$1.ZodNumber;
        }, z$1.core.$strip>;
        hasSettings: z$1.ZodBoolean;
        icon: z$1.ZodNullable<z$1.ZodString>;
        iconUrl: z$1.ZodNullable<z$1.ZodString>;
        icons: z$1.ZodRecord<z$1.ZodString, z$1.ZodString>;
        id: z$1.ZodString;
        isOrphanedBuiltin: z$1.ZodBoolean;
        logoDarkUrl: z$1.ZodNullable<z$1.ZodString>;
        logoUrl: z$1.ZodNullable<z$1.ZodString>;
        name: z$1.ZodNullable<z$1.ZodString>;
        provenance: z$1.ZodEnum<{
            builtin: "builtin";
            catalog: "catalog";
            direct: "direct";
        }>;
        providerIds: z$1.ZodArray<z$1.ZodString>;
        publishedAt: z$1.ZodOptional<z$1.ZodISODateTime>;
        publisherLabel: z$1.ZodDefault<z$1.ZodNullable<z$1.ZodString>>;
        rootDir: z$1.ZodString;
        schedules: z$1.ZodArray<z$1.ZodObject<{
            cron: z$1.ZodString;
            lastError: z$1.ZodNullable<z$1.ZodString>;
            lastRunAt: z$1.ZodNullable<z$1.ZodNumber>;
            lastStatus: z$1.ZodNullable<z$1.ZodEnum<{
                error: "error";
                ok: "ok";
                running: "running";
            }>>;
            name: z$1.ZodString;
            nextRunAt: z$1.ZodNumber;
        }, z$1.core.$strip>>;
        screenshots: z$1.ZodArray<z$1.ZodString>;
        services: z$1.ZodArray<z$1.ZodObject<{
            name: z$1.ZodString;
            state: z$1.ZodEnum<{
                backoff: "backoff";
                running: "running";
                stopped: "stopped";
            }>;
        }, z$1.core.$strip>>;
        source: z$1.ZodString;
        sourceDisplay: z$1.ZodString;
        status: z$1.ZodEnum<{
            "needs-configuration": "needs-configuration";
            degraded: "degraded";
            disabled: "disabled";
            error: "error";
            incompatible: "incompatible";
            missing: "missing";
            running: "running";
            starting: "starting";
        }>;
        statusDetail: z$1.ZodNullable<z$1.ZodString>;
        updateState: z$1.ZodObject<{
            availableVersion: z$1.ZodOptional<z$1.ZodString>;
            blockedReasons: z$1.ZodOptional<z$1.ZodArray<z$1.ZodString>>;
            blockedVersion: z$1.ZodOptional<z$1.ZodString>;
            detail: z$1.ZodOptional<z$1.ZodString>;
            lastCheckAt: z$1.ZodOptional<z$1.ZodNumber>;
            lastFailure: z$1.ZodOptional<z$1.ZodObject<{
                at: z$1.ZodNumber;
                detail: z$1.ZodString;
                version: z$1.ZodString;
            }, z$1.core.$strip>>;
            outcome: z$1.ZodOptional<z$1.ZodEnum<{
                "update-available": "update-available";
                current: "current";
                incompatible: "incompatible";
                pinned: "pinned";
                unavailable: "unavailable";
            }>>;
        }, z$1.core.$strip>;
        updatedAt: z$1.ZodOptional<z$1.ZodISODateTime>;
        version: z$1.ZodString;
    }, z$1.core.$strip>>;
}, z$1.core.$strip>;
type PluginReloadResponse = z$1.infer<typeof pluginReloadResponseSchema>;
declare const pluginRemoveResponseSchema: z$1.ZodObject<{
    ok: z$1.ZodLiteral<true>;
}, z$1.core.$strip>;
type PluginRemoveResponse = z$1.infer<typeof pluginRemoveResponseSchema>;
declare const pluginSettingsResponseSchema: z$1.ZodObject<{
    ok: z$1.ZodLiteral<true>;
    schema: z$1.ZodRecord<z$1.ZodString, z$1.ZodDiscriminatedUnion<[z$1.ZodObject<{
        default: z$1.ZodOptional<z$1.ZodString>;
        description: z$1.ZodOptional<z$1.ZodString>;
        experimental_multiline: z$1.ZodOptional<z$1.ZodBoolean>;
        label: z$1.ZodString;
        secret: z$1.ZodOptional<z$1.ZodLiteral<true>>;
        type: z$1.ZodLiteral<"string">;
    }, z$1.core.$strict>, z$1.ZodObject<{
        default: z$1.ZodOptional<z$1.ZodBoolean>;
        description: z$1.ZodOptional<z$1.ZodString>;
        label: z$1.ZodString;
        type: z$1.ZodLiteral<"boolean">;
    }, z$1.core.$strict>, z$1.ZodObject<{
        default: z$1.ZodOptional<z$1.ZodNumber>;
        description: z$1.ZodOptional<z$1.ZodString>;
        label: z$1.ZodString;
        type: z$1.ZodLiteral<"number">;
    }, z$1.core.$strict>, z$1.ZodObject<{
        default: z$1.ZodOptional<z$1.ZodString>;
        description: z$1.ZodOptional<z$1.ZodString>;
        label: z$1.ZodString;
        options: z$1.ZodArray<z$1.ZodString>;
        type: z$1.ZodLiteral<"select">;
    }, z$1.core.$strict>, z$1.ZodObject<{
        default: z$1.ZodOptional<z$1.ZodString>;
        description: z$1.ZodOptional<z$1.ZodString>;
        label: z$1.ZodString;
        type: z$1.ZodLiteral<"project">;
    }, z$1.core.$strict>], "type">>;
    values: z$1.ZodRecord<z$1.ZodString, z$1.ZodType<JsonValue, unknown, z$1.core.$ZodTypeInternals<JsonValue, unknown>>>;
}, z$1.core.$strip>;
type PluginSettingsResponse = z$1.infer<typeof pluginSettingsResponseSchema>;
declare const pluginTokenResponseSchema: z$1.ZodObject<{
    ok: z$1.ZodLiteral<true>;
    token: z$1.ZodString;
}, z$1.core.$strip>;
type PluginTokenResponse = z$1.infer<typeof pluginTokenResponseSchema>;
declare const pluginCatalogStatusSchema: z$1.ZodObject<{
    includedPluginCount: z$1.ZodNumber;
    optionalPluginCount: z$1.ZodNumber;
    pluginCount: z$1.ZodNumber;
}, z$1.core.$strip>;
type PluginCatalogStatus = z$1.infer<typeof pluginCatalogStatusSchema>;
declare const pluginCatalogSearchResponseSchema: z$1.ZodObject<{
    collections: z$1.ZodArray<z$1.ZodObject<{
        displayName: z$1.ZodString;
        id: z$1.ZodString;
        pluginIds: z$1.ZodArray<z$1.ZodString>;
    }, z$1.core.$strip>>;
    results: z$1.ZodArray<z$1.ZodObject<{
        author: z$1.ZodNullable<z$1.ZodObject<{
            github: z$1.ZodDefault<z$1.ZodNullable<z$1.ZodString>>;
            name: z$1.ZodString;
            url: z$1.ZodNullable<z$1.ZodString>;
        }, z$1.core.$strip>>;
        category: z$1.ZodOptional<z$1.ZodString>;
        categoryId: z$1.ZodOptional<z$1.ZodString>;
        collections: z$1.ZodDefault<z$1.ZodArray<z$1.ZodObject<{
            id: z$1.ZodString;
            rank: z$1.ZodNumber;
        }, z$1.core.$strip>>>;
        compatible: z$1.ZodBoolean;
        description: z$1.ZodString;
        displayName: z$1.ZodString;
        entryId: z$1.ZodString;
        icon: z$1.ZodNullable<z$1.ZodString>;
        iconTinted: z$1.ZodDefault<z$1.ZodBoolean>;
        iconUrl: z$1.ZodNullable<z$1.ZodString>;
        incompatibleReason: z$1.ZodNullable<z$1.ZodString>;
        installed: z$1.ZodBoolean;
        installs: z$1.ZodDefault<z$1.ZodNullable<z$1.ZodNumber>>;
        marketplace: z$1.ZodString;
        marketplaceDisplayName: z$1.ZodString;
        official: z$1.ZodBoolean;
        overview: z$1.ZodOptional<z$1.ZodString>;
        pluginId: z$1.ZodString;
        publishedAt: z$1.ZodOptional<z$1.ZodISODateTime>;
        publisherKey: z$1.ZodString;
        publisherLabel: z$1.ZodString;
        repositoryUrl: z$1.ZodDefault<z$1.ZodNullable<z$1.ZodString>>;
        screenshots: z$1.ZodDefault<z$1.ZodArray<z$1.ZodString>>;
        source: z$1.ZodString;
        updatedAt: z$1.ZodOptional<z$1.ZodISODateTime>;
    }, z$1.core.$strip>>;
}, z$1.core.$strip>;
type PluginCatalogSearchResponse = z$1.infer<typeof pluginCatalogSearchResponseSchema>;
declare const pluginCatalogResolvedSourceSchema: z$1.ZodDiscriminatedUnion<[z$1.ZodObject<{
    kind: z$1.ZodLiteral<"npm">;
    package: z$1.ZodString;
    range: z$1.ZodOptional<z$1.ZodString>;
    registry: z$1.ZodOptional<z$1.ZodString>;
    resolvedIntegrity: z$1.ZodOptional<z$1.ZodString>;
    resolvedVersion: z$1.ZodOptional<z$1.ZodString>;
    tag: z$1.ZodOptional<z$1.ZodString>;
    unresolvedReason: z$1.ZodOptional<z$1.ZodString>;
}, z$1.core.$strict>, z$1.ZodObject<{
    kind: z$1.ZodLiteral<"git">;
    range: z$1.ZodOptional<z$1.ZodString>;
    ref: z$1.ZodOptional<z$1.ZodString>;
    resolvedCommit: z$1.ZodOptional<z$1.ZodString>;
    resolvedTag: z$1.ZodOptional<z$1.ZodString>;
    subdir: z$1.ZodOptional<z$1.ZodString>;
    tagPrefix: z$1.ZodOptional<z$1.ZodString>;
    unresolvedReason: z$1.ZodOptional<z$1.ZodString>;
    url: z$1.ZodString;
}, z$1.core.$strict>], "kind">;
type PluginCatalogResolvedSource = z$1.infer<typeof pluginCatalogResolvedSourceSchema>;
declare const pluginCatalogInstallPlanSchema: z$1.ZodDiscriminatedUnion<[z$1.ZodObject<{
    compatible: z$1.ZodBoolean;
    displayName: z$1.ZodString;
    entryId: z$1.ZodString;
    incompatibleReason: z$1.ZodNullable<z$1.ZodString>;
    kind: z$1.ZodLiteral<"bundled">;
    pluginId: z$1.ZodString;
    source: z$1.ZodString;
}, z$1.core.$strip>, z$1.ZodObject<{
    author: z$1.ZodObject<{
        github: z$1.ZodDefault<z$1.ZodNullable<z$1.ZodString>>;
        name: z$1.ZodString;
        url: z$1.ZodNullable<z$1.ZodString>;
    }, z$1.core.$strip>;
    compatible: z$1.ZodBoolean;
    displayName: z$1.ZodString;
    entryId: z$1.ZodString;
    incompatibleReason: z$1.ZodNullable<z$1.ZodString>;
    kind: z$1.ZodLiteral<"marketplace">;
    marketplace: z$1.ZodString;
    marketplaceDisplayName: z$1.ZodString;
    official: z$1.ZodBoolean;
    pluginId: z$1.ZodString;
    resolvedSource: z$1.ZodDiscriminatedUnion<[z$1.ZodObject<{
        kind: z$1.ZodLiteral<"npm">;
        package: z$1.ZodString;
        range: z$1.ZodOptional<z$1.ZodString>;
        registry: z$1.ZodOptional<z$1.ZodString>;
        resolvedIntegrity: z$1.ZodOptional<z$1.ZodString>;
        resolvedVersion: z$1.ZodOptional<z$1.ZodString>;
        tag: z$1.ZodOptional<z$1.ZodString>;
        unresolvedReason: z$1.ZodOptional<z$1.ZodString>;
    }, z$1.core.$strict>, z$1.ZodObject<{
        kind: z$1.ZodLiteral<"git">;
        range: z$1.ZodOptional<z$1.ZodString>;
        ref: z$1.ZodOptional<z$1.ZodString>;
        resolvedCommit: z$1.ZodOptional<z$1.ZodString>;
        resolvedTag: z$1.ZodOptional<z$1.ZodString>;
        subdir: z$1.ZodOptional<z$1.ZodString>;
        tagPrefix: z$1.ZodOptional<z$1.ZodString>;
        unresolvedReason: z$1.ZodOptional<z$1.ZodString>;
        url: z$1.ZodString;
    }, z$1.core.$strict>], "kind">;
    source: z$1.ZodString;
}, z$1.core.$strip>], "kind">;
type PluginCatalogInstallPlan = z$1.infer<typeof pluginCatalogInstallPlanSchema>;
declare const pluginMarketplaceSchema: z$1.ZodObject<{
    description: z$1.ZodNullable<z$1.ZodString>;
    displayName: z$1.ZodString;
    entryCount: z$1.ZodNumber;
    lastAttemptAt: z$1.ZodNullable<z$1.ZodNumber>;
    lastError: z$1.ZodNullable<z$1.ZodString>;
    lastRefreshAt: z$1.ZodNullable<z$1.ZodNumber>;
    name: z$1.ZodString;
    official: z$1.ZodBoolean;
    resolvedCommit: z$1.ZodNullable<z$1.ZodString>;
    source: z$1.ZodString;
    sourceKind: z$1.ZodEnum<{
        git: "git";
        https: "https";
        path: "path";
    }>;
}, z$1.core.$strip>;
type PluginMarketplace = z$1.infer<typeof pluginMarketplaceSchema>;
declare const pluginMarketplaceRefreshResultSchema: z$1.ZodObject<{
    error: z$1.ZodNullable<z$1.ZodString>;
    marketplace: z$1.ZodObject<{
        description: z$1.ZodNullable<z$1.ZodString>;
        displayName: z$1.ZodString;
        entryCount: z$1.ZodNumber;
        lastAttemptAt: z$1.ZodNullable<z$1.ZodNumber>;
        lastError: z$1.ZodNullable<z$1.ZodString>;
        lastRefreshAt: z$1.ZodNullable<z$1.ZodNumber>;
        name: z$1.ZodString;
        official: z$1.ZodBoolean;
        resolvedCommit: z$1.ZodNullable<z$1.ZodString>;
        source: z$1.ZodString;
        sourceKind: z$1.ZodEnum<{
            git: "git";
            https: "https";
            path: "path";
        }>;
    }, z$1.core.$strip>;
    name: z$1.ZodString;
    ok: z$1.ZodBoolean;
}, z$1.core.$strip>;
type PluginMarketplaceRefreshResult$1 = z$1.infer<typeof pluginMarketplaceRefreshResultSchema>;
declare const pluginRpcDiscoveryQuerySchema: z$1.ZodObject<{
    method: z$1.ZodOptional<z$1.ZodString>;
    pluginId: z$1.ZodOptional<z$1.ZodString>;
}, z$1.core.$strip>;
type PluginRpcDiscoveryQuery = z$1.infer<typeof pluginRpcDiscoveryQuerySchema>;
declare const publishedPluginRpcMethodSchema: z$1.ZodObject<{
    displayName: z$1.ZodString;
    inputSchema: z$1.ZodRecord<z$1.ZodString, z$1.ZodType<JsonValue, unknown, z$1.core.$ZodTypeInternals<JsonValue, unknown>>>;
    method: z$1.ZodString;
    methodDescription: z$1.ZodNullable<z$1.ZodString>;
    outputSchema: z$1.ZodRecord<z$1.ZodString, z$1.ZodType<JsonValue, unknown, z$1.core.$ZodTypeInternals<JsonValue, unknown>>>;
    pluginId: z$1.ZodString;
    registrationDescription: z$1.ZodNullable<z$1.ZodString>;
}, z$1.core.$strip>;
type PublishedPluginRpcMethod = z$1.infer<typeof publishedPluginRpcMethodSchema>;

declare const machineEnvironmentReplaceSchema: z$1.ZodObject<{
    variables: z$1.ZodArray<z$1.ZodObject<{
        name: z$1.ZodString;
        note: z$1.ZodDefault<z$1.ZodNullable<z$1.ZodString>>;
        value: z$1.ZodNullable<z$1.ZodString>;
    }, z$1.core.$strict>>;
}, z$1.core.$strict>;
type MachineEnvironmentReplace = z$1.infer<typeof machineEnvironmentReplaceSchema>;
declare const systemExecutionOptionsResponseSchema: z$1.ZodObject<{
    modelLoadError: z$1.ZodNullable<z$1.ZodObject<{
        code: z$1.ZodEnum<{
            auth_required: "auth_required";
            failed: "failed";
            missing_executable: "missing_executable";
            provider_unavailable: "provider_unavailable";
            timeout: "timeout";
        }>;
        providerId: z$1.ZodString;
    }, z$1.core.$strip>>;
    models: z$1.ZodArray<z$1.ZodObject<{
        defaultReasoningEffort: z$1.ZodEnum<{
            high: "high";
            low: "low";
            max: "max";
            medium: "medium";
            none: "none";
            ultra: "ultra";
            ultracode: "ultracode";
            xhigh: "xhigh";
        }>;
        description: z$1.ZodString;
        displayName: z$1.ZodString;
        id: z$1.ZodString;
        isDefault: z$1.ZodBoolean;
        model: z$1.ZodString;
        routeProviderId: z$1.ZodOptional<z$1.ZodString>;
        supportedReasoningEfforts: z$1.ZodArray<z$1.ZodObject<{
            description: z$1.ZodString;
            reasoningEffort: z$1.ZodEnum<{
                high: "high";
                low: "low";
                max: "max";
                medium: "medium";
                none: "none";
                ultra: "ultra";
                ultracode: "ultracode";
                xhigh: "xhigh";
            }>;
        }, z$1.core.$strip>>;
    }, z$1.core.$strip>>;
    permissionCeiling: z$1.ZodEnum<{
        "accept-edits": "accept-edits";
        auto: "auto";
        full: "full";
    }>;
    providers: z$1.ZodArray<z$1.ZodObject<{
        available: z$1.ZodBoolean;
        capabilities: z$1.ZodObject<{
            modelCatalogScope: z$1.ZodEnum<{
                host: "host";
                workspace: "workspace";
            }>;
            permissionModes: z$1.ZodArray<z$1.ZodEnum<{
                "accept-edits": "accept-edits";
                auto: "auto";
                full: "full";
            }>>;
            supportsFork: z$1.ZodBoolean;
            supportsNativeUserQuestion: z$1.ZodBoolean;
            supportsServiceTier: z$1.ZodBoolean;
            supportsSessionRewind: z$1.ZodBoolean;
            supportsThreadArchive: z$1.ZodBoolean;
            supportsThreadRename: z$1.ZodBoolean;
        }, z$1.core.$strip>;
        completedTurnDisplay: z$1.ZodEnum<{
            collapse: "collapse";
            flat: "flat";
        }>;
        composerActions: z$1.ZodArray<z$1.ZodDiscriminatedUnion<[z$1.ZodObject<{
            kind: z$1.ZodLiteral<"skills">;
            trigger: z$1.ZodEnum<{
                "/": "/";
                $: "$";
            }>;
        }, z$1.core.$strip>, z$1.ZodObject<{
            command: z$1.ZodObject<{
                name: z$1.ZodString;
                trailingText: z$1.ZodString;
                trigger: z$1.ZodEnum<{
                    "/": "/";
                    $: "$";
                }>;
            }, z$1.core.$strip>;
            kind: z$1.ZodLiteral<"plan">;
        }, z$1.core.$strip>, z$1.ZodObject<{
            command: z$1.ZodObject<{
                name: z$1.ZodString;
                trailingText: z$1.ZodString;
                trigger: z$1.ZodEnum<{
                    "/": "/";
                    $: "$";
                }>;
            }, z$1.core.$strip>;
            kind: z$1.ZodLiteral<"goal">;
        }, z$1.core.$strip>], "kind">>;
        displayName: z$1.ZodString;
        extensionKinds: z$1.ZodOptional<z$1.ZodRecord<z$1.ZodString & z$1.ZodType<`${string}/${string}`, string, z$1.core.$ZodTypeInternals<`${string}/${string}`, string>>, z$1.ZodObject<{
            item: z$1.ZodBoolean;
            state: z$1.ZodBoolean;
        }, z$1.core.$strip>>>;
        family: z$1.ZodOptional<z$1.ZodString>;
        icon: z$1.ZodOptional<z$1.ZodObject<{
            glyph: z$1.ZodString;
        }, z$1.core.$strip>>;
        id: z$1.ZodString;
        logoUrl: z$1.ZodNullable<z$1.ZodString>;
        maintenance: z$1.ZodObject<{
            health: z$1.ZodBoolean;
            installation: z$1.ZodBoolean;
            usage: z$1.ZodBoolean;
        }, z$1.core.$strip>;
        pluginId: z$1.ZodString;
        reasoningLevels: z$1.ZodOptional<z$1.ZodArray<z$1.ZodObject<{
            description: z$1.ZodOptional<z$1.ZodString>;
            id: z$1.ZodString;
            label: z$1.ZodString;
        }, z$1.core.$strip>>>;
        serviceTiers: z$1.ZodOptional<z$1.ZodArray<z$1.ZodObject<{
            description: z$1.ZodOptional<z$1.ZodString>;
            id: z$1.ZodString;
            label: z$1.ZodString;
        }, z$1.core.$strip>>>;
        strings: z$1.ZodOptional<z$1.ZodObject<{
            brandPrefix: z$1.ZodOptional<z$1.ZodString>;
            expiredHint: z$1.ZodString;
            iconTint: z$1.ZodOptional<z$1.ZodObject<{
                dark: z$1.ZodString;
                light: z$1.ZodString;
            }, z$1.core.$strip>>;
            installUrl: z$1.ZodString;
            planModeCopy: z$1.ZodOptional<z$1.ZodString>;
            signInHint: z$1.ZodString;
        }, z$1.core.$strip>>;
    }, z$1.core.$strip>>;
    selectedOnlyModels: z$1.ZodArray<z$1.ZodObject<{
        defaultReasoningEffort: z$1.ZodEnum<{
            high: "high";
            low: "low";
            max: "max";
            medium: "medium";
            none: "none";
            ultra: "ultra";
            ultracode: "ultracode";
            xhigh: "xhigh";
        }>;
        description: z$1.ZodString;
        displayName: z$1.ZodString;
        id: z$1.ZodString;
        isDefault: z$1.ZodBoolean;
        model: z$1.ZodString;
        routeProviderId: z$1.ZodOptional<z$1.ZodString>;
        supportedReasoningEfforts: z$1.ZodArray<z$1.ZodObject<{
            description: z$1.ZodString;
            reasoningEffort: z$1.ZodEnum<{
                high: "high";
                low: "low";
                max: "max";
                medium: "medium";
                none: "none";
                ultra: "ultra";
                ultracode: "ultracode";
                xhigh: "xhigh";
            }>;
        }, z$1.core.$strip>>;
    }, z$1.core.$strip>>;
}, z$1.core.$strip>;
type SystemExecutionOptionsResponse = z$1.infer<typeof systemExecutionOptionsResponseSchema>;
declare const systemProvidersQuerySchema: z$1.ZodObject<{
    capability: z$1.ZodOptional<z$1.ZodEnum<{
        usage: "usage";
    }>>;
    environmentId: z$1.ZodOptional<z$1.ZodString>;
    hostId: z$1.ZodOptional<z$1.ZodString>;
}, z$1.core.$strip>;
type SystemProvidersQuery = z$1.infer<typeof systemProvidersQuerySchema>;
declare const systemExecutionOptionsQuerySchema: z$1.ZodObject<{
    environmentId: z$1.ZodOptional<z$1.ZodString>;
    hostId: z$1.ZodOptional<z$1.ZodString>;
    providerId: z$1.ZodOptional<z$1.ZodString>;
}, z$1.core.$strip>;
type SystemExecutionOptionsQuery = z$1.infer<typeof systemExecutionOptionsQuerySchema>;
declare const systemUsageLimitsQuerySchema: z$1.ZodObject<{
    hostId: z$1.ZodOptional<z$1.ZodString>;
    providerId: z$1.ZodOptional<z$1.ZodString>;
}, z$1.core.$strip>;
type SystemUsageLimitsQuery = z$1.infer<typeof systemUsageLimitsQuerySchema>;
declare const systemVoiceTranscriptionResponseSchema: z$1.ZodObject<{
    text: z$1.ZodString;
}, z$1.core.$strip>;
type SystemVoiceTranscriptionResponse = z$1.infer<typeof systemVoiceTranscriptionResponseSchema>;
declare const systemProviderStatesResponseSchema: z$1.ZodObject<{
    providers: z$1.ZodArray<z$1.ZodObject<{
        accountEmail: z$1.ZodNullable<z$1.ZodString>;
        canInstall: z$1.ZodBoolean;
        canUpdate: z$1.ZodBoolean;
        displayName: z$1.ZodString;
        installedVersion: z$1.ZodNullable<z$1.ZodString>;
        loginCommand: z$1.ZodNullable<z$1.ZodString>;
        minimumSupportedVersion: z$1.ZodNullable<z$1.ZodString>;
        planLabel: z$1.ZodNullable<z$1.ZodString>;
        providerId: z$1.ZodString;
        status: z$1.ZodEnum<{
            expired: "expired";
            not_installed: "not_installed";
            ready: "ready";
            unauthenticated: "unauthenticated";
            unknown: "unknown";
            unsupported_version: "unsupported_version";
        }>;
        statusMessage: z$1.ZodNullable<z$1.ZodString>;
    }, z$1.core.$loose>>;
}, z$1.core.$strip>;
type SystemProviderStatesResponse = z$1.infer<typeof systemProviderStatesResponseSchema>;
declare const systemConfigResponseSchema: z$1.ZodObject<{
    aiServices: z$1.ZodObject<{
        inference: z$1.ZodString;
        inferenceFallback: z$1.ZodString;
        services: z$1.ZodArray<z$1.ZodObject<{
            displayName: z$1.ZodString;
            id: z$1.ZodString;
            kinds: z$1.ZodArray<z$1.ZodEnum<{
                inference: "inference";
                voice: "voice";
            }>>;
            pluginId: z$1.ZodString;
        }, z$1.core.$strip>>;
        transcription: z$1.ZodString;
    }, z$1.core.$strip>;
    appearance: z$1.ZodObject<{
        customCss: z$1.ZodNullable<z$1.ZodString>;
        faviconColor: z$1.ZodEnum<{
            blue: "blue";
            default: "default";
            green: "green";
            orange: "orange";
            pink: "pink";
            purple: "purple";
            red: "red";
            teal: "teal";
            yellow: "yellow";
        }>;
        resolvedCodeTheme: z$1.ZodDefault<z$1.ZodObject<{
            dark: z$1.ZodString;
            files: z$1.ZodRecord<z$1.ZodString, z$1.ZodType<JsonObject, unknown, z$1.core.$ZodTypeInternals<JsonObject, unknown>>>;
            light: z$1.ZodString;
        }, z$1.core.$strict>>;
        themeId: z$1.ZodString;
    }, z$1.core.$strip>;
    customThemes: z$1.ZodArray<z$1.ZodString>;
    dataDir: z$1.ZodString;
    defaultKeybindings: z$1.ZodArray<z$1.ZodObject<{
        command: z$1.ZodUnion<readonly [z$1.ZodEnum<{
            "app.back": "app.back";
            "browser.find": "browser.find";
            "browser.focusLocation": "browser.focusLocation";
            "browser.reload": "browser.reload";
            "composer.focus": "composer.focus";
            "diff.toggle": "diff.toggle";
            "file.quickOpen": "file.quickOpen";
            "logs.openServerDaemon": "logs.openServerDaemon";
            "modelPicker.cycleModel": "modelPicker.cycleModel";
            "modelPicker.cycleModelBackward": "modelPicker.cycleModelBackward";
            "modelPicker.cycleProvider": "modelPicker.cycleProvider";
            "modelPicker.cycleProviderBackward": "modelPicker.cycleProviderBackward";
            "modelPicker.cycleReasoning": "modelPicker.cycleReasoning";
            "modelPicker.cycleReasoningBackward": "modelPicker.cycleReasoningBackward";
            "modelPicker.toggle": "modelPicker.toggle";
            "notifications.open": "notifications.open";
            "palette.open": "palette.open";
            "pane.close": "pane.close";
            "pane.focus.1": "pane.focus.1";
            "pane.focus.2": "pane.focus.2";
            "pane.focus.3": "pane.focus.3";
            "pane.focus.4": "pane.focus.4";
            "pane.focus.5": "pane.focus.5";
            "pane.focus.6": "pane.focus.6";
            "pane.focus.7": "pane.focus.7";
            "pane.focus.8": "pane.focus.8";
            "pane.focus.down": "pane.focus.down";
            "pane.focus.left": "pane.focus.left";
            "pane.focus.next": "pane.focus.next";
            "pane.focus.previous": "pane.focus.previous";
            "pane.focus.right": "pane.focus.right";
            "pane.focus.up": "pane.focus.up";
            "pane.maximize.toggle": "pane.maximize.toggle";
            "panel.close": "panel.close";
            "panel.newTab": "panel.newTab";
            "panel.nextNewTabItem": "panel.nextNewTabItem";
            "panel.nextTab": "panel.nextTab";
            "panel.previousNewTabItem": "panel.previousNewTabItem";
            "panel.previousTab": "panel.previousTab";
            "panel.reopenClosedTab": "panel.reopenClosedTab";
            "panel.toggle": "panel.toggle";
            "question.select.1": "question.select.1";
            "question.select.2": "question.select.2";
            "question.select.3": "question.select.3";
            "question.select.4": "question.select.4";
            "question.select.5": "question.select.5";
            "question.select.6": "question.select.6";
            "question.select.7": "question.select.7";
            "question.select.8": "question.select.8";
            "question.select.9": "question.select.9";
            "settings.open": "settings.open";
            "settings.openServers": "settings.openServers";
            "sidebar.toggle": "sidebar.toggle";
            "terminal.open": "terminal.open";
            "thread.archive": "thread.archive";
            "thread.jump.1": "thread.jump.1";
            "thread.jump.2": "thread.jump.2";
            "thread.jump.3": "thread.jump.3";
            "thread.jump.4": "thread.jump.4";
            "thread.jump.5": "thread.jump.5";
            "thread.jump.6": "thread.jump.6";
            "thread.jump.7": "thread.jump.7";
            "thread.jump.8": "thread.jump.8";
            "thread.jump.9": "thread.jump.9";
            "thread.new": "thread.new";
            "thread.next": "thread.next";
            "thread.previous": "thread.previous";
            "thread.rename": "thread.rename";
            "thread.search": "thread.search";
            "window.new": "window.new";
            "workspace.openPreferred": "workspace.openPreferred";
        }>, z$1.ZodTemplateLiteral<`plugin:${string}/${string}`>]>;
        desktopOnly: z$1.ZodBoolean;
        shortcut: z$1.ZodNullable<z$1.ZodObject<{
            alt: z$1.ZodBoolean;
            control: z$1.ZodBoolean;
            key: z$1.ZodString;
            meta: z$1.ZodBoolean;
            mod: z$1.ZodBoolean;
            shift: z$1.ZodBoolean;
        }, z$1.core.$strict>>;
        when: z$1.ZodObject<{
            all: z$1.ZodArray<z$1.ZodEnum<{
                browserFocus: "browserFocus";
                editableFocus: "editableFocus";
                macPlatform: "macPlatform";
                mainSurface: "mainSurface";
                modalOpen: "modalOpen";
                modelPickerOpen: "modelPickerOpen";
                promptAvailable: "promptAvailable";
                questionOpen: "questionOpen";
                splitActive: "splitActive";
                terminalFocus: "terminalFocus";
                webSurface: "webSurface";
            }>>;
            none: z$1.ZodArray<z$1.ZodEnum<{
                browserFocus: "browserFocus";
                editableFocus: "editableFocus";
                macPlatform: "macPlatform";
                mainSurface: "mainSurface";
                modalOpen: "modalOpen";
                modelPickerOpen: "modelPickerOpen";
                promptAvailable: "promptAvailable";
                questionOpen: "questionOpen";
                splitActive: "splitActive";
                terminalFocus: "terminalFocus";
                webSurface: "webSurface";
            }>>;
        }, z$1.core.$strict>;
    }, z$1.core.$strict>>;
    experiments: z$1.ZodRecord<z$1.ZodEnum<{
        changelogPreview: "changelogPreview";
        mobileApp: "mobileApp";
        multiMachinePicker: "multiMachinePicker";
        serverMove: "serverMove";
        sidebarProgressiveDisclosure: "sidebarProgressiveDisclosure";
        timelineWindowing: "timelineWindowing";
    }>, z$1.ZodBoolean>;
    featureFlags: z$1.ZodObject<{
        placeholder: z$1.ZodBoolean;
        timelineWindowEventBudget: z$1.ZodNumber;
    }, z$1.core.$strip>;
    generalSettings: z$1.ZodObject<{
        defaultMachineAccess: z$1.ZodNullable<z$1.ZodString>;
        defaultProviderId: z$1.ZodNullable<z$1.ZodString>;
        machineGitCredentialsEnabled: z$1.ZodBoolean;
        machineServerUrl: z$1.ZodNullable<z$1.ZodString>;
        managedBranchPrefix: z$1.ZodString;
        providerCompletedTurnDisplay: z$1.ZodRecord<z$1.ZodString, z$1.ZodEnum<{
            collapse: "collapse";
            flat: "flat";
        }>>;
        providerOrder: z$1.ZodArray<z$1.ZodString>;
        showDiagnosticEvents: z$1.ZodBoolean;
        showKeyboardHints: z$1.ZodBoolean;
        showUnhandledProviderEvents: z$1.ZodOptional<z$1.ZodBoolean>;
        steerActiveThreadOnEnter: z$1.ZodBoolean;
        streamerMode: z$1.ZodBoolean;
        telemetryEnabled: z$1.ZodBoolean;
    }, z$1.core.$strict>;
    hostDaemonPort: z$1.ZodNullable<z$1.ZodNumber>;
    keybindingOverrides: z$1.ZodArray<z$1.ZodObject<{
        command: z$1.ZodUnion<readonly [z$1.ZodEnum<{
            "app.back": "app.back";
            "browser.find": "browser.find";
            "browser.focusLocation": "browser.focusLocation";
            "browser.reload": "browser.reload";
            "composer.focus": "composer.focus";
            "diff.toggle": "diff.toggle";
            "file.quickOpen": "file.quickOpen";
            "logs.openServerDaemon": "logs.openServerDaemon";
            "modelPicker.cycleModel": "modelPicker.cycleModel";
            "modelPicker.cycleModelBackward": "modelPicker.cycleModelBackward";
            "modelPicker.cycleProvider": "modelPicker.cycleProvider";
            "modelPicker.cycleProviderBackward": "modelPicker.cycleProviderBackward";
            "modelPicker.cycleReasoning": "modelPicker.cycleReasoning";
            "modelPicker.cycleReasoningBackward": "modelPicker.cycleReasoningBackward";
            "modelPicker.toggle": "modelPicker.toggle";
            "notifications.open": "notifications.open";
            "palette.open": "palette.open";
            "pane.close": "pane.close";
            "pane.focus.1": "pane.focus.1";
            "pane.focus.2": "pane.focus.2";
            "pane.focus.3": "pane.focus.3";
            "pane.focus.4": "pane.focus.4";
            "pane.focus.5": "pane.focus.5";
            "pane.focus.6": "pane.focus.6";
            "pane.focus.7": "pane.focus.7";
            "pane.focus.8": "pane.focus.8";
            "pane.focus.down": "pane.focus.down";
            "pane.focus.left": "pane.focus.left";
            "pane.focus.next": "pane.focus.next";
            "pane.focus.previous": "pane.focus.previous";
            "pane.focus.right": "pane.focus.right";
            "pane.focus.up": "pane.focus.up";
            "pane.maximize.toggle": "pane.maximize.toggle";
            "panel.close": "panel.close";
            "panel.newTab": "panel.newTab";
            "panel.nextNewTabItem": "panel.nextNewTabItem";
            "panel.nextTab": "panel.nextTab";
            "panel.previousNewTabItem": "panel.previousNewTabItem";
            "panel.previousTab": "panel.previousTab";
            "panel.reopenClosedTab": "panel.reopenClosedTab";
            "panel.toggle": "panel.toggle";
            "question.select.1": "question.select.1";
            "question.select.2": "question.select.2";
            "question.select.3": "question.select.3";
            "question.select.4": "question.select.4";
            "question.select.5": "question.select.5";
            "question.select.6": "question.select.6";
            "question.select.7": "question.select.7";
            "question.select.8": "question.select.8";
            "question.select.9": "question.select.9";
            "settings.open": "settings.open";
            "settings.openServers": "settings.openServers";
            "sidebar.toggle": "sidebar.toggle";
            "terminal.open": "terminal.open";
            "thread.archive": "thread.archive";
            "thread.jump.1": "thread.jump.1";
            "thread.jump.2": "thread.jump.2";
            "thread.jump.3": "thread.jump.3";
            "thread.jump.4": "thread.jump.4";
            "thread.jump.5": "thread.jump.5";
            "thread.jump.6": "thread.jump.6";
            "thread.jump.7": "thread.jump.7";
            "thread.jump.8": "thread.jump.8";
            "thread.jump.9": "thread.jump.9";
            "thread.new": "thread.new";
            "thread.next": "thread.next";
            "thread.previous": "thread.previous";
            "thread.rename": "thread.rename";
            "thread.search": "thread.search";
            "window.new": "window.new";
            "workspace.openPreferred": "workspace.openPreferred";
        }>, z$1.ZodTemplateLiteral<`plugin:${string}/${string}`>]>;
        shortcut: z$1.ZodNullable<z$1.ZodObject<{
            alt: z$1.ZodBoolean;
            control: z$1.ZodBoolean;
            key: z$1.ZodString;
            meta: z$1.ZodBoolean;
            mod: z$1.ZodBoolean;
            shift: z$1.ZodBoolean;
        }, z$1.core.$strict>>;
    }, z$1.core.$strict>>;
    keybindings: z$1.ZodArray<z$1.ZodObject<{
        command: z$1.ZodUnion<readonly [z$1.ZodEnum<{
            "app.back": "app.back";
            "browser.find": "browser.find";
            "browser.focusLocation": "browser.focusLocation";
            "browser.reload": "browser.reload";
            "composer.focus": "composer.focus";
            "diff.toggle": "diff.toggle";
            "file.quickOpen": "file.quickOpen";
            "logs.openServerDaemon": "logs.openServerDaemon";
            "modelPicker.cycleModel": "modelPicker.cycleModel";
            "modelPicker.cycleModelBackward": "modelPicker.cycleModelBackward";
            "modelPicker.cycleProvider": "modelPicker.cycleProvider";
            "modelPicker.cycleProviderBackward": "modelPicker.cycleProviderBackward";
            "modelPicker.cycleReasoning": "modelPicker.cycleReasoning";
            "modelPicker.cycleReasoningBackward": "modelPicker.cycleReasoningBackward";
            "modelPicker.toggle": "modelPicker.toggle";
            "notifications.open": "notifications.open";
            "palette.open": "palette.open";
            "pane.close": "pane.close";
            "pane.focus.1": "pane.focus.1";
            "pane.focus.2": "pane.focus.2";
            "pane.focus.3": "pane.focus.3";
            "pane.focus.4": "pane.focus.4";
            "pane.focus.5": "pane.focus.5";
            "pane.focus.6": "pane.focus.6";
            "pane.focus.7": "pane.focus.7";
            "pane.focus.8": "pane.focus.8";
            "pane.focus.down": "pane.focus.down";
            "pane.focus.left": "pane.focus.left";
            "pane.focus.next": "pane.focus.next";
            "pane.focus.previous": "pane.focus.previous";
            "pane.focus.right": "pane.focus.right";
            "pane.focus.up": "pane.focus.up";
            "pane.maximize.toggle": "pane.maximize.toggle";
            "panel.close": "panel.close";
            "panel.newTab": "panel.newTab";
            "panel.nextNewTabItem": "panel.nextNewTabItem";
            "panel.nextTab": "panel.nextTab";
            "panel.previousNewTabItem": "panel.previousNewTabItem";
            "panel.previousTab": "panel.previousTab";
            "panel.reopenClosedTab": "panel.reopenClosedTab";
            "panel.toggle": "panel.toggle";
            "question.select.1": "question.select.1";
            "question.select.2": "question.select.2";
            "question.select.3": "question.select.3";
            "question.select.4": "question.select.4";
            "question.select.5": "question.select.5";
            "question.select.6": "question.select.6";
            "question.select.7": "question.select.7";
            "question.select.8": "question.select.8";
            "question.select.9": "question.select.9";
            "settings.open": "settings.open";
            "settings.openServers": "settings.openServers";
            "sidebar.toggle": "sidebar.toggle";
            "terminal.open": "terminal.open";
            "thread.archive": "thread.archive";
            "thread.jump.1": "thread.jump.1";
            "thread.jump.2": "thread.jump.2";
            "thread.jump.3": "thread.jump.3";
            "thread.jump.4": "thread.jump.4";
            "thread.jump.5": "thread.jump.5";
            "thread.jump.6": "thread.jump.6";
            "thread.jump.7": "thread.jump.7";
            "thread.jump.8": "thread.jump.8";
            "thread.jump.9": "thread.jump.9";
            "thread.new": "thread.new";
            "thread.next": "thread.next";
            "thread.previous": "thread.previous";
            "thread.rename": "thread.rename";
            "thread.search": "thread.search";
            "window.new": "window.new";
            "workspace.openPreferred": "workspace.openPreferred";
        }>, z$1.ZodTemplateLiteral<`plugin:${string}/${string}`>]>;
        desktopOnly: z$1.ZodBoolean;
        shortcut: z$1.ZodObject<{
            alt: z$1.ZodBoolean;
            control: z$1.ZodBoolean;
            key: z$1.ZodString;
            meta: z$1.ZodBoolean;
            mod: z$1.ZodBoolean;
            shift: z$1.ZodBoolean;
        }, z$1.core.$strict>;
        when: z$1.ZodObject<{
            all: z$1.ZodArray<z$1.ZodEnum<{
                browserFocus: "browserFocus";
                editableFocus: "editableFocus";
                macPlatform: "macPlatform";
                mainSurface: "mainSurface";
                modalOpen: "modalOpen";
                modelPickerOpen: "modelPickerOpen";
                promptAvailable: "promptAvailable";
                questionOpen: "questionOpen";
                splitActive: "splitActive";
                terminalFocus: "terminalFocus";
                webSurface: "webSurface";
            }>>;
            none: z$1.ZodArray<z$1.ZodEnum<{
                browserFocus: "browserFocus";
                editableFocus: "editableFocus";
                macPlatform: "macPlatform";
                mainSurface: "mainSurface";
                modalOpen: "modalOpen";
                modelPickerOpen: "modelPickerOpen";
                promptAvailable: "promptAvailable";
                questionOpen: "questionOpen";
                splitActive: "splitActive";
                terminalFocus: "terminalFocus";
                webSurface: "webSurface";
            }>>;
        }, z$1.core.$strict>;
    }, z$1.core.$strict>>;
    localHelperPorts: z$1.ZodArray<z$1.ZodNumber>;
    pluginThemes: z$1.ZodArray<z$1.ZodObject<{
        description: z$1.ZodNullable<z$1.ZodString>;
        id: z$1.ZodString;
        name: z$1.ZodString;
        pluginId: z$1.ZodString;
    }, z$1.core.$strip>>;
    primaryHostId: z$1.ZodNullable<z$1.ZodString>;
    primaryHostPlatform: z$1.ZodNullable<z$1.ZodEnum<{
        darwin: "darwin";
        linux: "linux";
        unknown: "unknown";
        wsl: "wsl";
    }>>;
    serverAccess: z$1.ZodObject<{
        defaultProviderId: z$1.ZodString;
        effectiveUrl: z$1.ZodNullable<z$1.ZodString>;
        providers: z$1.ZodArray<z$1.ZodObject<{
            availability: z$1.ZodNullable<z$1.ZodDiscriminatedUnion<[z$1.ZodObject<{
                serverUrl: z$1.ZodOptional<z$1.ZodString>;
                status: z$1.ZodLiteral<"available">;
            }, z$1.core.$strip>, z$1.ZodObject<{
                message: z$1.ZodString;
                status: z$1.ZodLiteral<"setup-required">;
            }, z$1.core.$strip>, z$1.ZodObject<{
                message: z$1.ZodString;
                status: z$1.ZodLiteral<"unavailable">;
            }, z$1.core.$strip>], "status">>;
            description: z$1.ZodString;
            displayName: z$1.ZodString;
            id: z$1.ZodString;
            pluginId: z$1.ZodNullable<z$1.ZodString>;
        }, z$1.core.$strip>>;
        urlSource: z$1.ZodNullable<z$1.ZodEnum<{
            BB_EXTERNAL_URL: "BB_EXTERNAL_URL";
            setting: "setting";
        }>>;
    }, z$1.core.$strip>;
    serverUrl: z$1.ZodString;
    voiceTranscriptionEnabled: z$1.ZodBoolean;
}, z$1.core.$strip>;
type SystemConfigResponse = z$1.infer<typeof systemConfigResponseSchema>;
declare const systemAttentionResponseSchema: z$1.ZodObject<{
    hasAttention: z$1.ZodBoolean;
}, z$1.core.$strip>;
type SystemAttentionResponse = z$1.infer<typeof systemAttentionResponseSchema>;
declare const themeCatalogResponseSchema: z$1.ZodObject<{
    active: z$1.ZodObject<{
        customCss: z$1.ZodNullable<z$1.ZodString>;
        faviconColor: z$1.ZodEnum<{
            blue: "blue";
            default: "default";
            green: "green";
            orange: "orange";
            pink: "pink";
            purple: "purple";
            red: "red";
            teal: "teal";
            yellow: "yellow";
        }>;
        resolvedCodeTheme: z$1.ZodDefault<z$1.ZodObject<{
            dark: z$1.ZodString;
            files: z$1.ZodRecord<z$1.ZodString, z$1.ZodType<JsonObject, unknown, z$1.core.$ZodTypeInternals<JsonObject, unknown>>>;
            light: z$1.ZodString;
        }, z$1.core.$strict>>;
        themeId: z$1.ZodString;
    }, z$1.core.$strip>;
    custom: z$1.ZodArray<z$1.ZodString>;
    dir: z$1.ZodString;
    plugins: z$1.ZodArray<z$1.ZodObject<{
        description: z$1.ZodNullable<z$1.ZodString>;
        id: z$1.ZodString;
        name: z$1.ZodString;
        pluginId: z$1.ZodString;
    }, z$1.core.$strip>>;
}, z$1.core.$strip>;
type ThemeCatalogResponse = z$1.infer<typeof themeCatalogResponseSchema>;
declare const systemVersionResponseSchema: z$1.ZodObject<{
    currentVersion: z$1.ZodString;
    isDevelopment: z$1.ZodBoolean;
    latestVersion: z$1.ZodNullable<z$1.ZodString>;
    source: z$1.ZodLiteral<"npm">;
    updateAvailable: z$1.ZodBoolean;
    upgradeCommand: z$1.ZodString;
}, z$1.core.$strip>;
type SystemVersionResponse = z$1.infer<typeof systemVersionResponseSchema>;
declare const systemConfigReloadResponseSchema: z$1.ZodObject<{
    ok: z$1.ZodLiteral<true>;
}, z$1.core.$strip>;
declare const systemCliSkillsStatusResponseSchema: z$1.ZodObject<{
    machines: z$1.ZodArray<z$1.ZodObject<{
        hostId: z$1.ZodString;
        hostName: z$1.ZodString;
        status: z$1.ZodEnum<{
            installed: "installed";
            missing: "missing";
            outdated: "outdated";
            unknown: "unknown";
        }>;
    }, z$1.core.$strip>>;
}, z$1.core.$strip>;
type SystemCliSkillsStatusResponse = z$1.infer<typeof systemCliSkillsStatusResponseSchema>;
declare const systemInstallCliSkillsRequestSchema: z$1.ZodObject<{
    hostIds: z$1.ZodArray<z$1.ZodString>;
}, z$1.core.$strip>;
type SystemInstallCliSkillsRequest = z$1.infer<typeof systemInstallCliSkillsRequestSchema>;
declare const systemInstallCliSkillsResponseSchema: z$1.ZodObject<{
    results: z$1.ZodArray<z$1.ZodDiscriminatedUnion<[z$1.ZodObject<{
        hostId: z$1.ZodString;
        hostName: z$1.ZodString;
        installations: z$1.ZodArray<z$1.ZodObject<{
            name: z$1.ZodString;
            path: z$1.ZodString;
        }, z$1.core.$strip>>;
        ok: z$1.ZodLiteral<true>;
    }, z$1.core.$strip>, z$1.ZodObject<{
        errorMessage: z$1.ZodString;
        hostId: z$1.ZodString;
        hostName: z$1.ZodString;
        ok: z$1.ZodLiteral<false>;
    }, z$1.core.$strip>], "ok">>;
}, z$1.core.$strip>;
type SystemInstallCliSkillsResponse = z$1.infer<typeof systemInstallCliSkillsResponseSchema>;
type SystemConfigReloadResponse = z$1.infer<typeof systemConfigReloadResponseSchema>;
declare const systemEnvironmentProviderSchema: z$1.ZodObject<{
    acceptsEmptyInputs: z$1.ZodBoolean;
    availability: z$1.ZodNullable<z$1.ZodDiscriminatedUnion<[z$1.ZodObject<{
        status: z$1.ZodLiteral<"available">;
    }, z$1.core.$strip>, z$1.ZodObject<{
        message: z$1.ZodString;
        status: z$1.ZodLiteral<"setup-required">;
    }, z$1.core.$strip>, z$1.ZodObject<{
        message: z$1.ZodString;
        status: z$1.ZodLiteral<"unavailable">;
    }, z$1.core.$strip>], "status">>;
    description: z$1.ZodNullable<z$1.ZodString>;
    displayName: z$1.ZodString;
    environmentProviderId: z$1.ZodOptional<z$1.ZodString>;
    icon: z$1.ZodNullable<z$1.ZodString>;
    id: z$1.ZodString;
    inputs: z$1.ZodNullable<z$1.ZodType<JsonValue, unknown, z$1.core.$ZodTypeInternals<JsonValue, unknown>>>;
    logoUrl: z$1.ZodNullable<z$1.ZodString>;
    machineAcceptsEmptyInputs: z$1.ZodOptional<z$1.ZodBoolean>;
    machineAvailability: z$1.ZodRecord<z$1.ZodString, z$1.ZodNullable<z$1.ZodDiscriminatedUnion<[z$1.ZodObject<{
        status: z$1.ZodLiteral<"available">;
    }, z$1.core.$strip>, z$1.ZodObject<{
        message: z$1.ZodString;
        status: z$1.ZodLiteral<"setup-required">;
    }, z$1.core.$strip>, z$1.ZodObject<{
        message: z$1.ZodString;
        status: z$1.ZodLiteral<"unavailable">;
    }, z$1.core.$strip>], "status">>>;
    machineInputs: z$1.ZodOptional<z$1.ZodNullable<z$1.ZodType<JsonValue, unknown, z$1.core.$ZodTypeInternals<JsonValue, unknown>>>>;
    machineProviderId: z$1.ZodNullable<z$1.ZodString>;
    machineProviderPluginId: z$1.ZodOptional<z$1.ZodString>;
    pluginId: z$1.ZodString;
    requires: z$1.ZodObject<{
        gitCheckout: z$1.ZodBoolean;
        gitRemote: z$1.ZodBoolean;
        projectCheckout: z$1.ZodBoolean;
        projectless: z$1.ZodBoolean;
    }, z$1.core.$strip>;
}, z$1.core.$strip>;
type SystemEnvironmentProvider = z$1.infer<typeof systemEnvironmentProviderSchema>;
declare const systemMachineProviderSchema: z$1.ZodObject<{
    acceptsEmptyInputs: z$1.ZodBoolean;
    description: z$1.ZodString;
    displayName: z$1.ZodString;
    icon: z$1.ZodString;
    id: z$1.ZodString;
    inputs: z$1.ZodNullable<z$1.ZodType<JsonValue, unknown, z$1.core.$ZodTypeInternals<JsonValue, unknown>>>;
    logoUrl: z$1.ZodNullable<z$1.ZodString>;
    pluginId: z$1.ZodString;
    supportsSuspend: z$1.ZodBoolean;
}, z$1.core.$strip>;
type SystemMachineProvider = z$1.infer<typeof systemMachineProviderSchema>;

interface UiPreferencesResponse {
    preferences: UiPreferenceEntries;
}
interface UiPreferenceResponse<Key extends UiPreferenceKey = UiPreferenceKey> {
    key: Key;
    revision: number;
    value: UiPreferenceValue<Key>;
}

declare const terminalSessionSchema: z$1.ZodObject<{
    closeReason: z$1.ZodNullable<z$1.ZodEnum<{
        "daemon-disconnect": "daemon-disconnect";
        "environment-destroyed": "environment-destroyed";
        "open-timeout": "open-timeout";
        "process-exit": "process-exit";
        "thread-archived": "thread-archived";
        "thread-deleted": "thread-deleted";
        user: "user";
    }>>;
    cols: z$1.ZodNumber;
    createdAt: z$1.ZodNumber;
    environmentId: z$1.ZodNullable<z$1.ZodString>;
    exitCode: z$1.ZodNullable<z$1.ZodNumber>;
    hostId: z$1.ZodString;
    id: z$1.ZodString;
    initialCwd: z$1.ZodString;
    lastUserInputAt: z$1.ZodNullable<z$1.ZodNumber>;
    rows: z$1.ZodNumber;
    status: z$1.ZodEnum<{
        disconnected: "disconnected";
        exited: "exited";
        running: "running";
        starting: "starting";
    }>;
    threadId: z$1.ZodNullable<z$1.ZodString>;
    title: z$1.ZodString;
    updatedAt: z$1.ZodNumber;
}, z$1.core.$strip>;
type TerminalSession = z$1.infer<typeof terminalSessionSchema>;
declare const terminalListResponseSchema: z$1.ZodObject<{
    sessions: z$1.ZodArray<z$1.ZodObject<{
        closeReason: z$1.ZodNullable<z$1.ZodEnum<{
            "daemon-disconnect": "daemon-disconnect";
            "environment-destroyed": "environment-destroyed";
            "open-timeout": "open-timeout";
            "process-exit": "process-exit";
            "thread-archived": "thread-archived";
            "thread-deleted": "thread-deleted";
            user: "user";
        }>>;
        cols: z$1.ZodNumber;
        createdAt: z$1.ZodNumber;
        environmentId: z$1.ZodNullable<z$1.ZodString>;
        exitCode: z$1.ZodNullable<z$1.ZodNumber>;
        hostId: z$1.ZodString;
        id: z$1.ZodString;
        initialCwd: z$1.ZodString;
        lastUserInputAt: z$1.ZodNullable<z$1.ZodNumber>;
        rows: z$1.ZodNumber;
        status: z$1.ZodEnum<{
            disconnected: "disconnected";
            exited: "exited";
            running: "running";
            starting: "starting";
        }>;
        threadId: z$1.ZodNullable<z$1.ZodString>;
        title: z$1.ZodString;
        updatedAt: z$1.ZodNumber;
    }, z$1.core.$strip>>;
}, z$1.core.$strip>;
type TerminalListResponse = z$1.infer<typeof terminalListResponseSchema>;
declare const createTerminalRequestSchema: z$1.ZodObject<{
    cols: z$1.ZodNumber;
    rows: z$1.ZodNumber;
    start: z$1.ZodOptional<z$1.ZodDiscriminatedUnion<[z$1.ZodObject<{
        mode: z$1.ZodLiteral<"shell">;
    }, z$1.core.$strict>, z$1.ZodObject<{
        command: z$1.ZodString;
        mode: z$1.ZodLiteral<"command">;
    }, z$1.core.$strict>], "mode">>;
    target: z$1.ZodDiscriminatedUnion<[z$1.ZodObject<{
        kind: z$1.ZodLiteral<"thread">;
        threadId: z$1.ZodString;
    }, z$1.core.$strict>, z$1.ZodObject<{
        environmentId: z$1.ZodString;
        kind: z$1.ZodLiteral<"environment">;
    }, z$1.core.$strict>, z$1.ZodObject<{
        cwd: z$1.ZodNullable<z$1.ZodString>;
        hostId: z$1.ZodString;
        kind: z$1.ZodLiteral<"host_path">;
    }, z$1.core.$strict>], "kind">;
    title: z$1.ZodOptional<z$1.ZodString>;
}, z$1.core.$strict>;
type CreateTerminalRequest = z$1.infer<typeof createTerminalRequestSchema>;
declare const updateTerminalRequestSchema: z$1.ZodObject<{
    title: z$1.ZodString;
}, z$1.core.$strict>;
type UpdateTerminalRequest = z$1.infer<typeof updateTerminalRequestSchema>;
declare const terminalInputRequestSchema: z$1.ZodObject<{
    dataBase64: z$1.ZodString;
}, z$1.core.$strict>;
type TerminalInputRequest = z$1.infer<typeof terminalInputRequestSchema>;
declare const terminalResizeRequestSchema: z$1.ZodObject<{
    cols: z$1.ZodNumber;
    rows: z$1.ZodNumber;
}, z$1.core.$strict>;
type TerminalResizeRequest = z$1.infer<typeof terminalResizeRequestSchema>;
declare const terminalOutputQuerySchema: z$1.ZodObject<{
    limitChunks: z$1.ZodOptional<z$1.ZodCoercedNumber<unknown>>;
    sinceSeq: z$1.ZodOptional<z$1.ZodCoercedNumber<unknown>>;
    tailBytes: z$1.ZodOptional<z$1.ZodCoercedNumber<unknown>>;
}, z$1.core.$strict>;
type TerminalOutputQuery = z$1.infer<typeof terminalOutputQuerySchema>;
declare const terminalOutputResponseSchema: z$1.ZodObject<{
    chunks: z$1.ZodArray<z$1.ZodObject<{
        dataBase64: z$1.ZodString;
        seq: z$1.ZodNumber;
    }, z$1.core.$strict>>;
    closeReason: z$1.ZodNullable<z$1.ZodEnum<{
        "daemon-disconnect": "daemon-disconnect";
        "environment-destroyed": "environment-destroyed";
        "open-timeout": "open-timeout";
        "process-exit": "process-exit";
        "thread-archived": "thread-archived";
        "thread-deleted": "thread-deleted";
        user: "user";
    }>>;
    exitCode: z$1.ZodNullable<z$1.ZodNumber>;
    nextSeq: z$1.ZodNumber;
    status: z$1.ZodEnum<{
        disconnected: "disconnected";
        exited: "exited";
        running: "running";
        starting: "starting";
    }>;
    truncated: z$1.ZodBoolean;
}, z$1.core.$strict>;
type TerminalOutputResponse = z$1.infer<typeof terminalOutputResponseSchema>;

declare const timelineRowStatusSchema: z$1.ZodEnum<{
    completed: "completed";
    error: "error";
    interrupted: "interrupted";
    pending: "pending";
}>;
type TimelineRowStatus = z$1.infer<typeof timelineRowStatusSchema>;
declare const timelineRowBaseSchema: z$1.ZodObject<{
    createdAt: z$1.ZodNumber;
    id: z$1.ZodString;
    sourceSeqEnd: z$1.ZodNumber;
    sourceSeqStart: z$1.ZodNumber;
    startedAt: z$1.ZodNumber;
    threadId: z$1.ZodString;
    turnId: z$1.ZodNullable<z$1.ZodString>;
}, z$1.core.$strip>;
type TimelineRowBase = z$1.infer<typeof timelineRowBaseSchema>;
declare const timelineConversationRowSchema: z$1.ZodDiscriminatedUnion<[z$1.ZodObject<{
    attachments: z$1.ZodNullable<z$1.ZodObject<{
        imageUrls: z$1.ZodArray<z$1.ZodString>;
        localFilePaths: z$1.ZodArray<z$1.ZodString>;
        localFiles: z$1.ZodNumber;
        localImagePaths: z$1.ZodArray<z$1.ZodString>;
        localImages: z$1.ZodNumber;
        webImages: z$1.ZodNumber;
    }, z$1.core.$strip>>;
    createdAt: z$1.ZodNumber;
    id: z$1.ZodString;
    initiator: z$1.ZodEnum<{
        agent: "agent";
        system: "system";
        user: "user";
    }>;
    kind: z$1.ZodLiteral<"conversation">;
    mentions: z$1.ZodArray<z$1.ZodObject<{
        end: z$1.ZodNumber;
        resource: z$1.ZodPipe<z$1.ZodTransform<unknown, unknown>, z$1.ZodDiscriminatedUnion<[z$1.ZodObject<{
            kind: z$1.ZodLiteral<"thread">;
            label: z$1.ZodString;
            projectId: z$1.ZodOptional<z$1.ZodString>;
            threadId: z$1.ZodString;
        }, z$1.core.$strip>, z$1.ZodObject<{
            kind: z$1.ZodLiteral<"project">;
            label: z$1.ZodString;
            projectId: z$1.ZodString;
        }, z$1.core.$strip>, z$1.ZodObject<{
            kind: z$1.ZodLiteral<"section">;
            label: z$1.ZodString;
            sectionId: z$1.ZodString;
        }, z$1.core.$strip>, z$1.ZodObject<{
            entryKind: z$1.ZodEnum<{
                directory: "directory";
                file: "file";
            }>;
            kind: z$1.ZodLiteral<"path">;
            label: z$1.ZodString;
            path: z$1.ZodString;
            source: z$1.ZodEnum<{
                "thread-storage": "thread-storage";
                workspace: "workspace";
            }>;
        }, z$1.core.$strip>, z$1.ZodObject<{
            argumentHint: z$1.ZodNullable<z$1.ZodString>;
            kind: z$1.ZodLiteral<"command">;
            label: z$1.ZodString;
            name: z$1.ZodString;
            origin: z$1.ZodEnum<{
                builtin: "builtin";
                project: "project";
                user: "user";
            }>;
            source: z$1.ZodEnum<{
                command: "command";
                skill: "skill";
            }>;
            trigger: z$1.ZodEnum<{
                "/": "/";
                $: "$";
            }>;
        }, z$1.core.$strip>, z$1.ZodObject<{
            icon: z$1.ZodOptional<z$1.ZodNullable<z$1.ZodString>>;
            itemId: z$1.ZodString;
            kind: z$1.ZodLiteral<"plugin">;
            label: z$1.ZodString;
            pluginId: z$1.ZodString;
        }, z$1.core.$strip>], "kind">>;
        start: z$1.ZodNumber;
    }, z$1.core.$strip>>;
    role: z$1.ZodLiteral<"user">;
    senderThreadId: z$1.ZodNullable<z$1.ZodString>;
    sourceSeqEnd: z$1.ZodNumber;
    sourceSeqStart: z$1.ZodNumber;
    startedAt: z$1.ZodNumber;
    systemMessageKind: z$1.ZodEnum<{
        "child-completed": "child-completed";
        "child-failed": "child-failed";
        "child-interrupted": "child-interrupted";
        "child-needs-attention": "child-needs-attention";
        "child-outcome-batch": "child-outcome-batch";
        "ownership-assigned": "ownership-assigned";
        "ownership-removed": "ownership-removed";
        "tool-result-delivered": "tool-result-delivered";
        unlabeled: "unlabeled";
    }>;
    systemMessageSubject: z$1.ZodNullable<z$1.ZodDiscriminatedUnion<[z$1.ZodObject<{
        kind: z$1.ZodLiteral<"thread">;
        threadId: z$1.ZodString;
        threadName: z$1.ZodString;
    }, z$1.core.$strip>, z$1.ZodObject<{
        count: z$1.ZodNumber;
        kind: z$1.ZodLiteral<"thread-batch">;
    }, z$1.core.$strip>, z$1.ZodObject<{
        kind: z$1.ZodLiteral<"tool-call">;
        suppress: z$1.ZodBoolean;
        toolName: z$1.ZodString;
    }, z$1.core.$strip>], "kind">>;
    text: z$1.ZodString;
    threadId: z$1.ZodString;
    turnId: z$1.ZodNullable<z$1.ZodString>;
    turnRequest: z$1.ZodObject<{
        isGrouped: z$1.ZodBoolean;
        kind: z$1.ZodEnum<{
            message: "message";
            steer: "steer";
        }>;
        status: z$1.ZodEnum<{
            accepted: "accepted";
            pending: "pending";
            rejected: "rejected";
        }>;
    }, z$1.core.$strip>;
}, z$1.core.$strip>, z$1.ZodObject<{
    attachments: z$1.ZodNullable<z$1.ZodObject<{
        imageUrls: z$1.ZodArray<z$1.ZodString>;
        localFilePaths: z$1.ZodArray<z$1.ZodString>;
        localFiles: z$1.ZodNumber;
        localImagePaths: z$1.ZodArray<z$1.ZodString>;
        localImages: z$1.ZodNumber;
        webImages: z$1.ZodNumber;
    }, z$1.core.$strip>>;
    createdAt: z$1.ZodNumber;
    id: z$1.ZodString;
    kind: z$1.ZodLiteral<"conversation">;
    role: z$1.ZodLiteral<"assistant">;
    sourceSeqEnd: z$1.ZodNumber;
    sourceSeqStart: z$1.ZodNumber;
    startedAt: z$1.ZodNumber;
    text: z$1.ZodString;
    threadId: z$1.ZodString;
    turnId: z$1.ZodNullable<z$1.ZodString>;
    turnRequest: z$1.ZodNull;
}, z$1.core.$strip>], "role">;
type TimelineConversationRow = z$1.infer<typeof timelineConversationRowSchema>;
declare const timelineSystemRowSchema: z$1.ZodUnion<readonly [z$1.ZodObject<{
    createdAt: z$1.ZodNumber;
    detail: z$1.ZodNullable<z$1.ZodString>;
    id: z$1.ZodString;
    kind: z$1.ZodLiteral<"system">;
    sourceSeqEnd: z$1.ZodNumber;
    sourceSeqStart: z$1.ZodNumber;
    startedAt: z$1.ZodNumber;
    status: z$1.ZodNullable<z$1.ZodEnum<{
        completed: "completed";
        error: "error";
        interrupted: "interrupted";
        pending: "pending";
    }>>;
    systemKind: z$1.ZodEnum<{
        debug: "debug";
        error: "error";
        reconnect: "reconnect";
    }>;
    threadId: z$1.ZodString;
    title: z$1.ZodString;
    turnId: z$1.ZodNullable<z$1.ZodString>;
}, z$1.core.$strip>, z$1.ZodDiscriminatedUnion<[z$1.ZodObject<{
    completedAt: z$1.ZodNullable<z$1.ZodNumber>;
    createdAt: z$1.ZodNumber;
    detail: z$1.ZodNullable<z$1.ZodString>;
    id: z$1.ZodString;
    kind: z$1.ZodLiteral<"system">;
    operationKind: z$1.ZodEnum<{
        "context-clear": "context-clear";
        "provider-unhandled": "provider-unhandled";
        "thread-interrupted": "thread-interrupted";
        "thread-provisioning": "thread-provisioning";
        compaction: "compaction";
        deprecation: "deprecation";
        generic: "generic";
        reasoning: "reasoning";
        warning: "warning";
    }>;
    reasoningId: z$1.ZodOptional<z$1.ZodString>;
    sourceSeqEnd: z$1.ZodNumber;
    sourceSeqStart: z$1.ZodNumber;
    startedAt: z$1.ZodNumber;
    status: z$1.ZodNullable<z$1.ZodEnum<{
        completed: "completed";
        error: "error";
        interrupted: "interrupted";
        pending: "pending";
    }>>;
    systemKind: z$1.ZodLiteral<"operation">;
    threadId: z$1.ZodString;
    title: z$1.ZodString;
    turnId: z$1.ZodNullable<z$1.ZodString>;
}, z$1.core.$strip>, z$1.ZodObject<{
    completedAt: z$1.ZodNullable<z$1.ZodNumber>;
    createdAt: z$1.ZodNumber;
    detail: z$1.ZodNullable<z$1.ZodString>;
    id: z$1.ZodString;
    kind: z$1.ZodLiteral<"system">;
    operationKind: z$1.ZodLiteral<"parent-change">;
    parentChange: z$1.ZodObject<{
        action: z$1.ZodEnum<{
            assign: "assign";
            release: "release";
            transfer: "transfer";
        }>;
        nextParentThreadId: z$1.ZodNullable<z$1.ZodString>;
        nextParentThreadTitle: z$1.ZodNullable<z$1.ZodString>;
        previousParentThreadId: z$1.ZodNullable<z$1.ZodString>;
        previousParentThreadTitle: z$1.ZodNullable<z$1.ZodString>;
    }, z$1.core.$strip>;
    sourceSeqEnd: z$1.ZodNumber;
    sourceSeqStart: z$1.ZodNumber;
    startedAt: z$1.ZodNumber;
    status: z$1.ZodEnum<{
        completed: "completed";
        error: "error";
        interrupted: "interrupted";
        pending: "pending";
    }>;
    systemKind: z$1.ZodLiteral<"operation">;
    threadId: z$1.ZodString;
    title: z$1.ZodString;
    turnId: z$1.ZodNullable<z$1.ZodString>;
}, z$1.core.$strip>], "operationKind">]>;
type TimelineSystemRow = z$1.infer<typeof timelineSystemRowSchema>;
interface TimelineWorkRowBase extends TimelineRowBase {
    kind: "work";
    status: TimelineRowStatus;
}
type TimelineRowPresentation = ThreadEventItemPresentation;
declare const timelineCommandWorkRowSchema: z$1.ZodObject<{
    activityIntents: z$1.ZodArray<z$1.ZodDiscriminatedUnion<[z$1.ZodObject<{
        command: z$1.ZodString;
        name: z$1.ZodString;
        path: z$1.ZodNullable<z$1.ZodString>;
        type: z$1.ZodLiteral<"read">;
    }, z$1.core.$strip>, z$1.ZodObject<{
        command: z$1.ZodString;
        path: z$1.ZodNullable<z$1.ZodString>;
        type: z$1.ZodLiteral<"list_files">;
    }, z$1.core.$strip>, z$1.ZodObject<{
        command: z$1.ZodString;
        path: z$1.ZodNullable<z$1.ZodString>;
        query: z$1.ZodNullable<z$1.ZodString>;
        type: z$1.ZodLiteral<"search">;
    }, z$1.core.$strip>, z$1.ZodObject<{
        command: z$1.ZodString;
        type: z$1.ZodLiteral<"unknown">;
    }, z$1.core.$strip>], "type">>;
    approvalStatus: z$1.ZodNullable<z$1.ZodEnum<{
        denied: "denied";
        waiting_for_approval: "waiting_for_approval";
    }>>;
    callId: z$1.ZodString;
    command: z$1.ZodString;
    completedAt: z$1.ZodNullable<z$1.ZodNumber>;
    createdAt: z$1.ZodNumber;
    cwd: z$1.ZodNullable<z$1.ZodString>;
    exitCode: z$1.ZodNullable<z$1.ZodNumber>;
    id: z$1.ZodString;
    kind: z$1.ZodLiteral<"work">;
    output: z$1.ZodString;
    outputPreview: z$1.ZodOptional<z$1.ZodObject<{
        experimental_fullOutputAvailability: z$1.ZodEnum<{
            "detail-limit": "detail-limit";
            "retention-expired": "retention-expired";
            available: "available";
        }>;
        totalChars: z$1.ZodNumber;
    }, z$1.core.$strip>>;
    presentation: z$1.ZodOptional<z$1.ZodObject<{
        badge: z$1.ZodOptional<z$1.ZodObject<{
            glyph: z$1.ZodString;
            hint: z$1.ZodString;
            label: z$1.ZodString;
            tone: z$1.ZodEnum<{
                destructive: "destructive";
                neutral: "neutral";
            }>;
        }, z$1.core.$strip>>;
        detail: z$1.ZodOptional<z$1.ZodString>;
        icon: z$1.ZodObject<{
            glyph: z$1.ZodString;
        }, z$1.core.$strip>;
        label: z$1.ZodObject<{
            completed: z$1.ZodString;
            pending: z$1.ZodString;
        }, z$1.core.$strip>;
        suppress: z$1.ZodOptional<z$1.ZodBoolean>;
        tint: z$1.ZodOptional<z$1.ZodObject<{
            dark: z$1.ZodString;
            light: z$1.ZodString;
        }, z$1.core.$strip>>;
        title: z$1.ZodOptional<z$1.ZodString>;
    }, z$1.core.$strip>>;
    source: z$1.ZodNullable<z$1.ZodString>;
    sourceSeqEnd: z$1.ZodNumber;
    sourceSeqStart: z$1.ZodNumber;
    startedAt: z$1.ZodNumber;
    status: z$1.ZodEnum<{
        completed: "completed";
        error: "error";
        interrupted: "interrupted";
        pending: "pending";
    }>;
    threadId: z$1.ZodString;
    turnId: z$1.ZodNullable<z$1.ZodString>;
    workKind: z$1.ZodLiteral<"command">;
}, z$1.core.$strip>;
type TimelineCommandWorkRow = z$1.infer<typeof timelineCommandWorkRowSchema>;
declare const timelineToolWorkRowSchema: z$1.ZodObject<{
    approvalStatus: z$1.ZodNullable<z$1.ZodEnum<{
        denied: "denied";
        waiting_for_approval: "waiting_for_approval";
    }>>;
    callId: z$1.ZodString;
    completedAt: z$1.ZodNullable<z$1.ZodNumber>;
    createdAt: z$1.ZodNumber;
    id: z$1.ZodString;
    kind: z$1.ZodLiteral<"work">;
    output: z$1.ZodString;
    outputPreview: z$1.ZodOptional<z$1.ZodObject<{
        experimental_fullOutputAvailability: z$1.ZodEnum<{
            "detail-limit": "detail-limit";
            "retention-expired": "retention-expired";
            available: "available";
        }>;
        totalChars: z$1.ZodNumber;
    }, z$1.core.$strip>>;
    presentation: z$1.ZodOptional<z$1.ZodObject<{
        badge: z$1.ZodOptional<z$1.ZodObject<{
            glyph: z$1.ZodString;
            hint: z$1.ZodString;
            label: z$1.ZodString;
            tone: z$1.ZodEnum<{
                destructive: "destructive";
                neutral: "neutral";
            }>;
        }, z$1.core.$strip>>;
        detail: z$1.ZodOptional<z$1.ZodString>;
        icon: z$1.ZodObject<{
            glyph: z$1.ZodString;
        }, z$1.core.$strip>;
        label: z$1.ZodObject<{
            completed: z$1.ZodString;
            pending: z$1.ZodString;
        }, z$1.core.$strip>;
        suppress: z$1.ZodOptional<z$1.ZodBoolean>;
        tint: z$1.ZodOptional<z$1.ZodObject<{
            dark: z$1.ZodString;
            light: z$1.ZodString;
        }, z$1.core.$strip>>;
        title: z$1.ZodOptional<z$1.ZodString>;
    }, z$1.core.$strip>>;
    sourceSeqEnd: z$1.ZodNumber;
    sourceSeqStart: z$1.ZodNumber;
    startedAt: z$1.ZodNumber;
    status: z$1.ZodEnum<{
        completed: "completed";
        error: "error";
        interrupted: "interrupted";
        pending: "pending";
    }>;
    threadId: z$1.ZodString;
    toolArgs: z$1.ZodNullable<z$1.ZodRecord<z$1.ZodString, z$1.ZodType<JsonValue, unknown, z$1.core.$ZodTypeInternals<JsonValue, unknown>>>>;
    toolName: z$1.ZodString;
    turnId: z$1.ZodNullable<z$1.ZodString>;
    workKind: z$1.ZodLiteral<"tool">;
}, z$1.core.$strip>;
type TimelineToolWorkRow = z$1.infer<typeof timelineToolWorkRowSchema>;
declare const timelineFileChangeWorkRowSchema: z$1.ZodObject<{
    approvalStatus: z$1.ZodNullable<z$1.ZodEnum<{
        denied: "denied";
        waiting_for_approval: "waiting_for_approval";
    }>>;
    callId: z$1.ZodString;
    change: z$1.ZodObject<{
        diff: z$1.ZodNullable<z$1.ZodString>;
        diffStats: z$1.ZodObject<{
            added: z$1.ZodNumber;
            removed: z$1.ZodNumber;
        }, z$1.core.$strip>;
        kind: z$1.ZodNullable<z$1.ZodString>;
        movePath: z$1.ZodNullable<z$1.ZodString>;
        path: z$1.ZodString;
    }, z$1.core.$strip>;
    createdAt: z$1.ZodNumber;
    id: z$1.ZodString;
    kind: z$1.ZodLiteral<"work">;
    presentation: z$1.ZodOptional<z$1.ZodObject<{
        badge: z$1.ZodOptional<z$1.ZodObject<{
            glyph: z$1.ZodString;
            hint: z$1.ZodString;
            label: z$1.ZodString;
            tone: z$1.ZodEnum<{
                destructive: "destructive";
                neutral: "neutral";
            }>;
        }, z$1.core.$strip>>;
        detail: z$1.ZodOptional<z$1.ZodString>;
        icon: z$1.ZodObject<{
            glyph: z$1.ZodString;
        }, z$1.core.$strip>;
        label: z$1.ZodObject<{
            completed: z$1.ZodString;
            pending: z$1.ZodString;
        }, z$1.core.$strip>;
        suppress: z$1.ZodOptional<z$1.ZodBoolean>;
        tint: z$1.ZodOptional<z$1.ZodObject<{
            dark: z$1.ZodString;
            light: z$1.ZodString;
        }, z$1.core.$strip>>;
        title: z$1.ZodOptional<z$1.ZodString>;
    }, z$1.core.$strip>>;
    sourceSeqEnd: z$1.ZodNumber;
    sourceSeqStart: z$1.ZodNumber;
    startedAt: z$1.ZodNumber;
    status: z$1.ZodEnum<{
        completed: "completed";
        error: "error";
        interrupted: "interrupted";
        pending: "pending";
    }>;
    stderr: z$1.ZodNullable<z$1.ZodString>;
    stdout: z$1.ZodNullable<z$1.ZodString>;
    threadId: z$1.ZodString;
    turnId: z$1.ZodNullable<z$1.ZodString>;
    workKind: z$1.ZodLiteral<"file-change">;
}, z$1.core.$strip>;
type TimelineFileChangeWorkRow = z$1.infer<typeof timelineFileChangeWorkRowSchema>;
declare const timelineWebSearchWorkRowSchema: z$1.ZodObject<{
    callId: z$1.ZodString;
    completedAt: z$1.ZodNullable<z$1.ZodNumber>;
    createdAt: z$1.ZodNumber;
    id: z$1.ZodString;
    kind: z$1.ZodLiteral<"work">;
    presentation: z$1.ZodOptional<z$1.ZodObject<{
        badge: z$1.ZodOptional<z$1.ZodObject<{
            glyph: z$1.ZodString;
            hint: z$1.ZodString;
            label: z$1.ZodString;
            tone: z$1.ZodEnum<{
                destructive: "destructive";
                neutral: "neutral";
            }>;
        }, z$1.core.$strip>>;
        detail: z$1.ZodOptional<z$1.ZodString>;
        icon: z$1.ZodObject<{
            glyph: z$1.ZodString;
        }, z$1.core.$strip>;
        label: z$1.ZodObject<{
            completed: z$1.ZodString;
            pending: z$1.ZodString;
        }, z$1.core.$strip>;
        suppress: z$1.ZodOptional<z$1.ZodBoolean>;
        tint: z$1.ZodOptional<z$1.ZodObject<{
            dark: z$1.ZodString;
            light: z$1.ZodString;
        }, z$1.core.$strip>>;
        title: z$1.ZodOptional<z$1.ZodString>;
    }, z$1.core.$strip>>;
    queries: z$1.ZodArray<z$1.ZodString>;
    sourceSeqEnd: z$1.ZodNumber;
    sourceSeqStart: z$1.ZodNumber;
    startedAt: z$1.ZodNumber;
    status: z$1.ZodEnum<{
        completed: "completed";
        error: "error";
        interrupted: "interrupted";
        pending: "pending";
    }>;
    threadId: z$1.ZodString;
    turnId: z$1.ZodNullable<z$1.ZodString>;
    workKind: z$1.ZodLiteral<"web-search">;
}, z$1.core.$strip>;
type TimelineWebSearchWorkRow = z$1.infer<typeof timelineWebSearchWorkRowSchema>;
declare const timelineWebFetchWorkRowSchema: z$1.ZodObject<{
    callId: z$1.ZodString;
    completedAt: z$1.ZodNullable<z$1.ZodNumber>;
    createdAt: z$1.ZodNumber;
    id: z$1.ZodString;
    kind: z$1.ZodLiteral<"work">;
    pattern: z$1.ZodNullable<z$1.ZodString>;
    presentation: z$1.ZodOptional<z$1.ZodObject<{
        badge: z$1.ZodOptional<z$1.ZodObject<{
            glyph: z$1.ZodString;
            hint: z$1.ZodString;
            label: z$1.ZodString;
            tone: z$1.ZodEnum<{
                destructive: "destructive";
                neutral: "neutral";
            }>;
        }, z$1.core.$strip>>;
        detail: z$1.ZodOptional<z$1.ZodString>;
        icon: z$1.ZodObject<{
            glyph: z$1.ZodString;
        }, z$1.core.$strip>;
        label: z$1.ZodObject<{
            completed: z$1.ZodString;
            pending: z$1.ZodString;
        }, z$1.core.$strip>;
        suppress: z$1.ZodOptional<z$1.ZodBoolean>;
        tint: z$1.ZodOptional<z$1.ZodObject<{
            dark: z$1.ZodString;
            light: z$1.ZodString;
        }, z$1.core.$strip>>;
        title: z$1.ZodOptional<z$1.ZodString>;
    }, z$1.core.$strip>>;
    prompt: z$1.ZodNullable<z$1.ZodString>;
    sourceSeqEnd: z$1.ZodNumber;
    sourceSeqStart: z$1.ZodNumber;
    startedAt: z$1.ZodNumber;
    status: z$1.ZodEnum<{
        completed: "completed";
        error: "error";
        interrupted: "interrupted";
        pending: "pending";
    }>;
    threadId: z$1.ZodString;
    turnId: z$1.ZodNullable<z$1.ZodString>;
    url: z$1.ZodString;
    workKind: z$1.ZodLiteral<"web-fetch">;
}, z$1.core.$strip>;
type TimelineWebFetchWorkRow = z$1.infer<typeof timelineWebFetchWorkRowSchema>;
declare const timelineImageViewWorkRowSchema: z$1.ZodObject<{
    callId: z$1.ZodString;
    completedAt: z$1.ZodNullable<z$1.ZodNumber>;
    createdAt: z$1.ZodNumber;
    id: z$1.ZodString;
    kind: z$1.ZodLiteral<"work">;
    path: z$1.ZodString;
    presentation: z$1.ZodOptional<z$1.ZodObject<{
        badge: z$1.ZodOptional<z$1.ZodObject<{
            glyph: z$1.ZodString;
            hint: z$1.ZodString;
            label: z$1.ZodString;
            tone: z$1.ZodEnum<{
                destructive: "destructive";
                neutral: "neutral";
            }>;
        }, z$1.core.$strip>>;
        detail: z$1.ZodOptional<z$1.ZodString>;
        icon: z$1.ZodObject<{
            glyph: z$1.ZodString;
        }, z$1.core.$strip>;
        label: z$1.ZodObject<{
            completed: z$1.ZodString;
            pending: z$1.ZodString;
        }, z$1.core.$strip>;
        suppress: z$1.ZodOptional<z$1.ZodBoolean>;
        tint: z$1.ZodOptional<z$1.ZodObject<{
            dark: z$1.ZodString;
            light: z$1.ZodString;
        }, z$1.core.$strip>>;
        title: z$1.ZodOptional<z$1.ZodString>;
    }, z$1.core.$strip>>;
    sourceSeqEnd: z$1.ZodNumber;
    sourceSeqStart: z$1.ZodNumber;
    startedAt: z$1.ZodNumber;
    status: z$1.ZodEnum<{
        completed: "completed";
        error: "error";
        interrupted: "interrupted";
        pending: "pending";
    }>;
    threadId: z$1.ZodString;
    turnId: z$1.ZodNullable<z$1.ZodString>;
    workKind: z$1.ZodLiteral<"image-view">;
}, z$1.core.$strip>;
type TimelineImageViewWorkRow = z$1.infer<typeof timelineImageViewWorkRowSchema>;
declare const timelineImageGenerationWorkRowSchema: z$1.ZodObject<{
    callId: z$1.ZodString;
    completedAt: z$1.ZodNullable<z$1.ZodNumber>;
    createdAt: z$1.ZodNumber;
    error: z$1.ZodNullable<z$1.ZodString>;
    id: z$1.ZodString;
    kind: z$1.ZodLiteral<"work">;
    path: z$1.ZodNullable<z$1.ZodString>;
    presentation: z$1.ZodOptional<z$1.ZodObject<{
        badge: z$1.ZodOptional<z$1.ZodObject<{
            glyph: z$1.ZodString;
            hint: z$1.ZodString;
            label: z$1.ZodString;
            tone: z$1.ZodEnum<{
                destructive: "destructive";
                neutral: "neutral";
            }>;
        }, z$1.core.$strip>>;
        detail: z$1.ZodOptional<z$1.ZodString>;
        icon: z$1.ZodObject<{
            glyph: z$1.ZodString;
        }, z$1.core.$strip>;
        label: z$1.ZodObject<{
            completed: z$1.ZodString;
            pending: z$1.ZodString;
        }, z$1.core.$strip>;
        suppress: z$1.ZodOptional<z$1.ZodBoolean>;
        tint: z$1.ZodOptional<z$1.ZodObject<{
            dark: z$1.ZodString;
            light: z$1.ZodString;
        }, z$1.core.$strip>>;
        title: z$1.ZodOptional<z$1.ZodString>;
    }, z$1.core.$strip>>;
    prompt: z$1.ZodNullable<z$1.ZodString>;
    sourceSeqEnd: z$1.ZodNumber;
    sourceSeqStart: z$1.ZodNumber;
    startedAt: z$1.ZodNumber;
    status: z$1.ZodEnum<{
        completed: "completed";
        error: "error";
        interrupted: "interrupted";
        pending: "pending";
    }>;
    threadId: z$1.ZodString;
    transparentBackground: z$1.ZodBoolean;
    turnId: z$1.ZodNullable<z$1.ZodString>;
    workKind: z$1.ZodLiteral<"image-generation">;
}, z$1.core.$strip>;
type TimelineImageGenerationWorkRow = z$1.infer<typeof timelineImageGenerationWorkRowSchema>;
declare const timelineFileReadWorkRowSchema: z$1.ZodObject<{
    callId: z$1.ZodString;
    cmd: z$1.ZodNullable<z$1.ZodString>;
    completedAt: z$1.ZodNullable<z$1.ZodNumber>;
    createdAt: z$1.ZodNumber;
    id: z$1.ZodString;
    kind: z$1.ZodLiteral<"work">;
    path: z$1.ZodString;
    presentation: z$1.ZodOptional<z$1.ZodObject<{
        badge: z$1.ZodOptional<z$1.ZodObject<{
            glyph: z$1.ZodString;
            hint: z$1.ZodString;
            label: z$1.ZodString;
            tone: z$1.ZodEnum<{
                destructive: "destructive";
                neutral: "neutral";
            }>;
        }, z$1.core.$strip>>;
        detail: z$1.ZodOptional<z$1.ZodString>;
        icon: z$1.ZodObject<{
            glyph: z$1.ZodString;
        }, z$1.core.$strip>;
        label: z$1.ZodObject<{
            completed: z$1.ZodString;
            pending: z$1.ZodString;
        }, z$1.core.$strip>;
        suppress: z$1.ZodOptional<z$1.ZodBoolean>;
        tint: z$1.ZodOptional<z$1.ZodObject<{
            dark: z$1.ZodString;
            light: z$1.ZodString;
        }, z$1.core.$strip>>;
        title: z$1.ZodOptional<z$1.ZodString>;
    }, z$1.core.$strip>>;
    sourceSeqEnd: z$1.ZodNumber;
    sourceSeqStart: z$1.ZodNumber;
    startedAt: z$1.ZodNumber;
    status: z$1.ZodEnum<{
        completed: "completed";
        error: "error";
        interrupted: "interrupted";
        pending: "pending";
    }>;
    threadId: z$1.ZodString;
    turnId: z$1.ZodNullable<z$1.ZodString>;
    workKind: z$1.ZodLiteral<"file-read">;
}, z$1.core.$strip>;
type TimelineFileReadWorkRow = z$1.infer<typeof timelineFileReadWorkRowSchema>;
declare const timelineSearchWorkRowSchema: z$1.ZodObject<{
    callId: z$1.ZodString;
    cmd: z$1.ZodNullable<z$1.ZodString>;
    completedAt: z$1.ZodNullable<z$1.ZodNumber>;
    createdAt: z$1.ZodNumber;
    id: z$1.ZodString;
    kind: z$1.ZodLiteral<"work">;
    mode: z$1.ZodEnum<{
        content: "content";
        list: "list";
        path: "path";
    }>;
    path: z$1.ZodNullable<z$1.ZodString>;
    presentation: z$1.ZodOptional<z$1.ZodObject<{
        badge: z$1.ZodOptional<z$1.ZodObject<{
            glyph: z$1.ZodString;
            hint: z$1.ZodString;
            label: z$1.ZodString;
            tone: z$1.ZodEnum<{
                destructive: "destructive";
                neutral: "neutral";
            }>;
        }, z$1.core.$strip>>;
        detail: z$1.ZodOptional<z$1.ZodString>;
        icon: z$1.ZodObject<{
            glyph: z$1.ZodString;
        }, z$1.core.$strip>;
        label: z$1.ZodObject<{
            completed: z$1.ZodString;
            pending: z$1.ZodString;
        }, z$1.core.$strip>;
        suppress: z$1.ZodOptional<z$1.ZodBoolean>;
        tint: z$1.ZodOptional<z$1.ZodObject<{
            dark: z$1.ZodString;
            light: z$1.ZodString;
        }, z$1.core.$strip>>;
        title: z$1.ZodOptional<z$1.ZodString>;
    }, z$1.core.$strip>>;
    query: z$1.ZodString;
    sourceSeqEnd: z$1.ZodNumber;
    sourceSeqStart: z$1.ZodNumber;
    startedAt: z$1.ZodNumber;
    status: z$1.ZodEnum<{
        completed: "completed";
        error: "error";
        interrupted: "interrupted";
        pending: "pending";
    }>;
    threadId: z$1.ZodString;
    turnId: z$1.ZodNullable<z$1.ZodString>;
    workKind: z$1.ZodLiteral<"search">;
}, z$1.core.$strip>;
type TimelineSearchWorkRow = z$1.infer<typeof timelineSearchWorkRowSchema>;
declare const timelinePlanStepsWorkRowSchema: z$1.ZodObject<{
    callId: z$1.ZodString;
    completedAt: z$1.ZodNullable<z$1.ZodNumber>;
    createdAt: z$1.ZodNumber;
    explanation: z$1.ZodNullable<z$1.ZodString>;
    id: z$1.ZodString;
    kind: z$1.ZodLiteral<"work">;
    presentation: z$1.ZodOptional<z$1.ZodObject<{
        badge: z$1.ZodOptional<z$1.ZodObject<{
            glyph: z$1.ZodString;
            hint: z$1.ZodString;
            label: z$1.ZodString;
            tone: z$1.ZodEnum<{
                destructive: "destructive";
                neutral: "neutral";
            }>;
        }, z$1.core.$strip>>;
        detail: z$1.ZodOptional<z$1.ZodString>;
        icon: z$1.ZodObject<{
            glyph: z$1.ZodString;
        }, z$1.core.$strip>;
        label: z$1.ZodObject<{
            completed: z$1.ZodString;
            pending: z$1.ZodString;
        }, z$1.core.$strip>;
        suppress: z$1.ZodOptional<z$1.ZodBoolean>;
        tint: z$1.ZodOptional<z$1.ZodObject<{
            dark: z$1.ZodString;
            light: z$1.ZodString;
        }, z$1.core.$strip>>;
        title: z$1.ZodOptional<z$1.ZodString>;
    }, z$1.core.$strip>>;
    sourceSeqEnd: z$1.ZodNumber;
    sourceSeqStart: z$1.ZodNumber;
    startedAt: z$1.ZodNumber;
    status: z$1.ZodEnum<{
        completed: "completed";
        error: "error";
        interrupted: "interrupted";
        pending: "pending";
    }>;
    steps: z$1.ZodArray<z$1.ZodObject<{
        status: z$1.ZodOptional<z$1.ZodEnum<{
            active: "active";
            completed: "completed";
            failed: "failed";
            pending: "pending";
        }>>;
        step: z$1.ZodString;
    }, z$1.core.$strip>>;
    threadId: z$1.ZodString;
    turnId: z$1.ZodNullable<z$1.ZodString>;
    workKind: z$1.ZodLiteral<"plan-steps">;
}, z$1.core.$strip>;
type TimelinePlanStepsWorkRow = z$1.infer<typeof timelinePlanStepsWorkRowSchema>;
declare const timelineExtensionWorkRowSchema: z$1.ZodObject<{
    callId: z$1.ZodString;
    completedAt: z$1.ZodNullable<z$1.ZodNumber>;
    createdAt: z$1.ZodNumber;
    extensionKind: z$1.ZodString & z$1.ZodType<`${string}/${string}`, string, z$1.core.$ZodTypeInternals<`${string}/${string}`, string>>;
    id: z$1.ZodString;
    kind: z$1.ZodLiteral<"work">;
    payload: z$1.ZodType<JsonValue, unknown, z$1.core.$ZodTypeInternals<JsonValue, unknown>>;
    presentation: z$1.ZodObject<{
        badge: z$1.ZodOptional<z$1.ZodObject<{
            glyph: z$1.ZodString;
            hint: z$1.ZodString;
            label: z$1.ZodString;
            tone: z$1.ZodEnum<{
                destructive: "destructive";
                neutral: "neutral";
            }>;
        }, z$1.core.$strip>>;
        detail: z$1.ZodOptional<z$1.ZodString>;
        icon: z$1.ZodObject<{
            glyph: z$1.ZodString;
        }, z$1.core.$strip>;
        label: z$1.ZodObject<{
            completed: z$1.ZodString;
            pending: z$1.ZodString;
        }, z$1.core.$strip>;
        suppress: z$1.ZodOptional<z$1.ZodBoolean>;
        tint: z$1.ZodOptional<z$1.ZodObject<{
            dark: z$1.ZodString;
            light: z$1.ZodString;
        }, z$1.core.$strip>>;
        title: z$1.ZodOptional<z$1.ZodString>;
    }, z$1.core.$strip>;
    sourceSeqEnd: z$1.ZodNumber;
    sourceSeqStart: z$1.ZodNumber;
    startedAt: z$1.ZodNumber;
    status: z$1.ZodEnum<{
        completed: "completed";
        error: "error";
        interrupted: "interrupted";
        pending: "pending";
    }>;
    threadId: z$1.ZodString;
    turnId: z$1.ZodNullable<z$1.ZodString>;
    workKind: z$1.ZodLiteral<"extension">;
}, z$1.core.$strip>;
type TimelineExtensionWorkRow = z$1.infer<typeof timelineExtensionWorkRowSchema>;
declare const timelineApprovalWorkRowSchema: z$1.ZodDiscriminatedUnion<[z$1.ZodObject<{
    approvalKind: z$1.ZodLiteral<"file-edit">;
    createdAt: z$1.ZodNumber;
    id: z$1.ZodString;
    interactionId: z$1.ZodString;
    kind: z$1.ZodLiteral<"work">;
    lifecycle: z$1.ZodEnum<{
        denied: "denied";
        waiting: "waiting";
    }>;
    sourceSeqEnd: z$1.ZodNumber;
    sourceSeqStart: z$1.ZodNumber;
    startedAt: z$1.ZodNumber;
    status: z$1.ZodEnum<{
        completed: "completed";
        error: "error";
        interrupted: "interrupted";
        pending: "pending";
    }>;
    target: z$1.ZodObject<{
        itemId: z$1.ZodString;
        toolName: z$1.ZodNullable<z$1.ZodString>;
    }, z$1.core.$strip>;
    threadId: z$1.ZodString;
    turnId: z$1.ZodNullable<z$1.ZodString>;
    workKind: z$1.ZodLiteral<"approval">;
}, z$1.core.$strip>, z$1.ZodObject<{
    approvalKind: z$1.ZodLiteral<"permission-grant">;
    createdAt: z$1.ZodNumber;
    grantScope: z$1.ZodNullable<z$1.ZodEnum<{
        session: "session";
        turn: "turn";
    }>>;
    id: z$1.ZodString;
    interactionId: z$1.ZodString;
    kind: z$1.ZodLiteral<"work">;
    lifecycle: z$1.ZodEnum<{
        denied: "denied";
        granted: "granted";
        interrupted: "interrupted";
        pending: "pending";
        resolving: "resolving";
    }>;
    sourceSeqEnd: z$1.ZodNumber;
    sourceSeqStart: z$1.ZodNumber;
    startedAt: z$1.ZodNumber;
    status: z$1.ZodEnum<{
        completed: "completed";
        error: "error";
        interrupted: "interrupted";
        pending: "pending";
    }>;
    statusReason: z$1.ZodNullable<z$1.ZodString>;
    target: z$1.ZodObject<{
        itemId: z$1.ZodString;
        toolName: z$1.ZodNullable<z$1.ZodString>;
    }, z$1.core.$strip>;
    threadId: z$1.ZodString;
    turnId: z$1.ZodNullable<z$1.ZodString>;
    workKind: z$1.ZodLiteral<"approval">;
}, z$1.core.$strip>], "approvalKind">;
type TimelineApprovalWorkRow = z$1.infer<typeof timelineApprovalWorkRowSchema>;
declare const timelineFormWorkRowSchema: z$1.ZodObject<{
    createdAt: z$1.ZodNumber;
    id: z$1.ZodString;
    interactionId: z$1.ZodString;
    kind: z$1.ZodLiteral<"work">;
    lifecycle: z$1.ZodEnum<{
        cancelled: "cancelled";
        pending: "pending";
        submitted: "submitted";
    }>;
    payload: z$1.ZodNullable<z$1.ZodType<JsonValue, unknown, z$1.core.$ZodTypeInternals<JsonValue, unknown>>>;
    pluginId: z$1.ZodString;
    presentation: z$1.ZodObject<{
        badge: z$1.ZodOptional<z$1.ZodObject<{
            glyph: z$1.ZodString;
            hint: z$1.ZodString;
            label: z$1.ZodString;
            tone: z$1.ZodEnum<{
                destructive: "destructive";
                neutral: "neutral";
            }>;
        }, z$1.core.$strip>>;
        detail: z$1.ZodOptional<z$1.ZodString>;
        icon: z$1.ZodObject<{
            glyph: z$1.ZodString;
        }, z$1.core.$strip>;
        label: z$1.ZodObject<{
            completed: z$1.ZodString;
            pending: z$1.ZodString;
        }, z$1.core.$strip>;
        suppress: z$1.ZodOptional<z$1.ZodBoolean>;
        tint: z$1.ZodOptional<z$1.ZodObject<{
            dark: z$1.ZodString;
            light: z$1.ZodString;
        }, z$1.core.$strip>>;
        title: z$1.ZodOptional<z$1.ZodString>;
    }, z$1.core.$strip>;
    rendererId: z$1.ZodString;
    sourceSeqEnd: z$1.ZodNumber;
    sourceSeqStart: z$1.ZodNumber;
    startedAt: z$1.ZodNumber;
    status: z$1.ZodEnum<{
        completed: "completed";
        error: "error";
        interrupted: "interrupted";
        pending: "pending";
    }>;
    statusReason: z$1.ZodNullable<z$1.ZodString>;
    threadId: z$1.ZodString;
    title: z$1.ZodString;
    turnId: z$1.ZodNullable<z$1.ZodString>;
    workKind: z$1.ZodLiteral<"form">;
}, z$1.core.$strip>;
type TimelineFormWorkRow = z$1.infer<typeof timelineFormWorkRowSchema>;
declare const timelineQuestionWorkRowSchema: z$1.ZodObject<{
    answers: z$1.ZodNullable<z$1.ZodRecord<z$1.ZodString, z$1.ZodObject<{
        freeText: z$1.ZodOptional<z$1.ZodString>;
        selected: z$1.ZodArray<z$1.ZodString>;
    }, z$1.core.$strip>>>;
    createdAt: z$1.ZodNumber;
    id: z$1.ZodString;
    interactionId: z$1.ZodString;
    kind: z$1.ZodLiteral<"work">;
    lifecycle: z$1.ZodEnum<{
        answered: "answered";
        interrupted: "interrupted";
        pending: "pending";
        resolving: "resolving";
    }>;
    questions: z$1.ZodArray<z$1.ZodObject<{
        allowFreeText: z$1.ZodBoolean;
        id: z$1.ZodString;
        multiSelect: z$1.ZodBoolean;
        options: z$1.ZodOptional<z$1.ZodArray<z$1.ZodObject<{
            description: z$1.ZodOptional<z$1.ZodString>;
            label: z$1.ZodString;
            value: z$1.ZodString;
        }, z$1.core.$strip>>>;
        prompt: z$1.ZodString;
        shortLabel: z$1.ZodOptional<z$1.ZodString>;
    }, z$1.core.$strip>>;
    sourceSeqEnd: z$1.ZodNumber;
    sourceSeqStart: z$1.ZodNumber;
    startedAt: z$1.ZodNumber;
    status: z$1.ZodEnum<{
        completed: "completed";
        error: "error";
        interrupted: "interrupted";
        pending: "pending";
    }>;
    statusReason: z$1.ZodNullable<z$1.ZodString>;
    threadId: z$1.ZodString;
    turnId: z$1.ZodNullable<z$1.ZodString>;
    workKind: z$1.ZodLiteral<"question">;
}, z$1.core.$strip>;
type TimelineQuestionWorkRow = z$1.infer<typeof timelineQuestionWorkRowSchema>;
interface TimelineDelegationWorkRow extends TimelineWorkRowBase {
    workKind: "delegation";
    callId: string;
    toolName: string;
    childRef: string | null;
    background: boolean;
    subagentType: string | null;
    description: string | null;
    output: string;
    completedAt: number | null;
    childRows: TimelineRow[];
    presentation?: TimelineRowPresentation;
}
declare const timelineWorkflowWorkRowSchema: z$1.ZodObject<{
    completedAt: z$1.ZodNullable<z$1.ZodNumber>;
    createdAt: z$1.ZodNumber;
    description: z$1.ZodString;
    error: z$1.ZodNullable<z$1.ZodString>;
    id: z$1.ZodString;
    itemId: z$1.ZodString;
    kind: z$1.ZodLiteral<"work">;
    model: z$1.ZodNullable<z$1.ZodString>;
    presentation: z$1.ZodOptional<z$1.ZodObject<{
        badge: z$1.ZodOptional<z$1.ZodObject<{
            glyph: z$1.ZodString;
            hint: z$1.ZodString;
            label: z$1.ZodString;
            tone: z$1.ZodEnum<{
                destructive: "destructive";
                neutral: "neutral";
            }>;
        }, z$1.core.$strip>>;
        detail: z$1.ZodOptional<z$1.ZodString>;
        icon: z$1.ZodObject<{
            glyph: z$1.ZodString;
        }, z$1.core.$strip>;
        label: z$1.ZodObject<{
            completed: z$1.ZodString;
            pending: z$1.ZodString;
        }, z$1.core.$strip>;
        suppress: z$1.ZodOptional<z$1.ZodBoolean>;
        tint: z$1.ZodOptional<z$1.ZodObject<{
            dark: z$1.ZodString;
            light: z$1.ZodString;
        }, z$1.core.$strip>>;
        title: z$1.ZodOptional<z$1.ZodString>;
    }, z$1.core.$strip>>;
    sourceSeqEnd: z$1.ZodNumber;
    sourceSeqStart: z$1.ZodNumber;
    startedAt: z$1.ZodNumber;
    status: z$1.ZodEnum<{
        completed: "completed";
        error: "error";
        interrupted: "interrupted";
        pending: "pending";
    }>;
    summary: z$1.ZodNullable<z$1.ZodString>;
    taskStatus: z$1.ZodEnum<{
        completed: "completed";
        failed: "failed";
        killed: "killed";
        paused: "paused";
        pending: "pending";
        running: "running";
        stopped: "stopped";
    }>;
    taskType: z$1.ZodString;
    threadId: z$1.ZodString;
    turnId: z$1.ZodNullable<z$1.ZodString>;
    usage: z$1.ZodNullable<z$1.ZodObject<{
        durationMs: z$1.ZodNumber;
        toolUses: z$1.ZodNumber;
        totalTokens: z$1.ZodNumber;
    }, z$1.core.$strip>>;
    workKind: z$1.ZodLiteral<"workflow">;
    workflow: z$1.ZodNullable<z$1.ZodObject<{
        agents: z$1.ZodArray<z$1.ZodObject<{
            agentType: z$1.ZodOptional<z$1.ZodString>;
            attempt: z$1.ZodNumber;
            cached: z$1.ZodBoolean;
            durationMs: z$1.ZodOptional<z$1.ZodNumber>;
            error: z$1.ZodOptional<z$1.ZodString>;
            index: z$1.ZodNumber;
            isolation: z$1.ZodOptional<z$1.ZodString>;
            label: z$1.ZodString;
            lastProgressAt: z$1.ZodNumber;
            lastToolName: z$1.ZodOptional<z$1.ZodString>;
            lastToolSummary: z$1.ZodOptional<z$1.ZodString>;
            model: z$1.ZodString;
            phaseIndex: z$1.ZodOptional<z$1.ZodNumber>;
            phaseTitle: z$1.ZodOptional<z$1.ZodString>;
            promptPreview: z$1.ZodOptional<z$1.ZodString>;
            queuedAt: z$1.ZodOptional<z$1.ZodNumber>;
            resultPreview: z$1.ZodOptional<z$1.ZodString>;
            startedAt: z$1.ZodOptional<z$1.ZodNumber>;
            state: z$1.ZodEnum<{
                done: "done";
                failed: "failed";
                queued: "queued";
                running: "running";
                skipped: "skipped";
            }>;
            tokens: z$1.ZodOptional<z$1.ZodNumber>;
            toolCalls: z$1.ZodOptional<z$1.ZodNumber>;
        }, z$1.core.$strip>>;
        phases: z$1.ZodArray<z$1.ZodObject<{
            index: z$1.ZodNumber;
            kind: z$1.ZodOptional<z$1.ZodString>;
            title: z$1.ZodString;
        }, z$1.core.$strip>>;
    }, z$1.core.$strip>>;
    workflowName: z$1.ZodNullable<z$1.ZodString>;
}, z$1.core.$strip>;
type TimelineWorkflowWorkRow = z$1.infer<typeof timelineWorkflowWorkRowSchema>;
type TimelineWorkRow = TimelineCommandWorkRow | TimelineToolWorkRow | TimelineFileChangeWorkRow | TimelineWebSearchWorkRow | TimelineWebFetchWorkRow | TimelineImageGenerationWorkRow | TimelineImageViewWorkRow | TimelineFileReadWorkRow | TimelineSearchWorkRow | TimelinePlanStepsWorkRow | TimelineExtensionWorkRow | TimelineApprovalWorkRow | TimelineQuestionWorkRow | TimelineFormWorkRow | TimelineDelegationWorkRow | TimelineWorkflowWorkRow;
interface TimelineTurnRow extends TimelineRowBase {
    kind: "turn";
    turnId: string;
    status: TimelineRowStatus;
    summaryCount: number;
    completedAt: number | null;
    children: TimelineRow[] | null;
}
type TimelineSourceRow = TimelineConversationRow | TimelineWorkRow | TimelineSystemRow;
type TimelineRow = TimelineSourceRow | TimelineTurnRow;

declare const createExecutionInputSourcesSchema: z$1.ZodObject<{
    model: z$1.ZodOptional<z$1.ZodEnum<{
        "client-preference": "client-preference";
        explicit: "explicit";
    }>>;
    permissionMode: z$1.ZodOptional<z$1.ZodEnum<{
        "client-preference": "client-preference";
        explicit: "explicit";
    }>>;
    providerId: z$1.ZodOptional<z$1.ZodEnum<{
        "client-preference": "client-preference";
        explicit: "explicit";
    }>>;
    reasoningLevel: z$1.ZodOptional<z$1.ZodEnum<{
        "client-preference": "client-preference";
        explicit: "explicit";
    }>>;
    serviceTier: z$1.ZodOptional<z$1.ZodEnum<{
        "client-preference": "client-preference";
        explicit: "explicit";
    }>>;
}, z$1.core.$strict>;
type CreateExecutionInputSources = z$1.infer<typeof createExecutionInputSourcesSchema>;
declare const createThreadRequestSchema: z$1.ZodObject<{
    environment: z$1.ZodDiscriminatedUnion<[z$1.ZodObject<{
        environmentId: z$1.ZodString;
        type: z$1.ZodLiteral<"reuse">;
    }, z$1.core.$strip>, z$1.ZodObject<{
        hostId: z$1.ZodOptional<z$1.ZodString>;
        type: z$1.ZodLiteral<"host">;
        workspace: z$1.ZodDiscriminatedUnion<[z$1.ZodObject<{
            branch: z$1.ZodOptional<z$1.ZodDiscriminatedUnion<[z$1.ZodObject<{
                kind: z$1.ZodLiteral<"existing">;
                name: z$1.ZodString;
            }, z$1.core.$strict>, z$1.ZodObject<{
                baseBranch: z$1.ZodString;
                kind: z$1.ZodLiteral<"new">;
            }, z$1.core.$strict>], "kind">>;
            path: z$1.ZodNullable<z$1.ZodString>;
            type: z$1.ZodLiteral<"unmanaged">;
        }, z$1.core.$strip>, z$1.ZodObject<{
            baseBranch: z$1.ZodDiscriminatedUnion<[z$1.ZodObject<{
                kind: z$1.ZodLiteral<"named">;
                name: z$1.ZodString;
            }, z$1.core.$strip>, z$1.ZodObject<{
                kind: z$1.ZodLiteral<"default">;
            }, z$1.core.$strip>], "kind">;
            type: z$1.ZodLiteral<"managed-worktree">;
        }, z$1.core.$strip>, z$1.ZodObject<{
            type: z$1.ZodLiteral<"personal">;
        }, z$1.core.$strip>], "type">;
    }, z$1.core.$strip>, z$1.ZodObject<{
        type: z$1.ZodLiteral<"project-default">;
    }, z$1.core.$strip>, z$1.ZodObject<{
        environmentProviderId: z$1.ZodString;
        inputs: z$1.ZodDefault<z$1.ZodNullable<z$1.ZodType<JsonValue, unknown, z$1.core.$ZodTypeInternals<JsonValue, unknown>>>>;
        machine: z$1.ZodOptional<z$1.ZodDiscriminatedUnion<[z$1.ZodObject<{
            hostId: z$1.ZodString;
            type: z$1.ZodLiteral<"existing">;
        }, z$1.core.$strip>, z$1.ZodObject<{
            inputs: z$1.ZodDefault<z$1.ZodNullable<z$1.ZodType<JsonValue, unknown, z$1.core.$ZodTypeInternals<JsonValue, unknown>>>>;
            machineProviderId: z$1.ZodString;
            type: z$1.ZodLiteral<"new">;
        }, z$1.core.$strip>], "type">>;
        type: z$1.ZodLiteral<"provider">;
    }, z$1.core.$strip>], "type">;
    executionInputSources: z$1.ZodOptional<z$1.ZodObject<{
        model: z$1.ZodOptional<z$1.ZodEnum<{
            "client-preference": "client-preference";
            explicit: "explicit";
        }>>;
        permissionMode: z$1.ZodOptional<z$1.ZodEnum<{
            "client-preference": "client-preference";
            explicit: "explicit";
        }>>;
        providerId: z$1.ZodOptional<z$1.ZodEnum<{
            "client-preference": "client-preference";
            explicit: "explicit";
        }>>;
        reasoningLevel: z$1.ZodOptional<z$1.ZodEnum<{
            "client-preference": "client-preference";
            explicit: "explicit";
        }>>;
        serviceTier: z$1.ZodOptional<z$1.ZodEnum<{
            "client-preference": "client-preference";
            explicit: "explicit";
        }>>;
    }, z$1.core.$strict>>;
    input: z$1.ZodArray<z$1.ZodDiscriminatedUnion<[z$1.ZodObject<{
        mentions: z$1.ZodDefault<z$1.ZodArray<z$1.ZodObject<{
            end: z$1.ZodNumber;
            resource: z$1.ZodPipe<z$1.ZodTransform<unknown, unknown>, z$1.ZodDiscriminatedUnion<[z$1.ZodObject<{
                kind: z$1.ZodLiteral<"thread">;
                label: z$1.ZodString;
                projectId: z$1.ZodOptional<z$1.ZodString>;
                threadId: z$1.ZodString;
            }, z$1.core.$strip>, z$1.ZodObject<{
                kind: z$1.ZodLiteral<"project">;
                label: z$1.ZodString;
                projectId: z$1.ZodString;
            }, z$1.core.$strip>, z$1.ZodObject<{
                kind: z$1.ZodLiteral<"section">;
                label: z$1.ZodString;
                sectionId: z$1.ZodString;
            }, z$1.core.$strip>, z$1.ZodObject<{
                entryKind: z$1.ZodEnum<{
                    directory: "directory";
                    file: "file";
                }>;
                kind: z$1.ZodLiteral<"path">;
                label: z$1.ZodString;
                path: z$1.ZodString;
                source: z$1.ZodEnum<{
                    "thread-storage": "thread-storage";
                    workspace: "workspace";
                }>;
            }, z$1.core.$strip>, z$1.ZodObject<{
                argumentHint: z$1.ZodNullable<z$1.ZodString>;
                kind: z$1.ZodLiteral<"command">;
                label: z$1.ZodString;
                name: z$1.ZodString;
                origin: z$1.ZodEnum<{
                    builtin: "builtin";
                    project: "project";
                    user: "user";
                }>;
                source: z$1.ZodEnum<{
                    command: "command";
                    skill: "skill";
                }>;
                trigger: z$1.ZodEnum<{
                    "/": "/";
                    $: "$";
                }>;
            }, z$1.core.$strip>, z$1.ZodObject<{
                icon: z$1.ZodOptional<z$1.ZodNullable<z$1.ZodString>>;
                itemId: z$1.ZodString;
                kind: z$1.ZodLiteral<"plugin">;
                label: z$1.ZodString;
                pluginId: z$1.ZodString;
            }, z$1.core.$strip>], "kind">>;
            start: z$1.ZodNumber;
        }, z$1.core.$strip>>>;
        text: z$1.ZodString;
        type: z$1.ZodLiteral<"text">;
        visibility: z$1.ZodOptional<z$1.ZodEnum<{
            "agent-only": "agent-only";
        }>>;
    }, z$1.core.$strip>, z$1.ZodObject<{
        type: z$1.ZodLiteral<"image">;
        url: z$1.ZodString;
        visibility: z$1.ZodOptional<z$1.ZodEnum<{
            "agent-only": "agent-only";
        }>>;
    }, z$1.core.$strip>, z$1.ZodObject<{
        path: z$1.ZodString;
        type: z$1.ZodLiteral<"localImage">;
        visibility: z$1.ZodOptional<z$1.ZodEnum<{
            "agent-only": "agent-only";
        }>>;
    }, z$1.core.$strip>, z$1.ZodObject<{
        mimeType: z$1.ZodOptional<z$1.ZodString>;
        name: z$1.ZodOptional<z$1.ZodString>;
        path: z$1.ZodString;
        sizeBytes: z$1.ZodOptional<z$1.ZodNumber>;
        type: z$1.ZodLiteral<"localFile">;
        visibility: z$1.ZodOptional<z$1.ZodEnum<{
            "agent-only": "agent-only";
        }>>;
    }, z$1.core.$strip>], "type">>;
    lifecycleOwnerThreadId: z$1.ZodOptional<z$1.ZodString>;
    model: z$1.ZodOptional<z$1.ZodString>;
    origin: z$1.ZodEnum<{
        app: "app";
        cli: "cli";
        plugin: "plugin";
        sdk: "sdk";
    }>;
    originKind: z$1.ZodDefault<z$1.ZodNullable<z$1.ZodEnum<{
        fork: "fork";
    }>>>;
    originPluginId: z$1.ZodOptional<z$1.ZodString>;
    parentThreadId: z$1.ZodOptional<z$1.ZodString>;
    permissionMode: z$1.ZodOptional<z$1.ZodPipe<z$1.ZodUnion<readonly [z$1.ZodEnum<{
        "accept-edits": "accept-edits";
        auto: "auto";
        full: "full";
    }>, z$1.ZodLiteral<"workspace-write">]>, z$1.ZodTransform<"accept-edits" | "auto" | "full", "accept-edits" | "auto" | "full" | "workspace-write">>>;
    pluginMetadata: z$1.ZodOptional<z$1.ZodType<JsonObject, unknown, z$1.core.$ZodTypeInternals<JsonObject, unknown>>>;
    pluginSubmission: z$1.ZodOptional<z$1.ZodObject<{
        data: z$1.ZodType<JsonValue, unknown, z$1.core.$ZodTypeInternals<JsonValue, unknown>>;
        pluginId: z$1.ZodString;
    }, z$1.core.$strip>>;
    projectId: z$1.ZodString;
    providerId: z$1.ZodOptional<z$1.ZodString>;
    reasoningLevel: z$1.ZodOptional<z$1.ZodEnum<{
        high: "high";
        low: "low";
        max: "max";
        medium: "medium";
        none: "none";
        ultra: "ultra";
        ultracode: "ultracode";
        xhigh: "xhigh";
    }>>;
    sectionId: z$1.ZodOptional<z$1.ZodNullable<z$1.ZodString>>;
    sendAt: z$1.ZodOptional<z$1.ZodNumber>;
    serviceTier: z$1.ZodOptional<z$1.ZodEnum<{
        default: "default";
        fast: "fast";
    }>>;
    sourceSeqEnd: z$1.ZodOptional<z$1.ZodNumber>;
    sourceThreadId: z$1.ZodOptional<z$1.ZodString>;
    startedOnBehalfOf: z$1.ZodDefault<z$1.ZodNullable<z$1.ZodObject<{
        initiator: z$1.ZodEnum<{
            agent: "agent";
            system: "system";
        }>;
        senderThreadId: z$1.ZodString;
    }, z$1.core.$strip>>>;
    title: z$1.ZodOptional<z$1.ZodString>;
    visibility: z$1.ZodOptional<z$1.ZodEnum<{
        hidden: "hidden";
        visible: "visible";
    }>>;
}, z$1.core.$strip>;
type CreateThreadRequest = z$1.infer<typeof createThreadRequestSchema>;
declare const forkThreadRequestSchema: z$1.ZodObject<{
    agentContextSeed: z$1.ZodOptional<z$1.ZodArray<z$1.ZodIntersection<z$1.ZodDiscriminatedUnion<[z$1.ZodObject<{
        mentions: z$1.ZodDefault<z$1.ZodArray<z$1.ZodObject<{
            end: z$1.ZodNumber;
            resource: z$1.ZodPipe<z$1.ZodTransform<unknown, unknown>, z$1.ZodDiscriminatedUnion<[z$1.ZodObject<{
                kind: z$1.ZodLiteral<"thread">;
                label: z$1.ZodString;
                projectId: z$1.ZodOptional<z$1.ZodString>;
                threadId: z$1.ZodString;
            }, z$1.core.$strip>, z$1.ZodObject<{
                kind: z$1.ZodLiteral<"project">;
                label: z$1.ZodString;
                projectId: z$1.ZodString;
            }, z$1.core.$strip>, z$1.ZodObject<{
                kind: z$1.ZodLiteral<"section">;
                label: z$1.ZodString;
                sectionId: z$1.ZodString;
            }, z$1.core.$strip>, z$1.ZodObject<{
                entryKind: z$1.ZodEnum<{
                    directory: "directory";
                    file: "file";
                }>;
                kind: z$1.ZodLiteral<"path">;
                label: z$1.ZodString;
                path: z$1.ZodString;
                source: z$1.ZodEnum<{
                    "thread-storage": "thread-storage";
                    workspace: "workspace";
                }>;
            }, z$1.core.$strip>, z$1.ZodObject<{
                argumentHint: z$1.ZodNullable<z$1.ZodString>;
                kind: z$1.ZodLiteral<"command">;
                label: z$1.ZodString;
                name: z$1.ZodString;
                origin: z$1.ZodEnum<{
                    builtin: "builtin";
                    project: "project";
                    user: "user";
                }>;
                source: z$1.ZodEnum<{
                    command: "command";
                    skill: "skill";
                }>;
                trigger: z$1.ZodEnum<{
                    "/": "/";
                    $: "$";
                }>;
            }, z$1.core.$strip>, z$1.ZodObject<{
                icon: z$1.ZodOptional<z$1.ZodNullable<z$1.ZodString>>;
                itemId: z$1.ZodString;
                kind: z$1.ZodLiteral<"plugin">;
                label: z$1.ZodString;
                pluginId: z$1.ZodString;
            }, z$1.core.$strip>], "kind">>;
            start: z$1.ZodNumber;
        }, z$1.core.$strip>>>;
        text: z$1.ZodString;
        type: z$1.ZodLiteral<"text">;
        visibility: z$1.ZodOptional<z$1.ZodEnum<{
            "agent-only": "agent-only";
        }>>;
    }, z$1.core.$strip>, z$1.ZodObject<{
        type: z$1.ZodLiteral<"image">;
        url: z$1.ZodString;
        visibility: z$1.ZodOptional<z$1.ZodEnum<{
            "agent-only": "agent-only";
        }>>;
    }, z$1.core.$strip>, z$1.ZodObject<{
        path: z$1.ZodString;
        type: z$1.ZodLiteral<"localImage">;
        visibility: z$1.ZodOptional<z$1.ZodEnum<{
            "agent-only": "agent-only";
        }>>;
    }, z$1.core.$strip>, z$1.ZodObject<{
        mimeType: z$1.ZodOptional<z$1.ZodString>;
        name: z$1.ZodOptional<z$1.ZodString>;
        path: z$1.ZodString;
        sizeBytes: z$1.ZodOptional<z$1.ZodNumber>;
        type: z$1.ZodLiteral<"localFile">;
        visibility: z$1.ZodOptional<z$1.ZodEnum<{
            "agent-only": "agent-only";
        }>>;
    }, z$1.core.$strip>], "type">, z$1.ZodObject<{
        visibility: z$1.ZodLiteral<"agent-only">;
    }, z$1.core.$strip>>>>;
    environment: z$1.ZodOptional<z$1.ZodDiscriminatedUnion<[z$1.ZodObject<{
        environmentId: z$1.ZodString;
        type: z$1.ZodLiteral<"reuse">;
    }, z$1.core.$strip>, z$1.ZodObject<{
        hostId: z$1.ZodOptional<z$1.ZodString>;
        type: z$1.ZodLiteral<"host">;
        workspace: z$1.ZodDiscriminatedUnion<[z$1.ZodObject<{
            branch: z$1.ZodOptional<z$1.ZodDiscriminatedUnion<[z$1.ZodObject<{
                kind: z$1.ZodLiteral<"existing">;
                name: z$1.ZodString;
            }, z$1.core.$strict>, z$1.ZodObject<{
                baseBranch: z$1.ZodString;
                kind: z$1.ZodLiteral<"new">;
            }, z$1.core.$strict>], "kind">>;
            path: z$1.ZodNullable<z$1.ZodString>;
            type: z$1.ZodLiteral<"unmanaged">;
        }, z$1.core.$strip>, z$1.ZodObject<{
            baseBranch: z$1.ZodDiscriminatedUnion<[z$1.ZodObject<{
                kind: z$1.ZodLiteral<"named">;
                name: z$1.ZodString;
            }, z$1.core.$strip>, z$1.ZodObject<{
                kind: z$1.ZodLiteral<"default">;
            }, z$1.core.$strip>], "kind">;
            type: z$1.ZodLiteral<"managed-worktree">;
        }, z$1.core.$strip>, z$1.ZodObject<{
            type: z$1.ZodLiteral<"personal">;
        }, z$1.core.$strip>], "type">;
    }, z$1.core.$strip>, z$1.ZodObject<{
        type: z$1.ZodLiteral<"project-default">;
    }, z$1.core.$strip>, z$1.ZodObject<{
        environmentProviderId: z$1.ZodString;
        inputs: z$1.ZodDefault<z$1.ZodNullable<z$1.ZodType<JsonValue, unknown, z$1.core.$ZodTypeInternals<JsonValue, unknown>>>>;
        machine: z$1.ZodOptional<z$1.ZodDiscriminatedUnion<[z$1.ZodObject<{
            hostId: z$1.ZodString;
            type: z$1.ZodLiteral<"existing">;
        }, z$1.core.$strip>, z$1.ZodObject<{
            inputs: z$1.ZodDefault<z$1.ZodNullable<z$1.ZodType<JsonValue, unknown, z$1.core.$ZodTypeInternals<JsonValue, unknown>>>>;
            machineProviderId: z$1.ZodString;
            type: z$1.ZodLiteral<"new">;
        }, z$1.core.$strip>], "type">>;
        type: z$1.ZodLiteral<"provider">;
    }, z$1.core.$strip>], "type">>;
    input: z$1.ZodOptional<z$1.ZodArray<z$1.ZodDiscriminatedUnion<[z$1.ZodObject<{
        mentions: z$1.ZodDefault<z$1.ZodArray<z$1.ZodObject<{
            end: z$1.ZodNumber;
            resource: z$1.ZodPipe<z$1.ZodTransform<unknown, unknown>, z$1.ZodDiscriminatedUnion<[z$1.ZodObject<{
                kind: z$1.ZodLiteral<"thread">;
                label: z$1.ZodString;
                projectId: z$1.ZodOptional<z$1.ZodString>;
                threadId: z$1.ZodString;
            }, z$1.core.$strip>, z$1.ZodObject<{
                kind: z$1.ZodLiteral<"project">;
                label: z$1.ZodString;
                projectId: z$1.ZodString;
            }, z$1.core.$strip>, z$1.ZodObject<{
                kind: z$1.ZodLiteral<"section">;
                label: z$1.ZodString;
                sectionId: z$1.ZodString;
            }, z$1.core.$strip>, z$1.ZodObject<{
                entryKind: z$1.ZodEnum<{
                    directory: "directory";
                    file: "file";
                }>;
                kind: z$1.ZodLiteral<"path">;
                label: z$1.ZodString;
                path: z$1.ZodString;
                source: z$1.ZodEnum<{
                    "thread-storage": "thread-storage";
                    workspace: "workspace";
                }>;
            }, z$1.core.$strip>, z$1.ZodObject<{
                argumentHint: z$1.ZodNullable<z$1.ZodString>;
                kind: z$1.ZodLiteral<"command">;
                label: z$1.ZodString;
                name: z$1.ZodString;
                origin: z$1.ZodEnum<{
                    builtin: "builtin";
                    project: "project";
                    user: "user";
                }>;
                source: z$1.ZodEnum<{
                    command: "command";
                    skill: "skill";
                }>;
                trigger: z$1.ZodEnum<{
                    "/": "/";
                    $: "$";
                }>;
            }, z$1.core.$strip>, z$1.ZodObject<{
                icon: z$1.ZodOptional<z$1.ZodNullable<z$1.ZodString>>;
                itemId: z$1.ZodString;
                kind: z$1.ZodLiteral<"plugin">;
                label: z$1.ZodString;
                pluginId: z$1.ZodString;
            }, z$1.core.$strip>], "kind">>;
            start: z$1.ZodNumber;
        }, z$1.core.$strip>>>;
        text: z$1.ZodString;
        type: z$1.ZodLiteral<"text">;
        visibility: z$1.ZodOptional<z$1.ZodEnum<{
            "agent-only": "agent-only";
        }>>;
    }, z$1.core.$strip>, z$1.ZodObject<{
        type: z$1.ZodLiteral<"image">;
        url: z$1.ZodString;
        visibility: z$1.ZodOptional<z$1.ZodEnum<{
            "agent-only": "agent-only";
        }>>;
    }, z$1.core.$strip>, z$1.ZodObject<{
        path: z$1.ZodString;
        type: z$1.ZodLiteral<"localImage">;
        visibility: z$1.ZodOptional<z$1.ZodEnum<{
            "agent-only": "agent-only";
        }>>;
    }, z$1.core.$strip>, z$1.ZodObject<{
        mimeType: z$1.ZodOptional<z$1.ZodString>;
        name: z$1.ZodOptional<z$1.ZodString>;
        path: z$1.ZodString;
        sizeBytes: z$1.ZodOptional<z$1.ZodNumber>;
        type: z$1.ZodLiteral<"localFile">;
        visibility: z$1.ZodOptional<z$1.ZodEnum<{
            "agent-only": "agent-only";
        }>>;
    }, z$1.core.$strip>], "type">>>;
    lifecycleOwnerThreadId: z$1.ZodOptional<z$1.ZodString>;
    origin: z$1.ZodDefault<z$1.ZodEnum<{
        app: "app";
        cli: "cli";
        plugin: "plugin";
        sdk: "sdk";
    }>>;
    originPluginId: z$1.ZodOptional<z$1.ZodString>;
    permissionMode: z$1.ZodOptional<z$1.ZodPipe<z$1.ZodUnion<readonly [z$1.ZodEnum<{
        "accept-edits": "accept-edits";
        auto: "auto";
        full: "full";
    }>, z$1.ZodLiteral<"workspace-write">]>, z$1.ZodTransform<"accept-edits" | "auto" | "full", "accept-edits" | "auto" | "full" | "workspace-write">>>;
    pluginMetadata: z$1.ZodOptional<z$1.ZodType<JsonObject, unknown, z$1.core.$ZodTypeInternals<JsonObject, unknown>>>;
    sourceSeqEnd: z$1.ZodOptional<z$1.ZodNumber>;
    sourceThreadId: z$1.ZodString;
    title: z$1.ZodOptional<z$1.ZodString>;
    visibility: z$1.ZodDefault<z$1.ZodEnum<{
        hidden: "hidden";
        visible: "visible";
    }>>;
}, z$1.core.$strict>;
type ForkThreadRequest = z$1.infer<typeof forkThreadRequestSchema>;
declare const sendMessageRequestSchema: z$1.ZodObject<{
    executionInputSources: z$1.ZodOptional<z$1.ZodObject<{
        model: z$1.ZodOptional<z$1.ZodEnum<{
            "client-preference": "client-preference";
            explicit: "explicit";
        }>>;
        permissionMode: z$1.ZodOptional<z$1.ZodEnum<{
            "client-preference": "client-preference";
            explicit: "explicit";
        }>>;
        reasoningLevel: z$1.ZodOptional<z$1.ZodEnum<{
            "client-preference": "client-preference";
            explicit: "explicit";
        }>>;
        serviceTier: z$1.ZodOptional<z$1.ZodEnum<{
            "client-preference": "client-preference";
            explicit: "explicit";
        }>>;
    }, z$1.core.$strict>>;
    input: z$1.ZodArray<z$1.ZodDiscriminatedUnion<[z$1.ZodObject<{
        mentions: z$1.ZodDefault<z$1.ZodArray<z$1.ZodObject<{
            end: z$1.ZodNumber;
            resource: z$1.ZodPipe<z$1.ZodTransform<unknown, unknown>, z$1.ZodDiscriminatedUnion<[z$1.ZodObject<{
                kind: z$1.ZodLiteral<"thread">;
                label: z$1.ZodString;
                projectId: z$1.ZodOptional<z$1.ZodString>;
                threadId: z$1.ZodString;
            }, z$1.core.$strip>, z$1.ZodObject<{
                kind: z$1.ZodLiteral<"project">;
                label: z$1.ZodString;
                projectId: z$1.ZodString;
            }, z$1.core.$strip>, z$1.ZodObject<{
                kind: z$1.ZodLiteral<"section">;
                label: z$1.ZodString;
                sectionId: z$1.ZodString;
            }, z$1.core.$strip>, z$1.ZodObject<{
                entryKind: z$1.ZodEnum<{
                    directory: "directory";
                    file: "file";
                }>;
                kind: z$1.ZodLiteral<"path">;
                label: z$1.ZodString;
                path: z$1.ZodString;
                source: z$1.ZodEnum<{
                    "thread-storage": "thread-storage";
                    workspace: "workspace";
                }>;
            }, z$1.core.$strip>, z$1.ZodObject<{
                argumentHint: z$1.ZodNullable<z$1.ZodString>;
                kind: z$1.ZodLiteral<"command">;
                label: z$1.ZodString;
                name: z$1.ZodString;
                origin: z$1.ZodEnum<{
                    builtin: "builtin";
                    project: "project";
                    user: "user";
                }>;
                source: z$1.ZodEnum<{
                    command: "command";
                    skill: "skill";
                }>;
                trigger: z$1.ZodEnum<{
                    "/": "/";
                    $: "$";
                }>;
            }, z$1.core.$strip>, z$1.ZodObject<{
                icon: z$1.ZodOptional<z$1.ZodNullable<z$1.ZodString>>;
                itemId: z$1.ZodString;
                kind: z$1.ZodLiteral<"plugin">;
                label: z$1.ZodString;
                pluginId: z$1.ZodString;
            }, z$1.core.$strip>], "kind">>;
            start: z$1.ZodNumber;
        }, z$1.core.$strip>>>;
        text: z$1.ZodString;
        type: z$1.ZodLiteral<"text">;
        visibility: z$1.ZodOptional<z$1.ZodEnum<{
            "agent-only": "agent-only";
        }>>;
    }, z$1.core.$strip>, z$1.ZodObject<{
        type: z$1.ZodLiteral<"image">;
        url: z$1.ZodString;
        visibility: z$1.ZodOptional<z$1.ZodEnum<{
            "agent-only": "agent-only";
        }>>;
    }, z$1.core.$strip>, z$1.ZodObject<{
        path: z$1.ZodString;
        type: z$1.ZodLiteral<"localImage">;
        visibility: z$1.ZodOptional<z$1.ZodEnum<{
            "agent-only": "agent-only";
        }>>;
    }, z$1.core.$strip>, z$1.ZodObject<{
        mimeType: z$1.ZodOptional<z$1.ZodString>;
        name: z$1.ZodOptional<z$1.ZodString>;
        path: z$1.ZodString;
        sizeBytes: z$1.ZodOptional<z$1.ZodNumber>;
        type: z$1.ZodLiteral<"localFile">;
        visibility: z$1.ZodOptional<z$1.ZodEnum<{
            "agent-only": "agent-only";
        }>>;
    }, z$1.core.$strip>], "type">>;
    mode: z$1.ZodEnum<{
        "queue-if-active": "queue-if-active";
        "steer-if-active": "steer-if-active";
        auto: "auto";
        start: "start";
        steer: "steer";
    }>;
    model: z$1.ZodOptional<z$1.ZodString>;
    permissionMode: z$1.ZodOptional<z$1.ZodPipe<z$1.ZodUnion<readonly [z$1.ZodEnum<{
        "accept-edits": "accept-edits";
        auto: "auto";
        full: "full";
    }>, z$1.ZodLiteral<"workspace-write">]>, z$1.ZodTransform<"accept-edits" | "auto" | "full", "accept-edits" | "auto" | "full" | "workspace-write">>>;
    pluginSubmission: z$1.ZodOptional<z$1.ZodObject<{
        data: z$1.ZodType<JsonValue, unknown, z$1.core.$ZodTypeInternals<JsonValue, unknown>>;
        pluginId: z$1.ZodString;
    }, z$1.core.$strip>>;
    reasoningLevel: z$1.ZodOptional<z$1.ZodEnum<{
        high: "high";
        low: "low";
        max: "max";
        medium: "medium";
        none: "none";
        ultra: "ultra";
        ultracode: "ultracode";
        xhigh: "xhigh";
    }>>;
    sendAt: z$1.ZodOptional<z$1.ZodNumber>;
    senderThreadId: z$1.ZodOptional<z$1.ZodString>;
    serviceTier: z$1.ZodOptional<z$1.ZodEnum<{
        default: "default";
        fast: "fast";
    }>>;
}, z$1.core.$strip>;
type SendMessageRequest = z$1.infer<typeof sendMessageRequestSchema>;
/**
 * A discriminated union rather than a flat record with nullable extras: a
 * `sent` message has no queued row and no wait, and modelling those as "null
 * for now" would invite every caller to check fields that cannot exist.
 */
declare const sendMessageResponseSchema: z$1.ZodDiscriminatedUnion<[z$1.ZodObject<{
    delivery: z$1.ZodLiteral<"sent">;
    ok: z$1.ZodLiteral<true>;
}, z$1.core.$strip>, z$1.ZodObject<{
    delivery: z$1.ZodLiteral<"queued">;
    ok: z$1.ZodLiteral<true>;
    queuedMessage: z$1.ZodObject<{
        content: z$1.ZodArray<z$1.ZodDiscriminatedUnion<[z$1.ZodObject<{
            mentions: z$1.ZodDefault<z$1.ZodArray<z$1.ZodObject<{
                end: z$1.ZodNumber;
                resource: z$1.ZodPipe<z$1.ZodTransform<unknown, unknown>, z$1.ZodDiscriminatedUnion<[z$1.ZodObject<{
                    kind: z$1.ZodLiteral<"thread">;
                    label: z$1.ZodString;
                    projectId: z$1.ZodOptional<z$1.ZodString>;
                    threadId: z$1.ZodString;
                }, z$1.core.$strip>, z$1.ZodObject<{
                    kind: z$1.ZodLiteral<"project">;
                    label: z$1.ZodString;
                    projectId: z$1.ZodString;
                }, z$1.core.$strip>, z$1.ZodObject<{
                    kind: z$1.ZodLiteral<"section">;
                    label: z$1.ZodString;
                    sectionId: z$1.ZodString;
                }, z$1.core.$strip>, z$1.ZodObject<{
                    entryKind: z$1.ZodEnum<{
                        directory: "directory";
                        file: "file";
                    }>;
                    kind: z$1.ZodLiteral<"path">;
                    label: z$1.ZodString;
                    path: z$1.ZodString;
                    source: z$1.ZodEnum<{
                        "thread-storage": "thread-storage";
                        workspace: "workspace";
                    }>;
                }, z$1.core.$strip>, z$1.ZodObject<{
                    argumentHint: z$1.ZodNullable<z$1.ZodString>;
                    kind: z$1.ZodLiteral<"command">;
                    label: z$1.ZodString;
                    name: z$1.ZodString;
                    origin: z$1.ZodEnum<{
                        builtin: "builtin";
                        project: "project";
                        user: "user";
                    }>;
                    source: z$1.ZodEnum<{
                        command: "command";
                        skill: "skill";
                    }>;
                    trigger: z$1.ZodEnum<{
                        "/": "/";
                        $: "$";
                    }>;
                }, z$1.core.$strip>, z$1.ZodObject<{
                    icon: z$1.ZodOptional<z$1.ZodNullable<z$1.ZodString>>;
                    itemId: z$1.ZodString;
                    kind: z$1.ZodLiteral<"plugin">;
                    label: z$1.ZodString;
                    pluginId: z$1.ZodString;
                }, z$1.core.$strip>], "kind">>;
                start: z$1.ZodNumber;
            }, z$1.core.$strip>>>;
            text: z$1.ZodString;
            type: z$1.ZodLiteral<"text">;
            visibility: z$1.ZodOptional<z$1.ZodEnum<{
                "agent-only": "agent-only";
            }>>;
        }, z$1.core.$strip>, z$1.ZodObject<{
            type: z$1.ZodLiteral<"image">;
            url: z$1.ZodString;
            visibility: z$1.ZodOptional<z$1.ZodEnum<{
                "agent-only": "agent-only";
            }>>;
        }, z$1.core.$strip>, z$1.ZodObject<{
            path: z$1.ZodString;
            type: z$1.ZodLiteral<"localImage">;
            visibility: z$1.ZodOptional<z$1.ZodEnum<{
                "agent-only": "agent-only";
            }>>;
        }, z$1.core.$strip>, z$1.ZodObject<{
            mimeType: z$1.ZodOptional<z$1.ZodString>;
            name: z$1.ZodOptional<z$1.ZodString>;
            path: z$1.ZodString;
            sizeBytes: z$1.ZodOptional<z$1.ZodNumber>;
            type: z$1.ZodLiteral<"localFile">;
            visibility: z$1.ZodOptional<z$1.ZodEnum<{
                "agent-only": "agent-only";
            }>>;
        }, z$1.core.$strip>], "type">>;
        createdAt: z$1.ZodNumber;
        editable: z$1.ZodBoolean;
        failureReason: z$1.ZodNullable<z$1.ZodString>;
        groupWithNext: z$1.ZodBoolean;
        id: z$1.ZodString;
        initiator: z$1.ZodEnum<{
            agent: "agent";
            system: "system";
            user: "user";
        }>;
        model: z$1.ZodString;
        origin: z$1.ZodNullable<z$1.ZodEnum<{
            app: "app";
            cli: "cli";
            plugin: "plugin";
            sdk: "sdk";
        }>>;
        originPluginId: z$1.ZodNullable<z$1.ZodString>;
        payload: z$1.ZodDiscriminatedUnion<[z$1.ZodObject<{
            kind: z$1.ZodLiteral<"inline">;
        }, z$1.core.$strip>, z$1.ZodObject<{
            attempt: z$1.ZodNumber;
            kind: z$1.ZodLiteral<"retry">;
            reason: z$1.ZodString;
            retryOfTurnRequestId: z$1.ZodString;
        }, z$1.core.$strip>], "kind">;
        permissionMode: z$1.ZodEnum<{
            "accept-edits": "accept-edits";
            auto: "auto";
            full: "full";
        }>;
        reasoningLevel: z$1.ZodEnum<{
            high: "high";
            low: "low";
            max: "max";
            medium: "medium";
            none: "none";
            ultra: "ultra";
            ultracode: "ultracode";
            xhigh: "xhigh";
        }>;
        sendAt: z$1.ZodNullable<z$1.ZodNumber>;
        senderThreadId: z$1.ZodNullable<z$1.ZodString>;
        serviceTier: z$1.ZodEnum<{
            default: "default";
            fast: "fast";
        }>;
        threadId: z$1.ZodString;
        updatedAt: z$1.ZodNumber;
        waitingOn: z$1.ZodNullable<z$1.ZodDiscriminatedUnion<[z$1.ZodObject<{
            kind: z$1.ZodLiteral<"time">;
        }, z$1.core.$strip>, z$1.ZodObject<{
            kind: z$1.ZodLiteral<"thread-busy">;
        }, z$1.core.$strip>, z$1.ZodObject<{
            kind: z$1.ZodLiteral<"stopping">;
        }, z$1.core.$strip>, z$1.ZodObject<{
            kind: z$1.ZodLiteral<"turn-starting">;
        }, z$1.core.$strip>, z$1.ZodObject<{
            kind: z$1.ZodLiteral<"provisioning">;
        }, z$1.core.$strip>, z$1.ZodObject<{
            hostName: z$1.ZodString;
            kind: z$1.ZodLiteral<"host-offline">;
        }, z$1.core.$strip>, z$1.ZodObject<{
            kind: z$1.ZodLiteral<"interaction">;
        }, z$1.core.$strip>, z$1.ZodObject<{
            kind: z$1.ZodLiteral<"plugin">;
            pluginId: z$1.ZodString;
            reason: z$1.ZodString;
        }, z$1.core.$strip>], "kind">>;
    }, z$1.core.$strip>;
}, z$1.core.$strip>], "delivery">;
type SendMessageResponse = z$1.infer<typeof sendMessageResponseSchema>;
declare const editMessageRequestSchema: z$1.ZodObject<{
    executionInputSources: z$1.ZodOptional<z$1.ZodObject<{
        model: z$1.ZodOptional<z$1.ZodEnum<{
            "client-preference": "client-preference";
            explicit: "explicit";
        }>>;
        permissionMode: z$1.ZodOptional<z$1.ZodEnum<{
            "client-preference": "client-preference";
            explicit: "explicit";
        }>>;
        reasoningLevel: z$1.ZodOptional<z$1.ZodEnum<{
            "client-preference": "client-preference";
            explicit: "explicit";
        }>>;
        serviceTier: z$1.ZodOptional<z$1.ZodEnum<{
            "client-preference": "client-preference";
            explicit: "explicit";
        }>>;
    }, z$1.core.$strict>>;
    expectedRequestSequence: z$1.ZodOptional<z$1.ZodNumber>;
    input: z$1.ZodArray<z$1.ZodDiscriminatedUnion<[z$1.ZodObject<{
        mentions: z$1.ZodDefault<z$1.ZodArray<z$1.ZodObject<{
            end: z$1.ZodNumber;
            resource: z$1.ZodPipe<z$1.ZodTransform<unknown, unknown>, z$1.ZodDiscriminatedUnion<[z$1.ZodObject<{
                kind: z$1.ZodLiteral<"thread">;
                label: z$1.ZodString;
                projectId: z$1.ZodOptional<z$1.ZodString>;
                threadId: z$1.ZodString;
            }, z$1.core.$strip>, z$1.ZodObject<{
                kind: z$1.ZodLiteral<"project">;
                label: z$1.ZodString;
                projectId: z$1.ZodString;
            }, z$1.core.$strip>, z$1.ZodObject<{
                kind: z$1.ZodLiteral<"section">;
                label: z$1.ZodString;
                sectionId: z$1.ZodString;
            }, z$1.core.$strip>, z$1.ZodObject<{
                entryKind: z$1.ZodEnum<{
                    directory: "directory";
                    file: "file";
                }>;
                kind: z$1.ZodLiteral<"path">;
                label: z$1.ZodString;
                path: z$1.ZodString;
                source: z$1.ZodEnum<{
                    "thread-storage": "thread-storage";
                    workspace: "workspace";
                }>;
            }, z$1.core.$strip>, z$1.ZodObject<{
                argumentHint: z$1.ZodNullable<z$1.ZodString>;
                kind: z$1.ZodLiteral<"command">;
                label: z$1.ZodString;
                name: z$1.ZodString;
                origin: z$1.ZodEnum<{
                    builtin: "builtin";
                    project: "project";
                    user: "user";
                }>;
                source: z$1.ZodEnum<{
                    command: "command";
                    skill: "skill";
                }>;
                trigger: z$1.ZodEnum<{
                    "/": "/";
                    $: "$";
                }>;
            }, z$1.core.$strip>, z$1.ZodObject<{
                icon: z$1.ZodOptional<z$1.ZodNullable<z$1.ZodString>>;
                itemId: z$1.ZodString;
                kind: z$1.ZodLiteral<"plugin">;
                label: z$1.ZodString;
                pluginId: z$1.ZodString;
            }, z$1.core.$strip>], "kind">>;
            start: z$1.ZodNumber;
        }, z$1.core.$strip>>>;
        text: z$1.ZodString;
        type: z$1.ZodLiteral<"text">;
        visibility: z$1.ZodOptional<z$1.ZodEnum<{
            "agent-only": "agent-only";
        }>>;
    }, z$1.core.$strip>, z$1.ZodObject<{
        type: z$1.ZodLiteral<"image">;
        url: z$1.ZodString;
        visibility: z$1.ZodOptional<z$1.ZodEnum<{
            "agent-only": "agent-only";
        }>>;
    }, z$1.core.$strip>, z$1.ZodObject<{
        path: z$1.ZodString;
        type: z$1.ZodLiteral<"localImage">;
        visibility: z$1.ZodOptional<z$1.ZodEnum<{
            "agent-only": "agent-only";
        }>>;
    }, z$1.core.$strip>, z$1.ZodObject<{
        mimeType: z$1.ZodOptional<z$1.ZodString>;
        name: z$1.ZodOptional<z$1.ZodString>;
        path: z$1.ZodString;
        sizeBytes: z$1.ZodOptional<z$1.ZodNumber>;
        type: z$1.ZodLiteral<"localFile">;
        visibility: z$1.ZodOptional<z$1.ZodEnum<{
            "agent-only": "agent-only";
        }>>;
    }, z$1.core.$strip>], "type">>;
    model: z$1.ZodOptional<z$1.ZodString>;
    operationId: z$1.ZodString;
    permissionMode: z$1.ZodOptional<z$1.ZodPipe<z$1.ZodUnion<readonly [z$1.ZodEnum<{
        "accept-edits": "accept-edits";
        auto: "auto";
        full: "full";
    }>, z$1.ZodLiteral<"workspace-write">]>, z$1.ZodTransform<"accept-edits" | "auto" | "full", "accept-edits" | "auto" | "full" | "workspace-write">>>;
    reasoningLevel: z$1.ZodOptional<z$1.ZodEnum<{
        high: "high";
        low: "low";
        max: "max";
        medium: "medium";
        none: "none";
        ultra: "ultra";
        ultracode: "ultracode";
        xhigh: "xhigh";
    }>>;
    senderThreadId: z$1.ZodOptional<z$1.ZodString>;
    serviceTier: z$1.ZodOptional<z$1.ZodEnum<{
        default: "default";
        fast: "fast";
    }>>;
}, z$1.core.$strict>;
type EditMessageRequest = z$1.infer<typeof editMessageRequestSchema>;
declare const editMessageResponseSchema: z$1.ZodObject<{
    ok: z$1.ZodLiteral<true>;
    operationId: z$1.ZodString;
    requestSequence: z$1.ZodNumber;
}, z$1.core.$strict>;
type EditMessageResponse = z$1.infer<typeof editMessageResponseSchema>;
/**
 * What a retry did, mirroring `sendMessageResponseSchema`: a retry is a
 * dispatch of a turn that already exists, so it is delivered or queued on
 * exactly the same terms as a send. The two retry-specific facts ride along,
 * because a caller that let the server pick the turn has no other way to learn
 * which one it picked.
 */
declare const retryTurnResponseSchema: z$1.ZodDiscriminatedUnion<[z$1.ZodObject<{
    attempt: z$1.ZodNumber;
    delivery: z$1.ZodLiteral<"sent">;
    ok: z$1.ZodLiteral<true>;
    turnRequestId: z$1.ZodString;
}, z$1.core.$strip>, z$1.ZodObject<{
    attempt: z$1.ZodNumber;
    delivery: z$1.ZodLiteral<"queued">;
    ok: z$1.ZodLiteral<true>;
    queuedMessageId: z$1.ZodString;
    sendAt: z$1.ZodNullable<z$1.ZodNumber>;
    turnRequestId: z$1.ZodString;
    waitingOn: z$1.ZodDiscriminatedUnion<[z$1.ZodObject<{
        kind: z$1.ZodLiteral<"time">;
    }, z$1.core.$strip>, z$1.ZodObject<{
        kind: z$1.ZodLiteral<"thread-busy">;
    }, z$1.core.$strip>, z$1.ZodObject<{
        kind: z$1.ZodLiteral<"stopping">;
    }, z$1.core.$strip>, z$1.ZodObject<{
        kind: z$1.ZodLiteral<"turn-starting">;
    }, z$1.core.$strip>, z$1.ZodObject<{
        kind: z$1.ZodLiteral<"provisioning">;
    }, z$1.core.$strip>, z$1.ZodObject<{
        hostName: z$1.ZodString;
        kind: z$1.ZodLiteral<"host-offline">;
    }, z$1.core.$strip>, z$1.ZodObject<{
        kind: z$1.ZodLiteral<"interaction">;
    }, z$1.core.$strip>, z$1.ZodObject<{
        kind: z$1.ZodLiteral<"plugin">;
        pluginId: z$1.ZodString;
        reason: z$1.ZodString;
    }, z$1.core.$strip>], "kind">;
}, z$1.core.$strip>], "delivery">;
type RetryTurnResponse = z$1.infer<typeof retryTurnResponseSchema>;
declare const createQueuedMessageRequestSchema: z$1.ZodObject<{
    executionInputSources: z$1.ZodOptional<z$1.ZodObject<{
        model: z$1.ZodOptional<z$1.ZodEnum<{
            "client-preference": "client-preference";
            explicit: "explicit";
        }>>;
        permissionMode: z$1.ZodOptional<z$1.ZodEnum<{
            "client-preference": "client-preference";
            explicit: "explicit";
        }>>;
        reasoningLevel: z$1.ZodOptional<z$1.ZodEnum<{
            "client-preference": "client-preference";
            explicit: "explicit";
        }>>;
        serviceTier: z$1.ZodOptional<z$1.ZodEnum<{
            "client-preference": "client-preference";
            explicit: "explicit";
        }>>;
    }, z$1.core.$strict>>;
    input: z$1.ZodArray<z$1.ZodDiscriminatedUnion<[z$1.ZodObject<{
        mentions: z$1.ZodDefault<z$1.ZodArray<z$1.ZodObject<{
            end: z$1.ZodNumber;
            resource: z$1.ZodPipe<z$1.ZodTransform<unknown, unknown>, z$1.ZodDiscriminatedUnion<[z$1.ZodObject<{
                kind: z$1.ZodLiteral<"thread">;
                label: z$1.ZodString;
                projectId: z$1.ZodOptional<z$1.ZodString>;
                threadId: z$1.ZodString;
            }, z$1.core.$strip>, z$1.ZodObject<{
                kind: z$1.ZodLiteral<"project">;
                label: z$1.ZodString;
                projectId: z$1.ZodString;
            }, z$1.core.$strip>, z$1.ZodObject<{
                kind: z$1.ZodLiteral<"section">;
                label: z$1.ZodString;
                sectionId: z$1.ZodString;
            }, z$1.core.$strip>, z$1.ZodObject<{
                entryKind: z$1.ZodEnum<{
                    directory: "directory";
                    file: "file";
                }>;
                kind: z$1.ZodLiteral<"path">;
                label: z$1.ZodString;
                path: z$1.ZodString;
                source: z$1.ZodEnum<{
                    "thread-storage": "thread-storage";
                    workspace: "workspace";
                }>;
            }, z$1.core.$strip>, z$1.ZodObject<{
                argumentHint: z$1.ZodNullable<z$1.ZodString>;
                kind: z$1.ZodLiteral<"command">;
                label: z$1.ZodString;
                name: z$1.ZodString;
                origin: z$1.ZodEnum<{
                    builtin: "builtin";
                    project: "project";
                    user: "user";
                }>;
                source: z$1.ZodEnum<{
                    command: "command";
                    skill: "skill";
                }>;
                trigger: z$1.ZodEnum<{
                    "/": "/";
                    $: "$";
                }>;
            }, z$1.core.$strip>, z$1.ZodObject<{
                icon: z$1.ZodOptional<z$1.ZodNullable<z$1.ZodString>>;
                itemId: z$1.ZodString;
                kind: z$1.ZodLiteral<"plugin">;
                label: z$1.ZodString;
                pluginId: z$1.ZodString;
            }, z$1.core.$strip>], "kind">>;
            start: z$1.ZodNumber;
        }, z$1.core.$strip>>>;
        text: z$1.ZodString;
        type: z$1.ZodLiteral<"text">;
        visibility: z$1.ZodOptional<z$1.ZodEnum<{
            "agent-only": "agent-only";
        }>>;
    }, z$1.core.$strip>, z$1.ZodObject<{
        type: z$1.ZodLiteral<"image">;
        url: z$1.ZodString;
        visibility: z$1.ZodOptional<z$1.ZodEnum<{
            "agent-only": "agent-only";
        }>>;
    }, z$1.core.$strip>, z$1.ZodObject<{
        path: z$1.ZodString;
        type: z$1.ZodLiteral<"localImage">;
        visibility: z$1.ZodOptional<z$1.ZodEnum<{
            "agent-only": "agent-only";
        }>>;
    }, z$1.core.$strip>, z$1.ZodObject<{
        mimeType: z$1.ZodOptional<z$1.ZodString>;
        name: z$1.ZodOptional<z$1.ZodString>;
        path: z$1.ZodString;
        sizeBytes: z$1.ZodOptional<z$1.ZodNumber>;
        type: z$1.ZodLiteral<"localFile">;
        visibility: z$1.ZodOptional<z$1.ZodEnum<{
            "agent-only": "agent-only";
        }>>;
    }, z$1.core.$strip>], "type">>;
    model: z$1.ZodOptional<z$1.ZodString>;
    permissionMode: z$1.ZodOptional<z$1.ZodPipe<z$1.ZodUnion<readonly [z$1.ZodEnum<{
        "accept-edits": "accept-edits";
        auto: "auto";
        full: "full";
    }>, z$1.ZodLiteral<"workspace-write">]>, z$1.ZodTransform<"accept-edits" | "auto" | "full", "accept-edits" | "auto" | "full" | "workspace-write">>>;
    reasoningLevel: z$1.ZodOptional<z$1.ZodEnum<{
        high: "high";
        low: "low";
        max: "max";
        medium: "medium";
        none: "none";
        ultra: "ultra";
        ultracode: "ultracode";
        xhigh: "xhigh";
    }>>;
    senderThreadId: z$1.ZodOptional<z$1.ZodString>;
    serviceTier: z$1.ZodOptional<z$1.ZodEnum<{
        default: "default";
        fast: "fast";
    }>>;
}, z$1.core.$strip>;
type CreateQueuedMessageRequest = z$1.infer<typeof createQueuedMessageRequestSchema>;
declare const updateQueuedMessageRequestSchema: z$1.ZodObject<{
    expectedUpdatedAt: z$1.ZodNumber;
    input: z$1.ZodArray<z$1.ZodDiscriminatedUnion<[z$1.ZodObject<{
        mentions: z$1.ZodDefault<z$1.ZodArray<z$1.ZodObject<{
            end: z$1.ZodNumber;
            resource: z$1.ZodPipe<z$1.ZodTransform<unknown, unknown>, z$1.ZodDiscriminatedUnion<[z$1.ZodObject<{
                kind: z$1.ZodLiteral<"thread">;
                label: z$1.ZodString;
                projectId: z$1.ZodOptional<z$1.ZodString>;
                threadId: z$1.ZodString;
            }, z$1.core.$strip>, z$1.ZodObject<{
                kind: z$1.ZodLiteral<"project">;
                label: z$1.ZodString;
                projectId: z$1.ZodString;
            }, z$1.core.$strip>, z$1.ZodObject<{
                kind: z$1.ZodLiteral<"section">;
                label: z$1.ZodString;
                sectionId: z$1.ZodString;
            }, z$1.core.$strip>, z$1.ZodObject<{
                entryKind: z$1.ZodEnum<{
                    directory: "directory";
                    file: "file";
                }>;
                kind: z$1.ZodLiteral<"path">;
                label: z$1.ZodString;
                path: z$1.ZodString;
                source: z$1.ZodEnum<{
                    "thread-storage": "thread-storage";
                    workspace: "workspace";
                }>;
            }, z$1.core.$strip>, z$1.ZodObject<{
                argumentHint: z$1.ZodNullable<z$1.ZodString>;
                kind: z$1.ZodLiteral<"command">;
                label: z$1.ZodString;
                name: z$1.ZodString;
                origin: z$1.ZodEnum<{
                    builtin: "builtin";
                    project: "project";
                    user: "user";
                }>;
                source: z$1.ZodEnum<{
                    command: "command";
                    skill: "skill";
                }>;
                trigger: z$1.ZodEnum<{
                    "/": "/";
                    $: "$";
                }>;
            }, z$1.core.$strip>, z$1.ZodObject<{
                icon: z$1.ZodOptional<z$1.ZodNullable<z$1.ZodString>>;
                itemId: z$1.ZodString;
                kind: z$1.ZodLiteral<"plugin">;
                label: z$1.ZodString;
                pluginId: z$1.ZodString;
            }, z$1.core.$strip>], "kind">>;
            start: z$1.ZodNumber;
        }, z$1.core.$strip>>>;
        text: z$1.ZodString;
        type: z$1.ZodLiteral<"text">;
        visibility: z$1.ZodOptional<z$1.ZodEnum<{
            "agent-only": "agent-only";
        }>>;
    }, z$1.core.$strip>, z$1.ZodObject<{
        type: z$1.ZodLiteral<"image">;
        url: z$1.ZodString;
        visibility: z$1.ZodOptional<z$1.ZodEnum<{
            "agent-only": "agent-only";
        }>>;
    }, z$1.core.$strip>, z$1.ZodObject<{
        path: z$1.ZodString;
        type: z$1.ZodLiteral<"localImage">;
        visibility: z$1.ZodOptional<z$1.ZodEnum<{
            "agent-only": "agent-only";
        }>>;
    }, z$1.core.$strip>, z$1.ZodObject<{
        mimeType: z$1.ZodOptional<z$1.ZodString>;
        name: z$1.ZodOptional<z$1.ZodString>;
        path: z$1.ZodString;
        sizeBytes: z$1.ZodOptional<z$1.ZodNumber>;
        type: z$1.ZodLiteral<"localFile">;
        visibility: z$1.ZodOptional<z$1.ZodEnum<{
            "agent-only": "agent-only";
        }>>;
    }, z$1.core.$strip>], "type">>;
}, z$1.core.$strip>;
type UpdateQueuedMessageRequest = z$1.infer<typeof updateQueuedMessageRequestSchema>;
declare const sendQueuedMessageRequestSchema: z$1.ZodObject<{
    mode: z$1.ZodEnum<{
        auto: "auto";
        steer: "steer";
    }>;
}, z$1.core.$strip>;
type SendQueuedMessageRequest = z$1.infer<typeof sendQueuedMessageRequestSchema>;
declare const reorderQueuedMessageRequestSchema: z$1.ZodObject<{
    groupBoundaryQueuedMessageId: z$1.ZodOptional<z$1.ZodString>;
    nextQueuedMessageId: z$1.ZodNullable<z$1.ZodString>;
    previousQueuedMessageId: z$1.ZodNullable<z$1.ZodString>;
}, z$1.core.$strip>;
type ReorderQueuedMessageRequest = z$1.infer<typeof reorderQueuedMessageRequestSchema>;
declare const setQueuedMessageGroupBoundaryRequestSchema: z$1.ZodObject<{
    expectedGroupedPrefixQueuedMessageIds: z$1.ZodArray<z$1.ZodString>;
    groupBoundaryQueuedMessageId: z$1.ZodString;
}, z$1.core.$strip>;
type SetQueuedMessageGroupBoundaryRequest = z$1.infer<typeof setQueuedMessageGroupBoundaryRequestSchema>;
declare const sendQueuedMessageResponseSchema: z$1.ZodDiscriminatedUnion<[z$1.ZodObject<{
    delivery: z$1.ZodLiteral<"sent">;
    ok: z$1.ZodLiteral<true>;
}, z$1.core.$strip>, z$1.ZodObject<{
    delivery: z$1.ZodLiteral<"queued">;
    ok: z$1.ZodLiteral<true>;
    queuedMessage: z$1.ZodObject<{
        content: z$1.ZodArray<z$1.ZodDiscriminatedUnion<[z$1.ZodObject<{
            mentions: z$1.ZodDefault<z$1.ZodArray<z$1.ZodObject<{
                end: z$1.ZodNumber;
                resource: z$1.ZodPipe<z$1.ZodTransform<unknown, unknown>, z$1.ZodDiscriminatedUnion<[z$1.ZodObject<{
                    kind: z$1.ZodLiteral<"thread">;
                    label: z$1.ZodString;
                    projectId: z$1.ZodOptional<z$1.ZodString>;
                    threadId: z$1.ZodString;
                }, z$1.core.$strip>, z$1.ZodObject<{
                    kind: z$1.ZodLiteral<"project">;
                    label: z$1.ZodString;
                    projectId: z$1.ZodString;
                }, z$1.core.$strip>, z$1.ZodObject<{
                    kind: z$1.ZodLiteral<"section">;
                    label: z$1.ZodString;
                    sectionId: z$1.ZodString;
                }, z$1.core.$strip>, z$1.ZodObject<{
                    entryKind: z$1.ZodEnum<{
                        directory: "directory";
                        file: "file";
                    }>;
                    kind: z$1.ZodLiteral<"path">;
                    label: z$1.ZodString;
                    path: z$1.ZodString;
                    source: z$1.ZodEnum<{
                        "thread-storage": "thread-storage";
                        workspace: "workspace";
                    }>;
                }, z$1.core.$strip>, z$1.ZodObject<{
                    argumentHint: z$1.ZodNullable<z$1.ZodString>;
                    kind: z$1.ZodLiteral<"command">;
                    label: z$1.ZodString;
                    name: z$1.ZodString;
                    origin: z$1.ZodEnum<{
                        builtin: "builtin";
                        project: "project";
                        user: "user";
                    }>;
                    source: z$1.ZodEnum<{
                        command: "command";
                        skill: "skill";
                    }>;
                    trigger: z$1.ZodEnum<{
                        "/": "/";
                        $: "$";
                    }>;
                }, z$1.core.$strip>, z$1.ZodObject<{
                    icon: z$1.ZodOptional<z$1.ZodNullable<z$1.ZodString>>;
                    itemId: z$1.ZodString;
                    kind: z$1.ZodLiteral<"plugin">;
                    label: z$1.ZodString;
                    pluginId: z$1.ZodString;
                }, z$1.core.$strip>], "kind">>;
                start: z$1.ZodNumber;
            }, z$1.core.$strip>>>;
            text: z$1.ZodString;
            type: z$1.ZodLiteral<"text">;
            visibility: z$1.ZodOptional<z$1.ZodEnum<{
                "agent-only": "agent-only";
            }>>;
        }, z$1.core.$strip>, z$1.ZodObject<{
            type: z$1.ZodLiteral<"image">;
            url: z$1.ZodString;
            visibility: z$1.ZodOptional<z$1.ZodEnum<{
                "agent-only": "agent-only";
            }>>;
        }, z$1.core.$strip>, z$1.ZodObject<{
            path: z$1.ZodString;
            type: z$1.ZodLiteral<"localImage">;
            visibility: z$1.ZodOptional<z$1.ZodEnum<{
                "agent-only": "agent-only";
            }>>;
        }, z$1.core.$strip>, z$1.ZodObject<{
            mimeType: z$1.ZodOptional<z$1.ZodString>;
            name: z$1.ZodOptional<z$1.ZodString>;
            path: z$1.ZodString;
            sizeBytes: z$1.ZodOptional<z$1.ZodNumber>;
            type: z$1.ZodLiteral<"localFile">;
            visibility: z$1.ZodOptional<z$1.ZodEnum<{
                "agent-only": "agent-only";
            }>>;
        }, z$1.core.$strip>], "type">>;
        createdAt: z$1.ZodNumber;
        editable: z$1.ZodBoolean;
        failureReason: z$1.ZodNullable<z$1.ZodString>;
        groupWithNext: z$1.ZodBoolean;
        id: z$1.ZodString;
        initiator: z$1.ZodEnum<{
            agent: "agent";
            system: "system";
            user: "user";
        }>;
        model: z$1.ZodString;
        origin: z$1.ZodNullable<z$1.ZodEnum<{
            app: "app";
            cli: "cli";
            plugin: "plugin";
            sdk: "sdk";
        }>>;
        originPluginId: z$1.ZodNullable<z$1.ZodString>;
        payload: z$1.ZodDiscriminatedUnion<[z$1.ZodObject<{
            kind: z$1.ZodLiteral<"inline">;
        }, z$1.core.$strip>, z$1.ZodObject<{
            attempt: z$1.ZodNumber;
            kind: z$1.ZodLiteral<"retry">;
            reason: z$1.ZodString;
            retryOfTurnRequestId: z$1.ZodString;
        }, z$1.core.$strip>], "kind">;
        permissionMode: z$1.ZodEnum<{
            "accept-edits": "accept-edits";
            auto: "auto";
            full: "full";
        }>;
        reasoningLevel: z$1.ZodEnum<{
            high: "high";
            low: "low";
            max: "max";
            medium: "medium";
            none: "none";
            ultra: "ultra";
            ultracode: "ultracode";
            xhigh: "xhigh";
        }>;
        sendAt: z$1.ZodNullable<z$1.ZodNumber>;
        senderThreadId: z$1.ZodNullable<z$1.ZodString>;
        serviceTier: z$1.ZodEnum<{
            default: "default";
            fast: "fast";
        }>;
        threadId: z$1.ZodString;
        updatedAt: z$1.ZodNumber;
        waitingOn: z$1.ZodNullable<z$1.ZodDiscriminatedUnion<[z$1.ZodObject<{
            kind: z$1.ZodLiteral<"time">;
        }, z$1.core.$strip>, z$1.ZodObject<{
            kind: z$1.ZodLiteral<"thread-busy">;
        }, z$1.core.$strip>, z$1.ZodObject<{
            kind: z$1.ZodLiteral<"stopping">;
        }, z$1.core.$strip>, z$1.ZodObject<{
            kind: z$1.ZodLiteral<"turn-starting">;
        }, z$1.core.$strip>, z$1.ZodObject<{
            kind: z$1.ZodLiteral<"provisioning">;
        }, z$1.core.$strip>, z$1.ZodObject<{
            hostName: z$1.ZodString;
            kind: z$1.ZodLiteral<"host-offline">;
        }, z$1.core.$strip>, z$1.ZodObject<{
            kind: z$1.ZodLiteral<"interaction">;
        }, z$1.core.$strip>, z$1.ZodObject<{
            kind: z$1.ZodLiteral<"plugin">;
            pluginId: z$1.ZodString;
            reason: z$1.ZodString;
        }, z$1.core.$strip>], "kind">>;
    }, z$1.core.$strip>;
}, z$1.core.$strip>], "delivery">;
type SendQueuedMessageResponse = z$1.infer<typeof sendQueuedMessageResponseSchema>;
declare const threadListResponseSchema: z$1.ZodArray<z$1.ZodObject<{
    activity: z$1.ZodObject<{
        activeBackgroundAgentCount: z$1.ZodNumber;
        activeBackgroundCommandCount: z$1.ZodNumber;
        activeGoalCount: z$1.ZodNumber;
        activePlanModeCount: z$1.ZodNumber;
        activeWorkflowCount: z$1.ZodNumber;
    }, z$1.core.$strip>;
    archivedAt: z$1.ZodNullable<z$1.ZodNumber>;
    createdAt: z$1.ZodNumber;
    deletedAt: z$1.ZodNullable<z$1.ZodNumber>;
    environmentBranchName: z$1.ZodNullable<z$1.ZodString>;
    environmentHostId: z$1.ZodNullable<z$1.ZodString>;
    environmentId: z$1.ZodNullable<z$1.ZodString>;
    environmentIsWorktree: z$1.ZodNullable<z$1.ZodBoolean>;
    environmentName: z$1.ZodNullable<z$1.ZodString>;
    environmentPath: z$1.ZodNullable<z$1.ZodString>;
    environmentProviderId: z$1.ZodNullable<z$1.ZodString>;
    environmentWorkspaceDisplayKind: z$1.ZodEnum<{
        "managed-worktree": "managed-worktree";
        "unmanaged-worktree": "unmanaged-worktree";
        other: "other";
    }>;
    hasPendingInteraction: z$1.ZodBoolean;
    id: z$1.ZodString;
    lastReadAt: z$1.ZodNullable<z$1.ZodNumber>;
    latestAttentionAt: z$1.ZodNumber;
    lifecycleOwnerThreadId: z$1.ZodNullable<z$1.ZodString>;
    originKind: z$1.ZodNullable<z$1.ZodEnum<{
        fork: "fork";
    }>>;
    originPluginId: z$1.ZodNullable<z$1.ZodString>;
    parentThreadId: z$1.ZodNullable<z$1.ZodString>;
    pinSortKey: z$1.ZodNullable<z$1.ZodString>;
    pinnedAt: z$1.ZodNullable<z$1.ZodNumber>;
    projectId: z$1.ZodString;
    providerId: z$1.ZodString;
    queuedWork: z$1.ZodEnum<{
        failed: "failed";
        none: "none";
        waiting: "waiting";
    }>;
    runtime: z$1.ZodObject<{
        displayStatus: z$1.ZodEnum<{
            "host-reconnecting": "host-reconnecting";
            "waiting-for-host": "waiting-for-host";
            active: "active";
            error: "error";
            idle: "idle";
            pending: "pending";
            provisioning: "provisioning";
            starting: "starting";
            stopping: "stopping";
        }>;
        hostReconnectGraceExpiresAt: z$1.ZodNullable<z$1.ZodNumber>;
    }, z$1.core.$strip>;
    sectionId: z$1.ZodNullable<z$1.ZodString>;
    sourceThreadId: z$1.ZodNullable<z$1.ZodString>;
    status: z$1.ZodEnum<{
        active: "active";
        error: "error";
        idle: "idle";
        pending: "pending";
        starting: "starting";
        stopping: "stopping";
    }>;
    title: z$1.ZodNullable<z$1.ZodString>;
    titleFallback: z$1.ZodNullable<z$1.ZodString>;
    updatedAt: z$1.ZodNumber;
    visibility: z$1.ZodEnum<{
        hidden: "hidden";
        visible: "visible";
    }>;
}, z$1.core.$strip>>;
type ThreadListResponse = z$1.infer<typeof threadListResponseSchema>;
declare const resolveThreadMentionsRequestSchema: z$1.ZodObject<{
    threadIds: z$1.ZodArray<z$1.ZodString>;
}, z$1.core.$strict>;
type ResolveThreadMentionsRequest = z$1.infer<typeof resolveThreadMentionsRequestSchema>;
declare const resolveThreadMentionsResponseSchema: z$1.ZodArray<z$1.ZodObject<{
    label: z$1.ZodString;
    projectId: z$1.ZodString;
    threadId: z$1.ZodString;
}, z$1.core.$strict>>;
type ResolveThreadMentionsResponse = z$1.infer<typeof resolveThreadMentionsResponseSchema>;
declare const threadSearchResponseSchema: z$1.ZodObject<{
    active: z$1.ZodObject<{
        results: z$1.ZodArray<z$1.ZodObject<{
            matches: z$1.ZodArray<z$1.ZodObject<{
                highlightRanges: z$1.ZodArray<z$1.ZodObject<{
                    end: z$1.ZodNumber;
                    start: z$1.ZodNumber;
                }, z$1.core.$strict>>;
                sourceKind: z$1.ZodEnum<{
                    assistant_message: "assistant_message";
                    system_message: "system_message";
                    title: "title";
                    title_fallback: "title_fallback";
                    user_message: "user_message";
                }>;
                sourceSeq: z$1.ZodNullable<z$1.ZodNumber>;
                text: z$1.ZodString;
            }, z$1.core.$strict>>;
            thread: z$1.ZodObject<{
                activity: z$1.ZodObject<{
                    activeBackgroundAgentCount: z$1.ZodNumber;
                    activeBackgroundCommandCount: z$1.ZodNumber;
                    activeGoalCount: z$1.ZodNumber;
                    activePlanModeCount: z$1.ZodNumber;
                    activeWorkflowCount: z$1.ZodNumber;
                }, z$1.core.$strip>;
                archivedAt: z$1.ZodNullable<z$1.ZodNumber>;
                createdAt: z$1.ZodNumber;
                deletedAt: z$1.ZodNullable<z$1.ZodNumber>;
                environmentBranchName: z$1.ZodNullable<z$1.ZodString>;
                environmentHostId: z$1.ZodNullable<z$1.ZodString>;
                environmentId: z$1.ZodNullable<z$1.ZodString>;
                environmentIsWorktree: z$1.ZodNullable<z$1.ZodBoolean>;
                environmentName: z$1.ZodNullable<z$1.ZodString>;
                environmentPath: z$1.ZodNullable<z$1.ZodString>;
                environmentProviderId: z$1.ZodNullable<z$1.ZodString>;
                environmentWorkspaceDisplayKind: z$1.ZodEnum<{
                    "managed-worktree": "managed-worktree";
                    "unmanaged-worktree": "unmanaged-worktree";
                    other: "other";
                }>;
                hasPendingInteraction: z$1.ZodBoolean;
                id: z$1.ZodString;
                lastReadAt: z$1.ZodNullable<z$1.ZodNumber>;
                latestAttentionAt: z$1.ZodNumber;
                lifecycleOwnerThreadId: z$1.ZodNullable<z$1.ZodString>;
                originKind: z$1.ZodNullable<z$1.ZodEnum<{
                    fork: "fork";
                }>>;
                originPluginId: z$1.ZodNullable<z$1.ZodString>;
                parentThreadId: z$1.ZodNullable<z$1.ZodString>;
                pinSortKey: z$1.ZodNullable<z$1.ZodString>;
                pinnedAt: z$1.ZodNullable<z$1.ZodNumber>;
                projectId: z$1.ZodString;
                providerId: z$1.ZodString;
                queuedWork: z$1.ZodEnum<{
                    failed: "failed";
                    none: "none";
                    waiting: "waiting";
                }>;
                runtime: z$1.ZodObject<{
                    displayStatus: z$1.ZodEnum<{
                        "host-reconnecting": "host-reconnecting";
                        "waiting-for-host": "waiting-for-host";
                        active: "active";
                        error: "error";
                        idle: "idle";
                        pending: "pending";
                        provisioning: "provisioning";
                        starting: "starting";
                        stopping: "stopping";
                    }>;
                    hostReconnectGraceExpiresAt: z$1.ZodNullable<z$1.ZodNumber>;
                }, z$1.core.$strip>;
                sectionId: z$1.ZodNullable<z$1.ZodString>;
                sourceThreadId: z$1.ZodNullable<z$1.ZodString>;
                status: z$1.ZodEnum<{
                    active: "active";
                    error: "error";
                    idle: "idle";
                    pending: "pending";
                    starting: "starting";
                    stopping: "stopping";
                }>;
                title: z$1.ZodNullable<z$1.ZodString>;
                titleFallback: z$1.ZodNullable<z$1.ZodString>;
                updatedAt: z$1.ZodNumber;
                visibility: z$1.ZodEnum<{
                    hidden: "hidden";
                    visible: "visible";
                }>;
            }, z$1.core.$strip>;
        }, z$1.core.$strict>>;
        total: z$1.ZodNumber;
    }, z$1.core.$strict>;
    archived: z$1.ZodObject<{
        results: z$1.ZodArray<z$1.ZodObject<{
            matches: z$1.ZodArray<z$1.ZodObject<{
                highlightRanges: z$1.ZodArray<z$1.ZodObject<{
                    end: z$1.ZodNumber;
                    start: z$1.ZodNumber;
                }, z$1.core.$strict>>;
                sourceKind: z$1.ZodEnum<{
                    assistant_message: "assistant_message";
                    system_message: "system_message";
                    title: "title";
                    title_fallback: "title_fallback";
                    user_message: "user_message";
                }>;
                sourceSeq: z$1.ZodNullable<z$1.ZodNumber>;
                text: z$1.ZodString;
            }, z$1.core.$strict>>;
            thread: z$1.ZodObject<{
                activity: z$1.ZodObject<{
                    activeBackgroundAgentCount: z$1.ZodNumber;
                    activeBackgroundCommandCount: z$1.ZodNumber;
                    activeGoalCount: z$1.ZodNumber;
                    activePlanModeCount: z$1.ZodNumber;
                    activeWorkflowCount: z$1.ZodNumber;
                }, z$1.core.$strip>;
                archivedAt: z$1.ZodNullable<z$1.ZodNumber>;
                createdAt: z$1.ZodNumber;
                deletedAt: z$1.ZodNullable<z$1.ZodNumber>;
                environmentBranchName: z$1.ZodNullable<z$1.ZodString>;
                environmentHostId: z$1.ZodNullable<z$1.ZodString>;
                environmentId: z$1.ZodNullable<z$1.ZodString>;
                environmentIsWorktree: z$1.ZodNullable<z$1.ZodBoolean>;
                environmentName: z$1.ZodNullable<z$1.ZodString>;
                environmentPath: z$1.ZodNullable<z$1.ZodString>;
                environmentProviderId: z$1.ZodNullable<z$1.ZodString>;
                environmentWorkspaceDisplayKind: z$1.ZodEnum<{
                    "managed-worktree": "managed-worktree";
                    "unmanaged-worktree": "unmanaged-worktree";
                    other: "other";
                }>;
                hasPendingInteraction: z$1.ZodBoolean;
                id: z$1.ZodString;
                lastReadAt: z$1.ZodNullable<z$1.ZodNumber>;
                latestAttentionAt: z$1.ZodNumber;
                lifecycleOwnerThreadId: z$1.ZodNullable<z$1.ZodString>;
                originKind: z$1.ZodNullable<z$1.ZodEnum<{
                    fork: "fork";
                }>>;
                originPluginId: z$1.ZodNullable<z$1.ZodString>;
                parentThreadId: z$1.ZodNullable<z$1.ZodString>;
                pinSortKey: z$1.ZodNullable<z$1.ZodString>;
                pinnedAt: z$1.ZodNullable<z$1.ZodNumber>;
                projectId: z$1.ZodString;
                providerId: z$1.ZodString;
                queuedWork: z$1.ZodEnum<{
                    failed: "failed";
                    none: "none";
                    waiting: "waiting";
                }>;
                runtime: z$1.ZodObject<{
                    displayStatus: z$1.ZodEnum<{
                        "host-reconnecting": "host-reconnecting";
                        "waiting-for-host": "waiting-for-host";
                        active: "active";
                        error: "error";
                        idle: "idle";
                        pending: "pending";
                        provisioning: "provisioning";
                        starting: "starting";
                        stopping: "stopping";
                    }>;
                    hostReconnectGraceExpiresAt: z$1.ZodNullable<z$1.ZodNumber>;
                }, z$1.core.$strip>;
                sectionId: z$1.ZodNullable<z$1.ZodString>;
                sourceThreadId: z$1.ZodNullable<z$1.ZodString>;
                status: z$1.ZodEnum<{
                    active: "active";
                    error: "error";
                    idle: "idle";
                    pending: "pending";
                    starting: "starting";
                    stopping: "stopping";
                }>;
                title: z$1.ZodNullable<z$1.ZodString>;
                titleFallback: z$1.ZodNullable<z$1.ZodString>;
                updatedAt: z$1.ZodNumber;
                visibility: z$1.ZodEnum<{
                    hidden: "hidden";
                    visible: "visible";
                }>;
            }, z$1.core.$strip>;
        }, z$1.core.$strict>>;
        total: z$1.ZodNumber;
    }, z$1.core.$strict>;
}, z$1.core.$strict>;
type ThreadSearchResponse = z$1.infer<typeof threadSearchResponseSchema>;
declare const threadResponseSchema: z$1.ZodObject<{
    activeBackgroundAgentCount: z$1.ZodNumber;
    archivedAt: z$1.ZodNullable<z$1.ZodNumber>;
    canSpawnChild: z$1.ZodBoolean;
    createdAt: z$1.ZodNumber;
    deletedAt: z$1.ZodNullable<z$1.ZodNumber>;
    environmentId: z$1.ZodNullable<z$1.ZodString>;
    id: z$1.ZodString;
    lastReadAt: z$1.ZodNullable<z$1.ZodNumber>;
    latestAttentionAt: z$1.ZodNumber;
    lifecycleOwnerThreadId: z$1.ZodNullable<z$1.ZodString>;
    originKind: z$1.ZodNullable<z$1.ZodEnum<{
        fork: "fork";
    }>>;
    originPluginId: z$1.ZodNullable<z$1.ZodString>;
    parentThreadId: z$1.ZodNullable<z$1.ZodString>;
    pinnedAt: z$1.ZodNullable<z$1.ZodNumber>;
    projectId: z$1.ZodString;
    providerId: z$1.ZodString;
    queuedMessageCount: z$1.ZodNumber;
    runtime: z$1.ZodObject<{
        displayStatus: z$1.ZodEnum<{
            "host-reconnecting": "host-reconnecting";
            "waiting-for-host": "waiting-for-host";
            active: "active";
            error: "error";
            idle: "idle";
            pending: "pending";
            provisioning: "provisioning";
            starting: "starting";
            stopping: "stopping";
        }>;
        hostReconnectGraceExpiresAt: z$1.ZodNullable<z$1.ZodNumber>;
    }, z$1.core.$strip>;
    sectionId: z$1.ZodNullable<z$1.ZodString>;
    sourceThreadId: z$1.ZodNullable<z$1.ZodString>;
    status: z$1.ZodEnum<{
        active: "active";
        error: "error";
        idle: "idle";
        pending: "pending";
        starting: "starting";
        stopping: "stopping";
    }>;
    title: z$1.ZodNullable<z$1.ZodString>;
    titleFallback: z$1.ZodNullable<z$1.ZodString>;
    updatedAt: z$1.ZodNumber;
    visibility: z$1.ZodEnum<{
        hidden: "hidden";
        visible: "visible";
    }>;
}, z$1.core.$strip>;
type ThreadResponse = z$1.infer<typeof threadResponseSchema>;
declare const threadGetQuerySchema: z$1.ZodObject<{
    include: z$1.ZodOptional<z$1.ZodString>;
}, z$1.core.$strip>;
type ThreadGetQuery = z$1.infer<typeof threadGetQuerySchema>;
type ThreadPluginMetadataResponse = z$1.infer<typeof pluginMetadataSchema>;
declare const threadWithIncludesResponseSchema: z$1.ZodObject<{
    activeBackgroundAgentCount: z$1.ZodNumber;
    archivedAt: z$1.ZodNullable<z$1.ZodNumber>;
    canSpawnChild: z$1.ZodBoolean;
    createdAt: z$1.ZodNumber;
    deletedAt: z$1.ZodNullable<z$1.ZodNumber>;
    environment: z$1.ZodOptional<z$1.ZodNullable<z$1.ZodObject<{
        baseBranch: z$1.ZodNullable<z$1.ZodString>;
        branchName: z$1.ZodNullable<z$1.ZodString>;
        createdAt: z$1.ZodNumber;
        defaultBranch: z$1.ZodNullable<z$1.ZodString>;
        environmentProviderId: z$1.ZodNullable<z$1.ZodString>;
        environmentProviderInstanceKey: z$1.ZodNullable<z$1.ZodString>;
        environmentProviderSelection: z$1.ZodNullable<z$1.ZodObject<{
            inputs: z$1.ZodNullable<z$1.ZodType<JsonValue, unknown, z$1.core.$ZodTypeInternals<JsonValue, unknown>>>;
            machine: z$1.ZodDiscriminatedUnion<[z$1.ZodObject<{
                hostId: z$1.ZodString;
                type: z$1.ZodLiteral<"existing">;
            }, z$1.core.$strip>, z$1.ZodObject<{
                inputs: z$1.ZodNullable<z$1.ZodType<JsonValue, unknown, z$1.core.$ZodTypeInternals<JsonValue, unknown>>>;
                machineProviderId: z$1.ZodString;
                type: z$1.ZodLiteral<"new">;
            }, z$1.core.$strip>], "type">;
        }, z$1.core.$strip>>;
        hostId: z$1.ZodString;
        id: z$1.ZodString;
        isGitRepo: z$1.ZodBoolean;
        isWorktree: z$1.ZodBoolean;
        lifecycle: z$1.ZodObject<{
            phase: z$1.ZodEnum<{
                active: "active";
                destroyed: "destroyed";
                retiring: "retiring";
                teardown: "teardown";
            }>;
            retireAt: z$1.ZodNullable<z$1.ZodNumber>;
            teardown: z$1.ZodNullable<z$1.ZodObject<{
                attempt: z$1.ZodNumber;
                message: z$1.ZodOptional<z$1.ZodString>;
                status: z$1.ZodEnum<{
                    failed: "failed";
                    removed: "removed";
                    running: "running";
                }>;
            }, z$1.core.$strip>>;
        }, z$1.core.$strip>;
        managed: z$1.ZodBoolean;
        mergeBaseBranch: z$1.ZodNullable<z$1.ZodString>;
        name: z$1.ZodNullable<z$1.ZodString>;
        path: z$1.ZodNullable<z$1.ZodString>;
        projectId: z$1.ZodString;
        status: z$1.ZodEnum<{
            creating: "creating";
            destroyed: "destroyed";
            error: "error";
            provisioning: "provisioning";
            ready: "ready";
        }>;
        updatedAt: z$1.ZodNumber;
        workspaceProvisionType: z$1.ZodNullable<z$1.ZodEnum<{
            "managed-worktree": "managed-worktree";
            personal: "personal";
            unmanaged: "unmanaged";
        }>>;
    }, z$1.core.$strip>>>;
    environmentId: z$1.ZodNullable<z$1.ZodString>;
    host: z$1.ZodOptional<z$1.ZodNullable<z$1.ZodObject<{
        createdAt: z$1.ZodNumber;
        id: z$1.ZodString;
        lastRejectedProtocolVersion: z$1.ZodNullable<z$1.ZodNumber>;
        lastSeenAt: z$1.ZodNullable<z$1.ZodNumber>;
        lifecycle: z$1.ZodObject<{
            message: z$1.ZodNullable<z$1.ZodString>;
            pendingLog: z$1.ZodString;
            phase: z$1.ZodEnum<{
                active: "active";
                creating: "creating";
                destroyed: "destroyed";
                removing: "removing";
                resuming: "resuming";
                suspended: "suspended";
                suspending: "suspending";
            }>;
            suspendedAt: z$1.ZodNullable<z$1.ZodNumber>;
            teardown: z$1.ZodNullable<z$1.ZodObject<{
                attempt: z$1.ZodNumber;
                status: z$1.ZodEnum<{
                    failed: "failed";
                    removed: "removed";
                    running: "running";
                }>;
            }, z$1.core.$strip>>;
        }, z$1.core.$strip>;
        machineProviderId: z$1.ZodNullable<z$1.ZodString>;
        maxPermissionMode: z$1.ZodEnum<{
            "accept-edits": "accept-edits";
            auto: "auto";
            full: "full";
        }>;
        name: z$1.ZodString;
        status: z$1.ZodEnum<{
            connected: "connected";
            disconnected: "disconnected";
        }>;
        type: z$1.ZodEnum<{
            ephemeral: "ephemeral";
            persistent: "persistent";
        }>;
        updatedAt: z$1.ZodNumber;
    }, z$1.core.$strip>>>;
    id: z$1.ZodString;
    lastReadAt: z$1.ZodNullable<z$1.ZodNumber>;
    latestAttentionAt: z$1.ZodNumber;
    lifecycleOwnerThreadId: z$1.ZodNullable<z$1.ZodString>;
    originKind: z$1.ZodNullable<z$1.ZodEnum<{
        fork: "fork";
    }>>;
    originPluginId: z$1.ZodNullable<z$1.ZodString>;
    parentThreadId: z$1.ZodNullable<z$1.ZodString>;
    pinnedAt: z$1.ZodNullable<z$1.ZodNumber>;
    projectId: z$1.ZodString;
    providerId: z$1.ZodString;
    queuedMessageCount: z$1.ZodNumber;
    runtime: z$1.ZodObject<{
        displayStatus: z$1.ZodEnum<{
            "host-reconnecting": "host-reconnecting";
            "waiting-for-host": "waiting-for-host";
            active: "active";
            error: "error";
            idle: "idle";
            pending: "pending";
            provisioning: "provisioning";
            starting: "starting";
            stopping: "stopping";
        }>;
        hostReconnectGraceExpiresAt: z$1.ZodNullable<z$1.ZodNumber>;
    }, z$1.core.$strip>;
    sectionId: z$1.ZodNullable<z$1.ZodString>;
    sourceThreadId: z$1.ZodNullable<z$1.ZodString>;
    status: z$1.ZodEnum<{
        active: "active";
        error: "error";
        idle: "idle";
        pending: "pending";
        starting: "starting";
        stopping: "stopping";
    }>;
    title: z$1.ZodNullable<z$1.ZodString>;
    titleFallback: z$1.ZodNullable<z$1.ZodString>;
    updatedAt: z$1.ZodNumber;
    visibility: z$1.ZodEnum<{
        hidden: "hidden";
        visible: "visible";
    }>;
}, z$1.core.$strip>;
type ThreadWithIncludesResponse = z$1.infer<typeof threadWithIncludesResponseSchema>;
declare const threadPendingInteractionsResponseSchema: z$1.ZodArray<z$1.ZodUnion<readonly [z$1.ZodUnion<readonly [z$1.ZodObject<{
    createdAt: z$1.ZodNumber;
    expiresAt: z$1.ZodOptional<z$1.ZodNullable<z$1.ZodNumber>>;
    id: z$1.ZodString;
    origin: z$1.ZodOptional<z$1.ZodObject<{
        kind: z$1.ZodLiteral<"provider">;
        providerId: z$1.ZodString;
        providerRequestId: z$1.ZodString;
        providerThreadId: z$1.ZodString;
    }, z$1.core.$strip>>;
    payload: z$1.ZodObject<{
        availableDecisions: z$1.ZodArray<z$1.ZodEnum<{
            allow_for_session: "allow_for_session";
            allow_once: "allow_once";
            deny: "deny";
        }>>;
        kind: z$1.ZodLiteral<"approval">;
        reason: z$1.ZodNullable<z$1.ZodString>;
        subject: z$1.ZodDiscriminatedUnion<[z$1.ZodObject<{
            actions: z$1.ZodArray<z$1.ZodDiscriminatedUnion<[z$1.ZodObject<{
                command: z$1.ZodString;
                name: z$1.ZodString;
                path: z$1.ZodString;
                type: z$1.ZodLiteral<"read">;
            }, z$1.core.$strip>, z$1.ZodObject<{
                command: z$1.ZodString;
                path: z$1.ZodNullable<z$1.ZodString>;
                type: z$1.ZodLiteral<"listFiles">;
            }, z$1.core.$strip>, z$1.ZodObject<{
                command: z$1.ZodString;
                path: z$1.ZodNullable<z$1.ZodString>;
                query: z$1.ZodNullable<z$1.ZodString>;
                type: z$1.ZodLiteral<"search">;
            }, z$1.core.$strip>, z$1.ZodObject<{
                command: z$1.ZodString;
                type: z$1.ZodLiteral<"unknown">;
            }, z$1.core.$strip>], "type">>;
            command: z$1.ZodString;
            cwd: z$1.ZodNullable<z$1.ZodString>;
            itemId: z$1.ZodString;
            kind: z$1.ZodLiteral<"command">;
            sessionGrant: z$1.ZodNullable<z$1.ZodObject<{
                fileSystem: z$1.ZodNullable<z$1.ZodObject<{
                    read: z$1.ZodArray<z$1.ZodString>;
                    write: z$1.ZodArray<z$1.ZodString>;
                }, z$1.core.$strip>>;
                network: z$1.ZodNullable<z$1.ZodObject<{
                    enabled: z$1.ZodNullable<z$1.ZodBoolean>;
                }, z$1.core.$strip>>;
            }, z$1.core.$strict>>;
        }, z$1.core.$strip>, z$1.ZodObject<{
            itemId: z$1.ZodString;
            kind: z$1.ZodLiteral<"file_change">;
            sessionGrant: z$1.ZodNullable<z$1.ZodObject<{
                fileSystem: z$1.ZodNullable<z$1.ZodObject<{
                    read: z$1.ZodArray<z$1.ZodString>;
                    write: z$1.ZodArray<z$1.ZodString>;
                }, z$1.core.$strip>>;
                network: z$1.ZodNullable<z$1.ZodObject<{
                    enabled: z$1.ZodNullable<z$1.ZodBoolean>;
                }, z$1.core.$strip>>;
            }, z$1.core.$strict>>;
            writeScope: z$1.ZodNullable<z$1.ZodString>;
        }, z$1.core.$strip>, z$1.ZodObject<{
            itemId: z$1.ZodString;
            kind: z$1.ZodLiteral<"permission_grant">;
            permissions: z$1.ZodObject<{
                fileSystem: z$1.ZodNullable<z$1.ZodObject<{
                    read: z$1.ZodArray<z$1.ZodString>;
                    write: z$1.ZodArray<z$1.ZodString>;
                }, z$1.core.$strip>>;
                network: z$1.ZodNullable<z$1.ZodObject<{
                    enabled: z$1.ZodNullable<z$1.ZodBoolean>;
                }, z$1.core.$strip>>;
            }, z$1.core.$strict>;
            toolName: z$1.ZodNullable<z$1.ZodString>;
        }, z$1.core.$strip>, z$1.ZodObject<{
            itemId: z$1.ZodString;
            kind: z$1.ZodLiteral<"plan">;
            plan: z$1.ZodString;
            planFilePath: z$1.ZodNullable<z$1.ZodString>;
        }, z$1.core.$strip>, z$1.ZodObject<{
            itemId: z$1.ZodString;
            kind: z$1.ZodLiteral<"tool_use">;
            presentation: z$1.ZodObject<{
                badge: z$1.ZodOptional<z$1.ZodObject<{
                    glyph: z$1.ZodString;
                    hint: z$1.ZodString;
                    label: z$1.ZodString;
                    tone: z$1.ZodEnum<{
                        destructive: "destructive";
                        neutral: "neutral";
                    }>;
                }, z$1.core.$strip>>;
                detail: z$1.ZodOptional<z$1.ZodString>;
                icon: z$1.ZodObject<{
                    glyph: z$1.ZodString;
                }, z$1.core.$strip>;
                label: z$1.ZodObject<{
                    completed: z$1.ZodString;
                    pending: z$1.ZodString;
                }, z$1.core.$strip>;
                suppress: z$1.ZodOptional<z$1.ZodBoolean>;
                tint: z$1.ZodOptional<z$1.ZodObject<{
                    dark: z$1.ZodString;
                    light: z$1.ZodString;
                }, z$1.core.$strip>>;
                title: z$1.ZodOptional<z$1.ZodString>;
            }, z$1.core.$strip>;
            tool: z$1.ZodString;
        }, z$1.core.$strip>], "kind">;
    }, z$1.core.$strip>;
    providerId: z$1.ZodString;
    providerRequestId: z$1.ZodString;
    providerThreadId: z$1.ZodString;
    resolution: z$1.ZodNullable<z$1.ZodDiscriminatedUnion<[z$1.ZodObject<{
        decision: z$1.ZodLiteral<"allow_once">;
        grantedPermissions: z$1.ZodNullable<z$1.ZodObject<{
            fileSystem: z$1.ZodNullable<z$1.ZodObject<{
                read: z$1.ZodArray<z$1.ZodString>;
                write: z$1.ZodArray<z$1.ZodString>;
            }, z$1.core.$strip>>;
            network: z$1.ZodNullable<z$1.ZodObject<{
                enabled: z$1.ZodNullable<z$1.ZodBoolean>;
            }, z$1.core.$strip>>;
        }, z$1.core.$strict>>;
    }, z$1.core.$strip>, z$1.ZodObject<{
        decision: z$1.ZodLiteral<"allow_for_session">;
        grantedPermissions: z$1.ZodNullable<z$1.ZodObject<{
            fileSystem: z$1.ZodNullable<z$1.ZodObject<{
                read: z$1.ZodArray<z$1.ZodString>;
                write: z$1.ZodArray<z$1.ZodString>;
            }, z$1.core.$strip>>;
            network: z$1.ZodNullable<z$1.ZodObject<{
                enabled: z$1.ZodNullable<z$1.ZodBoolean>;
            }, z$1.core.$strip>>;
        }, z$1.core.$strict>>;
    }, z$1.core.$strip>, z$1.ZodObject<{
        decision: z$1.ZodLiteral<"deny">;
    }, z$1.core.$strip>], "decision">>;
    resolvedAt: z$1.ZodNullable<z$1.ZodNumber>;
    status: z$1.ZodEnum<{
        interrupted: "interrupted";
        pending: "pending";
        resolved: "resolved";
        resolving: "resolving";
    }>;
    statusReason: z$1.ZodNullable<z$1.ZodString>;
    threadId: z$1.ZodString;
    turnId: z$1.ZodString;
}, z$1.core.$strip>, z$1.ZodObject<{
    createdAt: z$1.ZodNumber;
    expiresAt: z$1.ZodOptional<z$1.ZodNullable<z$1.ZodNumber>>;
    id: z$1.ZodString;
    origin: z$1.ZodOptional<z$1.ZodObject<{
        kind: z$1.ZodLiteral<"provider">;
        providerId: z$1.ZodString;
        providerRequestId: z$1.ZodString;
        providerThreadId: z$1.ZodString;
    }, z$1.core.$strip>>;
    payload: z$1.ZodObject<{
        kind: z$1.ZodLiteral<"user_question">;
        questions: z$1.ZodArray<z$1.ZodObject<{
            allowFreeText: z$1.ZodBoolean;
            id: z$1.ZodString;
            multiSelect: z$1.ZodBoolean;
            options: z$1.ZodOptional<z$1.ZodArray<z$1.ZodObject<{
                description: z$1.ZodOptional<z$1.ZodString>;
                label: z$1.ZodString;
                value: z$1.ZodString;
            }, z$1.core.$strip>>>;
            prompt: z$1.ZodString;
            shortLabel: z$1.ZodOptional<z$1.ZodString>;
        }, z$1.core.$strip>>;
    }, z$1.core.$strip>;
    providerId: z$1.ZodString;
    providerRequestId: z$1.ZodString;
    providerThreadId: z$1.ZodString;
    resolution: z$1.ZodNullable<z$1.ZodObject<{
        answers: z$1.ZodRecord<z$1.ZodString, z$1.ZodObject<{
            freeText: z$1.ZodOptional<z$1.ZodString>;
            selected: z$1.ZodArray<z$1.ZodString>;
        }, z$1.core.$strip>>;
        kind: z$1.ZodLiteral<"user_answer">;
    }, z$1.core.$strip>>;
    resolvedAt: z$1.ZodNullable<z$1.ZodNumber>;
    status: z$1.ZodEnum<{
        interrupted: "interrupted";
        pending: "pending";
        resolved: "resolved";
        resolving: "resolving";
    }>;
    statusReason: z$1.ZodNullable<z$1.ZodString>;
    threadId: z$1.ZodString;
    turnId: z$1.ZodString;
}, z$1.core.$strip>, z$1.ZodObject<{
    createdAt: z$1.ZodNumber;
    expiresAt: z$1.ZodOptional<z$1.ZodNullable<z$1.ZodNumber>>;
    id: z$1.ZodString;
    origin: z$1.ZodOptional<z$1.ZodObject<{
        kind: z$1.ZodLiteral<"provider">;
        providerId: z$1.ZodString;
        providerRequestId: z$1.ZodString;
        providerThreadId: z$1.ZodString;
    }, z$1.core.$strip>>;
    payload: z$1.ZodObject<{
        data: z$1.ZodType<JsonValue, unknown, z$1.core.$ZodTypeInternals<JsonValue, unknown>>;
        kind: z$1.ZodString & z$1.ZodType<`${string}/${string}`, string, z$1.core.$ZodTypeInternals<`${string}/${string}`, string>>;
        title: z$1.ZodString;
    }, z$1.core.$strip>;
    providerId: z$1.ZodString;
    providerRequestId: z$1.ZodString;
    providerThreadId: z$1.ZodString;
    resolution: z$1.ZodNullable<z$1.ZodObject<{
        kind: z$1.ZodLiteral<"request_answer">;
        value: z$1.ZodType<JsonValue, unknown, z$1.core.$ZodTypeInternals<JsonValue, unknown>>;
    }, z$1.core.$strip>>;
    resolvedAt: z$1.ZodNullable<z$1.ZodNumber>;
    status: z$1.ZodEnum<{
        interrupted: "interrupted";
        pending: "pending";
        resolved: "resolved";
        resolving: "resolving";
    }>;
    statusReason: z$1.ZodNullable<z$1.ZodString>;
    threadId: z$1.ZodString;
    turnId: z$1.ZodString;
}, z$1.core.$strip>]>, z$1.ZodObject<{
    createdAt: z$1.ZodNumber;
    expiresAt: z$1.ZodOptional<z$1.ZodNullable<z$1.ZodNumber>>;
    id: z$1.ZodString;
    origin: z$1.ZodObject<{
        kind: z$1.ZodLiteral<"plugin">;
        pluginId: z$1.ZodString;
        rendererId: z$1.ZodString;
    }, z$1.core.$strip>;
    payload: z$1.ZodObject<{
        data: z$1.ZodType<JsonValue, unknown, z$1.core.$ZodTypeInternals<JsonValue, unknown>>;
        kind: z$1.ZodLiteral<"plugin">;
        presentation: z$1.ZodOptional<z$1.ZodObject<{
            badge: z$1.ZodOptional<z$1.ZodObject<{
                glyph: z$1.ZodString;
                hint: z$1.ZodString;
                label: z$1.ZodString;
                tone: z$1.ZodEnum<{
                    destructive: "destructive";
                    neutral: "neutral";
                }>;
            }, z$1.core.$strip>>;
            detail: z$1.ZodOptional<z$1.ZodString>;
            icon: z$1.ZodObject<{
                glyph: z$1.ZodString;
            }, z$1.core.$strip>;
            label: z$1.ZodObject<{
                completed: z$1.ZodString;
                pending: z$1.ZodString;
            }, z$1.core.$strip>;
            suppress: z$1.ZodOptional<z$1.ZodBoolean>;
            tint: z$1.ZodOptional<z$1.ZodObject<{
                dark: z$1.ZodString;
                light: z$1.ZodString;
            }, z$1.core.$strip>>;
            title: z$1.ZodOptional<z$1.ZodString>;
        }, z$1.core.$strip>>;
        title: z$1.ZodString;
    }, z$1.core.$strip>;
    resolution: z$1.ZodNullable<z$1.ZodObject<{
        description: z$1.ZodOptional<z$1.ZodObject<{
            detail: z$1.ZodOptional<z$1.ZodString>;
            payload: z$1.ZodOptional<z$1.ZodType<JsonValue, unknown, z$1.core.$ZodTypeInternals<JsonValue, unknown>>>;
            title: z$1.ZodOptional<z$1.ZodString>;
        }, z$1.core.$strip>>;
        kind: z$1.ZodLiteral<"plugin_submitted">;
    }, z$1.core.$strip>>;
    resolvedAt: z$1.ZodNullable<z$1.ZodNumber>;
    status: z$1.ZodEnum<{
        interrupted: "interrupted";
        pending: "pending";
        resolved: "resolved";
        resolving: "resolving";
    }>;
    statusReason: z$1.ZodNullable<z$1.ZodString>;
    threadId: z$1.ZodString;
    turnId: z$1.ZodNullable<z$1.ZodString>;
}, z$1.core.$strip>]>>;
type ThreadPendingInteractionsResponse = z$1.infer<typeof threadPendingInteractionsResponseSchema>;
declare const threadQueuedMessageListResponseSchema: z$1.ZodArray<z$1.ZodObject<{
    content: z$1.ZodArray<z$1.ZodDiscriminatedUnion<[z$1.ZodObject<{
        mentions: z$1.ZodDefault<z$1.ZodArray<z$1.ZodObject<{
            end: z$1.ZodNumber;
            resource: z$1.ZodPipe<z$1.ZodTransform<unknown, unknown>, z$1.ZodDiscriminatedUnion<[z$1.ZodObject<{
                kind: z$1.ZodLiteral<"thread">;
                label: z$1.ZodString;
                projectId: z$1.ZodOptional<z$1.ZodString>;
                threadId: z$1.ZodString;
            }, z$1.core.$strip>, z$1.ZodObject<{
                kind: z$1.ZodLiteral<"project">;
                label: z$1.ZodString;
                projectId: z$1.ZodString;
            }, z$1.core.$strip>, z$1.ZodObject<{
                kind: z$1.ZodLiteral<"section">;
                label: z$1.ZodString;
                sectionId: z$1.ZodString;
            }, z$1.core.$strip>, z$1.ZodObject<{
                entryKind: z$1.ZodEnum<{
                    directory: "directory";
                    file: "file";
                }>;
                kind: z$1.ZodLiteral<"path">;
                label: z$1.ZodString;
                path: z$1.ZodString;
                source: z$1.ZodEnum<{
                    "thread-storage": "thread-storage";
                    workspace: "workspace";
                }>;
            }, z$1.core.$strip>, z$1.ZodObject<{
                argumentHint: z$1.ZodNullable<z$1.ZodString>;
                kind: z$1.ZodLiteral<"command">;
                label: z$1.ZodString;
                name: z$1.ZodString;
                origin: z$1.ZodEnum<{
                    builtin: "builtin";
                    project: "project";
                    user: "user";
                }>;
                source: z$1.ZodEnum<{
                    command: "command";
                    skill: "skill";
                }>;
                trigger: z$1.ZodEnum<{
                    "/": "/";
                    $: "$";
                }>;
            }, z$1.core.$strip>, z$1.ZodObject<{
                icon: z$1.ZodOptional<z$1.ZodNullable<z$1.ZodString>>;
                itemId: z$1.ZodString;
                kind: z$1.ZodLiteral<"plugin">;
                label: z$1.ZodString;
                pluginId: z$1.ZodString;
            }, z$1.core.$strip>], "kind">>;
            start: z$1.ZodNumber;
        }, z$1.core.$strip>>>;
        text: z$1.ZodString;
        type: z$1.ZodLiteral<"text">;
        visibility: z$1.ZodOptional<z$1.ZodEnum<{
            "agent-only": "agent-only";
        }>>;
    }, z$1.core.$strip>, z$1.ZodObject<{
        type: z$1.ZodLiteral<"image">;
        url: z$1.ZodString;
        visibility: z$1.ZodOptional<z$1.ZodEnum<{
            "agent-only": "agent-only";
        }>>;
    }, z$1.core.$strip>, z$1.ZodObject<{
        path: z$1.ZodString;
        type: z$1.ZodLiteral<"localImage">;
        visibility: z$1.ZodOptional<z$1.ZodEnum<{
            "agent-only": "agent-only";
        }>>;
    }, z$1.core.$strip>, z$1.ZodObject<{
        mimeType: z$1.ZodOptional<z$1.ZodString>;
        name: z$1.ZodOptional<z$1.ZodString>;
        path: z$1.ZodString;
        sizeBytes: z$1.ZodOptional<z$1.ZodNumber>;
        type: z$1.ZodLiteral<"localFile">;
        visibility: z$1.ZodOptional<z$1.ZodEnum<{
            "agent-only": "agent-only";
        }>>;
    }, z$1.core.$strip>], "type">>;
    createdAt: z$1.ZodNumber;
    editable: z$1.ZodBoolean;
    failureReason: z$1.ZodNullable<z$1.ZodString>;
    groupWithNext: z$1.ZodBoolean;
    id: z$1.ZodString;
    initiator: z$1.ZodEnum<{
        agent: "agent";
        system: "system";
        user: "user";
    }>;
    model: z$1.ZodString;
    origin: z$1.ZodNullable<z$1.ZodEnum<{
        app: "app";
        cli: "cli";
        plugin: "plugin";
        sdk: "sdk";
    }>>;
    originPluginId: z$1.ZodNullable<z$1.ZodString>;
    payload: z$1.ZodDiscriminatedUnion<[z$1.ZodObject<{
        kind: z$1.ZodLiteral<"inline">;
    }, z$1.core.$strip>, z$1.ZodObject<{
        attempt: z$1.ZodNumber;
        kind: z$1.ZodLiteral<"retry">;
        reason: z$1.ZodString;
        retryOfTurnRequestId: z$1.ZodString;
    }, z$1.core.$strip>], "kind">;
    permissionMode: z$1.ZodEnum<{
        "accept-edits": "accept-edits";
        auto: "auto";
        full: "full";
    }>;
    reasoningLevel: z$1.ZodEnum<{
        high: "high";
        low: "low";
        max: "max";
        medium: "medium";
        none: "none";
        ultra: "ultra";
        ultracode: "ultracode";
        xhigh: "xhigh";
    }>;
    sendAt: z$1.ZodNullable<z$1.ZodNumber>;
    senderThreadId: z$1.ZodNullable<z$1.ZodString>;
    serviceTier: z$1.ZodEnum<{
        default: "default";
        fast: "fast";
    }>;
    threadId: z$1.ZodString;
    updatedAt: z$1.ZodNumber;
    waitingOn: z$1.ZodNullable<z$1.ZodDiscriminatedUnion<[z$1.ZodObject<{
        kind: z$1.ZodLiteral<"time">;
    }, z$1.core.$strip>, z$1.ZodObject<{
        kind: z$1.ZodLiteral<"thread-busy">;
    }, z$1.core.$strip>, z$1.ZodObject<{
        kind: z$1.ZodLiteral<"stopping">;
    }, z$1.core.$strip>, z$1.ZodObject<{
        kind: z$1.ZodLiteral<"turn-starting">;
    }, z$1.core.$strip>, z$1.ZodObject<{
        kind: z$1.ZodLiteral<"provisioning">;
    }, z$1.core.$strip>, z$1.ZodObject<{
        hostName: z$1.ZodString;
        kind: z$1.ZodLiteral<"host-offline">;
    }, z$1.core.$strip>, z$1.ZodObject<{
        kind: z$1.ZodLiteral<"interaction">;
    }, z$1.core.$strip>, z$1.ZodObject<{
        kind: z$1.ZodLiteral<"plugin">;
        pluginId: z$1.ZodString;
        reason: z$1.ZodString;
    }, z$1.core.$strip>], "kind">>;
}, z$1.core.$strip>>;
type ThreadQueuedMessageListResponse = z$1.infer<typeof threadQueuedMessageListResponseSchema>;
declare const threadChildSummaryResponseSchema: z$1.ZodObject<{
    nonDeletedChildCount: z$1.ZodNumber;
}, z$1.core.$strip>;
type ThreadChildSummaryResponse = z$1.infer<typeof threadChildSummaryResponseSchema>;
declare const deleteThreadRequestSchema: z$1.ZodObject<{
    childThreadsConfirmed: z$1.ZodBoolean;
}, z$1.core.$strip>;
type DeleteThreadRequest = z$1.infer<typeof deleteThreadRequestSchema>;
declare const updateThreadRequestSchema: z$1.ZodObject<{
    model: z$1.ZodOptional<z$1.ZodNullable<z$1.ZodString>>;
    parentThreadId: z$1.ZodOptional<z$1.ZodNullable<z$1.ZodString>>;
    reasoningLevel: z$1.ZodOptional<z$1.ZodNullable<z$1.ZodEnum<{
        high: "high";
        low: "low";
        max: "max";
        medium: "medium";
        none: "none";
        ultra: "ultra";
        ultracode: "ultracode";
        xhigh: "xhigh";
    }>>>;
    sectionId: z$1.ZodOptional<z$1.ZodNullable<z$1.ZodString>>;
    title: z$1.ZodOptional<z$1.ZodNullable<z$1.ZodString>>;
    visibility: z$1.ZodOptional<z$1.ZodEnum<{
        hidden: "hidden";
        visible: "visible";
    }>>;
}, z$1.core.$strip>;
type UpdateThreadRequest = z$1.infer<typeof updateThreadRequestSchema>;
declare const reorderPinnedThreadRequestSchema: z$1.ZodObject<{
    nextThreadId: z$1.ZodNullable<z$1.ZodString>;
    previousThreadId: z$1.ZodNullable<z$1.ZodString>;
}, z$1.core.$strip>;
type ReorderPinnedThreadRequest = z$1.infer<typeof reorderPinnedThreadRequestSchema>;
declare const threadOpenSplitSchema: z$1.ZodEnum<{
    down: "down";
    left: "left";
    replace: "replace";
    right: "right";
    top: "top";
}>;
type ThreadOpenSplit = z$1.infer<typeof threadOpenSplitSchema>;
declare const threadOpenFileSchema: z$1.ZodObject<{
    lineNumber: z$1.ZodNullable<z$1.ZodNumber>;
    path: z$1.ZodString;
    source: z$1.ZodEnum<{
        "thread-storage": "thread-storage";
        workspace: "workspace";
    }>;
}, z$1.core.$strict>;
type ThreadOpenFile = z$1.infer<typeof threadOpenFileSchema>;
declare const threadOpenResponseSchema: z$1.ZodObject<{
    delivered: z$1.ZodNumber;
}, z$1.core.$strip>;
type ThreadOpenResponse = z$1.infer<typeof threadOpenResponseSchema>;
declare const threadPaneActionSchema: z$1.ZodEnum<{
    "clear-spotlight": "clear-spotlight";
    maximize: "maximize";
    restore: "restore";
    spotlight: "spotlight";
    toggle: "toggle";
}>;
type ThreadPaneAction = z$1.infer<typeof threadPaneActionSchema>;
declare const threadPaneActionResponseSchema: z$1.ZodObject<{
    delivered: z$1.ZodNumber;
}, z$1.core.$strip>;
type ThreadPaneActionResponse = z$1.infer<typeof threadPaneActionResponseSchema>;
declare const threadArchiveAllResponseSchema: z$1.ZodObject<{
    archivedThreadIds: z$1.ZodArray<z$1.ZodString>;
    ok: z$1.ZodLiteral<true>;
}, z$1.core.$strip>;
type ThreadArchiveAllResponse = z$1.infer<typeof threadArchiveAllResponseSchema>;
declare const threadListQuerySchema: z$1.ZodObject<{
    archived: z$1.ZodOptional<z$1.ZodEnum<{
        false: "false";
        true: "true";
    }>>;
    environmentId: z$1.ZodOptional<z$1.ZodString>;
    hasParent: z$1.ZodOptional<z$1.ZodEnum<{
        false: "false";
        true: "true";
    }>>;
    includeHidden: z$1.ZodOptional<z$1.ZodEnum<{
        false: "false";
        true: "true";
    }>>;
    limit: z$1.ZodOptional<z$1.ZodString>;
    offset: z$1.ZodOptional<z$1.ZodString>;
    originKind: z$1.ZodOptional<z$1.ZodEnum<{
        fork: "fork";
    }>>;
    originPluginId: z$1.ZodOptional<z$1.ZodString>;
    parentThreadId: z$1.ZodOptional<z$1.ZodString>;
    projectId: z$1.ZodOptional<z$1.ZodString>;
    sectionId: z$1.ZodOptional<z$1.ZodString>;
    sourceThreadId: z$1.ZodOptional<z$1.ZodString>;
    unsectioned: z$1.ZodOptional<z$1.ZodEnum<{
        false: "false";
        true: "true";
    }>>;
}, z$1.core.$strip>;
type ThreadListQuery = z$1.infer<typeof threadListQuerySchema>;
/**
 * Grouping for `GET /threads/count`. Omitted, the route answers one total.
 * `host` groups by the host the thread's environment lives on; a thread with
 * no environment yet counts under the `null` key.
 */
declare const threadCountGroupBySchema: z$1.ZodEnum<{
    host: "host";
    project: "project";
    provider: "provider";
}>;
type ThreadCountGroupBy = z$1.infer<typeof threadCountGroupBySchema>;
/**
 * `total` is always the count of every matching thread. `groups` is present
 * exactly when `groupBy` was requested — an ungrouped count has no group list,
 * rather than one anonymous group.
 */
declare const threadCountResponseSchema: z$1.ZodObject<{
    groups: z$1.ZodOptional<z$1.ZodArray<z$1.ZodObject<{
        count: z$1.ZodNumber;
        key: z$1.ZodNullable<z$1.ZodString>;
    }, z$1.core.$strip>>>;
    total: z$1.ZodNumber;
}, z$1.core.$strip>;
type ThreadCountResponse = z$1.infer<typeof threadCountResponseSchema>;
declare const threadRunningResponseSchema: z$1.ZodArray<z$1.ZodObject<{
    hostId: z$1.ZodNullable<z$1.ZodString>;
    id: z$1.ZodString;
}, z$1.core.$strip>>;
type ThreadRunningResponse = z$1.infer<typeof threadRunningResponseSchema>;
declare const threadSearchQuerySchema: z$1.ZodObject<{
    limitPerGroup: z$1.ZodOptional<z$1.ZodString>;
    query: z$1.ZodString;
}, z$1.core.$strip>;
type ThreadSearchQuery = z$1.infer<typeof threadSearchQuerySchema>;
declare const threadTimelineQuerySchema: z$1.ZodObject<{
    afterSequence: z$1.ZodOptional<z$1.ZodString>;
    beforeAnchorId: z$1.ZodOptional<z$1.ZodString>;
    beforeAnchorSeq: z$1.ZodOptional<z$1.ZodString>;
    includeNestedRows: z$1.ZodOptional<z$1.ZodEnum<{
        false: "false";
        true: "true";
    }>>;
    segmentLimit: z$1.ZodOptional<z$1.ZodString>;
    summaryOnly: z$1.ZodOptional<z$1.ZodEnum<{
        false: "false";
        true: "true";
    }>>;
}, z$1.core.$strip>;
type ThreadTimelineQuery = z$1.infer<typeof threadTimelineQuerySchema>;
declare const timelineTurnSummaryDetailsQuerySchema: z$1.ZodObject<{
    beforeCursor: z$1.ZodOptional<z$1.ZodString>;
    sourceSeqEnd: z$1.ZodString;
    sourceSeqStart: z$1.ZodString;
    turnId: z$1.ZodString;
}, z$1.core.$strip>;
type TimelineTurnSummaryDetailsQuery = z$1.infer<typeof timelineTurnSummaryDetailsQuerySchema>;
declare const threadStorageFilesQuerySchema: z$1.ZodObject<{
    limit: z$1.ZodOptional<z$1.ZodString>;
    query: z$1.ZodOptional<z$1.ZodString>;
}, z$1.core.$strip>;
type ThreadStorageFilesQuery = z$1.infer<typeof threadStorageFilesQuerySchema>;
declare const threadStoragePathsQuerySchema: z$1.ZodObject<{
    includeDirectories: z$1.ZodEnum<{
        false: "false";
        true: "true";
    }>;
    includeFiles: z$1.ZodEnum<{
        false: "false";
        true: "true";
    }>;
    limit: z$1.ZodOptional<z$1.ZodString>;
    query: z$1.ZodOptional<z$1.ZodString>;
}, z$1.core.$strip>;
type ThreadStoragePathsQuery = z$1.infer<typeof threadStoragePathsQuerySchema>;
declare const threadStorageLocationResponseSchema: z$1.ZodObject<{
    hostId: z$1.ZodString;
    storageRootPath: z$1.ZodString;
}, z$1.core.$strict>;
type ThreadStorageLocationResponse = z$1.infer<typeof threadStorageLocationResponseSchema>;
declare const timelineTurnSummaryDetailsResponseSchema: z$1.ZodObject<{
    historySnapshot: z$1.ZodOptional<z$1.ZodString>;
    olderCursor: z$1.ZodOptional<z$1.ZodNullable<z$1.ZodString>>;
    rows: z$1.ZodArray<z$1.ZodType<TimelineRow, unknown, z$1.core.$ZodTypeInternals<TimelineRow, unknown>>>;
}, z$1.core.$strip>;
type TimelineTurnSummaryDetailsResponse = z$1.infer<typeof timelineTurnSummaryDetailsResponseSchema>;
declare const threadTimelineResponseSchema: z$1.ZodObject<{
    activeBackgroundCommands: z$1.ZodArray<z$1.ZodObject<{
        completedAt: z$1.ZodNullable<z$1.ZodNumber>;
        createdAt: z$1.ZodNumber;
        description: z$1.ZodString;
        error: z$1.ZodNullable<z$1.ZodString>;
        id: z$1.ZodString;
        itemId: z$1.ZodString;
        kind: z$1.ZodLiteral<"work">;
        model: z$1.ZodNullable<z$1.ZodString>;
        presentation: z$1.ZodOptional<z$1.ZodObject<{
            badge: z$1.ZodOptional<z$1.ZodObject<{
                glyph: z$1.ZodString;
                hint: z$1.ZodString;
                label: z$1.ZodString;
                tone: z$1.ZodEnum<{
                    destructive: "destructive";
                    neutral: "neutral";
                }>;
            }, z$1.core.$strip>>;
            detail: z$1.ZodOptional<z$1.ZodString>;
            icon: z$1.ZodObject<{
                glyph: z$1.ZodString;
            }, z$1.core.$strip>;
            label: z$1.ZodObject<{
                completed: z$1.ZodString;
                pending: z$1.ZodString;
            }, z$1.core.$strip>;
            suppress: z$1.ZodOptional<z$1.ZodBoolean>;
            tint: z$1.ZodOptional<z$1.ZodObject<{
                dark: z$1.ZodString;
                light: z$1.ZodString;
            }, z$1.core.$strip>>;
            title: z$1.ZodOptional<z$1.ZodString>;
        }, z$1.core.$strip>>;
        sourceSeqEnd: z$1.ZodNumber;
        sourceSeqStart: z$1.ZodNumber;
        startedAt: z$1.ZodNumber;
        status: z$1.ZodEnum<{
            completed: "completed";
            error: "error";
            interrupted: "interrupted";
            pending: "pending";
        }>;
        summary: z$1.ZodNullable<z$1.ZodString>;
        taskStatus: z$1.ZodEnum<{
            completed: "completed";
            failed: "failed";
            killed: "killed";
            paused: "paused";
            pending: "pending";
            running: "running";
            stopped: "stopped";
        }>;
        taskType: z$1.ZodString;
        threadId: z$1.ZodString;
        turnId: z$1.ZodNullable<z$1.ZodString>;
        usage: z$1.ZodNullable<z$1.ZodObject<{
            durationMs: z$1.ZodNumber;
            toolUses: z$1.ZodNumber;
            totalTokens: z$1.ZodNumber;
        }, z$1.core.$strip>>;
        workKind: z$1.ZodLiteral<"workflow">;
        workflow: z$1.ZodNullable<z$1.ZodObject<{
            agents: z$1.ZodArray<z$1.ZodObject<{
                agentType: z$1.ZodOptional<z$1.ZodString>;
                attempt: z$1.ZodNumber;
                cached: z$1.ZodBoolean;
                durationMs: z$1.ZodOptional<z$1.ZodNumber>;
                error: z$1.ZodOptional<z$1.ZodString>;
                index: z$1.ZodNumber;
                isolation: z$1.ZodOptional<z$1.ZodString>;
                label: z$1.ZodString;
                lastProgressAt: z$1.ZodNumber;
                lastToolName: z$1.ZodOptional<z$1.ZodString>;
                lastToolSummary: z$1.ZodOptional<z$1.ZodString>;
                model: z$1.ZodString;
                phaseIndex: z$1.ZodOptional<z$1.ZodNumber>;
                phaseTitle: z$1.ZodOptional<z$1.ZodString>;
                promptPreview: z$1.ZodOptional<z$1.ZodString>;
                queuedAt: z$1.ZodOptional<z$1.ZodNumber>;
                resultPreview: z$1.ZodOptional<z$1.ZodString>;
                startedAt: z$1.ZodOptional<z$1.ZodNumber>;
                state: z$1.ZodEnum<{
                    done: "done";
                    failed: "failed";
                    queued: "queued";
                    running: "running";
                    skipped: "skipped";
                }>;
                tokens: z$1.ZodOptional<z$1.ZodNumber>;
                toolCalls: z$1.ZodOptional<z$1.ZodNumber>;
            }, z$1.core.$strip>>;
            phases: z$1.ZodArray<z$1.ZodObject<{
                index: z$1.ZodNumber;
                kind: z$1.ZodOptional<z$1.ZodString>;
                title: z$1.ZodString;
            }, z$1.core.$strip>>;
        }, z$1.core.$strip>>;
        workflowName: z$1.ZodNullable<z$1.ZodString>;
    }, z$1.core.$strip>>;
    activePromptMode: z$1.ZodNullable<z$1.ZodObject<{
        mode: z$1.ZodLiteral<"plan">;
        prompt: z$1.ZodString;
        providerId: z$1.ZodString;
    }, z$1.core.$strict>>;
    activeThinking: z$1.ZodNullable<z$1.ZodObject<{
        id: z$1.ZodString;
        startedAt: z$1.ZodNumber;
        text: z$1.ZodString;
        updatedAt: z$1.ZodNumber;
    }, z$1.core.$strip>>;
    activeWorkflows: z$1.ZodArray<z$1.ZodObject<{
        completedAt: z$1.ZodNullable<z$1.ZodNumber>;
        createdAt: z$1.ZodNumber;
        description: z$1.ZodString;
        error: z$1.ZodNullable<z$1.ZodString>;
        id: z$1.ZodString;
        itemId: z$1.ZodString;
        kind: z$1.ZodLiteral<"work">;
        model: z$1.ZodNullable<z$1.ZodString>;
        presentation: z$1.ZodOptional<z$1.ZodObject<{
            badge: z$1.ZodOptional<z$1.ZodObject<{
                glyph: z$1.ZodString;
                hint: z$1.ZodString;
                label: z$1.ZodString;
                tone: z$1.ZodEnum<{
                    destructive: "destructive";
                    neutral: "neutral";
                }>;
            }, z$1.core.$strip>>;
            detail: z$1.ZodOptional<z$1.ZodString>;
            icon: z$1.ZodObject<{
                glyph: z$1.ZodString;
            }, z$1.core.$strip>;
            label: z$1.ZodObject<{
                completed: z$1.ZodString;
                pending: z$1.ZodString;
            }, z$1.core.$strip>;
            suppress: z$1.ZodOptional<z$1.ZodBoolean>;
            tint: z$1.ZodOptional<z$1.ZodObject<{
                dark: z$1.ZodString;
                light: z$1.ZodString;
            }, z$1.core.$strip>>;
            title: z$1.ZodOptional<z$1.ZodString>;
        }, z$1.core.$strip>>;
        sourceSeqEnd: z$1.ZodNumber;
        sourceSeqStart: z$1.ZodNumber;
        startedAt: z$1.ZodNumber;
        status: z$1.ZodEnum<{
            completed: "completed";
            error: "error";
            interrupted: "interrupted";
            pending: "pending";
        }>;
        summary: z$1.ZodNullable<z$1.ZodString>;
        taskStatus: z$1.ZodEnum<{
            completed: "completed";
            failed: "failed";
            killed: "killed";
            paused: "paused";
            pending: "pending";
            running: "running";
            stopped: "stopped";
        }>;
        taskType: z$1.ZodString;
        threadId: z$1.ZodString;
        turnId: z$1.ZodNullable<z$1.ZodString>;
        usage: z$1.ZodNullable<z$1.ZodObject<{
            durationMs: z$1.ZodNumber;
            toolUses: z$1.ZodNumber;
            totalTokens: z$1.ZodNumber;
        }, z$1.core.$strip>>;
        workKind: z$1.ZodLiteral<"workflow">;
        workflow: z$1.ZodNullable<z$1.ZodObject<{
            agents: z$1.ZodArray<z$1.ZodObject<{
                agentType: z$1.ZodOptional<z$1.ZodString>;
                attempt: z$1.ZodNumber;
                cached: z$1.ZodBoolean;
                durationMs: z$1.ZodOptional<z$1.ZodNumber>;
                error: z$1.ZodOptional<z$1.ZodString>;
                index: z$1.ZodNumber;
                isolation: z$1.ZodOptional<z$1.ZodString>;
                label: z$1.ZodString;
                lastProgressAt: z$1.ZodNumber;
                lastToolName: z$1.ZodOptional<z$1.ZodString>;
                lastToolSummary: z$1.ZodOptional<z$1.ZodString>;
                model: z$1.ZodString;
                phaseIndex: z$1.ZodOptional<z$1.ZodNumber>;
                phaseTitle: z$1.ZodOptional<z$1.ZodString>;
                promptPreview: z$1.ZodOptional<z$1.ZodString>;
                queuedAt: z$1.ZodOptional<z$1.ZodNumber>;
                resultPreview: z$1.ZodOptional<z$1.ZodString>;
                startedAt: z$1.ZodOptional<z$1.ZodNumber>;
                state: z$1.ZodEnum<{
                    done: "done";
                    failed: "failed";
                    queued: "queued";
                    running: "running";
                    skipped: "skipped";
                }>;
                tokens: z$1.ZodOptional<z$1.ZodNumber>;
                toolCalls: z$1.ZodOptional<z$1.ZodNumber>;
            }, z$1.core.$strip>>;
            phases: z$1.ZodArray<z$1.ZodObject<{
                index: z$1.ZodNumber;
                kind: z$1.ZodOptional<z$1.ZodString>;
                title: z$1.ZodString;
            }, z$1.core.$strip>>;
        }, z$1.core.$strip>>;
        workflowName: z$1.ZodNullable<z$1.ZodString>;
    }, z$1.core.$strip>>;
    completedTurnDisplay: z$1.ZodEnum<{
        collapse: "collapse";
        flat: "flat";
    }>;
    contextBoundarySeq: z$1.ZodNullable<z$1.ZodNumber>;
    contextWindowUsage: z$1.ZodOptional<z$1.ZodObject<{
        estimated: z$1.ZodBoolean;
        modelContextWindow: z$1.ZodNumber;
        snapshot: z$1.ZodOptional<z$1.ZodObject<{
            autoCompactAtTokens: z$1.ZodNullable<z$1.ZodNumber>;
            capturedAt: z$1.ZodISODateTime;
            categories: z$1.ZodArray<z$1.ZodObject<{
                entries: z$1.ZodArray<z$1.ZodObject<{
                    id: z$1.ZodString;
                    label: z$1.ZodString;
                    tokens: z$1.ZodNumber;
                }, z$1.core.$strip>>;
                id: z$1.ZodString;
                kind: z$1.ZodEnum<{
                    deferred: "deferred";
                    free: "free";
                    reserved: "reserved";
                    used: "used";
                }>;
                label: z$1.ZodString;
                tokens: z$1.ZodNumber;
            }, z$1.core.$strip>>;
            contextWindowTokens: z$1.ZodNumber;
            estimated: z$1.ZodBoolean;
            model: z$1.ZodString;
            providerSessionId: z$1.ZodString;
            providerTurnId: z$1.ZodNullable<z$1.ZodString>;
            usedTokens: z$1.ZodNumber;
        }, z$1.core.$strip>>;
        usedTokens: z$1.ZodNumber;
    }, z$1.core.$strip>>;
    delta: z$1.ZodOptional<z$1.ZodObject<{
        rowOrder: z$1.ZodOptional<z$1.ZodArray<z$1.ZodString>>;
        upsertRows: z$1.ZodArray<z$1.ZodType<TimelineRow, unknown, z$1.core.$ZodTypeInternals<TimelineRow, unknown>>>;
    }, z$1.core.$strip>>;
    goal: z$1.ZodNullable<z$1.ZodObject<{
        objective: z$1.ZodString;
        sourceSeq: z$1.ZodNumber;
        status: z$1.ZodEnum<{
            active: "active";
            budgetLimited: "budgetLimited";
            complete: "complete";
            paused: "paused";
        }>;
        timeUsedSeconds: z$1.ZodNumber;
        tokenBudget: z$1.ZodNullable<z$1.ZodNumber>;
        tokensUsed: z$1.ZodNumber;
        updatedAt: z$1.ZodNumber;
    }, z$1.core.$strip>>;
    maxSeq: z$1.ZodNumber;
    modelFallback: z$1.ZodNullable<z$1.ZodObject<{
        detectedAt: z$1.ZodNumber;
        fallbackModel: z$1.ZodString;
        message: z$1.ZodString;
        originalModel: z$1.ZodString;
        reason: z$1.ZodEnum<{
            provider: "provider";
            refusal: "refusal";
        }>;
        sourceSeq: z$1.ZodNumber;
    }, z$1.core.$strip>>;
    pendingTodos: z$1.ZodNullable<z$1.ZodObject<{
        items: z$1.ZodArray<z$1.ZodObject<{
            id: z$1.ZodString;
            status: z$1.ZodEnum<{
                completed: "completed";
                in_progress: "in_progress";
                pending: "pending";
            }>;
            text: z$1.ZodString;
        }, z$1.core.$strip>>;
        sourceSeq: z$1.ZodNumber;
        updatedAt: z$1.ZodNumber;
    }, z$1.core.$strip>>;
    rows: z$1.ZodArray<z$1.ZodType<TimelineRow, unknown, z$1.core.$ZodTypeInternals<TimelineRow, unknown>>>;
    timelinePage: z$1.ZodObject<{
        contentPage: z$1.ZodOptional<z$1.ZodObject<{
            anchorSeq: z$1.ZodNumber;
            end: z$1.ZodNumber;
            start: z$1.ZodNumber;
            total: z$1.ZodNumber;
        }, z$1.core.$strip>>;
        hasOlderRows: z$1.ZodBoolean;
        historySnapshot: z$1.ZodOptional<z$1.ZodString>;
        kind: z$1.ZodEnum<{
            latest: "latest";
            older: "older";
        }>;
        olderCursor: z$1.ZodNullable<z$1.ZodObject<{
            anchorId: z$1.ZodString;
            anchorSeq: z$1.ZodNumber;
        }, z$1.core.$strict>>;
        olderRowsSourceSeqEnd: z$1.ZodOptional<z$1.ZodNullable<z$1.ZodNumber>>;
        returnedSegmentCount: z$1.ZodNumber;
        segmentLimit: z$1.ZodNumber;
    }, z$1.core.$strict>;
}, z$1.core.$strip>;
type ThreadTimelineResponse = z$1.infer<typeof threadTimelineResponseSchema>;
declare const threadConversationOutlineResponseSchema: z$1.ZodObject<{
    items: z$1.ZodArray<z$1.ZodObject<{
        attachmentSummary: z$1.ZodNullable<z$1.ZodObject<{
            fileCount: z$1.ZodNumber;
            imageCount: z$1.ZodNumber;
        }, z$1.core.$strict>>;
        id: z$1.ZodString;
        preview: z$1.ZodString;
        role: z$1.ZodEnum<{
            assistant: "assistant";
            user: "user";
        }>;
    }, z$1.core.$strict>>;
    maxSeq: z$1.ZodNumber;
}, z$1.core.$strict>;
type ThreadConversationOutlineResponse = z$1.infer<typeof threadConversationOutlineResponseSchema>;
declare const threadStorageFileListResponseSchema: z$1.ZodObject<{
    files: z$1.ZodArray<z$1.ZodObject<{
        name: z$1.ZodString;
        path: z$1.ZodString;
    }, z$1.core.$strip>>;
    storageRootPath: z$1.ZodString;
    truncated: z$1.ZodBoolean;
}, z$1.core.$strip>;
type ThreadStorageFileListResponse = z$1.infer<typeof threadStorageFileListResponseSchema>;
declare const threadStoragePathListResponseSchema: z$1.ZodObject<{
    paths: z$1.ZodArray<z$1.ZodObject<{
        kind: z$1.ZodEnum<{
            directory: "directory";
            file: "file";
        }>;
        name: z$1.ZodString;
        path: z$1.ZodString;
        positions: z$1.ZodArray<z$1.ZodNumber>;
        score: z$1.ZodNumber;
    }, z$1.core.$strip>>;
    storageRootPath: z$1.ZodString;
    truncated: z$1.ZodBoolean;
}, z$1.core.$strip>;
type ThreadStoragePathListResponse = z$1.infer<typeof threadStoragePathListResponseSchema>;

declare const desktopBrowserHostRequestSchema: z$1.ZodObject<{
    hostId: z$1.ZodString;
}, z$1.core.$strict>;
declare const desktopBrowserScopeSchema: z$1.ZodObject<{
    generation: z$1.ZodString;
    hostId: z$1.ZodString;
    instanceId: z$1.ZodString;
    threadId: z$1.ZodString;
}, z$1.core.$strict>;
declare const desktopBrowserTabRequestSchema: z$1.ZodObject<{
    generation: z$1.ZodString;
    hostId: z$1.ZodString;
    instanceId: z$1.ZodString;
    tabId: z$1.ZodString;
    threadId: z$1.ZodString;
}, z$1.core.$strict>;
declare const desktopBrowserCreateRequestSchema: z$1.ZodObject<{
    generation: z$1.ZodString;
    hostId: z$1.ZodString;
    instanceId: z$1.ZodString;
    presentation: z$1.ZodDefault<z$1.ZodEnum<{
        hidden: "hidden";
        reveal: "reveal";
    }>>;
    threadId: z$1.ZodString;
    url: z$1.ZodDefault<z$1.ZodPipe<z$1.ZodString, z$1.ZodString>>;
}, z$1.core.$strict>;
declare const desktopBrowserAcquireRequestSchema: z$1.ZodObject<{
    allowPersonal: z$1.ZodDefault<z$1.ZodBoolean>;
    controllerLabel: z$1.ZodString;
    generation: z$1.ZodString;
    hostId: z$1.ZodString;
    instanceId: z$1.ZodString;
    tabIds: z$1.ZodArray<z$1.ZodString>;
    threadId: z$1.ZodString;
    ttlMs: z$1.ZodDefault<z$1.ZodNumber>;
}, z$1.core.$strict>;
declare const desktopBrowserLeaseRequestSchema: z$1.ZodObject<{
    generation: z$1.ZodString;
    hostId: z$1.ZodString;
    instanceId: z$1.ZodString;
    leaseId: z$1.ZodString;
    threadId: z$1.ZodString;
}, z$1.core.$strict>;
declare const desktopBrowserInstanceRequestSchema: z$1.ZodObject<{
    generation: z$1.ZodString;
    hostId: z$1.ZodString;
    instanceId: z$1.ZodString;
}, z$1.core.$strict>;
declare const desktopBrowserImportCookiesRequestSchema: z$1.ZodObject<{
    generation: z$1.ZodString;
    hostId: z$1.ZodString;
    instanceId: z$1.ZodString;
    profile: z$1.ZodDefault<z$1.ZodDiscriminatedUnion<[z$1.ZodObject<{
        id: z$1.ZodString;
        kind: z$1.ZodLiteral<"automation">;
    }, z$1.core.$strip>, z$1.ZodObject<{
        kind: z$1.ZodLiteral<"personal">;
    }, z$1.core.$strip>], "kind">>;
    sourceId: z$1.ZodEnum<{
        arc: "arc";
        brave: "brave";
        chrome: "chrome";
        chromium: "chromium";
        edge: "edge";
        firefox: "firefox";
        helium: "helium";
        opera: "opera";
        safari: "safari";
        vivaldi: "vivaldi";
    }>;
    sourceProfileDirectory: z$1.ZodString;
}, z$1.core.$strict>;
type ExperimentalDesktopBrowserHostRequest = z$1.infer<typeof desktopBrowserHostRequestSchema>;
type ExperimentalDesktopBrowserScope = z$1.infer<typeof desktopBrowserScopeSchema>;
type ExperimentalDesktopBrowserTabRequest = z$1.infer<typeof desktopBrowserTabRequestSchema>;
type ExperimentalDesktopBrowserLeaseRequest = z$1.infer<typeof desktopBrowserLeaseRequestSchema>;
type ExperimentalDesktopBrowserCreateInput = z$1.input<typeof desktopBrowserCreateRequestSchema>;
type ExperimentalDesktopBrowserAcquireInput = z$1.input<typeof desktopBrowserAcquireRequestSchema>;
type ExperimentalDesktopBrowserLease = ExperimentalDesktopBrowserScope & {
    leaseId: string;
    tabIds: string[];
    controllerLabel: string;
    expiresAt: number;
};
type ExperimentalDesktopBrowserInstances = {
    instances: (DesktopBrowserInstance & {
        hostId: string;
    })[];
};
type ExperimentalDesktopBrowserTabs = DesktopBrowserResult<"desktop.browser.list_tabs">;
type ExperimentalDesktopBrowserCreated = DesktopBrowserResult<"desktop.browser.create_tab">;
type ExperimentalDesktopBrowserCapture = DesktopBrowserResult<"desktop.browser.capture_tab">;
type ExperimentalDesktopBrowserConnection = {
    hostId: string;
    wsEndpoint: string;
    expiresAt: number;
};
type ExperimentalDesktopBrowserInstanceRequest = z$1.infer<typeof desktopBrowserInstanceRequestSchema>;
type ExperimentalDesktopBrowserImportCookiesInput = z$1.input<typeof desktopBrowserImportCookiesRequestSchema>;
type ExperimentalDesktopBrowserImportSources = DesktopBrowserResult<"desktop.browser.list_import_sources">;
type ExperimentalDesktopBrowserImportOutcome = DesktopBrowserResult<"desktop.browser.import_cookies">;

declare const serverMoveStatusSchema: z$1.ZodObject<{
    cancellable: z$1.ZodBoolean;
    destinationStatusUrl: z$1.ZodNullable<z$1.ZodString>;
    error: z$1.ZodNullable<z$1.ZodObject<{
        message: z$1.ZodString;
        step: z$1.ZodEnum<{
            "start-target": "start-target";
            "stop-work": "stop-work";
            "update-target": "update-target";
            "verify-address": "verify-address";
            export: "export";
            switch: "switch";
            transfer: "transfer";
        }>;
    }, z$1.core.$strict>>;
    finishedAt: z$1.ZodNullable<z$1.ZodNumber>;
    mode: z$1.ZodEnum<{
        connect: "connect";
        direct: "direct";
    }>;
    moveId: z$1.ZodString;
    serverUrl: z$1.ZodString;
    startedAt: z$1.ZodNumber;
    state: z$1.ZodEnum<{
        cancelled: "cancelled";
        completed: "completed";
        failed: "failed";
        preparing: "preparing";
        recovery_required: "recovery_required";
        switching: "switching";
    }>;
    steps: z$1.ZodArray<z$1.ZodObject<{
        id: z$1.ZodEnum<{
            "start-target": "start-target";
            "stop-work": "stop-work";
            "update-target": "update-target";
            "verify-address": "verify-address";
            export: "export";
            switch: "switch";
            transfer: "transfer";
        }>;
        message: z$1.ZodNullable<z$1.ZodString>;
        status: z$1.ZodEnum<{
            done: "done";
            failed: "failed";
            pending: "pending";
            running: "running";
            skipped: "skipped";
        }>;
    }, z$1.core.$strict>>;
    targetHostId: z$1.ZodString;
    targetHostName: z$1.ZodString;
}, z$1.core.$strict>;
type ServerMoveStatus = z$1.infer<typeof serverMoveStatusSchema>;
declare const serverMoveStatusResponseSchema: z$1.ZodObject<{
    lastMove: z$1.ZodNullable<z$1.ZodObject<{
        completedAt: z$1.ZodNumber;
        fromHostId: z$1.ZodString;
        fromHostName: z$1.ZodString;
        moveId: z$1.ZodString;
        oldCopyDeletedAt: z$1.ZodNullable<z$1.ZodNumber>;
        toHostId: z$1.ZodString;
        toHostName: z$1.ZodString;
    }, z$1.core.$strict>>;
    move: z$1.ZodNullable<z$1.ZodObject<{
        cancellable: z$1.ZodBoolean;
        destinationStatusUrl: z$1.ZodNullable<z$1.ZodString>;
        error: z$1.ZodNullable<z$1.ZodObject<{
            message: z$1.ZodString;
            step: z$1.ZodEnum<{
                "start-target": "start-target";
                "stop-work": "stop-work";
                "update-target": "update-target";
                "verify-address": "verify-address";
                export: "export";
                switch: "switch";
                transfer: "transfer";
            }>;
        }, z$1.core.$strict>>;
        finishedAt: z$1.ZodNullable<z$1.ZodNumber>;
        mode: z$1.ZodEnum<{
            connect: "connect";
            direct: "direct";
        }>;
        moveId: z$1.ZodString;
        serverUrl: z$1.ZodString;
        startedAt: z$1.ZodNumber;
        state: z$1.ZodEnum<{
            cancelled: "cancelled";
            completed: "completed";
            failed: "failed";
            preparing: "preparing";
            recovery_required: "recovery_required";
            switching: "switching";
        }>;
        steps: z$1.ZodArray<z$1.ZodObject<{
            id: z$1.ZodEnum<{
                "start-target": "start-target";
                "stop-work": "stop-work";
                "update-target": "update-target";
                "verify-address": "verify-address";
                export: "export";
                switch: "switch";
                transfer: "transfer";
            }>;
            message: z$1.ZodNullable<z$1.ZodString>;
            status: z$1.ZodEnum<{
                done: "done";
                failed: "failed";
                pending: "pending";
                running: "running";
                skipped: "skipped";
            }>;
        }, z$1.core.$strict>>;
        targetHostId: z$1.ZodString;
        targetHostName: z$1.ZodString;
    }, z$1.core.$strict>>;
}, z$1.core.$strict>;
type ServerMoveStatusResponse = z$1.infer<typeof serverMoveStatusResponseSchema>;
declare const serverMoveCheckRequestSchema: z$1.ZodObject<{
    serverUrl: z$1.ZodNullable<z$1.ZodString>;
    targetHostId: z$1.ZodString;
}, z$1.core.$strict>;
type ServerMoveCheckRequest = z$1.infer<typeof serverMoveCheckRequestSchema>;
declare const serverMoveCheckResponseSchema: z$1.ZodObject<{
    canMove: z$1.ZodBoolean;
    existingTargetServerData: z$1.ZodNullable<z$1.ZodObject<{
        path: z$1.ZodString;
        sizeBytes: z$1.ZodNumber;
    }, z$1.core.$strict>>;
    items: z$1.ZodArray<z$1.ZodObject<{
        detail: z$1.ZodNullable<z$1.ZodString>;
        id: z$1.ZodString;
        severity: z$1.ZodEnum<{
            blocker: "blocker";
            info: "info";
            warning: "warning";
        }>;
        title: z$1.ZodString;
    }, z$1.core.$strict>>;
    mode: z$1.ZodEnum<{
        connect: "connect";
        direct: "direct";
    }>;
    requiresServerUrl: z$1.ZodBoolean;
    serverUrl: z$1.ZodNullable<z$1.ZodString>;
    targetDataDir: z$1.ZodNullable<z$1.ZodString>;
    targetHostId: z$1.ZodString;
    targetHostName: z$1.ZodString;
}, z$1.core.$strict>;
type ServerMoveCheckResponse = z$1.infer<typeof serverMoveCheckResponseSchema>;
declare const serverMoveStartRequestSchema: z$1.ZodObject<{
    archiveExistingTargetServerData: z$1.ZodBoolean;
    serverUrl: z$1.ZodNullable<z$1.ZodString>;
    stopRunningWork: z$1.ZodLiteral<true>;
    targetHostId: z$1.ZodString;
}, z$1.core.$strict>;
type ServerMoveStartRequest = z$1.infer<typeof serverMoveStartRequestSchema>;
declare const deleteOldServerCopyResponseSchema: z$1.ZodObject<{
    deleted: z$1.ZodBoolean;
}, z$1.core.$strict>;
type DeleteOldServerCopyResponse = z$1.infer<typeof deleteOldServerCopyResponseSchema>;

declare const threadTabsResponseSchema: z$1.ZodObject<{
    revision: z$1.ZodNumber;
    tabs: z$1.ZodArray<z$1.ZodDiscriminatedUnion<[z$1.ZodObject<{
        id: z$1.ZodString;
        kind: z$1.ZodLiteral<"thread-info">;
    }, z$1.core.$strict>, z$1.ZodObject<{
        id: z$1.ZodString;
        kind: z$1.ZodLiteral<"git-diff">;
    }, z$1.core.$strict>, z$1.ZodObject<{
        actionId: z$1.ZodString;
        fileOpenerOwner: z$1.ZodOptional<z$1.ZodDiscriminatedUnion<[z$1.ZodObject<{
            environmentId: z$1.ZodNullable<z$1.ZodString>;
            kind: z$1.ZodLiteral<"workspace-file-preview">;
            projectId: z$1.ZodNullable<z$1.ZodString>;
            tab: z$1.ZodObject<{
                lineRange: z$1.ZodNullable<z$1.ZodObject<{
                    endLineNumber: z$1.ZodNumber;
                    startLineNumber: z$1.ZodNumber;
                }, z$1.core.$strict>>;
                path: z$1.ZodString;
                source: z$1.ZodDiscriminatedUnion<[z$1.ZodObject<{
                    kind: z$1.ZodLiteral<"working-tree">;
                }, z$1.core.$strict>, z$1.ZodObject<{
                    kind: z$1.ZodLiteral<"head">;
                }, z$1.core.$strict>, z$1.ZodObject<{
                    kind: z$1.ZodLiteral<"merge-base">;
                    ref: z$1.ZodString;
                }, z$1.core.$strict>], "kind">;
                statusLabel: z$1.ZodNullable<z$1.ZodLiteral<"deleted">>;
            }, z$1.core.$strict>;
            threadId: z$1.ZodNullable<z$1.ZodString>;
        }, z$1.core.$strict>, z$1.ZodObject<{
            environmentId: z$1.ZodDefault<z$1.ZodNullable<z$1.ZodString>>;
            hostId: z$1.ZodDefault<z$1.ZodNullable<z$1.ZodString>>;
            kind: z$1.ZodLiteral<"host-file-preview">;
            tab: z$1.ZodObject<{
                lineRange: z$1.ZodNullable<z$1.ZodObject<{
                    endLineNumber: z$1.ZodNumber;
                    startLineNumber: z$1.ZodNumber;
                }, z$1.core.$strict>>;
                path: z$1.ZodString;
            }, z$1.core.$strict>;
            threadId: z$1.ZodDefault<z$1.ZodNullable<z$1.ZodString>>;
        }, z$1.core.$strict>, z$1.ZodObject<{
            environmentId: z$1.ZodNullable<z$1.ZodString>;
            kind: z$1.ZodLiteral<"thread-storage-file-preview">;
            tab: z$1.ZodObject<{
                lineRange: z$1.ZodNullable<z$1.ZodObject<{
                    endLineNumber: z$1.ZodNumber;
                    startLineNumber: z$1.ZodNumber;
                }, z$1.core.$strict>>;
                path: z$1.ZodString;
            }, z$1.core.$strict>;
            threadId: z$1.ZodString;
        }, z$1.core.$strict>], "kind">>;
        id: z$1.ZodString;
        kind: z$1.ZodLiteral<"plugin-panel">;
        paramsJson: z$1.ZodNullable<z$1.ZodString>;
        pluginId: z$1.ZodString;
        title: z$1.ZodString;
    }, z$1.core.$strict>, z$1.ZodObject<{
        environmentId: z$1.ZodNullable<z$1.ZodString>;
        id: z$1.ZodString;
        kind: z$1.ZodLiteral<"workspace-file-preview">;
        lineRange: z$1.ZodNullable<z$1.ZodObject<{
            endLineNumber: z$1.ZodNumber;
            startLineNumber: z$1.ZodNumber;
        }, z$1.core.$strict>>;
        path: z$1.ZodString;
        projectId: z$1.ZodNullable<z$1.ZodString>;
        source: z$1.ZodDiscriminatedUnion<[z$1.ZodObject<{
            kind: z$1.ZodLiteral<"working-tree">;
        }, z$1.core.$strict>, z$1.ZodObject<{
            kind: z$1.ZodLiteral<"head">;
        }, z$1.core.$strict>, z$1.ZodObject<{
            kind: z$1.ZodLiteral<"merge-base">;
            ref: z$1.ZodString;
        }, z$1.core.$strict>], "kind">;
        statusLabel: z$1.ZodNullable<z$1.ZodLiteral<"deleted">>;
    }, z$1.core.$strict>, z$1.ZodObject<{
        environmentId: z$1.ZodNullable<z$1.ZodString>;
        hostId: z$1.ZodDefault<z$1.ZodNullable<z$1.ZodString>>;
        id: z$1.ZodString;
        kind: z$1.ZodLiteral<"host-file-preview">;
        lineRange: z$1.ZodNullable<z$1.ZodObject<{
            endLineNumber: z$1.ZodNumber;
            startLineNumber: z$1.ZodNumber;
        }, z$1.core.$strict>>;
        path: z$1.ZodString;
        threadId: z$1.ZodNullable<z$1.ZodString>;
    }, z$1.core.$strict>, z$1.ZodObject<{
        environmentId: z$1.ZodNullable<z$1.ZodString>;
        id: z$1.ZodString;
        isPinned: z$1.ZodBoolean;
        kind: z$1.ZodLiteral<"thread-storage-file-preview">;
        lineRange: z$1.ZodNullable<z$1.ZodObject<{
            endLineNumber: z$1.ZodNumber;
            startLineNumber: z$1.ZodNumber;
        }, z$1.core.$strict>>;
        path: z$1.ZodString;
        threadId: z$1.ZodNullable<z$1.ZodString>;
    }, z$1.core.$strict>, z$1.ZodObject<{
        desktopTarget: z$1.ZodOptional<z$1.ZodObject<{
            generation: z$1.ZodString;
            hostId: z$1.ZodString;
            instanceId: z$1.ZodString;
        }, z$1.core.$strict>>;
        environmentId: z$1.ZodNullable<z$1.ZodString>;
        id: z$1.ZodString;
        kind: z$1.ZodLiteral<"browser">;
        title: z$1.ZodNullable<z$1.ZodString>;
        url: z$1.ZodString;
    }, z$1.core.$strict>, z$1.ZodObject<{
        id: z$1.ZodString;
        kind: z$1.ZodLiteral<"new-tab">;
    }, z$1.core.$strict>, z$1.ZodObject<{
        id: z$1.ZodString;
        kind: z$1.ZodLiteral<"side-chat">;
        sourceMessageText: z$1.ZodString;
        sourceSeqEnd: z$1.ZodNullable<z$1.ZodNumber>;
        threadId: z$1.ZodNullable<z$1.ZodString>;
        title: z$1.ZodString;
    }, z$1.core.$strict>, z$1.ZodObject<{
        id: z$1.ZodString;
        kind: z$1.ZodLiteral<"terminal">;
        target: z$1.ZodOptional<z$1.ZodDiscriminatedUnion<[z$1.ZodObject<{
            kind: z$1.ZodLiteral<"thread">;
            threadId: z$1.ZodString;
        }, z$1.core.$strict>, z$1.ZodObject<{
            environmentId: z$1.ZodString;
            kind: z$1.ZodLiteral<"environment">;
        }, z$1.core.$strict>, z$1.ZodObject<{
            cwd: z$1.ZodNullable<z$1.ZodString>;
            hostId: z$1.ZodString;
            kind: z$1.ZodLiteral<"host_path">;
        }, z$1.core.$strict>], "kind">>;
        terminalId: z$1.ZodString;
    }, z$1.core.$strict>], "kind">>;
}, z$1.core.$strict>;
type ThreadTabsResponse = z$1.infer<typeof threadTabsResponseSchema>;
declare const updateThreadTabsRequestSchema: z$1.ZodObject<{
    expectedRevision: z$1.ZodNumber;
    tabs: z$1.ZodArray<z$1.ZodDiscriminatedUnion<[z$1.ZodObject<{
        id: z$1.ZodString;
        kind: z$1.ZodLiteral<"thread-info">;
    }, z$1.core.$strict>, z$1.ZodObject<{
        id: z$1.ZodString;
        kind: z$1.ZodLiteral<"git-diff">;
    }, z$1.core.$strict>, z$1.ZodObject<{
        actionId: z$1.ZodString;
        fileOpenerOwner: z$1.ZodOptional<z$1.ZodDiscriminatedUnion<[z$1.ZodObject<{
            environmentId: z$1.ZodNullable<z$1.ZodString>;
            kind: z$1.ZodLiteral<"workspace-file-preview">;
            projectId: z$1.ZodNullable<z$1.ZodString>;
            tab: z$1.ZodObject<{
                lineRange: z$1.ZodNullable<z$1.ZodObject<{
                    endLineNumber: z$1.ZodNumber;
                    startLineNumber: z$1.ZodNumber;
                }, z$1.core.$strict>>;
                path: z$1.ZodString;
                source: z$1.ZodDiscriminatedUnion<[z$1.ZodObject<{
                    kind: z$1.ZodLiteral<"working-tree">;
                }, z$1.core.$strict>, z$1.ZodObject<{
                    kind: z$1.ZodLiteral<"head">;
                }, z$1.core.$strict>, z$1.ZodObject<{
                    kind: z$1.ZodLiteral<"merge-base">;
                    ref: z$1.ZodString;
                }, z$1.core.$strict>], "kind">;
                statusLabel: z$1.ZodNullable<z$1.ZodLiteral<"deleted">>;
            }, z$1.core.$strict>;
            threadId: z$1.ZodNullable<z$1.ZodString>;
        }, z$1.core.$strict>, z$1.ZodObject<{
            environmentId: z$1.ZodDefault<z$1.ZodNullable<z$1.ZodString>>;
            hostId: z$1.ZodDefault<z$1.ZodNullable<z$1.ZodString>>;
            kind: z$1.ZodLiteral<"host-file-preview">;
            tab: z$1.ZodObject<{
                lineRange: z$1.ZodNullable<z$1.ZodObject<{
                    endLineNumber: z$1.ZodNumber;
                    startLineNumber: z$1.ZodNumber;
                }, z$1.core.$strict>>;
                path: z$1.ZodString;
            }, z$1.core.$strict>;
            threadId: z$1.ZodDefault<z$1.ZodNullable<z$1.ZodString>>;
        }, z$1.core.$strict>, z$1.ZodObject<{
            environmentId: z$1.ZodNullable<z$1.ZodString>;
            kind: z$1.ZodLiteral<"thread-storage-file-preview">;
            tab: z$1.ZodObject<{
                lineRange: z$1.ZodNullable<z$1.ZodObject<{
                    endLineNumber: z$1.ZodNumber;
                    startLineNumber: z$1.ZodNumber;
                }, z$1.core.$strict>>;
                path: z$1.ZodString;
            }, z$1.core.$strict>;
            threadId: z$1.ZodString;
        }, z$1.core.$strict>], "kind">>;
        id: z$1.ZodString;
        kind: z$1.ZodLiteral<"plugin-panel">;
        paramsJson: z$1.ZodNullable<z$1.ZodString>;
        pluginId: z$1.ZodString;
        title: z$1.ZodString;
    }, z$1.core.$strict>, z$1.ZodObject<{
        environmentId: z$1.ZodNullable<z$1.ZodString>;
        id: z$1.ZodString;
        kind: z$1.ZodLiteral<"workspace-file-preview">;
        lineRange: z$1.ZodNullable<z$1.ZodObject<{
            endLineNumber: z$1.ZodNumber;
            startLineNumber: z$1.ZodNumber;
        }, z$1.core.$strict>>;
        path: z$1.ZodString;
        projectId: z$1.ZodNullable<z$1.ZodString>;
        source: z$1.ZodDiscriminatedUnion<[z$1.ZodObject<{
            kind: z$1.ZodLiteral<"working-tree">;
        }, z$1.core.$strict>, z$1.ZodObject<{
            kind: z$1.ZodLiteral<"head">;
        }, z$1.core.$strict>, z$1.ZodObject<{
            kind: z$1.ZodLiteral<"merge-base">;
            ref: z$1.ZodString;
        }, z$1.core.$strict>], "kind">;
        statusLabel: z$1.ZodNullable<z$1.ZodLiteral<"deleted">>;
    }, z$1.core.$strict>, z$1.ZodObject<{
        environmentId: z$1.ZodNullable<z$1.ZodString>;
        hostId: z$1.ZodDefault<z$1.ZodNullable<z$1.ZodString>>;
        id: z$1.ZodString;
        kind: z$1.ZodLiteral<"host-file-preview">;
        lineRange: z$1.ZodNullable<z$1.ZodObject<{
            endLineNumber: z$1.ZodNumber;
            startLineNumber: z$1.ZodNumber;
        }, z$1.core.$strict>>;
        path: z$1.ZodString;
        threadId: z$1.ZodNullable<z$1.ZodString>;
    }, z$1.core.$strict>, z$1.ZodObject<{
        environmentId: z$1.ZodNullable<z$1.ZodString>;
        id: z$1.ZodString;
        isPinned: z$1.ZodBoolean;
        kind: z$1.ZodLiteral<"thread-storage-file-preview">;
        lineRange: z$1.ZodNullable<z$1.ZodObject<{
            endLineNumber: z$1.ZodNumber;
            startLineNumber: z$1.ZodNumber;
        }, z$1.core.$strict>>;
        path: z$1.ZodString;
        threadId: z$1.ZodNullable<z$1.ZodString>;
    }, z$1.core.$strict>, z$1.ZodObject<{
        desktopTarget: z$1.ZodOptional<z$1.ZodObject<{
            generation: z$1.ZodString;
            hostId: z$1.ZodString;
            instanceId: z$1.ZodString;
        }, z$1.core.$strict>>;
        environmentId: z$1.ZodNullable<z$1.ZodString>;
        id: z$1.ZodString;
        kind: z$1.ZodLiteral<"browser">;
        title: z$1.ZodNullable<z$1.ZodString>;
        url: z$1.ZodString;
    }, z$1.core.$strict>, z$1.ZodObject<{
        id: z$1.ZodString;
        kind: z$1.ZodLiteral<"new-tab">;
    }, z$1.core.$strict>, z$1.ZodObject<{
        id: z$1.ZodString;
        kind: z$1.ZodLiteral<"side-chat">;
        sourceMessageText: z$1.ZodString;
        sourceSeqEnd: z$1.ZodNullable<z$1.ZodNumber>;
        threadId: z$1.ZodNullable<z$1.ZodString>;
        title: z$1.ZodString;
    }, z$1.core.$strict>, z$1.ZodObject<{
        id: z$1.ZodString;
        kind: z$1.ZodLiteral<"terminal">;
        target: z$1.ZodOptional<z$1.ZodDiscriminatedUnion<[z$1.ZodObject<{
            kind: z$1.ZodLiteral<"thread">;
            threadId: z$1.ZodString;
        }, z$1.core.$strict>, z$1.ZodObject<{
            environmentId: z$1.ZodString;
            kind: z$1.ZodLiteral<"environment">;
        }, z$1.core.$strict>, z$1.ZodObject<{
            cwd: z$1.ZodNullable<z$1.ZodString>;
            hostId: z$1.ZodString;
            kind: z$1.ZodLiteral<"host_path">;
        }, z$1.core.$strict>], "kind">>;
        terminalId: z$1.ZodString;
    }, z$1.core.$strict>], "kind">>;
}, z$1.core.$strict>;
type UpdateThreadTabsRequest = z$1.infer<typeof updateThreadTabsRequestSchema>;

declare const machineEnvironmentSetSchema: z$1.ZodObject<{
    name: z$1.ZodString;
    note: z$1.ZodDefault<z$1.ZodNullable<z$1.ZodString>>;
    value: z$1.ZodString;
}, z$1.core.$strict>;
type MachineEnvironmentSet = z$1.infer<typeof machineEnvironmentSetSchema>;
declare const machineEnvironmentListSchema: z$1.ZodObject<{
    builtInGit: z$1.ZodObject<{
        status: z$1.ZodEnum<{
            "logged in": "logged in";
            "not logged in": "not logged in";
            disabled: "disabled";
            overridden: "overridden";
        }>;
        statusMessage: z$1.ZodString;
    }, z$1.core.$strip>;
    variables: z$1.ZodArray<z$1.ZodObject<{
        name: z$1.ZodString;
        note: z$1.ZodNullable<z$1.ZodString>;
        secret: z$1.ZodLiteral<true>;
        value: z$1.ZodNull;
    }, z$1.core.$strict>>;
}, z$1.core.$strip>;
type MachineEnvironmentList = z$1.infer<typeof machineEnvironmentListSchema>;
declare const projectMachineEnvironmentListSchema: z$1.ZodObject<{
    builtInGit: z$1.ZodObject<{
        status: z$1.ZodEnum<{
            "logged in": "logged in";
            "not logged in": "not logged in";
            disabled: "disabled";
            overridden: "overridden";
        }>;
        statusMessage: z$1.ZodString;
    }, z$1.core.$strip>;
    inheritedVariables: z$1.ZodArray<z$1.ZodObject<{
        name: z$1.ZodString;
        note: z$1.ZodNullable<z$1.ZodString>;
        secret: z$1.ZodLiteral<true>;
        value: z$1.ZodNull;
    }, z$1.core.$strict>>;
    variables: z$1.ZodArray<z$1.ZodObject<{
        name: z$1.ZodString;
        note: z$1.ZodNullable<z$1.ZodString>;
        secret: z$1.ZodLiteral<true>;
        value: z$1.ZodNull;
    }, z$1.core.$strict>>;
}, z$1.core.$strip>;
type ProjectMachineEnvironmentList = z$1.infer<typeof projectMachineEnvironmentListSchema>;

interface ExperimentalDesktopBrowsersArea {
    listInstances(input: ExperimentalDesktopBrowserHostRequest): Promise<ExperimentalDesktopBrowserInstances>;
    listTabs(input: ExperimentalDesktopBrowserScope): Promise<ExperimentalDesktopBrowserTabs>;
    createTab(input: ExperimentalDesktopBrowserCreateInput): Promise<ExperimentalDesktopBrowserCreated>;
    acquireControl(input: ExperimentalDesktopBrowserAcquireInput): Promise<ExperimentalDesktopBrowserLease>;
    openConnection(input: ExperimentalDesktopBrowserLeaseRequest): Promise<ExperimentalDesktopBrowserConnection>;
    releaseControl(input: ExperimentalDesktopBrowserLeaseRequest): Promise<{
        ok: true;
    }>;
    revealTab(input: ExperimentalDesktopBrowserTabRequest): Promise<{
        ok: true;
    }>;
    closeTab(input: ExperimentalDesktopBrowserTabRequest): Promise<{
        ok: true;
    }>;
    captureTab(input: ExperimentalDesktopBrowserTabRequest): Promise<ExperimentalDesktopBrowserCapture>;
    listImportSources(input: ExperimentalDesktopBrowserInstanceRequest): Promise<ExperimentalDesktopBrowserImportSources>;
    importCookies(input: ExperimentalDesktopBrowserImportCookiesInput): Promise<ExperimentalDesktopBrowserImportOutcome>;
    subscribe(input: ExperimentalDesktopBrowserScope & {
        onChange: (result: ExperimentalDesktopBrowserTabs) => void;
        onError: (error: Error) => void;
    }): {
        dispose(): void;
    };
}

interface EnvironmentActionArgs {
    environmentId: string;
}
interface EnvironmentGetArgs extends EnvironmentActionArgs {
    signal?: AbortSignal;
}
type EnvironmentMergeBaseBranchUpdateValue = Exclude<UpdateEnvironmentRequest["mergeBaseBranch"], undefined>;
type EnvironmentNameUpdateValue = Exclude<UpdateEnvironmentRequest["name"], undefined>;
interface EnvironmentMergeBaseBranchUpdate {
    mergeBaseBranch: EnvironmentMergeBaseBranchUpdateValue;
    name?: EnvironmentNameUpdateValue;
}
interface EnvironmentNameUpdate {
    mergeBaseBranch?: EnvironmentMergeBaseBranchUpdateValue;
    name: EnvironmentNameUpdateValue;
}
type EnvironmentUpdateFields = EnvironmentMergeBaseBranchUpdate | EnvironmentNameUpdate;
type EnvironmentUpdateArgs = EnvironmentUpdateFields & {
    environmentId: string;
};
interface EnvironmentStatusArgs extends EnvironmentStatusQuery {
    environmentId: string;
    signal?: AbortSignal;
}
type EnvironmentDiffArgs = EnvironmentDiffQuery & {
    environmentId: string;
    signal?: AbortSignal;
};
type EnvironmentDiffFileArgs = EnvironmentDiffFileQuery & {
    environmentId: string;
    signal?: AbortSignal;
};
interface EnvironmentDiffBranchesArgs extends EnvironmentDiffBranchesQuery {
    environmentId: string;
    signal?: AbortSignal;
}
interface EnvironmentCommitArgs {
    environmentId: string;
}
interface EnvironmentPullRequestMergeArgs {
    environmentId: string;
    method: PullRequestMergeMethod;
}
type EnvironmentDiffPatchArgs = EnvironmentDiffPatchRequest & {
    environmentId: string;
    signal?: AbortSignal;
};
interface EnvironmentPathsArgs extends EnvironmentPathsQuery {
    environmentId: string;
    signal?: AbortSignal;
}
type EnvironmentArchiveThreadsResult = EnvironmentArchiveThreadsResponse;
type EnvironmentCommitResult = CommitActionResponse;
type EnvironmentDiffResult = EnvironmentDiffResponse;
type EnvironmentDiffBranchesResult = EnvironmentDiffBranchesResponse;
type EnvironmentDiffFileResult = EnvironmentDiffFileResponse;
type EnvironmentDiffFilesResult = EnvironmentDiffFilesResponse;
type EnvironmentDiffPatchResult = EnvironmentDiffPatchResponse;
type EnvironmentGetResult = Environment;
type EnvironmentMarkPullRequestDraftResult = PullRequestDraftActionResponse;
type EnvironmentMarkPullRequestReadyResult = PullRequestReadyActionResponse;
type EnvironmentMergePullRequestResult = PullRequestMergeActionResponse;
type EnvironmentPathsResult = WorkspacePathListResponse;
type EnvironmentPullRequestResult = EnvironmentPullRequestResponse;
type EnvironmentStatusResult = EnvironmentStatusResponse;
type EnvironmentUpdateResult = Environment;
interface EnvironmentListArgs {
    environmentProviderId?: string;
    hostId?: string;
    instanceKey?: string;
    limit?: number;
    offset?: number;
    path?: string;
    projectId?: string;
    signal?: AbortSignal;
    status?: EnvironmentStatus;
}
type EnvironmentListResult = Environment[];
interface EnvironmentDeleteArgs {
    environmentId: string;
}
type EnvironmentDeleteResult = {
    ok: true;
};
interface EnvironmentListProvidersArgs {
    projectId?: string;
    hostId?: string;
    signal?: AbortSignal;
}
type EnvironmentListProvidersResult = SystemEnvironmentProvider[];
interface EnvironmentsArea {
    archiveThreads(args: EnvironmentActionArgs): Promise<EnvironmentArchiveThreadsResult>;
    commit(args: EnvironmentCommitArgs): Promise<EnvironmentCommitResult>;
    diff(args: EnvironmentDiffArgs): Promise<EnvironmentDiffResult>;
    diffBranches(args: EnvironmentDiffBranchesArgs): Promise<EnvironmentDiffBranchesResult>;
    diffFile(args: EnvironmentDiffFileArgs): Promise<EnvironmentDiffFileResult>;
    diffFiles(args: EnvironmentDiffArgs): Promise<EnvironmentDiffFilesResult>;
    diffPatch(args: EnvironmentDiffPatchArgs): Promise<EnvironmentDiffPatchResult>;
    get(args: EnvironmentGetArgs): Promise<EnvironmentGetResult>;
    list(args?: EnvironmentListArgs): Promise<EnvironmentListResult>;
    listProviders(args?: EnvironmentListProvidersArgs): Promise<EnvironmentListProvidersResult>;
    delete(args: EnvironmentDeleteArgs): Promise<EnvironmentDeleteResult>;
    pullRequest(args: EnvironmentGetArgs): Promise<EnvironmentPullRequestResult>;
    markPullRequestDraft(args: EnvironmentActionArgs): Promise<EnvironmentMarkPullRequestDraftResult>;
    markPullRequestReady(args: EnvironmentActionArgs): Promise<EnvironmentMarkPullRequestReadyResult>;
    mergePullRequest(args: EnvironmentPullRequestMergeArgs): Promise<EnvironmentMergePullRequestResult>;
    paths(args: EnvironmentPathsArgs): Promise<EnvironmentPathsResult>;
    status(args: EnvironmentStatusArgs): Promise<EnvironmentStatusResult>;
    update(args: EnvironmentUpdateArgs): Promise<EnvironmentUpdateResult>;
}

interface FileReadArgs {
    hostId?: string;
    path: string;
    rootPath?: string;
    signal?: AbortSignal;
}
interface FileWriteArgs {
    hostId?: string;
    path: string;
    rootPath?: string;
    content: string;
    contentEncoding?: "base64" | "utf8";
    createParents?: boolean;
    expectedSha256?: string | null;
    mode?: number;
}
interface FileListArgs {
    hostId?: string;
    path: string;
    query?: string;
    limit?: number;
    includeHidden?: boolean;
    excludeNames?: string[];
    signal?: AbortSignal;
}
interface PathListArgs extends FileListArgs {
    includeFiles: boolean;
    includeDirectories: boolean;
}
interface FileMkdirArgs {
    hostId?: string;
    path: string;
    rootPath?: string;
    recursive?: boolean;
}
interface FileMoveArgs {
    hostId?: string;
    sourcePath: string;
    destinationPath: string;
    rootPath?: string;
}
interface FileRemoveArgs {
    hostId?: string;
    path: string;
    rootPath?: string;
    recursive?: boolean;
}
interface FilePreviewArgs {
    hostId?: string;
    rootPath: string;
    signal?: AbortSignal;
    ttlMs?: number;
}
type FileReadResult = HostFileReadResponse;
type FileWriteResult = HostFileWriteResponse;
type FileListResult = HostFileListResponse;
type PathListResult = HostPathListResponse;
type FileMkdirResult = HostMkdirResponse;
type FileMoveResult = HostMovePathResponse;
type FileRemoveResult = HostRemovePathResponse;
type FilePreviewResult = CreateFilePreviewResponse;
interface FilesArea {
    read(args: FileReadArgs): Promise<FileReadResult>;
    write(args: FileWriteArgs): Promise<FileWriteResult>;
    list(args: FileListArgs): Promise<FileListResult>;
    listPaths(args: PathListArgs): Promise<PathListResult>;
    mkdir(args: FileMkdirArgs): Promise<FileMkdirResult>;
    move(args: FileMoveArgs): Promise<FileMoveResult>;
    remove(args: FileRemoveArgs): Promise<FileRemoveResult>;
    createPreview(args: FilePreviewArgs): Promise<FilePreviewResult>;
}

interface HostGetArgs {
    hostId: string;
    signal?: AbortSignal;
}
interface HostDeleteArgs {
    hostId: string;
}
interface HostUpdateArgs extends UpdateHostRequest {
    hostId: string;
}
interface HostRetryUpdateArgs {
    hostId: string;
}
interface HostActionArgs {
    hostId: string;
}
interface HostDirectoryArgs extends HostDirectoryQuery {
    hostId: string;
    signal?: AbortSignal;
}
interface HostCloneDefaultPathArgs extends HostCloneDefaultPathQuery {
    hostId: string;
    signal?: AbortSignal;
}
interface HostPathsExistArgs extends HostPathsExistRequest {
    hostId: string;
    signal?: AbortSignal;
}
interface HostPickFolderArgs extends HostPickFolderRequest {
    hostId: string;
    signal?: AbortSignal;
}
interface HostProviderCliInstallArgs extends HostProviderCliInstallRequest {
    hostId: string;
}
interface HostListArgs {
    includeCreating?: boolean;
    signal?: AbortSignal;
}
interface MachineCreateArgs extends CreateMachineRequest {
    wait?: boolean;
    signal?: AbortSignal;
}
interface MachineProviderListArgs {
    signal?: AbortSignal;
}
type HostCreateJoinCodeResult = CreateHostJoinCodeResponse;
type HostDeleteResult = {
    ok: true;
};
type HostDirectoryResult = HostDirectoryListing;
type HostGetResult = Host & {
    connectMachineId: string | null;
};
type HostEnrollmentCommandResult = HostEnrollmentCommandResponse;
type HostCloneDefaultPathResult = HostCloneDefaultPathResponse;
type HostProviderCliInstallResult = HostProviderCliInstallEvent[];
type HostListResult = Host[];
type HostPathsExistResult = HostPathsExistResponse;
type HostPickFolderResult = HostPickFolderResponse;
type HostProviderCliStatusResult = HostProviderCliStatusResponse;
type HostRetryUpdateResult = HostRetryUpdateResponse;
type HostActionResult = HostActionResponse;
type HostUpdateResult = Host;
type MachineProviderListResult = SystemMachineProvider[];
interface HostsArea {
    experimental_create(args: MachineCreateArgs): Promise<Host>;
    experimental_getEnrollmentCommand(args: HostGetArgs): Promise<HostEnrollmentCommandResult>;
    /** @deprecated Use experimental_create() and experimental_getEnrollmentCommand() for bootstrap enrollment. */
    createJoinCode(): Promise<HostCreateJoinCodeResult>;
    delete(args: HostDeleteArgs): Promise<HostDeleteResult>;
    experimental_deleteOldServerCopy(args: HostActionArgs): Promise<DeleteOldServerCopyResponse>;
    directory(args: HostDirectoryArgs): Promise<HostDirectoryResult>;
    get(args: HostGetArgs): Promise<HostGetResult>;
    cloneDefaultPath(args: HostCloneDefaultPathArgs): Promise<HostCloneDefaultPathResult>;
    installProviderCli(args: HostProviderCliInstallArgs): Promise<HostProviderCliInstallResult>;
    list(args?: HostListArgs): Promise<HostListResult>;
    experimental_listProviders(args?: MachineProviderListArgs): Promise<MachineProviderListResult>;
    pathsExist(args: HostPathsExistArgs): Promise<HostPathsExistResult>;
    pickFolder(args: HostPickFolderArgs): Promise<HostPickFolderResult>;
    providerCliStatus(args: HostGetArgs): Promise<HostProviderCliStatusResult>;
    experimental_resume(args: HostActionArgs): Promise<Host>;
    experimental_retryCleanup(args: HostActionArgs): Promise<HostActionResult>;
    retryUpdate(args: HostRetryUpdateArgs): Promise<HostRetryUpdateResult>;
    experimental_suspend(args: HostActionArgs): Promise<Host>;
    experimental_reconcile(args: HostActionArgs): Promise<Host>;
    update(args: HostUpdateArgs): Promise<HostUpdateResult>;
}

interface ServerMoveCheckArgs extends ServerMoveCheckRequest {
    signal?: AbortSignal;
}
interface ServerMoveStatusArgs {
    signal?: AbortSignal;
}
interface ServerExportArgs {
    signal?: AbortSignal;
}
interface ServerExportResult {
    fileName: string;
    body: ReadableStream<Uint8Array>;
    sha256: string;
}
interface ExperimentalServerArea {
    checkMove(args: ServerMoveCheckArgs): Promise<ServerMoveCheckResponse>;
    startMove(args: ServerMoveStartRequest): Promise<ServerMoveStatus>;
    moveStatus(args?: ServerMoveStatusArgs): Promise<ServerMoveStatusResponse>;
    cancelMove(): Promise<ServerMoveStatus>;
    export(args?: ServerExportArgs): Promise<ServerExportResult>;
}

interface ProjectListArgs {
    include?: ProjectListQuery["include"];
    includePersonal?: boolean;
    signal?: AbortSignal;
}
interface ProjectCreateArgs extends CreateProjectRequest {
}
interface ProjectGetArgs {
    projectId: string;
    signal?: AbortSignal;
}
interface ProjectUpdateArgs extends UpdateProjectRequest {
    projectId: string;
}
interface ProjectDeleteArgs {
    projectId: string;
}
interface ProjectReorderArgs extends ReorderProjectRequest {
    projectId: string;
}
interface ProjectPromptHistoryArgs extends PromptHistoryQuery {
    projectId: string;
    signal?: AbortSignal;
}
type ProjectWorkspaceRoutingArgs = {
    environmentId: string;
    hostId?: never;
} | {
    environmentId?: never;
    hostId: string;
} | {
    environmentId?: never;
    hostId?: never;
};
type ProjectFilesArgs = ProjectWorkspaceRoutingArgs & Omit<ProjectFilesQuery, "environmentId" | "hostId"> & {
    projectId: string;
    signal?: AbortSignal;
};
type ProjectPathsArgs = ProjectWorkspaceRoutingArgs & Omit<ProjectPathsQuery, "environmentId" | "hostId"> & {
    projectId: string;
    signal?: AbortSignal;
};
type ProjectCommandsArgs = ProjectWorkspaceRoutingArgs & Omit<ProjectCommandsQuery, "environmentId" | "hostId"> & {
    projectId: string;
    signal?: AbortSignal;
};
type ProjectFileContentArgs = ProjectWorkspaceRoutingArgs & Omit<ProjectFileContentQuery, "environmentId" | "hostId"> & {
    projectId: string;
    signal?: AbortSignal;
};
interface ProjectBranchesArgs extends ProjectBranchesQuery {
    projectId: string;
    signal?: AbortSignal;
}
interface ProjectDefaultExecutionOptionsArgs {
    projectId: string;
    signal?: AbortSignal;
}
interface ProjectSidebarBootstrapArgs {
    signal?: AbortSignal;
}
interface ProjectAttachmentFileLike {
    arrayBuffer(): Promise<ArrayBuffer>;
    readonly name: string;
    readonly type?: string;
}
interface ProjectAttachmentUploadArgsBase {
    mimeType?: string;
    projectId: string;
}
type ProjectAttachmentUploadArgs = ProjectAttachmentUploadArgsBase & ({
    clientFile: ProjectAttachmentFileLike;
    filename?: string;
} | {
    clientFile: ArrayBuffer | Blob | Uint8Array;
    filename: string;
});
interface ProjectAttachmentReadArgs {
    path: string;
    projectId: string;
    signal?: AbortSignal;
}
interface ProjectAttachmentCopyArgs extends CopyProjectAttachmentsRequest {
    projectId: string;
}
type ProjectSourceAddArgs = CreateProjectSourceRequest & {
    projectId: string;
};
interface ProjectSourceUpdateArgs extends UpdateProjectSourceRequest {
    projectId: string;
    sourceId: string;
}
interface ProjectSourceDeleteArgs {
    projectId: string;
    sourceId: string;
}
type ProjectBranchesResult = ProjectBranchesResponse;
interface ProjectAttachmentReadResult {
    bytes: Uint8Array;
    mimeType: string;
    sizeBytes: number;
}
type ProjectAttachmentUploadResult = UploadedPromptAttachment;
type ProjectCommandsResult = CommandListResponse;
type ProjectCreateResult = ProjectResponse;
type ProjectDefaultExecutionOptionsResult = ProjectExecutionDefaults | null;
type ProjectDeleteResult = {
    ok: true;
};
interface ProjectFileContentResult {
    content: string;
    contentEncoding: "base64" | "utf8";
    mimeType: string;
    sizeBytes: number;
}
type ProjectFilesResult = WorkspaceFileListResponse;
type ProjectGetResult = ProjectResponse;
type ProjectListResult = ProjectResponse[] | ProjectWithThreadsResponse[];
type ProjectPathsResult = WorkspacePathListResponse;
type ProjectPromptHistoryResult = PromptHistoryResponse;
type ProjectReorderResult = ProjectResponse[];
type ProjectSidebarBootstrapResult = SidebarBootstrapResponse;
type ProjectSourceAddResult = ProjectSource;
type ProjectSourceDeleteResult = {
    ok: true;
};
type ProjectSourceUpdateResult = ProjectSource;
type ProjectUpdateResult = ProjectResponse;
interface ProjectSourcesArea {
    add(args: ProjectSourceAddArgs): Promise<ProjectSourceAddResult>;
    delete(args: ProjectSourceDeleteArgs): Promise<ProjectSourceDeleteResult>;
    update(args: ProjectSourceUpdateArgs): Promise<ProjectSourceUpdateResult>;
}
interface ProjectAttachmentsArea {
    copy(args: ProjectAttachmentCopyArgs): Promise<void>;
    read(args: ProjectAttachmentReadArgs): Promise<ProjectAttachmentReadResult>;
    upload(args: ProjectAttachmentUploadArgs): Promise<ProjectAttachmentUploadResult>;
}
interface ProjectsArea {
    machineEnvironment(args: {
        projectId: string;
    }): Promise<ProjectMachineEnvironmentList>;
    replaceMachineEnvironment(args: {
        projectId: string;
    } & MachineEnvironmentReplace): Promise<ProjectMachineEnvironmentList>;
    setMachineEnvironmentVariable(args: {
        projectId: string;
    } & MachineEnvironmentSet): Promise<ProjectMachineEnvironmentList>;
    deleteMachineEnvironmentVariable(args: {
        projectId: string;
        name: string;
    }): Promise<ProjectMachineEnvironmentList>;
    attachments: ProjectAttachmentsArea;
    branches(args: ProjectBranchesArgs): Promise<ProjectBranchesResult>;
    commands(args: ProjectCommandsArgs): Promise<ProjectCommandsResult>;
    create(args: ProjectCreateArgs): Promise<ProjectCreateResult>;
    defaultExecutionOptions(args: ProjectDefaultExecutionOptionsArgs): Promise<ProjectDefaultExecutionOptionsResult>;
    delete(args: ProjectDeleteArgs): Promise<ProjectDeleteResult>;
    fileContent(args: ProjectFileContentArgs): Promise<ProjectFileContentResult>;
    files(args: ProjectFilesArgs): Promise<ProjectFilesResult>;
    get(args: ProjectGetArgs): Promise<ProjectGetResult>;
    list(args?: ProjectListArgs): Promise<ProjectListResult>;
    paths(args: ProjectPathsArgs): Promise<ProjectPathsResult>;
    promptHistory(args: ProjectPromptHistoryArgs): Promise<ProjectPromptHistoryResult>;
    reorder(args: ProjectReorderArgs): Promise<ProjectReorderResult>;
    sidebarBootstrap(args?: ProjectSidebarBootstrapArgs): Promise<ProjectSidebarBootstrapResult>;
    sources: ProjectSourcesArea;
    update(args: ProjectUpdateArgs): Promise<ProjectUpdateResult>;
}

type ProviderHostRoutingArgs = {
    environmentId: string;
    hostId?: never;
} | {
    environmentId?: never;
    hostId: string;
} | {
    environmentId?: never;
    hostId?: never;
};
type ProviderListArgs = ProviderHostRoutingArgs & {
    capability?: SystemProvidersQuery["capability"];
    signal?: AbortSignal;
};
type ProviderModelsArgs = ProviderHostRoutingArgs & {
    providerId?: string;
    signal?: AbortSignal;
};
type ProviderListResult = ProviderInfo[];
type ProviderModelsResult = SystemExecutionOptionsResponse;
interface ProvidersArea {
    list(args?: ProviderListArgs): Promise<ProviderListResult>;
    models(args?: ProviderModelsArgs): Promise<ProviderModelsResult>;
}

interface PluginIdArgs {
    pluginId: string;
}
interface PluginInstallArgs {
    source: string;
    subdirectory?: string;
    plugin?: string;
}
interface PluginCatalogInstallArgs {
    entryId: string;
    marketplace?: string;
    confirmedSource?: PluginCatalogResolvedSource;
}
interface PluginCatalogInstallPlanArgs {
    entryId: string;
    marketplace?: string;
    signal?: AbortSignal;
}
interface PluginMarketplaceAddArgs {
    source: string;
}
interface PluginMarketplaceListArgs {
    signal?: AbortSignal;
}
interface PluginMarketplaceRefreshArgs {
    name?: string;
    signal?: AbortSignal;
}
interface PluginMarketplaceRemoveArgs {
    name: string;
}
interface PluginReloadArgs {
    pluginId?: string;
}
interface PluginSettingsUpdateArgs extends PluginIdArgs {
    values: Record<string, JsonValue>;
}
interface PluginTokenArgs extends PluginIdArgs {
    rotate?: boolean;
}
interface PluginCheckUpdatesArgs {
    pluginId?: string;
    signal?: AbortSignal;
}
interface PluginRpcArgs<TOutput> extends PluginIdArgs {
    signal?: AbortSignal;
    input?: JsonValue;
    method: string;
    outputSchema: z$1.ZodType<TOutput>;
}
interface PluginCatalogSearchArgs {
    query: string;
    signal?: AbortSignal;
}
interface PluginCatalogStatusArgs {
    signal?: AbortSignal;
}
interface PluginGetSettingsArgs extends PluginIdArgs {
    signal?: AbortSignal;
}
interface PluginGetSourceArgs extends PluginIdArgs {
    signal?: AbortSignal;
}
interface PluginListArgs {
    signal?: AbortSignal;
}
interface PluginListUpdateResultsArgs {
    signal?: AbortSignal;
}
type PluginDisableResult = InstalledPlugin;
type PluginEnableResult = InstalledPlugin;
type PluginGetSettingsResult = PluginSettingsResponse;
type PluginInstallResult = InstalledPlugin;
type PluginListResult = PluginListResponse;
type PluginReloadResult = PluginReloadResponse;
type PluginRemoveResult = PluginRemoveResponse;
type PluginTokenResult = PluginTokenResponse;
type PluginUpdateSettingsResult = PluginSettingsResponse;
type PluginGetSourceResult = PluginSourceDetail;
type PluginCheckUpdatesResult = PluginUpdateCheckEntry[];
type PluginApplyUpdateResult = PluginApplyUpdateResult$1;
type PluginCatalogStatusResult = PluginCatalogStatus;
type PluginCatalogSearchResult = PluginCatalogSearchResponse;
type PluginCatalogInstallPlanResult = PluginCatalogInstallPlan;
type PluginMarketplaceListResult = PluginMarketplace[];
type PluginMarketplaceAddResult = PluginMarketplace;
type PluginMarketplaceRefreshResult = PluginMarketplaceRefreshResult$1[];
interface PluginMarketplaceRemoveResult {
    convertedPluginIds: string[];
}
interface PluginCatalogArea {
    install(args: PluginCatalogInstallArgs): Promise<PluginInstallResult>;
    installPlan(args: PluginCatalogInstallPlanArgs): Promise<PluginCatalogInstallPlanResult>;
    search(args: PluginCatalogSearchArgs): Promise<PluginCatalogSearchResult>;
    status(args?: PluginCatalogStatusArgs): Promise<PluginCatalogStatusResult>;
}
interface PluginMarketplacesArea {
    add(args: PluginMarketplaceAddArgs): Promise<PluginMarketplaceAddResult>;
    list(args?: PluginMarketplaceListArgs): Promise<PluginMarketplaceListResult>;
    refresh(args?: PluginMarketplaceRefreshArgs): Promise<PluginMarketplaceRefreshResult>;
    remove(args: PluginMarketplaceRemoveArgs): Promise<PluginMarketplaceRemoveResult>;
}
interface PluginsArea {
    experimental_discoverRpc(args?: PluginRpcDiscoveryQuery): Promise<PublishedPluginRpcMethod[]>;
    applyUpdate(args: PluginIdArgs): Promise<PluginApplyUpdateResult>;
    callRpc<TOutput>(args: PluginRpcArgs<TOutput>): Promise<TOutput>;
    checkUpdates(args?: PluginCheckUpdatesArgs): Promise<PluginCheckUpdatesResult>;
    catalog: PluginCatalogArea;
    marketplaces: PluginMarketplacesArea;
    disable(args: PluginIdArgs): Promise<PluginDisableResult>;
    enable(args: PluginIdArgs): Promise<PluginEnableResult>;
    getSettings(args: PluginGetSettingsArgs): Promise<PluginGetSettingsResult>;
    getSource(args: PluginGetSourceArgs): Promise<PluginGetSourceResult>;
    install(args: PluginInstallArgs): Promise<PluginInstallResult>;
    list(args?: PluginListArgs): Promise<PluginListResult>;
    listUpdateResults(args?: PluginListUpdateResultsArgs): Promise<PluginCheckUpdatesResult>;
    reload(args?: PluginReloadArgs): Promise<PluginReloadResult>;
    remove(args: PluginIdArgs): Promise<PluginRemoveResult>;
    token(args: PluginTokenArgs): Promise<PluginTokenResult>;
    updateSettings(args: PluginSettingsUpdateArgs): Promise<PluginUpdateSettingsResult>;
}

type BbRealtimeUnsubscribe = () => void;
type BbRealtimeEventName = "environment:changed" | "host:changed" | "project:changed" | "realtime:connection" | "system:changed" | "system:config-changed" | "thread:changed";
type ThreadRealtimeEvent = Extract<ChangedMessage, {
    entity: "thread";
}>;
type ProjectRealtimeEvent = Extract<ChangedMessage, {
    entity: "project";
}>;
type EnvironmentRealtimeEvent = Extract<ChangedMessage, {
    entity: "environment";
}>;
type HostRealtimeEvent = Extract<ChangedMessage, {
    entity: "host";
}>;
type SystemRealtimeEvent = Extract<ChangedMessage, {
    entity: "system";
}>;
type BbRealtimeConnectionState = "connected" | "connecting" | "disconnected";
interface BbRealtimeConnectionEvent {
    reconnectDelayMs: number | null;
    reconnected: boolean;
    state: BbRealtimeConnectionState;
}
interface BbRealtimeEventMap {
    "thread:changed": ThreadRealtimeEvent;
    "project:changed": ProjectRealtimeEvent;
    "environment:changed": EnvironmentRealtimeEvent;
    "host:changed": HostRealtimeEvent;
    "system:changed": SystemRealtimeEvent;
    "system:config-changed": SystemRealtimeEvent;
    "realtime:connection": BbRealtimeConnectionEvent;
}
type BbRealtimeCallback<TEventName extends BbRealtimeEventName> = (event: BbRealtimeEventMap[TEventName]) => void;
interface ThreadRealtimeSubscribeArgs {
    callback: BbRealtimeCallback<"thread:changed">;
    event: "thread:changed";
    threadId?: string;
}
interface ProjectRealtimeSubscribeArgs {
    callback: BbRealtimeCallback<"project:changed">;
    event: "project:changed";
    projectId?: string;
}
interface EnvironmentRealtimeSubscribeArgs {
    callback: BbRealtimeCallback<"environment:changed">;
    environmentId?: string;
    event: "environment:changed";
}
interface HostRealtimeSubscribeArgs {
    callback: BbRealtimeCallback<"host:changed">;
    event: "host:changed";
    hostId?: string;
}
interface SystemRealtimeSubscribeArgs {
    callback: BbRealtimeCallback<"system:changed">;
    event: "system:changed";
}
interface SystemConfigRealtimeSubscribeArgs {
    callback: BbRealtimeCallback<"system:config-changed">;
    event: "system:config-changed";
}
interface RealtimeConnectionSubscribeArgs {
    callback: BbRealtimeCallback<"realtime:connection">;
    event: "realtime:connection";
}
type BbRealtimeSubscribeArgsUnion = ThreadRealtimeSubscribeArgs | ProjectRealtimeSubscribeArgs | EnvironmentRealtimeSubscribeArgs | HostRealtimeSubscribeArgs | SystemRealtimeSubscribeArgs | SystemConfigRealtimeSubscribeArgs | RealtimeConnectionSubscribeArgs;
type BbRealtimeSubscribeArgs<TEventName extends BbRealtimeEventName = BbRealtimeEventName> = Extract<BbRealtimeSubscribeArgsUnion, {
    event: TEventName;
}>;
interface BbRealtime {
    subscribe<TEventName extends BbRealtimeEventName>(args: BbRealtimeSubscribeArgs<TEventName>): BbRealtimeUnsubscribe;
}

interface StatusGetArgs {
    projectId?: string;
    signal?: AbortSignal;
    threadId?: string;
}
interface StatusThreadSummary {
    environmentId: string | null;
    id: string;
    parentThreadId: string | null;
    pinnedAt: number | null;
    projectId: string;
    status: ThreadStatus;
    title: string | null;
}
type StatusProject = ProjectResponse;
type StatusChildThreads = ThreadListResponse;
interface StatusResult {
    childThreads: StatusChildThreads | null;
    pendingTodos: ThreadTimelinePendingTodos | null;
    project: StatusProject | null;
    thread: StatusThreadSummary | null;
}
interface StatusArea {
    get(args?: StatusGetArgs): Promise<StatusResult>;
}

interface SkillWorkspaceArgs {
    projectId: string;
    environmentId: string | null;
}
interface SkillListArgs extends SkillWorkspaceArgs {
    signal?: AbortSignal;
}
interface SkillIdentityArgs extends SkillListArgs {
    skillId: string;
}
interface SkillContentArgs extends SkillIdentityArgs {
    path: string;
}
interface SkillUpdateArgs extends SkillWorkspaceArgs {
    skillId: string;
    content: string;
    revision: string;
}
interface SkillDeleteArgs extends SkillWorkspaceArgs {
    skillId: string;
}
interface AbortableArgs {
    signal?: AbortSignal;
}
interface RegistrySkillsSearchArgs extends AbortableArgs {
    query?: string;
    page?: number;
    perPage?: number;
}
interface RegistrySkillIdArgs extends AbortableArgs {
    registrySkillId: string;
}
interface RegistrySkillEntriesArgs extends AbortableArgs {
    registrySkillIds: readonly string[];
}
interface RegistrySkillSourceArgs extends AbortableArgs {
    source: string;
    skillId: string;
}
interface RegistryRepositoryArgs extends AbortableArgs {
    source: string;
}
interface RegistrySkillInstallArgs {
    registrySkillId: string;
}
interface SkillsRegistryArea {
    detail(args: RegistrySkillSourceArgs): Promise<RegistrySkillDetail>;
    entries(args: RegistrySkillEntriesArgs): Promise<RegistrySkillEntriesResponse>;
    get(args: RegistrySkillIdArgs): Promise<RegistrySkill>;
    install(args: RegistrySkillInstallArgs): Promise<RegistrySkillInstallResponse>;
    repositoryStars(args: RegistryRepositoryArgs): Promise<RegistryRepositoryStars>;
    search(args?: RegistrySkillsSearchArgs): Promise<RegistrySkillsPage>;
}
interface SkillsArea {
    getContent(args: SkillContentArgs): Promise<SkillContentResponse>;
    list(args: SkillListArgs): Promise<SkillListResponse>;
    listFiles(args: SkillIdentityArgs): Promise<SkillFilesResponse>;
    registry: SkillsRegistryArea;
    remove(args: SkillDeleteArgs): Promise<{
        deletedPath: string;
    }>;
    update(args: SkillUpdateArgs): Promise<{
        filePath: string;
        revision: string;
    }>;
}

type ThemeGetResult = AppTheme;
type ThemeCatalogResult = ThemeCatalogResponse;
type ThemeSetInput = AppThemeSelection;
type ThemeSetResult = AppTheme;
type ThemeResolveResult = AppTheme;
interface ThemeCatalogArgs {
    signal?: AbortSignal;
}
interface ThemeGetArgs {
    signal?: AbortSignal;
}
interface ThemeResolveArgs {
    themeId: string;
    signal?: AbortSignal;
}
interface ThemeArea {
    get(args?: ThemeGetArgs): Promise<ThemeGetResult>;
    catalog(args?: ThemeCatalogArgs): Promise<ThemeCatalogResult>;
    resolve(args: ThemeResolveArgs): Promise<ThemeResolveResult>;
    set(selection: ThemeSetInput): Promise<ThemeSetResult>;
    set(themeId: string): Promise<ThemeSetResult>;
}

interface SystemAttentionArgs {
    signal?: AbortSignal;
}
interface SystemConfigArgs {
    signal?: AbortSignal;
}
interface SystemExecutionOptionsArgs extends SystemExecutionOptionsQuery {
    signal?: AbortSignal;
}
interface SystemUsageLimitsArgs extends SystemUsageLimitsQuery {
    signal?: AbortSignal;
}
interface SystemVersionArgs {
    force?: boolean;
    signal?: AbortSignal;
}
interface SystemVoiceTranscriptionArgs {
    file: Blob;
    prompt?: string;
    signal?: AbortSignal;
}
type SystemAttentionResult = SystemAttentionResponse;
type SystemConfigResult = SystemConfigResponse;
type SystemExecutionOptionsResult = SystemExecutionOptionsResponse;
type SystemReloadConfigResult = SystemConfigReloadResponse;
type SystemInstallCliSkillsArgs = SystemInstallCliSkillsRequest;
interface SystemCliSkillsStatusArgs {
    hostIds?: readonly string[];
    signal?: AbortSignal;
}
type SystemCliSkillsStatusResult = SystemCliSkillsStatusResponse;
type SystemInstallCliSkillsResult = SystemInstallCliSkillsResponse;
type SystemVoiceTranscriptionResult = SystemVoiceTranscriptionResponse;
type SystemUpdateExperimentsResult = Experiments;
type SystemUpdateGeneralSettingsResult = AppSettings & {
    showUnhandledProviderEvents?: boolean;
};
type SystemUpdateKeyboardSettingsResult = AppKeybindingOverrides;
type SystemUsageLimitsResult = ProviderUsageResponse;
interface SystemProviderStatesArgs extends SystemProvidersQuery {
    signal?: AbortSignal;
}
type SystemProviderStatesResult = SystemProviderStatesResponse;
type SystemVersionResult = SystemVersionResponse;
interface SystemUiPreferencesArgs {
    signal?: AbortSignal;
}
type SystemUiPreferencesResult = UiPreferencesResponse;
interface SystemUpdateUiPreferenceArgs<Key extends UiPreferenceKey> {
    expectedRevision: number;
    key: Key;
    value: UiPreferenceValue<Key>;
}
interface SystemResetUiPreferenceArgs<Key extends UiPreferenceKey> {
    key: Key;
}
type SystemUiPreferenceResult<Key extends UiPreferenceKey> = UiPreferenceResponse<Key>;
interface SystemUiPreferencesArea {
    list(args?: SystemUiPreferencesArgs): Promise<SystemUiPreferencesResult>;
    set<Key extends UiPreferenceKey>(args: SystemUpdateUiPreferenceArgs<Key>): Promise<SystemUiPreferenceResult<Key>>;
    reset<Key extends UiPreferenceKey>(args: SystemResetUiPreferenceArgs<Key>): Promise<SystemUiPreferenceResult<Key>>;
}
interface SystemArea {
    setMachineEnvironmentVariable(input: MachineEnvironmentSet): Promise<MachineEnvironmentList>;
    deleteMachineEnvironmentVariable(input: {
        name: string;
    }): Promise<MachineEnvironmentList>;
    machineEnvironment(): Promise<MachineEnvironmentList>;
    replaceMachineEnvironment(input: MachineEnvironmentReplace): Promise<MachineEnvironmentList>;
    attention(args?: SystemAttentionArgs): Promise<SystemAttentionResult>;
    config(args?: SystemConfigArgs): Promise<SystemConfigResult>;
    executionOptions(args?: SystemExecutionOptionsArgs): Promise<SystemExecutionOptionsResult>;
    cliSkillsStatus(args?: SystemCliSkillsStatusArgs): Promise<SystemCliSkillsStatusResult>;
    installCliSkills(args: SystemInstallCliSkillsArgs): Promise<SystemInstallCliSkillsResult>;
    reloadConfig(): Promise<SystemReloadConfigResult>;
    transcribeVoice(args: SystemVoiceTranscriptionArgs): Promise<SystemVoiceTranscriptionResult>;
    uiPreferences: SystemUiPreferencesArea;
    updateExperiments(args: Experiments): Promise<SystemUpdateExperimentsResult>;
    updateGeneralSettings(args: AppSettingsUpdate): Promise<SystemUpdateGeneralSettingsResult>;
    updateKeyboardSettings(args: AppKeybindingOverrides): Promise<SystemUpdateKeyboardSettingsResult>;
    providerStates(args?: SystemProviderStatesArgs): Promise<SystemProviderStatesResult>;
    usageLimits(args?: SystemUsageLimitsArgs): Promise<SystemUsageLimitsResult>;
    version(args?: SystemVersionArgs): Promise<SystemVersionResult>;
}

interface TerminalThreadScope {
    cwd?: never;
    environmentId?: never;
    hostId?: never;
    kind: "thread";
    threadId: string;
}
interface TerminalEnvironmentScope {
    environmentId: string;
    cwd?: never;
    hostId?: never;
    kind: "environment";
    threadId?: never;
}
interface TerminalHostPathListScope {
    cwd?: string;
    environmentId?: never;
    hostId: string;
    kind: "host_path";
    threadId?: never;
}
interface TerminalHostPathCreateScope {
    cwd: string | null;
    environmentId?: never;
    hostId: string;
    kind: "host_path";
    threadId?: never;
}
type TerminalListScope = TerminalThreadScope | TerminalEnvironmentScope | TerminalHostPathListScope;
type TerminalCreateScope = TerminalThreadScope | TerminalEnvironmentScope | TerminalHostPathCreateScope;
interface TerminalListArgs {
    signal?: AbortSignal;
    scope: TerminalListScope;
}
interface TerminalCreateArgs {
    cols: number;
    rows: number;
    scope: TerminalCreateScope;
    start?: CreateTerminalRequest["start"];
    title?: string;
}
interface TerminalTargetArgs {
    terminalId: string;
}
interface TerminalGetArgs extends TerminalTargetArgs {
    signal?: AbortSignal;
}
interface TerminalRenameArgs extends TerminalTargetArgs {
    title: UpdateTerminalRequest["title"];
}
interface TerminalCloseArgs extends TerminalTargetArgs {
    mode: "force" | "if-clean";
}
interface TerminalInputArgs extends TerminalTargetArgs {
    dataBase64: TerminalInputRequest["dataBase64"];
}
interface TerminalResizeArgs extends TerminalTargetArgs {
    cols: TerminalResizeRequest["cols"];
    rows: TerminalResizeRequest["rows"];
}
interface TerminalOutputArgs extends TerminalTargetArgs {
    limitChunks?: TerminalOutputQuery["limitChunks"];
    signal?: AbortSignal;
    sinceSeq?: TerminalOutputQuery["sinceSeq"];
    tailBytes?: TerminalOutputQuery["tailBytes"];
}
type TerminalRestartArgs = TerminalTargetArgs;
type TerminalListResult = TerminalListResponse;
type TerminalCreateResult = TerminalSession;
type TerminalGetResult = TerminalSession;
type TerminalRenameResult = TerminalSession;
type TerminalCloseResult = TerminalSession;
type TerminalInputResult = TerminalSession;
type TerminalResizeResult = TerminalSession;
type TerminalOutputResult = TerminalOutputResponse;
type TerminalRestartResult = TerminalSession;
interface TerminalsArea {
    close(args: TerminalCloseArgs): Promise<TerminalCloseResult>;
    create(args: TerminalCreateArgs): Promise<TerminalCreateResult>;
    get(args: TerminalGetArgs): Promise<TerminalGetResult>;
    input(args: TerminalInputArgs): Promise<TerminalInputResult>;
    list(args: TerminalListArgs): Promise<TerminalListResult>;
    output(args: TerminalOutputArgs): Promise<TerminalOutputResult>;
    rename(args: TerminalRenameArgs): Promise<TerminalRenameResult>;
    restart(args: TerminalRestartArgs): Promise<TerminalRestartResult>;
    resize(args: TerminalResizeArgs): Promise<TerminalResizeResult>;
}

interface ThreadListArgs {
    archived?: boolean;
    environmentId?: string;
    sectionId?: string;
    hasParent?: boolean;
    includeHidden?: boolean;
    limit?: number;
    offset?: number;
    originKind?: ThreadListQuery["originKind"];
    originPluginId?: string;
    parentThreadId?: string;
    projectId?: string;
    signal?: AbortSignal;
    sourceThreadId?: string;
    unsectioned?: boolean;
}
interface ThreadSearchArgs extends ThreadSearchQuery {
    signal?: AbortSignal;
}
/**
 * Counting is a server-side `SELECT count(*)`: a caller that only needs "how
 * many threads are running on this host" must never page rows through
 * `threads.list`, which would both cost memory and miscount past its limit.
 *
 * Every filter is genuinely absent by default. `parentThreadId` is
 * three-valued: omitted does not filter on parentage at all, the
 * `THREAD_COUNT_ROOT_PARENT` sentinel (`"none"`) counts root threads only, and
 * any other value counts that parent's children. Archived and deleted threads
 * are excluded by the route.
 */
interface ThreadCountArgs {
    groupBy?: ThreadCountGroupBy;
    hostId?: string;
    parentThreadId?: string;
    projectId?: string;
    providerId?: string;
    signal?: AbortSignal;
    status?: ThreadStatus;
}
interface ThreadResolveMentionsArgs extends ResolveThreadMentionsRequest {
    signal?: AbortSignal;
}
interface ThreadGetArgs {
    include?: ThreadGetQuery["include"];
    signal?: AbortSignal;
    threadId: string;
}
type ThreadGetResult = ThreadResponse | ThreadWithIncludesResponse;
type ThreadCountResult = ThreadCountResponse;
/**
 * The threads occupying capacity right now — canonical status `starting` or
 * `active`, archived and deleted excluded, hidden included (a hidden thread
 * burns a real slot). Each row is just `id` and `hostId` — the machine whose
 * pool the thread occupies, from its environment or, before one is attached,
 * from the start intent it was admitted with; null only when neither names
 * one. Anything else a policy needs it fetches by id.
 *
 * **Exact inside the `message.dispatch` hook, a snapshot everywhere else.**
 * Hook passes are serialized under one server-wide lock and a cleared first
 * attempt commits its `pending -> starting` flip before that lock releases, so
 * a handler reading this sees every admission granted ahead of it in the same
 * burst — which is what makes "five quick creates against a limit of two" hold
 * three of them instead of admitting all five. Read from a background service,
 * a timer or a `turn.failed` listener it is an ordinary query racing with every
 * concurrent dispatch, exactly like {@link ThreadsArea.count}.
 *
 * One boundary: a warm follow-up admitted on an already-live `idle` thread
 * flips `idle -> active` inside the send transaction, just AFTER the lock
 * releases. First-dispatch admissions are exact; a burst of follow-ups to
 * distinct idle threads can momentarily under-report.
 */
type ThreadRunningResult = ThreadRunningResponse;
type ThreadListResult = ThreadListResponse;
type ThreadSearchResult = ThreadSearchResponse;
type ThreadResolveMentionsResult = ResolveThreadMentionsResponse;
interface ThreadOutputResponse {
    output: string | null;
}
type ThreadMutationResult = ThreadResponse;
type ThreadPluginMetadataResult = ThreadPluginMetadataResponse;
type ThreadSpawnResult = ThreadResponse;
type ThreadForkResult = ThreadResponse;
type ThreadInteractionGetResult = PendingInteraction;
type ThreadInteractionListResult = ThreadPendingInteractionsResponse;
type ThreadInteractionResolveResult = PendingInteraction;
type ThreadInteractionRespondResult = PendingInteraction;
type ThreadInteractionCancelResult = PendingInteraction;
type ThreadEventsListResult = ThreadEventRow[];
type ThreadEventWaitResult = ThreadEventRow | null;
type ThreadContextResult = ThreadContextResponse;
type ThreadTimelineResult = ThreadTimelineResponse;
type ThreadArchiveResult = ThreadArchiveAllResponse;
type ThreadOpenResult = ThreadOpenResponse;
type ThreadPaneActionResult = ThreadPaneActionResponse;
type ThreadDeleteResult = {
    ok: true;
};
type ThreadSendResult = SendMessageResponse;
type ThreadRetryResult = RetryTurnResponse;
type ThreadEditMessageResult = EditMessageResponse;
type ThreadStopResult = {
    ok: true;
};
type ThreadCompactResult = {
    ok: true;
};
type ThreadBannerActionResult = {
    ok: true;
};
type ThreadUnarchiveResult = {
    ok: true;
};
type ThreadArchiveAllResult = ThreadArchiveAllResponse;
type ThreadReadStateResult = ThreadResponse;
type ThreadPinOrderResult = ThreadListResponse;
type ThreadPromptHistoryResult = PromptHistoryResponse;
type ThreadQueuedMessagesResult = ThreadQueuedMessageListResponse;
type ThreadQueuedMessageCreateResult = ThreadQueuedMessage;
type ThreadQueuedMessageUpdateResult = ThreadQueuedMessage;
type ThreadQueuedMessageDeleteResult = {
    ok: true;
};
type ThreadQueuedMessageReorderResult = ThreadQueuedMessageListResponse;
type ThreadQueuedMessageSendResult = SendQueuedMessageResponse;
type ThreadQueuedMessageGroupBoundaryResult = ThreadQueuedMessageListResponse;
type ThreadQueueListResult = ThreadQueuedMessageListResponse;
type ThreadTabsResult = ThreadTabsResponse;
type ThreadTabsUpdateResult = ThreadTabsResponse;
type ThreadStorageFilesResult = ThreadStorageFileListResponse;
type ThreadStorageLocationResult = ThreadStorageLocationResponse;
type ThreadStoragePathsResult = ThreadStoragePathListResponse;
type ThreadChildSummaryResult = ThreadChildSummaryResponse;
type ThreadDefaultExecutionOptionsResult = ResolvedThreadExecutionOptions | null;
type ThreadConversationOutlineResult = ThreadConversationOutlineResponse;
type ThreadTimelineTurnSummaryDetailsResult = TimelineTurnSummaryDetailsResponse;
interface ThreadSpawnBaseArgs extends Omit<CreateThreadRequest, "input" | "origin" | "originKind" | "startedOnBehalfOf"> {
    origin?: CreateThreadRequest["origin"];
    originKind?: CreateThreadRequest["originKind"];
    startedOnBehalfOf?: CreateThreadRequest["startedOnBehalfOf"];
}
type ThreadSpawnArgs = ThreadSpawnBaseArgs & ({
    input: CreateThreadRequest["input"];
    prompt?: never;
} | {
    input?: never;
    prompt: string;
});
interface ThreadForkArgs extends Omit<ForkThreadRequest, "origin" | "visibility"> {
    origin?: ForkThreadRequest["origin"];
    visibility?: ForkThreadRequest["visibility"];
}
interface ThreadUpdateArgs extends UpdateThreadRequest {
    threadId: string;
}
interface ThreadPluginMetadataArgs {
    pluginId: string;
    signal?: AbortSignal;
    threadId: string;
}
interface ThreadPluginMetadataUpdateArgs {
    threadId: string;
    pluginId: string;
    set?: JsonObject;
    remove?: string[];
    signal?: AbortSignal;
}
interface ThreadDeleteArgs extends DeleteThreadRequest {
    threadId: string;
}
interface ThreadSendArgs extends SendMessageRequest {
    threadId: string;
}
interface ThreadEditMessageArgs extends EditMessageRequest {
    threadId: string;
}
interface ThreadRetryArgs {
    threadId: string;
    /**
     * The failed turn to re-submit. Omitted means the thread's most recent turn,
     * which is the one whose failure put it in `error`; naming one asserts which
     * failure you decided on and fails if the thread has moved on since.
     */
    turnRequestId?: string;
    /**
     * Epoch ms to retry at. Omitted attempts the retry now — it may still queue
     * behind a busy thread or a plugin wait, like any other dispatch.
     */
    sendAt?: number;
    /** Why the turn is being retried, shown verbatim on the queued row. */
    reason?: string;
}
interface ThreadActionArgs {
    signal?: AbortSignal;
    threadId: string;
}
interface ThreadStatusArgs extends ThreadActionArgs {
    signal?: AbortSignal;
}
interface ThreadPromptHistoryArgs extends PromptHistoryQuery {
    signal?: AbortSignal;
    threadId: string;
}
interface ThreadPinOrderArgs extends ReorderPinnedThreadRequest {
    threadId: string;
}
interface ThreadQueuedMessageArgs {
    signal?: AbortSignal;
    threadId: string;
}
interface ThreadQueuedMessageCreateArgs extends CreateQueuedMessageRequest {
    threadId: string;
}
interface ThreadQueuedMessageUpdateArgs extends ThreadQueuedMessageTargetArgs, UpdateQueuedMessageRequest {
}
interface ThreadQueuedMessageTargetArgs {
    queuedMessageId: string;
    threadId: string;
}
interface ThreadQueuedMessageSendArgs extends ThreadQueuedMessageTargetArgs, SendQueuedMessageRequest {
}
interface ThreadQueuedMessageReorderArgs extends ThreadQueuedMessageTargetArgs, ReorderQueuedMessageRequest {
}
interface ThreadQueuedMessageGroupBoundaryArgs extends SetQueuedMessageGroupBoundaryRequest {
    threadId: string;
}
/**
 * Both filters are genuinely absent by default: no filter lists every live
 * queued row in the workspace, which is what `bb thread queue list` with no
 * thread and a limiter plugin's own bookkeeping ask for.
 */
interface ThreadQueueListArgs {
    /** `plugin:<id>` — every row that plugin is holding the wait on. */
    waitHolder?: QueuedMessageWaitHolder;
    signal?: AbortSignal;
    threadId?: string;
}
interface ThreadStorageFilesArgs extends ThreadStorageFilesQuery {
    signal?: AbortSignal;
    threadId: string;
}
interface ThreadStoragePathsArgs extends ThreadStoragePathsQuery {
    signal?: AbortSignal;
    threadId: string;
}
interface ThreadTimelineTurnSummaryDetailsArgs extends TimelineTurnSummaryDetailsQuery {
    signal?: AbortSignal;
    threadId: string;
}
interface ThreadTabsUpdateArgs extends UpdateThreadTabsRequest {
    threadId: string;
}
interface ThreadOpenArgs {
    threadId: string;
    split?: ThreadOpenSplit;
    file: ThreadOpenFile | null;
}
interface ThreadPaneActionArgs {
    action: ThreadPaneAction;
    threadId: string;
}
interface ThreadEventsListArgs {
    afterSeq?: string;
    beforeSeq?: string;
    limit?: string;
    order?: "asc" | "desc";
    signal?: AbortSignal;
    threadId: string;
    types?: readonly [ThreadEventType, ...ThreadEventType[]];
}
interface ThreadEventWaitArgs {
    afterSeq?: string;
    signal?: AbortSignal;
    threadId: string;
    type: string;
    waitMs: string;
}
interface ThreadTimelineArgs extends ThreadTimelineQuery {
    signal?: AbortSignal;
    threadId: string;
}
interface ThreadOutputArgs {
    signal?: AbortSignal;
    threadId: string;
}
interface ThreadInteractionListArgs {
    signal?: AbortSignal;
    threadId: string;
}
interface ThreadInteractionTargetArgs {
    interactionId: string;
    threadId: string;
}
interface ThreadInteractionGetArgs extends ThreadInteractionTargetArgs {
    signal?: AbortSignal;
}
interface ThreadInteractionResolveArgs extends ThreadInteractionTargetArgs {
    resolution: PendingInteractionResolution;
}
interface ThreadInteractionRespondArgs extends ThreadInteractionTargetArgs {
    value: JsonValue;
}
type ThreadWaitTarget = {
    kind: "status";
    status: ThreadStatus;
} | {
    kind: "event";
    eventType: string;
};
interface ThreadWaitArgs {
    event?: string;
    pollIntervalMs?: number;
    signal?: AbortSignal;
    status?: ThreadStatus;
    threadId: string;
    timeoutMs?: number;
}
type ThreadWaitResult = {
    event: NonNullable<ThreadEventWaitResult>;
    matched: true;
    target: Extract<ThreadWaitTarget, {
        kind: "event";
    }>;
    threadId: string;
} | {
    matched: true;
    target: Extract<ThreadWaitTarget, {
        kind: "status";
    }>;
    thread: ThreadGetResult;
    threadId: string;
};
interface ThreadInteractionsArea {
    cancel(args: ThreadInteractionTargetArgs): Promise<ThreadInteractionCancelResult>;
    get(args: ThreadInteractionGetArgs): Promise<ThreadInteractionGetResult>;
    list(args: ThreadInteractionListArgs): Promise<ThreadInteractionListResult>;
    resolve(args: ThreadInteractionResolveArgs): Promise<ThreadInteractionResolveResult>;
    respond(args: ThreadInteractionRespondArgs): Promise<ThreadInteractionRespondResult>;
}
interface ThreadEventsArea {
    list(args: ThreadEventsListArgs): Promise<ThreadEventsListResult>;
    wait(args: ThreadEventWaitArgs): Promise<ThreadEventWaitResult>;
}
interface ThreadQueuedMessagesArea {
    create(args: ThreadQueuedMessageCreateArgs): Promise<ThreadQueuedMessageCreateResult>;
    delete(args: ThreadQueuedMessageTargetArgs): Promise<ThreadQueuedMessageDeleteResult>;
    list(args: ThreadQueuedMessageArgs): Promise<ThreadQueuedMessagesResult>;
    reorder(args: ThreadQueuedMessageReorderArgs): Promise<ThreadQueuedMessageReorderResult>;
    send(args: ThreadQueuedMessageSendArgs): Promise<ThreadQueuedMessageSendResult>;
    setGroupBoundary(args: ThreadQueuedMessageGroupBoundaryArgs): Promise<ThreadQueuedMessageGroupBoundaryResult>;
    update(args: ThreadQueuedMessageUpdateArgs): Promise<ThreadQueuedMessageUpdateResult>;
}
interface ThreadTabsArea {
    get(args: ThreadStatusArgs): Promise<ThreadTabsResult>;
    update(args: ThreadTabsUpdateArgs): Promise<ThreadTabsUpdateResult>;
}
/**
 * Queued rows across every thread.
 *
 * The per-thread list, send-now, edit, reorder and delete all live on
 * `queuedMessages`, which is where a row's own operations belong. This area
 * exists for the one question a thread-scoped list cannot answer: "what is
 * queued right now, anywhere" — a workspace-wide pending view, or a plugin
 * recovering the rows it is holding after a restart.
 */
interface ThreadQueueArea {
    list(args?: ThreadQueueListArgs): Promise<ThreadQueueListResult>;
}
interface ThreadsArea {
    archive(args: ThreadActionArgs): Promise<ThreadArchiveResult>;
    archiveAll(args: ThreadActionArgs): Promise<ThreadArchiveAllResult>;
    childSummary(args: ThreadStatusArgs): Promise<ThreadChildSummaryResult>;
    compact(args: ThreadActionArgs): Promise<ThreadCompactResult>;
    cancelPlan(args: ThreadActionArgs): Promise<ThreadBannerActionResult>;
    clearContext(args: ThreadActionArgs): Promise<ThreadBannerActionResult>;
    clearGoal(args: ThreadActionArgs): Promise<ThreadBannerActionResult>;
    conversationOutline(args: ThreadStatusArgs): Promise<ThreadConversationOutlineResult>;
    count(args?: ThreadCountArgs): Promise<ThreadCountResult>;
    defaultExecutionOptions(args: ThreadStatusArgs): Promise<ThreadDefaultExecutionOptionsResult>;
    delete(args: ThreadDeleteArgs): Promise<ThreadDeleteResult>;
    editMessage(args: ThreadEditMessageArgs): Promise<ThreadEditMessageResult>;
    events: ThreadEventsArea;
    fork(args: ThreadForkArgs): Promise<ThreadForkResult>;
    get(args: ThreadGetArgs): Promise<ThreadGetResult>;
    getPluginMetadata(args: ThreadPluginMetadataArgs): Promise<ThreadPluginMetadataResult>;
    updatePluginMetadata(args: ThreadPluginMetadataUpdateArgs): Promise<ThreadPluginMetadataResult>;
    queue: ThreadQueueArea;
    interactions: ThreadInteractionsArea;
    list(args?: ThreadListArgs): Promise<ThreadListResult>;
    listRunning(args?: {
        signal?: AbortSignal;
    }): Promise<ThreadRunningResult>;
    markRead(args: ThreadActionArgs): Promise<ThreadReadStateResult>;
    markUnread(args: ThreadActionArgs): Promise<ThreadReadStateResult>;
    open(args: ThreadOpenArgs): Promise<ThreadOpenResult>;
    paneAction(args: ThreadPaneActionArgs): Promise<ThreadPaneActionResult>;
    output(args: ThreadOutputArgs): Promise<ThreadOutputResponse>;
    pin(args: ThreadActionArgs): Promise<ThreadMutationResult>;
    promptHistory(args: ThreadPromptHistoryArgs): Promise<ThreadPromptHistoryResult>;
    queuedMessages: ThreadQueuedMessagesArea;
    reorderPinned(args: ThreadPinOrderArgs): Promise<ThreadPinOrderResult>;
    resolveMentions(args: ThreadResolveMentionsArgs): Promise<ThreadResolveMentionsResult>;
    /**
     * Re-submit a failed turn. The retry is an ordinary dispatch attempt, so a
     * `sendAt` in the future queues it on the clock and a `message.dispatch` hook
     * can still hold it; the response says which of the two happened.
     */
    retry(args: ThreadRetryArgs): Promise<ThreadRetryResult>;
    search(args: ThreadSearchArgs): Promise<ThreadSearchResult>;
    send(args: ThreadSendArgs): Promise<ThreadSendResult>;
    spawn(args: ThreadSpawnArgs): Promise<ThreadSpawnResult>;
    /**
     * Stop the thread's work and release its loaded runtime. An explicit stop
     * wins over running work: a turn the machine still runs while the thread
     * looks idle or failed, or a turn that starts while the stop is delivered,
     * is interrupted. The call waits for the interrupt attempt; if the machine
     * cannot confirm it, the thread remains stopping. Inspect its status before
     * treating the stop as confirmed.
     */
    stop(args: ThreadActionArgs): Promise<ThreadStopResult>;
    tabs: ThreadTabsArea;
    context(args: ThreadStatusArgs): Promise<ThreadContextResult>;
    timeline(args: ThreadTimelineArgs): Promise<ThreadTimelineResult>;
    timelineTurnSummaryDetails(args: ThreadTimelineTurnSummaryDetailsArgs): Promise<ThreadTimelineTurnSummaryDetailsResult>;
    storageFiles(args: ThreadStorageFilesArgs): Promise<ThreadStorageFilesResult>;
    storageLocation(args: ThreadStatusArgs): Promise<ThreadStorageLocationResult>;
    storagePaths(args: ThreadStoragePathsArgs): Promise<ThreadStoragePathsResult>;
    unarchive(args: ThreadActionArgs): Promise<ThreadUnarchiveResult>;
    unpin(args: ThreadActionArgs): Promise<ThreadMutationResult>;
    update(args: ThreadUpdateArgs): Promise<ThreadMutationResult>;
    wait(args: ThreadWaitArgs): Promise<ThreadWaitResult>;
}

type ThreadSectionCreateResult = ThreadSectionResponse;
type ThreadSectionUpdateResult = ThreadSectionMutationResponse;
type ThreadSectionDeleteResult = ThreadSectionMutationResponse;
type ThreadSectionListResult = ThreadSectionResponse[];
interface ThreadSectionListArgs {
    signal?: AbortSignal;
}
interface ThreadSectionsArea {
    create(args: CreateThreadSectionRequest): Promise<ThreadSectionCreateResult>;
    delete(args: DeleteThreadSectionRequest): Promise<ThreadSectionDeleteResult>;
    list(args?: ThreadSectionListArgs): Promise<ThreadSectionListResult>;
    update(args: UpdateThreadSectionRequest): Promise<ThreadSectionUpdateResult>;
}

interface BbSdkAreas extends BbRealtime {
    experimental_desktopBrowsers: ExperimentalDesktopBrowsersArea;
    experimental_server: ExperimentalServerArea;
    environments: EnvironmentsArea;
    files: FilesArea;
    hosts: HostsArea;
    projects: ProjectsArea;
    plugins: PluginsArea;
    providers: ProvidersArea;
    skills: SkillsArea;
    status: StatusArea;
    system: SystemArea;
    terminals: TerminalsArea;
    theme: ThemeArea;
    threadSections: ThreadSectionsArea;
    threads: ThreadsArea;
}

/**
 * The `@get-bb/plugin-sdk/app` contract (plugin design §5.2) — pure types with no
 * side effects. The BB app imports these to keep its real implementation in
 * sync (`satisfies PluginSdkApp`). Plugin authors import the same shapes through
 * `@get-bb/plugin-sdk/app`.
 *
 * Per-slot props are versioned contracts: additive-only within an SDK major.
 */
/** Props passed to a `homepageSection` component. */
interface PluginHomepageSectionProps {
    /** Project in view on the compose surface; null when none is selected. */
    projectId: string | null;
}
/**
 * Props passed to a `settingsSection` component.
 *
 * Deliberately empty in V1; versioned additive like the other slot props.
 */
interface PluginSettingsSectionProps {
}
/**
 * Props passed to an `experimental_appOverlay` component.
 *
 * Deliberately empty while the component reads live app state through SDK
 * hooks; versioned additive like the other slot props.
 */
interface ExperimentalAppOverlayProps {
}
/** Props passed to a `navPanel` component (it owns its whole route). */
interface PluginNavPanelProps {
    /**
     * The route remainder after the panel root, "" at the root. The panel's
     * route is `/plugins/<pluginId>/<path>/*`, so a deep link like
     * `/plugins/notes/notes/work/ideas.md` renders the panel with
     * `subPath: "work/ideas.md"`. Navigate within the panel via
     * `useBbNavigate().toPluginPanel(path, { subPath })` — browser
     * back/forward then walks panel-internal history.
     */
    subPath: string;
}
/**
 * Props passed to a panel tab opened by a `threadPanelAction`.
 *
 * This slot is rendered only for an existing thread. Use
 * `experimental_newThreadPanelAction` for the root New thread screen.
 */
interface PluginThreadPanelProps {
    threadId: string;
    /**
     * The JSON value the action's `openPanel` call passed (round-tripped
     * through persistence, so the tab restores across reloads); null when the
     * action opened the panel without params.
     */
    params: JsonValue$1 | null;
}
/** Props passed to a panel tab opened by `experimental_newThreadPanelAction`. */
interface PluginNewThreadPanelProps {
    /** Project selected in the root composer; null in projectless compose. */
    projectId: string | null;
    /**
     * The JSON value the action's `openPanel` call passed (round-tripped
     * through persistence, so the tab restores across reloads); null when the
     * action opened the panel without params.
     */
    params: JsonValue$1 | null;
}
interface PluginPendingInteractionView {
    id: string;
    threadId: string;
    title: string;
    payload: JsonValue$1;
    createdAt: number;
    expiresAt: number | null;
}
interface PluginPendingInteractionProps {
    interaction: PluginPendingInteractionView;
    submit(value: JsonValue$1): Promise<void>;
    cancel(): Promise<void>;
}
/**
 * Props for a `sidebarFooterAction` — host-rendered (no plugin component).
 * Deliberately empty; the registration's `run` carries the behavior.
 */
interface PluginSidebarFooterActionProps {
}
/** Props passed to an experimental sidebar-footer disclosure component. */
interface ExperimentalSidebarFooterDisclosureProps {
    /** Hide this disclosure without affecting another plugin's open disclosure. */
    dismiss(): void;
}
/** Display and accessibility metadata for a host-owned sidebar shortcut. */
interface ExperimentalSidebarNavigationShortcut {
    label: string;
    ariaKeyShortcuts: string;
}
/** Host-owned behavior represented by one sidebar navigation item. */
type ExperimentalSidebarNavigationAction = {
    kind: "new-thread";
} | {
    kind: "search-threads";
} | {
    kind: "open-extensions";
} | {
    kind: "open-plugin-panel";
    pluginId: string;
    panelId: string;
};
/** Semantic icon identity for one sidebar navigation item. */
type ExperimentalSidebarNavigationIcon = {
    kind: "host";
    name: "extensions" | "new-thread" | "search";
} | {
    kind: "plugin";
    pluginId: string;
    icon: string | null;
};
/** One host-owned destination or action a plugin may arrange. */
interface ExperimentalSidebarNavigationItem {
    id: string;
    label: string;
    icon: ExperimentalSidebarNavigationIcon;
    action: ExperimentalSidebarNavigationAction;
    isDisabled: boolean;
    shortcut: ExperimentalSidebarNavigationShortcut | null;
    experimental_splitProps: {
        onPointerDown?: (event: react.PointerEvent<HTMLElement>) => void;
    };
}
/** How the host should activate a sidebar navigation item. */
interface ExperimentalSidebarNavigationActivationOptions {
    openInSplit: boolean;
}
/** Props passed to an `experimental_sidebarNavigation` component. */
interface ExperimentalSidebarNavigationProps {
    items: readonly ExperimentalSidebarNavigationItem[];
    activeItemId: string | null;
    isCompactViewport: boolean;
    experimental_activate(itemId: string, options: ExperimentalSidebarNavigationActivationOptions): void;
    experimental_Original: ComponentType;
}
/**
 * Props passed to an `experimental_threadList` component — the sidebar's
 * scrolling thread area, replaced wholesale by one plugin.
 */
interface PluginThreadListProps {
    /** The thread the route currently shows; null on non-thread routes. */
    activeThreadId: string | null;
    /** The project the route currently shows; null when none is selected. */
    activeProjectId: string | null;
    /** True on phone-width viewports and coarse pointers. */
    isCompactViewport: boolean;
    /**
     * Call after the user opens a thread. It closes the mobile sidebar drawer.
     */
    onNavigate: () => void;
    /**
     * Compatibility value for the former sidebar search field. BB now searches
     * threads in the quick palette, so the host always supplies "".
     *
     * @deprecated The quick palette owns thread search. Ignore this value.
     */
    searchQuery: string;
}
/**
 * Props passed to an `experimental_threadHeaderAction` component, rendered in
 * the thread header's action row.
 */
interface PluginThreadHeaderActionProps {
    /**
     * The thread this header belongs to. Never null: the slot is not rendered
     * on the compose screen or other non-thread routes. A split layout renders
     * one header per pane, so the component mounts once per visible thread,
     * each with its own id — keep per-thread state in the component, never in a
     * module-level singleton.
     */
    threadId: string;
    projectId: string;
    /**
     * True on phone-width viewports and coarse pointers. Collapse to an
     * icon-sized control when it is true — the row is short.
     */
    isCompactViewport: boolean;
}
/** JavaScript world a Browser page expression runs in. */
type ExperimentalPluginBrowserPageWorld = "isolated" | "main";
interface ExperimentalPluginBrowserPageEvaluateOptions {
    /**
     * `isolated` (default) runs in a BB-owned world that shares the page DOM but
     * not page globals, and binds `bb.postMessage(data)`. `main` runs beside the
     * page's own scripts, where `bb` is `null`.
     */
    world?: ExperimentalPluginBrowserPageWorld;
}
/**
 * Script access to the top-level document of one Browser tab. Independent of
 * CDP control leases: it never attaches a debugger or shows a control banner.
 */
interface ExperimentalPluginBrowserPage {
    /**
     * Evaluate a JavaScript expression and resolve its JSON-serialized value.
     * Promises are awaited and `undefined` resolves to `null`. The expression
     * can reference `bb`. Rejects when the tab is gone or the expression throws.
     * Anything the expression installs is lost when the document navigates.
     */
    evaluate(expression: string, options?: ExperimentalPluginBrowserPageEvaluateOptions): Promise<JsonValue$1>;
    /**
     * Subscribe to values this plugin's isolated-world scripts in this tab send
     * with `bb.postMessage(data)`. Returns the unsubscribe function.
     */
    onMessage(listener: (data: JsonValue$1) => void): () => void;
}
interface ExperimentalPluginBrowserToolbarActionProps {
    /** Thread that owns the Browser tab. */
    threadId: string;
    /** Browser tab currently rendering the action. */
    tabId: string;
    /** Current top-level URL shown in the address bar. */
    url: string;
    /** True when the Browser chrome needs compact controls. */
    isCompactViewport: boolean;
    /** Script access to this tab's page; `null` outside the desktop app. */
    experimental_page: ExperimentalPluginBrowserPage | null;
}
/**
 * Where a file being opened by a `fileOpener` lives. `path` semantics follow
 * the source: workspace paths are relative to the environment's worktree,
 * thread-storage paths are relative to the thread's storage root, host paths
 * are absolute on the thread's host.
 */
interface PluginFileOpenerSource {
    kind: "host" | "thread-storage" | "workspace";
    threadId: string | null;
    environmentId: string | null;
    projectId: string | null;
    /**
     * Explicit host selected for a project-backed workspace file. Omitted when
     * the source is resolved by its environment/thread or the primary host.
     *
     * @experimental Audit before relying on this as a stable contract.
     */
    experimental_hostId?: string;
}
/** Props passed to a `fileOpener` component (rendered as a panel file tab). */
interface PluginFileOpenerProps {
    path: string;
    source: PluginFileOpenerSource;
    /**
     * One-based, inclusive lines requested by the latest file open, or null when
     * untargeted. BB supplies a new object for each targeted open, including an
     * identical target in the active tab. Observe object identity to navigate
     * again; keep the editor model intact. Older hosts may omit this prop.
     *
     * @experimental Audit navigation, remount, and persistence semantics before stabilizing.
     */
    experimental_lineRange?: {
        startLineNumber: number;
        endLineNumber: number;
    } | null;
    /**
     * BB's file preview, bound to this file. Render it to delegate conditionally
     * without re-entering plugin replacement resolution.
     *
     * @experimental Audit before relying on this as a stable contract.
     */
    Original: ComponentType;
    /** @deprecated Renamed to `Original` in SDK 0.4.16; removed in bb 0.42. */
    experimental_Original?: ComponentType;
}
/** How a code line longer than the viewport is presented. */
type CodeOverflowMode = "scroll" | "wrap";
/** How a diff presents its two sides. */
type DiffViewMode = "split" | "unified";
/** A 1-based, inclusive line range. */
interface SourceCodeLineRange {
    start: number;
    end: number;
}
/** One complete text side of a diff, resolved by the caller. */
interface ExperimentalDiffFileContent {
    /** File path for this side. May differ between `old` and `new` for a rename. */
    path: string;
    /** Complete UTF-8 file contents, including unchanged lines outside the patch. */
    content: string;
}
/** Complete text contents for both sides of a diff. */
interface ExperimentalDiffFullFileContents {
    old: ExperimentalDiffFileContent;
    new: ExperimentalDiffFileContent;
}
/**
 * Props of the host-owned `experimental_SourceCode` component — BB's source
 * viewer. The host owns syntax highlighting, gutters, wrapping, line-selection
 * presentation, and the live BB code theme; the caller owns loading the text
 * and any surrounding chrome.
 */
interface SourceCodeProps {
    /** The complete source text to render. */
    content: string;
    /** File path or name. Drives language detection and the a11y label. */
    path: string;
    /** Long-line presentation. Defaults to `"scroll"`. */
    overflow?: CodeOverflowMode;
    /**
     * Lines to highlight and scroll into view (1-based, inclusive). Defaults to
     * `null` — nothing highlighted.
     */
    highlightedLines?: SourceCodeLineRange | null;
    /** Applied to the renderer's root element. */
    className?: string;
}
/**
 * Props of the host-owned `experimental_Diff` component — BB's diff viewer.
 * The host owns patch normalization (a patch without a `diff --git` header is
 * completed from `path`), syntax highlighting, unified/split presentation,
 * gutters, line-selection presentation, optional full-file context expansion,
 * and the live BB code theme. Content that cannot be parsed as a patch
 * degrades to plain monospace text.
 */
interface DiffProps {
    /** Unified patch text for exactly ONE file. */
    patch: string;
    /**
     * The file the patch applies to. Used to complete a patch that arrives
     * without a `diff --git` header (GitHub's REST patches, single `@@` hunks)
     * and for language detection.
     */
    path: string;
    /** Side-by-side or inline. Defaults to `"unified"`. */
    view?: DiffViewMode;
    /** Long-line presentation. Defaults to `"scroll"`. */
    overflow?: CodeOverflowMode;
    /** Whether the gutter shows line numbers. Defaults to `true`. */
    showLineNumbers?: boolean;
    /**
     * Complete text for both file sides. When present and consistent with the
     * patch, BB enables expand-context controls between hunks. The caller owns
     * loading these contents; omit the field to render from the patch alone.
     */
    experimental_fullFileContents?: ExperimentalDiffFullFileContents;
    /** Applied to the renderer's root element. */
    className?: string;
}
/**
 * Props passed to an `experimental_sourceCodeRenderer` component. Every value
 * is already resolved — the replacement never re-applies a host default.
 */
interface PluginSourceCodeRendererProps {
    content: string;
    path: string;
    overflow: CodeOverflowMode;
    highlightedLines: SourceCodeLineRange | null;
    /**
     * BB's source renderer, bound to this request. Render it to delegate
     * conditionally without re-entering plugin replacement resolution.
     *
     * @experimental Audit before relying on this as a stable contract.
     */
    Original: ComponentType;
    /** @deprecated Renamed to `Original` in SDK 0.4.16; removed in bb 0.42. */
    experimental_Original?: ComponentType;
}
/**
 * Props passed to an `experimental_diffRenderer` component. `patch` is always
 * a complete single-file unified patch, whatever shape the caller supplied,
 * and optional full-file context is resolved to an object or `null`.
 */
interface PluginDiffRendererProps {
    patch: string;
    path: string;
    view: DiffViewMode;
    overflow: CodeOverflowMode;
    showLineNumbers: boolean;
    /**
     * Caller-resolved text for both sides, or `null` when the caller supplied
     * only the patch. A replacement can use this to implement context expansion,
     * but must verify that the paths and hunk lines agree with `patch` before
     * treating the contents as complete. BB's original renderer performs that
     * verification when it mounts.
     */
    experimental_fullFileContents: ExperimentalDiffFullFileContents | null;
    /**
     * BB's diff renderer, bound to this request. Render it to delegate
     * conditionally without re-entering plugin replacement resolution.
     *
     * @experimental Audit before relying on this as a stable contract.
     */
    Original: ComponentType;
    /** @deprecated Renamed to `Original` in SDK 0.4.16; removed in bb 0.42. */
    experimental_Original?: ComponentType;
}
/**
 * Message context passed to a `messageDirective` component — the assistant
 * (or nested agent) message that contained the directive.
 */
interface PluginMessageDirectiveMessage {
    id: string;
    threadId: string;
    turnId: string | null;
    projectId: string | null;
}
/**
 * Open a worktree-relative file in the host's workspace file viewer. Returns
 * true when the host accepted the path; false when the path is invalid or the
 * viewer declined it.
 */
type PluginMessageDirectiveOpenWorkspaceFile = (path: string) => boolean;
/**
 * Props passed to a `messageDirective` component. Attributes are untrusted
 * strings parsed from the directive; the plugin validates its own fields.
 */
interface PluginMessageDirectiveProps {
    /** Parsed, untrusted directive attributes (e.g. `{ file: "demo.html" }`). */
    attributes: Readonly<Record<string, string>>;
    /** Original directive source text (useful for diagnostics / crash fallback). */
    source: string;
    message: PluginMessageDirectiveMessage;
    /**
     * Opens a worktree-relative file in the host's workspace file viewer. Null
     * when the message surface has no workspace viewer available.
     */
    openWorkspaceFile: PluginMessageDirectiveOpenWorkspaceFile | null;
}
interface PluginHomepageSectionRegistration {
    /** Unique within the plugin; letters, digits, `-`, `_`. */
    id: string;
    title: string;
    component: ComponentType<PluginHomepageSectionProps>;
}
interface PluginSettingsSectionRegistration {
    /** Unique within the plugin; letters, digits, `-`, `_`. */
    id: string;
    /** Optional host-rendered section heading. */
    title?: string;
    /**
     * Optional one-line host-rendered subheading under `title`, in the built-in
     * SettingsSection idiom (ignored when `title` is absent).
     */
    description?: string;
    component: ComponentType<PluginSettingsSectionProps>;
}
/**
 * Render app-wide plugin UI outside BB's layout regions.
 *
 * The host mounts each registration once per app window through the ordinary
 * plugin React boundary. The component therefore keeps PluginContext, router,
 * query, realtime, and other app-level SDK contexts when it renders fixed UI
 * or creates a React portal. BB supplies no chrome, positioning, visibility,
 * or interaction policy; the plugin owns those details and responsive
 * behavior. Registrations are additive and a crash hides only that overlay.
 */
interface ExperimentalAppOverlayRegistration {
    /** Unique within the plugin; letters, digits, `-`, `_`. */
    id: string;
    component: ComponentType<ExperimentalAppOverlayProps>;
}
/**
 * A name the host resolves to a glyph, in this order: a name any plugin
 * registered with `app.experimental_icons.register()`, then a built-in BB icon
 * name (`"Zap"`), then a namespaced `"<pluginId>/<name>"` glyph naming an
 * entry of that plugin's manifest `bb.branding.experimental_icons` map. A
 * registration therefore shadows a built-in, and either shadows a declared
 * icon of the same name. Names that resolve to none of the three fall back to
 * the surface's generic icon.
 *
 * Declared icons and registrations are one vocabulary here: the same name
 * works in `experimental_Icon`, in every field below, and — for a declared
 * icon — in the tool, provider and bridge-row declarations that accept one.
 * Declared icons need no frontend bundle and survive the plugin being stopped;
 * registrations can be any React component but live only while the plugin's
 * app bundle is loaded.
 */
type BbIconName = string;
/**
 * Owner-defined validator for a fixed tab's transient target. The host first
 * verifies that the value is JSON-safe, then calls this validator before
 * selecting the tab or delivering the target.
 */
interface ExperimentalFixedTabTargetContract<Target extends JsonValue$1> {
    validate(value: JsonValue$1): value is Target;
}
/** Stable, owner-scoped reference used by the app-panel controller. */
type ExperimentalPluginFixedTabReference<Target extends JsonValue$1 = never> = {
    /** The owning `navPanel` id; validated against the containing registration. */
    readonly panelId: string;
    /** Unique within the owning nav panel; letters, digits, `-`, `_`. */
    readonly id: string;
} & ([Target] extends [never] ? {
    /** An untargeted tab cannot be opened with a target. */
    readonly experimental_target?: never;
} : {
    /** Owner validation required before the host delivers a target. */
    readonly experimental_target: ExperimentalFixedTabTargetContract<Target>;
});
/** A fixed tab declared by a plugin nav panel. */
type PluginFixedTabRegistration<Target extends JsonValue$1 = never> = ExperimentalPluginFixedTabReference<Target> & {
    title: string;
    icon: BbIconName;
    component: ComponentType<PluginNavPanelProps>;
    /** `flush` lets the component own padding and scrolling. */
    layout?: "flush" | "padded";
};
/** A fixed tab with either no target or an owner-validated JSON target. */
type PluginFixedTabDeclaration = PluginFixedTabRegistration | PluginFixedTabRegistration<JsonValue$1>;
interface PluginNavPanelRegistration {
    /** Unique within the plugin; letters, digits, `-`, `_`. */
    id: string;
    title: string;
    icon: BbIconName;
    /** URL segment under `/plugins/<pluginId>/`; letters, digits, `-`, `_`. */
    path: string;
    component: ComponentType<PluginNavPanelProps>;
    /**
     * Ordered, non-closable tabs shown in this page's host-owned right panel.
     * BB owns selection and persistence and always includes its native Browser
     * and Terminal tools beside them. One tab is active in each visible split
     * pane, so multiple fixed-tab components can be mounted concurrently. A
     * component mounts only while its tab is active in a visible pane and the
     * panel is open, and receives the same `subPath` as the page component.
     *
     * Experimental: see docs/api_to_audit.md.
     */
    fixedTabs?: readonly PluginFixedTabDeclaration[];
    /**
     * Optional presentational component rendered at the trailing edge of this
     * panel's sidebar row. It receives no props so it can own a narrow live
     * value through the ordinary SDK hooks without coupling that state to the
     * host sidebar. The host does not mount it on compact viewports and clips it
     * to a small, single-line box on wider viewports. It shares the trailing
     * action column, fading out for the host's options button on hover or focus;
     * do not render controls or rely on unbounded content here.
     *
     * Experimental: see docs/api_to_audit.md.
     */
    experimental_sidebarAccessory?: ComponentType;
    /**
     * Optional component rendered on the right side of the shared title bar
     * (e.g. a sync button or a count). Contained separately from the body: a
     * throwing headerContent is hidden without breaking the title bar.
     */
    headerContent?: ComponentType<PluginNavPanelProps>;
}
/**
 * What a plugin action passes when it asks the host to open one of its panel
 * tabs. Shared by every `openPanel` entry point so a plugin registering more
 * than one kind of action can write a single open routine;
 * `PluginTargetedPanelActionOpenOptions` adds the `actionId` a caller
 * outside a panel action must pass to name the panel it wants.
 */
interface PluginPanelActionOpenOptions {
    /** Tab label. Default: the action's `title`. */
    title?: string;
    /**
     * Persisted with the tab and handed to the component as its `params` prop.
     * Must be a JSON value; anything else is a declined open.
     */
    params?: JsonValue$1;
}
/**
 * Context handed to a `threadPanelAction`'s `run`.
 *
 * The action is thread-only and is never offered on the root New thread
 * screen, so `threadId` is always present.
 */
interface PluginThreadPanelActionContext {
    /** The thread whose panel launcher invoked the action. */
    threadId: string;
    /**
     * Open a tab in the thread's side panel rendering this action's
     * `component`. `title` labels the tab (default: the action's `title`);
     * `params` must be JSON-serializable — it is persisted with the tab and
     * reaches the component as its `params` prop. Opening with params
     * identical to an already-open tab of this action focuses that tab
     * (updating its title) instead of duplicating it. May be called more than
     * once (different params ⇒ multiple tabs) or not at all.
     *
     * Returns true when the host accepted the open; false when it declined —
     * from this launcher, only a `params` that is not a JSON value. The true /
     * false contract is shared with `messageAction`'s `openPanel` and
     * `useBbNavigate().openThreadPanel` (which decline for more reasons) so one
     * open routine can serve every action kind. A decline is never thrown: the
     * host logs it and reports it here.
     */
    openPanel(options?: PluginPanelActionOpenOptions): boolean;
}
interface PluginThreadPanelActionRegistration {
    /** Unique within the plugin; letters, digits, `-`, `_`. */
    id: string;
    /** Label of the action row in the panel's new-tab launcher. */
    title: string;
    /**
     * Drawn only when the manifest declares no `bb.branding.icon`; the launcher
     * row and opened tabs prefer that over this hint.
     */
    icon?: BbIconName;
    /** Rendered inside every panel tab this action opens. */
    component: ComponentType<PluginThreadPanelProps>;
    /**
     * How the host frames the tab content. "padded" (default) wraps the
     * component in the panel's scroll container with standard padding —
     * right for document-like content. "flush" gives the component the full
     * tab area (no padding, definite height, no host scrolling) — right for
     * app-like content that manages its own layout, such as
     * `ThreadChat`.
     */
    layout?: "flush" | "padded";
    /**
     * Runs when the user activates the action: call your RPC methods, show a
     * toast, and/or open panel tabs via `context.openPanel`. Omitted =
     * immediately open a panel tab with defaults. Errors (sync or async) are
     * contained and logged; they never break the launcher.
     */
    run?(context: PluginThreadPanelActionContext): void | Promise<void>;
}
/** Context handed to an `experimental_newThreadPanelAction`'s `run`. */
interface PluginNewThreadPanelActionContext {
    /** Project selected in the root composer; null in projectless compose. */
    projectId: string | null;
    /**
     * Open a tab in the root New thread screen's side panel rendering this
     * action's `component`. The title, params, deduplication, return value, and
     * error semantics match `threadPanelAction`.
     */
    openPanel(options?: PluginPanelActionOpenOptions): boolean;
}
/** Registration for the root New thread screen's panel Actions list. */
interface PluginNewThreadPanelActionRegistration {
    /** Unique within this slot for the plugin; letters, digits, `-`, `_`. */
    id: string;
    /** Label of the action row in the panel's new-tab launcher. */
    title: string;
    /** Drawn only when the manifest declares no `bb.branding.icon`. */
    icon?: BbIconName;
    /** Rendered inside every panel tab this action opens. */
    component: ComponentType<PluginNewThreadPanelProps>;
    /** Host framing; matches `threadPanelAction`. */
    layout?: "flush" | "padded";
    /**
     * Runs when the user activates the action. Omitted = immediately open a
     * panel tab with defaults. Errors are contained and logged.
     */
    run?(context: PluginNewThreadPanelActionContext): void | Promise<void>;
}
interface PluginPendingInteractionRegistration {
    /**
     * The renderer's plugin-local name. Two addresses resolve to it: the
     * `rendererId` a backend passes to `bb.ui.requestInput`, and the `<name>`
     * half of a provider bridge's `interaction/request` kind
     * `"<pluginId>/<name>"` (docs/provider-plugin-api.md §4), which the client
     * splits on the slash to find this registration under its plugin.
     * `bb.ui.requestInput` validates `rendererId` against `/^[a-zA-Z0-9_-]+$/`;
     * an extension kind must match `/^[a-z0-9-]+\/[a-z0-9-]+$/`
     * (`EXTENSION_KIND_PATTERN` in @bb/domain), so an id addressable both ways
     * uses lowercase letters, digits, and "-" only.
     */
    id: string;
    component: ComponentType<PluginPendingInteractionProps>;
}
/** Context handed to a `sidebarFooterAction`'s `run`. */
interface PluginSidebarFooterActionContext {
    /**
     * Navigate to this plugin's detail page in Tools, where declarative settings
     * and `settingsSection` slots render.
     */
    openSettings(): void;
}
/**
 * An icon button in the app sidebar footer (next to Settings / bug report).
 * Host-rendered for consistent chrome — plugins supply icon, label, and
 * `run` behavior only.
 */
interface PluginSidebarFooterActionRegistration {
    /** Unique within the plugin; letters, digits, `-`, `_`. */
    id: string;
    /** Tooltip and accessible label for the icon button. */
    title: string;
    /** Drawn only when the manifest declares no `bb.branding.icon`. */
    icon: BbIconName;
    /**
     * Runs when the user activates the action (e.g. call `openSettings()`,
     * open a panel via other surfaces, toast). Errors (sync or async) are
     * contained and logged; they never break the sidebar.
     */
    run(context: PluginSidebarFooterActionContext): void | Promise<void>;
}
/** Context handed to an experimental sidebar-footer action. */
interface ExperimentalSidebarFooterActionContext {
    /** Navigate to this plugin's detail page in Tools. */
    openPluginDetails(): void;
}
/** Fields shared by both experimental sidebar-footer item behaviors. */
interface ExperimentalSidebarFooterItemBase {
    /** Unique within the plugin's unified sidebar footer; letters, digits, `-`, `_`. */
    id: string;
    /** Tooltip and accessible label for the host-rendered icon button. */
    label: string;
    icon: BbIconName;
}
/** A sidebar-footer item that runs a callback when activated. */
interface ExperimentalSidebarFooterActionRegistration extends ExperimentalSidebarFooterItemBase {
    kind: "action";
    onActivate(context: ExperimentalSidebarFooterActionContext): void | Promise<void>;
}
/** A sidebar-footer item that reveals plugin-rendered content above the row. */
interface ExperimentalSidebarFooterDisclosureRegistration extends ExperimentalSidebarFooterItemBase {
    kind: "disclosure";
    component: ComponentType<ExperimentalSidebarFooterDisclosureProps>;
}
/** One host-rendered item in the app sidebar footer. */
type ExperimentalSidebarFooterItemRegistration = ExperimentalSidebarFooterActionRegistration | ExperimentalSidebarFooterDisclosureRegistration;
/** Live controls for an experimental sidebar-footer disclosure. */
interface ExperimentalSidebarFooterDisclosureController {
    /** Request that the host open this disclosure, replacing any open sibling. */
    open(): void;
    /** Close this disclosure if it is currently open. */
    close(): void;
    /** Open this disclosure, or close it when it is currently open. */
    toggle(): void;
}
/** Managed registration surface for items in the app sidebar footer. */
interface ExperimentalSidebarFooter {
    register(registration: ExperimentalSidebarFooterActionRegistration): void;
    register(registration: ExperimentalSidebarFooterDisclosureRegistration): ExperimentalSidebarFooterDisclosureController;
}
/**
 * The one status bb would paint for a thread, already resolved through the
 * host's precedence (attention before work; plan and goal before the generic
 * spinner). Draw your own glyph for it — the SDK ships no status component.
 *
 * Treat an unrecognized value as "none": bb adds kinds over time, and an
 * older plugin must degrade to drawing nothing rather than throwing.
 *
 * "draft" and "working-draft" are never reported here: an unsubmitted composer
 * draft is per-client state the host reads per row, which an array-wide view
 * cannot. A thread holding a draft reports whatever it would report without
 * one. "queued-failed" and "queued-waiting" are reported, with the same
 * precedence bb's list uses (a failed send outranks the unread dot; a waiting
 * message ranks just below it).
 */
type PluginSidebarThreadIndicator = "background-agent" | "background-command" | "draft" | "goal" | "none" | "plan-mode" | "queued-failed" | "queued-waiting" | "runtime" | "unread-error" | "unread-success" | "waiting-for-input" | "workflow" | "working-draft";
/** Live work counts on a thread. All zero means nothing is running. */
interface PluginSidebarThreadActivity {
    workflows: number;
    backgroundAgents: number;
    backgroundCommands: number;
    planMode: number;
    goals: number;
}
/**
 * One thread in the sidebar's live view.
 *
 * A deliberate copy of the fields a sidebar needs — not a re-export of the
 * host's internal thread row type, which changes whenever the app needs a
 * field. Timestamps are epoch milliseconds.
 */
interface PluginSidebarThread {
    id: string;
    projectId: string;
    /** Null while a thread is still unnamed; pair with `titleFallback`. */
    title: string | null;
    titleFallback: string | null;
    /**
     * What bb shows for this thread as plain text: `title`, else
     * `titleFallback`, else a short id, with any `@project:`, `@section:`, and
     * `@thread:` mentions in it resolved to their names. Sort on it and use it
     * for accessible names; render {@link PluginSdkApp.ThreadTitle} for the
     * same text with mention chips.
     */
    displayTitle: string;
    /** The thread this one was forked from or spawned under; null at the root. */
    parentThreadId: string | null;
    /**
     * The thread whose lifecycle this one follows (a delegated child stops
     * when its owner stops); null when the thread owns its own lifecycle.
     */
    lifecycleOwnerThreadId: string | null;
    /** The thread this one was forked from; null unless `originKind` is "fork". */
    sourceThreadId: string | null;
    sectionId: string | null;
    /** How this thread came to exist under its parent; null for root threads. */
    originKind: "fork" | null;
    /** The plugin that spawned it, or null for non-plugin origins. */
    originPluginId: string | null;
    /** The agent provider this thread runs on; resolve it through
     * {@link PluginSdkApp.experimental_useProviders} for a name and icon. */
    providerId: string;
    /**
     * The thread's execution status. bb's list sorts busy threads ("starting",
     * "active", "stopping") above idle ones. Treat an unknown value as "idle".
     */
    status: ThreadStatus;
    /**
     * `status` refined by host and environment state: adds "provisioning",
     * "host-reconnecting", and "waiting-for-host" for a thread whose machine is
     * not ready. Treat an unknown value as `status`.
     */
    runtimeStatus: ThreadRuntimeDisplayStatus;
    /**
     * Whether a message is queued behind the running turn ("waiting") or a
     * queued message failed to send ("failed"). "none" otherwise.
     */
    queuedWork: ThreadQueuedWork;
    /** The agent is blocked on the user: an approval or a question. */
    hasPendingInteraction: boolean;
    activity: PluginSidebarThreadActivity;
    indicator: PluginSidebarThreadIndicator;
    /**
     * The host's accessible label for `indicator`, e.g. "Thread needs user
     * input"; null when the indicator is "none". Use it for `aria-label` so
     * screen-reader text stays consistent across sidebars.
     */
    indicatorLabel: string | null;
    isUnread: boolean;
    isPinned: boolean;
    /** When the thread was pinned (epoch ms); null when unpinned. */
    pinnedAt: number | null;
    /**
     * The user's manual order among pinned threads (lexicographic, ascending);
     * null for an unpinned thread or a pin that has never been reordered, which
     * bb's list sorts after keyed pins by `pinnedAt`.
     */
    pinSortKey: string | null;
    isArchived: boolean;
    /** When the thread was archived (epoch ms); null when not archived. */
    archivedAt: number | null;
    /**
     * The app-relative URL bb opens for this thread, e.g.
     * `/projects/<projectId>/threads/<id>`. Put it on your row's anchor: the
     * host routes a plain click in place, and middle-click, copy-link, and
     * open-in-new-window work without further code.
     */
    href: string;
    /**
     * True for threads bb keeps out of its own list (internal helper threads a
     * plugin spawned with `visibility: "hidden"`). The array includes them so a
     * list that wants them can show them; bb's list filters them out.
     */
    isHidden: boolean;
    environment: {
        id: string | null;
        name: string | null;
        branchName: string | null;
        /** The checkout's absolute path on its host; null when unknown. */
        path: string | null;
        /**
         * True when the environment is a git worktree, which is what bb's
         * "group by environment" clusters; false for a plain checkout; null when
         * unknown.
         */
        isWorktree: boolean | null;
        /**
         * The id of the environment provider that produced this environment, or
         * null for a project's own checkout. Resolve it against
         * `GET /system/environment-providers` for a display name and icon.
         */
        providerId: string | null;
        /** @deprecated Use providerId and the environment provider catalog instead. */
        workspaceDisplayKind: EnvironmentWorkspaceDisplayKind | null;
    } | null;
    /**
     * The machine this thread's work runs on, with the name resolved for you.
     * Null when the thread has no environment yet, or when its host is not in
     * the known-hosts list. Useful where a thread has no branch to show — a
     * personal-project thread has a machine but no worktree.
     */
    host: {
        id: string;
        name: string;
    } | null;
    createdAt: number;
    updatedAt: number;
    lastReadAt: number | null;
    latestAttentionAt: number;
}
/**
 * The pull request for a thread's branch, narrowed to what a sidebar row
 * needs. `attention` is bb's rolled-up "does this need you" signal, so a row
 * can colour a badge without reading checks, review, and mergeability itself.
 */
interface PluginSidebarPullRequest {
    number: number;
    title: string;
    url: string;
    state: "closed" | "draft" | "merged" | "open";
    attention: "blocked" | "changes_requested" | "checks_failed" | "checks_pending" | "closed" | "conflicts" | "draft" | "merged" | "none" | "ready_to_merge" | "review_requested";
}
interface PluginSidebarThreadPullRequestState {
    /** True while the first lookup for this thread's environment is in flight. */
    isLoading: boolean;
    /**
     * The pull request, or null when the branch has none, the thread has no
     * environment, or the lookup could not run (a git-host hiccup). A row should
     * treat null as "nothing to show", never as an error.
     */
    pullRequest: PluginSidebarPullRequest | null;
}
/** One project in the sidebar's live view. */
interface PluginSidebarProject {
    id: string;
    name: string;
    /** True for the implicit personal project. */
    isPersonal: boolean;
    /** The app-relative URL of the project's compose screen. */
    href: string;
    /** The app-relative URL of the project's settings page. */
    settingsHref: string;
}
/**
 * One user-named thread section ("Later", "Slop Cop") in the sidebar's live
 * view. A thread belongs to at most one section via `sectionId`; a null
 * `sectionId` means the loose "Threads" bucket. Sections are created,
 * renamed, and deleted through the public API (`threadSections` in the SDK,
 * `bb thread section` in the CLI); this state is the read side.
 */
interface PluginSidebarSection {
    id: string;
    name: string;
    /** Epoch milliseconds. */
    createdAt: number;
    updatedAt: number;
}
interface PluginSidebarThreadsState {
    /** Null when archived threads were not requested. */
    experimental_archived: {
        status: "error" | "loading" | "ready";
        hasNextPage: boolean;
        isFetchingNextPage: boolean;
        isFetchNextPageError: boolean;
        fetchNextPage(): Promise<void>;
    } | null;
    status: "error" | "loading" | "ready";
    threads: readonly PluginSidebarThread[];
    projects: readonly PluginSidebarProject[];
    /** Every section, in the server's order (creation order). */
    sections: readonly PluginSidebarSection[];
}
/**
 * The provider directory (see {@link PluginSdkApp.experimental_useProviders}):
 * every registered agent provider in picker order, as the same `ProviderInfo`
 * the host's own pickers read. `logoUrl` is server-relative
 * (`/api/v1/system/providers/<id>/logo`) or null when the provider declared a
 * glyph or no icon; `strings` carries the provider's declared copy.
 */
interface PluginProvidersState {
    status: "error" | "loading" | "ready";
    providers: readonly ProviderInfo[];
}
/**
 * One TextMate token rule from the active code theme, in the shape VS Code
 * theme files author it.
 */
interface PluginCodeThemeTokenRule {
    /** Scope(s) the rule paints; absent means the theme's base rule. */
    scope?: string | readonly string[];
    settings: {
        /** `#rrggbb` or `#rrggbbaa`. */
        foreground?: string;
        background?: string;
        /** Space-separated TextMate font styles, e.g. `"bold italic"`. */
        fontStyle?: string;
    };
}
/**
 * The active code theme as a VS Code theme file: the same document BB's own
 * highlighter renders from, so a plugin that embeds a third-party editor can
 * translate it into that editor's theme format rather than guessing colors
 * from CSS variables.
 */
interface PluginCodeThemeData {
    /** Registered theme name — a bundled Shiki name or a BB-registered id. */
    name: string;
    type: "dark" | "light";
    /** Default editor foreground, as `#rrggbb[aa]`. */
    fg: string;
    /** Default editor background, as `#rrggbb[aa]`. */
    bg: string;
    /** VS Code workbench colors (`editor.background`, `editorCursor.foreground`, …). */
    colors: Readonly<Record<string, string>>;
    tokenColors: readonly PluginCodeThemeTokenRule[];
}
/**
 * The code theme BB is currently rendering with (see
 * {@link PluginSdkApp.experimental_useCodeTheme}). `mode` and `name` change
 * the moment the user switches palette or light/dark; `theme` follows once
 * the theme file resolves, and keeps the previous document until then so a
 * consumer never has to paint an unthemed frame. Compare `theme.name` with
 * `name` to tell a settled state from one still resolving.
 */
interface PluginCodeThemeState {
    mode: "dark" | "light";
    name: string;
    /** null only before the first theme file resolves. */
    theme: PluginCodeThemeData | null;
}
/**
 * The `threads` area of {@link PluginBrowserBbSdk}: bb's public thread API
 * with the calling plugin's identity filled in. `spawn` and `fork` stamp
 * `origin: "plugin"` and `originPluginId` unless the call names another
 * origin, and the plugin-metadata calls default `pluginId`. The same
 * narrowing the backend `bb.sdk` applies.
 */
type PluginBoundThreadsArea = Omit<BbSdkAreas["threads"], "getPluginMetadata" | "updatePluginMetadata"> & {
    getPluginMetadata(args: Omit<ThreadPluginMetadataArgs, "pluginId"> & {
        pluginId?: string;
    }): Promise<ThreadPluginMetadataResult>;
    updatePluginMetadata(args: Omit<ThreadPluginMetadataUpdateArgs, "pluginId"> & {
        pluginId?: string;
    }): Promise<ThreadPluginMetadataResult>;
};
/**
 * bb's public API client, bound to the calling plugin, for plugin frontends
 * (see {@link PluginSdkApp.useSdk}). The same areas the `bb` CLI and the
 * backend `bb.sdk` expose: threads, thread sections, projects, environments,
 * hosts, files, and the rest. Requests carry the signed-in user's session on
 * the app origin, so every call runs with the user's own authority; there
 * is no narrower plugin scope.
 */
type PluginBrowserBbSdk = Omit<BbSdkAreas, "threads"> & {
    threads: PluginBoundThreadsArea;
};
/** Props for {@link PluginSdkApp.ThreadTitle}. */
interface PluginThreadTitleProps {
    /** A thread in the sidebar's live view; renders nothing for an unknown id. */
    threadId: string;
}
/**
 * One environment provider from bb's catalog (see
 * {@link PluginSdkApp.useEnvironmentProviders}): what a sidebar needs to
 * name and draw the environment a thread runs in. `icon` and `logoUrl` are
 * what `experimental_ProviderIcon` reads with `providerKind: "environment"`.
 */
interface PluginEnvironmentProvider {
    id: string;
    displayName: string;
    description: string | null;
    icon: string | null;
    logoUrl: string | null;
    /** The plugin that registered the provider. */
    pluginId: string;
    /** The machine provider it runs on, or null for the local machine. */
    machineProviderId: string | null;
}
interface PluginEnvironmentProvidersState {
    status: "error" | "loading" | "ready";
    providers: readonly PluginEnvironmentProvider[];
}
/**
 * Whether the composer holds unsent text for a thread (see
 * {@link PluginSdkApp.useSidebarThreadDraft}). This is per-client state, so
 * it lives beside `indicator` rather than in it: bb's row paints a pencil for
 * an idle thread with a draft and a "working-draft" glyph for a busy one.
 */
interface PluginSidebarThreadDraftState {
    hasUnsubmittedDraft: boolean;
}
/**
 * The status another plugin's app-wide script set on a thread's row through
 * `useComposer().experimental_setThreadRowStatus` (see
 * {@link PluginSdkApp.useSidebarThreadRowStatus}). bb's row draws it in
 * place of the draft glyph while it is set; a replaced list should do the
 * same so a status set by, say, the drafts or workflows plugin does not
 * vanish when the list changes hands.
 */
type PluginSidebarThreadRowStatus = PluginComposerThreadRowStatus;
/**
 * The jump-to-thread shortcut bb assigned to a row while the app command
 * modifier is held (see {@link PluginSdkApp.useSidebarThreadShortcut}).
 */
interface PluginSidebarThreadShortcut {
    /** Human-readable key label, e.g. "⌘1", for a pill on the row. */
    label: string;
    /** Value for the row's `aria-keyshortcuts` attribute. */
    ariaKeyshortcuts: string;
}
/**
 * Act on threads from a plugin surface. Every method routes to the host's own
 * flow, so optimistic updates, toasts, dialogs, pane closing, and route repair
 * behave exactly as they do in the built-in sidebar. Unknown thread ids are
 * ignored by `open` and rejected by the rest.
 */
interface PluginSidebarThreadActions {
    /**
     * Navigate to a thread. `split: true` applies bb's split placement rules —
     * a right split by default, focus when the thread is already open, replace
     * at the pane cap — and falls back to plain navigation where splits are off.
     * Opening also expands the thread's conversation if the secondary panel had
     * collapsed it, as bb's own row does.
     */
    open(threadId: string, options?: {
        split?: boolean;
    }): void;
    /**
     * Go to the new-thread screen. Passing `projectId` also makes that project
     * the composer's selection, so the thread is created where you asked.
     * `sectionId` files the new thread under that section, and
     * `environmentId` reuses that environment (the "New thread in
     * environment" affordance), both exactly as bb's own list does.
     */
    openNewThread(options?: {
        projectId?: string;
        sectionId?: string;
        environmentId?: string;
        focusPrompt?: boolean;
    }): void;
    setPinned(threadId: string, pinned: boolean): Promise<void>;
    setRead(threadId: string, read: boolean): Promise<void>;
    /** Silent rename — no dialog. For inline editing in your own row. */
    rename(threadId: string, title: string): Promise<void>;
    /** Archives the thread AND its children, closing any panes showing them. */
    archive(threadId: string): void;
    /**
     * Opens bb's delete confirmation, which counts child threads first. Deletion
     * is destructive and recursive, so the host owns the confirmation: there is
     * deliberately no silent `delete`.
     */
    requestDelete(threadId: string): void;
}
/**
 * Render a plugin component in the thread header's action row.
 *
 * The frontend sibling of the backend `bb.ui.registerThreadAction`, which
 * renders a host-owned button and runs server-side. Use that one for "do a
 * thing"; use this one when the control must draw live state.
 *
 * The host places it at the left end of the action row, before the workspace
 * button, git actions, the panel toggle, maximize, and close. That row is a
 * 48px chrome row with 28px controls: render one inline control that fits, and
 * put anything taller in a portalled popover.
 */
interface PluginThreadHeaderActionRegistration {
    /** Unique within the plugin; letters, digits, `-`, `_`. */
    id: string;
    /**
     * Names the region the host wraps around your component (a labelled group).
     * It does NOT label your control: an icon-only button still needs its own
     * accessible name.
     */
    title: string;
    component: ComponentType<PluginThreadHeaderActionProps>;
}
interface ExperimentalPluginBrowserToolbarActionRegistration {
    /** Unique within the plugin; letters, digits, `-`, `_`. */
    id: string;
    /** Accessible name for the host-wrapped control group. */
    title: string;
    /** Component rendered beside the Browser address bar. */
    component: ComponentType<ExperimentalPluginBrowserToolbarActionProps>;
}
/** One pane's place in the split layout, as fractions of the split area. */
interface PluginSidebarSplitPane {
    paneId: string;
    rect: {
        x: number;
        y: number;
        width: number;
        height: number;
    };
    /** This pane holds the thread the row represents. */
    isMe: boolean;
    isFocused: boolean;
}
/**
 * The whole split layout (see {@link PluginSdkApp.useSidebarSplitLayout}):
 * every pane with its rect as fractions of the split area and the thread it
 * shows, or null when there is no split (a single pane, a compact viewport,
 * or splits disabled). Use it for group rollups, a collapsed section that
 * should show where its threads are open; a row wants
 * `experimental_useSidebarThreadSplit` instead.
 */
interface PluginSidebarSplitLayout {
    panes: readonly {
        paneId: string;
        rect: {
            x: number;
            y: number;
            width: number;
            height: number;
        };
        /** The thread this pane shows, or null for non-thread content. */
        threadId: string | null;
        isFocused: boolean;
    }[];
}
/**
 * Drag-to-split support for one row, plus where that thread currently sits in
 * the split layout.
 */
interface PluginSidebarThreadSplit {
    /**
     * Spread onto the row's interactive element. Carries the pointer handler
     * that starts a split drag; empty when splits are unavailable, so spreading
     * it is always safe.
     *
     * The host owns every rule: the gesture engages only once the pointer leaves
     * the sidebar toward the main area (so a list with its own drag-to-reorder
     * keeps working), an edge drop splits, a center drop replaces, an
     * already-open thread focuses its pane, and the pane cap coerces a split
     * into a replace.
     */
    splitProps: {
        onPointerDown?: (event: react.PointerEvent<HTMLElement>) => void;
    };
    /**
     * False on compact viewports, when the user disabled splits, and for an
     * unknown thread id. Gate any "open in split" affordance you draw on it.
     */
    isAvailable: boolean;
    /**
     * Where this thread sits in the split layout, or null when it is not open in
     * one (including single-pane layouts). Draw a mini-map, a tint, or nothing.
     */
    layout: {
        panes: readonly PluginSidebarSplitPane[];
    } | null;
}
/**
 * Replace the sidebar's thread list with a plugin component.
 *
 * Unlike every other slot, this one is EXCLUSIVE: two lists cannot share one
 * scroll area. Registering activates the replacement while the plugin is
 * enabled. If multiple plugins register one, the first in deterministic slot
 * order is active by default; removing it reveals the next. The user can pin
 * BB's list or a specific provider under Settings → Appearance. A plugin can
 * also use its own setting and render `Original` conditionally.
 * An absent or crashing replacement falls back to BB's list rather than
 * leaving the user with no sidebar.
 *
 * The plugin gets the scrolling list and nothing else. The New-thread button,
 * the search action, the plugin nav rows, and the footer stay host-rendered in
 * every sidebar — they are shared surfaces (other plugins live in two of
 * them), and a replaced list must not be able to remove them.
 */
interface PluginThreadListRegistration {
    /** Unique within the plugin; letters, digits, `-`, `_`. */
    id: string;
    /** Label shown in Settings → Appearance and capability details. */
    title: string;
    /** Optional one-line description shown with the provider choice. */
    description?: string;
    component: ComponentType<PluginThreadListProps>;
}
/** Replace the bounded navigation controls above the sidebar thread list. */
interface ExperimentalSidebarNavigationRegistration {
    /** Unique within the plugin; letters, digits, `-`, `_`. */
    id: string;
    /** Label shown in Settings → Appearance and capability details. */
    title: string;
    /** Optional one-line description shown with the provider choice. */
    description?: string;
    component: ComponentType<ExperimentalSidebarNavigationProps>;
}
/**
 * Register this plugin as a viewer/editor for file extensions. By default,
 * matching files render the first applicable opener in deterministic slot
 * order. The user can pin BB's preview or a specific opener per extension
 * under Settings → Files. The file tab's "Open with" menu can override that
 * choice for one open. A plugin can also use its own setting and render
 * `Original` conditionally. Applies to working-tree, host, and
 * thread-storage files — never to git-ref snapshots (diff views always use
 * BB's preview).
 */
interface PluginFileOpenerRegistration {
    /** Unique within the plugin; letters, digits, `-`, `_`. */
    id: string;
    /** Label in the "Open with" menu (e.g. "Notes editor"). */
    title: string;
    /** Lowercase extensions without the dot (e.g. ["md", "mdx"]). */
    extensions: readonly string[];
    component: ComponentType<PluginFileOpenerProps>;
}
/**
 * Replace BB's source-code renderer everywhere it renders supplied source
 * text — the native file preview and every plugin that calls
 * `experimental_SourceCode`. Like `experimental_threadList` this slot is
 * **exclusive**: one renderer at a time. Registering activates it while the
 * plugin is enabled; if several are registered the first in deterministic slot
 * order wins. A missing, disabled, or crashing replacement falls back to BB's
 * renderer, and a replacement can render `Original` to delegate
 * per call (behind its own setting, by language, by size — whatever it needs).
 */
interface PluginSourceCodeRendererRegistration {
    /** Unique within the plugin; letters, digits, `-`, `_`. */
    id: string;
    /** Label shown in capability details. */
    title: string;
    /** Optional one-line description shown with the provider choice. */
    description?: string;
    component: ComponentType<PluginSourceCodeRendererProps>;
}
/**
 * Replace BB's diff renderer everywhere it renders supplied diff content — the
 * timeline file diffs, the environment diff panel's text bodies, and every
 * plugin that calls `experimental_Diff`. Exclusive, with the same activation,
 * fallback, and `Original` delegation rules as
 * {@link PluginSourceCodeRendererRegistration}.
 */
interface PluginDiffRendererRegistration {
    /** Unique within the plugin; letters, digits, `-`, `_`. */
    id: string;
    /** Label shown in capability details. */
    title: string;
    /** Optional one-line description shown with the provider choice. */
    description?: string;
    component: ComponentType<PluginDiffRendererProps>;
}
/**
 * Register a leaf message directive rendered inside assistant (and nested
 * agent) message Markdown. `id` is the directive name: `inline-vis` matches
 * `::inline-vis{file="demo.html"}`.
 */
interface PluginMessageDirectiveRegistration {
    /**
     * The directive name. Lowercase kebab-case beginning with a letter.
     */
    id: string;
    component: ComponentType<PluginMessageDirectiveProps>;
}
/**
 * A narrow, stable reference to one rendered chat message — NOT an internal
 * timeline row. `sourceSeqEnd` is the last source event sequence the message
 * covers, the anchor the server accepts for provider-history forks.
 */
interface ThreadChatMessageReference {
    id: string;
    threadId: string;
    role: "assistant" | "user";
    /** Visible text of the message. */
    text: string;
    sourceSeqEnd: number;
}
/**
 * What a caller that is *not* itself a panel action passes to open one — a
 * `messageAction`'s `run`, or any component via `useBbNavigate()`. A panel
 * action opening its own tab is already the target, so it passes the bare
 * {@link PluginPanelActionOpenOptions} instead.
 */
interface PluginTargetedPanelActionOpenOptions extends PluginPanelActionOpenOptions {
    /** A `threadPanelAction` id registered by this same plugin. */
    actionId: string;
}
/** Context handed to a `messageAction`'s `run`. */
interface PluginMessageActionContext {
    /** The thread whose timeline surfaced the action. */
    threadId: string;
    message: ThreadChatMessageReference;
    /**
     * Present only when the action was invoked from the text-selection menu;
     * the exact text the user highlighted inside `message`.
     */
    selectedText?: string;
    /**
     * Open one of this plugin's `threadPanelAction` components in the current
     * thread's side panel — the registration-callback equivalent of
     * `useBbNavigate().openThreadPanel`.
     *
     * Returns true when the host accepted the open; false when it declined —
     * `params` was not a JSON value, the action id names no `threadPanelAction`
     * of this plugin, or the surface has no side panel (only the main thread
     * view does; a `ThreadChat` embedded in a plugin panel does not). A decline
     * is never thrown: the host logs it and reports it here.
     */
    openPanel(options: PluginTargetedPanelActionOpenOptions): boolean;
}
/**
 * An action on chat messages: an icon button in the per-message action bar
 * (user and assistant messages) and an entry in the assistant-message
 * text-selection menu. Host-rendered chrome — the plugin supplies title,
 * icon hint, and `run` behavior only.
 */
interface PluginMessageActionRegistration {
    /** Unique within the plugin; letters, digits, `-`, `_`. */
    id: string;
    /** Tooltip / menu label for the action. */
    title: string;
    icon?: BbIconName;
    /**
     * Runs when the user activates the action. Errors (sync or async) are
     * contained and logged; they never break the timeline.
     */
    run(context: PluginMessageActionContext): void | Promise<void>;
}
/** Current context for palette and keyboard command invocations. */
interface PluginCommandContext {
    /** The thread in view, or null on a surface without one. */
    threadId: string | null;
    projectId: string | null;
    /**
     * Open one of this plugin's `threadPanelAction` components in the current
     * thread's side panel, exactly as `messageAction`'s `openPanel` does.
     *
     * Returns true when the host accepted the open; false when it declined —
     * `params` was not a JSON value, the action id names no `threadPanelAction`
     * of this plugin, or the surface has no side panel. Only the main thread
     * view has one, and the palette opens anywhere, so guard with `isAvailable`
     * rather than assuming.
     */
    openPanel(options: PluginTargetedPanelActionOpenOptions): boolean;
}
/** A default keyboard shortcut. Omitted modifiers are false. */
interface PluginCommandShortcut {
    key: string;
    /** Command on macOS, Control elsewhere. */
    mod?: boolean;
    meta?: boolean;
    control?: boolean;
    alt?: boolean;
    shift?: boolean;
}
/**
 * A command registered with `app.commands.register`, listed in bb's quick
 * palette (Mod+Shift+P) under the plugin's name
 * beside bb's own commands. Host-rendered: the plugin supplies a title and
 * `run`, and the host owns matching, ordering, and recency.
 */
interface PluginCommandRegistration {
    /** Initial keyboard binding. Users can rebind every command, including ones without a default. Conflicting defaults remain unbound. */
    defaultShortcut?: PluginCommandShortcut;
    /** Unique within the plugin; letters, digits, `-`, `_`. */
    id: string;
    /** The row's label, e.g. "Linear: open issue for this thread". */
    title: string;
    /**
     * Hide the row when it cannot do anything — typically when it needs a thread
     * and there is none. Called before palette listing and keyboard invocation;
     * keep it cheap and synchronous. Omitted means always listed.
     */
    isAvailable?(context: PluginCommandContext): boolean;
    /**
     * Runs on keyboard invocation, or after the palette closes and focus is
     * restored. Errors (sync or async) are contained and logged; they never break the palette.
     */
    run(context: PluginCommandContext): void | Promise<void>;
}
/** Registers commands for bb's command palette. */
interface PluginAppCommands {
    /** Register a command. IDs are unique within this plugin, including legacy slot registrations. */
    register(registration: PluginCommandRegistration): void;
}
/**
 * Supply an inline React mark for a provider. Agent, machine, and environment
 * icon renderers select the mark by provider kind and id.
 * Only surfaces using the provider icon renderer consult this slot. Persistent
 * machine labels use a laptop glyph directly.
 *
 * Provider logo assets use a currentColor mask. Inline components can also
 * render multiple colors and inherit the app's theme and sizing classes.
 *
 * The host passes `className` for sizing; color inherits from its wrapper.
 * the component must render an inline SVG (or other inline markup) and must
 * not fetch. One registration per provider kind and id per plugin; when two
 * plugins claim the same pair the host keeps the first by plugin id and warns.
 */
interface PluginProviderIconRegistration {
    providerKind: "agent" | "environment" | "machine";
    /**
     * The provider this mark is for — the id bb knows the provider by (the
     * provider declaration's id, e.g. `codex` or `acp-cursor`), not the plugin
     * id. Letters, digits, `-`, `_`.
     */
    providerId: string;
    /** Inline, theme-aware mark. Receives the host's sizing/color className. */
    icon: ComponentType<{
        className?: string;
    }>;
}
/**
 * The declarative presentation persisted with a timeline item (docs/
 * provider-plugin-api.md §3): what every client renders when no plugin code
 * is present. A renderer receives it so it can reuse the bridge's label,
 * glyph and tint instead of re-deriving them from the payload.
 */
interface PluginTimelineRowPresentation {
    label: {
        pending: string;
        completed: string;
    };
    icon: {
        glyph: string;
    };
    title?: string;
    /** Short Markdown, length-capped at ingest. */
    detail?: string;
    suppress?: boolean;
    tint?: {
        light: string;
        dark: string;
    };
}
type PluginTimelineRowStatus = "completed" | "error" | "interrupted" | "pending";
/** The projected row a `experimental_timelineRenderer` component receives. */
interface PluginTimelineRendererRow {
    id: string;
    threadId: string;
    turnId: string | null;
    /**
     * The item kind the renderer registered for: this plugin's extension kind
     * (`"<pluginId>/<name>"`) or `"tool"` for a generic tool item.
     */
    kind: string;
    /** The tool name for a `"tool"` row; null for an extension row. */
    toolName: string | null;
    status: PluginTimelineRowStatus;
    startedAt: number;
    completedAt: number | null;
}
interface PluginTimelineRendererProps {
    row: PluginTimelineRendererRow;
    /**
     * The item's data: an extension item's payload (validated against the
     * plugin's declared schema at ingest), or for a `"tool"` row the call's
     * `{ arguments, output }`.
     */
    payload: JsonValue$1;
    /**
     * The bridge's presentation for the row. Null only for a generic tool row
     * persisted before bridges attached presentation (grammar v2); an
     * extension row always has one.
     */
    presentation: PluginTimelineRowPresentation | null;
    /** The thread the row belongs to. */
    thread: {
        id: string;
        providerId: string | null;
    };
    /**
     * The host's declarative base for this row's body (the presentation's
     * `detail`, or the tool call's arguments and output). Render it to keep
     * the default body beside the plugin's own content.
     */
    Original: ComponentType<Record<never, never>>;
}
/**
 * Render the expanded body of the timeline rows this plugin owns: its own
 * extension item kinds (`"<pluginId>/<name>"`, where `<pluginId>` is this
 * plugin), and `"tool"` for the generic tool items of the providers this
 * plugin registered. Core kinds (message, command, fileChange, fileRead,
 * search, delegation, planSteps, …) always use the core renderers and are
 * customized through the bridge's presentation alone.
 *
 * The row's header — the bridge's label, glyph, tint and headline — stays
 * host-rendered so the timeline reads uniformly; the component owns the
 * body. When no renderer is registered for a kind (the plugin is not loaded,
 * uninstalled, or never shipped an app bundle) the declarative base renders
 * instead, so a row never goes blank. Crashes are contained per row.
 */
interface PluginTimelineRendererRegistration {
    /**
     * `"<pluginId>/<name>"` for one of this plugin's extension kinds, or
     * `"tool"` for the generic tool items of this plugin's providers.
     */
    kind: string;
    component: ComponentType<PluginTimelineRendererProps>;
}
/**
 * Props passed to an `experimental_environmentProviderInputs` component — the
 * control the New Thread environment picker renders beside this plugin's
 * selected environment provider, for the provider's declared `inputs`.
 */
interface PluginEnvironmentProviderInputsProps {
    /** Project selected in the composer; null in projectless compose. */
    projectId: string | null;
    /** Whether setup uses an existing host or provisions a new host before create. */
    target: {
        kind: "existing-host";
        hostId: string;
    } | {
        kind: "new-host";
    };
    /**
     * The `inputs` value the selection will carry: null until `onChange`
     * supplies one.
     * The server parses it with the provider's `inputs` schema at create time,
     * so the component only has to produce a value that schema accepts.
     */
    value: JsonValue$1 | null;
    /**
     * Replace the inputs that will be submitted or block submission with the
     * reason the control should show.
     */
    onChange(next: PluginEnvironmentProviderInputsChange): void;
}
type PluginEnvironmentProviderInputsChange = {
    status: "ready";
    value: JsonValue$1;
} | {
    status: "blocked";
    reason: string;
};
/**
 * Supply the control for one of this plugin's environment providers that
 * declared `inputs` (registered server-side via
 * `bb.experimental_environments.register`). The New Thread environment picker
 * renders the component beside the picker while that provider is selected and
 * submits the component's latest `onChange` value as the selection's `inputs`.
 * A provider whose schema rejects empty inputs cannot be submitted without a
 * registration that reports ready inputs.
 */
interface PluginEnvironmentProviderInputsRegistration {
    /** The environment provider id this control supplies inputs for. */
    environmentProviderId: string;
    component: ComponentType<PluginEnvironmentProviderInputsProps>;
}
/**
 * Props passed to an `experimental_machineProviderInputs` component. Machine
 * inputs are persisted and readable by every plugin, so they must contain only
 * non-secret configuration and references to credentials held in plugin
 * settings.
 */
interface PluginMachineProviderInputsProps {
    /** The value persisted with the machine selection. */
    value: JsonValue$1 | null;
    /** Replace the submitted value or block submission with a visible reason. */
    onChange(next: PluginMachineProviderInputsChange): void;
}
type PluginMachineProviderInputsChange = {
    status: "ready";
    value: JsonValue$1;
} | {
    status: "blocked";
    reason: string;
};
/**
 * Supply the inputs control for one machine provider registered server-side
 * through `bb.experimental_machines.register`.
 */
interface PluginMachineProviderInputsRegistration {
    /** The machine provider id this control supplies inputs for. */
    machineProviderId: string;
    component: ComponentType<PluginMachineProviderInputsProps>;
}
interface PluginAppSlots {
    homepageSection(registration: PluginHomepageSectionRegistration): void;
    settingsSection(registration: PluginSettingsSectionRegistration): void;
    /**
     * Render one app-wide overlay component (see
     * {@link ExperimentalAppOverlayRegistration}). Experimental: see
     * docs/api_to_audit.md.
     */
    experimental_appOverlay(registration: ExperimentalAppOverlayRegistration): void;
    navPanel(registration: PluginNavPanelRegistration): void;
    /**
     * Add an action to an existing thread's panel launcher. This slot is
     * thread-only; use `experimental_newThreadPanelAction` for root compose.
     */
    threadPanelAction(registration: PluginThreadPanelActionRegistration): void;
    /**
     * Add an action to the root New thread screen's panel launcher (see
     * {@link PluginNewThreadPanelActionRegistration}). Experimental: see
     * docs/api_to_audit.md.
     */
    experimental_newThreadPanelAction(registration: PluginNewThreadPanelActionRegistration): void;
    pendingInteraction(registration: PluginPendingInteractionRegistration): void;
    sidebarFooterAction(registration: PluginSidebarFooterActionRegistration): void;
    /** Replace the bounded sidebar navigation controls. */
    experimental_sidebarNavigation(registration: ExperimentalSidebarNavigationRegistration): void;
    /**
     * Replace the sidebar's thread list (see
     * {@link PluginThreadListRegistration}). Experimental: see
     * docs/api_to_audit.md for what to audit before the prefix drops.
     */
    experimental_threadList(registration: PluginThreadListRegistration): void;
    /**
     * Render a component in the thread header's action row (see
     * {@link PluginThreadHeaderActionRegistration}). Experimental: see
     * docs/api_to_audit.md.
     */
    experimental_threadHeaderAction(registration: PluginThreadHeaderActionRegistration): void;
    /** Render a component beside each Browser tab's address bar. */
    experimental_browserToolbarAction(registration: ExperimentalPluginBrowserToolbarActionRegistration): void;
    fileOpener(registration: PluginFileOpenerRegistration): void;
    /**
     * Replace BB's source-code renderer (see
     * {@link PluginSourceCodeRendererRegistration}). Experimental: see
     * docs/api_to_audit.md.
     */
    experimental_sourceCodeRenderer(registration: PluginSourceCodeRendererRegistration): void;
    /**
     * Replace BB's diff renderer (see
     * {@link PluginDiffRendererRegistration}). Experimental: see
     * docs/api_to_audit.md.
     */
    experimental_diffRenderer(registration: PluginDiffRendererRegistration): void;
    messageDirective(registration: PluginMessageDirectiveRegistration): void;
    messageAction(registration: PluginMessageActionRegistration): void;
    /**
     * @deprecated Use `app.commands.register` with the same registration.
     * Both entry points share the same command registry and ID namespace.
     */
    commandPaletteAction(registration: PluginCommandRegistration): void;
    /**
     * Draw one agent, environment, or machine provider's icon with an inline
     * React component instead of its masked logo asset (see
     * {@link PluginProviderIconRegistration}). Experimental: see
     * docs/api_to_audit.md.
     */
    experimental_providerIcon(registration: PluginProviderIconRegistration): void;
    /**
     * Render the body of this plugin's own timeline rows: its extension kinds
     * and its providers' generic tool items (see
     * {@link PluginTimelineRendererRegistration}). Experimental: see
     * docs/api_to_audit.md.
     */
    experimental_timelineRenderer(registration: PluginTimelineRendererRegistration): void;
    /**
     * Supply the inputs control the New Thread environment picker renders
     * beside one of this plugin's selected environment providers (see
     * {@link PluginEnvironmentProviderInputsRegistration}). Experimental:
     * see docs/api_to_audit.md.
     */
    experimental_environmentProviderInputs(registration: PluginEnvironmentProviderInputsRegistration): void;
    /**
     * Supply the non-secret machine inputs control rendered by machine creation
     * surfaces (see {@link PluginMachineProviderInputsRegistration}).
     * Experimental: see docs/api_to_audit.md.
     */
    experimental_machineProviderInputs(registration: PluginMachineProviderInputsRegistration): void;
}
interface PluginAppComposer {
    customize(registration: ComposerCustomization): void;
}
/** Stable lifecycle values for one content-script instance in one bb client. */
interface PluginContentScriptContext {
    /** The id of the plugin that owns this script. */
    readonly pluginId: string;
    /** Monotonic per-client generation, starting at 1. */
    readonly generation: number;
    /** Aborted before cleanup begins on replacement, deactivation, or teardown. */
    readonly signal: AbortSignal;
    /**
     * Persistently decorate any thread row for this plugin generation.
     *
     * The status is owned by the frontend generation and therefore survives
     * route changes. Passing `null` clears the plugin's status for that thread.
     * The host clears every remaining status when the frontend generation
     * deactivates.
     *
     * Optional so bundles can feature-detect support while this experimental
     * surface rolls out across 0.x clients.
     */
    readonly experimental_setThreadRowStatus?: (threadId: string, status: PluginComposerThreadRowStatus | null) => void;
}
/** Cleanup returned by a frontend content script. */
type PluginContentScriptDisposer = () => void | Promise<void>;
/**
 * Trusted same-origin JavaScript/TypeScript mounted once per active frontend
 * generation in each bb app window or browser tab.
 */
interface PluginContentScriptRegistration {
    /** Unique within the plugin; letters, digits, `-`, `_`. */
    id: string;
    /**
     * Install behavior into the bb app shell. The host awaits a returned
     * promise, retains the plugin's imported frontend stylesheet for this
     * generation, contains failures, and calls the returned disposer exactly
     * once. Styling or decorating existing app-shell DOM belongs here rather
     * than in an always-on frontend stylesheet.
     */
    mount(context: PluginContentScriptContext): void | PluginContentScriptDisposer | Promise<void | PluginContentScriptDisposer>;
}
/** Lifecycle surface for trusted frontend content scripts. */
interface PluginAppContentScripts {
    register(registration: PluginContentScriptRegistration): void;
}
interface ExperimentalIconProps {
    name: string;
    /** Used when the requested name is missing; defaults to the host Zap icon. */
    fallback?: string;
    className?: string;
    style?: CSSProperties;
    "aria-hidden"?: boolean | "false" | "true";
    "aria-label"?: string;
}
/** Shared agent, machine, or environment artwork without fetching metadata. */
interface ExperimentalProviderIconProps {
    /** Keeps same-id agent, machine, and environment providers distinct. */
    providerKind: PluginProviderIconRegistration["providerKind"];
    /**
     * Existing agent, machine, or environment provider record. Reads id, logoUrl, icon and
     * strings.iconTint; other fields are ignored. An id-only record is sufficient
     * when only frontend registrations and fallback are needed. Does not fetch.
     */
    provider: {
        id: string;
        logoUrl?: string | null;
        /** Agent providers use { glyph }; machine and environment providers use a string. */
        icon?: {
            glyph: string;
        } | string | null;
        strings?: {
            iconTint?: {
                light: string;
                dark: string;
            } | null;
        } | null;
    };
    /** Used when no artwork is available; defaults to Code. */
    fallback?: string;
    className?: string;
    "aria-hidden"?: boolean | "false" | "true";
    "aria-label"?: string;
}
/**
 * An app icon registered by a plugin. The registry is app-wide: a registered
 * name is usable wherever a `BbIconName` is — `experimental_Icon`, and every
 * host-rendered surface that takes one — by this plugin or any other.
 */
interface ExperimentalIconRegistration {
    /** Shared app name. Namespacing is recommended, but not required. */
    name: string;
    /** Inline artwork. Honor className for sizing; use currentColor for tint. */
    component: ComponentType<{
        className?: string;
    }>;
}
interface ExperimentalAppIcons {
    /**
     * Add or override an app icon during setup. A registered name shadows a
     * built-in of the same name. Returns nothing; the host replaces
     * registrations on reload and removes them on unload. Duplicate names within
     * a plugin reject setup. Between plugins, the first plugin id in lexical
     * order wins, independent of bundle load order.
     */
    register(registration: ExperimentalIconRegistration): void;
}
interface PluginAppBuilder {
    experimental_icons: ExperimentalAppIcons;
    commands: PluginAppCommands;
    slots: PluginAppSlots;
    composer: PluginAppComposer;
    contentScripts: PluginAppContentScripts;
    /** Experimental managed region for actions and disclosures in the sidebar footer. */
    experimental_sidebarFooter: ExperimentalSidebarFooter;
}
type PluginAppSetup = (app: PluginAppBuilder) => void;
/**
 * The opaque product of `definePluginApp` — a plugin's `app.tsx` default
 * export. The host re-runs `setup` against a fresh collector on every
 * (re)interpretation, replacing that plugin's registrations wholesale.
 */
interface PluginAppDefinition {
    /** Brand the host checks before interpreting a bundle's default export. */
    readonly __bbPluginApp: true;
    readonly setup: PluginAppSetup;
}
interface PluginRpcClient<Contract extends PluginRpcContract = PluginRpcContract> {
    /**
     * Invoke one of the plugin's `bb.rpc` methods (POST
     * /api/v1/plugins/&lt;id&gt;/rpc/&lt;method&gt;). Resolves with the method's
     * inferred output; rejects with an `Error` carrying the server's message,
     * stable `code`, and validation `issues` when present.
     */
    call<Method extends Extract<keyof Contract, string>>(method: Method, ...args: PluginRpcCallArgs<Contract[Method]>): Promise<PluginRpcResult<Contract[Method]>>;
}
interface PluginSettingsState {
    /**
     * Effective non-secret setting values (secret settings are excluded —
     * read them server-side). Undefined while loading or unavailable.
     */
    values: Record<string, string | number | boolean> | undefined;
    isLoading: boolean;
}
/** State of the app's shared realtime connection to the bb server. */
type PluginRealtimeConnectionState = "connected" | "connecting" | "reconnecting";
/** Where `useComposer()` writes. */
type PluginComposerScope = {
    kind: "thread";
    threadId: string;
} | {
    kind: "queued-message";
    threadId: string;
    queuedMessageId: string;
} | {
    kind: "side-chat";
    projectId: string;
    parentThreadId: string;
    tabId: string;
    childThreadId: string | null;
} | {
    kind: "new-thread";
    /** Root compose's effective selected project; null only while unresolved. */
    projectId: string | null;
};
/** One plugin-owned composer customization registration. */
interface ComposerCustomization {
    /** Unique within the plugin; letters, digits, `-`, `_`. */
    id: string;
    /** Composer kinds where this customization is active; omit for all kinds. */
    scopes?: readonly PluginComposerScope["kind"][];
    actions?: readonly {
        id: string;
        component: ComponentType;
    }[];
    banners?: readonly {
        id: string;
        /** Host chrome around the banner. Defaults to `"card"`. */
        chrome?: "bare" | "card";
        component: ComponentType;
    }[];
    plusMenu?: readonly ComposerPlusMenuItem[];
    richText?: ComposerRichTextSpec;
}
/** Host-rendered menu row in the composer's `+` menu. */
interface ComposerPlusMenuItem {
    id: string;
    label: string;
    /** Drawn only when the manifest declares no `bb.branding.icon`. */
    icon?: BbIconName;
    /** Accessible description for the host-rendered row. */
    description?: string;
    disabled?: boolean | ((view: ComposerView) => boolean);
    run(context: {
        composer: PluginComposerApi;
        view: ComposerView;
    }): void | Promise<void>;
}
/** Reactive read-side of the composer a plugin surface is mounted in. */
interface ComposerView {
    scope: PluginComposerScope;
    layout: "compact" | "expanded" | "zen";
    draft: {
        text: string;
        isEmpty: boolean;
        attachmentCount: number;
    };
    run: {
        isRunning: boolean;
        isSubmitting: boolean;
    };
}
interface ComposerRichTextSpec {
    /** Content-derived paint: match ranges receive `className`; text is never mutated. */
    effects?: readonly {
        id: string;
        /** Plain-text offsets into the current structured draft. */
        match(text: string): readonly {
            from: number;
            to: number;
        }[];
        className: string;
    }[];
    /** Debounced, read-only observation of the structured draft. */
    onDraftChange?(draft: ComposerStructuredDraft, view: ComposerView): void;
}
interface ComposerStructuredDraft {
    text: string;
    mentions: readonly {
        from: number;
        to: number;
        provider: string;
        id: string;
        label: string;
    }[];
}
/** Host-rendered paint applied to the editable composer text. */
interface PluginComposerTextEffect {
    className: string;
}
/** Host-rendered status that temporarily replaces a thread's draft glyph. */
interface PluginComposerThreadRowStatus {
    /**
     * Always drawn as given: unlike the plugin-badged surfaces, this one has no
     * preference for the plugin's own `bb.branding.icon`.
     */
    icon: BbIconName;
    /** Accessible label for the status glyph. */
    label: string;
    /**
     * Semantic host treatment for the status glyph. `running` automatically
     * shimmers; terminal `success` and `error` tones are static. Defaults to the
     * neutral tone.
     */
    tone?: "default" | "error" | "running" | "success";
}
/** An @-mention pill bound to one of the calling plugin's mention providers. */
interface PluginComposerMention {
    /** Mention provider id registered by THIS plugin via `bb.ui.registerMentionProvider`. */
    provider: string;
    /** Item id your provider's `resolve` will receive at send time. */
    id: string;
    /** Pill text shown in the composer. */
    label: string;
}
/**
 * Programmatic access to the chat composer draft — the same shared draft the
 * built-in "Add to chat" affordances (file preview, diff, terminal selections)
 * write to. While a queued message is being edited, writes land in that
 * message's inline editor. In a side chat, writes land in the visible side-chat
 * draft. Otherwise, inside a thread context writes land in that thread's draft;
 * anywhere else (nav panel, homepage section) they seed the new-thread composer
 * draft, which persists until the user sends or clears it.
 */
interface PluginComposerApi {
    scope: PluginComposerScope;
    /** Current plain text for this composer scope. */
    readonly text: string;
    /**
     * Replace the draft's plain text. Attachments are preserved. Inline mentions
     * outside the changed range are preserved and rebased; mentions overlapped
     * by the replacement are removed because their text representation changed.
     */
    setText(next: string): void;
    /**
     * Replace the draft's plain text from the latest committed value. Uses the
     * same structured-state reconciliation as `setText`.
     */
    updateText(updater: (current: string) => string): void;
    /** Clear plain text without clearing independently attached files. */
    clear(): void;
    /**
     * Apply a host-rendered effect to this composer's editable text, or clear it.
     * Effects are scoped to the calling plugin and automatically clear when the
     * slot unmounts or its composer scope changes.
     */
    setTextEffect(effect: PluginComposerTextEffect | null): void;
    /**
     * Lock or unlock editing for this composer. Locks are scoped to the calling
     * plugin and automatically release when the slot unmounts or its composer
     * scope changes.
     */
    setInputLock(locked: boolean): void;
    /**
     * Append text to the draft as a `> ` blockquote block and focus the
     * composer. Blank text is a no-op. This is the "reference this selection
     * in chat" primitive.
     */
    addQuote(text: string): void;
    /**
     * Insert an @-mention pill that resolves through this plugin's mention
     * provider at send time — the durable way to reference an entity whose
     * content should be fetched fresh when the message is sent.
     */
    insertMention(mention: PluginComposerMention): void;
    /** Remove this plugin's matching mention pills and their text from the current draft. */
    experimental_removeMention(mention: {
        provider: string;
        id: string;
    }): void;
    /** Subscribe to successful local submissions in this composer scope, including accepted queued messages. Failed sends and draft clearing do not notify. Dispose on unmount. */
    experimental_onSubmitted(listener: () => void): () => void;
    /** Focus the composer caret at the end of the draft. */
    focus(): void;
    /**
     * Submit this composer's draft through the composer's OWN submit pipeline,
     * optionally scheduling it or attaching plugin-owned dispatch data.
     *
     * This is a real submission, not a plugin-issued send: the host builds the
     * request exactly as pressing Enter would, so the draft's attachments and
     * @-mentions, and — in the new-thread composer — the provider, model,
     * reasoning level, service tier, permission mode and environment the user
     * has selected on screen, all travel with it. A plugin cannot assemble that
     * tuple itself, which is why sending from the backend instead would silently
     * run the message with different settings than the ones in front of the user.
     *
     * `sendAt` queues the submission until that time. `experimental_data` is
     * opaque JSON delivered to dispatch hooks together with the calling plugin's
     * id on this initial attempt. Hooks run before operational core waits. If a
     * hook queues the message, its existing plugin wait identifies the owner on
     * later attempts; core does not persist or interpret the opaque data.
     *
     * Resolves once the host has accepted the submission and cleared the draft.
     * Rejects when the composer refused to submit — a scope with no submit
     * pipeline (a queued-message editor, a side chat), an empty draft, or a
     * composer that is not ready (still loading its execution defaults, missing
     * an environment). The rejection's message is safe to show to the user.
     * Failures of the underlying request are reported by bb's own submit error
     * handling and restore the draft, exactly as an interactive failure does.
     *
     * Experimental: see docs/api_to_audit.md.
     */
    experimental_submit(options: ExperimentalComposerSubmitOptions): Promise<void>;
    /**
     * Set this composer's pickers as if each value had been picked by hand.
     *
     * Every field is optional. An omitted field is left alone. A field this
     * composer has no picker for is ignored rather than rejected: a thread
     * composer has no project or environment; a provider without service tiers
     * has no tier; a fork draft locks its project, provider and environment.
     * Values travel through the same paths the pickers use, so in the
     * new-thread composer they become the remembered defaults for the next
     * thread and are reported as the user's explicit choices, and in a thread
     * composer a provider change starts the same handoff the picker starts:
     * the handoff block is prepended to the draft and the next send creates a
     * new thread. A same-provider model change in a thread does not start a
     * handoff, exactly like the picker.
     *
     * In the new-thread composer the project is switched first and awaited
     * (attachments are copied to the new project), then the environment and
     * machine are applied to the new project, then provider, model, reasoning
     * level, service tier and permission mode. A provider change reloads the
     * model catalog before the model and reasoning level are applied to it.
     * Because the project switch remounts plugin surfaces, the returned
     * promise is owned by the composer and still resolves after the calling
     * component has unmounted.
     *
     * Resolves with the composer's own selection once it has settled: the
     * applied values have committed and the model catalog for the selected
     * provider and machine has finished loading, so model, reasoning level and
     * permission mode have reconciled against it. The catalog wait is bounded;
     * if it has not finished after 15 seconds the promise resolves with the
     * selection as it stands. The result carries only the fields this composer
     * has, so a missing key means "no such picker here" and a value that
     * differs from the one passed was reconciled (a reasoning level the model
     * does not support, a permission mode above the machine's ceiling, a model
     * the provider does not list). A provider the composer does not list is
     * ignored together with the model and reasoning level meant for it, so the
     * stored provider preference never names something the picker could not
     * have chosen. `environment` is absent while the composer
     * has no submittable environment; `providerId` and `model` are absent
     * while nothing is selected; `serviceTier` is present only when the
     * selected provider has tiers and one is chosen.
     *
     * Rejects, with a message safe to show to the user, in a composer with no
     * pickers at all (a queued-message editor, a side chat, a plugin surface
     * mounted outside any composer), when the calling surface is no longer
     * active, and when a value is not a known reasoning level, service tier or
     * permission mode.
     *
     * Experimental: see docs/api_to_audit.md.
     */
    experimental_setSelection(selection: ExperimentalComposerSelection): Promise<ExperimentalComposerSelection>;
}
/**
 * Picker values for `experimental_setSelection`, and the shape it resolves
 * with. Field names match `NewThreadRequest` and the `default*` props of
 * `experimental_NewThreadComposer`, so one routed decision can feed the
 * composer, the embedded composer and `bb.sdk.threads.spawn` alike.
 */
interface ExperimentalComposerSelection {
    /** New-thread composers only. BB's personal-project id means "Don't work in a project". */
    projectId?: string;
    /**
     * New-thread composers only. `{ type: "project-default" }` and a `host`
     * environment without a `hostId` seed nothing and are ignored. Provider
     * `inputs` are not applied; the provider's own inputs control keeps its
     * value, and the result reports what the composer would submit.
     */
    environment?: CreateThreadEnvironmentArgs;
    /** A provider the composer does not list is ignored, and `model` and `reasoningLevel` with it. */
    providerId?: string;
    /** Applied only when the composer ends up on the requested provider (or none was requested). */
    model?: string;
    /** Applied only when the composer ends up on the requested provider (or none was requested). */
    reasoningLevel?: ReasoningLevel;
    /** Ignored by a provider with no service tiers. */
    serviceTier?: ServiceTier;
    permissionMode?: PermissionMode;
}
/**
 * What `experimental_submit` does differently from pressing Enter.
 *
 * `experimental_data` is opaque JSON delivered to dispatch hooks. The runtime
 * associates it with the calling plugin automatically for the initial
 * dispatch attempt.
 */
type ExperimentalComposerSubmitOptions = {
    sendAt: number;
    experimental_data?: JsonValue$1;
} | {
    experimental_data: JsonValue$1;
    sendAt?: never;
};
/**
 * A consumer-supplied action on the messages of one `ThreadChat` instance,
 * rendered in the embedded timeline's per-message action bar alongside the
 * native and slot-registered actions. Unlike the `messageAction` slot this is
 * scoped to the rendering component, not registered globally.
 */
interface ThreadChatMessageAction {
    /** Unique within this ThreadChat instance; letters, digits, `-`, `_`. */
    id: string;
    /** Tooltip / menu label for the action. */
    title: string;
    icon?: BbIconName;
    /**
     * Message roles the action applies to. Omitted = both user and assistant
     * messages.
     */
    roles?: readonly ("assistant" | "user")[];
    /**
     * Runs when the user activates the action. Errors (sync or async) are
     * contained and logged; they never break the timeline.
     */
    run(message: ThreadChatMessageReference): void | Promise<void>;
}
/**
 * Props of the host-owned `ThreadChat` component — one thread's chat
 * (timeline, and for the composer variants the full send/queue/draft
 * engine), rendered by the BB app inside a plugin slot. This is the
 * deliberate exception to the no-host-components rule (§5.5): a stable
 * product capability, not a UI kit. Versioned additive like slot props;
 * internal timeline rows, query hooks, and prompt-box configuration are
 * deliberately not exposed.
 */
interface ThreadChatProps {
    threadId: string;
    /**
     * "full" (default) is the page presentation (centered reading width);
     * "compact" is the side-panel presentation; "timeline" renders the
     * transcript without a composer.
     */
    variant?: "compact" | "full" | "timeline";
    /**
     * "contained" (default) fills and scrolls inside a bounded parent;
     * "document" grows with its content and defers scrolling to the page.
     */
    layout?: "contained" | "document";
    /** Bump to focus the composer (ignored by `variant: "timeline"`). */
    focusRequest?: number;
    /**
     * Who controls the permission mode sends run with. "inherit" (default)
     * pins every send to the thread's own resolved default and renders the
     * picker as a dimmed label — a plugin surface can never widen it.
     * "editable" gives this chat its own picker, so the user can raise or
     * lower permissions for this thread independently of the thread it was
     * forked from. Ignored by `variant: "timeline"` (no composer).
     */
    permissionPolicy?: "editable" | "inherit";
    className?: string;
    /** Rendered above the conversation, scrolling with it. */
    leadingContent?: ReactNode;
    /**
     * Actions rendered in this instance's per-message action bar (see
     * {@link ThreadChatMessageAction}).
     */
    messageActions?: readonly ThreadChatMessageAction[];
}
/**
 * The controlled execution selection resolved by the picker.
 *
 * Deliberately a single concrete shape, not a union: this value exists to be
 * forwarded verbatim to `bb.sdk.threads.spawn`, so it must name a real
 * provider and model.
 */
interface ExperimentalProviderModelPickerValue {
    providerId: string;
    model: string;
    reasoningLevel: ReasoningLevel;
    /** Present only when the selected provider supports service tiers. */
    serviceTier?: ServiceTier;
}
/** Where the picker resolves the live provider and model catalog. */
type ExperimentalProviderModelPickerRouting = {
    kind: "host";
    hostId: string;
} | {
    kind: "environment";
    environmentId: string;
};
/**
 * Props of the host-owned `experimental_ProviderModelPicker` component.
 * Provider switches emit one coherent value after the live catalog resolves
 * its default model, reasoning level, and service-tier capability. Failed or
 * empty catalogs leave `value` unchanged. Omit `routing` to use bb's
 * primary-machine routing. Environment routing is required when a provider's
 * model catalog depends on the selected workspace.
 */
interface ExperimentalProviderModelPickerProps {
    value: ExperimentalProviderModelPickerValue;
    onChange(value: ExperimentalProviderModelPickerValue): void;
    /** Route discovery through an explicit machine or existing environment. */
    routing?: ExperimentalProviderModelPickerRouting;
    /** Allow switching providers. Defaults to true; false hides provider tabs. */
    allowProviderChange?: boolean;
    /** Horizontal popover alignment. Defaults to `"start"`. */
    align?: "center" | "end" | "start";
    /** Render the shared selection summary without allowing changes. */
    disabled?: boolean;
    className?: string;
}
/**
 * Props of the host-owned `experimental_BranchPicker` component — bb's branch
 * picker bundled with its branch-options loading for the given host and
 * project. The host owns fetching, searching, and refreshing the branch list;
 * the caller owns the selection and its meaning.
 */
interface BranchPickerProps {
    /**
     * The enrolled machine whose project checkout supplies the branch list.
     * Null renders the picker disabled with no options.
     */
    hostId: string | null;
    /** The project whose source on `hostId` is listed; null disables loading. */
    projectId: string | null;
    /**
     * The selected branch name, or null when no branch is chosen. A null value
     * shows the placeholder without selecting or implying a default branch.
     */
    value: string | null;
    /** Called with the picked branch name, or null when the pick is cleared. */
    onChange(next: string | null): void;
    /**
     * Text placed before the branch on the trigger and used as the menu heading,
     * e.g. "Compare with:". Omitted, the trigger is the branch alone and the menu
     * uses the neutral "Branches" heading.
     */
    label?: string;
    /**
     * The complete trigger text while nothing is picked, without the label
     * prefix. Defaults to "Select branch".
     */
    placeholder?: string;
    /** Render the current selection without allowing changes. */
    disabled?: boolean;
}
interface UseBranchesArgs {
    hostId: string | null;
    projectId: string | null;
    query?: string;
}
interface BranchesState {
    branches: readonly string[];
    remoteBranches: readonly string[];
    isLoading: boolean;
    refresh(): Promise<void>;
}
interface UseCheckoutStateArgs {
    hostId: string | null;
    projectId: string | null;
}
interface CheckoutState {
    isGit: boolean | null;
    unborn: boolean;
    detached: boolean;
    dirty: boolean;
    currentBranch: string | null;
    operation: WorkspaceGitOperation;
}
/** Props of BB's controlled, host-resolved permission-mode picker. */
interface ExperimentalPermissionModePickerProps {
    /** Provider whose supported modes determine the available choices. */
    providerId: string;
    value: PermissionMode;
    onChange(value: PermissionMode): void;
    /** Route capability and machine-ceiling resolution like the execution picker. */
    routing?: ExperimentalProviderModelPickerRouting;
    /** Horizontal menu alignment. Defaults to `"end"`. */
    align?: "center" | "end" | "start";
    /** Render the resolved mode without allowing changes. */
    disabled?: boolean;
    className?: string;
}
/**
 * Every selection the composer resolved, JSON-serializable so a plugin can
 * forward it to its own backend rpc verbatim and hand it straight to
 * `bb.sdk.threads.spawn`.
 *
 * The split is deliberate: the composer owns *user selections*, the plugin
 * owns *filing and attribution*. `bb.sdk.threads.spawn` auto-fills
 * `origin: "plugin"` and `originPluginId`, so a thread created this way stays
 * attributed to the plugin — which it would not be if the component created
 * the thread itself. The plugin adds `sectionId`, `parentThreadId`, `title`,
 * and `visibility` to the request on its own; they are deliberately not
 * composer props.
 */
interface NewThreadRequest {
    /**
     * The selected project id. Choosing "Don't work in a project" submits BB's
     * personal-project id (not `null`) together with a `personal` workspace
     * environment. Forward those fields unchanged to `threads.spawn`; if the
     * plugin needs project metadata, request it from the plugin backend with
     * `bb.sdk.projects.list({ includePersonal: true })`.
     */
    projectId: string;
    providerId: string;
    model: string;
    reasoningLevel: ReasoningLevel;
    permissionMode: PermissionMode;
    /** Omitted when the selected provider has no service tiers. */
    serviceTier?: ServiceTier;
    /**
     * Per-field provenance (caller-explicit vs. default) for the execution
     * options above, forwarded to `spawn` so the server records what the user
     * actually chose.
     */
    executionInputSources: CreateExecutionInputSources;
    environment: CreateThreadEnvironmentArgs;
    input: PromptInput[];
    /**
     * Epoch ms the first turn should dispatch at. Present only when the
     * submission came from `useComposer().experimental_submit` — a scheduled
     * create — and absent otherwise, which is what makes an ordinary submission
     * start work at once. Forward it to `threads.spawn` unchanged: the thread is
     * created `pending` and its first message is queued as a row until then.
     */
    sendAt?: number;
}
/**
 * Props of the host-owned `experimental_NewThreadComposer` component — bb's
 * full new-thread compose surface (prompt editor with @-mentions and expand,
 * attachments, provider/model/reasoning picker, voice, submit, and the row
 * beneath with project, environment, branch-from, and permission mode),
 * rendered by the BB app inside a plugin slot.
 *
 * It is the create-side counterpart to `ThreadChat`: same deliberate
 * exception to the no-host-components rule (§5.5), same additive versioning.
 */
interface NewThreadComposerProps {
    /**
     * Seeds the project picker. The user can change it, including choosing
     * "Don't work in a project"; see {@link NewThreadRequest.projectId} for the
     * submitted projectless shape.
     */
    defaultProjectId?: string;
    /**
     * Seeds the provider picker. Like every `default*` prop this is a SEED, not
     * a controlled value: the composer stays uncontrolled, the user can change
     * it, and when omitted the composer falls back to the project's remembered
     * execution defaults exactly as before. When provided it takes precedence
     * over those project defaults.
     *
     * Re-seeding: the `default*` props are value-compared each render. When any
     * of them changes after mount, the composer re-seeds EVERY execution and
     * environment selection from the new props — including selections the user
     * had already touched — so switching between two saved records in the same
     * mounted composer reloads that record's values (the same rule
     * `defaultProjectId` already follows).
     *
     * Every seeded field is reported as caller-explicit in the submitted
     * request's `executionInputSources`. That is what makes the seed survive
     * `threads.spawn`: the server drops a requested `providerId`/`model` that
     * carries no provenance source and re-derives it from the project's stored
     * defaults, which would silently undo the seed.
     */
    defaultProviderId?: string;
    /** Seeds the model picker. Same seed semantics as {@link defaultProviderId}. */
    defaultModel?: string;
    /**
     * Seeds the reasoning-level picker. Same seed semantics as
     * {@link defaultProviderId}. If the seeded model does not support this
     * level, the composer reconciles to the closest supported one.
     */
    defaultReasoningLevel?: ReasoningLevel;
    /**
     * Seeds the service-tier picker. Same seed semantics as
     * {@link defaultProviderId}. Ignored (and omitted from the submitted
     * request) when the selected provider has no service tiers.
     */
    defaultServiceTier?: ServiceTier;
    /** Seeds the permission-mode picker. Same seed semantics as {@link defaultProviderId}. */
    defaultPermissionMode?: PermissionMode;
    /**
     * Seeds the environment and branch pickers from a previously submitted
     * `NewThreadRequest.environment`. Same seed semantics as
     * {@link defaultProviderId}: a seed the user can change, taking precedence
     * over the composer's own environment default when provided.
     *
     * Round trip: feeding a submitted request's `environment` back in and
     * resubmitting untouched reproduces an equivalent environment, with these
     * documented limits — the composer cannot represent every args variant:
     *
     * - `{ type: "project-default" }` seeds nothing; the composer resolves its
     *   own default and submits that concrete environment instead.
     * - A `host` environment whose host no longer exists (or whose project has
     *   no source on it) falls back to the composer's default host, exactly as
     *   the primary compose surface would.
     * - A `reuse` environment whose worktree no longer has unarchived threads
     *   falls back the same way.
     * - An `unmanaged` workspace's `path` has no composer control; the seeded
     *   selection submits `path: null` (the host's configured checkout). The
     *   composer itself never produces a non-null `path`, so real round trips
     *   are unaffected.
     * - A `managed-worktree` with `baseBranch: { kind: "default" }` leaves the
     *   branch picker on its default, which may resolve to a named base branch
     *   when the project configures a dedicated worktree base — the same branch
     *   the original `default` submission would have created from.
     */
    defaultEnvironment?: CreateThreadEnvironmentArgs;
    /**
     * Seeds the draft, only while the draft is still empty. Serialized
     * `@thread:<id>`, `@project:<id>`, and `@section:<id>` tokens become mention
     * pills with host-resolved titles/names. Missing projects/sections use their
     * IDs; unavailable generated thread IDs use "Unavailable thread" ("Thread"
     * if lookup fails). Other unknown thread IDs use the ID as their label.
     */
    initialPrompt?: string;
    placeholder?: string;
    /**
     * "contained" (default) fills and scrolls inside a bounded parent;
     * "document" grows with its content and defers scrolling to the page.
     */
    layout?: "contained" | "document";
    /** Bump to focus the editor. */
    focusRequest?: number;
    className?: string;
    /**
     * Where the draft persists. Drafts survive reloads and are shared by every
     * composer using the same key; defaults to a key scoped to this plugin.
     */
    draftKey?: string;
    /**
     * Fires on submit with every selection resolved. The draft clears when this
     * resolves and is KEPT if it throws, so a failed create never loses what the
     * user typed.
     */
    onSubmit: (request: NewThreadRequest) => void | Promise<void>;
}
/**
 * Props of the host-owned `Markdown` component — bb's chat message renderer
 * (the same typography, spacing, and code styling as timeline messages).
 * Use it wherever plugin UI quotes or previews message content so it reads
 * like the rest of the chat. Like `ThreadChat`, this is a stable product
 * capability, not a UI kit; renderer internals stay private.
 */
interface MarkdownProps {
    /** Markdown source, rendered exactly like a chat message body. */
    content: string;
    className?: string;
    /** Resolve local destinations from this document; omission keeps message routing. */
    experimental_document?: {
        threadId: string;
        rootPath: string;
        target: Exclude<ExperimentalLiveFileTarget, {
            kind: "host";
        }>;
    };
}
/**
 * Props for BB's semantic URL link. The host owns ordinary activation while
 * retaining browser-owned anchor behavior for app routes, modifiers, explicit
 * targets, copying, and unsupported schemes. New top-level targets preserve
 * supplied `rel` tokens and receive safe defaults unless `opener` is explicit.
 * Experimental: see docs/api_to_audit.md.
 */
interface UrlLinkProps extends Omit<ComponentPropsWithoutRef<"a">, "href"> {
    href: string;
}
/** A live file whose identity is complete without ambient route context. */
type ExperimentalLiveFileTarget = {
    kind: "workspace";
    environmentId: string;
    path: string;
} | {
    kind: "host";
    hostId: string;
    path: string;
} | {
    kind: "thread-storage";
    threadId: string;
    path: string;
};
/** One-based location to reveal after a live file opens. */
type ExperimentalFileLocation = {
    kind: "line";
    line: number;
    column: number | null;
} | {
    kind: "range";
    startLine: number;
    endLine: number;
};
/** Options shared by BB's preview and preferred-external file intents. */
interface ExperimentalFileOpenOptions {
    target: ExperimentalLiveFileTarget;
    location: ExperimentalFileLocation | null;
}
/**
 * Props for BB's host-rendered semantic file link. Valid targets receive a
 * scheme-safe anchor href; traversal paths, ill-formed Unicode, and other
 * malformed runtime targets remain inert.
 */
interface ExperimentalFileLinkProps extends Omit<ComponentPropsWithoutRef<"a">, "href" | "target"> {
    target: ExperimentalLiveFileTarget;
    location?: ExperimentalFileLocation | null;
}
/** The panel surface resolved by the component making the request. */
type ExperimentalAppPanelSurface = {
    kind: "current";
};
/**
 * The owning fixed tab's current memory-only target. It survives tab, panel,
 * and route remounts during the current app session, but is never persisted
 * across a refresh. Call `clear` when the owner returns to its untargeted state.
 */
interface ExperimentalFixedTabTargetState<Target extends JsonValue$1> {
    readonly sequence: number;
    readonly target: Target;
    clear(): void;
}
type ExperimentalOpenFixedTabOptions<Target extends JsonValue$1> = {
    surface: ExperimentalAppPanelSurface;
    tab: ExperimentalPluginFixedTabReference<Target>;
    /** Omit to select the tab without replacing its current session target. */
    target?: NoInfer<Target>;
};
/** Surface-aware controller for selecting owner-scoped fixed tabs. */
interface ExperimentalAppPanel {
    openFixedTab<Target extends JsonValue$1 = never>(options: ExperimentalOpenFixedTabOptions<Target>): boolean;
}
/** Current app selection, derived from the route. */
interface BbContext {
    projectId: string | null;
    threadId: string | null;
}
interface BbNavigate {
    toThread(threadId: string): void;
    toProject(projectId: string): void;
    /**
     * Navigate to one of this plugin's own nav panels by its `path`.
     * `subPath` targets a location inside the panel (the component's
     * `subPath` prop); `replace` swaps the current history entry instead of
     * pushing — use it for redirects so back does not bounce.
     */
    toPluginPanel(path: string, options?: {
        subPath?: string;
        replace?: boolean;
    }): void;
    /**
     * Navigate to the root compose surface (the new-thread screen). Pass
     * `initialPrompt` to seed the composer draft (serialized thread, project,
     * and section mention tokens become pills) and `focusPrompt` to focus the
     * composer on arrival — the pairing behind "Create via chat" style entry
     * points that drop the user into chat with a prefilled prompt.
     */
    toCompose(options?: {
        initialPrompt?: string;
        focusPrompt?: boolean;
    }): void;
    /**
     * Open one of this plugin's registered thread-panel actions in the current
     * thread surface. Returns false when the surface has no thread side panel or
     * the action is unavailable.
     */
    openThreadPanel(options: PluginTargetedPanelActionOpenOptions): boolean;
    /**
     * Open an HTTP(S) URL using this client's BB browser preference. Returns
     * false for schemes the host does not own. Experimental: see
     * docs/api_to_audit.md.
     */
    openUrl(url: string): boolean;
    /** Open a live file in this surface's shared BB preview panel. */
    experimental_openFilePreview(options: ExperimentalFileOpenOptions): boolean;
    /** Open a live file in this client's preferred external file target. */
    experimental_openFileExternally(options: ExperimentalFileOpenOptions): boolean;
}
/**
 * Everything `@get-bb/plugin-sdk/app` resolves to at runtime. The BB app builds
 * the real implementation and `satisfies` this interface; `bb plugin build`
 * shims the specifier to that object on `globalThis.__bbPluginRuntime`.
 */
interface PluginSdkApp {
    experimental_Icon: ComponentType<ExperimentalIconProps>;
    /**
     * Render provider slot override, then its logo, then its glyph, then fallback.
     * Pass a record from agent, machine, or environment provider queries;
     * an id-only record resolves frontend registrations, without fetching metadata.
     * Updates on plugin load, reload and unload. Throwing or recursive overrides
     * fall back to declared artwork. Logo assets render as currentColor masks.
     */
    experimental_ProviderIcon: ComponentType<ExperimentalProviderIconProps>;
    definePluginApp(setup: PluginAppSetup): PluginAppDefinition;
    useRpc<Contract extends PluginRpcContract = PluginRpcContract>(): PluginRpcClient<Contract>;
    useRealtime(channel: string, handler: (payload: unknown) => void): void;
    /**
     * Observe the same shared connection that delivers `useRealtime` signals.
     * Use a subsequent transition to `connected` to reconcile server state that
     * may have changed while ephemeral signals could not be delivered. The first
     * connection can transition from `connecting` and is not a reconnection.
     */
    useRealtimeConnectionState(): PluginRealtimeConnectionState;
    useSettings(): PluginSettingsState;
    useBbContext(): BbContext;
    useBbNavigate(): BbNavigate;
    /** Select one of this plugin's eligible fixed tabs on the current surface. */
    experimental_useAppPanel(): ExperimentalAppPanel;
    /** Read or clear the owning tab's validated, session-scoped target. */
    experimental_useFixedTabTarget<Target extends JsonValue$1>(tab: ExperimentalPluginFixedTabReference<Target>): ExperimentalFixedTabTargetState<Target> | null;
    useComposer(): PluginComposerApi;
    /**
     * The sidebar's live thread view (see {@link PluginSidebarThreadsState}).
     * Reads the host's own cache and realtime subscriptions, so it costs no
     * extra request and updates exactly when the built-in sidebar does.
     *
     * Active threads are uncapped. Opting into archived threads uses the host
     * archive query; request more pages through `experimental_archived`.
     * `threads` contains the selected lifecycles across loaded pages. Thread
     * objects keep their identity across updates while the underlying entry is
     * unchanged, so a memoized row re-renders only when its own thread changed;
     * the array itself is new on every update. Window your rows (render only
     * what is on screen) as the built-in sidebar does — a list that mounts one
     * row per thread is slow on phones with many threads.
     * Experimental: see docs/api_to_audit.md.
     */
    experimental_useSidebarThreads(options?: {
        /** Defaults to active threads only. An empty selection also means active. */
        experimental_lifecycles: readonly ("active" | "archived")[];
    }): PluginSidebarThreadsState;
    /**
     * Thread actions bound to the host's mutations (see
     * {@link PluginSidebarThreadActions}). Experimental: see
     * docs/api_to_audit.md.
     */
    experimental_useSidebarThreadActions(): PluginSidebarThreadActions;
    /**
     * The pull request for one thread's branch (see
     * {@link PluginSidebarThreadPullRequestState}).
     *
     * Per row and opt-in, because it costs a git-host lookup: it is NOT on the
     * thread payload every sidebar loads. Threads sharing an environment share
     * one query, and the host owns the polling and staleness rules — an open PR
     * with pending checks refreshes, a merged one does not.
     *
     * Experimental: see docs/api_to_audit.md.
     */
    experimental_useSidebarThreadPullRequest(threadId: string): PluginSidebarThreadPullRequestState;
    /**
     * Per-row drag-to-split support (see {@link PluginSidebarThreadSplit}).
     * Call it once per rendered row, like the built-in sidebar does.
     * Experimental: see docs/api_to_audit.md.
     */
    experimental_useSidebarThreadSplit(threadId: string): PluginSidebarThreadSplit;
    /**
     * Whether the composer holds an unsent draft for one thread (see
     * {@link PluginSidebarThreadDraftState}). Per row, because a draft is
     * client-local composer state the array-wide view cannot carry. Reports
     * false for an unknown thread.
     */
    useSidebarThreadDraft(threadId: string): PluginSidebarThreadDraftState;
    /**
     * The ids of every sidebar thread that currently holds an unsent draft, for
     * rollups on collapsed groups. One subscription for the whole list; prefer
     * {@link PluginSdkApp.useSidebarThreadDraft} inside a row.
     */
    useSidebarThreadDraftIds(): ReadonlySet<string>;
    /**
     * The row status another plugin set on this thread (see
     * {@link PluginSidebarThreadRowStatus}), or null. Draw it where bb's row
     * would: in place of the draft glyph, with its `tone`.
     */
    useSidebarThreadRowStatus(threadId: string): PluginSidebarThreadRowStatus | null;
    /**
     * Every row status currently set, by thread id, for rollups on collapsed
     * groups. One subscription for the whole list; prefer
     * {@link PluginSdkApp.useSidebarThreadRowStatus} inside a row.
     */
    useSidebarThreadRowStatuses(): ReadonlyMap<string, PluginSidebarThreadRowStatus>;
    /**
     * The whole split layout (see {@link PluginSidebarSplitLayout}), or null
     * when nothing is split. One subscription for the whole list.
     */
    useSidebarSplitLayout(): PluginSidebarSplitLayout | null;
    /**
     * The jump shortcut assigned to this row while the app command modifier is
     * held (see {@link PluginSidebarThreadShortcut}), or null the rest of the
     * time. bb assigns keys in DOM order to rows carrying the
     * `data-sidebar-thread-shortcut-target` attribute, so a row that omits it
     * always reads null.
     */
    useSidebarThreadShortcut(threadId: string): PluginSidebarThreadShortcut | null;
    /**
     * A thread's display title with `@project:`, `@section:`, and `@thread:`
     * mentions rendered as bb's chips (see {@link PluginThreadTitleProps}).
     * Inline content; wrap it in your own truncating container. The plain-text
     * form is `displayTitle` on the thread.
     */
    ThreadTitle: ComponentType<PluginThreadTitleProps>;
    /**
     * bb's environment provider catalog (see
     * {@link PluginEnvironmentProvidersState}), the directory a thread's
     * `environment.providerId` points into. Reads the host's own cached
     * catalog, so it costs no extra request.
     */
    useEnvironmentProviders(): PluginEnvironmentProvidersState;
    /**
     * bb's public API client bound to this plugin (see
     * {@link PluginBrowserBbSdk}). The first choice for reading and mutating
     * bb state from a frontend: creating or renaming thread sections, moving a
     * thread into one, pinning, unarchiving, spawning a thread. The host's own
     * caches refresh over realtime, so a mutation made here shows up in bb's
     * surfaces without further work. Reserve `useRpc` for work that needs your
     * server: secrets, host files, or your plugin's own storage.
     *
     * Writes made here are not optimistic in bb's surfaces; they land when the
     * realtime update does. `experimental_useSidebarThreadActions()` stays the
     * optimistic path for pin, read state, rename, and archive.
     *
     * The client is stable for the plugin's lifetime, so it is safe in effect
     * and callback dependency lists.
     */
    useSdk(): PluginBrowserBbSdk;
    /**
     * The provider directory (see {@link PluginProvidersState}). Reads the
     * host's own cached provider roster, so a plugin that shows a thread's
     * provider never re-vendors provider names, icons, or copy. Experimental:
     * see docs/api_to_audit.md.
     */
    experimental_useProviders(): PluginProvidersState;
    /**
     * The active code theme as a VS Code theme file (see
     * {@link PluginCodeThemeState}), for a plugin that renders code with an
     * engine of its own and needs BB's palette to reach it. Experimental: see
     * docs/api_to_audit.md.
     */
    experimental_useCodeTheme(): PluginCodeThemeState;
    /**
     * The host-owned chat component (see {@link ThreadChatProps}). Together
     * with `Markdown`, the only components the SDK ships — everything else
     * stays vendored per §5.5.
     */
    ThreadChat: ComponentType<ThreadChatProps>;
    /**
     * The host-owned chat-message markdown renderer (see
     * {@link MarkdownProps}).
     */
    Markdown: ComponentType<MarkdownProps>;
    /**
     * A real anchor whose ordinary HTTP(S) activation uses BB's URL preference.
     * Experimental: see docs/api_to_audit.md.
     */
    UrlLink: ComponentType<UrlLinkProps>;
    /** Host-rendered live-file link backed by the shared navigation controller. */
    experimental_FileLink: ComponentType<ExperimentalFileLinkProps>;
    /**
     * The host-owned new-thread compose surface (see
     * {@link NewThreadComposerProps}). Experimental: see
     * docs/api_to_audit.md for what to audit before the prefix drops.
     */
    experimental_NewThreadComposer: ComponentType<NewThreadComposerProps>;
    /**
     * BB's controlled provider/model/reasoning picker. Provider changes emit
     * only after the new provider's verified defaults and capabilities resolve,
     * so `onChange` always receives one coherent value. Experimental: see
     * docs/api_to_audit.md.
     */
    experimental_ProviderModelPicker: ComponentType<ExperimentalProviderModelPickerProps>;
    /**
     * BB's controlled permission-mode picker. The host resolves provider
     * capabilities and the routed machine's permission ceiling. Experimental:
     * see docs/api_to_audit.md.
     */
    experimental_PermissionModePicker: ComponentType<ExperimentalPermissionModePickerProps>;
    /**
     * BB's branch picker with its branch-options loading for one host and
     * project (see {@link BranchPickerProps}) — the same control
     * the New Thread composer renders as "Branch from". Experimental: see
     * docs/api_to_audit.md.
     */
    experimental_BranchPicker: ComponentType<BranchPickerProps>;
    /**
     * Search and refresh the branch list for one project source. `query` is
     * debounced before it reaches the host, so a control can pass it on every
     * keystroke; filtering the returned lists stays the caller's job.
     * Experimental: see docs/api_to_audit.md.
     */
    experimental_useBranches(args: UseBranchesArgs): BranchesState;
    /**
     * Inspect the checkout state for one project source. Experimental: see
     * docs/api_to_audit.md.
     */
    experimental_useCheckoutState(args: UseCheckoutStateArgs): CheckoutState;
    /**
     * The host-owned source viewer (see {@link SourceCodeProps}). Renders
     * supplied source text with BB's syntax highlighting, gutters, and live code
     * theme, and honours an active `experimental_sourceCodeRenderer`
     * replacement. Experimental: see docs/api_to_audit.md.
     */
    experimental_SourceCode: ComponentType<SourceCodeProps>;
    /**
     * The host-owned diff viewer (see {@link DiffProps}). Renders supplied patch
     * content with BB's normalization, optional full-file context expansion,
     * syntax highlighting, unified/split presentation, and live code theme, and
     * honours an active
     * `experimental_diffRenderer` replacement. Experimental: see
     * docs/api_to_audit.md.
     */
    experimental_Diff: ComponentType<DiffProps>;
    useComposerView(): ComposerView;
}

declare const experimental_Icon: react.ComponentType<ExperimentalIconProps>;
declare const experimental_ProviderIcon: react.ComponentType<ExperimentalProviderIconProps>;
declare const definePluginApp: (setup: PluginAppSetup) => PluginAppDefinition;
declare const ThreadChat: react.ComponentType<ThreadChatProps>;
declare const Markdown: react.ComponentType<MarkdownProps>;
declare const experimental_FileLink: react.ComponentType<ExperimentalFileLinkProps>;
declare const UrlLink: react.ComponentType<UrlLinkProps>;
declare const experimental_NewThreadComposer: react.ComponentType<NewThreadComposerProps>;
declare const experimental_ProviderModelPicker: react.ComponentType<ExperimentalProviderModelPickerProps>;
declare const experimental_PermissionModePicker: react.ComponentType<ExperimentalPermissionModePickerProps>;
declare const experimental_BranchPicker: react.ComponentType<BranchPickerProps>;
declare const experimental_useBranches: (args: UseBranchesArgs) => BranchesState;
declare const experimental_useCheckoutState: (args: UseCheckoutStateArgs) => CheckoutState;
declare const experimental_SourceCode: react.ComponentType<SourceCodeProps>;
declare const experimental_Diff: react.ComponentType<DiffProps>;
declare const useRpc: <Contract extends PluginRpcContract = Readonly<Record<string, PluginRpcMethodContract<StandardSchemaV1<unknown, unknown>, StandardSchemaV1<unknown, unknown>>>>>() => PluginRpcClient<Contract>;
declare const useRealtime: (channel: string, handler: (payload: unknown) => void) => void;
declare const useRealtimeConnectionState: () => PluginRealtimeConnectionState;
declare const useSettings: () => PluginSettingsState;
declare const useBbContext: () => BbContext;
declare const useBbNavigate: () => BbNavigate;
declare const experimental_useAppPanel: () => ExperimentalAppPanel;
declare const experimental_useFixedTabTarget: <Target extends JsonValue$1>(tab: ExperimentalPluginFixedTabReference<Target>) => ExperimentalFixedTabTargetState<Target> | null;
declare const useComposer: () => PluginComposerApi;
declare const useComposerView: () => ComposerView;
declare const experimental_useSidebarThreads: (options?: {
    experimental_lifecycles: readonly ("active" | "archived")[];
}) => PluginSidebarThreadsState;
declare const experimental_useSidebarThreadActions: () => PluginSidebarThreadActions;
declare const experimental_useSidebarThreadPullRequest: (threadId: string) => PluginSidebarThreadPullRequestState;
declare const experimental_useSidebarThreadSplit: (threadId: string) => PluginSidebarThreadSplit;
declare const useSidebarThreadDraft: (threadId: string) => PluginSidebarThreadDraftState;
declare const useSidebarThreadDraftIds: () => ReadonlySet<string>;
declare const useSidebarThreadRowStatus: (threadId: string) => PluginSidebarThreadRowStatus | null;
declare const useSidebarThreadRowStatuses: () => ReadonlyMap<string, PluginSidebarThreadRowStatus>;
declare const useSidebarSplitLayout: () => PluginSidebarSplitLayout | null;
declare const useSidebarThreadShortcut: (threadId: string) => PluginSidebarThreadShortcut | null;
declare const ThreadTitle: react.ComponentType<PluginThreadTitleProps>;
declare const useEnvironmentProviders: () => PluginEnvironmentProvidersState;
declare const useSdk: () => PluginBrowserBbSdk;
declare const experimental_useProviders: () => PluginProvidersState;
declare const experimental_useCodeTheme: () => PluginCodeThemeState;

export { Markdown, ThreadChat, ThreadTitle, UrlLink, definePluginApp, experimental_BranchPicker, experimental_Diff, experimental_FileLink, experimental_Icon, experimental_NewThreadComposer, experimental_PermissionModePicker, experimental_ProviderIcon, experimental_ProviderModelPicker, experimental_SourceCode, experimental_useAppPanel, experimental_useBranches, experimental_useCheckoutState, experimental_useCodeTheme, experimental_useFixedTabTarget, experimental_useProviders, experimental_useSidebarThreadActions, experimental_useSidebarThreadPullRequest, experimental_useSidebarThreadSplit, experimental_useSidebarThreads, useBbContext, useBbNavigate, useComposer, useComposerView, useEnvironmentProviders, useRealtime, useRealtimeConnectionState, useRpc, useSdk, useSettings, useSidebarSplitLayout, useSidebarThreadDraft, useSidebarThreadDraftIds, useSidebarThreadRowStatus, useSidebarThreadRowStatuses, useSidebarThreadShortcut };
export type { BbContext, BbNavigate, BranchPickerProps, BranchesState, CheckoutState, CodeOverflowMode, ComposerCustomization, ComposerPlusMenuItem, ComposerRichTextSpec, ComposerStructuredDraft, ComposerView, DiffProps, DiffViewMode, ExperimentalAppIcons, ExperimentalAppOverlayProps, ExperimentalAppOverlayRegistration, ExperimentalAppPanel, ExperimentalAppPanelSurface, ExperimentalComposerSelection, ExperimentalComposerSubmitOptions, ExperimentalDiffFileContent, ExperimentalDiffFullFileContents, ExperimentalFileLinkProps, ExperimentalFileLocation, ExperimentalFileOpenOptions, ExperimentalFixedTabTargetContract, ExperimentalFixedTabTargetState, ExperimentalIconProps, ExperimentalIconRegistration, ExperimentalLiveFileTarget, ExperimentalOpenFixedTabOptions, ExperimentalPermissionModePickerProps, ExperimentalPluginBrowserPage, ExperimentalPluginBrowserPageEvaluateOptions, ExperimentalPluginBrowserPageWorld, ExperimentalPluginBrowserToolbarActionProps, ExperimentalPluginBrowserToolbarActionRegistration, ExperimentalPluginFixedTabReference, ExperimentalProviderIconProps, ExperimentalProviderModelPickerProps, ExperimentalProviderModelPickerRouting, ExperimentalProviderModelPickerValue, ExperimentalSidebarFooter, ExperimentalSidebarFooterActionContext, ExperimentalSidebarFooterActionRegistration, ExperimentalSidebarFooterDisclosureController, ExperimentalSidebarFooterDisclosureProps, ExperimentalSidebarFooterDisclosureRegistration, ExperimentalSidebarFooterItemBase, ExperimentalSidebarFooterItemRegistration, ExperimentalSidebarNavigationAction, ExperimentalSidebarNavigationActivationOptions, ExperimentalSidebarNavigationIcon, ExperimentalSidebarNavigationItem, ExperimentalSidebarNavigationProps, ExperimentalSidebarNavigationRegistration, ExperimentalSidebarNavigationShortcut, JsonValue$1 as JsonValue, MarkdownProps, NewThreadComposerProps, NewThreadRequest, PluginAppBuilder, PluginAppCommands, PluginAppComposer, PluginAppContentScripts, PluginAppDefinition, PluginAppSetup, PluginAppSlots, PluginBoundThreadsArea, PluginBrowserBbSdk, PluginCodeThemeData, PluginCodeThemeState, PluginCodeThemeTokenRule, PluginCommandContext, PluginCommandRegistration, PluginCommandShortcut, PluginComposerApi, PluginComposerMention, PluginComposerScope, PluginComposerTextEffect, PluginComposerThreadRowStatus, PluginContentScriptContext, PluginContentScriptDisposer, PluginContentScriptRegistration, PluginDiffRendererProps, PluginDiffRendererRegistration, PluginEnvironmentProvider, PluginEnvironmentProviderInputsChange, PluginEnvironmentProviderInputsProps, PluginEnvironmentProviderInputsRegistration, PluginEnvironmentProvidersState, PluginFileOpenerProps, PluginFileOpenerRegistration, PluginFileOpenerSource, PluginFixedTabDeclaration, PluginFixedTabRegistration, PluginHomepageSectionProps, PluginHomepageSectionRegistration, PluginMachineProviderInputsChange, PluginMachineProviderInputsProps, PluginMachineProviderInputsRegistration, PluginMessageActionContext, PluginMessageActionRegistration, PluginMessageDirectiveMessage, PluginMessageDirectiveOpenWorkspaceFile, PluginMessageDirectiveProps, PluginMessageDirectiveRegistration, PluginNavPanelProps, PluginNavPanelRegistration, PluginNewThreadPanelActionContext, PluginNewThreadPanelActionRegistration, PluginNewThreadPanelProps, PluginPanelActionOpenOptions, PluginPendingInteractionProps, PluginPendingInteractionRegistration, PluginPendingInteractionView, PluginProviderIconRegistration, PluginProvidersState, PluginRealtimeConnectionState, PluginRpcCallArgs, PluginRpcClient, PluginRpcContract, PluginRpcError, PluginRpcErrorCode, PluginRpcHandlers, PluginRpcIssuePathSegment, PluginRpcMethodContract, PluginRpcResult, PluginRpcValidationIssue, PluginSdkApp, PluginSettingsSectionProps, PluginSettingsSectionRegistration, PluginSettingsState, PluginSidebarFooterActionContext, PluginSidebarFooterActionProps, PluginSidebarFooterActionRegistration, PluginSidebarProject, PluginSidebarPullRequest, PluginSidebarSection, PluginSidebarSplitLayout, PluginSidebarSplitPane, PluginSidebarThread, PluginSidebarThreadActions, PluginSidebarThreadActivity, PluginSidebarThreadDraftState, PluginSidebarThreadIndicator, PluginSidebarThreadPullRequestState, PluginSidebarThreadRowStatus, PluginSidebarThreadShortcut, PluginSidebarThreadSplit, PluginSidebarThreadsState, PluginSourceCodeRendererProps, PluginSourceCodeRendererRegistration, PluginTargetedPanelActionOpenOptions, PluginThreadHeaderActionProps, PluginThreadHeaderActionRegistration, PluginThreadListProps, PluginThreadListRegistration, PluginThreadPanelActionContext, PluginThreadPanelActionRegistration, PluginThreadPanelProps, PluginThreadTitleProps, PluginTimelineRendererProps, PluginTimelineRendererRegistration, PluginTimelineRendererRow, PluginTimelineRowPresentation, PluginTimelineRowStatus, ReadonlyJsonValue, SourceCodeLineRange, SourceCodeProps, StandardSchemaV1, StandardSchemaV1InferInput, StandardSchemaV1InferOutput, StandardSchemaV1Issue, StandardSchemaV1Result, ThreadChatMessageAction, ThreadChatMessageReference, ThreadChatProps, UrlLinkProps, UseBranchesArgs, UseCheckoutStateArgs };
