export function OrderSummarySkeleton() {
  return (
    <div
      className="
        bg-card rounded-xl shadow-card p-6
        animate-pulse
      "
    >
      <div className="h-5 w-40 rounded bg-muted dark:bg-white/10 mb-6" />

      <div className="space-y-3 mb-6">
        <div className="flex justify-between">
          <div className="h-3 w-20 rounded bg-muted/70 dark:bg-white/10" />
          <div className="h-3 w-16 rounded bg-muted dark:bg-white/10" />
        </div>
        <div className="flex justify-between">
          <div className="h-3 w-20 rounded bg-muted/70 dark:bg-white/10" />
          <div className="h-3 w-12 rounded bg-muted dark:bg-white/10" />
        </div>
        <div className="border-t border-border pt-3 flex justify-between">
          <div className="h-4 w-16 rounded bg-muted dark:bg-white/10" />
          <div className="h-4 w-20 rounded bg-muted dark:bg-white/10" />
        </div>
      </div>

      <div className="h-11 w-full rounded-md bg-muted dark:bg-white/10" />

      <div className="mt-4 pt-4 border-t border-border">
        <div className="h-3 w-3/4 mx-auto rounded bg-muted/70 dark:bg-white/10" />
      </div>
    </div>
  );
}
