import { IFiltersApiResponse } from './filters.type';

export const useFilterQuery = () => {
  //TODO Replace it. Only for testing
  const getAllFilters = (): IFiltersApiResponse => {
    return {
      data: [
        { name: 'All', title: 'All', active: false },
        { name: 'Fashion', title: 'Fashion', active: false },
        { name: 'Home', title: 'Home', active: false },
        { name: 'Technology', title: 'Technology', active: false },
        { name: 'Beauty', title: 'Beauty', active: false },
        { name: 'Health', title: 'Health', active: false },
      ],
    };
  };
  return { getAllFilters };
};
