export default function Loading() {
  return (
    <div className="animate-pulse">
      <div className="flex items-center gap-4 mb-5">
        <div className="w-16 h-16 rounded-full bg-bg-input shrink-0" />
        <div className="flex-1">
          <div className="h-5 w-32 bg-bg-input rounded-lg mb-2" />
          <div className="h-3 w-44 bg-bg-input rounded-lg" />
        </div>
      </div>
      <div className="h-9 w-24 bg-bg-input rounded-full mb-5" />
      <div className="h-20 w-full bg-bg-input rounded-xl mb-5" />
      <div className="h-4 w-20 bg-bg-input rounded-lg mb-3" />
      <div className="space-y-3">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="bg-bg-card border border-border rounded-2xl px-4 py-4">
            <div className="h-4 w-full bg-bg-input rounded-lg mb-2" />
            <div className="h-4 w-2/3 bg-bg-input rounded-lg" />
          </div>
        ))}
      </div>
    </div>
  );
}
