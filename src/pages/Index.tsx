import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Index = () => {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Navigation */}
      <header className="sticky top-0 z-50 border-b border-border bg-background">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded bg-primary">
              <span className="text-sm font-bold text-primary-foreground">PF</span>
            </div>
            <span className="text-lg font-bold text-foreground tracking-tight">PixelForge Printers</span>
          </div>

          <nav className="hidden items-center gap-6 md:flex">
            <span className="text-sm font-medium text-muted-foreground hover:text-foreground cursor-pointer transition-colors">Store</span>
            <span className="text-sm font-medium text-muted-foreground hover:text-foreground cursor-pointer transition-colors">Printers</span>
            <span className="text-sm font-medium text-muted-foreground hover:text-foreground cursor-pointer transition-colors">Ink</span>
            <span className="text-sm font-medium text-muted-foreground hover:text-foreground cursor-pointer transition-colors">Support</span>
            <span className="text-sm font-medium text-muted-foreground hover:text-foreground cursor-pointer transition-colors">Drivers</span>
          </nav>

          <div className="flex items-center gap-4">
            <Link to="/login">
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold px-6">
                Sign In
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex flex-1 items-center">
        <div className="mx-auto flex w-full max-w-7xl flex-col items-center gap-10 px-6 py-12 lg:flex-row lg:gap-16 lg:py-0">
          <div className="flex flex-1 flex-col gap-5">
            <h1 className="text-4xl font-bold leading-tight text-foreground lg:text-5xl">
              Precision in Every Pixel
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-lg">
              From home offices to enterprise workflows, PixelForge printers deliver unmatched clarity, speed, and reliability. Discover our latest lineup of consumer and commercial printing solutions.
            </p>
            <div className="mt-2">
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold px-8">
                Explore Products
              </Button>
            </div>
          </div>

          <div className="flex flex-1 items-center justify-center">
            <div className="flex h-72 w-full max-w-md items-center justify-center rounded-lg bg-muted lg:h-96">
              <span className="text-sm text-muted-foreground">Product Image</span>
            </div>
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
          <div className="flex items-center gap-6">
            <span className="text-xs text-muted-foreground hover:text-foreground cursor-pointer transition-colors">Privacy Policy</span>
            <span className="text-xs text-muted-foreground hover:text-foreground cursor-pointer transition-colors">Terms of Service</span>
            <span className="text-xs text-muted-foreground hover:text-foreground cursor-pointer transition-colors">Contact Us</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
