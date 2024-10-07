export type IFilter = {
  name: string;
  title: string;
  active: boolean;
};

export type IFiltersCollection = IFilter[];

export type IFiltersApiResponse = {
  data: IFiltersCollection;
};
