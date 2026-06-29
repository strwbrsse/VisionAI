import * as FileSystem from "expo-file-system";

/**
 * Convert image URI → base64
 */
export async function imageToBase64(uri) {
  try {
    const base64 = await FileSystem.readAsStringAsync(uri, {
      encoding: FileSystem.EncodingType.Base64,
    });

    return base64;
  } catch (e) {
    console.log("imageToBase64 error:", e);
    return null;
  }
}
