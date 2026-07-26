// components/ClientTracker.tsx
"use client";
import { useTrackClientInfo } from "@/hooks/useTrackClientInfo";

export default function ClientTracker() {
  useTrackClientInfo({ page: typeof window !== "undefined" ? window.location.pathname : "" });
  return null; // renders nothing
}