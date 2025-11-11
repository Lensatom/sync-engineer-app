import { PADDING_X, SCREEN_WIDTH } from '@/constants/theme';
import React, { useState } from 'react';
import { Pressable } from 'react-native';
import { View, XStack, YStack } from 'tamagui';
import { Text } from '../ui';

interface ITabs {
  tabs: Array<{
    title: string;
    name: string;
    content: React.ReactNode;
  }>;
}

export function Tab({
  tabs
}:ITabs) {
  const [activeTab, setActiveTab] = useState(tabs[0].name);

  return (
    <>
      <XStack bg="$white" pt="$4" mb="$2" ml={-PADDING_X} w={SCREEN_WIDTH} borderTopWidth={1} borderBottomWidth={1} borderColor="$gray3">
        {tabs.map((tab, index) => {
          const isActive = tab.name === activeTab;
          const fow = isActive ? '600' : '500';
          const color = isActive ? '$main' : '$gray11';
          return (
            <Pressable key={index} style={{flex: 1}} onPress={() => setActiveTab(tab.name)}>
              <YStack ai="center" jc="center" gap="$3" overflow='hidden'>
                <Text fos={14} fow={fow} color={color}>{tab.title}</Text>
                <View h="$2" w={40} bg={isActive ? "$main" : "transparent"} br="$full" mb={-4}></View>
              </YStack>
            </Pressable>
          )
        })}
      </XStack>
      {tabs.filter((tab) => tab.name === activeTab)[0]?.content || null}
    </>
  )
}