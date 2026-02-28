import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const SkeletonBar = ({ className = "" }: { className?: string }) => (
  <div className={`skeleton-shimmer ${className}`} />
);

const Index = () => {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Navigation */}
      <header className="sticky top-0 z-50 border-b border-border bg-background">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded bg-primary">
              <span className="text-sm font-bold text-primary-foreground">PF</span>
            </div>
            <span className="text-lg font-bold text-foreground tracking-tight">PixelForge</span>
          </div>

          {/* Nav skeleton links */}
          <nav className="hidden items-center gap-6 md:flex">
            <SkeletonBar className="h-3 w-14" />
            <SkeletonBar className="h-3 w-16" />
            <SkeletonBar className="h-3 w-10" />
            <SkeletonBar className="h-3 w-20" />
            <SkeletonBar className="h-3 w-14" />
          </nav>

          {/* Search skeleton + Sign In */}
          <div className="flex items-center gap-4">
            <SkeletonBar className="hidden h-9 w-48 rounded-md md:block" />
            <Link to="/login">
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold px-6">
                Sign In
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section — fills remaining viewport */}
      <main className="flex flex-1 items-center">
        <div className="mx-auto flex w-full max-w-7xl flex-col items-center gap-10 px-6 py-12 lg:flex-row lg:gap-16 lg:py-0">
          {/* Left — text skeletons */}
          <div className="flex flex-1 flex-col gap-5">
            <SkeletonBar className="h-10 w-3/4" />
            <SkeletonBar className="h-10 w-1/2" />
            <div className="mt-2 flex flex-col gap-3">
              <SkeletonBar className="h-4 w-full" />
              <SkeletonBar className="h-4 w-5/6" />
              <SkeletonBar className="h-4 w-4/6" />
            </div>
            <SkeletonBar className="mt-4 h-12 w-44 rounded-md" />
          </div>

          {/* Right — image skeleton */}
          <div className="flex flex-1 items-center justify-center">
            <SkeletonBar className="h-72 w-full max-w-md rounded-lg lg:h-96" />
          </div>
        </div>
      </main>

      {/* Accent bar */}
      <div className="h-2 w-full bg-primary" />

      {/* Footer */}
      <footer className="border-t border-border bg-background py-6">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 sm:flex-row">
          <div className="text-center sm:text-left">
            <p className="text-sm font-semibold text-foreground">PixelForge Inc.</p>
            <p className="text-xs text-muted-foreground">Precision in Every Pixel</p>
          </div>
          <div className="flex items-center gap-4">
            <SkeletonBar className="h-3 w-16" />
            <SkeletonBar className="h-3 w-20" />
            <SkeletonBar className="h-3 w-14" />
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
