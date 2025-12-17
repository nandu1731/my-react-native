import { Link } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

export default function Index() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Home screen</Text>
      <Link style={styles.link} href="/about">
        Go to About
      </Link>
      {/* <Link style={styles.link} href="/xyz">
        Go to XYZ
      </Link> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#25292e",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "#fff",
  },
  link: {
    fontSize: 20,
    textDecorationLine: "underline",
    color: "#fff",
  },
});
