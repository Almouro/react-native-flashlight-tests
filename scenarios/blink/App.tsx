import React, { useEffect, useRef } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

const styles = StyleSheet.create({
  container: { flexDirection: "row", flexWrap: "wrap" },
  text: {
    color: "white",
    fontSize: 50,
  },
  view: {
    width: 100,
    height: 100,
    backgroundColor: "#45b3e0",
    justifyContent: "center",
    alignItems: "center",
  },
});

const TEXTS = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
const COLORS = ["#45b3e0", "#e0a045", "#45e0a0", "#a045e0", "#e045a0"];

const Item = ({ index }: { index: number }) => {
  const [counter, setCounter] = React.useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCounter((count) => count + 1);
    }, 100);

    return () => clearInterval(interval);
  }, []);

  const color = COLORS[counter % COLORS.length];

  return (
    <View key={index} style={[styles.view, { backgroundColor: color }]}>
      <Text key={index} style={styles.text}>
        {counter}
      </Text>
    </View>
  );
};

const RANGE = Array(20)
  .fill(null)
  .map((_, index) => index);

const MassiveComponent = () => {
  return (
    <>
      {RANGE.map((i) => (
        <Item key={i} index={i} />
      ))}
    </>
  );
};

const App = () => {
  return (
    <ScrollView>
      <View style={styles.container}>
        <MassiveComponent />
      </View>
    </ScrollView>
  );
};

export default App;
