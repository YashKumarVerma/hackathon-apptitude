import React from "react";
import { BottomNavigation } from "react-native-paper";
import { Provider as PaperProvider } from "react-native-paper";

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
    <PaperProvider>
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
