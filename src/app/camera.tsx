import { useEffect, useRef, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import { router } from "expo-router";

export default function CameraScreen() {
  const cameraRef = useRef<any>(null);
  const [permission, requestPermission] = useCameraPermissions();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    console.log("📸 Camera screen loaded");
  }, []);

  if (!permission) return <View />;

  if (!permission.granted) {
    return (
      <View style={styles.center}>
        <Text>Camera permission required</Text>
        <TouchableOpacity onPress={requestPermission}>
          <Text style={styles.btn}>Grant Permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const takePicture = async () => {
    try {
      console.log("📸 Taking picture...");

      const photo = await cameraRef.current?.takePictureAsync({
        quality: 0.8,
        base64: false,
      });

      console.log("📸 Photo:", photo?.uri);

      if (!photo?.uri) return;

      router.push({
        pathname: "/preview",
        params: { photoUri: photo.uri },
      });
    } catch (e) {
      console.log("❌ Capture error:", e);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "black" }}>
      {!ready && (
        <View style={styles.loading}>
          <Text style={{ color: "white" }}>Loading camera...</Text>
        </View>
      )}

      <CameraView
        ref={cameraRef}
        style={{ flex: 1 }}
        facing="back"
        onCameraReady={() => {
          console.log("✅ Camera ready");
          setReady(true);
        }}
      />

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
  btn: { color: "blue" },
  loading: {
    position: "absolute",
    top: "50%",
    alignSelf: "center",
    zIndex: 10,
  },
});