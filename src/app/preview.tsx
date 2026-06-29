import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { imageToBase64 } from "../../lib/gemini";

export default function PreviewScreen() {
  const { photoUri } = useLocalSearchParams<{ photoUri: string }>();
  const [loading, setLoading] = useState(false);

  const uri = Array.isArray(photoUri) ? photoUri[0] : photoUri;

  const handleAnalyze = async () => {
    try {
      if (!uri) return;

      setLoading(true);

      const base64 = await imageToBase64(uri);

      router.push({
        pathname: "/result",
        params: { base64Image: base64 ?? "" },
      });
    } catch (e) {
      console.log("Analyze error:", e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri }} style={styles.image} resizeMode="contain" />

      <TouchableOpacity style={styles.button} onPress={handleAnalyze}>
        <Text style={styles.text}>{loading ? "Analyzing..." : "Analyze"}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000" },

  image: {
    flex: 1,
    width: "100%",
  },

  button: {
    position: "absolute",
    bottom: 50,
    alignSelf: "center",
    backgroundColor: "#5B3FA3",
    padding: 16,
    borderRadius: 12,
  },

  text: {
    color: "#fff",
    fontWeight: "600",
  },
});
