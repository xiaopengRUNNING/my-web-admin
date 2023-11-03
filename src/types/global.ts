export type ZeroOrOne = 0 | 1;

export interface Pagination {
  current: number;
  pageSize: number;
  showPageSize?: boolean;
  showJumper?: boolean;
  hideOnSinglePage?: boolean;
  showTotal?: boolean;
  size?: string;
}
