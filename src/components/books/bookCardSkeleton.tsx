export function BookCardSkeleton() {
  return (
    <div
      className="
        block overflow-hidden rounded-2xl
        bg-white border border-border shadow-sm
        animate-pulse

        dark:bg-white/5
        dark:border-white/10
        dark:backdrop-blur-sm
      "
    >
      <div className="relative aspect-3/4 overflow-hidden bg-muted dark:bg-white/10">
        <div className="absolute top-3 left-3">
          <div className="h-5 w-20 rounded-full bg-white/70 dark:bg-black/40" />
        </div>

        <div className="absolute bottom-4 left-4 right-4 flex gap-2">
          <div className="h-8 flex-1 rounded-md bg-white/80 dark:bg-black/40" />
          <div className="h-8 w-8 rounded-md bg-white/80 dark:bg-black/40" />
        </div>
      </div>

      <div className="p-4 space-y-2">
        <div className="h-4 w-3/4 rounded bg-muted dark:bg-white/10" />
        <div className="h-4 w-1/2 rounded bg-muted dark:bg-white/10" />
        <div className="h-3 w-1/3 rounded bg-muted/70 dark:bg-white/10" />
        <div className="h-4 w-20 rounded bg-muted dark:bg-white/10 pt-1" />
      </div>
    </div>
  );
}
