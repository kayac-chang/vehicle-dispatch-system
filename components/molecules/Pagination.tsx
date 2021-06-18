import {
  Pagination as _Pagination,
  PaginationItem as Item,
} from "@material-ui/core";
import { useRouter } from "next/dist/client/router";
import { Link } from "components/atoms";

type PaginationProps = {
  total: number;
  page: number;
  onChange?: (page: number) => void;
};
export function Pagination({ total, page, onChange }: PaginationProps) {
  const router = useRouter();

  return (
    <_Pagination
      count={total}
      page={page}
      onChange={(_, page) => onChange?.(page)}
      renderItem={(item) => (
        <Link href={`${router.pathname}?page=${item.page}`}>
          <Item {...item} />

          <span className="sr-only">前往 ${item.page} 頁</span>
        </Link>
      )}
    />
  );
}
