import CustomButtom from "@/components/customButton";
import ImageViewer from "@/components/ImageViewer";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

const bgImage = require("@/assets/images/background-image.png");

export default function Index() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [showAppOptions, setShowAppOptions] = useState<boolean>(false);

  const handleLoadFromGallery = async () => {
    console.log("Load from gallery");
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      console.log(result.assets);
      setSelectedImage(result.assets[0].uri);
      
    } else {
      console.log("User cancelled image picker");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Home screen</Text>

      <View style={styles.imageContainer}>
        <ImageViewer img={bgImage} selectedImage={selectedImage} />
      </View>
      <View style={styles.footerContainer}>
        <CustomButtom
          btnText="Choose a photo"
          theme="primary"
          onPress={handleLoadFromGallery}
        />
        <CustomButtom
          btnText="Use this photo"
          onPress={() => console.log("hello")}
        />
      </View>
      {/* <Link style={styles.link} href="/xyz">
        Go to XYZ
      </Link> */}
      {/* <Link style={styles.link} href="/about">
        Go to About
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
  imageContainer: {
    flex: 1,
  },
  footerContainer: {
    flex: 1 / 3,
    alignItems: "center",
  },
});
