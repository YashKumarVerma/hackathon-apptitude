/** core tech stack */
import React from "react";
import { View, Text, StyleSheet, ScrollView, Dimensions } from "react-native";

/** code runner library */
import Constants from "expo-constants";

/** firebase worker */
import firebase from "../firebase/worker";

/** mapping functions */
import MapView, { Marker } from "react-native-maps";
import { DARK_MAP, LIGHT_MAP } from "../theme/maps";

class TeamScreen extends React.Component {
  state = {
    users: [],
    region: {
      latitude: 30.3627138,
      longitude: 78.0643015,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    },
  };

  componentDidMount() {
    /**
     * exporting and importing killed the "live-ness" of listener due to
     * being wrapped in promise. therefore moving here
     */
    firebase
      .database()
      .ref()
      .on("value", (snap) => {
        const data = snap.val();
        let x;
        const users = [];
        for (x in data.device) {
          const { latitude, longitude } = data.device[x].location;
          users.push({
            id: x,
            latitude,
            longitude,
          });
        }
        this.setState({ users });
      });
  }

  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          <Text>Total Users : {this.state.users.length}</Text>
          <MapView
            style={styles.mapStyle}
            region={this.state.region}
            customMapStyle={LIGHT_MAP}
          >
            {this.state.users.map((user) => {
              console.log(user);
              return (
                <Marker
                  coordinate={{
                    latitude: user.latitude,
                    longitude: user.longitude,
                  }}
                  title="Someone's Here"
                />
              );
            })}
          </MapView>
        </View>
      </ScrollView>
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
  mapStyle: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});

export default TeamScreen;
