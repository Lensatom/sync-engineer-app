import { PADDING_X } from '@/constants/theme';
import React, { ComponentProps } from 'react';
import { ScrollView, XStack, YStack } from 'tamagui';

interface Props extends ComponentProps<typeof XStack> {
  children: React.ReactNode;
  main?: boolean;
  axis?: 'x' | 'y';
  canScroll?: boolean;
}

export function Container({
  children,
  main,
  axis = 'y',
  canScroll = true,
  bg,
  ...rest
}: Props) {
  const TagName = axis === 'y' ? YStack : XStack;

  const content = canScroll ? (
    <ScrollView
      contentContainerStyle={{ flex: 1 }}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
    >
      <TagName style={{ flex: 1 }} px={PADDING_X} bg={bg ?? "$white"} {...rest}>
        {children}
      </TagName>
    </ScrollView>
  ) : (
    <TagName style={{ flex: 1 }} px={PADDING_X} bg={bg ?? "$white"} {...rest}>
      {children}
    </TagName>
  );

  return (
    canScroll ? (
      <ScrollView
        contentContainerStyle={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <TagName style={{ flex: 1 }} px={PADDING_X} bg={bg ?? "$white"} {...rest}>
          {children}
        </TagName>
      </ScrollView>
    ) : (
      <TagName style={{ flex: 1 }} px={PADDING_X} bg={bg ?? "$white"} {...rest}>
        {children}
      </TagName>
    )
  )
}