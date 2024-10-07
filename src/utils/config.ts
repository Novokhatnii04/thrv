export enum EStage {
  LocalAndrew,
  Staging,
  Production,
  Vitalii,
}

export const getDomainByStage = (stage: EStage) => {
  switch (stage) {
    case EStage.Staging:
      return 'https://staging-5em2ouy-mlwm4evneyvbe.uk-1.platformsh.site';
    case EStage.Production:
      return 'https://production-vohbr3y-mlwm4evneyvbe.uk-1.platformsh.site';
    case EStage.LocalAndrew:
      return 'https://192.168.0.200:8000';
    case EStage.Vitalii:
      return 'https://261-create-virtual-baihvaq-mlwm4evneyvbe.uk-1.platformsh.site';
  }
};
