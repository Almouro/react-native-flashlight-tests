import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { text } from "./text";

const styles = StyleSheet.create({
  container: { flexDirection: "row", flexWrap: "wrap" },
  text: {
    color: "white",
    fontSize: 10,
  },
  view: {
    backgroundColor: "#45b3e0",
  },
});

const App = () => {
  return (
    <ScrollView>
      <View style={styles.container}>
        {Array(2000)
          .fill(null)
          .map((_, index) => (
            <View key={index} style={styles.view}>
              <Text key={index} style={styles.text}>
                {text[index]}
              </Text>
            </View>
          ))}
      </View>
    </ScrollView>
  );
};

export default App;
