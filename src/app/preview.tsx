import { router, useLocalSearchParams } from "expo-router";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function PreviewScreen() {
  const params = useLocalSearchParams();

  const photoUri = Array.isArray(params.photoUri)
    ? params.photoUri[0]
    : params.photoUri;

  const handleAnalyze = () => {
    if (!photoUri) return;

    router.push({
      pathname: "/result",
      params: { photoUri },
    });
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
  container: { flex: 1, backgroundColor: "#ffffff" },
  image: { flex: 1, resizeMode: "contain" },
  button: {
    position: "absolute",
    bottom: 40,
    alignSelf: "center",
    backgroundColor: "#5B3FA3",
    padding: 15,
    borderRadius: 10,
  },
  text: { color: "#000000" },
});
