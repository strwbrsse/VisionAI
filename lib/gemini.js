import * as FileSystem from "expo-file-system/legacy";

export async function imageToBase64(uri) {
  try {
    if (!uri) return null;

    const base64 = await FileSystem.readAsStringAsync(uri, {
      encoding: FileSystem.EncodingType.Base64,
    });

    return base64;
  } catch (e) {
    console.log("Base64 error:", e);
    return null;
  }
}
