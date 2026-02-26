"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  LogOut,
  Box,
  Menu,
  Trophy,
  Tags,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { SITE_NAME } from "@/lib/constants";
import { signOut } from "next-auth/react";

const navItems = [
  { name: "Dashboard", icon: LayoutDashboard, href: "/admin" },
  { name: "Users", icon: Users, href: "/admin/users" },
  { name: "Events", icon: Trophy, href: "/admin/events" },
  { name: "Plans", icon: Box, href: "/admin/plans" },
  { name: "Categories", icon: Tags, href: "/admin/categories" },
];

export default function Sidebar({open,setOpen}:any) {
  const pathname = usePathname();
  // const [open, setOpen] = useState(false);

  const activeItem = navItems
    .slice()
    .sort((a, b) => b.href.length - a.href.length)
    .find((item) => pathname.startsWith(item.href));

  const handleLogout = async () => {
    await signOut({ redirect: true, callbackUrl: "/" });
  };

  const SidebarContent = () => (
    <div className="flex h-full flex-col bg-background">
      {/* Logo */}
      <div className="flex items-center gap-3 px-6 py-[10px] border-b">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow">
          <Box className="h-6 w-6" />
        </div>
        <h1 className="text-md uppercase font-bold tracking-tight">
          {SITE_NAME}
        </h1>
      </div>

      {/* Navigation */}
      <ScrollArea className="flex-1 px-3 py-4">
        <div className="grid gap-1">
          {navItems.map((item) => {
            const isActive = activeItem?.name === item.name;

            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setOpen(false)} // close on mobile click
              >
                <Button
                  variant="ghost"
                  className={cn(
                    "w-full justify-start gap-3 rounded-lg text-sm font-medium",
                    isActive &&
                      "bg-primary text-primary-foreground! hover:bg-primary"
                  )}
                >
                  <item.icon
                    className={cn(
                      "h-5 w-5",
                      isActive
                        ? "text-primary-foreground"
                        : "text-muted-foreground"
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
      <aside className="hidden md:flex fixed left-0 top-0 h-screen w-64 border-r">
        <SidebarContent />
      </aside>

      {/* Mobile Hamburger Button */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <Button variant="ghost" size="icon" onClick={() => setOpen(true)}>
          <Menu className="h-6 w-6" />
        </Button>
      </div>

      {/* Mobile Sidebar Drawer */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="left" className="w-64 p-0">
          <SheetTitle/>
          <SidebarContent />
        </SheetContent>
      </Sheet>
    </>
  );
}