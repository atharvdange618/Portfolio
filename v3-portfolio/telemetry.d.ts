export {};

declare global {
  interface Window {
    telemetry?: {
      goal: (name: string, properties?: Record<string, unknown>) => void;
      pageview: () => void;
    };
  }
}
