"use client";

import Link from "next/link";
import { Code, Bot } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 flex items-center">
          <Link href="/problems" className="flex items-center gap-2">
            <Code className="h-6 w-6 text-primary" />
            <span className="font-bold text-lg">Algo Ace</span>
          </Link>
        </div>
        <nav className="flex items-center gap-4 text-sm lg:gap-6">
          <Link
            href="/problems"
            className="transition-colors hover:text-foreground/80 text-foreground/60"
          >
            Problems
          </Link>
          <Link
            href="/refactor"
            className="transition-colors hover:text-foreground/80 text-foreground/60"
          >
            AI Refactor
          </Link>
        </nav>
        <div className="flex flex-1 items-center justify-end gap-2">
          {/* <Button variant="ghost">Login</Button>
          <Button>Sign Up</Button> */}
        </div>
      </div>
    </header>
  );
}
