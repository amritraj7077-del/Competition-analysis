export function DashboardSkeleton() {
  return (
    <div className="space-y-8 animate-pulse">
      <div className="h-24 panel rounded-lg" />
      <div className="grid grid-cols-2 md:grid-cols-5 gap-px bg-border border border-border rounded-lg overflow-hidden">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="h-24 bg-background" />
        ))}
      </div>
      <div className="h-80 panel rounded-lg" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border border border-border rounded-lg overflow-hidden">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-48 bg-background" />
        ))}
      </div>
    </div>
  );
}
