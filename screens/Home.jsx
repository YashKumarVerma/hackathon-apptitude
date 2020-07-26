/** core tehcnologies */
import React from "react";
import { StyleSheet, View, ImageBackground, Image } from "react-native";
import { Text } from "react-native-paper";

/** expo packages */
import Constants from "expo-constants";
import * as Device from "expo-device";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";

/** firebase workers */
import { pushLocation } from "../firebase/worker";

/** main application */
class HomeScreen extends React.Component {
  /** initial state of application */
  state = {
    location: null,
    geocode: null,
    errorMessage: "",
    timestamp: 0,
  };

  /** trigger location fetch functions on load */
  componentDidMount() {
    this.getLocationAsync();
  }

  /** async function to get location */
  getLocationAsync = async () => {
    /** ensure that all permissions exist */
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== "granted") {
      this.setState({
        errorMessage: "Permission to access location was denied",
      });
    }

    /** query for current location */
    let location = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.BestForNavigation,
    });

    /** extract coordinates from current location */
    const { latitude, longitude } = location.coords;

    /** for reverse lookup of coordinates for location name  */
    this.getGeocodeAsync({ latitude, longitude });

    /** propagate changes throughout component */
    this.setState({ location: { latitude, longitude } }, () => {
      pushLocation({ latitude, longitude });
    });
  };

  /** reverse lookup of location */
  getGeocodeAsync = async (location) => {
    let geocode = await Location.reverseGeocodeAsync(location);
    this.setState({ geocode });
  };

  /** what to show now ? */
  render() {
    const { location, geocode, errorMessage } = this.state;
    return (
      <ImageBackground
        source={require("../assets/backdrop.gif")}
        blurRadius={5}
        style={styles.container}
      >
        <View style={styles.overlay}>
          <Image
            source={require("../assets/location-pin.png")}
            style={{ width: 100, height: 100 }}
          />
          <Text style={styles.heading3}>
            We'll steal your {Device.modelName}
          </Text>
          <Text style={styles.heading1}>
            {geocode ? `${geocode[0].city}, ${geocode[0].isoCountryCode}` : ""}
          </Text>
          <Text style={styles.heading2}>
            {geocode ? geocode[0].street : ""}
          </Text>
          <Text style={styles.heading3}>
            {location ? `${location.latitude}, ${location.longitude}` : ""}
          </Text>
          <Text style={styles.heading2}>{errorMessage}</Text>
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    marginTop: Constants.statusBarHeight,
  },
  overlay: {
    backgroundColor: "#00000070",
    height: "100%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  heading1: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 30,
    margin: 20,
  },
  heading2: {
    color: "#fff",
    margin: 5,
    fontWeight: "bold",
    fontSize: 15,
  },
  heading3: {
    color: "#fff",
    margin: 5,
  },
});

export default HomeScreen;
