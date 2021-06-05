import { Pagination as _Pagination } from "@material-ui/core";

type PaginationProps = {
  total: number;
};
export function Pagination({ total }: PaginationProps) {
  return <_Pagination count={total} />;
}
