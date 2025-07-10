import { Stack, Typography } from "@mui/material";

const Title = ({ label }: { label: string }) => {
  return (
    <Stack>
      <Typography>{label}</Typography>
    </Stack>
  );
};

export default Title;
