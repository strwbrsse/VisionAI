import { useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";

export default function ResultScreen() {
  const { base64Image } = useLocalSearchParams();

  return (
    <View style={{ padding: 20 }}>
      <Text>Result Screen Works</Text>
      <Text numberOfLines={2}>
        {typeof base64Image === "string" ? base64Image : "No image"}
      </Text>
    </View>
  );
}
