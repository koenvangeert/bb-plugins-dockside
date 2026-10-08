import { z } from "zod";

export const PR_SUMMARY_PLUGIN_ID = "github-insight";
export const PR_SUMMARY_METADATA_KEY = "prSummary";
export const PR_SUMMARY_MAX_AGE_MS = 60 * 60 * 1000;

const count = z.number().int().nonnegative();

const prSummaryV1Schema = z.object({
  version: z.literal(1),
  updatedAt: z.iso.datetime(),
  pr: z.object({
    number: z.number().int().positive(),
    url: z.string(),
    state: z.enum(["open", "draft", "merged", "closed"]),
  }),
  checks: z.object({
    failed: count,
    running: count,
    cancelled: count,
    passed: count,
    skipped: count,
    failedNames: z.array(z.string()),
  }),
  reviewers: z.object({
    pending: count,
    approved: count,
    changesRequested: count,
    pendingNames: z.array(z.string()),
  }),
  blockers: z.array(z.string()),
  error: z.string().nullable(),
});

export type PrSummaryV1 = z.infer<typeof prSummaryV1Schema>;

export function parsePrSummary(value: unknown, now: number): PrSummaryV1 | null {
  const parsed = prSummaryV1Schema.safeParse(value);
  if (!parsed.success) return null;
  const age = now - Date.parse(parsed.data.updatedAt);
  return age <= PR_SUMMARY_MAX_AGE_MS ? parsed.data : null;
}
