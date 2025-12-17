import CircleButton from "@/components/CircleButton";
import CustomButtom from "@/components/customButton";
import EmojiList from "@/components/EmojiList";
import EmojiPicker from "@/components/EmojiPicker";
import EmojiSticker from "@/components/EmojiSticker";
import IconButton from "@/components/IconButton";
import ImageViewer from "@/components/ImageViewer";

import * as ImagePicker from "expo-image-picker";
import * as MediaLibrary from "expo-media-library";

import { useRef, useState } from "react";
import { Alert, ImageSourcePropType, StyleSheet, Text, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { captureRef } from "react-native-view-shot";

const bgImage = require("@/assets/images/background-image.png");

export default function Index() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [showAppOptions, setShowAppOptions] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedEmoji, setSelectedEmoji] =
    useState<ImageSourcePropType | null>(null);

  const imageRef = useRef<View>(null);

  // ✅ Explicit permission request (Android 15 safe)
  const requestMediaPermission = async () => {
    const { status } = await MediaLibrary.requestPermissionsAsync();
    return status === "granted";
  };

  const handleLoadFromGallery = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
      setShowAppOptions(true);
    }
  };

  const onReset = () => {
    setSelectedImage(null);
    setSelectedEmoji(null);
    setShowAppOptions(false);
  };

  const onAddSticker = () => {
    setIsModalVisible(true);
  };

  const onModalClose = () => {
    setIsModalVisible(false);
  };

  const onSaveImageAsync = async () => {
    const hasPermission = await requestMediaPermission();

    if (!hasPermission) {
      Alert.alert("Permission required", "Storage permission is needed to save the image.");
      return;
    }

    try {
      const localUri = await captureRef(imageRef, {
        height: 440,
        quality: 1,
      });

      await MediaLibrary.saveToLibraryAsync(localUri);
      Alert.alert("Success", "Image saved to gallery!");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <GestureHandlerRootView style={styles.container}>
      <Text style={styles.text}>Home screen</Text>

      <View style={styles.imageContainer}>
        <View ref={imageRef} collapsable={false}>
          <ImageViewer img={bgImage} selectedImage={selectedImage} />
          {selectedEmoji && (
            <EmojiSticker imageSize={40} stickerSource={selectedEmoji} />
          )}
        </View>
      </View>

      {showAppOptions ? (
        <View style={styles.optionsContainer}>
          <View style={styles.optionsRow}>
            <IconButton icon="refresh" label="Reset" onPress={onReset} />
            <CircleButton onPress={onAddSticker} />
            <IconButton icon="save-alt" label="Save" onPress={onSaveImageAsync} />
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
            onPress={() => setShowAppOptions(true)}
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
