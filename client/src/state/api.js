// state/api.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_BASE_URL }),
  reducerPath: "adminApi",
  tagTypes: [
    "User",
    "Sales",
    "Admins",
    "Dashboard",
    "Visualization",
    "PieChartData", 
    "LineChartData",
    "Login"
  ],
  endpoints: (build) => ({
    getUser: build.query({
      query: (id) => `general/user/${id}`,
      providesTags: ["User"],
    }),
    getVisualization: build.query({
      query: () => "client/visualization",
      providesTags: ["Visualization"],
    }),
    getSales: build.query({
      query: () => "sales/sales",
      providesTags: ["Sales"],
    }),
    getAdmins: build.query({
      query: () => "management/admins",
      providesTags: ["Admins"],
    }),
    getDashboard: build.query({
      query: () => "general/dashboard",
      providesTags: ["Dashboard"],
    }),
    getPieChartData: build.query({
      query: () => "path/to/pieChartData",
      providesTags: ["PieChartData"],
    }),
    getLineChartData: build.query({
      query: () => "client/visualization", 
      providesTags: ["LineChartData"],
    }),
  }),
});

export const {
  useGetUserQuery,
  useGetSalesQuery,
  useGetAdminsQuery,
  useGetDashboardQuery,
  useGetVisualizationQuery,
  useGetPieChartDataQuery, 
  useGetLineChartDataQuery,
} = api;
