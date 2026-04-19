import { Icon } from "@/types/icon";
import { Monitor, Moon, Sun } from "lucide-react";

interface Theme {
  name: "Light" | "Dark" | "System";
  value: "light" | "dark" | "system";
  icon: Icon;
}

export const themes: Theme[] = [
  { name: "Light", value: "light", icon: Sun },
  { name: "Dark", value: "dark", icon: Moon },
  { name: "System", value: "system", icon: Monitor },
];
