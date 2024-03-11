import React, { useState } from "react";
import { Box, Typography, Button, Collapse, useTheme, FormControl, Select, MenuItem } from "@mui/material";
import { useGetVisualizationQuery } from "state/api";
import DataChart from "components/DataChart";

import Header from "components/Header";
import { DataGrid } from "@mui/x-data-grid";

const VisualizationRow = ({ data }) => {
  const [isExpanded, setIsExpanded] = useState(false);
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
          <Typography>Region: {data.region}</Typography>
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
  const { data, isLoading } = useGetVisualizationQuery();
  
  // States for filters
  const [filters, setFilters] = useState({
    sector: "",
    endYear: "",
    topics: "",
    region: "",
    source: ""
  });

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;
  // Change handler for filters
  const handleFilterChange = (name, value) => {
    setFilters({
      ...filters,
      [name]: value
    });
  };
    
  // Filter data based on selected filters
  const filteredData = data && data.filter(item => {
    return (!filters.sector || item.sector === filters.sector) &&
      (!filters.endYear || item.end_year === filters.endYear) &&
      (!filters.topics || item.topic === filters.topics) &&
      (!filters.region || item.region === filters.region) &&
      (!filters.source || item.source === filters.source);
  });
  // Calculate total pages
  const totalPages = Math.ceil(filteredData?.length / itemsPerPage);

  // Calculate index of the first and last item to be displayed
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  // Get current items based on pagination
  const currentItems = filteredData?.slice(indexOfFirstItem, indexOfLastItem);

  // Function to handle pagination change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  return (
    <Box m="1.5rem 2.5rem">
      <Header title="Welcome To Visualization Dashboard !"  />
      <br/>
      
      <h2>Filter</h2>
      <Box display="flex" justifyContent="space-between" mb={2}>
        <FormControl sx={{ minWidth: 120, marginRight: '1rem' }}  >
        <h4>Sector:</h4>
          <Select
            value={filters.sector}
            onChange={(e) => handleFilterChange("sector", e.target.value)}
            displayEmpty
          >
            <MenuItem value="">All Sectors</MenuItem>
            {data && data.map((item) => (
              <MenuItem key={item._id} value={item.sector}>{item.sector}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl sx={{ minWidth: 120, marginRight: '1rem' }}>
          <h4>End Year</h4>
          <Select
            value={filters.endYear}
            onChange={(e) => handleFilterChange("endYear", e.target.value)}
            displayEmpty
          >
            <MenuItem value="">All End Years</MenuItem>
            {data && data.map((item) => (
              <MenuItem key={item._id} value={item.end_year}>{item.end_year}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl sx={{ minWidth: 120, marginRight: '1rem' }}>
          <h4>Topic</h4>
          <Select
            value={filters.topics}
            onChange={(e) => handleFilterChange("topics", e.target.value)}
            displayEmpty
          >
            <MenuItem value="">All Topics</MenuItem>
            {data && data.map((item) => (
              <MenuItem key={item._id} value={item.topic}>{item.topic}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl sx={{ minWidth: 120, marginRight: '1rem' }}>
          <h4>Regions</h4>
          <Select
            value={filters.region}
            onChange={(e) => handleFilterChange("region", e.target.value)}
            displayEmpty
          >
            <MenuItem value="">All Regions</MenuItem>
            {data && data.map((item) => (
              <MenuItem key={item._id} value={item.region}>{item.region}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl sx={{ minWidth: 120, marginRight: '1rem' }}>
          <h4>Sources</h4>
          <Select
            value={filters.source}
            onChange={(e) => handleFilterChange("source", e.target.value)}
            displayEmpty
          >
            <MenuItem value="">All Sources</MenuItem>
            {data && data.map((item) => (
              <MenuItem key={item._id} value={item.source}>{item.source}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      
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
           {(currentItems?.length > 0  || filteredData?.length > 0)? (
            (filteredData && currentItems).map((item) => <VisualizationRow key={item._id} data={item} />)
          ) : (
            <Typography>No visualizations available for the selected filters.</Typography>
          )}
        </Box>
      )}
      <Box display="flex" justifyContent="center" mt={2}>
        {Array.from({ length: totalPages }, (_, index) => (
          <Button
            key={index}
            variant="outlined"
            color={currentPage === index + 1 ? "primary" : "inherit"}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </Button>
        ))}
      </Box>

    </Box>
  );
};

export default Visualization;