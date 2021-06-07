import { Pagination as _Pagination } from "@material-ui/core";

type PaginationProps = {
  total: number;
  page: number;
  onChange?: (page: number) => void;
};
export function Pagination({ total, page, onChange }: PaginationProps) {
  return (
    <_Pagination
      count={total}
      page={page}
      onChange={(_, page) => onChange?.(page)}
    />
  );
}
