import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import { analyzeImage } from "../../lib/gemini";

export default function ResultScreen() {
  const { base64Image } = useLocalSearchParams<{ base64Image: string }>();

  const [loading, setLoading] = useState(true);
  const [text, setText] = useState("");

  useEffect(() => {
    run();
  }, []);

  const run = async () => {
    try {
      const res = await analyzeImage(
        base64Image,
        "Describe this image clearly",
      );

      const output =
        res?.candidates?.[0]?.content?.parts?.[0]?.text || "No result";

      setText(output);
    } catch {
      setText("Failed to analyze image");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <ActivityIndicator style={{ flex: 1 }} />;

  return (
    <View style={{ padding: 20 }}>
      <Text>{text}</Text>
    </View>
  );
}
