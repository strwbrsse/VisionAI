import { router, useLocalSearchParams } from "expo-router";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { imageToBase64 } from "../../lib/gemini";

export default function PreviewScreen() {
  const { photoUri } = useLocalSearchParams<{ photoUri: string }>();

  const handleAnalyze = async () => {
    try {
      if (!photoUri || Array.isArray(photoUri)) return;

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
    <View style={{ flex: 1, backgroundColor: "#000" }}>
      {photoUri && !Array.isArray(photoUri) && (
        <Image
          source={{ uri: photoUri }}
          style={{ flex: 1, resizeMode: "contain" }}
        />
      )}

      <TouchableOpacity
        onPress={handleAnalyze}
        style={{
          position: "absolute",
          bottom: 50,
          alignSelf: "center",
          backgroundColor: "purple",
          padding: 16,
        }}
      >
        <Text style={{ color: "#fff" }}>Analyze</Text>
      </TouchableOpacity>
    </View>
  );
}
