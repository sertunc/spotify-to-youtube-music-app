import { Divider, Pagination, Stack } from "@mui/material";
import CommonStyles from "./CommonStyles";

interface IProps {
  total: number;
  offset: number;
  limit: number;
  handleChange: (event: any, page: number) => void;
}

export default function Pager(props: IProps) {
  return (
    <div style={CommonStyles.paginationContainer}>
      <Divider />
      <Stack spacing={2}>
        <Pagination
          color="secondary"
          showFirstButton
          showLastButton
          count={Math.ceil(props.total / props.limit)}
          page={props.offset / props.limit + 1}
          onChange={props.handleChange}
        />
      </Stack>
    </div>
  );
}
