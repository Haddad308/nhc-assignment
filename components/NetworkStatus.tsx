"use client";

import { useEffect, useState } from "react";
import { Wifi, WifiOff } from "lucide-react";

export default function NetworkStatus() {
  const [isOnline, setIsOnline] = useState(true);
  const [wasOffline, setWasOffline] = useState(false); // Track if user was offline
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const handleOnline = () => {
      if (wasOffline) {
        setIsOnline(true);
        setVisible(true);
        setDismissed(false);
        const timer = setTimeout(() => setVisible(false), 3000);
        return () => clearTimeout(timer);
      }
    };

    const handleOffline = () => {
      setIsOnline(false);
      setWasOffline(true); // Now we know connection was lost
      setVisible(true);
      setDismissed(false);
    };

    // Set initial state
    const online = navigator.onLine;
    setIsOnline(online);
    setWasOffline(!online);
    if (!online) {
      setVisible(true);
    }

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, [wasOffline]);

  // Animation effect
  useEffect(() => {
    if (visible) {
      setIsAnimating(true);
      const timer = setTimeout(() => setIsAnimating(false), 300);
      return () => clearTimeout(timer);
    }
  }, [visible]);

  // Hide if dismissed and still offline
  if (!isOnline && dismissed) return null;

  // Hide if online and not visible
  if (isOnline && !visible) return null;

  const containerClasses = `fixed top-0 left-0 right-0 z-50 p-4 flex justify-center pointer-events-none transition-all duration-300 ${
    isAnimating ? "opacity-0 -translate-y-10" : "opacity-100 translate-y-0"
  }`;

  const notificationClasses = `rounded-full shadow-lg px-4 py-2 flex items-center gap-2 max-w-md mx-auto pointer-events-auto ${
    isOnline
      ? "bg-green-50 text-green-800 border border-green-200"
      : "bg-red-50 text-red-800 border border-red-200"
  }`;

  return (
    <div className={containerClasses} role="status" aria-live="polite">
      <div className={notificationClasses}>
        {isOnline ? (
          <>
            <Wifi className="h-4 w-4 text-green-500" />
            <span className="text-sm font-medium">Connection restored</span>
          </>
        ) : (
          <>
            <WifiOff className="h-4 w-4 text-red-500" />
            <span className="text-sm font-medium">No internet connection</span>
            <button
              onClick={() => setDismissed(true)}
              className="ml-2 text-xs text-red-600 hover:text-red-800 underline"
              aria-label="Dismiss notification"
            >
              Dismiss
            </button>
          </>
        )}
      </div>
    </div>
  );
}
