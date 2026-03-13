import { textToColor } from "@/helpers/utils";
import React from "react";
import { Image } from "react-native";
import { Text, View } from "tamagui";

type AvatarProps = {
  uri?: string;
  text?: string;
  size?: number;
};

export function Avatar({ uri, text = "Avatar", size = 40 }: AvatarProps) {
  if (!uri) {
    return (
      <View
        w={size}
        h={size}
        bg={textToColor(text, 90)}
        ai="center"
        jc="center"
        br={999}
      >
        <Text fos={size / 2} fow="700" color={textToColor(text, 30)}>
          {text[0]}
        </Text>
      </View>
    );
  }
  return (
    <Image
      source={{ uri }}
      style={{ width: size, height: size, borderRadius: 99 }}
    />
  );
}
