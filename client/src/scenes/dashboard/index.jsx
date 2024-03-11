import React from "react";
import { Box, Typography, Divider } from "@mui/material";
import { useGetVisualizationQuery } from "state/api";
import LineChart from "scenes/lineChart";
import PieChart from "scenes/pieChart";
import BarChart from "scenes/barChart";

const Dashboard = () => {
  const { data: visualizationData, isLoading: visualizationLoading } = useGetVisualizationQuery();
  return (
    <Box m="1.5rem 2.5rem">
      {visualizationLoading ? (
        <Typography>Loading visualization chart...</Typography>
      ) : (
        <Box>
          <Box display="flex" justifyContent="center" mb={2}>
            <Box flex="1" mr={1}>
              <Typography variant="h6" align="center">Bar Chart</Typography>
              <Box style={{ width: "100%", height: "300px" }}>
                <BarChart data={visualizationData} />
              </Box>
            </Box>
            <Divider orientation="vertical" flexItem />
            <Box flex="1" ml={1}>
              <Typography variant="h6" align="center">Line Chart</Typography>
              <Box style={{ width: "100%", height: "300px" }}>
                <LineChart data={visualizationData} />
              </Box>
            </Box>
          </Box>
          <Divider sx={{ my: 2 }} />
          <Box display="flex" justifyContent="center">
            <Box>
              <Typography variant="h6" align="center">Pie Chart</Typography>
              <Box sx={{ width: "300px", height: "300px", margin: "0 auto" }}>
                <PieChart data={visualizationData} />
              </Box>
            </Box>
          </Box>
          <Divider sx={{ my: 2 }} />
        </Box>
      )}
    </Box>
  );
};

export default Dashboard;
