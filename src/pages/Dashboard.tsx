import { Link } from "react-router-dom";

const SkeletonBar = ({ className = "" }: { className?: string }) => (
  <div className={`skeleton-shimmer ${className}`} />
);

const Dashboard = () => {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Header */}
      <header className="border-b border-border bg-background">
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-6">
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded bg-primary">
              <span className="text-sm font-bold text-primary-foreground">PF</span>
            </div>
            <span className="text-lg font-bold text-foreground tracking-tight">PixelForge Printers</span>
          </Link>
          <div className="flex items-center gap-4">
            <SkeletonBar className="h-8 w-8 rounded-full" />
            <SkeletonBar className="h-3 w-20" />
          </div>
        </div>
      </header>

      <main className="flex flex-1 flex-col items-center px-6 py-12">
        <div className="w-full max-w-4xl space-y-8">
          {/* Welcome skeleton */}
          <div className="space-y-2">
            <SkeletonBar className="h-8 w-64" />
            <SkeletonBar className="h-4 w-48" />
          </div>

          {/* Dashboard cards skeleton */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="rounded-lg border border-border bg-card p-6 space-y-4">
                <SkeletonBar className="h-4 w-24" />
                <SkeletonBar className="h-10 w-20" />
                <SkeletonBar className="h-3 w-full" />
              </div>
            ))}
          </div>

          {/* Activity skeleton */}
          <div className="rounded-lg border border-border bg-card p-6 space-y-4">
            <SkeletonBar className="h-5 w-32" />
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-center gap-4">
                <SkeletonBar className="h-3 w-20" />
                <SkeletonBar className="h-3 flex-1" />
                <SkeletonBar className="h-3 w-16" />
              </div>
            ))}
          </div>
        </div>
      </main>

      <div className="h-1 w-full bg-primary" />
    </div>
  );
};

export default Dashboard;
