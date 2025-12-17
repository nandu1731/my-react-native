import { Image } from "expo-image";
import React from "react";
import { ImageSourcePropType } from "react-native";
import styles from "./styles";

const ImageViewer = ({
  img,
  selectedImage,
}: {
  img: ImageSourcePropType;
  selectedImage: string | null;
}) => {
  return (
    <Image
      source={selectedImage ? { uri: selectedImage } : img}
      style={styles.image}
    />
  );
};

export default ImageViewer;
