import { router, useLocalSearchParams } from "expo-router";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { imageToBase64 } from "../../lib/gemini";

export default function PreviewScreen() {
  const { photoUri } = useLocalSearchParams<{ photoUri: string }>();

  const handleAnalyze = async () => {
    try {
      if (!photoUri) return;

      const base64 = await imageToBase64(photoUri);

      router.push({
        pathname: "/result",
        params: { base64Image: base64 },
      });
    } catch (e) {
      console.log("Analyze error:", e);
    }
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: photoUri }} style={styles.image} />

      <TouchableOpacity style={styles.button} onPress={handleAnalyze}>
        <Text style={styles.text}>Analyze</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000" },
  image: { flex: 1, resizeMode: "contain" },
  button: {
    position: "absolute",
    bottom: 50,
    alignSelf: "center",
    backgroundColor: "#5B3FA3",
    padding: 16,
    borderRadius: 10,
  },
  text: { color: "#fff", fontWeight: "bold" },
});
