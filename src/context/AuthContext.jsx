// src/context/AuthContext.jsx

import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Restore user on refresh
  useEffect(() => {
    const restoreUser = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        const storedUser = await AsyncStorage.getItem("user");

        if (token && storedUser) {
          try {
            const parsed = JSON.parse(storedUser);
            setUser(parsed);
            setIsLoggedIn(true);
          } catch (e) {
            console.error("Invalid user JSON", e);
            await AsyncStorage.removeItem("user");
          }
        }
      } catch (error) {
        console.error("Error restoring user:", error);
      }
    };

    restoreUser();
  }, []);

  // LOGIN
  const login = async (username, password) => {
    try {
      const res = await axios.post(
        "https://mttlprv1-production.up.railway.app/jwt/login",
        {
          username,
          password,
        }
      );

      console.log("Login Response:", res.data);

      const token = res.data.accessToken;
      if (!token) return { success: false, message: "No token received" };

      // Load gender either from backend or signup stored value
      const signupGender = await AsyncStorage.getItem("signupGender");
      const gender = res.data.gender || signupGender || null;

      const userObj = {
        id: res.data.userId || null,
        email: username,
        gender: gender, // MALE / FEMALE or null
        roles: res.data.roles || [],
      };

      // Save to AsyncStorage
      await AsyncStorage.setItem("token", token);
      await AsyncStorage.setItem("user", JSON.stringify(userObj));

      setUser(userObj);
      setIsLoggedIn(true);

      return { success: true };
    } catch (err) {
      console.error("Login Error:", err.response?.data || err.message);
      return {
        success: false,
        message: err.response?.data?.message || "Login failed",
      };
    }
  };

  // LOGOUT
  const logout = async () => {
    try {
      await AsyncStorage.removeItem("token");
      await AsyncStorage.removeItem("user");
      setUser(null);
      setIsLoggedIn(false);
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
