declare global {
  interface Window {
    telemetry?: {
      goal: (name: string, properties?: Record<string, unknown>) => void;
    };
  }
}

export function trackGoal(
  name: string,
  properties?: Record<string, unknown>,
): void {
  window.telemetry?.goal(name, properties);
}
