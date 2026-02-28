import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const Login = () => {
  return (
    <div className="flex min-h-screen flex-col bg-background">
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

      <main className="flex flex-1 items-center justify-center px-4 py-12">
        <Card className="w-full max-w-sm border-border shadow-lg">
          <CardHeader className="items-center gap-3 pb-2">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary">
              <span className="text-lg font-bold text-primary-foreground">PF</span>
            </div>
            <p className="text-sm font-medium text-muted-foreground">Sign in to PixelForge</p>
          </CardHeader>
          <CardContent className="flex flex-col gap-5 pt-2">
            <div className="flex flex-col gap-2">
              <Label htmlFor="email">Email address</Label>
              <Input id="email" type="email" placeholder="you@example.com" />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" placeholder="••••••••" />
            </div>
            <Link to="/dashboard">
              <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-semibold">
                Sign In
              </Button>
            </Link>
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground hover:text-foreground cursor-pointer transition-colors">Forgot password?</span>
              <span className="text-xs text-muted-foreground hover:text-foreground cursor-pointer transition-colors">Create account</span>
            </div>
          </CardContent>
        </Card>
      </main>

      <div className="h-1 w-full bg-primary" />
    </div>
  );
};

export default Login;
