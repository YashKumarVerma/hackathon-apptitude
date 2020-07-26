import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import Constants from "expo-constants";
import { getLocation } from "../firebase/worker";

class NearbyScreen extends React.Component {
  state = {
    users: [],
  };

  componentDidMount() {
    getLocation().then((data) => {
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
});

export default NearbyScreen;
