import {
  Car,
  Home,
  KeyRound,
  Umbrella,
  Heart,
  Shield,
  Briefcase,
  HardHat,
  Truck,
  Lock,
  Scale,
  Building2,
  type LucideIcon,
} from "lucide-react";

const ICON_MAP: Record<string, LucideIcon> = {
  car: Car,
  home: Home,
  key: KeyRound,
  umbrella: Umbrella,
  heart: Heart,
  shield: Shield,
  briefcase: Briefcase,
  hardhat: HardHat,
  truck: Truck,
  lock: Lock,
  scale: Scale,
  building: Building2,
};

export function getIcon(key: string): LucideIcon {
  return ICON_MAP[key] ?? Shield;
}
