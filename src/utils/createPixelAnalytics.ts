import { PIXEL_ID } from '@/config/api';

export let pixelInitialized = false;
export const createPixelAnalytics = () => {
  if (pixelInitialized) {
    return;
  }

  fbq('init', PIXEL_ID);
  fbq('track', 'PageView');

  pixelInitialized = true;
};
