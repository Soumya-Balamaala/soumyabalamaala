import { headers } from "next/headers";
import { UAParser } from "ua-parser-js";

// ---------- Types ----------
export type DeviceCategory = "Mobile" | "Tablet" | "Laptop" | "Desktop" | "Ultrawide" | "Unknown";

export interface ViewportInfo {
  viewportWidth?: number;
  viewportHeight?: number;
}

export interface ClientInfo {
  ip: string;
  browser: string;
  os: string;
  deviceType: string;      // e.g. "Mobile (390x844)"
  deviceCategory: DeviceCategory;
  viewportWidth: number | null;
  viewportHeight: number | null;
  country: string | null;
  state: string | null;
  city: string | null;
}

// ---------- Breakpoints ----------
const BREAKPOINTS: { max: number; label: DeviceCategory }[] = [
  { max: 639, label: "Mobile" },
  { max: 1023, label: "Tablet" },
  { max: 1279, label: "Laptop" },
  { max: 1535, label: "Desktop" },
  { max: Infinity, label: "Ultrawide" },
];

function getDeviceCategory(width?: number): DeviceCategory {
  if (!width || width <= 0) return "Unknown";
  return BREAKPOINTS.find((bp) => width <= bp.max)?.label || "Unknown";
}

// ---------- Main function ----------
export async function getClientInfo({ viewportWidth, viewportHeight }: ViewportInfo = {}): Promise<ClientInfo> {
  const headersList = await headers();

  // --- IP address ---
  const forwardedFor = headersList.get("x-forwarded-for");
  const ip =
    forwardedFor?.split(",")[0]?.trim() ||
    headersList.get("x-real-ip") ||
    "unknown";

  // --- Browser / OS / Device (UA-based fallback) ---
  const userAgent = headersList.get("user-agent") || "";
  const parser = new UAParser(userAgent);
  const browser = parser.getBrowser();
  const os = parser.getOS();
  const device = parser.getDevice();

  // --- Country / State / City (Vercel edge headers) ---
  const country = headersList.get("x-vercel-ip-country") || null;
  const state = headersList.get("x-vercel-ip-country-region") || null;
  const city = headersList.get("x-vercel-ip-city") || null;

  // --- Device category: prefer real viewport width, fallback to UA guess ---
  const uaFallback: DeviceCategory =
    device.type ? ((device.type[0].toUpperCase() + device.type.slice(1)) as DeviceCategory) : "Desktop";

  const deviceCategory =
    getDeviceCategory(viewportWidth) !== "Unknown" ? getDeviceCategory(viewportWidth) : uaFallback;

  const deviceType =
    viewportWidth && viewportHeight
      ? `${deviceCategory} (${viewportWidth}x${viewportHeight})`
      : deviceCategory;

  return {
    ip,
    browser: browser.name ? `${browser.name} ${browser.version || ""}`.trim() : "unknown",
    os: os.name ? `${os.name} - ${os.version || ""}`.trim() : "unknown",
    deviceType,
    deviceCategory,
    viewportWidth: viewportWidth ?? null,
    viewportHeight: viewportHeight ?? null,
    country,
    state,
    city,
  };
}