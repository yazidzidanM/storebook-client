export function CartItemSkeleton() {
  return (
    <div
      className="
        flex gap-4 p-4 rounded-xl
        bg-card shadow-card
        animate-pulse
      "
    >
      <div className="w-20 h-28 rounded-lg bg-muted dark:bg-white/10" />

      <div className="flex-1 space-y-2">
        <div className="h-4 w-3/4 rounded bg-muted dark:bg-white/10" />
        <div className="h-3 w-1/3 rounded bg-muted/70 dark:bg-white/10" />
        <div className="h-4 w-20 rounded bg-muted dark:bg-white/10 mt-2" />

        <div className="flex justify-between items-center mt-3">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-md bg-muted dark:bg-white/10" />
            <div className="h-4 w-6 rounded bg-muted dark:bg-white/10" />
            <div className="h-8 w-8 rounded-md bg-muted dark:bg-white/10" />
          </div>

          <div className="h-4 w-4 rounded bg-muted dark:bg-white/10" />
        </div>
      </div>

      <div className="text-right space-y-2">
        <div className="h-3 w-16 rounded bg-muted/70 dark:bg-white/10" />
        <div className="h-4 w-20 rounded bg-muted dark:bg-white/10" />
      </div>
    </div>
  );
}
