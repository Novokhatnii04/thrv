import { useEffect, useState } from 'react';
import { useAnalyticsStore } from '@/store/analytics.store';
import { logEvent, setAnalyticsCollectionEnabled } from '@firebase/analytics';
import {
  createFirebaseAnalytics,
  firebaseAnalytics,
} from '@/utils/createFirebaseAnalytics';
import { createPixelAnalytics } from '@/utils/createPixelAnalytics';

export interface IAnalyticsState {
  logPixelEvent: (name: string, payload?: { [key: string]: unknown }) => void;
  logFirebaseEvent: (
    name: string,
    payload?: { [key: string]: unknown },
  ) => void;
}

export const useAnalytics = (): IAnalyticsState => {
  const { consent, setConsent } = useAnalyticsStore();
  const [isConsentInitialized, setIsConsentInitialized] = useState(false);

  useEffect(() => {
    const cookieConsent = localStorage.getItem('cookieConsent');

    if (
      cookieConsent &&
      (cookieConsent === 'true' || cookieConsent === 'false')
    ) {
      setConsent(cookieConsent === 'true');
    }

    setIsConsentInitialized(true);
  }, [setConsent]);

  useEffect(() => {
    const checkOneTrust = () => {
      const oneTrustInstance = window.OneTrust;

      if (!oneTrustInstance) {
        setTimeout(checkOneTrust, 100);
        return;
      }

      oneTrustInstance.OnConsentChanged(event => {
        const currentConsent = event.detail.some((d: string) => d === 'C0002');

        localStorage.setItem('cookieConsent', currentConsent.toString());
        setConsent(currentConsent);
      });
    };

    if (!window.OneTrust) {
      checkOneTrust();
    }
  }, [setConsent]);

  useEffect(() => {
    if (!isConsentInitialized) {
      return;
    }

    if (consent) {
      createFirebaseAnalytics();
      createPixelAnalytics();
    }

    if (firebaseAnalytics) {
      setAnalyticsCollectionEnabled(firebaseAnalytics, consent);
    }

    fbq('consent', consent ? 'grant' : 'revoke');
  }, [consent, isConsentInitialized]);

  const logPixelEvent = (
    name: string,
    payload?: { [key: string]: unknown },
  ) => {
    if (consent) {
      fbq('track', name, payload);
    }
  };

  const logFirebaseEvent = (
    name: string,
    payload?: { [key: string]: unknown },
  ) => {
    if (consent && firebaseAnalytics) {
      logEvent(firebaseAnalytics, name, payload);
    }
  };

  return {
    logPixelEvent,
    logFirebaseEvent,
  };
};
