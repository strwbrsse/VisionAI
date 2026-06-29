import { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

import { useLocalSearchParams } from "expo-router";

import { analyzeImage, imageToBase64, PROMPTS } from "../../lib/gemini";

import { supabase } from "../../lib/supabase";

export default function ResultScreen() {
  const { photoUri, promptKey } = useLocalSearchParams();

  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    run();
  }, []);

  async function saveToHistory(result) {
    try {
      await supabase.from("analysis_history").insert({
        objects: result.objects?.join(", ") ?? "",
        context: result.context ?? "",
        recommendations: result.recommendations ?? "",
      });
    } catch (err) {
      console.warn("History save failed:", err);
    }
  }

  async function run() {
    setLoading(true);
    setError(null);

    try {
      const base64Image = await imageToBase64(photoUri);

      const prompt = PROMPTS[promptKey];

      const result = await analyzeImage(base64Image, prompt);

      const text = result?.candidates?.[0]?.content?.parts?.[0]?.text;

      const cleaned = text
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();

      const parsed = JSON.parse(cleaned);

      setAnalysis(parsed);

      // ✅ SAVE TO SUPABASE (after success)
      await saveToHistory(parsed);
    } catch (err) {
      console.log(err);
      setError("Failed to analyze image.");
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
        <Text>Analyzing...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={{ color: "red" }}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Objects</Text>
      {analysis.objects?.map((o, i) => (
        <Text key={i}>• {o}</Text>
      ))}

      <Text style={styles.title}>Context</Text>
      <Text>{analysis.context}</Text>

      <Text style={styles.title}>Recommendations</Text>
      <Text>{analysis.recommendations}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontWeight: "bold",
    fontSize: 16,
    marginTop: 12,
  },
});
