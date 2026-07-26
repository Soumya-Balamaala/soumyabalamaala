// hooks/useTrackClientInfo.ts
"use client";

import { useEffect } from "react";

export function useTrackClientInfo(extra?: Record<string, any>) {
  useEffect(() => {
    fetch("/api/client-info", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        viewportWidth: window.innerWidth,
        viewportHeight: window.innerHeight,
        ...extra,
      }),
    }).catch((err) => console.error("Failed to track client info:", err));
  }, []);
}