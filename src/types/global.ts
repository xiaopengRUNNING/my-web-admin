export type ZeroOrOne = 0 | 1;

export interface Pagination {
  current: number;
  pageSize: number;
  total?: number;
  showPageSize?: boolean;
  showJumper?: boolean;
  hideOnSinglePage?: boolean;
  showTotal?: boolean;
  size?: 'mini' | 'small' | 'medium' | 'large';
}
