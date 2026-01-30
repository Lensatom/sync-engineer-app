import { useLogin } from "@/api/auth";
import { Container } from "@/components/layout";
import { Button, Input, Text } from "@/components/ui";
import { setAccessToken } from "@/helpers/api";
import { useUser } from "@/layouts/rootLayout";
import { router } from "expo-router";
import React, { useState } from "react";

export function Login() {
  const { login, isPending } = useLogin();
  const { setUser } = useUser();
  const [email, setEmail] = useState("");

  const isEmailValid = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleLogin = async () => {
    if (!isEmailValid(email)) return;
    try {
      const res = await login({ email });
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
      <Text ta="center" fos={22} fow="700" color="$gray13">
        Welcome
      </Text>
      <Text mt="$1" color="$gray11">
        Enter your email address to continue
      </Text>
      <Input
        value={email}
        placeholder="someone@example.com"
        onChangeText={setEmail}
        mt="$6"
        br="$2"
        keyboardType="email-address"
      />
      <Button
        mt="$6"
        w="$full"
        br="$2"
        onPress={handleLogin}
        text="Continue"
        isLoading={isPending}
        disabled={!isEmailValid(email)}
      />
    </Container>
  );
}
