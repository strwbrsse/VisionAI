import { useRef } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import { router } from "expo-router";

export default function CameraScreen() {
  const cameraRef = useRef<CameraView | null>(null);
  const [permission, requestPermission] = useCameraPermissions();

  if (!permission) return <View />;
  if (!permission.granted) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Camera permission required</Text>
        <TouchableOpacity onPress={requestPermission}>
          <Text>Grant Permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const takePicture = async () => {
    try {
      const photo = await cameraRef.current?.takePictureAsync({
        quality: 0.7,
      });

      if (!photo?.uri) return;

      router.push({
        pathname: "/preview",
        params: { photoUri: photo.uri },
      });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <CameraView ref={cameraRef} style={{ flex: 1 }} facing="back" />

      <TouchableOpacity
        onPress={takePicture}
        style={{
          position: "absolute",
          bottom: 40,
          alignSelf: "center",
          backgroundColor: "black",
          padding: 16,
          borderRadius: 50,
        }}
      >
        <Text style={{ color: "white" }}>Capture</Text>
      </TouchableOpacity>
    </View>
  );
}