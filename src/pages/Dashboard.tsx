import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Printer, LogOut } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import SupportChat from "@/components/SupportChat";

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SupportChat />
      <header className="border-b border-border bg-background">
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-6">
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded bg-primary">
              <Printer className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="text-lg font-bold text-foreground tracking-tight">PixelForge Printers</span>
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-3 rounded-lg px-2 py-1 hover:bg-muted transition-colors">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">JD</div>
                <span className="text-sm text-muted-foreground">John Doe</span>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => navigate("/")} className="cursor-pointer">
                <LogOut className="mr-2 h-4 w-4" />
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      <main className="flex flex-1 flex-col items-center px-6 py-12">
        <div className="w-full max-w-4xl space-y-8">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Welcome back, John</h1>
            <p className="text-sm text-muted-foreground">Here's your account overview</p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-lg border border-border bg-card p-6 space-y-2">
              <p className="text-sm text-muted-foreground">Registered Printers</p>
              <p className="text-3xl font-bold text-foreground">3</p>
              <p className="text-xs text-muted-foreground">PF-4200, PF-8100, PF-Pro X</p>
            </div>
            <div className="rounded-lg border border-border bg-card p-6 space-y-2">
              <p className="text-sm text-muted-foreground">Ink Subscriptions</p>
              <p className="text-3xl font-bold text-foreground">2</p>
              <p className="text-xs text-muted-foreground">Active — next shipment Feb 15</p>
            </div>
            <div className="rounded-lg border border-border bg-card p-6 space-y-2">
              <p className="text-sm text-muted-foreground">Driver Version</p>
              <p className="text-3xl font-bold text-foreground">v4.2.1</p>
              <p className="text-xs text-muted-foreground">Up to date</p>
            </div>
          </div>

          <div className="rounded-lg border border-border bg-card p-6 space-y-4">
            <h2 className="text-base font-semibold text-foreground">Recent Activity</h2>
            {[
              { date: "Feb 10", action: "Printed 24-page report", printer: "PF-4200" },
              { date: "Feb 8", action: "Ink cartridge replaced (Cyan)", printer: "PF-8100" },
              { date: "Feb 5", action: "Driver updated to v4.2.1", printer: "All devices" },
              { date: "Jan 30", action: "Warranty registered", printer: "PF-Pro X" },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-4 text-sm">
                <span className="w-16 shrink-0 text-muted-foreground">{item.date}</span>
                <span className="flex-1 text-foreground">{item.action}</span>
                <span className="text-xs text-muted-foreground">{item.printer}</span>
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
