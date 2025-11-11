import { ACCESS_TOKEN_KEY } from "@/constants/api";
import * as SecureStore from "expo-secure-store";

export async function getAccessToken() {
  try {
    const result = await SecureStore.getItemAsync(ACCESS_TOKEN_KEY);
    return result;
  } catch (e) {
    console.log("Failed to get token:", e);
  }
}

export async function setAccessToken(token: string) {
  try {
    await SecureStore.setItemAsync(ACCESS_TOKEN_KEY, token);
    console.log("Token stored successfully");
  } catch (e) {
    console.log("Failed to store token:", e);
  }
}

export async function clearAccessToken(otp?: boolean) {
  try {
    await SecureStore.setItemAsync(ACCESS_TOKEN_KEY, "");
  } catch (e) {
    console.log("Failed to delete token:", e);
  }
}