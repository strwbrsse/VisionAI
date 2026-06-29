import { router, useLocalSearchParams } from "expo-router";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { imageToBase64 } from "../../lib/gemini";

export default function PreviewScreen() {
  const params = useLocalSearchParams();

  const photoUri = Array.isArray(params.photoUri)
    ? params.photoUri[0]
    : params.photoUri;

  const handleAnalyze = async () => {
    try {
      if (!photoUri) return;

      const base64 = await imageToBase64(photoUri);

      router.push({
        pathname: "/result",
        params: { base64Image: base64 },
      });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <Image source={{ uri: photoUri }} style={{ flex: 1 }} />

      <TouchableOpacity
        onPress={handleAnalyze}
        style={{
          position: "absolute",
          bottom: 40,
          alignSelf: "center",
          backgroundColor: "#5B3FA3",
          padding: 16,
        }}
      >
        <Text style={{ color: "white" }}>Analyze</Text>
      </TouchableOpacity>
    </View>
  );
}
