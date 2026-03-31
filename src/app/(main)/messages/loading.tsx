export default function Loading() {
  return (
    <div className="animate-pulse">
      <div className="h-6 w-28 bg-bg-input rounded-lg mb-6" />
      <div className="space-y-3">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="flex items-center gap-3 py-3">
            <div className="w-12 h-12 rounded-full bg-bg-input shrink-0" />
            <div className="flex-1">
              <div className="h-4 w-28 bg-bg-input rounded-lg mb-2" />
              <div className="h-3 w-48 bg-bg-input rounded-lg" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
