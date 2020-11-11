import React from "react";
import {
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import GyroScopeScreen from "./GyroScopeScreen";

const image = {
  uri:
    "https://images.unsplash.com/photo-1551679630-2eed87aefae6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",
};

const HomeScreen = () => {
  const [isTracking, onChangeIsTracking] = React.useState(false);
  let listener = null;
  const displayText = isTracking ? "Stop Tracking" : "Start Tracking";

  return (
    <View style={styles.container}>
      <ImageBackground source={image} style={styles.image}>
        <View style={styles.opacity}>
          <Pressable
            onPress={() => {
              onChangeIsTracking(!isTracking);
            }}
            style={styles.button}
          >
            {!isTracking ? null : (
              <GyroScopeScreen
                interval={100}
                callback={(data) => console.log(data)}
              />
            )}

            <Text style={styles.text}>{displayText}</Text>
          </Pressable>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    opacity: 10,
  },
  text: {
    color: "grey",
    fontSize: 30,
    fontWeight: "bold",
    flexDirection: "column",
  },
  opacity: {
    backgroundColor: "rgba(0,0,0,0.5)",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    width: 250,
    height: 250,
    backgroundColor: "rgba(4,0,1,0.7)",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 200,
  },
});

export default HomeScreen;
