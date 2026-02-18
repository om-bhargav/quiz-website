"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  ShoppingCart,
  Users,
  UserLock,
  LogOut,
  Box,
  Menu,
  Trophy,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { SITE_NAME } from "@/lib/constants";
import { signOut } from "next-auth/react";
const navItems = [
  { name: "Dashboard", icon: LayoutDashboard, href: "/mobile/admin" },
  { name: "Users", icon: Users, href: "/mobile/admin/users" },
  { name: "Events", icon: Trophy, href: "/mobile/admin/events" },
  { name: "Plans", icon: Box, href: "/mobile/admin/plans" },
  { name: "Categories", icon: Box, href: "/mobile/admin/categories" },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const activeItem = navItems
    .slice()
    .sort((a, b) => b.href.length - a.href.length)
    .find((item) => pathname.startsWith(item.href));

  const handleLogout = async () => {
    await signOut({ redirect: true, callbackUrl: "/" });
  };

  const SidebarContent = () => (
    <div className="flex h-full flex-col">
      {/* Logo */}
      <div className="flex items-center gap-3 px-6 py-6 border-b">
        <div className="flex min-h-11 min-w-11 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow">
          <Box className="h-6 w-6" />
        </div>
        <h1 className="text-xl uppercase font-bold tracking-tight">
          {SITE_NAME}
        </h1>
      </div>

      {/* Navigation */}
      <ScrollArea className="flex-1 px-3 py-4">
        <div className="grid gap-1">
          {navItems.map((item) => {
            const isActive = activeItem?.name === item.name;

            return (
              <Link key={item.name} href={item.href}>
                <Button
                  variant={isActive ? "secondary" : "ghost"}
                  className={cn(
                    "w-full justify-start gap-3 rounded-lg text-sm font-medium",
                    isActive &&
                      "hover:bg-primary/80 bg-primary/80 text-background"
                  )}
                >
                  <item.icon
                    className={cn(
                      "h-5 w-5",
                      isActive ? "text-background" : "text-muted-foreground"
                    )}
                  />
                  {item.name}
                </Button>
              </Link>
            );
          })}
        </div>
      </ScrollArea>

      {/* Footer */}
      <div className="border-t p-4">
        <Button
          variant="ghost"
          onClick={handleLogout}
          className="w-full justify-start gap-3 text-muted-foreground hover:text-destructive"
        >
          <LogOut className="h-5 w-5" />
          Logout
        </Button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex fixed left-0 top-0 z-40 h-screen w-64 border-r bg-background">
        <SidebarContent />
      </aside>

      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 flex items-center justify-between border-b bg-background px-4 py-3">
        <h2 className="font-semibold">EzMart</h2>

        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>

          <SheetContent side="left" className="w-64 p-0">
            <SidebarContent />
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
}
