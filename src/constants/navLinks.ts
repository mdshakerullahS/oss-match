import { Icon } from "@/types/icon";
import { Bookmark, Compass, Search } from "lucide-react";

interface NavLinks {
  name: string;
  href: string;
  icon: Icon;
}

export const navLinks: NavLinks[] = [
  { name: "Search", href: "/dashboard/search", icon: Search },
  {
    name: "For You",
    href: "/dashboard/for-you",
    icon: Compass,
  },
  {
    name: "Bookmarks",
    href: "/dashboard/bookmarks",
    icon: Bookmark,
  },
];
