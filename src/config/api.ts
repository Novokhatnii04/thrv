import { EStage, getDomainByStage } from '@/utils/config';

// Change it before release
export const stage = EStage.Staging as EStage;

export const DOMAIN = getDomainByStage(stage);

export const PIXEL_ID = '1759848131105364';

export const DEBUG = {
  Api: false,
};
