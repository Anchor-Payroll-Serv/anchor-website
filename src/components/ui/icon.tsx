import type { CSSProperties } from "react";
import {
  ArrowDownLeft,
  ArrowRight,
  ArrowUpRight,
  Check,
  CheckCircle,
  Clock,
  Eye,
  FileText,
  Lock,
  Plus,
  ReceiptText,
  RotateCw,
  ShieldCheck,
  Smartphone,
  UserPlus,
  Users,
  WalletMinimal,
  type LucideIcon,
} from "lucide-react";

export type IconName =
  | "arrow-down-left"
  | "arrow-right"
  | "arrow-up-right"
  | "check"
  | "check-circle"
  | "clock"
  | "eye"
  | "file-text"
  | "lock"
  | "plus"
  | "receipt-text"
  | "rotate-cw"
  | "shield-check"
  | "smartphone"
  | "user-plus"
  | "users"
  | "wallet-minimal";

const ICONS: Record<IconName, LucideIcon> = {
  "arrow-down-left": ArrowDownLeft,
  "arrow-right": ArrowRight,
  "arrow-up-right": ArrowUpRight,
  check: Check,
  "check-circle": CheckCircle,
  clock: Clock,
  eye: Eye,
  "file-text": FileText,
  lock: Lock,
  plus: Plus,
  "receipt-text": ReceiptText,
  "rotate-cw": RotateCw,
  "shield-check": ShieldCheck,
  smartphone: Smartphone,
  "user-plus": UserPlus,
  users: Users,
  "wallet-minimal": WalletMinimal,
};

export function Icon({
  name,
  size = 24,
  className,
  style,
}: {
  name: IconName;
  size?: number;
  className?: string;
  style?: CSSProperties;
}) {
  const LucideComponent = ICONS[name];
  return <LucideComponent size={size} strokeWidth={2} className={className} style={style} />;
}
