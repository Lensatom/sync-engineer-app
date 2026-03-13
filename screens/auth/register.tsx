import { useLogin } from "@/api/auth";
import { Container } from "@/components/layout";
import { Button, Input, Text } from "@/components/ui";
import { setAccessToken } from "@/helpers/api";
import { useUser } from "@/layouts/rootLayout";
import { router } from "expo-router";
import React, { useState } from "react";
import { View, XStack, YStack } from "tamagui";

export function Register() {
  const { login, isPending } = useLogin();
  const { setUser } = useUser();
  const [form, setForm] = useState({
    email: "",
    firstName: "",
    lastName: "",
  });

  const isEmailValid = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleLogin = async () => {
    if (!isEmailValid(form.email)) return;
    try {
      const res = await login({ email: form.email });
      const data = res?.data;
      setAccessToken(data?.token);
      setUser(data?.user);
      router.replace("/");
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <Container ai="center" jc="center">
      <YStack w="$full">
        <Text fos="$7" fow="800" color="$primary11">
          Track and fix{"\n"}Atm faults much easier.
        </Text>
        <Text mt="$2" fos={15} color="$gray11" pr="$10">
          Enter your details to use the engineer app.
        </Text>
      </YStack>

      <YStack mt="$7" gap="$1.5" w="$full">
        <XStack w="$full" gap="$2" jc="space-between">
          <View w="48%" mt="$4">
            <Input
              value={form.firstName}
              label="First Name"
              placeholder="Enter your firstname"
              onChangeText={(text) => setForm({ ...form, firstName: text })}
              br="$2"
            />
          </View>
          <View w="48%" mt="$4">
            <Input
              value={form.lastName}
              label="Last Name"
              placeholder="Enter your lastname"
              onChangeText={(text) => setForm({ ...form, lastName: text })}
              br="$2"
            />
          </View>
        </XStack>
        <View w="$full" mt="$4">
          <Input
            value={form.email}
            label="Email"
            placeholder="Enter your email address"
            onChangeText={(text) => setForm({ ...form, email: text })}
            br="$2"
            keyboardType="email-address"
          />
        </View>

        <Button
          mt="$7"
          w="$full"
          br="$2"
          onPress={handleLogin}
          text="Continue"
          isLoading={isPending}
          disabled={!isEmailValid(form.email)}
        />

        <XStack mt="$4" jc="center" gap="$1" ai="center">
          <Text>Already have an account?</Text>
          <Button
            size="sm"
            type="ghost"
            px={0}
            onPress={() => router.push("/login")}
          >
            <Text color="$primary11" fow="600">
              Login
            </Text>
          </Button>
        </XStack>
      </YStack>
    </Container>
  );
}
