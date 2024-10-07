import moment from 'moment/moment';
import { useCallback } from 'react';
import _ from 'lodash';

export type IDateSection = {
  use_date: string;
};

export type ISection<T> = {
  title: string;
  data: T[];
};

// TODO Review it
export const useGroupByDate = () => {
  const groupByDate = useCallback(
    <T extends IDateSection>(historyCoupon: T) =>
      moment(historyCoupon.use_date, 'YYYY-MM-DD').unix(),
    [],
  );

  const groupFunction = useCallback(
    <T extends IDateSection>(data: T[]): ISection<T>[] => {
      const grouped = _.groupBy(data, groupByDate);

      const keys = _(grouped)
        .keys()
        .sort((a, b) => {
          if (parseInt(a, 10) > parseInt(b, 10)) {
            return -1;
          }
          if (parseInt(a, 10) < parseInt(b, 10)) {
            return 1;
          }
          return 0;
        });

      const collection: ISection<T>[] = [];

      keys.each(key => {
        const group = grouped[key];
        collection.push({
          title: moment(parseInt(key, 10) * 1000).format('MMM D'),
          data: group.sort((a, b) => {
            if (moment(a.use_date).unix() > moment(b.use_date).unix()) {
              return -1;
            }
            if (moment(a.use_date).unix() < moment(b.use_date).unix()) {
              return 1;
            }
            return 0;
          }) as T[],
        });
      });

      return collection;
    },
    [groupByDate],
  );

  return { group: groupFunction };
};
