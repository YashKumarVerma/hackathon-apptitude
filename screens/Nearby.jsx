import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import Constants from "expo-constants";

const NearbyScreen = () => {
  const { deviceId: id } = Constants;
  return (
    <ScrollView>
      <View style={styles.container}>
        <Text>{id}</Text>
      </View>
    </ScrollView>
  );
};

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
