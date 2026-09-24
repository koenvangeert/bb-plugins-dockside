import { useEffect, useState } from "react";
import { useSdk } from "@bb/plugin-sdk/app";
import {
  PR_SUMMARY_METADATA_KEY,
  PR_SUMMARY_PLUGIN_ID,
  parsePrSummary,
  type PrSummaryV1,
} from "@/lib/pr-summary";

// Metadata writes do not reach the sidebar live, so `now` is a refetch trigger.
export function usePrSummary({
  threadId,
  threadUpdatedAt,
  now,
  enabled,
}: {
  threadId: string;
  threadUpdatedAt: number;
  now: number;
  enabled: boolean;
}): PrSummaryV1 | null {
  const sdk = useSdk();
  const [metadata, setMetadata] = useState<unknown>(undefined);

  useEffect(() => {
    if (!enabled) return;
    let current = true;
    sdk.threads
      .getPluginMetadata({ threadId, pluginId: PR_SUMMARY_PLUGIN_ID })
      .then((result) => {
        if (current) setMetadata(result[PR_SUMMARY_METADATA_KEY]);
      })
      .catch(() => {});
    return () => {
      current = false;
    };
  }, [sdk, threadId, threadUpdatedAt, now, enabled]);

  return enabled ? parsePrSummary(metadata, now) : null;
}
