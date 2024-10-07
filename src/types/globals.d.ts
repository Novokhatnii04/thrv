// globals.d.ts
interface Window {
  OneTrust: {
    OnConsentChanged: (callback: (event: { detail: string[] }) => void) => void;
    ToggleInfoDisplay: () => void;
  };
}

declare function fbq(eventName: string, ...args: unknown[]): void;
