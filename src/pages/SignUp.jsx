import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  ActivityIndicator,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SignUp = () => {
  const navigation = useNavigation();

  const [formData, setFormData] = useState({
    profileFor: "",
    gender: "",
    email: "",
    phone: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [apiMessage, setApiMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.profileFor) newErrors.profileFor = "Please select profile for";
    if (!formData.gender) newErrors.gender = "Please select gender";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.phone) newErrors.phone = "Phone is required";
    if (!formData.password) newErrors.password = "Password is required";

    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (formData.password && formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignUp = async () => {
    if (!validate()) return;

    setLoading(true);
    setApiMessage("");

    try {
      const response = await axios.post(
        "https://mttlprv1-production.up.railway.app/jwt/signup",
        formData
      );

      if (response.data) {
        await AsyncStorage.setItem("signupGender", formData.gender);
        navigation.navigate("SignIn");
      }
    } catch (error) {
      setApiMessage(error.response?.data?.message || "Sign up failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ImageBackground
        source={require("../assets/SignIn/BackgroundSignIn.jpg")}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <View style={styles.overlay} />
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.signUpBox}>
            <Text style={styles.title}>Sign Up</Text>

            {apiMessage && (
              <View style={styles.messageContainer}>
                <Text style={styles.messageText}>{apiMessage}</Text>
              </View>
            )}

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Profile For:</Text>
              <View style={styles.radioGroup}>
                <TouchableOpacity
                  style={[styles.radioOption, formData.profileFor === "SELF" && styles.radioSelected]}
                  onPress={() => handleChange("profileFor", "SELF")}
                >
                  <Text style={styles.radioText}>Self</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.radioOption, formData.profileFor === "SON" && styles.radioSelected]}
                  onPress={() => handleChange("profileFor", "SON")}
                >
                  <Text style={styles.radioText}>Son</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.radioOption, formData.profileFor === "DAUGHTER" && styles.radioSelected]}
                  onPress={() => handleChange("profileFor", "DAUGHTER")}
                >
                  <Text style={styles.radioText}>Daughter</Text>
                </TouchableOpacity>
              </View>
              {errors.profileFor && <Text style={styles.errorText}>{errors.profileFor}</Text>}
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Gender:</Text>
              <View style={styles.radioGroup}>
                <TouchableOpacity
                  style={[styles.radioOption, formData.gender === "MALE" && styles.radioSelected]}
                  onPress={() => handleChange("gender", "MALE")}
                >
                  <Text style={styles.radioText}>Male</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.radioOption, formData.gender === "FEMALE" && styles.radioSelected]}
                  onPress={() => handleChange("gender", "FEMALE")}
                >
                  <Text style={styles.radioText}>Female</Text>
                </TouchableOpacity>
              </View>
              {errors.gender && <Text style={styles.errorText}>{errors.gender}</Text>}
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Email:</Text>
              <TextInput
                style={[styles.input, errors.email && styles.inputError]}
                placeholder="email@example.com"
                placeholderTextColor="#9CA3AF"
                value={formData.email}
                onChangeText={(value) => handleChange("email", value)}
                keyboardType="email-address"
                autoCapitalize="none"
              />
              {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Phone:</Text>
              <TextInput
                style={[styles.input, errors.phone && styles.inputError]}
                placeholder="Phone number"
                placeholderTextColor="#9CA3AF"
                value={formData.phone}
                onChangeText={(value) => handleChange("phone", value)}
                keyboardType="phone-pad"
              />
              {errors.phone && <Text style={styles.errorText}>{errors.phone}</Text>}
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Password:</Text>
              <TextInput
                style={[styles.input, errors.password && styles.inputError]}
                placeholder="Password"
                placeholderTextColor="#9CA3AF"
                value={formData.password}
                onChangeText={(value) => handleChange("password", value)}
                secureTextEntry
              />
              {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}
            </View>

            <TouchableOpacity
              style={[styles.signUpButton, loading && styles.signUpButtonDisabled]}
              onPress={handleSignUp}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#FFFFFF" />
              ) : (
                <Text style={styles.signUpButtonText}>Sign Up</Text>
              )}
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigation.navigate("SignIn")}
              style={styles.signInLink}
            >
              <Text style={styles.signInLinkText}>Already have an account? Sign In</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  signUpBox: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 24,
    width: "100%",
    maxWidth: 400,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  title: {
    textAlign: "center",
    fontSize: 28,
    fontWeight: "600",
    color: "#F97316",
    marginBottom: 24,
  },
  messageContainer: {
    backgroundColor: "#FEF2F2",
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  messageText: {
    textAlign: "center",
    color: "#DC2626",
    fontSize: 14,
  },
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
    color: "#374151",
    marginBottom: 8,
  },
  radioGroup: {
    flexDirection: "row",
    gap: 12,
  },
  radioOption: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 8,
    alignItems: "center",
  },
  radioSelected: {
    backgroundColor: "#F97316",
    borderColor: "#F97316",
  },
  radioText: {
    fontSize: 14,
    color: "#374151",
  },
  input: {
    width: "100%",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 8,
    fontSize: 14,
    color: "#111827",
  },
  inputError: {
    borderColor: "#DC2626",
  },
  errorText: {
    color: "#DC2626",
    fontSize: 12,
    marginTop: 4,
  },
  signUpButton: {
    width: "100%",
    backgroundColor: "#F97316",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 8,
  },
  signUpButtonDisabled: {
    backgroundColor: "#FB923C",
  },
  signUpButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "500",
  },
  signInLink: {
    marginTop: 16,
    alignItems: "center",
  },
  signInLinkText: {
    color: "#F97316",
    fontSize: 14,
  },
});

export default SignUp;
