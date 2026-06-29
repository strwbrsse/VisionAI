import { useRef, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import { router } from "expo-router";

export default function CameraScreen() {
  const cameraRef = useRef<CameraView>(null);
  const [permission, requestPermission] = useCameraPermissions();

  if (!permission) return <View />;

  if (!permission.granted) {
    return (
      <View style={styles.center}>
        <Text style={styles.text}>Camera permission required</Text>
        <TouchableOpacity onPress={requestPermission}>
          <Text style={styles.btn}>Grant Permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const takePicture = async () => {
    try {
      if (!cameraRef.current) return;

      const photo = await cameraRef.current.takePictureAsync({
        quality: 0.7,
        base64: true,
      });

      if (!photo?.uri) throw new Error("No photo captured");

      router.push({
        pathname: "/preview",
        params: { photoUri: photo.uri },
      });
    } catch (e) {
      console.log("Capture error:", e);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <CameraView ref={cameraRef} style={{ flex: 1 }} facing="back" />

      <TouchableOpacity style={styles.captureBtn} onPress={takePicture}>
        <Text style={{ color: "white" }}>Capture</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  captureBtn: {
    position: "absolute",
    bottom: 40,
    alignSelf: "center",
    backgroundColor: "#000",
    padding: 16,
    borderRadius: 50,
  },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  text: { marginBottom: 10 },
  btn: { color: "blue" },
});