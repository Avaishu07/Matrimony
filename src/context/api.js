
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Custom baseQuery to handle AsyncStorage token
const baseQueryWithAuth = async (args, api, extraOptions) => {
  // Get token from AsyncStorage
  const tokenFromState = api.getState()?.auth?.token;
  const token = tokenFromState || await AsyncStorage.getItem("token");

  const baseQuery = fetchBaseQuery({
    baseUrl: "https://mttlprv1-production.up.railway.app",
    prepareHeaders: (headers) => {
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      headers.set("Content-Type", "application/json");
      return headers;
    },
  });

  return baseQuery(args, api, extraOptions);
};

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithAuth,

  tagTypes: [
    "Profile",
    "OwnProfile",
    "ProfilePhoto",
    "BrowseProfiles",
    "SentInterests",
    "ReceivedInterests",
  ],

  endpoints: () => ({}),
});
