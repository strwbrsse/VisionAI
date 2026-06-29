import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";

import { router, useLocalSearchParams } from "expo-router";

export default function PreviewScreen() {
  const { photoUri } = useLocalSearchParams();
  const { width } = useWindowDimensions();

  const isTablet = width >= 768;

  function goAnalyze() {
    router.push({
      pathname: "/result",
      params: { photoUri },
    });
  }

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: photoUri }}
        style={[styles.image, isTablet && { maxWidth: 600 }]}
        resizeMode="contain"
      />

      <View style={styles.actions}>
        <TouchableOpacity style={styles.retake} onPress={() => router.back()}>
          <Text style={styles.text}>Retake</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.analyze} onPress={goAnalyze}>
          <Text style={styles.text}>Analyze</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },

  image: {
    flex: 1,
    alignSelf: "center",
    width: "100%",
  },

  actions: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 16,
  },

  retake: {
    backgroundColor: "#5A6472",
    padding: 14,
    borderRadius: 8,
  },

  analyze: {
    backgroundColor: "#5B3FA3",
    padding: 14,
    borderRadius: 8,
  },

  text: {
    color: "#fff",
    fontWeight: "bold",
  },
});
