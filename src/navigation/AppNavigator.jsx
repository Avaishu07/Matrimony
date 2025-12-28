import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "../context/api";
import { AuthProvider } from "../context/AuthContext";

// Pages
import Home from "../pages/Home";
import SearchProfiles from "../pages/SearchProfiles";
import Brides from "../pages/Brides";
import Grooms from "../pages/Grooms";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import ForgotPasswordPage from "../pages/ForgotPassword";
import OtpVerificationPage from "../pages/OtpVerification";
import ResetPasswordPage from "../pages/ResetPassword";
import SuccessStories from "../components/SuccessStories/SuccessStoriesMain";
import ProfileCreation from "../components/CreateProfile/ProfileCreation";
import Contact from "../components/Contact/ContactSection";
import MembershipPlans from "../components/MembershipPlan/MembershipPlans";
import ViewProfile from "../components/ViewProfile/ViewProfile";
import ViewProfilePage from "../pages/ViewProfilePage";
import MatchesInPune from "../pages/MatchesInPune";
import RequestSent from "../components/RequestSent/RequestSent";
import RequestsPage from "../pages/RequestsPage";
import BiodataTemplate, { emptyBiodata } from "../pages/ProfileCreation/emptyBiodata";
import SuccessModal from "../pages/ProfileCreation/SuccessModal";
import LogoutPanel from "../components/LogoutPanel/LogoutPanel";
import OthersEmptyBiodataPage from "../pages/ProfileCreation/OthersEmptyBiodataPage";
import PublicBiodataPage from "../pages/ProfileCreation/PublicBiodataPage";
import MyProfilePage from "../pages/ProfileCreation/MyProfilePage";

const Stack = createNativeStackNavigator();

// Create RTK store
const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

const AppNavigator = () => {
  return (
    <Provider store={store}>
      <AuthProvider>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Home"
            screenOptions={{
              headerShown: false,
            }}
          >
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="SearchProfiles" component={SearchProfiles} />
            <Stack.Screen name="Brides" component={Brides} />
            <Stack.Screen name="Grooms" component={Grooms} />
            <Stack.Screen name="SuccessStories" component={SuccessStories} />
            <Stack.Screen name="Plans" component={MembershipPlans} />
            <Stack.Screen name="Contact" component={Contact} />
            <Stack.Screen name="SignIn" component={SignIn} />
            <Stack.Screen name="SignUp" component={SignUp} />
            <Stack.Screen name="CreateProfile" component={ProfileCreation} />
            <Stack.Screen name="ViewProfile" component={ViewProfile} />
            <Stack.Screen name="ViewProfilePage" component={ViewProfilePage} />
            <Stack.Screen name="MatchesInPune" component={MatchesInPune} />
            <Stack.Screen name="RequestSent" component={RequestSent} />
            <Stack.Screen name="RequestsPage" component={RequestsPage} />
            <Stack.Screen 
              name="EmptyBiodata" 
              component={BiodataTemplate}
              initialParams={{ data: emptyBiodata }}
            />
            <Stack.Screen name="SuccessModal" component={SuccessModal} />
            <Stack.Screen name="LogoutPanel" component={LogoutPanel} />
            <Stack.Screen name="OthersEmptyBiodataPage" component={OthersEmptyBiodataPage} />
            <Stack.Screen name="PublicBiodataPage" component={PublicBiodataPage} />
            <Stack.Screen name="MyProfile" component={MyProfilePage} />
            <Stack.Screen name="Forgot" component={ForgotPasswordPage} />
            <Stack.Screen name="Otp" component={OtpVerificationPage} />
            <Stack.Screen name="Reset" component={ResetPasswordPage} />
          </Stack.Navigator>
        </NavigationContainer>
      </AuthProvider>
    </Provider>
  );
};

export default AppNavigator;

