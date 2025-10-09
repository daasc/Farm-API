/**
 * Utility functions to handle and validate query parameters like pageSize and search.
 */

export interface Params {
  pageSize?: string | number;
  page?: string | number;
  search?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  [key: string]: any;
}

export interface ValidatedParams {
  pageSize: number;
  page: number;
  search: string;
  sortBy: string;
  sortOrder: 'asc' | 'desc';
}

/**
 * Validates and normalizes query parameters.
 * @param params Incoming query params
 * @returns Validated and normalized params
 */
export function handleParams(params: Params): ValidatedParams {
  const DEFAULT_PAGE_SIZE = 30;
  const MAX_PAGE_SIZE = 100;
  const DEFAULT_PAGE = 1;
  const DEFAULT_SORT_BY = 'createdAt';
  const DEFAULT_SORT_ORDER: 'asc' | 'desc' = 'asc';

  let pageSize = Number(params.pageSize);
  if (isNaN(pageSize) || pageSize < 1) pageSize = DEFAULT_PAGE_SIZE;
  if (pageSize > MAX_PAGE_SIZE) pageSize = MAX_PAGE_SIZE;

  let page = Number(params.page);
  if (isNaN(page) || page < 1) page = DEFAULT_PAGE;

  const search = typeof params.search === 'string' ? params.search.trim() : '';

  const sortBy = typeof params.sortBy === 'string' ? params.sortBy.trim() : DEFAULT_SORT_BY;
  const sortOrder = params.sortOrder === 'desc' ? 'desc' : DEFAULT_SORT_ORDER;

  return {
    pageSize,
    page,
    search,
    sortBy,
    sortOrder,
  };
}
