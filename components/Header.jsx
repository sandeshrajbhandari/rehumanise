"use client";

import React from "react";
import Link from "next/link";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { cn } from "@/app/lib/utils";
import { UserAvatar } from "@/components/ui/UserAvatar";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const { data: session, status } = useSession();
  console.log("loaded nav session", session?.user.image)
  const navigationItems = [
    { title: "Home", href: "/" },
    { title: "About", href: "/about" },
    { title: "AI Detect", href: "/ai_detect" },
    { title: "Rewrite", href: "/rewrite" },
  ];
  let pathname = usePathname();
  return (
    <header className="border-b bg-white">
      <div className="flex items-center justify-between h-16 px-4 max-w-7xl mx-auto">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-xl font-bold">reHumanise Pro</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex">
          <NavigationMenu>
            <NavigationMenuList>
              {navigationItems.map((item) => (
                <NavigationMenuItem key={item.title}>
                  <NavigationMenuLink
                    href={item.href}
                    className={cn(
                      "px-4 py-2 hover:text-primary ",
                      navigationMenuTriggerStyle()
                    )}
                    active={pathname === item.href}
                  >
                    {item.title}
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Right side items */}
        <div className="flex items-center space-x-4">
        {status === 'loading' ? (
            // Loading skeleton with same dimensions as UserAvatar
            pathname.startsWith('/user') ? <div className="w-10 h-10 rounded-full bg-gray-200 animate-pulse" /> : ""
          ) : session ? (
            <UserAvatar session={session}/>
          ) : (
            <div className="hidden md:block">
              <Link href="/user/dashboard">
                <Button>Get Started</Button>
              </Link>
            </div>
          )}

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <nav className="flex flex-col space-y-4 mt-4">
                  {navigationItems.map((item) => (
                    <Link
                      key={item.title}
                      href={item.href}
                      className="text-lg hover:text-primary"
                    >
                      {item.title}
                    </Link>
                  ))}
                  {!session && (
                    <Link
                      href="/user/dashboard"
                      className="text-lg hover:text-primary"
                    >
                      Get Started
                    </Link>
                  )}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
