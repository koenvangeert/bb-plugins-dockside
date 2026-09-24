import { Icon, type IconName } from "@/components/ui/icon";
import type {
  PrInsightCount,
  PrInsightPresentation,
} from "@/lib/pr-insight-presentation";

const COUNT_STYLE: Record<
  PrInsightCount["kind"],
  { icon: IconName; colorRole: string }
> = {
  failed: { icon: "CircleX", colorRole: "blocked" },
  running: { icon: "Hourglass", colorRole: "checks" },
  pending: { icon: "Eye", colorRole: "review" },
};

function TooltipList({ title, items }: { title: string; items: string[] }) {
  if (items.length === 0) return null;
  return (
    <span className="mt-1 block first:mt-0">
      <span className="block font-semibold">{title}</span>
      {items.map((item) => (
        <span
          key={item}
          className="block max-w-52 whitespace-normal break-words text-muted-foreground"
        >
          {item}
        </span>
      ))}
    </span>
  );
}

export function PullRequestInsight({
  insight,
  interactive = true,
  onOpen,
}: {
  insight: PrInsightPresentation;
  interactive?: boolean;
  onOpen: () => void;
}) {
  const label = [
    ...insight.counts.map((count) => count.label),
    ...(insight.staleReason === null ? [] : ["stale"]),
  ].join(", ");
  const content = (
    <>
      {insight.counts.map((count) => (
        <span
          key={count.kind}
          data-dockside-pr-insight={count.kind}
          className="inline-flex items-center gap-0.5 font-mono"
          style={{
            color: `var(--dockside-pr-${COUNT_STYLE[count.kind].colorRole}, currentColor)`,
          }}
        >
          <Icon name={COUNT_STYLE[count.kind].icon} className="size-3" aria-hidden />
          {count.value}
        </span>
      ))}
      {insight.staleReason === null ? null : (
        <span data-dockside-pr-insight-stale="" className="inline-flex opacity-70">
          <Icon name="Clock" className="size-3" aria-hidden />
        </span>
      )}
      <span
        role="tooltip"
        className="pointer-events-none absolute bottom-full right-0 z-30 mb-1 w-max max-w-56 translate-y-0.5 rounded-md border border-border bg-popover px-2 py-1.5 text-left text-2xs leading-tight text-popover-foreground opacity-0 shadow-md transition-all group-hover/insight:translate-y-0 group-hover/insight:opacity-100 group-focus-visible/insight:translate-y-0 group-focus-visible/insight:opacity-100"
      >
        <TooltipList title="Failed checks" items={insight.failedNames} />
        <TooltipList title="Pending reviewers" items={insight.pendingNames} />
        <TooltipList title="Blockers" items={insight.blockerTexts} />
        {insight.staleReason === null ? null : (
          <TooltipList
            title="Last refresh failed"
            items={[insight.staleReason]}
          />
        )}
      </span>
    </>
  );

  if (!interactive) {
    return (
      <span className="group/insight pointer-events-none relative flex h-4 items-center gap-1 text-2xs text-muted-foreground">
        <span className="sr-only">{label}</span>
        <span aria-hidden className="contents">
          {content}
        </span>
      </span>
    );
  }

  return (
    <button
      type="button"
      aria-label={`${label}; open thread`}
      onClick={(event) => {
        event.stopPropagation();
        onOpen();
      }}
      className="group/insight pointer-events-auto relative flex h-4 items-center gap-1 text-2xs text-muted-foreground hover:text-foreground"
    >
      {content}
    </button>
  );
}
