import React from 'react';
import { View } from 'tamagui';

interface HorizontalLineProps extends React.ComponentProps<typeof View> {
  color?: string;
}

export function HorizontalLine({
  color,
  ...rest
}: HorizontalLineProps) {
  return (
    <View borderTopWidth={1} borderTopColor={color || "$gray3"} {...rest} />
  )
}