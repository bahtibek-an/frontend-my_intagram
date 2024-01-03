import React from "react";
import { Box, Skeleton } from "@mui/material";

const SearchResultSkeleton = () => {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="flex-start"
      paddingY={0.8}
    >
      <Skeleton
        variant="circular"
        className="dark:bg-neutral-700"
        width={50}
        height={50}
      />

      <Box ml={2}>
        <Skeleton
          variant="text"
          className="dark:bg-neutral-700"
          width={200}
          height={20}
        />
        <Skeleton
          variant="text"
          className="dark:bg-neutral-700"
          width={150}
          height={20}
        />
      </Box>
    </Box>
  );
};

export default SearchResultSkeleton;
