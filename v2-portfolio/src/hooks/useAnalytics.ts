"use client";

import { useEffect, useRef, useCallback } from "react";

/**
 * Event to track
 */
interface AnalyticsEvent {
  sessionId: string;
  commandName: string;
  args: string[];
  timestamp: string;
}

/**
 * Analytics hook for tracking terminal sessions and commands
 */
export function useAnalytics() {
  const sessionIdRef = useRef<string | null>(null);
  const eventQueueRef = useRef<AnalyticsEvent[]>([]);
  const flushIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const sessionStartTimeRef = useRef<number>(0);
  const lastActivityRef = useRef<number>(0);
  const hasInitializedRef = useRef(false);

  /**
   * Flush event queue to server
   */
  const flushEvents = useCallback(async () => {
    if (eventQueueRef.current.length === 0 || !sessionIdRef.current) {
      return;
    }

    const eventsToSend = [...eventQueueRef.current];
    eventQueueRef.current = [];

    try {
      await fetch("/api/analytics/track", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          events: eventsToSend,
        }),
      });
    } catch (error) {
      console.error("Failed to flush analytics events:", error);
      // Re-add events to queue on failure
      eventQueueRef.current.unshift(...eventsToSend);
    }
  }, []);

  /**
   * Initialize analytics session
   */
  const initializeSession = useCallback(async () => {
    if (hasInitializedRef.current) return;
    hasInitializedRef.current = true;

    try {
      const response = await fetch("/api/analytics/session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userAgent: navigator.userAgent,
          screenResolution: `${window.screen.width}x${window.screen.height}`,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        sessionIdRef.current = data.sessionId;
        sessionStartTimeRef.current = Date.now();
        lastActivityRef.current = Date.now();
      }
    } catch (error) {
      console.error("Failed to initialize analytics session:", error);
    }
  }, []);

  /**
   * End analytics session
   */
  const endSession = useCallback(async () => {
    if (!sessionIdRef.current) return;

    // Flush remaining events
    await flushEvents();

    // Update session end time
    try {
      await fetch("/api/analytics/session", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sessionId: sessionIdRef.current,
          endTime: new Date().toISOString(),
          commandCount: eventQueueRef.current.length,
        }),
      });
    } catch (error) {
      console.error("Failed to end analytics session:", error);
    }
  }, [flushEvents]);

  /**
   * Track a command execution
   */
  const trackCommand = useCallback(
    (commandName: string, args: string[] = []) => {
      if (!sessionIdRef.current) return;

      const now = Date.now();
      lastActivityRef.current = now;

      // Check for 30-minute inactivity timeout
      const inactivityDuration = now - lastActivityRef.current;
      const thirtyMinutes = 30 * 60 * 1000;

      if (inactivityDuration > thirtyMinutes) {
        // Session timed out, end it and start a new one
        endSession();
        initializeSession();
        return;
      }

      // Add event to queue
      const event: AnalyticsEvent = {
        sessionId: sessionIdRef.current,
        commandName,
        args,
        timestamp: new Date().toISOString(),
      };

      eventQueueRef.current.push(event);
    },
    [endSession, initializeSession]
  );

  /**
   * Handle visibility change
   */
  const handleVisibilityChange = useCallback(() => {
    if (document.hidden) {
      // Page is hidden, flush events
      flushEvents();
    }
  }, [flushEvents]);

  /**
   * Handle page unload
   */
  const handleBeforeUnload = useCallback(() => {
    // Flush events and end session
    if (sessionIdRef.current && eventQueueRef.current.length > 0) {
      // Use sendBeacon for reliable delivery during page unload
      const eventsToSend = [...eventQueueRef.current];
      navigator.sendBeacon(
        "/api/analytics/track",
        JSON.stringify({
          events: eventsToSend,
        })
      );
    }

    // End session
    if (sessionIdRef.current) {
      navigator.sendBeacon(
        "/api/analytics/session",
        JSON.stringify({
          sessionId: sessionIdRef.current,
          endTime: new Date().toISOString(),
        })
      );
    }
  }, []);

  /**
   * Initialize analytics on mount
   */
  useEffect(() => {
    initializeSession();

    // Set up flush interval (15 seconds)
    flushIntervalRef.current = setInterval(() => {
      flushEvents();
    }, 15000);

    // Listen for visibility changes
    document.addEventListener("visibilitychange", handleVisibilityChange);

    // Listen for page unload
    window.addEventListener("beforeunload", handleBeforeUnload);

    // Cleanup on unmount
    return () => {
      if (flushIntervalRef.current) {
        clearInterval(flushIntervalRef.current);
      }

      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("beforeunload", handleBeforeUnload);

      // Final flush and end session
      endSession();
    };
  }, [
    initializeSession,
    flushEvents,
    handleVisibilityChange,
    handleBeforeUnload,
    endSession,
  ]);

  return {
    trackCommand,
  };
}
