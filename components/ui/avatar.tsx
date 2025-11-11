import React from 'react';
import { Image } from 'react-native';

type AvatarProps = {
  uri: string;
  size?: number;
}

export function Avatar({
  uri,
  size = 40,
}: AvatarProps) {
  return (
    <Image
      source={{ uri }}
      style={{ width: size, height: size, borderRadius: 99 }}
    />
  )
}