"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, LogIn, MessageCircle, User } from "lucide-react";

const authNavItems = [
  { href: "/", icon: Home, label: "Feed" },
  { href: "/messages", icon: MessageCircle, label: "Messages" },
  { href: "/profile", icon: User, label: "Profile" },
];

const publicNavItems = [
  { href: "/", icon: Home, label: "Feed" },
  { href: "/login", icon: LogIn, label: "Sign in" },
];

export function BottomNav({ isLoggedIn }: { isLoggedIn: boolean }) {
  const pathname = usePathname();
  const navItems = isLoggedIn ? authNavItems : publicNavItems;

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-bg/80 backdrop-blur-lg border-t border-border/50 z-50">
      <div className="max-w-md mx-auto flex items-center justify-around py-1.5 pb-[max(0.5rem,env(safe-area-inset-bottom))]">
        {navItems.map((item) => {
          const isActive =
            item.href === "/"
              ? pathname === "/"
              : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center gap-0.5 px-5 py-1.5 press transition-colors ${
                isActive ? "text-text" : "text-text-muted/60"
              }`}
            >
              <item.icon size={20} strokeWidth={isActive ? 2 : 1.5} />
              <span className="text-[10px] font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
