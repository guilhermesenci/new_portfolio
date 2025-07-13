import { Pagination as MUIPagination } from "@mui/material";
import Stack from "@mui/material/Stack";

type Props = {
  page: number;
  count: number;
  onChange: (event: React.ChangeEvent<unknown>, value: number) => void;
};

const Pagination = ({ page, count, onChange }: Props) => {
  return (
    <Stack spacing={2}>
      <MUIPagination count={count} page={page} onChange={onChange} />
    </Stack>
  );
};

export default Pagination;
