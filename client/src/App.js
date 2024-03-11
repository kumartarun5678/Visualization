import React, { useMemo, useState } from "react";
import {
  CssBaseline,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import { useSelector } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { themeSettings } from "theme";
import Layout from "scenes/layout";
import Dashboard from "scenes/dashboard";
import Admin from "scenes/admin";
import Visualization from "scenes/visualization";
import Registration from "scenes/Registration";
import Login from "scenes/Login";
import LineChart  from "scenes/lineChart";
import BarChart from "scenes/barChart";
import PieChart from "scenes/pieChart";
function App() {
  const mode = useSelector((state) => state.global.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/visualization" element={<Visualization />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/lineChart" element={<LineChart />}/>
              <Route path="/barChart" element={<BarChart />}/>
              <Route path="/pieChart" element={<PieChart/>}/>
            </Route>
                <Route path="/" element={<Navigate to="/login" replace />} />
                <Route
                  path="/login"
                  element={<Login onLogin={handleLogin} />}
                />
                <Route path="/register" element={<Registration />} />

            
          </Routes>

        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
