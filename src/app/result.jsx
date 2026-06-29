import { useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";

export default function ResultScreen() {
  const { base64Image } = useLocalSearchParams();

  return (
    <View>
      <Text>Result Screen Working</Text>
    </View>
  );
}
