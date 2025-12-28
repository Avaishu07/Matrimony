# React to React Native Conversion Guide

This guide documents the conversion patterns used to transform the React web app to React Native.

## Key Changes Made

### 1. Dependencies
- Added React Navigation (`@react-navigation/native`, `@react-navigation/native-stack`)
- Added AsyncStorage (`@react-native-async-storage/async-storage`)
- Added Vector Icons (`react-native-vector-icons`)
- Added Gesture Handler (`react-native-gesture-handler`)

### 2. Navigation
- **Before**: React Router (`react-router-dom`)
  ```jsx
  import { useNavigate, NavLink } from "react-router-dom";
  <NavLink to="/signin">Sign In</NavLink>
  navigate("/signin");
  ```

- **After**: React Navigation
  ```jsx
  import { useNavigation } from "@react-navigation/native";
  <TouchableOpacity onPress={() => navigation.navigate("SignIn")}>
    <Text>Sign In</Text>
  </TouchableOpacity>
  navigation.navigate("SignIn");
  ```

### 3. Storage
- **Before**: `localStorage`
  ```jsx
  localStorage.setItem("token", token);
  const token = localStorage.getItem("token");
  ```

- **After**: AsyncStorage
  ```jsx
  import AsyncStorage from "@react-native-async-storage/async-storage";
  await AsyncStorage.setItem("token", token);
  const token = await AsyncStorage.getItem("token");
  ```

### 4. Components

#### HTML Elements → React Native Components
- `div` → `View`
- `span` → `Text`
- `p` → `Text`
- `h1, h2, h3` → `Text` with appropriate styles
- `button` → `TouchableOpacity` or `Pressable`
- `input` → `TextInput`
- `img` → `Image`
- `ul/li` → `View` with `map`
- `a` → `TouchableOpacity` with navigation
- `form` → `View` (handle submit with `onPress`)

#### Icons
- **Before**: `lucide-react` or `react-icons`
  ```jsx
  import { Bell, Menu } from "lucide-react";
  <Bell size={20} />
  ```

- **After**: `react-native-vector-icons`
  ```jsx
  import Icon from "react-native-vector-icons/Feather";
  <Icon name="bell" size={20} color="#FF8A41" />
  ```

### 5. Styling
- **Before**: CSS classes (Tailwind)
  ```jsx
  <div className="flex items-center gap-4 bg-white p-4">
  ```

- **After**: StyleSheet
  ```jsx
  <View style={styles.container}>
  
  const styles = StyleSheet.create({
    container: {
      flexDirection: "row",
      alignItems: "center",
      gap: 16,
      backgroundColor: "#FFFFFF",
      padding: 16,
    },
  });
  ```

### 6. Images
- **Before**: Import or URL
  ```jsx
  import image from "./image.jpg";
  <img src={image} />
  ```

- **After**: require() for local images
  ```jsx
  <Image source={require("./image.jpg")} />
  ```

### 7. Forms
- **Before**: HTML form with `onSubmit`
  ```jsx
  <form onSubmit={handleSubmit}>
    <input type="email" name="email" />
  </form>
  ```

- **After**: View with TextInput and TouchableOpacity
  ```jsx
  <View>
    <TextInput
      value={email}
      onChangeText={setEmail}
      keyboardType="email-address"
    />
    <TouchableOpacity onPress={handleSubmit}>
      <Text>Submit</Text>
    </TouchableOpacity>
  </View>
  ```

### 8. Layout Components
- Pages should be wrapped with `AppLayout` component
- `AppLayout` includes `Navbar` and `Footer`

### 9. Common Patterns

#### Conditional Rendering
- Same pattern works: `{condition && <Component />}`

#### Lists
- **Before**: `ul/li`
  ```jsx
  <ul>
    {items.map(item => <li key={item.id}>{item.name}</li>)}
  </ul>
  ```

- **After**: `View` with `map`
  ```jsx
  <View>
    {items.map(item => (
      <View key={item.id}>
        <Text>{item.name}</Text>
      </View>
    ))}
  </View>
  ```

#### Scrollable Content
- Use `ScrollView` for scrollable content
- Use `FlatList` for long lists (better performance)

## Remaining Files to Convert

The following files still need conversion following the patterns above:

### Pages
- `src/pages/SignUp.jsx`
- `src/pages/ForgotPassword.jsx`
- `src/pages/OtpVerification.jsx`
- `src/pages/ResetPassword.jsx`
- `src/pages/SearchProfiles.jsx`
- `src/pages/Brides.jsx`
- `src/pages/Grooms.jsx`
- `src/pages/MatchesInPune.jsx`
- `src/pages/RequestsPage.jsx`
- `src/pages/ViewProfilePage.jsx`
- All files in `src/pages/ProfileCreation/`
- All files in `src/pages/SuccessStories/`
- All files in `src/pages/MembershipPlans/`
- All files in `src/pages/ContactSection/`

### Components
- All components in `src/components/` (except layout which is done)
- Focus on:
  - `src/components/Home/` (ThreeSteps, WhyChooseUs, SuccessStories, PricingPlans)
  - `src/components/SearchProfiles/`
  - `src/components/Brides/`
  - `src/components/ViewProfile/`
  - `src/components/CreateProfile/`
  - `src/components/ForgotPassword/`
  - `src/components/NotificationPanel/`
  - `src/components/LogoutPanel/`

## Installation Steps

1. Install dependencies:
```bash
npm install
# or
yarn install
```

2. For iOS, install pods:
```bash
cd ios && pod install && cd ..
```

3. Link vector icons (if needed):
- iOS: Already configured in Podfile
- Android: Add to `android/app/build.gradle`:
```gradle
apply from: "../../node_modules/react-native-vector-icons/fonts.gradle"
```

## Running the App

```bash
# Start Metro bundler
npm start

# Run on Android
npm run android

# Run on iOS
npm run ios
```

## Notes

- All `localStorage` calls need to be converted to `AsyncStorage` (async)
- All `react-router-dom` navigation needs React Navigation
- CSS classes need to be converted to StyleSheet
- HTML elements need React Native components
- Images need to use `require()` for local assets
- Forms need to use `TextInput` and `TouchableOpacity`
- Icons need to use `react-native-vector-icons`

