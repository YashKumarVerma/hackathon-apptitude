import React from "react";
import MapView, { Marker } from "react-native-maps";
import { StyleSheet, View, Dimensions, Alert } from "react-native";
import { DARK_MAP, LIGHT_MAP } from "./../theme/maps";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";

class GoogleMap extends React.Component {
  state = {
    errorMessage: false,
    region: {
      latitude: 30.3627138,
      longitude: 78.0643015,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    },
  };

  componentDidMount() {
    this.getLocationAsync();
  }

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

    /** propagate changes throughout component */
    this.setState(
      { region: { ...this.state.region, latitude, longitude } },
      console.log("set location to ", this.state.region)
    );
  };

  render() {
    if (this.state.errorMessage != false) {
      Alert.alert(
        "Error getting location",
        `${this.state.errorMessage}`,
        [{ text: "OK, My Bad", onPress: () => console.log("OK Pressed") }],
        { cancelable: false }
      );
    }

    return (
      <View style={styles.container}>
        <MapView
          style={styles.mapStyle}
          region={this.state.region}
          customMapStyle={DARK_MAP}
        >
          <Marker
            coordinate={{ latitude: 30.3727138, longitude: 78.0643015 }}
            title="Developer's Home"
            description={"Yash made this thing sitting here "}
          />

          <Marker
            coordinate={{ ...this.state.region }}
            title="You are here"
            description={"you are here and we are tracking you !"}
          />
        </MapView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  mapStyle: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});

export default GoogleMap;
