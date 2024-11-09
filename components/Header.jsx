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
import { cn } from "@/lib/utils";

import { usePathname } from "next/navigation";

const Navbar = () => {
  const navigationItems = [
    { title: "Home", href: "/" },
    { title: "About", href: "/about" },
    { title: "Products", href: "/products" },
    { title: "Contact", href: "/contact" },
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
              </nav>
            </SheetContent>
          </Sheet>
        </div>

        {/* CTA Button - visible on desktop */}
        <div className="hidden md:block">
          <Button>Get Started</Button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
