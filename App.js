import React from "react";
import {
  DefaultTheme,
  Provider as PaperProvider,
  BottomNavigation,
} from "react-native-paper";

/** define application theme */
// background image color: #151D28
const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: "#151D28",
    secondary: "#263547",
    accent: "#F24744",
  },
};

/**
 * Bootstrap navigation pages
 */
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
const Stack = createStackNavigator();

/**
 * Loading screens for tabs
 */
import HomeScreen from "./screens/Home";
import NearbyScreen from "./screens/Nearby";
import TraceRouteScreen from "./screens/TraceRoute";

/**
 * Configure tabs navigation for HomePage
 */
const TabsNavigation = () => {
  const [index, setIndex] = React.useState(1);
  const [routes] = React.useState([
    { key: "traceRoute", title: "Trace Route", icon: "pin" },
    { key: "home", title: "Home", icon: "home" },
    { key: "nearby", title: "Who's near me", icon: "map" },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    home: HomeScreen,
    nearby: NearbyScreen,
    traceRoute: TraceRouteScreen,
  });

  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
    />
  );
};

function App() {
  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <TabsNavigation />
      </NavigationContainer>
    </PaperProvider>
  );
}

export default App;

//   <Stack.Navigator initialRouteName="Home">
//     <Stack.Screen
//       name="homeScreen"
//       component={HomeScreen}
//       options={{ title: "Where am I ?" }}
//     />
//   </Stack.Navigator>
