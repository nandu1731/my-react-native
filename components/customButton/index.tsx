import { FontAwesome } from "@expo/vector-icons";
import React from "react";
import { Pressable, Text, View } from "react-native";
import styles from "./styles";

type CustomButtonProps = {
  btnText: string;
  theme?: "primary";
  onPress: () => void;
};

const CustomButtom = ({ btnText, theme, onPress }: CustomButtonProps) => {
  if (theme === "primary") {
    return (
      <View
        style={[
          styles.buttonWrapper,
          { borderWidth: 4, borderColor: "#ffd33d", borderRadius: 18 },
        ]}
      >
        <Pressable
          style={[styles.button, { backgroundColor: "#fff" }]}
          onPress={onPress}
        >
          <FontAwesome
            name="picture-o"
            size={18}
            color="#25292e"
            style={styles.buttonIcon}
          />
          <Text style={[styles.buttonText, { color: "#25292e" }]}>
            {btnText}
          </Text>
        </Pressable>
      </View>
    );
  }
  return (
    <View style={styles.buttonWrapper}>
      <Pressable style={styles.button} onPress={onPress}>
        <Text style={styles.buttonText}>{btnText}</Text>
      </Pressable>
    </View>
  );
};

export default CustomButtom;
