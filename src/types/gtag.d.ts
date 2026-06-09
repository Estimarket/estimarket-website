type GtagCommand = "config" | "event" | "js" | "set";

interface Window {
  dataLayer: unknown[];
  gtag: (
    command: GtagCommand,
    targetId: string | Date,
    config?: Record<string, unknown>,
  ) => void;
}
