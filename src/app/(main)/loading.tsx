export default function Loading() {
  return (
    <div className="animate-pulse">
      <div className="h-7 w-40 bg-bg-input rounded-lg mb-2" />
      <div className="h-4 w-64 bg-bg-input rounded-lg mb-6" />
      <div className="space-y-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-bg-card border border-border rounded-2xl px-4 py-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-9 h-9 rounded-full bg-bg-input" />
              <div className="h-4 w-24 bg-bg-input rounded-lg" />
            </div>
            <div className="space-y-2">
              <div className="h-4 w-full bg-bg-input rounded-lg" />
              <div className="h-4 w-3/4 bg-bg-input rounded-lg" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
