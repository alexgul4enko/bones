import get from 'lodash/get';

/*
 * Default function to prepare next API request to fetch data in Infinity list
 */
export function getFilters(props: { [key: string]: unknown }, key: string) {
  // cursor
  const cursor = get(get(props, key), 'data.nextCursor');
  let { limit, offset } = get<any, any>(get(props, key), 'filters', {});
  if (cursor === null) {
    return;
  }
  if (cursor && limit) {
    return { cursor, limit };
  }
  if (cursor) {
    return { cursor };
  }

  if (limit !== undefined && offset !== undefined) {
    limit = parseInt(limit, 10);
    offset = parseInt(offset, 10);
    // eslint-disable-next-line
        if (offset + limit >= get(get(props, key), 'data.count', 0)) {
      return;
    }
    return {
      // eslint-disable-next-line
            offset: limit + offset,
      limit
    };
  }
}
