import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const SkeletonBar = ({ className = "" }: { className?: string }) => (
  <div className={`skeleton-shimmer ${className}`} />
);

const Login = () => {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Minimal header */}
      <header className="border-b border-border bg-background">
        <div className="mx-auto flex h-14 max-w-7xl items-center px-6">
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded bg-primary">
              <span className="text-sm font-bold text-primary-foreground">PF</span>
            </div>
            <span className="text-lg font-bold text-foreground tracking-tight">PixelForge Printers</span>
          </Link>
        </div>
      </header>

      {/* Login card */}
      <main className="flex flex-1 items-center justify-center px-4 py-12">
        <Card className="w-full max-w-sm border-border shadow-lg">
          <CardHeader className="items-center gap-3 pb-2">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary">
              <span className="text-lg font-bold text-primary-foreground">PF</span>
            </div>
            <p className="text-sm font-medium text-muted-foreground">Sign in to PixelForge</p>
          </CardHeader>
          <CardContent className="flex flex-col gap-5 pt-2">
            {/* Email skeleton */}
            <div className="flex flex-col gap-2">
              <SkeletonBar className="h-3 w-20" />
              <SkeletonBar className="h-10 w-full rounded-md" />
            </div>
            {/* Password skeleton */}
            <div className="flex flex-col gap-2">
              <SkeletonBar className="h-3 w-20" />
              <SkeletonBar className="h-10 w-full rounded-md" />
            </div>
            {/* Sign In button */}
            <Link to="/dashboard">
              <div className="skeleton-shimmer h-11 w-full rounded-md cursor-pointer hover:opacity-80 transition-opacity" />
            </Link>
            {/* Links skeleton */}
            <div className="flex items-center justify-between">
              <SkeletonBar className="h-3 w-28" />
              <SkeletonBar className="h-3 w-24" />
            </div>
          </CardContent>
        </Card>
      </main>

      {/* Accent line */}
      <div className="h-1 w-full bg-primary" />
    </div>
  );
};

export default Login;
