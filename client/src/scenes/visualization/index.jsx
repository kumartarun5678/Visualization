import React from "react";
import { Box, Typography, Button, Collapse, useTheme } from "@mui/material";
import { useGetVisulizationQuery } from "state/api";

import Header from "components/Header";
import { DataGrid } from "@mui/x-data-grid";

const VisualizationRow = ({ data }) => {
  const [isExpanded, setIsExpanded] = React.useState(false);
  const theme = useTheme();

  return (
    <Box
      sx={{
        backgroundImage: "none",
        backgroundColor: theme.palette.background.alt,
        borderRadius: "0.55rem",
        padding: "1rem",
        marginBottom: "1.5rem",
        overflow: "hidden",
      }}
    >
      <Typography variant="h5">{data.title}</Typography>
      <Typography
        sx={{
          marginBottom: "1rem",
          color: theme.palette.secondary[400],
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }}
      >
        {data.description}
      </Typography>
      <Typography>Intensity: {data.intensity}</Typography>
      <Typography>Likelihood: {data.likelihood}</Typography>
      <Typography>Relevance: {data.relevance}</Typography>

      <Typography
        component="a"
        href={data.url}
        target="_blank"
        rel="noopener noreferrer"
        sx={{
          fontWeight: "bold",
          color: theme.palette.primary.main,
          textDecoration: "underline",
          cursor: "pointer",
          "&:hover": {
            color: theme.palette.primary.dark,
          },
        }}
      >
        URL: {data.url}
      </Typography>

      <Button
        variant="primary"
        size="small"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {isExpanded ? "Hide Details" : "See More"}
      </Button>

      <Collapse in={isExpanded}>
        <Box>
          <Typography sx={{ marginTop: "1rem" }}>
            End Year: {data.end_year}
          </Typography>
          <Typography>Sector: {data.sector}</Typography>
          <Typography>Topic: {data.topic}</Typography>
          <Typography>Insight: {data.insight}</Typography>

          <Typography>Start Year: {data.start_year}</Typography>
          <Typography>Impact: {data.impact}</Typography>
          <Typography>
            Added: {new Date(data.added).toLocaleString("en-US")}
          </Typography>
          <Typography>
            Published:{" "}
            {data.published
              ? new Date(data.published).toLocaleString("en-US")
              : ""}
          </Typography>
          <Typography>Pestle: {data.pestle}</Typography>
          <Typography>Source: {data.source}</Typography>
        </Box>
      </Collapse>
    </Box>
  );
};

const Visualization = () => {
  const theme = useTheme();
  const { data, isLoading } = useGetVisulizationQuery();

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="VISUALIZATION" subtitle="See your list of Visualization" />
      {isLoading ? (
        <Typography>Loading...</Typography>
      ) : (
        <Box
          mt="20px"
          display="grid"
          gridTemplateColumns="1fr 1fr 1fr 1fr"
          justifyContent="space-between"
          rowGap="20px"
          columnGap="20px"
          sx={{
            "& > div": {
              gridColumn: "span 1",
              overflow: "hidden",
            },
          }}
        >
          {data?.length > 0 ? (
            data.map((item) => <VisualizationRow key={item._id} data={item} />)
          ) : (
            <Typography>No visualizations available.</Typography>
          )}
        </Box>
      )}
    </Box>
  );
};

export default Visualization;
