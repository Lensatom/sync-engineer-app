import { Container } from "@/components/layout";
import { Button, Input, Text } from "@/components/ui";
import { setAccessToken } from "@/helpers/api";
import { useForm } from "@/hooks/use-form";
import { useUser } from "@/layouts/rootLayout";
import { getExpoPushTokenAsync } from "expo-notifications";
import { router } from "expo-router";
import React, { useEffect } from "react";
import { View, XStack, YStack } from "tamagui";
import { useRegister } from "./api";

export function Register() {
  const { register, isPending } = useRegister();
  const { setUser } = useUser();
  const initialValues = {
    email: "",
    firstName: "",
    lastName: "",
    role: "ENGINEER",
    expoToken: "",
    phoneNumber: "09136852885",
    geolocation: {
      latitude: "40.7128",
      longitude: "-74.0060",
    },
  };
  const { data, changeData, error, changeError } = useForm(initialValues);

  useEffect(() => {
    (async () => {
      const token = await getExpoPushTokenAsync();
      changeData("expoToken", token.data);
    })();
  }, []);

  const isEmailValid = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = () => {
    let isValid = true;

    if (data.firstName.trim() === "") {
      isValid = false;
      changeError("firstName", "First name is required");
    }
    if (data.lastName.trim() === "") {
      isValid = false;
      changeError("lastName", "Last name is required");
    }
    if (!isEmailValid(data.email)) {
      isValid = false;
      changeError("email", "Invalid email address");
    }

    return isValid;
  };

  const handleRegister = async () => {
    if (!validateForm()) return;
    try {
      const res = await register(data);
      const responseData = res?.data;
      setAccessToken(responseData?.token);
      setUser(responseData?.user);
      router.replace("/");
    } catch (error) {
      console.error("Register error:", error);
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
              value={data.firstName}
              label="First Name"
              placeholder="Enter your firstname"
              onChangeText={(text) => changeData("firstName", text)}
              error={error.firstName}
              br="$2"
            />
          </View>
          <View w="48%" mt="$4">
            <Input
              value={data.lastName}
              label="Last Name"
              placeholder="Enter your lastname"
              onChangeText={(text) => changeData("lastName", text)}
              error={error.lastName}
              br="$2"
            />
          </View>
        </XStack>
        <View w="$full" mt="$4">
          <Input
            value={data.email}
            label="Email"
            placeholder="Enter your email address"
            onChangeText={(text) => changeData("email", text)}
            error={error.email}
            br="$2"
            keyboardType="email-address"
          />
        </View>

        <Button
          mt="$7"
          w="$full"
          br="$2"
          onPress={handleRegister}
          text="Continue"
          isLoading={isPending}
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
