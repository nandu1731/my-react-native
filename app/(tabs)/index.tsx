import CircleButton from "@/components/CircleButton";
import CustomButtom from "@/components/customButton";
import EmojiList from "@/components/EmojiList";
import EmojiPicker from "@/components/EmojiPicker";
import EmojiSticker from "@/components/EmojiSticker";
import IconButton from "@/components/IconButton";
import ImageViewer from "@/components/ImageViewer";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import { ImageSourcePropType, StyleSheet, Text, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
const bgImage = require("@/assets/images/background-image.png");

export default function Index() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [showAppOptions, setShowAppOptions] = useState<boolean>(false);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [selectedEmoji, setSelectedEmoji] =
    useState<ImageSourcePropType | null>(null);

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

  const onReset = () => {
    setShowAppOptions(false);
  };

  const onAddSticker = () => {
    // we will implement this later
  };

  const onSaveImageAsync = async () => {
    // we will implement this later
  };

  const onModalClose = () => {
    setIsModalVisible(false);
  };

  return (
    <GestureHandlerRootView style={styles.container}>
      <Text style={styles.text}>Home screen</Text>

      <View style={styles.imageContainer}>
        <ImageViewer img={bgImage} selectedImage={selectedImage} />
        {selectedEmoji && (
          <EmojiSticker imageSize={40} stickerSource={selectedEmoji} />
        )}
      </View>
      {showAppOptions ? (
        <View style={styles.optionsContainer}>
          <View style={styles.optionsRow}>
            <IconButton icon="refresh" label="Reset" onPress={onReset} />
            <CircleButton onPress={onAddSticker} />
            <IconButton
              icon="save-alt"
              label="Save"
              onPress={onSaveImageAsync}
            />
          </View>
        </View>
      ) : (
        <View style={styles.footerContainer}>
          <CustomButtom
            btnText="Choose a photo"
            theme="primary"
            onPress={handleLoadFromGallery}
          />
          <CustomButtom
            btnText="Use this photo"
            onPress={() => setIsModalVisible(true)}
          />
        </View>
      )}
      <EmojiPicker isVisible={isModalVisible} onClose={onModalClose}>
        <EmojiList onSelect={setSelectedEmoji} onCloseModal={onModalClose} />
      </EmojiPicker>
    </GestureHandlerRootView>
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
  optionsContainer: {
    position: "absolute",
    bottom: 80,
  },
  optionsRow: {
    alignItems: "center",
    flexDirection: "row",
  },
});
