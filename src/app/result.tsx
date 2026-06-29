import { useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";

export default function ResultScreen() {
  const { photoUri } = useLocalSearchParams();

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Result Screen Working</Text>
      <Text numberOfLines={2}>{String(photoUri)}</Text>
    </View>
  );
}
