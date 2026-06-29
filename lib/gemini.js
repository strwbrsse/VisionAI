import * as FileSystem from "expo-file-system/legacy";

const GEMINI_KEY = process.env.EXPO_PUBLIC_GEMINI_KEY;

export async function imageToBase64(uri) {
  try {
    return await FileSystem.readAsStringAsync(uri, {
      encoding: FileSystem.EncodingType.Base64,
    });
  } catch {
    return null;
  }
}

export async function analyzeImage(base64Image, prompt) {
  try {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                { text: prompt },
                {
                  inline_data: {
                    mime_type: "image/jpeg",
                    data: base64Image,
                  },
                },
              ],
            },
          ],
        }),
      },
    );

    return await res.json();
  } catch (e) {
    return null;
  }
}
