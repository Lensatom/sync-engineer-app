import { Container } from "@/components/layout";
import { Button, Input, Text } from "@/components/ui";
import { setAccessToken } from "@/helpers/api";
import { useForm } from "@/hooks/use-form";
import { useUser } from "@/layouts/rootLayout";
import { router } from "expo-router";
import React from "react";
import { View, XStack, YStack } from "tamagui";
import { useLogin } from "./api";

export function Login() {
  const { login, isPending } = useLogin();
  const { setUser } = useUser();
  const initialValues = { email: "" };
  const { data, changeData, error, changeError } = useForm(initialValues);

  const isEmailValid = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleLogin = async () => {
    if (!isEmailValid(data.email)) {
      changeError("email", "Invalid email address");
      return;
    }
    try {
      const res = await login({ email: data.email });
      const resData = res?.data;
      setAccessToken(resData?.token);
      setUser(resData?.user);
      router.replace("/");
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <Container ai="center" jc="center">
      <YStack w="$full">
        <Text fos="$7" fow="800" color="$primary11">
          Welcome back!
        </Text>
        <Text mt="$2" fos={15} color="$gray11" pr="$10">
          Enter your details to use the engineer app.
        </Text>
      </YStack>

      <YStack mt="$7" gap="$1.5" w="$full">
        <View w="$full" mt="$4">
          <Input
            value={data.email}
            label="Email"
            placeholder="Enter your email address"
            onChangeText={(text) => changeData("email", text)}
            br="$2"
            keyboardType="email-address"
            error={error.email}
          />
        </View>

        <Button
          mt="$10"
          w="$full"
          br="$2"
          onPress={handleLogin}
          text="Continue"
          isLoading={isPending}
          disabled={!isEmailValid(data.email)}
        />

        <XStack mt="$4" jc="center" gap="$1" ai="center">
          <Text>Do not have an account?</Text>
          <Button
            size="sm"
            type="ghost"
            px={0}
            onPress={() => router.push("/register")}
          >
            <Text color="$primary11" fow="600">
              Register
            </Text>
          </Button>
        </XStack>
      </YStack>
    </Container>
  );
}
